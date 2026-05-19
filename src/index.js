/**
 * Gatekeeper HA — Lovelace Card
 * Admin panel for managing guest tokens and guest mode.
 *
 * Installation:
 * 1. Add as custom repository in HACS (type: Lovelace)
 * 2. Add resource: /hacsfiles/gatekeeper-card/gatekeeper-card.js
 * 3. Add card: type: custom:gatekeeper-card
 *
 * Configuration:
 *   type: custom:gatekeeper-card
 *   title: "Guest Access"
 *   show_qr: true
 *   default_duration: 24
 *   mode_entity: binary_sensor.guest_mode_active
 *   auto_disable_after: 0       # optional; if unset, integration default applies
 */

// Lit is imported from npm and bundled by rollup (see rollup.config.js).
// Do NOT switch this to a CDN URL — HA frontends should not require
// internet access at render time, and unpkg in particular has been
// observed to serve stale/redirected modules.
import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import QRCode from 'qrcode';

const SECRET_REVEAL_TIMEOUT_MS = 60_000;

class GatekeeperCard extends LitElement {
  static get properties() {
    return {
      _hass: { type: Object },
      _config: { type: Object },
      _tokens: { type: Array },
      _modeActive: { type: Boolean },
      _modeRemaining: { type: String },
      _guestUrl: { type: String },
      _qrSvg: { type: String },
      _loading: { type: Boolean },
      _newToken: { type: Object },
      _secretRevealed: { type: Boolean },
      _showCreateForm: { type: Boolean },
      _error: { type: String },
      _info: { type: String },
    };
  }

  constructor() {
    super();
    this._tokens = [];
    this._modeActive = false;
    this._modeRemaining = '';
    this._guestUrl = '';
    this._qrSvg = '';
    this._loadingCount = 0;
    this._loading = false;
    this._newToken = null;
    this._secretRevealed = false;
    this._showCreateForm = false;
    this._error = '';
    this._info = '';
    this._eventUnsubs = [];
    this._secretClearTimer = null;
    this._initialLoadDone = false;
  }

  _setLoading(active) {
    this._loadingCount += active ? 1 : -1;
    this._loading = this._loadingCount > 0;
  }

  set hass(hass) {
    const prev = this._hass;
    this._hass = hass;

    // Pick up local-only mode state changes (binary_sensor) without a service call.
    this._readModeStateFromHass();

    // First time we receive hass: do one initial load + subscribe to events.
    if (!prev) {
      this._refresh();
      this._subscribeToEvents();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // If we re-attach after detach, re-subscribe.
    if (this._hass && this._eventUnsubs.length === 0) {
      this._subscribeToEvents();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeFromEvents();
    if (this._secretClearTimer) {
      clearTimeout(this._secretClearTimer);
      this._secretClearTimer = null;
    }
  }

  async _subscribeToEvents() {
    if (!this._hass?.connection) return;
    const events = [
      'gatekeeper_token_created',
      'gatekeeper_token_revoked',
      'gatekeeper_mode_started',
      'gatekeeper_mode_ended',
    ];
    try {
      for (const ev of events) {
        const unsub = await this._hass.connection.subscribeEvents(
          () => this._refresh(),
          ev,
        );
        this._eventUnsubs.push(unsub);
      }
    } catch (e) {
      // If event subscription fails (older HA, missing perms), the user can
      // still hit the manual Refresh button.
      this._error = 'Event subscription failed: ' + e.message;
    }
  }

  _unsubscribeFromEvents() {
    for (const unsub of this._eventUnsubs) {
      try { unsub(); } catch { /* ignore */ }
    }
    this._eventUnsubs = [];
  }

  setConfig(config) {
    this._config = {
      title: 'Guest Access',
      show_qr: true,
      default_duration: 24,
      mode_entity: 'binary_sensor.guest_mode_active',
      // auto_disable_after intentionally omitted — only sent if user sets it.
      ...config,
    };
  }

  _readModeStateFromHass() {
    if (!this._hass || !this._config) return;
    const state = this._hass.states[this._config.mode_entity];
    if (!state) {
      this._modeActive = false;
      this._modeRemaining = '';
      return;
    }
    this._modeActive = state.state === 'on';
    const remaining = state.attributes?.mode_remaining_seconds;
    if (typeof remaining === 'number' && remaining > 0) {
      const h = Math.floor(remaining / 3600);
      const m = Math.floor((remaining % 3600) / 60);
      this._modeRemaining = h > 0 ? `${h}h ${m}m` : `${m}m`;
    } else {
      this._modeRemaining = '';
    }
  }

  async _refresh() {
    if (!this._hass) return;
    this._setLoading(true);

    try {
      // HA 2026.5+ deprecation: return_response replaced by response_variable.
      // response_variable: 'response' stores the service response under result.response,
      // preserving the same access pattern as the old return_response.
      const [tokensResult, urlResult] = await Promise.all([
        this._hass.callService('gatekeeper', 'get_tokens', {}, { response_variable: 'response' }),
        this._hass.callService('gatekeeper', 'get_guest_url', {}, { response_variable: 'response' }),
      ]);

      this._tokens = tokensResult?.response?.tokens || [];

      if (urlResult?.response?.url) {
        const url = urlResult.response.url;
        if (url !== this._guestUrl) {
          this._guestUrl = url;
          // Generate the QR SVG locally. The string never leaves the browser.
          this._qrSvg = await this._renderQr(url);
        }
      }

      this._readModeStateFromHass();
      this._error = '';
      this._initialLoadDone = true;
    } catch (e) {
      this._error = 'Failed to load Gatekeeper data: ' + e.message;
    }

    this._setLoading(false);
  }

  async _createToken(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    this._setLoading(true);
    this._newToken = null;
    this._secretRevealed = false;
    this._error = '';

    try {
      const payload = {
        label: data.get('label') || 'Guest',
        duration: parseInt(data.get('duration'), 10) || this._config.default_duration,
        scoped_entities: (data.get('entities') || 'light.*').split(',').map(s => s.trim()),
        scoped_domains: (data.get('domains') || 'light,switch,climate').split(',').map(s => s.trim()),
        allowed_services: data.get('services') ? data.get('services').split(',').map(s => s.trim()) : null,
      };
      const maxUsesRaw = data.get('max_uses');
      if (maxUsesRaw !== null && maxUsesRaw !== '') {
        const maxUses = parseInt(maxUsesRaw, 10);
        if (!Number.isNaN(maxUses) && maxUses >= 0) {
          payload.max_uses = maxUses;
        }
      }

      const result = await this._hass.callService(
        'gatekeeper', 'create_token', payload, { response_variable: 'response' },
      );

      if (result?.response) {
        this._newToken = result.response;
        this._scheduleSecretClear();
      }

      this._showCreateForm = false;
      // The integration will fire gatekeeper_token_created → event subscription
      // triggers _refresh. No need to call it here.
    } catch (err) {
      this._error = 'Failed to create token: ' + err.message;
    }

    this._setLoading(false);
  }

  _scheduleSecretClear() {
    if (this._secretClearTimer) clearTimeout(this._secretClearTimer);
    this._secretClearTimer = setTimeout(() => {
      this._dismissNewToken();
    }, SECRET_REVEAL_TIMEOUT_MS);
  }

  _dismissNewToken() {
    this._newToken = null;
    this._secretRevealed = false;
    if (this._secretClearTimer) {
      clearTimeout(this._secretClearTimer);
      this._secretClearTimer = null;
    }
  }

  async _revokeToken(tokenId) {
    this._setLoading(true);
    try {
      await this._hass.callService('gatekeeper', 'revoke_token', { token_id: tokenId });
      // gatekeeper_token_revoked event will trigger refresh.
    } catch (e) {
      this._error = 'Failed to revoke token: ' + e.message;
    }
    this._setLoading(false);
  }

  async _toggleMode() {
    this._setLoading(true);
    try {
      if (this._modeActive) {
        await this._hass.callService('gatekeeper', 'deactivate_mode', {});
      } else {
        const payload = { disable_automations: true };
        // Only forward auto_disable_after when the user configured one.
        // Otherwise rely on the integration's own default.
        if (typeof this._config.auto_disable_after === 'number') {
          payload.auto_disable_after = this._config.auto_disable_after;
        }
        await this._hass.callService('gatekeeper', 'activate_mode', payload);
      }
      // gatekeeper_mode_* events will trigger refresh; also update local state.
      this._readModeStateFromHass();
    } catch (e) {
      this._error = 'Failed to toggle guest mode: ' + e.message;
    }
    this._setLoading(false);
  }

  async _renderQr(text) {
    if (!text) return '';
    try {
      // 'M' error correction + a comfortable margin keep the code reliable
      // on phones from across the room. Output is a plain SVG string.
      return await QRCode.toString(text, {
        type: 'svg',
        errorCorrectionLevel: 'M',
        margin: 1,
        width: 200,
        color: { dark: '#000000', light: '#ffffff' },
      });
    } catch {
      return '';
    }
  }

  async _copyToClipboard(text) {
    // Secure-context path.
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        this._flashInfo('Copied to clipboard');
        return;
      } catch {
        // fall through to fallback
      }
    }
    // Fallback for HTTP origins / older browsers.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) {
        this._flashInfo('Copied to clipboard');
      } else {
        this._error = 'Copy failed — select and copy manually.';
      }
    } catch (e) {
      this._error = 'Copy failed: ' + e.message;
    }
  }

  _flashInfo(msg) {
    this._info = msg;
    setTimeout(() => {
      if (this._info === msg) this._info = '';
    }, 2000);
  }

  _shareUrl(url) {
    // Uses the platform's native share sheet (iOS/Android). The URL is the
    // only thing shared — it stays on-device until the user picks a target.
    if (navigator.share) {
      navigator.share({ title: 'Guest access', url }).catch(() => {});
    } else {
      this._copyToClipboard(url);
    }
  }

  _formatExpiry(iso) {
    if (!iso) return '--';
    // Tolerate both 'Z' and '+00:00' suffixes that the server may emit.
    const stamp = /Z$|[+-]\d{2}:?\d{2}$/.test(iso) ? iso : iso + 'Z';
    const expires = new Date(stamp);
    const now = new Date();
    const diff = Math.max(0, expires - now);
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (h > 48) return `${Math.floor(h / 24)}d ${h % 24}h`;
    return `${h}h ${m}m`;
  }

  _getStatusClass(token) {
    if (!token.is_active) return 'status-revoked';
    const stamp = /Z$|[+-]\d{2}:?\d{2}$/.test(token.expires_at)
      ? token.expires_at : token.expires_at + 'Z';
    const expires = new Date(stamp);
    const now = new Date();
    const diff = expires - now;
    if (diff < 3600000) return 'status-expiring';
    if (diff < 86400000) return 'status-soon';
    return 'status-ok';
  }

  render() {
    if (this._loading && !this._initialLoadDone) {
      return html`<ha-card><div class="loading">Loading...</div></ha-card>`;
    }

    return html`
      <ha-card>
        <div class="header">
          <h2>${this._config.title}</h2>
          <div class="header-actions">
            <ha-icon-button
              class="refresh-btn"
              title="Refresh"
              @click=${() => this._refresh()}
            >↻</ha-icon-button>
            <div class="mode-toggle">
              <span class="mode-label">Guest Mode</span>
              <ha-switch
                .checked=${this._modeActive}
                @change=${this._toggleMode}
              ></ha-switch>
            </div>
          </div>
        </div>

        ${this._error ? html`<div class="error-banner">${this._error}</div>` : ''}
        ${this._info ? html`<div class="info-banner">${this._info}</div>` : ''}

        ${this._modeActive ? html`
          <div class="mode-banner active">
            Guest mode active
            ${this._modeRemaining ? html`&mdash; ${this._modeRemaining} remaining` : ''}
          </div>
        ` : html`
          <div class="mode-banner inactive">Guest mode off</div>
        `}

        <div class="section">
          <div class="section-header">
            <h3>Active Tokens (${this._tokens.length})</h3>
            <ha-button
              type="button"
              @click=${() => this._showCreateForm = !this._showCreateForm}
            >+ New Token</ha-button>
          </div>

          ${this._showCreateForm ? this._renderCreateForm() : ''}
          ${this._newToken ? this._renderNewTokenResult() : ''}

          ${this._tokens.length === 0 ? html`
            <div class="empty-state">No active tokens. Create one to give guests access.</div>
          ` : this._tokens.map(t => this._renderToken(t))}
        </div>

        ${this._guestUrl ? html`
          <div class="section qr-section">
            <h3>Guest Access QR</h3>
            <p class="qr-hint">
              Scan with a phone camera. The QR is rendered locally — the link
              and token never leave this browser.
            </p>
            ${this._config.show_qr && this._qrSvg ? html`
              <div class="qr-code">${unsafeHTML(this._qrSvg)}</div>
            ` : ''}
            <div class="url-display">
              <input type="text" .value=${this._guestUrl} readonly />
              <ha-button type="button" @click=${() => this._copyToClipboard(this._guestUrl)}>Copy</ha-button>
              ${navigator.share ? html`
                <ha-button type="button" @click=${() => this._shareUrl(this._guestUrl)}>Share</ha-button>
              ` : ''}
            </div>
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  _renderCreateForm() {
    return html`
      <form class="create-form" @submit=${this._createToken}>
        <label>
          <span>Label</span>
          <input type="text" name="label" placeholder="e.g. Plumber Wed" />
        </label>
        <label>
          <span>Duration (hours)</span>
          <input type="number" name="duration" value=${this._config.default_duration} min="1" max="8760" />
        </label>
        <label>
          <span>Entity scopes</span>
          <input type="text" name="entities" value="light.*" placeholder="light.*, lock.*" />
        </label>
        <label>
          <span>Domain scopes</span>
          <input type="text" name="domains" value="light,switch,climate" placeholder="light,switch,climate" />
        </label>
        <label>
          <span>Allowed services</span>
          <input type="text" name="services" placeholder="light.turn_on, lock.unlock" />
        </label>
        <label>
          <span>Max uses (0 = unlimited)</span>
          <input type="number" name="max_uses" min="0" max="10000" placeholder="0" />
        </label>
        <div class="form-actions">
          <ha-button type="button" @click=${() => this._showCreateForm = false}>Cancel</ha-button>
          <ha-button variant="filled" type="submit">Create Token</ha-button>
        </div>
      </form>
    `;
  }

  _renderNewTokenResult() {
    if (!this._newToken) return '';
    const secretType = this._secretRevealed ? 'text' : 'password';
    return html`
      <div class="new-token-banner">
        <div class="new-token-header">
          <strong>Token created!</strong>
          <ha-button
            type="button"
            class="dismiss-btn"
            @click=${() => this._dismissNewToken()}
          >Dismiss</ha-button>
        </div>
        <div class="token-detail">
          <span>Guest URL:</span>
          <input type="text" .value=${this._newToken.guest_url || ''} readonly />
          <ha-button type="button" @click=${() => this._copyToClipboard(this._newToken.guest_url)}>Copy</ha-button>
        </div>
        <div class="token-detail">
          <span>Secret:</span>
          <input type=${secretType} .value=${this._newToken.secret || ''} readonly />
          <ha-button
            type="button"
            @click=${() => this._secretRevealed = !this._secretRevealed}
          >${this._secretRevealed ? 'Hide' : 'Reveal'}</ha-button>
          <ha-button type="button" @click=${() => this._copyToClipboard(this._newToken.secret)}>Copy</ha-button>
        </div>
        <p class="token-warning">
          This is the only time the secret is shown. Save it now.
          It will auto-dismiss in ${Math.round(SECRET_REVEAL_TIMEOUT_MS / 1000)}s.
        </p>
      </div>
    `;
  }

  _renderToken(token) {
    const statusClass = this._getStatusClass(token);
    return html`
      <div class="token-card ${statusClass}">
        <div class="token-info">
          <div class="token-label">${token.label || 'Guest'}</div>
          <div class="token-meta">
            Expires ${this._formatExpiry(token.expires_at)}
            ${token.use_count > 0 ? html`&middot; ${token.use_count} uses` : ''}
            ${token.max_uses ? html`&middot; max ${token.max_uses}` : ''}
          </div>
        </div>
        <div class="token-actions">
          <ha-button
            type="button"
            class="revoke-btn"
            @click=${() => this._revokeToken(token.token_id)}
          >Revoke</ha-button>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; }
      ha-card { padding: 16px; }
      .header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 12px;
      }
      .header h2 { margin: 0; font-size: 1.2rem; color: var(--primary-text-color); }
      .header-actions { display: flex; align-items: center; gap: 8px; }
      .refresh-btn {
        background: transparent; border: none; cursor: pointer;
        color: var(--secondary-text-color); font-size: 1.1rem;
      }
      .mode-toggle { display: flex; align-items: center; gap: 8px; }
      .mode-label { font-size: 0.85rem; color: var(--secondary-text-color); }
      .mode-banner {
        padding: 10px 16px; border-radius: 8px; margin-bottom: 16px;
        font-weight: 500; font-size: 0.9rem;
      }
      .mode-banner.active {
        background: var(--success-color, #1b5e20);
        color: var(--text-primary-color, #fff);
      }
      .mode-banner.inactive {
        background: var(--secondary-background-color, #f0f0f0);
        color: var(--secondary-text-color, #666);
      }
      .section { margin-bottom: 16px; }
      .section-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 8px;
      }
      .section-header h3 { margin: 0; font-size: 1rem; color: var(--primary-text-color); }
      .empty-state {
        padding: 16px; text-align: center; font-style: italic;
        color: var(--secondary-text-color);
      }
      .token-card {
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 12px;
        background: var(--secondary-background-color, var(--card-background-color));
        border-radius: 8px; margin-bottom: 8px;
        border-left: 3px solid transparent;
        color: var(--primary-text-color);
      }
      .token-card.status-ok { border-left-color: var(--success-color, #4caf50); }
      .token-card.status-soon { border-left-color: var(--warning-color, #ff9800); }
      .token-card.status-expiring { border-left-color: var(--error-color, #f44336); }
      .token-card.status-revoked { opacity: 0.4; border-left-color: var(--divider-color, #666); }
      .token-label { font-weight: 500; }
      .token-meta { font-size: 0.8rem; color: var(--secondary-text-color); margin-top: 2px; }
      .create-form {
        background: var(--secondary-background-color, var(--card-background-color));
        border-radius: 8px; padding: 16px; margin-bottom: 12px;
        color: var(--primary-text-color);
      }
      .create-form label { display: block; margin-bottom: 10px; }
      .create-form label span {
        display: block; font-size: 0.8rem;
        color: var(--secondary-text-color); margin-bottom: 4px;
      }
      .create-form input {
        width: 100%; padding: 8px;
        border: 1px solid var(--divider-color, #333);
        border-radius: 6px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 0.85rem;
      }
      .form-actions {
        display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px;
      }
      .new-token-banner {
        background: var(--secondary-background-color, var(--card-background-color));
        border: 1px solid var(--success-color, #2e7d32);
        border-radius: 8px; padding: 12px; margin-bottom: 12px;
        color: var(--primary-text-color);
      }
      .new-token-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 8px;
      }
      .new-token-banner strong { color: var(--success-color, #2e7d32); }
      .token-detail {
        display: flex; align-items: center; gap: 8px; margin-top: 8px;
        flex-wrap: wrap;
      }
      .token-detail span {
        font-size: 0.8rem; color: var(--secondary-text-color); white-space: nowrap;
      }
      .token-detail input {
        flex: 1; min-width: 120px;
        padding: 4px 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 0.8rem;
      }
      .token-warning {
        font-size: 0.75rem; color: var(--secondary-text-color); margin-top: 8px;
      }
      .qr-section { text-align: center; }
      .qr-hint { font-size: 0.85rem; color: var(--secondary-text-color); }
      .qr-code {
        width: 200px;
        height: 200px;
        margin: 12px auto;
        padding: 8px;
        background: #fff;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .qr-code svg { width: 100%; height: 100%; display: block; }
      .url-display { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
      .url-display input {
        flex: 1; min-width: 120px;
        padding: 6px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 0.8rem;
      }
      .error-banner {
        background: var(--error-color, #b71c1c);
        color: var(--text-primary-color, #fff);
        padding: 8px 12px; border-radius: 6px;
        margin-bottom: 12px; font-size: 0.85rem;
      }
      .info-banner {
        background: var(--info-color, var(--primary-color, #1976d2));
        color: var(--text-primary-color, #fff);
        padding: 6px 12px; border-radius: 6px;
        margin-bottom: 12px; font-size: 0.85rem;
      }
      .loading {
        padding: 24px; text-align: center;
        color: var(--secondary-text-color);
      }
    `;
  }
}

// HA uses getCardSize() to compute view layout. Without it the card defaults
// to size 1 and can be cropped or jammed against neighbouring cards.
GatekeeperCard.prototype.getCardSize = function () {
  const baseRows = 3;
  const tokenRows = Math.max(1, (this._tokens || []).length);
  return baseRows + tokenRows + (this._guestUrl ? 2 : 0);
};

customElements.define('gatekeeper-card', GatekeeperCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'gatekeeper-card',
  name: 'Gatekeeper',
  description: 'Manage guest access tokens and guest mode',
  preview: false,
});
