import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import { DEFAULT_CARD_CONFIG, updateCardConfig } from '../src/config.js';

test('card registers a visual editor with the remaining-clicks checkbox', () => {
  const source = fs.readFileSync('src/index.js', 'utf8');

  assert.match(source, /static getConfigElement\(\)/);
  assert.match(source, /gatekeeper-card-editor/);
  assert.match(source, /name="show_remaining_uses"/);
  assert.match(source, /<span>Show remaining clicks<\/span>/);
});

test('remaining clicks defaults to hidden', () => {
  assert.equal(DEFAULT_CARD_CONFIG.show_remaining_uses, false);
});

test('checkbox input enables the remaining-click counter without mutating input', () => {
  const original = { type: 'custom:gatekeeper-card', show_remaining_uses: false };
  const updated = updateCardConfig(original, {
    type: 'checkbox',
    name: 'show_remaining_uses',
    checked: true,
  });

  assert.equal(original.show_remaining_uses, false);
  assert.equal(updated.show_remaining_uses, true);
  assert.equal(updated.type, 'custom:gatekeeper-card');
});

test('number inputs become numbers and an empty optional value is removed', () => {
  const updated = updateCardConfig(
    { default_duration: 24, auto_disable_after: 12 },
    { type: 'number', name: 'default_duration', value: '48' },
  );
  const withoutOptional = updateCardConfig(updated, {
    type: 'number',
    name: 'auto_disable_after',
    value: '',
  });

  assert.equal(updated.default_duration, 48);
  assert.equal(typeof updated.default_duration, 'number');
  assert.equal('auto_disable_after' in withoutOptional, false);
});
