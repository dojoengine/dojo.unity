export const id = 692;
export const ids = [692];
export const modules = {

/***/ 4692:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getStarknetWindowObject: () => (/* binding */ o4)
/* harmony export */ });
/* harmony import */ var _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7674);
/* harmony import */ var starknet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4058);
/* harmony import */ var _index_d4f30f2e_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3304);
/* harmony import */ var _core_d21d2e96_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4232);
/* harmony import */ var _getStarknetChainId_7c4b3163_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9627);
/* harmony import */ var _index_9bb48f8a_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3440);
var cl = Object.defineProperty;
var hl = (r, e, t) => e in r ? cl(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var He = (r, e, t) => (hl(r, typeof e != "symbol" ? e + "" : e, t), t);






var Ro = { exports: {} }, fn = typeof Reflect == "object" ? Reflect : null, wf = fn && typeof fn.apply == "function" ? fn.apply : function(e, t, i) {
  return Function.prototype.apply.call(e, t, i);
}, Ms;
fn && typeof fn.ownKeys == "function" ? Ms = fn.ownKeys : Object.getOwnPropertySymbols ? Ms = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Ms = function(e) {
  return Object.getOwnPropertyNames(e);
};
function ll(r) {
  console && console.warn && console.warn(r);
}
var Nh = Number.isNaN || function(e) {
  return e !== e;
};
function nt() {
  nt.init.call(this);
}
Ro.exports = nt;
Ro.exports.once = gl;
nt.EventEmitter = nt;
nt.prototype._events = void 0;
nt.prototype._eventsCount = 0;
nt.prototype._maxListeners = void 0;
var _f = 10;
function ra(r) {
  if (typeof r != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
}
Object.defineProperty(nt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return _f;
  },
  set: function(r) {
    if (typeof r != "number" || r < 0 || Nh(r))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    _f = r;
  }
});
nt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
nt.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || Nh(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function Th(r) {
  return r._maxListeners === void 0 ? nt.defaultMaxListeners : r._maxListeners;
}
nt.prototype.getMaxListeners = function() {
  return Th(this);
};
nt.prototype.emit = function(e) {
  for (var t = [], i = 1; i < arguments.length; i++)
    t.push(arguments[i]);
  var n = e === "error", s = this._events;
  if (s !== void 0)
    n = n && s.error === void 0;
  else if (!n)
    return !1;
  if (n) {
    var o;
    if (t.length > 0 && (o = t[0]), o instanceof Error)
      throw o;
    var f = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw f.context = o, f;
  }
  var h = s[e];
  if (h === void 0)
    return !1;
  if (typeof h == "function")
    wf(h, this, t);
  else
    for (var d = h.length, v = qh(h, d), i = 0; i < d; ++i)
      wf(v[i], this, t);
  return !0;
};
function Ch(r, e, t, i) {
  var n, s, o;
  if (ra(t), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), s = r._events), o = s[e]), o === void 0)
    o = s[e] = t, ++r._eventsCount;
  else if (typeof o == "function" ? o = s[e] = i ? [t, o] : [o, t] : i ? o.unshift(t) : o.push(t), n = Th(r), n > 0 && o.length > n && !o.warned) {
    o.warned = !0;
    var f = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    f.name = "MaxListenersExceededWarning", f.emitter = r, f.type = e, f.count = o.length, ll(f);
  }
  return r;
}
nt.prototype.addListener = function(e, t) {
  return Ch(this, e, t, !1);
};
nt.prototype.on = nt.prototype.addListener;
nt.prototype.prependListener = function(e, t) {
  return Ch(this, e, t, !0);
};
function pl() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function $h(r, e, t) {
  var i = { fired: !1, wrapFn: void 0, target: r, type: e, listener: t }, n = pl.bind(i);
  return n.listener = t, i.wrapFn = n, n;
}
nt.prototype.once = function(e, t) {
  return ra(t), this.on(e, $h(this, e, t)), this;
};
nt.prototype.prependOnceListener = function(e, t) {
  return ra(t), this.prependListener(e, $h(this, e, t)), this;
};
nt.prototype.removeListener = function(e, t) {
  var i, n, s, o, f;
  if (ra(t), n = this._events, n === void 0)
    return this;
  if (i = n[e], i === void 0)
    return this;
  if (i === t || i.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, i.listener || t));
  else if (typeof i != "function") {
    for (s = -1, o = i.length - 1; o >= 0; o--)
      if (i[o] === t || i[o].listener === t) {
        f = i[o].listener, s = o;
        break;
      }
    if (s < 0)
      return this;
    s === 0 ? i.shift() : vl(i, s), i.length === 1 && (n[e] = i[0]), n.removeListener !== void 0 && this.emit("removeListener", e, f || t);
  }
  return this;
};
nt.prototype.off = nt.prototype.removeListener;
nt.prototype.removeAllListeners = function(e) {
  var t, i, n;
  if (i = this._events, i === void 0)
    return this;
  if (i.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : i[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete i[e]), this;
  if (arguments.length === 0) {
    var s = Object.keys(i), o;
    for (n = 0; n < s.length; ++n)
      o = s[n], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = i[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (n = t.length - 1; n >= 0; n--)
      this.removeListener(e, t[n]);
  return this;
};
function Lh(r, e, t) {
  var i = r._events;
  if (i === void 0)
    return [];
  var n = i[e];
  return n === void 0 ? [] : typeof n == "function" ? t ? [n.listener || n] : [n] : t ? bl(n) : qh(n, n.length);
}
nt.prototype.listeners = function(e) {
  return Lh(this, e, !0);
};
nt.prototype.rawListeners = function(e) {
  return Lh(this, e, !1);
};
nt.listenerCount = function(r, e) {
  return typeof r.listenerCount == "function" ? r.listenerCount(e) : Fh.call(r, e);
};
nt.prototype.listenerCount = Fh;
function Fh(r) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[r];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
nt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ms(this._events) : [];
};
function qh(r, e) {
  for (var t = new Array(e), i = 0; i < e; ++i)
    t[i] = r[i];
  return t;
}
function vl(r, e) {
  for (; e + 1 < r.length; e++)
    r[e] = r[e + 1];
  r.pop();
}
function bl(r) {
  for (var e = new Array(r.length), t = 0; t < e.length; ++t)
    e[t] = r[t].listener || r[t];
  return e;
}
function gl(r, e) {
  return new Promise(function(t, i) {
    function n(o) {
      r.removeListener(e, s), i(o);
    }
    function s() {
      typeof r.removeListener == "function" && r.removeListener("error", n), t([].slice.call(arguments));
    }
    Uh(r, e, s, { once: !0 }), e !== "error" && yl(r, n, { once: !0 });
  });
}
function yl(r, e, t) {
  typeof r.on == "function" && Uh(r, "error", e, t);
}
function Uh(r, e, t, i) {
  if (typeof r.on == "function")
    i.once ? r.once(e, t) : r.on(e, t);
  else if (typeof r.addEventListener == "function")
    r.addEventListener(e, function n(s) {
      i.once && r.removeEventListener(e, n), t(s);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
}
var ir = Ro.exports;
const zh = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(ir);
var ie = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var ao = function(r, e) {
  return ao = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, i) {
    t.__proto__ = i;
  } || function(t, i) {
    for (var n in i)
      i.hasOwnProperty(n) && (t[n] = i[n]);
  }, ao(r, e);
};
function ml(r, e) {
  ao(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var oo = function() {
  return oo = Object.assign || function(e) {
    for (var t, i = 1, n = arguments.length; i < n; i++) {
      t = arguments[i];
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, oo.apply(this, arguments);
};
function wl(r, e) {
  var t = {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && e.indexOf(i) < 0 && (t[i] = r[i]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(r); n < i.length; n++)
      e.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[n]) && (t[i[n]] = r[i[n]]);
  return t;
}
function _l(r, e, t, i) {
  var n = arguments.length, s = n < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, t) : i, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(r, e, t, i);
  else
    for (var f = r.length - 1; f >= 0; f--)
      (o = r[f]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, t, s) : o(e, t)) || s);
  return n > 3 && s && Object.defineProperty(e, t, s), s;
}
function xl(r, e) {
  return function(t, i) {
    e(t, i, r);
  };
}
function El(r, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(r, e);
}
function Sl(r, e, t, i) {
  function n(s) {
    return s instanceof t ? s : new t(function(o) {
      o(s);
    });
  }
  return new (t || (t = Promise))(function(s, o) {
    function f(v) {
      try {
        d(i.next(v));
      } catch (w) {
        o(w);
      }
    }
    function h(v) {
      try {
        d(i.throw(v));
      } catch (w) {
        o(w);
      }
    }
    function d(v) {
      v.done ? s(v.value) : n(v.value).then(f, h);
    }
    d((i = i.apply(r, e || [])).next());
  });
}
function Ml(r, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, o;
  return o = { next: f(0), throw: f(1), return: f(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function f(d) {
    return function(v) {
      return h([d, v]);
    };
  }
  function h(d) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, n && (s = d[0] & 2 ? n.return : d[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, d[1])).done)
          return s;
        switch (n = 0, s && (d = [d[0] & 2, s.value]), d[0]) {
          case 0:
          case 1:
            s = d;
            break;
          case 4:
            return t.label++, { value: d[1], done: !1 };
          case 5:
            t.label++, n = d[1], d = [0];
            continue;
          case 7:
            d = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (d[0] === 6 || d[0] === 2)) {
              t = 0;
              continue;
            }
            if (d[0] === 3 && (!s || d[1] > s[0] && d[1] < s[3])) {
              t.label = d[1];
              break;
            }
            if (d[0] === 6 && t.label < s[1]) {
              t.label = s[1], s = d;
              break;
            }
            if (s && t.label < s[2]) {
              t.label = s[2], t.ops.push(d);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        d = e.call(r, t);
      } catch (v) {
        d = [6, v], n = 0;
      } finally {
        i = s = 0;
      }
    if (d[0] & 5)
      throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function Il(r, e, t, i) {
  i === void 0 && (i = t), r[i] = e[t];
}
function Al(r, e) {
  for (var t in r)
    t !== "default" && !e.hasOwnProperty(t) && (e[t] = r[t]);
}
function fo(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], i = 0;
  if (t)
    return t.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && i >= r.length && (r = void 0), { value: r && r[i++], done: !r };
      }
    };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Bh(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t)
    return r;
  var i = t.call(r), n, s = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = i.next()).done; )
      s.push(n.value);
  } catch (f) {
    o = { error: f };
  } finally {
    try {
      n && !n.done && (t = i.return) && t.call(i);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return s;
}
function Dl() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r = r.concat(Bh(arguments[e]));
  return r;
}
function Pl() {
  for (var r = 0, e = 0, t = arguments.length; e < t; e++)
    r += arguments[e].length;
  for (var i = Array(r), n = 0, e = 0; e < t; e++)
    for (var s = arguments[e], o = 0, f = s.length; o < f; o++, n++)
      i[n] = s[o];
  return i;
}
function Wn(r) {
  return this instanceof Wn ? (this.v = r, this) : new Wn(r);
}
function Ol(r, e, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = t.apply(r, e || []), n, s = [];
  return n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(A) {
    i[A] && (n[A] = function(I) {
      return new Promise(function(D, N) {
        s.push([A, I, D, N]) > 1 || f(A, I);
      });
    });
  }
  function f(A, I) {
    try {
      h(i[A](I));
    } catch (D) {
      w(s[0][3], D);
    }
  }
  function h(A) {
    A.value instanceof Wn ? Promise.resolve(A.value.v).then(d, v) : w(s[0][2], A);
  }
  function d(A) {
    f("next", A);
  }
  function v(A) {
    f("throw", A);
  }
  function w(A, I) {
    A(I), s.shift(), s.length && f(s[0][0], s[0][1]);
  }
}
function Rl(r) {
  var e, t;
  return e = {}, i("next"), i("throw", function(n) {
    throw n;
  }), i("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function i(n, s) {
    e[n] = r[n] ? function(o) {
      return (t = !t) ? { value: Wn(r[n](o)), done: n === "return" } : s ? s(o) : o;
    } : s;
  }
}
function Nl(r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = r[Symbol.asyncIterator], t;
  return e ? e.call(r) : (r = typeof fo == "function" ? fo(r) : r[Symbol.iterator](), t = {}, i("next"), i("throw"), i("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function i(s) {
    t[s] = r[s] && function(o) {
      return new Promise(function(f, h) {
        o = r[s](o), n(f, h, o.done, o.value);
      });
    };
  }
  function n(s, o, f, h) {
    Promise.resolve(h).then(function(d) {
      s({ value: d, done: f });
    }, o);
  }
}
function Tl(r, e) {
  return Object.defineProperty ? Object.defineProperty(r, "raw", { value: e }) : r.raw = e, r;
}
function Cl(r) {
  if (r && r.__esModule)
    return r;
  var e = {};
  if (r != null)
    for (var t in r)
      Object.hasOwnProperty.call(r, t) && (e[t] = r[t]);
  return e.default = r, e;
}
function $l(r) {
  return r && r.__esModule ? r : { default: r };
}
function Ll(r, e) {
  if (!e.has(r))
    throw new TypeError("attempted to get private field on non-instance");
  return e.get(r);
}
function Fl(r, e, t) {
  if (!e.has(r))
    throw new TypeError("attempted to set private field on non-instance");
  return e.set(r, t), t;
}
const ql = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return oo;
  },
  __asyncDelegator: Rl,
  __asyncGenerator: Ol,
  __asyncValues: Nl,
  __await: Wn,
  __awaiter: Sl,
  __classPrivateFieldGet: Ll,
  __classPrivateFieldSet: Fl,
  __createBinding: Il,
  __decorate: _l,
  __exportStar: Al,
  __extends: ml,
  __generator: Ml,
  __importDefault: $l,
  __importStar: Cl,
  __makeTemplateObject: Tl,
  __metadata: El,
  __param: xl,
  __read: Bh,
  __rest: wl,
  __spread: Dl,
  __spreadArrays: Pl,
  __values: fo
}, Symbol.toStringTag, { value: "Module" })), Qn = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.g)(ql);
var Na = {}, Rn = {}, xf;
function Ul() {
  if (xf)
    return Rn;
  xf = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.delay = void 0;
  function r(e) {
    return new Promise((t) => {
      setTimeout(() => {
        t(!0);
      }, e);
    });
  }
  return Rn.delay = r, Rn;
}
var Oi = {}, Ta = {}, Ri = {}, Ef;
function zl() {
  return Ef || (Ef = 1, Object.defineProperty(Ri, "__esModule", { value: !0 }), Ri.ONE_THOUSAND = Ri.ONE_HUNDRED = void 0, Ri.ONE_HUNDRED = 100, Ri.ONE_THOUSAND = 1e3), Ri;
}
var Ca = {}, Sf;
function Bl() {
  return Sf || (Sf = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.ONE_YEAR = r.FOUR_WEEKS = r.THREE_WEEKS = r.TWO_WEEKS = r.ONE_WEEK = r.THIRTY_DAYS = r.SEVEN_DAYS = r.FIVE_DAYS = r.THREE_DAYS = r.ONE_DAY = r.TWENTY_FOUR_HOURS = r.TWELVE_HOURS = r.SIX_HOURS = r.THREE_HOURS = r.ONE_HOUR = r.SIXTY_MINUTES = r.THIRTY_MINUTES = r.TEN_MINUTES = r.FIVE_MINUTES = r.ONE_MINUTE = r.SIXTY_SECONDS = r.THIRTY_SECONDS = r.TEN_SECONDS = r.FIVE_SECONDS = r.ONE_SECOND = void 0, r.ONE_SECOND = 1, r.FIVE_SECONDS = 5, r.TEN_SECONDS = 10, r.THIRTY_SECONDS = 30, r.SIXTY_SECONDS = 60, r.ONE_MINUTE = r.SIXTY_SECONDS, r.FIVE_MINUTES = r.ONE_MINUTE * 5, r.TEN_MINUTES = r.ONE_MINUTE * 10, r.THIRTY_MINUTES = r.ONE_MINUTE * 30, r.SIXTY_MINUTES = r.ONE_MINUTE * 60, r.ONE_HOUR = r.SIXTY_MINUTES, r.THREE_HOURS = r.ONE_HOUR * 3, r.SIX_HOURS = r.ONE_HOUR * 6, r.TWELVE_HOURS = r.ONE_HOUR * 12, r.TWENTY_FOUR_HOURS = r.ONE_HOUR * 24, r.ONE_DAY = r.TWENTY_FOUR_HOURS, r.THREE_DAYS = r.ONE_DAY * 3, r.FIVE_DAYS = r.ONE_DAY * 5, r.SEVEN_DAYS = r.ONE_DAY * 7, r.THIRTY_DAYS = r.ONE_DAY * 30, r.ONE_WEEK = r.SEVEN_DAYS, r.TWO_WEEKS = r.ONE_WEEK * 2, r.THREE_WEEKS = r.ONE_WEEK * 3, r.FOUR_WEEKS = r.ONE_WEEK * 4, r.ONE_YEAR = r.ONE_DAY * 365;
  }(Ca)), Ca;
}
var Mf;
function kh() {
  return Mf || (Mf = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 });
    const e = Qn;
    e.__exportStar(zl(), r), e.__exportStar(Bl(), r);
  }(Ta)), Ta;
}
var If;
function kl() {
  if (If)
    return Oi;
  If = 1, Object.defineProperty(Oi, "__esModule", { value: !0 }), Oi.fromMiliseconds = Oi.toMiliseconds = void 0;
  const r = kh();
  function e(i) {
    return i * r.ONE_THOUSAND;
  }
  Oi.toMiliseconds = e;
  function t(i) {
    return Math.floor(i / r.ONE_THOUSAND);
  }
  return Oi.fromMiliseconds = t, Oi;
}
var Af;
function jl() {
  return Af || (Af = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 });
    const e = Qn;
    e.__exportStar(Ul(), r), e.__exportStar(kl(), r);
  }(Na)), Na;
}
var tn = {}, Df;
function Kl() {
  if (Df)
    return tn;
  Df = 1, Object.defineProperty(tn, "__esModule", { value: !0 }), tn.Watch = void 0;
  class r {
    constructor() {
      this.timestamps = /* @__PURE__ */ new Map();
    }
    start(t) {
      if (this.timestamps.has(t))
        throw new Error(`Watch already started for label: ${t}`);
      this.timestamps.set(t, { started: Date.now() });
    }
    stop(t) {
      const i = this.get(t);
      if (typeof i.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${t}`);
      const n = Date.now() - i.started;
      this.timestamps.set(t, { started: i.started, elapsed: n });
    }
    get(t) {
      const i = this.timestamps.get(t);
      if (typeof i > "u")
        throw new Error(`No timestamp found for label: ${t}`);
      return i;
    }
    elapsed(t) {
      const i = this.get(t);
      return i.elapsed || Date.now() - i.started;
    }
  }
  return tn.Watch = r, tn.default = r, tn;
}
var $a = {}, Nn = {}, Pf;
function Hl() {
  if (Pf)
    return Nn;
  Pf = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.IWatch = void 0;
  class r {
  }
  return Nn.IWatch = r, Nn;
}
var Of;
function Vl() {
  return Of || (Of = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), Qn.__exportStar(Hl(), r);
  }($a)), $a;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  const e = Qn;
  e.__exportStar(jl(), r), e.__exportStar(Kl(), r), e.__exportStar(Vl(), r), e.__exportStar(kh(), r);
})(ie);
class Wi {
}
let Wl = class extends Wi {
  constructor(e) {
    super();
  }
};
const Rf = ie.FIVE_SECONDS, gn = { pulse: "heartbeat_pulse" };
let Gl = class jh extends Wl {
  constructor(e) {
    super(e), this.events = new ir.EventEmitter(), this.interval = Rf, this.interval = e?.interval || Rf;
  }
  static async init(e) {
    const t = new jh(e);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), ie.toMiliseconds(this.interval));
  }
  pulse() {
    this.events.emit(gn.pulse);
  }
};
const Jl = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Yl = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Xl = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Zl(r, e) {
  if (r === "__proto__" || r === "constructor" && e && typeof e == "object" && "prototype" in e) {
    Ql(r);
    return;
  }
  return e;
}
function Ql(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function ms(r, e = {}) {
  if (typeof r != "string")
    return r;
  const t = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.endsWith('"') && !r.includes("\\")
  )
    return t.slice(1, -1);
  if (t.length <= 9) {
    const i = t.toLowerCase();
    if (i === "true")
      return !0;
    if (i === "false")
      return !1;
    if (i === "undefined")
      return;
    if (i === "null")
      return null;
    if (i === "nan")
      return Number.NaN;
    if (i === "infinity")
      return Number.POSITIVE_INFINITY;
    if (i === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!Xl.test(r)) {
    if (e.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (Jl.test(r) || Yl.test(r)) {
      if (e.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, Zl);
    }
    return JSON.parse(r);
  } catch (i) {
    if (e.strict)
      throw i;
    return r;
  }
}
function e0(r) {
  return !r || typeof r.then != "function" ? Promise.resolve(r) : r;
}
function xt(r, ...e) {
  try {
    return e0(r(...e));
  } catch (t) {
    return Promise.reject(t);
  }
}
function t0(r) {
  const e = typeof r;
  return r === null || e !== "object" && e !== "function";
}
function r0(r) {
  const e = Object.getPrototypeOf(r);
  return !e || e.isPrototypeOf(Object);
}
function Is(r) {
  if (t0(r))
    return String(r);
  if (r0(r) || Array.isArray(r))
    return JSON.stringify(r);
  if (typeof r.toJSON == "function")
    return Is(r.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
const co = "base64:";
function i0(r) {
  return typeof r == "string" ? r : co + a0(r);
}
function n0(r) {
  return typeof r != "string" || !r.startsWith(co) ? r : s0(r.slice(co.length));
}
function s0(r) {
  return globalThis.Buffer ? Buffer.from(r, "base64") : Uint8Array.from(
    globalThis.atob(r),
    (e) => e.codePointAt(0)
  );
}
function a0(r) {
  return globalThis.Buffer ? Buffer.from(r).toString("base64") : globalThis.btoa(String.fromCodePoint(...r));
}
function Wt(r) {
  return r && r.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function o0(...r) {
  return Wt(r.join(":"));
}
function ws(r) {
  return r = Wt(r), r ? r + ":" : "";
}
const f0 = "memory", c0 = () => {
  const r = /* @__PURE__ */ new Map();
  return {
    name: f0,
    getInstance: () => r,
    hasItem(e) {
      return r.has(e);
    },
    getItem(e) {
      return r.get(e) ?? null;
    },
    getItemRaw(e) {
      return r.get(e) ?? null;
    },
    setItem(e, t) {
      r.set(e, t);
    },
    setItemRaw(e, t) {
      r.set(e, t);
    },
    removeItem(e) {
      r.delete(e);
    },
    getKeys() {
      return [...r.keys()];
    },
    clear() {
      r.clear();
    },
    dispose() {
      r.clear();
    }
  };
};
function h0(r = {}) {
  const e = {
    mounts: { "": r.driver || c0() },
    mountpoints: [""],
    watching: !1,
    watchListeners: [],
    unwatch: {}
  }, t = (d) => {
    for (const v of e.mountpoints)
      if (d.startsWith(v))
        return {
          base: v,
          relativeKey: d.slice(v.length),
          driver: e.mounts[v]
        };
    return {
      base: "",
      relativeKey: d,
      driver: e.mounts[""]
    };
  }, i = (d, v) => e.mountpoints.filter(
    (w) => w.startsWith(d) || v && d.startsWith(w)
  ).map((w) => ({
    relativeBase: d.length > w.length ? d.slice(w.length) : void 0,
    mountpoint: w,
    driver: e.mounts[w]
  })), n = (d, v) => {
    if (e.watching) {
      v = Wt(v);
      for (const w of e.watchListeners)
        w(d, v);
    }
  }, s = async () => {
    if (!e.watching) {
      e.watching = !0;
      for (const d in e.mounts)
        e.unwatch[d] = await Nf(
          e.mounts[d],
          n,
          d
        );
    }
  }, o = async () => {
    if (e.watching) {
      for (const d in e.unwatch)
        await e.unwatch[d]();
      e.unwatch = {}, e.watching = !1;
    }
  }, f = (d, v, w) => {
    const A = /* @__PURE__ */ new Map(), I = (D) => {
      let N = A.get(D.base);
      return N || (N = {
        driver: D.driver,
        base: D.base,
        items: []
      }, A.set(D.base, N)), N;
    };
    for (const D of d) {
      const N = typeof D == "string", k = Wt(N ? D : D.key), j = N ? void 0 : D.value, T = N || !D.options ? v : { ...v, ...D.options }, K = t(k);
      I(K).items.push({
        key: k,
        value: j,
        relativeKey: K.relativeKey,
        options: T
      });
    }
    return Promise.all([...A.values()].map((D) => w(D))).then(
      (D) => D.flat()
    );
  }, h = {
    // Item
    hasItem(d, v = {}) {
      d = Wt(d);
      const { relativeKey: w, driver: A } = t(d);
      return xt(A.hasItem, w, v);
    },
    getItem(d, v = {}) {
      d = Wt(d);
      const { relativeKey: w, driver: A } = t(d);
      return xt(A.getItem, w, v).then(
        (I) => ms(I)
      );
    },
    getItems(d, v = {}) {
      return f(d, v, (w) => w.driver.getItems ? xt(
        w.driver.getItems,
        w.items.map((A) => ({
          key: A.relativeKey,
          options: A.options
        })),
        v
      ).then(
        (A) => A.map((I) => ({
          key: o0(w.base, I.key),
          value: ms(I.value)
        }))
      ) : Promise.all(
        w.items.map((A) => xt(
          w.driver.getItem,
          A.relativeKey,
          A.options
        ).then((I) => ({
          key: A.key,
          value: ms(I)
        })))
      ));
    },
    getItemRaw(d, v = {}) {
      d = Wt(d);
      const { relativeKey: w, driver: A } = t(d);
      return A.getItemRaw ? xt(A.getItemRaw, w, v) : xt(A.getItem, w, v).then(
        (I) => n0(I)
      );
    },
    async setItem(d, v, w = {}) {
      if (v === void 0)
        return h.removeItem(d);
      d = Wt(d);
      const { relativeKey: A, driver: I } = t(d);
      I.setItem && (await xt(I.setItem, A, Is(v), w), I.watch || n("update", d));
    },
    async setItems(d, v) {
      await f(d, v, async (w) => {
        if (w.driver.setItems)
          return xt(
            w.driver.setItems,
            w.items.map((A) => ({
              key: A.relativeKey,
              value: Is(A.value),
              options: A.options
            })),
            v
          );
        w.driver.setItem && await Promise.all(
          w.items.map((A) => xt(
            w.driver.setItem,
            A.relativeKey,
            Is(A.value),
            A.options
          ))
        );
      });
    },
    async setItemRaw(d, v, w = {}) {
      if (v === void 0)
        return h.removeItem(d, w);
      d = Wt(d);
      const { relativeKey: A, driver: I } = t(d);
      if (I.setItemRaw)
        await xt(I.setItemRaw, A, v, w);
      else if (I.setItem)
        await xt(I.setItem, A, i0(v), w);
      else
        return;
      I.watch || n("update", d);
    },
    async removeItem(d, v = {}) {
      typeof v == "boolean" && (v = { removeMeta: v }), d = Wt(d);
      const { relativeKey: w, driver: A } = t(d);
      A.removeItem && (await xt(A.removeItem, w, v), (v.removeMeta || v.removeMata) && await xt(A.removeItem, w + "$", v), A.watch || n("remove", d));
    },
    // Meta
    async getMeta(d, v = {}) {
      typeof v == "boolean" && (v = { nativeOnly: v }), d = Wt(d);
      const { relativeKey: w, driver: A } = t(d), I = /* @__PURE__ */ Object.create(null);
      if (A.getMeta && Object.assign(I, await xt(A.getMeta, w, v)), !v.nativeOnly) {
        const D = await xt(
          A.getItem,
          w + "$",
          v
        ).then((N) => ms(N));
        D && typeof D == "object" && (typeof D.atime == "string" && (D.atime = new Date(D.atime)), typeof D.mtime == "string" && (D.mtime = new Date(D.mtime)), Object.assign(I, D));
      }
      return I;
    },
    setMeta(d, v, w = {}) {
      return this.setItem(d + "$", v, w);
    },
    removeMeta(d, v = {}) {
      return this.removeItem(d + "$", v);
    },
    // Keys
    async getKeys(d, v = {}) {
      d = ws(d);
      const w = i(d, !0);
      let A = [];
      const I = [];
      for (const D of w) {
        const N = await xt(
          D.driver.getKeys,
          D.relativeBase,
          v
        );
        for (const k of N) {
          const j = D.mountpoint + Wt(k);
          A.some((T) => j.startsWith(T)) || I.push(j);
        }
        A = [
          D.mountpoint,
          ...A.filter((k) => !k.startsWith(D.mountpoint))
        ];
      }
      return d ? I.filter(
        (D) => D.startsWith(d) && D[D.length - 1] !== "$"
      ) : I.filter((D) => D[D.length - 1] !== "$");
    },
    // Utils
    async clear(d, v = {}) {
      d = ws(d), await Promise.all(
        i(d, !1).map(async (w) => {
          if (w.driver.clear)
            return xt(w.driver.clear, w.relativeBase, v);
          if (w.driver.removeItem) {
            const A = await w.driver.getKeys(w.relativeBase || "", v);
            return Promise.all(
              A.map((I) => w.driver.removeItem(I, v))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(e.mounts).map((d) => Tf(d))
      );
    },
    async watch(d) {
      return await s(), e.watchListeners.push(d), async () => {
        e.watchListeners = e.watchListeners.filter(
          (v) => v !== d
        ), e.watchListeners.length === 0 && await o();
      };
    },
    async unwatch() {
      e.watchListeners = [], await o();
    },
    // Mount
    mount(d, v) {
      if (d = ws(d), d && e.mounts[d])
        throw new Error(`already mounted at ${d}`);
      return d && (e.mountpoints.push(d), e.mountpoints.sort((w, A) => A.length - w.length)), e.mounts[d] = v, e.watching && Promise.resolve(Nf(v, n, d)).then((w) => {
        e.unwatch[d] = w;
      }).catch(console.error), h;
    },
    async unmount(d, v = !0) {
      d = ws(d), !(!d || !e.mounts[d]) && (e.watching && d in e.unwatch && (e.unwatch[d]?.(), delete e.unwatch[d]), v && await Tf(e.mounts[d]), e.mountpoints = e.mountpoints.filter((w) => w !== d), delete e.mounts[d]);
    },
    getMount(d = "") {
      d = Wt(d) + ":";
      const v = t(d);
      return {
        driver: v.driver,
        base: v.base
      };
    },
    getMounts(d = "", v = {}) {
      return d = Wt(d), i(d, v.parents).map((A) => ({
        driver: A.driver,
        base: A.mountpoint
      }));
    },
    // Aliases
    keys: (d, v = {}) => h.getKeys(d, v),
    get: (d, v = {}) => h.getItem(d, v),
    set: (d, v, w = {}) => h.setItem(d, v, w),
    has: (d, v = {}) => h.hasItem(d, v),
    del: (d, v = {}) => h.removeItem(d, v),
    remove: (d, v = {}) => h.removeItem(d, v)
  };
  return h;
}
function Nf(r, e, t) {
  return r.watch ? r.watch((i, n) => e(i, t + n)) : () => {
  };
}
async function Tf(r) {
  typeof r.dispose == "function" && await xt(r.dispose);
}
function Gi(r) {
  return new Promise((e, t) => {
    r.oncomplete = r.onsuccess = () => e(r.result), r.onabort = r.onerror = () => t(r.error);
  });
}
function Kh(r, e) {
  const t = indexedDB.open(r);
  t.onupgradeneeded = () => t.result.createObjectStore(e);
  const i = Gi(t);
  return (n, s) => i.then((o) => s(o.transaction(e, n).objectStore(e)));
}
let La;
function es() {
  return La || (La = Kh("keyval-store", "keyval")), La;
}
function Cf(r, e = es()) {
  return e("readonly", (t) => Gi(t.get(r)));
}
function u0(r, e, t = es()) {
  return t("readwrite", (i) => (i.put(e, r), Gi(i.transaction)));
}
function d0(r, e = es()) {
  return e("readwrite", (t) => (t.delete(r), Gi(t.transaction)));
}
function l0(r = es()) {
  return r("readwrite", (e) => (e.clear(), Gi(e.transaction)));
}
function p0(r, e) {
  return r.openCursor().onsuccess = function() {
    this.result && (e(this.result), this.result.continue());
  }, Gi(r.transaction);
}
function v0(r = es()) {
  return r("readonly", (e) => {
    if (e.getAllKeys)
      return Gi(e.getAllKeys());
    const t = [];
    return p0(e, (i) => t.push(i.key)).then(() => t);
  });
}
const b0 = (r) => JSON.stringify(r, (e, t) => typeof t == "bigint" ? t.toString() + "n" : t), g0 = (r) => {
  const e = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, t = r.replace(e, '$1"$2n"$3');
  return JSON.parse(t, (i, n) => typeof n == "string" && n.match(/^\d+n$/) ? BigInt(n.substring(0, n.length - 1)) : n);
};
function un(r) {
  if (typeof r != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof r}`);
  try {
    return g0(r);
  } catch {
    return r;
  }
}
function ji(r) {
  return typeof r == "string" ? r : b0(r) || "";
}
const y0 = "idb-keyval";
var m0 = (r = {}) => {
  const e = r.base && r.base.length > 0 ? `${r.base}:` : "", t = (n) => e + n;
  let i;
  return r.dbName && r.storeName && (i = Kh(r.dbName, r.storeName)), { name: y0, options: r, async hasItem(n) {
    return !(typeof await Cf(t(n), i) > "u");
  }, async getItem(n) {
    return await Cf(t(n), i) ?? null;
  }, setItem(n, s) {
    return u0(t(n), s, i);
  }, removeItem(n) {
    return d0(t(n), i);
  }, getKeys() {
    return v0(i);
  }, clear() {
    return l0(i);
  } };
};
const w0 = "WALLET_CONNECT_V2_INDEXED_DB", _0 = "keyvaluestorage";
let x0 = class {
  constructor() {
    this.indexedDb = h0({ driver: m0({ dbName: w0, storeName: _0 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((e) => [e.key, e.value]);
  }
  async getItem(e) {
    const t = await this.indexedDb.getItem(e);
    if (t !== null)
      return t;
  }
  async setItem(e, t) {
    await this.indexedDb.setItem(e, ji(t));
  }
  async removeItem(e) {
    await this.indexedDb.removeItem(e);
  }
};
var Fa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, As = { exports: {} };
(function() {
  let r;
  function e() {
  }
  r = e, r.prototype.getItem = function(t) {
    return this.hasOwnProperty(t) ? String(this[t]) : null;
  }, r.prototype.setItem = function(t, i) {
    this[t] = String(i);
  }, r.prototype.removeItem = function(t) {
    delete this[t];
  }, r.prototype.clear = function() {
    const t = this;
    Object.keys(t).forEach(function(i) {
      t[i] = void 0, delete t[i];
    });
  }, r.prototype.key = function(t) {
    return t = t || 0, Object.keys(this)[t];
  }, r.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof Fa < "u" && Fa.localStorage ? As.exports = Fa.localStorage : typeof window < "u" && window.localStorage ? As.exports = window.localStorage : As.exports = new e();
})();
function E0(r) {
  var e;
  return [r[0], un((e = r[1]) != null ? e : "")];
}
let S0 = class {
  constructor() {
    this.localStorage = As.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(E0);
  }
  async getItem(e) {
    const t = this.localStorage.getItem(e);
    if (t !== null)
      return un(t);
  }
  async setItem(e, t) {
    this.localStorage.setItem(e, ji(t));
  }
  async removeItem(e) {
    this.localStorage.removeItem(e);
  }
};
const M0 = "wc_storage_version", $f = 1, I0 = async (r, e, t) => {
  const i = M0, n = await e.getItem(i);
  if (n && n >= $f) {
    t(e);
    return;
  }
  const s = await r.getKeys();
  if (!s.length) {
    t(e);
    return;
  }
  const o = [];
  for (; s.length; ) {
    const f = s.shift();
    if (!f)
      continue;
    const h = f.toLowerCase();
    if (h.includes("wc@") || h.includes("walletconnect") || h.includes("wc_") || h.includes("wallet_connect")) {
      const d = await r.getItem(f);
      await e.setItem(f, d), o.push(f);
    }
  }
  await e.setItem(i, $f), t(e), A0(r, o);
}, A0 = async (r, e) => {
  e.length && e.forEach(async (t) => {
    await r.removeItem(t);
  });
};
let D0 = class {
  constructor() {
    this.initialized = !1, this.setInitialized = (t) => {
      this.storage = t, this.initialized = !0;
    };
    const e = new S0();
    this.storage = e;
    try {
      const t = new x0();
      I0(e, t, this.setInitialized);
    } catch {
      this.initialized = !0;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(e) {
    return await this.initialize(), this.storage.getItem(e);
  }
  async setItem(e, t) {
    return await this.initialize(), this.storage.setItem(e, t);
  }
  async removeItem(e) {
    return await this.initialize(), this.storage.removeItem(e);
  }
  async initialize() {
    this.initialized || await new Promise((e) => {
      const t = setInterval(() => {
        this.initialized && (clearInterval(t), e());
      }, 20);
    });
  }
};
function P0(r) {
  try {
    return JSON.stringify(r);
  } catch {
    return '"[Circular]"';
  }
}
var O0 = R0;
function R0(r, e, t) {
  var i = t && t.stringify || P0, n = 1;
  if (typeof r == "object" && r !== null) {
    var s = e.length + n;
    if (s === 1)
      return r;
    var o = new Array(s);
    o[0] = i(r);
    for (var f = 1; f < s; f++)
      o[f] = i(e[f]);
    return o.join(" ");
  }
  if (typeof r != "string")
    return r;
  var h = e.length;
  if (h === 0)
    return r;
  for (var d = "", v = 1 - n, w = -1, A = r && r.length || 0, I = 0; I < A; ) {
    if (r.charCodeAt(I) === 37 && I + 1 < A) {
      switch (w = w > -1 ? w : 0, r.charCodeAt(I + 1)) {
        case 100:
        case 102:
          if (v >= h || e[v] == null)
            break;
          w < I && (d += r.slice(w, I)), d += Number(e[v]), w = I + 2, I++;
          break;
        case 105:
          if (v >= h || e[v] == null)
            break;
          w < I && (d += r.slice(w, I)), d += Math.floor(Number(e[v])), w = I + 2, I++;
          break;
        case 79:
        case 111:
        case 106:
          if (v >= h || e[v] === void 0)
            break;
          w < I && (d += r.slice(w, I));
          var D = typeof e[v];
          if (D === "string") {
            d += "'" + e[v] + "'", w = I + 2, I++;
            break;
          }
          if (D === "function") {
            d += e[v].name || "<anonymous>", w = I + 2, I++;
            break;
          }
          d += i(e[v]), w = I + 2, I++;
          break;
        case 115:
          if (v >= h)
            break;
          w < I && (d += r.slice(w, I)), d += String(e[v]), w = I + 2, I++;
          break;
        case 37:
          w < I && (d += r.slice(w, I)), d += "%", w = I + 2, I++, v--;
          break;
      }
      ++v;
    }
    ++I;
  }
  return w === -1 ? r : (w < A && (d += r.slice(w)), d);
}
const Lf = O0;
var an = $r;
const Gn = B0().console || {}, N0 = {
  mapHttpRequest: _s,
  mapHttpResponse: _s,
  wrapRequestSerializer: qa,
  wrapResponseSerializer: qa,
  wrapErrorSerializer: qa,
  req: _s,
  res: _s,
  err: F0
};
function T0(r, e) {
  return Array.isArray(r) ? r.filter(function(i) {
    return i !== "!stdSerializers.err";
  }) : r === !0 ? Object.keys(e) : !1;
}
function $r(r) {
  r = r || {}, r.browser = r.browser || {};
  const e = r.browser.transmit;
  if (e && typeof e.send != "function")
    throw Error("pino: transmit option must have a send function");
  const t = r.browser.write || Gn;
  r.browser.write && (r.browser.asObject = !0);
  const i = r.serializers || {}, n = T0(r.browser.serialize, i);
  let s = r.browser.serialize;
  Array.isArray(r.browser.serialize) && r.browser.serialize.indexOf("!stdSerializers.err") > -1 && (s = !1);
  const o = ["error", "fatal", "warn", "info", "debug", "trace"];
  typeof t == "function" && (t.error = t.fatal = t.warn = t.info = t.debug = t.trace = t), r.enabled === !1 && (r.level = "silent");
  const f = r.level || "info", h = Object.create(t);
  h.log || (h.log = Jn), Object.defineProperty(h, "levelVal", {
    get: v
  }), Object.defineProperty(h, "level", {
    get: w,
    set: A
  });
  const d = {
    transmit: e,
    serialize: n,
    asObject: r.browser.asObject,
    levels: o,
    timestamp: q0(r)
  };
  h.levels = $r.levels, h.level = f, h.setMaxListeners = h.getMaxListeners = h.emit = h.addListener = h.on = h.prependListener = h.once = h.prependOnceListener = h.removeListener = h.removeAllListeners = h.listeners = h.listenerCount = h.eventNames = h.write = h.flush = Jn, h.serializers = i, h._serialize = n, h._stdErrSerialize = s, h.child = I, e && (h._logEvent = ho());
  function v() {
    return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
  }
  function w() {
    return this._level;
  }
  function A(D) {
    if (D !== "silent" && !this.levels.values[D])
      throw Error("unknown level " + D);
    this._level = D, rn(d, h, "error", "log"), rn(d, h, "fatal", "error"), rn(d, h, "warn", "error"), rn(d, h, "info", "log"), rn(d, h, "debug", "log"), rn(d, h, "trace", "log");
  }
  function I(D, N) {
    if (!D)
      throw new Error("missing bindings for child Pino");
    N = N || {}, n && D.serializers && (N.serializers = D.serializers);
    const k = N.serializers;
    if (n && k) {
      var j = Object.assign({}, i, k), T = r.browser.serialize === !0 ? Object.keys(j) : n;
      delete D.serializers, ia([D], T, j, this._stdErrSerialize);
    }
    function K($) {
      this._childLevel = ($._childLevel | 0) + 1, this.error = nn($, D, "error"), this.fatal = nn($, D, "fatal"), this.warn = nn($, D, "warn"), this.info = nn($, D, "info"), this.debug = nn($, D, "debug"), this.trace = nn($, D, "trace"), j && (this.serializers = j, this._serialize = T), e && (this._logEvent = ho(
        [].concat($._logEvent.bindings, D)
      ));
    }
    return K.prototype = this, new K(this);
  }
  return h;
}
$r.levels = {
  values: {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10
  },
  labels: {
    10: "trace",
    20: "debug",
    30: "info",
    40: "warn",
    50: "error",
    60: "fatal"
  }
};
$r.stdSerializers = N0;
$r.stdTimeFunctions = Object.assign({}, { nullTime: Hh, epochTime: Vh, unixTime: U0, isoTime: z0 });
function rn(r, e, t, i) {
  const n = Object.getPrototypeOf(e);
  e[t] = e.levelVal > e.levels.values[t] ? Jn : n[t] ? n[t] : Gn[t] || Gn[i] || Jn, C0(r, e, t);
}
function C0(r, e, t) {
  !r.transmit && e[t] === Jn || (e[t] = function(i) {
    return function() {
      const s = r.timestamp(), o = new Array(arguments.length), f = Object.getPrototypeOf && Object.getPrototypeOf(this) === Gn ? Gn : this;
      for (var h = 0; h < o.length; h++)
        o[h] = arguments[h];
      if (r.serialize && !r.asObject && ia(o, this._serialize, this.serializers, this._stdErrSerialize), r.asObject ? i.call(f, $0(this, t, o, s)) : i.apply(f, o), r.transmit) {
        const d = r.transmit.level || e.level, v = $r.levels.values[d], w = $r.levels.values[t];
        if (w < v)
          return;
        L0(this, {
          ts: s,
          methodLevel: t,
          methodValue: w,
          transmitLevel: d,
          transmitValue: $r.levels.values[r.transmit.level || e.level],
          send: r.transmit.send,
          val: e.levelVal
        }, o);
      }
    };
  }(e[t]));
}
function $0(r, e, t, i) {
  r._serialize && ia(t, r._serialize, r.serializers, r._stdErrSerialize);
  const n = t.slice();
  let s = n[0];
  const o = {};
  i && (o.time = i), o.level = $r.levels.values[e];
  let f = (r._childLevel | 0) + 1;
  if (f < 1 && (f = 1), s !== null && typeof s == "object") {
    for (; f-- && typeof n[0] == "object"; )
      Object.assign(o, n.shift());
    s = n.length ? Lf(n.shift(), n) : void 0;
  } else
    typeof s == "string" && (s = Lf(n.shift(), n));
  return s !== void 0 && (o.msg = s), o;
}
function ia(r, e, t, i) {
  for (const n in r)
    if (i && r[n] instanceof Error)
      r[n] = $r.stdSerializers.err(r[n]);
    else if (typeof r[n] == "object" && !Array.isArray(r[n]))
      for (const s in r[n])
        e && e.indexOf(s) > -1 && s in t && (r[n][s] = t[s](r[n][s]));
}
function nn(r, e, t) {
  return function() {
    const i = new Array(1 + arguments.length);
    i[0] = e;
    for (var n = 1; n < i.length; n++)
      i[n] = arguments[n - 1];
    return r[t].apply(this, i);
  };
}
function L0(r, e, t) {
  const i = e.send, n = e.ts, s = e.methodLevel, o = e.methodValue, f = e.val, h = r._logEvent.bindings;
  ia(
    t,
    r._serialize || Object.keys(r.serializers),
    r.serializers,
    r._stdErrSerialize === void 0 ? !0 : r._stdErrSerialize
  ), r._logEvent.ts = n, r._logEvent.messages = t.filter(function(d) {
    return h.indexOf(d) === -1;
  }), r._logEvent.level.label = s, r._logEvent.level.value = o, i(s, r._logEvent, f), r._logEvent = ho(h);
}
function ho(r) {
  return {
    ts: 0,
    messages: [],
    bindings: r || [],
    level: { label: "", value: 0 }
  };
}
function F0(r) {
  const e = {
    type: r.constructor.name,
    msg: r.message,
    stack: r.stack
  };
  for (const t in r)
    e[t] === void 0 && (e[t] = r[t]);
  return e;
}
function q0(r) {
  return typeof r.timestamp == "function" ? r.timestamp : r.timestamp === !1 ? Hh : Vh;
}
function _s() {
  return {};
}
function qa(r) {
  return r;
}
function Jn() {
}
function Hh() {
  return !1;
}
function Vh() {
  return Date.now();
}
function U0() {
  return Math.round(Date.now() / 1e3);
}
function z0() {
  return new Date(Date.now()).toISOString();
}
function B0() {
  function r(e) {
    return typeof e < "u" && e;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
      get: function() {
        return delete Object.prototype.globalThis, this.globalThis = this;
      },
      configurable: !0
    }), globalThis;
  } catch {
    return r(self) || r(window) || r(this) || {};
  }
}
const na = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(an), k0 = { level: "info" }, ts = "custom_context", No = 1e3 * 1024;
let j0 = class {
  constructor(e) {
    this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
}, Ff = class {
  constructor(e) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
  }
  append(e) {
    const t = new j0(e);
    if (t.size > this.maxSizeInBytes)
      throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${t.size}`);
    for (; this.size + t.size > this.maxSizeInBytes; )
      this.shift();
    this.head ? (this.tail && (this.tail.next = t), this.tail = t) : (this.head = t, this.tail = t), this.lengthInNodes++, this.sizeInBytes += t.size;
  }
  shift() {
    if (!this.head)
      return;
    const e = this.head;
    this.head = this.head.next, this.head || (this.tail = null), this.lengthInNodes--, this.sizeInBytes -= e.size;
  }
  toArray() {
    const e = [];
    let t = this.head;
    for (; t !== null; )
      e.push(t.value), t = t.next;
    return e;
  }
  get length() {
    return this.lengthInNodes;
  }
  get size() {
    return this.sizeInBytes;
  }
  toOrderedArray() {
    return Array.from(this);
  }
  [Symbol.iterator]() {
    let e = this.head;
    return { next: () => {
      if (!e)
        return { done: !0, value: null };
      const t = e.value;
      return e = e.next, { done: !1, value: t };
    } };
  }
}, Wh = class {
  constructor(e, t = No) {
    this.level = e ?? "error", this.levelValue = an.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new Ff(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e, t) {
    t === an.levels.values.error ? console.error(e) : t === an.levels.values.warn ? console.warn(e) : t === an.levels.values.debug ? console.debug(e) : t === an.levels.values.trace ? console.trace(e) : console.log(e);
  }
  appendToLogs(e) {
    this.logs.append(ji({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e }));
    const t = typeof e == "string" ? JSON.parse(e).level : e.level;
    t >= this.levelValue && this.forwardToConsole(e, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new Ff(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e) {
    const t = this.getLogArray();
    return t.push(ji({ extraMetadata: e })), new Blob(t, { type: "application/json" });
  }
};
class K0 {
  constructor(e, t = No) {
    this.baseChunkLogger = new Wh(e, t);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
  downloadLogsBlobInBrowser(e) {
    const t = URL.createObjectURL(this.logsToBlob(e)), i = document.createElement("a");
    i.href = t, i.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(t);
  }
}
class H0 {
  constructor(e, t = No) {
    this.baseChunkLogger = new Wh(e, t);
  }
  write(e) {
    this.baseChunkLogger.appendToLogs(e);
  }
  getLogs() {
    return this.baseChunkLogger.getLogs();
  }
  clearLogs() {
    this.baseChunkLogger.clearLogs();
  }
  getLogArray() {
    return this.baseChunkLogger.getLogArray();
  }
  logsToBlob(e) {
    return this.baseChunkLogger.logsToBlob(e);
  }
}
var V0 = Object.defineProperty, W0 = Object.defineProperties, G0 = Object.getOwnPropertyDescriptors, qf = Object.getOwnPropertySymbols, J0 = Object.prototype.hasOwnProperty, Y0 = Object.prototype.propertyIsEnumerable, Uf = (r, e, t) => e in r ? V0(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Ls = (r, e) => {
  for (var t in e || (e = {}))
    J0.call(e, t) && Uf(r, t, e[t]);
  if (qf)
    for (var t of qf(e))
      Y0.call(e, t) && Uf(r, t, e[t]);
  return r;
}, Fs = (r, e) => W0(r, G0(e));
function To(r) {
  return Fs(Ls({}, r), { level: r?.level || k0.level });
}
function X0(r, e = ts) {
  return r[e] || "";
}
function Z0(r, e, t = ts) {
  return r[t] = e, r;
}
function Zt(r, e = ts) {
  let t = "";
  return typeof r.bindings > "u" ? t = X0(r, e) : t = r.bindings().context || "", t;
}
function Q0(r, e, t = ts) {
  const i = Zt(r, t);
  return i.trim() ? `${i}/${e}` : e;
}
function kt(r, e, t = ts) {
  const i = Q0(r, e, t), n = r.child({ context: i });
  return Z0(n, i, t);
}
function ep(r) {
  var e, t;
  const i = new K0((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
  return { logger: na(Fs(Ls({}, r.opts), { level: "trace", browser: Fs(Ls({}, (t = r.opts) == null ? void 0 : t.browser), { write: (n) => i.write(n) }) })), chunkLoggerController: i };
}
function tp(r) {
  var e;
  const t = new H0((e = r.opts) == null ? void 0 : e.level, r.maxSizeInBytes);
  return { logger: na(Fs(Ls({}, r.opts), { level: "trace" }), t), chunkLoggerController: t };
}
function rp(r) {
  return typeof r.loggerOverride < "u" && typeof r.loggerOverride != "string" ? { logger: r.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? ep(r) : tp(r);
}
let ip = class extends Wi {
  constructor(e) {
    super(), this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, np = class extends Wi {
  constructor(e, t) {
    super(), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
class sp {
  constructor(e, t) {
    this.logger = e, this.core = t;
  }
}
let ap = class extends Wi {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
};
class op extends Wi {
  constructor(e) {
    super();
  }
}
class fp {
  constructor(e, t, i, n) {
    this.core = e, this.logger = t, this.name = i;
  }
}
let cp = class extends Wi {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}, hp = class extends Wi {
  constructor(e, t) {
    super(), this.core = e, this.logger = t;
  }
}, up = class {
  constructor(e, t, i) {
    this.core = e, this.logger = t, this.store = i;
  }
}, dp = class {
  constructor(e, t) {
    this.projectId = e, this.logger = t;
  }
}, lp = class {
  constructor(e, t, i) {
    this.core = e, this.logger = t, this.telemetryEnabled = i;
  }
}, pp = class {
  constructor(e) {
    this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, vp = class {
  constructor(e) {
    this.client = e;
  }
};
var Co = {}, Ei = {}, sa = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.BrowserRandomSource = void 0;
const zf = 65536;
class bp {
  constructor() {
    this.isAvailable = !1, this.isInstantiated = !1;
    const e = typeof self < "u" ? self.crypto || self.msCrypto : null;
    e && e.getRandomValues !== void 0 && (this._crypto = e, this.isAvailable = !0, this.isInstantiated = !0);
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Browser random byte generator is not available.");
    const t = new Uint8Array(e);
    for (let i = 0; i < t.length; i += zf)
      this._crypto.getRandomValues(t.subarray(i, i + Math.min(t.length - i, zf)));
    return t;
  }
}
aa.BrowserRandomSource = bp;
function gp(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var oa = {}, nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
function yp(r) {
  for (var e = 0; e < r.length; e++)
    r[e] = 0;
  return r;
}
nr.wipe = yp;
const mp = {}, wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mp
}, Symbol.toStringTag, { value: "Module" })), fa = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.g)(wp);
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.NodeRandomSource = void 0;
const _p = nr;
class xp {
  constructor() {
    if (this.isAvailable = !1, this.isInstantiated = !1, typeof gp < "u") {
      const e = fa;
      e && e.randomBytes && (this._crypto = e, this.isAvailable = !0, this.isInstantiated = !0);
    }
  }
  randomBytes(e) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Node.js random byte generator is not available.");
    let t = this._crypto.randomBytes(e);
    if (t.length !== e)
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    const i = new Uint8Array(e);
    for (let n = 0; n < i.length; n++)
      i[n] = t[n];
    return (0, _p.wipe)(t), i;
  }
}
oa.NodeRandomSource = xp;
Object.defineProperty(sa, "__esModule", { value: !0 });
sa.SystemRandomSource = void 0;
const Ep = aa, Sp = oa;
class Mp {
  constructor() {
    if (this.isAvailable = !1, this.name = "", this._source = new Ep.BrowserRandomSource(), this._source.isAvailable) {
      this.isAvailable = !0, this.name = "Browser";
      return;
    }
    if (this._source = new Sp.NodeRandomSource(), this._source.isAvailable) {
      this.isAvailable = !0, this.name = "Node";
      return;
    }
  }
  randomBytes(e) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    return this._source.randomBytes(e);
  }
}
sa.SystemRandomSource = Mp;
var Ve = {}, Gh = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  function e(f, h) {
    var d = f >>> 16 & 65535, v = f & 65535, w = h >>> 16 & 65535, A = h & 65535;
    return v * A + (d * A + v * w << 16 >>> 0) | 0;
  }
  r.mul = Math.imul || e;
  function t(f, h) {
    return f + h | 0;
  }
  r.add = t;
  function i(f, h) {
    return f - h | 0;
  }
  r.sub = i;
  function n(f, h) {
    return f << h | f >>> 32 - h;
  }
  r.rotl = n;
  function s(f, h) {
    return f << 32 - h | f >>> h;
  }
  r.rotr = s;
  function o(f) {
    return typeof f == "number" && isFinite(f) && Math.floor(f) === f;
  }
  r.isInteger = Number.isInteger || o, r.MAX_SAFE_INTEGER = 9007199254740991, r.isSafeInteger = function(f) {
    return r.isInteger(f) && f >= -r.MAX_SAFE_INTEGER && f <= r.MAX_SAFE_INTEGER;
  };
})(Gh);
Object.defineProperty(Ve, "__esModule", { value: !0 });
var Jh = Gh;
function Ip(r, e) {
  return e === void 0 && (e = 0), (r[e + 0] << 8 | r[e + 1]) << 16 >> 16;
}
Ve.readInt16BE = Ip;
function Ap(r, e) {
  return e === void 0 && (e = 0), (r[e + 0] << 8 | r[e + 1]) >>> 0;
}
Ve.readUint16BE = Ap;
function Dp(r, e) {
  return e === void 0 && (e = 0), (r[e + 1] << 8 | r[e]) << 16 >> 16;
}
Ve.readInt16LE = Dp;
function Pp(r, e) {
  return e === void 0 && (e = 0), (r[e + 1] << 8 | r[e]) >>> 0;
}
Ve.readUint16LE = Pp;
function Yh(r, e, t) {
  return e === void 0 && (e = new Uint8Array(2)), t === void 0 && (t = 0), e[t + 0] = r >>> 8, e[t + 1] = r >>> 0, e;
}
Ve.writeUint16BE = Yh;
Ve.writeInt16BE = Yh;
function Xh(r, e, t) {
  return e === void 0 && (e = new Uint8Array(2)), t === void 0 && (t = 0), e[t + 0] = r >>> 0, e[t + 1] = r >>> 8, e;
}
Ve.writeUint16LE = Xh;
Ve.writeInt16LE = Xh;
function uo(r, e) {
  return e === void 0 && (e = 0), r[e] << 24 | r[e + 1] << 16 | r[e + 2] << 8 | r[e + 3];
}
Ve.readInt32BE = uo;
function lo(r, e) {
  return e === void 0 && (e = 0), (r[e] << 24 | r[e + 1] << 16 | r[e + 2] << 8 | r[e + 3]) >>> 0;
}
Ve.readUint32BE = lo;
function po(r, e) {
  return e === void 0 && (e = 0), r[e + 3] << 24 | r[e + 2] << 16 | r[e + 1] << 8 | r[e];
}
Ve.readInt32LE = po;
function vo(r, e) {
  return e === void 0 && (e = 0), (r[e + 3] << 24 | r[e + 2] << 16 | r[e + 1] << 8 | r[e]) >>> 0;
}
Ve.readUint32LE = vo;
function qs(r, e, t) {
  return e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0), e[t + 0] = r >>> 24, e[t + 1] = r >>> 16, e[t + 2] = r >>> 8, e[t + 3] = r >>> 0, e;
}
Ve.writeUint32BE = qs;
Ve.writeInt32BE = qs;
function Us(r, e, t) {
  return e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0), e[t + 0] = r >>> 0, e[t + 1] = r >>> 8, e[t + 2] = r >>> 16, e[t + 3] = r >>> 24, e;
}
Ve.writeUint32LE = Us;
Ve.writeInt32LE = Us;
function Op(r, e) {
  e === void 0 && (e = 0);
  var t = uo(r, e), i = uo(r, e + 4);
  return t * 4294967296 + i - (i >> 31) * 4294967296;
}
Ve.readInt64BE = Op;
function Rp(r, e) {
  e === void 0 && (e = 0);
  var t = lo(r, e), i = lo(r, e + 4);
  return t * 4294967296 + i;
}
Ve.readUint64BE = Rp;
function Np(r, e) {
  e === void 0 && (e = 0);
  var t = po(r, e), i = po(r, e + 4);
  return i * 4294967296 + t - (t >> 31) * 4294967296;
}
Ve.readInt64LE = Np;
function Tp(r, e) {
  e === void 0 && (e = 0);
  var t = vo(r, e), i = vo(r, e + 4);
  return i * 4294967296 + t;
}
Ve.readUint64LE = Tp;
function Zh(r, e, t) {
  return e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0), qs(r / 4294967296 >>> 0, e, t), qs(r >>> 0, e, t + 4), e;
}
Ve.writeUint64BE = Zh;
Ve.writeInt64BE = Zh;
function Qh(r, e, t) {
  return e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0), Us(r >>> 0, e, t), Us(r / 4294967296 >>> 0, e, t + 4), e;
}
Ve.writeUint64LE = Qh;
Ve.writeInt64LE = Qh;
function Cp(r, e, t) {
  if (t === void 0 && (t = 0), r % 8 !== 0)
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  if (r / 8 > e.length - t)
    throw new Error("readUintBE: array is too short for the given bitLength");
  for (var i = 0, n = 1, s = r / 8 + t - 1; s >= t; s--)
    i += e[s] * n, n *= 256;
  return i;
}
Ve.readUintBE = Cp;
function $p(r, e, t) {
  if (t === void 0 && (t = 0), r % 8 !== 0)
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  if (r / 8 > e.length - t)
    throw new Error("readUintLE: array is too short for the given bitLength");
  for (var i = 0, n = 1, s = t; s < t + r / 8; s++)
    i += e[s] * n, n *= 256;
  return i;
}
Ve.readUintLE = $p;
function Lp(r, e, t, i) {
  if (t === void 0 && (t = new Uint8Array(r / 8)), i === void 0 && (i = 0), r % 8 !== 0)
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  if (!Jh.isSafeInteger(e))
    throw new Error("writeUintBE value must be an integer");
  for (var n = 1, s = r / 8 + i - 1; s >= i; s--)
    t[s] = e / n & 255, n *= 256;
  return t;
}
Ve.writeUintBE = Lp;
function Fp(r, e, t, i) {
  if (t === void 0 && (t = new Uint8Array(r / 8)), i === void 0 && (i = 0), r % 8 !== 0)
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  if (!Jh.isSafeInteger(e))
    throw new Error("writeUintLE value must be an integer");
  for (var n = 1, s = i; s < i + r / 8; s++)
    t[s] = e / n & 255, n *= 256;
  return t;
}
Ve.writeUintLE = Fp;
function qp(r, e) {
  e === void 0 && (e = 0);
  var t = new DataView(r.buffer, r.byteOffset, r.byteLength);
  return t.getFloat32(e);
}
Ve.readFloat32BE = qp;
function Up(r, e) {
  e === void 0 && (e = 0);
  var t = new DataView(r.buffer, r.byteOffset, r.byteLength);
  return t.getFloat32(e, !0);
}
Ve.readFloat32LE = Up;
function zp(r, e) {
  e === void 0 && (e = 0);
  var t = new DataView(r.buffer, r.byteOffset, r.byteLength);
  return t.getFloat64(e);
}
Ve.readFloat64BE = zp;
function Bp(r, e) {
  e === void 0 && (e = 0);
  var t = new DataView(r.buffer, r.byteOffset, r.byteLength);
  return t.getFloat64(e, !0);
}
Ve.readFloat64LE = Bp;
function kp(r, e, t) {
  e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.setFloat32(t, r), e;
}
Ve.writeFloat32BE = kp;
function jp(r, e, t) {
  e === void 0 && (e = new Uint8Array(4)), t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.setFloat32(t, r, !0), e;
}
Ve.writeFloat32LE = jp;
function Kp(r, e, t) {
  e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.setFloat64(t, r), e;
}
Ve.writeFloat64BE = Kp;
function Hp(r, e, t) {
  e === void 0 && (e = new Uint8Array(8)), t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.setFloat64(t, r, !0), e;
}
Ve.writeFloat64LE = Hp;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.randomStringForEntropy = r.randomString = r.randomUint32 = r.randomBytes = r.defaultRandomSource = void 0;
  const e = sa, t = Ve, i = nr;
  r.defaultRandomSource = new e.SystemRandomSource();
  function n(d, v = r.defaultRandomSource) {
    return v.randomBytes(d);
  }
  r.randomBytes = n;
  function s(d = r.defaultRandomSource) {
    const v = n(4, d), w = (0, t.readUint32LE)(v);
    return (0, i.wipe)(v), w;
  }
  r.randomUint32 = s;
  const o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function f(d, v = o, w = r.defaultRandomSource) {
    if (v.length < 2)
      throw new Error("randomString charset is too short");
    if (v.length > 256)
      throw new Error("randomString charset is too long");
    let A = "";
    const I = v.length, D = 256 - 256 % I;
    for (; d > 0; ) {
      const N = n(Math.ceil(d * 256 / D), w);
      for (let k = 0; k < N.length && d > 0; k++) {
        const j = N[k];
        j < D && (A += v.charAt(j % I), d--);
      }
      (0, i.wipe)(N);
    }
    return A;
  }
  r.randomString = f;
  function h(d, v = o, w = r.defaultRandomSource) {
    const A = Math.ceil(d / (Math.log(v.length) / Math.LN2));
    return f(A, v, w);
  }
  r.randomStringForEntropy = h;
})(Ei);
var eu = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = Ve, t = nr;
  r.DIGEST_LENGTH = 64, r.BLOCK_SIZE = 128;
  var i = (
    /** @class */
    function() {
      function f() {
        this.digestLength = r.DIGEST_LENGTH, this.blockSize = r.BLOCK_SIZE, this._stateHi = new Int32Array(8), this._stateLo = new Int32Array(8), this._tempHi = new Int32Array(16), this._tempLo = new Int32Array(16), this._buffer = new Uint8Array(256), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this.reset();
      }
      return f.prototype._initState = function() {
        this._stateHi[0] = 1779033703, this._stateHi[1] = 3144134277, this._stateHi[2] = 1013904242, this._stateHi[3] = 2773480762, this._stateHi[4] = 1359893119, this._stateHi[5] = 2600822924, this._stateHi[6] = 528734635, this._stateHi[7] = 1541459225, this._stateLo[0] = 4089235720, this._stateLo[1] = 2227873595, this._stateLo[2] = 4271175723, this._stateLo[3] = 1595750129, this._stateLo[4] = 2917565137, this._stateLo[5] = 725511199, this._stateLo[6] = 4215389547, this._stateLo[7] = 327033209;
      }, f.prototype.reset = function() {
        return this._initState(), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this;
      }, f.prototype.clean = function() {
        t.wipe(this._buffer), t.wipe(this._tempHi), t.wipe(this._tempLo), this.reset();
      }, f.prototype.update = function(h, d) {
        if (d === void 0 && (d = h.length), this._finished)
          throw new Error("SHA512: can't update because hash was finished.");
        var v = 0;
        if (this._bytesHashed += d, this._bufferLength > 0) {
          for (; this._bufferLength < r.BLOCK_SIZE && d > 0; )
            this._buffer[this._bufferLength++] = h[v++], d--;
          this._bufferLength === this.blockSize && (s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize), this._bufferLength = 0);
        }
        for (d >= this.blockSize && (v = s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, h, v, d), d %= this.blockSize); d > 0; )
          this._buffer[this._bufferLength++] = h[v++], d--;
        return this;
      }, f.prototype.finish = function(h) {
        if (!this._finished) {
          var d = this._bytesHashed, v = this._bufferLength, w = d / 536870912 | 0, A = d << 3, I = d % 128 < 112 ? 128 : 256;
          this._buffer[v] = 128;
          for (var D = v + 1; D < I - 8; D++)
            this._buffer[D] = 0;
          e.writeUint32BE(w, this._buffer, I - 8), e.writeUint32BE(A, this._buffer, I - 4), s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, I), this._finished = !0;
        }
        for (var D = 0; D < this.digestLength / 8; D++)
          e.writeUint32BE(this._stateHi[D], h, D * 8), e.writeUint32BE(this._stateLo[D], h, D * 8 + 4);
        return this;
      }, f.prototype.digest = function() {
        var h = new Uint8Array(this.digestLength);
        return this.finish(h), h;
      }, f.prototype.saveState = function() {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      }, f.prototype.restoreState = function(h) {
        return this._stateHi.set(h.stateHi), this._stateLo.set(h.stateLo), this._bufferLength = h.bufferLength, h.buffer && this._buffer.set(h.buffer), this._bytesHashed = h.bytesHashed, this._finished = !1, this;
      }, f.prototype.cleanSavedState = function(h) {
        t.wipe(h.stateHi), t.wipe(h.stateLo), h.buffer && t.wipe(h.buffer), h.bufferLength = 0, h.bytesHashed = 0;
      }, f;
    }()
  );
  r.SHA512 = i;
  var n = new Int32Array([
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ]);
  function s(f, h, d, v, w, A, I) {
    for (var D = d[0], N = d[1], k = d[2], j = d[3], T = d[4], K = d[5], $ = d[6], z = d[7], B = v[0], _ = v[1], R = v[2], J = v[3], Q = v[4], O = v[5], p = v[6], l = v[7], a, c, b, E, S, x, u, m; I >= 128; ) {
      for (var g = 0; g < 16; g++) {
        var P = 8 * g + A;
        f[g] = e.readUint32BE(w, P), h[g] = e.readUint32BE(w, P + 4);
      }
      for (var g = 0; g < 80; g++) {
        var G = D, M = N, H = k, C = j, q = T, L = K, y = $, F = z, W = B, Y = _, X = R, ee = J, we = Q, Me = O, he = p, Re = l;
        if (a = z, c = l, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = (T >>> 14 | Q << 32 - 14) ^ (T >>> 18 | Q << 32 - 18) ^ (Q >>> 41 - 32 | T << 32 - (41 - 32)), c = (Q >>> 14 | T << 32 - 14) ^ (Q >>> 18 | T << 32 - 18) ^ (T >>> 41 - 32 | Q << 32 - (41 - 32)), S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, a = T & K ^ ~T & $, c = Q & O ^ ~Q & p, S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, a = n[g * 2], c = n[g * 2 + 1], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, a = f[g % 16], c = h[g % 16], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, b = u & 65535 | m << 16, E = S & 65535 | x << 16, a = b, c = E, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = (D >>> 28 | B << 32 - 28) ^ (B >>> 34 - 32 | D << 32 - (34 - 32)) ^ (B >>> 39 - 32 | D << 32 - (39 - 32)), c = (B >>> 28 | D << 32 - 28) ^ (D >>> 34 - 32 | B << 32 - (34 - 32)) ^ (D >>> 39 - 32 | B << 32 - (39 - 32)), S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, a = D & N ^ D & k ^ N & k, c = B & _ ^ B & R ^ _ & R, S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, F = u & 65535 | m << 16, Re = S & 65535 | x << 16, a = C, c = ee, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = b, c = E, S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, C = u & 65535 | m << 16, ee = S & 65535 | x << 16, N = G, k = M, j = H, T = C, K = q, $ = L, z = y, D = F, _ = W, R = Y, J = X, Q = ee, O = we, p = Me, l = he, B = Re, g % 16 === 15)
          for (var P = 0; P < 16; P++)
            a = f[P], c = h[P], S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = f[(P + 9) % 16], c = h[(P + 9) % 16], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, b = f[(P + 1) % 16], E = h[(P + 1) % 16], a = (b >>> 1 | E << 32 - 1) ^ (b >>> 8 | E << 32 - 8) ^ b >>> 7, c = (E >>> 1 | b << 32 - 1) ^ (E >>> 8 | b << 32 - 8) ^ (E >>> 7 | b << 32 - 7), S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, b = f[(P + 14) % 16], E = h[(P + 14) % 16], a = (b >>> 19 | E << 32 - 19) ^ (E >>> 61 - 32 | b << 32 - (61 - 32)) ^ b >>> 6, c = (E >>> 19 | b << 32 - 19) ^ (b >>> 61 - 32 | E << 32 - (61 - 32)) ^ (E >>> 6 | b << 32 - 6), S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, f[P] = u & 65535 | m << 16, h[P] = S & 65535 | x << 16;
      }
      a = D, c = B, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[0], c = v[0], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[0] = D = u & 65535 | m << 16, v[0] = B = S & 65535 | x << 16, a = N, c = _, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[1], c = v[1], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[1] = N = u & 65535 | m << 16, v[1] = _ = S & 65535 | x << 16, a = k, c = R, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[2], c = v[2], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[2] = k = u & 65535 | m << 16, v[2] = R = S & 65535 | x << 16, a = j, c = J, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[3], c = v[3], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[3] = j = u & 65535 | m << 16, v[3] = J = S & 65535 | x << 16, a = T, c = Q, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[4], c = v[4], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[4] = T = u & 65535 | m << 16, v[4] = Q = S & 65535 | x << 16, a = K, c = O, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[5], c = v[5], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[5] = K = u & 65535 | m << 16, v[5] = O = S & 65535 | x << 16, a = $, c = p, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[6], c = v[6], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[6] = $ = u & 65535 | m << 16, v[6] = p = S & 65535 | x << 16, a = z, c = l, S = c & 65535, x = c >>> 16, u = a & 65535, m = a >>> 16, a = d[7], c = v[7], S += c & 65535, x += c >>> 16, u += a & 65535, m += a >>> 16, x += S >>> 16, u += x >>> 16, m += u >>> 16, d[7] = z = u & 65535 | m << 16, v[7] = l = S & 65535 | x << 16, A += 128, I -= 128;
    }
    return A;
  }
  function o(f) {
    var h = new i();
    h.update(f);
    var d = h.digest();
    return h.clean(), d;
  }
  r.hash = o;
})(eu);
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.convertSecretKeyToX25519 = r.convertPublicKeyToX25519 = r.verify = r.sign = r.extractPublicKeyFromSecretKey = r.generateKeyPair = r.generateKeyPairFromSeed = r.SEED_LENGTH = r.SECRET_KEY_LENGTH = r.PUBLIC_KEY_LENGTH = r.SIGNATURE_LENGTH = void 0;
  const e = Ei, t = eu, i = nr;
  r.SIGNATURE_LENGTH = 64, r.PUBLIC_KEY_LENGTH = 32, r.SECRET_KEY_LENGTH = 64, r.SEED_LENGTH = 32;
  function n(C) {
    const q = new Float64Array(16);
    if (C)
      for (let L = 0; L < C.length; L++)
        q[L] = C[L];
    return q;
  }
  const s = new Uint8Array(32);
  s[0] = 9;
  const o = n(), f = n([1]), h = n([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]), d = n([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]), v = n([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]), w = n([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]), A = n([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function I(C, q) {
    for (let L = 0; L < 16; L++)
      C[L] = q[L] | 0;
  }
  function D(C) {
    let q = 1;
    for (let L = 0; L < 16; L++) {
      let y = C[L] + q + 65535;
      q = Math.floor(y / 65536), C[L] = y - q * 65536;
    }
    C[0] += q - 1 + 37 * (q - 1);
  }
  function N(C, q, L) {
    const y = ~(L - 1);
    for (let F = 0; F < 16; F++) {
      const W = y & (C[F] ^ q[F]);
      C[F] ^= W, q[F] ^= W;
    }
  }
  function k(C, q) {
    const L = n(), y = n();
    for (let F = 0; F < 16; F++)
      y[F] = q[F];
    D(y), D(y), D(y);
    for (let F = 0; F < 2; F++) {
      L[0] = y[0] - 65517;
      for (let Y = 1; Y < 15; Y++)
        L[Y] = y[Y] - 65535 - (L[Y - 1] >> 16 & 1), L[Y - 1] &= 65535;
      L[15] = y[15] - 32767 - (L[14] >> 16 & 1);
      const W = L[15] >> 16 & 1;
      L[14] &= 65535, N(y, L, 1 - W);
    }
    for (let F = 0; F < 16; F++)
      C[2 * F] = y[F] & 255, C[2 * F + 1] = y[F] >> 8;
  }
  function j(C, q) {
    let L = 0;
    for (let y = 0; y < 32; y++)
      L |= C[y] ^ q[y];
    return (1 & L - 1 >>> 8) - 1;
  }
  function T(C, q) {
    const L = new Uint8Array(32), y = new Uint8Array(32);
    return k(L, C), k(y, q), j(L, y);
  }
  function K(C) {
    const q = new Uint8Array(32);
    return k(q, C), q[0] & 1;
  }
  function $(C, q) {
    for (let L = 0; L < 16; L++)
      C[L] = q[2 * L] + (q[2 * L + 1] << 8);
    C[15] &= 32767;
  }
  function z(C, q, L) {
    for (let y = 0; y < 16; y++)
      C[y] = q[y] + L[y];
  }
  function B(C, q, L) {
    for (let y = 0; y < 16; y++)
      C[y] = q[y] - L[y];
  }
  function _(C, q, L) {
    let y, F, W = 0, Y = 0, X = 0, ee = 0, we = 0, Me = 0, he = 0, Re = 0, xe = 0, se = 0, ge = 0, le = 0, ne = 0, ue = 0, fe = 0, te = 0, pe = 0, _e = 0, re = 0, Ee = 0, Se = 0, oe = 0, De = 0, Ie = 0, Pe = 0, Ge = 0, Ye = 0, Ae = 0, Ze = 0, et = 0, Ne = 0, Ce = L[0], Te = L[1], de = L[2], $e = L[3], Le = L[4], ce = L[5], Ue = L[6], ze = L[7], ye = L[8], Be = L[9], ke = L[10], ve = L[11], Fe = L[12], Oe = L[13], me = L[14], je = L[15];
    y = q[0], W += y * Ce, Y += y * Te, X += y * de, ee += y * $e, we += y * Le, Me += y * ce, he += y * Ue, Re += y * ze, xe += y * ye, se += y * Be, ge += y * ke, le += y * ve, ne += y * Fe, ue += y * Oe, fe += y * me, te += y * je, y = q[1], Y += y * Ce, X += y * Te, ee += y * de, we += y * $e, Me += y * Le, he += y * ce, Re += y * Ue, xe += y * ze, se += y * ye, ge += y * Be, le += y * ke, ne += y * ve, ue += y * Fe, fe += y * Oe, te += y * me, pe += y * je, y = q[2], X += y * Ce, ee += y * Te, we += y * de, Me += y * $e, he += y * Le, Re += y * ce, xe += y * Ue, se += y * ze, ge += y * ye, le += y * Be, ne += y * ke, ue += y * ve, fe += y * Fe, te += y * Oe, pe += y * me, _e += y * je, y = q[3], ee += y * Ce, we += y * Te, Me += y * de, he += y * $e, Re += y * Le, xe += y * ce, se += y * Ue, ge += y * ze, le += y * ye, ne += y * Be, ue += y * ke, fe += y * ve, te += y * Fe, pe += y * Oe, _e += y * me, re += y * je, y = q[4], we += y * Ce, Me += y * Te, he += y * de, Re += y * $e, xe += y * Le, se += y * ce, ge += y * Ue, le += y * ze, ne += y * ye, ue += y * Be, fe += y * ke, te += y * ve, pe += y * Fe, _e += y * Oe, re += y * me, Ee += y * je, y = q[5], Me += y * Ce, he += y * Te, Re += y * de, xe += y * $e, se += y * Le, ge += y * ce, le += y * Ue, ne += y * ze, ue += y * ye, fe += y * Be, te += y * ke, pe += y * ve, _e += y * Fe, re += y * Oe, Ee += y * me, Se += y * je, y = q[6], he += y * Ce, Re += y * Te, xe += y * de, se += y * $e, ge += y * Le, le += y * ce, ne += y * Ue, ue += y * ze, fe += y * ye, te += y * Be, pe += y * ke, _e += y * ve, re += y * Fe, Ee += y * Oe, Se += y * me, oe += y * je, y = q[7], Re += y * Ce, xe += y * Te, se += y * de, ge += y * $e, le += y * Le, ne += y * ce, ue += y * Ue, fe += y * ze, te += y * ye, pe += y * Be, _e += y * ke, re += y * ve, Ee += y * Fe, Se += y * Oe, oe += y * me, De += y * je, y = q[8], xe += y * Ce, se += y * Te, ge += y * de, le += y * $e, ne += y * Le, ue += y * ce, fe += y * Ue, te += y * ze, pe += y * ye, _e += y * Be, re += y * ke, Ee += y * ve, Se += y * Fe, oe += y * Oe, De += y * me, Ie += y * je, y = q[9], se += y * Ce, ge += y * Te, le += y * de, ne += y * $e, ue += y * Le, fe += y * ce, te += y * Ue, pe += y * ze, _e += y * ye, re += y * Be, Ee += y * ke, Se += y * ve, oe += y * Fe, De += y * Oe, Ie += y * me, Pe += y * je, y = q[10], ge += y * Ce, le += y * Te, ne += y * de, ue += y * $e, fe += y * Le, te += y * ce, pe += y * Ue, _e += y * ze, re += y * ye, Ee += y * Be, Se += y * ke, oe += y * ve, De += y * Fe, Ie += y * Oe, Pe += y * me, Ge += y * je, y = q[11], le += y * Ce, ne += y * Te, ue += y * de, fe += y * $e, te += y * Le, pe += y * ce, _e += y * Ue, re += y * ze, Ee += y * ye, Se += y * Be, oe += y * ke, De += y * ve, Ie += y * Fe, Pe += y * Oe, Ge += y * me, Ye += y * je, y = q[12], ne += y * Ce, ue += y * Te, fe += y * de, te += y * $e, pe += y * Le, _e += y * ce, re += y * Ue, Ee += y * ze, Se += y * ye, oe += y * Be, De += y * ke, Ie += y * ve, Pe += y * Fe, Ge += y * Oe, Ye += y * me, Ae += y * je, y = q[13], ue += y * Ce, fe += y * Te, te += y * de, pe += y * $e, _e += y * Le, re += y * ce, Ee += y * Ue, Se += y * ze, oe += y * ye, De += y * Be, Ie += y * ke, Pe += y * ve, Ge += y * Fe, Ye += y * Oe, Ae += y * me, Ze += y * je, y = q[14], fe += y * Ce, te += y * Te, pe += y * de, _e += y * $e, re += y * Le, Ee += y * ce, Se += y * Ue, oe += y * ze, De += y * ye, Ie += y * Be, Pe += y * ke, Ge += y * ve, Ye += y * Fe, Ae += y * Oe, Ze += y * me, et += y * je, y = q[15], te += y * Ce, pe += y * Te, _e += y * de, re += y * $e, Ee += y * Le, Se += y * ce, oe += y * Ue, De += y * ze, Ie += y * ye, Pe += y * Be, Ge += y * ke, Ye += y * ve, Ae += y * Fe, Ze += y * Oe, et += y * me, Ne += y * je, W += 38 * pe, Y += 38 * _e, X += 38 * re, ee += 38 * Ee, we += 38 * Se, Me += 38 * oe, he += 38 * De, Re += 38 * Ie, xe += 38 * Pe, se += 38 * Ge, ge += 38 * Ye, le += 38 * Ae, ne += 38 * Ze, ue += 38 * et, fe += 38 * Ne, F = 1, y = W + F + 65535, F = Math.floor(y / 65536), W = y - F * 65536, y = Y + F + 65535, F = Math.floor(y / 65536), Y = y - F * 65536, y = X + F + 65535, F = Math.floor(y / 65536), X = y - F * 65536, y = ee + F + 65535, F = Math.floor(y / 65536), ee = y - F * 65536, y = we + F + 65535, F = Math.floor(y / 65536), we = y - F * 65536, y = Me + F + 65535, F = Math.floor(y / 65536), Me = y - F * 65536, y = he + F + 65535, F = Math.floor(y / 65536), he = y - F * 65536, y = Re + F + 65535, F = Math.floor(y / 65536), Re = y - F * 65536, y = xe + F + 65535, F = Math.floor(y / 65536), xe = y - F * 65536, y = se + F + 65535, F = Math.floor(y / 65536), se = y - F * 65536, y = ge + F + 65535, F = Math.floor(y / 65536), ge = y - F * 65536, y = le + F + 65535, F = Math.floor(y / 65536), le = y - F * 65536, y = ne + F + 65535, F = Math.floor(y / 65536), ne = y - F * 65536, y = ue + F + 65535, F = Math.floor(y / 65536), ue = y - F * 65536, y = fe + F + 65535, F = Math.floor(y / 65536), fe = y - F * 65536, y = te + F + 65535, F = Math.floor(y / 65536), te = y - F * 65536, W += F - 1 + 37 * (F - 1), F = 1, y = W + F + 65535, F = Math.floor(y / 65536), W = y - F * 65536, y = Y + F + 65535, F = Math.floor(y / 65536), Y = y - F * 65536, y = X + F + 65535, F = Math.floor(y / 65536), X = y - F * 65536, y = ee + F + 65535, F = Math.floor(y / 65536), ee = y - F * 65536, y = we + F + 65535, F = Math.floor(y / 65536), we = y - F * 65536, y = Me + F + 65535, F = Math.floor(y / 65536), Me = y - F * 65536, y = he + F + 65535, F = Math.floor(y / 65536), he = y - F * 65536, y = Re + F + 65535, F = Math.floor(y / 65536), Re = y - F * 65536, y = xe + F + 65535, F = Math.floor(y / 65536), xe = y - F * 65536, y = se + F + 65535, F = Math.floor(y / 65536), se = y - F * 65536, y = ge + F + 65535, F = Math.floor(y / 65536), ge = y - F * 65536, y = le + F + 65535, F = Math.floor(y / 65536), le = y - F * 65536, y = ne + F + 65535, F = Math.floor(y / 65536), ne = y - F * 65536, y = ue + F + 65535, F = Math.floor(y / 65536), ue = y - F * 65536, y = fe + F + 65535, F = Math.floor(y / 65536), fe = y - F * 65536, y = te + F + 65535, F = Math.floor(y / 65536), te = y - F * 65536, W += F - 1 + 37 * (F - 1), C[0] = W, C[1] = Y, C[2] = X, C[3] = ee, C[4] = we, C[5] = Me, C[6] = he, C[7] = Re, C[8] = xe, C[9] = se, C[10] = ge, C[11] = le, C[12] = ne, C[13] = ue, C[14] = fe, C[15] = te;
  }
  function R(C, q) {
    _(C, q, q);
  }
  function J(C, q) {
    const L = n();
    let y;
    for (y = 0; y < 16; y++)
      L[y] = q[y];
    for (y = 253; y >= 0; y--)
      R(L, L), y !== 2 && y !== 4 && _(L, L, q);
    for (y = 0; y < 16; y++)
      C[y] = L[y];
  }
  function Q(C, q) {
    const L = n();
    let y;
    for (y = 0; y < 16; y++)
      L[y] = q[y];
    for (y = 250; y >= 0; y--)
      R(L, L), y !== 1 && _(L, L, q);
    for (y = 0; y < 16; y++)
      C[y] = L[y];
  }
  function O(C, q) {
    const L = n(), y = n(), F = n(), W = n(), Y = n(), X = n(), ee = n(), we = n(), Me = n();
    B(L, C[1], C[0]), B(Me, q[1], q[0]), _(L, L, Me), z(y, C[0], C[1]), z(Me, q[0], q[1]), _(y, y, Me), _(F, C[3], q[3]), _(F, F, d), _(W, C[2], q[2]), z(W, W, W), B(Y, y, L), B(X, W, F), z(ee, W, F), z(we, y, L), _(C[0], Y, X), _(C[1], we, ee), _(C[2], ee, X), _(C[3], Y, we);
  }
  function p(C, q, L) {
    for (let y = 0; y < 4; y++)
      N(C[y], q[y], L);
  }
  function l(C, q) {
    const L = n(), y = n(), F = n();
    J(F, q[2]), _(L, q[0], F), _(y, q[1], F), k(C, y), C[31] ^= K(L) << 7;
  }
  function a(C, q, L) {
    I(C[0], o), I(C[1], f), I(C[2], f), I(C[3], o);
    for (let y = 255; y >= 0; --y) {
      const F = L[y / 8 | 0] >> (y & 7) & 1;
      p(C, q, F), O(q, C), O(C, C), p(C, q, F);
    }
  }
  function c(C, q) {
    const L = [n(), n(), n(), n()];
    I(L[0], v), I(L[1], w), I(L[2], f), _(L[3], v, w), a(C, L, q);
  }
  function b(C) {
    if (C.length !== r.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${r.SEED_LENGTH} bytes`);
    const q = (0, t.hash)(C);
    q[0] &= 248, q[31] &= 127, q[31] |= 64;
    const L = new Uint8Array(32), y = [n(), n(), n(), n()];
    c(y, q), l(L, y);
    const F = new Uint8Array(64);
    return F.set(C), F.set(L, 32), {
      publicKey: L,
      secretKey: F
    };
  }
  r.generateKeyPairFromSeed = b;
  function E(C) {
    const q = (0, e.randomBytes)(32, C), L = b(q);
    return (0, i.wipe)(q), L;
  }
  r.generateKeyPair = E;
  function S(C) {
    if (C.length !== r.SECRET_KEY_LENGTH)
      throw new Error(`ed25519: secret key must be ${r.SECRET_KEY_LENGTH} bytes`);
    return new Uint8Array(C.subarray(32));
  }
  r.extractPublicKeyFromSecretKey = S;
  const x = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function u(C, q) {
    let L, y, F, W;
    for (y = 63; y >= 32; --y) {
      for (L = 0, F = y - 32, W = y - 12; F < W; ++F)
        q[F] += L - 16 * q[y] * x[F - (y - 32)], L = Math.floor((q[F] + 128) / 256), q[F] -= L * 256;
      q[F] += L, q[y] = 0;
    }
    for (L = 0, F = 0; F < 32; F++)
      q[F] += L - (q[31] >> 4) * x[F], L = q[F] >> 8, q[F] &= 255;
    for (F = 0; F < 32; F++)
      q[F] -= L * x[F];
    for (y = 0; y < 32; y++)
      q[y + 1] += q[y] >> 8, C[y] = q[y] & 255;
  }
  function m(C) {
    const q = new Float64Array(64);
    for (let L = 0; L < 64; L++)
      q[L] = C[L];
    for (let L = 0; L < 64; L++)
      C[L] = 0;
    u(C, q);
  }
  function g(C, q) {
    const L = new Float64Array(64), y = [n(), n(), n(), n()], F = (0, t.hash)(C.subarray(0, 32));
    F[0] &= 248, F[31] &= 127, F[31] |= 64;
    const W = new Uint8Array(64);
    W.set(F.subarray(32), 32);
    const Y = new t.SHA512();
    Y.update(W.subarray(32)), Y.update(q);
    const X = Y.digest();
    Y.clean(), m(X), c(y, X), l(W, y), Y.reset(), Y.update(W.subarray(0, 32)), Y.update(C.subarray(32)), Y.update(q);
    const ee = Y.digest();
    m(ee);
    for (let we = 0; we < 32; we++)
      L[we] = X[we];
    for (let we = 0; we < 32; we++)
      for (let Me = 0; Me < 32; Me++)
        L[we + Me] += ee[we] * F[Me];
    return u(W.subarray(32), L), W;
  }
  r.sign = g;
  function P(C, q) {
    const L = n(), y = n(), F = n(), W = n(), Y = n(), X = n(), ee = n();
    return I(C[2], f), $(C[1], q), R(F, C[1]), _(W, F, h), B(F, F, C[2]), z(W, C[2], W), R(Y, W), R(X, Y), _(ee, X, Y), _(L, ee, F), _(L, L, W), Q(L, L), _(L, L, F), _(L, L, W), _(L, L, W), _(C[0], L, W), R(y, C[0]), _(y, y, W), T(y, F) && _(C[0], C[0], A), R(y, C[0]), _(y, y, W), T(y, F) ? -1 : (K(C[0]) === q[31] >> 7 && B(C[0], o, C[0]), _(C[3], C[0], C[1]), 0);
  }
  function G(C, q, L) {
    const y = new Uint8Array(32), F = [n(), n(), n(), n()], W = [n(), n(), n(), n()];
    if (L.length !== r.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${r.SIGNATURE_LENGTH} bytes`);
    if (P(W, C))
      return !1;
    const Y = new t.SHA512();
    Y.update(L.subarray(0, 32)), Y.update(C), Y.update(q);
    const X = Y.digest();
    return m(X), a(F, W, X), c(W, L.subarray(32)), O(F, W), l(y, F), !j(L, y);
  }
  r.verify = G;
  function M(C) {
    let q = [n(), n(), n(), n()];
    if (P(q, C))
      throw new Error("Ed25519: invalid public key");
    let L = n(), y = n(), F = q[1];
    z(L, f, F), B(y, f, F), J(y, y), _(L, L, y);
    let W = new Uint8Array(32);
    return k(W, L), W;
  }
  r.convertPublicKeyToX25519 = M;
  function H(C) {
    const q = (0, t.hash)(C.subarray(0, 32));
    q[0] &= 248, q[31] &= 127, q[31] |= 64;
    const L = new Uint8Array(q.subarray(0, 32));
    return (0, i.wipe)(q), L;
  }
  r.convertSecretKeyToX25519 = H;
})(Co);
const Vp = "EdDSA", Wp = "JWT", zs = ".", ca = "base64url", tu = "utf8", ru = "utf8", Gp = ":", Jp = "did", Yp = "key", Bf = "base58btc", Xp = "z", Zp = "K36", Qp = 32;
function iu(r = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r) : new Uint8Array(r);
}
function Ds(r, e) {
  e || (e = r.reduce((n, s) => n + s.length, 0));
  const t = iu(e);
  let i = 0;
  for (const n of r)
    t.set(n, i), i += n.length;
  return t;
}
function e1(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i = 0; i < t.length; i++)
    t[i] = 255;
  for (var n = 0; n < r.length; n++) {
    var s = r.charAt(n), o = s.charCodeAt(0);
    if (t[o] !== 255)
      throw new TypeError(s + " is ambiguous");
    t[o] = n;
  }
  var f = r.length, h = r.charAt(0), d = Math.log(f) / Math.log(256), v = Math.log(256) / Math.log(f);
  function w(D) {
    if (D instanceof Uint8Array || (ArrayBuffer.isView(D) ? D = new Uint8Array(D.buffer, D.byteOffset, D.byteLength) : Array.isArray(D) && (D = Uint8Array.from(D))), !(D instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (D.length === 0)
      return "";
    for (var N = 0, k = 0, j = 0, T = D.length; j !== T && D[j] === 0; )
      j++, N++;
    for (var K = (T - j) * v + 1 >>> 0, $ = new Uint8Array(K); j !== T; ) {
      for (var z = D[j], B = 0, _ = K - 1; (z !== 0 || B < k) && _ !== -1; _--, B++)
        z += 256 * $[_] >>> 0, $[_] = z % f >>> 0, z = z / f >>> 0;
      if (z !== 0)
        throw new Error("Non-zero carry");
      k = B, j++;
    }
    for (var R = K - k; R !== K && $[R] === 0; )
      R++;
    for (var J = h.repeat(N); R < K; ++R)
      J += r.charAt($[R]);
    return J;
  }
  function A(D) {
    if (typeof D != "string")
      throw new TypeError("Expected String");
    if (D.length === 0)
      return new Uint8Array();
    var N = 0;
    if (D[N] !== " ") {
      for (var k = 0, j = 0; D[N] === h; )
        k++, N++;
      for (var T = (D.length - N) * d + 1 >>> 0, K = new Uint8Array(T); D[N]; ) {
        var $ = t[D.charCodeAt(N)];
        if ($ === 255)
          return;
        for (var z = 0, B = T - 1; ($ !== 0 || z < j) && B !== -1; B--, z++)
          $ += f * K[B] >>> 0, K[B] = $ % 256 >>> 0, $ = $ / 256 >>> 0;
        if ($ !== 0)
          throw new Error("Non-zero carry");
        j = z, N++;
      }
      if (D[N] !== " ") {
        for (var _ = T - j; _ !== T && K[_] === 0; )
          _++;
        for (var R = new Uint8Array(k + (T - _)), J = k; _ !== T; )
          R[J++] = K[_++];
        return R;
      }
    }
  }
  function I(D) {
    var N = A(D);
    if (N)
      return N;
    throw new Error(`Non-${e} character`);
  }
  return {
    encode: w,
    decodeUnsafe: A,
    decode: I
  };
}
var t1 = e1, r1 = t1;
const i1 = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
}, n1 = (r) => new TextEncoder().encode(r), s1 = (r) => new TextDecoder().decode(r);
class a1 {
  constructor(e, t, i) {
    this.name = e, this.prefix = t, this.baseEncode = i;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class o1 {
  constructor(e, t, i) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return nu(this, e);
  }
}
class f1 {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return nu(this, e);
  }
  decode(e) {
    const t = e[0], i = this.decoders[t];
    if (i)
      return i.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const nu = (r, e) => new f1({
  ...r.decoders || { [r.prefix]: r },
  ...e.decoders || { [e.prefix]: e }
});
class c1 {
  constructor(e, t, i, n) {
    this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = n, this.encoder = new a1(e, t, i), this.decoder = new o1(e, t, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const ha = ({ name: r, prefix: e, encode: t, decode: i }) => new c1(r, e, t, i), rs = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: i, decode: n } = r1(t, e);
  return ha({
    prefix: r,
    name: e,
    encode: i,
    decode: (s) => i1(n(s))
  });
}, h1 = (r, e, t, i) => {
  const n = {};
  for (let v = 0; v < e.length; ++v)
    n[e[v]] = v;
  let s = r.length;
  for (; r[s - 1] === "="; )
    --s;
  const o = new Uint8Array(s * t / 8 | 0);
  let f = 0, h = 0, d = 0;
  for (let v = 0; v < s; ++v) {
    const w = n[r[v]];
    if (w === void 0)
      throw new SyntaxError(`Non-${i} character`);
    h = h << t | w, f += t, f >= 8 && (f -= 8, o[d++] = 255 & h >> f);
  }
  if (f >= t || 255 & h << 8 - f)
    throw new SyntaxError("Unexpected end of data");
  return o;
}, u1 = (r, e, t) => {
  const i = e[e.length - 1] === "=", n = (1 << t) - 1;
  let s = "", o = 0, f = 0;
  for (let h = 0; h < r.length; ++h)
    for (f = f << 8 | r[h], o += 8; o > t; )
      o -= t, s += e[n & f >> o];
  if (o && (s += e[n & f << t - o]), i)
    for (; s.length * t & 7; )
      s += "=";
  return s;
}, Rt = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) => ha({
  prefix: e,
  name: r,
  encode(n) {
    return u1(n, i, t);
  },
  decode(n) {
    return h1(n, i, t, r);
  }
}), d1 = ha({
  prefix: "\0",
  name: "identity",
  encode: (r) => s1(r),
  decode: (r) => n1(r)
}), l1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: d1
}, Symbol.toStringTag, { value: "Module" })), p1 = Rt({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: p1
}, Symbol.toStringTag, { value: "Module" })), b1 = Rt({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), g1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: b1
}, Symbol.toStringTag, { value: "Module" })), y1 = rs({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), m1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: y1
}, Symbol.toStringTag, { value: "Module" })), w1 = Rt({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), _1 = Rt({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), x1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: w1,
  base16upper: _1
}, Symbol.toStringTag, { value: "Module" })), E1 = Rt({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), S1 = Rt({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), M1 = Rt({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), I1 = Rt({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), A1 = Rt({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), D1 = Rt({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), P1 = Rt({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), O1 = Rt({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), R1 = Rt({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), N1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: E1,
  base32hex: A1,
  base32hexpad: P1,
  base32hexpadupper: O1,
  base32hexupper: D1,
  base32pad: M1,
  base32padupper: I1,
  base32upper: S1,
  base32z: R1
}, Symbol.toStringTag, { value: "Module" })), T1 = rs({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), C1 = rs({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), $1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: T1,
  base36upper: C1
}, Symbol.toStringTag, { value: "Module" })), L1 = rs({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), F1 = rs({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), q1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: L1,
  base58flickr: F1
}, Symbol.toStringTag, { value: "Module" })), U1 = Rt({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), z1 = Rt({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), B1 = Rt({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), k1 = Rt({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), j1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: U1,
  base64pad: z1,
  base64url: B1,
  base64urlpad: k1
}, Symbol.toStringTag, { value: "Module" })), su = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), K1 = su.reduce((r, e, t) => (r[t] = e, r), []), H1 = su.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
function V1(r) {
  return r.reduce((e, t) => (e += K1[t], e), "");
}
function W1(r) {
  const e = [];
  for (const t of r) {
    const i = H1[t.codePointAt(0)];
    if (i === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i);
  }
  return new Uint8Array(e);
}
const G1 = ha({
  prefix: "🚀",
  name: "base256emoji",
  encode: V1,
  decode: W1
}), J1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: G1
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const kf = {
  ...l1,
  ...v1,
  ...g1,
  ...m1,
  ...x1,
  ...N1,
  ...$1,
  ...q1,
  ...j1,
  ...J1
};
function au(r, e, t, i) {
  return {
    name: r,
    prefix: e,
    encoder: {
      name: r,
      prefix: e,
      encode: t
    },
    decoder: { decode: i }
  };
}
const jf = au("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1))), Ua = au("ascii", "a", (r) => {
  let e = "a";
  for (let t = 0; t < r.length; t++)
    e += String.fromCharCode(r[t]);
  return e;
}, (r) => {
  r = r.substring(1);
  const e = iu(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return e;
}), ou = {
  utf8: jf,
  "utf-8": jf,
  hex: kf.base16,
  latin1: Ua,
  ascii: Ua,
  binary: Ua,
  ...kf
};
function Mt(r, e = "utf8") {
  const t = ou[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r.buffer, r.byteOffset, r.byteLength).toString("utf8") : t.encoder.encode(r).substring(1);
}
function St(r, e = "utf8") {
  const t = ou[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r, "utf8") : t.decoder.decode(`${t.prefix}${r}`);
}
function Kf(r) {
  return un(Mt(St(r, ca), tu));
}
function Bs(r) {
  return Mt(St(ji(r), tu), ca);
}
function fu(r) {
  const e = St(Zp, Bf), t = Xp + Mt(Ds([e, r]), Bf);
  return [Jp, Yp, t].join(Gp);
}
function Y1(r) {
  return Mt(r, ca);
}
function X1(r) {
  return St(r, ca);
}
function Z1(r) {
  return St([Bs(r.header), Bs(r.payload)].join(zs), ru);
}
function Q1(r) {
  return [
    Bs(r.header),
    Bs(r.payload),
    Y1(r.signature)
  ].join(zs);
}
function bo(r) {
  const e = r.split(zs), t = Kf(e[0]), i = Kf(e[1]), n = X1(e[2]), s = St(e.slice(0, 2).join(zs), ru);
  return { header: t, payload: i, signature: n, data: s };
}
function Hf(r = Ei.randomBytes(Qp)) {
  return Co.generateKeyPairFromSeed(r);
}
async function ev(r, e, t, i, n = ie.fromMiliseconds(Date.now())) {
  const s = { alg: Vp, typ: Wp }, o = fu(i.publicKey), f = n + t, h = { iss: o, sub: r, aud: e, iat: n, exp: f }, d = Z1({ header: s, payload: h }), v = Co.sign(i.secretKey, d);
  return Q1({ header: s, payload: h, signature: v });
}
var Vf = globalThis && globalThis.__spreadArray || function(r, e, t) {
  if (t || arguments.length === 2)
    for (var i = 0, n = e.length, s; i < n; i++)
      (s || !(i in e)) && (s || (s = Array.prototype.slice.call(e, 0, i)), s[i] = e[i]);
  return r.concat(s || Array.prototype.slice.call(e));
}, tv = (
  /** @class */
  function() {
    function r(e, t, i) {
      this.name = e, this.version = t, this.os = i, this.type = "browser";
    }
    return r;
  }()
), rv = (
  /** @class */
  function() {
    function r(e) {
      this.version = e, this.type = "node", this.name = "node", this.os = process.platform;
    }
    return r;
  }()
), iv = (
  /** @class */
  function() {
    function r(e, t, i, n) {
      this.name = e, this.version = t, this.os = i, this.bot = n, this.type = "bot-device";
    }
    return r;
  }()
), nv = (
  /** @class */
  function() {
    function r() {
      this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
    }
    return r;
  }()
), sv = (
  /** @class */
  function() {
    function r() {
      this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
    }
    return r;
  }()
), av = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, ov = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, Wf = 3, fv = [
  ["aol", /AOLShield\/([0-9\._]+)/],
  ["edge", /Edge\/([0-9\._]+)/],
  ["edge-ios", /EdgiOS\/([0-9\._]+)/],
  ["yandexbrowser", /YaBrowser\/([0-9\._]+)/],
  ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/],
  ["samsung", /SamsungBrowser\/([0-9\.]+)/],
  ["silk", /\bSilk\/([0-9._-]+)\b/],
  ["miui", /MiuiBrowser\/([0-9\.]+)$/],
  ["beaker", /BeakerBrowser\/([0-9\.]+)/],
  ["edge-chromium", /EdgA?\/([0-9\.]+)/],
  [
    "chromium-webview",
    /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/
  ],
  ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/],
  ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/],
  ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
  ["fxios", /FxiOS\/([0-9\.]+)/],
  ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/],
  ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
  ["opera", /OPR\/([0-9\.]+)(:?\s|$)/],
  ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],
  ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ["ie", /MSIE\s(7\.0)/],
  ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
  ["android", /Android\s([0-9\.]+)/],
  ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/],
  ["safari", /Version\/([0-9\._]+).*Safari/],
  ["facebook", /FB[AS]V\/([0-9\.]+)/],
  ["instagram", /Instagram\s([0-9\.]+)/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/],
  ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ["curl", /^curl\/([0-9\.]+)$/],
  ["searchbot", av]
], Gf = [
  ["iOS", /iP(hone|od|ad)/],
  ["Android OS", /Android/],
  ["BlackBerry OS", /BlackBerry|BB10/],
  ["Windows Mobile", /IEMobile/],
  ["Amazon OS", /Kindle/],
  ["Windows 3.11", /Win16/],
  ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/],
  ["Windows 98", /(Windows 98)|(Win98)/],
  ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/],
  ["Windows XP", /(Windows NT 5.1)|(Windows XP)/],
  ["Windows Server 2003", /(Windows NT 5.2)/],
  ["Windows Vista", /(Windows NT 6.0)/],
  ["Windows 7", /(Windows NT 6.1)/],
  ["Windows 8", /(Windows NT 6.2)/],
  ["Windows 8.1", /(Windows NT 6.3)/],
  ["Windows 10", /(Windows NT 10.0)/],
  ["Windows ME", /Windows ME/],
  ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ["Open BSD", /OpenBSD/],
  ["Sun OS", /SunOS/],
  ["Chrome OS", /CrOS/],
  ["Linux", /(Linux)|(X11)/],
  ["Mac OS", /(Mac_PowerPC)|(Macintosh)/],
  ["QNX", /QNX/],
  ["BeOS", /BeOS/],
  ["OS/2", /OS\/2/]
];
function cu(r) {
  return r ? Jf(r) : typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new sv() : typeof navigator < "u" ? Jf(navigator.userAgent) : uv();
}
function cv(r) {
  return r !== "" && fv.reduce(function(e, t) {
    var i = t[0], n = t[1];
    if (e)
      return e;
    var s = n.exec(r);
    return !!s && [i, s];
  }, !1);
}
function Jf(r) {
  var e = cv(r);
  if (!e)
    return null;
  var t = e[0], i = e[1];
  if (t === "searchbot")
    return new nv();
  var n = i[1] && i[1].split(".").join("_").split("_").slice(0, 3);
  n ? n.length < Wf && (n = Vf(Vf([], n, !0), dv(Wf - n.length), !0)) : n = [];
  var s = n.join("."), o = hv(r), f = ov.exec(r);
  return f && f[1] ? new iv(t, s, o, f[1]) : new tv(t, s, o);
}
function hv(r) {
  for (var e = 0, t = Gf.length; e < t; e++) {
    var i = Gf[e], n = i[0], s = i[1], o = s.exec(r);
    if (o)
      return n;
  }
  return null;
}
function uv() {
  var r = typeof process < "u" && process.version;
  return r ? new rv(process.version.slice(1)) : null;
}
function dv(r) {
  for (var e = [], t = 0; t < r; t++)
    e.push("0");
  return e;
}
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.getLocalStorage = ot.getLocalStorageOrThrow = ot.getCrypto = ot.getCryptoOrThrow = hu = ot.getLocation = ot.getLocationOrThrow = $o = ot.getNavigator = ot.getNavigatorOrThrow = is = ot.getDocument = ot.getDocumentOrThrow = ot.getFromWindowOrThrow = ot.getFromWindow = void 0;
function Ji(r) {
  let e;
  return typeof window < "u" && typeof window[r] < "u" && (e = window[r]), e;
}
ot.getFromWindow = Ji;
function yn(r) {
  const e = Ji(r);
  if (!e)
    throw new Error(`${r} is not defined in Window`);
  return e;
}
ot.getFromWindowOrThrow = yn;
function lv() {
  return yn("document");
}
ot.getDocumentOrThrow = lv;
function pv() {
  return Ji("document");
}
var is = ot.getDocument = pv;
function vv() {
  return yn("navigator");
}
ot.getNavigatorOrThrow = vv;
function bv() {
  return Ji("navigator");
}
var $o = ot.getNavigator = bv;
function gv() {
  return yn("location");
}
ot.getLocationOrThrow = gv;
function yv() {
  return Ji("location");
}
var hu = ot.getLocation = yv;
function mv() {
  return yn("crypto");
}
ot.getCryptoOrThrow = mv;
function wv() {
  return Ji("crypto");
}
ot.getCrypto = wv;
function _v() {
  return yn("localStorage");
}
ot.getLocalStorageOrThrow = _v;
function xv() {
  return Ji("localStorage");
}
ot.getLocalStorage = xv;
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
var uu = Lo.getWindowMetadata = void 0;
const Yf = ot;
function Ev() {
  let r, e;
  try {
    r = Yf.getDocumentOrThrow(), e = Yf.getLocationOrThrow();
  } catch {
    return null;
  }
  function t() {
    const w = r.getElementsByTagName("link"), A = [];
    for (let I = 0; I < w.length; I++) {
      const D = w[I], N = D.getAttribute("rel");
      if (N && N.toLowerCase().indexOf("icon") > -1) {
        const k = D.getAttribute("href");
        if (k)
          if (k.toLowerCase().indexOf("https:") === -1 && k.toLowerCase().indexOf("http:") === -1 && k.indexOf("//") !== 0) {
            let j = e.protocol + "//" + e.host;
            if (k.indexOf("/") === 0)
              j += k;
            else {
              const T = e.pathname.split("/");
              T.pop();
              const K = T.join("/");
              j += K + "/" + k;
            }
            A.push(j);
          } else if (k.indexOf("//") === 0) {
            const j = e.protocol + k;
            A.push(j);
          } else
            A.push(k);
      }
    }
    return A;
  }
  function i(...w) {
    const A = r.getElementsByTagName("meta");
    for (let I = 0; I < A.length; I++) {
      const D = A[I], N = ["itemprop", "property", "name"].map((k) => D.getAttribute(k)).filter((k) => k ? w.includes(k) : !1);
      if (N.length && N) {
        const k = D.getAttribute("content");
        if (k)
          return k;
      }
    }
    return "";
  }
  function n() {
    let w = i("name", "og:site_name", "og:title", "twitter:title");
    return w || (w = r.title), w;
  }
  function s() {
    return i("description", "og:description", "twitter:description", "keywords");
  }
  const o = n(), f = s(), h = e.origin, d = t();
  return {
    description: f,
    url: h,
    icons: d,
    name: o
  };
}
uu = Lo.getWindowMetadata = Ev;
var Yn = {}, Sv = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), du = "%[a-f0-9]{2}", Xf = new RegExp("(" + du + ")|([^%]+?)", "gi"), Zf = new RegExp("(" + du + ")+", "gi");
function go(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  var t = r.slice(0, e), i = r.slice(e);
  return Array.prototype.concat.call([], go(t), go(i));
}
function Mv(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    for (var e = r.match(Xf) || [], t = 1; t < e.length; t++)
      r = go(e, t).join(""), e = r.match(Xf) || [];
    return r;
  }
}
function Iv(r) {
  for (var e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  }, t = Zf.exec(r); t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      var i = Mv(t[0]);
      i !== t[0] && (e[t[0]] = i);
    }
    t = Zf.exec(r);
  }
  e["%C2"] = "�";
  for (var n = Object.keys(e), s = 0; s < n.length; s++) {
    var o = n[s];
    r = r.replace(new RegExp(o, "g"), e[o]);
  }
  return r;
}
var Av = function(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return r = r.replace(/\+/g, " "), decodeURIComponent(r);
  } catch {
    return Iv(r);
  }
}, Dv = (r, e) => {
  if (!(typeof r == "string" && typeof e == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (e === "")
    return [r];
  const t = r.indexOf(e);
  return t === -1 ? [r] : [
    r.slice(0, t),
    r.slice(t + e.length)
  ];
}, Pv = function(r, e) {
  for (var t = {}, i = Object.keys(r), n = Array.isArray(e), s = 0; s < i.length; s++) {
    var o = i[s], f = r[o];
    (n ? e.indexOf(o) !== -1 : e(o, f, r)) && (t[o] = f);
  }
  return t;
};
(function(r) {
  const e = Sv, t = Av, i = Dv, n = Pv, s = (T) => T == null, o = Symbol("encodeFragmentIdentifier");
  function f(T) {
    switch (T.arrayFormat) {
      case "index":
        return (K) => ($, z) => {
          const B = $.length;
          return z === void 0 || T.skipNull && z === null || T.skipEmptyString && z === "" ? $ : z === null ? [...$, [v(K, T), "[", B, "]"].join("")] : [
            ...$,
            [v(K, T), "[", v(B, T), "]=", v(z, T)].join("")
          ];
        };
      case "bracket":
        return (K) => ($, z) => z === void 0 || T.skipNull && z === null || T.skipEmptyString && z === "" ? $ : z === null ? [...$, [v(K, T), "[]"].join("")] : [...$, [v(K, T), "[]=", v(z, T)].join("")];
      case "colon-list-separator":
        return (K) => ($, z) => z === void 0 || T.skipNull && z === null || T.skipEmptyString && z === "" ? $ : z === null ? [...$, [v(K, T), ":list="].join("")] : [...$, [v(K, T), ":list=", v(z, T)].join("")];
      case "comma":
      case "separator":
      case "bracket-separator": {
        const K = T.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return ($) => (z, B) => B === void 0 || T.skipNull && B === null || T.skipEmptyString && B === "" ? z : (B = B === null ? "" : B, z.length === 0 ? [[v($, T), K, v(B, T)].join("")] : [[z, v(B, T)].join(T.arrayFormatSeparator)]);
      }
      default:
        return (K) => ($, z) => z === void 0 || T.skipNull && z === null || T.skipEmptyString && z === "" ? $ : z === null ? [...$, v(K, T)] : [...$, [v(K, T), "=", v(z, T)].join("")];
    }
  }
  function h(T) {
    let K;
    switch (T.arrayFormat) {
      case "index":
        return ($, z, B) => {
          if (K = /\[(\d*)\]$/.exec($), $ = $.replace(/\[\d*\]$/, ""), !K) {
            B[$] = z;
            return;
          }
          B[$] === void 0 && (B[$] = {}), B[$][K[1]] = z;
        };
      case "bracket":
        return ($, z, B) => {
          if (K = /(\[\])$/.exec($), $ = $.replace(/\[\]$/, ""), !K) {
            B[$] = z;
            return;
          }
          if (B[$] === void 0) {
            B[$] = [z];
            return;
          }
          B[$] = [].concat(B[$], z);
        };
      case "colon-list-separator":
        return ($, z, B) => {
          if (K = /(:list)$/.exec($), $ = $.replace(/:list$/, ""), !K) {
            B[$] = z;
            return;
          }
          if (B[$] === void 0) {
            B[$] = [z];
            return;
          }
          B[$] = [].concat(B[$], z);
        };
      case "comma":
      case "separator":
        return ($, z, B) => {
          const _ = typeof z == "string" && z.includes(T.arrayFormatSeparator), R = typeof z == "string" && !_ && w(z, T).includes(T.arrayFormatSeparator);
          z = R ? w(z, T) : z;
          const J = _ || R ? z.split(T.arrayFormatSeparator).map((Q) => w(Q, T)) : z === null ? z : w(z, T);
          B[$] = J;
        };
      case "bracket-separator":
        return ($, z, B) => {
          const _ = /(\[\])$/.test($);
          if ($ = $.replace(/\[\]$/, ""), !_) {
            B[$] = z && w(z, T);
            return;
          }
          const R = z === null ? [] : z.split(T.arrayFormatSeparator).map((J) => w(J, T));
          if (B[$] === void 0) {
            B[$] = R;
            return;
          }
          B[$] = [].concat(B[$], R);
        };
      default:
        return ($, z, B) => {
          if (B[$] === void 0) {
            B[$] = z;
            return;
          }
          B[$] = [].concat(B[$], z);
        };
    }
  }
  function d(T) {
    if (typeof T != "string" || T.length !== 1)
      throw new TypeError("arrayFormatSeparator must be single character string");
  }
  function v(T, K) {
    return K.encode ? K.strict ? e(T) : encodeURIComponent(T) : T;
  }
  function w(T, K) {
    return K.decode ? t(T) : T;
  }
  function A(T) {
    return Array.isArray(T) ? T.sort() : typeof T == "object" ? A(Object.keys(T)).sort((K, $) => Number(K) - Number($)).map((K) => T[K]) : T;
  }
  function I(T) {
    const K = T.indexOf("#");
    return K !== -1 && (T = T.slice(0, K)), T;
  }
  function D(T) {
    let K = "";
    const $ = T.indexOf("#");
    return $ !== -1 && (K = T.slice($)), K;
  }
  function N(T) {
    T = I(T);
    const K = T.indexOf("?");
    return K === -1 ? "" : T.slice(K + 1);
  }
  function k(T, K) {
    return K.parseNumbers && !Number.isNaN(Number(T)) && typeof T == "string" && T.trim() !== "" ? T = Number(T) : K.parseBooleans && T !== null && (T.toLowerCase() === "true" || T.toLowerCase() === "false") && (T = T.toLowerCase() === "true"), T;
  }
  function j(T, K) {
    K = Object.assign({
      decode: !0,
      sort: !0,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: !1,
      parseBooleans: !1
    }, K), d(K.arrayFormatSeparator);
    const $ = h(K), z = /* @__PURE__ */ Object.create(null);
    if (typeof T != "string" || (T = T.trim().replace(/^[?#&]/, ""), !T))
      return z;
    for (const B of T.split("&")) {
      if (B === "")
        continue;
      let [_, R] = i(K.decode ? B.replace(/\+/g, " ") : B, "=");
      R = R === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(K.arrayFormat) ? R : w(R, K), $(w(_, K), R, z);
    }
    for (const B of Object.keys(z)) {
      const _ = z[B];
      if (typeof _ == "object" && _ !== null)
        for (const R of Object.keys(_))
          _[R] = k(_[R], K);
      else
        z[B] = k(_, K);
    }
    return K.sort === !1 ? z : (K.sort === !0 ? Object.keys(z).sort() : Object.keys(z).sort(K.sort)).reduce((B, _) => {
      const R = z[_];
      return R && typeof R == "object" && !Array.isArray(R) ? B[_] = A(R) : B[_] = R, B;
    }, /* @__PURE__ */ Object.create(null));
  }
  r.extract = N, r.parse = j, r.stringify = (T, K) => {
    if (!T)
      return "";
    K = Object.assign({
      encode: !0,
      strict: !0,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, K), d(K.arrayFormatSeparator);
    const $ = (R) => K.skipNull && s(T[R]) || K.skipEmptyString && T[R] === "", z = f(K), B = {};
    for (const R of Object.keys(T))
      $(R) || (B[R] = T[R]);
    const _ = Object.keys(B);
    return K.sort !== !1 && _.sort(K.sort), _.map((R) => {
      const J = T[R];
      return J === void 0 ? "" : J === null ? v(R, K) : Array.isArray(J) ? J.length === 0 && K.arrayFormat === "bracket-separator" ? v(R, K) + "[]" : J.reduce(z(R), []).join("&") : v(R, K) + "=" + v(J, K);
    }).filter((R) => R.length > 0).join("&");
  }, r.parseUrl = (T, K) => {
    K = Object.assign({
      decode: !0
    }, K);
    const [$, z] = i(T, "#");
    return Object.assign(
      {
        url: $.split("?")[0] || "",
        query: j(N(T), K)
      },
      K && K.parseFragmentIdentifier && z ? { fragmentIdentifier: w(z, K) } : {}
    );
  }, r.stringifyUrl = (T, K) => {
    K = Object.assign({
      encode: !0,
      strict: !0,
      [o]: !0
    }, K);
    const $ = I(T.url).split("?")[0] || "", z = r.extract(T.url), B = r.parse(z, { sort: !1 }), _ = Object.assign(B, T.query);
    let R = r.stringify(_, K);
    R && (R = `?${R}`);
    let J = D(T.url);
    return T.fragmentIdentifier && (J = `#${K[o] ? v(T.fragmentIdentifier, K) : T.fragmentIdentifier}`), `${$}${R}${J}`;
  }, r.pick = (T, K, $) => {
    $ = Object.assign({
      parseFragmentIdentifier: !0,
      [o]: !1
    }, $);
    const { url: z, query: B, fragmentIdentifier: _ } = r.parseUrl(T, $);
    return r.stringifyUrl({
      url: z,
      query: n(B, K),
      fragmentIdentifier: _
    }, $);
  }, r.exclude = (T, K, $) => {
    const z = Array.isArray(K) ? (B) => !K.includes(B) : (B, _) => !K(B, _);
    return r.pick(T, z, $);
  };
})(Yn);
var lu = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(r) {
  (function() {
    var e = "input is invalid type", t = "finalize already called", i = typeof window == "object", n = i ? window : {};
    n.JS_SHA3_NO_WINDOW && (i = !1);
    var s = !i && typeof self == "object", o = !n.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    o ? n = _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c : s && (n = self);
    var f = !n.JS_SHA3_NO_COMMON_JS && !0 && r.exports, h = !n.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", d = "0123456789abcdef".split(""), v = [31, 7936, 2031616, 520093696], w = [4, 1024, 262144, 67108864], A = [1, 256, 65536, 16777216], I = [6, 1536, 393216, 100663296], D = [0, 8, 16, 24], N = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ], k = [224, 256, 384, 512], j = [128, 256], T = ["hex", "buffer", "arrayBuffer", "array", "digest"], K = {
      128: 168,
      256: 136
    };
    (n.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(M) {
      return Object.prototype.toString.call(M) === "[object Array]";
    }), h && (n.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(M) {
      return typeof M == "object" && M.buffer && M.buffer.constructor === ArrayBuffer;
    });
    for (var $ = function(M, H, C) {
      return function(q) {
        return new g(M, H, M).update(q)[C]();
      };
    }, z = function(M, H, C) {
      return function(q, L) {
        return new g(M, H, L).update(q)[C]();
      };
    }, B = function(M, H, C) {
      return function(q, L, y, F) {
        return a["cshake" + M].update(q, L, y, F)[C]();
      };
    }, _ = function(M, H, C) {
      return function(q, L, y, F) {
        return a["kmac" + M].update(q, L, y, F)[C]();
      };
    }, R = function(M, H, C, q) {
      for (var L = 0; L < T.length; ++L) {
        var y = T[L];
        M[y] = H(C, q, y);
      }
      return M;
    }, J = function(M, H) {
      var C = $(M, H, "hex");
      return C.create = function() {
        return new g(M, H, M);
      }, C.update = function(q) {
        return C.create().update(q);
      }, R(C, $, M, H);
    }, Q = function(M, H) {
      var C = z(M, H, "hex");
      return C.create = function(q) {
        return new g(M, H, q);
      }, C.update = function(q, L) {
        return C.create(L).update(q);
      }, R(C, z, M, H);
    }, O = function(M, H) {
      var C = K[M], q = B(M, H, "hex");
      return q.create = function(L, y, F) {
        return !y && !F ? a["shake" + M].create(L) : new g(M, H, L).bytepad([y, F], C);
      }, q.update = function(L, y, F, W) {
        return q.create(y, F, W).update(L);
      }, R(q, B, M, H);
    }, p = function(M, H) {
      var C = K[M], q = _(M, H, "hex");
      return q.create = function(L, y, F) {
        return new P(M, H, y).bytepad(["KMAC", F], C).bytepad([L], C);
      }, q.update = function(L, y, F, W) {
        return q.create(L, F, W).update(y);
      }, R(q, _, M, H);
    }, l = [
      { name: "keccak", padding: A, bits: k, createMethod: J },
      { name: "sha3", padding: I, bits: k, createMethod: J },
      { name: "shake", padding: v, bits: j, createMethod: Q },
      { name: "cshake", padding: w, bits: j, createMethod: O },
      { name: "kmac", padding: w, bits: j, createMethod: p }
    ], a = {}, c = [], b = 0; b < l.length; ++b)
      for (var E = l[b], S = E.bits, x = 0; x < S.length; ++x) {
        var u = E.name + "_" + S[x];
        if (c.push(u), a[u] = E.createMethod(S[x], E.padding), E.name !== "sha3") {
          var m = E.name + S[x];
          c.push(m), a[m] = a[u];
        }
      }
    function g(M, H, C) {
      this.blocks = [], this.s = [], this.padding = H, this.outputBits = C, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (M << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = C >> 5, this.extraBytes = (C & 31) >> 3;
      for (var q = 0; q < 50; ++q)
        this.s[q] = 0;
    }
    g.prototype.update = function(M) {
      if (this.finalized)
        throw new Error(t);
      var H, C = typeof M;
      if (C !== "string") {
        if (C === "object") {
          if (M === null)
            throw new Error(e);
          if (h && M.constructor === ArrayBuffer)
            M = new Uint8Array(M);
          else if (!Array.isArray(M) && (!h || !ArrayBuffer.isView(M)))
            throw new Error(e);
        } else
          throw new Error(e);
        H = !0;
      }
      for (var q = this.blocks, L = this.byteCount, y = M.length, F = this.blockCount, W = 0, Y = this.s, X, ee; W < y; ) {
        if (this.reset)
          for (this.reset = !1, q[0] = this.block, X = 1; X < F + 1; ++X)
            q[X] = 0;
        if (H)
          for (X = this.start; W < y && X < L; ++W)
            q[X >> 2] |= M[W] << D[X++ & 3];
        else
          for (X = this.start; W < y && X < L; ++W)
            ee = M.charCodeAt(W), ee < 128 ? q[X >> 2] |= ee << D[X++ & 3] : ee < 2048 ? (q[X >> 2] |= (192 | ee >> 6) << D[X++ & 3], q[X >> 2] |= (128 | ee & 63) << D[X++ & 3]) : ee < 55296 || ee >= 57344 ? (q[X >> 2] |= (224 | ee >> 12) << D[X++ & 3], q[X >> 2] |= (128 | ee >> 6 & 63) << D[X++ & 3], q[X >> 2] |= (128 | ee & 63) << D[X++ & 3]) : (ee = 65536 + ((ee & 1023) << 10 | M.charCodeAt(++W) & 1023), q[X >> 2] |= (240 | ee >> 18) << D[X++ & 3], q[X >> 2] |= (128 | ee >> 12 & 63) << D[X++ & 3], q[X >> 2] |= (128 | ee >> 6 & 63) << D[X++ & 3], q[X >> 2] |= (128 | ee & 63) << D[X++ & 3]);
        if (this.lastByteIndex = X, X >= L) {
          for (this.start = X - L, this.block = q[F], X = 0; X < F; ++X)
            Y[X] ^= q[X];
          G(Y), this.reset = !0;
        } else
          this.start = X;
      }
      return this;
    }, g.prototype.encode = function(M, H) {
      var C = M & 255, q = 1, L = [C];
      for (M = M >> 8, C = M & 255; C > 0; )
        L.unshift(C), M = M >> 8, C = M & 255, ++q;
      return H ? L.push(q) : L.unshift(q), this.update(L), L.length;
    }, g.prototype.encodeString = function(M) {
      var H, C = typeof M;
      if (C !== "string") {
        if (C === "object") {
          if (M === null)
            throw new Error(e);
          if (h && M.constructor === ArrayBuffer)
            M = new Uint8Array(M);
          else if (!Array.isArray(M) && (!h || !ArrayBuffer.isView(M)))
            throw new Error(e);
        } else
          throw new Error(e);
        H = !0;
      }
      var q = 0, L = M.length;
      if (H)
        q = L;
      else
        for (var y = 0; y < M.length; ++y) {
          var F = M.charCodeAt(y);
          F < 128 ? q += 1 : F < 2048 ? q += 2 : F < 55296 || F >= 57344 ? q += 3 : (F = 65536 + ((F & 1023) << 10 | M.charCodeAt(++y) & 1023), q += 4);
        }
      return q += this.encode(q * 8), this.update(M), q;
    }, g.prototype.bytepad = function(M, H) {
      for (var C = this.encode(H), q = 0; q < M.length; ++q)
        C += this.encodeString(M[q]);
      var L = H - C % H, y = [];
      return y.length = L, this.update(y), this;
    }, g.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var M = this.blocks, H = this.lastByteIndex, C = this.blockCount, q = this.s;
        if (M[H >> 2] |= this.padding[H & 3], this.lastByteIndex === this.byteCount)
          for (M[0] = M[C], H = 1; H < C + 1; ++H)
            M[H] = 0;
        for (M[C - 1] |= 2147483648, H = 0; H < C; ++H)
          q[H] ^= M[H];
        G(q);
      }
    }, g.prototype.toString = g.prototype.hex = function() {
      this.finalize();
      for (var M = this.blockCount, H = this.s, C = this.outputBlocks, q = this.extraBytes, L = 0, y = 0, F = "", W; y < C; ) {
        for (L = 0; L < M && y < C; ++L, ++y)
          W = H[L], F += d[W >> 4 & 15] + d[W & 15] + d[W >> 12 & 15] + d[W >> 8 & 15] + d[W >> 20 & 15] + d[W >> 16 & 15] + d[W >> 28 & 15] + d[W >> 24 & 15];
        y % M === 0 && (G(H), L = 0);
      }
      return q && (W = H[L], F += d[W >> 4 & 15] + d[W & 15], q > 1 && (F += d[W >> 12 & 15] + d[W >> 8 & 15]), q > 2 && (F += d[W >> 20 & 15] + d[W >> 16 & 15])), F;
    }, g.prototype.arrayBuffer = function() {
      this.finalize();
      var M = this.blockCount, H = this.s, C = this.outputBlocks, q = this.extraBytes, L = 0, y = 0, F = this.outputBits >> 3, W;
      q ? W = new ArrayBuffer(C + 1 << 2) : W = new ArrayBuffer(F);
      for (var Y = new Uint32Array(W); y < C; ) {
        for (L = 0; L < M && y < C; ++L, ++y)
          Y[y] = H[L];
        y % M === 0 && G(H);
      }
      return q && (Y[L] = H[L], W = W.slice(0, F)), W;
    }, g.prototype.buffer = g.prototype.arrayBuffer, g.prototype.digest = g.prototype.array = function() {
      this.finalize();
      for (var M = this.blockCount, H = this.s, C = this.outputBlocks, q = this.extraBytes, L = 0, y = 0, F = [], W, Y; y < C; ) {
        for (L = 0; L < M && y < C; ++L, ++y)
          W = y << 2, Y = H[L], F[W] = Y & 255, F[W + 1] = Y >> 8 & 255, F[W + 2] = Y >> 16 & 255, F[W + 3] = Y >> 24 & 255;
        y % M === 0 && G(H);
      }
      return q && (W = y << 2, Y = H[L], F[W] = Y & 255, q > 1 && (F[W + 1] = Y >> 8 & 255), q > 2 && (F[W + 2] = Y >> 16 & 255)), F;
    };
    function P(M, H, C) {
      g.call(this, M, H, C);
    }
    P.prototype = new g(), P.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), g.prototype.finalize.call(this);
    };
    var G = function(M) {
      var H, C, q, L, y, F, W, Y, X, ee, we, Me, he, Re, xe, se, ge, le, ne, ue, fe, te, pe, _e, re, Ee, Se, oe, De, Ie, Pe, Ge, Ye, Ae, Ze, et, Ne, Ce, Te, de, $e, Le, ce, Ue, ze, ye, Be, ke, ve, Fe, Oe, me, je, rt, qe, it, Je, tt, jt, Kt, Ht, Vt, gt;
      for (q = 0; q < 48; q += 2)
        L = M[0] ^ M[10] ^ M[20] ^ M[30] ^ M[40], y = M[1] ^ M[11] ^ M[21] ^ M[31] ^ M[41], F = M[2] ^ M[12] ^ M[22] ^ M[32] ^ M[42], W = M[3] ^ M[13] ^ M[23] ^ M[33] ^ M[43], Y = M[4] ^ M[14] ^ M[24] ^ M[34] ^ M[44], X = M[5] ^ M[15] ^ M[25] ^ M[35] ^ M[45], ee = M[6] ^ M[16] ^ M[26] ^ M[36] ^ M[46], we = M[7] ^ M[17] ^ M[27] ^ M[37] ^ M[47], Me = M[8] ^ M[18] ^ M[28] ^ M[38] ^ M[48], he = M[9] ^ M[19] ^ M[29] ^ M[39] ^ M[49], H = Me ^ (F << 1 | W >>> 31), C = he ^ (W << 1 | F >>> 31), M[0] ^= H, M[1] ^= C, M[10] ^= H, M[11] ^= C, M[20] ^= H, M[21] ^= C, M[30] ^= H, M[31] ^= C, M[40] ^= H, M[41] ^= C, H = L ^ (Y << 1 | X >>> 31), C = y ^ (X << 1 | Y >>> 31), M[2] ^= H, M[3] ^= C, M[12] ^= H, M[13] ^= C, M[22] ^= H, M[23] ^= C, M[32] ^= H, M[33] ^= C, M[42] ^= H, M[43] ^= C, H = F ^ (ee << 1 | we >>> 31), C = W ^ (we << 1 | ee >>> 31), M[4] ^= H, M[5] ^= C, M[14] ^= H, M[15] ^= C, M[24] ^= H, M[25] ^= C, M[34] ^= H, M[35] ^= C, M[44] ^= H, M[45] ^= C, H = Y ^ (Me << 1 | he >>> 31), C = X ^ (he << 1 | Me >>> 31), M[6] ^= H, M[7] ^= C, M[16] ^= H, M[17] ^= C, M[26] ^= H, M[27] ^= C, M[36] ^= H, M[37] ^= C, M[46] ^= H, M[47] ^= C, H = ee ^ (L << 1 | y >>> 31), C = we ^ (y << 1 | L >>> 31), M[8] ^= H, M[9] ^= C, M[18] ^= H, M[19] ^= C, M[28] ^= H, M[29] ^= C, M[38] ^= H, M[39] ^= C, M[48] ^= H, M[49] ^= C, Re = M[0], xe = M[1], ye = M[11] << 4 | M[10] >>> 28, Be = M[10] << 4 | M[11] >>> 28, oe = M[20] << 3 | M[21] >>> 29, De = M[21] << 3 | M[20] >>> 29, Kt = M[31] << 9 | M[30] >>> 23, Ht = M[30] << 9 | M[31] >>> 23, Le = M[40] << 18 | M[41] >>> 14, ce = M[41] << 18 | M[40] >>> 14, Ae = M[2] << 1 | M[3] >>> 31, Ze = M[3] << 1 | M[2] >>> 31, se = M[13] << 12 | M[12] >>> 20, ge = M[12] << 12 | M[13] >>> 20, ke = M[22] << 10 | M[23] >>> 22, ve = M[23] << 10 | M[22] >>> 22, Ie = M[33] << 13 | M[32] >>> 19, Pe = M[32] << 13 | M[33] >>> 19, Vt = M[42] << 2 | M[43] >>> 30, gt = M[43] << 2 | M[42] >>> 30, rt = M[5] << 30 | M[4] >>> 2, qe = M[4] << 30 | M[5] >>> 2, et = M[14] << 6 | M[15] >>> 26, Ne = M[15] << 6 | M[14] >>> 26, le = M[25] << 11 | M[24] >>> 21, ne = M[24] << 11 | M[25] >>> 21, Fe = M[34] << 15 | M[35] >>> 17, Oe = M[35] << 15 | M[34] >>> 17, Ge = M[45] << 29 | M[44] >>> 3, Ye = M[44] << 29 | M[45] >>> 3, _e = M[6] << 28 | M[7] >>> 4, re = M[7] << 28 | M[6] >>> 4, it = M[17] << 23 | M[16] >>> 9, Je = M[16] << 23 | M[17] >>> 9, Ce = M[26] << 25 | M[27] >>> 7, Te = M[27] << 25 | M[26] >>> 7, ue = M[36] << 21 | M[37] >>> 11, fe = M[37] << 21 | M[36] >>> 11, me = M[47] << 24 | M[46] >>> 8, je = M[46] << 24 | M[47] >>> 8, Ue = M[8] << 27 | M[9] >>> 5, ze = M[9] << 27 | M[8] >>> 5, Ee = M[18] << 20 | M[19] >>> 12, Se = M[19] << 20 | M[18] >>> 12, tt = M[29] << 7 | M[28] >>> 25, jt = M[28] << 7 | M[29] >>> 25, de = M[38] << 8 | M[39] >>> 24, $e = M[39] << 8 | M[38] >>> 24, te = M[48] << 14 | M[49] >>> 18, pe = M[49] << 14 | M[48] >>> 18, M[0] = Re ^ ~se & le, M[1] = xe ^ ~ge & ne, M[10] = _e ^ ~Ee & oe, M[11] = re ^ ~Se & De, M[20] = Ae ^ ~et & Ce, M[21] = Ze ^ ~Ne & Te, M[30] = Ue ^ ~ye & ke, M[31] = ze ^ ~Be & ve, M[40] = rt ^ ~it & tt, M[41] = qe ^ ~Je & jt, M[2] = se ^ ~le & ue, M[3] = ge ^ ~ne & fe, M[12] = Ee ^ ~oe & Ie, M[13] = Se ^ ~De & Pe, M[22] = et ^ ~Ce & de, M[23] = Ne ^ ~Te & $e, M[32] = ye ^ ~ke & Fe, M[33] = Be ^ ~ve & Oe, M[42] = it ^ ~tt & Kt, M[43] = Je ^ ~jt & Ht, M[4] = le ^ ~ue & te, M[5] = ne ^ ~fe & pe, M[14] = oe ^ ~Ie & Ge, M[15] = De ^ ~Pe & Ye, M[24] = Ce ^ ~de & Le, M[25] = Te ^ ~$e & ce, M[34] = ke ^ ~Fe & me, M[35] = ve ^ ~Oe & je, M[44] = tt ^ ~Kt & Vt, M[45] = jt ^ ~Ht & gt, M[6] = ue ^ ~te & Re, M[7] = fe ^ ~pe & xe, M[16] = Ie ^ ~Ge & _e, M[17] = Pe ^ ~Ye & re, M[26] = de ^ ~Le & Ae, M[27] = $e ^ ~ce & Ze, M[36] = Fe ^ ~me & Ue, M[37] = Oe ^ ~je & ze, M[46] = Kt ^ ~Vt & rt, M[47] = Ht ^ ~gt & qe, M[8] = te ^ ~Re & se, M[9] = pe ^ ~xe & ge, M[18] = Ge ^ ~_e & Ee, M[19] = Ye ^ ~re & Se, M[28] = Le ^ ~Ae & et, M[29] = ce ^ ~Ze & Ne, M[38] = me ^ ~Ue & ye, M[39] = je ^ ~ze & Be, M[48] = Vt ^ ~rt & it, M[49] = gt ^ ~qe & Je, M[0] ^= N[q], M[1] ^= N[q + 1];
    };
    if (f)
      r.exports = a;
    else
      for (b = 0; b < c.length; ++b)
        n[c[b]] = a[c[b]];
  })();
})(lu);
var Ov = lu.exports;
const Rv = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(Ov), Nv = "logger/5.7.0";
let Qf = !1, ec = !1;
const Ps = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let tc = Ps.default, za = null;
function Tv() {
  try {
    const r = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((e) => {
      try {
        if ("test".normalize(e) !== "test")
          throw new Error("bad normalize");
      } catch {
        r.push(e);
      }
    }), r.length)
      throw new Error("missing " + r.join(", "));
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769))
      throw new Error("broken implementation");
  } catch (r) {
    return r.message;
  }
  return null;
}
const rc = Tv();
var yo;
(function(r) {
  r.DEBUG = "DEBUG", r.INFO = "INFO", r.WARNING = "WARNING", r.ERROR = "ERROR", r.OFF = "OFF";
})(yo || (yo = {}));
var Sr;
(function(r) {
  r.UNKNOWN_ERROR = "UNKNOWN_ERROR", r.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", r.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", r.NETWORK_ERROR = "NETWORK_ERROR", r.SERVER_ERROR = "SERVER_ERROR", r.TIMEOUT = "TIMEOUT", r.BUFFER_OVERRUN = "BUFFER_OVERRUN", r.NUMERIC_FAULT = "NUMERIC_FAULT", r.MISSING_NEW = "MISSING_NEW", r.INVALID_ARGUMENT = "INVALID_ARGUMENT", r.MISSING_ARGUMENT = "MISSING_ARGUMENT", r.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", r.CALL_EXCEPTION = "CALL_EXCEPTION", r.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", r.NONCE_EXPIRED = "NONCE_EXPIRED", r.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", r.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", r.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", r.ACTION_REJECTED = "ACTION_REJECTED";
})(Sr || (Sr = {}));
const ic = "0123456789abcdef";
class ht {
  constructor(e) {
    Object.defineProperty(this, "version", {
      enumerable: !0,
      value: e,
      writable: !1
    });
  }
  _log(e, t) {
    const i = e.toLowerCase();
    Ps[i] == null && this.throwArgumentError("invalid log level name", "logLevel", e), !(tc > Ps[i]) && console.log.apply(console, t);
  }
  debug(...e) {
    this._log(ht.levels.DEBUG, e);
  }
  info(...e) {
    this._log(ht.levels.INFO, e);
  }
  warn(...e) {
    this._log(ht.levels.WARNING, e);
  }
  makeError(e, t, i) {
    if (ec)
      return this.makeError("censored error", t, {});
    t || (t = ht.errors.UNKNOWN_ERROR), i || (i = {});
    const n = [];
    Object.keys(i).forEach((h) => {
      const d = i[h];
      try {
        if (d instanceof Uint8Array) {
          let v = "";
          for (let w = 0; w < d.length; w++)
            v += ic[d[w] >> 4], v += ic[d[w] & 15];
          n.push(h + "=Uint8Array(0x" + v + ")");
        } else
          n.push(h + "=" + JSON.stringify(d));
      } catch {
        n.push(h + "=" + JSON.stringify(i[h].toString()));
      }
    }), n.push(`code=${t}`), n.push(`version=${this.version}`);
    const s = e;
    let o = "";
    switch (t) {
      case Sr.NUMERIC_FAULT: {
        o = "NUMERIC_FAULT";
        const h = e;
        switch (h) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            o += "-" + h;
            break;
          case "negative-power":
          case "negative-width":
            o += "-unsupported";
            break;
          case "unbound-bitwise-result":
            o += "-unbound-result";
            break;
        }
        break;
      }
      case Sr.CALL_EXCEPTION:
      case Sr.INSUFFICIENT_FUNDS:
      case Sr.MISSING_NEW:
      case Sr.NONCE_EXPIRED:
      case Sr.REPLACEMENT_UNDERPRICED:
      case Sr.TRANSACTION_REPLACED:
      case Sr.UNPREDICTABLE_GAS_LIMIT:
        o = t;
        break;
    }
    o && (e += " [ See: https://links.ethers.org/v5-errors-" + o + " ]"), n.length && (e += " (" + n.join(", ") + ")");
    const f = new Error(e);
    return f.reason = s, f.code = t, Object.keys(i).forEach(function(h) {
      f[h] = i[h];
    }), f;
  }
  throwError(e, t, i) {
    throw this.makeError(e, t, i);
  }
  throwArgumentError(e, t, i) {
    return this.throwError(e, ht.errors.INVALID_ARGUMENT, {
      argument: t,
      value: i
    });
  }
  assert(e, t, i, n) {
    e || this.throwError(t, i, n);
  }
  assertArgument(e, t, i, n) {
    e || this.throwArgumentError(t, i, n);
  }
  checkNormalize(e) {
    rc && this.throwError("platform missing String.prototype.normalize", ht.errors.UNSUPPORTED_OPERATION, {
      operation: "String.prototype.normalize",
      form: rc
    });
  }
  checkSafeUint53(e, t) {
    typeof e == "number" && (t == null && (t = "value not safe"), (e < 0 || e >= 9007199254740991) && this.throwError(t, ht.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "out-of-safe-range",
      value: e
    }), e % 1 && this.throwError(t, ht.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "non-integer",
      value: e
    }));
  }
  checkArgumentCount(e, t, i) {
    i ? i = ": " + i : i = "", e < t && this.throwError("missing argument" + i, ht.errors.MISSING_ARGUMENT, {
      count: e,
      expectedCount: t
    }), e > t && this.throwError("too many arguments" + i, ht.errors.UNEXPECTED_ARGUMENT, {
      count: e,
      expectedCount: t
    });
  }
  checkNew(e, t) {
    (e === Object || e == null) && this.throwError("missing new", ht.errors.MISSING_NEW, { name: t.name });
  }
  checkAbstract(e, t) {
    e === t ? this.throwError("cannot instantiate abstract class " + JSON.stringify(t.name) + " directly; use a sub-class", ht.errors.UNSUPPORTED_OPERATION, { name: e.name, operation: "new" }) : (e === Object || e == null) && this.throwError("missing new", ht.errors.MISSING_NEW, { name: t.name });
  }
  static globalLogger() {
    return za || (za = new ht(Nv)), za;
  }
  static setCensorship(e, t) {
    if (!e && t && this.globalLogger().throwError("cannot permanently disable censorship", ht.errors.UNSUPPORTED_OPERATION, {
      operation: "setCensorship"
    }), Qf) {
      if (!e)
        return;
      this.globalLogger().throwError("error censorship permanent", ht.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    ec = !!e, Qf = !!t;
  }
  static setLogLevel(e) {
    const t = Ps[e.toLowerCase()];
    if (t == null) {
      ht.globalLogger().warn("invalid log level - " + e);
      return;
    }
    tc = t;
  }
  static from(e) {
    return new ht(e);
  }
}
ht.errors = Sr;
ht.levels = yo;
const Cv = "bytes/5.7.0", vt = new ht(Cv);
function pu(r) {
  return !!r.toHexString;
}
function cn(r) {
  return r.slice || (r.slice = function() {
    const e = Array.prototype.slice.call(arguments);
    return cn(new Uint8Array(Array.prototype.slice.apply(r, e)));
  }), r;
}
function $v(r) {
  return Lr(r) && !(r.length % 2) || Fo(r);
}
function nc(r) {
  return typeof r == "number" && r == r && r % 1 === 0;
}
function Fo(r) {
  if (r == null)
    return !1;
  if (r.constructor === Uint8Array)
    return !0;
  if (typeof r == "string" || !nc(r.length) || r.length < 0)
    return !1;
  for (let e = 0; e < r.length; e++) {
    const t = r[e];
    if (!nc(t) || t < 0 || t >= 256)
      return !1;
  }
  return !0;
}
function yt(r, e) {
  if (e || (e = {}), typeof r == "number") {
    vt.checkSafeUint53(r, "invalid arrayify value");
    const t = [];
    for (; r; )
      t.unshift(r & 255), r = parseInt(String(r / 256));
    return t.length === 0 && t.push(0), cn(new Uint8Array(t));
  }
  if (e.allowMissingPrefix && typeof r == "string" && r.substring(0, 2) !== "0x" && (r = "0x" + r), pu(r) && (r = r.toHexString()), Lr(r)) {
    let t = r.substring(2);
    t.length % 2 && (e.hexPad === "left" ? t = "0" + t : e.hexPad === "right" ? t += "0" : vt.throwArgumentError("hex data is odd-length", "value", r));
    const i = [];
    for (let n = 0; n < t.length; n += 2)
      i.push(parseInt(t.substring(n, n + 2), 16));
    return cn(new Uint8Array(i));
  }
  return Fo(r) ? cn(new Uint8Array(r)) : vt.throwArgumentError("invalid arrayify value", "value", r);
}
function Lv(r) {
  const e = r.map((n) => yt(n)), t = e.reduce((n, s) => n + s.length, 0), i = new Uint8Array(t);
  return e.reduce((n, s) => (i.set(s, n), n + s.length), 0), cn(i);
}
function Fv(r, e) {
  r = yt(r), r.length > e && vt.throwArgumentError("value out of range", "value", arguments[0]);
  const t = new Uint8Array(e);
  return t.set(r, e - r.length), cn(t);
}
function Lr(r, e) {
  return !(typeof r != "string" || !r.match(/^0x[0-9A-Fa-f]*$/) || e && r.length !== 2 + 2 * e);
}
const Ba = "0123456789abcdef";
function Jt(r, e) {
  if (e || (e = {}), typeof r == "number") {
    vt.checkSafeUint53(r, "invalid hexlify value");
    let t = "";
    for (; r; )
      t = Ba[r & 15] + t, r = Math.floor(r / 16);
    return t.length ? (t.length % 2 && (t = "0" + t), "0x" + t) : "0x00";
  }
  if (typeof r == "bigint")
    return r = r.toString(16), r.length % 2 ? "0x0" + r : "0x" + r;
  if (e.allowMissingPrefix && typeof r == "string" && r.substring(0, 2) !== "0x" && (r = "0x" + r), pu(r))
    return r.toHexString();
  if (Lr(r))
    return r.length % 2 && (e.hexPad === "left" ? r = "0x0" + r.substring(2) : e.hexPad === "right" ? r += "0" : vt.throwArgumentError("hex data is odd-length", "value", r)), r.toLowerCase();
  if (Fo(r)) {
    let t = "0x";
    for (let i = 0; i < r.length; i++) {
      let n = r[i];
      t += Ba[(n & 240) >> 4] + Ba[n & 15];
    }
    return t;
  }
  return vt.throwArgumentError("invalid hexlify value", "value", r);
}
function qv(r) {
  if (typeof r != "string")
    r = Jt(r);
  else if (!Lr(r) || r.length % 2)
    return null;
  return (r.length - 2) / 2;
}
function sc(r, e, t) {
  return typeof r != "string" ? r = Jt(r) : (!Lr(r) || r.length % 2) && vt.throwArgumentError("invalid hexData", "value", r), e = 2 + 2 * e, t != null ? "0x" + r.substring(e, 2 + 2 * t) : "0x" + r.substring(e);
}
function hn(r, e) {
  for (typeof r != "string" ? r = Jt(r) : Lr(r) || vt.throwArgumentError("invalid hex string", "value", r), r.length > 2 * e + 2 && vt.throwArgumentError("value out of range", "value", arguments[1]); r.length < 2 * e + 2; )
    r = "0x0" + r.substring(2);
  return r;
}
function vu(r) {
  const e = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
    yParityAndS: "0x",
    compact: "0x"
  };
  if ($v(r)) {
    let t = yt(r);
    t.length === 64 ? (e.v = 27 + (t[32] >> 7), t[32] &= 127, e.r = Jt(t.slice(0, 32)), e.s = Jt(t.slice(32, 64))) : t.length === 65 ? (e.r = Jt(t.slice(0, 32)), e.s = Jt(t.slice(32, 64)), e.v = t[64]) : vt.throwArgumentError("invalid signature string", "signature", r), e.v < 27 && (e.v === 0 || e.v === 1 ? e.v += 27 : vt.throwArgumentError("signature invalid v byte", "signature", r)), e.recoveryParam = 1 - e.v % 2, e.recoveryParam && (t[32] |= 128), e._vs = Jt(t.slice(32, 64));
  } else {
    if (e.r = r.r, e.s = r.s, e.v = r.v, e.recoveryParam = r.recoveryParam, e._vs = r._vs, e._vs != null) {
      const n = Fv(yt(e._vs), 32);
      e._vs = Jt(n);
      const s = n[0] >= 128 ? 1 : 0;
      e.recoveryParam == null ? e.recoveryParam = s : e.recoveryParam !== s && vt.throwArgumentError("signature recoveryParam mismatch _vs", "signature", r), n[0] &= 127;
      const o = Jt(n);
      e.s == null ? e.s = o : e.s !== o && vt.throwArgumentError("signature v mismatch _vs", "signature", r);
    }
    if (e.recoveryParam == null)
      e.v == null ? vt.throwArgumentError("signature missing v and recoveryParam", "signature", r) : e.v === 0 || e.v === 1 ? e.recoveryParam = e.v : e.recoveryParam = 1 - e.v % 2;
    else if (e.v == null)
      e.v = 27 + e.recoveryParam;
    else {
      const n = e.v === 0 || e.v === 1 ? e.v : 1 - e.v % 2;
      e.recoveryParam !== n && vt.throwArgumentError("signature recoveryParam mismatch v", "signature", r);
    }
    e.r == null || !Lr(e.r) ? vt.throwArgumentError("signature missing or invalid r", "signature", r) : e.r = hn(e.r, 32), e.s == null || !Lr(e.s) ? vt.throwArgumentError("signature missing or invalid s", "signature", r) : e.s = hn(e.s, 32);
    const t = yt(e.s);
    t[0] >= 128 && vt.throwArgumentError("signature s out of range", "signature", r), e.recoveryParam && (t[0] |= 128);
    const i = Jt(t);
    e._vs && (Lr(e._vs) || vt.throwArgumentError("signature invalid _vs", "signature", r), e._vs = hn(e._vs, 32)), e._vs == null ? e._vs = i : e._vs !== i && vt.throwArgumentError("signature _vs mismatch v and s", "signature", r);
  }
  return e.yParityAndS = e._vs, e.compact = e.r + e.yParityAndS.substring(2), e;
}
function qo(r) {
  return "0x" + Rv.keccak_256(yt(r));
}
var Uo = { exports: {} };
Uo.exports;
(function(r) {
  (function(e, t) {
    function i(l, a) {
      if (!l)
        throw new Error(a || "Assertion failed");
    }
    function n(l, a) {
      l.super_ = a;
      var c = function() {
      };
      c.prototype = a.prototype, l.prototype = new c(), l.prototype.constructor = l;
    }
    function s(l, a, c) {
      if (s.isBN(l))
        return l;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, l !== null && ((a === "le" || a === "be") && (c = a, a = 10), this._init(l || 0, a || 10, c || "be"));
    }
    typeof e == "object" ? e.exports = s : t.BN = s, s.BN = s, s.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = fa.Buffer;
    } catch {
    }
    s.isBN = function(a) {
      return a instanceof s ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === s.wordSize && Array.isArray(a.words);
    }, s.max = function(a, c) {
      return a.cmp(c) > 0 ? a : c;
    }, s.min = function(a, c) {
      return a.cmp(c) < 0 ? a : c;
    }, s.prototype._init = function(a, c, b) {
      if (typeof a == "number")
        return this._initNumber(a, c, b);
      if (typeof a == "object")
        return this._initArray(a, c, b);
      c === "hex" && (c = 16), i(c === (c | 0) && c >= 2 && c <= 36), a = a.toString().replace(/\s+/g, "");
      var E = 0;
      a[0] === "-" && (E++, this.negative = 1), E < a.length && (c === 16 ? this._parseHex(a, E, b) : (this._parseBase(a, c, E), b === "le" && this._initArray(this.toArray(), c, b)));
    }, s.prototype._initNumber = function(a, c, b) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (i(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), b === "le" && this._initArray(this.toArray(), c, b);
    }, s.prototype._initArray = function(a, c, b) {
      if (i(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var E = 0; E < this.length; E++)
        this.words[E] = 0;
      var S, x, u = 0;
      if (b === "be")
        for (E = a.length - 1, S = 0; E >= 0; E -= 3)
          x = a[E] | a[E - 1] << 8 | a[E - 2] << 16, this.words[S] |= x << u & 67108863, this.words[S + 1] = x >>> 26 - u & 67108863, u += 24, u >= 26 && (u -= 26, S++);
      else if (b === "le")
        for (E = 0, S = 0; E < a.length; E += 3)
          x = a[E] | a[E + 1] << 8 | a[E + 2] << 16, this.words[S] |= x << u & 67108863, this.words[S + 1] = x >>> 26 - u & 67108863, u += 24, u >= 26 && (u -= 26, S++);
      return this._strip();
    };
    function f(l, a) {
      var c = l.charCodeAt(a);
      if (c >= 48 && c <= 57)
        return c - 48;
      if (c >= 65 && c <= 70)
        return c - 55;
      if (c >= 97 && c <= 102)
        return c - 87;
      i(!1, "Invalid character in " + l);
    }
    function h(l, a, c) {
      var b = f(l, c);
      return c - 1 >= a && (b |= f(l, c - 1) << 4), b;
    }
    s.prototype._parseHex = function(a, c, b) {
      this.length = Math.ceil((a.length - c) / 6), this.words = new Array(this.length);
      for (var E = 0; E < this.length; E++)
        this.words[E] = 0;
      var S = 0, x = 0, u;
      if (b === "be")
        for (E = a.length - 1; E >= c; E -= 2)
          u = h(a, c, E) << S, this.words[x] |= u & 67108863, S >= 18 ? (S -= 18, x += 1, this.words[x] |= u >>> 26) : S += 8;
      else {
        var m = a.length - c;
        for (E = m % 2 === 0 ? c + 1 : c; E < a.length; E += 2)
          u = h(a, c, E) << S, this.words[x] |= u & 67108863, S >= 18 ? (S -= 18, x += 1, this.words[x] |= u >>> 26) : S += 8;
      }
      this._strip();
    };
    function d(l, a, c, b) {
      for (var E = 0, S = 0, x = Math.min(l.length, c), u = a; u < x; u++) {
        var m = l.charCodeAt(u) - 48;
        E *= b, m >= 49 ? S = m - 49 + 10 : m >= 17 ? S = m - 17 + 10 : S = m, i(m >= 0 && S < b, "Invalid character"), E += S;
      }
      return E;
    }
    s.prototype._parseBase = function(a, c, b) {
      this.words = [0], this.length = 1;
      for (var E = 0, S = 1; S <= 67108863; S *= c)
        E++;
      E--, S = S / c | 0;
      for (var x = a.length - b, u = x % E, m = Math.min(x, x - u) + b, g = 0, P = b; P < m; P += E)
        g = d(a, P, P + E, c), this.imuln(S), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
      if (u !== 0) {
        var G = 1;
        for (g = d(a, P, a.length, c), P = 0; P < u; P++)
          G *= c;
        this.imuln(G), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
      }
      this._strip();
    }, s.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        a.words[c] = this.words[c];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    };
    function v(l, a) {
      l.words = a.words, l.length = a.length, l.negative = a.negative, l.red = a.red;
    }
    if (s.prototype._move = function(a) {
      v(a, this);
    }, s.prototype.clone = function() {
      var a = new s(null);
      return this.copy(a), a;
    }, s.prototype._expand = function(a) {
      for (; this.length < a; )
        this.words[this.length++] = 0;
      return this;
    }, s.prototype._strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, s.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, typeof Symbol < "u" && typeof Symbol.for == "function")
      try {
        s.prototype[Symbol.for("nodejs.util.inspect.custom")] = w;
      } catch {
        s.prototype.inspect = w;
      }
    else
      s.prototype.inspect = w;
    function w() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var A = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], I = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], D = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    s.prototype.toString = function(a, c) {
      a = a || 10, c = c | 0 || 1;
      var b;
      if (a === 16 || a === "hex") {
        b = "";
        for (var E = 0, S = 0, x = 0; x < this.length; x++) {
          var u = this.words[x], m = ((u << E | S) & 16777215).toString(16);
          S = u >>> 24 - E & 16777215, E += 2, E >= 26 && (E -= 26, x--), S !== 0 || x !== this.length - 1 ? b = A[6 - m.length] + m + b : b = m + b;
        }
        for (S !== 0 && (b = S.toString(16) + b); b.length % c !== 0; )
          b = "0" + b;
        return this.negative !== 0 && (b = "-" + b), b;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var g = I[a], P = D[a];
        b = "";
        var G = this.clone();
        for (G.negative = 0; !G.isZero(); ) {
          var M = G.modrn(P).toString(a);
          G = G.idivn(P), G.isZero() ? b = M + b : b = A[g - M.length] + M + b;
        }
        for (this.isZero() && (b = "0" + b); b.length % c !== 0; )
          b = "0" + b;
        return this.negative !== 0 && (b = "-" + b), b;
      }
      i(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, s.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, o && (s.prototype.toBuffer = function(a, c) {
      return this.toArrayLike(o, a, c);
    }), s.prototype.toArray = function(a, c) {
      return this.toArrayLike(Array, a, c);
    };
    var N = function(a, c) {
      return a.allocUnsafe ? a.allocUnsafe(c) : new a(c);
    };
    s.prototype.toArrayLike = function(a, c, b) {
      this._strip();
      var E = this.byteLength(), S = b || Math.max(1, E);
      i(E <= S, "byte array longer than desired length"), i(S > 0, "Requested array length <= 0");
      var x = N(a, S), u = c === "le" ? "LE" : "BE";
      return this["_toArrayLike" + u](x, E), x;
    }, s.prototype._toArrayLikeLE = function(a, c) {
      for (var b = 0, E = 0, S = 0, x = 0; S < this.length; S++) {
        var u = this.words[S] << x | E;
        a[b++] = u & 255, b < a.length && (a[b++] = u >> 8 & 255), b < a.length && (a[b++] = u >> 16 & 255), x === 6 ? (b < a.length && (a[b++] = u >> 24 & 255), E = 0, x = 0) : (E = u >>> 24, x += 2);
      }
      if (b < a.length)
        for (a[b++] = E; b < a.length; )
          a[b++] = 0;
    }, s.prototype._toArrayLikeBE = function(a, c) {
      for (var b = a.length - 1, E = 0, S = 0, x = 0; S < this.length; S++) {
        var u = this.words[S] << x | E;
        a[b--] = u & 255, b >= 0 && (a[b--] = u >> 8 & 255), b >= 0 && (a[b--] = u >> 16 & 255), x === 6 ? (b >= 0 && (a[b--] = u >> 24 & 255), E = 0, x = 0) : (E = u >>> 24, x += 2);
      }
      if (b >= 0)
        for (a[b--] = E; b >= 0; )
          a[b--] = 0;
    }, Math.clz32 ? s.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : s.prototype._countBits = function(a) {
      var c = a, b = 0;
      return c >= 4096 && (b += 13, c >>>= 13), c >= 64 && (b += 7, c >>>= 7), c >= 8 && (b += 4, c >>>= 4), c >= 2 && (b += 2, c >>>= 2), b + c;
    }, s.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var c = a, b = 0;
      return c & 8191 || (b += 13, c >>>= 13), c & 127 || (b += 7, c >>>= 7), c & 15 || (b += 4, c >>>= 4), c & 3 || (b += 2, c >>>= 2), c & 1 || b++, b;
    }, s.prototype.bitLength = function() {
      var a = this.words[this.length - 1], c = this._countBits(a);
      return (this.length - 1) * 26 + c;
    };
    function k(l) {
      for (var a = new Array(l.bitLength()), c = 0; c < a.length; c++) {
        var b = c / 26 | 0, E = c % 26;
        a[c] = l.words[b] >>> E & 1;
      }
      return a;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, c = 0; c < this.length; c++) {
        var b = this._zeroBits(this.words[c]);
        if (a += b, b !== 26)
          break;
      }
      return a;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(a) {
      return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(a) {
      return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(a) {
      for (; this.length < a.length; )
        this.words[this.length++] = 0;
      for (var c = 0; c < a.length; c++)
        this.words[c] = this.words[c] | a.words[c];
      return this._strip();
    }, s.prototype.ior = function(a) {
      return i((this.negative | a.negative) === 0), this.iuor(a);
    }, s.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, s.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, s.prototype.iuand = function(a) {
      var c;
      this.length > a.length ? c = a : c = this;
      for (var b = 0; b < c.length; b++)
        this.words[b] = this.words[b] & a.words[b];
      return this.length = c.length, this._strip();
    }, s.prototype.iand = function(a) {
      return i((this.negative | a.negative) === 0), this.iuand(a);
    }, s.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, s.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, s.prototype.iuxor = function(a) {
      var c, b;
      this.length > a.length ? (c = this, b = a) : (c = a, b = this);
      for (var E = 0; E < b.length; E++)
        this.words[E] = c.words[E] ^ b.words[E];
      if (this !== c)
        for (; E < c.length; E++)
          this.words[E] = c.words[E];
      return this.length = c.length, this._strip();
    }, s.prototype.ixor = function(a) {
      return i((this.negative | a.negative) === 0), this.iuxor(a);
    }, s.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, s.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, s.prototype.inotn = function(a) {
      i(typeof a == "number" && a >= 0);
      var c = Math.ceil(a / 26) | 0, b = a % 26;
      this._expand(c), b > 0 && c--;
      for (var E = 0; E < c; E++)
        this.words[E] = ~this.words[E] & 67108863;
      return b > 0 && (this.words[E] = ~this.words[E] & 67108863 >> 26 - b), this._strip();
    }, s.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, s.prototype.setn = function(a, c) {
      i(typeof a == "number" && a >= 0);
      var b = a / 26 | 0, E = a % 26;
      return this._expand(b + 1), c ? this.words[b] = this.words[b] | 1 << E : this.words[b] = this.words[b] & ~(1 << E), this._strip();
    }, s.prototype.iadd = function(a) {
      var c;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, c = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, c = this.isub(a), a.negative = 1, c._normSign();
      var b, E;
      this.length > a.length ? (b = this, E = a) : (b = a, E = this);
      for (var S = 0, x = 0; x < E.length; x++)
        c = (b.words[x] | 0) + (E.words[x] | 0) + S, this.words[x] = c & 67108863, S = c >>> 26;
      for (; S !== 0 && x < b.length; x++)
        c = (b.words[x] | 0) + S, this.words[x] = c & 67108863, S = c >>> 26;
      if (this.length = b.length, S !== 0)
        this.words[this.length] = S, this.length++;
      else if (b !== this)
        for (; x < b.length; x++)
          this.words[x] = b.words[x];
      return this;
    }, s.prototype.add = function(a) {
      var c;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, c = this.sub(a), a.negative ^= 1, c) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, c = a.sub(this), this.negative = 1, c) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, s.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var c = this.iadd(a);
        return a.negative = 1, c._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var b = this.cmp(a);
      if (b === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var E, S;
      b > 0 ? (E = this, S = a) : (E = a, S = this);
      for (var x = 0, u = 0; u < S.length; u++)
        c = (E.words[u] | 0) - (S.words[u] | 0) + x, x = c >> 26, this.words[u] = c & 67108863;
      for (; x !== 0 && u < E.length; u++)
        c = (E.words[u] | 0) + x, x = c >> 26, this.words[u] = c & 67108863;
      if (x === 0 && u < E.length && E !== this)
        for (; u < E.length; u++)
          this.words[u] = E.words[u];
      return this.length = Math.max(this.length, u), E !== this && (this.negative = 1), this._strip();
    }, s.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function j(l, a, c) {
      c.negative = a.negative ^ l.negative;
      var b = l.length + a.length | 0;
      c.length = b, b = b - 1 | 0;
      var E = l.words[0] | 0, S = a.words[0] | 0, x = E * S, u = x & 67108863, m = x / 67108864 | 0;
      c.words[0] = u;
      for (var g = 1; g < b; g++) {
        for (var P = m >>> 26, G = m & 67108863, M = Math.min(g, a.length - 1), H = Math.max(0, g - l.length + 1); H <= M; H++) {
          var C = g - H | 0;
          E = l.words[C] | 0, S = a.words[H] | 0, x = E * S + G, P += x / 67108864 | 0, G = x & 67108863;
        }
        c.words[g] = G | 0, m = P | 0;
      }
      return m !== 0 ? c.words[g] = m | 0 : c.length--, c._strip();
    }
    var T = function(a, c, b) {
      var E = a.words, S = c.words, x = b.words, u = 0, m, g, P, G = E[0] | 0, M = G & 8191, H = G >>> 13, C = E[1] | 0, q = C & 8191, L = C >>> 13, y = E[2] | 0, F = y & 8191, W = y >>> 13, Y = E[3] | 0, X = Y & 8191, ee = Y >>> 13, we = E[4] | 0, Me = we & 8191, he = we >>> 13, Re = E[5] | 0, xe = Re & 8191, se = Re >>> 13, ge = E[6] | 0, le = ge & 8191, ne = ge >>> 13, ue = E[7] | 0, fe = ue & 8191, te = ue >>> 13, pe = E[8] | 0, _e = pe & 8191, re = pe >>> 13, Ee = E[9] | 0, Se = Ee & 8191, oe = Ee >>> 13, De = S[0] | 0, Ie = De & 8191, Pe = De >>> 13, Ge = S[1] | 0, Ye = Ge & 8191, Ae = Ge >>> 13, Ze = S[2] | 0, et = Ze & 8191, Ne = Ze >>> 13, Ce = S[3] | 0, Te = Ce & 8191, de = Ce >>> 13, $e = S[4] | 0, Le = $e & 8191, ce = $e >>> 13, Ue = S[5] | 0, ze = Ue & 8191, ye = Ue >>> 13, Be = S[6] | 0, ke = Be & 8191, ve = Be >>> 13, Fe = S[7] | 0, Oe = Fe & 8191, me = Fe >>> 13, je = S[8] | 0, rt = je & 8191, qe = je >>> 13, it = S[9] | 0, Je = it & 8191, tt = it >>> 13;
      b.negative = a.negative ^ c.negative, b.length = 19, m = Math.imul(M, Ie), g = Math.imul(M, Pe), g = g + Math.imul(H, Ie) | 0, P = Math.imul(H, Pe);
      var jt = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, m = Math.imul(q, Ie), g = Math.imul(q, Pe), g = g + Math.imul(L, Ie) | 0, P = Math.imul(L, Pe), m = m + Math.imul(M, Ye) | 0, g = g + Math.imul(M, Ae) | 0, g = g + Math.imul(H, Ye) | 0, P = P + Math.imul(H, Ae) | 0;
      var Kt = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, m = Math.imul(F, Ie), g = Math.imul(F, Pe), g = g + Math.imul(W, Ie) | 0, P = Math.imul(W, Pe), m = m + Math.imul(q, Ye) | 0, g = g + Math.imul(q, Ae) | 0, g = g + Math.imul(L, Ye) | 0, P = P + Math.imul(L, Ae) | 0, m = m + Math.imul(M, et) | 0, g = g + Math.imul(M, Ne) | 0, g = g + Math.imul(H, et) | 0, P = P + Math.imul(H, Ne) | 0;
      var Ht = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, m = Math.imul(X, Ie), g = Math.imul(X, Pe), g = g + Math.imul(ee, Ie) | 0, P = Math.imul(ee, Pe), m = m + Math.imul(F, Ye) | 0, g = g + Math.imul(F, Ae) | 0, g = g + Math.imul(W, Ye) | 0, P = P + Math.imul(W, Ae) | 0, m = m + Math.imul(q, et) | 0, g = g + Math.imul(q, Ne) | 0, g = g + Math.imul(L, et) | 0, P = P + Math.imul(L, Ne) | 0, m = m + Math.imul(M, Te) | 0, g = g + Math.imul(M, de) | 0, g = g + Math.imul(H, Te) | 0, P = P + Math.imul(H, de) | 0;
      var Vt = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, m = Math.imul(Me, Ie), g = Math.imul(Me, Pe), g = g + Math.imul(he, Ie) | 0, P = Math.imul(he, Pe), m = m + Math.imul(X, Ye) | 0, g = g + Math.imul(X, Ae) | 0, g = g + Math.imul(ee, Ye) | 0, P = P + Math.imul(ee, Ae) | 0, m = m + Math.imul(F, et) | 0, g = g + Math.imul(F, Ne) | 0, g = g + Math.imul(W, et) | 0, P = P + Math.imul(W, Ne) | 0, m = m + Math.imul(q, Te) | 0, g = g + Math.imul(q, de) | 0, g = g + Math.imul(L, Te) | 0, P = P + Math.imul(L, de) | 0, m = m + Math.imul(M, Le) | 0, g = g + Math.imul(M, ce) | 0, g = g + Math.imul(H, Le) | 0, P = P + Math.imul(H, ce) | 0;
      var gt = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, m = Math.imul(xe, Ie), g = Math.imul(xe, Pe), g = g + Math.imul(se, Ie) | 0, P = Math.imul(se, Pe), m = m + Math.imul(Me, Ye) | 0, g = g + Math.imul(Me, Ae) | 0, g = g + Math.imul(he, Ye) | 0, P = P + Math.imul(he, Ae) | 0, m = m + Math.imul(X, et) | 0, g = g + Math.imul(X, Ne) | 0, g = g + Math.imul(ee, et) | 0, P = P + Math.imul(ee, Ne) | 0, m = m + Math.imul(F, Te) | 0, g = g + Math.imul(F, de) | 0, g = g + Math.imul(W, Te) | 0, P = P + Math.imul(W, de) | 0, m = m + Math.imul(q, Le) | 0, g = g + Math.imul(q, ce) | 0, g = g + Math.imul(L, Le) | 0, P = P + Math.imul(L, ce) | 0, m = m + Math.imul(M, ze) | 0, g = g + Math.imul(M, ye) | 0, g = g + Math.imul(H, ze) | 0, P = P + Math.imul(H, ye) | 0;
      var Vr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Vr >>> 26) | 0, Vr &= 67108863, m = Math.imul(le, Ie), g = Math.imul(le, Pe), g = g + Math.imul(ne, Ie) | 0, P = Math.imul(ne, Pe), m = m + Math.imul(xe, Ye) | 0, g = g + Math.imul(xe, Ae) | 0, g = g + Math.imul(se, Ye) | 0, P = P + Math.imul(se, Ae) | 0, m = m + Math.imul(Me, et) | 0, g = g + Math.imul(Me, Ne) | 0, g = g + Math.imul(he, et) | 0, P = P + Math.imul(he, Ne) | 0, m = m + Math.imul(X, Te) | 0, g = g + Math.imul(X, de) | 0, g = g + Math.imul(ee, Te) | 0, P = P + Math.imul(ee, de) | 0, m = m + Math.imul(F, Le) | 0, g = g + Math.imul(F, ce) | 0, g = g + Math.imul(W, Le) | 0, P = P + Math.imul(W, ce) | 0, m = m + Math.imul(q, ze) | 0, g = g + Math.imul(q, ye) | 0, g = g + Math.imul(L, ze) | 0, P = P + Math.imul(L, ye) | 0, m = m + Math.imul(M, ke) | 0, g = g + Math.imul(M, ve) | 0, g = g + Math.imul(H, ke) | 0, P = P + Math.imul(H, ve) | 0;
      var Wr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Wr >>> 26) | 0, Wr &= 67108863, m = Math.imul(fe, Ie), g = Math.imul(fe, Pe), g = g + Math.imul(te, Ie) | 0, P = Math.imul(te, Pe), m = m + Math.imul(le, Ye) | 0, g = g + Math.imul(le, Ae) | 0, g = g + Math.imul(ne, Ye) | 0, P = P + Math.imul(ne, Ae) | 0, m = m + Math.imul(xe, et) | 0, g = g + Math.imul(xe, Ne) | 0, g = g + Math.imul(se, et) | 0, P = P + Math.imul(se, Ne) | 0, m = m + Math.imul(Me, Te) | 0, g = g + Math.imul(Me, de) | 0, g = g + Math.imul(he, Te) | 0, P = P + Math.imul(he, de) | 0, m = m + Math.imul(X, Le) | 0, g = g + Math.imul(X, ce) | 0, g = g + Math.imul(ee, Le) | 0, P = P + Math.imul(ee, ce) | 0, m = m + Math.imul(F, ze) | 0, g = g + Math.imul(F, ye) | 0, g = g + Math.imul(W, ze) | 0, P = P + Math.imul(W, ye) | 0, m = m + Math.imul(q, ke) | 0, g = g + Math.imul(q, ve) | 0, g = g + Math.imul(L, ke) | 0, P = P + Math.imul(L, ve) | 0, m = m + Math.imul(M, Oe) | 0, g = g + Math.imul(M, me) | 0, g = g + Math.imul(H, Oe) | 0, P = P + Math.imul(H, me) | 0;
      var Gr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Gr >>> 26) | 0, Gr &= 67108863, m = Math.imul(_e, Ie), g = Math.imul(_e, Pe), g = g + Math.imul(re, Ie) | 0, P = Math.imul(re, Pe), m = m + Math.imul(fe, Ye) | 0, g = g + Math.imul(fe, Ae) | 0, g = g + Math.imul(te, Ye) | 0, P = P + Math.imul(te, Ae) | 0, m = m + Math.imul(le, et) | 0, g = g + Math.imul(le, Ne) | 0, g = g + Math.imul(ne, et) | 0, P = P + Math.imul(ne, Ne) | 0, m = m + Math.imul(xe, Te) | 0, g = g + Math.imul(xe, de) | 0, g = g + Math.imul(se, Te) | 0, P = P + Math.imul(se, de) | 0, m = m + Math.imul(Me, Le) | 0, g = g + Math.imul(Me, ce) | 0, g = g + Math.imul(he, Le) | 0, P = P + Math.imul(he, ce) | 0, m = m + Math.imul(X, ze) | 0, g = g + Math.imul(X, ye) | 0, g = g + Math.imul(ee, ze) | 0, P = P + Math.imul(ee, ye) | 0, m = m + Math.imul(F, ke) | 0, g = g + Math.imul(F, ve) | 0, g = g + Math.imul(W, ke) | 0, P = P + Math.imul(W, ve) | 0, m = m + Math.imul(q, Oe) | 0, g = g + Math.imul(q, me) | 0, g = g + Math.imul(L, Oe) | 0, P = P + Math.imul(L, me) | 0, m = m + Math.imul(M, rt) | 0, g = g + Math.imul(M, qe) | 0, g = g + Math.imul(H, rt) | 0, P = P + Math.imul(H, qe) | 0;
      var Jr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Jr >>> 26) | 0, Jr &= 67108863, m = Math.imul(Se, Ie), g = Math.imul(Se, Pe), g = g + Math.imul(oe, Ie) | 0, P = Math.imul(oe, Pe), m = m + Math.imul(_e, Ye) | 0, g = g + Math.imul(_e, Ae) | 0, g = g + Math.imul(re, Ye) | 0, P = P + Math.imul(re, Ae) | 0, m = m + Math.imul(fe, et) | 0, g = g + Math.imul(fe, Ne) | 0, g = g + Math.imul(te, et) | 0, P = P + Math.imul(te, Ne) | 0, m = m + Math.imul(le, Te) | 0, g = g + Math.imul(le, de) | 0, g = g + Math.imul(ne, Te) | 0, P = P + Math.imul(ne, de) | 0, m = m + Math.imul(xe, Le) | 0, g = g + Math.imul(xe, ce) | 0, g = g + Math.imul(se, Le) | 0, P = P + Math.imul(se, ce) | 0, m = m + Math.imul(Me, ze) | 0, g = g + Math.imul(Me, ye) | 0, g = g + Math.imul(he, ze) | 0, P = P + Math.imul(he, ye) | 0, m = m + Math.imul(X, ke) | 0, g = g + Math.imul(X, ve) | 0, g = g + Math.imul(ee, ke) | 0, P = P + Math.imul(ee, ve) | 0, m = m + Math.imul(F, Oe) | 0, g = g + Math.imul(F, me) | 0, g = g + Math.imul(W, Oe) | 0, P = P + Math.imul(W, me) | 0, m = m + Math.imul(q, rt) | 0, g = g + Math.imul(q, qe) | 0, g = g + Math.imul(L, rt) | 0, P = P + Math.imul(L, qe) | 0, m = m + Math.imul(M, Je) | 0, g = g + Math.imul(M, tt) | 0, g = g + Math.imul(H, Je) | 0, P = P + Math.imul(H, tt) | 0;
      var Yr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Yr >>> 26) | 0, Yr &= 67108863, m = Math.imul(Se, Ye), g = Math.imul(Se, Ae), g = g + Math.imul(oe, Ye) | 0, P = Math.imul(oe, Ae), m = m + Math.imul(_e, et) | 0, g = g + Math.imul(_e, Ne) | 0, g = g + Math.imul(re, et) | 0, P = P + Math.imul(re, Ne) | 0, m = m + Math.imul(fe, Te) | 0, g = g + Math.imul(fe, de) | 0, g = g + Math.imul(te, Te) | 0, P = P + Math.imul(te, de) | 0, m = m + Math.imul(le, Le) | 0, g = g + Math.imul(le, ce) | 0, g = g + Math.imul(ne, Le) | 0, P = P + Math.imul(ne, ce) | 0, m = m + Math.imul(xe, ze) | 0, g = g + Math.imul(xe, ye) | 0, g = g + Math.imul(se, ze) | 0, P = P + Math.imul(se, ye) | 0, m = m + Math.imul(Me, ke) | 0, g = g + Math.imul(Me, ve) | 0, g = g + Math.imul(he, ke) | 0, P = P + Math.imul(he, ve) | 0, m = m + Math.imul(X, Oe) | 0, g = g + Math.imul(X, me) | 0, g = g + Math.imul(ee, Oe) | 0, P = P + Math.imul(ee, me) | 0, m = m + Math.imul(F, rt) | 0, g = g + Math.imul(F, qe) | 0, g = g + Math.imul(W, rt) | 0, P = P + Math.imul(W, qe) | 0, m = m + Math.imul(q, Je) | 0, g = g + Math.imul(q, tt) | 0, g = g + Math.imul(L, Je) | 0, P = P + Math.imul(L, tt) | 0;
      var or = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, m = Math.imul(Se, et), g = Math.imul(Se, Ne), g = g + Math.imul(oe, et) | 0, P = Math.imul(oe, Ne), m = m + Math.imul(_e, Te) | 0, g = g + Math.imul(_e, de) | 0, g = g + Math.imul(re, Te) | 0, P = P + Math.imul(re, de) | 0, m = m + Math.imul(fe, Le) | 0, g = g + Math.imul(fe, ce) | 0, g = g + Math.imul(te, Le) | 0, P = P + Math.imul(te, ce) | 0, m = m + Math.imul(le, ze) | 0, g = g + Math.imul(le, ye) | 0, g = g + Math.imul(ne, ze) | 0, P = P + Math.imul(ne, ye) | 0, m = m + Math.imul(xe, ke) | 0, g = g + Math.imul(xe, ve) | 0, g = g + Math.imul(se, ke) | 0, P = P + Math.imul(se, ve) | 0, m = m + Math.imul(Me, Oe) | 0, g = g + Math.imul(Me, me) | 0, g = g + Math.imul(he, Oe) | 0, P = P + Math.imul(he, me) | 0, m = m + Math.imul(X, rt) | 0, g = g + Math.imul(X, qe) | 0, g = g + Math.imul(ee, rt) | 0, P = P + Math.imul(ee, qe) | 0, m = m + Math.imul(F, Je) | 0, g = g + Math.imul(F, tt) | 0, g = g + Math.imul(W, Je) | 0, P = P + Math.imul(W, tt) | 0;
      var Xr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Xr >>> 26) | 0, Xr &= 67108863, m = Math.imul(Se, Te), g = Math.imul(Se, de), g = g + Math.imul(oe, Te) | 0, P = Math.imul(oe, de), m = m + Math.imul(_e, Le) | 0, g = g + Math.imul(_e, ce) | 0, g = g + Math.imul(re, Le) | 0, P = P + Math.imul(re, ce) | 0, m = m + Math.imul(fe, ze) | 0, g = g + Math.imul(fe, ye) | 0, g = g + Math.imul(te, ze) | 0, P = P + Math.imul(te, ye) | 0, m = m + Math.imul(le, ke) | 0, g = g + Math.imul(le, ve) | 0, g = g + Math.imul(ne, ke) | 0, P = P + Math.imul(ne, ve) | 0, m = m + Math.imul(xe, Oe) | 0, g = g + Math.imul(xe, me) | 0, g = g + Math.imul(se, Oe) | 0, P = P + Math.imul(se, me) | 0, m = m + Math.imul(Me, rt) | 0, g = g + Math.imul(Me, qe) | 0, g = g + Math.imul(he, rt) | 0, P = P + Math.imul(he, qe) | 0, m = m + Math.imul(X, Je) | 0, g = g + Math.imul(X, tt) | 0, g = g + Math.imul(ee, Je) | 0, P = P + Math.imul(ee, tt) | 0;
      var Zr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Zr >>> 26) | 0, Zr &= 67108863, m = Math.imul(Se, Le), g = Math.imul(Se, ce), g = g + Math.imul(oe, Le) | 0, P = Math.imul(oe, ce), m = m + Math.imul(_e, ze) | 0, g = g + Math.imul(_e, ye) | 0, g = g + Math.imul(re, ze) | 0, P = P + Math.imul(re, ye) | 0, m = m + Math.imul(fe, ke) | 0, g = g + Math.imul(fe, ve) | 0, g = g + Math.imul(te, ke) | 0, P = P + Math.imul(te, ve) | 0, m = m + Math.imul(le, Oe) | 0, g = g + Math.imul(le, me) | 0, g = g + Math.imul(ne, Oe) | 0, P = P + Math.imul(ne, me) | 0, m = m + Math.imul(xe, rt) | 0, g = g + Math.imul(xe, qe) | 0, g = g + Math.imul(se, rt) | 0, P = P + Math.imul(se, qe) | 0, m = m + Math.imul(Me, Je) | 0, g = g + Math.imul(Me, tt) | 0, g = g + Math.imul(he, Je) | 0, P = P + Math.imul(he, tt) | 0;
      var $t = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, m = Math.imul(Se, ze), g = Math.imul(Se, ye), g = g + Math.imul(oe, ze) | 0, P = Math.imul(oe, ye), m = m + Math.imul(_e, ke) | 0, g = g + Math.imul(_e, ve) | 0, g = g + Math.imul(re, ke) | 0, P = P + Math.imul(re, ve) | 0, m = m + Math.imul(fe, Oe) | 0, g = g + Math.imul(fe, me) | 0, g = g + Math.imul(te, Oe) | 0, P = P + Math.imul(te, me) | 0, m = m + Math.imul(le, rt) | 0, g = g + Math.imul(le, qe) | 0, g = g + Math.imul(ne, rt) | 0, P = P + Math.imul(ne, qe) | 0, m = m + Math.imul(xe, Je) | 0, g = g + Math.imul(xe, tt) | 0, g = g + Math.imul(se, Je) | 0, P = P + Math.imul(se, tt) | 0;
      var Qr = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (Qr >>> 26) | 0, Qr &= 67108863, m = Math.imul(Se, ke), g = Math.imul(Se, ve), g = g + Math.imul(oe, ke) | 0, P = Math.imul(oe, ve), m = m + Math.imul(_e, Oe) | 0, g = g + Math.imul(_e, me) | 0, g = g + Math.imul(re, Oe) | 0, P = P + Math.imul(re, me) | 0, m = m + Math.imul(fe, rt) | 0, g = g + Math.imul(fe, qe) | 0, g = g + Math.imul(te, rt) | 0, P = P + Math.imul(te, qe) | 0, m = m + Math.imul(le, Je) | 0, g = g + Math.imul(le, tt) | 0, g = g + Math.imul(ne, Je) | 0, P = P + Math.imul(ne, tt) | 0;
      var ei = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, m = Math.imul(Se, Oe), g = Math.imul(Se, me), g = g + Math.imul(oe, Oe) | 0, P = Math.imul(oe, me), m = m + Math.imul(_e, rt) | 0, g = g + Math.imul(_e, qe) | 0, g = g + Math.imul(re, rt) | 0, P = P + Math.imul(re, qe) | 0, m = m + Math.imul(fe, Je) | 0, g = g + Math.imul(fe, tt) | 0, g = g + Math.imul(te, Je) | 0, P = P + Math.imul(te, tt) | 0;
      var ti = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, m = Math.imul(Se, rt), g = Math.imul(Se, qe), g = g + Math.imul(oe, rt) | 0, P = Math.imul(oe, qe), m = m + Math.imul(_e, Je) | 0, g = g + Math.imul(_e, tt) | 0, g = g + Math.imul(re, Je) | 0, P = P + Math.imul(re, tt) | 0;
      var An = (u + m | 0) + ((g & 8191) << 13) | 0;
      u = (P + (g >>> 13) | 0) + (An >>> 26) | 0, An &= 67108863, m = Math.imul(Se, Je), g = Math.imul(Se, tt), g = g + Math.imul(oe, Je) | 0, P = Math.imul(oe, tt);
      var Dn = (u + m | 0) + ((g & 8191) << 13) | 0;
      return u = (P + (g >>> 13) | 0) + (Dn >>> 26) | 0, Dn &= 67108863, x[0] = jt, x[1] = Kt, x[2] = Ht, x[3] = Vt, x[4] = gt, x[5] = Vr, x[6] = Wr, x[7] = Gr, x[8] = Jr, x[9] = Yr, x[10] = or, x[11] = Xr, x[12] = Zr, x[13] = $t, x[14] = Qr, x[15] = ei, x[16] = ti, x[17] = An, x[18] = Dn, u !== 0 && (x[19] = u, b.length++), b;
    };
    Math.imul || (T = j);
    function K(l, a, c) {
      c.negative = a.negative ^ l.negative, c.length = l.length + a.length;
      for (var b = 0, E = 0, S = 0; S < c.length - 1; S++) {
        var x = E;
        E = 0;
        for (var u = b & 67108863, m = Math.min(S, a.length - 1), g = Math.max(0, S - l.length + 1); g <= m; g++) {
          var P = S - g, G = l.words[P] | 0, M = a.words[g] | 0, H = G * M, C = H & 67108863;
          x = x + (H / 67108864 | 0) | 0, C = C + u | 0, u = C & 67108863, x = x + (C >>> 26) | 0, E += x >>> 26, x &= 67108863;
        }
        c.words[S] = u, b = x, x = E;
      }
      return b !== 0 ? c.words[S] = b : c.length--, c._strip();
    }
    function $(l, a, c) {
      return K(l, a, c);
    }
    s.prototype.mulTo = function(a, c) {
      var b, E = this.length + a.length;
      return this.length === 10 && a.length === 10 ? b = T(this, a, c) : E < 63 ? b = j(this, a, c) : E < 1024 ? b = K(this, a, c) : b = $(this, a, c), b;
    }, s.prototype.mul = function(a) {
      var c = new s(null);
      return c.words = new Array(this.length + a.length), this.mulTo(a, c);
    }, s.prototype.mulf = function(a) {
      var c = new s(null);
      return c.words = new Array(this.length + a.length), $(this, a, c);
    }, s.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, s.prototype.imuln = function(a) {
      var c = a < 0;
      c && (a = -a), i(typeof a == "number"), i(a < 67108864);
      for (var b = 0, E = 0; E < this.length; E++) {
        var S = (this.words[E] | 0) * a, x = (S & 67108863) + (b & 67108863);
        b >>= 26, b += S / 67108864 | 0, b += x >>> 26, this.words[E] = x & 67108863;
      }
      return b !== 0 && (this.words[E] = b, this.length++), c ? this.ineg() : this;
    }, s.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(a) {
      var c = k(a);
      if (c.length === 0)
        return new s(1);
      for (var b = this, E = 0; E < c.length && c[E] === 0; E++, b = b.sqr())
        ;
      if (++E < c.length)
        for (var S = b.sqr(); E < c.length; E++, S = S.sqr())
          c[E] !== 0 && (b = b.mul(S));
      return b;
    }, s.prototype.iushln = function(a) {
      i(typeof a == "number" && a >= 0);
      var c = a % 26, b = (a - c) / 26, E = 67108863 >>> 26 - c << 26 - c, S;
      if (c !== 0) {
        var x = 0;
        for (S = 0; S < this.length; S++) {
          var u = this.words[S] & E, m = (this.words[S] | 0) - u << c;
          this.words[S] = m | x, x = u >>> 26 - c;
        }
        x && (this.words[S] = x, this.length++);
      }
      if (b !== 0) {
        for (S = this.length - 1; S >= 0; S--)
          this.words[S + b] = this.words[S];
        for (S = 0; S < b; S++)
          this.words[S] = 0;
        this.length += b;
      }
      return this._strip();
    }, s.prototype.ishln = function(a) {
      return i(this.negative === 0), this.iushln(a);
    }, s.prototype.iushrn = function(a, c, b) {
      i(typeof a == "number" && a >= 0);
      var E;
      c ? E = (c - c % 26) / 26 : E = 0;
      var S = a % 26, x = Math.min((a - S) / 26, this.length), u = 67108863 ^ 67108863 >>> S << S, m = b;
      if (E -= x, E = Math.max(0, E), m) {
        for (var g = 0; g < x; g++)
          m.words[g] = this.words[g];
        m.length = x;
      }
      if (x !== 0)
        if (this.length > x)
          for (this.length -= x, g = 0; g < this.length; g++)
            this.words[g] = this.words[g + x];
        else
          this.words[0] = 0, this.length = 1;
      var P = 0;
      for (g = this.length - 1; g >= 0 && (P !== 0 || g >= E); g--) {
        var G = this.words[g] | 0;
        this.words[g] = P << 26 - S | G >>> S, P = G & u;
      }
      return m && P !== 0 && (m.words[m.length++] = P), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, s.prototype.ishrn = function(a, c, b) {
      return i(this.negative === 0), this.iushrn(a, c, b);
    }, s.prototype.shln = function(a) {
      return this.clone().ishln(a);
    }, s.prototype.ushln = function(a) {
      return this.clone().iushln(a);
    }, s.prototype.shrn = function(a) {
      return this.clone().ishrn(a);
    }, s.prototype.ushrn = function(a) {
      return this.clone().iushrn(a);
    }, s.prototype.testn = function(a) {
      i(typeof a == "number" && a >= 0);
      var c = a % 26, b = (a - c) / 26, E = 1 << c;
      if (this.length <= b)
        return !1;
      var S = this.words[b];
      return !!(S & E);
    }, s.prototype.imaskn = function(a) {
      i(typeof a == "number" && a >= 0);
      var c = a % 26, b = (a - c) / 26;
      if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= b)
        return this;
      if (c !== 0 && b++, this.length = Math.min(b, this.length), c !== 0) {
        var E = 67108863 ^ 67108863 >>> c << c;
        this.words[this.length - 1] &= E;
      }
      return this._strip();
    }, s.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, s.prototype.iaddn = function(a) {
      return i(typeof a == "number"), i(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, s.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var c = 0; c < this.length && this.words[c] >= 67108864; c++)
        this.words[c] -= 67108864, c === this.length - 1 ? this.words[c + 1] = 1 : this.words[c + 1]++;
      return this.length = Math.max(this.length, c + 1), this;
    }, s.prototype.isubn = function(a) {
      if (i(typeof a == "number"), i(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var c = 0; c < this.length && this.words[c] < 0; c++)
          this.words[c] += 67108864, this.words[c + 1] -= 1;
      return this._strip();
    }, s.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, s.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(a, c, b) {
      var E = a.length + b, S;
      this._expand(E);
      var x, u = 0;
      for (S = 0; S < a.length; S++) {
        x = (this.words[S + b] | 0) + u;
        var m = (a.words[S] | 0) * c;
        x -= m & 67108863, u = (x >> 26) - (m / 67108864 | 0), this.words[S + b] = x & 67108863;
      }
      for (; S < this.length - b; S++)
        x = (this.words[S + b] | 0) + u, u = x >> 26, this.words[S + b] = x & 67108863;
      if (u === 0)
        return this._strip();
      for (i(u === -1), u = 0, S = 0; S < this.length; S++)
        x = -(this.words[S] | 0) + u, u = x >> 26, this.words[S] = x & 67108863;
      return this.negative = 1, this._strip();
    }, s.prototype._wordDiv = function(a, c) {
      var b = this.length - a.length, E = this.clone(), S = a, x = S.words[S.length - 1] | 0, u = this._countBits(x);
      b = 26 - u, b !== 0 && (S = S.ushln(b), E.iushln(b), x = S.words[S.length - 1] | 0);
      var m = E.length - S.length, g;
      if (c !== "mod") {
        g = new s(null), g.length = m + 1, g.words = new Array(g.length);
        for (var P = 0; P < g.length; P++)
          g.words[P] = 0;
      }
      var G = E.clone()._ishlnsubmul(S, 1, m);
      G.negative === 0 && (E = G, g && (g.words[m] = 1));
      for (var M = m - 1; M >= 0; M--) {
        var H = (E.words[S.length + M] | 0) * 67108864 + (E.words[S.length + M - 1] | 0);
        for (H = Math.min(H / x | 0, 67108863), E._ishlnsubmul(S, H, M); E.negative !== 0; )
          H--, E.negative = 0, E._ishlnsubmul(S, 1, M), E.isZero() || (E.negative ^= 1);
        g && (g.words[M] = H);
      }
      return g && g._strip(), E._strip(), c !== "div" && b !== 0 && E.iushrn(b), {
        div: g || null,
        mod: E
      };
    }, s.prototype.divmod = function(a, c, b) {
      if (i(!a.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var E, S, x;
      return this.negative !== 0 && a.negative === 0 ? (x = this.neg().divmod(a, c), c !== "mod" && (E = x.div.neg()), c !== "div" && (S = x.mod.neg(), b && S.negative !== 0 && S.iadd(a)), {
        div: E,
        mod: S
      }) : this.negative === 0 && a.negative !== 0 ? (x = this.divmod(a.neg(), c), c !== "mod" && (E = x.div.neg()), {
        div: E,
        mod: x.mod
      }) : this.negative & a.negative ? (x = this.neg().divmod(a.neg(), c), c !== "div" && (S = x.mod.neg(), b && S.negative !== 0 && S.isub(a)), {
        div: x.div,
        mod: S
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new s(0),
        mod: this
      } : a.length === 1 ? c === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : c === "mod" ? {
        div: null,
        mod: new s(this.modrn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new s(this.modrn(a.words[0]))
      } : this._wordDiv(a, c);
    }, s.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, s.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, s.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, s.prototype.divRound = function(a) {
      var c = this.divmod(a);
      if (c.mod.isZero())
        return c.div;
      var b = c.div.negative !== 0 ? c.mod.isub(a) : c.mod, E = a.ushrn(1), S = a.andln(1), x = b.cmp(E);
      return x < 0 || S === 1 && x === 0 ? c.div : c.div.negative !== 0 ? c.div.isubn(1) : c.div.iaddn(1);
    }, s.prototype.modrn = function(a) {
      var c = a < 0;
      c && (a = -a), i(a <= 67108863);
      for (var b = (1 << 26) % a, E = 0, S = this.length - 1; S >= 0; S--)
        E = (b * E + (this.words[S] | 0)) % a;
      return c ? -E : E;
    }, s.prototype.modn = function(a) {
      return this.modrn(a);
    }, s.prototype.idivn = function(a) {
      var c = a < 0;
      c && (a = -a), i(a <= 67108863);
      for (var b = 0, E = this.length - 1; E >= 0; E--) {
        var S = (this.words[E] | 0) + b * 67108864;
        this.words[E] = S / a | 0, b = S % a;
      }
      return this._strip(), c ? this.ineg() : this;
    }, s.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, s.prototype.egcd = function(a) {
      i(a.negative === 0), i(!a.isZero());
      var c = this, b = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var E = new s(1), S = new s(0), x = new s(0), u = new s(1), m = 0; c.isEven() && b.isEven(); )
        c.iushrn(1), b.iushrn(1), ++m;
      for (var g = b.clone(), P = c.clone(); !c.isZero(); ) {
        for (var G = 0, M = 1; !(c.words[0] & M) && G < 26; ++G, M <<= 1)
          ;
        if (G > 0)
          for (c.iushrn(G); G-- > 0; )
            (E.isOdd() || S.isOdd()) && (E.iadd(g), S.isub(P)), E.iushrn(1), S.iushrn(1);
        for (var H = 0, C = 1; !(b.words[0] & C) && H < 26; ++H, C <<= 1)
          ;
        if (H > 0)
          for (b.iushrn(H); H-- > 0; )
            (x.isOdd() || u.isOdd()) && (x.iadd(g), u.isub(P)), x.iushrn(1), u.iushrn(1);
        c.cmp(b) >= 0 ? (c.isub(b), E.isub(x), S.isub(u)) : (b.isub(c), x.isub(E), u.isub(S));
      }
      return {
        a: x,
        b: u,
        gcd: b.iushln(m)
      };
    }, s.prototype._invmp = function(a) {
      i(a.negative === 0), i(!a.isZero());
      var c = this, b = a.clone();
      c.negative !== 0 ? c = c.umod(a) : c = c.clone();
      for (var E = new s(1), S = new s(0), x = b.clone(); c.cmpn(1) > 0 && b.cmpn(1) > 0; ) {
        for (var u = 0, m = 1; !(c.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (c.iushrn(u); u-- > 0; )
            E.isOdd() && E.iadd(x), E.iushrn(1);
        for (var g = 0, P = 1; !(b.words[0] & P) && g < 26; ++g, P <<= 1)
          ;
        if (g > 0)
          for (b.iushrn(g); g-- > 0; )
            S.isOdd() && S.iadd(x), S.iushrn(1);
        c.cmp(b) >= 0 ? (c.isub(b), E.isub(S)) : (b.isub(c), S.isub(E));
      }
      var G;
      return c.cmpn(1) === 0 ? G = E : G = S, G.cmpn(0) < 0 && G.iadd(a), G;
    }, s.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var c = this.clone(), b = a.clone();
      c.negative = 0, b.negative = 0;
      for (var E = 0; c.isEven() && b.isEven(); E++)
        c.iushrn(1), b.iushrn(1);
      do {
        for (; c.isEven(); )
          c.iushrn(1);
        for (; b.isEven(); )
          b.iushrn(1);
        var S = c.cmp(b);
        if (S < 0) {
          var x = c;
          c = b, b = x;
        } else if (S === 0 || b.cmpn(1) === 0)
          break;
        c.isub(b);
      } while (!0);
      return b.iushln(E);
    }, s.prototype.invm = function(a) {
      return this.egcd(a).a.umod(a);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(a) {
      return this.words[0] & a;
    }, s.prototype.bincn = function(a) {
      i(typeof a == "number");
      var c = a % 26, b = (a - c) / 26, E = 1 << c;
      if (this.length <= b)
        return this._expand(b + 1), this.words[b] |= E, this;
      for (var S = E, x = b; S !== 0 && x < this.length; x++) {
        var u = this.words[x] | 0;
        u += S, S = u >>> 26, u &= 67108863, this.words[x] = u;
      }
      return S !== 0 && (this.words[x] = S, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(a) {
      var c = a < 0;
      if (this.negative !== 0 && !c)
        return -1;
      if (this.negative === 0 && c)
        return 1;
      this._strip();
      var b;
      if (this.length > 1)
        b = 1;
      else {
        c && (a = -a), i(a <= 67108863, "Number is too big");
        var E = this.words[0] | 0;
        b = E === a ? 0 : E < a ? -1 : 1;
      }
      return this.negative !== 0 ? -b | 0 : b;
    }, s.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var c = this.ucmp(a);
      return this.negative !== 0 ? -c | 0 : c;
    }, s.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var c = 0, b = this.length - 1; b >= 0; b--) {
        var E = this.words[b] | 0, S = a.words[b] | 0;
        if (E !== S) {
          E < S ? c = -1 : E > S && (c = 1);
          break;
        }
      }
      return c;
    }, s.prototype.gtn = function(a) {
      return this.cmpn(a) === 1;
    }, s.prototype.gt = function(a) {
      return this.cmp(a) === 1;
    }, s.prototype.gten = function(a) {
      return this.cmpn(a) >= 0;
    }, s.prototype.gte = function(a) {
      return this.cmp(a) >= 0;
    }, s.prototype.ltn = function(a) {
      return this.cmpn(a) === -1;
    }, s.prototype.lt = function(a) {
      return this.cmp(a) === -1;
    }, s.prototype.lten = function(a) {
      return this.cmpn(a) <= 0;
    }, s.prototype.lte = function(a) {
      return this.cmp(a) <= 0;
    }, s.prototype.eqn = function(a) {
      return this.cmpn(a) === 0;
    }, s.prototype.eq = function(a) {
      return this.cmp(a) === 0;
    }, s.red = function(a) {
      return new O(a);
    }, s.prototype.toRed = function(a) {
      return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
    }, s.prototype.fromRed = function() {
      return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(a) {
      return this.red = a, this;
    }, s.prototype.forceRed = function(a) {
      return i(!this.red, "Already a number in reduction context"), this._forceRed(a);
    }, s.prototype.redAdd = function(a) {
      return i(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
    }, s.prototype.redIAdd = function(a) {
      return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
    }, s.prototype.redSub = function(a) {
      return i(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
    }, s.prototype.redISub = function(a) {
      return i(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
    }, s.prototype.redShl = function(a) {
      return i(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
    }, s.prototype.redMul = function(a) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
    }, s.prototype.redIMul = function(a) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
    }, s.prototype.redSqr = function() {
      return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(a) {
      return i(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
    };
    var z = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function B(l, a) {
      this.name = l, this.p = new s(a, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    B.prototype._tmp = function() {
      var a = new s(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, B.prototype.ireduce = function(a) {
      var c = a, b;
      do
        this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), b = c.bitLength();
      while (b > this.n);
      var E = b < this.n ? -1 : c.ucmp(this.p);
      return E === 0 ? (c.words[0] = 0, c.length = 1) : E > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
    }, B.prototype.split = function(a, c) {
      a.iushrn(this.n, 0, c);
    }, B.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function _() {
      B.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    n(_, B), _.prototype.split = function(a, c) {
      for (var b = 4194303, E = Math.min(a.length, 9), S = 0; S < E; S++)
        c.words[S] = a.words[S];
      if (c.length = E, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var x = a.words[9];
      for (c.words[c.length++] = x & b, S = 10; S < a.length; S++) {
        var u = a.words[S] | 0;
        a.words[S - 10] = (u & b) << 4 | x >>> 22, x = u;
      }
      x >>>= 22, a.words[S - 10] = x, x === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, _.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var c = 0, b = 0; b < a.length; b++) {
        var E = a.words[b] | 0;
        c += E * 977, a.words[b] = c & 67108863, c = E * 64 + (c / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function R() {
      B.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    n(R, B);
    function J() {
      B.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    n(J, B);
    function Q() {
      B.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    n(Q, B), Q.prototype.imulK = function(a) {
      for (var c = 0, b = 0; b < a.length; b++) {
        var E = (a.words[b] | 0) * 19 + c, S = E & 67108863;
        E >>>= 26, a.words[b] = S, c = E;
      }
      return c !== 0 && (a.words[a.length++] = c), a;
    }, s._prime = function(a) {
      if (z[a])
        return z[a];
      var c;
      if (a === "k256")
        c = new _();
      else if (a === "p224")
        c = new R();
      else if (a === "p192")
        c = new J();
      else if (a === "p25519")
        c = new Q();
      else
        throw new Error("Unknown prime " + a);
      return z[a] = c, c;
    };
    function O(l) {
      if (typeof l == "string") {
        var a = s._prime(l);
        this.m = a.p, this.prime = a;
      } else
        i(l.gtn(1), "modulus must be greater than 1"), this.m = l, this.prime = null;
    }
    O.prototype._verify1 = function(a) {
      i(a.negative === 0, "red works only with positives"), i(a.red, "red works only with red numbers");
    }, O.prototype._verify2 = function(a, c) {
      i((a.negative | c.negative) === 0, "red works only with positives"), i(
        a.red && a.red === c.red,
        "red works only with red numbers"
      );
    }, O.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : (v(a, a.umod(this.m)._forceRed(this)), a);
    }, O.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, O.prototype.add = function(a, c) {
      this._verify2(a, c);
      var b = a.add(c);
      return b.cmp(this.m) >= 0 && b.isub(this.m), b._forceRed(this);
    }, O.prototype.iadd = function(a, c) {
      this._verify2(a, c);
      var b = a.iadd(c);
      return b.cmp(this.m) >= 0 && b.isub(this.m), b;
    }, O.prototype.sub = function(a, c) {
      this._verify2(a, c);
      var b = a.sub(c);
      return b.cmpn(0) < 0 && b.iadd(this.m), b._forceRed(this);
    }, O.prototype.isub = function(a, c) {
      this._verify2(a, c);
      var b = a.isub(c);
      return b.cmpn(0) < 0 && b.iadd(this.m), b;
    }, O.prototype.shl = function(a, c) {
      return this._verify1(a), this.imod(a.ushln(c));
    }, O.prototype.imul = function(a, c) {
      return this._verify2(a, c), this.imod(a.imul(c));
    }, O.prototype.mul = function(a, c) {
      return this._verify2(a, c), this.imod(a.mul(c));
    }, O.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, O.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, O.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var c = this.m.andln(3);
      if (i(c % 2 === 1), c === 3) {
        var b = this.m.add(new s(1)).iushrn(2);
        return this.pow(a, b);
      }
      for (var E = this.m.subn(1), S = 0; !E.isZero() && E.andln(1) === 0; )
        S++, E.iushrn(1);
      i(!E.isZero());
      var x = new s(1).toRed(this), u = x.redNeg(), m = this.m.subn(1).iushrn(1), g = this.m.bitLength();
      for (g = new s(2 * g * g).toRed(this); this.pow(g, m).cmp(u) !== 0; )
        g.redIAdd(u);
      for (var P = this.pow(g, E), G = this.pow(a, E.addn(1).iushrn(1)), M = this.pow(a, E), H = S; M.cmp(x) !== 0; ) {
        for (var C = M, q = 0; C.cmp(x) !== 0; q++)
          C = C.redSqr();
        i(q < H);
        var L = this.pow(P, new s(1).iushln(H - q - 1));
        G = G.redMul(L), P = L.redSqr(), M = M.redMul(P), H = q;
      }
      return G;
    }, O.prototype.invm = function(a) {
      var c = a._invmp(this.m);
      return c.negative !== 0 ? (c.negative = 0, this.imod(c).redNeg()) : this.imod(c);
    }, O.prototype.pow = function(a, c) {
      if (c.isZero())
        return new s(1).toRed(this);
      if (c.cmpn(1) === 0)
        return a.clone();
      var b = 4, E = new Array(1 << b);
      E[0] = new s(1).toRed(this), E[1] = a;
      for (var S = 2; S < E.length; S++)
        E[S] = this.mul(E[S - 1], a);
      var x = E[0], u = 0, m = 0, g = c.bitLength() % 26;
      for (g === 0 && (g = 26), S = c.length - 1; S >= 0; S--) {
        for (var P = c.words[S], G = g - 1; G >= 0; G--) {
          var M = P >> G & 1;
          if (x !== E[0] && (x = this.sqr(x)), M === 0 && u === 0) {
            m = 0;
            continue;
          }
          u <<= 1, u |= M, m++, !(m !== b && (S !== 0 || G !== 0)) && (x = this.mul(x, E[u]), m = 0, u = 0);
        }
        g = 26;
      }
      return x;
    }, O.prototype.convertTo = function(a) {
      var c = a.umod(this.m);
      return c === a ? c.clone() : c;
    }, O.prototype.convertFrom = function(a) {
      var c = a.clone();
      return c.red = null, c;
    }, s.mont = function(a) {
      return new p(a);
    };
    function p(l) {
      O.call(this, l), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(p, O), p.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, p.prototype.convertFrom = function(a) {
      var c = this.imod(a.mul(this.rinv));
      return c.red = null, c;
    }, p.prototype.imul = function(a, c) {
      if (a.isZero() || c.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var b = a.imul(c), E = b.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), S = b.isub(E).iushrn(this.shift), x = S;
      return S.cmp(this.m) >= 0 ? x = S.isub(this.m) : S.cmpn(0) < 0 && (x = S.iadd(this.m)), x._forceRed(this);
    }, p.prototype.mul = function(a, c) {
      if (a.isZero() || c.isZero())
        return new s(0)._forceRed(this);
      var b = a.mul(c), E = b.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), S = b.isub(E).iushrn(this.shift), x = S;
      return S.cmp(this.m) >= 0 ? x = S.isub(this.m) : S.cmpn(0) < 0 && (x = S.iadd(this.m)), x._forceRed(this);
    }, p.prototype.invm = function(a) {
      var c = this.imod(a._invmp(this.m).mul(this.r2));
      return c._forceRed(this);
    };
  })(r, _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c);
})(Uo);
var Uv = Uo.exports;
const Ke = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(Uv);
var zv = Ke.BN;
function Bv(r) {
  return new zv(r, 36).toString(16);
}
const kv = "strings/5.7.0", jv = new ht(kv);
var ks;
(function(r) {
  r.current = "", r.NFC = "NFC", r.NFD = "NFD", r.NFKC = "NFKC", r.NFKD = "NFKD";
})(ks || (ks = {}));
var ac;
(function(r) {
  r.UNEXPECTED_CONTINUE = "unexpected continuation byte", r.BAD_PREFIX = "bad codepoint prefix", r.OVERRUN = "string overrun", r.MISSING_CONTINUE = "missing continuation byte", r.OUT_OF_RANGE = "out of UTF-8 range", r.UTF16_SURROGATE = "UTF-16 surrogate", r.OVERLONG = "overlong representation";
})(ac || (ac = {}));
function ka(r, e = ks.current) {
  e != ks.current && (jv.checkNormalize(), r = r.normalize(e));
  let t = [];
  for (let i = 0; i < r.length; i++) {
    const n = r.charCodeAt(i);
    if (n < 128)
      t.push(n);
    else if (n < 2048)
      t.push(n >> 6 | 192), t.push(n & 63 | 128);
    else if ((n & 64512) == 55296) {
      i++;
      const s = r.charCodeAt(i);
      if (i >= r.length || (s & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const o = 65536 + ((n & 1023) << 10) + (s & 1023);
      t.push(o >> 18 | 240), t.push(o >> 12 & 63 | 128), t.push(o >> 6 & 63 | 128), t.push(o & 63 | 128);
    } else
      t.push(n >> 12 | 224), t.push(n >> 6 & 63 | 128), t.push(n & 63 | 128);
  }
  return yt(t);
}
const Kv = `Ethereum Signed Message:
`;
function bu(r) {
  return typeof r == "string" && (r = ka(r)), qo(Lv([
    ka(Kv),
    ka(String(r.length)),
    r
  ]));
}
const Hv = "address/5.7.0", kn = new ht(Hv);
function oc(r) {
  Lr(r, 20) || kn.throwArgumentError("invalid address", "address", r), r = r.toLowerCase();
  const e = r.substring(2).split(""), t = new Uint8Array(40);
  for (let n = 0; n < 40; n++)
    t[n] = e[n].charCodeAt(0);
  const i = yt(qo(t));
  for (let n = 0; n < 40; n += 2)
    i[n >> 1] >> 4 >= 8 && (e[n] = e[n].toUpperCase()), (i[n >> 1] & 15) >= 8 && (e[n + 1] = e[n + 1].toUpperCase());
  return "0x" + e.join("");
}
const Vv = 9007199254740991;
function Wv(r) {
  return Math.log10 ? Math.log10(r) : Math.log(r) / Math.LN10;
}
const zo = {};
for (let r = 0; r < 10; r++)
  zo[String(r)] = String(r);
for (let r = 0; r < 26; r++)
  zo[String.fromCharCode(65 + r)] = String(10 + r);
const fc = Math.floor(Wv(Vv));
function Gv(r) {
  r = r.toUpperCase(), r = r.substring(4) + r.substring(0, 2) + "00";
  let e = r.split("").map((i) => zo[i]).join("");
  for (; e.length >= fc; ) {
    let i = e.substring(0, fc);
    e = parseInt(i, 10) % 97 + e.substring(i.length);
  }
  let t = String(98 - parseInt(e, 10) % 97);
  for (; t.length < 2; )
    t = "0" + t;
  return t;
}
function Jv(r) {
  let e = null;
  if (typeof r != "string" && kn.throwArgumentError("invalid address", "address", r), r.match(/^(0x)?[0-9a-fA-F]{40}$/))
    r.substring(0, 2) !== "0x" && (r = "0x" + r), e = oc(r), r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && e !== r && kn.throwArgumentError("bad address checksum", "address", r);
  else if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (r.substring(2, 4) !== Gv(r) && kn.throwArgumentError("bad icap checksum", "address", r), e = Bv(r.substring(4)); e.length < 40; )
      e = "0" + e;
    e = oc("0x" + e);
  } else
    kn.throwArgumentError("invalid address", "address", r);
  return e;
}
globalThis && globalThis.__awaiter;
function Tn(r, e, t) {
  Object.defineProperty(r, e, {
    enumerable: !0,
    value: t,
    writable: !1
  });
}
var ns = {}, Qe = {}, Yi = gu;
function gu(r, e) {
  if (!r)
    throw new Error(e || "Assertion failed");
}
gu.equal = function(e, t, i) {
  if (e != t)
    throw new Error(i || "Assertion failed: " + e + " != " + t);
};
var mo = { exports: {} };
typeof Object.create == "function" ? mo.exports = function(e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : mo.exports = function(e, t) {
  if (t) {
    e.super_ = t;
    var i = function() {
    };
    i.prototype = t.prototype, e.prototype = new i(), e.prototype.constructor = e;
  }
};
var ua = mo.exports, Yv = Yi, Xv = ua;
Qe.inherits = Xv;
function Zv(r, e) {
  return (r.charCodeAt(e) & 64512) !== 55296 || e < 0 || e + 1 >= r.length ? !1 : (r.charCodeAt(e + 1) & 64512) === 56320;
}
function Qv(r, e) {
  if (Array.isArray(r))
    return r.slice();
  if (!r)
    return [];
  var t = [];
  if (typeof r == "string")
    if (e) {
      if (e === "hex")
        for (r = r.replace(/[^a-z0-9]+/ig, ""), r.length % 2 !== 0 && (r = "0" + r), n = 0; n < r.length; n += 2)
          t.push(parseInt(r[n] + r[n + 1], 16));
    } else
      for (var i = 0, n = 0; n < r.length; n++) {
        var s = r.charCodeAt(n);
        s < 128 ? t[i++] = s : s < 2048 ? (t[i++] = s >> 6 | 192, t[i++] = s & 63 | 128) : Zv(r, n) ? (s = 65536 + ((s & 1023) << 10) + (r.charCodeAt(++n) & 1023), t[i++] = s >> 18 | 240, t[i++] = s >> 12 & 63 | 128, t[i++] = s >> 6 & 63 | 128, t[i++] = s & 63 | 128) : (t[i++] = s >> 12 | 224, t[i++] = s >> 6 & 63 | 128, t[i++] = s & 63 | 128);
      }
  else
    for (n = 0; n < r.length; n++)
      t[n] = r[n] | 0;
  return t;
}
Qe.toArray = Qv;
function eb(r) {
  for (var e = "", t = 0; t < r.length; t++)
    e += mu(r[t].toString(16));
  return e;
}
Qe.toHex = eb;
function yu(r) {
  var e = r >>> 24 | r >>> 8 & 65280 | r << 8 & 16711680 | (r & 255) << 24;
  return e >>> 0;
}
Qe.htonl = yu;
function tb(r, e) {
  for (var t = "", i = 0; i < r.length; i++) {
    var n = r[i];
    e === "little" && (n = yu(n)), t += wu(n.toString(16));
  }
  return t;
}
Qe.toHex32 = tb;
function mu(r) {
  return r.length === 1 ? "0" + r : r;
}
Qe.zero2 = mu;
function wu(r) {
  return r.length === 7 ? "0" + r : r.length === 6 ? "00" + r : r.length === 5 ? "000" + r : r.length === 4 ? "0000" + r : r.length === 3 ? "00000" + r : r.length === 2 ? "000000" + r : r.length === 1 ? "0000000" + r : r;
}
Qe.zero8 = wu;
function rb(r, e, t, i) {
  var n = t - e;
  Yv(n % 4 === 0);
  for (var s = new Array(n / 4), o = 0, f = e; o < s.length; o++, f += 4) {
    var h;
    i === "big" ? h = r[f] << 24 | r[f + 1] << 16 | r[f + 2] << 8 | r[f + 3] : h = r[f + 3] << 24 | r[f + 2] << 16 | r[f + 1] << 8 | r[f], s[o] = h >>> 0;
  }
  return s;
}
Qe.join32 = rb;
function ib(r, e) {
  for (var t = new Array(r.length * 4), i = 0, n = 0; i < r.length; i++, n += 4) {
    var s = r[i];
    e === "big" ? (t[n] = s >>> 24, t[n + 1] = s >>> 16 & 255, t[n + 2] = s >>> 8 & 255, t[n + 3] = s & 255) : (t[n + 3] = s >>> 24, t[n + 2] = s >>> 16 & 255, t[n + 1] = s >>> 8 & 255, t[n] = s & 255);
  }
  return t;
}
Qe.split32 = ib;
function nb(r, e) {
  return r >>> e | r << 32 - e;
}
Qe.rotr32 = nb;
function sb(r, e) {
  return r << e | r >>> 32 - e;
}
Qe.rotl32 = sb;
function ab(r, e) {
  return r + e >>> 0;
}
Qe.sum32 = ab;
function ob(r, e, t) {
  return r + e + t >>> 0;
}
Qe.sum32_3 = ob;
function fb(r, e, t, i) {
  return r + e + t + i >>> 0;
}
Qe.sum32_4 = fb;
function cb(r, e, t, i, n) {
  return r + e + t + i + n >>> 0;
}
Qe.sum32_5 = cb;
function hb(r, e, t, i) {
  var n = r[e], s = r[e + 1], o = i + s >>> 0, f = (o < i ? 1 : 0) + t + n;
  r[e] = f >>> 0, r[e + 1] = o;
}
Qe.sum64 = hb;
function ub(r, e, t, i) {
  var n = e + i >>> 0, s = (n < e ? 1 : 0) + r + t;
  return s >>> 0;
}
Qe.sum64_hi = ub;
function db(r, e, t, i) {
  var n = e + i;
  return n >>> 0;
}
Qe.sum64_lo = db;
function lb(r, e, t, i, n, s, o, f) {
  var h = 0, d = e;
  d = d + i >>> 0, h += d < e ? 1 : 0, d = d + s >>> 0, h += d < s ? 1 : 0, d = d + f >>> 0, h += d < f ? 1 : 0;
  var v = r + t + n + o + h;
  return v >>> 0;
}
Qe.sum64_4_hi = lb;
function pb(r, e, t, i, n, s, o, f) {
  var h = e + i + s + f;
  return h >>> 0;
}
Qe.sum64_4_lo = pb;
function vb(r, e, t, i, n, s, o, f, h, d) {
  var v = 0, w = e;
  w = w + i >>> 0, v += w < e ? 1 : 0, w = w + s >>> 0, v += w < s ? 1 : 0, w = w + f >>> 0, v += w < f ? 1 : 0, w = w + d >>> 0, v += w < d ? 1 : 0;
  var A = r + t + n + o + h + v;
  return A >>> 0;
}
Qe.sum64_5_hi = vb;
function bb(r, e, t, i, n, s, o, f, h, d) {
  var v = e + i + s + f + d;
  return v >>> 0;
}
Qe.sum64_5_lo = bb;
function gb(r, e, t) {
  var i = e << 32 - t | r >>> t;
  return i >>> 0;
}
Qe.rotr64_hi = gb;
function yb(r, e, t) {
  var i = r << 32 - t | e >>> t;
  return i >>> 0;
}
Qe.rotr64_lo = yb;
function mb(r, e, t) {
  return r >>> t;
}
Qe.shr64_hi = mb;
function wb(r, e, t) {
  var i = r << 32 - t | e >>> t;
  return i >>> 0;
}
Qe.shr64_lo = wb;
var mn = {}, cc = Qe, _b = Yi;
function da() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
mn.BlockHash = da;
da.prototype.update = function(e, t) {
  if (e = cc.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
    e = this.pending;
    var i = e.length % this._delta8;
    this.pending = e.slice(e.length - i, e.length), this.pending.length === 0 && (this.pending = null), e = cc.join32(e, 0, e.length - i, this.endian);
    for (var n = 0; n < e.length; n += this._delta32)
      this._update(e, n, n + this._delta32);
  }
  return this;
};
da.prototype.digest = function(e) {
  return this.update(this._pad()), _b(this.pending === null), this._digest(e);
};
da.prototype._pad = function() {
  var e = this.pendingTotal, t = this._delta8, i = t - (e + this.padLength) % t, n = new Array(i + this.padLength);
  n[0] = 128;
  for (var s = 1; s < i; s++)
    n[s] = 0;
  if (e <<= 3, this.endian === "big") {
    for (var o = 8; o < this.padLength; o++)
      n[s++] = 0;
    n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = e >>> 24 & 255, n[s++] = e >>> 16 & 255, n[s++] = e >>> 8 & 255, n[s++] = e & 255;
  } else
    for (n[s++] = e & 255, n[s++] = e >>> 8 & 255, n[s++] = e >>> 16 & 255, n[s++] = e >>> 24 & 255, n[s++] = 0, n[s++] = 0, n[s++] = 0, n[s++] = 0, o = 8; o < this.padLength; o++)
      n[s++] = 0;
  return n;
};
var wn = {}, Kr = {}, xb = Qe, Fr = xb.rotr32;
function Eb(r, e, t, i) {
  if (r === 0)
    return _u(e, t, i);
  if (r === 1 || r === 3)
    return Eu(e, t, i);
  if (r === 2)
    return xu(e, t, i);
}
Kr.ft_1 = Eb;
function _u(r, e, t) {
  return r & e ^ ~r & t;
}
Kr.ch32 = _u;
function xu(r, e, t) {
  return r & e ^ r & t ^ e & t;
}
Kr.maj32 = xu;
function Eu(r, e, t) {
  return r ^ e ^ t;
}
Kr.p32 = Eu;
function Sb(r) {
  return Fr(r, 2) ^ Fr(r, 13) ^ Fr(r, 22);
}
Kr.s0_256 = Sb;
function Mb(r) {
  return Fr(r, 6) ^ Fr(r, 11) ^ Fr(r, 25);
}
Kr.s1_256 = Mb;
function Ib(r) {
  return Fr(r, 7) ^ Fr(r, 18) ^ r >>> 3;
}
Kr.g0_256 = Ib;
function Ab(r) {
  return Fr(r, 17) ^ Fr(r, 19) ^ r >>> 10;
}
Kr.g1_256 = Ab;
var dn = Qe, Db = mn, Pb = Kr, ja = dn.rotl32, Cn = dn.sum32, Ob = dn.sum32_5, Rb = Pb.ft_1, Su = Db.BlockHash, Nb = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function zr() {
  if (!(this instanceof zr))
    return new zr();
  Su.call(this), this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ], this.W = new Array(80);
}
dn.inherits(zr, Su);
var Tb = zr;
zr.blockSize = 512;
zr.outSize = 160;
zr.hmacStrength = 80;
zr.padLength = 64;
zr.prototype._update = function(e, t) {
  for (var i = this.W, n = 0; n < 16; n++)
    i[n] = e[t + n];
  for (; n < i.length; n++)
    i[n] = ja(i[n - 3] ^ i[n - 8] ^ i[n - 14] ^ i[n - 16], 1);
  var s = this.h[0], o = this.h[1], f = this.h[2], h = this.h[3], d = this.h[4];
  for (n = 0; n < i.length; n++) {
    var v = ~~(n / 20), w = Ob(ja(s, 5), Rb(v, o, f, h), d, i[n], Nb[v]);
    d = h, h = f, f = ja(o, 30), o = s, s = w;
  }
  this.h[0] = Cn(this.h[0], s), this.h[1] = Cn(this.h[1], o), this.h[2] = Cn(this.h[2], f), this.h[3] = Cn(this.h[3], h), this.h[4] = Cn(this.h[4], d);
};
zr.prototype._digest = function(e) {
  return e === "hex" ? dn.toHex32(this.h, "big") : dn.split32(this.h, "big");
};
var ln = Qe, Cb = mn, _n = Kr, $b = Yi, wr = ln.sum32, Lb = ln.sum32_4, Fb = ln.sum32_5, qb = _n.ch32, Ub = _n.maj32, zb = _n.s0_256, Bb = _n.s1_256, kb = _n.g0_256, jb = _n.g1_256, Mu = Cb.BlockHash, Kb = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function Br() {
  if (!(this instanceof Br))
    return new Br();
  Mu.call(this), this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], this.k = Kb, this.W = new Array(64);
}
ln.inherits(Br, Mu);
var Iu = Br;
Br.blockSize = 512;
Br.outSize = 256;
Br.hmacStrength = 192;
Br.padLength = 64;
Br.prototype._update = function(e, t) {
  for (var i = this.W, n = 0; n < 16; n++)
    i[n] = e[t + n];
  for (; n < i.length; n++)
    i[n] = Lb(jb(i[n - 2]), i[n - 7], kb(i[n - 15]), i[n - 16]);
  var s = this.h[0], o = this.h[1], f = this.h[2], h = this.h[3], d = this.h[4], v = this.h[5], w = this.h[6], A = this.h[7];
  for ($b(this.k.length === i.length), n = 0; n < i.length; n++) {
    var I = Fb(A, Bb(d), qb(d, v, w), this.k[n], i[n]), D = wr(zb(s), Ub(s, o, f));
    A = w, w = v, v = d, d = wr(h, I), h = f, f = o, o = s, s = wr(I, D);
  }
  this.h[0] = wr(this.h[0], s), this.h[1] = wr(this.h[1], o), this.h[2] = wr(this.h[2], f), this.h[3] = wr(this.h[3], h), this.h[4] = wr(this.h[4], d), this.h[5] = wr(this.h[5], v), this.h[6] = wr(this.h[6], w), this.h[7] = wr(this.h[7], A);
};
Br.prototype._digest = function(e) {
  return e === "hex" ? ln.toHex32(this.h, "big") : ln.split32(this.h, "big");
};
var wo = Qe, Au = Iu;
function ui() {
  if (!(this instanceof ui))
    return new ui();
  Au.call(this), this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
wo.inherits(ui, Au);
var Hb = ui;
ui.blockSize = 512;
ui.outSize = 224;
ui.hmacStrength = 192;
ui.padLength = 64;
ui.prototype._digest = function(e) {
  return e === "hex" ? wo.toHex32(this.h.slice(0, 7), "big") : wo.split32(this.h.slice(0, 7), "big");
};
var Yt = Qe, Vb = mn, Wb = Yi, qr = Yt.rotr64_hi, Ur = Yt.rotr64_lo, Du = Yt.shr64_hi, Pu = Yt.shr64_lo, bi = Yt.sum64, Ka = Yt.sum64_hi, Ha = Yt.sum64_lo, Gb = Yt.sum64_4_hi, Jb = Yt.sum64_4_lo, Yb = Yt.sum64_5_hi, Xb = Yt.sum64_5_lo, Ou = Vb.BlockHash, Zb = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function Ar() {
  if (!(this instanceof Ar))
    return new Ar();
  Ou.call(this), this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ], this.k = Zb, this.W = new Array(160);
}
Yt.inherits(Ar, Ou);
var Ru = Ar;
Ar.blockSize = 1024;
Ar.outSize = 512;
Ar.hmacStrength = 192;
Ar.padLength = 128;
Ar.prototype._prepareBlock = function(e, t) {
  for (var i = this.W, n = 0; n < 32; n++)
    i[n] = e[t + n];
  for (; n < i.length; n += 2) {
    var s = cg(i[n - 4], i[n - 3]), o = hg(i[n - 4], i[n - 3]), f = i[n - 14], h = i[n - 13], d = og(i[n - 30], i[n - 29]), v = fg(i[n - 30], i[n - 29]), w = i[n - 32], A = i[n - 31];
    i[n] = Gb(
      s,
      o,
      f,
      h,
      d,
      v,
      w,
      A
    ), i[n + 1] = Jb(
      s,
      o,
      f,
      h,
      d,
      v,
      w,
      A
    );
  }
};
Ar.prototype._update = function(e, t) {
  this._prepareBlock(e, t);
  var i = this.W, n = this.h[0], s = this.h[1], o = this.h[2], f = this.h[3], h = this.h[4], d = this.h[5], v = this.h[6], w = this.h[7], A = this.h[8], I = this.h[9], D = this.h[10], N = this.h[11], k = this.h[12], j = this.h[13], T = this.h[14], K = this.h[15];
  Wb(this.k.length === i.length);
  for (var $ = 0; $ < i.length; $ += 2) {
    var z = T, B = K, _ = sg(A, I), R = ag(A, I), J = Qb(A, I, D, N, k), Q = eg(A, I, D, N, k, j), O = this.k[$], p = this.k[$ + 1], l = i[$], a = i[$ + 1], c = Yb(
      z,
      B,
      _,
      R,
      J,
      Q,
      O,
      p,
      l,
      a
    ), b = Xb(
      z,
      B,
      _,
      R,
      J,
      Q,
      O,
      p,
      l,
      a
    );
    z = ig(n, s), B = ng(n, s), _ = tg(n, s, o, f, h), R = rg(n, s, o, f, h, d);
    var E = Ka(z, B, _, R), S = Ha(z, B, _, R);
    T = k, K = j, k = D, j = N, D = A, N = I, A = Ka(v, w, c, b), I = Ha(w, w, c, b), v = h, w = d, h = o, d = f, o = n, f = s, n = Ka(c, b, E, S), s = Ha(c, b, E, S);
  }
  bi(this.h, 0, n, s), bi(this.h, 2, o, f), bi(this.h, 4, h, d), bi(this.h, 6, v, w), bi(this.h, 8, A, I), bi(this.h, 10, D, N), bi(this.h, 12, k, j), bi(this.h, 14, T, K);
};
Ar.prototype._digest = function(e) {
  return e === "hex" ? Yt.toHex32(this.h, "big") : Yt.split32(this.h, "big");
};
function Qb(r, e, t, i, n) {
  var s = r & t ^ ~r & n;
  return s < 0 && (s += 4294967296), s;
}
function eg(r, e, t, i, n, s) {
  var o = e & i ^ ~e & s;
  return o < 0 && (o += 4294967296), o;
}
function tg(r, e, t, i, n) {
  var s = r & t ^ r & n ^ t & n;
  return s < 0 && (s += 4294967296), s;
}
function rg(r, e, t, i, n, s) {
  var o = e & i ^ e & s ^ i & s;
  return o < 0 && (o += 4294967296), o;
}
function ig(r, e) {
  var t = qr(r, e, 28), i = qr(e, r, 2), n = qr(e, r, 7), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function ng(r, e) {
  var t = Ur(r, e, 28), i = Ur(e, r, 2), n = Ur(e, r, 7), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function sg(r, e) {
  var t = qr(r, e, 14), i = qr(r, e, 18), n = qr(e, r, 9), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function ag(r, e) {
  var t = Ur(r, e, 14), i = Ur(r, e, 18), n = Ur(e, r, 9), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function og(r, e) {
  var t = qr(r, e, 1), i = qr(r, e, 8), n = Du(r, e, 7), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function fg(r, e) {
  var t = Ur(r, e, 1), i = Ur(r, e, 8), n = Pu(r, e, 7), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function cg(r, e) {
  var t = qr(r, e, 19), i = qr(e, r, 29), n = Du(r, e, 6), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
function hg(r, e) {
  var t = Ur(r, e, 19), i = Ur(e, r, 29), n = Pu(r, e, 6), s = t ^ i ^ n;
  return s < 0 && (s += 4294967296), s;
}
var _o = Qe, Nu = Ru;
function di() {
  if (!(this instanceof di))
    return new di();
  Nu.call(this), this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
_o.inherits(di, Nu);
var ug = di;
di.blockSize = 1024;
di.outSize = 384;
di.hmacStrength = 192;
di.padLength = 128;
di.prototype._digest = function(e) {
  return e === "hex" ? _o.toHex32(this.h.slice(0, 12), "big") : _o.split32(this.h.slice(0, 12), "big");
};
wn.sha1 = Tb;
wn.sha224 = Hb;
wn.sha256 = Iu;
wn.sha384 = ug;
wn.sha512 = Ru;
var Tu = {}, Ki = Qe, dg = mn, xs = Ki.rotl32, hc = Ki.sum32, $n = Ki.sum32_3, uc = Ki.sum32_4, Cu = dg.BlockHash;
function kr() {
  if (!(this instanceof kr))
    return new kr();
  Cu.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Ki.inherits(kr, Cu);
Tu.ripemd160 = kr;
kr.blockSize = 512;
kr.outSize = 160;
kr.hmacStrength = 192;
kr.padLength = 64;
kr.prototype._update = function(e, t) {
  for (var i = this.h[0], n = this.h[1], s = this.h[2], o = this.h[3], f = this.h[4], h = i, d = n, v = s, w = o, A = f, I = 0; I < 80; I++) {
    var D = hc(
      xs(
        uc(i, dc(I, n, s, o), e[vg[I] + t], lg(I)),
        gg[I]
      ),
      f
    );
    i = f, f = o, o = xs(s, 10), s = n, n = D, D = hc(
      xs(
        uc(h, dc(79 - I, d, v, w), e[bg[I] + t], pg(I)),
        yg[I]
      ),
      A
    ), h = A, A = w, w = xs(v, 10), v = d, d = D;
  }
  D = $n(this.h[1], s, w), this.h[1] = $n(this.h[2], o, A), this.h[2] = $n(this.h[3], f, h), this.h[3] = $n(this.h[4], i, d), this.h[4] = $n(this.h[0], n, v), this.h[0] = D;
};
kr.prototype._digest = function(e) {
  return e === "hex" ? Ki.toHex32(this.h, "little") : Ki.split32(this.h, "little");
};
function dc(r, e, t, i) {
  return r <= 15 ? e ^ t ^ i : r <= 31 ? e & t | ~e & i : r <= 47 ? (e | ~t) ^ i : r <= 63 ? e & i | t & ~i : e ^ (t | ~i);
}
function lg(r) {
  return r <= 15 ? 0 : r <= 31 ? 1518500249 : r <= 47 ? 1859775393 : r <= 63 ? 2400959708 : 2840853838;
}
function pg(r) {
  return r <= 15 ? 1352829926 : r <= 31 ? 1548603684 : r <= 47 ? 1836072691 : r <= 63 ? 2053994217 : 0;
}
var vg = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
], bg = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
], gg = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
], yg = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
], mg = Qe, wg = Yi;
function pn(r, e, t) {
  if (!(this instanceof pn))
    return new pn(r, e, t);
  this.Hash = r, this.blockSize = r.blockSize / 8, this.outSize = r.outSize / 8, this.inner = null, this.outer = null, this._init(mg.toArray(e, t));
}
var _g = pn;
pn.prototype._init = function(e) {
  e.length > this.blockSize && (e = new this.Hash().update(e).digest()), wg(e.length <= this.blockSize);
  for (var t = e.length; t < this.blockSize; t++)
    e.push(0);
  for (t = 0; t < e.length; t++)
    e[t] ^= 54;
  for (this.inner = new this.Hash().update(e), t = 0; t < e.length; t++)
    e[t] ^= 106;
  this.outer = new this.Hash().update(e);
};
pn.prototype.update = function(e, t) {
  return this.inner.update(e, t), this;
};
pn.prototype.digest = function(e) {
  return this.outer.update(this.inner.digest()), this.outer.digest(e);
};
(function(r) {
  var e = r;
  e.utils = Qe, e.common = mn, e.sha = wn, e.ripemd = Tu, e.hmac = _g, e.sha1 = e.sha.sha1, e.sha256 = e.sha.sha256, e.sha224 = e.sha.sha224, e.sha384 = e.sha.sha384, e.sha512 = e.sha.sha512, e.ripemd160 = e.ripemd.ripemd160;
})(ns);
const si = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(ns);
function xn(r, e, t) {
  return t = {
    path: e,
    exports: {},
    require: function(i, n) {
      return xg(i, n ?? t.path);
    }
  }, r(t, t.exports), t.exports;
}
function xg() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var Bo = $u;
function $u(r, e) {
  if (!r)
    throw new Error(e || "Assertion failed");
}
$u.equal = function(e, t, i) {
  if (e != t)
    throw new Error(i || "Assertion failed: " + e + " != " + t);
};
var Mr = xn(function(r, e) {
  var t = e;
  function i(o, f) {
    if (Array.isArray(o))
      return o.slice();
    if (!o)
      return [];
    var h = [];
    if (typeof o != "string") {
      for (var d = 0; d < o.length; d++)
        h[d] = o[d] | 0;
      return h;
    }
    if (f === "hex") {
      o = o.replace(/[^a-z0-9]+/ig, ""), o.length % 2 !== 0 && (o = "0" + o);
      for (var d = 0; d < o.length; d += 2)
        h.push(parseInt(o[d] + o[d + 1], 16));
    } else
      for (var d = 0; d < o.length; d++) {
        var v = o.charCodeAt(d), w = v >> 8, A = v & 255;
        w ? h.push(w, A) : h.push(A);
      }
    return h;
  }
  t.toArray = i;
  function n(o) {
    return o.length === 1 ? "0" + o : o;
  }
  t.zero2 = n;
  function s(o) {
    for (var f = "", h = 0; h < o.length; h++)
      f += n(o[h].toString(16));
    return f;
  }
  t.toHex = s, t.encode = function(f, h) {
    return h === "hex" ? s(f) : f;
  };
}), sr = xn(function(r, e) {
  var t = e;
  t.assert = Bo, t.toArray = Mr.toArray, t.zero2 = Mr.zero2, t.toHex = Mr.toHex, t.encode = Mr.encode;
  function i(h, d, v) {
    var w = new Array(Math.max(h.bitLength(), v) + 1);
    w.fill(0);
    for (var A = 1 << d + 1, I = h.clone(), D = 0; D < w.length; D++) {
      var N, k = I.andln(A - 1);
      I.isOdd() ? (k > (A >> 1) - 1 ? N = (A >> 1) - k : N = k, I.isubn(N)) : N = 0, w[D] = N, I.iushrn(1);
    }
    return w;
  }
  t.getNAF = i;
  function n(h, d) {
    var v = [
      [],
      []
    ];
    h = h.clone(), d = d.clone();
    for (var w = 0, A = 0, I; h.cmpn(-w) > 0 || d.cmpn(-A) > 0; ) {
      var D = h.andln(3) + w & 3, N = d.andln(3) + A & 3;
      D === 3 && (D = -1), N === 3 && (N = -1);
      var k;
      D & 1 ? (I = h.andln(7) + w & 7, (I === 3 || I === 5) && N === 2 ? k = -D : k = D) : k = 0, v[0].push(k);
      var j;
      N & 1 ? (I = d.andln(7) + A & 7, (I === 3 || I === 5) && D === 2 ? j = -N : j = N) : j = 0, v[1].push(j), 2 * w === k + 1 && (w = 1 - w), 2 * A === j + 1 && (A = 1 - A), h.iushrn(1), d.iushrn(1);
    }
    return v;
  }
  t.getJSF = n;
  function s(h, d, v) {
    var w = "_" + d;
    h.prototype[d] = function() {
      return this[w] !== void 0 ? this[w] : this[w] = v.call(this);
    };
  }
  t.cachedProperty = s;
  function o(h) {
    return typeof h == "string" ? t.toArray(h, "hex") : h;
  }
  t.parseBytes = o;
  function f(h) {
    return new Ke(h, "hex", "le");
  }
  t.intFromLE = f;
}), js = sr.getNAF, Eg = sr.getJSF, Ks = sr.assert;
function Si(r, e) {
  this.type = r, this.p = new Ke(e.p, 16), this.red = e.prime ? Ke.red(e.prime) : Ke.mont(this.p), this.zero = new Ke(0).toRed(this.red), this.one = new Ke(1).toRed(this.red), this.two = new Ke(2).toRed(this.red), this.n = e.n && new Ke(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var t = this.n && this.p.div(this.n);
  !t || t.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var Xi = Si;
Si.prototype.point = function() {
  throw new Error("Not implemented");
};
Si.prototype.validate = function() {
  throw new Error("Not implemented");
};
Si.prototype._fixedNafMul = function(e, t) {
  Ks(e.precomputed);
  var i = e._getDoubles(), n = js(t, 1, this._bitLength), s = (1 << i.step + 1) - (i.step % 2 === 0 ? 2 : 1);
  s /= 3;
  var o = [], f, h;
  for (f = 0; f < n.length; f += i.step) {
    h = 0;
    for (var d = f + i.step - 1; d >= f; d--)
      h = (h << 1) + n[d];
    o.push(h);
  }
  for (var v = this.jpoint(null, null, null), w = this.jpoint(null, null, null), A = s; A > 0; A--) {
    for (f = 0; f < o.length; f++)
      h = o[f], h === A ? w = w.mixedAdd(i.points[f]) : h === -A && (w = w.mixedAdd(i.points[f].neg()));
    v = v.add(w);
  }
  return v.toP();
};
Si.prototype._wnafMul = function(e, t) {
  var i = 4, n = e._getNAFPoints(i);
  i = n.wnd;
  for (var s = n.points, o = js(t, i, this._bitLength), f = this.jpoint(null, null, null), h = o.length - 1; h >= 0; h--) {
    for (var d = 0; h >= 0 && o[h] === 0; h--)
      d++;
    if (h >= 0 && d++, f = f.dblp(d), h < 0)
      break;
    var v = o[h];
    Ks(v !== 0), e.type === "affine" ? v > 0 ? f = f.mixedAdd(s[v - 1 >> 1]) : f = f.mixedAdd(s[-v - 1 >> 1].neg()) : v > 0 ? f = f.add(s[v - 1 >> 1]) : f = f.add(s[-v - 1 >> 1].neg());
  }
  return e.type === "affine" ? f.toP() : f;
};
Si.prototype._wnafMulAdd = function(e, t, i, n, s) {
  var o = this._wnafT1, f = this._wnafT2, h = this._wnafT3, d = 0, v, w, A;
  for (v = 0; v < n; v++) {
    A = t[v];
    var I = A._getNAFPoints(e);
    o[v] = I.wnd, f[v] = I.points;
  }
  for (v = n - 1; v >= 1; v -= 2) {
    var D = v - 1, N = v;
    if (o[D] !== 1 || o[N] !== 1) {
      h[D] = js(i[D], o[D], this._bitLength), h[N] = js(i[N], o[N], this._bitLength), d = Math.max(h[D].length, d), d = Math.max(h[N].length, d);
      continue;
    }
    var k = [
      t[D],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      t[N]
      /* 7 */
    ];
    t[D].y.cmp(t[N].y) === 0 ? (k[1] = t[D].add(t[N]), k[2] = t[D].toJ().mixedAdd(t[N].neg())) : t[D].y.cmp(t[N].y.redNeg()) === 0 ? (k[1] = t[D].toJ().mixedAdd(t[N]), k[2] = t[D].add(t[N].neg())) : (k[1] = t[D].toJ().mixedAdd(t[N]), k[2] = t[D].toJ().mixedAdd(t[N].neg()));
    var j = [
      -3,
      /* -1 -1 */
      -1,
      /* -1 0 */
      -5,
      /* -1 1 */
      -7,
      /* 0 -1 */
      0,
      /* 0 0 */
      7,
      /* 0 1 */
      5,
      /* 1 -1 */
      1,
      /* 1 0 */
      3
      /* 1 1 */
    ], T = Eg(i[D], i[N]);
    for (d = Math.max(T[0].length, d), h[D] = new Array(d), h[N] = new Array(d), w = 0; w < d; w++) {
      var K = T[0][w] | 0, $ = T[1][w] | 0;
      h[D][w] = j[(K + 1) * 3 + ($ + 1)], h[N][w] = 0, f[D] = k;
    }
  }
  var z = this.jpoint(null, null, null), B = this._wnafT4;
  for (v = d; v >= 0; v--) {
    for (var _ = 0; v >= 0; ) {
      var R = !0;
      for (w = 0; w < n; w++)
        B[w] = h[w][v] | 0, B[w] !== 0 && (R = !1);
      if (!R)
        break;
      _++, v--;
    }
    if (v >= 0 && _++, z = z.dblp(_), v < 0)
      break;
    for (w = 0; w < n; w++) {
      var J = B[w];
      J !== 0 && (J > 0 ? A = f[w][J - 1 >> 1] : J < 0 && (A = f[w][-J - 1 >> 1].neg()), A.type === "affine" ? z = z.mixedAdd(A) : z = z.add(A));
    }
  }
  for (v = 0; v < n; v++)
    f[v] = null;
  return s ? z : z.toP();
};
function vr(r, e) {
  this.curve = r, this.type = e, this.precomputed = null;
}
Si.BasePoint = vr;
vr.prototype.eq = function() {
  throw new Error("Not implemented");
};
vr.prototype.validate = function() {
  return this.curve.validate(this);
};
Si.prototype.decodePoint = function(e, t) {
  e = sr.toArray(e, t);
  var i = this.p.byteLength();
  if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 === 2 * i) {
    e[0] === 6 ? Ks(e[e.length - 1] % 2 === 0) : e[0] === 7 && Ks(e[e.length - 1] % 2 === 1);
    var n = this.point(
      e.slice(1, 1 + i),
      e.slice(1 + i, 1 + 2 * i)
    );
    return n;
  } else if ((e[0] === 2 || e[0] === 3) && e.length - 1 === i)
    return this.pointFromX(e.slice(1, 1 + i), e[0] === 3);
  throw new Error("Unknown point format");
};
vr.prototype.encodeCompressed = function(e) {
  return this.encode(e, !0);
};
vr.prototype._encode = function(e) {
  var t = this.curve.p.byteLength(), i = this.getX().toArray("be", t);
  return e ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", t));
};
vr.prototype.encode = function(e, t) {
  return sr.encode(this._encode(t), e);
};
vr.prototype.precompute = function(e) {
  if (this.precomputed)
    return this;
  var t = {
    doubles: null,
    naf: null,
    beta: null
  };
  return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this;
};
vr.prototype._hasDoubles = function(e) {
  if (!this.precomputed)
    return !1;
  var t = this.precomputed.doubles;
  return t ? t.points.length >= Math.ceil((e.bitLength() + 1) / t.step) : !1;
};
vr.prototype._getDoubles = function(e, t) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i = [this], n = this, s = 0; s < t; s += e) {
    for (var o = 0; o < e; o++)
      n = n.dbl();
    i.push(n);
  }
  return {
    step: e,
    points: i
  };
};
vr.prototype._getNAFPoints = function(e) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var t = [this], i = (1 << e) - 1, n = i === 1 ? null : this.dbl(), s = 1; s < i; s++)
    t[s] = t[s - 1].add(n);
  return {
    wnd: e,
    points: t
  };
};
vr.prototype._getBeta = function() {
  return null;
};
vr.prototype.dblp = function(e) {
  for (var t = this, i = 0; i < e; i++)
    t = t.dbl();
  return t;
};
var ko = xn(function(r) {
  typeof Object.create == "function" ? r.exports = function(t, i) {
    i && (t.super_ = i, t.prototype = Object.create(i.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : r.exports = function(t, i) {
    if (i) {
      t.super_ = i;
      var n = function() {
      };
      n.prototype = i.prototype, t.prototype = new n(), t.prototype.constructor = t;
    }
  };
}), Sg = sr.assert;
function br(r) {
  Xi.call(this, "short", r), this.a = new Ke(r.a, 16).toRed(this.red), this.b = new Ke(r.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(r), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
ko(br, Xi);
var Mg = br;
br.prototype._getEndomorphism = function(e) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var t, i;
    if (e.beta)
      t = new Ke(e.beta, 16).toRed(this.red);
    else {
      var n = this._getEndoRoots(this.p);
      t = n[0].cmp(n[1]) < 0 ? n[0] : n[1], t = t.toRed(this.red);
    }
    if (e.lambda)
      i = new Ke(e.lambda, 16);
    else {
      var s = this._getEndoRoots(this.n);
      this.g.mul(s[0]).x.cmp(this.g.x.redMul(t)) === 0 ? i = s[0] : (i = s[1], Sg(this.g.mul(i).x.cmp(this.g.x.redMul(t)) === 0));
    }
    var o;
    return e.basis ? o = e.basis.map(function(f) {
      return {
        a: new Ke(f.a, 16),
        b: new Ke(f.b, 16)
      };
    }) : o = this._getEndoBasis(i), {
      beta: t,
      lambda: i,
      basis: o
    };
  }
};
br.prototype._getEndoRoots = function(e) {
  var t = e === this.p ? this.red : Ke.mont(e), i = new Ke(2).toRed(t).redInvm(), n = i.redNeg(), s = new Ke(3).toRed(t).redNeg().redSqrt().redMul(i), o = n.redAdd(s).fromRed(), f = n.redSub(s).fromRed();
  return [o, f];
};
br.prototype._getEndoBasis = function(e) {
  for (var t = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i = e, n = this.n.clone(), s = new Ke(1), o = new Ke(0), f = new Ke(0), h = new Ke(1), d, v, w, A, I, D, N, k = 0, j, T; i.cmpn(0) !== 0; ) {
    var K = n.div(i);
    j = n.sub(K.mul(i)), T = f.sub(K.mul(s));
    var $ = h.sub(K.mul(o));
    if (!w && j.cmp(t) < 0)
      d = N.neg(), v = s, w = j.neg(), A = T;
    else if (w && ++k === 2)
      break;
    N = j, n = i, i = j, f = s, s = T, h = o, o = $;
  }
  I = j.neg(), D = T;
  var z = w.sqr().add(A.sqr()), B = I.sqr().add(D.sqr());
  return B.cmp(z) >= 0 && (I = d, D = v), w.negative && (w = w.neg(), A = A.neg()), I.negative && (I = I.neg(), D = D.neg()), [
    { a: w, b: A },
    { a: I, b: D }
  ];
};
br.prototype._endoSplit = function(e) {
  var t = this.endo.basis, i = t[0], n = t[1], s = n.b.mul(e).divRound(this.n), o = i.b.neg().mul(e).divRound(this.n), f = s.mul(i.a), h = o.mul(n.a), d = s.mul(i.b), v = o.mul(n.b), w = e.sub(f).sub(h), A = d.add(v).neg();
  return { k1: w, k2: A };
};
br.prototype.pointFromX = function(e, t) {
  e = new Ke(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = i.redSqrt();
  if (n.redSqr().redSub(i).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var s = n.fromRed().isOdd();
  return (t && !s || !t && s) && (n = n.redNeg()), this.point(e, n);
};
br.prototype.validate = function(e) {
  if (e.inf)
    return !0;
  var t = e.x, i = e.y, n = this.a.redMul(t), s = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);
  return i.redSqr().redISub(s).cmpn(0) === 0;
};
br.prototype._endoWnafMulAdd = function(e, t, i) {
  for (var n = this._endoWnafT1, s = this._endoWnafT2, o = 0; o < e.length; o++) {
    var f = this._endoSplit(t[o]), h = e[o], d = h._getBeta();
    f.k1.negative && (f.k1.ineg(), h = h.neg(!0)), f.k2.negative && (f.k2.ineg(), d = d.neg(!0)), n[o * 2] = h, n[o * 2 + 1] = d, s[o * 2] = f.k1, s[o * 2 + 1] = f.k2;
  }
  for (var v = this._wnafMulAdd(1, n, s, o * 2, i), w = 0; w < o * 2; w++)
    n[w] = null, s[w] = null;
  return v;
};
function Dt(r, e, t, i) {
  Xi.BasePoint.call(this, r, "affine"), e === null && t === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new Ke(e, 16), this.y = new Ke(t, 16), i && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
ko(Dt, Xi.BasePoint);
br.prototype.point = function(e, t, i) {
  return new Dt(this, e, t, i);
};
br.prototype.pointFromJSON = function(e, t) {
  return Dt.fromJSON(this, e, t);
};
Dt.prototype._getBeta = function() {
  if (this.curve.endo) {
    var e = this.precomputed;
    if (e && e.beta)
      return e.beta;
    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (e) {
      var i = this.curve, n = function(s) {
        return i.point(s.x.redMul(i.endo.beta), s.y);
      };
      e.beta = t, t.precomputed = {
        beta: null,
        naf: e.naf && {
          wnd: e.naf.wnd,
          points: e.naf.points.map(n)
        },
        doubles: e.doubles && {
          step: e.doubles.step,
          points: e.doubles.points.map(n)
        }
      };
    }
    return t;
  }
};
Dt.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }] : [this.x, this.y];
};
Dt.fromJSON = function(e, t, i) {
  typeof t == "string" && (t = JSON.parse(t));
  var n = e.point(t[0], t[1], i);
  if (!t[2])
    return n;
  function s(f) {
    return e.point(f[0], f[1], i);
  }
  var o = t[2];
  return n.precomputed = {
    beta: null,
    doubles: o.doubles && {
      step: o.doubles.step,
      points: [n].concat(o.doubles.points.map(s))
    },
    naf: o.naf && {
      wnd: o.naf.wnd,
      points: [n].concat(o.naf.points.map(s))
    }
  }, n;
};
Dt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Dt.prototype.isInfinity = function() {
  return this.inf;
};
Dt.prototype.add = function(e) {
  if (this.inf)
    return e;
  if (e.inf)
    return this;
  if (this.eq(e))
    return this.dbl();
  if (this.neg().eq(e))
    return this.curve.point(null, null);
  if (this.x.cmp(e.x) === 0)
    return this.curve.point(null, null);
  var t = this.y.redSub(e.y);
  t.cmpn(0) !== 0 && (t = t.redMul(this.x.redSub(e.x).redInvm()));
  var i = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(i)).redISub(this.y);
  return this.curve.point(i, n);
};
Dt.prototype.dbl = function() {
  if (this.inf)
    return this;
  var e = this.y.redAdd(this.y);
  if (e.cmpn(0) === 0)
    return this.curve.point(null, null);
  var t = this.curve.a, i = this.x.redSqr(), n = e.redInvm(), s = i.redAdd(i).redIAdd(i).redIAdd(t).redMul(n), o = s.redSqr().redISub(this.x.redAdd(this.x)), f = s.redMul(this.x.redSub(o)).redISub(this.y);
  return this.curve.point(o, f);
};
Dt.prototype.getX = function() {
  return this.x.fromRed();
};
Dt.prototype.getY = function() {
  return this.y.fromRed();
};
Dt.prototype.mul = function(e) {
  return e = new Ke(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e);
};
Dt.prototype.mulAdd = function(e, t, i) {
  var n = [this, t], s = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s) : this.curve._wnafMulAdd(1, n, s, 2);
};
Dt.prototype.jmulAdd = function(e, t, i) {
  var n = [this, t], s = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s, !0) : this.curve._wnafMulAdd(1, n, s, 2, !0);
};
Dt.prototype.eq = function(e) {
  return this === e || this.inf === e.inf && (this.inf || this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0);
};
Dt.prototype.neg = function(e) {
  if (this.inf)
    return this;
  var t = this.curve.point(this.x, this.y.redNeg());
  if (e && this.precomputed) {
    var i = this.precomputed, n = function(s) {
      return s.neg();
    };
    t.precomputed = {
      naf: i.naf && {
        wnd: i.naf.wnd,
        points: i.naf.points.map(n)
      },
      doubles: i.doubles && {
        step: i.doubles.step,
        points: i.doubles.points.map(n)
      }
    };
  }
  return t;
};
Dt.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var e = this.curve.jpoint(this.x, this.y, this.curve.one);
  return e;
};
function Nt(r, e, t, i) {
  Xi.BasePoint.call(this, r, "jacobian"), e === null && t === null && i === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new Ke(0)) : (this.x = new Ke(e, 16), this.y = new Ke(t, 16), this.z = new Ke(i, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
ko(Nt, Xi.BasePoint);
br.prototype.jpoint = function(e, t, i) {
  return new Nt(this, e, t, i);
};
Nt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var e = this.z.redInvm(), t = e.redSqr(), i = this.x.redMul(t), n = this.y.redMul(t).redMul(e);
  return this.curve.point(i, n);
};
Nt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
Nt.prototype.add = function(e) {
  if (this.isInfinity())
    return e;
  if (e.isInfinity())
    return this;
  var t = e.z.redSqr(), i = this.z.redSqr(), n = this.x.redMul(t), s = e.x.redMul(i), o = this.y.redMul(t.redMul(e.z)), f = e.y.redMul(i.redMul(this.z)), h = n.redSub(s), d = o.redSub(f);
  if (h.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var v = h.redSqr(), w = v.redMul(h), A = n.redMul(v), I = d.redSqr().redIAdd(w).redISub(A).redISub(A), D = d.redMul(A.redISub(I)).redISub(o.redMul(w)), N = this.z.redMul(e.z).redMul(h);
  return this.curve.jpoint(I, D, N);
};
Nt.prototype.mixedAdd = function(e) {
  if (this.isInfinity())
    return e.toJ();
  if (e.isInfinity())
    return this;
  var t = this.z.redSqr(), i = this.x, n = e.x.redMul(t), s = this.y, o = e.y.redMul(t).redMul(this.z), f = i.redSub(n), h = s.redSub(o);
  if (f.cmpn(0) === 0)
    return h.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var d = f.redSqr(), v = d.redMul(f), w = i.redMul(d), A = h.redSqr().redIAdd(v).redISub(w).redISub(w), I = h.redMul(w.redISub(A)).redISub(s.redMul(v)), D = this.z.redMul(f);
  return this.curve.jpoint(A, I, D);
};
Nt.prototype.dblp = function(e) {
  if (e === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!e)
    return this.dbl();
  var t;
  if (this.curve.zeroA || this.curve.threeA) {
    var i = this;
    for (t = 0; t < e; t++)
      i = i.dbl();
    return i;
  }
  var n = this.curve.a, s = this.curve.tinv, o = this.x, f = this.y, h = this.z, d = h.redSqr().redSqr(), v = f.redAdd(f);
  for (t = 0; t < e; t++) {
    var w = o.redSqr(), A = v.redSqr(), I = A.redSqr(), D = w.redAdd(w).redIAdd(w).redIAdd(n.redMul(d)), N = o.redMul(A), k = D.redSqr().redISub(N.redAdd(N)), j = N.redISub(k), T = D.redMul(j);
    T = T.redIAdd(T).redISub(I);
    var K = v.redMul(h);
    t + 1 < e && (d = d.redMul(I)), o = k, h = K, v = T;
  }
  return this.curve.jpoint(o, v.redMul(s), h);
};
Nt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
Nt.prototype._zeroDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), f = this.x.redAdd(s).redSqr().redISub(n).redISub(o);
    f = f.redIAdd(f);
    var h = n.redAdd(n).redIAdd(n), d = h.redSqr().redISub(f).redISub(f), v = o.redIAdd(o);
    v = v.redIAdd(v), v = v.redIAdd(v), e = d, t = h.redMul(f.redISub(d)).redISub(v), i = this.y.redAdd(this.y);
  } else {
    var w = this.x.redSqr(), A = this.y.redSqr(), I = A.redSqr(), D = this.x.redAdd(A).redSqr().redISub(w).redISub(I);
    D = D.redIAdd(D);
    var N = w.redAdd(w).redIAdd(w), k = N.redSqr(), j = I.redIAdd(I);
    j = j.redIAdd(j), j = j.redIAdd(j), e = k.redISub(D).redISub(D), t = N.redMul(D.redISub(e)).redISub(j), i = this.y.redMul(this.z), i = i.redIAdd(i);
  }
  return this.curve.jpoint(e, t, i);
};
Nt.prototype._threeDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), f = this.x.redAdd(s).redSqr().redISub(n).redISub(o);
    f = f.redIAdd(f);
    var h = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), d = h.redSqr().redISub(f).redISub(f);
    e = d;
    var v = o.redIAdd(o);
    v = v.redIAdd(v), v = v.redIAdd(v), t = h.redMul(f.redISub(d)).redISub(v), i = this.y.redAdd(this.y);
  } else {
    var w = this.z.redSqr(), A = this.y.redSqr(), I = this.x.redMul(A), D = this.x.redSub(w).redMul(this.x.redAdd(w));
    D = D.redAdd(D).redIAdd(D);
    var N = I.redIAdd(I);
    N = N.redIAdd(N);
    var k = N.redAdd(N);
    e = D.redSqr().redISub(k), i = this.y.redAdd(this.z).redSqr().redISub(A).redISub(w);
    var j = A.redSqr();
    j = j.redIAdd(j), j = j.redIAdd(j), j = j.redIAdd(j), t = D.redMul(N.redISub(e)).redISub(j);
  }
  return this.curve.jpoint(e, t, i);
};
Nt.prototype._dbl = function() {
  var e = this.curve.a, t = this.x, i = this.y, n = this.z, s = n.redSqr().redSqr(), o = t.redSqr(), f = i.redSqr(), h = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(s)), d = t.redAdd(t);
  d = d.redIAdd(d);
  var v = d.redMul(f), w = h.redSqr().redISub(v.redAdd(v)), A = v.redISub(w), I = f.redSqr();
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var D = h.redMul(A).redISub(I), N = i.redAdd(i).redMul(n);
  return this.curve.jpoint(w, D, N);
};
Nt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr(), n = t.redSqr(), s = e.redAdd(e).redIAdd(e), o = s.redSqr(), f = this.x.redAdd(t).redSqr().redISub(e).redISub(n);
  f = f.redIAdd(f), f = f.redAdd(f).redIAdd(f), f = f.redISub(o);
  var h = f.redSqr(), d = n.redIAdd(n);
  d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
  var v = s.redIAdd(f).redSqr().redISub(o).redISub(h).redISub(d), w = t.redMul(v);
  w = w.redIAdd(w), w = w.redIAdd(w);
  var A = this.x.redMul(h).redISub(w);
  A = A.redIAdd(A), A = A.redIAdd(A);
  var I = this.y.redMul(v.redMul(d.redISub(v)).redISub(f.redMul(h)));
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var D = this.z.redAdd(f).redSqr().redISub(i).redISub(h);
  return this.curve.jpoint(A, I, D);
};
Nt.prototype.mul = function(e, t) {
  return e = new Ke(e, t), this.curve._wnafMul(this, e);
};
Nt.prototype.eq = function(e) {
  if (e.type === "affine")
    return this.eq(e.toJ());
  if (this === e)
    return !0;
  var t = this.z.redSqr(), i = e.z.redSqr();
  if (this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0) !== 0)
    return !1;
  var n = t.redMul(this.z), s = i.redMul(e.z);
  return this.y.redMul(s).redISub(e.y.redMul(n)).cmpn(0) === 0;
};
Nt.prototype.eqXToP = function(e) {
  var t = this.z.redSqr(), i = e.toRed(this.curve.red).redMul(t);
  if (this.x.cmp(i) === 0)
    return !0;
  for (var n = e.clone(), s = this.curve.redN.redMul(t); ; ) {
    if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
      return !1;
    if (i.redIAdd(s), this.x.cmp(i) === 0)
      return !0;
  }
};
Nt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
Nt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var Os = xn(function(r, e) {
  var t = e;
  t.base = Xi, t.short = Mg, t.mont = /*RicMoo:ethers:require(./mont)*/
  null, t.edwards = /*RicMoo:ethers:require(./edwards)*/
  null;
}), Rs = xn(function(r, e) {
  var t = e, i = sr.assert;
  function n(f) {
    f.type === "short" ? this.curve = new Os.short(f) : f.type === "edwards" ? this.curve = new Os.edwards(f) : this.curve = new Os.mont(f), this.g = this.curve.g, this.n = this.curve.n, this.hash = f.hash, i(this.g.validate(), "Invalid curve"), i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  t.PresetCurve = n;
  function s(f, h) {
    Object.defineProperty(t, f, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var d = new n(h);
        return Object.defineProperty(t, f, {
          configurable: !0,
          enumerable: !0,
          value: d
        }), d;
      }
    });
  }
  s("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: si.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), s("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: si.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), s("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: si.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), s("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: si.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), s("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: si.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), s("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: si.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), s("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: si.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var o;
  try {
    o = /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch {
    o = void 0;
  }
  s("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: si.sha256,
    // Precomputed endomorphism
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      o
    ]
  });
});
function _i(r) {
  if (!(this instanceof _i))
    return new _i(r);
  this.hash = r.hash, this.predResist = !!r.predResist, this.outLen = this.hash.outSize, this.minEntropy = r.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var e = Mr.toArray(r.entropy, r.entropyEnc || "hex"), t = Mr.toArray(r.nonce, r.nonceEnc || "hex"), i = Mr.toArray(r.pers, r.persEnc || "hex");
  Bo(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(e, t, i);
}
var Lu = _i;
_i.prototype._init = function(e, t, i) {
  var n = e.concat(t).concat(i);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var s = 0; s < this.V.length; s++)
    this.K[s] = 0, this.V[s] = 1;
  this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656;
};
_i.prototype._hmac = function() {
  return new si.hmac(this.hash, this.K);
};
_i.prototype._update = function(e) {
  var t = this._hmac().update(this.V).update([0]);
  e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest());
};
_i.prototype.reseed = function(e, t, i, n) {
  typeof t != "string" && (n = i, i = t, t = null), e = Mr.toArray(e, t), i = Mr.toArray(i, n), Bo(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(e.concat(i || [])), this._reseed = 1;
};
_i.prototype.generate = function(e, t, i, n) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof t != "string" && (n = i, i = t, t = null), i && (i = Mr.toArray(i, n || "hex"), this._update(i));
  for (var s = []; s.length < e; )
    this.V = this._hmac().update(this.V).digest(), s = s.concat(this.V);
  var o = s.slice(0, e);
  return this._update(i), this._reseed++, Mr.encode(o, t);
};
var xo = sr.assert;
function qt(r, e) {
  this.ec = r, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc);
}
var jo = qt;
qt.fromPublic = function(e, t, i) {
  return t instanceof qt ? t : new qt(e, {
    pub: t,
    pubEnc: i
  });
};
qt.fromPrivate = function(e, t, i) {
  return t instanceof qt ? t : new qt(e, {
    priv: t,
    privEnc: i
  });
};
qt.prototype.validate = function() {
  var e = this.getPublic();
  return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
qt.prototype.getPublic = function(e, t) {
  return typeof e == "string" && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub;
};
qt.prototype.getPrivate = function(e) {
  return e === "hex" ? this.priv.toString(16, 2) : this.priv;
};
qt.prototype._importPrivate = function(e, t) {
  this.priv = new Ke(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
qt.prototype._importPublic = function(e, t) {
  if (e.x || e.y) {
    this.ec.curve.type === "mont" ? xo(e.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && xo(e.x && e.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(e.x, e.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(e, t);
};
qt.prototype.derive = function(e) {
  return e.validate() || xo(e.validate(), "public point not validated"), e.mul(this.priv).getX();
};
qt.prototype.sign = function(e, t, i) {
  return this.ec.sign(e, this, t, i);
};
qt.prototype.verify = function(e, t) {
  return this.ec.verify(e, t, this);
};
qt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Ig = sr.assert;
function la(r, e) {
  if (r instanceof la)
    return r;
  this._importDER(r, e) || (Ig(r.r && r.s, "Signature without r or s"), this.r = new Ke(r.r, 16), this.s = new Ke(r.s, 16), r.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = r.recoveryParam);
}
var pa = la;
function Ag() {
  this.place = 0;
}
function Va(r, e) {
  var t = r[e.place++];
  if (!(t & 128))
    return t;
  var i = t & 15;
  if (i === 0 || i > 4)
    return !1;
  for (var n = 0, s = 0, o = e.place; s < i; s++, o++)
    n <<= 8, n |= r[o], n >>>= 0;
  return n <= 127 ? !1 : (e.place = o, n);
}
function lc(r) {
  for (var e = 0, t = r.length - 1; !r[e] && !(r[e + 1] & 128) && e < t; )
    e++;
  return e === 0 ? r : r.slice(e);
}
la.prototype._importDER = function(e, t) {
  e = sr.toArray(e, t);
  var i = new Ag();
  if (e[i.place++] !== 48)
    return !1;
  var n = Va(e, i);
  if (n === !1 || n + i.place !== e.length || e[i.place++] !== 2)
    return !1;
  var s = Va(e, i);
  if (s === !1)
    return !1;
  var o = e.slice(i.place, s + i.place);
  if (i.place += s, e[i.place++] !== 2)
    return !1;
  var f = Va(e, i);
  if (f === !1 || e.length !== f + i.place)
    return !1;
  var h = e.slice(i.place, f + i.place);
  if (o[0] === 0)
    if (o[1] & 128)
      o = o.slice(1);
    else
      return !1;
  if (h[0] === 0)
    if (h[1] & 128)
      h = h.slice(1);
    else
      return !1;
  return this.r = new Ke(o), this.s = new Ke(h), this.recoveryParam = null, !0;
};
function Wa(r, e) {
  if (e < 128) {
    r.push(e);
    return;
  }
  var t = 1 + (Math.log(e) / Math.LN2 >>> 3);
  for (r.push(t | 128); --t; )
    r.push(e >>> (t << 3) & 255);
  r.push(e);
}
la.prototype.toDER = function(e) {
  var t = this.r.toArray(), i = this.s.toArray();
  for (t[0] & 128 && (t = [0].concat(t)), i[0] & 128 && (i = [0].concat(i)), t = lc(t), i = lc(i); !i[0] && !(i[1] & 128); )
    i = i.slice(1);
  var n = [2];
  Wa(n, t.length), n = n.concat(t), n.push(2), Wa(n, i.length);
  var s = n.concat(i), o = [48];
  return Wa(o, s.length), o = o.concat(s), sr.encode(o, e);
};
var Dg = (
  /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }
), Fu = sr.assert;
function lr(r) {
  if (!(this instanceof lr))
    return new lr(r);
  typeof r == "string" && (Fu(
    Object.prototype.hasOwnProperty.call(Rs, r),
    "Unknown curve " + r
  ), r = Rs[r]), r instanceof Rs.PresetCurve && (r = { curve: r }), this.curve = r.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = r.curve.g, this.g.precompute(r.curve.n.bitLength() + 1), this.hash = r.hash || r.curve.hash;
}
var Pg = lr;
lr.prototype.keyPair = function(e) {
  return new jo(this, e);
};
lr.prototype.keyFromPrivate = function(e, t) {
  return jo.fromPrivate(this, e, t);
};
lr.prototype.keyFromPublic = function(e, t) {
  return jo.fromPublic(this, e, t);
};
lr.prototype.genKeyPair = function(e) {
  e || (e = {});
  for (var t = new Lu({
    hash: this.hash,
    pers: e.pers,
    persEnc: e.persEnc || "utf8",
    entropy: e.entropy || Dg(this.hash.hmacStrength),
    entropyEnc: e.entropy && e.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), i = this.n.byteLength(), n = this.n.sub(new Ke(2)); ; ) {
    var s = new Ke(t.generate(i));
    if (!(s.cmp(n) > 0))
      return s.iaddn(1), this.keyFromPrivate(s);
  }
};
lr.prototype._truncateToN = function(e, t) {
  var i = e.byteLength() * 8 - this.n.bitLength();
  return i > 0 && (e = e.ushrn(i)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
lr.prototype.sign = function(e, t, i, n) {
  typeof i == "object" && (n = i, i = null), n || (n = {}), t = this.keyFromPrivate(t, i), e = this._truncateToN(new Ke(e, 16));
  for (var s = this.n.byteLength(), o = t.getPrivate().toArray("be", s), f = e.toArray("be", s), h = new Lu({
    hash: this.hash,
    entropy: o,
    nonce: f,
    pers: n.pers,
    persEnc: n.persEnc || "utf8"
  }), d = this.n.sub(new Ke(1)), v = 0; ; v++) {
    var w = n.k ? n.k(v) : new Ke(h.generate(this.n.byteLength()));
    if (w = this._truncateToN(w, !0), !(w.cmpn(1) <= 0 || w.cmp(d) >= 0)) {
      var A = this.g.mul(w);
      if (!A.isInfinity()) {
        var I = A.getX(), D = I.umod(this.n);
        if (D.cmpn(0) !== 0) {
          var N = w.invm(this.n).mul(D.mul(t.getPrivate()).iadd(e));
          if (N = N.umod(this.n), N.cmpn(0) !== 0) {
            var k = (A.getY().isOdd() ? 1 : 0) | (I.cmp(D) !== 0 ? 2 : 0);
            return n.canonical && N.cmp(this.nh) > 0 && (N = this.n.sub(N), k ^= 1), new pa({ r: D, s: N, recoveryParam: k });
          }
        }
      }
    }
  }
};
lr.prototype.verify = function(e, t, i, n) {
  e = this._truncateToN(new Ke(e, 16)), i = this.keyFromPublic(i, n), t = new pa(t, "hex");
  var s = t.r, o = t.s;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0 || o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
    return !1;
  var f = o.invm(this.n), h = f.mul(e).umod(this.n), d = f.mul(s).umod(this.n), v;
  return this.curve._maxwellTrick ? (v = this.g.jmulAdd(h, i.getPublic(), d), v.isInfinity() ? !1 : v.eqXToP(s)) : (v = this.g.mulAdd(h, i.getPublic(), d), v.isInfinity() ? !1 : v.getX().umod(this.n).cmp(s) === 0);
};
lr.prototype.recoverPubKey = function(r, e, t, i) {
  Fu((3 & t) === t, "The recovery param is more than two bits"), e = new pa(e, i);
  var n = this.n, s = new Ke(r), o = e.r, f = e.s, h = t & 1, d = t >> 1;
  if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
    throw new Error("Unable to find sencond key candinate");
  d ? o = this.curve.pointFromX(o.add(this.curve.n), h) : o = this.curve.pointFromX(o, h);
  var v = e.r.invm(n), w = n.sub(s).mul(v).umod(n), A = f.mul(v).umod(n);
  return this.g.mulAdd(w, o, A);
};
lr.prototype.getKeyRecoveryParam = function(r, e, t, i) {
  if (e = new pa(e, i), e.recoveryParam !== null)
    return e.recoveryParam;
  for (var n = 0; n < 4; n++) {
    var s;
    try {
      s = this.recoverPubKey(r, e, n);
    } catch {
      continue;
    }
    if (s.eq(t))
      return n;
  }
  throw new Error("Unable to find valid recovery factor");
};
var Og = xn(function(r, e) {
  var t = e;
  t.version = "6.5.4", t.utils = sr, t.rand = /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }, t.curve = Os, t.curves = Rs, t.ec = Pg, t.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
}), Rg = Og.ec;
const Ng = "signing-key/5.7.0", Eo = new ht(Ng);
let Ga = null;
function Cr() {
  return Ga || (Ga = new Rg("secp256k1")), Ga;
}
class Tg {
  constructor(e) {
    Tn(this, "curve", "secp256k1"), Tn(this, "privateKey", Jt(e)), qv(this.privateKey) !== 32 && Eo.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const t = Cr().keyFromPrivate(yt(this.privateKey));
    Tn(this, "publicKey", "0x" + t.getPublic(!1, "hex")), Tn(this, "compressedPublicKey", "0x" + t.getPublic(!0, "hex")), Tn(this, "_isSigningKey", !0);
  }
  _addPoint(e) {
    const t = Cr().keyFromPublic(yt(this.publicKey)), i = Cr().keyFromPublic(yt(e));
    return "0x" + t.pub.add(i.pub).encodeCompressed("hex");
  }
  signDigest(e) {
    const t = Cr().keyFromPrivate(yt(this.privateKey)), i = yt(e);
    i.length !== 32 && Eo.throwArgumentError("bad digest length", "digest", e);
    const n = t.sign(i, { canonical: !0 });
    return vu({
      recoveryParam: n.recoveryParam,
      r: hn("0x" + n.r.toString(16), 32),
      s: hn("0x" + n.s.toString(16), 32)
    });
  }
  computeSharedSecret(e) {
    const t = Cr().keyFromPrivate(yt(this.privateKey)), i = Cr().keyFromPublic(yt(qu(e)));
    return hn("0x" + t.derive(i.getPublic()).toString(16), 32);
  }
  static isSigningKey(e) {
    return !!(e && e._isSigningKey);
  }
}
function Cg(r, e) {
  const t = vu(e), i = { r: yt(t.r), s: yt(t.s) };
  return "0x" + Cr().recoverPubKey(yt(r), i, t.recoveryParam).encode("hex", !1);
}
function qu(r, e) {
  const t = yt(r);
  if (t.length === 32) {
    const i = new Tg(t);
    return e ? "0x" + Cr().keyFromPrivate(t).getPublic(!0, "hex") : i.publicKey;
  } else {
    if (t.length === 33)
      return e ? Jt(t) : "0x" + Cr().keyFromPublic(t).getPublic(!1, "hex");
    if (t.length === 65)
      return e ? "0x" + Cr().keyFromPublic(t).getPublic(!0, "hex") : Jt(t);
  }
  return Eo.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var pc;
(function(r) {
  r[r.legacy = 0] = "legacy", r[r.eip2930 = 1] = "eip2930", r[r.eip1559 = 2] = "eip1559";
})(pc || (pc = {}));
function $g(r) {
  const e = qu(r);
  return Jv(sc(qo(sc(e, 1)), 12));
}
function Lg(r, e) {
  return $g(Cg(yt(r), e));
}
var Ko = {}, va = {};
Object.defineProperty(va, "__esModule", { value: !0 });
var Ft = Ve, So = nr, Fg = 20;
function qg(r, e, t) {
  for (var i = 1634760805, n = 857760878, s = 2036477234, o = 1797285236, f = t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0], h = t[7] << 24 | t[6] << 16 | t[5] << 8 | t[4], d = t[11] << 24 | t[10] << 16 | t[9] << 8 | t[8], v = t[15] << 24 | t[14] << 16 | t[13] << 8 | t[12], w = t[19] << 24 | t[18] << 16 | t[17] << 8 | t[16], A = t[23] << 24 | t[22] << 16 | t[21] << 8 | t[20], I = t[27] << 24 | t[26] << 16 | t[25] << 8 | t[24], D = t[31] << 24 | t[30] << 16 | t[29] << 8 | t[28], N = e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0], k = e[7] << 24 | e[6] << 16 | e[5] << 8 | e[4], j = e[11] << 24 | e[10] << 16 | e[9] << 8 | e[8], T = e[15] << 24 | e[14] << 16 | e[13] << 8 | e[12], K = i, $ = n, z = s, B = o, _ = f, R = h, J = d, Q = v, O = w, p = A, l = I, a = D, c = N, b = k, E = j, S = T, x = 0; x < Fg; x += 2)
    K = K + _ | 0, c ^= K, c = c >>> 32 - 16 | c << 16, O = O + c | 0, _ ^= O, _ = _ >>> 32 - 12 | _ << 12, $ = $ + R | 0, b ^= $, b = b >>> 32 - 16 | b << 16, p = p + b | 0, R ^= p, R = R >>> 32 - 12 | R << 12, z = z + J | 0, E ^= z, E = E >>> 32 - 16 | E << 16, l = l + E | 0, J ^= l, J = J >>> 32 - 12 | J << 12, B = B + Q | 0, S ^= B, S = S >>> 32 - 16 | S << 16, a = a + S | 0, Q ^= a, Q = Q >>> 32 - 12 | Q << 12, z = z + J | 0, E ^= z, E = E >>> 32 - 8 | E << 8, l = l + E | 0, J ^= l, J = J >>> 32 - 7 | J << 7, B = B + Q | 0, S ^= B, S = S >>> 32 - 8 | S << 8, a = a + S | 0, Q ^= a, Q = Q >>> 32 - 7 | Q << 7, $ = $ + R | 0, b ^= $, b = b >>> 32 - 8 | b << 8, p = p + b | 0, R ^= p, R = R >>> 32 - 7 | R << 7, K = K + _ | 0, c ^= K, c = c >>> 32 - 8 | c << 8, O = O + c | 0, _ ^= O, _ = _ >>> 32 - 7 | _ << 7, K = K + R | 0, S ^= K, S = S >>> 32 - 16 | S << 16, l = l + S | 0, R ^= l, R = R >>> 32 - 12 | R << 12, $ = $ + J | 0, c ^= $, c = c >>> 32 - 16 | c << 16, a = a + c | 0, J ^= a, J = J >>> 32 - 12 | J << 12, z = z + Q | 0, b ^= z, b = b >>> 32 - 16 | b << 16, O = O + b | 0, Q ^= O, Q = Q >>> 32 - 12 | Q << 12, B = B + _ | 0, E ^= B, E = E >>> 32 - 16 | E << 16, p = p + E | 0, _ ^= p, _ = _ >>> 32 - 12 | _ << 12, z = z + Q | 0, b ^= z, b = b >>> 32 - 8 | b << 8, O = O + b | 0, Q ^= O, Q = Q >>> 32 - 7 | Q << 7, B = B + _ | 0, E ^= B, E = E >>> 32 - 8 | E << 8, p = p + E | 0, _ ^= p, _ = _ >>> 32 - 7 | _ << 7, $ = $ + J | 0, c ^= $, c = c >>> 32 - 8 | c << 8, a = a + c | 0, J ^= a, J = J >>> 32 - 7 | J << 7, K = K + R | 0, S ^= K, S = S >>> 32 - 8 | S << 8, l = l + S | 0, R ^= l, R = R >>> 32 - 7 | R << 7;
  Ft.writeUint32LE(K + i | 0, r, 0), Ft.writeUint32LE($ + n | 0, r, 4), Ft.writeUint32LE(z + s | 0, r, 8), Ft.writeUint32LE(B + o | 0, r, 12), Ft.writeUint32LE(_ + f | 0, r, 16), Ft.writeUint32LE(R + h | 0, r, 20), Ft.writeUint32LE(J + d | 0, r, 24), Ft.writeUint32LE(Q + v | 0, r, 28), Ft.writeUint32LE(O + w | 0, r, 32), Ft.writeUint32LE(p + A | 0, r, 36), Ft.writeUint32LE(l + I | 0, r, 40), Ft.writeUint32LE(a + D | 0, r, 44), Ft.writeUint32LE(c + N | 0, r, 48), Ft.writeUint32LE(b + k | 0, r, 52), Ft.writeUint32LE(E + j | 0, r, 56), Ft.writeUint32LE(S + T | 0, r, 60);
}
function Uu(r, e, t, i, n) {
  if (n === void 0 && (n = 0), r.length !== 32)
    throw new Error("ChaCha: key size must be 32 bytes");
  if (i.length < t.length)
    throw new Error("ChaCha: destination is shorter than source");
  var s, o;
  if (n === 0) {
    if (e.length !== 8 && e.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    s = new Uint8Array(16), o = s.length - e.length, s.set(e, o);
  } else {
    if (e.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    s = e, o = n;
  }
  for (var f = new Uint8Array(64), h = 0; h < t.length; h += 64) {
    qg(f, s, r);
    for (var d = h; d < h + 64 && d < t.length; d++)
      i[d] = t[d] ^ f[d - h];
    zg(s, 0, o);
  }
  return So.wipe(f), n === 0 && So.wipe(s), i;
}
va.streamXOR = Uu;
function Ug(r, e, t, i) {
  return i === void 0 && (i = 0), So.wipe(t), Uu(r, e, t, t, i);
}
va.stream = Ug;
function zg(r, e, t) {
  for (var i = 1; t--; )
    i = i + (r[e] & 255) | 0, r[e] = i & 255, i >>>= 8, e++;
  if (i > 0)
    throw new Error("ChaCha: counter overflow");
}
var zu = {}, Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
function Bg(r, e, t) {
  return ~(r - 1) & e | r - 1 & t;
}
Mi.select = Bg;
function kg(r, e) {
  return (r | 0) - (e | 0) - 1 >>> 31 & 1;
}
Mi.lessOrEqual = kg;
function Bu(r, e) {
  if (r.length !== e.length)
    return 0;
  for (var t = 0, i = 0; i < r.length; i++)
    t |= r[i] ^ e[i];
  return 1 & t - 1 >>> 8;
}
Mi.compare = Bu;
function jg(r, e) {
  return r.length === 0 || e.length === 0 ? !1 : Bu(r, e) !== 0;
}
Mi.equal = jg;
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = Mi, t = nr;
  r.DIGEST_LENGTH = 16;
  var i = (
    /** @class */
    function() {
      function o(f) {
        this.digestLength = r.DIGEST_LENGTH, this._buffer = new Uint8Array(16), this._r = new Uint16Array(10), this._h = new Uint16Array(10), this._pad = new Uint16Array(8), this._leftover = 0, this._fin = 0, this._finished = !1;
        var h = f[0] | f[1] << 8;
        this._r[0] = h & 8191;
        var d = f[2] | f[3] << 8;
        this._r[1] = (h >>> 13 | d << 3) & 8191;
        var v = f[4] | f[5] << 8;
        this._r[2] = (d >>> 10 | v << 6) & 7939;
        var w = f[6] | f[7] << 8;
        this._r[3] = (v >>> 7 | w << 9) & 8191;
        var A = f[8] | f[9] << 8;
        this._r[4] = (w >>> 4 | A << 12) & 255, this._r[5] = A >>> 1 & 8190;
        var I = f[10] | f[11] << 8;
        this._r[6] = (A >>> 14 | I << 2) & 8191;
        var D = f[12] | f[13] << 8;
        this._r[7] = (I >>> 11 | D << 5) & 8065;
        var N = f[14] | f[15] << 8;
        this._r[8] = (D >>> 8 | N << 8) & 8191, this._r[9] = N >>> 5 & 127, this._pad[0] = f[16] | f[17] << 8, this._pad[1] = f[18] | f[19] << 8, this._pad[2] = f[20] | f[21] << 8, this._pad[3] = f[22] | f[23] << 8, this._pad[4] = f[24] | f[25] << 8, this._pad[5] = f[26] | f[27] << 8, this._pad[6] = f[28] | f[29] << 8, this._pad[7] = f[30] | f[31] << 8;
      }
      return o.prototype._blocks = function(f, h, d) {
        for (var v = this._fin ? 0 : 2048, w = this._h[0], A = this._h[1], I = this._h[2], D = this._h[3], N = this._h[4], k = this._h[5], j = this._h[6], T = this._h[7], K = this._h[8], $ = this._h[9], z = this._r[0], B = this._r[1], _ = this._r[2], R = this._r[3], J = this._r[4], Q = this._r[5], O = this._r[6], p = this._r[7], l = this._r[8], a = this._r[9]; d >= 16; ) {
          var c = f[h + 0] | f[h + 1] << 8;
          w += c & 8191;
          var b = f[h + 2] | f[h + 3] << 8;
          A += (c >>> 13 | b << 3) & 8191;
          var E = f[h + 4] | f[h + 5] << 8;
          I += (b >>> 10 | E << 6) & 8191;
          var S = f[h + 6] | f[h + 7] << 8;
          D += (E >>> 7 | S << 9) & 8191;
          var x = f[h + 8] | f[h + 9] << 8;
          N += (S >>> 4 | x << 12) & 8191, k += x >>> 1 & 8191;
          var u = f[h + 10] | f[h + 11] << 8;
          j += (x >>> 14 | u << 2) & 8191;
          var m = f[h + 12] | f[h + 13] << 8;
          T += (u >>> 11 | m << 5) & 8191;
          var g = f[h + 14] | f[h + 15] << 8;
          K += (m >>> 8 | g << 8) & 8191, $ += g >>> 5 | v;
          var P = 0, G = P;
          G += w * z, G += A * (5 * a), G += I * (5 * l), G += D * (5 * p), G += N * (5 * O), P = G >>> 13, G &= 8191, G += k * (5 * Q), G += j * (5 * J), G += T * (5 * R), G += K * (5 * _), G += $ * (5 * B), P += G >>> 13, G &= 8191;
          var M = P;
          M += w * B, M += A * z, M += I * (5 * a), M += D * (5 * l), M += N * (5 * p), P = M >>> 13, M &= 8191, M += k * (5 * O), M += j * (5 * Q), M += T * (5 * J), M += K * (5 * R), M += $ * (5 * _), P += M >>> 13, M &= 8191;
          var H = P;
          H += w * _, H += A * B, H += I * z, H += D * (5 * a), H += N * (5 * l), P = H >>> 13, H &= 8191, H += k * (5 * p), H += j * (5 * O), H += T * (5 * Q), H += K * (5 * J), H += $ * (5 * R), P += H >>> 13, H &= 8191;
          var C = P;
          C += w * R, C += A * _, C += I * B, C += D * z, C += N * (5 * a), P = C >>> 13, C &= 8191, C += k * (5 * l), C += j * (5 * p), C += T * (5 * O), C += K * (5 * Q), C += $ * (5 * J), P += C >>> 13, C &= 8191;
          var q = P;
          q += w * J, q += A * R, q += I * _, q += D * B, q += N * z, P = q >>> 13, q &= 8191, q += k * (5 * a), q += j * (5 * l), q += T * (5 * p), q += K * (5 * O), q += $ * (5 * Q), P += q >>> 13, q &= 8191;
          var L = P;
          L += w * Q, L += A * J, L += I * R, L += D * _, L += N * B, P = L >>> 13, L &= 8191, L += k * z, L += j * (5 * a), L += T * (5 * l), L += K * (5 * p), L += $ * (5 * O), P += L >>> 13, L &= 8191;
          var y = P;
          y += w * O, y += A * Q, y += I * J, y += D * R, y += N * _, P = y >>> 13, y &= 8191, y += k * B, y += j * z, y += T * (5 * a), y += K * (5 * l), y += $ * (5 * p), P += y >>> 13, y &= 8191;
          var F = P;
          F += w * p, F += A * O, F += I * Q, F += D * J, F += N * R, P = F >>> 13, F &= 8191, F += k * _, F += j * B, F += T * z, F += K * (5 * a), F += $ * (5 * l), P += F >>> 13, F &= 8191;
          var W = P;
          W += w * l, W += A * p, W += I * O, W += D * Q, W += N * J, P = W >>> 13, W &= 8191, W += k * R, W += j * _, W += T * B, W += K * z, W += $ * (5 * a), P += W >>> 13, W &= 8191;
          var Y = P;
          Y += w * a, Y += A * l, Y += I * p, Y += D * O, Y += N * Q, P = Y >>> 13, Y &= 8191, Y += k * J, Y += j * R, Y += T * _, Y += K * B, Y += $ * z, P += Y >>> 13, Y &= 8191, P = (P << 2) + P | 0, P = P + G | 0, G = P & 8191, P = P >>> 13, M += P, w = G, A = M, I = H, D = C, N = q, k = L, j = y, T = F, K = W, $ = Y, h += 16, d -= 16;
        }
        this._h[0] = w, this._h[1] = A, this._h[2] = I, this._h[3] = D, this._h[4] = N, this._h[5] = k, this._h[6] = j, this._h[7] = T, this._h[8] = K, this._h[9] = $;
      }, o.prototype.finish = function(f, h) {
        h === void 0 && (h = 0);
        var d = new Uint16Array(10), v, w, A, I;
        if (this._leftover) {
          for (I = this._leftover, this._buffer[I++] = 1; I < 16; I++)
            this._buffer[I] = 0;
          this._fin = 1, this._blocks(this._buffer, 0, 16);
        }
        for (v = this._h[1] >>> 13, this._h[1] &= 8191, I = 2; I < 10; I++)
          this._h[I] += v, v = this._h[I] >>> 13, this._h[I] &= 8191;
        for (this._h[0] += v * 5, v = this._h[0] >>> 13, this._h[0] &= 8191, this._h[1] += v, v = this._h[1] >>> 13, this._h[1] &= 8191, this._h[2] += v, d[0] = this._h[0] + 5, v = d[0] >>> 13, d[0] &= 8191, I = 1; I < 10; I++)
          d[I] = this._h[I] + v, v = d[I] >>> 13, d[I] &= 8191;
        for (d[9] -= 8192, w = (v ^ 1) - 1, I = 0; I < 10; I++)
          d[I] &= w;
        for (w = ~w, I = 0; I < 10; I++)
          this._h[I] = this._h[I] & w | d[I];
        for (this._h[0] = (this._h[0] | this._h[1] << 13) & 65535, this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535, this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535, this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535, this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535, this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535, this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535, this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535, A = this._h[0] + this._pad[0], this._h[0] = A & 65535, I = 1; I < 8; I++)
          A = (this._h[I] + this._pad[I] | 0) + (A >>> 16) | 0, this._h[I] = A & 65535;
        return f[h + 0] = this._h[0] >>> 0, f[h + 1] = this._h[0] >>> 8, f[h + 2] = this._h[1] >>> 0, f[h + 3] = this._h[1] >>> 8, f[h + 4] = this._h[2] >>> 0, f[h + 5] = this._h[2] >>> 8, f[h + 6] = this._h[3] >>> 0, f[h + 7] = this._h[3] >>> 8, f[h + 8] = this._h[4] >>> 0, f[h + 9] = this._h[4] >>> 8, f[h + 10] = this._h[5] >>> 0, f[h + 11] = this._h[5] >>> 8, f[h + 12] = this._h[6] >>> 0, f[h + 13] = this._h[6] >>> 8, f[h + 14] = this._h[7] >>> 0, f[h + 15] = this._h[7] >>> 8, this._finished = !0, this;
      }, o.prototype.update = function(f) {
        var h = 0, d = f.length, v;
        if (this._leftover) {
          v = 16 - this._leftover, v > d && (v = d);
          for (var w = 0; w < v; w++)
            this._buffer[this._leftover + w] = f[h + w];
          if (d -= v, h += v, this._leftover += v, this._leftover < 16)
            return this;
          this._blocks(this._buffer, 0, 16), this._leftover = 0;
        }
        if (d >= 16 && (v = d - d % 16, this._blocks(f, h, v), h += v, d -= v), d) {
          for (var w = 0; w < d; w++)
            this._buffer[this._leftover + w] = f[h + w];
          this._leftover += d;
        }
        return this;
      }, o.prototype.digest = function() {
        if (this._finished)
          throw new Error("Poly1305 was finished");
        var f = new Uint8Array(16);
        return this.finish(f), f;
      }, o.prototype.clean = function() {
        return t.wipe(this._buffer), t.wipe(this._r), t.wipe(this._h), t.wipe(this._pad), this._leftover = 0, this._fin = 0, this._finished = !0, this;
      }, o;
    }()
  );
  r.Poly1305 = i;
  function n(o, f) {
    var h = new i(o);
    h.update(f);
    var d = h.digest();
    return h.clean(), d;
  }
  r.oneTimeAuth = n;
  function s(o, f) {
    return o.length !== r.DIGEST_LENGTH || f.length !== r.DIGEST_LENGTH ? !1 : e.equal(o, f);
  }
  r.equal = s;
})(zu);
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = va, t = zu, i = nr, n = Ve, s = Mi;
  r.KEY_LENGTH = 32, r.NONCE_LENGTH = 12, r.TAG_LENGTH = 16;
  var o = new Uint8Array(16), f = (
    /** @class */
    function() {
      function h(d) {
        if (this.nonceLength = r.NONCE_LENGTH, this.tagLength = r.TAG_LENGTH, d.length !== r.KEY_LENGTH)
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        this._key = new Uint8Array(d);
      }
      return h.prototype.seal = function(d, v, w, A) {
        if (d.length > 16)
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        var I = new Uint8Array(16);
        I.set(d, I.length - d.length);
        var D = new Uint8Array(32);
        e.stream(this._key, I, D, 4);
        var N = v.length + this.tagLength, k;
        if (A) {
          if (A.length !== N)
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          k = A;
        } else
          k = new Uint8Array(N);
        return e.streamXOR(this._key, I, v, k, 4), this._authenticate(k.subarray(k.length - this.tagLength, k.length), D, k.subarray(0, k.length - this.tagLength), w), i.wipe(I), k;
      }, h.prototype.open = function(d, v, w, A) {
        if (d.length > 16)
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        if (v.length < this.tagLength)
          return null;
        var I = new Uint8Array(16);
        I.set(d, I.length - d.length);
        var D = new Uint8Array(32);
        e.stream(this._key, I, D, 4);
        var N = new Uint8Array(this.tagLength);
        if (this._authenticate(N, D, v.subarray(0, v.length - this.tagLength), w), !s.equal(N, v.subarray(v.length - this.tagLength, v.length)))
          return null;
        var k = v.length - this.tagLength, j;
        if (A) {
          if (A.length !== k)
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          j = A;
        } else
          j = new Uint8Array(k);
        return e.streamXOR(this._key, I, v.subarray(0, v.length - this.tagLength), j, 4), i.wipe(I), j;
      }, h.prototype.clean = function() {
        return i.wipe(this._key), this;
      }, h.prototype._authenticate = function(d, v, w, A) {
        var I = new t.Poly1305(v);
        A && (I.update(A), A.length % 16 > 0 && I.update(o.subarray(A.length % 16))), I.update(w), w.length % 16 > 0 && I.update(o.subarray(w.length % 16));
        var D = new Uint8Array(8);
        A && n.writeUint64LE(A.length, D), I.update(D), n.writeUint64LE(w.length, D), I.update(D);
        for (var N = I.digest(), k = 0; k < N.length; k++)
          d[k] = N[k];
        I.clean(), i.wipe(N), i.wipe(D);
      }, h;
    }()
  );
  r.ChaCha20Poly1305 = f;
})(Ko);
var ku = {}, ss = {}, Ho = {};
Object.defineProperty(Ho, "__esModule", { value: !0 });
function Kg(r) {
  return typeof r.saveState < "u" && typeof r.restoreState < "u" && typeof r.cleanSavedState < "u";
}
Ho.isSerializableHash = Kg;
Object.defineProperty(ss, "__esModule", { value: !0 });
var Dr = Ho, Hg = Mi, Vg = nr, ju = (
  /** @class */
  function() {
    function r(e, t) {
      this._finished = !1, this._inner = new e(), this._outer = new e(), this.blockSize = this._outer.blockSize, this.digestLength = this._outer.digestLength;
      var i = new Uint8Array(this.blockSize);
      t.length > this.blockSize ? this._inner.update(t).finish(i).clean() : i.set(t);
      for (var n = 0; n < i.length; n++)
        i[n] ^= 54;
      this._inner.update(i);
      for (var n = 0; n < i.length; n++)
        i[n] ^= 106;
      this._outer.update(i), Dr.isSerializableHash(this._inner) && Dr.isSerializableHash(this._outer) && (this._innerKeyedState = this._inner.saveState(), this._outerKeyedState = this._outer.saveState()), Vg.wipe(i);
    }
    return r.prototype.reset = function() {
      if (!Dr.isSerializableHash(this._inner) || !Dr.isSerializableHash(this._outer))
        throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
      return this._inner.restoreState(this._innerKeyedState), this._outer.restoreState(this._outerKeyedState), this._finished = !1, this;
    }, r.prototype.clean = function() {
      Dr.isSerializableHash(this._inner) && this._inner.cleanSavedState(this._innerKeyedState), Dr.isSerializableHash(this._outer) && this._outer.cleanSavedState(this._outerKeyedState), this._inner.clean(), this._outer.clean();
    }, r.prototype.update = function(e) {
      return this._inner.update(e), this;
    }, r.prototype.finish = function(e) {
      return this._finished ? (this._outer.finish(e), this) : (this._inner.finish(e), this._outer.update(e.subarray(0, this.digestLength)).finish(e), this._finished = !0, this);
    }, r.prototype.digest = function() {
      var e = new Uint8Array(this.digestLength);
      return this.finish(e), e;
    }, r.prototype.saveState = function() {
      if (!Dr.isSerializableHash(this._inner))
        throw new Error("hmac: can't saveState() because hash doesn't implement it");
      return this._inner.saveState();
    }, r.prototype.restoreState = function(e) {
      if (!Dr.isSerializableHash(this._inner) || !Dr.isSerializableHash(this._outer))
        throw new Error("hmac: can't restoreState() because hash doesn't implement it");
      return this._inner.restoreState(e), this._outer.restoreState(this._outerKeyedState), this._finished = !1, this;
    }, r.prototype.cleanSavedState = function(e) {
      if (!Dr.isSerializableHash(this._inner))
        throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
      this._inner.cleanSavedState(e);
    }, r;
  }()
);
ss.HMAC = ju;
function Wg(r, e, t) {
  var i = new ju(r, e);
  i.update(t);
  var n = i.digest();
  return i.clean(), n;
}
ss.hmac = Wg;
ss.equal = Hg.equal;
Object.defineProperty(ku, "__esModule", { value: !0 });
var vc = ss, bc = nr, Gg = (
  /** @class */
  function() {
    function r(e, t, i, n) {
      i === void 0 && (i = new Uint8Array(0)), this._counter = new Uint8Array(1), this._hash = e, this._info = n;
      var s = vc.hmac(this._hash, i, t);
      this._hmac = new vc.HMAC(e, s), this._buffer = new Uint8Array(this._hmac.digestLength), this._bufpos = this._buffer.length;
    }
    return r.prototype._fillBuffer = function() {
      this._counter[0]++;
      var e = this._counter[0];
      if (e === 0)
        throw new Error("hkdf: cannot expand more");
      this._hmac.reset(), e > 1 && this._hmac.update(this._buffer), this._info && this._hmac.update(this._info), this._hmac.update(this._counter), this._hmac.finish(this._buffer), this._bufpos = 0;
    }, r.prototype.expand = function(e) {
      for (var t = new Uint8Array(e), i = 0; i < t.length; i++)
        this._bufpos === this._buffer.length && this._fillBuffer(), t[i] = this._buffer[this._bufpos++];
      return t;
    }, r.prototype.clean = function() {
      this._hmac.clean(), bc.wipe(this._buffer), bc.wipe(this._counter), this._bufpos = 0;
    }, r;
  }()
), Jg = ku.HKDF = Gg, as = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  var e = Ve, t = nr;
  r.DIGEST_LENGTH = 32, r.BLOCK_SIZE = 64;
  var i = (
    /** @class */
    function() {
      function f() {
        this.digestLength = r.DIGEST_LENGTH, this.blockSize = r.BLOCK_SIZE, this._state = new Int32Array(8), this._temp = new Int32Array(64), this._buffer = new Uint8Array(128), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this.reset();
      }
      return f.prototype._initState = function() {
        this._state[0] = 1779033703, this._state[1] = 3144134277, this._state[2] = 1013904242, this._state[3] = 2773480762, this._state[4] = 1359893119, this._state[5] = 2600822924, this._state[6] = 528734635, this._state[7] = 1541459225;
      }, f.prototype.reset = function() {
        return this._initState(), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this;
      }, f.prototype.clean = function() {
        t.wipe(this._buffer), t.wipe(this._temp), this.reset();
      }, f.prototype.update = function(h, d) {
        if (d === void 0 && (d = h.length), this._finished)
          throw new Error("SHA256: can't update because hash was finished.");
        var v = 0;
        if (this._bytesHashed += d, this._bufferLength > 0) {
          for (; this._bufferLength < this.blockSize && d > 0; )
            this._buffer[this._bufferLength++] = h[v++], d--;
          this._bufferLength === this.blockSize && (s(this._temp, this._state, this._buffer, 0, this.blockSize), this._bufferLength = 0);
        }
        for (d >= this.blockSize && (v = s(this._temp, this._state, h, v, d), d %= this.blockSize); d > 0; )
          this._buffer[this._bufferLength++] = h[v++], d--;
        return this;
      }, f.prototype.finish = function(h) {
        if (!this._finished) {
          var d = this._bytesHashed, v = this._bufferLength, w = d / 536870912 | 0, A = d << 3, I = d % 64 < 56 ? 64 : 128;
          this._buffer[v] = 128;
          for (var D = v + 1; D < I - 8; D++)
            this._buffer[D] = 0;
          e.writeUint32BE(w, this._buffer, I - 8), e.writeUint32BE(A, this._buffer, I - 4), s(this._temp, this._state, this._buffer, 0, I), this._finished = !0;
        }
        for (var D = 0; D < this.digestLength / 4; D++)
          e.writeUint32BE(this._state[D], h, D * 4);
        return this;
      }, f.prototype.digest = function() {
        var h = new Uint8Array(this.digestLength);
        return this.finish(h), h;
      }, f.prototype.saveState = function() {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          state: new Int32Array(this._state),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      }, f.prototype.restoreState = function(h) {
        return this._state.set(h.state), this._bufferLength = h.bufferLength, h.buffer && this._buffer.set(h.buffer), this._bytesHashed = h.bytesHashed, this._finished = !1, this;
      }, f.prototype.cleanSavedState = function(h) {
        t.wipe(h.state), h.buffer && t.wipe(h.buffer), h.bufferLength = 0, h.bytesHashed = 0;
      }, f;
    }()
  );
  r.SHA256 = i;
  var n = new Int32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  function s(f, h, d, v, w) {
    for (; w >= 64; ) {
      for (var A = h[0], I = h[1], D = h[2], N = h[3], k = h[4], j = h[5], T = h[6], K = h[7], $ = 0; $ < 16; $++) {
        var z = v + $ * 4;
        f[$] = e.readUint32BE(d, z);
      }
      for (var $ = 16; $ < 64; $++) {
        var B = f[$ - 2], _ = (B >>> 17 | B << 32 - 17) ^ (B >>> 19 | B << 32 - 19) ^ B >>> 10;
        B = f[$ - 15];
        var R = (B >>> 7 | B << 32 - 7) ^ (B >>> 18 | B << 32 - 18) ^ B >>> 3;
        f[$] = (_ + f[$ - 7] | 0) + (R + f[$ - 16] | 0);
      }
      for (var $ = 0; $ < 64; $++) {
        var _ = (((k >>> 6 | k << 26) ^ (k >>> 11 | k << 21) ^ (k >>> 25 | k << 7)) + (k & j ^ ~k & T) | 0) + (K + (n[$] + f[$] | 0) | 0) | 0, R = ((A >>> 2 | A << 32 - 2) ^ (A >>> 13 | A << 32 - 13) ^ (A >>> 22 | A << 32 - 22)) + (A & I ^ A & D ^ I & D) | 0;
        K = T, T = j, j = k, k = N + _ | 0, N = D, D = I, I = A, A = _ + R | 0;
      }
      h[0] += A, h[1] += I, h[2] += D, h[3] += N, h[4] += k, h[5] += j, h[6] += T, h[7] += K, v += 64, w -= 64;
    }
    return v;
  }
  function o(f) {
    var h = new i();
    h.update(f);
    var d = h.digest();
    return h.clean(), d;
  }
  r.hash = o;
})(as);
var Vo = {};
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.sharedKey = r.generateKeyPair = r.generateKeyPairFromSeed = r.scalarMultBase = r.scalarMult = r.SHARED_KEY_LENGTH = r.SECRET_KEY_LENGTH = r.PUBLIC_KEY_LENGTH = void 0;
  const e = Ei, t = nr;
  r.PUBLIC_KEY_LENGTH = 32, r.SECRET_KEY_LENGTH = 32, r.SHARED_KEY_LENGTH = 32;
  function i($) {
    const z = new Float64Array(16);
    if ($)
      for (let B = 0; B < $.length; B++)
        z[B] = $[B];
    return z;
  }
  const n = new Uint8Array(32);
  n[0] = 9;
  const s = i([56129, 1]);
  function o($) {
    let z = 1;
    for (let B = 0; B < 16; B++) {
      let _ = $[B] + z + 65535;
      z = Math.floor(_ / 65536), $[B] = _ - z * 65536;
    }
    $[0] += z - 1 + 37 * (z - 1);
  }
  function f($, z, B) {
    const _ = ~(B - 1);
    for (let R = 0; R < 16; R++) {
      const J = _ & ($[R] ^ z[R]);
      $[R] ^= J, z[R] ^= J;
    }
  }
  function h($, z) {
    const B = i(), _ = i();
    for (let R = 0; R < 16; R++)
      _[R] = z[R];
    o(_), o(_), o(_);
    for (let R = 0; R < 2; R++) {
      B[0] = _[0] - 65517;
      for (let Q = 1; Q < 15; Q++)
        B[Q] = _[Q] - 65535 - (B[Q - 1] >> 16 & 1), B[Q - 1] &= 65535;
      B[15] = _[15] - 32767 - (B[14] >> 16 & 1);
      const J = B[15] >> 16 & 1;
      B[14] &= 65535, f(_, B, 1 - J);
    }
    for (let R = 0; R < 16; R++)
      $[2 * R] = _[R] & 255, $[2 * R + 1] = _[R] >> 8;
  }
  function d($, z) {
    for (let B = 0; B < 16; B++)
      $[B] = z[2 * B] + (z[2 * B + 1] << 8);
    $[15] &= 32767;
  }
  function v($, z, B) {
    for (let _ = 0; _ < 16; _++)
      $[_] = z[_] + B[_];
  }
  function w($, z, B) {
    for (let _ = 0; _ < 16; _++)
      $[_] = z[_] - B[_];
  }
  function A($, z, B) {
    let _, R, J = 0, Q = 0, O = 0, p = 0, l = 0, a = 0, c = 0, b = 0, E = 0, S = 0, x = 0, u = 0, m = 0, g = 0, P = 0, G = 0, M = 0, H = 0, C = 0, q = 0, L = 0, y = 0, F = 0, W = 0, Y = 0, X = 0, ee = 0, we = 0, Me = 0, he = 0, Re = 0, xe = B[0], se = B[1], ge = B[2], le = B[3], ne = B[4], ue = B[5], fe = B[6], te = B[7], pe = B[8], _e = B[9], re = B[10], Ee = B[11], Se = B[12], oe = B[13], De = B[14], Ie = B[15];
    _ = z[0], J += _ * xe, Q += _ * se, O += _ * ge, p += _ * le, l += _ * ne, a += _ * ue, c += _ * fe, b += _ * te, E += _ * pe, S += _ * _e, x += _ * re, u += _ * Ee, m += _ * Se, g += _ * oe, P += _ * De, G += _ * Ie, _ = z[1], Q += _ * xe, O += _ * se, p += _ * ge, l += _ * le, a += _ * ne, c += _ * ue, b += _ * fe, E += _ * te, S += _ * pe, x += _ * _e, u += _ * re, m += _ * Ee, g += _ * Se, P += _ * oe, G += _ * De, M += _ * Ie, _ = z[2], O += _ * xe, p += _ * se, l += _ * ge, a += _ * le, c += _ * ne, b += _ * ue, E += _ * fe, S += _ * te, x += _ * pe, u += _ * _e, m += _ * re, g += _ * Ee, P += _ * Se, G += _ * oe, M += _ * De, H += _ * Ie, _ = z[3], p += _ * xe, l += _ * se, a += _ * ge, c += _ * le, b += _ * ne, E += _ * ue, S += _ * fe, x += _ * te, u += _ * pe, m += _ * _e, g += _ * re, P += _ * Ee, G += _ * Se, M += _ * oe, H += _ * De, C += _ * Ie, _ = z[4], l += _ * xe, a += _ * se, c += _ * ge, b += _ * le, E += _ * ne, S += _ * ue, x += _ * fe, u += _ * te, m += _ * pe, g += _ * _e, P += _ * re, G += _ * Ee, M += _ * Se, H += _ * oe, C += _ * De, q += _ * Ie, _ = z[5], a += _ * xe, c += _ * se, b += _ * ge, E += _ * le, S += _ * ne, x += _ * ue, u += _ * fe, m += _ * te, g += _ * pe, P += _ * _e, G += _ * re, M += _ * Ee, H += _ * Se, C += _ * oe, q += _ * De, L += _ * Ie, _ = z[6], c += _ * xe, b += _ * se, E += _ * ge, S += _ * le, x += _ * ne, u += _ * ue, m += _ * fe, g += _ * te, P += _ * pe, G += _ * _e, M += _ * re, H += _ * Ee, C += _ * Se, q += _ * oe, L += _ * De, y += _ * Ie, _ = z[7], b += _ * xe, E += _ * se, S += _ * ge, x += _ * le, u += _ * ne, m += _ * ue, g += _ * fe, P += _ * te, G += _ * pe, M += _ * _e, H += _ * re, C += _ * Ee, q += _ * Se, L += _ * oe, y += _ * De, F += _ * Ie, _ = z[8], E += _ * xe, S += _ * se, x += _ * ge, u += _ * le, m += _ * ne, g += _ * ue, P += _ * fe, G += _ * te, M += _ * pe, H += _ * _e, C += _ * re, q += _ * Ee, L += _ * Se, y += _ * oe, F += _ * De, W += _ * Ie, _ = z[9], S += _ * xe, x += _ * se, u += _ * ge, m += _ * le, g += _ * ne, P += _ * ue, G += _ * fe, M += _ * te, H += _ * pe, C += _ * _e, q += _ * re, L += _ * Ee, y += _ * Se, F += _ * oe, W += _ * De, Y += _ * Ie, _ = z[10], x += _ * xe, u += _ * se, m += _ * ge, g += _ * le, P += _ * ne, G += _ * ue, M += _ * fe, H += _ * te, C += _ * pe, q += _ * _e, L += _ * re, y += _ * Ee, F += _ * Se, W += _ * oe, Y += _ * De, X += _ * Ie, _ = z[11], u += _ * xe, m += _ * se, g += _ * ge, P += _ * le, G += _ * ne, M += _ * ue, H += _ * fe, C += _ * te, q += _ * pe, L += _ * _e, y += _ * re, F += _ * Ee, W += _ * Se, Y += _ * oe, X += _ * De, ee += _ * Ie, _ = z[12], m += _ * xe, g += _ * se, P += _ * ge, G += _ * le, M += _ * ne, H += _ * ue, C += _ * fe, q += _ * te, L += _ * pe, y += _ * _e, F += _ * re, W += _ * Ee, Y += _ * Se, X += _ * oe, ee += _ * De, we += _ * Ie, _ = z[13], g += _ * xe, P += _ * se, G += _ * ge, M += _ * le, H += _ * ne, C += _ * ue, q += _ * fe, L += _ * te, y += _ * pe, F += _ * _e, W += _ * re, Y += _ * Ee, X += _ * Se, ee += _ * oe, we += _ * De, Me += _ * Ie, _ = z[14], P += _ * xe, G += _ * se, M += _ * ge, H += _ * le, C += _ * ne, q += _ * ue, L += _ * fe, y += _ * te, F += _ * pe, W += _ * _e, Y += _ * re, X += _ * Ee, ee += _ * Se, we += _ * oe, Me += _ * De, he += _ * Ie, _ = z[15], G += _ * xe, M += _ * se, H += _ * ge, C += _ * le, q += _ * ne, L += _ * ue, y += _ * fe, F += _ * te, W += _ * pe, Y += _ * _e, X += _ * re, ee += _ * Ee, we += _ * Se, Me += _ * oe, he += _ * De, Re += _ * Ie, J += 38 * M, Q += 38 * H, O += 38 * C, p += 38 * q, l += 38 * L, a += 38 * y, c += 38 * F, b += 38 * W, E += 38 * Y, S += 38 * X, x += 38 * ee, u += 38 * we, m += 38 * Me, g += 38 * he, P += 38 * Re, R = 1, _ = J + R + 65535, R = Math.floor(_ / 65536), J = _ - R * 65536, _ = Q + R + 65535, R = Math.floor(_ / 65536), Q = _ - R * 65536, _ = O + R + 65535, R = Math.floor(_ / 65536), O = _ - R * 65536, _ = p + R + 65535, R = Math.floor(_ / 65536), p = _ - R * 65536, _ = l + R + 65535, R = Math.floor(_ / 65536), l = _ - R * 65536, _ = a + R + 65535, R = Math.floor(_ / 65536), a = _ - R * 65536, _ = c + R + 65535, R = Math.floor(_ / 65536), c = _ - R * 65536, _ = b + R + 65535, R = Math.floor(_ / 65536), b = _ - R * 65536, _ = E + R + 65535, R = Math.floor(_ / 65536), E = _ - R * 65536, _ = S + R + 65535, R = Math.floor(_ / 65536), S = _ - R * 65536, _ = x + R + 65535, R = Math.floor(_ / 65536), x = _ - R * 65536, _ = u + R + 65535, R = Math.floor(_ / 65536), u = _ - R * 65536, _ = m + R + 65535, R = Math.floor(_ / 65536), m = _ - R * 65536, _ = g + R + 65535, R = Math.floor(_ / 65536), g = _ - R * 65536, _ = P + R + 65535, R = Math.floor(_ / 65536), P = _ - R * 65536, _ = G + R + 65535, R = Math.floor(_ / 65536), G = _ - R * 65536, J += R - 1 + 37 * (R - 1), R = 1, _ = J + R + 65535, R = Math.floor(_ / 65536), J = _ - R * 65536, _ = Q + R + 65535, R = Math.floor(_ / 65536), Q = _ - R * 65536, _ = O + R + 65535, R = Math.floor(_ / 65536), O = _ - R * 65536, _ = p + R + 65535, R = Math.floor(_ / 65536), p = _ - R * 65536, _ = l + R + 65535, R = Math.floor(_ / 65536), l = _ - R * 65536, _ = a + R + 65535, R = Math.floor(_ / 65536), a = _ - R * 65536, _ = c + R + 65535, R = Math.floor(_ / 65536), c = _ - R * 65536, _ = b + R + 65535, R = Math.floor(_ / 65536), b = _ - R * 65536, _ = E + R + 65535, R = Math.floor(_ / 65536), E = _ - R * 65536, _ = S + R + 65535, R = Math.floor(_ / 65536), S = _ - R * 65536, _ = x + R + 65535, R = Math.floor(_ / 65536), x = _ - R * 65536, _ = u + R + 65535, R = Math.floor(_ / 65536), u = _ - R * 65536, _ = m + R + 65535, R = Math.floor(_ / 65536), m = _ - R * 65536, _ = g + R + 65535, R = Math.floor(_ / 65536), g = _ - R * 65536, _ = P + R + 65535, R = Math.floor(_ / 65536), P = _ - R * 65536, _ = G + R + 65535, R = Math.floor(_ / 65536), G = _ - R * 65536, J += R - 1 + 37 * (R - 1), $[0] = J, $[1] = Q, $[2] = O, $[3] = p, $[4] = l, $[5] = a, $[6] = c, $[7] = b, $[8] = E, $[9] = S, $[10] = x, $[11] = u, $[12] = m, $[13] = g, $[14] = P, $[15] = G;
  }
  function I($, z) {
    A($, z, z);
  }
  function D($, z) {
    const B = i();
    for (let _ = 0; _ < 16; _++)
      B[_] = z[_];
    for (let _ = 253; _ >= 0; _--)
      I(B, B), _ !== 2 && _ !== 4 && A(B, B, z);
    for (let _ = 0; _ < 16; _++)
      $[_] = B[_];
  }
  function N($, z) {
    const B = new Uint8Array(32), _ = new Float64Array(80), R = i(), J = i(), Q = i(), O = i(), p = i(), l = i();
    for (let E = 0; E < 31; E++)
      B[E] = $[E];
    B[31] = $[31] & 127 | 64, B[0] &= 248, d(_, z);
    for (let E = 0; E < 16; E++)
      J[E] = _[E];
    R[0] = O[0] = 1;
    for (let E = 254; E >= 0; --E) {
      const S = B[E >>> 3] >>> (E & 7) & 1;
      f(R, J, S), f(Q, O, S), v(p, R, Q), w(R, R, Q), v(Q, J, O), w(J, J, O), I(O, p), I(l, R), A(R, Q, R), A(Q, J, p), v(p, R, Q), w(R, R, Q), I(J, R), w(Q, O, l), A(R, Q, s), v(R, R, O), A(Q, Q, R), A(R, O, l), A(O, J, _), I(J, p), f(R, J, S), f(Q, O, S);
    }
    for (let E = 0; E < 16; E++)
      _[E + 16] = R[E], _[E + 32] = Q[E], _[E + 48] = J[E], _[E + 64] = O[E];
    const a = _.subarray(32), c = _.subarray(16);
    D(a, a), A(c, c, a);
    const b = new Uint8Array(32);
    return h(b, c), b;
  }
  r.scalarMult = N;
  function k($) {
    return N($, n);
  }
  r.scalarMultBase = k;
  function j($) {
    if ($.length !== r.SECRET_KEY_LENGTH)
      throw new Error(`x25519: seed must be ${r.SECRET_KEY_LENGTH} bytes`);
    const z = new Uint8Array($);
    return {
      publicKey: k(z),
      secretKey: z
    };
  }
  r.generateKeyPairFromSeed = j;
  function T($) {
    const z = (0, e.randomBytes)(32, $), B = j(z);
    return (0, t.wipe)(z), B;
  }
  r.generateKeyPair = T;
  function K($, z, B = !1) {
    if ($.length !== r.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect secret key length");
    if (z.length !== r.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect public key length");
    const _ = N($, z);
    if (B) {
      let R = 0;
      for (let J = 0; J < _.length; J++)
        R |= _[J];
      if (R === 0)
        throw new Error("X25519: invalid shared key");
    }
    return _;
  }
  r.sharedKey = K;
})(Vo);
var Ku = {};
const Yg = "elliptic", Xg = "6.6.1", Zg = "EC cryptography", Qg = "lib/elliptic.js", e2 = [
  "lib"
], t2 = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
}, r2 = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
}, i2 = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
], n2 = "Fedor Indutny <fedor@indutny.com>", s2 = "MIT", a2 = {
  url: "https://github.com/indutny/elliptic/issues"
}, o2 = "https://github.com/indutny/elliptic", f2 = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
}, c2 = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
}, h2 = {
  name: Yg,
  version: Xg,
  description: Zg,
  main: Qg,
  files: e2,
  scripts: t2,
  repository: r2,
  keywords: i2,
  author: n2,
  license: s2,
  bugs: a2,
  homepage: o2,
  devDependencies: f2,
  dependencies: c2
};
var ar = {}, Wo = { exports: {} };
Wo.exports;
(function(r) {
  (function(e, t) {
    function i(O, p) {
      if (!O)
        throw new Error(p || "Assertion failed");
    }
    function n(O, p) {
      O.super_ = p;
      var l = function() {
      };
      l.prototype = p.prototype, O.prototype = new l(), O.prototype.constructor = O;
    }
    function s(O, p, l) {
      if (s.isBN(O))
        return O;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, O !== null && ((p === "le" || p === "be") && (l = p, p = 10), this._init(O || 0, p || 10, l || "be"));
    }
    typeof e == "object" ? e.exports = s : t.BN = s, s.BN = s, s.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = fa.Buffer;
    } catch {
    }
    s.isBN = function(p) {
      return p instanceof s ? !0 : p !== null && typeof p == "object" && p.constructor.wordSize === s.wordSize && Array.isArray(p.words);
    }, s.max = function(p, l) {
      return p.cmp(l) > 0 ? p : l;
    }, s.min = function(p, l) {
      return p.cmp(l) < 0 ? p : l;
    }, s.prototype._init = function(p, l, a) {
      if (typeof p == "number")
        return this._initNumber(p, l, a);
      if (typeof p == "object")
        return this._initArray(p, l, a);
      l === "hex" && (l = 16), i(l === (l | 0) && l >= 2 && l <= 36), p = p.toString().replace(/\s+/g, "");
      var c = 0;
      p[0] === "-" && (c++, this.negative = 1), c < p.length && (l === 16 ? this._parseHex(p, c, a) : (this._parseBase(p, l, c), a === "le" && this._initArray(this.toArray(), l, a)));
    }, s.prototype._initNumber = function(p, l, a) {
      p < 0 && (this.negative = 1, p = -p), p < 67108864 ? (this.words = [p & 67108863], this.length = 1) : p < 4503599627370496 ? (this.words = [
        p & 67108863,
        p / 67108864 & 67108863
      ], this.length = 2) : (i(p < 9007199254740992), this.words = [
        p & 67108863,
        p / 67108864 & 67108863,
        1
      ], this.length = 3), a === "le" && this._initArray(this.toArray(), l, a);
    }, s.prototype._initArray = function(p, l, a) {
      if (i(typeof p.length == "number"), p.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(p.length / 3), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var b, E, S = 0;
      if (a === "be")
        for (c = p.length - 1, b = 0; c >= 0; c -= 3)
          E = p[c] | p[c - 1] << 8 | p[c - 2] << 16, this.words[b] |= E << S & 67108863, this.words[b + 1] = E >>> 26 - S & 67108863, S += 24, S >= 26 && (S -= 26, b++);
      else if (a === "le")
        for (c = 0, b = 0; c < p.length; c += 3)
          E = p[c] | p[c + 1] << 8 | p[c + 2] << 16, this.words[b] |= E << S & 67108863, this.words[b + 1] = E >>> 26 - S & 67108863, S += 24, S >= 26 && (S -= 26, b++);
      return this.strip();
    };
    function f(O, p) {
      var l = O.charCodeAt(p);
      return l >= 65 && l <= 70 ? l - 55 : l >= 97 && l <= 102 ? l - 87 : l - 48 & 15;
    }
    function h(O, p, l) {
      var a = f(O, l);
      return l - 1 >= p && (a |= f(O, l - 1) << 4), a;
    }
    s.prototype._parseHex = function(p, l, a) {
      this.length = Math.ceil((p.length - l) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var b = 0, E = 0, S;
      if (a === "be")
        for (c = p.length - 1; c >= l; c -= 2)
          S = h(p, l, c) << b, this.words[E] |= S & 67108863, b >= 18 ? (b -= 18, E += 1, this.words[E] |= S >>> 26) : b += 8;
      else {
        var x = p.length - l;
        for (c = x % 2 === 0 ? l + 1 : l; c < p.length; c += 2)
          S = h(p, l, c) << b, this.words[E] |= S & 67108863, b >= 18 ? (b -= 18, E += 1, this.words[E] |= S >>> 26) : b += 8;
      }
      this.strip();
    };
    function d(O, p, l, a) {
      for (var c = 0, b = Math.min(O.length, l), E = p; E < b; E++) {
        var S = O.charCodeAt(E) - 48;
        c *= a, S >= 49 ? c += S - 49 + 10 : S >= 17 ? c += S - 17 + 10 : c += S;
      }
      return c;
    }
    s.prototype._parseBase = function(p, l, a) {
      this.words = [0], this.length = 1;
      for (var c = 0, b = 1; b <= 67108863; b *= l)
        c++;
      c--, b = b / l | 0;
      for (var E = p.length - a, S = E % c, x = Math.min(E, E - S) + a, u = 0, m = a; m < x; m += c)
        u = d(p, m, m + c, l), this.imuln(b), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (S !== 0) {
        var g = 1;
        for (u = d(p, m, p.length, l), m = 0; m < S; m++)
          g *= l;
        this.imuln(g), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this.strip();
    }, s.prototype.copy = function(p) {
      p.words = new Array(this.length);
      for (var l = 0; l < this.length; l++)
        p.words[l] = this.words[l];
      p.length = this.length, p.negative = this.negative, p.red = this.red;
    }, s.prototype.clone = function() {
      var p = new s(null);
      return this.copy(p), p;
    }, s.prototype._expand = function(p) {
      for (; this.length < p; )
        this.words[this.length++] = 0;
      return this;
    }, s.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, s.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, s.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var v = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], w = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], A = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    s.prototype.toString = function(p, l) {
      p = p || 10, l = l | 0 || 1;
      var a;
      if (p === 16 || p === "hex") {
        a = "";
        for (var c = 0, b = 0, E = 0; E < this.length; E++) {
          var S = this.words[E], x = ((S << c | b) & 16777215).toString(16);
          b = S >>> 24 - c & 16777215, c += 2, c >= 26 && (c -= 26, E--), b !== 0 || E !== this.length - 1 ? a = v[6 - x.length] + x + a : a = x + a;
        }
        for (b !== 0 && (a = b.toString(16) + a); a.length % l !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      if (p === (p | 0) && p >= 2 && p <= 36) {
        var u = w[p], m = A[p];
        a = "";
        var g = this.clone();
        for (g.negative = 0; !g.isZero(); ) {
          var P = g.modn(m).toString(p);
          g = g.idivn(m), g.isZero() ? a = P + a : a = v[u - P.length] + P + a;
        }
        for (this.isZero() && (a = "0" + a); a.length % l !== 0; )
          a = "0" + a;
        return this.negative !== 0 && (a = "-" + a), a;
      }
      i(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var p = this.words[0];
      return this.length === 2 ? p += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? p += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -p : p;
    }, s.prototype.toJSON = function() {
      return this.toString(16);
    }, s.prototype.toBuffer = function(p, l) {
      return i(typeof o < "u"), this.toArrayLike(o, p, l);
    }, s.prototype.toArray = function(p, l) {
      return this.toArrayLike(Array, p, l);
    }, s.prototype.toArrayLike = function(p, l, a) {
      var c = this.byteLength(), b = a || Math.max(1, c);
      i(c <= b, "byte array longer than desired length"), i(b > 0, "Requested array length <= 0"), this.strip();
      var E = l === "le", S = new p(b), x, u, m = this.clone();
      if (E) {
        for (u = 0; !m.isZero(); u++)
          x = m.andln(255), m.iushrn(8), S[u] = x;
        for (; u < b; u++)
          S[u] = 0;
      } else {
        for (u = 0; u < b - c; u++)
          S[u] = 0;
        for (u = 0; !m.isZero(); u++)
          x = m.andln(255), m.iushrn(8), S[b - u - 1] = x;
      }
      return S;
    }, Math.clz32 ? s.prototype._countBits = function(p) {
      return 32 - Math.clz32(p);
    } : s.prototype._countBits = function(p) {
      var l = p, a = 0;
      return l >= 4096 && (a += 13, l >>>= 13), l >= 64 && (a += 7, l >>>= 7), l >= 8 && (a += 4, l >>>= 4), l >= 2 && (a += 2, l >>>= 2), a + l;
    }, s.prototype._zeroBits = function(p) {
      if (p === 0)
        return 26;
      var l = p, a = 0;
      return l & 8191 || (a += 13, l >>>= 13), l & 127 || (a += 7, l >>>= 7), l & 15 || (a += 4, l >>>= 4), l & 3 || (a += 2, l >>>= 2), l & 1 || a++, a;
    }, s.prototype.bitLength = function() {
      var p = this.words[this.length - 1], l = this._countBits(p);
      return (this.length - 1) * 26 + l;
    };
    function I(O) {
      for (var p = new Array(O.bitLength()), l = 0; l < p.length; l++) {
        var a = l / 26 | 0, c = l % 26;
        p[l] = (O.words[a] & 1 << c) >>> c;
      }
      return p;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var p = 0, l = 0; l < this.length; l++) {
        var a = this._zeroBits(this.words[l]);
        if (p += a, a !== 26)
          break;
      }
      return p;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(p) {
      return this.negative !== 0 ? this.abs().inotn(p).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(p) {
      return this.testn(p - 1) ? this.notn(p).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(p) {
      for (; this.length < p.length; )
        this.words[this.length++] = 0;
      for (var l = 0; l < p.length; l++)
        this.words[l] = this.words[l] | p.words[l];
      return this.strip();
    }, s.prototype.ior = function(p) {
      return i((this.negative | p.negative) === 0), this.iuor(p);
    }, s.prototype.or = function(p) {
      return this.length > p.length ? this.clone().ior(p) : p.clone().ior(this);
    }, s.prototype.uor = function(p) {
      return this.length > p.length ? this.clone().iuor(p) : p.clone().iuor(this);
    }, s.prototype.iuand = function(p) {
      var l;
      this.length > p.length ? l = p : l = this;
      for (var a = 0; a < l.length; a++)
        this.words[a] = this.words[a] & p.words[a];
      return this.length = l.length, this.strip();
    }, s.prototype.iand = function(p) {
      return i((this.negative | p.negative) === 0), this.iuand(p);
    }, s.prototype.and = function(p) {
      return this.length > p.length ? this.clone().iand(p) : p.clone().iand(this);
    }, s.prototype.uand = function(p) {
      return this.length > p.length ? this.clone().iuand(p) : p.clone().iuand(this);
    }, s.prototype.iuxor = function(p) {
      var l, a;
      this.length > p.length ? (l = this, a = p) : (l = p, a = this);
      for (var c = 0; c < a.length; c++)
        this.words[c] = l.words[c] ^ a.words[c];
      if (this !== l)
        for (; c < l.length; c++)
          this.words[c] = l.words[c];
      return this.length = l.length, this.strip();
    }, s.prototype.ixor = function(p) {
      return i((this.negative | p.negative) === 0), this.iuxor(p);
    }, s.prototype.xor = function(p) {
      return this.length > p.length ? this.clone().ixor(p) : p.clone().ixor(this);
    }, s.prototype.uxor = function(p) {
      return this.length > p.length ? this.clone().iuxor(p) : p.clone().iuxor(this);
    }, s.prototype.inotn = function(p) {
      i(typeof p == "number" && p >= 0);
      var l = Math.ceil(p / 26) | 0, a = p % 26;
      this._expand(l), a > 0 && l--;
      for (var c = 0; c < l; c++)
        this.words[c] = ~this.words[c] & 67108863;
      return a > 0 && (this.words[c] = ~this.words[c] & 67108863 >> 26 - a), this.strip();
    }, s.prototype.notn = function(p) {
      return this.clone().inotn(p);
    }, s.prototype.setn = function(p, l) {
      i(typeof p == "number" && p >= 0);
      var a = p / 26 | 0, c = p % 26;
      return this._expand(a + 1), l ? this.words[a] = this.words[a] | 1 << c : this.words[a] = this.words[a] & ~(1 << c), this.strip();
    }, s.prototype.iadd = function(p) {
      var l;
      if (this.negative !== 0 && p.negative === 0)
        return this.negative = 0, l = this.isub(p), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && p.negative !== 0)
        return p.negative = 0, l = this.isub(p), p.negative = 1, l._normSign();
      var a, c;
      this.length > p.length ? (a = this, c = p) : (a = p, c = this);
      for (var b = 0, E = 0; E < c.length; E++)
        l = (a.words[E] | 0) + (c.words[E] | 0) + b, this.words[E] = l & 67108863, b = l >>> 26;
      for (; b !== 0 && E < a.length; E++)
        l = (a.words[E] | 0) + b, this.words[E] = l & 67108863, b = l >>> 26;
      if (this.length = a.length, b !== 0)
        this.words[this.length] = b, this.length++;
      else if (a !== this)
        for (; E < a.length; E++)
          this.words[E] = a.words[E];
      return this;
    }, s.prototype.add = function(p) {
      var l;
      return p.negative !== 0 && this.negative === 0 ? (p.negative = 0, l = this.sub(p), p.negative ^= 1, l) : p.negative === 0 && this.negative !== 0 ? (this.negative = 0, l = p.sub(this), this.negative = 1, l) : this.length > p.length ? this.clone().iadd(p) : p.clone().iadd(this);
    }, s.prototype.isub = function(p) {
      if (p.negative !== 0) {
        p.negative = 0;
        var l = this.iadd(p);
        return p.negative = 1, l._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(p), this.negative = 1, this._normSign();
      var a = this.cmp(p);
      if (a === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var c, b;
      a > 0 ? (c = this, b = p) : (c = p, b = this);
      for (var E = 0, S = 0; S < b.length; S++)
        l = (c.words[S] | 0) - (b.words[S] | 0) + E, E = l >> 26, this.words[S] = l & 67108863;
      for (; E !== 0 && S < c.length; S++)
        l = (c.words[S] | 0) + E, E = l >> 26, this.words[S] = l & 67108863;
      if (E === 0 && S < c.length && c !== this)
        for (; S < c.length; S++)
          this.words[S] = c.words[S];
      return this.length = Math.max(this.length, S), c !== this && (this.negative = 1), this.strip();
    }, s.prototype.sub = function(p) {
      return this.clone().isub(p);
    };
    function D(O, p, l) {
      l.negative = p.negative ^ O.negative;
      var a = O.length + p.length | 0;
      l.length = a, a = a - 1 | 0;
      var c = O.words[0] | 0, b = p.words[0] | 0, E = c * b, S = E & 67108863, x = E / 67108864 | 0;
      l.words[0] = S;
      for (var u = 1; u < a; u++) {
        for (var m = x >>> 26, g = x & 67108863, P = Math.min(u, p.length - 1), G = Math.max(0, u - O.length + 1); G <= P; G++) {
          var M = u - G | 0;
          c = O.words[M] | 0, b = p.words[G] | 0, E = c * b + g, m += E / 67108864 | 0, g = E & 67108863;
        }
        l.words[u] = g | 0, x = m | 0;
      }
      return x !== 0 ? l.words[u] = x | 0 : l.length--, l.strip();
    }
    var N = function(p, l, a) {
      var c = p.words, b = l.words, E = a.words, S = 0, x, u, m, g = c[0] | 0, P = g & 8191, G = g >>> 13, M = c[1] | 0, H = M & 8191, C = M >>> 13, q = c[2] | 0, L = q & 8191, y = q >>> 13, F = c[3] | 0, W = F & 8191, Y = F >>> 13, X = c[4] | 0, ee = X & 8191, we = X >>> 13, Me = c[5] | 0, he = Me & 8191, Re = Me >>> 13, xe = c[6] | 0, se = xe & 8191, ge = xe >>> 13, le = c[7] | 0, ne = le & 8191, ue = le >>> 13, fe = c[8] | 0, te = fe & 8191, pe = fe >>> 13, _e = c[9] | 0, re = _e & 8191, Ee = _e >>> 13, Se = b[0] | 0, oe = Se & 8191, De = Se >>> 13, Ie = b[1] | 0, Pe = Ie & 8191, Ge = Ie >>> 13, Ye = b[2] | 0, Ae = Ye & 8191, Ze = Ye >>> 13, et = b[3] | 0, Ne = et & 8191, Ce = et >>> 13, Te = b[4] | 0, de = Te & 8191, $e = Te >>> 13, Le = b[5] | 0, ce = Le & 8191, Ue = Le >>> 13, ze = b[6] | 0, ye = ze & 8191, Be = ze >>> 13, ke = b[7] | 0, ve = ke & 8191, Fe = ke >>> 13, Oe = b[8] | 0, me = Oe & 8191, je = Oe >>> 13, rt = b[9] | 0, qe = rt & 8191, it = rt >>> 13;
      a.negative = p.negative ^ l.negative, a.length = 19, x = Math.imul(P, oe), u = Math.imul(P, De), u = u + Math.imul(G, oe) | 0, m = Math.imul(G, De);
      var Je = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, x = Math.imul(H, oe), u = Math.imul(H, De), u = u + Math.imul(C, oe) | 0, m = Math.imul(C, De), x = x + Math.imul(P, Pe) | 0, u = u + Math.imul(P, Ge) | 0, u = u + Math.imul(G, Pe) | 0, m = m + Math.imul(G, Ge) | 0;
      var tt = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (tt >>> 26) | 0, tt &= 67108863, x = Math.imul(L, oe), u = Math.imul(L, De), u = u + Math.imul(y, oe) | 0, m = Math.imul(y, De), x = x + Math.imul(H, Pe) | 0, u = u + Math.imul(H, Ge) | 0, u = u + Math.imul(C, Pe) | 0, m = m + Math.imul(C, Ge) | 0, x = x + Math.imul(P, Ae) | 0, u = u + Math.imul(P, Ze) | 0, u = u + Math.imul(G, Ae) | 0, m = m + Math.imul(G, Ze) | 0;
      var jt = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, x = Math.imul(W, oe), u = Math.imul(W, De), u = u + Math.imul(Y, oe) | 0, m = Math.imul(Y, De), x = x + Math.imul(L, Pe) | 0, u = u + Math.imul(L, Ge) | 0, u = u + Math.imul(y, Pe) | 0, m = m + Math.imul(y, Ge) | 0, x = x + Math.imul(H, Ae) | 0, u = u + Math.imul(H, Ze) | 0, u = u + Math.imul(C, Ae) | 0, m = m + Math.imul(C, Ze) | 0, x = x + Math.imul(P, Ne) | 0, u = u + Math.imul(P, Ce) | 0, u = u + Math.imul(G, Ne) | 0, m = m + Math.imul(G, Ce) | 0;
      var Kt = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, x = Math.imul(ee, oe), u = Math.imul(ee, De), u = u + Math.imul(we, oe) | 0, m = Math.imul(we, De), x = x + Math.imul(W, Pe) | 0, u = u + Math.imul(W, Ge) | 0, u = u + Math.imul(Y, Pe) | 0, m = m + Math.imul(Y, Ge) | 0, x = x + Math.imul(L, Ae) | 0, u = u + Math.imul(L, Ze) | 0, u = u + Math.imul(y, Ae) | 0, m = m + Math.imul(y, Ze) | 0, x = x + Math.imul(H, Ne) | 0, u = u + Math.imul(H, Ce) | 0, u = u + Math.imul(C, Ne) | 0, m = m + Math.imul(C, Ce) | 0, x = x + Math.imul(P, de) | 0, u = u + Math.imul(P, $e) | 0, u = u + Math.imul(G, de) | 0, m = m + Math.imul(G, $e) | 0;
      var Ht = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, x = Math.imul(he, oe), u = Math.imul(he, De), u = u + Math.imul(Re, oe) | 0, m = Math.imul(Re, De), x = x + Math.imul(ee, Pe) | 0, u = u + Math.imul(ee, Ge) | 0, u = u + Math.imul(we, Pe) | 0, m = m + Math.imul(we, Ge) | 0, x = x + Math.imul(W, Ae) | 0, u = u + Math.imul(W, Ze) | 0, u = u + Math.imul(Y, Ae) | 0, m = m + Math.imul(Y, Ze) | 0, x = x + Math.imul(L, Ne) | 0, u = u + Math.imul(L, Ce) | 0, u = u + Math.imul(y, Ne) | 0, m = m + Math.imul(y, Ce) | 0, x = x + Math.imul(H, de) | 0, u = u + Math.imul(H, $e) | 0, u = u + Math.imul(C, de) | 0, m = m + Math.imul(C, $e) | 0, x = x + Math.imul(P, ce) | 0, u = u + Math.imul(P, Ue) | 0, u = u + Math.imul(G, ce) | 0, m = m + Math.imul(G, Ue) | 0;
      var Vt = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, x = Math.imul(se, oe), u = Math.imul(se, De), u = u + Math.imul(ge, oe) | 0, m = Math.imul(ge, De), x = x + Math.imul(he, Pe) | 0, u = u + Math.imul(he, Ge) | 0, u = u + Math.imul(Re, Pe) | 0, m = m + Math.imul(Re, Ge) | 0, x = x + Math.imul(ee, Ae) | 0, u = u + Math.imul(ee, Ze) | 0, u = u + Math.imul(we, Ae) | 0, m = m + Math.imul(we, Ze) | 0, x = x + Math.imul(W, Ne) | 0, u = u + Math.imul(W, Ce) | 0, u = u + Math.imul(Y, Ne) | 0, m = m + Math.imul(Y, Ce) | 0, x = x + Math.imul(L, de) | 0, u = u + Math.imul(L, $e) | 0, u = u + Math.imul(y, de) | 0, m = m + Math.imul(y, $e) | 0, x = x + Math.imul(H, ce) | 0, u = u + Math.imul(H, Ue) | 0, u = u + Math.imul(C, ce) | 0, m = m + Math.imul(C, Ue) | 0, x = x + Math.imul(P, ye) | 0, u = u + Math.imul(P, Be) | 0, u = u + Math.imul(G, ye) | 0, m = m + Math.imul(G, Be) | 0;
      var gt = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, x = Math.imul(ne, oe), u = Math.imul(ne, De), u = u + Math.imul(ue, oe) | 0, m = Math.imul(ue, De), x = x + Math.imul(se, Pe) | 0, u = u + Math.imul(se, Ge) | 0, u = u + Math.imul(ge, Pe) | 0, m = m + Math.imul(ge, Ge) | 0, x = x + Math.imul(he, Ae) | 0, u = u + Math.imul(he, Ze) | 0, u = u + Math.imul(Re, Ae) | 0, m = m + Math.imul(Re, Ze) | 0, x = x + Math.imul(ee, Ne) | 0, u = u + Math.imul(ee, Ce) | 0, u = u + Math.imul(we, Ne) | 0, m = m + Math.imul(we, Ce) | 0, x = x + Math.imul(W, de) | 0, u = u + Math.imul(W, $e) | 0, u = u + Math.imul(Y, de) | 0, m = m + Math.imul(Y, $e) | 0, x = x + Math.imul(L, ce) | 0, u = u + Math.imul(L, Ue) | 0, u = u + Math.imul(y, ce) | 0, m = m + Math.imul(y, Ue) | 0, x = x + Math.imul(H, ye) | 0, u = u + Math.imul(H, Be) | 0, u = u + Math.imul(C, ye) | 0, m = m + Math.imul(C, Be) | 0, x = x + Math.imul(P, ve) | 0, u = u + Math.imul(P, Fe) | 0, u = u + Math.imul(G, ve) | 0, m = m + Math.imul(G, Fe) | 0;
      var Vr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Vr >>> 26) | 0, Vr &= 67108863, x = Math.imul(te, oe), u = Math.imul(te, De), u = u + Math.imul(pe, oe) | 0, m = Math.imul(pe, De), x = x + Math.imul(ne, Pe) | 0, u = u + Math.imul(ne, Ge) | 0, u = u + Math.imul(ue, Pe) | 0, m = m + Math.imul(ue, Ge) | 0, x = x + Math.imul(se, Ae) | 0, u = u + Math.imul(se, Ze) | 0, u = u + Math.imul(ge, Ae) | 0, m = m + Math.imul(ge, Ze) | 0, x = x + Math.imul(he, Ne) | 0, u = u + Math.imul(he, Ce) | 0, u = u + Math.imul(Re, Ne) | 0, m = m + Math.imul(Re, Ce) | 0, x = x + Math.imul(ee, de) | 0, u = u + Math.imul(ee, $e) | 0, u = u + Math.imul(we, de) | 0, m = m + Math.imul(we, $e) | 0, x = x + Math.imul(W, ce) | 0, u = u + Math.imul(W, Ue) | 0, u = u + Math.imul(Y, ce) | 0, m = m + Math.imul(Y, Ue) | 0, x = x + Math.imul(L, ye) | 0, u = u + Math.imul(L, Be) | 0, u = u + Math.imul(y, ye) | 0, m = m + Math.imul(y, Be) | 0, x = x + Math.imul(H, ve) | 0, u = u + Math.imul(H, Fe) | 0, u = u + Math.imul(C, ve) | 0, m = m + Math.imul(C, Fe) | 0, x = x + Math.imul(P, me) | 0, u = u + Math.imul(P, je) | 0, u = u + Math.imul(G, me) | 0, m = m + Math.imul(G, je) | 0;
      var Wr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Wr >>> 26) | 0, Wr &= 67108863, x = Math.imul(re, oe), u = Math.imul(re, De), u = u + Math.imul(Ee, oe) | 0, m = Math.imul(Ee, De), x = x + Math.imul(te, Pe) | 0, u = u + Math.imul(te, Ge) | 0, u = u + Math.imul(pe, Pe) | 0, m = m + Math.imul(pe, Ge) | 0, x = x + Math.imul(ne, Ae) | 0, u = u + Math.imul(ne, Ze) | 0, u = u + Math.imul(ue, Ae) | 0, m = m + Math.imul(ue, Ze) | 0, x = x + Math.imul(se, Ne) | 0, u = u + Math.imul(se, Ce) | 0, u = u + Math.imul(ge, Ne) | 0, m = m + Math.imul(ge, Ce) | 0, x = x + Math.imul(he, de) | 0, u = u + Math.imul(he, $e) | 0, u = u + Math.imul(Re, de) | 0, m = m + Math.imul(Re, $e) | 0, x = x + Math.imul(ee, ce) | 0, u = u + Math.imul(ee, Ue) | 0, u = u + Math.imul(we, ce) | 0, m = m + Math.imul(we, Ue) | 0, x = x + Math.imul(W, ye) | 0, u = u + Math.imul(W, Be) | 0, u = u + Math.imul(Y, ye) | 0, m = m + Math.imul(Y, Be) | 0, x = x + Math.imul(L, ve) | 0, u = u + Math.imul(L, Fe) | 0, u = u + Math.imul(y, ve) | 0, m = m + Math.imul(y, Fe) | 0, x = x + Math.imul(H, me) | 0, u = u + Math.imul(H, je) | 0, u = u + Math.imul(C, me) | 0, m = m + Math.imul(C, je) | 0, x = x + Math.imul(P, qe) | 0, u = u + Math.imul(P, it) | 0, u = u + Math.imul(G, qe) | 0, m = m + Math.imul(G, it) | 0;
      var Gr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Gr >>> 26) | 0, Gr &= 67108863, x = Math.imul(re, Pe), u = Math.imul(re, Ge), u = u + Math.imul(Ee, Pe) | 0, m = Math.imul(Ee, Ge), x = x + Math.imul(te, Ae) | 0, u = u + Math.imul(te, Ze) | 0, u = u + Math.imul(pe, Ae) | 0, m = m + Math.imul(pe, Ze) | 0, x = x + Math.imul(ne, Ne) | 0, u = u + Math.imul(ne, Ce) | 0, u = u + Math.imul(ue, Ne) | 0, m = m + Math.imul(ue, Ce) | 0, x = x + Math.imul(se, de) | 0, u = u + Math.imul(se, $e) | 0, u = u + Math.imul(ge, de) | 0, m = m + Math.imul(ge, $e) | 0, x = x + Math.imul(he, ce) | 0, u = u + Math.imul(he, Ue) | 0, u = u + Math.imul(Re, ce) | 0, m = m + Math.imul(Re, Ue) | 0, x = x + Math.imul(ee, ye) | 0, u = u + Math.imul(ee, Be) | 0, u = u + Math.imul(we, ye) | 0, m = m + Math.imul(we, Be) | 0, x = x + Math.imul(W, ve) | 0, u = u + Math.imul(W, Fe) | 0, u = u + Math.imul(Y, ve) | 0, m = m + Math.imul(Y, Fe) | 0, x = x + Math.imul(L, me) | 0, u = u + Math.imul(L, je) | 0, u = u + Math.imul(y, me) | 0, m = m + Math.imul(y, je) | 0, x = x + Math.imul(H, qe) | 0, u = u + Math.imul(H, it) | 0, u = u + Math.imul(C, qe) | 0, m = m + Math.imul(C, it) | 0;
      var Jr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Jr >>> 26) | 0, Jr &= 67108863, x = Math.imul(re, Ae), u = Math.imul(re, Ze), u = u + Math.imul(Ee, Ae) | 0, m = Math.imul(Ee, Ze), x = x + Math.imul(te, Ne) | 0, u = u + Math.imul(te, Ce) | 0, u = u + Math.imul(pe, Ne) | 0, m = m + Math.imul(pe, Ce) | 0, x = x + Math.imul(ne, de) | 0, u = u + Math.imul(ne, $e) | 0, u = u + Math.imul(ue, de) | 0, m = m + Math.imul(ue, $e) | 0, x = x + Math.imul(se, ce) | 0, u = u + Math.imul(se, Ue) | 0, u = u + Math.imul(ge, ce) | 0, m = m + Math.imul(ge, Ue) | 0, x = x + Math.imul(he, ye) | 0, u = u + Math.imul(he, Be) | 0, u = u + Math.imul(Re, ye) | 0, m = m + Math.imul(Re, Be) | 0, x = x + Math.imul(ee, ve) | 0, u = u + Math.imul(ee, Fe) | 0, u = u + Math.imul(we, ve) | 0, m = m + Math.imul(we, Fe) | 0, x = x + Math.imul(W, me) | 0, u = u + Math.imul(W, je) | 0, u = u + Math.imul(Y, me) | 0, m = m + Math.imul(Y, je) | 0, x = x + Math.imul(L, qe) | 0, u = u + Math.imul(L, it) | 0, u = u + Math.imul(y, qe) | 0, m = m + Math.imul(y, it) | 0;
      var Yr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Yr >>> 26) | 0, Yr &= 67108863, x = Math.imul(re, Ne), u = Math.imul(re, Ce), u = u + Math.imul(Ee, Ne) | 0, m = Math.imul(Ee, Ce), x = x + Math.imul(te, de) | 0, u = u + Math.imul(te, $e) | 0, u = u + Math.imul(pe, de) | 0, m = m + Math.imul(pe, $e) | 0, x = x + Math.imul(ne, ce) | 0, u = u + Math.imul(ne, Ue) | 0, u = u + Math.imul(ue, ce) | 0, m = m + Math.imul(ue, Ue) | 0, x = x + Math.imul(se, ye) | 0, u = u + Math.imul(se, Be) | 0, u = u + Math.imul(ge, ye) | 0, m = m + Math.imul(ge, Be) | 0, x = x + Math.imul(he, ve) | 0, u = u + Math.imul(he, Fe) | 0, u = u + Math.imul(Re, ve) | 0, m = m + Math.imul(Re, Fe) | 0, x = x + Math.imul(ee, me) | 0, u = u + Math.imul(ee, je) | 0, u = u + Math.imul(we, me) | 0, m = m + Math.imul(we, je) | 0, x = x + Math.imul(W, qe) | 0, u = u + Math.imul(W, it) | 0, u = u + Math.imul(Y, qe) | 0, m = m + Math.imul(Y, it) | 0;
      var or = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, x = Math.imul(re, de), u = Math.imul(re, $e), u = u + Math.imul(Ee, de) | 0, m = Math.imul(Ee, $e), x = x + Math.imul(te, ce) | 0, u = u + Math.imul(te, Ue) | 0, u = u + Math.imul(pe, ce) | 0, m = m + Math.imul(pe, Ue) | 0, x = x + Math.imul(ne, ye) | 0, u = u + Math.imul(ne, Be) | 0, u = u + Math.imul(ue, ye) | 0, m = m + Math.imul(ue, Be) | 0, x = x + Math.imul(se, ve) | 0, u = u + Math.imul(se, Fe) | 0, u = u + Math.imul(ge, ve) | 0, m = m + Math.imul(ge, Fe) | 0, x = x + Math.imul(he, me) | 0, u = u + Math.imul(he, je) | 0, u = u + Math.imul(Re, me) | 0, m = m + Math.imul(Re, je) | 0, x = x + Math.imul(ee, qe) | 0, u = u + Math.imul(ee, it) | 0, u = u + Math.imul(we, qe) | 0, m = m + Math.imul(we, it) | 0;
      var Xr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Xr >>> 26) | 0, Xr &= 67108863, x = Math.imul(re, ce), u = Math.imul(re, Ue), u = u + Math.imul(Ee, ce) | 0, m = Math.imul(Ee, Ue), x = x + Math.imul(te, ye) | 0, u = u + Math.imul(te, Be) | 0, u = u + Math.imul(pe, ye) | 0, m = m + Math.imul(pe, Be) | 0, x = x + Math.imul(ne, ve) | 0, u = u + Math.imul(ne, Fe) | 0, u = u + Math.imul(ue, ve) | 0, m = m + Math.imul(ue, Fe) | 0, x = x + Math.imul(se, me) | 0, u = u + Math.imul(se, je) | 0, u = u + Math.imul(ge, me) | 0, m = m + Math.imul(ge, je) | 0, x = x + Math.imul(he, qe) | 0, u = u + Math.imul(he, it) | 0, u = u + Math.imul(Re, qe) | 0, m = m + Math.imul(Re, it) | 0;
      var Zr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Zr >>> 26) | 0, Zr &= 67108863, x = Math.imul(re, ye), u = Math.imul(re, Be), u = u + Math.imul(Ee, ye) | 0, m = Math.imul(Ee, Be), x = x + Math.imul(te, ve) | 0, u = u + Math.imul(te, Fe) | 0, u = u + Math.imul(pe, ve) | 0, m = m + Math.imul(pe, Fe) | 0, x = x + Math.imul(ne, me) | 0, u = u + Math.imul(ne, je) | 0, u = u + Math.imul(ue, me) | 0, m = m + Math.imul(ue, je) | 0, x = x + Math.imul(se, qe) | 0, u = u + Math.imul(se, it) | 0, u = u + Math.imul(ge, qe) | 0, m = m + Math.imul(ge, it) | 0;
      var $t = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, x = Math.imul(re, ve), u = Math.imul(re, Fe), u = u + Math.imul(Ee, ve) | 0, m = Math.imul(Ee, Fe), x = x + Math.imul(te, me) | 0, u = u + Math.imul(te, je) | 0, u = u + Math.imul(pe, me) | 0, m = m + Math.imul(pe, je) | 0, x = x + Math.imul(ne, qe) | 0, u = u + Math.imul(ne, it) | 0, u = u + Math.imul(ue, qe) | 0, m = m + Math.imul(ue, it) | 0;
      var Qr = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (Qr >>> 26) | 0, Qr &= 67108863, x = Math.imul(re, me), u = Math.imul(re, je), u = u + Math.imul(Ee, me) | 0, m = Math.imul(Ee, je), x = x + Math.imul(te, qe) | 0, u = u + Math.imul(te, it) | 0, u = u + Math.imul(pe, qe) | 0, m = m + Math.imul(pe, it) | 0;
      var ei = (S + x | 0) + ((u & 8191) << 13) | 0;
      S = (m + (u >>> 13) | 0) + (ei >>> 26) | 0, ei &= 67108863, x = Math.imul(re, qe), u = Math.imul(re, it), u = u + Math.imul(Ee, qe) | 0, m = Math.imul(Ee, it);
      var ti = (S + x | 0) + ((u & 8191) << 13) | 0;
      return S = (m + (u >>> 13) | 0) + (ti >>> 26) | 0, ti &= 67108863, E[0] = Je, E[1] = tt, E[2] = jt, E[3] = Kt, E[4] = Ht, E[5] = Vt, E[6] = gt, E[7] = Vr, E[8] = Wr, E[9] = Gr, E[10] = Jr, E[11] = Yr, E[12] = or, E[13] = Xr, E[14] = Zr, E[15] = $t, E[16] = Qr, E[17] = ei, E[18] = ti, S !== 0 && (E[19] = S, a.length++), a;
    };
    Math.imul || (N = D);
    function k(O, p, l) {
      l.negative = p.negative ^ O.negative, l.length = O.length + p.length;
      for (var a = 0, c = 0, b = 0; b < l.length - 1; b++) {
        var E = c;
        c = 0;
        for (var S = a & 67108863, x = Math.min(b, p.length - 1), u = Math.max(0, b - O.length + 1); u <= x; u++) {
          var m = b - u, g = O.words[m] | 0, P = p.words[u] | 0, G = g * P, M = G & 67108863;
          E = E + (G / 67108864 | 0) | 0, M = M + S | 0, S = M & 67108863, E = E + (M >>> 26) | 0, c += E >>> 26, E &= 67108863;
        }
        l.words[b] = S, a = E, E = c;
      }
      return a !== 0 ? l.words[b] = a : l.length--, l.strip();
    }
    function j(O, p, l) {
      var a = new T();
      return a.mulp(O, p, l);
    }
    s.prototype.mulTo = function(p, l) {
      var a, c = this.length + p.length;
      return this.length === 10 && p.length === 10 ? a = N(this, p, l) : c < 63 ? a = D(this, p, l) : c < 1024 ? a = k(this, p, l) : a = j(this, p, l), a;
    };
    function T(O, p) {
      this.x = O, this.y = p;
    }
    T.prototype.makeRBT = function(p) {
      for (var l = new Array(p), a = s.prototype._countBits(p) - 1, c = 0; c < p; c++)
        l[c] = this.revBin(c, a, p);
      return l;
    }, T.prototype.revBin = function(p, l, a) {
      if (p === 0 || p === a - 1)
        return p;
      for (var c = 0, b = 0; b < l; b++)
        c |= (p & 1) << l - b - 1, p >>= 1;
      return c;
    }, T.prototype.permute = function(p, l, a, c, b, E) {
      for (var S = 0; S < E; S++)
        c[S] = l[p[S]], b[S] = a[p[S]];
    }, T.prototype.transform = function(p, l, a, c, b, E) {
      this.permute(E, p, l, a, c, b);
      for (var S = 1; S < b; S <<= 1)
        for (var x = S << 1, u = Math.cos(2 * Math.PI / x), m = Math.sin(2 * Math.PI / x), g = 0; g < b; g += x)
          for (var P = u, G = m, M = 0; M < S; M++) {
            var H = a[g + M], C = c[g + M], q = a[g + M + S], L = c[g + M + S], y = P * q - G * L;
            L = P * L + G * q, q = y, a[g + M] = H + q, c[g + M] = C + L, a[g + M + S] = H - q, c[g + M + S] = C - L, M !== x && (y = u * P - m * G, G = u * G + m * P, P = y);
          }
    }, T.prototype.guessLen13b = function(p, l) {
      var a = Math.max(l, p) | 1, c = a & 1, b = 0;
      for (a = a / 2 | 0; a; a = a >>> 1)
        b++;
      return 1 << b + 1 + c;
    }, T.prototype.conjugate = function(p, l, a) {
      if (!(a <= 1))
        for (var c = 0; c < a / 2; c++) {
          var b = p[c];
          p[c] = p[a - c - 1], p[a - c - 1] = b, b = l[c], l[c] = -l[a - c - 1], l[a - c - 1] = -b;
        }
    }, T.prototype.normalize13b = function(p, l) {
      for (var a = 0, c = 0; c < l / 2; c++) {
        var b = Math.round(p[2 * c + 1] / l) * 8192 + Math.round(p[2 * c] / l) + a;
        p[c] = b & 67108863, b < 67108864 ? a = 0 : a = b / 67108864 | 0;
      }
      return p;
    }, T.prototype.convert13b = function(p, l, a, c) {
      for (var b = 0, E = 0; E < l; E++)
        b = b + (p[E] | 0), a[2 * E] = b & 8191, b = b >>> 13, a[2 * E + 1] = b & 8191, b = b >>> 13;
      for (E = 2 * l; E < c; ++E)
        a[E] = 0;
      i(b === 0), i((b & -8192) === 0);
    }, T.prototype.stub = function(p) {
      for (var l = new Array(p), a = 0; a < p; a++)
        l[a] = 0;
      return l;
    }, T.prototype.mulp = function(p, l, a) {
      var c = 2 * this.guessLen13b(p.length, l.length), b = this.makeRBT(c), E = this.stub(c), S = new Array(c), x = new Array(c), u = new Array(c), m = new Array(c), g = new Array(c), P = new Array(c), G = a.words;
      G.length = c, this.convert13b(p.words, p.length, S, c), this.convert13b(l.words, l.length, m, c), this.transform(S, E, x, u, c, b), this.transform(m, E, g, P, c, b);
      for (var M = 0; M < c; M++) {
        var H = x[M] * g[M] - u[M] * P[M];
        u[M] = x[M] * P[M] + u[M] * g[M], x[M] = H;
      }
      return this.conjugate(x, u, c), this.transform(x, u, G, E, c, b), this.conjugate(G, E, c), this.normalize13b(G, c), a.negative = p.negative ^ l.negative, a.length = p.length + l.length, a.strip();
    }, s.prototype.mul = function(p) {
      var l = new s(null);
      return l.words = new Array(this.length + p.length), this.mulTo(p, l);
    }, s.prototype.mulf = function(p) {
      var l = new s(null);
      return l.words = new Array(this.length + p.length), j(this, p, l);
    }, s.prototype.imul = function(p) {
      return this.clone().mulTo(p, this);
    }, s.prototype.imuln = function(p) {
      i(typeof p == "number"), i(p < 67108864);
      for (var l = 0, a = 0; a < this.length; a++) {
        var c = (this.words[a] | 0) * p, b = (c & 67108863) + (l & 67108863);
        l >>= 26, l += c / 67108864 | 0, l += b >>> 26, this.words[a] = b & 67108863;
      }
      return l !== 0 && (this.words[a] = l, this.length++), this;
    }, s.prototype.muln = function(p) {
      return this.clone().imuln(p);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(p) {
      var l = I(p);
      if (l.length === 0)
        return new s(1);
      for (var a = this, c = 0; c < l.length && l[c] === 0; c++, a = a.sqr())
        ;
      if (++c < l.length)
        for (var b = a.sqr(); c < l.length; c++, b = b.sqr())
          l[c] !== 0 && (a = a.mul(b));
      return a;
    }, s.prototype.iushln = function(p) {
      i(typeof p == "number" && p >= 0);
      var l = p % 26, a = (p - l) / 26, c = 67108863 >>> 26 - l << 26 - l, b;
      if (l !== 0) {
        var E = 0;
        for (b = 0; b < this.length; b++) {
          var S = this.words[b] & c, x = (this.words[b] | 0) - S << l;
          this.words[b] = x | E, E = S >>> 26 - l;
        }
        E && (this.words[b] = E, this.length++);
      }
      if (a !== 0) {
        for (b = this.length - 1; b >= 0; b--)
          this.words[b + a] = this.words[b];
        for (b = 0; b < a; b++)
          this.words[b] = 0;
        this.length += a;
      }
      return this.strip();
    }, s.prototype.ishln = function(p) {
      return i(this.negative === 0), this.iushln(p);
    }, s.prototype.iushrn = function(p, l, a) {
      i(typeof p == "number" && p >= 0);
      var c;
      l ? c = (l - l % 26) / 26 : c = 0;
      var b = p % 26, E = Math.min((p - b) / 26, this.length), S = 67108863 ^ 67108863 >>> b << b, x = a;
      if (c -= E, c = Math.max(0, c), x) {
        for (var u = 0; u < E; u++)
          x.words[u] = this.words[u];
        x.length = E;
      }
      if (E !== 0)
        if (this.length > E)
          for (this.length -= E, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + E];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (u = this.length - 1; u >= 0 && (m !== 0 || u >= c); u--) {
        var g = this.words[u] | 0;
        this.words[u] = m << 26 - b | g >>> b, m = g & S;
      }
      return x && m !== 0 && (x.words[x.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, s.prototype.ishrn = function(p, l, a) {
      return i(this.negative === 0), this.iushrn(p, l, a);
    }, s.prototype.shln = function(p) {
      return this.clone().ishln(p);
    }, s.prototype.ushln = function(p) {
      return this.clone().iushln(p);
    }, s.prototype.shrn = function(p) {
      return this.clone().ishrn(p);
    }, s.prototype.ushrn = function(p) {
      return this.clone().iushrn(p);
    }, s.prototype.testn = function(p) {
      i(typeof p == "number" && p >= 0);
      var l = p % 26, a = (p - l) / 26, c = 1 << l;
      if (this.length <= a)
        return !1;
      var b = this.words[a];
      return !!(b & c);
    }, s.prototype.imaskn = function(p) {
      i(typeof p == "number" && p >= 0);
      var l = p % 26, a = (p - l) / 26;
      if (i(this.negative === 0, "imaskn works only with positive numbers"), this.length <= a)
        return this;
      if (l !== 0 && a++, this.length = Math.min(a, this.length), l !== 0) {
        var c = 67108863 ^ 67108863 >>> l << l;
        this.words[this.length - 1] &= c;
      }
      return this.strip();
    }, s.prototype.maskn = function(p) {
      return this.clone().imaskn(p);
    }, s.prototype.iaddn = function(p) {
      return i(typeof p == "number"), i(p < 67108864), p < 0 ? this.isubn(-p) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < p ? (this.words[0] = p - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(p), this.negative = 1, this) : this._iaddn(p);
    }, s.prototype._iaddn = function(p) {
      this.words[0] += p;
      for (var l = 0; l < this.length && this.words[l] >= 67108864; l++)
        this.words[l] -= 67108864, l === this.length - 1 ? this.words[l + 1] = 1 : this.words[l + 1]++;
      return this.length = Math.max(this.length, l + 1), this;
    }, s.prototype.isubn = function(p) {
      if (i(typeof p == "number"), i(p < 67108864), p < 0)
        return this.iaddn(-p);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(p), this.negative = 1, this;
      if (this.words[0] -= p, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var l = 0; l < this.length && this.words[l] < 0; l++)
          this.words[l] += 67108864, this.words[l + 1] -= 1;
      return this.strip();
    }, s.prototype.addn = function(p) {
      return this.clone().iaddn(p);
    }, s.prototype.subn = function(p) {
      return this.clone().isubn(p);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(p, l, a) {
      var c = p.length + a, b;
      this._expand(c);
      var E, S = 0;
      for (b = 0; b < p.length; b++) {
        E = (this.words[b + a] | 0) + S;
        var x = (p.words[b] | 0) * l;
        E -= x & 67108863, S = (E >> 26) - (x / 67108864 | 0), this.words[b + a] = E & 67108863;
      }
      for (; b < this.length - a; b++)
        E = (this.words[b + a] | 0) + S, S = E >> 26, this.words[b + a] = E & 67108863;
      if (S === 0)
        return this.strip();
      for (i(S === -1), S = 0, b = 0; b < this.length; b++)
        E = -(this.words[b] | 0) + S, S = E >> 26, this.words[b] = E & 67108863;
      return this.negative = 1, this.strip();
    }, s.prototype._wordDiv = function(p, l) {
      var a = this.length - p.length, c = this.clone(), b = p, E = b.words[b.length - 1] | 0, S = this._countBits(E);
      a = 26 - S, a !== 0 && (b = b.ushln(a), c.iushln(a), E = b.words[b.length - 1] | 0);
      var x = c.length - b.length, u;
      if (l !== "mod") {
        u = new s(null), u.length = x + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var g = c.clone()._ishlnsubmul(b, 1, x);
      g.negative === 0 && (c = g, u && (u.words[x] = 1));
      for (var P = x - 1; P >= 0; P--) {
        var G = (c.words[b.length + P] | 0) * 67108864 + (c.words[b.length + P - 1] | 0);
        for (G = Math.min(G / E | 0, 67108863), c._ishlnsubmul(b, G, P); c.negative !== 0; )
          G--, c.negative = 0, c._ishlnsubmul(b, 1, P), c.isZero() || (c.negative ^= 1);
        u && (u.words[P] = G);
      }
      return u && u.strip(), c.strip(), l !== "div" && a !== 0 && c.iushrn(a), {
        div: u || null,
        mod: c
      };
    }, s.prototype.divmod = function(p, l, a) {
      if (i(!p.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var c, b, E;
      return this.negative !== 0 && p.negative === 0 ? (E = this.neg().divmod(p, l), l !== "mod" && (c = E.div.neg()), l !== "div" && (b = E.mod.neg(), a && b.negative !== 0 && b.iadd(p)), {
        div: c,
        mod: b
      }) : this.negative === 0 && p.negative !== 0 ? (E = this.divmod(p.neg(), l), l !== "mod" && (c = E.div.neg()), {
        div: c,
        mod: E.mod
      }) : this.negative & p.negative ? (E = this.neg().divmod(p.neg(), l), l !== "div" && (b = E.mod.neg(), a && b.negative !== 0 && b.isub(p)), {
        div: E.div,
        mod: b
      }) : p.length > this.length || this.cmp(p) < 0 ? {
        div: new s(0),
        mod: this
      } : p.length === 1 ? l === "div" ? {
        div: this.divn(p.words[0]),
        mod: null
      } : l === "mod" ? {
        div: null,
        mod: new s(this.modn(p.words[0]))
      } : {
        div: this.divn(p.words[0]),
        mod: new s(this.modn(p.words[0]))
      } : this._wordDiv(p, l);
    }, s.prototype.div = function(p) {
      return this.divmod(p, "div", !1).div;
    }, s.prototype.mod = function(p) {
      return this.divmod(p, "mod", !1).mod;
    }, s.prototype.umod = function(p) {
      return this.divmod(p, "mod", !0).mod;
    }, s.prototype.divRound = function(p) {
      var l = this.divmod(p);
      if (l.mod.isZero())
        return l.div;
      var a = l.div.negative !== 0 ? l.mod.isub(p) : l.mod, c = p.ushrn(1), b = p.andln(1), E = a.cmp(c);
      return E < 0 || b === 1 && E === 0 ? l.div : l.div.negative !== 0 ? l.div.isubn(1) : l.div.iaddn(1);
    }, s.prototype.modn = function(p) {
      i(p <= 67108863);
      for (var l = (1 << 26) % p, a = 0, c = this.length - 1; c >= 0; c--)
        a = (l * a + (this.words[c] | 0)) % p;
      return a;
    }, s.prototype.idivn = function(p) {
      i(p <= 67108863);
      for (var l = 0, a = this.length - 1; a >= 0; a--) {
        var c = (this.words[a] | 0) + l * 67108864;
        this.words[a] = c / p | 0, l = c % p;
      }
      return this.strip();
    }, s.prototype.divn = function(p) {
      return this.clone().idivn(p);
    }, s.prototype.egcd = function(p) {
      i(p.negative === 0), i(!p.isZero());
      var l = this, a = p.clone();
      l.negative !== 0 ? l = l.umod(p) : l = l.clone();
      for (var c = new s(1), b = new s(0), E = new s(0), S = new s(1), x = 0; l.isEven() && a.isEven(); )
        l.iushrn(1), a.iushrn(1), ++x;
      for (var u = a.clone(), m = l.clone(); !l.isZero(); ) {
        for (var g = 0, P = 1; !(l.words[0] & P) && g < 26; ++g, P <<= 1)
          ;
        if (g > 0)
          for (l.iushrn(g); g-- > 0; )
            (c.isOdd() || b.isOdd()) && (c.iadd(u), b.isub(m)), c.iushrn(1), b.iushrn(1);
        for (var G = 0, M = 1; !(a.words[0] & M) && G < 26; ++G, M <<= 1)
          ;
        if (G > 0)
          for (a.iushrn(G); G-- > 0; )
            (E.isOdd() || S.isOdd()) && (E.iadd(u), S.isub(m)), E.iushrn(1), S.iushrn(1);
        l.cmp(a) >= 0 ? (l.isub(a), c.isub(E), b.isub(S)) : (a.isub(l), E.isub(c), S.isub(b));
      }
      return {
        a: E,
        b: S,
        gcd: a.iushln(x)
      };
    }, s.prototype._invmp = function(p) {
      i(p.negative === 0), i(!p.isZero());
      var l = this, a = p.clone();
      l.negative !== 0 ? l = l.umod(p) : l = l.clone();
      for (var c = new s(1), b = new s(0), E = a.clone(); l.cmpn(1) > 0 && a.cmpn(1) > 0; ) {
        for (var S = 0, x = 1; !(l.words[0] & x) && S < 26; ++S, x <<= 1)
          ;
        if (S > 0)
          for (l.iushrn(S); S-- > 0; )
            c.isOdd() && c.iadd(E), c.iushrn(1);
        for (var u = 0, m = 1; !(a.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (a.iushrn(u); u-- > 0; )
            b.isOdd() && b.iadd(E), b.iushrn(1);
        l.cmp(a) >= 0 ? (l.isub(a), c.isub(b)) : (a.isub(l), b.isub(c));
      }
      var g;
      return l.cmpn(1) === 0 ? g = c : g = b, g.cmpn(0) < 0 && g.iadd(p), g;
    }, s.prototype.gcd = function(p) {
      if (this.isZero())
        return p.abs();
      if (p.isZero())
        return this.abs();
      var l = this.clone(), a = p.clone();
      l.negative = 0, a.negative = 0;
      for (var c = 0; l.isEven() && a.isEven(); c++)
        l.iushrn(1), a.iushrn(1);
      do {
        for (; l.isEven(); )
          l.iushrn(1);
        for (; a.isEven(); )
          a.iushrn(1);
        var b = l.cmp(a);
        if (b < 0) {
          var E = l;
          l = a, a = E;
        } else if (b === 0 || a.cmpn(1) === 0)
          break;
        l.isub(a);
      } while (!0);
      return a.iushln(c);
    }, s.prototype.invm = function(p) {
      return this.egcd(p).a.umod(p);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(p) {
      return this.words[0] & p;
    }, s.prototype.bincn = function(p) {
      i(typeof p == "number");
      var l = p % 26, a = (p - l) / 26, c = 1 << l;
      if (this.length <= a)
        return this._expand(a + 1), this.words[a] |= c, this;
      for (var b = c, E = a; b !== 0 && E < this.length; E++) {
        var S = this.words[E] | 0;
        S += b, b = S >>> 26, S &= 67108863, this.words[E] = S;
      }
      return b !== 0 && (this.words[E] = b, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(p) {
      var l = p < 0;
      if (this.negative !== 0 && !l)
        return -1;
      if (this.negative === 0 && l)
        return 1;
      this.strip();
      var a;
      if (this.length > 1)
        a = 1;
      else {
        l && (p = -p), i(p <= 67108863, "Number is too big");
        var c = this.words[0] | 0;
        a = c === p ? 0 : c < p ? -1 : 1;
      }
      return this.negative !== 0 ? -a | 0 : a;
    }, s.prototype.cmp = function(p) {
      if (this.negative !== 0 && p.negative === 0)
        return -1;
      if (this.negative === 0 && p.negative !== 0)
        return 1;
      var l = this.ucmp(p);
      return this.negative !== 0 ? -l | 0 : l;
    }, s.prototype.ucmp = function(p) {
      if (this.length > p.length)
        return 1;
      if (this.length < p.length)
        return -1;
      for (var l = 0, a = this.length - 1; a >= 0; a--) {
        var c = this.words[a] | 0, b = p.words[a] | 0;
        if (c !== b) {
          c < b ? l = -1 : c > b && (l = 1);
          break;
        }
      }
      return l;
    }, s.prototype.gtn = function(p) {
      return this.cmpn(p) === 1;
    }, s.prototype.gt = function(p) {
      return this.cmp(p) === 1;
    }, s.prototype.gten = function(p) {
      return this.cmpn(p) >= 0;
    }, s.prototype.gte = function(p) {
      return this.cmp(p) >= 0;
    }, s.prototype.ltn = function(p) {
      return this.cmpn(p) === -1;
    }, s.prototype.lt = function(p) {
      return this.cmp(p) === -1;
    }, s.prototype.lten = function(p) {
      return this.cmpn(p) <= 0;
    }, s.prototype.lte = function(p) {
      return this.cmp(p) <= 0;
    }, s.prototype.eqn = function(p) {
      return this.cmpn(p) === 0;
    }, s.prototype.eq = function(p) {
      return this.cmp(p) === 0;
    }, s.red = function(p) {
      return new J(p);
    }, s.prototype.toRed = function(p) {
      return i(!this.red, "Already a number in reduction context"), i(this.negative === 0, "red works only with positives"), p.convertTo(this)._forceRed(p);
    }, s.prototype.fromRed = function() {
      return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(p) {
      return this.red = p, this;
    }, s.prototype.forceRed = function(p) {
      return i(!this.red, "Already a number in reduction context"), this._forceRed(p);
    }, s.prototype.redAdd = function(p) {
      return i(this.red, "redAdd works only with red numbers"), this.red.add(this, p);
    }, s.prototype.redIAdd = function(p) {
      return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, p);
    }, s.prototype.redSub = function(p) {
      return i(this.red, "redSub works only with red numbers"), this.red.sub(this, p);
    }, s.prototype.redISub = function(p) {
      return i(this.red, "redISub works only with red numbers"), this.red.isub(this, p);
    }, s.prototype.redShl = function(p) {
      return i(this.red, "redShl works only with red numbers"), this.red.shl(this, p);
    }, s.prototype.redMul = function(p) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, p), this.red.mul(this, p);
    }, s.prototype.redIMul = function(p) {
      return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, p), this.red.imul(this, p);
    }, s.prototype.redSqr = function() {
      return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(p) {
      return i(this.red && !p.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, p);
    };
    var K = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function $(O, p) {
      this.name = O, this.p = new s(p, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    $.prototype._tmp = function() {
      var p = new s(null);
      return p.words = new Array(Math.ceil(this.n / 13)), p;
    }, $.prototype.ireduce = function(p) {
      var l = p, a;
      do
        this.split(l, this.tmp), l = this.imulK(l), l = l.iadd(this.tmp), a = l.bitLength();
      while (a > this.n);
      var c = a < this.n ? -1 : l.ucmp(this.p);
      return c === 0 ? (l.words[0] = 0, l.length = 1) : c > 0 ? l.isub(this.p) : l.strip !== void 0 ? l.strip() : l._strip(), l;
    }, $.prototype.split = function(p, l) {
      p.iushrn(this.n, 0, l);
    }, $.prototype.imulK = function(p) {
      return p.imul(this.k);
    };
    function z() {
      $.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    n(z, $), z.prototype.split = function(p, l) {
      for (var a = 4194303, c = Math.min(p.length, 9), b = 0; b < c; b++)
        l.words[b] = p.words[b];
      if (l.length = c, p.length <= 9) {
        p.words[0] = 0, p.length = 1;
        return;
      }
      var E = p.words[9];
      for (l.words[l.length++] = E & a, b = 10; b < p.length; b++) {
        var S = p.words[b] | 0;
        p.words[b - 10] = (S & a) << 4 | E >>> 22, E = S;
      }
      E >>>= 22, p.words[b - 10] = E, E === 0 && p.length > 10 ? p.length -= 10 : p.length -= 9;
    }, z.prototype.imulK = function(p) {
      p.words[p.length] = 0, p.words[p.length + 1] = 0, p.length += 2;
      for (var l = 0, a = 0; a < p.length; a++) {
        var c = p.words[a] | 0;
        l += c * 977, p.words[a] = l & 67108863, l = c * 64 + (l / 67108864 | 0);
      }
      return p.words[p.length - 1] === 0 && (p.length--, p.words[p.length - 1] === 0 && p.length--), p;
    };
    function B() {
      $.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    n(B, $);
    function _() {
      $.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    n(_, $);
    function R() {
      $.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    n(R, $), R.prototype.imulK = function(p) {
      for (var l = 0, a = 0; a < p.length; a++) {
        var c = (p.words[a] | 0) * 19 + l, b = c & 67108863;
        c >>>= 26, p.words[a] = b, l = c;
      }
      return l !== 0 && (p.words[p.length++] = l), p;
    }, s._prime = function(p) {
      if (K[p])
        return K[p];
      var l;
      if (p === "k256")
        l = new z();
      else if (p === "p224")
        l = new B();
      else if (p === "p192")
        l = new _();
      else if (p === "p25519")
        l = new R();
      else
        throw new Error("Unknown prime " + p);
      return K[p] = l, l;
    };
    function J(O) {
      if (typeof O == "string") {
        var p = s._prime(O);
        this.m = p.p, this.prime = p;
      } else
        i(O.gtn(1), "modulus must be greater than 1"), this.m = O, this.prime = null;
    }
    J.prototype._verify1 = function(p) {
      i(p.negative === 0, "red works only with positives"), i(p.red, "red works only with red numbers");
    }, J.prototype._verify2 = function(p, l) {
      i((p.negative | l.negative) === 0, "red works only with positives"), i(
        p.red && p.red === l.red,
        "red works only with red numbers"
      );
    }, J.prototype.imod = function(p) {
      return this.prime ? this.prime.ireduce(p)._forceRed(this) : p.umod(this.m)._forceRed(this);
    }, J.prototype.neg = function(p) {
      return p.isZero() ? p.clone() : this.m.sub(p)._forceRed(this);
    }, J.prototype.add = function(p, l) {
      this._verify2(p, l);
      var a = p.add(l);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a._forceRed(this);
    }, J.prototype.iadd = function(p, l) {
      this._verify2(p, l);
      var a = p.iadd(l);
      return a.cmp(this.m) >= 0 && a.isub(this.m), a;
    }, J.prototype.sub = function(p, l) {
      this._verify2(p, l);
      var a = p.sub(l);
      return a.cmpn(0) < 0 && a.iadd(this.m), a._forceRed(this);
    }, J.prototype.isub = function(p, l) {
      this._verify2(p, l);
      var a = p.isub(l);
      return a.cmpn(0) < 0 && a.iadd(this.m), a;
    }, J.prototype.shl = function(p, l) {
      return this._verify1(p), this.imod(p.ushln(l));
    }, J.prototype.imul = function(p, l) {
      return this._verify2(p, l), this.imod(p.imul(l));
    }, J.prototype.mul = function(p, l) {
      return this._verify2(p, l), this.imod(p.mul(l));
    }, J.prototype.isqr = function(p) {
      return this.imul(p, p.clone());
    }, J.prototype.sqr = function(p) {
      return this.mul(p, p);
    }, J.prototype.sqrt = function(p) {
      if (p.isZero())
        return p.clone();
      var l = this.m.andln(3);
      if (i(l % 2 === 1), l === 3) {
        var a = this.m.add(new s(1)).iushrn(2);
        return this.pow(p, a);
      }
      for (var c = this.m.subn(1), b = 0; !c.isZero() && c.andln(1) === 0; )
        b++, c.iushrn(1);
      i(!c.isZero());
      var E = new s(1).toRed(this), S = E.redNeg(), x = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new s(2 * u * u).toRed(this); this.pow(u, x).cmp(S) !== 0; )
        u.redIAdd(S);
      for (var m = this.pow(u, c), g = this.pow(p, c.addn(1).iushrn(1)), P = this.pow(p, c), G = b; P.cmp(E) !== 0; ) {
        for (var M = P, H = 0; M.cmp(E) !== 0; H++)
          M = M.redSqr();
        i(H < G);
        var C = this.pow(m, new s(1).iushln(G - H - 1));
        g = g.redMul(C), m = C.redSqr(), P = P.redMul(m), G = H;
      }
      return g;
    }, J.prototype.invm = function(p) {
      var l = p._invmp(this.m);
      return l.negative !== 0 ? (l.negative = 0, this.imod(l).redNeg()) : this.imod(l);
    }, J.prototype.pow = function(p, l) {
      if (l.isZero())
        return new s(1).toRed(this);
      if (l.cmpn(1) === 0)
        return p.clone();
      var a = 4, c = new Array(1 << a);
      c[0] = new s(1).toRed(this), c[1] = p;
      for (var b = 2; b < c.length; b++)
        c[b] = this.mul(c[b - 1], p);
      var E = c[0], S = 0, x = 0, u = l.bitLength() % 26;
      for (u === 0 && (u = 26), b = l.length - 1; b >= 0; b--) {
        for (var m = l.words[b], g = u - 1; g >= 0; g--) {
          var P = m >> g & 1;
          if (E !== c[0] && (E = this.sqr(E)), P === 0 && S === 0) {
            x = 0;
            continue;
          }
          S <<= 1, S |= P, x++, !(x !== a && (b !== 0 || g !== 0)) && (E = this.mul(E, c[S]), x = 0, S = 0);
        }
        u = 26;
      }
      return E;
    }, J.prototype.convertTo = function(p) {
      var l = p.umod(this.m);
      return l === p ? l.clone() : l;
    }, J.prototype.convertFrom = function(p) {
      var l = p.clone();
      return l.red = null, l;
    }, s.mont = function(p) {
      return new Q(p);
    };
    function Q(O) {
      J.call(this, O), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(Q, J), Q.prototype.convertTo = function(p) {
      return this.imod(p.ushln(this.shift));
    }, Q.prototype.convertFrom = function(p) {
      var l = this.imod(p.mul(this.rinv));
      return l.red = null, l;
    }, Q.prototype.imul = function(p, l) {
      if (p.isZero() || l.isZero())
        return p.words[0] = 0, p.length = 1, p;
      var a = p.imul(l), c = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = a.isub(c).iushrn(this.shift), E = b;
      return b.cmp(this.m) >= 0 ? E = b.isub(this.m) : b.cmpn(0) < 0 && (E = b.iadd(this.m)), E._forceRed(this);
    }, Q.prototype.mul = function(p, l) {
      if (p.isZero() || l.isZero())
        return new s(0)._forceRed(this);
      var a = p.mul(l), c = a.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = a.isub(c).iushrn(this.shift), E = b;
      return b.cmp(this.m) >= 0 ? E = b.isub(this.m) : b.cmpn(0) < 0 && (E = b.iadd(this.m)), E._forceRed(this);
    }, Q.prototype.invm = function(p) {
      var l = this.imod(p._invmp(this.m).mul(this.r2));
      return l._forceRed(this);
    };
  })(r, _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c);
})(Wo);
var li = Wo.exports, Go = {};
(function(r) {
  var e = r;
  function t(s, o) {
    if (Array.isArray(s))
      return s.slice();
    if (!s)
      return [];
    var f = [];
    if (typeof s != "string") {
      for (var h = 0; h < s.length; h++)
        f[h] = s[h] | 0;
      return f;
    }
    if (o === "hex") {
      s = s.replace(/[^a-z0-9]+/ig, ""), s.length % 2 !== 0 && (s = "0" + s);
      for (var h = 0; h < s.length; h += 2)
        f.push(parseInt(s[h] + s[h + 1], 16));
    } else
      for (var h = 0; h < s.length; h++) {
        var d = s.charCodeAt(h), v = d >> 8, w = d & 255;
        v ? f.push(v, w) : f.push(w);
      }
    return f;
  }
  e.toArray = t;
  function i(s) {
    return s.length === 1 ? "0" + s : s;
  }
  e.zero2 = i;
  function n(s) {
    for (var o = "", f = 0; f < s.length; f++)
      o += i(s[f].toString(16));
    return o;
  }
  e.toHex = n, e.encode = function(o, f) {
    return f === "hex" ? n(o) : o;
  };
})(Go);
(function(r) {
  var e = r, t = li, i = Yi, n = Go;
  e.assert = i, e.toArray = n.toArray, e.zero2 = n.zero2, e.toHex = n.toHex, e.encode = n.encode;
  function s(v, w, A) {
    var I = new Array(Math.max(v.bitLength(), A) + 1), D;
    for (D = 0; D < I.length; D += 1)
      I[D] = 0;
    var N = 1 << w + 1, k = v.clone();
    for (D = 0; D < I.length; D++) {
      var j, T = k.andln(N - 1);
      k.isOdd() ? (T > (N >> 1) - 1 ? j = (N >> 1) - T : j = T, k.isubn(j)) : j = 0, I[D] = j, k.iushrn(1);
    }
    return I;
  }
  e.getNAF = s;
  function o(v, w) {
    var A = [
      [],
      []
    ];
    v = v.clone(), w = w.clone();
    for (var I = 0, D = 0, N; v.cmpn(-I) > 0 || w.cmpn(-D) > 0; ) {
      var k = v.andln(3) + I & 3, j = w.andln(3) + D & 3;
      k === 3 && (k = -1), j === 3 && (j = -1);
      var T;
      k & 1 ? (N = v.andln(7) + I & 7, (N === 3 || N === 5) && j === 2 ? T = -k : T = k) : T = 0, A[0].push(T);
      var K;
      j & 1 ? (N = w.andln(7) + D & 7, (N === 3 || N === 5) && k === 2 ? K = -j : K = j) : K = 0, A[1].push(K), 2 * I === T + 1 && (I = 1 - I), 2 * D === K + 1 && (D = 1 - D), v.iushrn(1), w.iushrn(1);
    }
    return A;
  }
  e.getJSF = o;
  function f(v, w, A) {
    var I = "_" + w;
    v.prototype[w] = function() {
      return this[I] !== void 0 ? this[I] : this[I] = A.call(this);
    };
  }
  e.cachedProperty = f;
  function h(v) {
    return typeof v == "string" ? e.toArray(v, "hex") : v;
  }
  e.parseBytes = h;
  function d(v) {
    return new t(v, "hex", "le");
  }
  e.intFromLE = d;
})(ar);
var Jo = { exports: {} }, Ja;
Jo.exports = function(e) {
  return Ja || (Ja = new yi(null)), Ja.generate(e);
};
function yi(r) {
  this.rand = r;
}
Jo.exports.Rand = yi;
yi.prototype.generate = function(e) {
  return this._rand(e);
};
yi.prototype._rand = function(e) {
  if (this.rand.getBytes)
    return this.rand.getBytes(e);
  for (var t = new Uint8Array(e), i = 0; i < t.length; i++)
    t[i] = this.rand.getByte();
  return t;
};
if (typeof self == "object")
  self.crypto && self.crypto.getRandomValues ? yi.prototype._rand = function(e) {
    var t = new Uint8Array(e);
    return self.crypto.getRandomValues(t), t;
  } : self.msCrypto && self.msCrypto.getRandomValues ? yi.prototype._rand = function(e) {
    var t = new Uint8Array(e);
    return self.msCrypto.getRandomValues(t), t;
  } : typeof window == "object" && (yi.prototype._rand = function() {
    throw new Error("Not implemented yet");
  });
else
  try {
    var gc = fa;
    if (typeof gc.randomBytes != "function")
      throw new Error("Not supported");
    yi.prototype._rand = function(e) {
      return gc.randomBytes(e);
    };
  } catch {
  }
var Hu = Jo.exports, Yo = {}, Ni = li, os = ar, Hs = os.getNAF, u2 = os.getJSF, Vs = os.assert;
function Ii(r, e) {
  this.type = r, this.p = new Ni(e.p, 16), this.red = e.prime ? Ni.red(e.prime) : Ni.mont(this.p), this.zero = new Ni(0).toRed(this.red), this.one = new Ni(1).toRed(this.red), this.two = new Ni(2).toRed(this.red), this.n = e.n && new Ni(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var t = this.n && this.p.div(this.n);
  !t || t.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var ba = Ii;
Ii.prototype.point = function() {
  throw new Error("Not implemented");
};
Ii.prototype.validate = function() {
  throw new Error("Not implemented");
};
Ii.prototype._fixedNafMul = function(e, t) {
  Vs(e.precomputed);
  var i = e._getDoubles(), n = Hs(t, 1, this._bitLength), s = (1 << i.step + 1) - (i.step % 2 === 0 ? 2 : 1);
  s /= 3;
  var o = [], f, h;
  for (f = 0; f < n.length; f += i.step) {
    h = 0;
    for (var d = f + i.step - 1; d >= f; d--)
      h = (h << 1) + n[d];
    o.push(h);
  }
  for (var v = this.jpoint(null, null, null), w = this.jpoint(null, null, null), A = s; A > 0; A--) {
    for (f = 0; f < o.length; f++)
      h = o[f], h === A ? w = w.mixedAdd(i.points[f]) : h === -A && (w = w.mixedAdd(i.points[f].neg()));
    v = v.add(w);
  }
  return v.toP();
};
Ii.prototype._wnafMul = function(e, t) {
  var i = 4, n = e._getNAFPoints(i);
  i = n.wnd;
  for (var s = n.points, o = Hs(t, i, this._bitLength), f = this.jpoint(null, null, null), h = o.length - 1; h >= 0; h--) {
    for (var d = 0; h >= 0 && o[h] === 0; h--)
      d++;
    if (h >= 0 && d++, f = f.dblp(d), h < 0)
      break;
    var v = o[h];
    Vs(v !== 0), e.type === "affine" ? v > 0 ? f = f.mixedAdd(s[v - 1 >> 1]) : f = f.mixedAdd(s[-v - 1 >> 1].neg()) : v > 0 ? f = f.add(s[v - 1 >> 1]) : f = f.add(s[-v - 1 >> 1].neg());
  }
  return e.type === "affine" ? f.toP() : f;
};
Ii.prototype._wnafMulAdd = function(e, t, i, n, s) {
  var o = this._wnafT1, f = this._wnafT2, h = this._wnafT3, d = 0, v, w, A;
  for (v = 0; v < n; v++) {
    A = t[v];
    var I = A._getNAFPoints(e);
    o[v] = I.wnd, f[v] = I.points;
  }
  for (v = n - 1; v >= 1; v -= 2) {
    var D = v - 1, N = v;
    if (o[D] !== 1 || o[N] !== 1) {
      h[D] = Hs(i[D], o[D], this._bitLength), h[N] = Hs(i[N], o[N], this._bitLength), d = Math.max(h[D].length, d), d = Math.max(h[N].length, d);
      continue;
    }
    var k = [
      t[D],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      t[N]
      /* 7 */
    ];
    t[D].y.cmp(t[N].y) === 0 ? (k[1] = t[D].add(t[N]), k[2] = t[D].toJ().mixedAdd(t[N].neg())) : t[D].y.cmp(t[N].y.redNeg()) === 0 ? (k[1] = t[D].toJ().mixedAdd(t[N]), k[2] = t[D].add(t[N].neg())) : (k[1] = t[D].toJ().mixedAdd(t[N]), k[2] = t[D].toJ().mixedAdd(t[N].neg()));
    var j = [
      -3,
      /* -1 -1 */
      -1,
      /* -1 0 */
      -5,
      /* -1 1 */
      -7,
      /* 0 -1 */
      0,
      /* 0 0 */
      7,
      /* 0 1 */
      5,
      /* 1 -1 */
      1,
      /* 1 0 */
      3
      /* 1 1 */
    ], T = u2(i[D], i[N]);
    for (d = Math.max(T[0].length, d), h[D] = new Array(d), h[N] = new Array(d), w = 0; w < d; w++) {
      var K = T[0][w] | 0, $ = T[1][w] | 0;
      h[D][w] = j[(K + 1) * 3 + ($ + 1)], h[N][w] = 0, f[D] = k;
    }
  }
  var z = this.jpoint(null, null, null), B = this._wnafT4;
  for (v = d; v >= 0; v--) {
    for (var _ = 0; v >= 0; ) {
      var R = !0;
      for (w = 0; w < n; w++)
        B[w] = h[w][v] | 0, B[w] !== 0 && (R = !1);
      if (!R)
        break;
      _++, v--;
    }
    if (v >= 0 && _++, z = z.dblp(_), v < 0)
      break;
    for (w = 0; w < n; w++) {
      var J = B[w];
      J !== 0 && (J > 0 ? A = f[w][J - 1 >> 1] : J < 0 && (A = f[w][-J - 1 >> 1].neg()), A.type === "affine" ? z = z.mixedAdd(A) : z = z.add(A));
    }
  }
  for (v = 0; v < n; v++)
    f[v] = null;
  return s ? z : z.toP();
};
function gr(r, e) {
  this.curve = r, this.type = e, this.precomputed = null;
}
Ii.BasePoint = gr;
gr.prototype.eq = function() {
  throw new Error("Not implemented");
};
gr.prototype.validate = function() {
  return this.curve.validate(this);
};
Ii.prototype.decodePoint = function(e, t) {
  e = os.toArray(e, t);
  var i = this.p.byteLength();
  if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 === 2 * i) {
    e[0] === 6 ? Vs(e[e.length - 1] % 2 === 0) : e[0] === 7 && Vs(e[e.length - 1] % 2 === 1);
    var n = this.point(
      e.slice(1, 1 + i),
      e.slice(1 + i, 1 + 2 * i)
    );
    return n;
  } else if ((e[0] === 2 || e[0] === 3) && e.length - 1 === i)
    return this.pointFromX(e.slice(1, 1 + i), e[0] === 3);
  throw new Error("Unknown point format");
};
gr.prototype.encodeCompressed = function(e) {
  return this.encode(e, !0);
};
gr.prototype._encode = function(e) {
  var t = this.curve.p.byteLength(), i = this.getX().toArray("be", t);
  return e ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", t));
};
gr.prototype.encode = function(e, t) {
  return os.encode(this._encode(t), e);
};
gr.prototype.precompute = function(e) {
  if (this.precomputed)
    return this;
  var t = {
    doubles: null,
    naf: null,
    beta: null
  };
  return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this;
};
gr.prototype._hasDoubles = function(e) {
  if (!this.precomputed)
    return !1;
  var t = this.precomputed.doubles;
  return t ? t.points.length >= Math.ceil((e.bitLength() + 1) / t.step) : !1;
};
gr.prototype._getDoubles = function(e, t) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i = [this], n = this, s = 0; s < t; s += e) {
    for (var o = 0; o < e; o++)
      n = n.dbl();
    i.push(n);
  }
  return {
    step: e,
    points: i
  };
};
gr.prototype._getNAFPoints = function(e) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var t = [this], i = (1 << e) - 1, n = i === 1 ? null : this.dbl(), s = 1; s < i; s++)
    t[s] = t[s - 1].add(n);
  return {
    wnd: e,
    points: t
  };
};
gr.prototype._getBeta = function() {
  return null;
};
gr.prototype.dblp = function(e) {
  for (var t = this, i = 0; i < e; i++)
    t = t.dbl();
  return t;
};
var d2 = ar, pt = li, Xo = ua, En = ba, l2 = d2.assert;
function yr(r) {
  En.call(this, "short", r), this.a = new pt(r.a, 16).toRed(this.red), this.b = new pt(r.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(r), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Xo(yr, En);
var p2 = yr;
yr.prototype._getEndomorphism = function(e) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var t, i;
    if (e.beta)
      t = new pt(e.beta, 16).toRed(this.red);
    else {
      var n = this._getEndoRoots(this.p);
      t = n[0].cmp(n[1]) < 0 ? n[0] : n[1], t = t.toRed(this.red);
    }
    if (e.lambda)
      i = new pt(e.lambda, 16);
    else {
      var s = this._getEndoRoots(this.n);
      this.g.mul(s[0]).x.cmp(this.g.x.redMul(t)) === 0 ? i = s[0] : (i = s[1], l2(this.g.mul(i).x.cmp(this.g.x.redMul(t)) === 0));
    }
    var o;
    return e.basis ? o = e.basis.map(function(f) {
      return {
        a: new pt(f.a, 16),
        b: new pt(f.b, 16)
      };
    }) : o = this._getEndoBasis(i), {
      beta: t,
      lambda: i,
      basis: o
    };
  }
};
yr.prototype._getEndoRoots = function(e) {
  var t = e === this.p ? this.red : pt.mont(e), i = new pt(2).toRed(t).redInvm(), n = i.redNeg(), s = new pt(3).toRed(t).redNeg().redSqrt().redMul(i), o = n.redAdd(s).fromRed(), f = n.redSub(s).fromRed();
  return [o, f];
};
yr.prototype._getEndoBasis = function(e) {
  for (var t = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i = e, n = this.n.clone(), s = new pt(1), o = new pt(0), f = new pt(0), h = new pt(1), d, v, w, A, I, D, N, k = 0, j, T; i.cmpn(0) !== 0; ) {
    var K = n.div(i);
    j = n.sub(K.mul(i)), T = f.sub(K.mul(s));
    var $ = h.sub(K.mul(o));
    if (!w && j.cmp(t) < 0)
      d = N.neg(), v = s, w = j.neg(), A = T;
    else if (w && ++k === 2)
      break;
    N = j, n = i, i = j, f = s, s = T, h = o, o = $;
  }
  I = j.neg(), D = T;
  var z = w.sqr().add(A.sqr()), B = I.sqr().add(D.sqr());
  return B.cmp(z) >= 0 && (I = d, D = v), w.negative && (w = w.neg(), A = A.neg()), I.negative && (I = I.neg(), D = D.neg()), [
    { a: w, b: A },
    { a: I, b: D }
  ];
};
yr.prototype._endoSplit = function(e) {
  var t = this.endo.basis, i = t[0], n = t[1], s = n.b.mul(e).divRound(this.n), o = i.b.neg().mul(e).divRound(this.n), f = s.mul(i.a), h = o.mul(n.a), d = s.mul(i.b), v = o.mul(n.b), w = e.sub(f).sub(h), A = d.add(v).neg();
  return { k1: w, k2: A };
};
yr.prototype.pointFromX = function(e, t) {
  e = new pt(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), n = i.redSqrt();
  if (n.redSqr().redSub(i).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var s = n.fromRed().isOdd();
  return (t && !s || !t && s) && (n = n.redNeg()), this.point(e, n);
};
yr.prototype.validate = function(e) {
  if (e.inf)
    return !0;
  var t = e.x, i = e.y, n = this.a.redMul(t), s = t.redSqr().redMul(t).redIAdd(n).redIAdd(this.b);
  return i.redSqr().redISub(s).cmpn(0) === 0;
};
yr.prototype._endoWnafMulAdd = function(e, t, i) {
  for (var n = this._endoWnafT1, s = this._endoWnafT2, o = 0; o < e.length; o++) {
    var f = this._endoSplit(t[o]), h = e[o], d = h._getBeta();
    f.k1.negative && (f.k1.ineg(), h = h.neg(!0)), f.k2.negative && (f.k2.ineg(), d = d.neg(!0)), n[o * 2] = h, n[o * 2 + 1] = d, s[o * 2] = f.k1, s[o * 2 + 1] = f.k2;
  }
  for (var v = this._wnafMulAdd(1, n, s, o * 2, i), w = 0; w < o * 2; w++)
    n[w] = null, s[w] = null;
  return v;
};
function Pt(r, e, t, i) {
  En.BasePoint.call(this, r, "affine"), e === null && t === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new pt(e, 16), this.y = new pt(t, 16), i && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Xo(Pt, En.BasePoint);
yr.prototype.point = function(e, t, i) {
  return new Pt(this, e, t, i);
};
yr.prototype.pointFromJSON = function(e, t) {
  return Pt.fromJSON(this, e, t);
};
Pt.prototype._getBeta = function() {
  if (this.curve.endo) {
    var e = this.precomputed;
    if (e && e.beta)
      return e.beta;
    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (e) {
      var i = this.curve, n = function(s) {
        return i.point(s.x.redMul(i.endo.beta), s.y);
      };
      e.beta = t, t.precomputed = {
        beta: null,
        naf: e.naf && {
          wnd: e.naf.wnd,
          points: e.naf.points.map(n)
        },
        doubles: e.doubles && {
          step: e.doubles.step,
          points: e.doubles.points.map(n)
        }
      };
    }
    return t;
  }
};
Pt.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }] : [this.x, this.y];
};
Pt.fromJSON = function(e, t, i) {
  typeof t == "string" && (t = JSON.parse(t));
  var n = e.point(t[0], t[1], i);
  if (!t[2])
    return n;
  function s(f) {
    return e.point(f[0], f[1], i);
  }
  var o = t[2];
  return n.precomputed = {
    beta: null,
    doubles: o.doubles && {
      step: o.doubles.step,
      points: [n].concat(o.doubles.points.map(s))
    },
    naf: o.naf && {
      wnd: o.naf.wnd,
      points: [n].concat(o.naf.points.map(s))
    }
  }, n;
};
Pt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Pt.prototype.isInfinity = function() {
  return this.inf;
};
Pt.prototype.add = function(e) {
  if (this.inf)
    return e;
  if (e.inf)
    return this;
  if (this.eq(e))
    return this.dbl();
  if (this.neg().eq(e))
    return this.curve.point(null, null);
  if (this.x.cmp(e.x) === 0)
    return this.curve.point(null, null);
  var t = this.y.redSub(e.y);
  t.cmpn(0) !== 0 && (t = t.redMul(this.x.redSub(e.x).redInvm()));
  var i = t.redSqr().redISub(this.x).redISub(e.x), n = t.redMul(this.x.redSub(i)).redISub(this.y);
  return this.curve.point(i, n);
};
Pt.prototype.dbl = function() {
  if (this.inf)
    return this;
  var e = this.y.redAdd(this.y);
  if (e.cmpn(0) === 0)
    return this.curve.point(null, null);
  var t = this.curve.a, i = this.x.redSqr(), n = e.redInvm(), s = i.redAdd(i).redIAdd(i).redIAdd(t).redMul(n), o = s.redSqr().redISub(this.x.redAdd(this.x)), f = s.redMul(this.x.redSub(o)).redISub(this.y);
  return this.curve.point(o, f);
};
Pt.prototype.getX = function() {
  return this.x.fromRed();
};
Pt.prototype.getY = function() {
  return this.y.fromRed();
};
Pt.prototype.mul = function(e) {
  return e = new pt(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e);
};
Pt.prototype.mulAdd = function(e, t, i) {
  var n = [this, t], s = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s) : this.curve._wnafMulAdd(1, n, s, 2);
};
Pt.prototype.jmulAdd = function(e, t, i) {
  var n = [this, t], s = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(n, s, !0) : this.curve._wnafMulAdd(1, n, s, 2, !0);
};
Pt.prototype.eq = function(e) {
  return this === e || this.inf === e.inf && (this.inf || this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0);
};
Pt.prototype.neg = function(e) {
  if (this.inf)
    return this;
  var t = this.curve.point(this.x, this.y.redNeg());
  if (e && this.precomputed) {
    var i = this.precomputed, n = function(s) {
      return s.neg();
    };
    t.precomputed = {
      naf: i.naf && {
        wnd: i.naf.wnd,
        points: i.naf.points.map(n)
      },
      doubles: i.doubles && {
        step: i.doubles.step,
        points: i.doubles.points.map(n)
      }
    };
  }
  return t;
};
Pt.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var e = this.curve.jpoint(this.x, this.y, this.curve.one);
  return e;
};
function Tt(r, e, t, i) {
  En.BasePoint.call(this, r, "jacobian"), e === null && t === null && i === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new pt(0)) : (this.x = new pt(e, 16), this.y = new pt(t, 16), this.z = new pt(i, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Xo(Tt, En.BasePoint);
yr.prototype.jpoint = function(e, t, i) {
  return new Tt(this, e, t, i);
};
Tt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var e = this.z.redInvm(), t = e.redSqr(), i = this.x.redMul(t), n = this.y.redMul(t).redMul(e);
  return this.curve.point(i, n);
};
Tt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
Tt.prototype.add = function(e) {
  if (this.isInfinity())
    return e;
  if (e.isInfinity())
    return this;
  var t = e.z.redSqr(), i = this.z.redSqr(), n = this.x.redMul(t), s = e.x.redMul(i), o = this.y.redMul(t.redMul(e.z)), f = e.y.redMul(i.redMul(this.z)), h = n.redSub(s), d = o.redSub(f);
  if (h.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var v = h.redSqr(), w = v.redMul(h), A = n.redMul(v), I = d.redSqr().redIAdd(w).redISub(A).redISub(A), D = d.redMul(A.redISub(I)).redISub(o.redMul(w)), N = this.z.redMul(e.z).redMul(h);
  return this.curve.jpoint(I, D, N);
};
Tt.prototype.mixedAdd = function(e) {
  if (this.isInfinity())
    return e.toJ();
  if (e.isInfinity())
    return this;
  var t = this.z.redSqr(), i = this.x, n = e.x.redMul(t), s = this.y, o = e.y.redMul(t).redMul(this.z), f = i.redSub(n), h = s.redSub(o);
  if (f.cmpn(0) === 0)
    return h.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var d = f.redSqr(), v = d.redMul(f), w = i.redMul(d), A = h.redSqr().redIAdd(v).redISub(w).redISub(w), I = h.redMul(w.redISub(A)).redISub(s.redMul(v)), D = this.z.redMul(f);
  return this.curve.jpoint(A, I, D);
};
Tt.prototype.dblp = function(e) {
  if (e === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!e)
    return this.dbl();
  var t;
  if (this.curve.zeroA || this.curve.threeA) {
    var i = this;
    for (t = 0; t < e; t++)
      i = i.dbl();
    return i;
  }
  var n = this.curve.a, s = this.curve.tinv, o = this.x, f = this.y, h = this.z, d = h.redSqr().redSqr(), v = f.redAdd(f);
  for (t = 0; t < e; t++) {
    var w = o.redSqr(), A = v.redSqr(), I = A.redSqr(), D = w.redAdd(w).redIAdd(w).redIAdd(n.redMul(d)), N = o.redMul(A), k = D.redSqr().redISub(N.redAdd(N)), j = N.redISub(k), T = D.redMul(j);
    T = T.redIAdd(T).redISub(I);
    var K = v.redMul(h);
    t + 1 < e && (d = d.redMul(I)), o = k, h = K, v = T;
  }
  return this.curve.jpoint(o, v.redMul(s), h);
};
Tt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
Tt.prototype._zeroDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), f = this.x.redAdd(s).redSqr().redISub(n).redISub(o);
    f = f.redIAdd(f);
    var h = n.redAdd(n).redIAdd(n), d = h.redSqr().redISub(f).redISub(f), v = o.redIAdd(o);
    v = v.redIAdd(v), v = v.redIAdd(v), e = d, t = h.redMul(f.redISub(d)).redISub(v), i = this.y.redAdd(this.y);
  } else {
    var w = this.x.redSqr(), A = this.y.redSqr(), I = A.redSqr(), D = this.x.redAdd(A).redSqr().redISub(w).redISub(I);
    D = D.redIAdd(D);
    var N = w.redAdd(w).redIAdd(w), k = N.redSqr(), j = I.redIAdd(I);
    j = j.redIAdd(j), j = j.redIAdd(j), e = k.redISub(D).redISub(D), t = N.redMul(D.redISub(e)).redISub(j), i = this.y.redMul(this.z), i = i.redIAdd(i);
  }
  return this.curve.jpoint(e, t, i);
};
Tt.prototype._threeDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var n = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), f = this.x.redAdd(s).redSqr().redISub(n).redISub(o);
    f = f.redIAdd(f);
    var h = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a), d = h.redSqr().redISub(f).redISub(f);
    e = d;
    var v = o.redIAdd(o);
    v = v.redIAdd(v), v = v.redIAdd(v), t = h.redMul(f.redISub(d)).redISub(v), i = this.y.redAdd(this.y);
  } else {
    var w = this.z.redSqr(), A = this.y.redSqr(), I = this.x.redMul(A), D = this.x.redSub(w).redMul(this.x.redAdd(w));
    D = D.redAdd(D).redIAdd(D);
    var N = I.redIAdd(I);
    N = N.redIAdd(N);
    var k = N.redAdd(N);
    e = D.redSqr().redISub(k), i = this.y.redAdd(this.z).redSqr().redISub(A).redISub(w);
    var j = A.redSqr();
    j = j.redIAdd(j), j = j.redIAdd(j), j = j.redIAdd(j), t = D.redMul(N.redISub(e)).redISub(j);
  }
  return this.curve.jpoint(e, t, i);
};
Tt.prototype._dbl = function() {
  var e = this.curve.a, t = this.x, i = this.y, n = this.z, s = n.redSqr().redSqr(), o = t.redSqr(), f = i.redSqr(), h = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(s)), d = t.redAdd(t);
  d = d.redIAdd(d);
  var v = d.redMul(f), w = h.redSqr().redISub(v.redAdd(v)), A = v.redISub(w), I = f.redSqr();
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var D = h.redMul(A).redISub(I), N = i.redAdd(i).redMul(n);
  return this.curve.jpoint(w, D, N);
};
Tt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr(), n = t.redSqr(), s = e.redAdd(e).redIAdd(e), o = s.redSqr(), f = this.x.redAdd(t).redSqr().redISub(e).redISub(n);
  f = f.redIAdd(f), f = f.redAdd(f).redIAdd(f), f = f.redISub(o);
  var h = f.redSqr(), d = n.redIAdd(n);
  d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
  var v = s.redIAdd(f).redSqr().redISub(o).redISub(h).redISub(d), w = t.redMul(v);
  w = w.redIAdd(w), w = w.redIAdd(w);
  var A = this.x.redMul(h).redISub(w);
  A = A.redIAdd(A), A = A.redIAdd(A);
  var I = this.y.redMul(v.redMul(d.redISub(v)).redISub(f.redMul(h)));
  I = I.redIAdd(I), I = I.redIAdd(I), I = I.redIAdd(I);
  var D = this.z.redAdd(f).redSqr().redISub(i).redISub(h);
  return this.curve.jpoint(A, I, D);
};
Tt.prototype.mul = function(e, t) {
  return e = new pt(e, t), this.curve._wnafMul(this, e);
};
Tt.prototype.eq = function(e) {
  if (e.type === "affine")
    return this.eq(e.toJ());
  if (this === e)
    return !0;
  var t = this.z.redSqr(), i = e.z.redSqr();
  if (this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0) !== 0)
    return !1;
  var n = t.redMul(this.z), s = i.redMul(e.z);
  return this.y.redMul(s).redISub(e.y.redMul(n)).cmpn(0) === 0;
};
Tt.prototype.eqXToP = function(e) {
  var t = this.z.redSqr(), i = e.toRed(this.curve.red).redMul(t);
  if (this.x.cmp(i) === 0)
    return !0;
  for (var n = e.clone(), s = this.curve.redN.redMul(t); ; ) {
    if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0)
      return !1;
    if (i.redIAdd(s), this.x.cmp(i) === 0)
      return !0;
  }
};
Tt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
Tt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var on = li, Vu = ua, ga = ba, v2 = ar;
function Sn(r) {
  ga.call(this, "mont", r), this.a = new on(r.a, 16).toRed(this.red), this.b = new on(r.b, 16).toRed(this.red), this.i4 = new on(4).toRed(this.red).redInvm(), this.two = new on(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
Vu(Sn, ga);
var b2 = Sn;
Sn.prototype.validate = function(e) {
  var t = e.normalize().x, i = t.redSqr(), n = i.redMul(t).redAdd(i.redMul(this.a)).redAdd(t), s = n.redSqrt();
  return s.redSqr().cmp(n) === 0;
};
function At(r, e, t) {
  ga.BasePoint.call(this, r, "projective"), e === null && t === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new on(e, 16), this.z = new on(t, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
}
Vu(At, ga.BasePoint);
Sn.prototype.decodePoint = function(e, t) {
  return this.point(v2.toArray(e, t), 1);
};
Sn.prototype.point = function(e, t) {
  return new At(this, e, t);
};
Sn.prototype.pointFromJSON = function(e) {
  return At.fromJSON(this, e);
};
At.prototype.precompute = function() {
};
At.prototype._encode = function() {
  return this.getX().toArray("be", this.curve.p.byteLength());
};
At.fromJSON = function(e, t) {
  return new At(e, t[0], t[1] || e.one);
};
At.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
At.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
At.prototype.dbl = function() {
  var e = this.x.redAdd(this.z), t = e.redSqr(), i = this.x.redSub(this.z), n = i.redSqr(), s = t.redSub(n), o = t.redMul(n), f = s.redMul(n.redAdd(this.curve.a24.redMul(s)));
  return this.curve.point(o, f);
};
At.prototype.add = function() {
  throw new Error("Not supported on Montgomery curve");
};
At.prototype.diffAdd = function(e, t) {
  var i = this.x.redAdd(this.z), n = this.x.redSub(this.z), s = e.x.redAdd(e.z), o = e.x.redSub(e.z), f = o.redMul(i), h = s.redMul(n), d = t.z.redMul(f.redAdd(h).redSqr()), v = t.x.redMul(f.redISub(h).redSqr());
  return this.curve.point(d, v);
};
At.prototype.mul = function(e) {
  for (var t = e.clone(), i = this, n = this.curve.point(null, null), s = this, o = []; t.cmpn(0) !== 0; t.iushrn(1))
    o.push(t.andln(1));
  for (var f = o.length - 1; f >= 0; f--)
    o[f] === 0 ? (i = i.diffAdd(n, s), n = n.dbl()) : (n = i.diffAdd(n, s), i = i.dbl());
  return n;
};
At.prototype.mulAdd = function() {
  throw new Error("Not supported on Montgomery curve");
};
At.prototype.jumlAdd = function() {
  throw new Error("Not supported on Montgomery curve");
};
At.prototype.eq = function(e) {
  return this.getX().cmp(e.getX()) === 0;
};
At.prototype.normalize = function() {
  return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this;
};
At.prototype.getX = function() {
  return this.normalize(), this.x.fromRed();
};
var g2 = ar, ci = li, Wu = ua, ya = ba, y2 = g2.assert;
function Hr(r) {
  this.twisted = (r.a | 0) !== 1, this.mOneA = this.twisted && (r.a | 0) === -1, this.extended = this.mOneA, ya.call(this, "edwards", r), this.a = new ci(r.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new ci(r.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new ci(r.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), y2(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (r.c | 0) === 1;
}
Wu(Hr, ya);
var m2 = Hr;
Hr.prototype._mulA = function(e) {
  return this.mOneA ? e.redNeg() : this.a.redMul(e);
};
Hr.prototype._mulC = function(e) {
  return this.oneC ? e : this.c.redMul(e);
};
Hr.prototype.jpoint = function(e, t, i, n) {
  return this.point(e, t, i, n);
};
Hr.prototype.pointFromX = function(e, t) {
  e = new ci(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr(), n = this.c2.redSub(this.a.redMul(i)), s = this.one.redSub(this.c2.redMul(this.d).redMul(i)), o = n.redMul(s.redInvm()), f = o.redSqrt();
  if (f.redSqr().redSub(o).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var h = f.fromRed().isOdd();
  return (t && !h || !t && h) && (f = f.redNeg()), this.point(e, f);
};
Hr.prototype.pointFromY = function(e, t) {
  e = new ci(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr(), n = i.redSub(this.c2), s = i.redMul(this.d).redMul(this.c2).redSub(this.a), o = n.redMul(s.redInvm());
  if (o.cmp(this.zero) === 0) {
    if (t)
      throw new Error("invalid point");
    return this.point(this.zero, e);
  }
  var f = o.redSqrt();
  if (f.redSqr().redSub(o).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  return f.fromRed().isOdd() !== t && (f = f.redNeg()), this.point(f, e);
};
Hr.prototype.validate = function(e) {
  if (e.isInfinity())
    return !0;
  e.normalize();
  var t = e.x.redSqr(), i = e.y.redSqr(), n = t.redMul(this.a).redAdd(i), s = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(i)));
  return n.cmp(s) === 0;
};
function ft(r, e, t, i, n) {
  ya.BasePoint.call(this, r, "projective"), e === null && t === null && i === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new ci(e, 16), this.y = new ci(t, 16), this.z = i ? new ci(i, 16) : this.curve.one, this.t = n && new ci(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
}
Wu(ft, ya.BasePoint);
Hr.prototype.pointFromJSON = function(e) {
  return ft.fromJSON(this, e);
};
Hr.prototype.point = function(e, t, i, n) {
  return new ft(this, e, t, i, n);
};
ft.fromJSON = function(e, t) {
  return new ft(e, t[0], t[1], t[2]);
};
ft.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
ft.prototype.isInfinity = function() {
  return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
};
ft.prototype._extDbl = function() {
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr();
  i = i.redIAdd(i);
  var n = this.curve._mulA(e), s = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), o = n.redAdd(t), f = o.redSub(i), h = n.redSub(t), d = s.redMul(f), v = o.redMul(h), w = s.redMul(h), A = f.redMul(o);
  return this.curve.point(d, v, A, w);
};
ft.prototype._projDbl = function() {
  var e = this.x.redAdd(this.y).redSqr(), t = this.x.redSqr(), i = this.y.redSqr(), n, s, o, f, h, d;
  if (this.curve.twisted) {
    f = this.curve._mulA(t);
    var v = f.redAdd(i);
    this.zOne ? (n = e.redSub(t).redSub(i).redMul(v.redSub(this.curve.two)), s = v.redMul(f.redSub(i)), o = v.redSqr().redSub(v).redSub(v)) : (h = this.z.redSqr(), d = v.redSub(h).redISub(h), n = e.redSub(t).redISub(i).redMul(d), s = v.redMul(f.redSub(i)), o = v.redMul(d));
  } else
    f = t.redAdd(i), h = this.curve._mulC(this.z).redSqr(), d = f.redSub(h).redSub(h), n = this.curve._mulC(e.redISub(f)).redMul(d), s = this.curve._mulC(f).redMul(t.redISub(i)), o = f.redMul(d);
  return this.curve.point(n, s, o);
};
ft.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
};
ft.prototype._extAdd = function(e) {
  var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), i = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), n = this.t.redMul(this.curve.dd).redMul(e.t), s = this.z.redMul(e.z.redAdd(e.z)), o = i.redSub(t), f = s.redSub(n), h = s.redAdd(n), d = i.redAdd(t), v = o.redMul(f), w = h.redMul(d), A = o.redMul(d), I = f.redMul(h);
  return this.curve.point(v, w, I, A);
};
ft.prototype._projAdd = function(e) {
  var t = this.z.redMul(e.z), i = t.redSqr(), n = this.x.redMul(e.x), s = this.y.redMul(e.y), o = this.curve.d.redMul(n).redMul(s), f = i.redSub(o), h = i.redAdd(o), d = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(n).redISub(s), v = t.redMul(f).redMul(d), w, A;
  return this.curve.twisted ? (w = t.redMul(h).redMul(s.redSub(this.curve._mulA(n))), A = f.redMul(h)) : (w = t.redMul(h).redMul(s.redSub(n)), A = this.curve._mulC(f).redMul(h)), this.curve.point(v, w, A);
};
ft.prototype.add = function(e) {
  return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e);
};
ft.prototype.mul = function(e) {
  return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e);
};
ft.prototype.mulAdd = function(e, t, i) {
  return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !1);
};
ft.prototype.jmulAdd = function(e, t, i) {
  return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !0);
};
ft.prototype.normalize = function() {
  if (this.zOne)
    return this;
  var e = this.z.redInvm();
  return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this;
};
ft.prototype.neg = function() {
  return this.curve.point(
    this.x.redNeg(),
    this.y,
    this.z,
    this.t && this.t.redNeg()
  );
};
ft.prototype.getX = function() {
  return this.normalize(), this.x.fromRed();
};
ft.prototype.getY = function() {
  return this.normalize(), this.y.fromRed();
};
ft.prototype.eq = function(e) {
  return this === e || this.getX().cmp(e.getX()) === 0 && this.getY().cmp(e.getY()) === 0;
};
ft.prototype.eqXToP = function(e) {
  var t = e.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(t) === 0)
    return !0;
  for (var i = e.clone(), n = this.curve.redN.redMul(this.z); ; ) {
    if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)
      return !1;
    if (t.redIAdd(n), this.x.cmp(t) === 0)
      return !0;
  }
};
ft.prototype.toP = ft.prototype.normalize;
ft.prototype.mixedAdd = ft.prototype.add;
(function(r) {
  var e = r;
  e.base = ba, e.short = p2, e.mont = b2, e.edwards = m2;
})(Yo);
var ma = {}, Ya, yc;
function w2() {
  return yc || (yc = 1, Ya = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  }), Ya;
}
(function(r) {
  var e = r, t = ns, i = Yo, n = ar, s = n.assert;
  function o(d) {
    d.type === "short" ? this.curve = new i.short(d) : d.type === "edwards" ? this.curve = new i.edwards(d) : this.curve = new i.mont(d), this.g = this.curve.g, this.n = this.curve.n, this.hash = d.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  e.PresetCurve = o;
  function f(d, v) {
    Object.defineProperty(e, d, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var w = new o(v);
        return Object.defineProperty(e, d, {
          configurable: !0,
          enumerable: !0,
          value: w
        }), w;
      }
    });
  }
  f("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: t.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), f("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: t.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), f("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: t.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), f("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: t.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), f("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: t.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), f("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: t.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), f("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: t.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var h;
  try {
    h = w2();
  } catch {
    h = void 0;
  }
  f("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: t.sha256,
    // Precomputed endomorphism
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      h
    ]
  });
})(ma);
var _2 = ns, ki = Go, Gu = Yi;
function xi(r) {
  if (!(this instanceof xi))
    return new xi(r);
  this.hash = r.hash, this.predResist = !!r.predResist, this.outLen = this.hash.outSize, this.minEntropy = r.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var e = ki.toArray(r.entropy, r.entropyEnc || "hex"), t = ki.toArray(r.nonce, r.nonceEnc || "hex"), i = ki.toArray(r.pers, r.persEnc || "hex");
  Gu(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(e, t, i);
}
var x2 = xi;
xi.prototype._init = function(e, t, i) {
  var n = e.concat(t).concat(i);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var s = 0; s < this.V.length; s++)
    this.K[s] = 0, this.V[s] = 1;
  this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656;
};
xi.prototype._hmac = function() {
  return new _2.hmac(this.hash, this.K);
};
xi.prototype._update = function(e) {
  var t = this._hmac().update(this.V).update([0]);
  e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest());
};
xi.prototype.reseed = function(e, t, i, n) {
  typeof t != "string" && (n = i, i = t, t = null), e = ki.toArray(e, t), i = ki.toArray(i, n), Gu(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(e.concat(i || [])), this._reseed = 1;
};
xi.prototype.generate = function(e, t, i, n) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof t != "string" && (n = i, i = t, t = null), i && (i = ki.toArray(i, n || "hex"), this._update(i));
  for (var s = []; s.length < e; )
    this.V = this._hmac().update(this.V).digest(), s = s.concat(this.V);
  var o = s.slice(0, e);
  return this._update(i), this._reseed++, ki.encode(o, t);
};
var E2 = li, S2 = ar, Mo = S2.assert;
function Ut(r, e) {
  this.ec = r, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc);
}
var M2 = Ut;
Ut.fromPublic = function(e, t, i) {
  return t instanceof Ut ? t : new Ut(e, {
    pub: t,
    pubEnc: i
  });
};
Ut.fromPrivate = function(e, t, i) {
  return t instanceof Ut ? t : new Ut(e, {
    priv: t,
    privEnc: i
  });
};
Ut.prototype.validate = function() {
  var e = this.getPublic();
  return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
Ut.prototype.getPublic = function(e, t) {
  return typeof e == "string" && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub;
};
Ut.prototype.getPrivate = function(e) {
  return e === "hex" ? this.priv.toString(16, 2) : this.priv;
};
Ut.prototype._importPrivate = function(e, t) {
  this.priv = new E2(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
Ut.prototype._importPublic = function(e, t) {
  if (e.x || e.y) {
    this.ec.curve.type === "mont" ? Mo(e.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && Mo(e.x && e.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(e.x, e.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(e, t);
};
Ut.prototype.derive = function(e) {
  return e.validate() || Mo(e.validate(), "public point not validated"), e.mul(this.priv).getX();
};
Ut.prototype.sign = function(e, t, i) {
  return this.ec.sign(e, this, t, i);
};
Ut.prototype.verify = function(e, t, i) {
  return this.ec.verify(e, t, this, void 0, i);
};
Ut.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Ws = li, Zo = ar, I2 = Zo.assert;
function wa(r, e) {
  if (r instanceof wa)
    return r;
  this._importDER(r, e) || (I2(r.r && r.s, "Signature without r or s"), this.r = new Ws(r.r, 16), this.s = new Ws(r.s, 16), r.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = r.recoveryParam);
}
var A2 = wa;
function D2() {
  this.place = 0;
}
function Xa(r, e) {
  var t = r[e.place++];
  if (!(t & 128))
    return t;
  var i = t & 15;
  if (i === 0 || i > 4 || r[e.place] === 0)
    return !1;
  for (var n = 0, s = 0, o = e.place; s < i; s++, o++)
    n <<= 8, n |= r[o], n >>>= 0;
  return n <= 127 ? !1 : (e.place = o, n);
}
function mc(r) {
  for (var e = 0, t = r.length - 1; !r[e] && !(r[e + 1] & 128) && e < t; )
    e++;
  return e === 0 ? r : r.slice(e);
}
wa.prototype._importDER = function(e, t) {
  e = Zo.toArray(e, t);
  var i = new D2();
  if (e[i.place++] !== 48)
    return !1;
  var n = Xa(e, i);
  if (n === !1 || n + i.place !== e.length || e[i.place++] !== 2)
    return !1;
  var s = Xa(e, i);
  if (s === !1 || e[i.place] & 128)
    return !1;
  var o = e.slice(i.place, s + i.place);
  if (i.place += s, e[i.place++] !== 2)
    return !1;
  var f = Xa(e, i);
  if (f === !1 || e.length !== f + i.place || e[i.place] & 128)
    return !1;
  var h = e.slice(i.place, f + i.place);
  if (o[0] === 0)
    if (o[1] & 128)
      o = o.slice(1);
    else
      return !1;
  if (h[0] === 0)
    if (h[1] & 128)
      h = h.slice(1);
    else
      return !1;
  return this.r = new Ws(o), this.s = new Ws(h), this.recoveryParam = null, !0;
};
function Za(r, e) {
  if (e < 128) {
    r.push(e);
    return;
  }
  var t = 1 + (Math.log(e) / Math.LN2 >>> 3);
  for (r.push(t | 128); --t; )
    r.push(e >>> (t << 3) & 255);
  r.push(e);
}
wa.prototype.toDER = function(e) {
  var t = this.r.toArray(), i = this.s.toArray();
  for (t[0] & 128 && (t = [0].concat(t)), i[0] & 128 && (i = [0].concat(i)), t = mc(t), i = mc(i); !i[0] && !(i[1] & 128); )
    i = i.slice(1);
  var n = [2];
  Za(n, t.length), n = n.concat(t), n.push(2), Za(n, i.length);
  var s = n.concat(i), o = [48];
  return Za(o, s.length), o = o.concat(s), Zo.encode(o, e);
};
var Ir = li, Ju = x2, P2 = ar, Qa = ma, O2 = Hu, Fi = P2.assert, Qo = M2, _a = A2;
function pr(r) {
  if (!(this instanceof pr))
    return new pr(r);
  typeof r == "string" && (Fi(
    Object.prototype.hasOwnProperty.call(Qa, r),
    "Unknown curve " + r
  ), r = Qa[r]), r instanceof Qa.PresetCurve && (r = { curve: r }), this.curve = r.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = r.curve.g, this.g.precompute(r.curve.n.bitLength() + 1), this.hash = r.hash || r.curve.hash;
}
var R2 = pr;
pr.prototype.keyPair = function(e) {
  return new Qo(this, e);
};
pr.prototype.keyFromPrivate = function(e, t) {
  return Qo.fromPrivate(this, e, t);
};
pr.prototype.keyFromPublic = function(e, t) {
  return Qo.fromPublic(this, e, t);
};
pr.prototype.genKeyPair = function(e) {
  e || (e = {});
  for (var t = new Ju({
    hash: this.hash,
    pers: e.pers,
    persEnc: e.persEnc || "utf8",
    entropy: e.entropy || O2(this.hash.hmacStrength),
    entropyEnc: e.entropy && e.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), i = this.n.byteLength(), n = this.n.sub(new Ir(2)); ; ) {
    var s = new Ir(t.generate(i));
    if (!(s.cmp(n) > 0))
      return s.iaddn(1), this.keyFromPrivate(s);
  }
};
pr.prototype._truncateToN = function(e, t, i) {
  var n;
  if (Ir.isBN(e) || typeof e == "number")
    e = new Ir(e, 16), n = e.byteLength();
  else if (typeof e == "object")
    n = e.length, e = new Ir(e, 16);
  else {
    var s = e.toString();
    n = s.length + 1 >>> 1, e = new Ir(s, 16);
  }
  typeof i != "number" && (i = n * 8);
  var o = i - this.n.bitLength();
  return o > 0 && (e = e.ushrn(o)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
pr.prototype.sign = function(e, t, i, n) {
  if (typeof i == "object" && (n = i, i = null), n || (n = {}), typeof e != "string" && typeof e != "number" && !Ir.isBN(e)) {
    Fi(
      typeof e == "object" && e && typeof e.length == "number",
      "Expected message to be an array-like, a hex string, or a BN instance"
    ), Fi(e.length >>> 0 === e.length);
    for (var s = 0; s < e.length; s++)
      Fi((e[s] & 255) === e[s]);
  }
  t = this.keyFromPrivate(t, i), e = this._truncateToN(e, !1, n.msgBitLength), Fi(!e.isNeg(), "Can not sign a negative message");
  var o = this.n.byteLength(), f = t.getPrivate().toArray("be", o), h = e.toArray("be", o);
  Fi(new Ir(h).eq(e), "Can not sign message");
  for (var d = new Ju({
    hash: this.hash,
    entropy: f,
    nonce: h,
    pers: n.pers,
    persEnc: n.persEnc || "utf8"
  }), v = this.n.sub(new Ir(1)), w = 0; ; w++) {
    var A = n.k ? n.k(w) : new Ir(d.generate(this.n.byteLength()));
    if (A = this._truncateToN(A, !0), !(A.cmpn(1) <= 0 || A.cmp(v) >= 0)) {
      var I = this.g.mul(A);
      if (!I.isInfinity()) {
        var D = I.getX(), N = D.umod(this.n);
        if (N.cmpn(0) !== 0) {
          var k = A.invm(this.n).mul(N.mul(t.getPrivate()).iadd(e));
          if (k = k.umod(this.n), k.cmpn(0) !== 0) {
            var j = (I.getY().isOdd() ? 1 : 0) | (D.cmp(N) !== 0 ? 2 : 0);
            return n.canonical && k.cmp(this.nh) > 0 && (k = this.n.sub(k), j ^= 1), new _a({ r: N, s: k, recoveryParam: j });
          }
        }
      }
    }
  }
};
pr.prototype.verify = function(e, t, i, n, s) {
  s || (s = {}), e = this._truncateToN(e, !1, s.msgBitLength), i = this.keyFromPublic(i, n), t = new _a(t, "hex");
  var o = t.r, f = t.s;
  if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0 || f.cmpn(1) < 0 || f.cmp(this.n) >= 0)
    return !1;
  var h = f.invm(this.n), d = h.mul(e).umod(this.n), v = h.mul(o).umod(this.n), w;
  return this.curve._maxwellTrick ? (w = this.g.jmulAdd(d, i.getPublic(), v), w.isInfinity() ? !1 : w.eqXToP(o)) : (w = this.g.mulAdd(d, i.getPublic(), v), w.isInfinity() ? !1 : w.getX().umod(this.n).cmp(o) === 0);
};
pr.prototype.recoverPubKey = function(r, e, t, i) {
  Fi((3 & t) === t, "The recovery param is more than two bits"), e = new _a(e, i);
  var n = this.n, s = new Ir(r), o = e.r, f = e.s, h = t & 1, d = t >> 1;
  if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
    throw new Error("Unable to find sencond key candinate");
  d ? o = this.curve.pointFromX(o.add(this.curve.n), h) : o = this.curve.pointFromX(o, h);
  var v = e.r.invm(n), w = n.sub(s).mul(v).umod(n), A = f.mul(v).umod(n);
  return this.g.mulAdd(w, o, A);
};
pr.prototype.getKeyRecoveryParam = function(r, e, t, i) {
  if (e = new _a(e, i), e.recoveryParam !== null)
    return e.recoveryParam;
  for (var n = 0; n < 4; n++) {
    var s;
    try {
      s = this.recoverPubKey(r, e, n);
    } catch {
      continue;
    }
    if (s.eq(t))
      return n;
  }
  throw new Error("Unable to find valid recovery factor");
};
var fs = ar, Yu = fs.assert, wc = fs.parseBytes, Mn = fs.cachedProperty;
function It(r, e) {
  this.eddsa = r, this._secret = wc(e.secret), r.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = wc(e.pub);
}
It.fromPublic = function(e, t) {
  return t instanceof It ? t : new It(e, { pub: t });
};
It.fromSecret = function(e, t) {
  return t instanceof It ? t : new It(e, { secret: t });
};
It.prototype.secret = function() {
  return this._secret;
};
Mn(It, "pubBytes", function() {
  return this.eddsa.encodePoint(this.pub());
});
Mn(It, "pub", function() {
  return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
});
Mn(It, "privBytes", function() {
  var e = this.eddsa, t = this.hash(), i = e.encodingLength - 1, n = t.slice(0, e.encodingLength);
  return n[0] &= 248, n[i] &= 127, n[i] |= 64, n;
});
Mn(It, "priv", function() {
  return this.eddsa.decodeInt(this.privBytes());
});
Mn(It, "hash", function() {
  return this.eddsa.hash().update(this.secret()).digest();
});
Mn(It, "messagePrefix", function() {
  return this.hash().slice(this.eddsa.encodingLength);
});
It.prototype.sign = function(e) {
  return Yu(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this);
};
It.prototype.verify = function(e, t) {
  return this.eddsa.verify(e, t, this);
};
It.prototype.getSecret = function(e) {
  return Yu(this._secret, "KeyPair is public only"), fs.encode(this.secret(), e);
};
It.prototype.getPublic = function(e) {
  return fs.encode(this.pubBytes(), e);
};
var N2 = It, T2 = li, xa = ar, _c = xa.assert, Ea = xa.cachedProperty, C2 = xa.parseBytes;
function Zi(r, e) {
  this.eddsa = r, typeof e != "object" && (e = C2(e)), Array.isArray(e) && (_c(e.length === r.encodingLength * 2, "Signature has invalid size"), e = {
    R: e.slice(0, r.encodingLength),
    S: e.slice(r.encodingLength)
  }), _c(e.R && e.S, "Signature without R or S"), r.isPoint(e.R) && (this._R = e.R), e.S instanceof T2 && (this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded;
}
Ea(Zi, "S", function() {
  return this.eddsa.decodeInt(this.Sencoded());
});
Ea(Zi, "R", function() {
  return this.eddsa.decodePoint(this.Rencoded());
});
Ea(Zi, "Rencoded", function() {
  return this.eddsa.encodePoint(this.R());
});
Ea(Zi, "Sencoded", function() {
  return this.eddsa.encodeInt(this.S());
});
Zi.prototype.toBytes = function() {
  return this.Rencoded().concat(this.Sencoded());
};
Zi.prototype.toHex = function() {
  return xa.encode(this.toBytes(), "hex").toUpperCase();
};
var $2 = Zi, L2 = ns, F2 = ma, vn = ar, q2 = vn.assert, Xu = vn.parseBytes, Zu = N2, xc = $2;
function Xt(r) {
  if (q2(r === "ed25519", "only tested with ed25519 so far"), !(this instanceof Xt))
    return new Xt(r);
  r = F2[r].curve, this.curve = r, this.g = r.g, this.g.precompute(r.n.bitLength() + 1), this.pointClass = r.point().constructor, this.encodingLength = Math.ceil(r.n.bitLength() / 8), this.hash = L2.sha512;
}
var U2 = Xt;
Xt.prototype.sign = function(e, t) {
  e = Xu(e);
  var i = this.keyFromSecret(t), n = this.hashInt(i.messagePrefix(), e), s = this.g.mul(n), o = this.encodePoint(s), f = this.hashInt(o, i.pubBytes(), e).mul(i.priv()), h = n.add(f).umod(this.curve.n);
  return this.makeSignature({ R: s, S: h, Rencoded: o });
};
Xt.prototype.verify = function(e, t, i) {
  if (e = Xu(e), t = this.makeSignature(t), t.S().gte(t.eddsa.curve.n) || t.S().isNeg())
    return !1;
  var n = this.keyFromPublic(i), s = this.hashInt(t.Rencoded(), n.pubBytes(), e), o = this.g.mul(t.S()), f = t.R().add(n.pub().mul(s));
  return f.eq(o);
};
Xt.prototype.hashInt = function() {
  for (var e = this.hash(), t = 0; t < arguments.length; t++)
    e.update(arguments[t]);
  return vn.intFromLE(e.digest()).umod(this.curve.n);
};
Xt.prototype.keyFromPublic = function(e) {
  return Zu.fromPublic(this, e);
};
Xt.prototype.keyFromSecret = function(e) {
  return Zu.fromSecret(this, e);
};
Xt.prototype.makeSignature = function(e) {
  return e instanceof xc ? e : new xc(this, e);
};
Xt.prototype.encodePoint = function(e) {
  var t = e.getY().toArray("le", this.encodingLength);
  return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t;
};
Xt.prototype.decodePoint = function(e) {
  e = vn.parseBytes(e);
  var t = e.length - 1, i = e.slice(0, t).concat(e[t] & -129), n = (e[t] & 128) !== 0, s = vn.intFromLE(i);
  return this.curve.pointFromY(s, n);
};
Xt.prototype.encodeInt = function(e) {
  return e.toArray("le", this.encodingLength);
};
Xt.prototype.decodeInt = function(e) {
  return vn.intFromLE(e);
};
Xt.prototype.isPoint = function(e) {
  return e instanceof this.pointClass;
};
(function(r) {
  var e = r;
  e.version = h2.version, e.utils = ar, e.rand = Hu, e.curve = Yo, e.curves = ma, e.ec = R2, e.eddsa = U2;
})(Ku);
const z2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } }, ef = ":";
function Ns(r) {
  const [e, t] = r.split(ef);
  return { namespace: e, reference: t };
}
function B2(r) {
  const { namespace: e, reference: t } = r;
  return [e, t].join(ef);
}
function k2(r) {
  const [e, t, i] = r.split(ef);
  return { namespace: e, reference: t, address: i };
}
function j2(r, e) {
  const t = [];
  return r.forEach((i) => {
    const n = e(i);
    t.includes(n) || t.push(n);
  }), t;
}
function K2(r) {
  const { namespace: e, reference: t } = k2(r);
  return B2({ namespace: e, reference: t });
}
function H2(r) {
  return j2(r, K2);
}
function Qu(r, e = []) {
  const t = [];
  return Object.keys(r).forEach((i) => {
    if (e.length && !e.includes(i))
      return;
    const n = r[i];
    t.push(...n.accounts);
  }), t;
}
function ed(r, e = []) {
  const t = [];
  return Object.keys(r).forEach((i) => {
    if (e.length && !e.includes(i))
      return;
    const n = r[i];
    t.push(...H2(n.accounts));
  }), t;
}
function V2(r, e = []) {
  const t = [];
  return Object.keys(r).forEach((i) => {
    if (e.length && !e.includes(i))
      return;
    const n = r[i];
    t.push(...tf(i, n));
  }), t;
}
function tf(r, e) {
  return r.includes(":") ? [r] : e.chains || [];
}
var W2 = Object.defineProperty, Ec = Object.getOwnPropertySymbols, G2 = Object.prototype.hasOwnProperty, J2 = Object.prototype.propertyIsEnumerable, Sc = (r, e, t) => e in r ? W2(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Mc = (r, e) => {
  for (var t in e || (e = {}))
    G2.call(e, t) && Sc(r, t, e[t]);
  if (Ec)
    for (var t of Ec(e))
      J2.call(e, t) && Sc(r, t, e[t]);
  return r;
};
const Y2 = "ReactNative", rr = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, X2 = "js";
function Gs() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Ai() {
  return !is() && !!$o() && navigator.product === Y2;
}
function Z2() {
  return Ai() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function Q2() {
  return Ai() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function cs() {
  return !Gs() && !!$o() && !!is();
}
function hs() {
  return Ai() ? rr.reactNative : Gs() ? rr.node : cs() ? rr.browser : rr.unknown;
}
function Ic() {
  var r;
  try {
    return Ai() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (r = global.Application) == null ? void 0 : r.applicationId : void 0;
  } catch {
    return;
  }
}
function ey(r, e) {
  let t = Yn.parse(r);
  return t = Mc(Mc({}, t), e), r = Yn.stringify(t), r;
}
function td() {
  return uu() || { name: "", description: "", url: "", icons: [""] };
}
function ty() {
  if (hs() === rr.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: t, Version: i } = global.Platform;
    return [t, i].join("-");
  }
  const r = cu();
  if (r === null)
    return "unknown";
  const e = r.os ? r.os.replace(" ", "").toLowerCase() : "unknown";
  return r.type === "browser" ? [e, r.name, r.version].join("-") : [e, r.version].join("-");
}
function ry() {
  var r;
  const e = hs();
  return e === rr.browser ? [e, ((r = hu()) == null ? void 0 : r.host) || "unknown"].join(":") : e;
}
function rd(r, e, t) {
  const i = ty(), n = ry();
  return [[r, e].join("-"), [X2, t].join("-"), i, n].join("/");
}
function iy({ protocol: r, version: e, relayUrl: t, sdkVersion: i, auth: n, projectId: s, useOnCloseEvent: o, bundleId: f, packageName: h }) {
  const d = t.split("?"), v = rd(r, e, i), w = { auth: n, ua: v, projectId: s, useOnCloseEvent: o || void 0, packageName: h || void 0, bundleId: f || void 0 }, A = ey(d[1] || "", w);
  return d[0] + "?" + A;
}
function Ui(r, e) {
  return r.filter((t) => e.includes(t)).length === r.length;
}
function id(r) {
  return Object.fromEntries(r.entries());
}
function nd(r) {
  return new Map(Object.entries(r));
}
function Li(r = ie.FIVE_MINUTES, e) {
  const t = ie.toMiliseconds(r || ie.FIVE_MINUTES);
  let i, n, s, o;
  return { resolve: (f) => {
    s && i && (clearTimeout(s), i(f), o = Promise.resolve(f));
  }, reject: (f) => {
    s && n && (clearTimeout(s), n(f));
  }, done: () => new Promise((f, h) => {
    if (o)
      return f(o);
    s = setTimeout(() => {
      const d = new Error(e);
      o = Promise.reject(d), h(d);
    }, t), i = f, n = h;
  }) };
}
function mi(r, e, t) {
  return new Promise(async (i, n) => {
    const s = setTimeout(() => n(new Error(t)), e);
    try {
      const o = await r;
      i(o);
    } catch (o) {
      n(o);
    }
    clearTimeout(s);
  });
}
function sd(r, e) {
  if (typeof e == "string" && e.startsWith(`${r}:`))
    return e;
  if (r.toLowerCase() === "topic") {
    if (typeof e != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${e}`;
  } else if (r.toLowerCase() === "id") {
    if (typeof e != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${e}`;
  }
  throw new Error(`Unknown expirer target type: ${r}`);
}
function ny(r) {
  return sd("topic", r);
}
function sy(r) {
  return sd("id", r);
}
function ad(r) {
  const [e, t] = r.split(":"), i = { id: void 0, topic: void 0 };
  if (e === "topic" && typeof t == "string")
    i.topic = t;
  else if (e === "id" && Number.isInteger(Number(t)))
    i.id = Number(t);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${t}`);
  return i;
}
function mt(r, e) {
  return ie.fromMiliseconds((e || Date.now()) + ie.toMiliseconds(r));
}
function gi(r) {
  return Date.now() >= ie.toMiliseconds(r);
}
function Xe(r, e) {
  return `${r}${e ? `:${e}` : ""}`;
}
function ay(r = [], e = []) {
  return [.../* @__PURE__ */ new Set([...r, ...e])];
}
async function oy({ id: r, topic: e, wcDeepLink: t }) {
  var i;
  try {
    if (!t)
      return;
    const n = typeof t == "string" ? JSON.parse(t) : t, s = n?.href;
    if (typeof s != "string")
      return;
    const o = fy(s, r, e), f = hs();
    if (f === rr.browser) {
      if (!((i = is()) != null && i.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      o.startsWith("https://") || o.startsWith("http://") ? window.open(o, "_blank", "noreferrer noopener") : window.open(o, hy() ? "_blank" : "_self", "noreferrer noopener");
    } else
      f === rr.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(o);
  } catch (n) {
    console.error(n);
  }
}
function fy(r, e, t) {
  const i = `requestId=${e}&sessionTopic=${t}`;
  r.endsWith("/") && (r = r.slice(0, -1));
  let n = `${r}`;
  if (r.startsWith("https://t.me")) {
    const s = r.includes("?") ? "&startapp=" : "?startapp=";
    n = `${n}${s}${uy(i, !0)}`;
  } else
    n = `${n}/wc?${i}`;
  return n;
}
async function cy(r, e) {
  let t = "";
  try {
    if (cs() && (t = localStorage.getItem(e), t))
      return t;
    t = await r.getItem(e);
  } catch (i) {
    console.error(i);
  }
  return t;
}
function Ac(r, e) {
  if (!r.includes(e))
    return null;
  const t = r.split(/([&,?,=])/), i = t.indexOf(e);
  return t[i + 2];
}
function Dc() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (r) => {
    const e = Math.random() * 16 | 0;
    return (r === "x" ? e : e & 3 | 8).toString(16);
  });
}
function rf() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function hy() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function uy(r, e = !1) {
  const t = Buffer.from(r).toString("base64");
  return e ? t.replace(/[=]/g, "") : t;
}
function od(r) {
  return Buffer.from(r, "base64").toString("utf-8");
}
function dy(r) {
  return new Promise((e) => setTimeout(e, r));
}
const ly = "https://rpc.walletconnect.org/v1";
async function py(r, e, t, i, n, s) {
  switch (t.t) {
    case "eip191":
      return vy(r, e, t.s);
    case "eip1271":
      return await by(r, e, t.s, i, n, s);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${t.t}`);
  }
}
function vy(r, e, t) {
  return Lg(bu(e), t).toLowerCase() === r.toLowerCase();
}
async function by(r, e, t, i, n, s) {
  const o = Ns(i);
  if (!o.namespace || !o.reference)
    throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${i}`);
  try {
    const f = "0x1626ba7e", h = "0000000000000000000000000000000000000000000000000000000000000040", d = "0000000000000000000000000000000000000000000000000000000000000041", v = t.substring(2), w = bu(e).substring(2), A = f + w + h + d + v, I = await fetch(`${s || ly}/?chainId=${i}&projectId=${n}`, { method: "POST", body: JSON.stringify({ id: gy(), jsonrpc: "2.0", method: "eth_call", params: [{ to: r, data: A }, "latest"] }) }), { result: D } = await I.json();
    return D ? D.slice(0, f.length).toLowerCase() === f.toLowerCase() : !1;
  } catch (f) {
    return console.error("isValidEip1271Signature: ", f), !1;
  }
}
function gy() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var yy = Object.defineProperty, my = Object.defineProperties, wy = Object.getOwnPropertyDescriptors, Pc = Object.getOwnPropertySymbols, _y = Object.prototype.hasOwnProperty, xy = Object.prototype.propertyIsEnumerable, Oc = (r, e, t) => e in r ? yy(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Ey = (r, e) => {
  for (var t in e || (e = {}))
    _y.call(e, t) && Oc(r, t, e[t]);
  if (Pc)
    for (var t of Pc(e))
      xy.call(e, t) && Oc(r, t, e[t]);
  return r;
}, Sy = (r, e) => my(r, wy(e));
const My = "did:pkh:", nf = (r) => r?.split(":"), Iy = (r) => {
  const e = r && nf(r);
  if (e)
    return r.includes(My) ? e[3] : e[1];
}, Io = (r) => {
  const e = r && nf(r);
  if (e)
    return e[2] + ":" + e[3];
}, Js = (r) => {
  const e = r && nf(r);
  if (e)
    return e.pop();
};
async function Rc(r) {
  const { cacao: e, projectId: t } = r, { s: i, p: n } = e, s = fd(n, n.iss), o = Js(n.iss);
  return await py(o, s, i, Io(n.iss), t);
}
const fd = (r, e) => {
  const t = `${r.domain} wants you to sign in with your Ethereum account:`, i = Js(e);
  if (!r.aud && !r.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let n = r.statement || void 0;
  const s = `URI: ${r.aud || r.uri}`, o = `Version: ${r.version}`, f = `Chain ID: ${Iy(e)}`, h = `Nonce: ${r.nonce}`, d = `Issued At: ${r.iat}`, v = r.exp ? `Expiration Time: ${r.exp}` : void 0, w = r.nbf ? `Not Before: ${r.nbf}` : void 0, A = r.requestId ? `Request ID: ${r.requestId}` : void 0, I = r.resources ? `Resources:${r.resources.map((N) => `
- ${N}`).join("")}` : void 0, D = Ts(r.resources);
  if (D) {
    const N = Xn(D);
    n = $y(n, N);
  }
  return [t, i, "", n, "", s, o, f, h, d, v, w, A, I].filter((N) => N != null).join(`
`);
};
function Ay(r) {
  return Buffer.from(JSON.stringify(r)).toString("base64");
}
function Dy(r) {
  return JSON.parse(Buffer.from(r, "base64").toString("utf-8"));
}
function Hi(r) {
  if (!r)
    throw new Error("No recap provided, value is undefined");
  if (!r.att)
    throw new Error("No `att` property found");
  const e = Object.keys(r.att);
  if (!(e != null && e.length))
    throw new Error("No resources found in `att` property");
  e.forEach((t) => {
    const i = r.att[t];
    if (Array.isArray(i))
      throw new Error(`Resource must be an object: ${t}`);
    if (typeof i != "object")
      throw new Error(`Resource must be an object: ${t}`);
    if (!Object.keys(i).length)
      throw new Error(`Resource object is empty: ${t}`);
    Object.keys(i).forEach((n) => {
      const s = i[n];
      if (!Array.isArray(s))
        throw new Error(`Ability limits ${n} must be an array of objects, found: ${s}`);
      if (!s.length)
        throw new Error(`Value of ${n} is empty array, must be an array with objects`);
      s.forEach((o) => {
        if (typeof o != "object")
          throw new Error(`Ability limits (${n}) must be an array of objects, found: ${o}`);
      });
    });
  });
}
function Py(r, e, t, i = {}) {
  return t?.sort((n, s) => n.localeCompare(s)), { att: { [r]: Oy(e, t, i) } };
}
function Oy(r, e, t = {}) {
  e = e?.sort((n, s) => n.localeCompare(s));
  const i = e.map((n) => ({ [`${r}/${n}`]: [t] }));
  return Object.assign({}, ...i);
}
function cd(r) {
  return Hi(r), `urn:recap:${Ay(r).replace(/=/g, "")}`;
}
function Xn(r) {
  const e = Dy(r.replace("urn:recap:", ""));
  return Hi(e), e;
}
function Ry(r, e, t) {
  const i = Py(r, e, t);
  return cd(i);
}
function Ny(r) {
  return r && r.includes("urn:recap:");
}
function Ty(r, e) {
  const t = Xn(r), i = Xn(e), n = Cy(t, i);
  return cd(n);
}
function Cy(r, e) {
  Hi(r), Hi(e);
  const t = Object.keys(r.att).concat(Object.keys(e.att)).sort((n, s) => n.localeCompare(s)), i = { att: {} };
  return t.forEach((n) => {
    var s, o;
    Object.keys(((s = r.att) == null ? void 0 : s[n]) || {}).concat(Object.keys(((o = e.att) == null ? void 0 : o[n]) || {})).sort((f, h) => f.localeCompare(h)).forEach((f) => {
      var h, d;
      i.att[n] = Sy(Ey({}, i.att[n]), { [f]: ((h = r.att[n]) == null ? void 0 : h[f]) || ((d = e.att[n]) == null ? void 0 : d[f]) });
    });
  }), i;
}
function $y(r = "", e) {
  Hi(e);
  const t = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (r.includes(t))
    return r;
  const i = [];
  let n = 0;
  Object.keys(e.att).forEach((f) => {
    const h = Object.keys(e.att[f]).map((w) => ({ ability: w.split("/")[0], action: w.split("/")[1] }));
    h.sort((w, A) => w.action.localeCompare(A.action));
    const d = {};
    h.forEach((w) => {
      d[w.ability] || (d[w.ability] = []), d[w.ability].push(w.action);
    });
    const v = Object.keys(d).map((w) => (n++, `(${n}) '${w}': '${d[w].join("', '")}' for '${f}'.`));
    i.push(v.join(", ").replace(".,", "."));
  });
  const s = i.join(" "), o = `${t}${s}`;
  return `${r ? r + " " : ""}${o}`;
}
function Nc(r) {
  var e;
  const t = Xn(r);
  Hi(t);
  const i = (e = t.att) == null ? void 0 : e.eip155;
  return i ? Object.keys(i).map((n) => n.split("/")[1]) : [];
}
function Tc(r) {
  const e = Xn(r);
  Hi(e);
  const t = [];
  return Object.values(e.att).forEach((i) => {
    Object.values(i).forEach((n) => {
      var s;
      (s = n?.[0]) != null && s.chains && t.push(n[0].chains);
    });
  }), [...new Set(t.flat())];
}
function Ts(r) {
  if (!r)
    return;
  const e = r?.[r.length - 1];
  return Ny(e) ? e : void 0;
}
const hd = "base10", Bt = "base16", wi = "base64pad", Ln = "base64url", us = "utf8", ud = 0, hi = 1, ds = 2, Ly = 0, Cc = 1, Kn = 12, sf = 32;
function Fy() {
  const r = Vo.generateKeyPair();
  return { privateKey: Mt(r.secretKey, Bt), publicKey: Mt(r.publicKey, Bt) };
}
function Ao() {
  const r = Ei.randomBytes(sf);
  return Mt(r, Bt);
}
function qy(r, e) {
  const t = Vo.sharedKey(St(r, Bt), St(e, Bt), !0), i = new Jg(as.SHA256, t).expand(sf);
  return Mt(i, Bt);
}
function Cs(r) {
  const e = as.hash(St(r, Bt));
  return Mt(e, Bt);
}
function fi(r) {
  const e = as.hash(St(r, us));
  return Mt(e, Bt);
}
function dd(r) {
  return St(`${r}`, hd);
}
function Vi(r) {
  return Number(Mt(r, hd));
}
function Uy(r) {
  const e = dd(typeof r.type < "u" ? r.type : ud);
  if (Vi(e) === hi && typeof r.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof r.senderPublicKey < "u" ? St(r.senderPublicKey, Bt) : void 0, i = typeof r.iv < "u" ? St(r.iv, Bt) : Ei.randomBytes(Kn), n = new Ko.ChaCha20Poly1305(St(r.symKey, Bt)).seal(i, St(r.message, us));
  return ld({ type: e, sealed: n, iv: i, senderPublicKey: t, encoding: r.encoding });
}
function zy(r, e) {
  const t = dd(ds), i = Ei.randomBytes(Kn), n = St(r, us);
  return ld({ type: t, sealed: n, iv: i, encoding: e });
}
function By(r) {
  const e = new Ko.ChaCha20Poly1305(St(r.symKey, Bt)), { sealed: t, iv: i } = Zn({ encoded: r.encoded, encoding: r?.encoding }), n = e.open(i, t);
  if (n === null)
    throw new Error("Failed to decrypt");
  return Mt(n, us);
}
function ky(r, e) {
  const { sealed: t } = Zn({ encoded: r, encoding: e });
  return Mt(t, us);
}
function ld(r) {
  const { encoding: e = wi } = r;
  if (Vi(r.type) === ds)
    return Mt(Ds([r.type, r.sealed]), e);
  if (Vi(r.type) === hi) {
    if (typeof r.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return Mt(Ds([r.type, r.senderPublicKey, r.iv, r.sealed]), e);
  }
  return Mt(Ds([r.type, r.iv, r.sealed]), e);
}
function Zn(r) {
  const { encoded: e, encoding: t = wi } = r, i = St(e, t), n = i.slice(Ly, Cc), s = Cc;
  if (Vi(n) === hi) {
    const d = s + sf, v = d + Kn, w = i.slice(s, d), A = i.slice(d, v), I = i.slice(v);
    return { type: n, sealed: I, iv: A, senderPublicKey: w };
  }
  if (Vi(n) === ds) {
    const d = i.slice(s), v = Ei.randomBytes(Kn);
    return { type: n, sealed: d, iv: v };
  }
  const o = s + Kn, f = i.slice(s, o), h = i.slice(o);
  return { type: n, sealed: h, iv: f };
}
function jy(r, e) {
  const t = Zn({ encoded: r, encoding: e?.encoding });
  return pd({ type: Vi(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? Mt(t.senderPublicKey, Bt) : void 0, receiverPublicKey: e?.receiverPublicKey });
}
function pd(r) {
  const e = r?.type || ud;
  if (e === hi) {
    if (typeof r?.senderPublicKey > "u")
      throw new Error("missing sender public key");
    if (typeof r?.receiverPublicKey > "u")
      throw new Error("missing receiver public key");
  }
  return { type: e, senderPublicKey: r?.senderPublicKey, receiverPublicKey: r?.receiverPublicKey };
}
function $c(r) {
  return r.type === hi && typeof r.senderPublicKey == "string" && typeof r.receiverPublicKey == "string";
}
function Lc(r) {
  return r.type === ds;
}
function Ky(r) {
  return new Ku.ec("p256").keyFromPublic({ x: Buffer.from(r.x, "base64").toString("hex"), y: Buffer.from(r.y, "base64").toString("hex") }, "hex");
}
function Hy(r) {
  let e = r.replace(/-/g, "+").replace(/_/g, "/");
  const t = e.length % 4;
  return t > 0 && (e += "=".repeat(4 - t)), e;
}
function Vy(r) {
  return Buffer.from(Hy(r), "base64");
}
function Wy(r, e) {
  const [t, i, n] = r.split("."), s = Vy(n);
  if (s.length !== 64)
    throw new Error("Invalid signature length");
  const o = s.slice(0, 32).toString("hex"), f = s.slice(32, 64).toString("hex"), h = `${t}.${i}`, d = new as.SHA256().update(Buffer.from(h)).digest(), v = Ky(e), w = Buffer.from(d).toString("hex");
  if (!v.verify(w, { r: o, s: f }))
    throw new Error("Invalid signature");
  return bo(r).payload;
}
const Gy = "irn";
function Ys(r) {
  return r?.relay || { protocol: Gy };
}
function jn(r) {
  const e = z2[r];
  if (typeof e > "u")
    throw new Error(`Relay Protocol not supported: ${r}`);
  return e;
}
var Jy = Object.defineProperty, Yy = Object.defineProperties, Xy = Object.getOwnPropertyDescriptors, Fc = Object.getOwnPropertySymbols, Zy = Object.prototype.hasOwnProperty, Qy = Object.prototype.propertyIsEnumerable, qc = (r, e, t) => e in r ? Jy(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Uc = (r, e) => {
  for (var t in e || (e = {}))
    Zy.call(e, t) && qc(r, t, e[t]);
  if (Fc)
    for (var t of Fc(e))
      Qy.call(e, t) && qc(r, t, e[t]);
  return r;
}, em = (r, e) => Yy(r, Xy(e));
function tm(r, e = "-") {
  const t = {}, i = "relay" + e;
  return Object.keys(r).forEach((n) => {
    if (n.startsWith(i)) {
      const s = n.replace(i, ""), o = r[n];
      t[s] = o;
    }
  }), t;
}
function zc(r) {
  if (!r.includes("wc:")) {
    const h = od(r);
    h != null && h.includes("wc:") && (r = h);
  }
  r = r.includes("wc://") ? r.replace("wc://", "") : r, r = r.includes("wc:") ? r.replace("wc:", "") : r;
  const e = r.indexOf(":"), t = r.indexOf("?") !== -1 ? r.indexOf("?") : void 0, i = r.substring(0, e), n = r.substring(e + 1, t).split("@"), s = typeof t < "u" ? r.substring(t) : "", o = Yn.parse(s), f = typeof o.methods == "string" ? o.methods.split(",") : void 0;
  return { protocol: i, topic: rm(n[0]), version: parseInt(n[1], 10), symKey: o.symKey, relay: tm(o), methods: f, expiryTimestamp: o.expiryTimestamp ? parseInt(o.expiryTimestamp, 10) : void 0 };
}
function rm(r) {
  return r.startsWith("//") ? r.substring(2) : r;
}
function im(r, e = "-") {
  const t = "relay", i = {};
  return Object.keys(r).forEach((n) => {
    const s = t + e + n;
    r[n] && (i[s] = r[n]);
  }), i;
}
function Bc(r) {
  return `${r.protocol}:${r.topic}@${r.version}?` + Yn.stringify(Uc(em(Uc({ symKey: r.symKey }, im(r.relay)), { expiryTimestamp: r.expiryTimestamp }), r.methods ? { methods: r.methods.join(",") } : {}));
}
function Es(r, e, t) {
  return `${r}?wc_ev=${t}&topic=${e}`;
}
function In(r) {
  const e = [];
  return r.forEach((t) => {
    const [i, n] = t.split(":");
    e.push(`${i}:${n}`);
  }), e;
}
function nm(r) {
  const e = [];
  return Object.values(r).forEach((t) => {
    e.push(...In(t.accounts));
  }), e;
}
function sm(r, e) {
  const t = [];
  return Object.values(r).forEach((i) => {
    In(i.accounts).includes(e) && t.push(...i.methods);
  }), t;
}
function am(r, e) {
  const t = [];
  return Object.values(r).forEach((i) => {
    In(i.accounts).includes(e) && t.push(...i.events);
  }), t;
}
function om(r) {
  const e = {};
  return r?.forEach((t) => {
    const [i, n] = t.split(":");
    e[i] || (e[i] = { accounts: [], chains: [], events: [] }), e[i].accounts.push(t), e[i].chains.push(`${i}:${n}`);
  }), e;
}
function kc(r, e) {
  e = e.map((i) => i.replace("did:pkh:", ""));
  const t = om(e);
  for (const [i, n] of Object.entries(t))
    n.methods ? n.methods = ay(n.methods, r) : n.methods = r, n.events = ["chainChanged", "accountsChanged"];
  return t;
}
const fm = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, cm = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function ae(r, e) {
  const { message: t, code: i } = cm[r];
  return { message: e ? `${t} ${e}` : t, code: i };
}
function st(r, e) {
  const { message: t, code: i } = fm[r];
  return { message: e ? `${t} ${e}` : t, code: i };
}
function Sa(r, e) {
  return Array.isArray(r) ? typeof e < "u" && r.length ? r.every(e) : !0 : !1;
}
function Xs(r) {
  return Object.getPrototypeOf(r) === Object.prototype && Object.keys(r).length;
}
function zt(r) {
  return typeof r > "u";
}
function bt(r, e) {
  return e && zt(r) ? !0 : typeof r == "string" && !!r.trim().length;
}
function af(r, e) {
  return e && zt(r) ? !0 : typeof r == "number" && !isNaN(r);
}
function hm(r, e) {
  const { requiredNamespaces: t } = e, i = Object.keys(r.namespaces), n = Object.keys(t);
  let s = !0;
  return Ui(n, i) ? (i.forEach((o) => {
    const { accounts: f, methods: h, events: d } = r.namespaces[o], v = In(f), w = t[o];
    (!Ui(tf(o, w), v) || !Ui(w.methods, h) || !Ui(w.events, d)) && (s = !1);
  }), s) : !1;
}
function Zs(r) {
  return bt(r, !1) && r.includes(":") ? r.split(":").length === 2 : !1;
}
function um(r) {
  if (bt(r, !1) && r.includes(":")) {
    const e = r.split(":");
    if (e.length === 3) {
      const t = e[0] + ":" + e[1];
      return !!e[2] && Zs(t);
    }
  }
  return !1;
}
function dm(r) {
  function e(t) {
    try {
      return typeof new URL(t) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (bt(r, !1)) {
      if (e(r))
        return !0;
      const t = od(r);
      return e(t);
    }
  } catch {
  }
  return !1;
}
function lm(r) {
  var e;
  return (e = r?.proposer) == null ? void 0 : e.publicKey;
}
function pm(r) {
  return r?.topic;
}
function vm(r, e) {
  let t = null;
  return bt(r?.publicKey, !1) || (t = ae("MISSING_OR_INVALID", `${e} controller public key should be a string`)), t;
}
function jc(r) {
  let e = !0;
  return Sa(r) ? r.length && (e = r.every((t) => bt(t, !1))) : e = !1, e;
}
function bm(r, e, t) {
  let i = null;
  return Sa(e) && e.length ? e.forEach((n) => {
    i || Zs(n) || (i = st("UNSUPPORTED_CHAINS", `${t}, chain ${n} should be a string and conform to "namespace:chainId" format`));
  }) : Zs(r) || (i = st("UNSUPPORTED_CHAINS", `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), i;
}
function gm(r, e, t) {
  let i = null;
  return Object.entries(r).forEach(([n, s]) => {
    if (i)
      return;
    const o = bm(n, tf(n, s), `${e} ${t}`);
    o && (i = o);
  }), i;
}
function ym(r, e) {
  let t = null;
  return Sa(r) ? r.forEach((i) => {
    t || um(i) || (t = st("UNSUPPORTED_ACCOUNTS", `${e}, account ${i} should be a string and conform to "namespace:chainId:address" format`));
  }) : t = st("UNSUPPORTED_ACCOUNTS", `${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function mm(r, e) {
  let t = null;
  return Object.values(r).forEach((i) => {
    if (t)
      return;
    const n = ym(i?.accounts, `${e} namespace`);
    n && (t = n);
  }), t;
}
function wm(r, e) {
  let t = null;
  return jc(r?.methods) ? jc(r?.events) || (t = st("UNSUPPORTED_EVENTS", `${e}, events should be an array of strings or empty array for no events`)) : t = st("UNSUPPORTED_METHODS", `${e}, methods should be an array of strings or empty array for no methods`), t;
}
function vd(r, e) {
  let t = null;
  return Object.values(r).forEach((i) => {
    if (t)
      return;
    const n = wm(i, `${e}, namespace`);
    n && (t = n);
  }), t;
}
function _m(r, e, t) {
  let i = null;
  if (r && Xs(r)) {
    const n = vd(r, e);
    n && (i = n);
    const s = gm(r, e, t);
    s && (i = s);
  } else
    i = ae("MISSING_OR_INVALID", `${e}, ${t} should be an object with data`);
  return i;
}
function eo(r, e) {
  let t = null;
  if (r && Xs(r)) {
    const i = vd(r, e);
    i && (t = i);
    const n = mm(r, e);
    n && (t = n);
  } else
    t = ae("MISSING_OR_INVALID", `${e}, namespaces should be an object with data`);
  return t;
}
function bd(r) {
  return bt(r.protocol, !0);
}
function xm(r, e) {
  let t = !1;
  return e && !r ? t = !0 : r && Sa(r) && r.length && r.forEach((i) => {
    t = bd(i);
  }), t;
}
function Em(r) {
  return typeof r == "number";
}
function Gt(r) {
  return typeof r < "u" && typeof r !== null;
}
function Sm(r) {
  return !(!r || typeof r != "object" || !r.code || !af(r.code, !1) || !r.message || !bt(r.message, !1));
}
function Mm(r) {
  return !(zt(r) || !bt(r.method, !1));
}
function Im(r) {
  return !(zt(r) || zt(r.result) && zt(r.error) || !af(r.id, !1) || !bt(r.jsonrpc, !1));
}
function Am(r) {
  return !(zt(r) || !bt(r.name, !1));
}
function Kc(r, e) {
  return !(!Zs(e) || !nm(r).includes(e));
}
function Dm(r, e, t) {
  return bt(t, !1) ? sm(r, e).includes(t) : !1;
}
function Pm(r, e, t) {
  return bt(t, !1) ? am(r, e).includes(t) : !1;
}
function Hc(r, e, t) {
  let i = null;
  const n = Om(r), s = Rm(e), o = Object.keys(n), f = Object.keys(s), h = Vc(Object.keys(r)), d = Vc(Object.keys(e)), v = h.filter((w) => !d.includes(w));
  return v.length && (i = ae("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${v.toString()}
      Received: ${Object.keys(e).toString()}`)), Ui(o, f) || (i = ae("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${f.toString()}`)), Object.keys(e).forEach((w) => {
    if (!w.includes(":") || i)
      return;
    const A = In(e[w].accounts);
    A.includes(w) || (i = ae("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${w}
        Required: ${w}
        Approved: ${A.toString()}`));
  }), o.forEach((w) => {
    i || (Ui(n[w].methods, s[w].methods) ? Ui(n[w].events, s[w].events) || (i = ae("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${w}`)) : i = ae("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${w}`));
  }), i;
}
function Om(r) {
  const e = {};
  return Object.keys(r).forEach((t) => {
    var i;
    t.includes(":") ? e[t] = r[t] : (i = r[t].chains) == null || i.forEach((n) => {
      e[n] = { methods: r[t].methods, events: r[t].events };
    });
  }), e;
}
function Vc(r) {
  return [...new Set(r.map((e) => e.includes(":") ? e.split(":")[0] : e))];
}
function Rm(r) {
  const e = {};
  return Object.keys(r).forEach((t) => {
    t.includes(":") ? e[t] = r[t] : In(r[t].accounts)?.forEach((n) => {
      e[n] = { accounts: r[t].accounts.filter((s) => s.includes(`${n}:`)), methods: r[t].methods, events: r[t].events };
    });
  }), e;
}
function Nm(r, e) {
  return af(r, !1) && r <= e.max && r >= e.min;
}
function Wc() {
  const r = hs();
  return new Promise((e) => {
    switch (r) {
      case rr.browser:
        e(Tm());
        break;
      case rr.reactNative:
        e(Cm());
        break;
      case rr.node:
        e($m());
        break;
      default:
        e(!0);
    }
  });
}
function Tm() {
  return cs() && navigator?.onLine;
}
async function Cm() {
  return Ai() && typeof global < "u" && global != null && global.NetInfo ? (await (global == null ? void 0 : global.NetInfo.fetch()))?.isConnected : !0;
}
function $m() {
  return !0;
}
function Lm(r) {
  switch (hs()) {
    case rr.browser:
      Fm(r);
      break;
    case rr.reactNative:
      qm(r);
      break;
  }
}
function Fm(r) {
  !Ai() && cs() && (window.addEventListener("online", () => r(!0)), window.addEventListener("offline", () => r(!1)));
}
function qm(r) {
  Ai() && typeof global < "u" && global != null && global.NetInfo && global?.NetInfo.addEventListener((e) => r(e?.isConnected));
}
const to = {};
class Fn {
  static get(e) {
    return to[e];
  }
  static set(e, t) {
    to[e] = t;
  }
  static delete(e) {
    delete to[e];
  }
}
const Um = "PARSE_ERROR", zm = "INVALID_REQUEST", Bm = "METHOD_NOT_FOUND", km = "INVALID_PARAMS", gd = "INTERNAL_ERROR", of = "SERVER_ERROR", jm = [-32700, -32600, -32601, -32602, -32603], Hn = {
  [Um]: { code: -32700, message: "Parse error" },
  [zm]: { code: -32600, message: "Invalid Request" },
  [Bm]: { code: -32601, message: "Method not found" },
  [km]: { code: -32602, message: "Invalid params" },
  [gd]: { code: -32603, message: "Internal error" },
  [of]: { code: -32e3, message: "Server error" }
}, yd = of;
function Km(r) {
  return jm.includes(r);
}
function Gc(r) {
  return Object.keys(Hn).includes(r) ? Hn[r] : Hn[yd];
}
function Hm(r) {
  const e = Object.values(Hn).find((t) => t.code === r);
  return e || Hn[yd];
}
function Vm(r, e, t) {
  return r.message.includes("getaddrinfo ENOTFOUND") || r.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${t} RPC url at ${e}`) : r;
}
var md = {}, ii = {}, Jc;
function Wm() {
  if (Jc)
    return ii;
  Jc = 1, Object.defineProperty(ii, "__esModule", { value: !0 }), ii.isBrowserCryptoAvailable = ii.getSubtleCrypto = ii.getBrowerCrypto = void 0;
  function r() {
    return (_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c === null || _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c === void 0 ? void 0 : _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c.crypto) || (_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c === null || _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c === void 0 ? void 0 : _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c.msCrypto) || {};
  }
  ii.getBrowerCrypto = r;
  function e() {
    const i = r();
    return i.subtle || i.webkitSubtle;
  }
  ii.getSubtleCrypto = e;
  function t() {
    return !!r() && !!e();
  }
  return ii.isBrowserCryptoAvailable = t, ii;
}
var ni = {}, Yc;
function Gm() {
  if (Yc)
    return ni;
  Yc = 1, Object.defineProperty(ni, "__esModule", { value: !0 }), ni.isBrowser = ni.isNode = ni.isReactNative = void 0;
  function r() {
    return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative";
  }
  ni.isReactNative = r;
  function e() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
  }
  ni.isNode = e;
  function t() {
    return !r() && !e();
  }
  return ni.isBrowser = t, ni;
}
(function(r) {
  Object.defineProperty(r, "__esModule", { value: !0 });
  const e = Qn;
  e.__exportStar(Wm(), r), e.__exportStar(Gm(), r);
})(md);
function oi(r = 3) {
  const e = Date.now() * Math.pow(10, r), t = Math.floor(Math.random() * Math.pow(10, r));
  return e + t;
}
function zi(r = 6) {
  return BigInt(oi(r));
}
function Bi(r, e, t) {
  return {
    id: t || oi(),
    jsonrpc: "2.0",
    method: r,
    params: e
  };
}
function Ma(r, e) {
  return {
    id: r,
    jsonrpc: "2.0",
    result: e
  };
}
function Ia(r, e, t) {
  return {
    id: r,
    jsonrpc: "2.0",
    error: Jm(e, t)
  };
}
function Jm(r, e) {
  return typeof r > "u" ? Gc(gd) : (typeof r == "string" && (r = Object.assign(Object.assign({}, Gc(of)), { message: r })), typeof e < "u" && (r.data = e), Km(r.code) && (r = Hm(r.code)), r);
}
class wd {
}
let Ym = class extends wd {
  constructor(e) {
    super();
  }
};
class Xm extends wd {
  constructor() {
    super();
  }
}
let Zm = class extends Xm {
  constructor(e) {
    super();
  }
};
const Qm = "^wss?:";
function e3(r) {
  const e = r.match(new RegExp(/^\w+:/, "gi"));
  if (!(!e || !e.length))
    return e[0];
}
function t3(r, e) {
  const t = e3(r);
  return typeof t > "u" ? !1 : new RegExp(e).test(t);
}
function Xc(r) {
  return t3(r, Qm);
}
function r3(r) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(r);
}
function _d(r) {
  return typeof r == "object" && "id" in r && "jsonrpc" in r && r.jsonrpc === "2.0";
}
function ff(r) {
  return _d(r) && "method" in r;
}
function Aa(r) {
  return _d(r) && (Rr(r) || dr(r));
}
function Rr(r) {
  return "result" in r;
}
function dr(r) {
  return "error" in r;
}
class xd extends Zm {
  constructor(e) {
    super(e), this.events = new ir.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(e), this.connection.connected && this.registerEventListeners();
  }
  async connect(e = this.connection) {
    await this.open(e);
  }
  async disconnect() {
    await this.close();
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async request(e, t) {
    return this.requestStrict(Bi(e.method, e.params || [], e.id || zi().toString()), t);
  }
  async requestStrict(e, t) {
    return new Promise(async (i, n) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (s) {
          n(s);
        }
      this.events.on(`${e.id}`, (s) => {
        dr(s) ? n(s.error) : i(s.result);
      });
      try {
        await this.connection.send(e, t);
      } catch (s) {
        n(s);
      }
    });
  }
  setConnection(e = this.connection) {
    return e;
  }
  onPayload(e) {
    this.events.emit("payload", e), Aa(e) ? this.events.emit(`${e.id}`, e) : this.events.emit("message", { type: e.method, data: e.params });
  }
  onClose(e) {
    e && e.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${e.code} ${e.reason ? `(${e.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(e = this.connection) {
    this.connection === e && this.connection.connected || (this.connection.connected && this.close(), typeof e == "string" && (await this.connection.open(e), e = this.connection), this.connection = this.setConnection(e), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (e) => this.onPayload(e)), this.connection.on("close", (e) => this.onClose(e)), this.connection.on("error", (e) => this.events.emit("error", e)), this.connection.on("register_error", (e) => this.onClose()), this.hasRegisteredEventListeners = !0);
  }
}
const i3 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), n3 = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Zc = (r) => r.split("?")[0], Qc = 10, s3 = i3();
class a3 {
  constructor(e) {
    if (this.url = e, this.events = new ir.EventEmitter(), this.registering = !1, !Xc(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (i) => {
        this.onClose(i), e();
      }, this.socket.close();
    });
  }
  async send(e) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(ji(e));
    } catch (t) {
      this.onError(e.id, t);
    }
  }
  register(e = this.url) {
    if (!Xc(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((i, n) => {
        this.events.once("register_error", (s) => {
          this.resetMaxListeners(), n(s);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return n(new Error("WebSocket connection is missing or invalid"));
          i(this.socket);
        });
      });
    }
    return this.url = e, this.registering = !0, new Promise((t, i) => {
      const n = md.isReactNative() ? void 0 : { rejectUnauthorized: !r3(e) }, s = new s3(e, [], n);
      n3() ? s.onerror = (o) => {
        const f = o;
        i(this.emitError(f.error));
      } : s.on("error", (o) => {
        i(this.emitError(o));
      }), s.onopen = () => {
        this.onOpen(s), t(s);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (t) => this.onPayload(t), e.onclose = (t) => this.onClose(t), this.socket = e, this.registering = !1, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = !1, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u")
      return;
    const t = typeof e.data == "string" ? un(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const i = this.parseError(t), n = i.message || i.toString(), s = Ia(e, n);
    this.events.emit("payload", s);
  }
  parseError(e, t = this.url) {
    return Vm(e, Zc(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Qc && this.events.setMaxListeners(Qc);
  }
  emitError(e) {
    const t = this.parseError(new Error(e?.message || `WebSocket connection failed for host: ${Zc(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
}
var Qs = { exports: {} };
Qs.exports;
(function(r, e) {
  var t = 200, i = "__lodash_hash_undefined__", n = 1, s = 2, o = 9007199254740991, f = "[object Arguments]", h = "[object Array]", d = "[object AsyncFunction]", v = "[object Boolean]", w = "[object Date]", A = "[object Error]", I = "[object Function]", D = "[object GeneratorFunction]", N = "[object Map]", k = "[object Number]", j = "[object Null]", T = "[object Object]", K = "[object Promise]", $ = "[object Proxy]", z = "[object RegExp]", B = "[object Set]", _ = "[object String]", R = "[object Symbol]", J = "[object Undefined]", Q = "[object WeakMap]", O = "[object ArrayBuffer]", p = "[object DataView]", l = "[object Float32Array]", a = "[object Float64Array]", c = "[object Int8Array]", b = "[object Int16Array]", E = "[object Int32Array]", S = "[object Uint8Array]", x = "[object Uint8ClampedArray]", u = "[object Uint16Array]", m = "[object Uint32Array]", g = /[\\^$.*+?()[\]{}|]/g, P = /^\[object .+?Constructor\]$/, G = /^(?:0|[1-9]\d*)$/, M = {};
  M[l] = M[a] = M[c] = M[b] = M[E] = M[S] = M[x] = M[u] = M[m] = !0, M[f] = M[h] = M[O] = M[v] = M[p] = M[w] = M[A] = M[I] = M[N] = M[k] = M[T] = M[z] = M[B] = M[_] = M[Q] = !1;
  var H = typeof _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c == "object" && _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c && _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c.Object === Object && _lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.c, C = typeof self == "object" && self && self.Object === Object && self, q = H || C || Function("return this")(), L = e && !e.nodeType && e, y = L && !0 && r && !r.nodeType && r, F = y && y.exports === L, W = F && H.process, Y = function() {
    try {
      return W && W.binding && W.binding("util");
    } catch {
    }
  }(), X = Y && Y.isTypedArray;
  function ee(U, V) {
    for (var Z = -1, be = U == null ? 0 : U.length, ct = 0, We = []; ++Z < be; ) {
      var dt = U[Z];
      V(dt, Z, U) && (We[ct++] = dt);
    }
    return We;
  }
  function we(U, V) {
    for (var Z = -1, be = V.length, ct = U.length; ++Z < be; )
      U[ct + Z] = V[Z];
    return U;
  }
  function Me(U, V) {
    for (var Z = -1, be = U == null ? 0 : U.length; ++Z < be; )
      if (V(U[Z], Z, U))
        return !0;
    return !1;
  }
  function he(U, V) {
    for (var Z = -1, be = Array(U); ++Z < U; )
      be[Z] = V(Z);
    return be;
  }
  function Re(U) {
    return function(V) {
      return U(V);
    };
  }
  function xe(U, V) {
    return U.has(V);
  }
  function se(U, V) {
    return U?.[V];
  }
  function ge(U) {
    var V = -1, Z = Array(U.size);
    return U.forEach(function(be, ct) {
      Z[++V] = [ct, be];
    }), Z;
  }
  function le(U, V) {
    return function(Z) {
      return U(V(Z));
    };
  }
  function ne(U) {
    var V = -1, Z = Array(U.size);
    return U.forEach(function(be) {
      Z[++V] = be;
    }), Z;
  }
  var ue = Array.prototype, fe = Function.prototype, te = Object.prototype, pe = q["__core-js_shared__"], _e = fe.toString, re = te.hasOwnProperty, Ee = function() {
    var U = /[^.]+$/.exec(pe && pe.keys && pe.keys.IE_PROTO || "");
    return U ? "Symbol(src)_1." + U : "";
  }(), Se = te.toString, oe = RegExp(
    "^" + _e.call(re).replace(g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), De = F ? q.Buffer : void 0, Ie = q.Symbol, Pe = q.Uint8Array, Ge = te.propertyIsEnumerable, Ye = ue.splice, Ae = Ie ? Ie.toStringTag : void 0, Ze = Object.getOwnPropertySymbols, et = De ? De.isBuffer : void 0, Ne = le(Object.keys, Object), Ce = en(q, "DataView"), Te = en(q, "Map"), de = en(q, "Promise"), $e = en(q, "Set"), Le = en(q, "WeakMap"), ce = en(Object, "create"), Ue = Di(Ce), ze = Di(Te), ye = Di(de), Be = Di($e), ke = Di(Le), ve = Ie ? Ie.prototype : void 0, Fe = ve ? ve.valueOf : void 0;
  function Oe(U) {
    var V = -1, Z = U == null ? 0 : U.length;
    for (this.clear(); ++V < Z; ) {
      var be = U[V];
      this.set(be[0], be[1]);
    }
  }
  function me() {
    this.__data__ = ce ? ce(null) : {}, this.size = 0;
  }
  function je(U) {
    var V = this.has(U) && delete this.__data__[U];
    return this.size -= V ? 1 : 0, V;
  }
  function rt(U) {
    var V = this.__data__;
    if (ce) {
      var Z = V[U];
      return Z === i ? void 0 : Z;
    }
    return re.call(V, U) ? V[U] : void 0;
  }
  function qe(U) {
    var V = this.__data__;
    return ce ? V[U] !== void 0 : re.call(V, U);
  }
  function it(U, V) {
    var Z = this.__data__;
    return this.size += this.has(U) ? 0 : 1, Z[U] = ce && V === void 0 ? i : V, this;
  }
  Oe.prototype.clear = me, Oe.prototype.delete = je, Oe.prototype.get = rt, Oe.prototype.has = qe, Oe.prototype.set = it;
  function Je(U) {
    var V = -1, Z = U == null ? 0 : U.length;
    for (this.clear(); ++V < Z; ) {
      var be = U[V];
      this.set(be[0], be[1]);
    }
  }
  function tt() {
    this.__data__ = [], this.size = 0;
  }
  function jt(U) {
    var V = this.__data__, Z = ps(V, U);
    if (Z < 0)
      return !1;
    var be = V.length - 1;
    return Z == be ? V.pop() : Ye.call(V, Z, 1), --this.size, !0;
  }
  function Kt(U) {
    var V = this.__data__, Z = ps(V, U);
    return Z < 0 ? void 0 : V[Z][1];
  }
  function Ht(U) {
    return ps(this.__data__, U) > -1;
  }
  function Vt(U, V) {
    var Z = this.__data__, be = ps(Z, U);
    return be < 0 ? (++this.size, Z.push([U, V])) : Z[be][1] = V, this;
  }
  Je.prototype.clear = tt, Je.prototype.delete = jt, Je.prototype.get = Kt, Je.prototype.has = Ht, Je.prototype.set = Vt;
  function gt(U) {
    var V = -1, Z = U == null ? 0 : U.length;
    for (this.clear(); ++V < Z; ) {
      var be = U[V];
      this.set(be[0], be[1]);
    }
  }
  function Vr() {
    this.size = 0, this.__data__ = {
      hash: new Oe(),
      map: new (Te || Je)(),
      string: new Oe()
    };
  }
  function Wr(U) {
    var V = vs(this, U).delete(U);
    return this.size -= V ? 1 : 0, V;
  }
  function Gr(U) {
    return vs(this, U).get(U);
  }
  function Jr(U) {
    return vs(this, U).has(U);
  }
  function Yr(U, V) {
    var Z = vs(this, U), be = Z.size;
    return Z.set(U, V), this.size += Z.size == be ? 0 : 1, this;
  }
  gt.prototype.clear = Vr, gt.prototype.delete = Wr, gt.prototype.get = Gr, gt.prototype.has = Jr, gt.prototype.set = Yr;
  function or(U) {
    var V = -1, Z = U == null ? 0 : U.length;
    for (this.__data__ = new gt(); ++V < Z; )
      this.add(U[V]);
  }
  function Xr(U) {
    return this.__data__.set(U, i), this;
  }
  function Zr(U) {
    return this.__data__.has(U);
  }
  or.prototype.add = or.prototype.push = Xr, or.prototype.has = Zr;
  function $t(U) {
    var V = this.__data__ = new Je(U);
    this.size = V.size;
  }
  function Qr() {
    this.__data__ = new Je(), this.size = 0;
  }
  function ei(U) {
    var V = this.__data__, Z = V.delete(U);
    return this.size = V.size, Z;
  }
  function ti(U) {
    return this.__data__.get(U);
  }
  function An(U) {
    return this.__data__.has(U);
  }
  function Dn(U, V) {
    var Z = this.__data__;
    if (Z instanceof Je) {
      var be = Z.__data__;
      if (!Te || be.length < t - 1)
        return be.push([U, V]), this.size = ++Z.size, this;
      Z = this.__data__ = new gt(be);
    }
    return Z.set(U, V), this.size = Z.size, this;
  }
  $t.prototype.clear = Qr, $t.prototype.delete = ei, $t.prototype.get = ti, $t.prototype.has = An, $t.prototype.set = Dn;
  function kd(U, V) {
    var Z = bs(U), be = !Z && il(U), ct = !Z && !be && Ra(U), We = !Z && !be && !ct && yf(U), dt = Z || be || ct || We, wt = dt ? he(U.length, String) : [], Ot = wt.length;
    for (var ut in U)
      (V || re.call(U, ut)) && !(dt && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ut == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ct && (ut == "offset" || ut == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      We && (ut == "buffer" || ut == "byteLength" || ut == "byteOffset") || // Skip index properties.
      Zd(ut, Ot))) && wt.push(ut);
    return wt;
  }
  function ps(U, V) {
    for (var Z = U.length; Z--; )
      if (pf(U[Z][0], V))
        return Z;
    return -1;
  }
  function jd(U, V, Z) {
    var be = V(U);
    return bs(U) ? be : we(be, Z(U));
  }
  function Pn(U) {
    return U == null ? U === void 0 ? J : j : Ae && Ae in Object(U) ? Yd(U) : rl(U);
  }
  function hf(U) {
    return On(U) && Pn(U) == f;
  }
  function uf(U, V, Z, be, ct) {
    return U === V ? !0 : U == null || V == null || !On(U) && !On(V) ? U !== U && V !== V : Kd(U, V, Z, be, uf, ct);
  }
  function Kd(U, V, Z, be, ct, We) {
    var dt = bs(U), wt = bs(V), Ot = dt ? h : pi(U), ut = wt ? h : pi(V);
    Ot = Ot == f ? T : Ot, ut = ut == f ? T : ut;
    var Qt = Ot == T, mr = ut == T, Lt = Ot == ut;
    if (Lt && Ra(U)) {
      if (!Ra(V))
        return !1;
      dt = !0, Qt = !1;
    }
    if (Lt && !Qt)
      return We || (We = new $t()), dt || yf(U) ? df(U, V, Z, be, ct, We) : Gd(U, V, Ot, Z, be, ct, We);
    if (!(Z & n)) {
      var fr = Qt && re.call(U, "__wrapped__"), cr = mr && re.call(V, "__wrapped__");
      if (fr || cr) {
        var vi = fr ? U.value() : U, ri = cr ? V.value() : V;
        return We || (We = new $t()), ct(vi, ri, Z, be, We);
      }
    }
    return Lt ? (We || (We = new $t()), Jd(U, V, Z, be, ct, We)) : !1;
  }
  function Hd(U) {
    if (!gf(U) || el(U))
      return !1;
    var V = vf(U) ? oe : P;
    return V.test(Di(U));
  }
  function Vd(U) {
    return On(U) && bf(U.length) && !!M[Pn(U)];
  }
  function Wd(U) {
    if (!tl(U))
      return Ne(U);
    var V = [];
    for (var Z in Object(U))
      re.call(U, Z) && Z != "constructor" && V.push(Z);
    return V;
  }
  function df(U, V, Z, be, ct, We) {
    var dt = Z & n, wt = U.length, Ot = V.length;
    if (wt != Ot && !(dt && Ot > wt))
      return !1;
    var ut = We.get(U);
    if (ut && We.get(V))
      return ut == V;
    var Qt = -1, mr = !0, Lt = Z & s ? new or() : void 0;
    for (We.set(U, V), We.set(V, U); ++Qt < wt; ) {
      var fr = U[Qt], cr = V[Qt];
      if (be)
        var vi = dt ? be(cr, fr, Qt, V, U, We) : be(fr, cr, Qt, U, V, We);
      if (vi !== void 0) {
        if (vi)
          continue;
        mr = !1;
        break;
      }
      if (Lt) {
        if (!Me(V, function(ri, Pi) {
          if (!xe(Lt, Pi) && (fr === ri || ct(fr, ri, Z, be, We)))
            return Lt.push(Pi);
        })) {
          mr = !1;
          break;
        }
      } else if (!(fr === cr || ct(fr, cr, Z, be, We))) {
        mr = !1;
        break;
      }
    }
    return We.delete(U), We.delete(V), mr;
  }
  function Gd(U, V, Z, be, ct, We, dt) {
    switch (Z) {
      case p:
        if (U.byteLength != V.byteLength || U.byteOffset != V.byteOffset)
          return !1;
        U = U.buffer, V = V.buffer;
      case O:
        return !(U.byteLength != V.byteLength || !We(new Pe(U), new Pe(V)));
      case v:
      case w:
      case k:
        return pf(+U, +V);
      case A:
        return U.name == V.name && U.message == V.message;
      case z:
      case _:
        return U == V + "";
      case N:
        var wt = ge;
      case B:
        var Ot = be & n;
        if (wt || (wt = ne), U.size != V.size && !Ot)
          return !1;
        var ut = dt.get(U);
        if (ut)
          return ut == V;
        be |= s, dt.set(U, V);
        var Qt = df(wt(U), wt(V), be, ct, We, dt);
        return dt.delete(U), Qt;
      case R:
        if (Fe)
          return Fe.call(U) == Fe.call(V);
    }
    return !1;
  }
  function Jd(U, V, Z, be, ct, We) {
    var dt = Z & n, wt = lf(U), Ot = wt.length, ut = lf(V), Qt = ut.length;
    if (Ot != Qt && !dt)
      return !1;
    for (var mr = Ot; mr--; ) {
      var Lt = wt[mr];
      if (!(dt ? Lt in V : re.call(V, Lt)))
        return !1;
    }
    var fr = We.get(U);
    if (fr && We.get(V))
      return fr == V;
    var cr = !0;
    We.set(U, V), We.set(V, U);
    for (var vi = dt; ++mr < Ot; ) {
      Lt = wt[mr];
      var ri = U[Lt], Pi = V[Lt];
      if (be)
        var mf = dt ? be(Pi, ri, Lt, V, U, We) : be(ri, Pi, Lt, U, V, We);
      if (!(mf === void 0 ? ri === Pi || ct(ri, Pi, Z, be, We) : mf)) {
        cr = !1;
        break;
      }
      vi || (vi = Lt == "constructor");
    }
    if (cr && !vi) {
      var gs = U.constructor, ys = V.constructor;
      gs != ys && "constructor" in U && "constructor" in V && !(typeof gs == "function" && gs instanceof gs && typeof ys == "function" && ys instanceof ys) && (cr = !1);
    }
    return We.delete(U), We.delete(V), cr;
  }
  function lf(U) {
    return jd(U, al, Xd);
  }
  function vs(U, V) {
    var Z = U.__data__;
    return Qd(V) ? Z[typeof V == "string" ? "string" : "hash"] : Z.map;
  }
  function en(U, V) {
    var Z = se(U, V);
    return Hd(Z) ? Z : void 0;
  }
  function Yd(U) {
    var V = re.call(U, Ae), Z = U[Ae];
    try {
      U[Ae] = void 0;
      var be = !0;
    } catch {
    }
    var ct = Se.call(U);
    return be && (V ? U[Ae] = Z : delete U[Ae]), ct;
  }
  var Xd = Ze ? function(U) {
    return U == null ? [] : (U = Object(U), ee(Ze(U), function(V) {
      return Ge.call(U, V);
    }));
  } : ol, pi = Pn;
  (Ce && pi(new Ce(new ArrayBuffer(1))) != p || Te && pi(new Te()) != N || de && pi(de.resolve()) != K || $e && pi(new $e()) != B || Le && pi(new Le()) != Q) && (pi = function(U) {
    var V = Pn(U), Z = V == T ? U.constructor : void 0, be = Z ? Di(Z) : "";
    if (be)
      switch (be) {
        case Ue:
          return p;
        case ze:
          return N;
        case ye:
          return K;
        case Be:
          return B;
        case ke:
          return Q;
      }
    return V;
  });
  function Zd(U, V) {
    return V = V ?? o, !!V && (typeof U == "number" || G.test(U)) && U > -1 && U % 1 == 0 && U < V;
  }
  function Qd(U) {
    var V = typeof U;
    return V == "string" || V == "number" || V == "symbol" || V == "boolean" ? U !== "__proto__" : U === null;
  }
  function el(U) {
    return !!Ee && Ee in U;
  }
  function tl(U) {
    var V = U && U.constructor, Z = typeof V == "function" && V.prototype || te;
    return U === Z;
  }
  function rl(U) {
    return Se.call(U);
  }
  function Di(U) {
    if (U != null) {
      try {
        return _e.call(U);
      } catch {
      }
      try {
        return U + "";
      } catch {
      }
    }
    return "";
  }
  function pf(U, V) {
    return U === V || U !== U && V !== V;
  }
  var il = hf(function() {
    return arguments;
  }()) ? hf : function(U) {
    return On(U) && re.call(U, "callee") && !Ge.call(U, "callee");
  }, bs = Array.isArray;
  function nl(U) {
    return U != null && bf(U.length) && !vf(U);
  }
  var Ra = et || fl;
  function sl(U, V) {
    return uf(U, V);
  }
  function vf(U) {
    if (!gf(U))
      return !1;
    var V = Pn(U);
    return V == I || V == D || V == d || V == $;
  }
  function bf(U) {
    return typeof U == "number" && U > -1 && U % 1 == 0 && U <= o;
  }
  function gf(U) {
    var V = typeof U;
    return U != null && (V == "object" || V == "function");
  }
  function On(U) {
    return U != null && typeof U == "object";
  }
  var yf = X ? Re(X) : Vd;
  function al(U) {
    return nl(U) ? kd(U) : Wd(U);
  }
  function ol() {
    return [];
  }
  function fl() {
    return !1;
  }
  r.exports = sl;
})(Qs, Qs.exports);
var o3 = Qs.exports;
const f3 = /* @__PURE__ */ (0,_lastConnected_e9351912_js__WEBPACK_IMPORTED_MODULE_0__.d)(o3), Ed = "wc", Sd = 2, ea = "core", jr = `${Ed}@2:${ea}:`, c3 = { name: ea, logger: "error" }, h3 = { database: ":memory:" }, u3 = "crypto", eh = "client_ed25519_seed", d3 = ie.ONE_DAY, l3 = "keychain", p3 = "0.3", v3 = "messages", b3 = "0.3", th = ie.SIX_HOURS, g3 = "publisher", Md = "irn", y3 = "error", Id = "wss://relay.walletconnect.org", m3 = "relayer", Et = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, w3 = "_subscription", hr = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, _3 = 0.1, Do = "2.17.3", at = { link_mode: "link_mode", relay: "relay" }, x3 = "0.3", E3 = "WALLETCONNECT_CLIENT_ID", rh = "WALLETCONNECT_LINK_MODE_APPS", er = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, S3 = "subscription", M3 = "0.3", I3 = ie.FIVE_SECONDS * 1e3, A3 = "pairing", D3 = "0.3", qn = { wc_pairingDelete: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: ie.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 0 } } }, qi = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, _r = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, P3 = "history", O3 = "0.3", R3 = "expirer", ur = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, N3 = "0.3", T3 = "verify-api", C3 = "https://verify.walletconnect.com", Ad = "https://verify.walletconnect.org", Vn = Ad, $3 = `${Vn}/v3`, L3 = [C3, Ad], F3 = "echo", q3 = "https://echo.walletconnect.com", Or = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, ai = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, xr = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, Ti = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, Ci = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" }, Un = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, U3 = 0.1, z3 = "event-client", B3 = 86400, k3 = "https://pulse.walletconnect.org/batch";
function j3(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i = 0; i < t.length; i++)
    t[i] = 255;
  for (var n = 0; n < r.length; n++) {
    var s = r.charAt(n), o = s.charCodeAt(0);
    if (t[o] !== 255)
      throw new TypeError(s + " is ambiguous");
    t[o] = n;
  }
  var f = r.length, h = r.charAt(0), d = Math.log(f) / Math.log(256), v = Math.log(256) / Math.log(f);
  function w(D) {
    if (D instanceof Uint8Array || (ArrayBuffer.isView(D) ? D = new Uint8Array(D.buffer, D.byteOffset, D.byteLength) : Array.isArray(D) && (D = Uint8Array.from(D))), !(D instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (D.length === 0)
      return "";
    for (var N = 0, k = 0, j = 0, T = D.length; j !== T && D[j] === 0; )
      j++, N++;
    for (var K = (T - j) * v + 1 >>> 0, $ = new Uint8Array(K); j !== T; ) {
      for (var z = D[j], B = 0, _ = K - 1; (z !== 0 || B < k) && _ !== -1; _--, B++)
        z += 256 * $[_] >>> 0, $[_] = z % f >>> 0, z = z / f >>> 0;
      if (z !== 0)
        throw new Error("Non-zero carry");
      k = B, j++;
    }
    for (var R = K - k; R !== K && $[R] === 0; )
      R++;
    for (var J = h.repeat(N); R < K; ++R)
      J += r.charAt($[R]);
    return J;
  }
  function A(D) {
    if (typeof D != "string")
      throw new TypeError("Expected String");
    if (D.length === 0)
      return new Uint8Array();
    var N = 0;
    if (D[N] !== " ") {
      for (var k = 0, j = 0; D[N] === h; )
        k++, N++;
      for (var T = (D.length - N) * d + 1 >>> 0, K = new Uint8Array(T); D[N]; ) {
        var $ = t[D.charCodeAt(N)];
        if ($ === 255)
          return;
        for (var z = 0, B = T - 1; ($ !== 0 || z < j) && B !== -1; B--, z++)
          $ += f * K[B] >>> 0, K[B] = $ % 256 >>> 0, $ = $ / 256 >>> 0;
        if ($ !== 0)
          throw new Error("Non-zero carry");
        j = z, N++;
      }
      if (D[N] !== " ") {
        for (var _ = T - j; _ !== T && K[_] === 0; )
          _++;
        for (var R = new Uint8Array(k + (T - _)), J = k; _ !== T; )
          R[J++] = K[_++];
        return R;
      }
    }
  }
  function I(D) {
    var N = A(D);
    if (N)
      return N;
    throw new Error(`Non-${e} character`);
  }
  return { encode: w, decodeUnsafe: A, decode: I };
}
var K3 = j3, H3 = K3;
const Dd = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
}, V3 = (r) => new TextEncoder().encode(r), W3 = (r) => new TextDecoder().decode(r);
class G3 {
  constructor(e, t, i) {
    this.name = e, this.prefix = t, this.baseEncode = i;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class J3 {
  constructor(e, t, i) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Pd(this, e);
  }
}
class Y3 {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Pd(this, e);
  }
  decode(e) {
    const t = e[0], i = this.decoders[t];
    if (i)
      return i.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const Pd = (r, e) => new Y3({ ...r.decoders || { [r.prefix]: r }, ...e.decoders || { [e.prefix]: e } });
class X3 {
  constructor(e, t, i, n) {
    this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = n, this.encoder = new G3(e, t, i), this.decoder = new J3(e, t, n);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const Da = ({ name: r, prefix: e, encode: t, decode: i }) => new X3(r, e, t, i), ls = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: i, decode: n } = H3(t, e);
  return Da({ prefix: r, name: e, encode: i, decode: (s) => Dd(n(s)) });
}, Z3 = (r, e, t, i) => {
  const n = {};
  for (let v = 0; v < e.length; ++v)
    n[e[v]] = v;
  let s = r.length;
  for (; r[s - 1] === "="; )
    --s;
  const o = new Uint8Array(s * t / 8 | 0);
  let f = 0, h = 0, d = 0;
  for (let v = 0; v < s; ++v) {
    const w = n[r[v]];
    if (w === void 0)
      throw new SyntaxError(`Non-${i} character`);
    h = h << t | w, f += t, f >= 8 && (f -= 8, o[d++] = 255 & h >> f);
  }
  if (f >= t || 255 & h << 8 - f)
    throw new SyntaxError("Unexpected end of data");
  return o;
}, Q3 = (r, e, t) => {
  const i = e[e.length - 1] === "=", n = (1 << t) - 1;
  let s = "", o = 0, f = 0;
  for (let h = 0; h < r.length; ++h)
    for (f = f << 8 | r[h], o += 8; o > t; )
      o -= t, s += e[n & f >> o];
  if (o && (s += e[n & f << t - o]), i)
    for (; s.length * t & 7; )
      s += "=";
  return s;
}, Ct = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) => Da({ prefix: e, name: r, encode(n) {
  return Q3(n, i, t);
}, decode(n) {
  return Z3(n, i, t, r);
} }), e6 = Da({ prefix: "\0", name: "identity", encode: (r) => W3(r), decode: (r) => V3(r) });
var t6 = Object.freeze({ __proto__: null, identity: e6 });
const r6 = Ct({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var i6 = Object.freeze({ __proto__: null, base2: r6 });
const n6 = Ct({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var s6 = Object.freeze({ __proto__: null, base8: n6 });
const a6 = ls({ prefix: "9", name: "base10", alphabet: "0123456789" });
var o6 = Object.freeze({ __proto__: null, base10: a6 });
const f6 = Ct({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), c6 = Ct({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var h6 = Object.freeze({ __proto__: null, base16: f6, base16upper: c6 });
const u6 = Ct({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), d6 = Ct({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), l6 = Ct({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), p6 = Ct({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), v6 = Ct({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), b6 = Ct({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), g6 = Ct({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), y6 = Ct({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), m6 = Ct({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var w6 = Object.freeze({ __proto__: null, base32: u6, base32upper: d6, base32pad: l6, base32padupper: p6, base32hex: v6, base32hexupper: b6, base32hexpad: g6, base32hexpadupper: y6, base32z: m6 });
const _6 = ls({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), x6 = ls({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var E6 = Object.freeze({ __proto__: null, base36: _6, base36upper: x6 });
const S6 = ls({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), M6 = ls({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var I6 = Object.freeze({ __proto__: null, base58btc: S6, base58flickr: M6 });
const A6 = Ct({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), D6 = Ct({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), P6 = Ct({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), O6 = Ct({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var R6 = Object.freeze({ __proto__: null, base64: A6, base64pad: D6, base64url: P6, base64urlpad: O6 });
const Od = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), N6 = Od.reduce((r, e, t) => (r[t] = e, r), []), T6 = Od.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
function C6(r) {
  return r.reduce((e, t) => (e += N6[t], e), "");
}
function $6(r) {
  const e = [];
  for (const t of r) {
    const i = T6[t.codePointAt(0)];
    if (i === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i);
  }
  return new Uint8Array(e);
}
const L6 = Da({ prefix: "🚀", name: "base256emoji", encode: C6, decode: $6 });
var F6 = Object.freeze({ __proto__: null, base256emoji: L6 }), q6 = Rd, ih = 128, U6 = 127, z6 = ~U6, B6 = Math.pow(2, 31);
function Rd(r, e, t) {
  e = e || [], t = t || 0;
  for (var i = t; r >= B6; )
    e[t++] = r & 255 | ih, r /= 128;
  for (; r & z6; )
    e[t++] = r & 255 | ih, r >>>= 7;
  return e[t] = r | 0, Rd.bytes = t - i + 1, e;
}
var k6 = Po, j6 = 128, nh = 127;
function Po(r, i) {
  var t = 0, i = i || 0, n = 0, s = i, o, f = r.length;
  do {
    if (s >= f)
      throw Po.bytes = 0, new RangeError("Could not decode varint");
    o = r[s++], t += n < 28 ? (o & nh) << n : (o & nh) * Math.pow(2, n), n += 7;
  } while (o >= j6);
  return Po.bytes = s - i, t;
}
var K6 = Math.pow(2, 7), H6 = Math.pow(2, 14), V6 = Math.pow(2, 21), W6 = Math.pow(2, 28), G6 = Math.pow(2, 35), J6 = Math.pow(2, 42), Y6 = Math.pow(2, 49), X6 = Math.pow(2, 56), Z6 = Math.pow(2, 63), Q6 = function(r) {
  return r < K6 ? 1 : r < H6 ? 2 : r < V6 ? 3 : r < W6 ? 4 : r < G6 ? 5 : r < J6 ? 6 : r < Y6 ? 7 : r < X6 ? 8 : r < Z6 ? 9 : 10;
}, ew = { encode: q6, decode: k6, encodingLength: Q6 }, Nd = ew;
const sh = (r, e, t = 0) => (Nd.encode(r, e, t), e), ah = (r) => Nd.encodingLength(r), Oo = (r, e) => {
  const t = e.byteLength, i = ah(r), n = i + ah(t), s = new Uint8Array(n + t);
  return sh(r, s, 0), sh(t, s, i), s.set(e, n), new tw(r, t, e, s);
};
class tw {
  constructor(e, t, i, n) {
    this.code = e, this.size = t, this.digest = i, this.bytes = n;
  }
}
const Td = ({ name: r, code: e, encode: t }) => new rw(r, e, t);
class rw {
  constructor(e, t, i) {
    this.name = e, this.code = t, this.encode = i;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? Oo(this.code, t) : t.then((i) => Oo(this.code, i));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const Cd = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e)), iw = Td({ name: "sha2-256", code: 18, encode: Cd("SHA-256") }), nw = Td({ name: "sha2-512", code: 19, encode: Cd("SHA-512") });
var sw = Object.freeze({ __proto__: null, sha256: iw, sha512: nw });
const $d = 0, aw = "identity", Ld = Dd, ow = (r) => Oo($d, Ld(r)), fw = { code: $d, name: aw, encode: Ld, digest: ow };
var cw = Object.freeze({ __proto__: null, identity: fw });
new TextEncoder(), new TextDecoder();
const oh = { ...t6, ...i6, ...s6, ...o6, ...h6, ...w6, ...E6, ...I6, ...R6, ...F6 };
({ ...sw, ...cw });
function hw(r = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(r) : new Uint8Array(r);
}
function Fd(r, e, t, i) {
  return { name: r, prefix: e, encoder: { name: r, prefix: e, encode: t }, decoder: { decode: i } };
}
const fh = Fd("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1))), ro = Fd("ascii", "a", (r) => {
  let e = "a";
  for (let t = 0; t < r.length; t++)
    e += String.fromCharCode(r[t]);
  return e;
}, (r) => {
  r = r.substring(1);
  const e = hw(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return e;
}), uw = { utf8: fh, "utf-8": fh, hex: oh.base16, latin1: ro, ascii: ro, binary: ro, ...oh };
function dw(r, e = "utf8") {
  const t = uw[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(r, "utf8") : t.decoder.decode(`${t.prefix}${r}`);
}
class lw {
  constructor(e, t) {
    this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = l3, this.version = p3, this.initialized = !1, this.storagePrefix = jr, this.init = async () => {
      if (!this.initialized) {
        const i = await this.getKeyChain();
        typeof i < "u" && (this.keychain = i), this.initialized = !0;
      }
    }, this.has = (i) => (this.isInitialized(), this.keychain.has(i)), this.set = async (i, n) => {
      this.isInitialized(), this.keychain.set(i, n), await this.persist();
    }, this.get = (i) => {
      this.isInitialized();
      const n = this.keychain.get(i);
      if (typeof n > "u") {
        const { message: s } = ae("NO_MATCHING_KEY", `${this.name}: ${i}`);
        throw new Error(s);
      }
      return n;
    }, this.del = async (i) => {
      this.isInitialized(), this.keychain.delete(i), await this.persist();
    }, this.core = e, this.logger = kt(t, this.name);
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, id(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? nd(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class pw {
  constructor(e, t, i) {
    this.core = e, this.logger = t, this.name = u3, this.randomSessionIdentifier = Ao(), this.initialized = !1, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }, this.hasKeys = (n) => (this.isInitialized(), this.keychain.has(n)), this.getClientId = async () => {
      this.isInitialized();
      const n = await this.getClientSeed(), s = Hf(n);
      return fu(s.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const n = Fy();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }, this.signJWT = async (n) => {
      this.isInitialized();
      const s = await this.getClientSeed(), o = Hf(s), f = this.randomSessionIdentifier;
      return await ev(f, n, d3, o);
    }, this.generateSharedKey = (n, s, o) => {
      this.isInitialized();
      const f = this.getPrivateKey(n), h = qy(f, s);
      return this.setSymKey(h, o);
    }, this.setSymKey = async (n, s) => {
      this.isInitialized();
      const o = s || Cs(n);
      return await this.keychain.set(o, n), o;
    }, this.deleteKeyPair = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.deleteSymKey = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.encode = async (n, s, o) => {
      this.isInitialized();
      const f = pd(o), h = ji(s);
      if (Lc(f))
        return zy(h, o?.encoding);
      if ($c(f)) {
        const A = f.senderPublicKey, I = f.receiverPublicKey;
        n = await this.generateSharedKey(A, I);
      }
      const d = this.getSymKey(n), { type: v, senderPublicKey: w } = f;
      return Uy({ type: v, symKey: d, message: h, senderPublicKey: w, encoding: o?.encoding });
    }, this.decode = async (n, s, o) => {
      this.isInitialized();
      const f = jy(s, o);
      if (Lc(f)) {
        const h = ky(s, o?.encoding);
        return un(h);
      }
      if ($c(f)) {
        const h = f.receiverPublicKey, d = f.senderPublicKey;
        n = await this.generateSharedKey(h, d);
      }
      try {
        const h = this.getSymKey(n), d = By({ symKey: h, encoded: s, encoding: o?.encoding });
        return un(d);
      } catch (h) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${await this.getClientId()}'`), this.logger.error(h);
      }
    }, this.getPayloadType = (n, s = wi) => {
      const o = Zn({ encoded: n, encoding: s });
      return Vi(o.type);
    }, this.getPayloadSenderPublicKey = (n, s = wi) => {
      const o = Zn({ encoded: n, encoding: s });
      return o.senderPublicKey ? Mt(o.senderPublicKey, Bt) : void 0;
    }, this.core = e, this.logger = kt(t, this.name), this.keychain = i || new lw(this.core, this.logger);
  }
  get context() {
    return Zt(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(eh);
    } catch {
      e = Ao(), await this.keychain.set(eh, e);
    }
    return dw(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class vw extends sp {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = v3, this.version = b3, this.initialized = !1, this.storagePrefix = jr, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i = await this.getRelayerMessages();
          typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
        } finally {
          this.initialized = !0;
        }
      }
    }, this.set = async (i, n) => {
      this.isInitialized();
      const s = fi(n);
      let o = this.messages.get(i);
      return typeof o > "u" && (o = {}), typeof o[s] < "u" || (o[s] = n, this.messages.set(i, o), await this.persist()), s;
    }, this.get = (i) => {
      this.isInitialized();
      let n = this.messages.get(i);
      return typeof n > "u" && (n = {}), n;
    }, this.has = (i, n) => {
      this.isInitialized();
      const s = this.get(i), o = fi(n);
      return typeof s[o] < "u";
    }, this.del = async (i) => {
      this.isInitialized(), this.messages.delete(i), await this.persist();
    }, this.logger = kt(e, this.name), this.core = t;
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, id(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? nd(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
var bw = Object.defineProperty, gw = Object.defineProperties, yw = Object.getOwnPropertyDescriptors, ch = Object.getOwnPropertySymbols, mw = Object.prototype.hasOwnProperty, ww = Object.prototype.propertyIsEnumerable, hh = (r, e, t) => e in r ? bw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, uh = (r, e) => {
  for (var t in e || (e = {}))
    mw.call(e, t) && hh(r, t, e[t]);
  if (ch)
    for (var t of ch(e))
      ww.call(e, t) && hh(r, t, e[t]);
  return r;
}, dh = (r, e) => gw(r, yw(e));
class _w extends ap {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.events = new ir.EventEmitter(), this.name = g3, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = ie.toMiliseconds(ie.ONE_MINUTE), this.initialPublishTimeout = ie.toMiliseconds(ie.ONE_SECOND * 15), this.needsTransportRestart = !1, this.publish = async (i, n, s) => {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: n, opts: s } });
      const f = s?.ttl || th, h = Ys(s), d = s?.prompt || !1, v = s?.tag || 0, w = s?.id || zi().toString(), A = { topic: i, message: n, opts: { ttl: f, relay: h, prompt: d, tag: v, id: w, attestation: s?.attestation } }, I = `Failed to publish payload, please try again. id:${w} tag:${v}`;
      try {
        const D = new Promise(async (N) => {
          const k = ({ id: T }) => {
            A.opts.id === T && (this.removeRequestFromQueue(T), this.relayer.events.removeListener(Et.publish, k), N(A));
          };
          this.relayer.events.on(Et.publish, k);
          const j = mi(new Promise((T, K) => {
            this.rpcPublish({ topic: i, message: n, ttl: f, prompt: d, tag: v, id: w, attestation: s?.attestation }).then(T).catch(($) => {
              this.logger.warn($, $?.message), K($);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${w} tag:${v}`);
          try {
            await j, this.events.removeListener(Et.publish, k);
          } catch (T) {
            this.queue.set(w, dh(uh({}, A), { attempt: 1 })), this.logger.warn(T, T?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: w, topic: i, message: n, opts: s } }), await mi(D, this.publishTimeout, I);
      } catch (D) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(D), (o = s?.internal) != null && o.throwOnFailedPublish)
          throw D;
      } finally {
        this.queue.delete(w);
      }
    }, this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.relayer = e, this.logger = kt(t, this.name), this.registerEventListeners();
  }
  get context() {
    return Zt(this.logger);
  }
  async rpcPublish(e) {
    var t, i, n, s;
    const { topic: o, message: f, ttl: h = th, prompt: d, tag: v, id: w, attestation: A } = e, I = { method: jn(Ys().protocol).publish, params: { topic: o, message: f, ttl: h, prompt: d, tag: v, attestation: A }, id: w };
    zt((t = I.params) == null ? void 0 : t.prompt) && ((i = I.params) == null || delete i.prompt), zt((n = I.params) == null ? void 0 : n.tag) && ((s = I.params) == null || delete s.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: I });
    const D = await this.relayer.request(I);
    return this.relayer.events.emit(Et.publish, e), this.logger.debug("Successfully Published Payload"), D;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t) => {
      const i = e.attempt + 1;
      this.queue.set(t, dh(uh({}, e), { attempt: i }));
      const { topic: n, message: s, opts: o, attestation: f } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${i}`), await this.rpcPublish({ topic: n, message: s, ttl: o.ttl, prompt: o.prompt, tag: o.tag, id: o.id, attestation: f }), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(gn.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(Et.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(Et.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
class xw {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
      const i = this.get(e);
      this.exists(e, t) || this.map.set(e, [...i, t]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const i = this.get(e);
      if (!this.exists(e, t))
        return;
      const n = i.filter((s) => s !== t);
      if (!n.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, n);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Ew = Object.defineProperty, Sw = Object.defineProperties, Mw = Object.getOwnPropertyDescriptors, lh = Object.getOwnPropertySymbols, Iw = Object.prototype.hasOwnProperty, Aw = Object.prototype.propertyIsEnumerable, ph = (r, e, t) => e in r ? Ew(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, zn = (r, e) => {
  for (var t in e || (e = {}))
    Iw.call(e, t) && ph(r, t, e[t]);
  if (lh)
    for (var t of lh(e))
      Aw.call(e, t) && ph(r, t, e[t]);
  return r;
}, io = (r, e) => Sw(r, Mw(e));
class Dw extends cp {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new xw(), this.events = new ir.EventEmitter(), this.name = S3, this.version = M3, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = !1, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = jr, this.subscribeTimeout = ie.toMiliseconds(ie.ONE_MINUTE), this.initialSubscribeTimeout = ie.toMiliseconds(ie.ONE_SECOND * 15), this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId(), await this.restore()), this.initialized = !0;
    }, this.subscribe = async (i, n) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: n } });
      try {
        const s = Ys(n), o = { topic: i, relay: s, transportType: n?.transportType };
        this.pending.set(i, o);
        const f = await this.rpcSubscribe(i, s, n);
        return typeof f == "string" && (this.onSubscribe(f, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: n } })), f;
      } catch (s) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(s), s;
      }
    }, this.unsubscribe = async (i, n) => {
      await this.restartToComplete(), this.isInitialized(), typeof n?.id < "u" ? await this.unsubscribeById(i, n.id, n) : await this.unsubscribeByTopic(i, n);
    }, this.isSubscribed = async (i) => {
      if (this.topics.includes(i))
        return !0;
      const n = `${this.pendingSubscriptionWatchLabel}_${i}`;
      return await new Promise((s, o) => {
        const f = new ie.Watch();
        f.start(n);
        const h = setInterval(() => {
          (!this.pending.has(i) && this.topics.includes(i) || this.cached.some((d) => d.topic === i)) && (clearInterval(h), f.stop(n), s(!0)), f.elapsed(n) >= I3 && (clearInterval(h), f.stop(n), o(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => !1);
    }, this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      await this.restore(), await this.onRestart();
    }, this.checkPending = async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected))
        return;
      const i = [];
      this.pending.forEach((n) => {
        i.push(n);
      }), await this.batchSubscribe(i);
    }, this.registerEventListeners = () => {
      this.relayer.core.heartbeat.on(gn.pulse, async () => {
        await this.checkPending();
      }), this.events.on(er.created, async (i) => {
        const n = er.created;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: i }), await this.persist();
      }), this.events.on(er.deleted, async (i) => {
        const n = er.deleted;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: i }), await this.persist();
      });
    }, this.relayer = e, this.logger = kt(t, this.name), this.clientId = "";
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let i = !1;
    try {
      i = this.getSubscription(e).topic === t;
    } catch {
    }
    return i;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const i = this.topicMap.get(e);
    await Promise.all(i.map(async (n) => await this.unsubscribeById(e, n, t)));
  }
  async unsubscribeById(e, t, i) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    try {
      const n = Ys(i);
      await this.rpcUnsubscribe(e, t, n);
      const s = st("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, s), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    } catch (n) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
    }
  }
  async rpcSubscribe(e, t, i) {
    var n;
    i?.transportType === at.relay && await this.restartToComplete();
    const s = { method: jn(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    const o = (n = i?.internal) == null ? void 0 : n.throwOnFailedPublish;
    try {
      const f = this.getSubscriptionId(e);
      if (i?.transportType === at.link_mode)
        return setTimeout(() => {
          (this.relayer.connected || this.relayer.connecting) && this.relayer.request(s).catch((v) => this.logger.warn(v));
        }, ie.toMiliseconds(ie.ONE_SECOND)), f;
      const h = new Promise(async (v) => {
        const w = (A) => {
          A.topic === e && (this.events.removeListener(er.created, w), v(A.id));
        };
        this.events.on(er.created, w);
        try {
          const A = await mi(new Promise((I, D) => {
            this.relayer.request(s).catch((N) => {
              this.logger.warn(N, N?.message), D(N);
            }).then(I);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener(er.created, w), v(A);
        } catch {
        }
      }), d = await mi(h, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!d && o)
        throw new Error(`Subscribing to ${e} failed, please try again`);
      return d ? f : null;
    } catch (f) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(Et.connection_stalled), o)
        throw f;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, i = { method: jn(t.protocol).batchSubscribe, params: { topics: e.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    try {
      await await mi(new Promise((n) => {
        this.relayer.request(i).catch((s) => this.logger.warn(s)).then(n);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(Et.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length)
      return;
    const t = e[0].relay, i = { method: jn(t.protocol).batchFetchMessages, params: { topics: e.map((s) => s.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    let n;
    try {
      n = await await mi(new Promise((s, o) => {
        this.relayer.request(i).catch((f) => {
          this.logger.warn(f), o(f);
        }).then(s);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(Et.connection_stalled);
    }
    return n;
  }
  rpcUnsubscribe(e, t, i) {
    const n = { method: jn(i.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, io(zn({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, zn({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, i) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t);
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, zn({}, t)), this.topicMap.set(t.topic, e), this.events.emit(er.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: i } = ae("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const i = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(er.deleted, io(zn({}, i), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(er.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let i = 0; i < t; i++) {
        const n = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(n);
      }
    }
    this.events.emit(er.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = ae("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(e.map((t) => io(zn({}, t), { id: this.getSubscriptionId(t.topic) }))));
  }
  async batchFetchMessages(e) {
    if (!e.length)
      return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (await dy(ie.toMiliseconds(ie.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    !this.relayer.connected && !this.relayer.connecting && await this.relayer.transportOpen();
  }
  getSubscriptionId(e) {
    return fi(e + this.clientId);
  }
}
var Pw = Object.defineProperty, vh = Object.getOwnPropertySymbols, Ow = Object.prototype.hasOwnProperty, Rw = Object.prototype.propertyIsEnumerable, bh = (r, e, t) => e in r ? Pw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, gh = (r, e) => {
  for (var t in e || (e = {}))
    Ow.call(e, t) && bh(r, t, e[t]);
  if (vh)
    for (var t of vh(e))
      Rw.call(e, t) && bh(r, t, e[t]);
  return r;
};
class Nw extends op {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new ir.EventEmitter(), this.name = m3, this.transportExplicitlyClosed = !1, this.initialized = !1, this.connectionAttemptInProgress = !1, this.hasExperiencedNetworkDisruption = !1, this.heartBeatTimeout = ie.toMiliseconds(ie.THIRTY_SECONDS + ie.FIVE_SECONDS), this.requestsInFlight = [], this.connectTimeout = ie.toMiliseconds(ie.ONE_SECOND * 15), this.request = async (t) => {
      var i, n;
      this.logger.debug("Publishing Request Payload");
      const s = t.id || zi().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: s, method: t.method, topic: (i = t.params) == null ? void 0 : i.topic }, "relayer.request - publishing...");
        const o = `${s}:${((n = t.params) == null ? void 0 : n.tag) || ""}`;
        this.requestsInFlight.push(o);
        const f = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((h) => h !== o), f;
      } catch (o) {
        throw this.logger.debug(`Failed to Publish Request: ${s}`), o;
      }
    }, this.resetPingTimeout = () => {
      if (Gs())
        try {
          clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
            var t, i, n;
            this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (i = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i.socket) == null || n.terminate();
          }, this.heartBeatTimeout);
        } catch (t) {
          this.logger.warn(t, t?.message);
        }
    }, this.onPayloadHandler = (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(Et.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (t) => {
      this.logger.fatal(t, `Fatal socket error: ${t?.message}`), this.events.emit(Et.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(hr.payload, this.onPayloadHandler), this.provider.on(hr.connect, this.onConnectHandler), this.provider.on(hr.disconnect, this.onDisconnectHandler), this.provider.on(hr.error, this.onProviderErrorHandler);
    }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? kt(e.logger, this.name) : na(To({ level: e.logger || y3 })), this.messages = new vw(this.logger, e.core), this.subscriber = new Dw(this, this.logger), this.publisher = new _w(this, this.logger), this.relayUrl = e?.relayUrl || Id, this.projectId = e.projectId, Z2() ? this.packageName = Ic() : Q2() && (this.bundleId = Ic()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.subscriber.cached.length > 0)
      try {
        await this.transportOpen();
      } catch (e) {
        this.logger.warn(e, e?.message);
      }
  }
  get context() {
    return Zt(this.logger);
  }
  get connected() {
    var e, t, i;
    return ((i = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i.readyState) === 1;
  }
  get connecting() {
    var e, t, i;
    return ((i = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : i.readyState) === 0;
  }
  async publish(e, t, i) {
    this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: at.relay });
  }
  async subscribe(e, t) {
    var i, n, s;
    this.isInitialized(), (!(t != null && t.transportType) || t?.transportType === "relay") && await this.toEstablishConnection();
    const o = typeof ((i = t?.internal) == null ? void 0 : i.throwOnFailedPublish) > "u" ? !0 : (n = t?.internal) == null ? void 0 : n.throwOnFailedPublish;
    let f = ((s = this.subscriber.topicMap.get(e)) == null ? void 0 : s[0]) || "", h;
    const d = (v) => {
      v.topic === e && (this.subscriber.off(er.created, d), h());
    };
    return await Promise.all([new Promise((v) => {
      h = v, this.subscriber.on(er.created, d);
    }), new Promise(async (v, w) => {
      f = await this.subscriber.subscribe(e, gh({ internal: { throwOnFailedPublish: o } }, t)).catch((A) => {
        o && w(A);
      }) || f, v();
    })]), f;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await mi(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, i) => {
      await this.connect(e).then(t).catch(i).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected)
      throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Wc())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if (e?.length === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((i, n) => i.publishedAt - n.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const i of t)
      try {
        await this.onMessageEvent(i);
      } catch (n) {
        this.logger.warn(n, "Error while processing batch message event: " + n?.message);
      }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: i } = e;
    if (!t.sessionExists) {
      const n = mt(ie.FIVE_MINUTES), s = { topic: i, expiry: n, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(i, s);
    }
    this.events.emit(Et.message, e), await this.recordMessageEvent(e);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
    let t = 1;
    for (; t < 6; ) {
      try {
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (i, n) => {
          const s = () => {
            n(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(hr.disconnect, s), await mi(new Promise((o, f) => {
            this.provider.connect().then(o).catch(f);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o) => {
            n(o);
          }).finally(() => {
            this.provider.off(hr.disconnect, s), clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0;
          }), await new Promise(async (o, f) => {
            const h = () => {
              f(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(hr.disconnect, h), await this.subscriber.start().then(o).catch(f).finally(() => {
              this.provider.off(hr.disconnect, h);
            });
          }), this.hasExperiencedNetworkDisruption = !1, i();
        });
      } catch (i) {
        await this.subscriber.stop();
        const n = i;
        this.logger.warn({}, n.message), this.hasExperiencedNetworkDisruption = !0;
      } finally {
        this.connectionAttemptInProgress = !1;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((i) => setTimeout(i, ie.toMiliseconds(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e, t, i, n, s;
    if (Gs())
      try {
        (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((s = (n = (i = this.provider) == null ? void 0 : i.connection) == null ? void 0 : n.socket) == null || s.on("ping", () => {
          this.resetPingTimeout();
        })), this.resetPingTimeout();
      } catch (o) {
        this.logger.warn(o, o?.message);
      }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new xd(new a3(iy({ sdkVersion: Do, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: i } = e;
    await this.messages.set(t, i);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: i } = e;
    if (!i || i.length === 0)
      return this.logger.warn(`Ignoring invalid/empty message: ${i}`), !0;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.warn(`Ignoring message for non-subscribed topic ${t}`), !0;
    const n = this.messages.has(t, i);
    return n && this.logger.warn(`Ignoring duplicate message: ${i}`), n;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), ff(e)) {
      if (!e.method.endsWith(w3))
        return;
      const t = e.params, { topic: i, message: n, publishedAt: s, attestation: o } = t.data, f = { topic: i, message: n, publishedAt: s, transportType: at.relay, attestation: o };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(gh({ type: "event", event: t.id }, f)), this.events.emit(t.id, f), await this.acknowledgePayload(e), await this.onMessageEvent(f);
    } else
      Aa(e) && this.events.emit(Et.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(Et.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = Ma(e.id, !0);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(hr.payload, this.onPayloadHandler), this.provider.off(hr.connect, this.onConnectHandler), this.provider.off(hr.disconnect, this.onDisconnectHandler), this.provider.off(hr.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Wc();
    Lm(async (t) => {
      e !== t && (e = t, t ? await this.transportOpen().catch((i) => this.logger.error(i, i?.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    });
  }
  async onProviderDisconnect() {
    await this.subscriber.stop(), clearTimeout(this.pingTimeout), this.events.emit(Et.disconnect), this.connectionAttemptInProgress = !1, !this.transportExplicitlyClosed && (this.reconnectTimeout || this.connectPromise || (this.reconnectTimeout = setTimeout(async () => {
      clearTimeout(this.reconnectTimeout), await this.transportOpen().catch((e) => this.logger.error(e, e?.message));
    }, ie.toMiliseconds(_3))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && await this.transportOpen();
  }
}
var Tw = Object.defineProperty, yh = Object.getOwnPropertySymbols, Cw = Object.prototype.hasOwnProperty, $w = Object.prototype.propertyIsEnumerable, mh = (r, e, t) => e in r ? Tw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, wh = (r, e) => {
  for (var t in e || (e = {}))
    Cw.call(e, t) && mh(r, t, e[t]);
  if (yh)
    for (var t of yh(e))
      $w.call(e, t) && mh(r, t, e[t]);
  return r;
};
class Qi extends fp {
  constructor(e, t, i, n = jr, s = void 0) {
    super(e, t, i, n), this.core = e, this.logger = t, this.name = i, this.map = /* @__PURE__ */ new Map(), this.version = x3, this.cached = [], this.initialized = !1, this.storagePrefix = jr, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !zt(o) ? this.map.set(this.getKey(o), o) : lm(o) ? this.map.set(o.id, o) : pm(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = !0);
    }, this.set = async (o, f) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, f) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: f }), this.map.set(o, f), await this.persist());
    }, this.get = (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o)), this.getAll = (o) => (this.isInitialized(), o ? this.values.filter((f) => Object.keys(o).every((h) => f3(f[h], o[h]))) : this.values), this.update = async (o, f) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: f });
      const h = wh(wh({}, this.getData(o)), f);
      this.map.set(o, h), await this.persist();
    }, this.delete = async (o, f) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: f }), this.map.delete(o), this.addToRecentlyDeleted(o), await this.persist());
    }, this.logger = kt(t, this.name), this.storagePrefix = n, this.getKey = s;
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: n } = ae("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(n), new Error(n);
      }
      const { message: i } = ae("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i), new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = ae("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class Lw {
  constructor(e, t) {
    this.core = e, this.logger = t, this.name = A3, this.version = D3, this.events = new zh(), this.initialized = !1, this.storagePrefix = jr, this.ignoredPayloadTypes = [hi], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }, this.register = ({ methods: i }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i])];
    }, this.create = async (i) => {
      this.isInitialized();
      const n = Ao(), s = await this.core.crypto.setSymKey(n), o = mt(ie.FIVE_MINUTES), f = { protocol: Md }, h = { topic: s, expiry: o, relay: f, active: !1, methods: i?.methods }, d = Bc({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: n, relay: f, expiryTimestamp: o, methods: i?.methods });
      return this.events.emit(qi.create, h), this.core.expirer.set(s, o), await this.pairings.set(s, h), await this.core.relayer.subscribe(s, { transportType: i?.transportType }), { topic: s, uri: d };
    }, this.pair = async (i) => {
      this.isInitialized();
      const n = this.core.eventClient.createEvent({ properties: { topic: i?.uri, trace: [Or.pairing_started] } });
      this.isValidPair(i, n);
      const { topic: s, symKey: o, relay: f, expiryTimestamp: h, methods: d } = zc(i.uri);
      n.props.properties.topic = s, n.addTrace(Or.pairing_uri_validation_success), n.addTrace(Or.pairing_uri_not_expired);
      let v;
      if (this.pairings.keys.includes(s)) {
        if (v = this.pairings.get(s), n.addTrace(Or.existing_pairing), v.active)
          throw n.setError(ai.active_pairing_already_exists), new Error(`Pairing already exists: ${s}. Please try again with a new connection URI.`);
        n.addTrace(Or.pairing_not_expired);
      }
      const w = h || mt(ie.FIVE_MINUTES), A = { topic: s, relay: f, expiry: w, active: !1, methods: d };
      this.core.expirer.set(s, w), await this.pairings.set(s, A), n.addTrace(Or.store_new_pairing), i.activatePairing && await this.activate({ topic: s }), this.events.emit(qi.create, A), n.addTrace(Or.emit_inactive_pairing), this.core.crypto.keychain.has(s) || await this.core.crypto.setSymKey(o, s), n.addTrace(Or.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        n.setError(ai.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(s, { relay: f });
      } catch (I) {
        throw n.setError(ai.subscribe_pairing_topic_failure), I;
      }
      return n.addTrace(Or.subscribe_pairing_topic_success), A;
    }, this.activate = async ({ topic: i }) => {
      this.isInitialized();
      const n = mt(ie.THIRTY_DAYS);
      this.core.expirer.set(i, n), await this.pairings.update(i, { active: !0, expiry: n });
    }, this.ping = async (i) => {
      this.isInitialized(), await this.isValidPing(i);
      const { topic: n } = i;
      if (this.pairings.keys.includes(n)) {
        const s = await this.sendRequest(n, "wc_pairingPing", {}), { done: o, resolve: f, reject: h } = Li();
        this.events.once(Xe("pairing_ping", s), ({ error: d }) => {
          d ? h(d) : f();
        }), await o();
      }
    }, this.updateExpiry = async ({ topic: i, expiry: n }) => {
      this.isInitialized(), await this.pairings.update(i, { expiry: n });
    }, this.updateMetadata = async ({ topic: i, metadata: n }) => {
      this.isInitialized(), await this.pairings.update(i, { peerMetadata: n });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i) => {
      this.isInitialized(), await this.isValidDisconnect(i);
      const { topic: n } = i;
      this.pairings.keys.includes(n) && (await this.sendRequest(n, "wc_pairingDelete", st("USER_DISCONNECTED")), await this.deletePairing(n));
    }, this.formatUriFromPairing = (i) => {
      this.isInitialized();
      const { topic: n, relay: s, expiry: o, methods: f } = i, h = this.core.crypto.keychain.get(n);
      return Bc({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: h, relay: s, expiryTimestamp: o, methods: f });
    }, this.sendRequest = async (i, n, s) => {
      const o = Bi(n, s), f = await this.core.crypto.encode(i, o), h = qn[n].req;
      return this.core.history.set(i, o), this.core.relayer.publish(i, f, h), o.id;
    }, this.sendResult = async (i, n, s) => {
      const o = Ma(i, s), f = await this.core.crypto.encode(n, o), h = await this.core.history.get(n, i), d = qn[h.request.method].res;
      await this.core.relayer.publish(n, f, d), await this.core.history.resolve(o);
    }, this.sendError = async (i, n, s) => {
      const o = Ia(i, s), f = await this.core.crypto.encode(n, o), h = await this.core.history.get(n, i), d = qn[h.request.method] ? qn[h.request.method].res : qn.unregistered_method.res;
      await this.core.relayer.publish(n, f, d), await this.core.history.resolve(o);
    }, this.deletePairing = async (i, n) => {
      await this.core.relayer.unsubscribe(i), await Promise.all([this.pairings.delete(i, st("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i), n ? Promise.resolve() : this.core.expirer.del(i)]);
    }, this.cleanup = async () => {
      const i = this.pairings.getAll().filter((n) => gi(n.expiry));
      await Promise.all(i.map((n) => this.deletePairing(n.topic)));
    }, this.onRelayEventRequest = (i) => {
      const { topic: n, payload: s } = i;
      switch (s.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(n, s);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(n, s);
        default:
          return this.onUnknownRpcMethodRequest(n, s);
      }
    }, this.onRelayEventResponse = async (i) => {
      const { topic: n, payload: s } = i, o = (await this.core.history.get(n, s.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, s);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }, this.onPairingPingRequest = async (i, n) => {
      const { id: s } = n;
      try {
        this.isValidPing({ topic: i }), await this.sendResult(s, i, !0), this.events.emit(qi.ping, { id: s, topic: i });
      } catch (o) {
        await this.sendError(s, i, o), this.logger.error(o);
      }
    }, this.onPairingPingResponse = (i, n) => {
      const { id: s } = n;
      setTimeout(() => {
        Rr(n) ? this.events.emit(Xe("pairing_ping", s), {}) : dr(n) && this.events.emit(Xe("pairing_ping", s), { error: n.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (i, n) => {
      const { id: s } = n;
      try {
        this.isValidDisconnect({ topic: i }), await this.deletePairing(i), this.events.emit(qi.delete, { id: s, topic: i });
      } catch (o) {
        await this.sendError(s, i, o), this.logger.error(o);
      }
    }, this.onUnknownRpcMethodRequest = async (i, n) => {
      const { id: s, method: o } = n;
      try {
        if (this.registeredMethods.includes(o))
          return;
        const f = st("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(s, i, f), this.logger.error(f);
      } catch (f) {
        await this.sendError(s, i, f), this.logger.error(f);
      }
    }, this.onUnknownRpcMethodResponse = (i) => {
      this.registeredMethods.includes(i) || this.logger.error(st("WC_METHOD_UNSUPPORTED", i));
    }, this.isValidPair = (i, n) => {
      var s;
      if (!Gt(i)) {
        const { message: f } = ae("MISSING_OR_INVALID", `pair() params: ${i}`);
        throw n.setError(ai.malformed_pairing_uri), new Error(f);
      }
      if (!dm(i.uri)) {
        const { message: f } = ae("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
        throw n.setError(ai.malformed_pairing_uri), new Error(f);
      }
      const o = zc(i?.uri);
      if (!((s = o?.relay) != null && s.protocol)) {
        const { message: f } = ae("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw n.setError(ai.malformed_pairing_uri), new Error(f);
      }
      if (!(o != null && o.symKey)) {
        const { message: f } = ae("MISSING_OR_INVALID", "pair() uri#symKey");
        throw n.setError(ai.malformed_pairing_uri), new Error(f);
      }
      if (o != null && o.expiryTimestamp && ie.toMiliseconds(o?.expiryTimestamp) < Date.now()) {
        n.setError(ai.pairing_expired);
        const { message: f } = ae("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(f);
      }
    }, this.isValidPing = async (i) => {
      if (!Gt(i)) {
        const { message: s } = ae("MISSING_OR_INVALID", `ping() params: ${i}`);
        throw new Error(s);
      }
      const { topic: n } = i;
      await this.isValidPairingTopic(n);
    }, this.isValidDisconnect = async (i) => {
      if (!Gt(i)) {
        const { message: s } = ae("MISSING_OR_INVALID", `disconnect() params: ${i}`);
        throw new Error(s);
      }
      const { topic: n } = i;
      await this.isValidPairingTopic(n);
    }, this.isValidPairingTopic = async (i) => {
      if (!bt(i, !1)) {
        const { message: n } = ae("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(i)) {
        const { message: n } = ae("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
        throw new Error(n);
      }
      if (gi(this.pairings.get(i).expiry)) {
        await this.deletePairing(i);
        const { message: n } = ae("EXPIRED", `pairing topic: ${i}`);
        throw new Error(n);
      }
    }, this.core = e, this.logger = kt(t, this.name), this.pairings = new Qi(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Zt(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(Et.message, async (e) => {
      const { topic: t, message: i, transportType: n } = e;
      if (!this.pairings.keys.includes(t) || n === at.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i)))
        return;
      const s = await this.core.crypto.decode(t, i);
      try {
        ff(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({ topic: t, payload: s })) : Aa(s) && (await this.core.history.resolve(s), await this.onRelayEventResponse({ topic: t, payload: s }), this.core.history.delete(t, s.id));
      } catch (o) {
        this.logger.error(o);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(ur.expired, async (e) => {
      const { topic: t } = ad(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, !0), this.events.emit(qi.expire, { topic: t }));
    });
  }
}
class Fw extends np {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new ir.EventEmitter(), this.name = P3, this.version = O3, this.cached = [], this.initialized = !1, this.storagePrefix = jr, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.set = (i, n, s) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i, request: n, chainId: s }), this.records.has(n.id))
        return;
      const o = { id: n.id, topic: i, request: { method: n.method, params: n.params || null }, chainId: s, expiry: mt(ie.THIRTY_DAYS) };
      this.records.set(o.id, o), this.persist(), this.events.emit(_r.created, o);
    }, this.resolve = async (i) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i }), !this.records.has(i.id))
        return;
      const n = await this.getRecord(i.id);
      typeof n.response > "u" && (n.response = dr(i) ? { error: i.error } : { result: i.result }, this.records.set(n.id, n), this.persist(), this.events.emit(_r.updated, n));
    }, this.get = async (i, n) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i, id: n }), await this.getRecord(n)), this.delete = (i, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((s) => {
        if (s.topic === i) {
          if (typeof n < "u" && s.id !== n)
            return;
          this.records.delete(s.id), this.events.emit(_r.deleted, s);
        }
      }), this.persist();
    }, this.exists = async (i, n) => (this.isInitialized(), this.records.has(n) ? (await this.getRecord(n)).topic === i : !1), this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.logger = kt(t, this.name);
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const i = { topic: t.topic, request: Bi(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(i);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: i } = ae("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(_r.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = ae("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(_r.created, (e) => {
      const t = _r.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(_r.updated, (e) => {
      const t = _r.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(_r.deleted, (e) => {
      const t = _r.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(gn.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = !1;
      this.records.forEach((t) => {
        ie.toMiliseconds(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(_r.deleted, t, !1), e = !0);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class qw extends hp {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new ir.EventEmitter(), this.name = R3, this.version = N3, this.cached = [], this.initialized = !1, this.storagePrefix = jr, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.has = (i) => {
      try {
        const n = this.formatTarget(i);
        return typeof this.getExpiration(n) < "u";
      } catch {
        return !1;
      }
    }, this.set = (i, n) => {
      this.isInitialized();
      const s = this.formatTarget(i), o = { target: s, expiry: n };
      this.expirations.set(s, o), this.checkExpiry(s, o), this.events.emit(ur.created, { target: s, expiration: o });
    }, this.get = (i) => {
      this.isInitialized();
      const n = this.formatTarget(i);
      return this.getExpiration(n);
    }, this.del = (i) => {
      if (this.isInitialized(), this.has(i)) {
        const n = this.formatTarget(i), s = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(ur.deleted, { target: n, expiration: s });
      }
    }, this.on = (i, n) => {
      this.events.on(i, n);
    }, this.once = (i, n) => {
      this.events.once(i, n);
    }, this.off = (i, n) => {
      this.events.off(i, n);
    }, this.removeListener = (i, n) => {
      this.events.removeListener(i, n);
    }, this.logger = kt(t, this.name);
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return ny(e);
    if (typeof e == "number")
      return sy(e);
    const { message: t } = ae("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(ur.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = ae("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: i } = ae("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(i), new Error(i);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: i } = t;
    ie.toMiliseconds(i) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(ur.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(gn.pulse, () => this.checkExpirations()), this.events.on(ur.created, (e) => {
      const t = ur.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(ur.expired, (e) => {
      const t = ur.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(ur.deleted, (e) => {
      const t = ur.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class Uw extends up {
  constructor(e, t, i) {
    super(e, t, i), this.core = e, this.logger = t, this.store = i, this.name = T3, this.verifyUrlV3 = $3, this.storagePrefix = jr, this.version = Sd, this.init = async () => {
      var n;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && ie.toMiliseconds((n = this.publicKey) == null ? void 0 : n.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (n) => {
      if (!cs() || this.isDevEnv)
        return;
      const s = window.location.origin, { id: o, decryptedId: f } = n, h = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${s}&id=${o}&decryptedId=${f}`;
      try {
        const d = is(), v = this.startAbortTimer(ie.ONE_SECOND * 5), w = await new Promise((A, I) => {
          const D = () => {
            window.removeEventListener("message", k), d.body.removeChild(N), I("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", D);
          const N = d.createElement("iframe");
          N.src = h, N.style.display = "none", N.addEventListener("error", D, { signal: this.abortController.signal });
          const k = (j) => {
            if (j.data && typeof j.data == "string")
              try {
                const T = JSON.parse(j.data);
                if (T.type === "verify_attestation") {
                  if (bo(T.attestation).payload.id !== o)
                    return;
                  clearInterval(v), d.body.removeChild(N), this.abortController.signal.removeEventListener("abort", D), window.removeEventListener("message", k), A(T.attestation === null ? "" : T.attestation);
                }
              } catch (T) {
                this.logger.warn(T);
              }
          };
          d.body.appendChild(N), window.addEventListener("message", k, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", w), w;
      } catch (d) {
        this.logger.warn(d);
      }
      return "";
    }, this.resolve = async (n) => {
      if (this.isDevEnv)
        return "";
      const { attestationId: s, hash: o, encryptedId: f } = n;
      if (s === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (s) {
        if (bo(s).payload.id !== f)
          return;
        const d = await this.isValidJwtAttestation(s);
        if (d) {
          if (!d.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return d;
        }
      }
      if (!o)
        return;
      const h = this.getVerifyUrl(n?.verifyUrl);
      return this.fetchAttestation(o, h);
    }, this.fetchAttestation = async (n, s) => {
      this.logger.debug(`resolving attestation: ${n} from url: ${s}`);
      const o = this.startAbortTimer(ie.ONE_SECOND * 5), f = await fetch(`${s}/attestation/${n}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o), f.status === 200 ? await f.json() : void 0;
    }, this.getVerifyUrl = (n) => {
      let s = n || Vn;
      return L3.includes(s) || (this.logger.info(`verify url: ${s}, not included in trusted list, assigning default: ${Vn}`), s = Vn), s;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const n = this.startAbortTimer(ie.FIVE_SECONDS), s = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(n), await s.json();
      } catch (n) {
        this.logger.warn(n);
      }
    }, this.persistPublicKey = async (n) => {
      this.logger.debug("persisting public key to local storage", n), await this.store.setItem(this.storeKey, n), this.publicKey = n;
    }, this.removePublicKey = async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }, this.isValidJwtAttestation = async (n) => {
      const s = await this.getPublicKey();
      try {
        if (s)
          return this.validateAttestation(n, s);
      } catch (f) {
        this.logger.error(f), this.logger.warn("error validating attestation");
      }
      const o = await this.fetchAndPersistPublicKey();
      try {
        if (o)
          return this.validateAttestation(n, o);
      } catch (f) {
        this.logger.error(f), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise)
        return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (s) => {
        const o = await this.fetchPublicKey();
        o && (await this.persistPublicKey(o), s(o));
      });
      const n = await this.fetchPromise;
      return this.fetchPromise = void 0, n;
    }, this.validateAttestation = (n, s) => {
      const o = Wy(n, s.publicKey), f = { hasExpired: ie.toMiliseconds(o.exp) < Date.now(), payload: o };
      if (f.hasExpired)
        throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: f.payload.origin, isScam: f.payload.isScam, isVerified: f.payload.isVerified };
    }, this.logger = kt(t, this.name), this.abortController = new AbortController(), this.isDevEnv = rf(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return Zt(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), ie.toMiliseconds(e));
  }
}
class zw extends dp {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.context = F3, this.registerDeviceToken = async (i) => {
      const { clientId: n, token: s, notificationType: o, enableEncrypted: f = !1 } = i, h = `${q3}/${this.projectId}/clients`;
      await fetch(h, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: n, type: o, token: s, always_raw: f }) });
    }, this.logger = kt(t, this.context);
  }
}
var Bw = Object.defineProperty, _h = Object.getOwnPropertySymbols, kw = Object.prototype.hasOwnProperty, jw = Object.prototype.propertyIsEnumerable, xh = (r, e, t) => e in r ? Bw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Bn = (r, e) => {
  for (var t in e || (e = {}))
    kw.call(e, t) && xh(r, t, e[t]);
  if (_h)
    for (var t of _h(e))
      jw.call(e, t) && xh(r, t, e[t]);
  return r;
};
class Kw extends lp {
  constructor(e, t, i = !0) {
    super(e, t, i), this.core = e, this.logger = t, this.context = z3, this.storagePrefix = jr, this.storageVersion = U3, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = !1, this.init = async () => {
      if (!rf())
        try {
          const n = { eventId: Dc(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: rd(this.core.relayer.protocol, this.core.relayer.version, Do) } } };
          await this.sendEvent([n]);
        } catch (n) {
          this.logger.warn(n);
        }
    }, this.createEvent = (n) => {
      const { event: s = "ERROR", type: o = "", properties: { topic: f, trace: h } } = n, d = Dc(), v = this.core.projectId || "", w = Date.now(), A = Bn({ eventId: d, timestamp: w, props: { event: s, type: o, properties: { topic: f, trace: h } }, bundleId: v, domain: this.getAppDomain() }, this.setMethods(d));
      return this.telemetryEnabled && (this.events.set(d, A), this.shouldPersist = !0), A;
    }, this.getEvent = (n) => {
      const { eventId: s, topic: o } = n;
      if (s)
        return this.events.get(s);
      const f = Array.from(this.events.values()).find((h) => h.props.properties.topic === o);
      if (f)
        return Bn(Bn({}, f), this.setMethods(f.eventId));
    }, this.deleteEvent = (n) => {
      const { eventId: s } = n;
      this.events.delete(s), this.shouldPersist = !0;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(gn.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((n) => {
          ie.fromMiliseconds(Date.now()) - ie.fromMiliseconds(n.timestamp) > B3 && (this.events.delete(n.eventId), this.shouldPersist = !0);
        });
      });
    }, this.setMethods = (n) => ({ addTrace: (s) => this.addTrace(n, s), setError: (s) => this.setError(n, s) }), this.addTrace = (n, s) => {
      const o = this.events.get(n);
      o && (o.props.properties.trace.push(s), this.events.set(n, o), this.shouldPersist = !0);
    }, this.setError = (n, s) => {
      const o = this.events.get(n);
      o && (o.props.type = s, o.timestamp = Date.now(), this.events.set(n, o), this.shouldPersist = !0);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }, this.restore = async () => {
      try {
        const n = await this.core.storage.getItem(this.storageKey) || [];
        if (!n.length)
          return;
        n.forEach((s) => {
          this.events.set(s.eventId, Bn(Bn({}, s), this.setMethods(s.eventId)));
        });
      } catch (n) {
        this.logger.warn(n);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0)
        return;
      const n = [];
      for (const [s, o] of this.events)
        o.props.type && n.push(o);
      if (n.length !== 0)
        try {
          if ((await this.sendEvent(n)).ok)
            for (const s of n)
              this.events.delete(s.eventId), this.shouldPersist = !0;
        } catch (s) {
          this.logger.warn(s);
        }
    }, this.sendEvent = async (n) => {
      const s = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${k3}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Do}${s}`, { method: "POST", body: JSON.stringify(n) });
    }, this.getAppDomain = () => td().url, this.logger = kt(t, this.context), this.telemetryEnabled = i, i ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Hw = Object.defineProperty, Eh = Object.getOwnPropertySymbols, Vw = Object.prototype.hasOwnProperty, Ww = Object.prototype.propertyIsEnumerable, Sh = (r, e, t) => e in r ? Hw(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, Mh = (r, e) => {
  for (var t in e || (e = {}))
    Vw.call(e, t) && Sh(r, t, e[t]);
  if (Eh)
    for (var t of Eh(e))
      Ww.call(e, t) && Sh(r, t, e[t]);
  return r;
};
let Gw = class qd extends ip {
  constructor(e) {
    var t;
    super(e), this.protocol = Ed, this.version = Sd, this.name = ea, this.events = new ir.EventEmitter(), this.initialized = !1, this.on = (o, f) => this.events.on(o, f), this.once = (o, f) => this.events.once(o, f), this.off = (o, f) => this.events.off(o, f), this.removeListener = (o, f) => this.events.removeListener(o, f), this.dispatchEnvelope = ({ topic: o, message: f, sessionExists: h }) => {
      if (!o || !f)
        return;
      const d = { topic: o, message: f, publishedAt: Date.now(), transportType: at.link_mode };
      this.relayer.onLinkMessageEvent(d, { sessionExists: h });
    }, this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || Id, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const i = To({ level: typeof e?.logger == "string" && e.logger ? e.logger : c3.logger, name: ea }), { logger: n, chunkLoggerController: s } = rp({ opts: i, maxSizeInBytes: e?.maxLogBlobSizeInBytes, loggerOverride: e?.logger });
    this.logChunkController = s, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var o, f;
      (o = this.logChunkController) != null && o.downloadLogsBlobInBrowser && ((f = this.logChunkController) == null || f.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = kt(n, this.name), this.heartbeat = new Gl(), this.crypto = new pw(this, this.logger, e?.keychain), this.history = new Fw(this, this.logger), this.expirer = new qw(this, this.logger), this.storage = e != null && e.storage ? e.storage : new D0(Mh(Mh({}, h3), e?.storageOptions)), this.relayer = new Nw({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Lw(this, this.logger), this.verify = new Uw(this, this.logger, this.storage), this.echoClient = new zw(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Kw(this, this.logger, e?.telemetryEnabled);
  }
  static async init(e) {
    const t = new qd(e);
    await t.initialize();
    const i = await t.crypto.getClientId();
    return await t.storage.setItem(E3, i), t;
  }
  get context() {
    return Zt(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(rh, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.eventClient.init(), this.linkModeSupportedApps = await this.storage.getItem(rh) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
};
const Jw = Gw, Ud = "wc", zd = 2, Bd = "client", cf = `${Ud}@${zd}:${Bd}:`, no = { name: Bd, logger: "error", controller: !1, relayUrl: "wss://relay.walletconnect.org" }, Ih = "WALLETCONNECT_DEEPLINK_CHOICE", Yw = "proposal", Xw = "Proposal expired", Zw = "session", sn = ie.SEVEN_DAYS, Qw = "engine", _t = { wc_sessionPropose: { req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: ie.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: ie.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: ie.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: ie.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: ie.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: ie.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, so = { min: ie.FIVE_MINUTES, max: ie.SEVEN_DAYS }, Pr = { idle: "IDLE", active: "ACTIVE" }, e5 = "request", t5 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], r5 = "wc", i5 = "auth", n5 = "authKeys", s5 = "pairingTopics", a5 = "requests", Pa = `${r5}@${1.5}:${i5}:`, $s = `${Pa}:PUB_KEY`;
var o5 = Object.defineProperty, f5 = Object.defineProperties, c5 = Object.getOwnPropertyDescriptors, Ah = Object.getOwnPropertySymbols, h5 = Object.prototype.hasOwnProperty, u5 = Object.prototype.propertyIsEnumerable, Dh = (r, e, t) => e in r ? o5(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t, lt = (r, e) => {
  for (var t in e || (e = {}))
    h5.call(e, t) && Dh(r, t, e[t]);
  if (Ah)
    for (var t of Ah(e))
      u5.call(e, t) && Dh(r, t, e[t]);
  return r;
}, Er = (r, e) => f5(r, c5(e));
class d5 extends vp {
  constructor(e) {
    super(e), this.name = Qw, this.events = new zh(), this.initialized = !1, this.requestQueue = { state: Pr.idle, queue: [] }, this.sessionRequestQueue = { state: Pr.idle, queue: [] }, this.requestQueueDelay = ie.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(_t) }), this.initialized = !0, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, ie.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const i = Er(lt({}, t), { requiredNamespaces: t.requiredNamespaces || {}, optionalNamespaces: t.optionalNamespaces || {} });
      await this.isValidConnect(i);
      const { pairingTopic: n, requiredNamespaces: s, optionalNamespaces: o, sessionProperties: f, relays: h } = i;
      let d = n, v, w = !1;
      try {
        d && (w = this.client.core.pairing.pairings.get(d).active);
      } catch ($) {
        throw this.client.logger.error(`connect() -> pairing.get(${d}) failed`), $;
      }
      if (!d || !w) {
        const { topic: $, uri: z } = await this.client.core.pairing.create();
        d = $, v = z;
      }
      if (!d) {
        const { message: $ } = ae("NO_MATCHING_KEY", `connect() pairing topic: ${d}`);
        throw new Error($);
      }
      const A = await this.client.core.crypto.generateKeyPair(), I = _t.wc_sessionPropose.req.ttl || ie.FIVE_MINUTES, D = mt(I), N = lt({ requiredNamespaces: s, optionalNamespaces: o, relays: h ?? [{ protocol: Md }], proposer: { publicKey: A, metadata: this.client.metadata }, expiryTimestamp: D, pairingTopic: d }, f && { sessionProperties: f }), { reject: k, resolve: j, done: T } = Li(I, Xw);
      this.events.once(Xe("session_connect"), async ({ error: $, session: z }) => {
        if ($)
          k($);
        else if (z) {
          z.self.publicKey = A;
          const B = Er(lt({}, z), { pairingTopic: N.pairingTopic, requiredNamespaces: N.requiredNamespaces, optionalNamespaces: N.optionalNamespaces, transportType: at.relay });
          await this.client.session.set(z.topic, B), await this.setExpiry(z.topic, z.expiry), d && await this.client.core.pairing.updateMetadata({ topic: d, metadata: z.peer.metadata }), this.cleanupDuplicatePairings(B), j(B);
        }
      });
      const K = await this.sendRequest({ topic: d, method: "wc_sessionPropose", params: N, throwOnFailedPublish: !0 });
      return await this.setProposal(K, lt({ id: K }, N)), { uri: v, approval: T };
    }, this.pair = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(t);
      } catch (i) {
        throw this.client.logger.error("pair() failed"), i;
      }
    }, this.approve = async (t) => {
      var i, n, s;
      const o = this.client.core.eventClient.createEvent({ properties: { topic: (i = t?.id) == null ? void 0 : i.toString(), trace: [xr.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (R) {
        throw o.setError(Ti.no_internet_connection), R;
      }
      try {
        await this.isValidProposalId(t?.id);
      } catch (R) {
        throw this.client.logger.error(`approve() -> proposal.get(${t?.id}) failed`), o.setError(Ti.proposal_not_found), R;
      }
      try {
        await this.isValidApprove(t);
      } catch (R) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), o.setError(Ti.session_approve_namespace_validation_failure), R;
      }
      const { id: f, relayProtocol: h, namespaces: d, sessionProperties: v, sessionConfig: w } = t, A = this.client.proposal.get(f);
      this.client.core.eventClient.deleteEvent({ eventId: o.eventId });
      const { pairingTopic: I, proposer: D, requiredNamespaces: N, optionalNamespaces: k } = A;
      let j = (n = this.client.core.eventClient) == null ? void 0 : n.getEvent({ topic: I });
      j || (j = (s = this.client.core.eventClient) == null ? void 0 : s.createEvent({ type: xr.session_approve_started, properties: { topic: I, trace: [xr.session_approve_started, xr.session_namespaces_validation_success] } }));
      const T = await this.client.core.crypto.generateKeyPair(), K = D.publicKey, $ = await this.client.core.crypto.generateSharedKey(T, K), z = lt(lt({ relay: { protocol: h ?? "irn" }, namespaces: d, controller: { publicKey: T, metadata: this.client.metadata }, expiry: mt(sn) }, v && { sessionProperties: v }), w && { sessionConfig: w }), B = at.relay;
      j.addTrace(xr.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe($, { transportType: B });
      } catch (R) {
        throw j.setError(Ti.subscribe_session_topic_failure), R;
      }
      j.addTrace(xr.subscribe_session_topic_success);
      const _ = Er(lt({}, z), { topic: $, requiredNamespaces: N, optionalNamespaces: k, pairingTopic: I, acknowledged: !1, self: z.controller, peer: { publicKey: D.publicKey, metadata: D.metadata }, controller: T, transportType: at.relay });
      await this.client.session.set($, _), j.addTrace(xr.store_session);
      try {
        j.addTrace(xr.publishing_session_settle), await this.sendRequest({ topic: $, method: "wc_sessionSettle", params: z, throwOnFailedPublish: !0 }).catch((R) => {
          throw j?.setError(Ti.session_settle_publish_failure), R;
        }), j.addTrace(xr.session_settle_publish_success), j.addTrace(xr.publishing_session_approve), await this.sendResult({ id: f, topic: I, result: { relay: { protocol: h ?? "irn" }, responderPublicKey: T }, throwOnFailedPublish: !0 }).catch((R) => {
          throw j?.setError(Ti.session_approve_publish_failure), R;
        }), j.addTrace(xr.session_approve_publish_success);
      } catch (R) {
        throw this.client.logger.error(R), this.client.session.delete($, st("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe($), R;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: j.eventId }), await this.client.core.pairing.updateMetadata({ topic: I, metadata: D.metadata }), await this.client.proposal.delete(f, st("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: I }), await this.setExpiry($, mt(sn)), { topic: $, acknowledged: () => Promise.resolve(this.client.session.get($)) };
    }, this.reject = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(t);
      } catch (o) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), o;
      }
      const { id: i, reason: n } = t;
      let s;
      try {
        s = this.client.proposal.get(i).pairingTopic;
      } catch (o) {
        throw this.client.logger.error(`reject() -> proposal.get(${i}) failed`), o;
      }
      s && (await this.sendError({ id: i, topic: s, error: n, rpcOpts: _t.wc_sessionPropose.reject }), await this.client.proposal.delete(i, st("USER_DISCONNECTED")));
    }, this.update = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(t);
      } catch (w) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), w;
      }
      const { topic: i, namespaces: n } = t, { done: s, resolve: o, reject: f } = Li(), h = oi(), d = zi().toString(), v = this.client.session.get(i).namespaces;
      return this.events.once(Xe("session_update", h), ({ error: w }) => {
        w ? f(w) : o();
      }), await this.client.session.update(i, { namespaces: n }), await this.sendRequest({ topic: i, method: "wc_sessionUpdate", params: { namespaces: n }, throwOnFailedPublish: !0, clientRpcId: h, relayRpcId: d }).catch((w) => {
        this.client.logger.error(w), this.client.session.update(i, { namespaces: v }), f(w);
      }), { acknowledged: s };
    }, this.extend = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(t);
      } catch (h) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), h;
      }
      const { topic: i } = t, n = oi(), { done: s, resolve: o, reject: f } = Li();
      return this.events.once(Xe("session_extend", n), ({ error: h }) => {
        h ? f(h) : o();
      }), await this.setExpiry(i, mt(sn)), this.sendRequest({ topic: i, method: "wc_sessionExtend", params: {}, clientRpcId: n, throwOnFailedPublish: !0 }).catch((h) => {
        f(h);
      }), { acknowledged: s };
    }, this.request = async (t) => {
      this.isInitialized();
      try {
        await this.isValidRequest(t);
      } catch (D) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), D;
      }
      const { chainId: i, request: n, topic: s, expiry: o = _t.wc_sessionRequest.req.ttl } = t, f = this.client.session.get(s);
      f?.transportType === at.relay && await this.confirmOnlineStateOrThrow();
      const h = oi(), d = zi().toString(), { done: v, resolve: w, reject: A } = Li(o, "Request expired. Please try again.");
      this.events.once(Xe("session_request", h), ({ error: D, result: N }) => {
        D ? A(D) : w(N);
      });
      const I = this.getAppLinkIfEnabled(f.peer.metadata, f.transportType);
      return I ? (await this.sendRequest({ clientRpcId: h, relayRpcId: d, topic: s, method: "wc_sessionRequest", params: { request: Er(lt({}, n), { expiryTimestamp: mt(o) }), chainId: i }, expiry: o, throwOnFailedPublish: !0, appLink: I }).catch((D) => A(D)), this.client.events.emit("session_request_sent", { topic: s, request: n, chainId: i, id: h }), await v()) : await Promise.all([new Promise(async (D) => {
        await this.sendRequest({ clientRpcId: h, relayRpcId: d, topic: s, method: "wc_sessionRequest", params: { request: Er(lt({}, n), { expiryTimestamp: mt(o) }), chainId: i }, expiry: o, throwOnFailedPublish: !0 }).catch((N) => A(N)), this.client.events.emit("session_request_sent", { topic: s, request: n, chainId: i, id: h }), D();
      }), new Promise(async (D) => {
        var N;
        if (!((N = f.sessionConfig) != null && N.disableDeepLink)) {
          const k = await cy(this.client.core.storage, Ih);
          await oy({ id: h, topic: s, wcDeepLink: k });
        }
        D();
      }), v()]).then((D) => D[2]);
    }, this.respond = async (t) => {
      this.isInitialized(), await this.isValidRespond(t);
      const { topic: i, response: n } = t, { id: s } = n, o = this.client.session.get(i);
      o.transportType === at.relay && await this.confirmOnlineStateOrThrow();
      const f = this.getAppLinkIfEnabled(o.peer.metadata, o.transportType);
      Rr(n) ? await this.sendResult({ id: s, topic: i, result: n.result, throwOnFailedPublish: !0, appLink: f }) : dr(n) && await this.sendError({ id: s, topic: i, error: n.error, appLink: f }), this.cleanupAfterResponse(t);
    }, this.ping = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(t);
      } catch (n) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), n;
      }
      const { topic: i } = t;
      if (this.client.session.keys.includes(i)) {
        const n = oi(), s = zi().toString(), { done: o, resolve: f, reject: h } = Li();
        this.events.once(Xe("session_ping", n), ({ error: d }) => {
          d ? h(d) : f();
        }), await Promise.all([this.sendRequest({ topic: i, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: n, relayRpcId: s }), o()]);
      } else
        this.client.core.pairing.pairings.keys.includes(i) && await this.client.core.pairing.ping({ topic: i });
    }, this.emit = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(t);
      const { topic: i, event: n, chainId: s } = t, o = zi().toString(), f = oi();
      await this.sendRequest({ topic: i, method: "wc_sessionEvent", params: { event: n, chainId: s }, throwOnFailedPublish: !0, relayRpcId: o, clientRpcId: f });
    }, this.disconnect = async (t) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(t);
      const { topic: i } = t;
      if (this.client.session.keys.includes(i))
        await this.sendRequest({ topic: i, method: "wc_sessionDelete", params: st("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: i, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(i))
        await this.client.core.pairing.disconnect({ topic: i });
      else {
        const { message: n } = ae("MISMATCHED_TOPIC", `Session or pairing topic not found: ${i}`);
        throw new Error(n);
      }
    }, this.find = (t) => (this.isInitialized(), this.client.session.getAll().filter((i) => hm(i, t))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (t, i) => {
      var n;
      this.isInitialized(), this.isValidAuthenticate(t);
      const s = i && this.client.core.linkModeSupportedApps.includes(i) && ((n = this.client.metadata.redirect) == null ? void 0 : n.linkMode), o = s ? at.link_mode : at.relay;
      o === at.relay && await this.confirmOnlineStateOrThrow();
      const { chains: f, statement: h = "", uri: d, domain: v, nonce: w, type: A, exp: I, nbf: D, methods: N = [], expiry: k } = t, j = [...t.resources || []], { topic: T, uri: K } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: o });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: T, uri: K } });
      const $ = await this.client.core.crypto.generateKeyPair(), z = Cs($);
      if (await Promise.all([this.client.auth.authKeys.set($s, { responseTopic: z, publicKey: $ }), this.client.auth.pairingTopics.set(z, { topic: z, pairingTopic: T })]), await this.client.core.relayer.subscribe(z, { transportType: o }), this.client.logger.info(`sending request to new pairing topic: ${T}`), N.length > 0) {
        const { namespace: S } = Ns(f[0]);
        let x = Ry(S, "request", N);
        Ts(j) && (x = Ty(x, j.pop())), j.push(x);
      }
      const B = k && k > _t.wc_sessionAuthenticate.req.ttl ? k : _t.wc_sessionAuthenticate.req.ttl, _ = { authPayload: { type: A ?? "caip122", chains: f, statement: h, aud: d, domain: v, version: "1", nonce: w, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: I, nbf: D, resources: j }, requester: { publicKey: $, metadata: this.client.metadata }, expiryTimestamp: mt(B) }, R = { eip155: { chains: f, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...N])], events: ["chainChanged", "accountsChanged"] } }, J = { requiredNamespaces: {}, optionalNamespaces: R, relays: [{ protocol: "irn" }], pairingTopic: T, proposer: { publicKey: $, metadata: this.client.metadata }, expiryTimestamp: mt(_t.wc_sessionPropose.req.ttl) }, { done: Q, resolve: O, reject: p } = Li(B, "Request expired"), l = async ({ error: S, session: x }) => {
        if (this.events.off(Xe("session_request", c), a), S)
          p(S);
        else if (x) {
          x.self.publicKey = $, await this.client.session.set(x.topic, x), await this.setExpiry(x.topic, x.expiry), T && await this.client.core.pairing.updateMetadata({ topic: T, metadata: x.peer.metadata });
          const u = this.client.session.get(x.topic);
          await this.deleteProposal(b), O({ session: u });
        }
      }, a = async (S) => {
        var x, u, m;
        if (await this.deletePendingAuthRequest(c, { message: "fulfilled", code: 0 }), S.error) {
          const q = st("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return S.error.code === q.code ? void 0 : (this.events.off(Xe("session_connect"), l), p(S.error.message));
        }
        await this.deleteProposal(b), this.events.off(Xe("session_connect"), l);
        const { cacaos: g, responder: P } = S.result, G = [], M = [];
        for (const q of g) {
          await Rc({ cacao: q, projectId: this.client.core.projectId }) || (this.client.logger.error(q, "Signature verification failed"), p(st("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: L } = q, y = Ts(L.resources), F = [Io(L.iss)], W = Js(L.iss);
          if (y) {
            const Y = Nc(y), X = Tc(y);
            G.push(...Y), F.push(...X);
          }
          for (const Y of F)
            M.push(`${Y}:${W}`);
        }
        const H = await this.client.core.crypto.generateSharedKey($, P.publicKey);
        let C;
        G.length > 0 && (C = { topic: H, acknowledged: !0, self: { publicKey: $, metadata: this.client.metadata }, peer: P, controller: P.publicKey, expiry: mt(sn), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: T, namespaces: kc([...new Set(G)], [...new Set(M)]), transportType: o }, await this.client.core.relayer.subscribe(H, { transportType: o }), await this.client.session.set(H, C), T && await this.client.core.pairing.updateMetadata({ topic: T, metadata: P.metadata }), C = this.client.session.get(H)), (x = this.client.metadata.redirect) != null && x.linkMode && (u = P.metadata.redirect) != null && u.linkMode && (m = P.metadata.redirect) != null && m.universal && i && (this.client.core.addLinkModeSupportedApp(P.metadata.redirect.universal), this.client.session.update(H, { transportType: at.link_mode })), O({ auths: g, session: C });
      }, c = oi(), b = oi();
      this.events.once(Xe("session_connect"), l), this.events.once(Xe("session_request", c), a);
      let E;
      try {
        if (s) {
          const S = Bi("wc_sessionAuthenticate", _, c);
          this.client.core.history.set(T, S);
          const x = await this.client.core.crypto.encode("", S, { type: ds, encoding: Ln });
          E = Es(i, T, x);
        } else
          await Promise.all([this.sendRequest({ topic: T, method: "wc_sessionAuthenticate", params: _, expiry: t.expiry, throwOnFailedPublish: !0, clientRpcId: c }), this.sendRequest({ topic: T, method: "wc_sessionPropose", params: J, expiry: _t.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: b })]);
      } catch (S) {
        throw this.events.off(Xe("session_connect"), l), this.events.off(Xe("session_request", c), a), S;
      }
      return await this.setProposal(b, lt({ id: b }, J)), await this.setAuthRequest(c, { request: Er(lt({}, _), { verifyContext: {} }), pairingTopic: T, transportType: o }), { uri: E ?? K, response: Q };
    }, this.approveSessionAuthenticate = async (t) => {
      const { id: i, auths: n } = t, s = this.client.core.eventClient.createEvent({ properties: { topic: i.toString(), trace: [Ci.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (k) {
        throw s.setError(Un.no_internet_connection), k;
      }
      const o = this.getPendingAuthRequest(i);
      if (!o)
        throw s.setError(Un.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${i}`);
      const f = o.transportType || at.relay;
      f === at.relay && await this.confirmOnlineStateOrThrow();
      const h = o.requester.publicKey, d = await this.client.core.crypto.generateKeyPair(), v = Cs(h), w = { type: hi, receiverPublicKey: h, senderPublicKey: d }, A = [], I = [];
      for (const k of n) {
        if (!await Rc({ cacao: k, projectId: this.client.core.projectId })) {
          s.setError(Un.invalid_cacao);
          const z = st("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: i, topic: v, error: z, encodeOpts: w }), new Error(z.message);
        }
        s.addTrace(Ci.cacaos_verified);
        const { p: j } = k, T = Ts(j.resources), K = [Io(j.iss)], $ = Js(j.iss);
        if (T) {
          const z = Nc(T), B = Tc(T);
          A.push(...z), K.push(...B);
        }
        for (const z of K)
          I.push(`${z}:${$}`);
      }
      const D = await this.client.core.crypto.generateSharedKey(d, h);
      s.addTrace(Ci.create_authenticated_session_topic);
      let N;
      if (A?.length > 0) {
        N = { topic: D, acknowledged: !0, self: { publicKey: d, metadata: this.client.metadata }, peer: { publicKey: h, metadata: o.requester.metadata }, controller: h, expiry: mt(sn), authentication: n, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: o.pairingTopic, namespaces: kc([...new Set(A)], [...new Set(I)]), transportType: f }, s.addTrace(Ci.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(D, { transportType: f });
        } catch (k) {
          throw s.setError(Un.subscribe_authenticated_session_topic_failure), k;
        }
        s.addTrace(Ci.subscribe_authenticated_session_topic_success), await this.client.session.set(D, N), s.addTrace(Ci.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: o.pairingTopic, metadata: o.requester.metadata });
      }
      s.addTrace(Ci.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: v, id: i, result: { cacaos: n, responder: { publicKey: d, metadata: this.client.metadata } }, encodeOpts: w, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(o.requester.metadata, f) });
      } catch (k) {
        throw s.setError(Un.authenticated_session_approve_publish_failure), k;
      }
      return await this.client.auth.requests.delete(i, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: o.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: s.eventId }), { session: N };
    }, this.rejectSessionAuthenticate = async (t) => {
      this.isInitialized();
      const { id: i, reason: n } = t, s = this.getPendingAuthRequest(i);
      if (!s)
        throw new Error(`Could not find pending auth request with id ${i}`);
      s.transportType === at.relay && await this.confirmOnlineStateOrThrow();
      const o = s.requester.publicKey, f = await this.client.core.crypto.generateKeyPair(), h = Cs(o), d = { type: hi, receiverPublicKey: o, senderPublicKey: f };
      await this.sendError({ id: i, topic: h, error: n, encodeOpts: d, rpcOpts: _t.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(s.requester.metadata, s.transportType) }), await this.client.auth.requests.delete(i, { message: "rejected", code: 0 }), await this.client.proposal.delete(i, st("USER_DISCONNECTED"));
    }, this.formatAuthMessage = (t) => {
      this.isInitialized();
      const { request: i, iss: n } = t;
      return fd(i, n);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0)
          for (; this.relayMessageCache.length > 0; )
            try {
              const t = this.relayMessageCache.shift();
              t && await this.onRelayMessage(t);
            } catch (t) {
              this.client.logger.error(t);
            }
      }, 50);
    }, this.cleanupDuplicatePairings = async (t) => {
      if (t.pairingTopic)
        try {
          const i = this.client.core.pairing.pairings.get(t.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((s) => {
            var o, f;
            return ((o = s.peerMetadata) == null ? void 0 : o.url) && ((f = s.peerMetadata) == null ? void 0 : f.url) === t.peer.metadata.url && s.topic && s.topic !== i.topic;
          });
          if (n.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((s) => this.client.core.pairing.disconnect({ topic: s.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (i) {
          this.client.logger.error(i);
        }
    }, this.deleteSession = async (t) => {
      var i;
      const { topic: n, expirerHasDeleted: s = !1, emitEvent: o = !0, id: f = 0 } = t, { self: h } = this.client.session.get(n);
      await this.client.core.relayer.unsubscribe(n), await this.client.session.delete(n, st("USER_DISCONNECTED")), this.addToRecentlyDeleted(n, "session"), this.client.core.crypto.keychain.has(h.publicKey) && await this.client.core.crypto.deleteKeyPair(h.publicKey), this.client.core.crypto.keychain.has(n) && await this.client.core.crypto.deleteSymKey(n), s || this.client.core.expirer.del(n), this.client.core.storage.removeItem(Ih).catch((d) => this.client.logger.warn(d)), this.getPendingSessionRequests().forEach((d) => {
        d.topic === n && this.deletePendingSessionRequest(d.id, st("USER_DISCONNECTED"));
      }), n === ((i = this.sessionRequestQueue.queue[0]) == null ? void 0 : i.topic) && (this.sessionRequestQueue.state = Pr.idle), o && this.client.events.emit("session_delete", { id: f, topic: n });
    }, this.deleteProposal = async (t, i) => {
      if (i)
        try {
          const n = this.client.proposal.get(t);
          this.client.core.eventClient.getEvent({ topic: n.pairingTopic })?.setError(Ti.proposal_expired);
        } catch {
        }
      await Promise.all([this.client.proposal.delete(t, st("USER_DISCONNECTED")), i ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "proposal");
    }, this.deletePendingSessionRequest = async (t, i, n = !1) => {
      await Promise.all([this.client.pendingRequest.delete(t, i), n ? Promise.resolve() : this.client.core.expirer.del(t)]), this.addToRecentlyDeleted(t, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((s) => s.id !== t), n && (this.sessionRequestQueue.state = Pr.idle, this.client.events.emit("session_request_expire", { id: t }));
    }, this.deletePendingAuthRequest = async (t, i, n = !1) => {
      await Promise.all([this.client.auth.requests.delete(t, i), n ? Promise.resolve() : this.client.core.expirer.del(t)]);
    }, this.setExpiry = async (t, i) => {
      this.client.session.keys.includes(t) && (this.client.core.expirer.set(t, i), await this.client.session.update(t, { expiry: i }));
    }, this.setProposal = async (t, i) => {
      this.client.core.expirer.set(t, mt(_t.wc_sessionPropose.req.ttl)), await this.client.proposal.set(t, i);
    }, this.setAuthRequest = async (t, i) => {
      const { request: n, pairingTopic: s, transportType: o = at.relay } = i;
      this.client.core.expirer.set(t, n.expiryTimestamp), await this.client.auth.requests.set(t, { authPayload: n.authPayload, requester: n.requester, expiryTimestamp: n.expiryTimestamp, id: t, pairingTopic: s, verifyContext: n.verifyContext, transportType: o });
    }, this.setPendingSessionRequest = async (t) => {
      const { id: i, topic: n, params: s, verifyContext: o } = t, f = s.request.expiryTimestamp || mt(_t.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(i, f), await this.client.pendingRequest.set(i, { id: i, topic: n, params: s, verifyContext: o });
    }, this.sendRequest = async (t) => {
      const { topic: i, method: n, params: s, expiry: o, relayRpcId: f, clientRpcId: h, throwOnFailedPublish: d, appLink: v } = t, w = Bi(n, s, h);
      let A;
      const I = !!v;
      try {
        const k = I ? Ln : wi;
        A = await this.client.core.crypto.encode(i, w, { encoding: k });
      } catch (k) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${i} failed`), k;
      }
      let D;
      if (t5.includes(n)) {
        const k = fi(JSON.stringify(w)), j = fi(A);
        D = await this.client.core.verify.register({ id: j, decryptedId: k });
      }
      const N = _t[n].req;
      if (N.attestation = D, o && (N.ttl = o), f && (N.id = f), this.client.core.history.set(i, w), I) {
        const k = Es(v, i, A);
        await global.Linking.openURL(k, this.client.name);
      } else {
        const k = _t[n].req;
        o && (k.ttl = o), f && (k.id = f), d ? (k.internal = Er(lt({}, k.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(i, A, k)) : this.client.core.relayer.publish(i, A, k).catch((j) => this.client.logger.error(j));
      }
      return w.id;
    }, this.sendResult = async (t) => {
      const { id: i, topic: n, result: s, throwOnFailedPublish: o, encodeOpts: f, appLink: h } = t, d = Ma(i, s);
      let v;
      const w = h && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const I = w ? Ln : wi;
        v = await this.client.core.crypto.encode(n, d, Er(lt({}, f || {}), { encoding: I }));
      } catch (I) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), I;
      }
      let A;
      try {
        A = await this.client.core.history.get(n, i);
      } catch (I) {
        throw this.client.logger.error(`sendResult() -> history.get(${n}, ${i}) failed`), I;
      }
      if (w) {
        const I = Es(h, n, v);
        await global.Linking.openURL(I, this.client.name);
      } else {
        const I = _t[A.request.method].res;
        o ? (I.internal = Er(lt({}, I.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(n, v, I)) : this.client.core.relayer.publish(n, v, I).catch((D) => this.client.logger.error(D));
      }
      await this.client.core.history.resolve(d);
    }, this.sendError = async (t) => {
      const { id: i, topic: n, error: s, encodeOpts: o, rpcOpts: f, appLink: h } = t, d = Ia(i, s);
      let v;
      const w = h && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const I = w ? Ln : wi;
        v = await this.client.core.crypto.encode(n, d, Er(lt({}, o || {}), { encoding: I }));
      } catch (I) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), I;
      }
      let A;
      try {
        A = await this.client.core.history.get(n, i);
      } catch (I) {
        throw this.client.logger.error(`sendError() -> history.get(${n}, ${i}) failed`), I;
      }
      if (w) {
        const I = Es(h, n, v);
        await global.Linking.openURL(I, this.client.name);
      } else {
        const I = f || _t[A.request.method].res;
        this.client.core.relayer.publish(n, v, I);
      }
      await this.client.core.history.resolve(d);
    }, this.cleanup = async () => {
      const t = [], i = [];
      this.client.session.getAll().forEach((n) => {
        let s = !1;
        gi(n.expiry) && (s = !0), this.client.core.crypto.keychain.has(n.topic) || (s = !0), s && t.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        gi(n.expiryTimestamp) && i.push(n.id);
      }), await Promise.all([...t.map((n) => this.deleteSession({ topic: n })), ...i.map((n) => this.deleteProposal(n))]);
    }, this.onRelayEventRequest = async (t) => {
      this.requestQueue.queue.push(t), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === Pr.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = Pr.active;
        const t = this.requestQueue.queue.shift();
        if (t)
          try {
            await this.processRequest(t);
          } catch (i) {
            this.client.logger.warn(i);
          }
      }
      this.requestQueue.state = Pr.idle;
    }, this.processRequest = async (t) => {
      const { topic: i, payload: n, attestation: s, transportType: o, encryptedId: f } = t, h = n.method;
      if (!this.shouldIgnorePairingRequest({ topic: i, requestMethod: h }))
        switch (h) {
          case "wc_sessionPropose":
            return await this.onSessionProposeRequest({ topic: i, payload: n, attestation: s, encryptedId: f });
          case "wc_sessionSettle":
            return await this.onSessionSettleRequest(i, n);
          case "wc_sessionUpdate":
            return await this.onSessionUpdateRequest(i, n);
          case "wc_sessionExtend":
            return await this.onSessionExtendRequest(i, n);
          case "wc_sessionPing":
            return await this.onSessionPingRequest(i, n);
          case "wc_sessionDelete":
            return await this.onSessionDeleteRequest(i, n);
          case "wc_sessionRequest":
            return await this.onSessionRequest({ topic: i, payload: n, attestation: s, encryptedId: f, transportType: o });
          case "wc_sessionEvent":
            return await this.onSessionEventRequest(i, n);
          case "wc_sessionAuthenticate":
            return await this.onSessionAuthenticateRequest({ topic: i, payload: n, attestation: s, encryptedId: f, transportType: o });
          default:
            return this.client.logger.info(`Unsupported request method ${h}`);
        }
    }, this.onRelayEventResponse = async (t) => {
      const { topic: i, payload: n, transportType: s } = t, o = (await this.client.core.history.get(i, n.id)).request.method;
      switch (o) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(i, n, s);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(i, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(i, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(i, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(i, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(i, n);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(i, n);
        default:
          return this.client.logger.info(`Unsupported response method ${o}`);
      }
    }, this.onRelayEventUnknownPayload = (t) => {
      const { topic: i } = t, { message: n } = ae("MISSING_OR_INVALID", `Decoded payload on topic ${i} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }, this.shouldIgnorePairingRequest = (t) => {
      const { topic: i, requestMethod: n } = t, s = this.expectedPairingMethodMap.get(i);
      return !s || s.includes(n) ? !1 : !!(s.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (t) => {
      const { topic: i, payload: n, attestation: s, encryptedId: o } = t, { params: f, id: h } = n;
      try {
        const d = this.client.core.eventClient.getEvent({ topic: i });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), d?.setError(ai.proposal_listener_not_found)), this.isValidConnect(lt({}, n.params));
        const v = f.expiryTimestamp || mt(_t.wc_sessionPropose.req.ttl), w = lt({ id: h, pairingTopic: i, expiryTimestamp: v }, f);
        await this.setProposal(h, w);
        const A = await this.getVerifyContext({ attestationId: s, hash: fi(JSON.stringify(n)), encryptedId: o, metadata: w.proposer.metadata });
        d?.addTrace(Or.emit_session_proposal), this.client.events.emit("session_proposal", { id: h, params: w, verifyContext: A });
      } catch (d) {
        await this.sendError({ id: h, topic: i, error: d, rpcOpts: _t.wc_sessionPropose.autoReject }), this.client.logger.error(d);
      }
    }, this.onSessionProposeResponse = async (t, i, n) => {
      const { id: s } = i;
      if (Rr(i)) {
        const { result: o } = i;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: o });
        const f = this.client.proposal.get(s);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: f });
        const h = f.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: h });
        const d = o.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: d });
        const v = await this.client.core.crypto.generateSharedKey(h, d);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: v });
        const w = await this.client.core.relayer.subscribe(v, { transportType: n });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: w }), await this.client.core.pairing.activate({ topic: t });
      } else if (dr(i)) {
        await this.client.proposal.delete(s, st("USER_DISCONNECTED"));
        const o = Xe("session_connect");
        if (this.events.listenerCount(o) === 0)
          throw new Error(`emitting ${o} without any listeners, 954`);
        this.events.emit(Xe("session_connect"), { error: i.error });
      }
    }, this.onSessionSettleRequest = async (t, i) => {
      const { id: n, params: s } = i;
      try {
        this.isValidSessionSettleRequest(s);
        const { relay: o, controller: f, expiry: h, namespaces: d, sessionProperties: v, sessionConfig: w } = i.params, A = Er(lt(lt({ topic: t, relay: o, expiry: h, namespaces: d, acknowledged: !0, pairingTopic: "", requiredNamespaces: {}, optionalNamespaces: {}, controller: f.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: f.publicKey, metadata: f.metadata } }, v && { sessionProperties: v }), w && { sessionConfig: w }), { transportType: at.relay }), I = Xe("session_connect");
        if (this.events.listenerCount(I) === 0)
          throw new Error(`emitting ${I} without any listeners 997`);
        this.events.emit(Xe("session_connect"), { session: A }), await this.sendResult({ id: i.id, topic: t, result: !0, throwOnFailedPublish: !0 });
      } catch (o) {
        await this.sendError({ id: n, topic: t, error: o }), this.client.logger.error(o);
      }
    }, this.onSessionSettleResponse = async (t, i) => {
      const { id: n } = i;
      Rr(i) ? (await this.client.session.update(t, { acknowledged: !0 }), this.events.emit(Xe("session_approve", n), {})) : dr(i) && (await this.client.session.delete(t, st("USER_DISCONNECTED")), this.events.emit(Xe("session_approve", n), { error: i.error }));
    }, this.onSessionUpdateRequest = async (t, i) => {
      const { params: n, id: s } = i;
      try {
        const o = `${t}_session_update`, f = Fn.get(o);
        if (f && this.isRequestOutOfSync(f, s)) {
          this.client.logger.warn(`Discarding out of sync request - ${s}`), this.sendError({ id: s, topic: t, error: st("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(lt({ topic: t }, n));
        try {
          Fn.set(o, s), await this.client.session.update(t, { namespaces: n.namespaces }), await this.sendResult({ id: s, topic: t, result: !0, throwOnFailedPublish: !0 });
        } catch (h) {
          throw Fn.delete(o), h;
        }
        this.client.events.emit("session_update", { id: s, topic: t, params: n });
      } catch (o) {
        await this.sendError({ id: s, topic: t, error: o }), this.client.logger.error(o);
      }
    }, this.isRequestOutOfSync = (t, i) => i.toString().slice(0, -3) < t.toString().slice(0, -3), this.onSessionUpdateResponse = (t, i) => {
      const { id: n } = i, s = Xe("session_update", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Rr(i) ? this.events.emit(Xe("session_update", n), {}) : dr(i) && this.events.emit(Xe("session_update", n), { error: i.error });
    }, this.onSessionExtendRequest = async (t, i) => {
      const { id: n } = i;
      try {
        this.isValidExtend({ topic: t }), await this.setExpiry(t, mt(sn)), await this.sendResult({ id: n, topic: t, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_extend", { id: n, topic: t });
      } catch (s) {
        await this.sendError({ id: n, topic: t, error: s }), this.client.logger.error(s);
      }
    }, this.onSessionExtendResponse = (t, i) => {
      const { id: n } = i, s = Xe("session_extend", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Rr(i) ? this.events.emit(Xe("session_extend", n), {}) : dr(i) && this.events.emit(Xe("session_extend", n), { error: i.error });
    }, this.onSessionPingRequest = async (t, i) => {
      const { id: n } = i;
      try {
        this.isValidPing({ topic: t }), await this.sendResult({ id: n, topic: t, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: n, topic: t });
      } catch (s) {
        await this.sendError({ id: n, topic: t, error: s }), this.client.logger.error(s);
      }
    }, this.onSessionPingResponse = (t, i) => {
      const { id: n } = i, s = Xe("session_ping", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      setTimeout(() => {
        Rr(i) ? this.events.emit(Xe("session_ping", n), {}) : dr(i) && this.events.emit(Xe("session_ping", n), { error: i.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (t, i) => {
      const { id: n } = i;
      try {
        this.isValidDisconnect({ topic: t, reason: i.params }), Promise.all([new Promise((s) => {
          this.client.core.relayer.once(Et.publish, async () => {
            s(await this.deleteSession({ topic: t, id: n }));
          });
        }), this.sendResult({ id: n, topic: t, result: !0, throwOnFailedPublish: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: t, error: st("USER_DISCONNECTED") })]).catch((s) => this.client.logger.error(s));
      } catch (s) {
        this.client.logger.error(s);
      }
    }, this.onSessionRequest = async (t) => {
      var i, n, s;
      const { topic: o, payload: f, attestation: h, encryptedId: d, transportType: v } = t, { id: w, params: A } = f;
      try {
        await this.isValidRequest(lt({ topic: o }, A));
        const I = this.client.session.get(o), D = await this.getVerifyContext({ attestationId: h, hash: fi(JSON.stringify(Bi("wc_sessionRequest", A, w))), encryptedId: d, metadata: I.peer.metadata, transportType: v }), N = { id: w, topic: o, params: A, verifyContext: D };
        await this.setPendingSessionRequest(N), v === at.link_mode && (i = I.peer.metadata.redirect) != null && i.universal && this.client.core.addLinkModeSupportedApp((n = I.peer.metadata.redirect) == null ? void 0 : n.universal), (s = this.client.signConfig) != null && s.disableRequestQueue ? this.emitSessionRequest(N) : (this.addSessionRequestToSessionRequestQueue(N), this.processSessionRequestQueue());
      } catch (I) {
        await this.sendError({ id: w, topic: o, error: I }), this.client.logger.error(I);
      }
    }, this.onSessionRequestResponse = (t, i) => {
      const { id: n } = i, s = Xe("session_request", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Rr(i) ? this.events.emit(Xe("session_request", n), { result: i.result }) : dr(i) && this.events.emit(Xe("session_request", n), { error: i.error });
    }, this.onSessionEventRequest = async (t, i) => {
      const { id: n, params: s } = i;
      try {
        const o = `${t}_session_event_${s.event.name}`, f = Fn.get(o);
        if (f && this.isRequestOutOfSync(f, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit(lt({ topic: t }, s)), this.client.events.emit("session_event", { id: n, topic: t, params: s }), Fn.set(o, n);
      } catch (o) {
        await this.sendError({ id: n, topic: t, error: o }), this.client.logger.error(o);
      }
    }, this.onSessionAuthenticateResponse = (t, i) => {
      const { id: n } = i;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: t, payload: i }), Rr(i) ? this.events.emit(Xe("session_request", n), { result: i.result }) : dr(i) && this.events.emit(Xe("session_request", n), { error: i.error });
    }, this.onSessionAuthenticateRequest = async (t) => {
      var i;
      const { topic: n, payload: s, attestation: o, encryptedId: f, transportType: h } = t;
      try {
        const { requester: d, authPayload: v, expiryTimestamp: w } = s.params, A = await this.getVerifyContext({ attestationId: o, hash: fi(JSON.stringify(s)), encryptedId: f, metadata: d.metadata, transportType: h }), I = { requester: d, pairingTopic: n, id: s.id, authPayload: v, verifyContext: A, expiryTimestamp: w };
        await this.setAuthRequest(s.id, { request: I, pairingTopic: n, transportType: h }), h === at.link_mode && (i = d.metadata.redirect) != null && i.universal && this.client.core.addLinkModeSupportedApp(d.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: n, params: s.params, id: s.id, verifyContext: A });
      } catch (d) {
        this.client.logger.error(d);
        const v = s.params.requester.publicKey, w = await this.client.core.crypto.generateKeyPair(), A = this.getAppLinkIfEnabled(s.params.requester.metadata, h), I = { type: hi, receiverPublicKey: v, senderPublicKey: w };
        await this.sendError({ id: s.id, topic: n, error: d, encodeOpts: I, rpcOpts: _t.wc_sessionAuthenticate.autoReject, appLink: A });
      }
    }, this.addSessionRequestToSessionRequestQueue = (t) => {
      this.sessionRequestQueue.queue.push(t);
    }, this.cleanupAfterResponse = (t) => {
      this.deletePendingSessionRequest(t.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = Pr.idle, this.processSessionRequestQueue();
      }, ie.toMiliseconds(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: t, error: i }) => {
      const n = this.client.core.history.pending;
      n.length > 0 && n.filter((s) => s.topic === t && s.request.method === "wc_sessionRequest").forEach((s) => {
        const o = s.request.id, f = Xe("session_request", o);
        if (this.events.listenerCount(f) === 0)
          throw new Error(`emitting ${f} without any listeners`);
        this.events.emit(Xe("session_request", s.request.id), { error: i });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === Pr.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const t = this.sessionRequestQueue.queue[0];
      if (!t) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = Pr.active, this.emitSessionRequest(t);
      } catch (i) {
        this.client.logger.error(i);
      }
    }, this.emitSessionRequest = (t) => {
      this.client.events.emit("session_request", t);
    }, this.onPairingCreated = (t) => {
      if (t.methods && this.expectedPairingMethodMap.set(t.topic, t.methods), t.active)
        return;
      const i = this.client.proposal.getAll().find((n) => n.pairingTopic === t.topic);
      i && this.onSessionProposeRequest({ topic: t.topic, payload: Bi("wc_sessionPropose", { requiredNamespaces: i.requiredNamespaces, optionalNamespaces: i.optionalNamespaces, relays: i.relays, proposer: i.proposer, sessionProperties: i.sessionProperties }, i.id) });
    }, this.isValidConnect = async (t) => {
      if (!Gt(t)) {
        const { message: h } = ae("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(t)}`);
        throw new Error(h);
      }
      const { pairingTopic: i, requiredNamespaces: n, optionalNamespaces: s, sessionProperties: o, relays: f } = t;
      if (zt(i) || await this.isValidPairingTopic(i), !xm(f, !0)) {
        const { message: h } = ae("MISSING_OR_INVALID", `connect() relays: ${f}`);
        throw new Error(h);
      }
      !zt(n) && Xs(n) !== 0 && this.validateNamespaces(n, "requiredNamespaces"), !zt(s) && Xs(s) !== 0 && this.validateNamespaces(s, "optionalNamespaces"), zt(o) || this.validateSessionProps(o, "sessionProperties");
    }, this.validateNamespaces = (t, i) => {
      const n = _m(t, "connect()", i);
      if (n)
        throw new Error(n.message);
    }, this.isValidApprove = async (t) => {
      if (!Gt(t))
        throw new Error(ae("MISSING_OR_INVALID", `approve() params: ${t}`).message);
      const { id: i, namespaces: n, relayProtocol: s, sessionProperties: o } = t;
      this.checkRecentlyDeleted(i), await this.isValidProposalId(i);
      const f = this.client.proposal.get(i), h = eo(n, "approve()");
      if (h)
        throw new Error(h.message);
      const d = Hc(f.requiredNamespaces, n, "approve()");
      if (d)
        throw new Error(d.message);
      if (!bt(s, !0)) {
        const { message: v } = ae("MISSING_OR_INVALID", `approve() relayProtocol: ${s}`);
        throw new Error(v);
      }
      zt(o) || this.validateSessionProps(o, "sessionProperties");
    }, this.isValidReject = async (t) => {
      if (!Gt(t)) {
        const { message: s } = ae("MISSING_OR_INVALID", `reject() params: ${t}`);
        throw new Error(s);
      }
      const { id: i, reason: n } = t;
      if (this.checkRecentlyDeleted(i), await this.isValidProposalId(i), !Sm(n)) {
        const { message: s } = ae("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(s);
      }
    }, this.isValidSessionSettleRequest = (t) => {
      if (!Gt(t)) {
        const { message: d } = ae("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${t}`);
        throw new Error(d);
      }
      const { relay: i, controller: n, namespaces: s, expiry: o } = t;
      if (!bd(i)) {
        const { message: d } = ae("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(d);
      }
      const f = vm(n, "onSessionSettleRequest()");
      if (f)
        throw new Error(f.message);
      const h = eo(s, "onSessionSettleRequest()");
      if (h)
        throw new Error(h.message);
      if (gi(o)) {
        const { message: d } = ae("EXPIRED", "onSessionSettleRequest()");
        throw new Error(d);
      }
    }, this.isValidUpdate = async (t) => {
      if (!Gt(t)) {
        const { message: h } = ae("MISSING_OR_INVALID", `update() params: ${t}`);
        throw new Error(h);
      }
      const { topic: i, namespaces: n } = t;
      this.checkRecentlyDeleted(i), await this.isValidSessionTopic(i);
      const s = this.client.session.get(i), o = eo(n, "update()");
      if (o)
        throw new Error(o.message);
      const f = Hc(s.requiredNamespaces, n, "update()");
      if (f)
        throw new Error(f.message);
    }, this.isValidExtend = async (t) => {
      if (!Gt(t)) {
        const { message: n } = ae("MISSING_OR_INVALID", `extend() params: ${t}`);
        throw new Error(n);
      }
      const { topic: i } = t;
      this.checkRecentlyDeleted(i), await this.isValidSessionTopic(i);
    }, this.isValidRequest = async (t) => {
      if (!Gt(t)) {
        const { message: h } = ae("MISSING_OR_INVALID", `request() params: ${t}`);
        throw new Error(h);
      }
      const { topic: i, request: n, chainId: s, expiry: o } = t;
      this.checkRecentlyDeleted(i), await this.isValidSessionTopic(i);
      const { namespaces: f } = this.client.session.get(i);
      if (!Kc(f, s)) {
        const { message: h } = ae("MISSING_OR_INVALID", `request() chainId: ${s}`);
        throw new Error(h);
      }
      if (!Mm(n)) {
        const { message: h } = ae("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(h);
      }
      if (!Dm(f, s, n.method)) {
        const { message: h } = ae("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(h);
      }
      if (o && !Nm(o, so)) {
        const { message: h } = ae("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${so.min} and ${so.max}`);
        throw new Error(h);
      }
    }, this.isValidRespond = async (t) => {
      var i;
      if (!Gt(t)) {
        const { message: o } = ae("MISSING_OR_INVALID", `respond() params: ${t}`);
        throw new Error(o);
      }
      const { topic: n, response: s } = t;
      try {
        await this.isValidSessionTopic(n);
      } catch (o) {
        throw (i = t?.response) != null && i.id && this.cleanupAfterResponse(t), o;
      }
      if (!Im(s)) {
        const { message: o } = ae("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(s)}`);
        throw new Error(o);
      }
    }, this.isValidPing = async (t) => {
      if (!Gt(t)) {
        const { message: n } = ae("MISSING_OR_INVALID", `ping() params: ${t}`);
        throw new Error(n);
      }
      const { topic: i } = t;
      await this.isValidSessionOrPairingTopic(i);
    }, this.isValidEmit = async (t) => {
      if (!Gt(t)) {
        const { message: f } = ae("MISSING_OR_INVALID", `emit() params: ${t}`);
        throw new Error(f);
      }
      const { topic: i, event: n, chainId: s } = t;
      await this.isValidSessionTopic(i);
      const { namespaces: o } = this.client.session.get(i);
      if (!Kc(o, s)) {
        const { message: f } = ae("MISSING_OR_INVALID", `emit() chainId: ${s}`);
        throw new Error(f);
      }
      if (!Am(n)) {
        const { message: f } = ae("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(f);
      }
      if (!Pm(o, s, n.name)) {
        const { message: f } = ae("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(f);
      }
    }, this.isValidDisconnect = async (t) => {
      if (!Gt(t)) {
        const { message: n } = ae("MISSING_OR_INVALID", `disconnect() params: ${t}`);
        throw new Error(n);
      }
      const { topic: i } = t;
      await this.isValidSessionOrPairingTopic(i);
    }, this.isValidAuthenticate = (t) => {
      const { chains: i, uri: n, domain: s, nonce: o } = t;
      if (!Array.isArray(i) || i.length === 0)
        throw new Error("chains is required and must be a non-empty array");
      if (!bt(n, !1))
        throw new Error("uri is required parameter");
      if (!bt(s, !1))
        throw new Error("domain is required parameter");
      if (!bt(o, !1))
        throw new Error("nonce is required parameter");
      if ([...new Set(i.map((h) => Ns(h).namespace))].length > 1)
        throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: f } = Ns(i[0]);
      if (f !== "eip155")
        throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (t) => {
      const { attestationId: i, hash: n, encryptedId: s, metadata: o, transportType: f } = t, h = { verified: { verifyUrl: o.verifyUrl || Vn, validation: "UNKNOWN", origin: o.url || "" } };
      try {
        if (f === at.link_mode) {
          const v = this.getAppLinkIfEnabled(o, f);
          return h.verified.validation = v && new URL(v).origin === new URL(o.url).origin ? "VALID" : "INVALID", h;
        }
        const d = await this.client.core.verify.resolve({ attestationId: i, hash: n, encryptedId: s, verifyUrl: o.verifyUrl });
        d && (h.verified.origin = d.origin, h.verified.isScam = d.isScam, h.verified.validation = d.origin === new URL(o.url).origin ? "VALID" : "INVALID");
      } catch (d) {
        this.client.logger.warn(d);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(h)}`), h;
    }, this.validateSessionProps = (t, i) => {
      Object.values(t).forEach((n) => {
        if (!bt(n, !1)) {
          const { message: s } = ae("MISSING_OR_INVALID", `${i} must be in Record<string, string> format. Received: ${JSON.stringify(n)}`);
          throw new Error(s);
        }
      });
    }, this.getPendingAuthRequest = (t) => {
      const i = this.client.auth.requests.get(t);
      return typeof i == "object" ? i : void 0;
    }, this.addToRecentlyDeleted = (t, i) => {
      if (this.recentlyDeletedMap.set(t, i), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let n = 0;
        const s = this.recentlyDeletedLimit / 2;
        for (const o of this.recentlyDeletedMap.keys()) {
          if (n++ >= s)
            break;
          this.recentlyDeletedMap.delete(o);
        }
      }
    }, this.checkRecentlyDeleted = (t) => {
      const i = this.recentlyDeletedMap.get(t);
      if (i) {
        const { message: n } = ae("MISSING_OR_INVALID", `Record was recently deleted - ${i}: ${t}`);
        throw new Error(n);
      }
    }, this.isLinkModeEnabled = (t, i) => {
      var n, s, o, f, h, d, v, w, A;
      return !t || i !== at.link_mode ? !1 : ((s = (n = this.client.metadata) == null ? void 0 : n.redirect) == null ? void 0 : s.linkMode) === !0 && ((f = (o = this.client.metadata) == null ? void 0 : o.redirect) == null ? void 0 : f.universal) !== void 0 && ((d = (h = this.client.metadata) == null ? void 0 : h.redirect) == null ? void 0 : d.universal) !== "" && ((v = t?.redirect) == null ? void 0 : v.universal) !== void 0 && ((w = t?.redirect) == null ? void 0 : w.universal) !== "" && ((A = t?.redirect) == null ? void 0 : A.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(t.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }, this.getAppLinkIfEnabled = (t, i) => {
      var n;
      return this.isLinkModeEnabled(t, i) ? (n = t?.redirect) == null ? void 0 : n.universal : void 0;
    }, this.handleLinkModeMessage = ({ url: t }) => {
      if (!t || !t.includes("wc_ev") || !t.includes("topic"))
        return;
      const i = Ac(t, "topic") || "", n = decodeURIComponent(Ac(t, "wc_ev") || ""), s = this.client.session.keys.includes(i);
      s && this.client.session.update(i, { transportType: at.link_mode }), this.client.core.dispatchEnvelope({ topic: i, message: n, sessionExists: s });
    }, this.registerLinkModeListeners = async () => {
      var t;
      if (rf() || Ai() && (t = this.client.metadata.redirect) != null && t.linkMode) {
        const i = global == null ? void 0 : global.Linking;
        if (typeof i < "u") {
          i.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const n = await i.getInitialURL();
          n && setTimeout(() => {
            this.handleLinkModeMessage({ url: n });
          }, 50);
        }
      }
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = ae("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(Et.message, (e) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(e) : this.onRelayMessage(e);
    });
  }
  async onRelayMessage(e) {
    const { topic: t, message: i, attestation: n, transportType: s } = e, { publicKey: o } = this.client.auth.authKeys.keys.includes($s) ? this.client.auth.authKeys.get($s) : { responseTopic: void 0, publicKey: void 0 }, f = await this.client.core.crypto.decode(t, i, { receiverPublicKey: o, encoding: s === at.link_mode ? Ln : wi });
    try {
      ff(f) ? (this.client.core.history.set(t, f), this.onRelayEventRequest({ topic: t, payload: f, attestation: n, transportType: s, encryptedId: fi(i) })) : Aa(f) ? (await this.client.core.history.resolve(f), await this.onRelayEventResponse({ topic: t, payload: f, transportType: s }), this.client.core.history.delete(t, f.id)) : this.onRelayEventUnknownPayload({ topic: t, payload: f, transportType: s });
    } catch (h) {
      this.client.logger.error(h);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(ur.expired, async (e) => {
      const { topic: t, id: i } = ad(e.target);
      if (i && this.client.pendingRequest.keys.includes(i))
        return await this.deletePendingSessionRequest(i, ae("EXPIRED"), !0);
      if (i && this.client.auth.requests.keys.includes(i))
        return await this.deletePendingAuthRequest(i, ae("EXPIRED"), !0);
      t ? this.client.session.keys.includes(t) && (await this.deleteSession({ topic: t, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: t })) : i && (await this.deleteProposal(i, !0), this.client.events.emit("proposal_expire", { id: i }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(qi.create, (e) => this.onPairingCreated(e)), this.client.core.pairing.events.on(qi.delete, (e) => {
      this.addToRecentlyDeleted(e.topic, "pairing");
    });
  }
  isValidPairingTopic(e) {
    if (!bt(e, !1)) {
      const { message: t } = ae("MISSING_OR_INVALID", `pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.pairing.pairings.keys.includes(e)) {
      const { message: t } = ae("NO_MATCHING_KEY", `pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gi(this.client.core.pairing.pairings.get(e).expiry)) {
      const { message: t } = ae("EXPIRED", `pairing topic: ${e}`);
      throw new Error(t);
    }
  }
  async isValidSessionTopic(e) {
    if (!bt(e, !1)) {
      const { message: t } = ae("MISSING_OR_INVALID", `session topic should be a string: ${e}`);
      throw new Error(t);
    }
    if (this.checkRecentlyDeleted(e), !this.client.session.keys.includes(e)) {
      const { message: t } = ae("NO_MATCHING_KEY", `session topic doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gi(this.client.session.get(e).expiry)) {
      await this.deleteSession({ topic: e });
      const { message: t } = ae("EXPIRED", `session topic: ${e}`);
      throw new Error(t);
    }
    if (!this.client.core.crypto.keychain.has(e)) {
      const { message: t } = ae("MISSING_OR_INVALID", `session topic does not exist in keychain: ${e}`);
      throw await this.deleteSession({ topic: e }), new Error(t);
    }
  }
  async isValidSessionOrPairingTopic(e) {
    if (this.checkRecentlyDeleted(e), this.client.session.keys.includes(e))
      await this.isValidSessionTopic(e);
    else if (this.client.core.pairing.pairings.keys.includes(e))
      this.isValidPairingTopic(e);
    else if (bt(e, !1)) {
      const { message: t } = ae("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${e}`);
      throw new Error(t);
    } else {
      const { message: t } = ae("MISSING_OR_INVALID", `session or pairing topic should be a string: ${e}`);
      throw new Error(t);
    }
  }
  async isValidProposalId(e) {
    if (!Em(e)) {
      const { message: t } = ae("MISSING_OR_INVALID", `proposal id should be a number: ${e}`);
      throw new Error(t);
    }
    if (!this.client.proposal.keys.includes(e)) {
      const { message: t } = ae("NO_MATCHING_KEY", `proposal id doesn't exist: ${e}`);
      throw new Error(t);
    }
    if (gi(this.client.proposal.get(e).expiryTimestamp)) {
      await this.deleteProposal(e);
      const { message: t } = ae("EXPIRED", `proposal id: ${e}`);
      throw new Error(t);
    }
  }
}
class l5 extends Qi {
  constructor(e, t) {
    super(e, t, Yw, cf), this.core = e, this.logger = t;
  }
}
class p5 extends Qi {
  constructor(e, t) {
    super(e, t, Zw, cf), this.core = e, this.logger = t;
  }
}
class v5 extends Qi {
  constructor(e, t) {
    super(e, t, e5, cf, (i) => i.id), this.core = e, this.logger = t;
  }
}
class b5 extends Qi {
  constructor(e, t) {
    super(e, t, n5, Pa, () => $s), this.core = e, this.logger = t;
  }
}
class g5 extends Qi {
  constructor(e, t) {
    super(e, t, s5, Pa), this.core = e, this.logger = t;
  }
}
class y5 extends Qi {
  constructor(e, t) {
    super(e, t, a5, Pa, (i) => i.id), this.core = e, this.logger = t;
  }
}
class m5 {
  constructor(e, t) {
    this.core = e, this.logger = t, this.authKeys = new b5(this.core, this.logger), this.pairingTopics = new g5(this.core, this.logger), this.requests = new y5(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
class Oa extends pp {
  constructor(e) {
    super(e), this.protocol = Ud, this.version = zd, this.name = no.name, this.events = new ir.EventEmitter(), this.on = (i, n) => this.events.on(i, n), this.once = (i, n) => this.events.once(i, n), this.off = (i, n) => this.events.off(i, n), this.removeListener = (i, n) => this.events.removeListener(i, n), this.removeAllListeners = (i) => this.events.removeAllListeners(i), this.connect = async (i) => {
      try {
        return await this.engine.connect(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.pair = async (i) => {
      try {
        return await this.engine.pair(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approve = async (i) => {
      try {
        return await this.engine.approve(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.reject = async (i) => {
      try {
        return await this.engine.reject(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.update = async (i) => {
      try {
        return await this.engine.update(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.extend = async (i) => {
      try {
        return await this.engine.extend(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.request = async (i) => {
      try {
        return await this.engine.request(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.respond = async (i) => {
      try {
        return await this.engine.respond(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.ping = async (i) => {
      try {
        return await this.engine.ping(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.emit = async (i) => {
      try {
        return await this.engine.emit(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.disconnect = async (i) => {
      try {
        return await this.engine.disconnect(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.find = (i) => {
      try {
        return this.engine.find(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (i) {
        throw this.logger.error(i.message), i;
      }
    }, this.authenticate = async (i, n) => {
      try {
        return await this.engine.authenticate(i, n);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.formatAuthMessage = (i) => {
      try {
        return this.engine.formatAuthMessage(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approveSessionAuthenticate = async (i) => {
      try {
        return await this.engine.approveSessionAuthenticate(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.rejectSessionAuthenticate = async (i) => {
      try {
        return await this.engine.rejectSessionAuthenticate(i);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.name = e?.name || no.name, this.metadata = e?.metadata || td(), this.signConfig = e?.signConfig;
    const t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : na(To({ level: e?.logger || no.logger }));
    this.core = e?.core || new Jw(e), this.logger = kt(t, this.name), this.session = new p5(this.core, this.logger), this.proposal = new l5(this.core, this.logger), this.pendingRequest = new v5(this.core, this.logger), this.engine = new d5(this), this.auth = new m5(this.core, this.logger);
  }
  static async init(e) {
    const t = new Oa(e);
    return await t.initialize(), t;
  }
  get context() {
    return Zt(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, ie.toMiliseconds(ie.ONE_SECOND));
    } catch (e) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(e.message), e;
    }
  }
}
const w5 = () => {
  const e = cu()?.os?.toLowerCase();
  return e?.includes("android") ? "android" : e?.toLowerCase().includes("ios") || e?.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 ? "ios" : "desktop";
}, Ss = w5(), _5 = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0,0,0,0.8)",
  backdropFilter: "blur(10px)",
  zIndex: "9999",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: "white",
  fontWeight: "500",
  fontFamily: "'Barlow', sans-serif"
}, x5 = {
  width: "840px",
  height: "540px",
  zIndex: "99999",
  backgroundColor: "white",
  border: "none",
  outline: "none",
  borderRadius: "40px",
  boxShadow: "0px 4px 40px 0px rgb(0 0 0), 0px 4px 8px 0px rgb(0 0 0 / 25%)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
}, E5 = `
  <div id="argent-mobile-modal-container" style="position: relative">
    <iframe class="argent-iframe" allow="clipboard-write"></iframe>
    <div class="argent-close-button" style="position: absolute; top: 24px; right: 24px; cursor: pointer;">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#F5F3F0"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2462 9.75382C22.7018 10.2094 22.7018 10.9481 22.2462 11.4037L17.6499 16L22.2462 20.5963C22.7018 21.0519 22.7018 21.7906 22.2462 22.2462C21.7905 22.7018 21.0519 22.7018 20.5962 22.2462L16 17.6499L11.4039 22.246C10.9482 22.7017 10.2096 22.7017 9.75394 22.246C9.29833 21.7904 9.29833 21.0517 9.75394 20.5961L14.3501 16L9.75394 11.4039C9.29833 10.9483 9.29833 10.2096 9.75394 9.75396C10.2096 9.29835 10.9482 9.29835 11.4039 9.75396L16 14.3501L20.5962 9.75382C21.0519 9.29821 21.7905 9.29821 22.2462 9.75382Z" fill="#333332"/>
      </svg>
    </div>
  </div>
`;
class S5 {
  constructor() {
    He(this, "bridgeUrl", "https://login.argent.xyz");
    He(this, "mobileUrl", "argent://");
    He(this, "type", "overlay");
    He(this, "wcUri");
    He(this, "overlay");
    He(this, "popupWindow");
    He(this, "closingTimeout");
    He(this, "close", () => {
      this.overlay?.remove(), this.popupWindow?.close(), this.overlay = void 0, this.popupWindow = void 0;
    });
  }
  showConnectionModal(e) {
    const t = encodeURIComponent(e), i = encodeURIComponent(window.location.href);
    this.showModal({
      desktop: `${this.bridgeUrl}?wc=${t}&href=${i}&device=desktop`,
      ios: `${this.mobileUrl}app/wc?uri=${t}&href=${i}&device=mobile`,
      android: `${this.mobileUrl}app/wc?uri=${t}&href=${i}&device=mobile`
    });
  }
  showApprovalModal(e) {
    if (Ss === "desktop") {
      this.showModal({
        desktop: `${this.bridgeUrl}?action=sign`,
        ios: "",
        android: ""
      });
      return;
    }
    const t = encodeURIComponent(window.location.href);
    this.showModal({
      desktop: `${this.bridgeUrl}?action=sign&device=desktop&href=${t}`,
      ios: `${this.mobileUrl}app/wc/request?href=${t}&device=mobile`,
      android: `${this.mobileUrl}app/wc/request?href=${t}&device=mobile`
    });
  }
  closeModal(e) {
    e ? (this.overlay?.querySelector("iframe")?.contentWindow?.postMessage("argent-login.success", "*"), this.popupWindow?.postMessage("argent-login.success", "*"), this.closingTimeout = setTimeout(this.close, 3400)) : this.close();
  }
  showModal(e) {
    if (clearTimeout(this.closingTimeout), (this.overlay || this.popupWindow) && this.close(), Ss === "android" || Ss === "ios") {
      const s = document.createElement("button");
      s.style.display = "none", s.addEventListener("click", () => {
        window.location.href = e[Ss];
      }), s.click();
      return;
    }
    if (this.type === "window") {
      const s = "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=840,height=540";
      this.popupWindow = window.open(e.desktop, "_blank", s) || void 0;
      return;
    }
    const t = document.createElement("div");
    t.innerHTML = E5, t.id = "argent-mobile-modal-overlay";
    for (const [s, o] of Object.entries(_5))
      t.style[s] = o;
    document.body.appendChild(t), t.addEventListener("click", () => this.closeModal()), this.overlay = t;
    const i = t.querySelector("iframe");
    i.setAttribute("src", e.desktop);
    for (const [s, o] of Object.entries(x5))
      i.style[s] = o;
    t.querySelector(
      ".argent-close-button"
    ).addEventListener("click", () => this.closeModal());
  }
}
const Nr = new S5(), ta = starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.NetworkName, M5 = async ({
  projectId: r,
  chainId: e,
  name: t,
  description: i,
  rpcUrl: n,
  bridgeUrl: s = I5(e),
  mobileUrl: o = A5(e),
  modalType: f = "overlay",
  url: h,
  icons: d,
  walletConnect: v
}, w) => {
  if (!s)
    throw new Error("bridgeUrl is required");
  if (!o)
    throw new Error("mobileUrl is required");
  Nr.bridgeUrl = s, Nr.mobileUrl = o, Nr.type = f;
  const A = {
    projectId: r,
    metadata: {
      name: t ?? "Unknown dapp",
      description: i ?? "Unknown dapp description",
      url: h ?? "#",
      icons: d ?? [],
      ...v?.metadata
    }
  }, I = await Oa.init(A), D = new starknet__WEBPACK_IMPORTED_MODULE_1__/* .RpcProvider */ .bd({ nodeUrl: n }), N = new w({ client: I, chainId: e, rpcUrl: n, provider: D });
  I.on("session_event", (k) => {
  }), I.on("session_update", ({ topic: k, params: j }) => {
    const { namespaces: T } = j, K = I.session.get(k);
    N.updateSession({ ...K, namespaces: T });
  }), I.on("session_delete", () => {
  });
  try {
    const k = I.session.getAll().find(N.isValidSession);
    if (k)
      return N.updateSession(k), N;
    const j = { requiredNamespaces: N.getRequiredNamespaces() };
    (0,_index_d4f30f2e_js__WEBPACK_IMPORTED_MODULE_2__.r)(), await new Promise(($) => setTimeout($, 200));
    const { uri: T, approval: K } = await I.connect(j);
    if (T) {
      Nr.showConnectionModal(T), Nr.wcUri = T;
      const $ = await K();
      N.updateSession($), Nr.closeModal("animateSuccess");
    }
    return N;
  } catch {
    return console.error("@argent/login::error"), Nr.closeModal(), null;
  }
}, I5 = (r) => {
  if (!r)
    throw new Error(
      `Unknown or unsupported chainId (${r}), either specify a supported chain or set bridgeUrl.`
    );
  const e = parseInt(`${r}`);
  if (String(r).startsWith(ta.SN_SEPOLIA) || e === 11155111)
    return "https://mobile-login.hydrogen.argent47.net";
  if (String(r).startsWith(ta.SN_MAIN) || e === 1)
    return "https://login.argent.xyz";
}, A5 = (r) => {
  if (!r)
    throw new Error(
      `Unknown or unsupported chainId (${r}), either specify a supported chain or set mobileUrl.`
    );
  const e = parseInt(`${r}`);
  if (String(r).startsWith(ta.SN_SEPOLIA) || e === 11155111)
    return "argent-dev://";
  if (String(r).startsWith(ta.SN_MAIN) || e === 1)
    return "argent://";
};
function D5(r) {
  return typeof r < "u" && typeof r.context < "u";
}
const Tr = { init: "signer_init", uri: "signer_uri", created: "signer_created", updated: "signer_updated", deleted: "signer_deleted", event: "signer_event" };
class P5 extends Ym {
  constructor(e) {
    super(), this.events = new ir.EventEmitter(), this.pending = !1, this.initializing = !1, this.requiredNamespaces = e?.requiredNamespaces || {}, this.opts = e?.client;
  }
  get connected() {
    return typeof this.session < "u";
  }
  get connecting() {
    return this.pending;
  }
  get chains() {
    return this.session ? ed(this.session.namespaces) : V2(this.requiredNamespaces);
  }
  get accounts() {
    return this.session ? Qu(this.session.namespaces) : [];
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open() {
    if (this.pending)
      return new Promise((e, t) => {
        this.events.once("open", () => {
          if (this.events.once("open_error", (i) => {
            t(i);
          }), typeof this.client > "u")
            return t(new Error("Sign Client not initialized"));
          e();
        });
      });
    try {
      this.pending = !0;
      const e = await this.register(), t = e.find({ requiredNamespaces: this.requiredNamespaces });
      if (t.length)
        return this.onOpen(t[0]);
      const { uri: i, approval: n } = await e.connect({ requiredNamespaces: this.requiredNamespaces });
      this.events.emit(Tr.uri, { uri: i }), this.session = await n(), this.events.emit(Tr.created, this.session), this.onOpen();
    } catch (e) {
      throw this.events.emit("open_error", e), e;
    }
  }
  async close() {
    typeof this.session > "u" || (await (await this.register()).disconnect({ topic: this.session.topic, reason: st("USER_DISCONNECTED") }), this.onClose());
  }
  async send(e, t) {
    if (typeof this.client > "u" && (this.client = await this.register(), this.connected || await this.open()), typeof this.session > "u")
      throw new Error("Signer connection is missing session");
    this.client.request({ topic: this.session.topic, request: e, chainId: t?.chainId }).then((i) => this.events.emit("payload", Ma(e.id, i))).catch((i) => this.events.emit("payload", Ia(e.id, i.message)));
  }
  async register(e = this.opts) {
    if (typeof this.client < "u")
      return this.client;
    if (this.initializing)
      return new Promise((t, i) => {
        this.events.once("register_error", (n) => {
          i(n);
        }), this.events.once(Tr.init, () => {
          if (typeof this.client > "u")
            return i(new Error("Sign Client not initialized"));
          t(this.client);
        });
      });
    if (D5(e))
      return this.client = e, this.registerEventListeners(), this.client;
    try {
      return this.initializing = !0, this.client = await Oa.init(e), this.initializing = !1, this.registerEventListeners(), this.events.emit(Tr.init), this.client;
    } catch (t) {
      throw this.events.emit("register_error", t), t;
    }
  }
  onOpen(e) {
    this.pending = !1, e && (this.session = e), this.events.emit("open");
  }
  onClose() {
    this.pending = !1, this.client && (this.client = void 0), this.events.emit("close");
  }
  registerEventListeners() {
    typeof this.client < "u" && (this.client.on("session_event", (e) => {
      var t;
      this.session && ((t = this.session) == null ? void 0 : t.topic) !== e.topic || this.events.emit(Tr.event, e.params);
    }), this.client.on("session_update", (e) => {
      var t;
      typeof this.client < "u" && (this.session && ((t = this.session) == null ? void 0 : t.topic) !== e.topic || (this.session = this.client.session.get(e.topic), this.events.emit(Tr.updated, this.session)));
    }), this.client.on("session_delete", (e) => {
      var t;
      this.session && (this.session && ((t = this.session) == null ? void 0 : t.topic) !== e.topic || (this.onClose(), this.events.emit(Tr.deleted, this.session), this.session = void 0));
    }));
  }
}
class O5 {
  constructor() {
    He(this, "accounts", []);
    He(this, "eventEmitter", new ir.EventEmitter());
    He(this, "updateSession", (e) => {
      if (!this.isValidSession(e))
        throw console.warn(
          "updateSession incompatible session",
          e,
          "for adapter",
          this.formatChainId(this.chainId)
        ), new Error("Invalid session");
      this.session = e;
      const t = ed(e.namespaces, [this.namespace]);
      this.setChainIds(t);
      const i = Qu(e.namespaces, [
        this.namespace
      ]);
      this.setAccounts(i);
    });
    He(this, "isValidSession", ({
      namespaces: e,
      requiredNamespaces: t
    }) => {
      const i = this.formatChainId(this.chainId);
      return t ? !!t[this.namespace]?.chains?.includes(i) : !!e?.[this.namespace]?.accounts.some(
        (n) => n.startsWith(i)
      );
    });
  }
  getRequiredNamespaces() {
    const e = [this.formatChainId(this.chainId)];
    return {
      [this.namespace]: { chains: e, methods: this.methods, events: this.events }
    };
  }
  isCompatibleChainId(e) {
    return typeof e == "string" ? e.startsWith(`${this.namespace}:`) : !1;
  }
  setChainIds(e) {
    const i = e.filter((n) => this.isCompatibleChainId(n)).map((n) => this.parseChainId(n)).filter((n) => n !== this.chainId);
    i.length && (this.chainId = i[0], this.eventEmitter.emit("chainChanged", this.chainId));
  }
  setChainId(e) {
    if (this.isCompatibleChainId(e)) {
      const t = this.parseChainId(e);
      this.chainId = t, this.eventEmitter.emit("chainChanged", this.chainId);
    }
  }
  parseAccountId(e) {
    const [t, i, n] = e.split(":");
    return { chainId: `${t}:${i}`, address: n };
  }
  getSignerConnection(e) {
    return new P5({
      requiredNamespaces: {
        [this.namespace]: {
          chains: this.rpc.chains,
          methods: this.rpc.methods,
          events: this.rpc.events
        }
      },
      client: e
    });
  }
  registerEventListeners() {
    this.rpcProvider.on("connect", () => {
      const { chains: e, accounts: t } = this.signerConnection;
      e?.length && this.setChainIds(e), t?.length && this.setAccounts(t);
    }), this.signerConnection.on(Tr.created, this.updateSession), this.signerConnection.on(Tr.updated, this.updateSession), this.signerConnection.on(Tr.event, (e) => {
      if (!this.rpc.chains.includes(e.chainId))
        return;
      const { event: t } = e;
      t.name === "accountsChanged" ? (this.accounts = t.data, this.eventEmitter.emit("accountsChanged", this.accounts)) : t.name === "chainChanged" ? this.setChainId(t.data) : this.eventEmitter.emit(t.name, t.data);
    }), this.rpcProvider.on("disconnect", () => {
      this.eventEmitter.emit("disconnect");
    });
  }
}
class Ph extends starknet__WEBPACK_IMPORTED_MODULE_1__/* .Account */ .gD {
  constructor(e, t, i, n) {
    super(e, t, i), this.wallet = n;
  }
  async execute(e, t, i = {}) {
    const n = Array.isArray(e) ? e : [e], s = t === void 0 || Array.isArray(t) ? i : t;
    return await this.wallet.wallet_requestAddInvokeTransaction({
      accountAddress: this.address,
      executionRequest: { calls: n, invocationDetails: s }
    });
  }
  async declare(e, t) {
    throw new Error("Not supported via Argent Login");
  }
  async deployAccount(e, t) {
    throw new Error("Not supported via Argent Login");
  }
}
class R5 {
  constructor(e) {
    this.wallet = e;
  }
  async getPubKey() {
    throw new Error("Not supported via Argent Login");
  }
  async signMessage(e, t) {
    const { signature: i } = await this.wallet.wallet_signTypedData({
      accountAddress: t,
      typedData: e
    });
    return i;
  }
  async signTransaction(e, t, i) {
    throw new Error("Not supported via Argent Login");
  }
  async signDeployAccountTransaction(e) {
    throw new Error("Not supported via Argent Login");
  }
  async signDeclareTransaction(e) {
    throw new Error("Not supported via Argent Login");
  }
}
const N5 = (r) => r.replace(/^SN_/, "SN"), T5 = (r) => r.replace(/^SN/, "SN_");
class C5 extends O5 {
  // TODO: improve typing
  constructor({ client: t, chainId: i, rpcUrl: n, provider: s }) {
    super();
    He(this, "id", "argentMobile");
    He(this, "name", "Argent Mobile");
    He(this, "version", "0.1.0");
    He(this, "icon", "");
    He(this, "provider");
    He(this, "signer");
    He(this, "account");
    He(this, "selectedAddress", "");
    // NamespaceAdapter
    He(this, "namespace", "starknet");
    He(this, "methods", [
      "starknet_supportedSpecs",
      "starknet_signTypedData",
      "starknet_requestAddInvokeTransaction",
      "wallet_supportedSpecs",
      "wallet_signTypedData",
      "wallet_addInvokeTransaction"
    ]);
    He(this, "events", ["chainChanged", "accountsChanged"]);
    He(this, "remoteSigner");
    He(this, "signerConnection");
    He(this, "rpcProvider");
    He(this, "chainId");
    He(this, "client");
    He(this, "session");
    He(this, "rpc");
    He(this, "walletRpc");
    He(this, "handleRequest");
    // StarknetWindowObject
    He(this, "request", async (t) => {
      if (!this.session)
        throw new Error("No session");
      let i = t.type;
      (i === "wallet_addInvokeTransaction" || i === "wallet_supportedSpecs" || i === "wallet_signTypedData") && (i = i.replace("wallet_", "starknet_"));
      const n = this.handleRequest[i];
      if (n)
        return n(t.params);
      throw new Error(`Not implemented: .request() for ${t.type}`);
    });
    He(this, "on", (t, i) => {
      this.eventEmitter.on(t, i);
    });
    He(this, "off", (t, i) => {
      this.eventEmitter.off(t, i);
    });
    He(this, "handleRequestChainId", () => this.chainId === starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.NetworkName.SN_SEPOLIA ? starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.StarknetChainId.SN_SEPOLIA : starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.StarknetChainId.SN_MAIN);
    He(this, "handleRequestAccounts", () => this.accounts);
    He(this, "handleGetPermissions", async () => await this.isPreauthorized() ? ["accounts"] : []);
    He(this, "handleAddInvokeTransaction", async (t) => {
      const { calls: i } = t;
      return await this.requestWallet({
        method: "starknet_requestAddInvokeTransaction",
        params: {
          accountAddress: this.account.address,
          executionRequest: {
            // will be removed when argent mobile will support entry_point and contract_address
            calls: i?.map(({ contract_address: n, entry_point: s, ...o }) => ({
              ...o,
              contractAddress: n,
              entrypoint: s
            }))
          }
        }
      });
    });
    He(this, "handleSignTypedData", async (t) => {
      const i = {
        accountAddress: this.account.address,
        typedData: t
      }, n = await this.requestWallet({
        method: "starknet_signTypedData",
        params: i
      });
      return "signature" in n ? n.signature : n;
    });
    He(this, "handleSupportedSpecs", async () => await this.requestWallet({
      method: "starknet_supportedSpecs",
      params: {}
    }));
    this.chainId = String(i ?? starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.NetworkName.SN_MAIN), this.rpc = {
      chains: i ? [this.formatChainId(this.chainId)] : [],
      methods: this.methods,
      events: this.events
    }, this.signerConnection = this.getSignerConnection(t), this.rpcProvider = new xd(this.signerConnection), this.client = t, this.registerEventListeners(), this.walletRpc = new Proxy({}, {
      get: (o, f) => (h) => this.requestWallet({ method: f, params: h })
    }), this.remoteSigner = new R5(this.walletRpc), this.provider = s || new starknet__WEBPACK_IMPORTED_MODULE_1__/* .RpcProvider */ .bd({ nodeUrl: n }), this.account = new Ph(
      this.provider,
      "",
      this.remoteSigner,
      this.walletRpc
    ), this.handleRequest = Object.freeze({
      wallet_requestChainId: this.handleRequestChainId,
      wallet_requestAccounts: this.handleRequestAccounts,
      wallet_getPermissions: this.handleGetPermissions,
      starknet_addInvokeTransaction: this.handleAddInvokeTransaction,
      starknet_signTypedData: this.handleSignTypedData,
      starknet_supportedSpecs: this.handleSupportedSpecs,
      wallet_addInvokeTransaction: this.handleAddInvokeTransaction,
      wallet_signTypedData: this.handleSignTypedData,
      wallet_supportedSpecs: this.handleSupportedSpecs
    });
  }
  getNetworkName(t) {
    if (t === "SN_SEPOLIA")
      return starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.NetworkName.SN_SEPOLIA;
    if (t === "SN_MAIN")
      return starknet__WEBPACK_IMPORTED_MODULE_1__/* .constants */ .AA.NetworkName.SN_MAIN;
    throw new Error(`Unknown starknet.js network name for chainId ${t}`);
  }
  async enable() {
    return await this.rpcProvider.connect(), this.accounts;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get isConnected() {
    return !0;
  }
  async isPreauthorized() {
    return !!this.client.session.getAll().find(this.isValidSession);
  }
  async requestWallet(t) {
    if (!this.session)
      throw new Error("No session");
    try {
      const { topic: i } = this.session, n = this.formatChainId(this.chainId);
      Nr.showApprovalModal(t);
      const s = await this.client.request({ topic: i, chainId: n, request: t });
      return Nr.closeModal("animateSuccess"), s;
    } catch (i) {
      throw Nr.closeModal(), i instanceof Error || i && i.message !== void 0 ? new Error(i.message) : new Error("Unknown error on requestWallet");
    }
  }
  // NamespaceAdapter
  get isConnecting() {
    return this.signerConnection.connecting;
  }
  async disable() {
    await this.rpcProvider.disconnect();
  }
  get isWalletConnect() {
    return !0;
  }
  // NamespaceAdapter private methods
  registerEventListeners() {
    super.registerEventListeners(), this.eventEmitter.on("chainChanged", (t) => {
      throw new Error("Not implemented: chainChanged");
    });
  }
  formatChainId(t) {
    return `${this.namespace}:${N5(t)}`;
  }
  parseChainId(t) {
    return T5(t.split(":")[1]);
  }
  setAccounts(t) {
    this.accounts = t.filter(
      (s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId
    ).map((s) => this.parseAccountId(s).address);
    const { address: i } = this.parseAccountId(t[0]), n = i.startsWith("0x") ? i : `0x${i}`;
    this.account = new Ph(
      this.provider,
      n,
      this.remoteSigner,
      this.walletRpc
    ), this.eventEmitter.emit("accountsChanged", this.accounts), this.selectedAddress = n;
  }
}
const o4 = async (r) => M5(r, C5);



/***/ })

};
