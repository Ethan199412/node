if (!self.define) { let e, t = {}; const o = (o, s) => (o = new URL(o + ".js", s).href, t[o] || new Promise((t => { if ("document" in self) { const e = document.createElement("script"); e.src = o, e.onload = t, document.head.appendChild(e) } else e = o, importScripts(o), t() })).then((() => { let e = t[o]; if (!e) throw new Error(`Module ${o} didn’t register its module`); return e }))); self.define = (s, i) => { const l = e || ("document" in self ? document.currentScript.src : "") || location.href; if (t[l]) return; let n = {}; const r = e => o(e, l), d = { module: { uri: l }, exports: n, require: r }; t[l] = Promise.all(s.map((e => d[e] || r(e)))).then((e => (i(...e), n))) } } define(["./workbox-037aaf86"], (function (e) { "use strict"; self.skipWaiting(), e.clientsClaim(), e.precacheAndRoute([{ url: "http://localhost:3001/dist/a7258d3b5ade342cd3b4382a44f30a72.jpg", revision: null }, { url: "http://localhost:3001/dist/bundle.c66f637ee6.js", revision: null }, { url: "http://localhost:3001/dist/index.f62990bd9a25e3f5db80.css", revision: null }, { url: "http://localhost:3001/dist/index.html", revision: "700be13952c2ce0480a52fbdd2aab9ba" }], {}) }));
//# sourceMappingURL=service-worker.js.map
