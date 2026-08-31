/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,r=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let l=class n{constructor(t,r,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o;const o=this.t;if(r&&void 0===t){const r=void 0!==o&&1===o.length;r&&(t=s.get(o)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&s.set(o,t))}return t}toString(){return this.cssText}};const i$4=(t,...r)=>{const s=1===t.length?t[0]:r.reduce((r,o,s)=>r+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new l(s,t,o)},h=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let r="";for(const o of t.cssRules)r+=o.cssText;return(t=>new l("string"==typeof t?t:t+"",void 0,o))(r)})(t):t,{is:d,defineProperty:u,getOwnPropertyDescriptor:g,getOwnPropertyNames:p,getOwnPropertySymbols:f,getPrototypeOf:m}=Object,_=globalThis,v=_.trustedTypes,b=v?v.emptyScript:"",w=_.reactiveElementPolyfillSupport,d$1=(t,r)=>t,$={toAttribute(t,r){switch(r){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,r){let o=t;switch(r){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},f$1=(t,r)=>!d(t,r),A={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:f$1};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let x=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=A){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,r);void 0!==s&&u(this.prototype,t,s)}}static getPropertyDescriptor(t,r,o){const{get:s,set:l}=g(this.prototype,t)??{get(){return this[r]},set(t){this[r]=t}};return{get:s,set(r){const h=s?.call(this);l?.call(this,r),this.requestUpdate(t,h,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,r=[...p(t),...f(t)];for(const o of r)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const r=litPropertyMetadata.get(t);if(void 0!==r)for(const[t,o]of r)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const r=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)r.unshift(h(t))}else void 0!==t&&r.push(h(t));return r}static _$Eu(t,r){const o=r.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,r=this.constructor.elementProperties;for(const o of r.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((o,s)=>{if(r)o.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of s){const s=document.createElement("style"),l=t.litNonce;void 0!==l&&s.setAttribute("nonce",l),s.textContent=r.cssText,o.appendChild(s)}})(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(void 0!==s&&!0===o.reflect){const l=(void 0!==o.converter?.toAttribute?o.converter:$).toAttribute(r,o.type);this._$Em=t,null==l?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(t,r){const o=this.constructor,s=o._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=o.getPropertyOptions(s),l="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const h=l.fromAttribute(r,t.type);this[s]=h??this._$Ej?.get(s)??h,this._$Em=null}}requestUpdate(t,r,o,s=!1,l){if(void 0!==t){const h=this.constructor;if(!1===s&&(l=this[t]),o??=h.getPropertyOptions(t),!((o.hasChanged??f$1)(l,r)||o.useDefault&&o.reflect&&l===this._$Ej?.get(t)&&!this.hasAttribute(h._$Eu(t,o))))return;this.C(t,r,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:s,wrapped:l},h){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,h??r??this[t]),!0!==l||void 0!==h)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,r]of this._$Ep)this[t]=r;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[r,o]of t){const{wrapped:t}=o,s=this[r];!0!==t||this._$AL.has(r)||void 0===s||this.C(r,void 0,o,s)}}let t=!1;const r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(r)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[d$1("elementProperties")]=new Map,x[d$1("finalized")]=new Map,w?.({ReactiveElement:x}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E=globalThis,i$2=t=>t,C=E.trustedTypes,T=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,B="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,U="?"+P,D=`<${U}>`,F=document,c=()=>F.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,j="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,J=/>/g,Y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Q=/'/g,W=/"/g,G=/^(?:script|style|textarea|title)$/i,X=(t=>(r,...o)=>({_$litType$:t,strings:r,values:o}))(1),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),rt=new WeakMap,nt=F.createTreeWalker(F,129);function V(t,r){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(r):r}const N=(t,r)=>{const o=t.length-1,s=[];let l,h=2===r?"<svg>":3===r?"<math>":"",d=q;for(let r=0;r<o;r++){const o=t[r];let u,g,p=-1,f=0;for(;f<o.length&&(d.lastIndex=f,g=d.exec(o),null!==g);)f=d.lastIndex,d===q?"!--"===g[1]?d=K:void 0!==g[1]?d=J:void 0!==g[2]?(G.test(g[2])&&(l=RegExp("</"+g[2],"g")),d=Y):void 0!==g[3]&&(d=Y):d===Y?">"===g[0]?(d=l??q,p=-1):void 0===g[1]?p=-2:(p=d.lastIndex-g[2].length,u=g[1],d=void 0===g[3]?Y:'"'===g[3]?W:Q):d===W||d===Q?d=Y:d===K||d===J?d=q:(d=Y,l=void 0);const m=d===Y&&t[r+1].startsWith("/>")?" ":"";h+=d===q?o+D:p>=0?(s.push(u),o.slice(0,p)+B+o.slice(p)+P+m):o+P+(-2===p?r:m)}return[V(t,h+(t[o]||"<?>")+(2===r?"</svg>":3===r?"</math>":"")),s]};class S{constructor({strings:t,_$litType$:r},o){let s;this.parts=[];let l=0,h=0;const d=t.length-1,u=this.parts,[g,p]=N(t,r);if(this.el=S.createElement(g,o),nt.currentNode=this.el.content,2===r||3===r){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=nt.nextNode())&&u.length<d;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(B)){const r=p[h++],o=s.getAttribute(t).split(P),d=/([.?@])?(.*)/.exec(r);u.push({type:1,index:l,name:d[2],strings:o,ctor:"."===d[1]?I:"?"===d[1]?L:"@"===d[1]?z:H}),s.removeAttribute(t)}else t.startsWith(P)&&(u.push({type:6,index:l}),s.removeAttribute(t));if(G.test(s.tagName)){const t=s.textContent.split(P),r=t.length-1;if(r>0){s.textContent=C?C.emptyScript:"";for(let o=0;o<r;o++)s.append(t[o],c()),nt.nextNode(),u.push({type:2,index:++l});s.append(t[r],c())}}}else if(8===s.nodeType)if(s.data===U)u.push({type:2,index:l});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)u.push({type:7,index:l}),t+=P.length-1}l++}}static createElement(t,r){const o=F.createElement("template");return o.innerHTML=t,o}}function M(t,r,o=t,s){if(r===tt)return r;let l=void 0!==s?o._$Co?.[s]:o._$Cl;const h=a(r)?void 0:r._$litDirective$;return l?.constructor!==h&&(l?._$AO?.(!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,o,s)),void 0!==s?(o._$Co??=[])[s]=l:o._$Cl=l),void 0!==l&&(r=M(t,l._$AS(t,r.values),l,s)),r}class R{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:r},parts:o}=this._$AD,s=(t?.creationScope??F).importNode(r,!0);nt.currentNode=s;let l=nt.nextNode(),h=0,d=0,u=o[0];for(;void 0!==u;){if(h===u.index){let r;2===u.type?r=new k(l,l.nextSibling,this,t):1===u.type?r=new u.ctor(l,u.name,u.strings,this,t):6===u.type&&(r=new Z(l,this,t)),this._$AV.push(r),u=o[++d]}h!==u?.index&&(l=nt.nextNode(),h++)}return nt.currentNode=F,s}p(t){let r=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,s){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const r=this._$AM;return void 0!==r&&11===t?.nodeType&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=M(this,t,r),a(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){const{values:r,_$litType$:o}=t,s="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{const t=new R(s,this),o=t.u(this.options);t.p(r),this.T(o),this._$AH=t}}_$AC(t){let r=rt.get(t.strings);return void 0===r&&rt.set(t.strings,r=new S(t)),r}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let o,s=0;for(const l of t)s===r.length?r.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=r[s],o._$AI(l),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){const r=i$2(t).nextSibling;i$2(t).remove(),t=r}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,s,l){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=et}_$AI(t,r=this,o,s){const l=this.strings;let h=!1;if(void 0===l)t=M(this,t,r,0),h=!a(t)||t!==this._$AH&&t!==tt,h&&(this._$AH=t);else{const s=t;let d,u;for(t=l[0],d=0;d<l.length-1;d++)u=M(this,s[o+d],r,d),u===tt&&(u=this._$AH[d]),h||=!a(u)||u!==this._$AH[d],u===et?t=et:t!==et&&(t+=(u??"")+l[d+1]),this._$AH[d]=u}h&&!s&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class z extends H{constructor(t,r,o,s,l){super(t,r,o,s,l),this.type=5}_$AI(t,r=this){if((t=M(this,t,r,0)??et)===tt)return;const o=this._$AH,s=t===et&&o!==et||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,l=t!==et&&(o===et||s);s&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const ot=E.litHtmlPolyfillSupport;ot?.(S,k),(E.litHtmlVersions??=[]).push("3.3.3");const it=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let st=class i extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,r,o)=>{const s=o?.renderBefore??r;let l=s._$litPart$;if(void 0===l){const t=o?.renderBefore??null;s._$litPart$=l=new k(r.insertBefore(c(),t),t,void 0,o??{})}return l._$AI(t),l})(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}};st._$litElement$=!0,st.finalized=!0,it.litElementHydrateSupport?.({LitElement:st});const at=it.litElementPolyfillSupport;at?.({LitElement:st}),(it.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=2;class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class e extends i{constructor(t){if(super(t),this.it=et,t.type!==ct)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===et||null==t)return this._t=void 0,this.it=t;if(t===tt)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const lt=(t=>(...r)=>({_$litDirective$:t,values:r}))(e);var ht={},dt={},ut={};let gt;const pt=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];ut.getSymbolSize=function getSymbolSize(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return 4*t+17},ut.getSymbolTotalCodewords=function getSymbolTotalCodewords(t){return pt[t]},ut.getBCHDigit=function(t){let r=0;for(;0!==t;)r++,t>>>=1;return r},ut.setToSJISFunction=function setToSJISFunction(t){if("function"!=typeof t)throw new Error('"toSJISFunc" is not a valid function.');gt=t},ut.isKanjiModeEnabled=function(){return void 0!==gt},ut.toSJIS=function toSJIS(t){return gt(t)};var ft,mt={};function BitBuffer$1(){this.buffer=[],this.length=0}(ft=mt).L={bit:1},ft.M={bit:0},ft.Q={bit:3},ft.H={bit:2},ft.isValid=function isValid(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},ft.from=function from(t,r){if(ft.isValid(t))return t;try{return function fromString(t){if("string"!=typeof t)throw new Error("Param is not a string");switch(t.toLowerCase()){case"l":case"low":return ft.L;case"m":case"medium":return ft.M;case"q":case"quartile":return ft.Q;case"h":case"high":return ft.H;default:throw new Error("Unknown EC Level: "+t)}}(t)}catch(t){return r}},BitBuffer$1.prototype={get:function(t){const r=Math.floor(t/8);return 1==(this.buffer[r]>>>7-t%8&1)},put:function(t,r){for(let o=0;o<r;o++)this.putBit(1==(t>>>r-o-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}};var _t=BitBuffer$1;function BitMatrix$1(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}BitMatrix$1.prototype.set=function(t,r,o,s){const l=t*this.size+r;this.data[l]=o,s&&(this.reservedBit[l]=!0)},BitMatrix$1.prototype.get=function(t,r){return this.data[t*this.size+r]},BitMatrix$1.prototype.xor=function(t,r,o){this.data[t*this.size+r]^=o},BitMatrix$1.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]};var yt=BitMatrix$1,vt={};!function(t){const r=ut.getSymbolSize;t.getRowColCoords=function getRowColCoords(t){if(1===t)return[];const o=Math.floor(t/7)+2,s=r(t),l=145===s?26:2*Math.ceil((s-13)/(2*o-2)),h=[s-7];for(let t=1;t<o-1;t++)h[t]=h[t-1]-l;return h.push(6),h.reverse()},t.getPositions=function getPositions(r){const o=[],s=t.getRowColCoords(r),l=s.length;for(let t=0;t<l;t++)for(let r=0;r<l;r++)0===t&&0===r||0===t&&r===l-1||t===l-1&&0===r||o.push([s[t],s[r]]);return o}}(vt);var bt={};const wt=ut.getSymbolSize;bt.getPositions=function getPositions(t){const r=wt(t);return[[0,0],[r-7,0],[0,r-7]]};var $t={};!function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const r=3,o=3,s=40,l=10;function getMaskAt(r,o,s){switch(r){case t.Patterns.PATTERN000:return(o+s)%2==0;case t.Patterns.PATTERN001:return o%2==0;case t.Patterns.PATTERN010:return s%3==0;case t.Patterns.PATTERN011:return(o+s)%3==0;case t.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(s/3))%2==0;case t.Patterns.PATTERN101:return o*s%2+o*s%3==0;case t.Patterns.PATTERN110:return(o*s%2+o*s%3)%2==0;case t.Patterns.PATTERN111:return(o*s%3+(o+s)%2)%2==0;default:throw new Error("bad maskPattern:"+r)}}t.isValid=function isValid(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},t.from=function from(r){return t.isValid(r)?parseInt(r,10):void 0},t.getPenaltyN1=function getPenaltyN1(t){const o=t.size;let s=0,l=0,h=0,d=null,u=null;for(let g=0;g<o;g++){l=h=0,d=u=null;for(let p=0;p<o;p++){let o=t.get(g,p);o===d?l++:(l>=5&&(s+=r+(l-5)),d=o,l=1),o=t.get(p,g),o===u?h++:(h>=5&&(s+=r+(h-5)),u=o,h=1)}l>=5&&(s+=r+(l-5)),h>=5&&(s+=r+(h-5))}return s},t.getPenaltyN2=function getPenaltyN2(t){const r=t.size;let s=0;for(let o=0;o<r-1;o++)for(let l=0;l<r-1;l++){const r=t.get(o,l)+t.get(o,l+1)+t.get(o+1,l)+t.get(o+1,l+1);4!==r&&0!==r||s++}return s*o},t.getPenaltyN3=function getPenaltyN3(t){const r=t.size;let o=0,l=0,h=0;for(let s=0;s<r;s++){l=h=0;for(let d=0;d<r;d++)l=l<<1&2047|t.get(s,d),d>=10&&(1488===l||93===l)&&o++,h=h<<1&2047|t.get(d,s),d>=10&&(1488===h||93===h)&&o++}return o*s},t.getPenaltyN4=function getPenaltyN4(t){let r=0;const o=t.data.length;for(let s=0;s<o;s++)r+=t.data[s];return Math.abs(Math.ceil(100*r/o/5)-10)*l},t.applyMask=function applyMask(t,r){const o=r.size;for(let s=0;s<o;s++)for(let l=0;l<o;l++)r.isReserved(l,s)||r.xor(l,s,getMaskAt(t,l,s))},t.getBestMask=function getBestMask(r,o){const s=Object.keys(t.Patterns).length;let l=0,h=1/0;for(let d=0;d<s;d++){o(d),t.applyMask(d,r);const s=t.getPenaltyN1(r)+t.getPenaltyN2(r)+t.getPenaltyN3(r)+t.getPenaltyN4(r);t.applyMask(d,r),s<h&&(h=s,l=d)}return l}}($t);var At={};const xt=mt,Et=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Ct=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];At.getBlocksCount=function getBlocksCount(t,r){switch(r){case xt.L:return Et[4*(t-1)+0];case xt.M:return Et[4*(t-1)+1];case xt.Q:return Et[4*(t-1)+2];case xt.H:return Et[4*(t-1)+3];default:return}},At.getTotalCodewordsCount=function getTotalCodewordsCount(t,r){switch(r){case xt.L:return Ct[4*(t-1)+0];case xt.M:return Ct[4*(t-1)+1];case xt.Q:return Ct[4*(t-1)+2];case xt.H:return Ct[4*(t-1)+3];default:return}};var kt={},St={};const Tt=new Uint8Array(512),Mt=new Uint8Array(256);!function initTables(){let t=1;for(let r=0;r<255;r++)Tt[r]=t,Mt[t]=r,t<<=1,256&t&&(t^=285);for(let t=255;t<512;t++)Tt[t]=Tt[t-255]}(),St.log=function log(t){if(t<1)throw new Error("log("+t+")");return Mt[t]},St.exp=function exp(t){return Tt[t]},St.mul=function mul(t,r){return 0===t||0===r?0:Tt[Mt[t]+Mt[r]]},function(t){const r=St;t.mul=function mul(t,o){const s=new Uint8Array(t.length+o.length-1);for(let l=0;l<t.length;l++)for(let h=0;h<o.length;h++)s[l+h]^=r.mul(t[l],o[h]);return s},t.mod=function mod(t,o){let s=new Uint8Array(t);for(;s.length-o.length>=0;){const t=s[0];for(let l=0;l<o.length;l++)s[l]^=r.mul(o[l],t);let l=0;for(;l<s.length&&0===s[l];)l++;s=s.slice(l)}return s},t.generateECPolynomial=function generateECPolynomial(o){let s=new Uint8Array([1]);for(let l=0;l<o;l++)s=t.mul(s,new Uint8Array([1,r.exp(l)]));return s}}(kt);const Bt=kt;function ReedSolomonEncoder$1(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}ReedSolomonEncoder$1.prototype.initialize=function initialize(t){this.degree=t,this.genPoly=Bt.generateECPolynomial(this.degree)},ReedSolomonEncoder$1.prototype.encode=function encode(t){if(!this.genPoly)throw new Error("Encoder not initialized");const r=new Uint8Array(t.length+this.degree);r.set(t);const o=Bt.mod(r,this.genPoly),s=this.degree-o.length;if(s>0){const t=new Uint8Array(this.degree);return t.set(o,s),t}return o};var Pt=ReedSolomonEncoder$1,Nt={},Rt={},Ut={isValid:function isValid(t){return!isNaN(t)&&t>=1&&t<=40}},Lt={};const It="[0-9]+";let Dt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Dt=Dt.replace(/u/g,"\\u");const Ht="(?:(?![A-Z0-9 $%*+\\-./:]|"+Dt+")(?:.|[\r\n]))+";Lt.KANJI=new RegExp(Dt,"g"),Lt.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Lt.BYTE=new RegExp(Ht,"g"),Lt.NUMERIC=new RegExp(It,"g"),Lt.ALPHANUMERIC=new RegExp("[A-Z $%*+\\-./:]+","g");const Ft=new RegExp("^"+Dt+"$"),zt=new RegExp("^"+It+"$"),Ot=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Lt.testKanji=function testKanji(t){return Ft.test(t)},Lt.testNumeric=function testNumeric(t){return zt.test(t)},Lt.testAlphanumeric=function testAlphanumeric(t){return Ot.test(t)},function(t){const r=Ut,o=Lt;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function getCharCountIndicator(t,o){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!r.isValid(o))throw new Error("Invalid version: "+o);return o>=1&&o<10?t.ccBits[0]:o<27?t.ccBits[1]:t.ccBits[2]},t.getBestModeForData=function getBestModeForData(r){return o.testNumeric(r)?t.NUMERIC:o.testAlphanumeric(r)?t.ALPHANUMERIC:o.testKanji(r)?t.KANJI:t.BYTE},t.toString=function toString(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},t.isValid=function isValid(t){return t&&t.bit&&t.ccBits},t.from=function from(r,o){if(t.isValid(r))return r;try{return function fromString(r){if("string"!=typeof r)throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+r)}}(r)}catch(t){return o}}}(Rt),function(t){const r=ut,o=At,s=mt,l=Rt,h=Ut,d=r.getBCHDigit(7973);function getReservedBitsCount(t,r){return l.getCharCountIndicator(t,r)+4}function getTotalBitsFromDataArray(t,r){let o=0;return t.forEach(function(t){const s=getReservedBitsCount(t.mode,r);o+=s+t.getBitsLength()}),o}t.from=function from(t,r){return h.isValid(t)?parseInt(t,10):r},t.getCapacity=function getCapacity(t,s,d){if(!h.isValid(t))throw new Error("Invalid QR Code version");void 0===d&&(d=l.BYTE);const u=8*(r.getSymbolTotalCodewords(t)-o.getTotalCodewordsCount(t,s));if(d===l.MIXED)return u;const g=u-getReservedBitsCount(d,t);switch(d){case l.NUMERIC:return Math.floor(g/10*3);case l.ALPHANUMERIC:return Math.floor(g/11*2);case l.KANJI:return Math.floor(g/13);case l.BYTE:default:return Math.floor(g/8)}},t.getBestVersionForData=function getBestVersionForData(r,o){let h;const d=s.from(o,s.M);if(Array.isArray(r)){if(r.length>1)return function getBestVersionForMixedData(r,o){for(let s=1;s<=40;s++)if(getTotalBitsFromDataArray(r,s)<=t.getCapacity(s,o,l.MIXED))return s}(r,d);if(0===r.length)return 1;h=r[0]}else h=r;return function getBestVersionForDataLength(r,o,s){for(let l=1;l<=40;l++)if(o<=t.getCapacity(l,s,r))return l}(h.mode,h.getLength(),d)},t.getEncodedBits=function getEncodedBits(t){if(!h.isValid(t)||t<7)throw new Error("Invalid QR Code version");let o=t<<12;for(;r.getBCHDigit(o)-d>=0;)o^=7973<<r.getBCHDigit(o)-d;return t<<12|o}}(Nt);var jt={};const qt=ut,Kt=qt.getBCHDigit(1335);jt.getEncodedBits=function getEncodedBits(t,r){const o=t.bit<<3|r;let s=o<<10;for(;qt.getBCHDigit(s)-Kt>=0;)s^=1335<<qt.getBCHDigit(s)-Kt;return 21522^(o<<10|s)};var Vt={};const Jt=Rt;function NumericData(t){this.mode=Jt.NUMERIC,this.data=t.toString()}NumericData.getBitsLength=function getBitsLength(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},NumericData.prototype.getLength=function getLength(){return this.data.length},NumericData.prototype.getBitsLength=function getBitsLength(){return NumericData.getBitsLength(this.data.length)},NumericData.prototype.write=function write(t){let r,o,s;for(r=0;r+3<=this.data.length;r+=3)o=this.data.substr(r,3),s=parseInt(o,10),t.put(s,10);const l=this.data.length-r;l>0&&(o=this.data.substr(r),s=parseInt(o,10),t.put(s,3*l+1))};var Yt=NumericData;const Qt=Rt,Wt=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function AlphanumericData(t){this.mode=Qt.ALPHANUMERIC,this.data=t}AlphanumericData.getBitsLength=function getBitsLength(t){return 11*Math.floor(t/2)+t%2*6},AlphanumericData.prototype.getLength=function getLength(){return this.data.length},AlphanumericData.prototype.getBitsLength=function getBitsLength(){return AlphanumericData.getBitsLength(this.data.length)},AlphanumericData.prototype.write=function write(t){let r;for(r=0;r+2<=this.data.length;r+=2){let o=45*Wt.indexOf(this.data[r]);o+=Wt.indexOf(this.data[r+1]),t.put(o,11)}this.data.length%2&&t.put(Wt.indexOf(this.data[r]),6)};var Gt=AlphanumericData;const Zt=Rt;function ByteData(t){this.mode=Zt.BYTE,this.data="string"==typeof t?(new TextEncoder).encode(t):new Uint8Array(t)}ByteData.getBitsLength=function getBitsLength(t){return 8*t},ByteData.prototype.getLength=function getLength(){return this.data.length},ByteData.prototype.getBitsLength=function getBitsLength(){return ByteData.getBitsLength(this.data.length)},ByteData.prototype.write=function(t){for(let r=0,o=this.data.length;r<o;r++)t.put(this.data[r],8)};var Xt=ByteData;const te=Rt,ee=ut;function KanjiData(t){this.mode=te.KANJI,this.data=t}KanjiData.getBitsLength=function getBitsLength(t){return 13*t},KanjiData.prototype.getLength=function getLength(){return this.data.length},KanjiData.prototype.getBitsLength=function getBitsLength(){return KanjiData.getBitsLength(this.data.length)},KanjiData.prototype.write=function(t){let r;for(r=0;r<this.data.length;r++){let o=ee.toSJIS(this.data[r]);if(o>=33088&&o<=40956)o-=33088;else{if(!(o>=57408&&o<=60351))throw new Error("Invalid SJIS character: "+this.data[r]+"\nMake sure your charset is UTF-8");o-=49472}o=192*(o>>>8&255)+(255&o),t.put(o,13)}};var re=KanjiData,ne={exports:{}};!function(t){var r={single_source_shortest_paths:function(t,o,s){var l={},h={};h[o]=0;var d,u,g,p,f,m,_,v=r.PriorityQueue.make();for(v.push(o,0);!v.empty();)for(g in u=(d=v.pop()).value,p=d.cost,f=t[u]||{})f.hasOwnProperty(g)&&(m=p+f[g],_=h[g],(void 0===h[g]||_>m)&&(h[g]=m,v.push(g,m),l[g]=u));if(void 0!==s&&void 0===h[s]){var b=["Could not find a path from ",o," to ",s,"."].join("");throw new Error(b)}return l},extract_shortest_path_from_predecessor_list:function(t,r){for(var o=[],s=r;s;)o.push(s),t[s],s=t[s];return o.reverse(),o},find_path:function(t,o,s){var l=r.single_source_shortest_paths(t,o,s);return r.extract_shortest_path_from_predecessor_list(l,s)},PriorityQueue:{make:function(t){var o,s=r.PriorityQueue,l={};for(o in t=t||{},s)s.hasOwnProperty(o)&&(l[o]=s[o]);return l.queue=[],l.sorter=t.sorter||s.default_sorter,l},default_sorter:function(t,r){return t.cost-r.cost},push:function(t,r){var o={value:t,cost:r};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};t.exports=r}(ne);var oe=ne.exports;!function(t){const r=Rt,o=Yt,s=Gt,l=Xt,h=re,d=Lt,u=ut,g=oe;function getStringByteLength(t){return unescape(encodeURIComponent(t)).length}function getSegments(t,r,o){const s=[];let l;for(;null!==(l=t.exec(o));)s.push({data:l[0],index:l.index,mode:r,length:l[0].length});return s}function getSegmentsFromString(t){const o=getSegments(d.NUMERIC,r.NUMERIC,t),s=getSegments(d.ALPHANUMERIC,r.ALPHANUMERIC,t);let l,h;u.isKanjiModeEnabled()?(l=getSegments(d.BYTE,r.BYTE,t),h=getSegments(d.KANJI,r.KANJI,t)):(l=getSegments(d.BYTE_KANJI,r.BYTE,t),h=[]);return o.concat(s,l,h).sort(function(t,r){return t.index-r.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function getSegmentBitsLength(t,d){switch(d){case r.NUMERIC:return o.getBitsLength(t);case r.ALPHANUMERIC:return s.getBitsLength(t);case r.KANJI:return h.getBitsLength(t);case r.BYTE:return l.getBitsLength(t)}}function buildSingleSegment(t,d){let g;const p=r.getBestModeForData(t);if(g=r.from(d,p),g!==r.BYTE&&g.bit<p.bit)throw new Error('"'+t+'" cannot be encoded with mode '+r.toString(g)+".\n Suggested mode is: "+r.toString(p));switch(g!==r.KANJI||u.isKanjiModeEnabled()||(g=r.BYTE),g){case r.NUMERIC:return new o(t);case r.ALPHANUMERIC:return new s(t);case r.KANJI:return new h(t);case r.BYTE:return new l(t)}}t.fromArray=function fromArray(t){return t.reduce(function(t,r){return"string"==typeof r?t.push(buildSingleSegment(r,null)):r.data&&t.push(buildSingleSegment(r.data,r.mode)),t},[])},t.fromString=function fromString(o,s){const l=function buildNodes(t){const o=[];for(let s=0;s<t.length;s++){const l=t[s];switch(l.mode){case r.NUMERIC:o.push([l,{data:l.data,mode:r.ALPHANUMERIC,length:l.length},{data:l.data,mode:r.BYTE,length:l.length}]);break;case r.ALPHANUMERIC:o.push([l,{data:l.data,mode:r.BYTE,length:l.length}]);break;case r.KANJI:o.push([l,{data:l.data,mode:r.BYTE,length:getStringByteLength(l.data)}]);break;case r.BYTE:o.push([{data:l.data,mode:r.BYTE,length:getStringByteLength(l.data)}])}}return o}(getSegmentsFromString(o,u.isKanjiModeEnabled())),h=function buildGraph(t,o){const s={},l={start:{}};let h=["start"];for(let d=0;d<t.length;d++){const u=t[d],g=[];for(let t=0;t<u.length;t++){const p=u[t],f=""+d+t;g.push(f),s[f]={node:p,lastCount:0},l[f]={};for(let t=0;t<h.length;t++){const d=h[t];s[d]&&s[d].node.mode===p.mode?(l[d][f]=getSegmentBitsLength(s[d].lastCount+p.length,p.mode)-getSegmentBitsLength(s[d].lastCount,p.mode),s[d].lastCount+=p.length):(s[d]&&(s[d].lastCount=p.length),l[d][f]=getSegmentBitsLength(p.length,p.mode)+4+r.getCharCountIndicator(p.mode,o))}}h=g}for(let t=0;t<h.length;t++)l[h[t]].end=0;return{map:l,table:s}}(l,s),d=g.find_path(h.map,"start","end"),p=[];for(let t=1;t<d.length-1;t++)p.push(h.table[d[t]].node);return t.fromArray(function mergeSegments(t){return t.reduce(function(t,r){const o=t.length-1>=0?t[t.length-1]:null;return o&&o.mode===r.mode?(t[t.length-1].data+=r.data,t):(t.push(r),t)},[])}(p))},t.rawSplit=function rawSplit(r){return t.fromArray(getSegmentsFromString(r,u.isKanjiModeEnabled()))}}(Vt);const ie=ut,se=mt,ae=_t,ce=yt,le=vt,he=bt,de=$t,ue=At,ge=Pt,pe=Nt,fe=jt,me=Rt,_e=Vt;function setupFormatInfo(t,r,o){const s=t.size,l=fe.getEncodedBits(r,o);let h,d;for(h=0;h<15;h++)d=1==(l>>h&1),h<6?t.set(h,8,d,!0):h<8?t.set(h+1,8,d,!0):t.set(s-15+h,8,d,!0),h<8?t.set(8,s-h-1,d,!0):h<9?t.set(8,15-h-1+1,d,!0):t.set(8,15-h-1,d,!0);t.set(s-8,8,1,!0)}function createData(t,r,o){const s=new ae;o.forEach(function(r){s.put(r.mode.bit,4),s.put(r.getLength(),me.getCharCountIndicator(r.mode,t)),r.write(s)});const l=8*(ie.getSymbolTotalCodewords(t)-ue.getTotalCodewordsCount(t,r));for(s.getLengthInBits()+4<=l&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(0);const h=(l-s.getLengthInBits())/8;for(let t=0;t<h;t++)s.put(t%2?17:236,8);return function createCodewords(t,r,o){const s=ie.getSymbolTotalCodewords(r),l=ue.getTotalCodewordsCount(r,o),h=s-l,d=ue.getBlocksCount(r,o),u=s%d,g=d-u,p=Math.floor(s/d),f=Math.floor(h/d),m=f+1,_=p-f,v=new ge(_);let b=0;const w=new Array(d),$=new Array(d);let A=0;const x=new Uint8Array(t.buffer);for(let t=0;t<d;t++){const r=t<g?f:m;w[t]=x.slice(b,b+r),$[t]=v.encode(w[t]),b+=r,A=Math.max(A,r)}const E=new Uint8Array(s);let C,T,B=0;for(C=0;C<A;C++)for(T=0;T<d;T++)C<w[T].length&&(E[B++]=w[T][C]);for(C=0;C<_;C++)for(T=0;T<d;T++)E[B++]=$[T][C];return E}(s,t,r)}function createSymbol(t,r,o,s){let l;if(Array.isArray(t))l=_e.fromArray(t);else{if("string"!=typeof t)throw new Error("Invalid data");{let s=r;if(!s){const r=_e.rawSplit(t);s=pe.getBestVersionForData(r,o)}l=_e.fromString(t,s||40)}}const h=pe.getBestVersionForData(l,o);if(!h)throw new Error("The amount of data is too big to be stored in a QR Code");if(r){if(r<h)throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+h+".\n")}else r=h;const d=createData(r,o,l),u=ie.getSymbolSize(r),g=new ce(u);return function setupFinderPattern(t,r){const o=t.size,s=he.getPositions(r);for(let r=0;r<s.length;r++){const l=s[r][0],h=s[r][1];for(let r=-1;r<=7;r++)if(!(l+r<=-1||o<=l+r))for(let s=-1;s<=7;s++)h+s<=-1||o<=h+s||(r>=0&&r<=6&&(0===s||6===s)||s>=0&&s<=6&&(0===r||6===r)||r>=2&&r<=4&&s>=2&&s<=4?t.set(l+r,h+s,!0,!0):t.set(l+r,h+s,!1,!0))}}(g,r),function setupTimingPattern(t){const r=t.size;for(let o=8;o<r-8;o++){const r=o%2==0;t.set(o,6,r,!0),t.set(6,o,r,!0)}}(g),function setupAlignmentPattern(t,r){const o=le.getPositions(r);for(let r=0;r<o.length;r++){const s=o[r][0],l=o[r][1];for(let r=-2;r<=2;r++)for(let o=-2;o<=2;o++)-2===r||2===r||-2===o||2===o||0===r&&0===o?t.set(s+r,l+o,!0,!0):t.set(s+r,l+o,!1,!0)}}(g,r),setupFormatInfo(g,o,0),r>=7&&function setupVersionInfo(t,r){const o=t.size,s=pe.getEncodedBits(r);let l,h,d;for(let r=0;r<18;r++)l=Math.floor(r/3),h=r%3+o-8-3,d=1==(s>>r&1),t.set(l,h,d,!0),t.set(h,l,d,!0)}(g,r),function setupData(t,r){const o=t.size;let s=-1,l=o-1,h=7,d=0;for(let u=o-1;u>0;u-=2)for(6===u&&u--;;){for(let o=0;o<2;o++)if(!t.isReserved(l,u-o)){let s=!1;d<r.length&&(s=1==(r[d]>>>h&1)),t.set(l,u-o,s),h--,-1===h&&(d++,h=7)}if(l+=s,l<0||o<=l){l-=s,s=-s;break}}}(g,d),isNaN(s)&&(s=de.getBestMask(g,setupFormatInfo.bind(null,g,o))),de.applyMask(s,g),setupFormatInfo(g,o,s),{modules:g,version:r,errorCorrectionLevel:o,maskPattern:s,segments:l}}dt.create=function create(t,r){if(void 0===t||""===t)throw new Error("No input text");let o,s,l=se.M;return void 0!==r&&(l=se.from(r.errorCorrectionLevel,se.M),o=pe.from(r.version),s=de.from(r.maskPattern),r.toSJISFunc&&ie.setToSJISFunction(r.toSJISFunc)),createSymbol(t,o,l,s)};var ye={},ve={};!function(t){function hex2rgba(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw new Error("Color should be defined as hex string");let r=t.slice().replace("#","").split("");if(r.length<3||5===r.length||r.length>8)throw new Error("Invalid hex color: "+t);3!==r.length&&4!==r.length||(r=Array.prototype.concat.apply([],r.map(function(t){return[t,t]}))),6===r.length&&r.push("F","F");const o=parseInt(r.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:255&o,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function getOptions(t){t||(t={}),t.color||(t.color={});const r=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,o=t.width&&t.width>=21?t.width:void 0,s=t.scale||4;return{width:o,scale:o?4:s,margin:r,color:{dark:hex2rgba(t.color.dark||"#000000ff"),light:hex2rgba(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},t.getScale=function getScale(t,r){return r.width&&r.width>=t+2*r.margin?r.width/(t+2*r.margin):r.scale},t.getImageWidth=function getImageWidth(r,o){const s=t.getScale(r,o);return Math.floor((r+2*o.margin)*s)},t.qrToImageData=function qrToImageData(r,o,s){const l=o.modules.size,h=o.modules.data,d=t.getScale(l,s),u=Math.floor((l+2*s.margin)*d),g=s.margin*d,p=[s.color.light,s.color.dark];for(let t=0;t<u;t++)for(let o=0;o<u;o++){let f=4*(t*u+o),m=s.color.light;if(t>=g&&o>=g&&t<u-g&&o<u-g){m=p[h[Math.floor((t-g)/d)*l+Math.floor((o-g)/d)]?1:0]}r[f++]=m.r,r[f++]=m.g,r[f++]=m.b,r[f]=m.a}}}(ve),function(t){const r=ve;t.render=function render(t,o,s){let l=s,h=o;void 0!==l||o&&o.getContext||(l=o,o=void 0),o||(h=function getCanvasElement(){try{return document.createElement("canvas")}catch(t){throw new Error("You need to specify a canvas element")}}()),l=r.getOptions(l);const d=r.getImageWidth(t.modules.size,l),u=h.getContext("2d"),g=u.createImageData(d,d);return r.qrToImageData(g.data,t,l),function clearCanvas(t,r,o){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=o,r.width=o,r.style.height=o+"px",r.style.width=o+"px"}(u,h,d),u.putImageData(g,0,0),h},t.renderToDataURL=function renderToDataURL(r,o,s){let l=s;void 0!==l||o&&o.getContext||(l=o,o=void 0),l||(l={});const h=t.render(r,o,l),d=l.type||"image/png",u=l.rendererOpts||{};return h.toDataURL(d,u.quality)}}(ye);var be={};const we=ve;function getColorAttrib(t,r){const o=t.a/255,s=r+'="'+t.hex+'"';return o<1?s+" "+r+'-opacity="'+o.toFixed(2).slice(1)+'"':s}function svgCmd(t,r,o){let s=t+r;return void 0!==o&&(s+=" "+o),s}be.render=function render(t,r,o){const s=we.getOptions(r),l=t.modules.size,h=t.modules.data,d=l+2*s.margin,u=s.color.light.a?"<path "+getColorAttrib(s.color.light,"fill")+' d="M0 0h'+d+"v"+d+'H0z"/>':"",g="<path "+getColorAttrib(s.color.dark,"stroke")+' d="'+function qrToPath(t,r,o){let s="",l=0,h=!1,d=0;for(let u=0;u<t.length;u++){const g=Math.floor(u%r),p=Math.floor(u/r);g||h||(h=!0),t[u]?(d++,u>0&&g>0&&t[u-1]||(s+=h?svgCmd("M",g+o,.5+p+o):svgCmd("m",l,0),l=0,h=!1),g+1<r&&t[u+1]||(s+=svgCmd("h",d),d=0)):l++}return s}(h,l,s.margin)+'"/>',p='viewBox="0 0 '+d+" "+d+'"',f='<svg xmlns="http://www.w3.org/2000/svg" '+(s.width?'width="'+s.width+'" height="'+s.width+'" ':"")+p+' shape-rendering="crispEdges">'+u+g+"</svg>\n";return"function"==typeof o&&o(null,f),f};const canPromise=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then},$e=dt,Ae=ye,xe=be;function renderCanvas(t,r,o,s,l){const h=[].slice.call(arguments,1),d=h.length,u="function"==typeof h[d-1];if(!u&&!canPromise())throw new Error("Callback required as last argument");if(!u){if(d<1)throw new Error("Too few arguments provided");return 1===d?(o=r,r=s=void 0):2!==d||r.getContext||(s=o,o=r,r=void 0),new Promise(function(l,h){try{const h=$e.create(o,s);l(t(h,r,s))}catch(t){h(t)}})}if(d<2)throw new Error("Too few arguments provided");2===d?(l=o,o=r,r=s=void 0):3===d&&(r.getContext&&void 0===l?(l=s,s=void 0):(l=s,s=o,o=r,r=void 0));try{const h=$e.create(o,s);l(null,t(h,r,s))}catch(t){l(t)}}ht.create=$e.create,ht.toCanvas=renderCanvas.bind(null,Ae.render),ht.toDataURL=renderCanvas.bind(null,Ae.renderToDataURL),ht.toString=renderCanvas.bind(null,function(t,r,o){return xe.render(t,o)});class GatekeeperCard extends st{static get properties(){return{_hass:{type:Object},_config:{type:Object},_tokens:{type:Array},_modeActive:{type:Boolean},_modeRemaining:{type:String},_guestUrl:{type:String},_qrSvg:{type:String},_loading:{type:Boolean},_newToken:{type:Object},_secretRevealed:{type:Boolean},_showCreateForm:{type:Boolean},_error:{type:String},_info:{type:String}}}constructor(){super(),this._tokens=[],this._modeActive=!1,this._modeRemaining="",this._guestUrl="",this._qrSvg="",this._loadingCount=0,this._loading=!1,this._newToken=null,this._secretRevealed=!1,this._showCreateForm=!1,this._error="",this._info="",this._eventUnsubs=[],this._secretClearTimer=null,this._initialLoadDone=!1}_setLoading(t){this._loadingCount+=t?1:-1,this._loading=this._loadingCount>0}set hass(t){const r=this._hass;this._hass=t,this._readModeStateFromHass(),r||(this._refresh(),this._subscribeToEvents())}connectedCallback(){super.connectedCallback(),this._hass&&0===this._eventUnsubs.length&&this._subscribeToEvents()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeFromEvents(),this._secretClearTimer&&(clearTimeout(this._secretClearTimer),this._secretClearTimer=null)}async _subscribeToEvents(){if(!this._hass?.connection)return;const t=["gatekeeper_token_created","gatekeeper_token_revoked","gatekeeper_mode_started","gatekeeper_mode_ended"];try{for(const r of t){const t=await this._hass.connection.subscribeEvents(()=>this._refresh(),r);this._eventUnsubs.push(t)}}catch(t){this._error="Event subscription failed: "+t.message}}_unsubscribeFromEvents(){for(const t of this._eventUnsubs)try{t()}catch{}this._eventUnsubs=[]}setConfig(t){this._config={title:"Guest Access",show_qr:!0,default_duration:24,mode_entity:"binary_sensor.guest_mode_active",...t}}_readModeStateFromHass(){if(!this._hass||!this._config)return;const t=this._hass.states[this._config.mode_entity];if(!t)return this._modeActive=!1,void(this._modeRemaining="");this._modeActive="on"===t.state;const r=t.attributes?.mode_remaining_seconds;if("number"==typeof r&&r>0){const t=Math.floor(r/3600),o=Math.floor(r%3600/60);this._modeRemaining=t>0?`${t}h ${o}m`:`${o}m`}else this._modeRemaining=""}async _refresh(){if(this._hass){this._setLoading(!0);try{const[t,r]=await Promise.all([this._hass.callWS({type:"call_service",domain:"gatekeeper",service:"get_tokens",return_response:!0}),this._hass.callWS({type:"call_service",domain:"gatekeeper",service:"get_guest_url",return_response:!0})]);if(this._tokens=t?.response?.tokens||[],r?.response?.url){const t=r.response.url;t!==this._guestUrl&&(this._guestUrl=t,this._qrSvg=await this._renderQr(t))}this._readModeStateFromHass(),this._error="",this._initialLoadDone=!0}catch(t){this._error="Failed to load Gatekeeper data: "+t.message}this._setLoading(!1)}}async _createToken(t){t.preventDefault();const r=t.target,o=new FormData(r);this._setLoading(!0),this._newToken=null,this._secretRevealed=!1,this._error="";try{const t={label:o.get("label")||"Guest",duration:parseInt(o.get("duration"),10)||this._config.default_duration,scoped_entities:(o.get("entities")||"light.*").split(",").map(t=>t.trim()),scoped_domains:(o.get("domains")||"light,switch,climate").split(",").map(t=>t.trim()),allowed_services:o.get("services")?o.get("services").split(",").map(t=>t.trim()):null},r=o.get("max_uses");if(null!==r&&""!==r){const o=parseInt(r,10);!Number.isNaN(o)&&o>=0&&(t.max_uses=o)}t.show_wifi="on"===o.get("show_wifi");const s=await this._hass.callWS({type:"call_service",domain:"gatekeeper",service:"create_token",service_data:t,return_response:!0});if(s?.response){this._newToken=s.response,this._scheduleSecretClear();const t=s.response.guest_url||"";t&&t!==this._guestUrl&&(this._guestUrl=t,this._qrSvg=await this._renderQr(t))}this._showCreateForm=!1,await this._refresh()}catch(t){this._error="Failed to create token: "+t.message}this._setLoading(!1)}_scheduleSecretClear(){this._secretClearTimer&&clearTimeout(this._secretClearTimer),this._secretClearTimer=setTimeout(()=>{this._dismissNewToken()},6e4)}_dismissNewToken(){this._newToken=null,this._secretRevealed=!1,this._secretClearTimer&&(clearTimeout(this._secretClearTimer),this._secretClearTimer=null)}async _revokeToken(t){this._setLoading(!0);try{await this._hass.callService("gatekeeper","revoke_token",{token_id:t})}catch(t){this._error="Failed to revoke token: "+t.message}this._setLoading(!1)}async _toggleMode(){this._setLoading(!0);try{if(this._modeActive)await this._hass.callService("gatekeeper","deactivate_mode",{});else{const t={};"number"==typeof this._config.auto_disable_after&&(t.auto_disable_after=this._config.auto_disable_after),await this._hass.callService("gatekeeper","activate_mode",t)}this._readModeStateFromHass()}catch(t){this._error="Failed to toggle guest mode: "+t.message}this._setLoading(!1)}async _renderQr(t){if(!t)return"";try{return await ht.toString(t,{type:"svg",errorCorrectionLevel:"M",margin:1,width:200,color:{dark:"#000000",light:"#ffffff"}})}catch{return""}}async _copyToClipboard(t){if(navigator.clipboard&&window.isSecureContext)try{return await navigator.clipboard.writeText(t),void this._flashInfo("Copied to clipboard")}catch{}try{const r=document.createElement("textarea");r.value=t,r.setAttribute("readonly",""),r.style.position="fixed",r.style.top="-1000px",r.style.opacity="0",document.body.appendChild(r),r.select();const o=document.execCommand("copy");document.body.removeChild(r),o?this._flashInfo("Copied to clipboard"):this._error="Copy failed — select and copy manually."}catch(t){this._error="Copy failed: "+t.message}}_flashInfo(t){this._info=t,setTimeout(()=>{this._info===t&&(this._info="")},2e3)}_shareUrl(t){navigator.share?navigator.share({title:"Guest access",url:t}).catch(()=>{}):this._copyToClipboard(t)}_formatExpiry(t){if(!t)return"--";const r=/Z$|[+-]\d{2}:?\d{2}$/.test(t)?t:t+"Z",o=new Date(r),s=new Date,l=Math.max(0,o-s),h=Math.floor(l/36e5),d=Math.floor(l%36e5/6e4);return h>48?`${Math.floor(h/24)}d ${h%24}h`:`${h}h ${d}m`}_getStatusClass(t){if(!t.is_active)return"status-revoked";const r=/Z$|[+-]\d{2}:?\d{2}$/.test(t.expires_at)?t.expires_at:t.expires_at+"Z",o=new Date(r)-new Date;return o<36e5?"status-expiring":o<864e5?"status-soon":"status-ok"}render(){return this._loading&&!this._initialLoadDone?X`<ha-card><div class="loading">Loading...</div></ha-card>`:X`
      <ha-card>
        <div class="header">
          <h2>${this._config.title}</h2>
          <div class="header-actions">
            <ha-icon-button
              class="refresh-btn"
              title="Refresh"
              @click=${()=>this._refresh()}
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

        ${this._error?X`<div class="error-banner">${this._error}</div>`:""}
        ${this._info?X`<div class="info-banner">${this._info}</div>`:""}

        ${this._modeActive?X`
          <div class="mode-banner active">
            Guest mode active
            ${this._modeRemaining?X`&mdash; ${this._modeRemaining} remaining`:""}
          </div>
        `:X`
          <div class="mode-banner inactive">Guest mode off</div>
        `}

        <div class="section">
          <div class="section-header">
            <h3>Active Tokens (${this._tokens.length})</h3>
            <ha-button
              type="button"
              @click=${()=>this._showCreateForm=!this._showCreateForm}
            >+ New Token</ha-button>
          </div>

          ${this._showCreateForm?this._renderCreateForm():""}
          ${this._newToken?this._renderNewTokenResult():""}

          ${0===this._tokens.length?X`
            <div class="empty-state">No active tokens. Create one to give guests access.</div>
          `:this._tokens.map(t=>this._renderToken(t))}
        </div>

        ${this._guestUrl?X`
          <div class="section qr-section">
            <h3>Guest Access QR</h3>
            <p class="qr-hint">
              Scan with a phone camera. The QR is rendered locally — the link
              and token never leave this browser.
            </p>
            ${this._config.show_qr&&this._qrSvg?X`
              <div class="qr-code">${lt(this._qrSvg)}</div>
            `:""}
            <div class="url-display">
              <input type="text" .value=${this._guestUrl} readonly />
              <ha-button type="button" @click=${()=>this._copyToClipboard(this._guestUrl)}>Copy</ha-button>
              ${navigator.share?X`
                <ha-button type="button" @click=${()=>this._shareUrl(this._guestUrl)}>Share</ha-button>
              `:""}
            </div>
          </div>
        `:""}
      </ha-card>
    `}_renderCreateForm(){return X`
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
        <label class="checkbox-label">
          <input type="checkbox" name="show_wifi" />
          <span>Expose Wi-Fi credentials on the guest page</span>
        </label>
        <div class="form-actions">
          <ha-button type="button" @click=${()=>this._showCreateForm=!1}>Cancel</ha-button>
          <ha-button variant="filled" type="submit">Create Token</ha-button>
        </div>
      </form>
    `}_renderNewTokenResult(){if(!this._newToken)return"";const t=this._secretRevealed?"text":"password";return X`
      <div class="new-token-banner">
        <div class="new-token-header">
          <strong>Token created!</strong>
          <ha-button
            type="button"
            class="dismiss-btn"
            @click=${()=>this._dismissNewToken()}
          >Dismiss</ha-button>
        </div>
        <div class="token-detail">
          <span>Guest URL:</span>
          <input type="text" .value=${this._newToken.guest_url||""} readonly />
          <ha-button type="button" @click=${()=>this._copyToClipboard(this._newToken.guest_url)}>Copy</ha-button>
        </div>
        <div class="token-detail">
          <span>Secret:</span>
          <input type=${t} .value=${this._newToken.secret||""} readonly />
          <ha-button
            type="button"
            @click=${()=>this._secretRevealed=!this._secretRevealed}
          >${this._secretRevealed?"Hide":"Reveal"}</ha-button>
          <ha-button type="button" @click=${()=>this._copyToClipboard(this._newToken.secret)}>Copy</ha-button>
        </div>
        <p class="token-warning">
          This is the only time the secret is shown. Save it now.
          It will auto-dismiss in ${Math.round(60)}s.
        </p>
      </div>
    `}_renderToken(t){const r=this._getStatusClass(t);return X`
      <div class="token-card ${r}">
        <div class="token-info">
          <div class="token-label">${t.label||"Guest"}</div>
          <div class="token-meta">
            Expires ${this._formatExpiry(t.expires_at)}
            ${t.use_count>0?X`&middot; ${t.use_count} uses`:""}
            ${t.max_uses?X`&middot; max ${t.max_uses}`:""}
          </div>
        </div>
        <div class="token-actions">
          <ha-button
            type="button"
            class="revoke-btn"
            @click=${()=>this._revokeToken(t.token_id)}
          >Revoke</ha-button>
        </div>
      </div>
    `}static get styles(){return i$4`
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
      .create-form label.checkbox-label {
        display: flex; align-items: center; gap: 8px;
      }
      .create-form label.checkbox-label span {
        margin-bottom: 0; white-space: normal;
      }
      .create-form label.checkbox-label input {
        width: auto; flex: 0 0 auto; cursor: pointer;
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
    `}}GatekeeperCard.prototype.getCardSize=function(){return 3+Math.max(1,(this._tokens||[]).length)+(this._guestUrl?2:0)},customElements.define("gatekeeper-card",GatekeeperCard),window.customCards=window.customCards||[],window.customCards.push({type:"gatekeeper-card",name:"Gatekeeper",description:"Manage guest access tokens and guest mode",preview:!1});
//# sourceMappingURL=gatekeeper-card.js.map
