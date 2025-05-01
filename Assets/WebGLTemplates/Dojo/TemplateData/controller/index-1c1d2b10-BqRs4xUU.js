import { R as xf, p as cl, c as kr, L as gn, S as Of, A as ti, a as fl } from "./index-Dg5p01EY.js";
var ul = Object.defineProperty, dl = (e, t, i) => t in e ? ul(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, He = (e, t, i) => (dl(e, typeof t != "symbol" ? t + "" : t, i), i), Ma = { exports: {} }, an = typeof Reflect == "object" ? Reflect : null, uh = an && typeof an.apply == "function" ? an.apply : function(e, t, i) {
  return Function.prototype.apply.call(e, t, i);
}, Is;
an && typeof an.ownKeys == "function" ? Is = an.ownKeys : Object.getOwnPropertySymbols ? Is = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Is = function(e) {
  return Object.getOwnPropertyNames(e);
};
function ll(e) {
  console && console.warn && console.warn(e);
}
var Pf = Number.isNaN || function(e) {
  return e !== e;
};
function rt() {
  rt.init.call(this);
}
Ma.exports = rt;
Ma.exports.once = ml;
rt.EventEmitter = rt;
rt.prototype._events = void 0;
rt.prototype._eventsCount = 0;
rt.prototype._maxListeners = void 0;
var dh = 10;
function eo(e) {
  if (typeof e != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
Object.defineProperty(rt, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return dh;
  },
  set: function(e) {
    if (typeof e != "number" || e < 0 || Pf(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    dh = e;
  }
});
rt.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
rt.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || Pf(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function Nf(e) {
  return e._maxListeners === void 0 ? rt.defaultMaxListeners : e._maxListeners;
}
rt.prototype.getMaxListeners = function() {
  return Nf(this);
};
rt.prototype.emit = function(e) {
  for (var t = [], i = 1; i < arguments.length; i++)
    t.push(arguments[i]);
  var r = e === "error", n = this._events;
  if (n !== void 0)
    r = r && n.error === void 0;
  else if (!r)
    return !1;
  if (r) {
    var s;
    if (t.length > 0 && (s = t[0]), s instanceof Error)
      throw s;
    var a = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
    throw a.context = s, a;
  }
  var h = n[e];
  if (h === void 0)
    return !1;
  if (typeof h == "function")
    uh(h, this, t);
  else
    for (var d = h.length, f = Cf(h, d), i = 0; i < d; ++i)
      uh(f[i], this, t);
  return !0;
};
function Rf(e, t, i, r) {
  var n, s, a;
  if (eo(i), s = e._events, s === void 0 ? (s = e._events = /* @__PURE__ */ Object.create(null), e._eventsCount = 0) : (s.newListener !== void 0 && (e.emit(
    "newListener",
    t,
    i.listener ? i.listener : i
  ), s = e._events), a = s[t]), a === void 0)
    a = s[t] = i, ++e._eventsCount;
  else if (typeof a == "function" ? a = s[t] = r ? [i, a] : [a, i] : r ? a.unshift(i) : a.push(i), n = Nf(e), n > 0 && a.length > n && !a.warned) {
    a.warned = !0;
    var h = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    h.name = "MaxListenersExceededWarning", h.emitter = e, h.type = t, h.count = a.length, ll(h);
  }
  return e;
}
rt.prototype.addListener = function(e, t) {
  return Rf(this, e, t, !1);
};
rt.prototype.on = rt.prototype.addListener;
rt.prototype.prependListener = function(e, t) {
  return Rf(this, e, t, !0);
};
function pl() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Tf(e, t, i) {
  var r = { fired: !1, wrapFn: void 0, target: e, type: t, listener: i }, n = pl.bind(r);
  return n.listener = i, r.wrapFn = n, n;
}
rt.prototype.once = function(e, t) {
  return eo(t), this.on(e, Tf(this, e, t)), this;
};
rt.prototype.prependOnceListener = function(e, t) {
  return eo(t), this.prependListener(e, Tf(this, e, t)), this;
};
rt.prototype.removeListener = function(e, t) {
  var i, r, n, s, a;
  if (eo(t), r = this._events, r === void 0)
    return this;
  if (i = r[e], i === void 0)
    return this;
  if (i === t || i.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t));
  else if (typeof i != "function") {
    for (n = -1, s = i.length - 1; s >= 0; s--)
      if (i[s] === t || i[s].listener === t) {
        a = i[s].listener, n = s;
        break;
      }
    if (n < 0)
      return this;
    n === 0 ? i.shift() : gl(i, n), i.length === 1 && (r[e] = i[0]), r.removeListener !== void 0 && this.emit("removeListener", e, a || t);
  }
  return this;
};
rt.prototype.off = rt.prototype.removeListener;
rt.prototype.removeAllListeners = function(e) {
  var t, i, r;
  if (i = this._events, i === void 0)
    return this;
  if (i.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : i[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete i[e]), this;
  if (arguments.length === 0) {
    var n = Object.keys(i), s;
    for (r = 0; r < n.length; ++r)
      s = n[r], s !== "removeListener" && this.removeAllListeners(s);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = i[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (r = t.length - 1; r >= 0; r--)
      this.removeListener(e, t[r]);
  return this;
};
function kf(e, t, i) {
  var r = e._events;
  if (r === void 0)
    return [];
  var n = r[t];
  return n === void 0 ? [] : typeof n == "function" ? i ? [n.listener || n] : [n] : i ? bl(n) : Cf(n, n.length);
}
rt.prototype.listeners = function(e) {
  return kf(this, e, !0);
};
rt.prototype.rawListeners = function(e) {
  return kf(this, e, !1);
};
rt.listenerCount = function(e, t) {
  return typeof e.listenerCount == "function" ? e.listenerCount(t) : Lf.call(e, t);
};
rt.prototype.listenerCount = Lf;
function Lf(e) {
  var t = this._events;
  if (t !== void 0) {
    var i = t[e];
    if (typeof i == "function")
      return 1;
    if (i !== void 0)
      return i.length;
  }
  return 0;
}
rt.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Is(this._events) : [];
};
function Cf(e, t) {
  for (var i = new Array(t), r = 0; r < t; ++r)
    i[r] = e[r];
  return i;
}
function gl(e, t) {
  for (; t + 1 < e.length; t++)
    e[t] = e[t + 1];
  e.pop();
}
function bl(e) {
  for (var t = new Array(e.length), i = 0; i < t.length; ++i)
    t[i] = e[i].listener || e[i];
  return t;
}
function ml(e, t) {
  return new Promise(function(i, r) {
    function n(a) {
      e.removeListener(t, s), r(a);
    }
    function s() {
      typeof e.removeListener == "function" && e.removeListener("error", n), i([].slice.call(arguments));
    }
    qf(e, t, s, { once: !0 }), t !== "error" && yl(e, n, { once: !0 });
  });
}
function yl(e, t, i) {
  typeof e.on == "function" && qf(e, "error", t, i);
}
function qf(e, t, i, r) {
  if (typeof e.on == "function")
    r.once ? e.once(t, i) : e.on(t, i);
  else if (typeof e.addEventListener == "function")
    e.addEventListener(t, function n(s) {
      r.once && e.removeEventListener(t, n), i(s);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
}
var ri = Ma.exports;
const jf = /* @__PURE__ */ gn(ri);
var te = {};
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
var ea = function(e, t) {
  return ea = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
    i.__proto__ = r;
  } || function(i, r) {
    for (var n in r)
      r.hasOwnProperty(n) && (i[n] = r[n]);
  }, ea(e, t);
};
function vl(e, t) {
  ea(e, t);
  function i() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
}
var ta = function() {
  return ta = Object.assign || function(e) {
    for (var t, i = 1, r = arguments.length; i < r; i++) {
      t = arguments[i];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, ta.apply(this, arguments);
};
function wl(e, t) {
  var i = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (i[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, r = Object.getOwnPropertySymbols(e); n < r.length; n++)
      t.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[n]) && (i[r[n]] = e[r[n]]);
  return i;
}
function _l(e, t, i, r) {
  var n = arguments.length, s = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r, a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    s = Reflect.decorate(e, t, i, r);
  else
    for (var h = e.length - 1; h >= 0; h--)
      (a = e[h]) && (s = (n < 3 ? a(s) : n > 3 ? a(t, i, s) : a(t, i)) || s);
  return n > 3 && s && Object.defineProperty(t, i, s), s;
}
function El(e, t) {
  return function(i, r) {
    t(i, r, e);
  };
}
function Sl(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t);
}
function Il(e, t, i, r) {
  function n(s) {
    return s instanceof i ? s : new i(function(a) {
      a(s);
    });
  }
  return new (i || (i = Promise))(function(s, a) {
    function h(g) {
      try {
        f(r.next(g));
      } catch (_) {
        a(_);
      }
    }
    function d(g) {
      try {
        f(r.throw(g));
      } catch (_) {
        a(_);
      }
    }
    function f(g) {
      g.done ? s(g.value) : n(g.value).then(h, d);
    }
    f((r = r.apply(e, t || [])).next());
  });
}
function Ml(e, t) {
  var i = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, n, s, a;
  return a = { next: h(0), throw: h(1), return: h(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function h(f) {
    return function(g) {
      return d([f, g]);
    };
  }
  function d(f) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; i; )
      try {
        if (r = 1, n && (s = f[0] & 2 ? n.return : f[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, f[1])).done)
          return s;
        switch (n = 0, s && (f = [f[0] & 2, s.value]), f[0]) {
          case 0:
          case 1:
            s = f;
            break;
          case 4:
            return i.label++, { value: f[1], done: !1 };
          case 5:
            i.label++, n = f[1], f = [0];
            continue;
          case 7:
            f = i.ops.pop(), i.trys.pop();
            continue;
          default:
            if (s = i.trys, !(s = s.length > 0 && s[s.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              i = 0;
              continue;
            }
            if (f[0] === 3 && (!s || f[1] > s[0] && f[1] < s[3])) {
              i.label = f[1];
              break;
            }
            if (f[0] === 6 && i.label < s[1]) {
              i.label = s[1], s = f;
              break;
            }
            if (s && i.label < s[2]) {
              i.label = s[2], i.ops.push(f);
              break;
            }
            s[2] && i.ops.pop(), i.trys.pop();
            continue;
        }
        f = t.call(e, i);
      } catch (g) {
        f = [6, g], n = 0;
      } finally {
        r = s = 0;
      }
    if (f[0] & 5)
      throw f[1];
    return { value: f[0] ? f[1] : void 0, done: !0 };
  }
}
function Al(e, t, i, r) {
  r === void 0 && (r = i), e[r] = t[i];
}
function xl(e, t) {
  for (var i in e)
    i !== "default" && !t.hasOwnProperty(i) && (t[i] = e[i]);
}
function ia(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, i = t && e[t], r = 0;
  if (i)
    return i.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function zf(e, t) {
  var i = typeof Symbol == "function" && e[Symbol.iterator];
  if (!i)
    return e;
  var r = i.call(e), n, s = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; )
      s.push(n.value);
  } catch (h) {
    a = { error: h };
  } finally {
    try {
      n && !n.done && (i = r.return) && i.call(r);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return s;
}
function Ol() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(zf(arguments[t]));
  return e;
}
function Pl() {
  for (var e = 0, t = 0, i = arguments.length; t < i; t++)
    e += arguments[t].length;
  for (var r = Array(e), n = 0, t = 0; t < i; t++)
    for (var s = arguments[t], a = 0, h = s.length; a < h; a++, n++)
      r[n] = s[a];
  return r;
}
function Hn(e) {
  return this instanceof Hn ? (this.v = e, this) : new Hn(e);
}
function Nl(e, t, i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = i.apply(e, t || []), n, s = [];
  return n = {}, a("next"), a("throw"), a("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function a(x) {
    r[x] && (n[x] = function(A) {
      return new Promise(function(O, j) {
        s.push([x, A, O, j]) > 1 || h(x, A);
      });
    });
  }
  function h(x, A) {
    try {
      d(r[x](A));
    } catch (O) {
      _(s[0][3], O);
    }
  }
  function d(x) {
    x.value instanceof Hn ? Promise.resolve(x.value.v).then(f, g) : _(s[0][2], x);
  }
  function f(x) {
    h("next", x);
  }
  function g(x) {
    h("throw", x);
  }
  function _(x, A) {
    x(A), s.shift(), s.length && h(s[0][0], s[0][1]);
  }
}
function Rl(e) {
  var t, i;
  return t = {}, r("next"), r("throw", function(n) {
    throw n;
  }), r("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function r(n, s) {
    t[n] = e[n] ? function(a) {
      return (i = !i) ? { value: Hn(e[n](a)), done: n === "return" } : s ? s(a) : a;
    } : s;
  }
}
function Tl(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], i;
  return t ? t.call(e) : (e = typeof ia == "function" ? ia(e) : e[Symbol.iterator](), i = {}, r("next"), r("throw"), r("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function r(s) {
    i[s] = e[s] && function(a) {
      return new Promise(function(h, d) {
        a = e[s](a), n(h, d, a.done, a.value);
      });
    };
  }
  function n(s, a, h, d) {
    Promise.resolve(d).then(function(f) {
      s({ value: f, done: h });
    }, a);
  }
}
function kl(e, t) {
  return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
}
function Ll(e) {
  if (e && e.__esModule)
    return e;
  var t = {};
  if (e != null)
    for (var i in e)
      Object.hasOwnProperty.call(e, i) && (t[i] = e[i]);
  return t.default = e, t;
}
function Cl(e) {
  return e && e.__esModule ? e : { default: e };
}
function ql(e, t) {
  if (!t.has(e))
    throw new TypeError("attempted to get private field on non-instance");
  return t.get(e);
}
function jl(e, t, i) {
  if (!t.has(e))
    throw new TypeError("attempted to set private field on non-instance");
  return t.set(e, i), i;
}
const zl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return ta;
  },
  __asyncDelegator: Rl,
  __asyncGenerator: Nl,
  __asyncValues: Tl,
  __await: Hn,
  __awaiter: Il,
  __classPrivateFieldGet: ql,
  __classPrivateFieldSet: jl,
  __createBinding: Al,
  __decorate: _l,
  __exportStar: xl,
  __extends: vl,
  __generator: Ml,
  __importDefault: Cl,
  __importStar: Ll,
  __makeTemplateObject: kl,
  __metadata: Sl,
  __param: El,
  __read: zf,
  __rest: wl,
  __spread: Ol,
  __spreadArrays: Pl,
  __values: ia
}, Symbol.toStringTag, { value: "Module" })), Xn = /* @__PURE__ */ Of(zl);
var lh = {}, Nn = {}, ph;
function Ul() {
  if (ph)
    return Nn;
  ph = 1, Object.defineProperty(Nn, "__esModule", { value: !0 }), Nn.delay = void 0;
  function e(t) {
    return new Promise((i) => {
      setTimeout(() => {
        i(!0);
      }, t);
    });
  }
  return Nn.delay = e, Nn;
}
var Pr = {}, gh = {}, Qr = {}, bh;
function Dl() {
  return bh || (bh = 1, Object.defineProperty(Qr, "__esModule", { value: !0 }), Qr.ONE_THOUSAND = Qr.ONE_HUNDRED = void 0, Qr.ONE_HUNDRED = 100, Qr.ONE_THOUSAND = 1e3), Qr;
}
var mh = {}, yh;
function Fl() {
  return yh || (yh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ONE_YEAR = e.FOUR_WEEKS = e.THREE_WEEKS = e.TWO_WEEKS = e.ONE_WEEK = e.THIRTY_DAYS = e.SEVEN_DAYS = e.FIVE_DAYS = e.THREE_DAYS = e.ONE_DAY = e.TWENTY_FOUR_HOURS = e.TWELVE_HOURS = e.SIX_HOURS = e.THREE_HOURS = e.ONE_HOUR = e.SIXTY_MINUTES = e.THIRTY_MINUTES = e.TEN_MINUTES = e.FIVE_MINUTES = e.ONE_MINUTE = e.SIXTY_SECONDS = e.THIRTY_SECONDS = e.TEN_SECONDS = e.FIVE_SECONDS = e.ONE_SECOND = void 0, e.ONE_SECOND = 1, e.FIVE_SECONDS = 5, e.TEN_SECONDS = 10, e.THIRTY_SECONDS = 30, e.SIXTY_SECONDS = 60, e.ONE_MINUTE = e.SIXTY_SECONDS, e.FIVE_MINUTES = e.ONE_MINUTE * 5, e.TEN_MINUTES = e.ONE_MINUTE * 10, e.THIRTY_MINUTES = e.ONE_MINUTE * 30, e.SIXTY_MINUTES = e.ONE_MINUTE * 60, e.ONE_HOUR = e.SIXTY_MINUTES, e.THREE_HOURS = e.ONE_HOUR * 3, e.SIX_HOURS = e.ONE_HOUR * 6, e.TWELVE_HOURS = e.ONE_HOUR * 12, e.TWENTY_FOUR_HOURS = e.ONE_HOUR * 24, e.ONE_DAY = e.TWENTY_FOUR_HOURS, e.THREE_DAYS = e.ONE_DAY * 3, e.FIVE_DAYS = e.ONE_DAY * 5, e.SEVEN_DAYS = e.ONE_DAY * 7, e.THIRTY_DAYS = e.ONE_DAY * 30, e.ONE_WEEK = e.SEVEN_DAYS, e.TWO_WEEKS = e.ONE_WEEK * 2, e.THREE_WEEKS = e.ONE_WEEK * 3, e.FOUR_WEEKS = e.ONE_WEEK * 4, e.ONE_YEAR = e.ONE_DAY * 365;
  }(mh)), mh;
}
var vh;
function Uf() {
  return vh || (vh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
    const t = Xn;
    t.__exportStar(Dl(), e), t.__exportStar(Fl(), e);
  }(gh)), gh;
}
var wh;
function Kl() {
  if (wh)
    return Pr;
  wh = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.fromMiliseconds = Pr.toMiliseconds = void 0;
  const e = Uf();
  function t(r) {
    return r * e.ONE_THOUSAND;
  }
  Pr.toMiliseconds = t;
  function i(r) {
    return Math.floor(r / e.ONE_THOUSAND);
  }
  return Pr.fromMiliseconds = i, Pr;
}
var _h;
function Bl() {
  return _h || (_h = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
    const t = Xn;
    t.__exportStar(Ul(), e), t.__exportStar(Kl(), e);
  }(lh)), lh;
}
var en = {}, Eh;
function $l() {
  if (Eh)
    return en;
  Eh = 1, Object.defineProperty(en, "__esModule", { value: !0 }), en.Watch = void 0;
  class e {
    constructor() {
      this.timestamps = /* @__PURE__ */ new Map();
    }
    start(i) {
      if (this.timestamps.has(i))
        throw new Error(`Watch already started for label: ${i}`);
      this.timestamps.set(i, { started: Date.now() });
    }
    stop(i) {
      const r = this.get(i);
      if (typeof r.elapsed < "u")
        throw new Error(`Watch already stopped for label: ${i}`);
      const n = Date.now() - r.started;
      this.timestamps.set(i, { started: r.started, elapsed: n });
    }
    get(i) {
      const r = this.timestamps.get(i);
      if (typeof r > "u")
        throw new Error(`No timestamp found for label: ${i}`);
      return r;
    }
    elapsed(i) {
      const r = this.get(i);
      return r.elapsed || Date.now() - r.started;
    }
  }
  return en.Watch = e, en.default = e, en;
}
var Sh = {}, Rn = {}, Ih;
function Vl() {
  if (Ih)
    return Rn;
  Ih = 1, Object.defineProperty(Rn, "__esModule", { value: !0 }), Rn.IWatch = void 0;
  class e {
  }
  return Rn.IWatch = e, Rn;
}
var Mh;
function Hl() {
  return Mh || (Mh = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), Xn.__exportStar(Vl(), e);
  }(Sh)), Sh;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = Xn;
  t.__exportStar(Bl(), e), t.__exportStar($l(), e), t.__exportStar(Hl(), e), t.__exportStar(Uf(), e);
})(te);
class Vr {
}
let Wl = class extends Vr {
  constructor(e) {
    super();
  }
};
const Ah = te.FIVE_SECONDS, bn = { pulse: "heartbeat_pulse" };
let Gl = class Df extends Wl {
  constructor(t) {
    super(t), this.events = new ri.EventEmitter(), this.interval = Ah, this.interval = t?.interval || Ah;
  }
  static async init(t) {
    const i = new Df(t);
    return await i.init(), i;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(t, i) {
    this.events.on(t, i);
  }
  once(t, i) {
    this.events.once(t, i);
  }
  off(t, i) {
    this.events.off(t, i);
  }
  removeListener(t, i) {
    this.events.removeListener(t, i);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), te.toMiliseconds(this.interval));
  }
  pulse() {
    this.events.emit(bn.pulse);
  }
};
const Yl = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Jl = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Zl = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Xl(e, t) {
  if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
    Ql(e);
    return;
  }
  return t;
}
function Ql(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function ys(e, t = {}) {
  if (typeof e != "string")
    return e;
  const i = e.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    e[0] === '"' && e.endsWith('"') && !e.includes("\\")
  )
    return i.slice(1, -1);
  if (i.length <= 9) {
    const r = i.toLowerCase();
    if (r === "true")
      return !0;
    if (r === "false")
      return !1;
    if (r === "undefined")
      return;
    if (r === "null")
      return null;
    if (r === "nan")
      return Number.NaN;
    if (r === "infinity")
      return Number.POSITIVE_INFINITY;
    if (r === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!Zl.test(e)) {
    if (t.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (Yl.test(e) || Jl.test(e)) {
      if (t.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, Xl);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict)
      throw r;
    return e;
  }
}
function e0(e) {
  return !e || typeof e.then != "function" ? Promise.resolve(e) : e;
}
function _t(e, ...t) {
  try {
    return e0(e(...t));
  } catch (i) {
    return Promise.reject(i);
  }
}
function t0(e) {
  const t = typeof e;
  return e === null || t !== "object" && t !== "function";
}
function i0(e) {
  const t = Object.getPrototypeOf(e);
  return !t || t.isPrototypeOf(Object);
}
function Ms(e) {
  if (t0(e))
    return String(e);
  if (i0(e) || Array.isArray(e))
    return JSON.stringify(e);
  if (typeof e.toJSON == "function")
    return Ms(e.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
const ra = "base64:";
function r0(e) {
  return typeof e == "string" ? e : ra + o0(e);
}
function n0(e) {
  return typeof e != "string" || !e.startsWith(ra) ? e : s0(e.slice(ra.length));
}
function s0(e) {
  return globalThis.Buffer ? Buffer.from(e, "base64") : Uint8Array.from(
    globalThis.atob(e),
    (t) => t.codePointAt(0)
  );
}
function o0(e) {
  return globalThis.Buffer ? Buffer.from(e).toString("base64") : globalThis.btoa(String.fromCodePoint(...e));
}
function Wt(e) {
  return e && e.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function a0(...e) {
  return Wt(e.join(":"));
}
function vs(e) {
  return e = Wt(e), e ? e + ":" : "";
}
const h0 = "memory", c0 = () => {
  const e = /* @__PURE__ */ new Map();
  return {
    name: h0,
    getInstance: () => e,
    hasItem(t) {
      return e.has(t);
    },
    getItem(t) {
      return e.get(t) ?? null;
    },
    getItemRaw(t) {
      return e.get(t) ?? null;
    },
    setItem(t, i) {
      e.set(t, i);
    },
    setItemRaw(t, i) {
      e.set(t, i);
    },
    removeItem(t) {
      e.delete(t);
    },
    getKeys() {
      return [...e.keys()];
    },
    clear() {
      e.clear();
    },
    dispose() {
      e.clear();
    }
  };
};
function f0(e = {}) {
  const t = {
    mounts: { "": e.driver || c0() },
    mountpoints: [""],
    watching: !1,
    watchListeners: [],
    unwatch: {}
  }, i = (f) => {
    for (const g of t.mountpoints)
      if (f.startsWith(g))
        return {
          base: g,
          relativeKey: f.slice(g.length),
          driver: t.mounts[g]
        };
    return {
      base: "",
      relativeKey: f,
      driver: t.mounts[""]
    };
  }, r = (f, g) => t.mountpoints.filter(
    (_) => _.startsWith(f) || g && f.startsWith(_)
  ).map((_) => ({
    relativeBase: f.length > _.length ? f.slice(_.length) : void 0,
    mountpoint: _,
    driver: t.mounts[_]
  })), n = (f, g) => {
    if (t.watching) {
      g = Wt(g);
      for (const _ of t.watchListeners)
        _(f, g);
    }
  }, s = async () => {
    if (!t.watching) {
      t.watching = !0;
      for (const f in t.mounts)
        t.unwatch[f] = await xh(
          t.mounts[f],
          n,
          f
        );
    }
  }, a = async () => {
    if (t.watching) {
      for (const f in t.unwatch)
        await t.unwatch[f]();
      t.unwatch = {}, t.watching = !1;
    }
  }, h = (f, g, _) => {
    const x = /* @__PURE__ */ new Map(), A = (O) => {
      let j = x.get(O.base);
      return j || (j = {
        driver: O.driver,
        base: O.base,
        items: []
      }, x.set(O.base, j)), j;
    };
    for (const O of f) {
      const j = typeof O == "string", F = Wt(j ? O : O.key), V = j ? void 0 : O.value, C = j || !O.options ? g : { ...g, ...O.options }, K = i(F);
      A(K).items.push({
        key: F,
        value: V,
        relativeKey: K.relativeKey,
        options: C
      });
    }
    return Promise.all([...x.values()].map((O) => _(O))).then(
      (O) => O.flat()
    );
  }, d = {
    // Item
    hasItem(f, g = {}) {
      f = Wt(f);
      const { relativeKey: _, driver: x } = i(f);
      return _t(x.hasItem, _, g);
    },
    getItem(f, g = {}) {
      f = Wt(f);
      const { relativeKey: _, driver: x } = i(f);
      return _t(x.getItem, _, g).then(
        (A) => ys(A)
      );
    },
    getItems(f, g = {}) {
      return h(f, g, (_) => _.driver.getItems ? _t(
        _.driver.getItems,
        _.items.map((x) => ({
          key: x.relativeKey,
          options: x.options
        })),
        g
      ).then(
        (x) => x.map((A) => ({
          key: a0(_.base, A.key),
          value: ys(A.value)
        }))
      ) : Promise.all(
        _.items.map((x) => _t(
          _.driver.getItem,
          x.relativeKey,
          x.options
        ).then((A) => ({
          key: x.key,
          value: ys(A)
        })))
      ));
    },
    getItemRaw(f, g = {}) {
      f = Wt(f);
      const { relativeKey: _, driver: x } = i(f);
      return x.getItemRaw ? _t(x.getItemRaw, _, g) : _t(x.getItem, _, g).then(
        (A) => n0(A)
      );
    },
    async setItem(f, g, _ = {}) {
      if (g === void 0)
        return d.removeItem(f);
      f = Wt(f);
      const { relativeKey: x, driver: A } = i(f);
      A.setItem && (await _t(A.setItem, x, Ms(g), _), A.watch || n("update", f));
    },
    async setItems(f, g) {
      await h(f, g, async (_) => {
        if (_.driver.setItems)
          return _t(
            _.driver.setItems,
            _.items.map((x) => ({
              key: x.relativeKey,
              value: Ms(x.value),
              options: x.options
            })),
            g
          );
        _.driver.setItem && await Promise.all(
          _.items.map((x) => _t(
            _.driver.setItem,
            x.relativeKey,
            Ms(x.value),
            x.options
          ))
        );
      });
    },
    async setItemRaw(f, g, _ = {}) {
      if (g === void 0)
        return d.removeItem(f, _);
      f = Wt(f);
      const { relativeKey: x, driver: A } = i(f);
      if (A.setItemRaw)
        await _t(A.setItemRaw, x, g, _);
      else if (A.setItem)
        await _t(A.setItem, x, r0(g), _);
      else
        return;
      A.watch || n("update", f);
    },
    async removeItem(f, g = {}) {
      typeof g == "boolean" && (g = { removeMeta: g }), f = Wt(f);
      const { relativeKey: _, driver: x } = i(f);
      x.removeItem && (await _t(x.removeItem, _, g), (g.removeMeta || g.removeMata) && await _t(x.removeItem, _ + "$", g), x.watch || n("remove", f));
    },
    // Meta
    async getMeta(f, g = {}) {
      typeof g == "boolean" && (g = { nativeOnly: g }), f = Wt(f);
      const { relativeKey: _, driver: x } = i(f), A = /* @__PURE__ */ Object.create(null);
      if (x.getMeta && Object.assign(A, await _t(x.getMeta, _, g)), !g.nativeOnly) {
        const O = await _t(
          x.getItem,
          _ + "$",
          g
        ).then((j) => ys(j));
        O && typeof O == "object" && (typeof O.atime == "string" && (O.atime = new Date(O.atime)), typeof O.mtime == "string" && (O.mtime = new Date(O.mtime)), Object.assign(A, O));
      }
      return A;
    },
    setMeta(f, g, _ = {}) {
      return this.setItem(f + "$", g, _);
    },
    removeMeta(f, g = {}) {
      return this.removeItem(f + "$", g);
    },
    // Keys
    async getKeys(f, g = {}) {
      f = vs(f);
      const _ = r(f, !0);
      let x = [];
      const A = [];
      for (const O of _) {
        const j = await _t(
          O.driver.getKeys,
          O.relativeBase,
          g
        );
        for (const F of j) {
          const V = O.mountpoint + Wt(F);
          x.some((C) => V.startsWith(C)) || A.push(V);
        }
        x = [
          O.mountpoint,
          ...x.filter((F) => !F.startsWith(O.mountpoint))
        ];
      }
      return f ? A.filter(
        (O) => O.startsWith(f) && O[O.length - 1] !== "$"
      ) : A.filter((O) => O[O.length - 1] !== "$");
    },
    // Utils
    async clear(f, g = {}) {
      f = vs(f), await Promise.all(
        r(f, !1).map(async (_) => {
          if (_.driver.clear)
            return _t(_.driver.clear, _.relativeBase, g);
          if (_.driver.removeItem) {
            const x = await _.driver.getKeys(_.relativeBase || "", g);
            return Promise.all(
              x.map((A) => _.driver.removeItem(A, g))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(t.mounts).map((f) => Oh(f))
      );
    },
    async watch(f) {
      return await s(), t.watchListeners.push(f), async () => {
        t.watchListeners = t.watchListeners.filter(
          (g) => g !== f
        ), t.watchListeners.length === 0 && await a();
      };
    },
    async unwatch() {
      t.watchListeners = [], await a();
    },
    // Mount
    mount(f, g) {
      if (f = vs(f), f && t.mounts[f])
        throw new Error(`already mounted at ${f}`);
      return f && (t.mountpoints.push(f), t.mountpoints.sort((_, x) => x.length - _.length)), t.mounts[f] = g, t.watching && Promise.resolve(xh(g, n, f)).then((_) => {
        t.unwatch[f] = _;
      }).catch(console.error), d;
    },
    async unmount(f, g = !0) {
      f = vs(f), !(!f || !t.mounts[f]) && (t.watching && f in t.unwatch && (t.unwatch[f]?.(), delete t.unwatch[f]), g && await Oh(t.mounts[f]), t.mountpoints = t.mountpoints.filter((_) => _ !== f), delete t.mounts[f]);
    },
    getMount(f = "") {
      f = Wt(f) + ":";
      const g = i(f);
      return {
        driver: g.driver,
        base: g.base
      };
    },
    getMounts(f = "", g = {}) {
      return f = Wt(f), r(f, g.parents).map((_) => ({
        driver: _.driver,
        base: _.mountpoint
      }));
    },
    // Aliases
    keys: (f, g = {}) => d.getKeys(f, g),
    get: (f, g = {}) => d.getItem(f, g),
    set: (f, g, _ = {}) => d.setItem(f, g, _),
    has: (f, g = {}) => d.hasItem(f, g),
    del: (f, g = {}) => d.removeItem(f, g),
    remove: (f, g = {}) => d.removeItem(f, g)
  };
  return d;
}
function xh(e, t, i) {
  return e.watch ? e.watch((r, n) => t(r, i + n)) : () => {
  };
}
async function Oh(e) {
  typeof e.dispose == "function" && await _t(e.dispose);
}
function Hr(e) {
  return new Promise((t, i) => {
    e.oncomplete = e.onsuccess = () => t(e.result), e.onabort = e.onerror = () => i(e.error);
  });
}
function Ff(e, t) {
  const i = indexedDB.open(e);
  i.onupgradeneeded = () => i.result.createObjectStore(t);
  const r = Hr(i);
  return (n, s) => r.then((a) => s(a.transaction(t, n).objectStore(t)));
}
let Ro;
function Qn() {
  return Ro || (Ro = Ff("keyval-store", "keyval")), Ro;
}
function Ph(e, t = Qn()) {
  return t("readonly", (i) => Hr(i.get(e)));
}
function u0(e, t, i = Qn()) {
  return i("readwrite", (r) => (r.put(t, e), Hr(r.transaction)));
}
function d0(e, t = Qn()) {
  return t("readwrite", (i) => (i.delete(e), Hr(i.transaction)));
}
function l0(e = Qn()) {
  return e("readwrite", (t) => (t.clear(), Hr(t.transaction)));
}
function p0(e, t) {
  return e.openCursor().onsuccess = function() {
    this.result && (t(this.result), this.result.continue());
  }, Hr(e.transaction);
}
function g0(e = Qn()) {
  return e("readonly", (t) => {
    if (t.getAllKeys)
      return Hr(t.getAllKeys());
    const i = [];
    return p0(t, (r) => i.push(r.key)).then(() => i);
  });
}
const b0 = (e) => JSON.stringify(e, (t, i) => typeof i == "bigint" ? i.toString() + "n" : i), m0 = (e) => {
  const t = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g, i = e.replace(t, '$1"$2n"$3');
  return JSON.parse(i, (r, n) => typeof n == "string" && n.match(/^\d+n$/) ? BigInt(n.substring(0, n.length - 1)) : n);
};
function fn(e) {
  if (typeof e != "string")
    throw new Error(`Cannot safe json parse value of type ${typeof e}`);
  try {
    return m0(e);
  } catch {
    return e;
  }
}
function Fr(e) {
  return typeof e == "string" ? e : b0(e) || "";
}
const y0 = "idb-keyval";
var v0 = (e = {}) => {
  const t = e.base && e.base.length > 0 ? `${e.base}:` : "", i = (n) => t + n;
  let r;
  return e.dbName && e.storeName && (r = Ff(e.dbName, e.storeName)), { name: y0, options: e, async hasItem(n) {
    return !(typeof await Ph(i(n), r) > "u");
  }, async getItem(n) {
    return await Ph(i(n), r) ?? null;
  }, setItem(n, s) {
    return u0(i(n), s, r);
  }, removeItem(n) {
    return d0(i(n), r);
  }, getKeys() {
    return g0(r);
  }, clear() {
    return l0(r);
  } };
};
const w0 = "WALLET_CONNECT_V2_INDEXED_DB", _0 = "keyvaluestorage";
let E0 = class {
  constructor() {
    this.indexedDb = f0({ driver: v0({ dbName: w0, storeName: _0 }) });
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
    await this.indexedDb.setItem(e, Fr(t));
  }
  async removeItem(e) {
    await this.indexedDb.removeItem(e);
  }
};
var To = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, As = { exports: {} };
(function() {
  let e;
  function t() {
  }
  e = t, e.prototype.getItem = function(i) {
    return this.hasOwnProperty(i) ? String(this[i]) : null;
  }, e.prototype.setItem = function(i, r) {
    this[i] = String(r);
  }, e.prototype.removeItem = function(i) {
    delete this[i];
  }, e.prototype.clear = function() {
    const i = this;
    Object.keys(i).forEach(function(r) {
      i[r] = void 0, delete i[r];
    });
  }, e.prototype.key = function(i) {
    return i = i || 0, Object.keys(this)[i];
  }, e.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof To < "u" && To.localStorage ? As.exports = To.localStorage : typeof window < "u" && window.localStorage ? As.exports = window.localStorage : As.exports = new t();
})();
function S0(e) {
  var t;
  return [e[0], fn((t = e[1]) != null ? t : "")];
}
let I0 = class {
  constructor() {
    this.localStorage = As.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(S0);
  }
  async getItem(e) {
    const t = this.localStorage.getItem(e);
    if (t !== null)
      return fn(t);
  }
  async setItem(e, t) {
    this.localStorage.setItem(e, Fr(t));
  }
  async removeItem(e) {
    this.localStorage.removeItem(e);
  }
};
const M0 = "wc_storage_version", Nh = 1, A0 = async (e, t, i) => {
  const r = M0, n = await t.getItem(r);
  if (n && n >= Nh) {
    i(t);
    return;
  }
  const s = await e.getKeys();
  if (!s.length) {
    i(t);
    return;
  }
  const a = [];
  for (; s.length; ) {
    const h = s.shift();
    if (!h)
      continue;
    const d = h.toLowerCase();
    if (d.includes("wc@") || d.includes("walletconnect") || d.includes("wc_") || d.includes("wallet_connect")) {
      const f = await e.getItem(h);
      await t.setItem(h, f), a.push(h);
    }
  }
  await t.setItem(r, Nh), i(t), x0(e, a);
}, x0 = async (e, t) => {
  t.length && t.forEach(async (i) => {
    await e.removeItem(i);
  });
};
let O0 = class {
  constructor() {
    this.initialized = !1, this.setInitialized = (t) => {
      this.storage = t, this.initialized = !0;
    };
    const e = new I0();
    this.storage = e;
    try {
      const t = new E0();
      A0(e, t, this.setInitialized);
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
function P0(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return '"[Circular]"';
  }
}
var N0 = R0;
function R0(e, t, i) {
  var r = i && i.stringify || P0, n = 1;
  if (typeof e == "object" && e !== null) {
    var s = t.length + n;
    if (s === 1)
      return e;
    var a = new Array(s);
    a[0] = r(e);
    for (var h = 1; h < s; h++)
      a[h] = r(t[h]);
    return a.join(" ");
  }
  if (typeof e != "string")
    return e;
  var d = t.length;
  if (d === 0)
    return e;
  for (var f = "", g = 1 - n, _ = -1, x = e && e.length || 0, A = 0; A < x; ) {
    if (e.charCodeAt(A) === 37 && A + 1 < x) {
      switch (_ = _ > -1 ? _ : 0, e.charCodeAt(A + 1)) {
        case 100:
        case 102:
          if (g >= d || t[g] == null)
            break;
          _ < A && (f += e.slice(_, A)), f += Number(t[g]), _ = A + 2, A++;
          break;
        case 105:
          if (g >= d || t[g] == null)
            break;
          _ < A && (f += e.slice(_, A)), f += Math.floor(Number(t[g])), _ = A + 2, A++;
          break;
        case 79:
        case 111:
        case 106:
          if (g >= d || t[g] === void 0)
            break;
          _ < A && (f += e.slice(_, A));
          var O = typeof t[g];
          if (O === "string") {
            f += "'" + t[g] + "'", _ = A + 2, A++;
            break;
          }
          if (O === "function") {
            f += t[g].name || "<anonymous>", _ = A + 2, A++;
            break;
          }
          f += r(t[g]), _ = A + 2, A++;
          break;
        case 115:
          if (g >= d)
            break;
          _ < A && (f += e.slice(_, A)), f += String(t[g]), _ = A + 2, A++;
          break;
        case 37:
          _ < A && (f += e.slice(_, A)), f += "%", _ = A + 2, A++, g--;
          break;
      }
      ++g;
    }
    ++A;
  }
  return _ === -1 ? e : (_ < x && (f += e.slice(_)), f);
}
const Rh = N0;
var sn = Li;
const Wn = F0().console || {}, T0 = {
  mapHttpRequest: ws,
  mapHttpResponse: ws,
  wrapRequestSerializer: ko,
  wrapResponseSerializer: ko,
  wrapErrorSerializer: ko,
  req: ws,
  res: ws,
  err: j0
};
function k0(e, t) {
  return Array.isArray(e) ? e.filter(function(i) {
    return i !== "!stdSerializers.err";
  }) : e === !0 ? Object.keys(t) : !1;
}
function Li(e) {
  e = e || {}, e.browser = e.browser || {};
  const t = e.browser.transmit;
  if (t && typeof t.send != "function")
    throw Error("pino: transmit option must have a send function");
  const i = e.browser.write || Wn;
  e.browser.write && (e.browser.asObject = !0);
  const r = e.serializers || {}, n = k0(e.browser.serialize, r);
  let s = e.browser.serialize;
  Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (s = !1);
  const a = ["error", "fatal", "warn", "info", "debug", "trace"];
  typeof i == "function" && (i.error = i.fatal = i.warn = i.info = i.debug = i.trace = i), e.enabled === !1 && (e.level = "silent");
  const h = e.level || "info", d = Object.create(i);
  d.log || (d.log = Gn), Object.defineProperty(d, "levelVal", {
    get: g
  }), Object.defineProperty(d, "level", {
    get: _,
    set: x
  });
  const f = {
    transmit: t,
    serialize: n,
    asObject: e.browser.asObject,
    levels: a,
    timestamp: z0(e)
  };
  d.levels = Li.levels, d.level = h, d.setMaxListeners = d.getMaxListeners = d.emit = d.addListener = d.on = d.prependListener = d.once = d.prependOnceListener = d.removeListener = d.removeAllListeners = d.listeners = d.listenerCount = d.eventNames = d.write = d.flush = Gn, d.serializers = r, d._serialize = n, d._stdErrSerialize = s, d.child = A, t && (d._logEvent = na());
  function g() {
    return this.level === "silent" ? 1 / 0 : this.levels.values[this.level];
  }
  function _() {
    return this._level;
  }
  function x(O) {
    if (O !== "silent" && !this.levels.values[O])
      throw Error("unknown level " + O);
    this._level = O, tn(f, d, "error", "log"), tn(f, d, "fatal", "error"), tn(f, d, "warn", "error"), tn(f, d, "info", "log"), tn(f, d, "debug", "log"), tn(f, d, "trace", "log");
  }
  function A(O, j) {
    if (!O)
      throw new Error("missing bindings for child Pino");
    j = j || {}, n && O.serializers && (j.serializers = O.serializers);
    const F = j.serializers;
    if (n && F) {
      var V = Object.assign({}, r, F), C = e.browser.serialize === !0 ? Object.keys(V) : n;
      delete O.serializers, to([O], C, V, this._stdErrSerialize);
    }
    function K(N) {
      this._childLevel = (N._childLevel | 0) + 1, this.error = rn(N, O, "error"), this.fatal = rn(N, O, "fatal"), this.warn = rn(N, O, "warn"), this.info = rn(N, O, "info"), this.debug = rn(N, O, "debug"), this.trace = rn(N, O, "trace"), V && (this.serializers = V, this._serialize = C), t && (this._logEvent = na(
        [].concat(N._logEvent.bindings, O)
      ));
    }
    return K.prototype = this, new K(this);
  }
  return d;
}
Li.levels = {
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
Li.stdSerializers = T0;
Li.stdTimeFunctions = Object.assign({}, { nullTime: Kf, epochTime: Bf, unixTime: U0, isoTime: D0 });
function tn(e, t, i, r) {
  const n = Object.getPrototypeOf(t);
  t[i] = t.levelVal > t.levels.values[i] ? Gn : n[i] ? n[i] : Wn[i] || Wn[r] || Gn, L0(e, t, i);
}
function L0(e, t, i) {
  !e.transmit && t[i] === Gn || (t[i] = /* @__PURE__ */ function(r) {
    return function() {
      const n = e.timestamp(), s = new Array(arguments.length), a = Object.getPrototypeOf && Object.getPrototypeOf(this) === Wn ? Wn : this;
      for (var h = 0; h < s.length; h++)
        s[h] = arguments[h];
      if (e.serialize && !e.asObject && to(s, this._serialize, this.serializers, this._stdErrSerialize), e.asObject ? r.call(a, C0(this, i, s, n)) : r.apply(a, s), e.transmit) {
        const d = e.transmit.level || t.level, f = Li.levels.values[d], g = Li.levels.values[i];
        if (g < f)
          return;
        q0(this, {
          ts: n,
          methodLevel: i,
          methodValue: g,
          transmitValue: Li.levels.values[e.transmit.level || t.level],
          send: e.transmit.send,
          val: t.levelVal
        }, s);
      }
    };
  }(t[i]));
}
function C0(e, t, i, r) {
  e._serialize && to(i, e._serialize, e.serializers, e._stdErrSerialize);
  const n = i.slice();
  let s = n[0];
  const a = {};
  r && (a.time = r), a.level = Li.levels.values[t];
  let h = (e._childLevel | 0) + 1;
  if (h < 1 && (h = 1), s !== null && typeof s == "object") {
    for (; h-- && typeof n[0] == "object"; )
      Object.assign(a, n.shift());
    s = n.length ? Rh(n.shift(), n) : void 0;
  } else
    typeof s == "string" && (s = Rh(n.shift(), n));
  return s !== void 0 && (a.msg = s), a;
}
function to(e, t, i, r) {
  for (const n in e)
    if (r && e[n] instanceof Error)
      e[n] = Li.stdSerializers.err(e[n]);
    else if (typeof e[n] == "object" && !Array.isArray(e[n]))
      for (const s in e[n])
        t && t.indexOf(s) > -1 && s in i && (e[n][s] = i[s](e[n][s]));
}
function rn(e, t, i) {
  return function() {
    const r = new Array(1 + arguments.length);
    r[0] = t;
    for (var n = 1; n < r.length; n++)
      r[n] = arguments[n - 1];
    return e[i].apply(this, r);
  };
}
function q0(e, t, i) {
  const r = t.send, n = t.ts, s = t.methodLevel, a = t.methodValue, h = t.val, d = e._logEvent.bindings;
  to(
    i,
    e._serialize || Object.keys(e.serializers),
    e.serializers,
    e._stdErrSerialize === void 0 ? !0 : e._stdErrSerialize
  ), e._logEvent.ts = n, e._logEvent.messages = i.filter(function(f) {
    return d.indexOf(f) === -1;
  }), e._logEvent.level.label = s, e._logEvent.level.value = a, r(s, e._logEvent, h), e._logEvent = na(d);
}
function na(e) {
  return {
    ts: 0,
    messages: [],
    bindings: e || [],
    level: { label: "", value: 0 }
  };
}
function j0(e) {
  const t = {
    type: e.constructor.name,
    msg: e.message,
    stack: e.stack
  };
  for (const i in e)
    t[i] === void 0 && (t[i] = e[i]);
  return t;
}
function z0(e) {
  return typeof e.timestamp == "function" ? e.timestamp : e.timestamp === !1 ? Kf : Bf;
}
function ws() {
  return {};
}
function ko(e) {
  return e;
}
function Gn() {
}
function Kf() {
  return !1;
}
function Bf() {
  return Date.now();
}
function U0() {
  return Math.round(Date.now() / 1e3);
}
function D0() {
  return new Date(Date.now()).toISOString();
}
function F0() {
  function e(t) {
    return typeof t < "u" && t;
  }
  try {
    return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
      get: function() {
        return delete Object.prototype.globalThis, this.globalThis = this;
      },
      configurable: !0
    }), globalThis;
  } catch {
    return e(self) || e(window) || e(this) || {};
  }
}
const io = /* @__PURE__ */ gn(sn), K0 = { level: "info" }, es = "custom_context", Aa = 1e3 * 1024;
let B0 = class {
  constructor(e) {
    this.nodeValue = e, this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length, this.next = null;
  }
  get value() {
    return this.nodeValue;
  }
  get size() {
    return this.sizeInBytes;
  }
}, Th = class {
  constructor(e) {
    this.head = null, this.tail = null, this.lengthInNodes = 0, this.maxSizeInBytes = e, this.sizeInBytes = 0;
  }
  append(e) {
    const t = new B0(e);
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
}, $f = class {
  constructor(e, t = Aa) {
    this.level = e ?? "error", this.levelValue = sn.levels.values[this.level], this.MAX_LOG_SIZE_IN_BYTES = t, this.logs = new Th(this.MAX_LOG_SIZE_IN_BYTES);
  }
  forwardToConsole(e, t) {
    t === sn.levels.values.error ? console.error(e) : t === sn.levels.values.warn ? console.warn(e) : t === sn.levels.values.debug ? console.debug(e) : t === sn.levels.values.trace ? console.trace(e) : console.log(e);
  }
  appendToLogs(e) {
    this.logs.append(Fr({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), log: e }));
    const t = typeof e == "string" ? JSON.parse(e).level : e.level;
    t >= this.levelValue && this.forwardToConsole(e, t);
  }
  getLogs() {
    return this.logs;
  }
  clearLogs() {
    this.logs = new Th(this.MAX_LOG_SIZE_IN_BYTES);
  }
  getLogArray() {
    return Array.from(this.logs);
  }
  logsToBlob(e) {
    const t = this.getLogArray();
    return t.push(Fr({ extraMetadata: e })), new Blob(t, { type: "application/json" });
  }
};
class $0 {
  constructor(t, i = Aa) {
    this.baseChunkLogger = new $f(t, i);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
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
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
  downloadLogsBlobInBrowser(t) {
    const i = URL.createObjectURL(this.logsToBlob(t)), r = document.createElement("a");
    r.href = i, r.download = `walletconnect-logs-${(/* @__PURE__ */ new Date()).toISOString()}.txt`, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(i);
  }
}
class V0 {
  constructor(t, i = Aa) {
    this.baseChunkLogger = new $f(t, i);
  }
  write(t) {
    this.baseChunkLogger.appendToLogs(t);
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
  logsToBlob(t) {
    return this.baseChunkLogger.logsToBlob(t);
  }
}
var H0 = Object.defineProperty, W0 = Object.defineProperties, G0 = Object.getOwnPropertyDescriptors, kh = Object.getOwnPropertySymbols, Y0 = Object.prototype.hasOwnProperty, J0 = Object.prototype.propertyIsEnumerable, Lh = (e, t, i) => t in e ? H0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Cs = (e, t) => {
  for (var i in t || (t = {}))
    Y0.call(t, i) && Lh(e, i, t[i]);
  if (kh)
    for (var i of kh(t))
      J0.call(t, i) && Lh(e, i, t[i]);
  return e;
}, qs = (e, t) => W0(e, G0(t));
function xa(e) {
  return qs(Cs({}, e), { level: e?.level || K0.level });
}
function Z0(e, t = es) {
  return e[t] || "";
}
function X0(e, t, i = es) {
  return e[i] = t, e;
}
function Zt(e, t = es) {
  let i = "";
  return typeof e.bindings > "u" ? i = Z0(e, t) : i = e.bindings().context || "", i;
}
function Q0(e, t, i = es) {
  const r = Zt(e, i);
  return r.trim() ? `${r}/${t}` : t;
}
function Ft(e, t, i = es) {
  const r = Q0(e, t, i), n = e.child({ context: r });
  return X0(n, r, i);
}
function ep(e) {
  var t, i;
  const r = new $0((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
  return { logger: io(qs(Cs({}, e.opts), { level: "trace", browser: qs(Cs({}, (i = e.opts) == null ? void 0 : i.browser), { write: (n) => r.write(n) }) })), chunkLoggerController: r };
}
function tp(e) {
  var t;
  const i = new V0((t = e.opts) == null ? void 0 : t.level, e.maxSizeInBytes);
  return { logger: io(qs(Cs({}, e.opts), { level: "trace" }), i), chunkLoggerController: i };
}
function ip(e) {
  return typeof e.loggerOverride < "u" && typeof e.loggerOverride != "string" ? { logger: e.loggerOverride, chunkLoggerController: null } : typeof window < "u" ? ep(e) : tp(e);
}
let rp = class extends Vr {
  constructor(e) {
    super(), this.opts = e, this.protocol = "wc", this.version = 2;
  }
}, np = class extends Vr {
  constructor(e, t) {
    super(), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
class sp {
  constructor(t, i) {
    this.logger = t, this.core = i;
  }
}
let op = class extends Vr {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
};
class ap extends Vr {
  constructor(t) {
    super();
  }
}
class hp {
  constructor(t, i, r, n) {
    this.core = t, this.logger = i, this.name = r;
  }
}
let cp = class extends Vr {
  constructor(e, t) {
    super(), this.relayer = e, this.logger = t;
  }
}, fp = class extends Vr {
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
}, gp = class {
  constructor(e) {
    this.client = e;
  }
};
var Oa = {}, Er = {}, ro = {}, no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
no.BrowserRandomSource = void 0;
const Ch = 65536;
class bp {
  constructor() {
    this.isAvailable = !1, this.isInstantiated = !1;
    const t = typeof self < "u" ? self.crypto || self.msCrypto : null;
    t && t.getRandomValues !== void 0 && (this._crypto = t, this.isAvailable = !0, this.isInstantiated = !0);
  }
  randomBytes(t) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Browser random byte generator is not available.");
    const i = new Uint8Array(t);
    for (let r = 0; r < i.length; r += Ch)
      this._crypto.getRandomValues(i.subarray(r, r + Math.min(i.length - r, Ch)));
    return i;
  }
}
no.BrowserRandomSource = bp;
function mp(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var so = {}, ni = {};
Object.defineProperty(ni, "__esModule", { value: !0 });
function yp(e) {
  for (var t = 0; t < e.length; t++)
    e[t] = 0;
  return e;
}
ni.wipe = yp;
const vp = {}, wp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vp
}, Symbol.toStringTag, { value: "Module" })), oo = /* @__PURE__ */ Of(wp);
Object.defineProperty(so, "__esModule", { value: !0 });
so.NodeRandomSource = void 0;
const _p = ni;
class Ep {
  constructor() {
    if (this.isAvailable = !1, this.isInstantiated = !1, typeof mp < "u") {
      const t = oo;
      t && t.randomBytes && (this._crypto = t, this.isAvailable = !0, this.isInstantiated = !0);
    }
  }
  randomBytes(t) {
    if (!this.isAvailable || !this._crypto)
      throw new Error("Node.js random byte generator is not available.");
    let i = this._crypto.randomBytes(t);
    if (i.length !== t)
      throw new Error("NodeRandomSource: got fewer bytes than requested");
    const r = new Uint8Array(t);
    for (let n = 0; n < r.length; n++)
      r[n] = i[n];
    return (0, _p.wipe)(i), r;
  }
}
so.NodeRandomSource = Ep;
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.SystemRandomSource = void 0;
const Sp = no, Ip = so;
class Mp {
  constructor() {
    if (this.isAvailable = !1, this.name = "", this._source = new Sp.BrowserRandomSource(), this._source.isAvailable) {
      this.isAvailable = !0, this.name = "Browser";
      return;
    }
    if (this._source = new Ip.NodeRandomSource(), this._source.isAvailable) {
      this.isAvailable = !0, this.name = "Node";
      return;
    }
  }
  randomBytes(t) {
    if (!this.isAvailable)
      throw new Error("System random byte generator is not available.");
    return this._source.randomBytes(t);
  }
}
ro.SystemRandomSource = Mp;
var Ve = {}, Vf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  function t(h, d) {
    var f = h >>> 16 & 65535, g = h & 65535, _ = d >>> 16 & 65535, x = d & 65535;
    return g * x + (f * x + g * _ << 16 >>> 0) | 0;
  }
  e.mul = Math.imul || t;
  function i(h, d) {
    return h + d | 0;
  }
  e.add = i;
  function r(h, d) {
    return h - d | 0;
  }
  e.sub = r;
  function n(h, d) {
    return h << d | h >>> 32 - d;
  }
  e.rotl = n;
  function s(h, d) {
    return h << 32 - d | h >>> d;
  }
  e.rotr = s;
  function a(h) {
    return typeof h == "number" && isFinite(h) && Math.floor(h) === h;
  }
  e.isInteger = Number.isInteger || a, e.MAX_SAFE_INTEGER = 9007199254740991, e.isSafeInteger = function(h) {
    return e.isInteger(h) && h >= -e.MAX_SAFE_INTEGER && h <= e.MAX_SAFE_INTEGER;
  };
})(Vf);
Object.defineProperty(Ve, "__esModule", { value: !0 });
var Hf = Vf;
function Ap(e, t) {
  return t === void 0 && (t = 0), (e[t + 0] << 8 | e[t + 1]) << 16 >> 16;
}
Ve.readInt16BE = Ap;
function xp(e, t) {
  return t === void 0 && (t = 0), (e[t + 0] << 8 | e[t + 1]) >>> 0;
}
Ve.readUint16BE = xp;
function Op(e, t) {
  return t === void 0 && (t = 0), (e[t + 1] << 8 | e[t]) << 16 >> 16;
}
Ve.readInt16LE = Op;
function Pp(e, t) {
  return t === void 0 && (t = 0), (e[t + 1] << 8 | e[t]) >>> 0;
}
Ve.readUint16LE = Pp;
function Wf(e, t, i) {
  return t === void 0 && (t = new Uint8Array(2)), i === void 0 && (i = 0), t[i + 0] = e >>> 8, t[i + 1] = e >>> 0, t;
}
Ve.writeUint16BE = Wf;
Ve.writeInt16BE = Wf;
function Gf(e, t, i) {
  return t === void 0 && (t = new Uint8Array(2)), i === void 0 && (i = 0), t[i + 0] = e >>> 0, t[i + 1] = e >>> 8, t;
}
Ve.writeUint16LE = Gf;
Ve.writeInt16LE = Gf;
function sa(e, t) {
  return t === void 0 && (t = 0), e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
}
Ve.readInt32BE = sa;
function oa(e, t) {
  return t === void 0 && (t = 0), (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
}
Ve.readUint32BE = oa;
function aa(e, t) {
  return t === void 0 && (t = 0), e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}
Ve.readInt32LE = aa;
function ha(e, t) {
  return t === void 0 && (t = 0), (e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]) >>> 0;
}
Ve.readUint32LE = ha;
function js(e, t, i) {
  return t === void 0 && (t = new Uint8Array(4)), i === void 0 && (i = 0), t[i + 0] = e >>> 24, t[i + 1] = e >>> 16, t[i + 2] = e >>> 8, t[i + 3] = e >>> 0, t;
}
Ve.writeUint32BE = js;
Ve.writeInt32BE = js;
function zs(e, t, i) {
  return t === void 0 && (t = new Uint8Array(4)), i === void 0 && (i = 0), t[i + 0] = e >>> 0, t[i + 1] = e >>> 8, t[i + 2] = e >>> 16, t[i + 3] = e >>> 24, t;
}
Ve.writeUint32LE = zs;
Ve.writeInt32LE = zs;
function Np(e, t) {
  t === void 0 && (t = 0);
  var i = sa(e, t), r = sa(e, t + 4);
  return i * 4294967296 + r - (r >> 31) * 4294967296;
}
Ve.readInt64BE = Np;
function Rp(e, t) {
  t === void 0 && (t = 0);
  var i = oa(e, t), r = oa(e, t + 4);
  return i * 4294967296 + r;
}
Ve.readUint64BE = Rp;
function Tp(e, t) {
  t === void 0 && (t = 0);
  var i = aa(e, t), r = aa(e, t + 4);
  return r * 4294967296 + i - (i >> 31) * 4294967296;
}
Ve.readInt64LE = Tp;
function kp(e, t) {
  t === void 0 && (t = 0);
  var i = ha(e, t), r = ha(e, t + 4);
  return r * 4294967296 + i;
}
Ve.readUint64LE = kp;
function Yf(e, t, i) {
  return t === void 0 && (t = new Uint8Array(8)), i === void 0 && (i = 0), js(e / 4294967296 >>> 0, t, i), js(e >>> 0, t, i + 4), t;
}
Ve.writeUint64BE = Yf;
Ve.writeInt64BE = Yf;
function Jf(e, t, i) {
  return t === void 0 && (t = new Uint8Array(8)), i === void 0 && (i = 0), zs(e >>> 0, t, i), zs(e / 4294967296 >>> 0, t, i + 4), t;
}
Ve.writeUint64LE = Jf;
Ve.writeInt64LE = Jf;
function Lp(e, t, i) {
  if (i === void 0 && (i = 0), e % 8 !== 0)
    throw new Error("readUintBE supports only bitLengths divisible by 8");
  if (e / 8 > t.length - i)
    throw new Error("readUintBE: array is too short for the given bitLength");
  for (var r = 0, n = 1, s = e / 8 + i - 1; s >= i; s--)
    r += t[s] * n, n *= 256;
  return r;
}
Ve.readUintBE = Lp;
function Cp(e, t, i) {
  if (i === void 0 && (i = 0), e % 8 !== 0)
    throw new Error("readUintLE supports only bitLengths divisible by 8");
  if (e / 8 > t.length - i)
    throw new Error("readUintLE: array is too short for the given bitLength");
  for (var r = 0, n = 1, s = i; s < i + e / 8; s++)
    r += t[s] * n, n *= 256;
  return r;
}
Ve.readUintLE = Cp;
function qp(e, t, i, r) {
  if (i === void 0 && (i = new Uint8Array(e / 8)), r === void 0 && (r = 0), e % 8 !== 0)
    throw new Error("writeUintBE supports only bitLengths divisible by 8");
  if (!Hf.isSafeInteger(t))
    throw new Error("writeUintBE value must be an integer");
  for (var n = 1, s = e / 8 + r - 1; s >= r; s--)
    i[s] = t / n & 255, n *= 256;
  return i;
}
Ve.writeUintBE = qp;
function jp(e, t, i, r) {
  if (i === void 0 && (i = new Uint8Array(e / 8)), r === void 0 && (r = 0), e % 8 !== 0)
    throw new Error("writeUintLE supports only bitLengths divisible by 8");
  if (!Hf.isSafeInteger(t))
    throw new Error("writeUintLE value must be an integer");
  for (var n = 1, s = r; s < r + e / 8; s++)
    i[s] = t / n & 255, n *= 256;
  return i;
}
Ve.writeUintLE = jp;
function zp(e, t) {
  t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.getFloat32(t);
}
Ve.readFloat32BE = zp;
function Up(e, t) {
  t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.getFloat32(t, !0);
}
Ve.readFloat32LE = Up;
function Dp(e, t) {
  t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.getFloat64(t);
}
Ve.readFloat64BE = Dp;
function Fp(e, t) {
  t === void 0 && (t = 0);
  var i = new DataView(e.buffer, e.byteOffset, e.byteLength);
  return i.getFloat64(t, !0);
}
Ve.readFloat64LE = Fp;
function Kp(e, t, i) {
  t === void 0 && (t = new Uint8Array(4)), i === void 0 && (i = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat32(i, e), t;
}
Ve.writeFloat32BE = Kp;
function Bp(e, t, i) {
  t === void 0 && (t = new Uint8Array(4)), i === void 0 && (i = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat32(i, e, !0), t;
}
Ve.writeFloat32LE = Bp;
function $p(e, t, i) {
  t === void 0 && (t = new Uint8Array(8)), i === void 0 && (i = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat64(i, e), t;
}
Ve.writeFloat64BE = $p;
function Vp(e, t, i) {
  t === void 0 && (t = new Uint8Array(8)), i === void 0 && (i = 0);
  var r = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return r.setFloat64(i, e, !0), t;
}
Ve.writeFloat64LE = Vp;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.randomStringForEntropy = e.randomString = e.randomUint32 = e.randomBytes = e.defaultRandomSource = void 0;
  const t = ro, i = Ve, r = ni;
  e.defaultRandomSource = new t.SystemRandomSource();
  function n(f, g = e.defaultRandomSource) {
    return g.randomBytes(f);
  }
  e.randomBytes = n;
  function s(f = e.defaultRandomSource) {
    const g = n(4, f), _ = (0, i.readUint32LE)(g);
    return (0, r.wipe)(g), _;
  }
  e.randomUint32 = s;
  const a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function h(f, g = a, _ = e.defaultRandomSource) {
    if (g.length < 2)
      throw new Error("randomString charset is too short");
    if (g.length > 256)
      throw new Error("randomString charset is too long");
    let x = "";
    const A = g.length, O = 256 - 256 % A;
    for (; f > 0; ) {
      const j = n(Math.ceil(f * 256 / O), _);
      for (let F = 0; F < j.length && f > 0; F++) {
        const V = j[F];
        V < O && (x += g.charAt(V % A), f--);
      }
      (0, r.wipe)(j);
    }
    return x;
  }
  e.randomString = h;
  function d(f, g = a, _ = e.defaultRandomSource) {
    const x = Math.ceil(f / (Math.log(g.length) / Math.LN2));
    return h(x, g, _);
  }
  e.randomStringForEntropy = d;
})(Er);
var Zf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = Ve, i = ni;
  e.DIGEST_LENGTH = 64, e.BLOCK_SIZE = 128;
  var r = (
    /** @class */
    function() {
      function h() {
        this.digestLength = e.DIGEST_LENGTH, this.blockSize = e.BLOCK_SIZE, this._stateHi = new Int32Array(8), this._stateLo = new Int32Array(8), this._tempHi = new Int32Array(16), this._tempLo = new Int32Array(16), this._buffer = new Uint8Array(256), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this.reset();
      }
      return h.prototype._initState = function() {
        this._stateHi[0] = 1779033703, this._stateHi[1] = 3144134277, this._stateHi[2] = 1013904242, this._stateHi[3] = 2773480762, this._stateHi[4] = 1359893119, this._stateHi[5] = 2600822924, this._stateHi[6] = 528734635, this._stateHi[7] = 1541459225, this._stateLo[0] = 4089235720, this._stateLo[1] = 2227873595, this._stateLo[2] = 4271175723, this._stateLo[3] = 1595750129, this._stateLo[4] = 2917565137, this._stateLo[5] = 725511199, this._stateLo[6] = 4215389547, this._stateLo[7] = 327033209;
      }, h.prototype.reset = function() {
        return this._initState(), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this;
      }, h.prototype.clean = function() {
        i.wipe(this._buffer), i.wipe(this._tempHi), i.wipe(this._tempLo), this.reset();
      }, h.prototype.update = function(d, f) {
        if (f === void 0 && (f = d.length), this._finished)
          throw new Error("SHA512: can't update because hash was finished.");
        var g = 0;
        if (this._bytesHashed += f, this._bufferLength > 0) {
          for (; this._bufferLength < e.BLOCK_SIZE && f > 0; )
            this._buffer[this._bufferLength++] = d[g++], f--;
          this._bufferLength === this.blockSize && (s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize), this._bufferLength = 0);
        }
        for (f >= this.blockSize && (g = s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, d, g, f), f %= this.blockSize); f > 0; )
          this._buffer[this._bufferLength++] = d[g++], f--;
        return this;
      }, h.prototype.finish = function(d) {
        if (!this._finished) {
          var f = this._bytesHashed, g = this._bufferLength, _ = f / 536870912 | 0, x = f << 3, A = f % 128 < 112 ? 128 : 256;
          this._buffer[g] = 128;
          for (var O = g + 1; O < A - 8; O++)
            this._buffer[O] = 0;
          t.writeUint32BE(_, this._buffer, A - 8), t.writeUint32BE(x, this._buffer, A - 4), s(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, A), this._finished = !0;
        }
        for (var O = 0; O < this.digestLength / 8; O++)
          t.writeUint32BE(this._stateHi[O], d, O * 8), t.writeUint32BE(this._stateLo[O], d, O * 8 + 4);
        return this;
      }, h.prototype.digest = function() {
        var d = new Uint8Array(this.digestLength);
        return this.finish(d), d;
      }, h.prototype.saveState = function() {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      }, h.prototype.restoreState = function(d) {
        return this._stateHi.set(d.stateHi), this._stateLo.set(d.stateLo), this._bufferLength = d.bufferLength, d.buffer && this._buffer.set(d.buffer), this._bytesHashed = d.bytesHashed, this._finished = !1, this;
      }, h.prototype.cleanSavedState = function(d) {
        i.wipe(d.stateHi), i.wipe(d.stateLo), d.buffer && i.wipe(d.buffer), d.bufferLength = 0, d.bytesHashed = 0;
      }, h;
    }()
  );
  e.SHA512 = r;
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
  function s(h, d, f, g, _, x, A) {
    for (var O = f[0], j = f[1], F = f[2], V = f[3], C = f[4], K = f[5], N = f[6], U = f[7], D = g[0], v = g[1], T = g[2], Y = g[3], Q = g[4], p = g[5], S = g[6], o = g[7], c, l, E, I, w, u, m, b; A >= 128; ) {
      for (var P = 0; P < 16; P++) {
        var B = 8 * P + x;
        h[P] = t.readUint32BE(_, B), d[P] = t.readUint32BE(_, B + 4);
      }
      for (var P = 0; P < 80; P++) {
        var G = O, M = j, $ = F, L = V, k = C, q = K, y = N, R = U, W = D, Z = v, J = T, oe = Y, Ee = Q, he = p, Re = S, Pe = o;
        if (c = U, l = o, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = (C >>> 14 | Q << 18) ^ (C >>> 18 | Q << 14) ^ (Q >>> 9 | C << 23), l = (Q >>> 14 | C << 18) ^ (Q >>> 18 | C << 14) ^ (C >>> 9 | Q << 23), w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, c = C & K ^ ~C & N, l = Q & p ^ ~Q & S, w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, c = n[P * 2], l = n[P * 2 + 1], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, c = h[P % 16], l = d[P % 16], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, E = m & 65535 | b << 16, I = w & 65535 | u << 16, c = E, l = I, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = (O >>> 28 | D << 4) ^ (D >>> 2 | O << 30) ^ (D >>> 7 | O << 25), l = (D >>> 28 | O << 4) ^ (O >>> 2 | D << 30) ^ (O >>> 7 | D << 25), w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, c = O & j ^ O & F ^ j & F, l = D & v ^ D & T ^ v & T, w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, R = m & 65535 | b << 16, Pe = w & 65535 | u << 16, c = L, l = oe, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = E, l = I, w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, L = m & 65535 | b << 16, oe = w & 65535 | u << 16, j = G, F = M, V = $, C = L, K = k, N = q, U = y, O = R, v = W, T = Z, Y = J, Q = oe, p = Ee, S = he, o = Re, D = Pe, P % 16 === 15)
          for (var B = 0; B < 16; B++)
            c = h[B], l = d[B], w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = h[(B + 9) % 16], l = d[(B + 9) % 16], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, E = h[(B + 1) % 16], I = d[(B + 1) % 16], c = (E >>> 1 | I << 31) ^ (E >>> 8 | I << 24) ^ E >>> 7, l = (I >>> 1 | E << 31) ^ (I >>> 8 | E << 24) ^ (I >>> 7 | E << 25), w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, E = h[(B + 14) % 16], I = d[(B + 14) % 16], c = (E >>> 19 | I << 13) ^ (I >>> 29 | E << 3) ^ E >>> 6, l = (I >>> 19 | E << 13) ^ (E >>> 29 | I << 3) ^ (I >>> 6 | E << 26), w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, h[B] = m & 65535 | b << 16, d[B] = w & 65535 | u << 16;
      }
      c = O, l = D, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[0], l = g[0], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[0] = O = m & 65535 | b << 16, g[0] = D = w & 65535 | u << 16, c = j, l = v, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[1], l = g[1], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[1] = j = m & 65535 | b << 16, g[1] = v = w & 65535 | u << 16, c = F, l = T, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[2], l = g[2], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[2] = F = m & 65535 | b << 16, g[2] = T = w & 65535 | u << 16, c = V, l = Y, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[3], l = g[3], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[3] = V = m & 65535 | b << 16, g[3] = Y = w & 65535 | u << 16, c = C, l = Q, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[4], l = g[4], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[4] = C = m & 65535 | b << 16, g[4] = Q = w & 65535 | u << 16, c = K, l = p, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[5], l = g[5], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[5] = K = m & 65535 | b << 16, g[5] = p = w & 65535 | u << 16, c = N, l = S, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[6], l = g[6], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[6] = N = m & 65535 | b << 16, g[6] = S = w & 65535 | u << 16, c = U, l = o, w = l & 65535, u = l >>> 16, m = c & 65535, b = c >>> 16, c = f[7], l = g[7], w += l & 65535, u += l >>> 16, m += c & 65535, b += c >>> 16, u += w >>> 16, m += u >>> 16, b += m >>> 16, f[7] = U = m & 65535 | b << 16, g[7] = o = w & 65535 | u << 16, x += 128, A -= 128;
    }
    return x;
  }
  function a(h) {
    var d = new r();
    d.update(h);
    var f = d.digest();
    return d.clean(), f;
  }
  e.hash = a;
})(Zf);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.convertSecretKeyToX25519 = e.convertPublicKeyToX25519 = e.verify = e.sign = e.extractPublicKeyFromSecretKey = e.generateKeyPair = e.generateKeyPairFromSeed = e.SEED_LENGTH = e.SECRET_KEY_LENGTH = e.PUBLIC_KEY_LENGTH = e.SIGNATURE_LENGTH = void 0;
  const t = Er, i = Zf, r = ni;
  e.SIGNATURE_LENGTH = 64, e.PUBLIC_KEY_LENGTH = 32, e.SECRET_KEY_LENGTH = 64, e.SEED_LENGTH = 32;
  function n(L) {
    const k = new Float64Array(16);
    if (L)
      for (let q = 0; q < L.length; q++)
        k[q] = L[q];
    return k;
  }
  const s = new Uint8Array(32);
  s[0] = 9;
  const a = n(), h = n([1]), d = n([
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
  ]), f = n([
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
  ]), g = n([
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
  ]), _ = n([
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
  ]), x = n([
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
  function A(L, k) {
    for (let q = 0; q < 16; q++)
      L[q] = k[q] | 0;
  }
  function O(L) {
    let k = 1;
    for (let q = 0; q < 16; q++) {
      let y = L[q] + k + 65535;
      k = Math.floor(y / 65536), L[q] = y - k * 65536;
    }
    L[0] += k - 1 + 37 * (k - 1);
  }
  function j(L, k, q) {
    const y = ~(q - 1);
    for (let R = 0; R < 16; R++) {
      const W = y & (L[R] ^ k[R]);
      L[R] ^= W, k[R] ^= W;
    }
  }
  function F(L, k) {
    const q = n(), y = n();
    for (let R = 0; R < 16; R++)
      y[R] = k[R];
    O(y), O(y), O(y);
    for (let R = 0; R < 2; R++) {
      q[0] = y[0] - 65517;
      for (let Z = 1; Z < 15; Z++)
        q[Z] = y[Z] - 65535 - (q[Z - 1] >> 16 & 1), q[Z - 1] &= 65535;
      q[15] = y[15] - 32767 - (q[14] >> 16 & 1);
      const W = q[15] >> 16 & 1;
      q[14] &= 65535, j(y, q, 1 - W);
    }
    for (let R = 0; R < 16; R++)
      L[2 * R] = y[R] & 255, L[2 * R + 1] = y[R] >> 8;
  }
  function V(L, k) {
    let q = 0;
    for (let y = 0; y < 32; y++)
      q |= L[y] ^ k[y];
    return (1 & q - 1 >>> 8) - 1;
  }
  function C(L, k) {
    const q = new Uint8Array(32), y = new Uint8Array(32);
    return F(q, L), F(y, k), V(q, y);
  }
  function K(L) {
    const k = new Uint8Array(32);
    return F(k, L), k[0] & 1;
  }
  function N(L, k) {
    for (let q = 0; q < 16; q++)
      L[q] = k[2 * q] + (k[2 * q + 1] << 8);
    L[15] &= 32767;
  }
  function U(L, k, q) {
    for (let y = 0; y < 16; y++)
      L[y] = k[y] + q[y];
  }
  function D(L, k, q) {
    for (let y = 0; y < 16; y++)
      L[y] = k[y] - q[y];
  }
  function v(L, k, q) {
    let y, R, W = 0, Z = 0, J = 0, oe = 0, Ee = 0, he = 0, Re = 0, Pe = 0, se = 0, Se = 0, ve = 0, ie = 0, ge = 0, pe = 0, ee = 0, fe = 0, me = 0, re = 0, ue = 0, Ie = 0, ae = 0, Me = 0, Ae = 0, ce = 0, We = 0, Ye = 0, xe = 0, $e = 0, Xe = 0, Oe = 0, et = 0, Te = q[0], le = q[1], ke = q[2], Le = q[3], be = q[4], Ne = q[5], ze = q[6], we = q[7], Ue = q[8], De = q[9], _e = q[10], qe = q[11], Ce = q[12], de = q[13], Fe = q[14], Ke = q[15];
    y = k[0], W += y * Te, Z += y * le, J += y * ke, oe += y * Le, Ee += y * be, he += y * Ne, Re += y * ze, Pe += y * we, se += y * Ue, Se += y * De, ve += y * _e, ie += y * qe, ge += y * Ce, pe += y * de, ee += y * Fe, fe += y * Ke, y = k[1], Z += y * Te, J += y * le, oe += y * ke, Ee += y * Le, he += y * be, Re += y * Ne, Pe += y * ze, se += y * we, Se += y * Ue, ve += y * De, ie += y * _e, ge += y * qe, pe += y * Ce, ee += y * de, fe += y * Fe, me += y * Ke, y = k[2], J += y * Te, oe += y * le, Ee += y * ke, he += y * Le, Re += y * be, Pe += y * Ne, se += y * ze, Se += y * we, ve += y * Ue, ie += y * De, ge += y * _e, pe += y * qe, ee += y * Ce, fe += y * de, me += y * Fe, re += y * Ke, y = k[3], oe += y * Te, Ee += y * le, he += y * ke, Re += y * Le, Pe += y * be, se += y * Ne, Se += y * ze, ve += y * we, ie += y * Ue, ge += y * De, pe += y * _e, ee += y * qe, fe += y * Ce, me += y * de, re += y * Fe, ue += y * Ke, y = k[4], Ee += y * Te, he += y * le, Re += y * ke, Pe += y * Le, se += y * be, Se += y * Ne, ve += y * ze, ie += y * we, ge += y * Ue, pe += y * De, ee += y * _e, fe += y * qe, me += y * Ce, re += y * de, ue += y * Fe, Ie += y * Ke, y = k[5], he += y * Te, Re += y * le, Pe += y * ke, se += y * Le, Se += y * be, ve += y * Ne, ie += y * ze, ge += y * we, pe += y * Ue, ee += y * De, fe += y * _e, me += y * qe, re += y * Ce, ue += y * de, Ie += y * Fe, ae += y * Ke, y = k[6], Re += y * Te, Pe += y * le, se += y * ke, Se += y * Le, ve += y * be, ie += y * Ne, ge += y * ze, pe += y * we, ee += y * Ue, fe += y * De, me += y * _e, re += y * qe, ue += y * Ce, Ie += y * de, ae += y * Fe, Me += y * Ke, y = k[7], Pe += y * Te, se += y * le, Se += y * ke, ve += y * Le, ie += y * be, ge += y * Ne, pe += y * ze, ee += y * we, fe += y * Ue, me += y * De, re += y * _e, ue += y * qe, Ie += y * Ce, ae += y * de, Me += y * Fe, Ae += y * Ke, y = k[8], se += y * Te, Se += y * le, ve += y * ke, ie += y * Le, ge += y * be, pe += y * Ne, ee += y * ze, fe += y * we, me += y * Ue, re += y * De, ue += y * _e, Ie += y * qe, ae += y * Ce, Me += y * de, Ae += y * Fe, ce += y * Ke, y = k[9], Se += y * Te, ve += y * le, ie += y * ke, ge += y * Le, pe += y * be, ee += y * Ne, fe += y * ze, me += y * we, re += y * Ue, ue += y * De, Ie += y * _e, ae += y * qe, Me += y * Ce, Ae += y * de, ce += y * Fe, We += y * Ke, y = k[10], ve += y * Te, ie += y * le, ge += y * ke, pe += y * Le, ee += y * be, fe += y * Ne, me += y * ze, re += y * we, ue += y * Ue, Ie += y * De, ae += y * _e, Me += y * qe, Ae += y * Ce, ce += y * de, We += y * Fe, Ye += y * Ke, y = k[11], ie += y * Te, ge += y * le, pe += y * ke, ee += y * Le, fe += y * be, me += y * Ne, re += y * ze, ue += y * we, Ie += y * Ue, ae += y * De, Me += y * _e, Ae += y * qe, ce += y * Ce, We += y * de, Ye += y * Fe, xe += y * Ke, y = k[12], ge += y * Te, pe += y * le, ee += y * ke, fe += y * Le, me += y * be, re += y * Ne, ue += y * ze, Ie += y * we, ae += y * Ue, Me += y * De, Ae += y * _e, ce += y * qe, We += y * Ce, Ye += y * de, xe += y * Fe, $e += y * Ke, y = k[13], pe += y * Te, ee += y * le, fe += y * ke, me += y * Le, re += y * be, ue += y * Ne, Ie += y * ze, ae += y * we, Me += y * Ue, Ae += y * De, ce += y * _e, We += y * qe, Ye += y * Ce, xe += y * de, $e += y * Fe, Xe += y * Ke, y = k[14], ee += y * Te, fe += y * le, me += y * ke, re += y * Le, ue += y * be, Ie += y * Ne, ae += y * ze, Me += y * we, Ae += y * Ue, ce += y * De, We += y * _e, Ye += y * qe, xe += y * Ce, $e += y * de, Xe += y * Fe, Oe += y * Ke, y = k[15], fe += y * Te, me += y * le, re += y * ke, ue += y * Le, Ie += y * be, ae += y * Ne, Me += y * ze, Ae += y * we, ce += y * Ue, We += y * De, Ye += y * _e, xe += y * qe, $e += y * Ce, Xe += y * de, Oe += y * Fe, et += y * Ke, W += 38 * me, Z += 38 * re, J += 38 * ue, oe += 38 * Ie, Ee += 38 * ae, he += 38 * Me, Re += 38 * Ae, Pe += 38 * ce, se += 38 * We, Se += 38 * Ye, ve += 38 * xe, ie += 38 * $e, ge += 38 * Xe, pe += 38 * Oe, ee += 38 * et, R = 1, y = W + R + 65535, R = Math.floor(y / 65536), W = y - R * 65536, y = Z + R + 65535, R = Math.floor(y / 65536), Z = y - R * 65536, y = J + R + 65535, R = Math.floor(y / 65536), J = y - R * 65536, y = oe + R + 65535, R = Math.floor(y / 65536), oe = y - R * 65536, y = Ee + R + 65535, R = Math.floor(y / 65536), Ee = y - R * 65536, y = he + R + 65535, R = Math.floor(y / 65536), he = y - R * 65536, y = Re + R + 65535, R = Math.floor(y / 65536), Re = y - R * 65536, y = Pe + R + 65535, R = Math.floor(y / 65536), Pe = y - R * 65536, y = se + R + 65535, R = Math.floor(y / 65536), se = y - R * 65536, y = Se + R + 65535, R = Math.floor(y / 65536), Se = y - R * 65536, y = ve + R + 65535, R = Math.floor(y / 65536), ve = y - R * 65536, y = ie + R + 65535, R = Math.floor(y / 65536), ie = y - R * 65536, y = ge + R + 65535, R = Math.floor(y / 65536), ge = y - R * 65536, y = pe + R + 65535, R = Math.floor(y / 65536), pe = y - R * 65536, y = ee + R + 65535, R = Math.floor(y / 65536), ee = y - R * 65536, y = fe + R + 65535, R = Math.floor(y / 65536), fe = y - R * 65536, W += R - 1 + 37 * (R - 1), R = 1, y = W + R + 65535, R = Math.floor(y / 65536), W = y - R * 65536, y = Z + R + 65535, R = Math.floor(y / 65536), Z = y - R * 65536, y = J + R + 65535, R = Math.floor(y / 65536), J = y - R * 65536, y = oe + R + 65535, R = Math.floor(y / 65536), oe = y - R * 65536, y = Ee + R + 65535, R = Math.floor(y / 65536), Ee = y - R * 65536, y = he + R + 65535, R = Math.floor(y / 65536), he = y - R * 65536, y = Re + R + 65535, R = Math.floor(y / 65536), Re = y - R * 65536, y = Pe + R + 65535, R = Math.floor(y / 65536), Pe = y - R * 65536, y = se + R + 65535, R = Math.floor(y / 65536), se = y - R * 65536, y = Se + R + 65535, R = Math.floor(y / 65536), Se = y - R * 65536, y = ve + R + 65535, R = Math.floor(y / 65536), ve = y - R * 65536, y = ie + R + 65535, R = Math.floor(y / 65536), ie = y - R * 65536, y = ge + R + 65535, R = Math.floor(y / 65536), ge = y - R * 65536, y = pe + R + 65535, R = Math.floor(y / 65536), pe = y - R * 65536, y = ee + R + 65535, R = Math.floor(y / 65536), ee = y - R * 65536, y = fe + R + 65535, R = Math.floor(y / 65536), fe = y - R * 65536, W += R - 1 + 37 * (R - 1), L[0] = W, L[1] = Z, L[2] = J, L[3] = oe, L[4] = Ee, L[5] = he, L[6] = Re, L[7] = Pe, L[8] = se, L[9] = Se, L[10] = ve, L[11] = ie, L[12] = ge, L[13] = pe, L[14] = ee, L[15] = fe;
  }
  function T(L, k) {
    v(L, k, k);
  }
  function Y(L, k) {
    const q = n();
    let y;
    for (y = 0; y < 16; y++)
      q[y] = k[y];
    for (y = 253; y >= 0; y--)
      T(q, q), y !== 2 && y !== 4 && v(q, q, k);
    for (y = 0; y < 16; y++)
      L[y] = q[y];
  }
  function Q(L, k) {
    const q = n();
    let y;
    for (y = 0; y < 16; y++)
      q[y] = k[y];
    for (y = 250; y >= 0; y--)
      T(q, q), y !== 1 && v(q, q, k);
    for (y = 0; y < 16; y++)
      L[y] = q[y];
  }
  function p(L, k) {
    const q = n(), y = n(), R = n(), W = n(), Z = n(), J = n(), oe = n(), Ee = n(), he = n();
    D(q, L[1], L[0]), D(he, k[1], k[0]), v(q, q, he), U(y, L[0], L[1]), U(he, k[0], k[1]), v(y, y, he), v(R, L[3], k[3]), v(R, R, f), v(W, L[2], k[2]), U(W, W, W), D(Z, y, q), D(J, W, R), U(oe, W, R), U(Ee, y, q), v(L[0], Z, J), v(L[1], Ee, oe), v(L[2], oe, J), v(L[3], Z, Ee);
  }
  function S(L, k, q) {
    for (let y = 0; y < 4; y++)
      j(L[y], k[y], q);
  }
  function o(L, k) {
    const q = n(), y = n(), R = n();
    Y(R, k[2]), v(q, k[0], R), v(y, k[1], R), F(L, y), L[31] ^= K(q) << 7;
  }
  function c(L, k, q) {
    A(L[0], a), A(L[1], h), A(L[2], h), A(L[3], a);
    for (let y = 255; y >= 0; --y) {
      const R = q[y / 8 | 0] >> (y & 7) & 1;
      S(L, k, R), p(k, L), p(L, L), S(L, k, R);
    }
  }
  function l(L, k) {
    const q = [n(), n(), n(), n()];
    A(q[0], g), A(q[1], _), A(q[2], h), v(q[3], g, _), c(L, q, k);
  }
  function E(L) {
    if (L.length !== e.SEED_LENGTH)
      throw new Error(`ed25519: seed must be ${e.SEED_LENGTH} bytes`);
    const k = (0, i.hash)(L);
    k[0] &= 248, k[31] &= 127, k[31] |= 64;
    const q = new Uint8Array(32), y = [n(), n(), n(), n()];
    l(y, k), o(q, y);
    const R = new Uint8Array(64);
    return R.set(L), R.set(q, 32), {
      publicKey: q,
      secretKey: R
    };
  }
  e.generateKeyPairFromSeed = E;
  function I(L) {
    const k = (0, t.randomBytes)(32, L), q = E(k);
    return (0, r.wipe)(k), q;
  }
  e.generateKeyPair = I;
  function w(L) {
    if (L.length !== e.SECRET_KEY_LENGTH)
      throw new Error(`ed25519: secret key must be ${e.SECRET_KEY_LENGTH} bytes`);
    return new Uint8Array(L.subarray(32));
  }
  e.extractPublicKeyFromSecretKey = w;
  const u = new Float64Array([
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
  function m(L, k) {
    let q, y, R, W;
    for (y = 63; y >= 32; --y) {
      for (q = 0, R = y - 32, W = y - 12; R < W; ++R)
        k[R] += q - 16 * k[y] * u[R - (y - 32)], q = Math.floor((k[R] + 128) / 256), k[R] -= q * 256;
      k[R] += q, k[y] = 0;
    }
    for (q = 0, R = 0; R < 32; R++)
      k[R] += q - (k[31] >> 4) * u[R], q = k[R] >> 8, k[R] &= 255;
    for (R = 0; R < 32; R++)
      k[R] -= q * u[R];
    for (y = 0; y < 32; y++)
      k[y + 1] += k[y] >> 8, L[y] = k[y] & 255;
  }
  function b(L) {
    const k = new Float64Array(64);
    for (let q = 0; q < 64; q++)
      k[q] = L[q];
    for (let q = 0; q < 64; q++)
      L[q] = 0;
    m(L, k);
  }
  function P(L, k) {
    const q = new Float64Array(64), y = [n(), n(), n(), n()], R = (0, i.hash)(L.subarray(0, 32));
    R[0] &= 248, R[31] &= 127, R[31] |= 64;
    const W = new Uint8Array(64);
    W.set(R.subarray(32), 32);
    const Z = new i.SHA512();
    Z.update(W.subarray(32)), Z.update(k);
    const J = Z.digest();
    Z.clean(), b(J), l(y, J), o(W, y), Z.reset(), Z.update(W.subarray(0, 32)), Z.update(L.subarray(32)), Z.update(k);
    const oe = Z.digest();
    b(oe);
    for (let Ee = 0; Ee < 32; Ee++)
      q[Ee] = J[Ee];
    for (let Ee = 0; Ee < 32; Ee++)
      for (let he = 0; he < 32; he++)
        q[Ee + he] += oe[Ee] * R[he];
    return m(W.subarray(32), q), W;
  }
  e.sign = P;
  function B(L, k) {
    const q = n(), y = n(), R = n(), W = n(), Z = n(), J = n(), oe = n();
    return A(L[2], h), N(L[1], k), T(R, L[1]), v(W, R, d), D(R, R, L[2]), U(W, L[2], W), T(Z, W), T(J, Z), v(oe, J, Z), v(q, oe, R), v(q, q, W), Q(q, q), v(q, q, R), v(q, q, W), v(q, q, W), v(L[0], q, W), T(y, L[0]), v(y, y, W), C(y, R) && v(L[0], L[0], x), T(y, L[0]), v(y, y, W), C(y, R) ? -1 : (K(L[0]) === k[31] >> 7 && D(L[0], a, L[0]), v(L[3], L[0], L[1]), 0);
  }
  function G(L, k, q) {
    const y = new Uint8Array(32), R = [n(), n(), n(), n()], W = [n(), n(), n(), n()];
    if (q.length !== e.SIGNATURE_LENGTH)
      throw new Error(`ed25519: signature must be ${e.SIGNATURE_LENGTH} bytes`);
    if (B(W, L))
      return !1;
    const Z = new i.SHA512();
    Z.update(q.subarray(0, 32)), Z.update(L), Z.update(k);
    const J = Z.digest();
    return b(J), c(R, W, J), l(W, q.subarray(32)), p(R, W), o(y, R), !V(q, y);
  }
  e.verify = G;
  function M(L) {
    let k = [n(), n(), n(), n()];
    if (B(k, L))
      throw new Error("Ed25519: invalid public key");
    let q = n(), y = n(), R = k[1];
    U(q, h, R), D(y, h, R), Y(y, y), v(q, q, y);
    let W = new Uint8Array(32);
    return F(W, q), W;
  }
  e.convertPublicKeyToX25519 = M;
  function $(L) {
    const k = (0, i.hash)(L.subarray(0, 32));
    k[0] &= 248, k[31] &= 127, k[31] |= 64;
    const q = new Uint8Array(k.subarray(0, 32));
    return (0, r.wipe)(k), q;
  }
  e.convertSecretKeyToX25519 = $;
})(Oa);
const Hp = "EdDSA", Wp = "JWT", Us = ".", ao = "base64url", Xf = "utf8", Qf = "utf8", Gp = ":", Yp = "did", Jp = "key", qh = "base58btc", Zp = "z", Xp = "K36", Qp = 32;
function eu(e = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(e) : new Uint8Array(e);
}
function xs(e, t) {
  t || (t = e.reduce((n, s) => n + s.length, 0));
  const i = eu(t);
  let r = 0;
  for (const n of e)
    i.set(n, r), r += n.length;
  return i;
}
function e1(e, t) {
  if (e.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var i = new Uint8Array(256), r = 0; r < i.length; r++)
    i[r] = 255;
  for (var n = 0; n < e.length; n++) {
    var s = e.charAt(n), a = s.charCodeAt(0);
    if (i[a] !== 255)
      throw new TypeError(s + " is ambiguous");
    i[a] = n;
  }
  var h = e.length, d = e.charAt(0), f = Math.log(h) / Math.log(256), g = Math.log(256) / Math.log(h);
  function _(O) {
    if (O instanceof Uint8Array || (ArrayBuffer.isView(O) ? O = new Uint8Array(O.buffer, O.byteOffset, O.byteLength) : Array.isArray(O) && (O = Uint8Array.from(O))), !(O instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (O.length === 0)
      return "";
    for (var j = 0, F = 0, V = 0, C = O.length; V !== C && O[V] === 0; )
      V++, j++;
    for (var K = (C - V) * g + 1 >>> 0, N = new Uint8Array(K); V !== C; ) {
      for (var U = O[V], D = 0, v = K - 1; (U !== 0 || D < F) && v !== -1; v--, D++)
        U += 256 * N[v] >>> 0, N[v] = U % h >>> 0, U = U / h >>> 0;
      if (U !== 0)
        throw new Error("Non-zero carry");
      F = D, V++;
    }
    for (var T = K - F; T !== K && N[T] === 0; )
      T++;
    for (var Y = d.repeat(j); T < K; ++T)
      Y += e.charAt(N[T]);
    return Y;
  }
  function x(O) {
    if (typeof O != "string")
      throw new TypeError("Expected String");
    if (O.length === 0)
      return new Uint8Array();
    var j = 0;
    if (O[j] !== " ") {
      for (var F = 0, V = 0; O[j] === d; )
        F++, j++;
      for (var C = (O.length - j) * f + 1 >>> 0, K = new Uint8Array(C); O[j]; ) {
        var N = i[O.charCodeAt(j)];
        if (N === 255)
          return;
        for (var U = 0, D = C - 1; (N !== 0 || U < V) && D !== -1; D--, U++)
          N += h * K[D] >>> 0, K[D] = N % 256 >>> 0, N = N / 256 >>> 0;
        if (N !== 0)
          throw new Error("Non-zero carry");
        V = U, j++;
      }
      if (O[j] !== " ") {
        for (var v = C - V; v !== C && K[v] === 0; )
          v++;
        for (var T = new Uint8Array(F + (C - v)), Y = F; v !== C; )
          T[Y++] = K[v++];
        return T;
      }
    }
  }
  function A(O) {
    var j = x(O);
    if (j)
      return j;
    throw new Error(`Non-${t} character`);
  }
  return {
    encode: _,
    decodeUnsafe: x,
    decode: A
  };
}
var t1 = e1, i1 = t1;
const r1 = (e) => {
  if (e instanceof Uint8Array && e.constructor.name === "Uint8Array")
    return e;
  if (e instanceof ArrayBuffer)
    return new Uint8Array(e);
  if (ArrayBuffer.isView(e))
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  throw new Error("Unknown type, must be binary type");
}, n1 = (e) => new TextEncoder().encode(e), s1 = (e) => new TextDecoder().decode(e);
class o1 {
  constructor(t, i, r) {
    this.name = t, this.prefix = i, this.baseEncode = r;
  }
  encode(t) {
    if (t instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(t)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class a1 {
  constructor(t, i, r) {
    if (this.name = t, this.prefix = i, i.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = i.codePointAt(0), this.baseDecode = r;
  }
  decode(t) {
    if (typeof t == "string") {
      if (t.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(t.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(t) {
    return tu(this, t);
  }
}
class h1 {
  constructor(t) {
    this.decoders = t;
  }
  or(t) {
    return tu(this, t);
  }
  decode(t) {
    const i = t[0], r = this.decoders[i];
    if (r)
      return r.decode(t);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const tu = (e, t) => new h1({
  ...e.decoders || { [e.prefix]: e },
  ...t.decoders || { [t.prefix]: t }
});
class c1 {
  constructor(t, i, r, n) {
    this.name = t, this.prefix = i, this.baseEncode = r, this.baseDecode = n, this.encoder = new o1(t, i, r), this.decoder = new a1(t, i, n);
  }
  encode(t) {
    return this.encoder.encode(t);
  }
  decode(t) {
    return this.decoder.decode(t);
  }
}
const ho = ({ name: e, prefix: t, encode: i, decode: r }) => new c1(e, t, i, r), ts = ({ prefix: e, name: t, alphabet: i }) => {
  const { encode: r, decode: n } = i1(i, t);
  return ho({
    prefix: e,
    name: t,
    encode: r,
    decode: (s) => r1(n(s))
  });
}, f1 = (e, t, i, r) => {
  const n = {};
  for (let g = 0; g < t.length; ++g)
    n[t[g]] = g;
  let s = e.length;
  for (; e[s - 1] === "="; )
    --s;
  const a = new Uint8Array(s * i / 8 | 0);
  let h = 0, d = 0, f = 0;
  for (let g = 0; g < s; ++g) {
    const _ = n[e[g]];
    if (_ === void 0)
      throw new SyntaxError(`Non-${r} character`);
    d = d << i | _, h += i, h >= 8 && (h -= 8, a[f++] = 255 & d >> h);
  }
  if (h >= i || 255 & d << 8 - h)
    throw new SyntaxError("Unexpected end of data");
  return a;
}, u1 = (e, t, i) => {
  const r = t[t.length - 1] === "=", n = (1 << i) - 1;
  let s = "", a = 0, h = 0;
  for (let d = 0; d < e.length; ++d)
    for (h = h << 8 | e[d], a += 8; a > i; )
      a -= i, s += t[n & h >> a];
  if (a && (s += t[n & h << i - a]), r)
    for (; s.length * i & 7; )
      s += "=";
  return s;
}, Nt = ({ name: e, prefix: t, bitsPerChar: i, alphabet: r }) => ho({
  prefix: t,
  name: e,
  encode(n) {
    return u1(n, r, i);
  },
  decode(n) {
    return f1(n, r, i, e);
  }
}), d1 = ho({
  prefix: "\0",
  name: "identity",
  encode: (e) => s1(e),
  decode: (e) => n1(e)
}), l1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: d1
}, Symbol.toStringTag, { value: "Module" })), p1 = Nt({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
}), g1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2: p1
}, Symbol.toStringTag, { value: "Module" })), b1 = Nt({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
}), m1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8: b1
}, Symbol.toStringTag, { value: "Module" })), y1 = ts({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
}), v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10: y1
}, Symbol.toStringTag, { value: "Module" })), w1 = Nt({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
}), _1 = Nt({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
}), E1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16: w1,
  base16upper: _1
}, Symbol.toStringTag, { value: "Module" })), S1 = Nt({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
}), I1 = Nt({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
}), M1 = Nt({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
}), A1 = Nt({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
}), x1 = Nt({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
}), O1 = Nt({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
}), P1 = Nt({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
}), N1 = Nt({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
}), R1 = Nt({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
}), T1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32: S1,
  base32hex: x1,
  base32hexpad: P1,
  base32hexpadupper: N1,
  base32hexupper: O1,
  base32pad: M1,
  base32padupper: A1,
  base32upper: I1,
  base32z: R1
}, Symbol.toStringTag, { value: "Module" })), k1 = ts({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
}), L1 = ts({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}), C1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36: k1,
  base36upper: L1
}, Symbol.toStringTag, { value: "Module" })), q1 = ts({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
}), j1 = ts({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}), z1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc: q1,
  base58flickr: j1
}, Symbol.toStringTag, { value: "Module" })), U1 = Nt({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
}), D1 = Nt({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
}), F1 = Nt({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
}), K1 = Nt({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
}), B1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64: U1,
  base64pad: D1,
  base64url: F1,
  base64urlpad: K1
}, Symbol.toStringTag, { value: "Module" })), iu = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), $1 = iu.reduce((e, t, i) => (e[i] = t, e), []), V1 = iu.reduce((e, t, i) => (e[t.codePointAt(0)] = i, e), []);
function H1(e) {
  return e.reduce((t, i) => (t += $1[i], t), "");
}
function W1(e) {
  const t = [];
  for (const i of e) {
    const r = V1[i.codePointAt(0)];
    if (r === void 0)
      throw new Error(`Non-base256emoji character: ${i}`);
    t.push(r);
  }
  return new Uint8Array(t);
}
const G1 = ho({
  prefix: "🚀",
  name: "base256emoji",
  encode: H1,
  decode: W1
}), Y1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji: G1
}, Symbol.toStringTag, { value: "Module" }));
new TextEncoder();
new TextDecoder();
const jh = {
  ...l1,
  ...g1,
  ...m1,
  ...v1,
  ...E1,
  ...T1,
  ...C1,
  ...z1,
  ...B1,
  ...Y1
};
function ru(e, t, i, r) {
  return {
    name: e,
    prefix: t,
    encoder: {
      name: e,
      prefix: t,
      encode: i
    },
    decoder: { decode: r }
  };
}
const zh = ru("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), Lo = ru("ascii", "a", (e) => {
  let t = "a";
  for (let i = 0; i < e.length; i++)
    t += String.fromCharCode(e[i]);
  return t;
}, (e) => {
  e = e.substring(1);
  const t = eu(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t;
}), nu = {
  utf8: zh,
  "utf-8": zh,
  hex: jh.base16,
  latin1: Lo,
  ascii: Lo,
  binary: Lo,
  ...jh
};
function It(e, t = "utf8") {
  const i = nu[t];
  if (!i)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString("utf8") : i.encoder.encode(e).substring(1);
}
function St(e, t = "utf8") {
  const i = nu[t];
  if (!i)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e, "utf8") : i.decoder.decode(`${i.prefix}${e}`);
}
function Uh(e) {
  return fn(It(St(e, ao), Xf));
}
function Ds(e) {
  return It(St(Fr(e), Xf), ao);
}
function su(e) {
  const t = St(Xp, qh), i = Zp + It(xs([t, e]), qh);
  return [Yp, Jp, i].join(Gp);
}
function J1(e) {
  return It(e, ao);
}
function Z1(e) {
  return St(e, ao);
}
function X1(e) {
  return St([Ds(e.header), Ds(e.payload)].join(Us), Qf);
}
function Q1(e) {
  return [
    Ds(e.header),
    Ds(e.payload),
    J1(e.signature)
  ].join(Us);
}
function ca(e) {
  const t = e.split(Us), i = Uh(t[0]), r = Uh(t[1]), n = Z1(t[2]), s = St(t.slice(0, 2).join(Us), Qf);
  return { header: i, payload: r, signature: n, data: s };
}
function Dh(e = Er.randomBytes(Qp)) {
  return Oa.generateKeyPairFromSeed(e);
}
async function eg(e, t, i, r, n = te.fromMiliseconds(Date.now())) {
  const s = { alg: Hp, typ: Wp }, a = su(r.publicKey), h = n + i, d = { iss: a, sub: e, aud: t, iat: n, exp: h }, f = X1({ header: s, payload: d }), g = Oa.sign(r.secretKey, f);
  return Q1({ header: s, payload: d, signature: g });
}
var Fh = globalThis && globalThis.__spreadArray || function(e, t, i) {
  if (i || arguments.length === 2)
    for (var r = 0, n = t.length, s; r < n; r++)
      (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return e.concat(s || Array.prototype.slice.call(t));
}, tg = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, i, r) {
      this.name = t, this.version = i, this.os = r, this.type = "browser";
    }
    return e;
  }()
), ig = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      this.version = t, this.type = "node", this.name = "node", this.os = process.platform;
    }
    return e;
  }()
), rg = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, i, r, n) {
      this.name = t, this.version = i, this.os = r, this.bot = n, this.type = "bot-device";
    }
    return e;
  }()
), ng = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.type = "bot", this.bot = !0, this.name = "bot", this.version = null, this.os = null;
    }
    return e;
  }()
), sg = (
  /** @class */
  /* @__PURE__ */ function() {
    function e() {
      this.type = "react-native", this.name = "react-native", this.version = null, this.os = null;
    }
    return e;
  }()
), og = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/, ag = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/, Kh = 3, hg = [
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
  ["searchbot", og]
], Bh = [
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
function ou(e) {
  return e ? $h(e) : typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new sg() : typeof navigator < "u" ? $h(navigator.userAgent) : ug();
}
function cg(e) {
  return e !== "" && hg.reduce(function(t, i) {
    var r = i[0], n = i[1];
    if (t)
      return t;
    var s = n.exec(e);
    return !!s && [r, s];
  }, !1);
}
function $h(e) {
  var t = cg(e);
  if (!t)
    return null;
  var i = t[0], r = t[1];
  if (i === "searchbot")
    return new ng();
  var n = r[1] && r[1].split(".").join("_").split("_").slice(0, 3);
  n ? n.length < Kh && (n = Fh(Fh([], n, !0), dg(Kh - n.length), !0)) : n = [];
  var s = n.join("."), a = fg(e), h = ag.exec(e);
  return h && h[1] ? new rg(i, s, a, h[1]) : new tg(i, s, a);
}
function fg(e) {
  for (var t = 0, i = Bh.length; t < i; t++) {
    var r = Bh[t], n = r[0], s = r[1], a = s.exec(e);
    if (a)
      return n;
  }
  return null;
}
function ug() {
  var e = typeof process < "u" && process.version;
  return e ? new ig(process.version.slice(1)) : null;
}
function dg(e) {
  for (var t = [], i = 0; i < e; i++)
    t.push("0");
  return t;
}
var ot = {};
Object.defineProperty(ot, "__esModule", { value: !0 });
ot.getLocalStorage = ot.getLocalStorageOrThrow = ot.getCrypto = ot.getCryptoOrThrow = au = ot.getLocation = ot.getLocationOrThrow = Pa = ot.getNavigator = ot.getNavigatorOrThrow = is = ot.getDocument = ot.getDocumentOrThrow = ot.getFromWindowOrThrow = ot.getFromWindow = void 0;
function Wr(e) {
  let t;
  return typeof window < "u" && typeof window[e] < "u" && (t = window[e]), t;
}
ot.getFromWindow = Wr;
function mn(e) {
  const t = Wr(e);
  if (!t)
    throw new Error(`${e} is not defined in Window`);
  return t;
}
ot.getFromWindowOrThrow = mn;
function lg() {
  return mn("document");
}
ot.getDocumentOrThrow = lg;
function pg() {
  return Wr("document");
}
var is = ot.getDocument = pg;
function gg() {
  return mn("navigator");
}
ot.getNavigatorOrThrow = gg;
function bg() {
  return Wr("navigator");
}
var Pa = ot.getNavigator = bg;
function mg() {
  return mn("location");
}
ot.getLocationOrThrow = mg;
function yg() {
  return Wr("location");
}
var au = ot.getLocation = yg;
function vg() {
  return mn("crypto");
}
ot.getCryptoOrThrow = vg;
function wg() {
  return Wr("crypto");
}
ot.getCrypto = wg;
function _g() {
  return mn("localStorage");
}
ot.getLocalStorageOrThrow = _g;
function Eg() {
  return Wr("localStorage");
}
ot.getLocalStorage = Eg;
var Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
var hu = Na.getWindowMetadata = void 0;
const Vh = ot;
function Sg() {
  let e, t;
  try {
    e = Vh.getDocumentOrThrow(), t = Vh.getLocationOrThrow();
  } catch {
    return null;
  }
  function i() {
    const g = e.getElementsByTagName("link"), _ = [];
    for (let x = 0; x < g.length; x++) {
      const A = g[x], O = A.getAttribute("rel");
      if (O && O.toLowerCase().indexOf("icon") > -1) {
        const j = A.getAttribute("href");
        if (j)
          if (j.toLowerCase().indexOf("https:") === -1 && j.toLowerCase().indexOf("http:") === -1 && j.indexOf("//") !== 0) {
            let F = t.protocol + "//" + t.host;
            if (j.indexOf("/") === 0)
              F += j;
            else {
              const V = t.pathname.split("/");
              V.pop();
              const C = V.join("/");
              F += C + "/" + j;
            }
            _.push(F);
          } else if (j.indexOf("//") === 0) {
            const F = t.protocol + j;
            _.push(F);
          } else
            _.push(j);
      }
    }
    return _;
  }
  function r(...g) {
    const _ = e.getElementsByTagName("meta");
    for (let x = 0; x < _.length; x++) {
      const A = _[x], O = ["itemprop", "property", "name"].map((j) => A.getAttribute(j)).filter((j) => j ? g.includes(j) : !1);
      if (O.length && O) {
        const j = A.getAttribute("content");
        if (j)
          return j;
      }
    }
    return "";
  }
  function n() {
    let g = r("name", "og:site_name", "og:title", "twitter:title");
    return g || (g = e.title), g;
  }
  function s() {
    return r("description", "og:description", "twitter:description", "keywords");
  }
  const a = n(), h = s(), d = t.origin, f = i();
  return {
    description: h,
    url: d,
    icons: f,
    name: a
  };
}
hu = Na.getWindowMetadata = Sg;
var Yn = {}, Ig = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (t) => `%${t.charCodeAt(0).toString(16).toUpperCase()}`), cu = "%[a-f0-9]{2}", Hh = new RegExp("(" + cu + ")|([^%]+?)", "gi"), Wh = new RegExp("(" + cu + ")+", "gi");
function fa(e, t) {
  try {
    return [decodeURIComponent(e.join(""))];
  } catch {
  }
  if (e.length === 1)
    return e;
  t = t || 1;
  var i = e.slice(0, t), r = e.slice(t);
  return Array.prototype.concat.call([], fa(i), fa(r));
}
function Mg(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    for (var t = e.match(Hh) || [], i = 1; i < t.length; i++)
      e = fa(t, i).join(""), t = e.match(Hh) || [];
    return e;
  }
}
function Ag(e) {
  for (var t = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  }, i = Wh.exec(e); i; ) {
    try {
      t[i[0]] = decodeURIComponent(i[0]);
    } catch {
      var r = Mg(i[0]);
      r !== i[0] && (t[i[0]] = r);
    }
    i = Wh.exec(e);
  }
  t["%C2"] = "�";
  for (var n = Object.keys(t), s = 0; s < n.length; s++) {
    var a = n[s];
    e = e.replace(new RegExp(a, "g"), t[a]);
  }
  return e;
}
var xg = function(e) {
  if (typeof e != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
  try {
    return e = e.replace(/\+/g, " "), decodeURIComponent(e);
  } catch {
    return Ag(e);
  }
}, Og = (e, t) => {
  if (!(typeof e == "string" && typeof t == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (t === "")
    return [e];
  const i = e.indexOf(t);
  return i === -1 ? [e] : [
    e.slice(0, i),
    e.slice(i + t.length)
  ];
}, Pg = function(e, t) {
  for (var i = {}, r = Object.keys(e), n = Array.isArray(t), s = 0; s < r.length; s++) {
    var a = r[s], h = e[a];
    (n ? t.indexOf(a) !== -1 : t(a, h, e)) && (i[a] = h);
  }
  return i;
};
(function(e) {
  const t = Ig, i = xg, r = Og, n = Pg, s = (C) => C == null, a = Symbol("encodeFragmentIdentifier");
  function h(C) {
    switch (C.arrayFormat) {
      case "index":
        return (K) => (N, U) => {
          const D = N.length;
          return U === void 0 || C.skipNull && U === null || C.skipEmptyString && U === "" ? N : U === null ? [...N, [g(K, C), "[", D, "]"].join("")] : [
            ...N,
            [g(K, C), "[", g(D, C), "]=", g(U, C)].join("")
          ];
        };
      case "bracket":
        return (K) => (N, U) => U === void 0 || C.skipNull && U === null || C.skipEmptyString && U === "" ? N : U === null ? [...N, [g(K, C), "[]"].join("")] : [...N, [g(K, C), "[]=", g(U, C)].join("")];
      case "colon-list-separator":
        return (K) => (N, U) => U === void 0 || C.skipNull && U === null || C.skipEmptyString && U === "" ? N : U === null ? [...N, [g(K, C), ":list="].join("")] : [...N, [g(K, C), ":list=", g(U, C)].join("")];
      case "comma":
      case "separator":
      case "bracket-separator": {
        const K = C.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (N) => (U, D) => D === void 0 || C.skipNull && D === null || C.skipEmptyString && D === "" ? U : (D = D === null ? "" : D, U.length === 0 ? [[g(N, C), K, g(D, C)].join("")] : [[U, g(D, C)].join(C.arrayFormatSeparator)]);
      }
      default:
        return (K) => (N, U) => U === void 0 || C.skipNull && U === null || C.skipEmptyString && U === "" ? N : U === null ? [...N, g(K, C)] : [...N, [g(K, C), "=", g(U, C)].join("")];
    }
  }
  function d(C) {
    let K;
    switch (C.arrayFormat) {
      case "index":
        return (N, U, D) => {
          if (K = /\[(\d*)\]$/.exec(N), N = N.replace(/\[\d*\]$/, ""), !K) {
            D[N] = U;
            return;
          }
          D[N] === void 0 && (D[N] = {}), D[N][K[1]] = U;
        };
      case "bracket":
        return (N, U, D) => {
          if (K = /(\[\])$/.exec(N), N = N.replace(/\[\]$/, ""), !K) {
            D[N] = U;
            return;
          }
          if (D[N] === void 0) {
            D[N] = [U];
            return;
          }
          D[N] = [].concat(D[N], U);
        };
      case "colon-list-separator":
        return (N, U, D) => {
          if (K = /(:list)$/.exec(N), N = N.replace(/:list$/, ""), !K) {
            D[N] = U;
            return;
          }
          if (D[N] === void 0) {
            D[N] = [U];
            return;
          }
          D[N] = [].concat(D[N], U);
        };
      case "comma":
      case "separator":
        return (N, U, D) => {
          const v = typeof U == "string" && U.includes(C.arrayFormatSeparator), T = typeof U == "string" && !v && _(U, C).includes(C.arrayFormatSeparator);
          U = T ? _(U, C) : U;
          const Y = v || T ? U.split(C.arrayFormatSeparator).map((Q) => _(Q, C)) : U === null ? U : _(U, C);
          D[N] = Y;
        };
      case "bracket-separator":
        return (N, U, D) => {
          const v = /(\[\])$/.test(N);
          if (N = N.replace(/\[\]$/, ""), !v) {
            D[N] = U && _(U, C);
            return;
          }
          const T = U === null ? [] : U.split(C.arrayFormatSeparator).map((Y) => _(Y, C));
          if (D[N] === void 0) {
            D[N] = T;
            return;
          }
          D[N] = [].concat(D[N], T);
        };
      default:
        return (N, U, D) => {
          if (D[N] === void 0) {
            D[N] = U;
            return;
          }
          D[N] = [].concat(D[N], U);
        };
    }
  }
  function f(C) {
    if (typeof C != "string" || C.length !== 1)
      throw new TypeError("arrayFormatSeparator must be single character string");
  }
  function g(C, K) {
    return K.encode ? K.strict ? t(C) : encodeURIComponent(C) : C;
  }
  function _(C, K) {
    return K.decode ? i(C) : C;
  }
  function x(C) {
    return Array.isArray(C) ? C.sort() : typeof C == "object" ? x(Object.keys(C)).sort((K, N) => Number(K) - Number(N)).map((K) => C[K]) : C;
  }
  function A(C) {
    const K = C.indexOf("#");
    return K !== -1 && (C = C.slice(0, K)), C;
  }
  function O(C) {
    let K = "";
    const N = C.indexOf("#");
    return N !== -1 && (K = C.slice(N)), K;
  }
  function j(C) {
    C = A(C);
    const K = C.indexOf("?");
    return K === -1 ? "" : C.slice(K + 1);
  }
  function F(C, K) {
    return K.parseNumbers && !Number.isNaN(Number(C)) && typeof C == "string" && C.trim() !== "" ? C = Number(C) : K.parseBooleans && C !== null && (C.toLowerCase() === "true" || C.toLowerCase() === "false") && (C = C.toLowerCase() === "true"), C;
  }
  function V(C, K) {
    K = Object.assign({
      decode: !0,
      sort: !0,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: !1,
      parseBooleans: !1
    }, K), f(K.arrayFormatSeparator);
    const N = d(K), U = /* @__PURE__ */ Object.create(null);
    if (typeof C != "string" || (C = C.trim().replace(/^[?#&]/, ""), !C))
      return U;
    for (const D of C.split("&")) {
      if (D === "")
        continue;
      let [v, T] = r(K.decode ? D.replace(/\+/g, " ") : D, "=");
      T = T === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(K.arrayFormat) ? T : _(T, K), N(_(v, K), T, U);
    }
    for (const D of Object.keys(U)) {
      const v = U[D];
      if (typeof v == "object" && v !== null)
        for (const T of Object.keys(v))
          v[T] = F(v[T], K);
      else
        U[D] = F(v, K);
    }
    return K.sort === !1 ? U : (K.sort === !0 ? Object.keys(U).sort() : Object.keys(U).sort(K.sort)).reduce((D, v) => {
      const T = U[v];
      return T && typeof T == "object" && !Array.isArray(T) ? D[v] = x(T) : D[v] = T, D;
    }, /* @__PURE__ */ Object.create(null));
  }
  e.extract = j, e.parse = V, e.stringify = (C, K) => {
    if (!C)
      return "";
    K = Object.assign({
      encode: !0,
      strict: !0,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, K), f(K.arrayFormatSeparator);
    const N = (T) => K.skipNull && s(C[T]) || K.skipEmptyString && C[T] === "", U = h(K), D = {};
    for (const T of Object.keys(C))
      N(T) || (D[T] = C[T]);
    const v = Object.keys(D);
    return K.sort !== !1 && v.sort(K.sort), v.map((T) => {
      const Y = C[T];
      return Y === void 0 ? "" : Y === null ? g(T, K) : Array.isArray(Y) ? Y.length === 0 && K.arrayFormat === "bracket-separator" ? g(T, K) + "[]" : Y.reduce(U(T), []).join("&") : g(T, K) + "=" + g(Y, K);
    }).filter((T) => T.length > 0).join("&");
  }, e.parseUrl = (C, K) => {
    K = Object.assign({
      decode: !0
    }, K);
    const [N, U] = r(C, "#");
    return Object.assign(
      {
        url: N.split("?")[0] || "",
        query: V(j(C), K)
      },
      K && K.parseFragmentIdentifier && U ? { fragmentIdentifier: _(U, K) } : {}
    );
  }, e.stringifyUrl = (C, K) => {
    K = Object.assign({
      encode: !0,
      strict: !0,
      [a]: !0
    }, K);
    const N = A(C.url).split("?")[0] || "", U = e.extract(C.url), D = e.parse(U, { sort: !1 }), v = Object.assign(D, C.query);
    let T = e.stringify(v, K);
    T && (T = `?${T}`);
    let Y = O(C.url);
    return C.fragmentIdentifier && (Y = `#${K[a] ? g(C.fragmentIdentifier, K) : C.fragmentIdentifier}`), `${N}${T}${Y}`;
  }, e.pick = (C, K, N) => {
    N = Object.assign({
      parseFragmentIdentifier: !0,
      [a]: !1
    }, N);
    const { url: U, query: D, fragmentIdentifier: v } = e.parseUrl(C, N);
    return e.stringifyUrl({
      url: U,
      query: n(D, K),
      fragmentIdentifier: v
    }, N);
  }, e.exclude = (C, K, N) => {
    const U = Array.isArray(K) ? (D) => !K.includes(D) : (D, v) => !K(D, v);
    return e.pick(C, U, N);
  };
})(Yn);
var fu = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(e) {
  (function() {
    var t = "input is invalid type", i = "finalize already called", r = typeof window == "object", n = r ? window : {};
    n.JS_SHA3_NO_WINDOW && (r = !1);
    var s = !r && typeof self == "object", a = !n.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    a ? n = ti : s && (n = self);
    var h = !n.JS_SHA3_NO_COMMON_JS && !0 && e.exports, d = !n.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", f = "0123456789abcdef".split(""), g = [31, 7936, 2031616, 520093696], _ = [4, 1024, 262144, 67108864], x = [1, 256, 65536, 16777216], A = [6, 1536, 393216, 100663296], O = [0, 8, 16, 24], j = [
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
    ], F = [224, 256, 384, 512], V = [128, 256], C = ["hex", "buffer", "arrayBuffer", "array", "digest"], K = {
      128: 168,
      256: 136
    };
    (n.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(M) {
      return Object.prototype.toString.call(M) === "[object Array]";
    }), d && (n.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(M) {
      return typeof M == "object" && M.buffer && M.buffer.constructor === ArrayBuffer;
    });
    for (var N = function(M, $, L) {
      return function(k) {
        return new P(M, $, M).update(k)[L]();
      };
    }, U = function(M, $, L) {
      return function(k, q) {
        return new P(M, $, q).update(k)[L]();
      };
    }, D = function(M, $, L) {
      return function(k, q, y, R) {
        return c["cshake" + M].update(k, q, y, R)[L]();
      };
    }, v = function(M, $, L) {
      return function(k, q, y, R) {
        return c["kmac" + M].update(k, q, y, R)[L]();
      };
    }, T = function(M, $, L, k) {
      for (var q = 0; q < C.length; ++q) {
        var y = C[q];
        M[y] = $(L, k, y);
      }
      return M;
    }, Y = function(M, $) {
      var L = N(M, $, "hex");
      return L.create = function() {
        return new P(M, $, M);
      }, L.update = function(k) {
        return L.create().update(k);
      }, T(L, N, M, $);
    }, Q = function(M, $) {
      var L = U(M, $, "hex");
      return L.create = function(k) {
        return new P(M, $, k);
      }, L.update = function(k, q) {
        return L.create(q).update(k);
      }, T(L, U, M, $);
    }, p = function(M, $) {
      var L = K[M], k = D(M, $, "hex");
      return k.create = function(q, y, R) {
        return !y && !R ? c["shake" + M].create(q) : new P(M, $, q).bytepad([y, R], L);
      }, k.update = function(q, y, R, W) {
        return k.create(y, R, W).update(q);
      }, T(k, D, M, $);
    }, S = function(M, $) {
      var L = K[M], k = v(M, $, "hex");
      return k.create = function(q, y, R) {
        return new B(M, $, y).bytepad(["KMAC", R], L).bytepad([q], L);
      }, k.update = function(q, y, R, W) {
        return k.create(q, R, W).update(y);
      }, T(k, v, M, $);
    }, o = [
      { name: "keccak", padding: x, bits: F, createMethod: Y },
      { name: "sha3", padding: A, bits: F, createMethod: Y },
      { name: "shake", padding: g, bits: V, createMethod: Q },
      { name: "cshake", padding: _, bits: V, createMethod: p },
      { name: "kmac", padding: _, bits: V, createMethod: S }
    ], c = {}, l = [], E = 0; E < o.length; ++E)
      for (var I = o[E], w = I.bits, u = 0; u < w.length; ++u) {
        var m = I.name + "_" + w[u];
        if (l.push(m), c[m] = I.createMethod(w[u], I.padding), I.name !== "sha3") {
          var b = I.name + w[u];
          l.push(b), c[b] = c[m];
        }
      }
    function P(M, $, L) {
      this.blocks = [], this.s = [], this.padding = $, this.outputBits = L, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (M << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = L >> 5, this.extraBytes = (L & 31) >> 3;
      for (var k = 0; k < 50; ++k)
        this.s[k] = 0;
    }
    P.prototype.update = function(M) {
      if (this.finalized)
        throw new Error(i);
      var $, L = typeof M;
      if (L !== "string") {
        if (L === "object") {
          if (M === null)
            throw new Error(t);
          if (d && M.constructor === ArrayBuffer)
            M = new Uint8Array(M);
          else if (!Array.isArray(M) && (!d || !ArrayBuffer.isView(M)))
            throw new Error(t);
        } else
          throw new Error(t);
        $ = !0;
      }
      for (var k = this.blocks, q = this.byteCount, y = M.length, R = this.blockCount, W = 0, Z = this.s, J, oe; W < y; ) {
        if (this.reset)
          for (this.reset = !1, k[0] = this.block, J = 1; J < R + 1; ++J)
            k[J] = 0;
        if ($)
          for (J = this.start; W < y && J < q; ++W)
            k[J >> 2] |= M[W] << O[J++ & 3];
        else
          for (J = this.start; W < y && J < q; ++W)
            oe = M.charCodeAt(W), oe < 128 ? k[J >> 2] |= oe << O[J++ & 3] : oe < 2048 ? (k[J >> 2] |= (192 | oe >> 6) << O[J++ & 3], k[J >> 2] |= (128 | oe & 63) << O[J++ & 3]) : oe < 55296 || oe >= 57344 ? (k[J >> 2] |= (224 | oe >> 12) << O[J++ & 3], k[J >> 2] |= (128 | oe >> 6 & 63) << O[J++ & 3], k[J >> 2] |= (128 | oe & 63) << O[J++ & 3]) : (oe = 65536 + ((oe & 1023) << 10 | M.charCodeAt(++W) & 1023), k[J >> 2] |= (240 | oe >> 18) << O[J++ & 3], k[J >> 2] |= (128 | oe >> 12 & 63) << O[J++ & 3], k[J >> 2] |= (128 | oe >> 6 & 63) << O[J++ & 3], k[J >> 2] |= (128 | oe & 63) << O[J++ & 3]);
        if (this.lastByteIndex = J, J >= q) {
          for (this.start = J - q, this.block = k[R], J = 0; J < R; ++J)
            Z[J] ^= k[J];
          G(Z), this.reset = !0;
        } else
          this.start = J;
      }
      return this;
    }, P.prototype.encode = function(M, $) {
      var L = M & 255, k = 1, q = [L];
      for (M = M >> 8, L = M & 255; L > 0; )
        q.unshift(L), M = M >> 8, L = M & 255, ++k;
      return $ ? q.push(k) : q.unshift(k), this.update(q), q.length;
    }, P.prototype.encodeString = function(M) {
      var $, L = typeof M;
      if (L !== "string") {
        if (L === "object") {
          if (M === null)
            throw new Error(t);
          if (d && M.constructor === ArrayBuffer)
            M = new Uint8Array(M);
          else if (!Array.isArray(M) && (!d || !ArrayBuffer.isView(M)))
            throw new Error(t);
        } else
          throw new Error(t);
        $ = !0;
      }
      var k = 0, q = M.length;
      if ($)
        k = q;
      else
        for (var y = 0; y < M.length; ++y) {
          var R = M.charCodeAt(y);
          R < 128 ? k += 1 : R < 2048 ? k += 2 : R < 55296 || R >= 57344 ? k += 3 : (R = 65536 + ((R & 1023) << 10 | M.charCodeAt(++y) & 1023), k += 4);
        }
      return k += this.encode(k * 8), this.update(M), k;
    }, P.prototype.bytepad = function(M, $) {
      for (var L = this.encode($), k = 0; k < M.length; ++k)
        L += this.encodeString(M[k]);
      var q = $ - L % $, y = [];
      return y.length = q, this.update(y), this;
    }, P.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var M = this.blocks, $ = this.lastByteIndex, L = this.blockCount, k = this.s;
        if (M[$ >> 2] |= this.padding[$ & 3], this.lastByteIndex === this.byteCount)
          for (M[0] = M[L], $ = 1; $ < L + 1; ++$)
            M[$] = 0;
        for (M[L - 1] |= 2147483648, $ = 0; $ < L; ++$)
          k[$] ^= M[$];
        G(k);
      }
    }, P.prototype.toString = P.prototype.hex = function() {
      this.finalize();
      for (var M = this.blockCount, $ = this.s, L = this.outputBlocks, k = this.extraBytes, q = 0, y = 0, R = "", W; y < L; ) {
        for (q = 0; q < M && y < L; ++q, ++y)
          W = $[q], R += f[W >> 4 & 15] + f[W & 15] + f[W >> 12 & 15] + f[W >> 8 & 15] + f[W >> 20 & 15] + f[W >> 16 & 15] + f[W >> 28 & 15] + f[W >> 24 & 15];
        y % M === 0 && (G($), q = 0);
      }
      return k && (W = $[q], R += f[W >> 4 & 15] + f[W & 15], k > 1 && (R += f[W >> 12 & 15] + f[W >> 8 & 15]), k > 2 && (R += f[W >> 20 & 15] + f[W >> 16 & 15])), R;
    }, P.prototype.arrayBuffer = function() {
      this.finalize();
      var M = this.blockCount, $ = this.s, L = this.outputBlocks, k = this.extraBytes, q = 0, y = 0, R = this.outputBits >> 3, W;
      k ? W = new ArrayBuffer(L + 1 << 2) : W = new ArrayBuffer(R);
      for (var Z = new Uint32Array(W); y < L; ) {
        for (q = 0; q < M && y < L; ++q, ++y)
          Z[y] = $[q];
        y % M === 0 && G($);
      }
      return k && (Z[q] = $[q], W = W.slice(0, R)), W;
    }, P.prototype.buffer = P.prototype.arrayBuffer, P.prototype.digest = P.prototype.array = function() {
      this.finalize();
      for (var M = this.blockCount, $ = this.s, L = this.outputBlocks, k = this.extraBytes, q = 0, y = 0, R = [], W, Z; y < L; ) {
        for (q = 0; q < M && y < L; ++q, ++y)
          W = y << 2, Z = $[q], R[W] = Z & 255, R[W + 1] = Z >> 8 & 255, R[W + 2] = Z >> 16 & 255, R[W + 3] = Z >> 24 & 255;
        y % M === 0 && G($);
      }
      return k && (W = y << 2, Z = $[q], R[W] = Z & 255, k > 1 && (R[W + 1] = Z >> 8 & 255), k > 2 && (R[W + 2] = Z >> 16 & 255)), R;
    };
    function B(M, $, L) {
      P.call(this, M, $, L);
    }
    B.prototype = new P(), B.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), P.prototype.finalize.call(this);
    };
    var G = function(M) {
      var $, L, k, q, y, R, W, Z, J, oe, Ee, he, Re, Pe, se, Se, ve, ie, ge, pe, ee, fe, me, re, ue, Ie, ae, Me, Ae, ce, We, Ye, xe, $e, Xe, Oe, et, Te, le, ke, Le, be, Ne, ze, we, Ue, De, _e, qe, Ce, de, Fe, Ke, je, it, tt, Je, Kt, Bt, $t, Vt, Ht, bt;
      for (k = 0; k < 48; k += 2)
        q = M[0] ^ M[10] ^ M[20] ^ M[30] ^ M[40], y = M[1] ^ M[11] ^ M[21] ^ M[31] ^ M[41], R = M[2] ^ M[12] ^ M[22] ^ M[32] ^ M[42], W = M[3] ^ M[13] ^ M[23] ^ M[33] ^ M[43], Z = M[4] ^ M[14] ^ M[24] ^ M[34] ^ M[44], J = M[5] ^ M[15] ^ M[25] ^ M[35] ^ M[45], oe = M[6] ^ M[16] ^ M[26] ^ M[36] ^ M[46], Ee = M[7] ^ M[17] ^ M[27] ^ M[37] ^ M[47], he = M[8] ^ M[18] ^ M[28] ^ M[38] ^ M[48], Re = M[9] ^ M[19] ^ M[29] ^ M[39] ^ M[49], $ = he ^ (R << 1 | W >>> 31), L = Re ^ (W << 1 | R >>> 31), M[0] ^= $, M[1] ^= L, M[10] ^= $, M[11] ^= L, M[20] ^= $, M[21] ^= L, M[30] ^= $, M[31] ^= L, M[40] ^= $, M[41] ^= L, $ = q ^ (Z << 1 | J >>> 31), L = y ^ (J << 1 | Z >>> 31), M[2] ^= $, M[3] ^= L, M[12] ^= $, M[13] ^= L, M[22] ^= $, M[23] ^= L, M[32] ^= $, M[33] ^= L, M[42] ^= $, M[43] ^= L, $ = R ^ (oe << 1 | Ee >>> 31), L = W ^ (Ee << 1 | oe >>> 31), M[4] ^= $, M[5] ^= L, M[14] ^= $, M[15] ^= L, M[24] ^= $, M[25] ^= L, M[34] ^= $, M[35] ^= L, M[44] ^= $, M[45] ^= L, $ = Z ^ (he << 1 | Re >>> 31), L = J ^ (Re << 1 | he >>> 31), M[6] ^= $, M[7] ^= L, M[16] ^= $, M[17] ^= L, M[26] ^= $, M[27] ^= L, M[36] ^= $, M[37] ^= L, M[46] ^= $, M[47] ^= L, $ = oe ^ (q << 1 | y >>> 31), L = Ee ^ (y << 1 | q >>> 31), M[8] ^= $, M[9] ^= L, M[18] ^= $, M[19] ^= L, M[28] ^= $, M[29] ^= L, M[38] ^= $, M[39] ^= L, M[48] ^= $, M[49] ^= L, Pe = M[0], se = M[1], Ue = M[11] << 4 | M[10] >>> 28, De = M[10] << 4 | M[11] >>> 28, Me = M[20] << 3 | M[21] >>> 29, Ae = M[21] << 3 | M[20] >>> 29, $t = M[31] << 9 | M[30] >>> 23, Vt = M[30] << 9 | M[31] >>> 23, be = M[40] << 18 | M[41] >>> 14, Ne = M[41] << 18 | M[40] >>> 14, $e = M[2] << 1 | M[3] >>> 31, Xe = M[3] << 1 | M[2] >>> 31, Se = M[13] << 12 | M[12] >>> 20, ve = M[12] << 12 | M[13] >>> 20, _e = M[22] << 10 | M[23] >>> 22, qe = M[23] << 10 | M[22] >>> 22, ce = M[33] << 13 | M[32] >>> 19, We = M[32] << 13 | M[33] >>> 19, Ht = M[42] << 2 | M[43] >>> 30, bt = M[43] << 2 | M[42] >>> 30, je = M[5] << 30 | M[4] >>> 2, it = M[4] << 30 | M[5] >>> 2, Oe = M[14] << 6 | M[15] >>> 26, et = M[15] << 6 | M[14] >>> 26, ie = M[25] << 11 | M[24] >>> 21, ge = M[24] << 11 | M[25] >>> 21, Ce = M[34] << 15 | M[35] >>> 17, de = M[35] << 15 | M[34] >>> 17, Ye = M[45] << 29 | M[44] >>> 3, xe = M[44] << 29 | M[45] >>> 3, re = M[6] << 28 | M[7] >>> 4, ue = M[7] << 28 | M[6] >>> 4, tt = M[17] << 23 | M[16] >>> 9, Je = M[16] << 23 | M[17] >>> 9, Te = M[26] << 25 | M[27] >>> 7, le = M[27] << 25 | M[26] >>> 7, pe = M[36] << 21 | M[37] >>> 11, ee = M[37] << 21 | M[36] >>> 11, Fe = M[47] << 24 | M[46] >>> 8, Ke = M[46] << 24 | M[47] >>> 8, ze = M[8] << 27 | M[9] >>> 5, we = M[9] << 27 | M[8] >>> 5, Ie = M[18] << 20 | M[19] >>> 12, ae = M[19] << 20 | M[18] >>> 12, Kt = M[29] << 7 | M[28] >>> 25, Bt = M[28] << 7 | M[29] >>> 25, ke = M[38] << 8 | M[39] >>> 24, Le = M[39] << 8 | M[38] >>> 24, fe = M[48] << 14 | M[49] >>> 18, me = M[49] << 14 | M[48] >>> 18, M[0] = Pe ^ ~Se & ie, M[1] = se ^ ~ve & ge, M[10] = re ^ ~Ie & Me, M[11] = ue ^ ~ae & Ae, M[20] = $e ^ ~Oe & Te, M[21] = Xe ^ ~et & le, M[30] = ze ^ ~Ue & _e, M[31] = we ^ ~De & qe, M[40] = je ^ ~tt & Kt, M[41] = it ^ ~Je & Bt, M[2] = Se ^ ~ie & pe, M[3] = ve ^ ~ge & ee, M[12] = Ie ^ ~Me & ce, M[13] = ae ^ ~Ae & We, M[22] = Oe ^ ~Te & ke, M[23] = et ^ ~le & Le, M[32] = Ue ^ ~_e & Ce, M[33] = De ^ ~qe & de, M[42] = tt ^ ~Kt & $t, M[43] = Je ^ ~Bt & Vt, M[4] = ie ^ ~pe & fe, M[5] = ge ^ ~ee & me, M[14] = Me ^ ~ce & Ye, M[15] = Ae ^ ~We & xe, M[24] = Te ^ ~ke & be, M[25] = le ^ ~Le & Ne, M[34] = _e ^ ~Ce & Fe, M[35] = qe ^ ~de & Ke, M[44] = Kt ^ ~$t & Ht, M[45] = Bt ^ ~Vt & bt, M[6] = pe ^ ~fe & Pe, M[7] = ee ^ ~me & se, M[16] = ce ^ ~Ye & re, M[17] = We ^ ~xe & ue, M[26] = ke ^ ~be & $e, M[27] = Le ^ ~Ne & Xe, M[36] = Ce ^ ~Fe & ze, M[37] = de ^ ~Ke & we, M[46] = $t ^ ~Ht & je, M[47] = Vt ^ ~bt & it, M[8] = fe ^ ~Pe & Se, M[9] = me ^ ~se & ve, M[18] = Ye ^ ~re & Ie, M[19] = xe ^ ~ue & ae, M[28] = be ^ ~$e & Oe, M[29] = Ne ^ ~Xe & et, M[38] = Fe ^ ~ze & Ue, M[39] = Ke ^ ~we & De, M[48] = Ht ^ ~je & tt, M[49] = bt ^ ~it & Je, M[0] ^= j[k], M[1] ^= j[k + 1];
    };
    if (h)
      e.exports = c;
    else
      for (E = 0; E < l.length; ++E)
        n[l[E]] = c[l[E]];
  })();
})(fu);
var Ng = fu.exports;
const Rg = /* @__PURE__ */ gn(Ng), Tg = "logger/5.7.0";
let Gh = !1, Yh = !1;
const Os = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let Jh = Os.default, Co = null;
function kg() {
  try {
    const e = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        e.push(t);
      }
    }), e.length)
      throw new Error("missing " + e.join(", "));
    if ("é".normalize("NFD") !== "é")
      throw new Error("broken implementation");
  } catch (e) {
    return e.message;
  }
  return null;
}
const Zh = kg();
var ua;
(function(e) {
  e.DEBUG = "DEBUG", e.INFO = "INFO", e.WARNING = "WARNING", e.ERROR = "ERROR", e.OFF = "OFF";
})(ua || (ua = {}));
var Ii;
(function(e) {
  e.UNKNOWN_ERROR = "UNKNOWN_ERROR", e.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", e.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", e.NETWORK_ERROR = "NETWORK_ERROR", e.SERVER_ERROR = "SERVER_ERROR", e.TIMEOUT = "TIMEOUT", e.BUFFER_OVERRUN = "BUFFER_OVERRUN", e.NUMERIC_FAULT = "NUMERIC_FAULT", e.MISSING_NEW = "MISSING_NEW", e.INVALID_ARGUMENT = "INVALID_ARGUMENT", e.MISSING_ARGUMENT = "MISSING_ARGUMENT", e.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", e.CALL_EXCEPTION = "CALL_EXCEPTION", e.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", e.NONCE_EXPIRED = "NONCE_EXPIRED", e.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", e.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", e.TRANSACTION_REPLACED = "TRANSACTION_REPLACED", e.ACTION_REJECTED = "ACTION_REJECTED";
})(Ii || (Ii = {}));
const Xh = "0123456789abcdef";
class ct {
  constructor(t) {
    Object.defineProperty(this, "version", {
      enumerable: !0,
      value: t,
      writable: !1
    });
  }
  _log(t, i) {
    const r = t.toLowerCase();
    Os[r] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(Jh > Os[r]) && console.log.apply(console, i);
  }
  debug(...t) {
    this._log(ct.levels.DEBUG, t);
  }
  info(...t) {
    this._log(ct.levels.INFO, t);
  }
  warn(...t) {
    this._log(ct.levels.WARNING, t);
  }
  makeError(t, i, r) {
    if (Yh)
      return this.makeError("censored error", i, {});
    i || (i = ct.errors.UNKNOWN_ERROR), r || (r = {});
    const n = [];
    Object.keys(r).forEach((d) => {
      const f = r[d];
      try {
        if (f instanceof Uint8Array) {
          let g = "";
          for (let _ = 0; _ < f.length; _++)
            g += Xh[f[_] >> 4], g += Xh[f[_] & 15];
          n.push(d + "=Uint8Array(0x" + g + ")");
        } else
          n.push(d + "=" + JSON.stringify(f));
      } catch {
        n.push(d + "=" + JSON.stringify(r[d].toString()));
      }
    }), n.push(`code=${i}`), n.push(`version=${this.version}`);
    const s = t;
    let a = "";
    switch (i) {
      case Ii.NUMERIC_FAULT: {
        a = "NUMERIC_FAULT";
        const d = t;
        switch (d) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            a += "-" + d;
            break;
          case "negative-power":
          case "negative-width":
            a += "-unsupported";
            break;
          case "unbound-bitwise-result":
            a += "-unbound-result";
            break;
        }
        break;
      }
      case Ii.CALL_EXCEPTION:
      case Ii.INSUFFICIENT_FUNDS:
      case Ii.MISSING_NEW:
      case Ii.NONCE_EXPIRED:
      case Ii.REPLACEMENT_UNDERPRICED:
      case Ii.TRANSACTION_REPLACED:
      case Ii.UNPREDICTABLE_GAS_LIMIT:
        a = i;
        break;
    }
    a && (t += " [ See: https://links.ethers.org/v5-errors-" + a + " ]"), n.length && (t += " (" + n.join(", ") + ")");
    const h = new Error(t);
    return h.reason = s, h.code = i, Object.keys(r).forEach(function(d) {
      h[d] = r[d];
    }), h;
  }
  throwError(t, i, r) {
    throw this.makeError(t, i, r);
  }
  throwArgumentError(t, i, r) {
    return this.throwError(t, ct.errors.INVALID_ARGUMENT, {
      argument: i,
      value: r
    });
  }
  assert(t, i, r, n) {
    t || this.throwError(i, r, n);
  }
  assertArgument(t, i, r, n) {
    t || this.throwArgumentError(i, r, n);
  }
  checkNormalize(t) {
    Zh && this.throwError("platform missing String.prototype.normalize", ct.errors.UNSUPPORTED_OPERATION, {
      operation: "String.prototype.normalize",
      form: Zh
    });
  }
  checkSafeUint53(t, i) {
    typeof t == "number" && (i == null && (i = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(i, ct.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "out-of-safe-range",
      value: t
    }), t % 1 && this.throwError(i, ct.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "non-integer",
      value: t
    }));
  }
  checkArgumentCount(t, i, r) {
    r ? r = ": " + r : r = "", t < i && this.throwError("missing argument" + r, ct.errors.MISSING_ARGUMENT, {
      count: t,
      expectedCount: i
    }), t > i && this.throwError("too many arguments" + r, ct.errors.UNEXPECTED_ARGUMENT, {
      count: t,
      expectedCount: i
    });
  }
  checkNew(t, i) {
    (t === Object || t == null) && this.throwError("missing new", ct.errors.MISSING_NEW, { name: i.name });
  }
  checkAbstract(t, i) {
    t === i ? this.throwError("cannot instantiate abstract class " + JSON.stringify(i.name) + " directly; use a sub-class", ct.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", ct.errors.MISSING_NEW, { name: i.name });
  }
  static globalLogger() {
    return Co || (Co = new ct(Tg)), Co;
  }
  static setCensorship(t, i) {
    if (!t && i && this.globalLogger().throwError("cannot permanently disable censorship", ct.errors.UNSUPPORTED_OPERATION, {
      operation: "setCensorship"
    }), Gh) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", ct.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    Yh = !!t, Gh = !!i;
  }
  static setLogLevel(t) {
    const i = Os[t.toLowerCase()];
    if (i == null) {
      ct.globalLogger().warn("invalid log level - " + t);
      return;
    }
    Jh = i;
  }
  static from(t) {
    return new ct(t);
  }
}
ct.errors = Ii;
ct.levels = ua;
const Lg = "bytes/5.7.0", pt = new ct(Lg);
function uu(e) {
  return !!e.toHexString;
}
function hn(e) {
  return e.slice || (e.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return hn(new Uint8Array(Array.prototype.slice.apply(e, t)));
  }), e;
}
function Cg(e) {
  return Ci(e) && !(e.length % 2) || Ra(e);
}
function Qh(e) {
  return typeof e == "number" && e == e && e % 1 === 0;
}
function Ra(e) {
  if (e == null)
    return !1;
  if (e.constructor === Uint8Array)
    return !0;
  if (typeof e == "string" || !Qh(e.length) || e.length < 0)
    return !1;
  for (let t = 0; t < e.length; t++) {
    const i = e[t];
    if (!Qh(i) || i < 0 || i >= 256)
      return !1;
  }
  return !0;
}
function mt(e, t) {
  if (t || (t = {}), typeof e == "number") {
    pt.checkSafeUint53(e, "invalid arrayify value");
    const i = [];
    for (; e; )
      i.unshift(e & 255), e = parseInt(String(e / 256));
    return i.length === 0 && i.push(0), hn(new Uint8Array(i));
  }
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), uu(e) && (e = e.toHexString()), Ci(e)) {
    let i = e.substring(2);
    i.length % 2 && (t.hexPad === "left" ? i = "0" + i : t.hexPad === "right" ? i += "0" : pt.throwArgumentError("hex data is odd-length", "value", e));
    const r = [];
    for (let n = 0; n < i.length; n += 2)
      r.push(parseInt(i.substring(n, n + 2), 16));
    return hn(new Uint8Array(r));
  }
  return Ra(e) ? hn(new Uint8Array(e)) : pt.throwArgumentError("invalid arrayify value", "value", e);
}
function qg(e) {
  const t = e.map((n) => mt(n)), i = t.reduce((n, s) => n + s.length, 0), r = new Uint8Array(i);
  return t.reduce((n, s) => (r.set(s, n), n + s.length), 0), hn(r);
}
function jg(e, t) {
  e = mt(e), e.length > t && pt.throwArgumentError("value out of range", "value", arguments[0]);
  const i = new Uint8Array(t);
  return i.set(e, t - e.length), hn(i);
}
function Ci(e, t) {
  return !(typeof e != "string" || !e.match(/^0x[0-9A-Fa-f]*$/) || t && e.length !== 2 + 2 * t);
}
const qo = "0123456789abcdef";
function ei(e, t) {
  if (t || (t = {}), typeof e == "number") {
    pt.checkSafeUint53(e, "invalid hexlify value");
    let i = "";
    for (; e; )
      i = qo[e & 15] + i, e = Math.floor(e / 16);
    return i.length ? (i.length % 2 && (i = "0" + i), "0x" + i) : "0x00";
  }
  if (typeof e == "bigint")
    return e = e.toString(16), e.length % 2 ? "0x0" + e : "0x" + e;
  if (t.allowMissingPrefix && typeof e == "string" && e.substring(0, 2) !== "0x" && (e = "0x" + e), uu(e))
    return e.toHexString();
  if (Ci(e))
    return e.length % 2 && (t.hexPad === "left" ? e = "0x0" + e.substring(2) : t.hexPad === "right" ? e += "0" : pt.throwArgumentError("hex data is odd-length", "value", e)), e.toLowerCase();
  if (Ra(e)) {
    let i = "0x";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      i += qo[(n & 240) >> 4] + qo[n & 15];
    }
    return i;
  }
  return pt.throwArgumentError("invalid hexlify value", "value", e);
}
function zg(e) {
  if (typeof e != "string")
    e = ei(e);
  else if (!Ci(e) || e.length % 2)
    return null;
  return (e.length - 2) / 2;
}
function ec(e, t, i) {
  return typeof e != "string" ? e = ei(e) : (!Ci(e) || e.length % 2) && pt.throwArgumentError("invalid hexData", "value", e), t = 2 + 2 * t, i != null ? "0x" + e.substring(t, 2 + 2 * i) : "0x" + e.substring(t);
}
function cn(e, t) {
  for (typeof e != "string" ? e = ei(e) : Ci(e) || pt.throwArgumentError("invalid hex string", "value", e), e.length > 2 * t + 2 && pt.throwArgumentError("value out of range", "value", arguments[1]); e.length < 2 * t + 2; )
    e = "0x0" + e.substring(2);
  return e;
}
function du(e) {
  const t = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
    yParityAndS: "0x",
    compact: "0x"
  };
  if (Cg(e)) {
    let i = mt(e);
    i.length === 64 ? (t.v = 27 + (i[32] >> 7), i[32] &= 127, t.r = ei(i.slice(0, 32)), t.s = ei(i.slice(32, 64))) : i.length === 65 ? (t.r = ei(i.slice(0, 32)), t.s = ei(i.slice(32, 64)), t.v = i[64]) : pt.throwArgumentError("invalid signature string", "signature", e), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : pt.throwArgumentError("signature invalid v byte", "signature", e)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (i[32] |= 128), t._vs = ei(i.slice(32, 64));
  } else {
    if (t.r = e.r, t.s = e.s, t.v = e.v, t.recoveryParam = e.recoveryParam, t._vs = e._vs, t._vs != null) {
      const n = jg(mt(t._vs), 32);
      t._vs = ei(n);
      const s = n[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = s : t.recoveryParam !== s && pt.throwArgumentError("signature recoveryParam mismatch _vs", "signature", e), n[0] &= 127;
      const a = ei(n);
      t.s == null ? t.s = a : t.s !== a && pt.throwArgumentError("signature v mismatch _vs", "signature", e);
    }
    if (t.recoveryParam == null)
      t.v == null ? pt.throwArgumentError("signature missing v and recoveryParam", "signature", e) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const n = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== n && pt.throwArgumentError("signature recoveryParam mismatch v", "signature", e);
    }
    t.r == null || !Ci(t.r) ? pt.throwArgumentError("signature missing or invalid r", "signature", e) : t.r = cn(t.r, 32), t.s == null || !Ci(t.s) ? pt.throwArgumentError("signature missing or invalid s", "signature", e) : t.s = cn(t.s, 32);
    const i = mt(t.s);
    i[0] >= 128 && pt.throwArgumentError("signature s out of range", "signature", e), t.recoveryParam && (i[0] |= 128);
    const r = ei(i);
    t._vs && (Ci(t._vs) || pt.throwArgumentError("signature invalid _vs", "signature", e), t._vs = cn(t._vs, 32)), t._vs == null ? t._vs = r : t._vs !== r && pt.throwArgumentError("signature _vs mismatch v and s", "signature", e);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
function Ta(e) {
  return "0x" + Rg.keccak_256(mt(e));
}
var lu = { exports: {} };
(function(e) {
  (function(t, i) {
    function r(o, c) {
      if (!o)
        throw new Error(c || "Assertion failed");
    }
    function n(o, c) {
      o.super_ = c;
      var l = function() {
      };
      l.prototype = c.prototype, o.prototype = new l(), o.prototype.constructor = o;
    }
    function s(o, c, l) {
      if (s.isBN(o))
        return o;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, o !== null && ((c === "le" || c === "be") && (l = c, c = 10), this._init(o || 0, c || 10, l || "be"));
    }
    typeof t == "object" ? t.exports = s : i.BN = s, s.BN = s, s.wordSize = 26;
    var a;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = oo.Buffer;
    } catch {
    }
    s.isBN = function(o) {
      return o instanceof s ? !0 : o !== null && typeof o == "object" && o.constructor.wordSize === s.wordSize && Array.isArray(o.words);
    }, s.max = function(o, c) {
      return o.cmp(c) > 0 ? o : c;
    }, s.min = function(o, c) {
      return o.cmp(c) < 0 ? o : c;
    }, s.prototype._init = function(o, c, l) {
      if (typeof o == "number")
        return this._initNumber(o, c, l);
      if (typeof o == "object")
        return this._initArray(o, c, l);
      c === "hex" && (c = 16), r(c === (c | 0) && c >= 2 && c <= 36), o = o.toString().replace(/\s+/g, "");
      var E = 0;
      o[0] === "-" && (E++, this.negative = 1), E < o.length && (c === 16 ? this._parseHex(o, E, l) : (this._parseBase(o, c, E), l === "le" && this._initArray(this.toArray(), c, l)));
    }, s.prototype._initNumber = function(o, c, l) {
      o < 0 && (this.negative = 1, o = -o), o < 67108864 ? (this.words = [o & 67108863], this.length = 1) : o < 4503599627370496 ? (this.words = [
        o & 67108863,
        o / 67108864 & 67108863
      ], this.length = 2) : (r(o < 9007199254740992), this.words = [
        o & 67108863,
        o / 67108864 & 67108863,
        1
      ], this.length = 3), l === "le" && this._initArray(this.toArray(), c, l);
    }, s.prototype._initArray = function(o, c, l) {
      if (r(typeof o.length == "number"), o.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(o.length / 3), this.words = new Array(this.length);
      for (var E = 0; E < this.length; E++)
        this.words[E] = 0;
      var I, w, u = 0;
      if (l === "be")
        for (E = o.length - 1, I = 0; E >= 0; E -= 3)
          w = o[E] | o[E - 1] << 8 | o[E - 2] << 16, this.words[I] |= w << u & 67108863, this.words[I + 1] = w >>> 26 - u & 67108863, u += 24, u >= 26 && (u -= 26, I++);
      else if (l === "le")
        for (E = 0, I = 0; E < o.length; E += 3)
          w = o[E] | o[E + 1] << 8 | o[E + 2] << 16, this.words[I] |= w << u & 67108863, this.words[I + 1] = w >>> 26 - u & 67108863, u += 24, u >= 26 && (u -= 26, I++);
      return this._strip();
    };
    function h(o, c) {
      var l = o.charCodeAt(c);
      if (l >= 48 && l <= 57)
        return l - 48;
      if (l >= 65 && l <= 70)
        return l - 55;
      if (l >= 97 && l <= 102)
        return l - 87;
      r(!1, "Invalid character in " + o);
    }
    function d(o, c, l) {
      var E = h(o, l);
      return l - 1 >= c && (E |= h(o, l - 1) << 4), E;
    }
    s.prototype._parseHex = function(o, c, l) {
      this.length = Math.ceil((o.length - c) / 6), this.words = new Array(this.length);
      for (var E = 0; E < this.length; E++)
        this.words[E] = 0;
      var I = 0, w = 0, u;
      if (l === "be")
        for (E = o.length - 1; E >= c; E -= 2)
          u = d(o, c, E) << I, this.words[w] |= u & 67108863, I >= 18 ? (I -= 18, w += 1, this.words[w] |= u >>> 26) : I += 8;
      else {
        var m = o.length - c;
        for (E = m % 2 === 0 ? c + 1 : c; E < o.length; E += 2)
          u = d(o, c, E) << I, this.words[w] |= u & 67108863, I >= 18 ? (I -= 18, w += 1, this.words[w] |= u >>> 26) : I += 8;
      }
      this._strip();
    };
    function f(o, c, l, E) {
      for (var I = 0, w = 0, u = Math.min(o.length, l), m = c; m < u; m++) {
        var b = o.charCodeAt(m) - 48;
        I *= E, b >= 49 ? w = b - 49 + 10 : b >= 17 ? w = b - 17 + 10 : w = b, r(b >= 0 && w < E, "Invalid character"), I += w;
      }
      return I;
    }
    s.prototype._parseBase = function(o, c, l) {
      this.words = [0], this.length = 1;
      for (var E = 0, I = 1; I <= 67108863; I *= c)
        E++;
      E--, I = I / c | 0;
      for (var w = o.length - l, u = w % E, m = Math.min(w, w - u) + l, b = 0, P = l; P < m; P += E)
        b = f(o, P, P + E, c), this.imuln(I), this.words[0] + b < 67108864 ? this.words[0] += b : this._iaddn(b);
      if (u !== 0) {
        var B = 1;
        for (b = f(o, P, o.length, c), P = 0; P < u; P++)
          B *= c;
        this.imuln(B), this.words[0] + b < 67108864 ? this.words[0] += b : this._iaddn(b);
      }
      this._strip();
    }, s.prototype.copy = function(o) {
      o.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        o.words[c] = this.words[c];
      o.length = this.length, o.negative = this.negative, o.red = this.red;
    };
    function g(o, c) {
      o.words = c.words, o.length = c.length, o.negative = c.negative, o.red = c.red;
    }
    if (s.prototype._move = function(o) {
      g(o, this);
    }, s.prototype.clone = function() {
      var o = new s(null);
      return this.copy(o), o;
    }, s.prototype._expand = function(o) {
      for (; this.length < o; )
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
        s.prototype[Symbol.for("nodejs.util.inspect.custom")] = _;
      } catch {
        s.prototype.inspect = _;
      }
    else
      s.prototype.inspect = _;
    function _() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    }
    var x = [
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
    ], A = [
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
    ], O = [
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
    s.prototype.toString = function(o, c) {
      o = o || 10, c = c | 0 || 1;
      var l;
      if (o === 16 || o === "hex") {
        l = "";
        for (var E = 0, I = 0, w = 0; w < this.length; w++) {
          var u = this.words[w], m = ((u << E | I) & 16777215).toString(16);
          I = u >>> 24 - E & 16777215, E += 2, E >= 26 && (E -= 26, w--), I !== 0 || w !== this.length - 1 ? l = x[6 - m.length] + m + l : l = m + l;
        }
        for (I !== 0 && (l = I.toString(16) + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      if (o === (o | 0) && o >= 2 && o <= 36) {
        var b = A[o], P = O[o];
        l = "";
        var B = this.clone();
        for (B.negative = 0; !B.isZero(); ) {
          var G = B.modrn(P).toString(o);
          B = B.idivn(P), B.isZero() ? l = G + l : l = x[b - G.length] + G + l;
        }
        for (this.isZero() && (l = "0" + l); l.length % c !== 0; )
          l = "0" + l;
        return this.negative !== 0 && (l = "-" + l), l;
      }
      r(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var o = this.words[0];
      return this.length === 2 ? o += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? o += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -o : o;
    }, s.prototype.toJSON = function() {
      return this.toString(16, 2);
    }, a && (s.prototype.toBuffer = function(o, c) {
      return this.toArrayLike(a, o, c);
    }), s.prototype.toArray = function(o, c) {
      return this.toArrayLike(Array, o, c);
    };
    var j = function(o, c) {
      return o.allocUnsafe ? o.allocUnsafe(c) : new o(c);
    };
    s.prototype.toArrayLike = function(o, c, l) {
      this._strip();
      var E = this.byteLength(), I = l || Math.max(1, E);
      r(E <= I, "byte array longer than desired length"), r(I > 0, "Requested array length <= 0");
      var w = j(o, I), u = c === "le" ? "LE" : "BE";
      return this["_toArrayLike" + u](w, E), w;
    }, s.prototype._toArrayLikeLE = function(o, c) {
      for (var l = 0, E = 0, I = 0, w = 0; I < this.length; I++) {
        var u = this.words[I] << w | E;
        o[l++] = u & 255, l < o.length && (o[l++] = u >> 8 & 255), l < o.length && (o[l++] = u >> 16 & 255), w === 6 ? (l < o.length && (o[l++] = u >> 24 & 255), E = 0, w = 0) : (E = u >>> 24, w += 2);
      }
      if (l < o.length)
        for (o[l++] = E; l < o.length; )
          o[l++] = 0;
    }, s.prototype._toArrayLikeBE = function(o, c) {
      for (var l = o.length - 1, E = 0, I = 0, w = 0; I < this.length; I++) {
        var u = this.words[I] << w | E;
        o[l--] = u & 255, l >= 0 && (o[l--] = u >> 8 & 255), l >= 0 && (o[l--] = u >> 16 & 255), w === 6 ? (l >= 0 && (o[l--] = u >> 24 & 255), E = 0, w = 0) : (E = u >>> 24, w += 2);
      }
      if (l >= 0)
        for (o[l--] = E; l >= 0; )
          o[l--] = 0;
    }, Math.clz32 ? s.prototype._countBits = function(o) {
      return 32 - Math.clz32(o);
    } : s.prototype._countBits = function(o) {
      var c = o, l = 0;
      return c >= 4096 && (l += 13, c >>>= 13), c >= 64 && (l += 7, c >>>= 7), c >= 8 && (l += 4, c >>>= 4), c >= 2 && (l += 2, c >>>= 2), l + c;
    }, s.prototype._zeroBits = function(o) {
      if (o === 0)
        return 26;
      var c = o, l = 0;
      return c & 8191 || (l += 13, c >>>= 13), c & 127 || (l += 7, c >>>= 7), c & 15 || (l += 4, c >>>= 4), c & 3 || (l += 2, c >>>= 2), c & 1 || l++, l;
    }, s.prototype.bitLength = function() {
      var o = this.words[this.length - 1], c = this._countBits(o);
      return (this.length - 1) * 26 + c;
    };
    function F(o) {
      for (var c = new Array(o.bitLength()), l = 0; l < c.length; l++) {
        var E = l / 26 | 0, I = l % 26;
        c[l] = o.words[E] >>> I & 1;
      }
      return c;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var o = 0, c = 0; c < this.length; c++) {
        var l = this._zeroBits(this.words[c]);
        if (o += l, l !== 26)
          break;
      }
      return o;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(o) {
      return this.negative !== 0 ? this.abs().inotn(o).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(o) {
      return this.testn(o - 1) ? this.notn(o).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(o) {
      for (; this.length < o.length; )
        this.words[this.length++] = 0;
      for (var c = 0; c < o.length; c++)
        this.words[c] = this.words[c] | o.words[c];
      return this._strip();
    }, s.prototype.ior = function(o) {
      return r((this.negative | o.negative) === 0), this.iuor(o);
    }, s.prototype.or = function(o) {
      return this.length > o.length ? this.clone().ior(o) : o.clone().ior(this);
    }, s.prototype.uor = function(o) {
      return this.length > o.length ? this.clone().iuor(o) : o.clone().iuor(this);
    }, s.prototype.iuand = function(o) {
      var c;
      this.length > o.length ? c = o : c = this;
      for (var l = 0; l < c.length; l++)
        this.words[l] = this.words[l] & o.words[l];
      return this.length = c.length, this._strip();
    }, s.prototype.iand = function(o) {
      return r((this.negative | o.negative) === 0), this.iuand(o);
    }, s.prototype.and = function(o) {
      return this.length > o.length ? this.clone().iand(o) : o.clone().iand(this);
    }, s.prototype.uand = function(o) {
      return this.length > o.length ? this.clone().iuand(o) : o.clone().iuand(this);
    }, s.prototype.iuxor = function(o) {
      var c, l;
      this.length > o.length ? (c = this, l = o) : (c = o, l = this);
      for (var E = 0; E < l.length; E++)
        this.words[E] = c.words[E] ^ l.words[E];
      if (this !== c)
        for (; E < c.length; E++)
          this.words[E] = c.words[E];
      return this.length = c.length, this._strip();
    }, s.prototype.ixor = function(o) {
      return r((this.negative | o.negative) === 0), this.iuxor(o);
    }, s.prototype.xor = function(o) {
      return this.length > o.length ? this.clone().ixor(o) : o.clone().ixor(this);
    }, s.prototype.uxor = function(o) {
      return this.length > o.length ? this.clone().iuxor(o) : o.clone().iuxor(this);
    }, s.prototype.inotn = function(o) {
      r(typeof o == "number" && o >= 0);
      var c = Math.ceil(o / 26) | 0, l = o % 26;
      this._expand(c), l > 0 && c--;
      for (var E = 0; E < c; E++)
        this.words[E] = ~this.words[E] & 67108863;
      return l > 0 && (this.words[E] = ~this.words[E] & 67108863 >> 26 - l), this._strip();
    }, s.prototype.notn = function(o) {
      return this.clone().inotn(o);
    }, s.prototype.setn = function(o, c) {
      r(typeof o == "number" && o >= 0);
      var l = o / 26 | 0, E = o % 26;
      return this._expand(l + 1), c ? this.words[l] = this.words[l] | 1 << E : this.words[l] = this.words[l] & ~(1 << E), this._strip();
    }, s.prototype.iadd = function(o) {
      var c;
      if (this.negative !== 0 && o.negative === 0)
        return this.negative = 0, c = this.isub(o), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && o.negative !== 0)
        return o.negative = 0, c = this.isub(o), o.negative = 1, c._normSign();
      var l, E;
      this.length > o.length ? (l = this, E = o) : (l = o, E = this);
      for (var I = 0, w = 0; w < E.length; w++)
        c = (l.words[w] | 0) + (E.words[w] | 0) + I, this.words[w] = c & 67108863, I = c >>> 26;
      for (; I !== 0 && w < l.length; w++)
        c = (l.words[w] | 0) + I, this.words[w] = c & 67108863, I = c >>> 26;
      if (this.length = l.length, I !== 0)
        this.words[this.length] = I, this.length++;
      else if (l !== this)
        for (; w < l.length; w++)
          this.words[w] = l.words[w];
      return this;
    }, s.prototype.add = function(o) {
      var c;
      return o.negative !== 0 && this.negative === 0 ? (o.negative = 0, c = this.sub(o), o.negative ^= 1, c) : o.negative === 0 && this.negative !== 0 ? (this.negative = 0, c = o.sub(this), this.negative = 1, c) : this.length > o.length ? this.clone().iadd(o) : o.clone().iadd(this);
    }, s.prototype.isub = function(o) {
      if (o.negative !== 0) {
        o.negative = 0;
        var c = this.iadd(o);
        return o.negative = 1, c._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(o), this.negative = 1, this._normSign();
      var l = this.cmp(o);
      if (l === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var E, I;
      l > 0 ? (E = this, I = o) : (E = o, I = this);
      for (var w = 0, u = 0; u < I.length; u++)
        c = (E.words[u] | 0) - (I.words[u] | 0) + w, w = c >> 26, this.words[u] = c & 67108863;
      for (; w !== 0 && u < E.length; u++)
        c = (E.words[u] | 0) + w, w = c >> 26, this.words[u] = c & 67108863;
      if (w === 0 && u < E.length && E !== this)
        for (; u < E.length; u++)
          this.words[u] = E.words[u];
      return this.length = Math.max(this.length, u), E !== this && (this.negative = 1), this._strip();
    }, s.prototype.sub = function(o) {
      return this.clone().isub(o);
    };
    function V(o, c, l) {
      l.negative = c.negative ^ o.negative;
      var E = o.length + c.length | 0;
      l.length = E, E = E - 1 | 0;
      var I = o.words[0] | 0, w = c.words[0] | 0, u = I * w, m = u & 67108863, b = u / 67108864 | 0;
      l.words[0] = m;
      for (var P = 1; P < E; P++) {
        for (var B = b >>> 26, G = b & 67108863, M = Math.min(P, c.length - 1), $ = Math.max(0, P - o.length + 1); $ <= M; $++) {
          var L = P - $ | 0;
          I = o.words[L] | 0, w = c.words[$] | 0, u = I * w + G, B += u / 67108864 | 0, G = u & 67108863;
        }
        l.words[P] = G | 0, b = B | 0;
      }
      return b !== 0 ? l.words[P] = b | 0 : l.length--, l._strip();
    }
    var C = function(o, c, l) {
      var E = o.words, I = c.words, w = l.words, u = 0, m, b, P, B = E[0] | 0, G = B & 8191, M = B >>> 13, $ = E[1] | 0, L = $ & 8191, k = $ >>> 13, q = E[2] | 0, y = q & 8191, R = q >>> 13, W = E[3] | 0, Z = W & 8191, J = W >>> 13, oe = E[4] | 0, Ee = oe & 8191, he = oe >>> 13, Re = E[5] | 0, Pe = Re & 8191, se = Re >>> 13, Se = E[6] | 0, ve = Se & 8191, ie = Se >>> 13, ge = E[7] | 0, pe = ge & 8191, ee = ge >>> 13, fe = E[8] | 0, me = fe & 8191, re = fe >>> 13, ue = E[9] | 0, Ie = ue & 8191, ae = ue >>> 13, Me = I[0] | 0, Ae = Me & 8191, ce = Me >>> 13, We = I[1] | 0, Ye = We & 8191, xe = We >>> 13, $e = I[2] | 0, Xe = $e & 8191, Oe = $e >>> 13, et = I[3] | 0, Te = et & 8191, le = et >>> 13, ke = I[4] | 0, Le = ke & 8191, be = ke >>> 13, Ne = I[5] | 0, ze = Ne & 8191, we = Ne >>> 13, Ue = I[6] | 0, De = Ue & 8191, _e = Ue >>> 13, qe = I[7] | 0, Ce = qe & 8191, de = qe >>> 13, Fe = I[8] | 0, Ke = Fe & 8191, je = Fe >>> 13, it = I[9] | 0, tt = it & 8191, Je = it >>> 13;
      l.negative = o.negative ^ c.negative, l.length = 19, m = Math.imul(G, Ae), b = Math.imul(G, ce), b = b + Math.imul(M, Ae) | 0, P = Math.imul(M, ce);
      var Kt = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, m = Math.imul(L, Ae), b = Math.imul(L, ce), b = b + Math.imul(k, Ae) | 0, P = Math.imul(k, ce), m = m + Math.imul(G, Ye) | 0, b = b + Math.imul(G, xe) | 0, b = b + Math.imul(M, Ye) | 0, P = P + Math.imul(M, xe) | 0;
      var Bt = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, m = Math.imul(y, Ae), b = Math.imul(y, ce), b = b + Math.imul(R, Ae) | 0, P = Math.imul(R, ce), m = m + Math.imul(L, Ye) | 0, b = b + Math.imul(L, xe) | 0, b = b + Math.imul(k, Ye) | 0, P = P + Math.imul(k, xe) | 0, m = m + Math.imul(G, Xe) | 0, b = b + Math.imul(G, Oe) | 0, b = b + Math.imul(M, Xe) | 0, P = P + Math.imul(M, Oe) | 0;
      var $t = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, m = Math.imul(Z, Ae), b = Math.imul(Z, ce), b = b + Math.imul(J, Ae) | 0, P = Math.imul(J, ce), m = m + Math.imul(y, Ye) | 0, b = b + Math.imul(y, xe) | 0, b = b + Math.imul(R, Ye) | 0, P = P + Math.imul(R, xe) | 0, m = m + Math.imul(L, Xe) | 0, b = b + Math.imul(L, Oe) | 0, b = b + Math.imul(k, Xe) | 0, P = P + Math.imul(k, Oe) | 0, m = m + Math.imul(G, Te) | 0, b = b + Math.imul(G, le) | 0, b = b + Math.imul(M, Te) | 0, P = P + Math.imul(M, le) | 0;
      var Vt = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, m = Math.imul(Ee, Ae), b = Math.imul(Ee, ce), b = b + Math.imul(he, Ae) | 0, P = Math.imul(he, ce), m = m + Math.imul(Z, Ye) | 0, b = b + Math.imul(Z, xe) | 0, b = b + Math.imul(J, Ye) | 0, P = P + Math.imul(J, xe) | 0, m = m + Math.imul(y, Xe) | 0, b = b + Math.imul(y, Oe) | 0, b = b + Math.imul(R, Xe) | 0, P = P + Math.imul(R, Oe) | 0, m = m + Math.imul(L, Te) | 0, b = b + Math.imul(L, le) | 0, b = b + Math.imul(k, Te) | 0, P = P + Math.imul(k, le) | 0, m = m + Math.imul(G, Le) | 0, b = b + Math.imul(G, be) | 0, b = b + Math.imul(M, Le) | 0, P = P + Math.imul(M, be) | 0;
      var Ht = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, m = Math.imul(Pe, Ae), b = Math.imul(Pe, ce), b = b + Math.imul(se, Ae) | 0, P = Math.imul(se, ce), m = m + Math.imul(Ee, Ye) | 0, b = b + Math.imul(Ee, xe) | 0, b = b + Math.imul(he, Ye) | 0, P = P + Math.imul(he, xe) | 0, m = m + Math.imul(Z, Xe) | 0, b = b + Math.imul(Z, Oe) | 0, b = b + Math.imul(J, Xe) | 0, P = P + Math.imul(J, Oe) | 0, m = m + Math.imul(y, Te) | 0, b = b + Math.imul(y, le) | 0, b = b + Math.imul(R, Te) | 0, P = P + Math.imul(R, le) | 0, m = m + Math.imul(L, Le) | 0, b = b + Math.imul(L, be) | 0, b = b + Math.imul(k, Le) | 0, P = P + Math.imul(k, be) | 0, m = m + Math.imul(G, ze) | 0, b = b + Math.imul(G, we) | 0, b = b + Math.imul(M, ze) | 0, P = P + Math.imul(M, we) | 0;
      var bt = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, m = Math.imul(ve, Ae), b = Math.imul(ve, ce), b = b + Math.imul(ie, Ae) | 0, P = Math.imul(ie, ce), m = m + Math.imul(Pe, Ye) | 0, b = b + Math.imul(Pe, xe) | 0, b = b + Math.imul(se, Ye) | 0, P = P + Math.imul(se, xe) | 0, m = m + Math.imul(Ee, Xe) | 0, b = b + Math.imul(Ee, Oe) | 0, b = b + Math.imul(he, Xe) | 0, P = P + Math.imul(he, Oe) | 0, m = m + Math.imul(Z, Te) | 0, b = b + Math.imul(Z, le) | 0, b = b + Math.imul(J, Te) | 0, P = P + Math.imul(J, le) | 0, m = m + Math.imul(y, Le) | 0, b = b + Math.imul(y, be) | 0, b = b + Math.imul(R, Le) | 0, P = P + Math.imul(R, be) | 0, m = m + Math.imul(L, ze) | 0, b = b + Math.imul(L, we) | 0, b = b + Math.imul(k, ze) | 0, P = P + Math.imul(k, we) | 0, m = m + Math.imul(G, De) | 0, b = b + Math.imul(G, _e) | 0, b = b + Math.imul(M, De) | 0, P = P + Math.imul(M, _e) | 0;
      var Vi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, m = Math.imul(pe, Ae), b = Math.imul(pe, ce), b = b + Math.imul(ee, Ae) | 0, P = Math.imul(ee, ce), m = m + Math.imul(ve, Ye) | 0, b = b + Math.imul(ve, xe) | 0, b = b + Math.imul(ie, Ye) | 0, P = P + Math.imul(ie, xe) | 0, m = m + Math.imul(Pe, Xe) | 0, b = b + Math.imul(Pe, Oe) | 0, b = b + Math.imul(se, Xe) | 0, P = P + Math.imul(se, Oe) | 0, m = m + Math.imul(Ee, Te) | 0, b = b + Math.imul(Ee, le) | 0, b = b + Math.imul(he, Te) | 0, P = P + Math.imul(he, le) | 0, m = m + Math.imul(Z, Le) | 0, b = b + Math.imul(Z, be) | 0, b = b + Math.imul(J, Le) | 0, P = P + Math.imul(J, be) | 0, m = m + Math.imul(y, ze) | 0, b = b + Math.imul(y, we) | 0, b = b + Math.imul(R, ze) | 0, P = P + Math.imul(R, we) | 0, m = m + Math.imul(L, De) | 0, b = b + Math.imul(L, _e) | 0, b = b + Math.imul(k, De) | 0, P = P + Math.imul(k, _e) | 0, m = m + Math.imul(G, Ce) | 0, b = b + Math.imul(G, de) | 0, b = b + Math.imul(M, Ce) | 0, P = P + Math.imul(M, de) | 0;
      var Hi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, m = Math.imul(me, Ae), b = Math.imul(me, ce), b = b + Math.imul(re, Ae) | 0, P = Math.imul(re, ce), m = m + Math.imul(pe, Ye) | 0, b = b + Math.imul(pe, xe) | 0, b = b + Math.imul(ee, Ye) | 0, P = P + Math.imul(ee, xe) | 0, m = m + Math.imul(ve, Xe) | 0, b = b + Math.imul(ve, Oe) | 0, b = b + Math.imul(ie, Xe) | 0, P = P + Math.imul(ie, Oe) | 0, m = m + Math.imul(Pe, Te) | 0, b = b + Math.imul(Pe, le) | 0, b = b + Math.imul(se, Te) | 0, P = P + Math.imul(se, le) | 0, m = m + Math.imul(Ee, Le) | 0, b = b + Math.imul(Ee, be) | 0, b = b + Math.imul(he, Le) | 0, P = P + Math.imul(he, be) | 0, m = m + Math.imul(Z, ze) | 0, b = b + Math.imul(Z, we) | 0, b = b + Math.imul(J, ze) | 0, P = P + Math.imul(J, we) | 0, m = m + Math.imul(y, De) | 0, b = b + Math.imul(y, _e) | 0, b = b + Math.imul(R, De) | 0, P = P + Math.imul(R, _e) | 0, m = m + Math.imul(L, Ce) | 0, b = b + Math.imul(L, de) | 0, b = b + Math.imul(k, Ce) | 0, P = P + Math.imul(k, de) | 0, m = m + Math.imul(G, Ke) | 0, b = b + Math.imul(G, je) | 0, b = b + Math.imul(M, Ke) | 0, P = P + Math.imul(M, je) | 0;
      var Wi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, m = Math.imul(Ie, Ae), b = Math.imul(Ie, ce), b = b + Math.imul(ae, Ae) | 0, P = Math.imul(ae, ce), m = m + Math.imul(me, Ye) | 0, b = b + Math.imul(me, xe) | 0, b = b + Math.imul(re, Ye) | 0, P = P + Math.imul(re, xe) | 0, m = m + Math.imul(pe, Xe) | 0, b = b + Math.imul(pe, Oe) | 0, b = b + Math.imul(ee, Xe) | 0, P = P + Math.imul(ee, Oe) | 0, m = m + Math.imul(ve, Te) | 0, b = b + Math.imul(ve, le) | 0, b = b + Math.imul(ie, Te) | 0, P = P + Math.imul(ie, le) | 0, m = m + Math.imul(Pe, Le) | 0, b = b + Math.imul(Pe, be) | 0, b = b + Math.imul(se, Le) | 0, P = P + Math.imul(se, be) | 0, m = m + Math.imul(Ee, ze) | 0, b = b + Math.imul(Ee, we) | 0, b = b + Math.imul(he, ze) | 0, P = P + Math.imul(he, we) | 0, m = m + Math.imul(Z, De) | 0, b = b + Math.imul(Z, _e) | 0, b = b + Math.imul(J, De) | 0, P = P + Math.imul(J, _e) | 0, m = m + Math.imul(y, Ce) | 0, b = b + Math.imul(y, de) | 0, b = b + Math.imul(R, Ce) | 0, P = P + Math.imul(R, de) | 0, m = m + Math.imul(L, Ke) | 0, b = b + Math.imul(L, je) | 0, b = b + Math.imul(k, Ke) | 0, P = P + Math.imul(k, je) | 0, m = m + Math.imul(G, tt) | 0, b = b + Math.imul(G, Je) | 0, b = b + Math.imul(M, tt) | 0, P = P + Math.imul(M, Je) | 0;
      var Gi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, m = Math.imul(Ie, Ye), b = Math.imul(Ie, xe), b = b + Math.imul(ae, Ye) | 0, P = Math.imul(ae, xe), m = m + Math.imul(me, Xe) | 0, b = b + Math.imul(me, Oe) | 0, b = b + Math.imul(re, Xe) | 0, P = P + Math.imul(re, Oe) | 0, m = m + Math.imul(pe, Te) | 0, b = b + Math.imul(pe, le) | 0, b = b + Math.imul(ee, Te) | 0, P = P + Math.imul(ee, le) | 0, m = m + Math.imul(ve, Le) | 0, b = b + Math.imul(ve, be) | 0, b = b + Math.imul(ie, Le) | 0, P = P + Math.imul(ie, be) | 0, m = m + Math.imul(Pe, ze) | 0, b = b + Math.imul(Pe, we) | 0, b = b + Math.imul(se, ze) | 0, P = P + Math.imul(se, we) | 0, m = m + Math.imul(Ee, De) | 0, b = b + Math.imul(Ee, _e) | 0, b = b + Math.imul(he, De) | 0, P = P + Math.imul(he, _e) | 0, m = m + Math.imul(Z, Ce) | 0, b = b + Math.imul(Z, de) | 0, b = b + Math.imul(J, Ce) | 0, P = P + Math.imul(J, de) | 0, m = m + Math.imul(y, Ke) | 0, b = b + Math.imul(y, je) | 0, b = b + Math.imul(R, Ke) | 0, P = P + Math.imul(R, je) | 0, m = m + Math.imul(L, tt) | 0, b = b + Math.imul(L, Je) | 0, b = b + Math.imul(k, tt) | 0, P = P + Math.imul(k, Je) | 0;
      var Yi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, m = Math.imul(Ie, Xe), b = Math.imul(Ie, Oe), b = b + Math.imul(ae, Xe) | 0, P = Math.imul(ae, Oe), m = m + Math.imul(me, Te) | 0, b = b + Math.imul(me, le) | 0, b = b + Math.imul(re, Te) | 0, P = P + Math.imul(re, le) | 0, m = m + Math.imul(pe, Le) | 0, b = b + Math.imul(pe, be) | 0, b = b + Math.imul(ee, Le) | 0, P = P + Math.imul(ee, be) | 0, m = m + Math.imul(ve, ze) | 0, b = b + Math.imul(ve, we) | 0, b = b + Math.imul(ie, ze) | 0, P = P + Math.imul(ie, we) | 0, m = m + Math.imul(Pe, De) | 0, b = b + Math.imul(Pe, _e) | 0, b = b + Math.imul(se, De) | 0, P = P + Math.imul(se, _e) | 0, m = m + Math.imul(Ee, Ce) | 0, b = b + Math.imul(Ee, de) | 0, b = b + Math.imul(he, Ce) | 0, P = P + Math.imul(he, de) | 0, m = m + Math.imul(Z, Ke) | 0, b = b + Math.imul(Z, je) | 0, b = b + Math.imul(J, Ke) | 0, P = P + Math.imul(J, je) | 0, m = m + Math.imul(y, tt) | 0, b = b + Math.imul(y, Je) | 0, b = b + Math.imul(R, tt) | 0, P = P + Math.imul(R, Je) | 0;
      var ai = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, m = Math.imul(Ie, Te), b = Math.imul(Ie, le), b = b + Math.imul(ae, Te) | 0, P = Math.imul(ae, le), m = m + Math.imul(me, Le) | 0, b = b + Math.imul(me, be) | 0, b = b + Math.imul(re, Le) | 0, P = P + Math.imul(re, be) | 0, m = m + Math.imul(pe, ze) | 0, b = b + Math.imul(pe, we) | 0, b = b + Math.imul(ee, ze) | 0, P = P + Math.imul(ee, we) | 0, m = m + Math.imul(ve, De) | 0, b = b + Math.imul(ve, _e) | 0, b = b + Math.imul(ie, De) | 0, P = P + Math.imul(ie, _e) | 0, m = m + Math.imul(Pe, Ce) | 0, b = b + Math.imul(Pe, de) | 0, b = b + Math.imul(se, Ce) | 0, P = P + Math.imul(se, de) | 0, m = m + Math.imul(Ee, Ke) | 0, b = b + Math.imul(Ee, je) | 0, b = b + Math.imul(he, Ke) | 0, P = P + Math.imul(he, je) | 0, m = m + Math.imul(Z, tt) | 0, b = b + Math.imul(Z, Je) | 0, b = b + Math.imul(J, tt) | 0, P = P + Math.imul(J, Je) | 0;
      var Ji = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, m = Math.imul(Ie, Le), b = Math.imul(Ie, be), b = b + Math.imul(ae, Le) | 0, P = Math.imul(ae, be), m = m + Math.imul(me, ze) | 0, b = b + Math.imul(me, we) | 0, b = b + Math.imul(re, ze) | 0, P = P + Math.imul(re, we) | 0, m = m + Math.imul(pe, De) | 0, b = b + Math.imul(pe, _e) | 0, b = b + Math.imul(ee, De) | 0, P = P + Math.imul(ee, _e) | 0, m = m + Math.imul(ve, Ce) | 0, b = b + Math.imul(ve, de) | 0, b = b + Math.imul(ie, Ce) | 0, P = P + Math.imul(ie, de) | 0, m = m + Math.imul(Pe, Ke) | 0, b = b + Math.imul(Pe, je) | 0, b = b + Math.imul(se, Ke) | 0, P = P + Math.imul(se, je) | 0, m = m + Math.imul(Ee, tt) | 0, b = b + Math.imul(Ee, Je) | 0, b = b + Math.imul(he, tt) | 0, P = P + Math.imul(he, Je) | 0;
      var Zi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, m = Math.imul(Ie, ze), b = Math.imul(Ie, we), b = b + Math.imul(ae, ze) | 0, P = Math.imul(ae, we), m = m + Math.imul(me, De) | 0, b = b + Math.imul(me, _e) | 0, b = b + Math.imul(re, De) | 0, P = P + Math.imul(re, _e) | 0, m = m + Math.imul(pe, Ce) | 0, b = b + Math.imul(pe, de) | 0, b = b + Math.imul(ee, Ce) | 0, P = P + Math.imul(ee, de) | 0, m = m + Math.imul(ve, Ke) | 0, b = b + Math.imul(ve, je) | 0, b = b + Math.imul(ie, Ke) | 0, P = P + Math.imul(ie, je) | 0, m = m + Math.imul(Pe, tt) | 0, b = b + Math.imul(Pe, Je) | 0, b = b + Math.imul(se, tt) | 0, P = P + Math.imul(se, Je) | 0;
      var Lt = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, m = Math.imul(Ie, De), b = Math.imul(Ie, _e), b = b + Math.imul(ae, De) | 0, P = Math.imul(ae, _e), m = m + Math.imul(me, Ce) | 0, b = b + Math.imul(me, de) | 0, b = b + Math.imul(re, Ce) | 0, P = P + Math.imul(re, de) | 0, m = m + Math.imul(pe, Ke) | 0, b = b + Math.imul(pe, je) | 0, b = b + Math.imul(ee, Ke) | 0, P = P + Math.imul(ee, je) | 0, m = m + Math.imul(ve, tt) | 0, b = b + Math.imul(ve, Je) | 0, b = b + Math.imul(ie, tt) | 0, P = P + Math.imul(ie, Je) | 0;
      var Xi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, m = Math.imul(Ie, Ce), b = Math.imul(Ie, de), b = b + Math.imul(ae, Ce) | 0, P = Math.imul(ae, de), m = m + Math.imul(me, Ke) | 0, b = b + Math.imul(me, je) | 0, b = b + Math.imul(re, Ke) | 0, P = P + Math.imul(re, je) | 0, m = m + Math.imul(pe, tt) | 0, b = b + Math.imul(pe, Je) | 0, b = b + Math.imul(ee, tt) | 0, P = P + Math.imul(ee, Je) | 0;
      var Qi = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, m = Math.imul(Ie, Ke), b = Math.imul(Ie, je), b = b + Math.imul(ae, Ke) | 0, P = Math.imul(ae, je), m = m + Math.imul(me, tt) | 0, b = b + Math.imul(me, Je) | 0, b = b + Math.imul(re, tt) | 0, P = P + Math.imul(re, Je) | 0;
      var An = (u + m | 0) + ((b & 8191) << 13) | 0;
      u = (P + (b >>> 13) | 0) + (An >>> 26) | 0, An &= 67108863, m = Math.imul(Ie, tt), b = Math.imul(Ie, Je), b = b + Math.imul(ae, tt) | 0, P = Math.imul(ae, Je);
      var xn = (u + m | 0) + ((b & 8191) << 13) | 0;
      return u = (P + (b >>> 13) | 0) + (xn >>> 26) | 0, xn &= 67108863, w[0] = Kt, w[1] = Bt, w[2] = $t, w[3] = Vt, w[4] = Ht, w[5] = bt, w[6] = Vi, w[7] = Hi, w[8] = Wi, w[9] = Gi, w[10] = Yi, w[11] = ai, w[12] = Ji, w[13] = Zi, w[14] = Lt, w[15] = Xi, w[16] = Qi, w[17] = An, w[18] = xn, u !== 0 && (w[19] = u, l.length++), l;
    };
    Math.imul || (C = V);
    function K(o, c, l) {
      l.negative = c.negative ^ o.negative, l.length = o.length + c.length;
      for (var E = 0, I = 0, w = 0; w < l.length - 1; w++) {
        var u = I;
        I = 0;
        for (var m = E & 67108863, b = Math.min(w, c.length - 1), P = Math.max(0, w - o.length + 1); P <= b; P++) {
          var B = w - P, G = o.words[B] | 0, M = c.words[P] | 0, $ = G * M, L = $ & 67108863;
          u = u + ($ / 67108864 | 0) | 0, L = L + m | 0, m = L & 67108863, u = u + (L >>> 26) | 0, I += u >>> 26, u &= 67108863;
        }
        l.words[w] = m, E = u, u = I;
      }
      return E !== 0 ? l.words[w] = E : l.length--, l._strip();
    }
    function N(o, c, l) {
      return K(o, c, l);
    }
    s.prototype.mulTo = function(o, c) {
      var l, E = this.length + o.length;
      return this.length === 10 && o.length === 10 ? l = C(this, o, c) : E < 63 ? l = V(this, o, c) : E < 1024 ? l = K(this, o, c) : l = N(this, o, c), l;
    }, s.prototype.mul = function(o) {
      var c = new s(null);
      return c.words = new Array(this.length + o.length), this.mulTo(o, c);
    }, s.prototype.mulf = function(o) {
      var c = new s(null);
      return c.words = new Array(this.length + o.length), N(this, o, c);
    }, s.prototype.imul = function(o) {
      return this.clone().mulTo(o, this);
    }, s.prototype.imuln = function(o) {
      var c = o < 0;
      c && (o = -o), r(typeof o == "number"), r(o < 67108864);
      for (var l = 0, E = 0; E < this.length; E++) {
        var I = (this.words[E] | 0) * o, w = (I & 67108863) + (l & 67108863);
        l >>= 26, l += I / 67108864 | 0, l += w >>> 26, this.words[E] = w & 67108863;
      }
      return l !== 0 && (this.words[E] = l, this.length++), c ? this.ineg() : this;
    }, s.prototype.muln = function(o) {
      return this.clone().imuln(o);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(o) {
      var c = F(o);
      if (c.length === 0)
        return new s(1);
      for (var l = this, E = 0; E < c.length && c[E] === 0; E++, l = l.sqr())
        ;
      if (++E < c.length)
        for (var I = l.sqr(); E < c.length; E++, I = I.sqr())
          c[E] !== 0 && (l = l.mul(I));
      return l;
    }, s.prototype.iushln = function(o) {
      r(typeof o == "number" && o >= 0);
      var c = o % 26, l = (o - c) / 26, E = 67108863 >>> 26 - c << 26 - c, I;
      if (c !== 0) {
        var w = 0;
        for (I = 0; I < this.length; I++) {
          var u = this.words[I] & E, m = (this.words[I] | 0) - u << c;
          this.words[I] = m | w, w = u >>> 26 - c;
        }
        w && (this.words[I] = w, this.length++);
      }
      if (l !== 0) {
        for (I = this.length - 1; I >= 0; I--)
          this.words[I + l] = this.words[I];
        for (I = 0; I < l; I++)
          this.words[I] = 0;
        this.length += l;
      }
      return this._strip();
    }, s.prototype.ishln = function(o) {
      return r(this.negative === 0), this.iushln(o);
    }, s.prototype.iushrn = function(o, c, l) {
      r(typeof o == "number" && o >= 0);
      var E;
      c ? E = (c - c % 26) / 26 : E = 0;
      var I = o % 26, w = Math.min((o - I) / 26, this.length), u = 67108863 ^ 67108863 >>> I << I, m = l;
      if (E -= w, E = Math.max(0, E), m) {
        for (var b = 0; b < w; b++)
          m.words[b] = this.words[b];
        m.length = w;
      }
      if (w !== 0)
        if (this.length > w)
          for (this.length -= w, b = 0; b < this.length; b++)
            this.words[b] = this.words[b + w];
        else
          this.words[0] = 0, this.length = 1;
      var P = 0;
      for (b = this.length - 1; b >= 0 && (P !== 0 || b >= E); b--) {
        var B = this.words[b] | 0;
        this.words[b] = P << 26 - I | B >>> I, P = B & u;
      }
      return m && P !== 0 && (m.words[m.length++] = P), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
    }, s.prototype.ishrn = function(o, c, l) {
      return r(this.negative === 0), this.iushrn(o, c, l);
    }, s.prototype.shln = function(o) {
      return this.clone().ishln(o);
    }, s.prototype.ushln = function(o) {
      return this.clone().iushln(o);
    }, s.prototype.shrn = function(o) {
      return this.clone().ishrn(o);
    }, s.prototype.ushrn = function(o) {
      return this.clone().iushrn(o);
    }, s.prototype.testn = function(o) {
      r(typeof o == "number" && o >= 0);
      var c = o % 26, l = (o - c) / 26, E = 1 << c;
      if (this.length <= l)
        return !1;
      var I = this.words[l];
      return !!(I & E);
    }, s.prototype.imaskn = function(o) {
      r(typeof o == "number" && o >= 0);
      var c = o % 26, l = (o - c) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= l)
        return this;
      if (c !== 0 && l++, this.length = Math.min(l, this.length), c !== 0) {
        var E = 67108863 ^ 67108863 >>> c << c;
        this.words[this.length - 1] &= E;
      }
      return this._strip();
    }, s.prototype.maskn = function(o) {
      return this.clone().imaskn(o);
    }, s.prototype.iaddn = function(o) {
      return r(typeof o == "number"), r(o < 67108864), o < 0 ? this.isubn(-o) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= o ? (this.words[0] = o - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(o), this.negative = 1, this) : this._iaddn(o);
    }, s.prototype._iaddn = function(o) {
      this.words[0] += o;
      for (var c = 0; c < this.length && this.words[c] >= 67108864; c++)
        this.words[c] -= 67108864, c === this.length - 1 ? this.words[c + 1] = 1 : this.words[c + 1]++;
      return this.length = Math.max(this.length, c + 1), this;
    }, s.prototype.isubn = function(o) {
      if (r(typeof o == "number"), r(o < 67108864), o < 0)
        return this.iaddn(-o);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(o), this.negative = 1, this;
      if (this.words[0] -= o, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var c = 0; c < this.length && this.words[c] < 0; c++)
          this.words[c] += 67108864, this.words[c + 1] -= 1;
      return this._strip();
    }, s.prototype.addn = function(o) {
      return this.clone().iaddn(o);
    }, s.prototype.subn = function(o) {
      return this.clone().isubn(o);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(o, c, l) {
      var E = o.length + l, I;
      this._expand(E);
      var w, u = 0;
      for (I = 0; I < o.length; I++) {
        w = (this.words[I + l] | 0) + u;
        var m = (o.words[I] | 0) * c;
        w -= m & 67108863, u = (w >> 26) - (m / 67108864 | 0), this.words[I + l] = w & 67108863;
      }
      for (; I < this.length - l; I++)
        w = (this.words[I + l] | 0) + u, u = w >> 26, this.words[I + l] = w & 67108863;
      if (u === 0)
        return this._strip();
      for (r(u === -1), u = 0, I = 0; I < this.length; I++)
        w = -(this.words[I] | 0) + u, u = w >> 26, this.words[I] = w & 67108863;
      return this.negative = 1, this._strip();
    }, s.prototype._wordDiv = function(o, c) {
      var l = this.length - o.length, E = this.clone(), I = o, w = I.words[I.length - 1] | 0, u = this._countBits(w);
      l = 26 - u, l !== 0 && (I = I.ushln(l), E.iushln(l), w = I.words[I.length - 1] | 0);
      var m = E.length - I.length, b;
      if (c !== "mod") {
        b = new s(null), b.length = m + 1, b.words = new Array(b.length);
        for (var P = 0; P < b.length; P++)
          b.words[P] = 0;
      }
      var B = E.clone()._ishlnsubmul(I, 1, m);
      B.negative === 0 && (E = B, b && (b.words[m] = 1));
      for (var G = m - 1; G >= 0; G--) {
        var M = (E.words[I.length + G] | 0) * 67108864 + (E.words[I.length + G - 1] | 0);
        for (M = Math.min(M / w | 0, 67108863), E._ishlnsubmul(I, M, G); E.negative !== 0; )
          M--, E.negative = 0, E._ishlnsubmul(I, 1, G), E.isZero() || (E.negative ^= 1);
        b && (b.words[G] = M);
      }
      return b && b._strip(), E._strip(), c !== "div" && l !== 0 && E.iushrn(l), {
        div: b || null,
        mod: E
      };
    }, s.prototype.divmod = function(o, c, l) {
      if (r(!o.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var E, I, w;
      return this.negative !== 0 && o.negative === 0 ? (w = this.neg().divmod(o, c), c !== "mod" && (E = w.div.neg()), c !== "div" && (I = w.mod.neg(), l && I.negative !== 0 && I.iadd(o)), {
        div: E,
        mod: I
      }) : this.negative === 0 && o.negative !== 0 ? (w = this.divmod(o.neg(), c), c !== "mod" && (E = w.div.neg()), {
        div: E,
        mod: w.mod
      }) : this.negative & o.negative ? (w = this.neg().divmod(o.neg(), c), c !== "div" && (I = w.mod.neg(), l && I.negative !== 0 && I.isub(o)), {
        div: w.div,
        mod: I
      }) : o.length > this.length || this.cmp(o) < 0 ? {
        div: new s(0),
        mod: this
      } : o.length === 1 ? c === "div" ? {
        div: this.divn(o.words[0]),
        mod: null
      } : c === "mod" ? {
        div: null,
        mod: new s(this.modrn(o.words[0]))
      } : {
        div: this.divn(o.words[0]),
        mod: new s(this.modrn(o.words[0]))
      } : this._wordDiv(o, c);
    }, s.prototype.div = function(o) {
      return this.divmod(o, "div", !1).div;
    }, s.prototype.mod = function(o) {
      return this.divmod(o, "mod", !1).mod;
    }, s.prototype.umod = function(o) {
      return this.divmod(o, "mod", !0).mod;
    }, s.prototype.divRound = function(o) {
      var c = this.divmod(o);
      if (c.mod.isZero())
        return c.div;
      var l = c.div.negative !== 0 ? c.mod.isub(o) : c.mod, E = o.ushrn(1), I = o.andln(1), w = l.cmp(E);
      return w < 0 || I === 1 && w === 0 ? c.div : c.div.negative !== 0 ? c.div.isubn(1) : c.div.iaddn(1);
    }, s.prototype.modrn = function(o) {
      var c = o < 0;
      c && (o = -o), r(o <= 67108863);
      for (var l = (1 << 26) % o, E = 0, I = this.length - 1; I >= 0; I--)
        E = (l * E + (this.words[I] | 0)) % o;
      return c ? -E : E;
    }, s.prototype.modn = function(o) {
      return this.modrn(o);
    }, s.prototype.idivn = function(o) {
      var c = o < 0;
      c && (o = -o), r(o <= 67108863);
      for (var l = 0, E = this.length - 1; E >= 0; E--) {
        var I = (this.words[E] | 0) + l * 67108864;
        this.words[E] = I / o | 0, l = I % o;
      }
      return this._strip(), c ? this.ineg() : this;
    }, s.prototype.divn = function(o) {
      return this.clone().idivn(o);
    }, s.prototype.egcd = function(o) {
      r(o.negative === 0), r(!o.isZero());
      var c = this, l = o.clone();
      c.negative !== 0 ? c = c.umod(o) : c = c.clone();
      for (var E = new s(1), I = new s(0), w = new s(0), u = new s(1), m = 0; c.isEven() && l.isEven(); )
        c.iushrn(1), l.iushrn(1), ++m;
      for (var b = l.clone(), P = c.clone(); !c.isZero(); ) {
        for (var B = 0, G = 1; !(c.words[0] & G) && B < 26; ++B, G <<= 1)
          ;
        if (B > 0)
          for (c.iushrn(B); B-- > 0; )
            (E.isOdd() || I.isOdd()) && (E.iadd(b), I.isub(P)), E.iushrn(1), I.iushrn(1);
        for (var M = 0, $ = 1; !(l.words[0] & $) && M < 26; ++M, $ <<= 1)
          ;
        if (M > 0)
          for (l.iushrn(M); M-- > 0; )
            (w.isOdd() || u.isOdd()) && (w.iadd(b), u.isub(P)), w.iushrn(1), u.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), E.isub(w), I.isub(u)) : (l.isub(c), w.isub(E), u.isub(I));
      }
      return {
        a: w,
        b: u,
        gcd: l.iushln(m)
      };
    }, s.prototype._invmp = function(o) {
      r(o.negative === 0), r(!o.isZero());
      var c = this, l = o.clone();
      c.negative !== 0 ? c = c.umod(o) : c = c.clone();
      for (var E = new s(1), I = new s(0), w = l.clone(); c.cmpn(1) > 0 && l.cmpn(1) > 0; ) {
        for (var u = 0, m = 1; !(c.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (c.iushrn(u); u-- > 0; )
            E.isOdd() && E.iadd(w), E.iushrn(1);
        for (var b = 0, P = 1; !(l.words[0] & P) && b < 26; ++b, P <<= 1)
          ;
        if (b > 0)
          for (l.iushrn(b); b-- > 0; )
            I.isOdd() && I.iadd(w), I.iushrn(1);
        c.cmp(l) >= 0 ? (c.isub(l), E.isub(I)) : (l.isub(c), I.isub(E));
      }
      var B;
      return c.cmpn(1) === 0 ? B = E : B = I, B.cmpn(0) < 0 && B.iadd(o), B;
    }, s.prototype.gcd = function(o) {
      if (this.isZero())
        return o.abs();
      if (o.isZero())
        return this.abs();
      var c = this.clone(), l = o.clone();
      c.negative = 0, l.negative = 0;
      for (var E = 0; c.isEven() && l.isEven(); E++)
        c.iushrn(1), l.iushrn(1);
      do {
        for (; c.isEven(); )
          c.iushrn(1);
        for (; l.isEven(); )
          l.iushrn(1);
        var I = c.cmp(l);
        if (I < 0) {
          var w = c;
          c = l, l = w;
        } else if (I === 0 || l.cmpn(1) === 0)
          break;
        c.isub(l);
      } while (!0);
      return l.iushln(E);
    }, s.prototype.invm = function(o) {
      return this.egcd(o).a.umod(o);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(o) {
      return this.words[0] & o;
    }, s.prototype.bincn = function(o) {
      r(typeof o == "number");
      var c = o % 26, l = (o - c) / 26, E = 1 << c;
      if (this.length <= l)
        return this._expand(l + 1), this.words[l] |= E, this;
      for (var I = E, w = l; I !== 0 && w < this.length; w++) {
        var u = this.words[w] | 0;
        u += I, I = u >>> 26, u &= 67108863, this.words[w] = u;
      }
      return I !== 0 && (this.words[w] = I, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(o) {
      var c = o < 0;
      if (this.negative !== 0 && !c)
        return -1;
      if (this.negative === 0 && c)
        return 1;
      this._strip();
      var l;
      if (this.length > 1)
        l = 1;
      else {
        c && (o = -o), r(o <= 67108863, "Number is too big");
        var E = this.words[0] | 0;
        l = E === o ? 0 : E < o ? -1 : 1;
      }
      return this.negative !== 0 ? -l | 0 : l;
    }, s.prototype.cmp = function(o) {
      if (this.negative !== 0 && o.negative === 0)
        return -1;
      if (this.negative === 0 && o.negative !== 0)
        return 1;
      var c = this.ucmp(o);
      return this.negative !== 0 ? -c | 0 : c;
    }, s.prototype.ucmp = function(o) {
      if (this.length > o.length)
        return 1;
      if (this.length < o.length)
        return -1;
      for (var c = 0, l = this.length - 1; l >= 0; l--) {
        var E = this.words[l] | 0, I = o.words[l] | 0;
        if (E !== I) {
          E < I ? c = -1 : E > I && (c = 1);
          break;
        }
      }
      return c;
    }, s.prototype.gtn = function(o) {
      return this.cmpn(o) === 1;
    }, s.prototype.gt = function(o) {
      return this.cmp(o) === 1;
    }, s.prototype.gten = function(o) {
      return this.cmpn(o) >= 0;
    }, s.prototype.gte = function(o) {
      return this.cmp(o) >= 0;
    }, s.prototype.ltn = function(o) {
      return this.cmpn(o) === -1;
    }, s.prototype.lt = function(o) {
      return this.cmp(o) === -1;
    }, s.prototype.lten = function(o) {
      return this.cmpn(o) <= 0;
    }, s.prototype.lte = function(o) {
      return this.cmp(o) <= 0;
    }, s.prototype.eqn = function(o) {
      return this.cmpn(o) === 0;
    }, s.prototype.eq = function(o) {
      return this.cmp(o) === 0;
    }, s.red = function(o) {
      return new p(o);
    }, s.prototype.toRed = function(o) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), o.convertTo(this)._forceRed(o);
    }, s.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(o) {
      return this.red = o, this;
    }, s.prototype.forceRed = function(o) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(o);
    }, s.prototype.redAdd = function(o) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, o);
    }, s.prototype.redIAdd = function(o) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, o);
    }, s.prototype.redSub = function(o) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, o);
    }, s.prototype.redISub = function(o) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, o);
    }, s.prototype.redShl = function(o) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, o);
    }, s.prototype.redMul = function(o) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.mul(this, o);
    }, s.prototype.redIMul = function(o) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, o), this.red.imul(this, o);
    }, s.prototype.redSqr = function() {
      return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(o) {
      return r(this.red && !o.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, o);
    };
    var U = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function D(o, c) {
      this.name = o, this.p = new s(c, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    D.prototype._tmp = function() {
      var o = new s(null);
      return o.words = new Array(Math.ceil(this.n / 13)), o;
    }, D.prototype.ireduce = function(o) {
      var c = o, l;
      do
        this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), l = c.bitLength();
      while (l > this.n);
      var E = l < this.n ? -1 : c.ucmp(this.p);
      return E === 0 ? (c.words[0] = 0, c.length = 1) : E > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
    }, D.prototype.split = function(o, c) {
      o.iushrn(this.n, 0, c);
    }, D.prototype.imulK = function(o) {
      return o.imul(this.k);
    };
    function v() {
      D.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    n(v, D), v.prototype.split = function(o, c) {
      for (var l = 4194303, E = Math.min(o.length, 9), I = 0; I < E; I++)
        c.words[I] = o.words[I];
      if (c.length = E, o.length <= 9) {
        o.words[0] = 0, o.length = 1;
        return;
      }
      var w = o.words[9];
      for (c.words[c.length++] = w & l, I = 10; I < o.length; I++) {
        var u = o.words[I] | 0;
        o.words[I - 10] = (u & l) << 4 | w >>> 22, w = u;
      }
      w >>>= 22, o.words[I - 10] = w, w === 0 && o.length > 10 ? o.length -= 10 : o.length -= 9;
    }, v.prototype.imulK = function(o) {
      o.words[o.length] = 0, o.words[o.length + 1] = 0, o.length += 2;
      for (var c = 0, l = 0; l < o.length; l++) {
        var E = o.words[l] | 0;
        c += E * 977, o.words[l] = c & 67108863, c = E * 64 + (c / 67108864 | 0);
      }
      return o.words[o.length - 1] === 0 && (o.length--, o.words[o.length - 1] === 0 && o.length--), o;
    };
    function T() {
      D.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    n(T, D);
    function Y() {
      D.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    n(Y, D);
    function Q() {
      D.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    n(Q, D), Q.prototype.imulK = function(o) {
      for (var c = 0, l = 0; l < o.length; l++) {
        var E = (o.words[l] | 0) * 19 + c, I = E & 67108863;
        E >>>= 26, o.words[l] = I, c = E;
      }
      return c !== 0 && (o.words[o.length++] = c), o;
    }, s._prime = function(o) {
      if (U[o])
        return U[o];
      var c;
      if (o === "k256")
        c = new v();
      else if (o === "p224")
        c = new T();
      else if (o === "p192")
        c = new Y();
      else if (o === "p25519")
        c = new Q();
      else
        throw new Error("Unknown prime " + o);
      return U[o] = c, c;
    };
    function p(o) {
      if (typeof o == "string") {
        var c = s._prime(o);
        this.m = c.p, this.prime = c;
      } else
        r(o.gtn(1), "modulus must be greater than 1"), this.m = o, this.prime = null;
    }
    p.prototype._verify1 = function(o) {
      r(o.negative === 0, "red works only with positives"), r(o.red, "red works only with red numbers");
    }, p.prototype._verify2 = function(o, c) {
      r((o.negative | c.negative) === 0, "red works only with positives"), r(
        o.red && o.red === c.red,
        "red works only with red numbers"
      );
    }, p.prototype.imod = function(o) {
      return this.prime ? this.prime.ireduce(o)._forceRed(this) : (g(o, o.umod(this.m)._forceRed(this)), o);
    }, p.prototype.neg = function(o) {
      return o.isZero() ? o.clone() : this.m.sub(o)._forceRed(this);
    }, p.prototype.add = function(o, c) {
      this._verify2(o, c);
      var l = o.add(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l._forceRed(this);
    }, p.prototype.iadd = function(o, c) {
      this._verify2(o, c);
      var l = o.iadd(c);
      return l.cmp(this.m) >= 0 && l.isub(this.m), l;
    }, p.prototype.sub = function(o, c) {
      this._verify2(o, c);
      var l = o.sub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l._forceRed(this);
    }, p.prototype.isub = function(o, c) {
      this._verify2(o, c);
      var l = o.isub(c);
      return l.cmpn(0) < 0 && l.iadd(this.m), l;
    }, p.prototype.shl = function(o, c) {
      return this._verify1(o), this.imod(o.ushln(c));
    }, p.prototype.imul = function(o, c) {
      return this._verify2(o, c), this.imod(o.imul(c));
    }, p.prototype.mul = function(o, c) {
      return this._verify2(o, c), this.imod(o.mul(c));
    }, p.prototype.isqr = function(o) {
      return this.imul(o, o.clone());
    }, p.prototype.sqr = function(o) {
      return this.mul(o, o);
    }, p.prototype.sqrt = function(o) {
      if (o.isZero())
        return o.clone();
      var c = this.m.andln(3);
      if (r(c % 2 === 1), c === 3) {
        var l = this.m.add(new s(1)).iushrn(2);
        return this.pow(o, l);
      }
      for (var E = this.m.subn(1), I = 0; !E.isZero() && E.andln(1) === 0; )
        I++, E.iushrn(1);
      r(!E.isZero());
      var w = new s(1).toRed(this), u = w.redNeg(), m = this.m.subn(1).iushrn(1), b = this.m.bitLength();
      for (b = new s(2 * b * b).toRed(this); this.pow(b, m).cmp(u) !== 0; )
        b.redIAdd(u);
      for (var P = this.pow(b, E), B = this.pow(o, E.addn(1).iushrn(1)), G = this.pow(o, E), M = I; G.cmp(w) !== 0; ) {
        for (var $ = G, L = 0; $.cmp(w) !== 0; L++)
          $ = $.redSqr();
        r(L < M);
        var k = this.pow(P, new s(1).iushln(M - L - 1));
        B = B.redMul(k), P = k.redSqr(), G = G.redMul(P), M = L;
      }
      return B;
    }, p.prototype.invm = function(o) {
      var c = o._invmp(this.m);
      return c.negative !== 0 ? (c.negative = 0, this.imod(c).redNeg()) : this.imod(c);
    }, p.prototype.pow = function(o, c) {
      if (c.isZero())
        return new s(1).toRed(this);
      if (c.cmpn(1) === 0)
        return o.clone();
      var l = 4, E = new Array(1 << l);
      E[0] = new s(1).toRed(this), E[1] = o;
      for (var I = 2; I < E.length; I++)
        E[I] = this.mul(E[I - 1], o);
      var w = E[0], u = 0, m = 0, b = c.bitLength() % 26;
      for (b === 0 && (b = 26), I = c.length - 1; I >= 0; I--) {
        for (var P = c.words[I], B = b - 1; B >= 0; B--) {
          var G = P >> B & 1;
          if (w !== E[0] && (w = this.sqr(w)), G === 0 && u === 0) {
            m = 0;
            continue;
          }
          u <<= 1, u |= G, m++, !(m !== l && (I !== 0 || B !== 0)) && (w = this.mul(w, E[u]), m = 0, u = 0);
        }
        b = 26;
      }
      return w;
    }, p.prototype.convertTo = function(o) {
      var c = o.umod(this.m);
      return c === o ? c.clone() : c;
    }, p.prototype.convertFrom = function(o) {
      var c = o.clone();
      return c.red = null, c;
    }, s.mont = function(o) {
      return new S(o);
    };
    function S(o) {
      p.call(this, o), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(S, p), S.prototype.convertTo = function(o) {
      return this.imod(o.ushln(this.shift));
    }, S.prototype.convertFrom = function(o) {
      var c = this.imod(o.mul(this.rinv));
      return c.red = null, c;
    }, S.prototype.imul = function(o, c) {
      if (o.isZero() || c.isZero())
        return o.words[0] = 0, o.length = 1, o;
      var l = o.imul(c), E = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), I = l.isub(E).iushrn(this.shift), w = I;
      return I.cmp(this.m) >= 0 ? w = I.isub(this.m) : I.cmpn(0) < 0 && (w = I.iadd(this.m)), w._forceRed(this);
    }, S.prototype.mul = function(o, c) {
      if (o.isZero() || c.isZero())
        return new s(0)._forceRed(this);
      var l = o.mul(c), E = l.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), I = l.isub(E).iushrn(this.shift), w = I;
      return I.cmp(this.m) >= 0 ? w = I.isub(this.m) : I.cmpn(0) < 0 && (w = I.iadd(this.m)), w._forceRed(this);
    }, S.prototype.invm = function(o) {
      var c = this.imod(o._invmp(this.m).mul(this.r2));
      return c._forceRed(this);
    };
  })(e, ti);
})(lu);
var Ug = lu.exports;
const Be = /* @__PURE__ */ gn(Ug);
var Dg = Be.BN;
function Fg(e) {
  return new Dg(e, 36).toString(16);
}
const Kg = "strings/5.7.0", Bg = new ct(Kg);
var Fs;
(function(e) {
  e.current = "", e.NFC = "NFC", e.NFD = "NFD", e.NFKC = "NFKC", e.NFKD = "NFKD";
})(Fs || (Fs = {}));
var tc;
(function(e) {
  e.UNEXPECTED_CONTINUE = "unexpected continuation byte", e.BAD_PREFIX = "bad codepoint prefix", e.OVERRUN = "string overrun", e.MISSING_CONTINUE = "missing continuation byte", e.OUT_OF_RANGE = "out of UTF-8 range", e.UTF16_SURROGATE = "UTF-16 surrogate", e.OVERLONG = "overlong representation";
})(tc || (tc = {}));
function jo(e, t = Fs.current) {
  t != Fs.current && (Bg.checkNormalize(), e = e.normalize(t));
  let i = [];
  for (let r = 0; r < e.length; r++) {
    const n = e.charCodeAt(r);
    if (n < 128)
      i.push(n);
    else if (n < 2048)
      i.push(n >> 6 | 192), i.push(n & 63 | 128);
    else if ((n & 64512) == 55296) {
      r++;
      const s = e.charCodeAt(r);
      if (r >= e.length || (s & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const a = 65536 + ((n & 1023) << 10) + (s & 1023);
      i.push(a >> 18 | 240), i.push(a >> 12 & 63 | 128), i.push(a >> 6 & 63 | 128), i.push(a & 63 | 128);
    } else
      i.push(n >> 12 | 224), i.push(n >> 6 & 63 | 128), i.push(n & 63 | 128);
  }
  return mt(i);
}
const $g = `Ethereum Signed Message:
`;
function pu(e) {
  return typeof e == "string" && (e = jo(e)), Ta(qg([
    jo($g),
    jo(String(e.length)),
    e
  ]));
}
const Vg = "address/5.7.0", Fn = new ct(Vg);
function ic(e) {
  Ci(e, 20) || Fn.throwArgumentError("invalid address", "address", e), e = e.toLowerCase();
  const t = e.substring(2).split(""), i = new Uint8Array(40);
  for (let n = 0; n < 40; n++)
    i[n] = t[n].charCodeAt(0);
  const r = mt(Ta(i));
  for (let n = 0; n < 40; n += 2)
    r[n >> 1] >> 4 >= 8 && (t[n] = t[n].toUpperCase()), (r[n >> 1] & 15) >= 8 && (t[n + 1] = t[n + 1].toUpperCase());
  return "0x" + t.join("");
}
const Hg = 9007199254740991;
function Wg(e) {
  return Math.log10 ? Math.log10(e) : Math.log(e) / Math.LN10;
}
const ka = {};
for (let e = 0; e < 10; e++)
  ka[String(e)] = String(e);
for (let e = 0; e < 26; e++)
  ka[String.fromCharCode(65 + e)] = String(10 + e);
const rc = Math.floor(Wg(Hg));
function Gg(e) {
  e = e.toUpperCase(), e = e.substring(4) + e.substring(0, 2) + "00";
  let t = e.split("").map((r) => ka[r]).join("");
  for (; t.length >= rc; ) {
    let r = t.substring(0, rc);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let i = String(98 - parseInt(t, 10) % 97);
  for (; i.length < 2; )
    i = "0" + i;
  return i;
}
function Yg(e) {
  let t = null;
  if (typeof e != "string" && Fn.throwArgumentError("invalid address", "address", e), e.match(/^(0x)?[0-9a-fA-F]{40}$/))
    e.substring(0, 2) !== "0x" && (e = "0x" + e), t = ic(e), e.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== e && Fn.throwArgumentError("bad address checksum", "address", e);
  else if (e.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (e.substring(2, 4) !== Gg(e) && Fn.throwArgumentError("bad icap checksum", "address", e), t = Fg(e.substring(4)); t.length < 40; )
      t = "0" + t;
    t = ic("0x" + t);
  } else
    Fn.throwArgumentError("invalid address", "address", e);
  return t;
}
function Tn(e, t, i) {
  Object.defineProperty(e, t, {
    enumerable: !0,
    value: i,
    writable: !1
  });
}
var rs = {}, Qe = {}, Gr = gu;
function gu(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
gu.equal = function(e, t, i) {
  if (e != t)
    throw new Error(i || "Assertion failed: " + e + " != " + t);
};
var da = { exports: {} };
typeof Object.create == "function" ? da.exports = function(e, t) {
  t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : da.exports = function(e, t) {
  if (t) {
    e.super_ = t;
    var i = function() {
    };
    i.prototype = t.prototype, e.prototype = new i(), e.prototype.constructor = e;
  }
};
var co = da.exports, Jg = Gr, Zg = co;
Qe.inherits = Zg;
function Xg(e, t) {
  return (e.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= e.length ? !1 : (e.charCodeAt(t + 1) & 64512) === 56320;
}
function Qg(e, t) {
  if (Array.isArray(e))
    return e.slice();
  if (!e)
    return [];
  var i = [];
  if (typeof e == "string")
    if (t) {
      if (t === "hex")
        for (e = e.replace(/[^a-z0-9]+/ig, ""), e.length % 2 !== 0 && (e = "0" + e), n = 0; n < e.length; n += 2)
          i.push(parseInt(e[n] + e[n + 1], 16));
    } else
      for (var r = 0, n = 0; n < e.length; n++) {
        var s = e.charCodeAt(n);
        s < 128 ? i[r++] = s : s < 2048 ? (i[r++] = s >> 6 | 192, i[r++] = s & 63 | 128) : Xg(e, n) ? (s = 65536 + ((s & 1023) << 10) + (e.charCodeAt(++n) & 1023), i[r++] = s >> 18 | 240, i[r++] = s >> 12 & 63 | 128, i[r++] = s >> 6 & 63 | 128, i[r++] = s & 63 | 128) : (i[r++] = s >> 12 | 224, i[r++] = s >> 6 & 63 | 128, i[r++] = s & 63 | 128);
      }
  else
    for (n = 0; n < e.length; n++)
      i[n] = e[n] | 0;
  return i;
}
Qe.toArray = Qg;
function eb(e) {
  for (var t = "", i = 0; i < e.length; i++)
    t += mu(e[i].toString(16));
  return t;
}
Qe.toHex = eb;
function bu(e) {
  var t = e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (e & 255) << 24;
  return t >>> 0;
}
Qe.htonl = bu;
function tb(e, t) {
  for (var i = "", r = 0; r < e.length; r++) {
    var n = e[r];
    t === "little" && (n = bu(n)), i += yu(n.toString(16));
  }
  return i;
}
Qe.toHex32 = tb;
function mu(e) {
  return e.length === 1 ? "0" + e : e;
}
Qe.zero2 = mu;
function yu(e) {
  return e.length === 7 ? "0" + e : e.length === 6 ? "00" + e : e.length === 5 ? "000" + e : e.length === 4 ? "0000" + e : e.length === 3 ? "00000" + e : e.length === 2 ? "000000" + e : e.length === 1 ? "0000000" + e : e;
}
Qe.zero8 = yu;
function ib(e, t, i, r) {
  var n = i - t;
  Jg(n % 4 === 0);
  for (var s = new Array(n / 4), a = 0, h = t; a < s.length; a++, h += 4) {
    var d;
    r === "big" ? d = e[h] << 24 | e[h + 1] << 16 | e[h + 2] << 8 | e[h + 3] : d = e[h + 3] << 24 | e[h + 2] << 16 | e[h + 1] << 8 | e[h], s[a] = d >>> 0;
  }
  return s;
}
Qe.join32 = ib;
function rb(e, t) {
  for (var i = new Array(e.length * 4), r = 0, n = 0; r < e.length; r++, n += 4) {
    var s = e[r];
    t === "big" ? (i[n] = s >>> 24, i[n + 1] = s >>> 16 & 255, i[n + 2] = s >>> 8 & 255, i[n + 3] = s & 255) : (i[n + 3] = s >>> 24, i[n + 2] = s >>> 16 & 255, i[n + 1] = s >>> 8 & 255, i[n] = s & 255);
  }
  return i;
}
Qe.split32 = rb;
function nb(e, t) {
  return e >>> t | e << 32 - t;
}
Qe.rotr32 = nb;
function sb(e, t) {
  return e << t | e >>> 32 - t;
}
Qe.rotl32 = sb;
function ob(e, t) {
  return e + t >>> 0;
}
Qe.sum32 = ob;
function ab(e, t, i) {
  return e + t + i >>> 0;
}
Qe.sum32_3 = ab;
function hb(e, t, i, r) {
  return e + t + i + r >>> 0;
}
Qe.sum32_4 = hb;
function cb(e, t, i, r, n) {
  return e + t + i + r + n >>> 0;
}
Qe.sum32_5 = cb;
function fb(e, t, i, r) {
  var n = e[t], s = e[t + 1], a = r + s >>> 0, h = (a < r ? 1 : 0) + i + n;
  e[t] = h >>> 0, e[t + 1] = a;
}
Qe.sum64 = fb;
function ub(e, t, i, r) {
  var n = t + r >>> 0, s = (n < t ? 1 : 0) + e + i;
  return s >>> 0;
}
Qe.sum64_hi = ub;
function db(e, t, i, r) {
  var n = t + r;
  return n >>> 0;
}
Qe.sum64_lo = db;
function lb(e, t, i, r, n, s, a, h) {
  var d = 0, f = t;
  f = f + r >>> 0, d += f < t ? 1 : 0, f = f + s >>> 0, d += f < s ? 1 : 0, f = f + h >>> 0, d += f < h ? 1 : 0;
  var g = e + i + n + a + d;
  return g >>> 0;
}
Qe.sum64_4_hi = lb;
function pb(e, t, i, r, n, s, a, h) {
  var d = t + r + s + h;
  return d >>> 0;
}
Qe.sum64_4_lo = pb;
function gb(e, t, i, r, n, s, a, h, d, f) {
  var g = 0, _ = t;
  _ = _ + r >>> 0, g += _ < t ? 1 : 0, _ = _ + s >>> 0, g += _ < s ? 1 : 0, _ = _ + h >>> 0, g += _ < h ? 1 : 0, _ = _ + f >>> 0, g += _ < f ? 1 : 0;
  var x = e + i + n + a + d + g;
  return x >>> 0;
}
Qe.sum64_5_hi = gb;
function bb(e, t, i, r, n, s, a, h, d, f) {
  var g = t + r + s + h + f;
  return g >>> 0;
}
Qe.sum64_5_lo = bb;
function mb(e, t, i) {
  var r = t << 32 - i | e >>> i;
  return r >>> 0;
}
Qe.rotr64_hi = mb;
function yb(e, t, i) {
  var r = e << 32 - i | t >>> i;
  return r >>> 0;
}
Qe.rotr64_lo = yb;
function vb(e, t, i) {
  return e >>> i;
}
Qe.shr64_hi = vb;
function wb(e, t, i) {
  var r = e << 32 - i | t >>> i;
  return r >>> 0;
}
Qe.shr64_lo = wb;
var yn = {}, nc = Qe, _b = Gr;
function fo() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
yn.BlockHash = fo;
fo.prototype.update = function(e, t) {
  if (e = nc.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
    e = this.pending;
    var i = e.length % this._delta8;
    this.pending = e.slice(e.length - i, e.length), this.pending.length === 0 && (this.pending = null), e = nc.join32(e, 0, e.length - i, this.endian);
    for (var r = 0; r < e.length; r += this._delta32)
      this._update(e, r, r + this._delta32);
  }
  return this;
};
fo.prototype.digest = function(e) {
  return this.update(this._pad()), _b(this.pending === null), this._digest(e);
};
fo.prototype._pad = function() {
  var e = this.pendingTotal, t = this._delta8, i = t - (e + this.padLength) % t, r = new Array(i + this.padLength);
  r[0] = 128;
  for (var n = 1; n < i; n++)
    r[n] = 0;
  if (e <<= 3, this.endian === "big") {
    for (var s = 8; s < this.padLength; s++)
      r[n++] = 0;
    r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = e >>> 24 & 255, r[n++] = e >>> 16 & 255, r[n++] = e >>> 8 & 255, r[n++] = e & 255;
  } else
    for (r[n++] = e & 255, r[n++] = e >>> 8 & 255, r[n++] = e >>> 16 & 255, r[n++] = e >>> 24 & 255, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, s = 8; s < this.padLength; s++)
      r[n++] = 0;
  return r;
};
var vn = {}, Bi = {}, Eb = Qe, qi = Eb.rotr32;
function Sb(e, t, i, r) {
  if (e === 0)
    return vu(t, i, r);
  if (e === 1 || e === 3)
    return _u(t, i, r);
  if (e === 2)
    return wu(t, i, r);
}
Bi.ft_1 = Sb;
function vu(e, t, i) {
  return e & t ^ ~e & i;
}
Bi.ch32 = vu;
function wu(e, t, i) {
  return e & t ^ e & i ^ t & i;
}
Bi.maj32 = wu;
function _u(e, t, i) {
  return e ^ t ^ i;
}
Bi.p32 = _u;
function Ib(e) {
  return qi(e, 2) ^ qi(e, 13) ^ qi(e, 22);
}
Bi.s0_256 = Ib;
function Mb(e) {
  return qi(e, 6) ^ qi(e, 11) ^ qi(e, 25);
}
Bi.s1_256 = Mb;
function Ab(e) {
  return qi(e, 7) ^ qi(e, 18) ^ e >>> 3;
}
Bi.g0_256 = Ab;
function xb(e) {
  return qi(e, 17) ^ qi(e, 19) ^ e >>> 10;
}
Bi.g1_256 = xb;
var un = Qe, Ob = yn, Pb = Bi, zo = un.rotl32, kn = un.sum32, Nb = un.sum32_5, Rb = Pb.ft_1, Eu = Ob.BlockHash, Tb = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function Ui() {
  if (!(this instanceof Ui))
    return new Ui();
  Eu.call(this), this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ], this.W = new Array(80);
}
un.inherits(Ui, Eu);
var kb = Ui;
Ui.blockSize = 512;
Ui.outSize = 160;
Ui.hmacStrength = 80;
Ui.padLength = 64;
Ui.prototype._update = function(e, t) {
  for (var i = this.W, r = 0; r < 16; r++)
    i[r] = e[t + r];
  for (; r < i.length; r++)
    i[r] = zo(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1);
  var n = this.h[0], s = this.h[1], a = this.h[2], h = this.h[3], d = this.h[4];
  for (r = 0; r < i.length; r++) {
    var f = ~~(r / 20), g = Nb(zo(n, 5), Rb(f, s, a, h), d, i[r], Tb[f]);
    d = h, h = a, a = zo(s, 30), s = n, n = g;
  }
  this.h[0] = kn(this.h[0], n), this.h[1] = kn(this.h[1], s), this.h[2] = kn(this.h[2], a), this.h[3] = kn(this.h[3], h), this.h[4] = kn(this.h[4], d);
};
Ui.prototype._digest = function(e) {
  return e === "hex" ? un.toHex32(this.h, "big") : un.split32(this.h, "big");
};
var dn = Qe, Lb = yn, wn = Bi, Cb = Gr, wi = dn.sum32, qb = dn.sum32_4, jb = dn.sum32_5, zb = wn.ch32, Ub = wn.maj32, Db = wn.s0_256, Fb = wn.s1_256, Kb = wn.g0_256, Bb = wn.g1_256, Su = Lb.BlockHash, $b = [
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
function Di() {
  if (!(this instanceof Di))
    return new Di();
  Su.call(this), this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], this.k = $b, this.W = new Array(64);
}
dn.inherits(Di, Su);
var Iu = Di;
Di.blockSize = 512;
Di.outSize = 256;
Di.hmacStrength = 192;
Di.padLength = 64;
Di.prototype._update = function(e, t) {
  for (var i = this.W, r = 0; r < 16; r++)
    i[r] = e[t + r];
  for (; r < i.length; r++)
    i[r] = qb(Bb(i[r - 2]), i[r - 7], Kb(i[r - 15]), i[r - 16]);
  var n = this.h[0], s = this.h[1], a = this.h[2], h = this.h[3], d = this.h[4], f = this.h[5], g = this.h[6], _ = this.h[7];
  for (Cb(this.k.length === i.length), r = 0; r < i.length; r++) {
    var x = jb(_, Fb(d), zb(d, f, g), this.k[r], i[r]), A = wi(Db(n), Ub(n, s, a));
    _ = g, g = f, f = d, d = wi(h, x), h = a, a = s, s = n, n = wi(x, A);
  }
  this.h[0] = wi(this.h[0], n), this.h[1] = wi(this.h[1], s), this.h[2] = wi(this.h[2], a), this.h[3] = wi(this.h[3], h), this.h[4] = wi(this.h[4], d), this.h[5] = wi(this.h[5], f), this.h[6] = wi(this.h[6], g), this.h[7] = wi(this.h[7], _);
};
Di.prototype._digest = function(e) {
  return e === "hex" ? dn.toHex32(this.h, "big") : dn.split32(this.h, "big");
};
var la = Qe, Mu = Iu;
function cr() {
  if (!(this instanceof cr))
    return new cr();
  Mu.call(this), this.h = [
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
la.inherits(cr, Mu);
var Vb = cr;
cr.blockSize = 512;
cr.outSize = 224;
cr.hmacStrength = 192;
cr.padLength = 64;
cr.prototype._digest = function(e) {
  return e === "hex" ? la.toHex32(this.h.slice(0, 7), "big") : la.split32(this.h.slice(0, 7), "big");
};
var Yt = Qe, Hb = yn, Wb = Gr, ji = Yt.rotr64_hi, zi = Yt.rotr64_lo, Au = Yt.shr64_hi, xu = Yt.shr64_lo, pr = Yt.sum64, Uo = Yt.sum64_hi, Do = Yt.sum64_lo, Gb = Yt.sum64_4_hi, Yb = Yt.sum64_4_lo, Jb = Yt.sum64_5_hi, Zb = Yt.sum64_5_lo, Ou = Hb.BlockHash, Xb = [
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
function xi() {
  if (!(this instanceof xi))
    return new xi();
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
  ], this.k = Xb, this.W = new Array(160);
}
Yt.inherits(xi, Ou);
var Pu = xi;
xi.blockSize = 1024;
xi.outSize = 512;
xi.hmacStrength = 192;
xi.padLength = 128;
xi.prototype._prepareBlock = function(e, t) {
  for (var i = this.W, r = 0; r < 32; r++)
    i[r] = e[t + r];
  for (; r < i.length; r += 2) {
    var n = cm(i[r - 4], i[r - 3]), s = fm(i[r - 4], i[r - 3]), a = i[r - 14], h = i[r - 13], d = am(i[r - 30], i[r - 29]), f = hm(i[r - 30], i[r - 29]), g = i[r - 32], _ = i[r - 31];
    i[r] = Gb(
      n,
      s,
      a,
      h,
      d,
      f,
      g,
      _
    ), i[r + 1] = Yb(
      n,
      s,
      a,
      h,
      d,
      f,
      g,
      _
    );
  }
};
xi.prototype._update = function(e, t) {
  this._prepareBlock(e, t);
  var i = this.W, r = this.h[0], n = this.h[1], s = this.h[2], a = this.h[3], h = this.h[4], d = this.h[5], f = this.h[6], g = this.h[7], _ = this.h[8], x = this.h[9], A = this.h[10], O = this.h[11], j = this.h[12], F = this.h[13], V = this.h[14], C = this.h[15];
  Wb(this.k.length === i.length);
  for (var K = 0; K < i.length; K += 2) {
    var N = V, U = C, D = sm(_, x), v = om(_, x), T = Qb(_, x, A, O, j), Y = em(_, x, A, O, j, F), Q = this.k[K], p = this.k[K + 1], S = i[K], o = i[K + 1], c = Jb(
      N,
      U,
      D,
      v,
      T,
      Y,
      Q,
      p,
      S,
      o
    ), l = Zb(
      N,
      U,
      D,
      v,
      T,
      Y,
      Q,
      p,
      S,
      o
    );
    N = rm(r, n), U = nm(r, n), D = tm(r, n, s, a, h), v = im(r, n, s, a, h, d);
    var E = Uo(N, U, D, v), I = Do(N, U, D, v);
    V = j, C = F, j = A, F = O, A = _, O = x, _ = Uo(f, g, c, l), x = Do(g, g, c, l), f = h, g = d, h = s, d = a, s = r, a = n, r = Uo(c, l, E, I), n = Do(c, l, E, I);
  }
  pr(this.h, 0, r, n), pr(this.h, 2, s, a), pr(this.h, 4, h, d), pr(this.h, 6, f, g), pr(this.h, 8, _, x), pr(this.h, 10, A, O), pr(this.h, 12, j, F), pr(this.h, 14, V, C);
};
xi.prototype._digest = function(e) {
  return e === "hex" ? Yt.toHex32(this.h, "big") : Yt.split32(this.h, "big");
};
function Qb(e, t, i, r, n) {
  var s = e & i ^ ~e & n;
  return s < 0 && (s += 4294967296), s;
}
function em(e, t, i, r, n, s) {
  var a = t & r ^ ~t & s;
  return a < 0 && (a += 4294967296), a;
}
function tm(e, t, i, r, n) {
  var s = e & i ^ e & n ^ i & n;
  return s < 0 && (s += 4294967296), s;
}
function im(e, t, i, r, n, s) {
  var a = t & r ^ t & s ^ r & s;
  return a < 0 && (a += 4294967296), a;
}
function rm(e, t) {
  var i = ji(e, t, 28), r = ji(t, e, 2), n = ji(t, e, 7), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function nm(e, t) {
  var i = zi(e, t, 28), r = zi(t, e, 2), n = zi(t, e, 7), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function sm(e, t) {
  var i = ji(e, t, 14), r = ji(e, t, 18), n = ji(t, e, 9), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function om(e, t) {
  var i = zi(e, t, 14), r = zi(e, t, 18), n = zi(t, e, 9), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function am(e, t) {
  var i = ji(e, t, 1), r = ji(e, t, 8), n = Au(e, t, 7), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function hm(e, t) {
  var i = zi(e, t, 1), r = zi(e, t, 8), n = xu(e, t, 7), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function cm(e, t) {
  var i = ji(e, t, 19), r = ji(t, e, 29), n = Au(e, t, 6), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
function fm(e, t) {
  var i = zi(e, t, 19), r = zi(t, e, 29), n = xu(e, t, 6), s = i ^ r ^ n;
  return s < 0 && (s += 4294967296), s;
}
var pa = Qe, Nu = Pu;
function fr() {
  if (!(this instanceof fr))
    return new fr();
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
pa.inherits(fr, Nu);
var um = fr;
fr.blockSize = 1024;
fr.outSize = 384;
fr.hmacStrength = 192;
fr.padLength = 128;
fr.prototype._digest = function(e) {
  return e === "hex" ? pa.toHex32(this.h.slice(0, 12), "big") : pa.split32(this.h.slice(0, 12), "big");
};
vn.sha1 = kb;
vn.sha224 = Vb;
vn.sha256 = Iu;
vn.sha384 = um;
vn.sha512 = Pu;
var Ru = {}, Kr = Qe, dm = yn, _s = Kr.rotl32, sc = Kr.sum32, Ln = Kr.sum32_3, oc = Kr.sum32_4, Tu = dm.BlockHash;
function Fi() {
  if (!(this instanceof Fi))
    return new Fi();
  Tu.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
Kr.inherits(Fi, Tu);
Ru.ripemd160 = Fi;
Fi.blockSize = 512;
Fi.outSize = 160;
Fi.hmacStrength = 192;
Fi.padLength = 64;
Fi.prototype._update = function(e, t) {
  for (var i = this.h[0], r = this.h[1], n = this.h[2], s = this.h[3], a = this.h[4], h = i, d = r, f = n, g = s, _ = a, x = 0; x < 80; x++) {
    var A = sc(
      _s(
        oc(i, ac(x, r, n, s), e[gm[x] + t], lm(x)),
        mm[x]
      ),
      a
    );
    i = a, a = s, s = _s(n, 10), n = r, r = A, A = sc(
      _s(
        oc(h, ac(79 - x, d, f, g), e[bm[x] + t], pm(x)),
        ym[x]
      ),
      _
    ), h = _, _ = g, g = _s(f, 10), f = d, d = A;
  }
  A = Ln(this.h[1], n, g), this.h[1] = Ln(this.h[2], s, _), this.h[2] = Ln(this.h[3], a, h), this.h[3] = Ln(this.h[4], i, d), this.h[4] = Ln(this.h[0], r, f), this.h[0] = A;
};
Fi.prototype._digest = function(e) {
  return e === "hex" ? Kr.toHex32(this.h, "little") : Kr.split32(this.h, "little");
};
function ac(e, t, i, r) {
  return e <= 15 ? t ^ i ^ r : e <= 31 ? t & i | ~t & r : e <= 47 ? (t | ~i) ^ r : e <= 63 ? t & r | i & ~r : t ^ (i | ~r);
}
function lm(e) {
  return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838;
}
function pm(e) {
  return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0;
}
var gm = [
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
], bm = [
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
], mm = [
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
], ym = [
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
], vm = Qe, wm = Gr;
function ln(e, t, i) {
  if (!(this instanceof ln))
    return new ln(e, t, i);
  this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(vm.toArray(t, i));
}
var _m = ln;
ln.prototype._init = function(e) {
  e.length > this.blockSize && (e = new this.Hash().update(e).digest()), wm(e.length <= this.blockSize);
  for (var t = e.length; t < this.blockSize; t++)
    e.push(0);
  for (t = 0; t < e.length; t++)
    e[t] ^= 54;
  for (this.inner = new this.Hash().update(e), t = 0; t < e.length; t++)
    e[t] ^= 106;
  this.outer = new this.Hash().update(e);
};
ln.prototype.update = function(e, t) {
  return this.inner.update(e, t), this;
};
ln.prototype.digest = function(e) {
  return this.outer.update(this.inner.digest()), this.outer.digest(e);
};
(function(e) {
  var t = e;
  t.utils = Qe, t.common = yn, t.sha = vn, t.ripemd = Ru, t.hmac = _m, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})(rs);
const rr = /* @__PURE__ */ gn(rs);
function _n(e, t, i) {
  return i = {
    path: t,
    exports: {},
    require: function(r, n) {
      return Em(r, n ?? i.path);
    }
  }, e(i, i.exports), i.exports;
}
function Em() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var La = ku;
function ku(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
ku.equal = function(e, t, i) {
  if (e != t)
    throw new Error(i || "Assertion failed: " + e + " != " + t);
};
var Mi = _n(function(e, t) {
  var i = t;
  function r(a, h) {
    if (Array.isArray(a))
      return a.slice();
    if (!a)
      return [];
    var d = [];
    if (typeof a != "string") {
      for (var f = 0; f < a.length; f++)
        d[f] = a[f] | 0;
      return d;
    }
    if (h === "hex") {
      a = a.replace(/[^a-z0-9]+/ig, ""), a.length % 2 !== 0 && (a = "0" + a);
      for (var f = 0; f < a.length; f += 2)
        d.push(parseInt(a[f] + a[f + 1], 16));
    } else
      for (var f = 0; f < a.length; f++) {
        var g = a.charCodeAt(f), _ = g >> 8, x = g & 255;
        _ ? d.push(_, x) : d.push(x);
      }
    return d;
  }
  i.toArray = r;
  function n(a) {
    return a.length === 1 ? "0" + a : a;
  }
  i.zero2 = n;
  function s(a) {
    for (var h = "", d = 0; d < a.length; d++)
      h += n(a[d].toString(16));
    return h;
  }
  i.toHex = s, i.encode = function(a, h) {
    return h === "hex" ? s(a) : a;
  };
}), si = _n(function(e, t) {
  var i = t;
  i.assert = La, i.toArray = Mi.toArray, i.zero2 = Mi.zero2, i.toHex = Mi.toHex, i.encode = Mi.encode;
  function r(d, f, g) {
    var _ = new Array(Math.max(d.bitLength(), g) + 1);
    _.fill(0);
    for (var x = 1 << f + 1, A = d.clone(), O = 0; O < _.length; O++) {
      var j, F = A.andln(x - 1);
      A.isOdd() ? (F > (x >> 1) - 1 ? j = (x >> 1) - F : j = F, A.isubn(j)) : j = 0, _[O] = j, A.iushrn(1);
    }
    return _;
  }
  i.getNAF = r;
  function n(d, f) {
    var g = [
      [],
      []
    ];
    d = d.clone(), f = f.clone();
    for (var _ = 0, x = 0, A; d.cmpn(-_) > 0 || f.cmpn(-x) > 0; ) {
      var O = d.andln(3) + _ & 3, j = f.andln(3) + x & 3;
      O === 3 && (O = -1), j === 3 && (j = -1);
      var F;
      O & 1 ? (A = d.andln(7) + _ & 7, (A === 3 || A === 5) && j === 2 ? F = -O : F = O) : F = 0, g[0].push(F);
      var V;
      j & 1 ? (A = f.andln(7) + x & 7, (A === 3 || A === 5) && O === 2 ? V = -j : V = j) : V = 0, g[1].push(V), 2 * _ === F + 1 && (_ = 1 - _), 2 * x === V + 1 && (x = 1 - x), d.iushrn(1), f.iushrn(1);
    }
    return g;
  }
  i.getJSF = n;
  function s(d, f, g) {
    var _ = "_" + f;
    d.prototype[f] = function() {
      return this[_] !== void 0 ? this[_] : this[_] = g.call(this);
    };
  }
  i.cachedProperty = s;
  function a(d) {
    return typeof d == "string" ? i.toArray(d, "hex") : d;
  }
  i.parseBytes = a;
  function h(d) {
    return new Be(d, "hex", "le");
  }
  i.intFromLE = h;
}), Ks = si.getNAF, Sm = si.getJSF, Bs = si.assert;
function Sr(e, t) {
  this.type = e, this.p = new Be(t.p, 16), this.red = t.prime ? Be.red(t.prime) : Be.mont(this.p), this.zero = new Be(0).toRed(this.red), this.one = new Be(1).toRed(this.red), this.two = new Be(2).toRed(this.red), this.n = t.n && new Be(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var i = this.n && this.p.div(this.n);
  !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var Yr = Sr;
Sr.prototype.point = function() {
  throw new Error("Not implemented");
};
Sr.prototype.validate = function() {
  throw new Error("Not implemented");
};
Sr.prototype._fixedNafMul = function(e, t) {
  Bs(e.precomputed);
  var i = e._getDoubles(), r = Ks(t, 1, this._bitLength), n = (1 << i.step + 1) - (i.step % 2 === 0 ? 2 : 1);
  n /= 3;
  var s = [], a, h;
  for (a = 0; a < r.length; a += i.step) {
    h = 0;
    for (var d = a + i.step - 1; d >= a; d--)
      h = (h << 1) + r[d];
    s.push(h);
  }
  for (var f = this.jpoint(null, null, null), g = this.jpoint(null, null, null), _ = n; _ > 0; _--) {
    for (a = 0; a < s.length; a++)
      h = s[a], h === _ ? g = g.mixedAdd(i.points[a]) : h === -_ && (g = g.mixedAdd(i.points[a].neg()));
    f = f.add(g);
  }
  return f.toP();
};
Sr.prototype._wnafMul = function(e, t) {
  var i = 4, r = e._getNAFPoints(i);
  i = r.wnd;
  for (var n = r.points, s = Ks(t, i, this._bitLength), a = this.jpoint(null, null, null), h = s.length - 1; h >= 0; h--) {
    for (var d = 0; h >= 0 && s[h] === 0; h--)
      d++;
    if (h >= 0 && d++, a = a.dblp(d), h < 0)
      break;
    var f = s[h];
    Bs(f !== 0), e.type === "affine" ? f > 0 ? a = a.mixedAdd(n[f - 1 >> 1]) : a = a.mixedAdd(n[-f - 1 >> 1].neg()) : f > 0 ? a = a.add(n[f - 1 >> 1]) : a = a.add(n[-f - 1 >> 1].neg());
  }
  return e.type === "affine" ? a.toP() : a;
};
Sr.prototype._wnafMulAdd = function(e, t, i, r, n) {
  var s = this._wnafT1, a = this._wnafT2, h = this._wnafT3, d = 0, f, g, _;
  for (f = 0; f < r; f++) {
    _ = t[f];
    var x = _._getNAFPoints(e);
    s[f] = x.wnd, a[f] = x.points;
  }
  for (f = r - 1; f >= 1; f -= 2) {
    var A = f - 1, O = f;
    if (s[A] !== 1 || s[O] !== 1) {
      h[A] = Ks(i[A], s[A], this._bitLength), h[O] = Ks(i[O], s[O], this._bitLength), d = Math.max(h[A].length, d), d = Math.max(h[O].length, d);
      continue;
    }
    var j = [
      t[A],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      t[O]
      /* 7 */
    ];
    t[A].y.cmp(t[O].y) === 0 ? (j[1] = t[A].add(t[O]), j[2] = t[A].toJ().mixedAdd(t[O].neg())) : t[A].y.cmp(t[O].y.redNeg()) === 0 ? (j[1] = t[A].toJ().mixedAdd(t[O]), j[2] = t[A].add(t[O].neg())) : (j[1] = t[A].toJ().mixedAdd(t[O]), j[2] = t[A].toJ().mixedAdd(t[O].neg()));
    var F = [
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
    ], V = Sm(i[A], i[O]);
    for (d = Math.max(V[0].length, d), h[A] = new Array(d), h[O] = new Array(d), g = 0; g < d; g++) {
      var C = V[0][g] | 0, K = V[1][g] | 0;
      h[A][g] = F[(C + 1) * 3 + (K + 1)], h[O][g] = 0, a[A] = j;
    }
  }
  var N = this.jpoint(null, null, null), U = this._wnafT4;
  for (f = d; f >= 0; f--) {
    for (var D = 0; f >= 0; ) {
      var v = !0;
      for (g = 0; g < r; g++)
        U[g] = h[g][f] | 0, U[g] !== 0 && (v = !1);
      if (!v)
        break;
      D++, f--;
    }
    if (f >= 0 && D++, N = N.dblp(D), f < 0)
      break;
    for (g = 0; g < r; g++) {
      var T = U[g];
      T !== 0 && (T > 0 ? _ = a[g][T - 1 >> 1] : T < 0 && (_ = a[g][-T - 1 >> 1].neg()), _.type === "affine" ? N = N.mixedAdd(_) : N = N.add(_));
    }
  }
  for (f = 0; f < r; f++)
    a[f] = null;
  return n ? N : N.toP();
};
function gi(e, t) {
  this.curve = e, this.type = t, this.precomputed = null;
}
Sr.BasePoint = gi;
gi.prototype.eq = function() {
  throw new Error("Not implemented");
};
gi.prototype.validate = function() {
  return this.curve.validate(this);
};
Sr.prototype.decodePoint = function(e, t) {
  e = si.toArray(e, t);
  var i = this.p.byteLength();
  if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 === 2 * i) {
    e[0] === 6 ? Bs(e[e.length - 1] % 2 === 0) : e[0] === 7 && Bs(e[e.length - 1] % 2 === 1);
    var r = this.point(
      e.slice(1, 1 + i),
      e.slice(1 + i, 1 + 2 * i)
    );
    return r;
  } else if ((e[0] === 2 || e[0] === 3) && e.length - 1 === i)
    return this.pointFromX(e.slice(1, 1 + i), e[0] === 3);
  throw new Error("Unknown point format");
};
gi.prototype.encodeCompressed = function(e) {
  return this.encode(e, !0);
};
gi.prototype._encode = function(e) {
  var t = this.curve.p.byteLength(), i = this.getX().toArray("be", t);
  return e ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", t));
};
gi.prototype.encode = function(e, t) {
  return si.encode(this._encode(t), e);
};
gi.prototype.precompute = function(e) {
  if (this.precomputed)
    return this;
  var t = {
    doubles: null,
    naf: null,
    beta: null
  };
  return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this;
};
gi.prototype._hasDoubles = function(e) {
  if (!this.precomputed)
    return !1;
  var t = this.precomputed.doubles;
  return t ? t.points.length >= Math.ceil((e.bitLength() + 1) / t.step) : !1;
};
gi.prototype._getDoubles = function(e, t) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i = [this], r = this, n = 0; n < t; n += e) {
    for (var s = 0; s < e; s++)
      r = r.dbl();
    i.push(r);
  }
  return {
    step: e,
    points: i
  };
};
gi.prototype._getNAFPoints = function(e) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var t = [this], i = (1 << e) - 1, r = i === 1 ? null : this.dbl(), n = 1; n < i; n++)
    t[n] = t[n - 1].add(r);
  return {
    wnd: e,
    points: t
  };
};
gi.prototype._getBeta = function() {
  return null;
};
gi.prototype.dblp = function(e) {
  for (var t = this, i = 0; i < e; i++)
    t = t.dbl();
  return t;
};
var Ca = _n(function(e) {
  typeof Object.create == "function" ? e.exports = function(t, i) {
    i && (t.super_ = i, t.prototype = Object.create(i.prototype, {
      constructor: {
        value: t,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : e.exports = function(t, i) {
    if (i) {
      t.super_ = i;
      var r = function() {
      };
      r.prototype = i.prototype, t.prototype = new r(), t.prototype.constructor = t;
    }
  };
}), Im = si.assert;
function bi(e) {
  Yr.call(this, "short", e), this.a = new Be(e.a, 16).toRed(this.red), this.b = new Be(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Ca(bi, Yr);
var Mm = bi;
bi.prototype._getEndomorphism = function(e) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var t, i;
    if (e.beta)
      t = new Be(e.beta, 16).toRed(this.red);
    else {
      var r = this._getEndoRoots(this.p);
      t = r[0].cmp(r[1]) < 0 ? r[0] : r[1], t = t.toRed(this.red);
    }
    if (e.lambda)
      i = new Be(e.lambda, 16);
    else {
      var n = this._getEndoRoots(this.n);
      this.g.mul(n[0]).x.cmp(this.g.x.redMul(t)) === 0 ? i = n[0] : (i = n[1], Im(this.g.mul(i).x.cmp(this.g.x.redMul(t)) === 0));
    }
    var s;
    return e.basis ? s = e.basis.map(function(a) {
      return {
        a: new Be(a.a, 16),
        b: new Be(a.b, 16)
      };
    }) : s = this._getEndoBasis(i), {
      beta: t,
      lambda: i,
      basis: s
    };
  }
};
bi.prototype._getEndoRoots = function(e) {
  var t = e === this.p ? this.red : Be.mont(e), i = new Be(2).toRed(t).redInvm(), r = i.redNeg(), n = new Be(3).toRed(t).redNeg().redSqrt().redMul(i), s = r.redAdd(n).fromRed(), a = r.redSub(n).fromRed();
  return [s, a];
};
bi.prototype._getEndoBasis = function(e) {
  for (var t = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i = e, r = this.n.clone(), n = new Be(1), s = new Be(0), a = new Be(0), h = new Be(1), d, f, g, _, x, A, O, j = 0, F, V; i.cmpn(0) !== 0; ) {
    var C = r.div(i);
    F = r.sub(C.mul(i)), V = a.sub(C.mul(n));
    var K = h.sub(C.mul(s));
    if (!g && F.cmp(t) < 0)
      d = O.neg(), f = n, g = F.neg(), _ = V;
    else if (g && ++j === 2)
      break;
    O = F, r = i, i = F, a = n, n = V, h = s, s = K;
  }
  x = F.neg(), A = V;
  var N = g.sqr().add(_.sqr()), U = x.sqr().add(A.sqr());
  return U.cmp(N) >= 0 && (x = d, A = f), g.negative && (g = g.neg(), _ = _.neg()), x.negative && (x = x.neg(), A = A.neg()), [
    { a: g, b: _ },
    { a: x, b: A }
  ];
};
bi.prototype._endoSplit = function(e) {
  var t = this.endo.basis, i = t[0], r = t[1], n = r.b.mul(e).divRound(this.n), s = i.b.neg().mul(e).divRound(this.n), a = n.mul(i.a), h = s.mul(r.a), d = n.mul(i.b), f = s.mul(r.b), g = e.sub(a).sub(h), _ = d.add(f).neg();
  return { k1: g, k2: _ };
};
bi.prototype.pointFromX = function(e, t) {
  e = new Be(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), r = i.redSqrt();
  if (r.redSqr().redSub(i).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var n = r.fromRed().isOdd();
  return (t && !n || !t && n) && (r = r.redNeg()), this.point(e, r);
};
bi.prototype.validate = function(e) {
  if (e.inf)
    return !0;
  var t = e.x, i = e.y, r = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(r).redIAdd(this.b);
  return i.redSqr().redISub(n).cmpn(0) === 0;
};
bi.prototype._endoWnafMulAdd = function(e, t, i) {
  for (var r = this._endoWnafT1, n = this._endoWnafT2, s = 0; s < e.length; s++) {
    var a = this._endoSplit(t[s]), h = e[s], d = h._getBeta();
    a.k1.negative && (a.k1.ineg(), h = h.neg(!0)), a.k2.negative && (a.k2.ineg(), d = d.neg(!0)), r[s * 2] = h, r[s * 2 + 1] = d, n[s * 2] = a.k1, n[s * 2 + 1] = a.k2;
  }
  for (var f = this._wnafMulAdd(1, r, n, s * 2, i), g = 0; g < s * 2; g++)
    r[g] = null, n[g] = null;
  return f;
};
function xt(e, t, i, r) {
  Yr.BasePoint.call(this, e, "affine"), t === null && i === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new Be(t, 16), this.y = new Be(i, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Ca(xt, Yr.BasePoint);
bi.prototype.point = function(e, t, i) {
  return new xt(this, e, t, i);
};
bi.prototype.pointFromJSON = function(e, t) {
  return xt.fromJSON(this, e, t);
};
xt.prototype._getBeta = function() {
  if (this.curve.endo) {
    var e = this.precomputed;
    if (e && e.beta)
      return e.beta;
    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (e) {
      var i = this.curve, r = function(n) {
        return i.point(n.x.redMul(i.endo.beta), n.y);
      };
      e.beta = t, t.precomputed = {
        beta: null,
        naf: e.naf && {
          wnd: e.naf.wnd,
          points: e.naf.points.map(r)
        },
        doubles: e.doubles && {
          step: e.doubles.step,
          points: e.doubles.points.map(r)
        }
      };
    }
    return t;
  }
};
xt.prototype.toJSON = function() {
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
xt.fromJSON = function(e, t, i) {
  typeof t == "string" && (t = JSON.parse(t));
  var r = e.point(t[0], t[1], i);
  if (!t[2])
    return r;
  function n(a) {
    return e.point(a[0], a[1], i);
  }
  var s = t[2];
  return r.precomputed = {
    beta: null,
    doubles: s.doubles && {
      step: s.doubles.step,
      points: [r].concat(s.doubles.points.map(n))
    },
    naf: s.naf && {
      wnd: s.naf.wnd,
      points: [r].concat(s.naf.points.map(n))
    }
  }, r;
};
xt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
xt.prototype.isInfinity = function() {
  return this.inf;
};
xt.prototype.add = function(e) {
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
  var i = t.redSqr().redISub(this.x).redISub(e.x), r = t.redMul(this.x.redSub(i)).redISub(this.y);
  return this.curve.point(i, r);
};
xt.prototype.dbl = function() {
  if (this.inf)
    return this;
  var e = this.y.redAdd(this.y);
  if (e.cmpn(0) === 0)
    return this.curve.point(null, null);
  var t = this.curve.a, i = this.x.redSqr(), r = e.redInvm(), n = i.redAdd(i).redIAdd(i).redIAdd(t).redMul(r), s = n.redSqr().redISub(this.x.redAdd(this.x)), a = n.redMul(this.x.redSub(s)).redISub(this.y);
  return this.curve.point(s, a);
};
xt.prototype.getX = function() {
  return this.x.fromRed();
};
xt.prototype.getY = function() {
  return this.y.fromRed();
};
xt.prototype.mul = function(e) {
  return e = new Be(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e);
};
xt.prototype.mulAdd = function(e, t, i) {
  var r = [this, t], n = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(r, n) : this.curve._wnafMulAdd(1, r, n, 2);
};
xt.prototype.jmulAdd = function(e, t, i) {
  var r = [this, t], n = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(r, n, !0) : this.curve._wnafMulAdd(1, r, n, 2, !0);
};
xt.prototype.eq = function(e) {
  return this === e || this.inf === e.inf && (this.inf || this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0);
};
xt.prototype.neg = function(e) {
  if (this.inf)
    return this;
  var t = this.curve.point(this.x, this.y.redNeg());
  if (e && this.precomputed) {
    var i = this.precomputed, r = function(n) {
      return n.neg();
    };
    t.precomputed = {
      naf: i.naf && {
        wnd: i.naf.wnd,
        points: i.naf.points.map(r)
      },
      doubles: i.doubles && {
        step: i.doubles.step,
        points: i.doubles.points.map(r)
      }
    };
  }
  return t;
};
xt.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var e = this.curve.jpoint(this.x, this.y, this.curve.one);
  return e;
};
function Rt(e, t, i, r) {
  Yr.BasePoint.call(this, e, "jacobian"), t === null && i === null && r === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new Be(0)) : (this.x = new Be(t, 16), this.y = new Be(i, 16), this.z = new Be(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Ca(Rt, Yr.BasePoint);
bi.prototype.jpoint = function(e, t, i) {
  return new Rt(this, e, t, i);
};
Rt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var e = this.z.redInvm(), t = e.redSqr(), i = this.x.redMul(t), r = this.y.redMul(t).redMul(e);
  return this.curve.point(i, r);
};
Rt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
Rt.prototype.add = function(e) {
  if (this.isInfinity())
    return e;
  if (e.isInfinity())
    return this;
  var t = e.z.redSqr(), i = this.z.redSqr(), r = this.x.redMul(t), n = e.x.redMul(i), s = this.y.redMul(t.redMul(e.z)), a = e.y.redMul(i.redMul(this.z)), h = r.redSub(n), d = s.redSub(a);
  if (h.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var f = h.redSqr(), g = f.redMul(h), _ = r.redMul(f), x = d.redSqr().redIAdd(g).redISub(_).redISub(_), A = d.redMul(_.redISub(x)).redISub(s.redMul(g)), O = this.z.redMul(e.z).redMul(h);
  return this.curve.jpoint(x, A, O);
};
Rt.prototype.mixedAdd = function(e) {
  if (this.isInfinity())
    return e.toJ();
  if (e.isInfinity())
    return this;
  var t = this.z.redSqr(), i = this.x, r = e.x.redMul(t), n = this.y, s = e.y.redMul(t).redMul(this.z), a = i.redSub(r), h = n.redSub(s);
  if (a.cmpn(0) === 0)
    return h.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var d = a.redSqr(), f = d.redMul(a), g = i.redMul(d), _ = h.redSqr().redIAdd(f).redISub(g).redISub(g), x = h.redMul(g.redISub(_)).redISub(n.redMul(f)), A = this.z.redMul(a);
  return this.curve.jpoint(_, x, A);
};
Rt.prototype.dblp = function(e) {
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
  var r = this.curve.a, n = this.curve.tinv, s = this.x, a = this.y, h = this.z, d = h.redSqr().redSqr(), f = a.redAdd(a);
  for (t = 0; t < e; t++) {
    var g = s.redSqr(), _ = f.redSqr(), x = _.redSqr(), A = g.redAdd(g).redIAdd(g).redIAdd(r.redMul(d)), O = s.redMul(_), j = A.redSqr().redISub(O.redAdd(O)), F = O.redISub(j), V = A.redMul(F);
    V = V.redIAdd(V).redISub(x);
    var C = f.redMul(h);
    t + 1 < e && (d = d.redMul(x)), s = j, h = C, f = V;
  }
  return this.curve.jpoint(s, f.redMul(n), h);
};
Rt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
Rt.prototype._zeroDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var r = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), a = this.x.redAdd(n).redSqr().redISub(r).redISub(s);
    a = a.redIAdd(a);
    var h = r.redAdd(r).redIAdd(r), d = h.redSqr().redISub(a).redISub(a), f = s.redIAdd(s);
    f = f.redIAdd(f), f = f.redIAdd(f), e = d, t = h.redMul(a.redISub(d)).redISub(f), i = this.y.redAdd(this.y);
  } else {
    var g = this.x.redSqr(), _ = this.y.redSqr(), x = _.redSqr(), A = this.x.redAdd(_).redSqr().redISub(g).redISub(x);
    A = A.redIAdd(A);
    var O = g.redAdd(g).redIAdd(g), j = O.redSqr(), F = x.redIAdd(x);
    F = F.redIAdd(F), F = F.redIAdd(F), e = j.redISub(A).redISub(A), t = O.redMul(A.redISub(e)).redISub(F), i = this.y.redMul(this.z), i = i.redIAdd(i);
  }
  return this.curve.jpoint(e, t, i);
};
Rt.prototype._threeDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var r = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), a = this.x.redAdd(n).redSqr().redISub(r).redISub(s);
    a = a.redIAdd(a);
    var h = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a), d = h.redSqr().redISub(a).redISub(a);
    e = d;
    var f = s.redIAdd(s);
    f = f.redIAdd(f), f = f.redIAdd(f), t = h.redMul(a.redISub(d)).redISub(f), i = this.y.redAdd(this.y);
  } else {
    var g = this.z.redSqr(), _ = this.y.redSqr(), x = this.x.redMul(_), A = this.x.redSub(g).redMul(this.x.redAdd(g));
    A = A.redAdd(A).redIAdd(A);
    var O = x.redIAdd(x);
    O = O.redIAdd(O);
    var j = O.redAdd(O);
    e = A.redSqr().redISub(j), i = this.y.redAdd(this.z).redSqr().redISub(_).redISub(g);
    var F = _.redSqr();
    F = F.redIAdd(F), F = F.redIAdd(F), F = F.redIAdd(F), t = A.redMul(O.redISub(e)).redISub(F);
  }
  return this.curve.jpoint(e, t, i);
};
Rt.prototype._dbl = function() {
  var e = this.curve.a, t = this.x, i = this.y, r = this.z, n = r.redSqr().redSqr(), s = t.redSqr(), a = i.redSqr(), h = s.redAdd(s).redIAdd(s).redIAdd(e.redMul(n)), d = t.redAdd(t);
  d = d.redIAdd(d);
  var f = d.redMul(a), g = h.redSqr().redISub(f.redAdd(f)), _ = f.redISub(g), x = a.redSqr();
  x = x.redIAdd(x), x = x.redIAdd(x), x = x.redIAdd(x);
  var A = h.redMul(_).redISub(x), O = i.redAdd(i).redMul(r);
  return this.curve.jpoint(g, A, O);
};
Rt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr(), r = t.redSqr(), n = e.redAdd(e).redIAdd(e), s = n.redSqr(), a = this.x.redAdd(t).redSqr().redISub(e).redISub(r);
  a = a.redIAdd(a), a = a.redAdd(a).redIAdd(a), a = a.redISub(s);
  var h = a.redSqr(), d = r.redIAdd(r);
  d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
  var f = n.redIAdd(a).redSqr().redISub(s).redISub(h).redISub(d), g = t.redMul(f);
  g = g.redIAdd(g), g = g.redIAdd(g);
  var _ = this.x.redMul(h).redISub(g);
  _ = _.redIAdd(_), _ = _.redIAdd(_);
  var x = this.y.redMul(f.redMul(d.redISub(f)).redISub(a.redMul(h)));
  x = x.redIAdd(x), x = x.redIAdd(x), x = x.redIAdd(x);
  var A = this.z.redAdd(a).redSqr().redISub(i).redISub(h);
  return this.curve.jpoint(_, x, A);
};
Rt.prototype.mul = function(e, t) {
  return e = new Be(e, t), this.curve._wnafMul(this, e);
};
Rt.prototype.eq = function(e) {
  if (e.type === "affine")
    return this.eq(e.toJ());
  if (this === e)
    return !0;
  var t = this.z.redSqr(), i = e.z.redSqr();
  if (this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0) !== 0)
    return !1;
  var r = t.redMul(this.z), n = i.redMul(e.z);
  return this.y.redMul(n).redISub(e.y.redMul(r)).cmpn(0) === 0;
};
Rt.prototype.eqXToP = function(e) {
  var t = this.z.redSqr(), i = e.toRed(this.curve.red).redMul(t);
  if (this.x.cmp(i) === 0)
    return !0;
  for (var r = e.clone(), n = this.curve.redN.redMul(t); ; ) {
    if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)
      return !1;
    if (i.redIAdd(n), this.x.cmp(i) === 0)
      return !0;
  }
};
Rt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
Rt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var Ps = _n(function(e, t) {
  var i = t;
  i.base = Yr, i.short = Mm, i.mont = /*RicMoo:ethers:require(./mont)*/
  null, i.edwards = /*RicMoo:ethers:require(./edwards)*/
  null;
}), Ns = _n(function(e, t) {
  var i = t, r = si.assert;
  function n(h) {
    h.type === "short" ? this.curve = new Ps.short(h) : h.type === "edwards" ? this.curve = new Ps.edwards(h) : this.curve = new Ps.mont(h), this.g = this.curve.g, this.n = this.curve.n, this.hash = h.hash, r(this.g.validate(), "Invalid curve"), r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  i.PresetCurve = n;
  function s(h, d) {
    Object.defineProperty(i, h, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var f = new n(d);
        return Object.defineProperty(i, h, {
          configurable: !0,
          enumerable: !0,
          value: f
        }), f;
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
    hash: rr.sha256,
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
    hash: rr.sha256,
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
    hash: rr.sha256,
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
    hash: rr.sha384,
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
    hash: rr.sha512,
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
    hash: rr.sha256,
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
    hash: rr.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var a;
  try {
    a = /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch {
    a = void 0;
  }
  s("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: rr.sha256,
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
      a
    ]
  });
});
function wr(e) {
  if (!(this instanceof wr))
    return new wr(e);
  this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = Mi.toArray(e.entropy, e.entropyEnc || "hex"), i = Mi.toArray(e.nonce, e.nonceEnc || "hex"), r = Mi.toArray(e.pers, e.persEnc || "hex");
  La(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(t, i, r);
}
var Lu = wr;
wr.prototype._init = function(e, t, i) {
  var r = e.concat(t).concat(i);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var n = 0; n < this.V.length; n++)
    this.K[n] = 0, this.V[n] = 1;
  this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656;
};
wr.prototype._hmac = function() {
  return new rr.hmac(this.hash, this.K);
};
wr.prototype._update = function(e) {
  var t = this._hmac().update(this.V).update([0]);
  e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest());
};
wr.prototype.reseed = function(e, t, i, r) {
  typeof t != "string" && (r = i, i = t, t = null), e = Mi.toArray(e, t), i = Mi.toArray(i, r), La(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(e.concat(i || [])), this._reseed = 1;
};
wr.prototype.generate = function(e, t, i, r) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof t != "string" && (r = i, i = t, t = null), i && (i = Mi.toArray(i, r || "hex"), this._update(i));
  for (var n = []; n.length < e; )
    this.V = this._hmac().update(this.V).digest(), n = n.concat(this.V);
  var s = n.slice(0, e);
  return this._update(i), this._reseed++, Mi.encode(s, t);
};
var ga = si.assert;
function jt(e, t) {
  this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var qa = jt;
jt.fromPublic = function(e, t, i) {
  return t instanceof jt ? t : new jt(e, {
    pub: t,
    pubEnc: i
  });
};
jt.fromPrivate = function(e, t, i) {
  return t instanceof jt ? t : new jt(e, {
    priv: t,
    privEnc: i
  });
};
jt.prototype.validate = function() {
  var e = this.getPublic();
  return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
jt.prototype.getPublic = function(e, t) {
  return typeof e == "string" && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub;
};
jt.prototype.getPrivate = function(e) {
  return e === "hex" ? this.priv.toString(16, 2) : this.priv;
};
jt.prototype._importPrivate = function(e, t) {
  this.priv = new Be(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
jt.prototype._importPublic = function(e, t) {
  if (e.x || e.y) {
    this.ec.curve.type === "mont" ? ga(e.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && ga(e.x && e.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(e.x, e.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(e, t);
};
jt.prototype.derive = function(e) {
  return e.validate() || ga(e.validate(), "public point not validated"), e.mul(this.priv).getX();
};
jt.prototype.sign = function(e, t, i) {
  return this.ec.sign(e, this, t, i);
};
jt.prototype.verify = function(e, t) {
  return this.ec.verify(e, t, this);
};
jt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Am = si.assert;
function uo(e, t) {
  if (e instanceof uo)
    return e;
  this._importDER(e, t) || (Am(e.r && e.s, "Signature without r or s"), this.r = new Be(e.r, 16), this.s = new Be(e.s, 16), e.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam);
}
var lo = uo;
function xm() {
  this.place = 0;
}
function Fo(e, t) {
  var i = e[t.place++];
  if (!(i & 128))
    return i;
  var r = i & 15;
  if (r === 0 || r > 4)
    return !1;
  for (var n = 0, s = 0, a = t.place; s < r; s++, a++)
    n <<= 8, n |= e[a], n >>>= 0;
  return n <= 127 ? !1 : (t.place = a, n);
}
function hc(e) {
  for (var t = 0, i = e.length - 1; !e[t] && !(e[t + 1] & 128) && t < i; )
    t++;
  return t === 0 ? e : e.slice(t);
}
uo.prototype._importDER = function(e, t) {
  e = si.toArray(e, t);
  var i = new xm();
  if (e[i.place++] !== 48)
    return !1;
  var r = Fo(e, i);
  if (r === !1 || r + i.place !== e.length || e[i.place++] !== 2)
    return !1;
  var n = Fo(e, i);
  if (n === !1)
    return !1;
  var s = e.slice(i.place, n + i.place);
  if (i.place += n, e[i.place++] !== 2)
    return !1;
  var a = Fo(e, i);
  if (a === !1 || e.length !== a + i.place)
    return !1;
  var h = e.slice(i.place, a + i.place);
  if (s[0] === 0)
    if (s[1] & 128)
      s = s.slice(1);
    else
      return !1;
  if (h[0] === 0)
    if (h[1] & 128)
      h = h.slice(1);
    else
      return !1;
  return this.r = new Be(s), this.s = new Be(h), this.recoveryParam = null, !0;
};
function Ko(e, t) {
  if (t < 128) {
    e.push(t);
    return;
  }
  var i = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (e.push(i | 128); --i; )
    e.push(t >>> (i << 3) & 255);
  e.push(t);
}
uo.prototype.toDER = function(e) {
  var t = this.r.toArray(), i = this.s.toArray();
  for (t[0] & 128 && (t = [0].concat(t)), i[0] & 128 && (i = [0].concat(i)), t = hc(t), i = hc(i); !i[0] && !(i[1] & 128); )
    i = i.slice(1);
  var r = [2];
  Ko(r, t.length), r = r.concat(t), r.push(2), Ko(r, i.length);
  var n = r.concat(i), s = [48];
  return Ko(s, n.length), s = s.concat(n), si.encode(s, e);
};
var Om = (
  /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }
), Cu = si.assert;
function li(e) {
  if (!(this instanceof li))
    return new li(e);
  typeof e == "string" && (Cu(
    Object.prototype.hasOwnProperty.call(Ns, e),
    "Unknown curve " + e
  ), e = Ns[e]), e instanceof Ns.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash;
}
var Pm = li;
li.prototype.keyPair = function(e) {
  return new qa(this, e);
};
li.prototype.keyFromPrivate = function(e, t) {
  return qa.fromPrivate(this, e, t);
};
li.prototype.keyFromPublic = function(e, t) {
  return qa.fromPublic(this, e, t);
};
li.prototype.genKeyPair = function(e) {
  e || (e = {});
  for (var t = new Lu({
    hash: this.hash,
    pers: e.pers,
    persEnc: e.persEnc || "utf8",
    entropy: e.entropy || Om(this.hash.hmacStrength),
    entropyEnc: e.entropy && e.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), i = this.n.byteLength(), r = this.n.sub(new Be(2)); ; ) {
    var n = new Be(t.generate(i));
    if (!(n.cmp(r) > 0))
      return n.iaddn(1), this.keyFromPrivate(n);
  }
};
li.prototype._truncateToN = function(e, t) {
  var i = e.byteLength() * 8 - this.n.bitLength();
  return i > 0 && (e = e.ushrn(i)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
li.prototype.sign = function(e, t, i, r) {
  typeof i == "object" && (r = i, i = null), r || (r = {}), t = this.keyFromPrivate(t, i), e = this._truncateToN(new Be(e, 16));
  for (var n = this.n.byteLength(), s = t.getPrivate().toArray("be", n), a = e.toArray("be", n), h = new Lu({
    hash: this.hash,
    entropy: s,
    nonce: a,
    pers: r.pers,
    persEnc: r.persEnc || "utf8"
  }), d = this.n.sub(new Be(1)), f = 0; ; f++) {
    var g = r.k ? r.k(f) : new Be(h.generate(this.n.byteLength()));
    if (g = this._truncateToN(g, !0), !(g.cmpn(1) <= 0 || g.cmp(d) >= 0)) {
      var _ = this.g.mul(g);
      if (!_.isInfinity()) {
        var x = _.getX(), A = x.umod(this.n);
        if (A.cmpn(0) !== 0) {
          var O = g.invm(this.n).mul(A.mul(t.getPrivate()).iadd(e));
          if (O = O.umod(this.n), O.cmpn(0) !== 0) {
            var j = (_.getY().isOdd() ? 1 : 0) | (x.cmp(A) !== 0 ? 2 : 0);
            return r.canonical && O.cmp(this.nh) > 0 && (O = this.n.sub(O), j ^= 1), new lo({ r: A, s: O, recoveryParam: j });
          }
        }
      }
    }
  }
};
li.prototype.verify = function(e, t, i, r) {
  e = this._truncateToN(new Be(e, 16)), i = this.keyFromPublic(i, r), t = new lo(t, "hex");
  var n = t.r, s = t.s;
  if (n.cmpn(1) < 0 || n.cmp(this.n) >= 0 || s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return !1;
  var a = s.invm(this.n), h = a.mul(e).umod(this.n), d = a.mul(n).umod(this.n), f;
  return this.curve._maxwellTrick ? (f = this.g.jmulAdd(h, i.getPublic(), d), f.isInfinity() ? !1 : f.eqXToP(n)) : (f = this.g.mulAdd(h, i.getPublic(), d), f.isInfinity() ? !1 : f.getX().umod(this.n).cmp(n) === 0);
};
li.prototype.recoverPubKey = function(e, t, i, r) {
  Cu((3 & i) === i, "The recovery param is more than two bits"), t = new lo(t, r);
  var n = this.n, s = new Be(e), a = t.r, h = t.s, d = i & 1, f = i >> 1;
  if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && f)
    throw new Error("Unable to find sencond key candinate");
  f ? a = this.curve.pointFromX(a.add(this.curve.n), d) : a = this.curve.pointFromX(a, d);
  var g = t.r.invm(n), _ = n.sub(s).mul(g).umod(n), x = h.mul(g).umod(n);
  return this.g.mulAdd(_, a, x);
};
li.prototype.getKeyRecoveryParam = function(e, t, i, r) {
  if (t = new lo(t, r), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var n = 0; n < 4; n++) {
    var s;
    try {
      s = this.recoverPubKey(e, t, n);
    } catch {
      continue;
    }
    if (s.eq(i))
      return n;
  }
  throw new Error("Unable to find valid recovery factor");
};
var Nm = _n(function(e, t) {
  var i = t;
  i.version = "6.5.4", i.utils = si, i.rand = /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }, i.curve = Ps, i.curves = Ns, i.ec = Pm, i.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
}), Rm = Nm.ec;
const Tm = "signing-key/5.7.0", ba = new ct(Tm);
let Bo = null;
function gr() {
  return Bo || (Bo = new Rm("secp256k1")), Bo;
}
class km {
  constructor(t) {
    Tn(this, "curve", "secp256k1"), Tn(this, "privateKey", ei(t)), zg(this.privateKey) !== 32 && ba.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const i = gr().keyFromPrivate(mt(this.privateKey));
    Tn(this, "publicKey", "0x" + i.getPublic(!1, "hex")), Tn(this, "compressedPublicKey", "0x" + i.getPublic(!0, "hex")), Tn(this, "_isSigningKey", !0);
  }
  _addPoint(t) {
    const i = gr().keyFromPublic(mt(this.publicKey)), r = gr().keyFromPublic(mt(t));
    return "0x" + i.pub.add(r.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const i = gr().keyFromPrivate(mt(this.privateKey)), r = mt(t);
    r.length !== 32 && ba.throwArgumentError("bad digest length", "digest", t);
    const n = i.sign(r, { canonical: !0 });
    return du({
      recoveryParam: n.recoveryParam,
      r: cn("0x" + n.r.toString(16), 32),
      s: cn("0x" + n.s.toString(16), 32)
    });
  }
  computeSharedSecret(t) {
    const i = gr().keyFromPrivate(mt(this.privateKey)), r = gr().keyFromPublic(mt(qu(t)));
    return cn("0x" + i.derive(r.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
}
function Lm(e, t) {
  const i = du(t), r = { r: mt(i.r), s: mt(i.s) };
  return "0x" + gr().recoverPubKey(mt(e), r, i.recoveryParam).encode("hex", !1);
}
function qu(e, t) {
  const i = mt(e);
  return i.length === 32 ? new km(i).publicKey : i.length === 33 ? "0x" + gr().keyFromPublic(i).getPublic(!1, "hex") : i.length === 65 ? ei(i) : ba.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
var cc;
(function(e) {
  e[e.legacy = 0] = "legacy", e[e.eip2930 = 1] = "eip2930", e[e.eip1559 = 2] = "eip1559";
})(cc || (cc = {}));
function Cm(e) {
  const t = qu(e);
  return Yg(ec(Ta(ec(t, 1)), 12));
}
function qm(e, t) {
  return Cm(Lm(mt(e), t));
}
var ja = {}, po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
var qt = Ve, ma = ni, jm = 20;
function zm(e, t, i) {
  for (var r = 1634760805, n = 857760878, s = 2036477234, a = 1797285236, h = i[3] << 24 | i[2] << 16 | i[1] << 8 | i[0], d = i[7] << 24 | i[6] << 16 | i[5] << 8 | i[4], f = i[11] << 24 | i[10] << 16 | i[9] << 8 | i[8], g = i[15] << 24 | i[14] << 16 | i[13] << 8 | i[12], _ = i[19] << 24 | i[18] << 16 | i[17] << 8 | i[16], x = i[23] << 24 | i[22] << 16 | i[21] << 8 | i[20], A = i[27] << 24 | i[26] << 16 | i[25] << 8 | i[24], O = i[31] << 24 | i[30] << 16 | i[29] << 8 | i[28], j = t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0], F = t[7] << 24 | t[6] << 16 | t[5] << 8 | t[4], V = t[11] << 24 | t[10] << 16 | t[9] << 8 | t[8], C = t[15] << 24 | t[14] << 16 | t[13] << 8 | t[12], K = r, N = n, U = s, D = a, v = h, T = d, Y = f, Q = g, p = _, S = x, o = A, c = O, l = j, E = F, I = V, w = C, u = 0; u < jm; u += 2)
    K = K + v | 0, l ^= K, l = l >>> 16 | l << 16, p = p + l | 0, v ^= p, v = v >>> 20 | v << 12, N = N + T | 0, E ^= N, E = E >>> 16 | E << 16, S = S + E | 0, T ^= S, T = T >>> 20 | T << 12, U = U + Y | 0, I ^= U, I = I >>> 16 | I << 16, o = o + I | 0, Y ^= o, Y = Y >>> 20 | Y << 12, D = D + Q | 0, w ^= D, w = w >>> 16 | w << 16, c = c + w | 0, Q ^= c, Q = Q >>> 20 | Q << 12, U = U + Y | 0, I ^= U, I = I >>> 24 | I << 8, o = o + I | 0, Y ^= o, Y = Y >>> 25 | Y << 7, D = D + Q | 0, w ^= D, w = w >>> 24 | w << 8, c = c + w | 0, Q ^= c, Q = Q >>> 25 | Q << 7, N = N + T | 0, E ^= N, E = E >>> 24 | E << 8, S = S + E | 0, T ^= S, T = T >>> 25 | T << 7, K = K + v | 0, l ^= K, l = l >>> 24 | l << 8, p = p + l | 0, v ^= p, v = v >>> 25 | v << 7, K = K + T | 0, w ^= K, w = w >>> 16 | w << 16, o = o + w | 0, T ^= o, T = T >>> 20 | T << 12, N = N + Y | 0, l ^= N, l = l >>> 16 | l << 16, c = c + l | 0, Y ^= c, Y = Y >>> 20 | Y << 12, U = U + Q | 0, E ^= U, E = E >>> 16 | E << 16, p = p + E | 0, Q ^= p, Q = Q >>> 20 | Q << 12, D = D + v | 0, I ^= D, I = I >>> 16 | I << 16, S = S + I | 0, v ^= S, v = v >>> 20 | v << 12, U = U + Q | 0, E ^= U, E = E >>> 24 | E << 8, p = p + E | 0, Q ^= p, Q = Q >>> 25 | Q << 7, D = D + v | 0, I ^= D, I = I >>> 24 | I << 8, S = S + I | 0, v ^= S, v = v >>> 25 | v << 7, N = N + Y | 0, l ^= N, l = l >>> 24 | l << 8, c = c + l | 0, Y ^= c, Y = Y >>> 25 | Y << 7, K = K + T | 0, w ^= K, w = w >>> 24 | w << 8, o = o + w | 0, T ^= o, T = T >>> 25 | T << 7;
  qt.writeUint32LE(K + r | 0, e, 0), qt.writeUint32LE(N + n | 0, e, 4), qt.writeUint32LE(U + s | 0, e, 8), qt.writeUint32LE(D + a | 0, e, 12), qt.writeUint32LE(v + h | 0, e, 16), qt.writeUint32LE(T + d | 0, e, 20), qt.writeUint32LE(Y + f | 0, e, 24), qt.writeUint32LE(Q + g | 0, e, 28), qt.writeUint32LE(p + _ | 0, e, 32), qt.writeUint32LE(S + x | 0, e, 36), qt.writeUint32LE(o + A | 0, e, 40), qt.writeUint32LE(c + O | 0, e, 44), qt.writeUint32LE(l + j | 0, e, 48), qt.writeUint32LE(E + F | 0, e, 52), qt.writeUint32LE(I + V | 0, e, 56), qt.writeUint32LE(w + C | 0, e, 60);
}
function ju(e, t, i, r, n) {
  if (n === void 0 && (n = 0), e.length !== 32)
    throw new Error("ChaCha: key size must be 32 bytes");
  if (r.length < i.length)
    throw new Error("ChaCha: destination is shorter than source");
  var s, a;
  if (n === 0) {
    if (t.length !== 8 && t.length !== 12)
      throw new Error("ChaCha nonce must be 8 or 12 bytes");
    s = new Uint8Array(16), a = s.length - t.length, s.set(t, a);
  } else {
    if (t.length !== 16)
      throw new Error("ChaCha nonce with counter must be 16 bytes");
    s = t, a = n;
  }
  for (var h = new Uint8Array(64), d = 0; d < i.length; d += 64) {
    zm(h, s, e);
    for (var f = d; f < d + 64 && f < i.length; f++)
      r[f] = i[f] ^ h[f - d];
    Dm(s, 0, a);
  }
  return ma.wipe(h), n === 0 && ma.wipe(s), r;
}
po.streamXOR = ju;
function Um(e, t, i, r) {
  return r === void 0 && (r = 0), ma.wipe(i), ju(e, t, i, i, r);
}
po.stream = Um;
function Dm(e, t, i) {
  for (var r = 1; i--; )
    r = r + (e[t] & 255) | 0, e[t] = r & 255, r >>>= 8, t++;
  if (r > 0)
    throw new Error("ChaCha: counter overflow");
}
var zu = {}, Ir = {};
Object.defineProperty(Ir, "__esModule", { value: !0 });
function Fm(e, t, i) {
  return ~(e - 1) & t | e - 1 & i;
}
Ir.select = Fm;
function Km(e, t) {
  return (e | 0) - (t | 0) - 1 >>> 31 & 1;
}
Ir.lessOrEqual = Km;
function Uu(e, t) {
  if (e.length !== t.length)
    return 0;
  for (var i = 0, r = 0; r < e.length; r++)
    i |= e[r] ^ t[r];
  return 1 & i - 1 >>> 8;
}
Ir.compare = Uu;
function Bm(e, t) {
  return e.length === 0 || t.length === 0 ? !1 : Uu(e, t) !== 0;
}
Ir.equal = Bm;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = Ir, i = ni;
  e.DIGEST_LENGTH = 16;
  var r = (
    /** @class */
    function() {
      function a(h) {
        this.digestLength = e.DIGEST_LENGTH, this._buffer = new Uint8Array(16), this._r = new Uint16Array(10), this._h = new Uint16Array(10), this._pad = new Uint16Array(8), this._leftover = 0, this._fin = 0, this._finished = !1;
        var d = h[0] | h[1] << 8;
        this._r[0] = d & 8191;
        var f = h[2] | h[3] << 8;
        this._r[1] = (d >>> 13 | f << 3) & 8191;
        var g = h[4] | h[5] << 8;
        this._r[2] = (f >>> 10 | g << 6) & 7939;
        var _ = h[6] | h[7] << 8;
        this._r[3] = (g >>> 7 | _ << 9) & 8191;
        var x = h[8] | h[9] << 8;
        this._r[4] = (_ >>> 4 | x << 12) & 255, this._r[5] = x >>> 1 & 8190;
        var A = h[10] | h[11] << 8;
        this._r[6] = (x >>> 14 | A << 2) & 8191;
        var O = h[12] | h[13] << 8;
        this._r[7] = (A >>> 11 | O << 5) & 8065;
        var j = h[14] | h[15] << 8;
        this._r[8] = (O >>> 8 | j << 8) & 8191, this._r[9] = j >>> 5 & 127, this._pad[0] = h[16] | h[17] << 8, this._pad[1] = h[18] | h[19] << 8, this._pad[2] = h[20] | h[21] << 8, this._pad[3] = h[22] | h[23] << 8, this._pad[4] = h[24] | h[25] << 8, this._pad[5] = h[26] | h[27] << 8, this._pad[6] = h[28] | h[29] << 8, this._pad[7] = h[30] | h[31] << 8;
      }
      return a.prototype._blocks = function(h, d, f) {
        for (var g = this._fin ? 0 : 2048, _ = this._h[0], x = this._h[1], A = this._h[2], O = this._h[3], j = this._h[4], F = this._h[5], V = this._h[6], C = this._h[7], K = this._h[8], N = this._h[9], U = this._r[0], D = this._r[1], v = this._r[2], T = this._r[3], Y = this._r[4], Q = this._r[5], p = this._r[6], S = this._r[7], o = this._r[8], c = this._r[9]; f >= 16; ) {
          var l = h[d + 0] | h[d + 1] << 8;
          _ += l & 8191;
          var E = h[d + 2] | h[d + 3] << 8;
          x += (l >>> 13 | E << 3) & 8191;
          var I = h[d + 4] | h[d + 5] << 8;
          A += (E >>> 10 | I << 6) & 8191;
          var w = h[d + 6] | h[d + 7] << 8;
          O += (I >>> 7 | w << 9) & 8191;
          var u = h[d + 8] | h[d + 9] << 8;
          j += (w >>> 4 | u << 12) & 8191, F += u >>> 1 & 8191;
          var m = h[d + 10] | h[d + 11] << 8;
          V += (u >>> 14 | m << 2) & 8191;
          var b = h[d + 12] | h[d + 13] << 8;
          C += (m >>> 11 | b << 5) & 8191;
          var P = h[d + 14] | h[d + 15] << 8;
          K += (b >>> 8 | P << 8) & 8191, N += P >>> 5 | g;
          var B = 0, G = B;
          G += _ * U, G += x * (5 * c), G += A * (5 * o), G += O * (5 * S), G += j * (5 * p), B = G >>> 13, G &= 8191, G += F * (5 * Q), G += V * (5 * Y), G += C * (5 * T), G += K * (5 * v), G += N * (5 * D), B += G >>> 13, G &= 8191;
          var M = B;
          M += _ * D, M += x * U, M += A * (5 * c), M += O * (5 * o), M += j * (5 * S), B = M >>> 13, M &= 8191, M += F * (5 * p), M += V * (5 * Q), M += C * (5 * Y), M += K * (5 * T), M += N * (5 * v), B += M >>> 13, M &= 8191;
          var $ = B;
          $ += _ * v, $ += x * D, $ += A * U, $ += O * (5 * c), $ += j * (5 * o), B = $ >>> 13, $ &= 8191, $ += F * (5 * S), $ += V * (5 * p), $ += C * (5 * Q), $ += K * (5 * Y), $ += N * (5 * T), B += $ >>> 13, $ &= 8191;
          var L = B;
          L += _ * T, L += x * v, L += A * D, L += O * U, L += j * (5 * c), B = L >>> 13, L &= 8191, L += F * (5 * o), L += V * (5 * S), L += C * (5 * p), L += K * (5 * Q), L += N * (5 * Y), B += L >>> 13, L &= 8191;
          var k = B;
          k += _ * Y, k += x * T, k += A * v, k += O * D, k += j * U, B = k >>> 13, k &= 8191, k += F * (5 * c), k += V * (5 * o), k += C * (5 * S), k += K * (5 * p), k += N * (5 * Q), B += k >>> 13, k &= 8191;
          var q = B;
          q += _ * Q, q += x * Y, q += A * T, q += O * v, q += j * D, B = q >>> 13, q &= 8191, q += F * U, q += V * (5 * c), q += C * (5 * o), q += K * (5 * S), q += N * (5 * p), B += q >>> 13, q &= 8191;
          var y = B;
          y += _ * p, y += x * Q, y += A * Y, y += O * T, y += j * v, B = y >>> 13, y &= 8191, y += F * D, y += V * U, y += C * (5 * c), y += K * (5 * o), y += N * (5 * S), B += y >>> 13, y &= 8191;
          var R = B;
          R += _ * S, R += x * p, R += A * Q, R += O * Y, R += j * T, B = R >>> 13, R &= 8191, R += F * v, R += V * D, R += C * U, R += K * (5 * c), R += N * (5 * o), B += R >>> 13, R &= 8191;
          var W = B;
          W += _ * o, W += x * S, W += A * p, W += O * Q, W += j * Y, B = W >>> 13, W &= 8191, W += F * T, W += V * v, W += C * D, W += K * U, W += N * (5 * c), B += W >>> 13, W &= 8191;
          var Z = B;
          Z += _ * c, Z += x * o, Z += A * S, Z += O * p, Z += j * Q, B = Z >>> 13, Z &= 8191, Z += F * Y, Z += V * T, Z += C * v, Z += K * D, Z += N * U, B += Z >>> 13, Z &= 8191, B = (B << 2) + B | 0, B = B + G | 0, G = B & 8191, B = B >>> 13, M += B, _ = G, x = M, A = $, O = L, j = k, F = q, V = y, C = R, K = W, N = Z, d += 16, f -= 16;
        }
        this._h[0] = _, this._h[1] = x, this._h[2] = A, this._h[3] = O, this._h[4] = j, this._h[5] = F, this._h[6] = V, this._h[7] = C, this._h[8] = K, this._h[9] = N;
      }, a.prototype.finish = function(h, d) {
        d === void 0 && (d = 0);
        var f = new Uint16Array(10), g, _, x, A;
        if (this._leftover) {
          for (A = this._leftover, this._buffer[A++] = 1; A < 16; A++)
            this._buffer[A] = 0;
          this._fin = 1, this._blocks(this._buffer, 0, 16);
        }
        for (g = this._h[1] >>> 13, this._h[1] &= 8191, A = 2; A < 10; A++)
          this._h[A] += g, g = this._h[A] >>> 13, this._h[A] &= 8191;
        for (this._h[0] += g * 5, g = this._h[0] >>> 13, this._h[0] &= 8191, this._h[1] += g, g = this._h[1] >>> 13, this._h[1] &= 8191, this._h[2] += g, f[0] = this._h[0] + 5, g = f[0] >>> 13, f[0] &= 8191, A = 1; A < 10; A++)
          f[A] = this._h[A] + g, g = f[A] >>> 13, f[A] &= 8191;
        for (f[9] -= 8192, _ = (g ^ 1) - 1, A = 0; A < 10; A++)
          f[A] &= _;
        for (_ = ~_, A = 0; A < 10; A++)
          this._h[A] = this._h[A] & _ | f[A];
        for (this._h[0] = (this._h[0] | this._h[1] << 13) & 65535, this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535, this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535, this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535, this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535, this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535, this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535, this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535, x = this._h[0] + this._pad[0], this._h[0] = x & 65535, A = 1; A < 8; A++)
          x = (this._h[A] + this._pad[A] | 0) + (x >>> 16) | 0, this._h[A] = x & 65535;
        return h[d + 0] = this._h[0] >>> 0, h[d + 1] = this._h[0] >>> 8, h[d + 2] = this._h[1] >>> 0, h[d + 3] = this._h[1] >>> 8, h[d + 4] = this._h[2] >>> 0, h[d + 5] = this._h[2] >>> 8, h[d + 6] = this._h[3] >>> 0, h[d + 7] = this._h[3] >>> 8, h[d + 8] = this._h[4] >>> 0, h[d + 9] = this._h[4] >>> 8, h[d + 10] = this._h[5] >>> 0, h[d + 11] = this._h[5] >>> 8, h[d + 12] = this._h[6] >>> 0, h[d + 13] = this._h[6] >>> 8, h[d + 14] = this._h[7] >>> 0, h[d + 15] = this._h[7] >>> 8, this._finished = !0, this;
      }, a.prototype.update = function(h) {
        var d = 0, f = h.length, g;
        if (this._leftover) {
          g = 16 - this._leftover, g > f && (g = f);
          for (var _ = 0; _ < g; _++)
            this._buffer[this._leftover + _] = h[d + _];
          if (f -= g, d += g, this._leftover += g, this._leftover < 16)
            return this;
          this._blocks(this._buffer, 0, 16), this._leftover = 0;
        }
        if (f >= 16 && (g = f - f % 16, this._blocks(h, d, g), d += g, f -= g), f) {
          for (var _ = 0; _ < f; _++)
            this._buffer[this._leftover + _] = h[d + _];
          this._leftover += f;
        }
        return this;
      }, a.prototype.digest = function() {
        if (this._finished)
          throw new Error("Poly1305 was finished");
        var h = new Uint8Array(16);
        return this.finish(h), h;
      }, a.prototype.clean = function() {
        return i.wipe(this._buffer), i.wipe(this._r), i.wipe(this._h), i.wipe(this._pad), this._leftover = 0, this._fin = 0, this._finished = !0, this;
      }, a;
    }()
  );
  e.Poly1305 = r;
  function n(a, h) {
    var d = new r(a);
    d.update(h);
    var f = d.digest();
    return d.clean(), f;
  }
  e.oneTimeAuth = n;
  function s(a, h) {
    return a.length !== e.DIGEST_LENGTH || h.length !== e.DIGEST_LENGTH ? !1 : t.equal(a, h);
  }
  e.equal = s;
})(zu);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = po, i = zu, r = ni, n = Ve, s = Ir;
  e.KEY_LENGTH = 32, e.NONCE_LENGTH = 12, e.TAG_LENGTH = 16;
  var a = new Uint8Array(16), h = (
    /** @class */
    function() {
      function d(f) {
        if (this.nonceLength = e.NONCE_LENGTH, this.tagLength = e.TAG_LENGTH, f.length !== e.KEY_LENGTH)
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        this._key = new Uint8Array(f);
      }
      return d.prototype.seal = function(f, g, _, x) {
        if (f.length > 16)
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        var A = new Uint8Array(16);
        A.set(f, A.length - f.length);
        var O = new Uint8Array(32);
        t.stream(this._key, A, O, 4);
        var j = g.length + this.tagLength, F;
        if (x) {
          if (x.length !== j)
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          F = x;
        } else
          F = new Uint8Array(j);
        return t.streamXOR(this._key, A, g, F, 4), this._authenticate(F.subarray(F.length - this.tagLength, F.length), O, F.subarray(0, F.length - this.tagLength), _), r.wipe(A), F;
      }, d.prototype.open = function(f, g, _, x) {
        if (f.length > 16)
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        if (g.length < this.tagLength)
          return null;
        var A = new Uint8Array(16);
        A.set(f, A.length - f.length);
        var O = new Uint8Array(32);
        t.stream(this._key, A, O, 4);
        var j = new Uint8Array(this.tagLength);
        if (this._authenticate(j, O, g.subarray(0, g.length - this.tagLength), _), !s.equal(j, g.subarray(g.length - this.tagLength, g.length)))
          return null;
        var F = g.length - this.tagLength, V;
        if (x) {
          if (x.length !== F)
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          V = x;
        } else
          V = new Uint8Array(F);
        return t.streamXOR(this._key, A, g.subarray(0, g.length - this.tagLength), V, 4), r.wipe(A), V;
      }, d.prototype.clean = function() {
        return r.wipe(this._key), this;
      }, d.prototype._authenticate = function(f, g, _, x) {
        var A = new i.Poly1305(g);
        x && (A.update(x), x.length % 16 > 0 && A.update(a.subarray(x.length % 16))), A.update(_), _.length % 16 > 0 && A.update(a.subarray(_.length % 16));
        var O = new Uint8Array(8);
        x && n.writeUint64LE(x.length, O), A.update(O), n.writeUint64LE(_.length, O), A.update(O);
        for (var j = A.digest(), F = 0; F < j.length; F++)
          f[F] = j[F];
        A.clean(), r.wipe(j), r.wipe(O);
      }, d;
    }()
  );
  e.ChaCha20Poly1305 = h;
})(ja);
var Du = {}, ns = {}, za = {};
Object.defineProperty(za, "__esModule", { value: !0 });
function $m(e) {
  return typeof e.saveState < "u" && typeof e.restoreState < "u" && typeof e.cleanSavedState < "u";
}
za.isSerializableHash = $m;
Object.defineProperty(ns, "__esModule", { value: !0 });
var Oi = za, Vm = Ir, Hm = ni, Fu = (
  /** @class */
  function() {
    function e(t, i) {
      this._finished = !1, this._inner = new t(), this._outer = new t(), this.blockSize = this._outer.blockSize, this.digestLength = this._outer.digestLength;
      var r = new Uint8Array(this.blockSize);
      i.length > this.blockSize ? this._inner.update(i).finish(r).clean() : r.set(i);
      for (var n = 0; n < r.length; n++)
        r[n] ^= 54;
      this._inner.update(r);
      for (var n = 0; n < r.length; n++)
        r[n] ^= 106;
      this._outer.update(r), Oi.isSerializableHash(this._inner) && Oi.isSerializableHash(this._outer) && (this._innerKeyedState = this._inner.saveState(), this._outerKeyedState = this._outer.saveState()), Hm.wipe(r);
    }
    return e.prototype.reset = function() {
      if (!Oi.isSerializableHash(this._inner) || !Oi.isSerializableHash(this._outer))
        throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
      return this._inner.restoreState(this._innerKeyedState), this._outer.restoreState(this._outerKeyedState), this._finished = !1, this;
    }, e.prototype.clean = function() {
      Oi.isSerializableHash(this._inner) && this._inner.cleanSavedState(this._innerKeyedState), Oi.isSerializableHash(this._outer) && this._outer.cleanSavedState(this._outerKeyedState), this._inner.clean(), this._outer.clean();
    }, e.prototype.update = function(t) {
      return this._inner.update(t), this;
    }, e.prototype.finish = function(t) {
      return this._finished ? (this._outer.finish(t), this) : (this._inner.finish(t), this._outer.update(t.subarray(0, this.digestLength)).finish(t), this._finished = !0, this);
    }, e.prototype.digest = function() {
      var t = new Uint8Array(this.digestLength);
      return this.finish(t), t;
    }, e.prototype.saveState = function() {
      if (!Oi.isSerializableHash(this._inner))
        throw new Error("hmac: can't saveState() because hash doesn't implement it");
      return this._inner.saveState();
    }, e.prototype.restoreState = function(t) {
      if (!Oi.isSerializableHash(this._inner) || !Oi.isSerializableHash(this._outer))
        throw new Error("hmac: can't restoreState() because hash doesn't implement it");
      return this._inner.restoreState(t), this._outer.restoreState(this._outerKeyedState), this._finished = !1, this;
    }, e.prototype.cleanSavedState = function(t) {
      if (!Oi.isSerializableHash(this._inner))
        throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
      this._inner.cleanSavedState(t);
    }, e;
  }()
);
ns.HMAC = Fu;
function Wm(e, t, i) {
  var r = new Fu(e, t);
  r.update(i);
  var n = r.digest();
  return r.clean(), n;
}
ns.hmac = Wm;
ns.equal = Vm.equal;
Object.defineProperty(Du, "__esModule", { value: !0 });
var fc = ns, uc = ni, Gm = (
  /** @class */
  function() {
    function e(t, i, r, n) {
      r === void 0 && (r = new Uint8Array(0)), this._counter = new Uint8Array(1), this._hash = t, this._info = n;
      var s = fc.hmac(this._hash, r, i);
      this._hmac = new fc.HMAC(t, s), this._buffer = new Uint8Array(this._hmac.digestLength), this._bufpos = this._buffer.length;
    }
    return e.prototype._fillBuffer = function() {
      this._counter[0]++;
      var t = this._counter[0];
      if (t === 0)
        throw new Error("hkdf: cannot expand more");
      this._hmac.reset(), t > 1 && this._hmac.update(this._buffer), this._info && this._hmac.update(this._info), this._hmac.update(this._counter), this._hmac.finish(this._buffer), this._bufpos = 0;
    }, e.prototype.expand = function(t) {
      for (var i = new Uint8Array(t), r = 0; r < i.length; r++)
        this._bufpos === this._buffer.length && this._fillBuffer(), i[r] = this._buffer[this._bufpos++];
      return i;
    }, e.prototype.clean = function() {
      this._hmac.clean(), uc.wipe(this._buffer), uc.wipe(this._counter), this._bufpos = 0;
    }, e;
  }()
), Ym = Du.HKDF = Gm, ss = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  var t = Ve, i = ni;
  e.DIGEST_LENGTH = 32, e.BLOCK_SIZE = 64;
  var r = (
    /** @class */
    function() {
      function h() {
        this.digestLength = e.DIGEST_LENGTH, this.blockSize = e.BLOCK_SIZE, this._state = new Int32Array(8), this._temp = new Int32Array(64), this._buffer = new Uint8Array(128), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this.reset();
      }
      return h.prototype._initState = function() {
        this._state[0] = 1779033703, this._state[1] = 3144134277, this._state[2] = 1013904242, this._state[3] = 2773480762, this._state[4] = 1359893119, this._state[5] = 2600822924, this._state[6] = 528734635, this._state[7] = 1541459225;
      }, h.prototype.reset = function() {
        return this._initState(), this._bufferLength = 0, this._bytesHashed = 0, this._finished = !1, this;
      }, h.prototype.clean = function() {
        i.wipe(this._buffer), i.wipe(this._temp), this.reset();
      }, h.prototype.update = function(d, f) {
        if (f === void 0 && (f = d.length), this._finished)
          throw new Error("SHA256: can't update because hash was finished.");
        var g = 0;
        if (this._bytesHashed += f, this._bufferLength > 0) {
          for (; this._bufferLength < this.blockSize && f > 0; )
            this._buffer[this._bufferLength++] = d[g++], f--;
          this._bufferLength === this.blockSize && (s(this._temp, this._state, this._buffer, 0, this.blockSize), this._bufferLength = 0);
        }
        for (f >= this.blockSize && (g = s(this._temp, this._state, d, g, f), f %= this.blockSize); f > 0; )
          this._buffer[this._bufferLength++] = d[g++], f--;
        return this;
      }, h.prototype.finish = function(d) {
        if (!this._finished) {
          var f = this._bytesHashed, g = this._bufferLength, _ = f / 536870912 | 0, x = f << 3, A = f % 64 < 56 ? 64 : 128;
          this._buffer[g] = 128;
          for (var O = g + 1; O < A - 8; O++)
            this._buffer[O] = 0;
          t.writeUint32BE(_, this._buffer, A - 8), t.writeUint32BE(x, this._buffer, A - 4), s(this._temp, this._state, this._buffer, 0, A), this._finished = !0;
        }
        for (var O = 0; O < this.digestLength / 4; O++)
          t.writeUint32BE(this._state[O], d, O * 4);
        return this;
      }, h.prototype.digest = function() {
        var d = new Uint8Array(this.digestLength);
        return this.finish(d), d;
      }, h.prototype.saveState = function() {
        if (this._finished)
          throw new Error("SHA256: cannot save finished state");
        return {
          state: new Int32Array(this._state),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      }, h.prototype.restoreState = function(d) {
        return this._state.set(d.state), this._bufferLength = d.bufferLength, d.buffer && this._buffer.set(d.buffer), this._bytesHashed = d.bytesHashed, this._finished = !1, this;
      }, h.prototype.cleanSavedState = function(d) {
        i.wipe(d.state), d.buffer && i.wipe(d.buffer), d.bufferLength = 0, d.bytesHashed = 0;
      }, h;
    }()
  );
  e.SHA256 = r;
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
  function s(h, d, f, g, _) {
    for (; _ >= 64; ) {
      for (var x = d[0], A = d[1], O = d[2], j = d[3], F = d[4], V = d[5], C = d[6], K = d[7], N = 0; N < 16; N++) {
        var U = g + N * 4;
        h[N] = t.readUint32BE(f, U);
      }
      for (var N = 16; N < 64; N++) {
        var D = h[N - 2], v = (D >>> 17 | D << 15) ^ (D >>> 19 | D << 13) ^ D >>> 10;
        D = h[N - 15];
        var T = (D >>> 7 | D << 25) ^ (D >>> 18 | D << 14) ^ D >>> 3;
        h[N] = (v + h[N - 7] | 0) + (T + h[N - 16] | 0);
      }
      for (var N = 0; N < 64; N++) {
        var v = (((F >>> 6 | F << 26) ^ (F >>> 11 | F << 21) ^ (F >>> 25 | F << 7)) + (F & V ^ ~F & C) | 0) + (K + (n[N] + h[N] | 0) | 0) | 0, T = ((x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)) + (x & A ^ x & O ^ A & O) | 0;
        K = C, C = V, V = F, F = j + v | 0, j = O, O = A, A = x, x = v + T | 0;
      }
      d[0] += x, d[1] += A, d[2] += O, d[3] += j, d[4] += F, d[5] += V, d[6] += C, d[7] += K, g += 64, _ -= 64;
    }
    return g;
  }
  function a(h) {
    var d = new r();
    d.update(h);
    var f = d.digest();
    return d.clean(), f;
  }
  e.hash = a;
})(ss);
var Ua = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.sharedKey = e.generateKeyPair = e.generateKeyPairFromSeed = e.scalarMultBase = e.scalarMult = e.SHARED_KEY_LENGTH = e.SECRET_KEY_LENGTH = e.PUBLIC_KEY_LENGTH = void 0;
  const t = Er, i = ni;
  e.PUBLIC_KEY_LENGTH = 32, e.SECRET_KEY_LENGTH = 32, e.SHARED_KEY_LENGTH = 32;
  function r(N) {
    const U = new Float64Array(16);
    if (N)
      for (let D = 0; D < N.length; D++)
        U[D] = N[D];
    return U;
  }
  const n = new Uint8Array(32);
  n[0] = 9;
  const s = r([56129, 1]);
  function a(N) {
    let U = 1;
    for (let D = 0; D < 16; D++) {
      let v = N[D] + U + 65535;
      U = Math.floor(v / 65536), N[D] = v - U * 65536;
    }
    N[0] += U - 1 + 37 * (U - 1);
  }
  function h(N, U, D) {
    const v = ~(D - 1);
    for (let T = 0; T < 16; T++) {
      const Y = v & (N[T] ^ U[T]);
      N[T] ^= Y, U[T] ^= Y;
    }
  }
  function d(N, U) {
    const D = r(), v = r();
    for (let T = 0; T < 16; T++)
      v[T] = U[T];
    a(v), a(v), a(v);
    for (let T = 0; T < 2; T++) {
      D[0] = v[0] - 65517;
      for (let Q = 1; Q < 15; Q++)
        D[Q] = v[Q] - 65535 - (D[Q - 1] >> 16 & 1), D[Q - 1] &= 65535;
      D[15] = v[15] - 32767 - (D[14] >> 16 & 1);
      const Y = D[15] >> 16 & 1;
      D[14] &= 65535, h(v, D, 1 - Y);
    }
    for (let T = 0; T < 16; T++)
      N[2 * T] = v[T] & 255, N[2 * T + 1] = v[T] >> 8;
  }
  function f(N, U) {
    for (let D = 0; D < 16; D++)
      N[D] = U[2 * D] + (U[2 * D + 1] << 8);
    N[15] &= 32767;
  }
  function g(N, U, D) {
    for (let v = 0; v < 16; v++)
      N[v] = U[v] + D[v];
  }
  function _(N, U, D) {
    for (let v = 0; v < 16; v++)
      N[v] = U[v] - D[v];
  }
  function x(N, U, D) {
    let v, T, Y = 0, Q = 0, p = 0, S = 0, o = 0, c = 0, l = 0, E = 0, I = 0, w = 0, u = 0, m = 0, b = 0, P = 0, B = 0, G = 0, M = 0, $ = 0, L = 0, k = 0, q = 0, y = 0, R = 0, W = 0, Z = 0, J = 0, oe = 0, Ee = 0, he = 0, Re = 0, Pe = 0, se = D[0], Se = D[1], ve = D[2], ie = D[3], ge = D[4], pe = D[5], ee = D[6], fe = D[7], me = D[8], re = D[9], ue = D[10], Ie = D[11], ae = D[12], Me = D[13], Ae = D[14], ce = D[15];
    v = U[0], Y += v * se, Q += v * Se, p += v * ve, S += v * ie, o += v * ge, c += v * pe, l += v * ee, E += v * fe, I += v * me, w += v * re, u += v * ue, m += v * Ie, b += v * ae, P += v * Me, B += v * Ae, G += v * ce, v = U[1], Q += v * se, p += v * Se, S += v * ve, o += v * ie, c += v * ge, l += v * pe, E += v * ee, I += v * fe, w += v * me, u += v * re, m += v * ue, b += v * Ie, P += v * ae, B += v * Me, G += v * Ae, M += v * ce, v = U[2], p += v * se, S += v * Se, o += v * ve, c += v * ie, l += v * ge, E += v * pe, I += v * ee, w += v * fe, u += v * me, m += v * re, b += v * ue, P += v * Ie, B += v * ae, G += v * Me, M += v * Ae, $ += v * ce, v = U[3], S += v * se, o += v * Se, c += v * ve, l += v * ie, E += v * ge, I += v * pe, w += v * ee, u += v * fe, m += v * me, b += v * re, P += v * ue, B += v * Ie, G += v * ae, M += v * Me, $ += v * Ae, L += v * ce, v = U[4], o += v * se, c += v * Se, l += v * ve, E += v * ie, I += v * ge, w += v * pe, u += v * ee, m += v * fe, b += v * me, P += v * re, B += v * ue, G += v * Ie, M += v * ae, $ += v * Me, L += v * Ae, k += v * ce, v = U[5], c += v * se, l += v * Se, E += v * ve, I += v * ie, w += v * ge, u += v * pe, m += v * ee, b += v * fe, P += v * me, B += v * re, G += v * ue, M += v * Ie, $ += v * ae, L += v * Me, k += v * Ae, q += v * ce, v = U[6], l += v * se, E += v * Se, I += v * ve, w += v * ie, u += v * ge, m += v * pe, b += v * ee, P += v * fe, B += v * me, G += v * re, M += v * ue, $ += v * Ie, L += v * ae, k += v * Me, q += v * Ae, y += v * ce, v = U[7], E += v * se, I += v * Se, w += v * ve, u += v * ie, m += v * ge, b += v * pe, P += v * ee, B += v * fe, G += v * me, M += v * re, $ += v * ue, L += v * Ie, k += v * ae, q += v * Me, y += v * Ae, R += v * ce, v = U[8], I += v * se, w += v * Se, u += v * ve, m += v * ie, b += v * ge, P += v * pe, B += v * ee, G += v * fe, M += v * me, $ += v * re, L += v * ue, k += v * Ie, q += v * ae, y += v * Me, R += v * Ae, W += v * ce, v = U[9], w += v * se, u += v * Se, m += v * ve, b += v * ie, P += v * ge, B += v * pe, G += v * ee, M += v * fe, $ += v * me, L += v * re, k += v * ue, q += v * Ie, y += v * ae, R += v * Me, W += v * Ae, Z += v * ce, v = U[10], u += v * se, m += v * Se, b += v * ve, P += v * ie, B += v * ge, G += v * pe, M += v * ee, $ += v * fe, L += v * me, k += v * re, q += v * ue, y += v * Ie, R += v * ae, W += v * Me, Z += v * Ae, J += v * ce, v = U[11], m += v * se, b += v * Se, P += v * ve, B += v * ie, G += v * ge, M += v * pe, $ += v * ee, L += v * fe, k += v * me, q += v * re, y += v * ue, R += v * Ie, W += v * ae, Z += v * Me, J += v * Ae, oe += v * ce, v = U[12], b += v * se, P += v * Se, B += v * ve, G += v * ie, M += v * ge, $ += v * pe, L += v * ee, k += v * fe, q += v * me, y += v * re, R += v * ue, W += v * Ie, Z += v * ae, J += v * Me, oe += v * Ae, Ee += v * ce, v = U[13], P += v * se, B += v * Se, G += v * ve, M += v * ie, $ += v * ge, L += v * pe, k += v * ee, q += v * fe, y += v * me, R += v * re, W += v * ue, Z += v * Ie, J += v * ae, oe += v * Me, Ee += v * Ae, he += v * ce, v = U[14], B += v * se, G += v * Se, M += v * ve, $ += v * ie, L += v * ge, k += v * pe, q += v * ee, y += v * fe, R += v * me, W += v * re, Z += v * ue, J += v * Ie, oe += v * ae, Ee += v * Me, he += v * Ae, Re += v * ce, v = U[15], G += v * se, M += v * Se, $ += v * ve, L += v * ie, k += v * ge, q += v * pe, y += v * ee, R += v * fe, W += v * me, Z += v * re, J += v * ue, oe += v * Ie, Ee += v * ae, he += v * Me, Re += v * Ae, Pe += v * ce, Y += 38 * M, Q += 38 * $, p += 38 * L, S += 38 * k, o += 38 * q, c += 38 * y, l += 38 * R, E += 38 * W, I += 38 * Z, w += 38 * J, u += 38 * oe, m += 38 * Ee, b += 38 * he, P += 38 * Re, B += 38 * Pe, T = 1, v = Y + T + 65535, T = Math.floor(v / 65536), Y = v - T * 65536, v = Q + T + 65535, T = Math.floor(v / 65536), Q = v - T * 65536, v = p + T + 65535, T = Math.floor(v / 65536), p = v - T * 65536, v = S + T + 65535, T = Math.floor(v / 65536), S = v - T * 65536, v = o + T + 65535, T = Math.floor(v / 65536), o = v - T * 65536, v = c + T + 65535, T = Math.floor(v / 65536), c = v - T * 65536, v = l + T + 65535, T = Math.floor(v / 65536), l = v - T * 65536, v = E + T + 65535, T = Math.floor(v / 65536), E = v - T * 65536, v = I + T + 65535, T = Math.floor(v / 65536), I = v - T * 65536, v = w + T + 65535, T = Math.floor(v / 65536), w = v - T * 65536, v = u + T + 65535, T = Math.floor(v / 65536), u = v - T * 65536, v = m + T + 65535, T = Math.floor(v / 65536), m = v - T * 65536, v = b + T + 65535, T = Math.floor(v / 65536), b = v - T * 65536, v = P + T + 65535, T = Math.floor(v / 65536), P = v - T * 65536, v = B + T + 65535, T = Math.floor(v / 65536), B = v - T * 65536, v = G + T + 65535, T = Math.floor(v / 65536), G = v - T * 65536, Y += T - 1 + 37 * (T - 1), T = 1, v = Y + T + 65535, T = Math.floor(v / 65536), Y = v - T * 65536, v = Q + T + 65535, T = Math.floor(v / 65536), Q = v - T * 65536, v = p + T + 65535, T = Math.floor(v / 65536), p = v - T * 65536, v = S + T + 65535, T = Math.floor(v / 65536), S = v - T * 65536, v = o + T + 65535, T = Math.floor(v / 65536), o = v - T * 65536, v = c + T + 65535, T = Math.floor(v / 65536), c = v - T * 65536, v = l + T + 65535, T = Math.floor(v / 65536), l = v - T * 65536, v = E + T + 65535, T = Math.floor(v / 65536), E = v - T * 65536, v = I + T + 65535, T = Math.floor(v / 65536), I = v - T * 65536, v = w + T + 65535, T = Math.floor(v / 65536), w = v - T * 65536, v = u + T + 65535, T = Math.floor(v / 65536), u = v - T * 65536, v = m + T + 65535, T = Math.floor(v / 65536), m = v - T * 65536, v = b + T + 65535, T = Math.floor(v / 65536), b = v - T * 65536, v = P + T + 65535, T = Math.floor(v / 65536), P = v - T * 65536, v = B + T + 65535, T = Math.floor(v / 65536), B = v - T * 65536, v = G + T + 65535, T = Math.floor(v / 65536), G = v - T * 65536, Y += T - 1 + 37 * (T - 1), N[0] = Y, N[1] = Q, N[2] = p, N[3] = S, N[4] = o, N[5] = c, N[6] = l, N[7] = E, N[8] = I, N[9] = w, N[10] = u, N[11] = m, N[12] = b, N[13] = P, N[14] = B, N[15] = G;
  }
  function A(N, U) {
    x(N, U, U);
  }
  function O(N, U) {
    const D = r();
    for (let v = 0; v < 16; v++)
      D[v] = U[v];
    for (let v = 253; v >= 0; v--)
      A(D, D), v !== 2 && v !== 4 && x(D, D, U);
    for (let v = 0; v < 16; v++)
      N[v] = D[v];
  }
  function j(N, U) {
    const D = new Uint8Array(32), v = new Float64Array(80), T = r(), Y = r(), Q = r(), p = r(), S = r(), o = r();
    for (let I = 0; I < 31; I++)
      D[I] = N[I];
    D[31] = N[31] & 127 | 64, D[0] &= 248, f(v, U);
    for (let I = 0; I < 16; I++)
      Y[I] = v[I];
    T[0] = p[0] = 1;
    for (let I = 254; I >= 0; --I) {
      const w = D[I >>> 3] >>> (I & 7) & 1;
      h(T, Y, w), h(Q, p, w), g(S, T, Q), _(T, T, Q), g(Q, Y, p), _(Y, Y, p), A(p, S), A(o, T), x(T, Q, T), x(Q, Y, S), g(S, T, Q), _(T, T, Q), A(Y, T), _(Q, p, o), x(T, Q, s), g(T, T, p), x(Q, Q, T), x(T, p, o), x(p, Y, v), A(Y, S), h(T, Y, w), h(Q, p, w);
    }
    for (let I = 0; I < 16; I++)
      v[I + 16] = T[I], v[I + 32] = Q[I], v[I + 48] = Y[I], v[I + 64] = p[I];
    const c = v.subarray(32), l = v.subarray(16);
    O(c, c), x(l, l, c);
    const E = new Uint8Array(32);
    return d(E, l), E;
  }
  e.scalarMult = j;
  function F(N) {
    return j(N, n);
  }
  e.scalarMultBase = F;
  function V(N) {
    if (N.length !== e.SECRET_KEY_LENGTH)
      throw new Error(`x25519: seed must be ${e.SECRET_KEY_LENGTH} bytes`);
    const U = new Uint8Array(N);
    return {
      publicKey: F(U),
      secretKey: U
    };
  }
  e.generateKeyPairFromSeed = V;
  function C(N) {
    const U = (0, t.randomBytes)(32, N), D = V(U);
    return (0, i.wipe)(U), D;
  }
  e.generateKeyPair = C;
  function K(N, U, D = !1) {
    if (N.length !== e.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect secret key length");
    if (U.length !== e.PUBLIC_KEY_LENGTH)
      throw new Error("X25519: incorrect public key length");
    const v = j(N, U);
    if (D) {
      let T = 0;
      for (let Y = 0; Y < v.length; Y++)
        T |= v[Y];
      if (T === 0)
        throw new Error("X25519: invalid shared key");
    }
    return v;
  }
  e.sharedKey = K;
})(Ua);
var Ku = {};
const Jm = "6.6.1", Zm = {
  version: Jm
};
var oi = {}, Bu = { exports: {} };
(function(e) {
  (function(t, i) {
    function r(p, S) {
      if (!p)
        throw new Error(S || "Assertion failed");
    }
    function n(p, S) {
      p.super_ = S;
      var o = function() {
      };
      o.prototype = S.prototype, p.prototype = new o(), p.prototype.constructor = p;
    }
    function s(p, S, o) {
      if (s.isBN(p))
        return p;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, p !== null && ((S === "le" || S === "be") && (o = S, S = 10), this._init(p || 0, S || 10, o || "be"));
    }
    typeof t == "object" ? t.exports = s : i.BN = s, s.BN = s, s.wordSize = 26;
    var a;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = oo.Buffer;
    } catch {
    }
    s.isBN = function(p) {
      return p instanceof s ? !0 : p !== null && typeof p == "object" && p.constructor.wordSize === s.wordSize && Array.isArray(p.words);
    }, s.max = function(p, S) {
      return p.cmp(S) > 0 ? p : S;
    }, s.min = function(p, S) {
      return p.cmp(S) < 0 ? p : S;
    }, s.prototype._init = function(p, S, o) {
      if (typeof p == "number")
        return this._initNumber(p, S, o);
      if (typeof p == "object")
        return this._initArray(p, S, o);
      S === "hex" && (S = 16), r(S === (S | 0) && S >= 2 && S <= 36), p = p.toString().replace(/\s+/g, "");
      var c = 0;
      p[0] === "-" && (c++, this.negative = 1), c < p.length && (S === 16 ? this._parseHex(p, c, o) : (this._parseBase(p, S, c), o === "le" && this._initArray(this.toArray(), S, o)));
    }, s.prototype._initNumber = function(p, S, o) {
      p < 0 && (this.negative = 1, p = -p), p < 67108864 ? (this.words = [p & 67108863], this.length = 1) : p < 4503599627370496 ? (this.words = [
        p & 67108863,
        p / 67108864 & 67108863
      ], this.length = 2) : (r(p < 9007199254740992), this.words = [
        p & 67108863,
        p / 67108864 & 67108863,
        1
      ], this.length = 3), o === "le" && this._initArray(this.toArray(), S, o);
    }, s.prototype._initArray = function(p, S, o) {
      if (r(typeof p.length == "number"), p.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(p.length / 3), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var l, E, I = 0;
      if (o === "be")
        for (c = p.length - 1, l = 0; c >= 0; c -= 3)
          E = p[c] | p[c - 1] << 8 | p[c - 2] << 16, this.words[l] |= E << I & 67108863, this.words[l + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, l++);
      else if (o === "le")
        for (c = 0, l = 0; c < p.length; c += 3)
          E = p[c] | p[c + 1] << 8 | p[c + 2] << 16, this.words[l] |= E << I & 67108863, this.words[l + 1] = E >>> 26 - I & 67108863, I += 24, I >= 26 && (I -= 26, l++);
      return this.strip();
    };
    function h(p, S) {
      var o = p.charCodeAt(S);
      return o >= 65 && o <= 70 ? o - 55 : o >= 97 && o <= 102 ? o - 87 : o - 48 & 15;
    }
    function d(p, S, o) {
      var c = h(p, o);
      return o - 1 >= S && (c |= h(p, o - 1) << 4), c;
    }
    s.prototype._parseHex = function(p, S, o) {
      this.length = Math.ceil((p.length - S) / 6), this.words = new Array(this.length);
      for (var c = 0; c < this.length; c++)
        this.words[c] = 0;
      var l = 0, E = 0, I;
      if (o === "be")
        for (c = p.length - 1; c >= S; c -= 2)
          I = d(p, S, c) << l, this.words[E] |= I & 67108863, l >= 18 ? (l -= 18, E += 1, this.words[E] |= I >>> 26) : l += 8;
      else {
        var w = p.length - S;
        for (c = w % 2 === 0 ? S + 1 : S; c < p.length; c += 2)
          I = d(p, S, c) << l, this.words[E] |= I & 67108863, l >= 18 ? (l -= 18, E += 1, this.words[E] |= I >>> 26) : l += 8;
      }
      this.strip();
    };
    function f(p, S, o, c) {
      for (var l = 0, E = Math.min(p.length, o), I = S; I < E; I++) {
        var w = p.charCodeAt(I) - 48;
        l *= c, w >= 49 ? l += w - 49 + 10 : w >= 17 ? l += w - 17 + 10 : l += w;
      }
      return l;
    }
    s.prototype._parseBase = function(p, S, o) {
      this.words = [0], this.length = 1;
      for (var c = 0, l = 1; l <= 67108863; l *= S)
        c++;
      c--, l = l / S | 0;
      for (var E = p.length - o, I = E % c, w = Math.min(E, E - I) + o, u = 0, m = o; m < w; m += c)
        u = f(p, m, m + c, S), this.imuln(l), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      if (I !== 0) {
        var b = 1;
        for (u = f(p, m, p.length, S), m = 0; m < I; m++)
          b *= S;
        this.imuln(b), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
      }
      this.strip();
    }, s.prototype.copy = function(p) {
      p.words = new Array(this.length);
      for (var S = 0; S < this.length; S++)
        p.words[S] = this.words[S];
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
    var g = [
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
    ], _ = [
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
    ], x = [
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
    s.prototype.toString = function(p, S) {
      p = p || 10, S = S | 0 || 1;
      var o;
      if (p === 16 || p === "hex") {
        o = "";
        for (var c = 0, l = 0, E = 0; E < this.length; E++) {
          var I = this.words[E], w = ((I << c | l) & 16777215).toString(16);
          l = I >>> 24 - c & 16777215, c += 2, c >= 26 && (c -= 26, E--), l !== 0 || E !== this.length - 1 ? o = g[6 - w.length] + w + o : o = w + o;
        }
        for (l !== 0 && (o = l.toString(16) + o); o.length % S !== 0; )
          o = "0" + o;
        return this.negative !== 0 && (o = "-" + o), o;
      }
      if (p === (p | 0) && p >= 2 && p <= 36) {
        var u = _[p], m = x[p];
        o = "";
        var b = this.clone();
        for (b.negative = 0; !b.isZero(); ) {
          var P = b.modn(m).toString(p);
          b = b.idivn(m), b.isZero() ? o = P + o : o = g[u - P.length] + P + o;
        }
        for (this.isZero() && (o = "0" + o); o.length % S !== 0; )
          o = "0" + o;
        return this.negative !== 0 && (o = "-" + o), o;
      }
      r(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var p = this.words[0];
      return this.length === 2 ? p += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? p += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -p : p;
    }, s.prototype.toJSON = function() {
      return this.toString(16);
    }, s.prototype.toBuffer = function(p, S) {
      return r(typeof a < "u"), this.toArrayLike(a, p, S);
    }, s.prototype.toArray = function(p, S) {
      return this.toArrayLike(Array, p, S);
    }, s.prototype.toArrayLike = function(p, S, o) {
      var c = this.byteLength(), l = o || Math.max(1, c);
      r(c <= l, "byte array longer than desired length"), r(l > 0, "Requested array length <= 0"), this.strip();
      var E = S === "le", I = new p(l), w, u, m = this.clone();
      if (E) {
        for (u = 0; !m.isZero(); u++)
          w = m.andln(255), m.iushrn(8), I[u] = w;
        for (; u < l; u++)
          I[u] = 0;
      } else {
        for (u = 0; u < l - c; u++)
          I[u] = 0;
        for (u = 0; !m.isZero(); u++)
          w = m.andln(255), m.iushrn(8), I[l - u - 1] = w;
      }
      return I;
    }, Math.clz32 ? s.prototype._countBits = function(p) {
      return 32 - Math.clz32(p);
    } : s.prototype._countBits = function(p) {
      var S = p, o = 0;
      return S >= 4096 && (o += 13, S >>>= 13), S >= 64 && (o += 7, S >>>= 7), S >= 8 && (o += 4, S >>>= 4), S >= 2 && (o += 2, S >>>= 2), o + S;
    }, s.prototype._zeroBits = function(p) {
      if (p === 0)
        return 26;
      var S = p, o = 0;
      return S & 8191 || (o += 13, S >>>= 13), S & 127 || (o += 7, S >>>= 7), S & 15 || (o += 4, S >>>= 4), S & 3 || (o += 2, S >>>= 2), S & 1 || o++, o;
    }, s.prototype.bitLength = function() {
      var p = this.words[this.length - 1], S = this._countBits(p);
      return (this.length - 1) * 26 + S;
    };
    function A(p) {
      for (var S = new Array(p.bitLength()), o = 0; o < S.length; o++) {
        var c = o / 26 | 0, l = o % 26;
        S[o] = (p.words[c] & 1 << l) >>> l;
      }
      return S;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var p = 0, S = 0; S < this.length; S++) {
        var o = this._zeroBits(this.words[S]);
        if (p += o, o !== 26)
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
      for (var S = 0; S < p.length; S++)
        this.words[S] = this.words[S] | p.words[S];
      return this.strip();
    }, s.prototype.ior = function(p) {
      return r((this.negative | p.negative) === 0), this.iuor(p);
    }, s.prototype.or = function(p) {
      return this.length > p.length ? this.clone().ior(p) : p.clone().ior(this);
    }, s.prototype.uor = function(p) {
      return this.length > p.length ? this.clone().iuor(p) : p.clone().iuor(this);
    }, s.prototype.iuand = function(p) {
      var S;
      this.length > p.length ? S = p : S = this;
      for (var o = 0; o < S.length; o++)
        this.words[o] = this.words[o] & p.words[o];
      return this.length = S.length, this.strip();
    }, s.prototype.iand = function(p) {
      return r((this.negative | p.negative) === 0), this.iuand(p);
    }, s.prototype.and = function(p) {
      return this.length > p.length ? this.clone().iand(p) : p.clone().iand(this);
    }, s.prototype.uand = function(p) {
      return this.length > p.length ? this.clone().iuand(p) : p.clone().iuand(this);
    }, s.prototype.iuxor = function(p) {
      var S, o;
      this.length > p.length ? (S = this, o = p) : (S = p, o = this);
      for (var c = 0; c < o.length; c++)
        this.words[c] = S.words[c] ^ o.words[c];
      if (this !== S)
        for (; c < S.length; c++)
          this.words[c] = S.words[c];
      return this.length = S.length, this.strip();
    }, s.prototype.ixor = function(p) {
      return r((this.negative | p.negative) === 0), this.iuxor(p);
    }, s.prototype.xor = function(p) {
      return this.length > p.length ? this.clone().ixor(p) : p.clone().ixor(this);
    }, s.prototype.uxor = function(p) {
      return this.length > p.length ? this.clone().iuxor(p) : p.clone().iuxor(this);
    }, s.prototype.inotn = function(p) {
      r(typeof p == "number" && p >= 0);
      var S = Math.ceil(p / 26) | 0, o = p % 26;
      this._expand(S), o > 0 && S--;
      for (var c = 0; c < S; c++)
        this.words[c] = ~this.words[c] & 67108863;
      return o > 0 && (this.words[c] = ~this.words[c] & 67108863 >> 26 - o), this.strip();
    }, s.prototype.notn = function(p) {
      return this.clone().inotn(p);
    }, s.prototype.setn = function(p, S) {
      r(typeof p == "number" && p >= 0);
      var o = p / 26 | 0, c = p % 26;
      return this._expand(o + 1), S ? this.words[o] = this.words[o] | 1 << c : this.words[o] = this.words[o] & ~(1 << c), this.strip();
    }, s.prototype.iadd = function(p) {
      var S;
      if (this.negative !== 0 && p.negative === 0)
        return this.negative = 0, S = this.isub(p), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && p.negative !== 0)
        return p.negative = 0, S = this.isub(p), p.negative = 1, S._normSign();
      var o, c;
      this.length > p.length ? (o = this, c = p) : (o = p, c = this);
      for (var l = 0, E = 0; E < c.length; E++)
        S = (o.words[E] | 0) + (c.words[E] | 0) + l, this.words[E] = S & 67108863, l = S >>> 26;
      for (; l !== 0 && E < o.length; E++)
        S = (o.words[E] | 0) + l, this.words[E] = S & 67108863, l = S >>> 26;
      if (this.length = o.length, l !== 0)
        this.words[this.length] = l, this.length++;
      else if (o !== this)
        for (; E < o.length; E++)
          this.words[E] = o.words[E];
      return this;
    }, s.prototype.add = function(p) {
      var S;
      return p.negative !== 0 && this.negative === 0 ? (p.negative = 0, S = this.sub(p), p.negative ^= 1, S) : p.negative === 0 && this.negative !== 0 ? (this.negative = 0, S = p.sub(this), this.negative = 1, S) : this.length > p.length ? this.clone().iadd(p) : p.clone().iadd(this);
    }, s.prototype.isub = function(p) {
      if (p.negative !== 0) {
        p.negative = 0;
        var S = this.iadd(p);
        return p.negative = 1, S._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(p), this.negative = 1, this._normSign();
      var o = this.cmp(p);
      if (o === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var c, l;
      o > 0 ? (c = this, l = p) : (c = p, l = this);
      for (var E = 0, I = 0; I < l.length; I++)
        S = (c.words[I] | 0) - (l.words[I] | 0) + E, E = S >> 26, this.words[I] = S & 67108863;
      for (; E !== 0 && I < c.length; I++)
        S = (c.words[I] | 0) + E, E = S >> 26, this.words[I] = S & 67108863;
      if (E === 0 && I < c.length && c !== this)
        for (; I < c.length; I++)
          this.words[I] = c.words[I];
      return this.length = Math.max(this.length, I), c !== this && (this.negative = 1), this.strip();
    }, s.prototype.sub = function(p) {
      return this.clone().isub(p);
    };
    function O(p, S, o) {
      o.negative = S.negative ^ p.negative;
      var c = p.length + S.length | 0;
      o.length = c, c = c - 1 | 0;
      var l = p.words[0] | 0, E = S.words[0] | 0, I = l * E, w = I & 67108863, u = I / 67108864 | 0;
      o.words[0] = w;
      for (var m = 1; m < c; m++) {
        for (var b = u >>> 26, P = u & 67108863, B = Math.min(m, S.length - 1), G = Math.max(0, m - p.length + 1); G <= B; G++) {
          var M = m - G | 0;
          l = p.words[M] | 0, E = S.words[G] | 0, I = l * E + P, b += I / 67108864 | 0, P = I & 67108863;
        }
        o.words[m] = P | 0, u = b | 0;
      }
      return u !== 0 ? o.words[m] = u | 0 : o.length--, o.strip();
    }
    var j = function(p, S, o) {
      var c = p.words, l = S.words, E = o.words, I = 0, w, u, m, b = c[0] | 0, P = b & 8191, B = b >>> 13, G = c[1] | 0, M = G & 8191, $ = G >>> 13, L = c[2] | 0, k = L & 8191, q = L >>> 13, y = c[3] | 0, R = y & 8191, W = y >>> 13, Z = c[4] | 0, J = Z & 8191, oe = Z >>> 13, Ee = c[5] | 0, he = Ee & 8191, Re = Ee >>> 13, Pe = c[6] | 0, se = Pe & 8191, Se = Pe >>> 13, ve = c[7] | 0, ie = ve & 8191, ge = ve >>> 13, pe = c[8] | 0, ee = pe & 8191, fe = pe >>> 13, me = c[9] | 0, re = me & 8191, ue = me >>> 13, Ie = l[0] | 0, ae = Ie & 8191, Me = Ie >>> 13, Ae = l[1] | 0, ce = Ae & 8191, We = Ae >>> 13, Ye = l[2] | 0, xe = Ye & 8191, $e = Ye >>> 13, Xe = l[3] | 0, Oe = Xe & 8191, et = Xe >>> 13, Te = l[4] | 0, le = Te & 8191, ke = Te >>> 13, Le = l[5] | 0, be = Le & 8191, Ne = Le >>> 13, ze = l[6] | 0, we = ze & 8191, Ue = ze >>> 13, De = l[7] | 0, _e = De & 8191, qe = De >>> 13, Ce = l[8] | 0, de = Ce & 8191, Fe = Ce >>> 13, Ke = l[9] | 0, je = Ke & 8191, it = Ke >>> 13;
      o.negative = p.negative ^ S.negative, o.length = 19, w = Math.imul(P, ae), u = Math.imul(P, Me), u = u + Math.imul(B, ae) | 0, m = Math.imul(B, Me);
      var tt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (tt >>> 26) | 0, tt &= 67108863, w = Math.imul(M, ae), u = Math.imul(M, Me), u = u + Math.imul($, ae) | 0, m = Math.imul($, Me), w = w + Math.imul(P, ce) | 0, u = u + Math.imul(P, We) | 0, u = u + Math.imul(B, ce) | 0, m = m + Math.imul(B, We) | 0;
      var Je = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, w = Math.imul(k, ae), u = Math.imul(k, Me), u = u + Math.imul(q, ae) | 0, m = Math.imul(q, Me), w = w + Math.imul(M, ce) | 0, u = u + Math.imul(M, We) | 0, u = u + Math.imul($, ce) | 0, m = m + Math.imul($, We) | 0, w = w + Math.imul(P, xe) | 0, u = u + Math.imul(P, $e) | 0, u = u + Math.imul(B, xe) | 0, m = m + Math.imul(B, $e) | 0;
      var Kt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Kt >>> 26) | 0, Kt &= 67108863, w = Math.imul(R, ae), u = Math.imul(R, Me), u = u + Math.imul(W, ae) | 0, m = Math.imul(W, Me), w = w + Math.imul(k, ce) | 0, u = u + Math.imul(k, We) | 0, u = u + Math.imul(q, ce) | 0, m = m + Math.imul(q, We) | 0, w = w + Math.imul(M, xe) | 0, u = u + Math.imul(M, $e) | 0, u = u + Math.imul($, xe) | 0, m = m + Math.imul($, $e) | 0, w = w + Math.imul(P, Oe) | 0, u = u + Math.imul(P, et) | 0, u = u + Math.imul(B, Oe) | 0, m = m + Math.imul(B, et) | 0;
      var Bt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, w = Math.imul(J, ae), u = Math.imul(J, Me), u = u + Math.imul(oe, ae) | 0, m = Math.imul(oe, Me), w = w + Math.imul(R, ce) | 0, u = u + Math.imul(R, We) | 0, u = u + Math.imul(W, ce) | 0, m = m + Math.imul(W, We) | 0, w = w + Math.imul(k, xe) | 0, u = u + Math.imul(k, $e) | 0, u = u + Math.imul(q, xe) | 0, m = m + Math.imul(q, $e) | 0, w = w + Math.imul(M, Oe) | 0, u = u + Math.imul(M, et) | 0, u = u + Math.imul($, Oe) | 0, m = m + Math.imul($, et) | 0, w = w + Math.imul(P, le) | 0, u = u + Math.imul(P, ke) | 0, u = u + Math.imul(B, le) | 0, m = m + Math.imul(B, ke) | 0;
      var $t = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, w = Math.imul(he, ae), u = Math.imul(he, Me), u = u + Math.imul(Re, ae) | 0, m = Math.imul(Re, Me), w = w + Math.imul(J, ce) | 0, u = u + Math.imul(J, We) | 0, u = u + Math.imul(oe, ce) | 0, m = m + Math.imul(oe, We) | 0, w = w + Math.imul(R, xe) | 0, u = u + Math.imul(R, $e) | 0, u = u + Math.imul(W, xe) | 0, m = m + Math.imul(W, $e) | 0, w = w + Math.imul(k, Oe) | 0, u = u + Math.imul(k, et) | 0, u = u + Math.imul(q, Oe) | 0, m = m + Math.imul(q, et) | 0, w = w + Math.imul(M, le) | 0, u = u + Math.imul(M, ke) | 0, u = u + Math.imul($, le) | 0, m = m + Math.imul($, ke) | 0, w = w + Math.imul(P, be) | 0, u = u + Math.imul(P, Ne) | 0, u = u + Math.imul(B, be) | 0, m = m + Math.imul(B, Ne) | 0;
      var Vt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Vt >>> 26) | 0, Vt &= 67108863, w = Math.imul(se, ae), u = Math.imul(se, Me), u = u + Math.imul(Se, ae) | 0, m = Math.imul(Se, Me), w = w + Math.imul(he, ce) | 0, u = u + Math.imul(he, We) | 0, u = u + Math.imul(Re, ce) | 0, m = m + Math.imul(Re, We) | 0, w = w + Math.imul(J, xe) | 0, u = u + Math.imul(J, $e) | 0, u = u + Math.imul(oe, xe) | 0, m = m + Math.imul(oe, $e) | 0, w = w + Math.imul(R, Oe) | 0, u = u + Math.imul(R, et) | 0, u = u + Math.imul(W, Oe) | 0, m = m + Math.imul(W, et) | 0, w = w + Math.imul(k, le) | 0, u = u + Math.imul(k, ke) | 0, u = u + Math.imul(q, le) | 0, m = m + Math.imul(q, ke) | 0, w = w + Math.imul(M, be) | 0, u = u + Math.imul(M, Ne) | 0, u = u + Math.imul($, be) | 0, m = m + Math.imul($, Ne) | 0, w = w + Math.imul(P, we) | 0, u = u + Math.imul(P, Ue) | 0, u = u + Math.imul(B, we) | 0, m = m + Math.imul(B, Ue) | 0;
      var Ht = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ht >>> 26) | 0, Ht &= 67108863, w = Math.imul(ie, ae), u = Math.imul(ie, Me), u = u + Math.imul(ge, ae) | 0, m = Math.imul(ge, Me), w = w + Math.imul(se, ce) | 0, u = u + Math.imul(se, We) | 0, u = u + Math.imul(Se, ce) | 0, m = m + Math.imul(Se, We) | 0, w = w + Math.imul(he, xe) | 0, u = u + Math.imul(he, $e) | 0, u = u + Math.imul(Re, xe) | 0, m = m + Math.imul(Re, $e) | 0, w = w + Math.imul(J, Oe) | 0, u = u + Math.imul(J, et) | 0, u = u + Math.imul(oe, Oe) | 0, m = m + Math.imul(oe, et) | 0, w = w + Math.imul(R, le) | 0, u = u + Math.imul(R, ke) | 0, u = u + Math.imul(W, le) | 0, m = m + Math.imul(W, ke) | 0, w = w + Math.imul(k, be) | 0, u = u + Math.imul(k, Ne) | 0, u = u + Math.imul(q, be) | 0, m = m + Math.imul(q, Ne) | 0, w = w + Math.imul(M, we) | 0, u = u + Math.imul(M, Ue) | 0, u = u + Math.imul($, we) | 0, m = m + Math.imul($, Ue) | 0, w = w + Math.imul(P, _e) | 0, u = u + Math.imul(P, qe) | 0, u = u + Math.imul(B, _e) | 0, m = m + Math.imul(B, qe) | 0;
      var bt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, w = Math.imul(ee, ae), u = Math.imul(ee, Me), u = u + Math.imul(fe, ae) | 0, m = Math.imul(fe, Me), w = w + Math.imul(ie, ce) | 0, u = u + Math.imul(ie, We) | 0, u = u + Math.imul(ge, ce) | 0, m = m + Math.imul(ge, We) | 0, w = w + Math.imul(se, xe) | 0, u = u + Math.imul(se, $e) | 0, u = u + Math.imul(Se, xe) | 0, m = m + Math.imul(Se, $e) | 0, w = w + Math.imul(he, Oe) | 0, u = u + Math.imul(he, et) | 0, u = u + Math.imul(Re, Oe) | 0, m = m + Math.imul(Re, et) | 0, w = w + Math.imul(J, le) | 0, u = u + Math.imul(J, ke) | 0, u = u + Math.imul(oe, le) | 0, m = m + Math.imul(oe, ke) | 0, w = w + Math.imul(R, be) | 0, u = u + Math.imul(R, Ne) | 0, u = u + Math.imul(W, be) | 0, m = m + Math.imul(W, Ne) | 0, w = w + Math.imul(k, we) | 0, u = u + Math.imul(k, Ue) | 0, u = u + Math.imul(q, we) | 0, m = m + Math.imul(q, Ue) | 0, w = w + Math.imul(M, _e) | 0, u = u + Math.imul(M, qe) | 0, u = u + Math.imul($, _e) | 0, m = m + Math.imul($, qe) | 0, w = w + Math.imul(P, de) | 0, u = u + Math.imul(P, Fe) | 0, u = u + Math.imul(B, de) | 0, m = m + Math.imul(B, Fe) | 0;
      var Vi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Vi >>> 26) | 0, Vi &= 67108863, w = Math.imul(re, ae), u = Math.imul(re, Me), u = u + Math.imul(ue, ae) | 0, m = Math.imul(ue, Me), w = w + Math.imul(ee, ce) | 0, u = u + Math.imul(ee, We) | 0, u = u + Math.imul(fe, ce) | 0, m = m + Math.imul(fe, We) | 0, w = w + Math.imul(ie, xe) | 0, u = u + Math.imul(ie, $e) | 0, u = u + Math.imul(ge, xe) | 0, m = m + Math.imul(ge, $e) | 0, w = w + Math.imul(se, Oe) | 0, u = u + Math.imul(se, et) | 0, u = u + Math.imul(Se, Oe) | 0, m = m + Math.imul(Se, et) | 0, w = w + Math.imul(he, le) | 0, u = u + Math.imul(he, ke) | 0, u = u + Math.imul(Re, le) | 0, m = m + Math.imul(Re, ke) | 0, w = w + Math.imul(J, be) | 0, u = u + Math.imul(J, Ne) | 0, u = u + Math.imul(oe, be) | 0, m = m + Math.imul(oe, Ne) | 0, w = w + Math.imul(R, we) | 0, u = u + Math.imul(R, Ue) | 0, u = u + Math.imul(W, we) | 0, m = m + Math.imul(W, Ue) | 0, w = w + Math.imul(k, _e) | 0, u = u + Math.imul(k, qe) | 0, u = u + Math.imul(q, _e) | 0, m = m + Math.imul(q, qe) | 0, w = w + Math.imul(M, de) | 0, u = u + Math.imul(M, Fe) | 0, u = u + Math.imul($, de) | 0, m = m + Math.imul($, Fe) | 0, w = w + Math.imul(P, je) | 0, u = u + Math.imul(P, it) | 0, u = u + Math.imul(B, je) | 0, m = m + Math.imul(B, it) | 0;
      var Hi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Hi >>> 26) | 0, Hi &= 67108863, w = Math.imul(re, ce), u = Math.imul(re, We), u = u + Math.imul(ue, ce) | 0, m = Math.imul(ue, We), w = w + Math.imul(ee, xe) | 0, u = u + Math.imul(ee, $e) | 0, u = u + Math.imul(fe, xe) | 0, m = m + Math.imul(fe, $e) | 0, w = w + Math.imul(ie, Oe) | 0, u = u + Math.imul(ie, et) | 0, u = u + Math.imul(ge, Oe) | 0, m = m + Math.imul(ge, et) | 0, w = w + Math.imul(se, le) | 0, u = u + Math.imul(se, ke) | 0, u = u + Math.imul(Se, le) | 0, m = m + Math.imul(Se, ke) | 0, w = w + Math.imul(he, be) | 0, u = u + Math.imul(he, Ne) | 0, u = u + Math.imul(Re, be) | 0, m = m + Math.imul(Re, Ne) | 0, w = w + Math.imul(J, we) | 0, u = u + Math.imul(J, Ue) | 0, u = u + Math.imul(oe, we) | 0, m = m + Math.imul(oe, Ue) | 0, w = w + Math.imul(R, _e) | 0, u = u + Math.imul(R, qe) | 0, u = u + Math.imul(W, _e) | 0, m = m + Math.imul(W, qe) | 0, w = w + Math.imul(k, de) | 0, u = u + Math.imul(k, Fe) | 0, u = u + Math.imul(q, de) | 0, m = m + Math.imul(q, Fe) | 0, w = w + Math.imul(M, je) | 0, u = u + Math.imul(M, it) | 0, u = u + Math.imul($, je) | 0, m = m + Math.imul($, it) | 0;
      var Wi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Wi >>> 26) | 0, Wi &= 67108863, w = Math.imul(re, xe), u = Math.imul(re, $e), u = u + Math.imul(ue, xe) | 0, m = Math.imul(ue, $e), w = w + Math.imul(ee, Oe) | 0, u = u + Math.imul(ee, et) | 0, u = u + Math.imul(fe, Oe) | 0, m = m + Math.imul(fe, et) | 0, w = w + Math.imul(ie, le) | 0, u = u + Math.imul(ie, ke) | 0, u = u + Math.imul(ge, le) | 0, m = m + Math.imul(ge, ke) | 0, w = w + Math.imul(se, be) | 0, u = u + Math.imul(se, Ne) | 0, u = u + Math.imul(Se, be) | 0, m = m + Math.imul(Se, Ne) | 0, w = w + Math.imul(he, we) | 0, u = u + Math.imul(he, Ue) | 0, u = u + Math.imul(Re, we) | 0, m = m + Math.imul(Re, Ue) | 0, w = w + Math.imul(J, _e) | 0, u = u + Math.imul(J, qe) | 0, u = u + Math.imul(oe, _e) | 0, m = m + Math.imul(oe, qe) | 0, w = w + Math.imul(R, de) | 0, u = u + Math.imul(R, Fe) | 0, u = u + Math.imul(W, de) | 0, m = m + Math.imul(W, Fe) | 0, w = w + Math.imul(k, je) | 0, u = u + Math.imul(k, it) | 0, u = u + Math.imul(q, je) | 0, m = m + Math.imul(q, it) | 0;
      var Gi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Gi >>> 26) | 0, Gi &= 67108863, w = Math.imul(re, Oe), u = Math.imul(re, et), u = u + Math.imul(ue, Oe) | 0, m = Math.imul(ue, et), w = w + Math.imul(ee, le) | 0, u = u + Math.imul(ee, ke) | 0, u = u + Math.imul(fe, le) | 0, m = m + Math.imul(fe, ke) | 0, w = w + Math.imul(ie, be) | 0, u = u + Math.imul(ie, Ne) | 0, u = u + Math.imul(ge, be) | 0, m = m + Math.imul(ge, Ne) | 0, w = w + Math.imul(se, we) | 0, u = u + Math.imul(se, Ue) | 0, u = u + Math.imul(Se, we) | 0, m = m + Math.imul(Se, Ue) | 0, w = w + Math.imul(he, _e) | 0, u = u + Math.imul(he, qe) | 0, u = u + Math.imul(Re, _e) | 0, m = m + Math.imul(Re, qe) | 0, w = w + Math.imul(J, de) | 0, u = u + Math.imul(J, Fe) | 0, u = u + Math.imul(oe, de) | 0, m = m + Math.imul(oe, Fe) | 0, w = w + Math.imul(R, je) | 0, u = u + Math.imul(R, it) | 0, u = u + Math.imul(W, je) | 0, m = m + Math.imul(W, it) | 0;
      var Yi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Yi >>> 26) | 0, Yi &= 67108863, w = Math.imul(re, le), u = Math.imul(re, ke), u = u + Math.imul(ue, le) | 0, m = Math.imul(ue, ke), w = w + Math.imul(ee, be) | 0, u = u + Math.imul(ee, Ne) | 0, u = u + Math.imul(fe, be) | 0, m = m + Math.imul(fe, Ne) | 0, w = w + Math.imul(ie, we) | 0, u = u + Math.imul(ie, Ue) | 0, u = u + Math.imul(ge, we) | 0, m = m + Math.imul(ge, Ue) | 0, w = w + Math.imul(se, _e) | 0, u = u + Math.imul(se, qe) | 0, u = u + Math.imul(Se, _e) | 0, m = m + Math.imul(Se, qe) | 0, w = w + Math.imul(he, de) | 0, u = u + Math.imul(he, Fe) | 0, u = u + Math.imul(Re, de) | 0, m = m + Math.imul(Re, Fe) | 0, w = w + Math.imul(J, je) | 0, u = u + Math.imul(J, it) | 0, u = u + Math.imul(oe, je) | 0, m = m + Math.imul(oe, it) | 0;
      var ai = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (ai >>> 26) | 0, ai &= 67108863, w = Math.imul(re, be), u = Math.imul(re, Ne), u = u + Math.imul(ue, be) | 0, m = Math.imul(ue, Ne), w = w + Math.imul(ee, we) | 0, u = u + Math.imul(ee, Ue) | 0, u = u + Math.imul(fe, we) | 0, m = m + Math.imul(fe, Ue) | 0, w = w + Math.imul(ie, _e) | 0, u = u + Math.imul(ie, qe) | 0, u = u + Math.imul(ge, _e) | 0, m = m + Math.imul(ge, qe) | 0, w = w + Math.imul(se, de) | 0, u = u + Math.imul(se, Fe) | 0, u = u + Math.imul(Se, de) | 0, m = m + Math.imul(Se, Fe) | 0, w = w + Math.imul(he, je) | 0, u = u + Math.imul(he, it) | 0, u = u + Math.imul(Re, je) | 0, m = m + Math.imul(Re, it) | 0;
      var Ji = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Ji >>> 26) | 0, Ji &= 67108863, w = Math.imul(re, we), u = Math.imul(re, Ue), u = u + Math.imul(ue, we) | 0, m = Math.imul(ue, Ue), w = w + Math.imul(ee, _e) | 0, u = u + Math.imul(ee, qe) | 0, u = u + Math.imul(fe, _e) | 0, m = m + Math.imul(fe, qe) | 0, w = w + Math.imul(ie, de) | 0, u = u + Math.imul(ie, Fe) | 0, u = u + Math.imul(ge, de) | 0, m = m + Math.imul(ge, Fe) | 0, w = w + Math.imul(se, je) | 0, u = u + Math.imul(se, it) | 0, u = u + Math.imul(Se, je) | 0, m = m + Math.imul(Se, it) | 0;
      var Zi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Zi >>> 26) | 0, Zi &= 67108863, w = Math.imul(re, _e), u = Math.imul(re, qe), u = u + Math.imul(ue, _e) | 0, m = Math.imul(ue, qe), w = w + Math.imul(ee, de) | 0, u = u + Math.imul(ee, Fe) | 0, u = u + Math.imul(fe, de) | 0, m = m + Math.imul(fe, Fe) | 0, w = w + Math.imul(ie, je) | 0, u = u + Math.imul(ie, it) | 0, u = u + Math.imul(ge, je) | 0, m = m + Math.imul(ge, it) | 0;
      var Lt = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, w = Math.imul(re, de), u = Math.imul(re, Fe), u = u + Math.imul(ue, de) | 0, m = Math.imul(ue, Fe), w = w + Math.imul(ee, je) | 0, u = u + Math.imul(ee, it) | 0, u = u + Math.imul(fe, je) | 0, m = m + Math.imul(fe, it) | 0;
      var Xi = (I + w | 0) + ((u & 8191) << 13) | 0;
      I = (m + (u >>> 13) | 0) + (Xi >>> 26) | 0, Xi &= 67108863, w = Math.imul(re, je), u = Math.imul(re, it), u = u + Math.imul(ue, je) | 0, m = Math.imul(ue, it);
      var Qi = (I + w | 0) + ((u & 8191) << 13) | 0;
      return I = (m + (u >>> 13) | 0) + (Qi >>> 26) | 0, Qi &= 67108863, E[0] = tt, E[1] = Je, E[2] = Kt, E[3] = Bt, E[4] = $t, E[5] = Vt, E[6] = Ht, E[7] = bt, E[8] = Vi, E[9] = Hi, E[10] = Wi, E[11] = Gi, E[12] = Yi, E[13] = ai, E[14] = Ji, E[15] = Zi, E[16] = Lt, E[17] = Xi, E[18] = Qi, I !== 0 && (E[19] = I, o.length++), o;
    };
    Math.imul || (j = O);
    function F(p, S, o) {
      o.negative = S.negative ^ p.negative, o.length = p.length + S.length;
      for (var c = 0, l = 0, E = 0; E < o.length - 1; E++) {
        var I = l;
        l = 0;
        for (var w = c & 67108863, u = Math.min(E, S.length - 1), m = Math.max(0, E - p.length + 1); m <= u; m++) {
          var b = E - m, P = p.words[b] | 0, B = S.words[m] | 0, G = P * B, M = G & 67108863;
          I = I + (G / 67108864 | 0) | 0, M = M + w | 0, w = M & 67108863, I = I + (M >>> 26) | 0, l += I >>> 26, I &= 67108863;
        }
        o.words[E] = w, c = I, I = l;
      }
      return c !== 0 ? o.words[E] = c : o.length--, o.strip();
    }
    function V(p, S, o) {
      var c = new C();
      return c.mulp(p, S, o);
    }
    s.prototype.mulTo = function(p, S) {
      var o, c = this.length + p.length;
      return this.length === 10 && p.length === 10 ? o = j(this, p, S) : c < 63 ? o = O(this, p, S) : c < 1024 ? o = F(this, p, S) : o = V(this, p, S), o;
    };
    function C(p, S) {
      this.x = p, this.y = S;
    }
    C.prototype.makeRBT = function(p) {
      for (var S = new Array(p), o = s.prototype._countBits(p) - 1, c = 0; c < p; c++)
        S[c] = this.revBin(c, o, p);
      return S;
    }, C.prototype.revBin = function(p, S, o) {
      if (p === 0 || p === o - 1)
        return p;
      for (var c = 0, l = 0; l < S; l++)
        c |= (p & 1) << S - l - 1, p >>= 1;
      return c;
    }, C.prototype.permute = function(p, S, o, c, l, E) {
      for (var I = 0; I < E; I++)
        c[I] = S[p[I]], l[I] = o[p[I]];
    }, C.prototype.transform = function(p, S, o, c, l, E) {
      this.permute(E, p, S, o, c, l);
      for (var I = 1; I < l; I <<= 1)
        for (var w = I << 1, u = Math.cos(2 * Math.PI / w), m = Math.sin(2 * Math.PI / w), b = 0; b < l; b += w)
          for (var P = u, B = m, G = 0; G < I; G++) {
            var M = o[b + G], $ = c[b + G], L = o[b + G + I], k = c[b + G + I], q = P * L - B * k;
            k = P * k + B * L, L = q, o[b + G] = M + L, c[b + G] = $ + k, o[b + G + I] = M - L, c[b + G + I] = $ - k, G !== w && (q = u * P - m * B, B = u * B + m * P, P = q);
          }
    }, C.prototype.guessLen13b = function(p, S) {
      var o = Math.max(S, p) | 1, c = o & 1, l = 0;
      for (o = o / 2 | 0; o; o = o >>> 1)
        l++;
      return 1 << l + 1 + c;
    }, C.prototype.conjugate = function(p, S, o) {
      if (!(o <= 1))
        for (var c = 0; c < o / 2; c++) {
          var l = p[c];
          p[c] = p[o - c - 1], p[o - c - 1] = l, l = S[c], S[c] = -S[o - c - 1], S[o - c - 1] = -l;
        }
    }, C.prototype.normalize13b = function(p, S) {
      for (var o = 0, c = 0; c < S / 2; c++) {
        var l = Math.round(p[2 * c + 1] / S) * 8192 + Math.round(p[2 * c] / S) + o;
        p[c] = l & 67108863, l < 67108864 ? o = 0 : o = l / 67108864 | 0;
      }
      return p;
    }, C.prototype.convert13b = function(p, S, o, c) {
      for (var l = 0, E = 0; E < S; E++)
        l = l + (p[E] | 0), o[2 * E] = l & 8191, l = l >>> 13, o[2 * E + 1] = l & 8191, l = l >>> 13;
      for (E = 2 * S; E < c; ++E)
        o[E] = 0;
      r(l === 0), r((l & -8192) === 0);
    }, C.prototype.stub = function(p) {
      for (var S = new Array(p), o = 0; o < p; o++)
        S[o] = 0;
      return S;
    }, C.prototype.mulp = function(p, S, o) {
      var c = 2 * this.guessLen13b(p.length, S.length), l = this.makeRBT(c), E = this.stub(c), I = new Array(c), w = new Array(c), u = new Array(c), m = new Array(c), b = new Array(c), P = new Array(c), B = o.words;
      B.length = c, this.convert13b(p.words, p.length, I, c), this.convert13b(S.words, S.length, m, c), this.transform(I, E, w, u, c, l), this.transform(m, E, b, P, c, l);
      for (var G = 0; G < c; G++) {
        var M = w[G] * b[G] - u[G] * P[G];
        u[G] = w[G] * P[G] + u[G] * b[G], w[G] = M;
      }
      return this.conjugate(w, u, c), this.transform(w, u, B, E, c, l), this.conjugate(B, E, c), this.normalize13b(B, c), o.negative = p.negative ^ S.negative, o.length = p.length + S.length, o.strip();
    }, s.prototype.mul = function(p) {
      var S = new s(null);
      return S.words = new Array(this.length + p.length), this.mulTo(p, S);
    }, s.prototype.mulf = function(p) {
      var S = new s(null);
      return S.words = new Array(this.length + p.length), V(this, p, S);
    }, s.prototype.imul = function(p) {
      return this.clone().mulTo(p, this);
    }, s.prototype.imuln = function(p) {
      r(typeof p == "number"), r(p < 67108864);
      for (var S = 0, o = 0; o < this.length; o++) {
        var c = (this.words[o] | 0) * p, l = (c & 67108863) + (S & 67108863);
        S >>= 26, S += c / 67108864 | 0, S += l >>> 26, this.words[o] = l & 67108863;
      }
      return S !== 0 && (this.words[o] = S, this.length++), this;
    }, s.prototype.muln = function(p) {
      return this.clone().imuln(p);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(p) {
      var S = A(p);
      if (S.length === 0)
        return new s(1);
      for (var o = this, c = 0; c < S.length && S[c] === 0; c++, o = o.sqr())
        ;
      if (++c < S.length)
        for (var l = o.sqr(); c < S.length; c++, l = l.sqr())
          S[c] !== 0 && (o = o.mul(l));
      return o;
    }, s.prototype.iushln = function(p) {
      r(typeof p == "number" && p >= 0);
      var S = p % 26, o = (p - S) / 26, c = 67108863 >>> 26 - S << 26 - S, l;
      if (S !== 0) {
        var E = 0;
        for (l = 0; l < this.length; l++) {
          var I = this.words[l] & c, w = (this.words[l] | 0) - I << S;
          this.words[l] = w | E, E = I >>> 26 - S;
        }
        E && (this.words[l] = E, this.length++);
      }
      if (o !== 0) {
        for (l = this.length - 1; l >= 0; l--)
          this.words[l + o] = this.words[l];
        for (l = 0; l < o; l++)
          this.words[l] = 0;
        this.length += o;
      }
      return this.strip();
    }, s.prototype.ishln = function(p) {
      return r(this.negative === 0), this.iushln(p);
    }, s.prototype.iushrn = function(p, S, o) {
      r(typeof p == "number" && p >= 0);
      var c;
      S ? c = (S - S % 26) / 26 : c = 0;
      var l = p % 26, E = Math.min((p - l) / 26, this.length), I = 67108863 ^ 67108863 >>> l << l, w = o;
      if (c -= E, c = Math.max(0, c), w) {
        for (var u = 0; u < E; u++)
          w.words[u] = this.words[u];
        w.length = E;
      }
      if (E !== 0)
        if (this.length > E)
          for (this.length -= E, u = 0; u < this.length; u++)
            this.words[u] = this.words[u + E];
        else
          this.words[0] = 0, this.length = 1;
      var m = 0;
      for (u = this.length - 1; u >= 0 && (m !== 0 || u >= c); u--) {
        var b = this.words[u] | 0;
        this.words[u] = m << 26 - l | b >>> l, m = b & I;
      }
      return w && m !== 0 && (w.words[w.length++] = m), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, s.prototype.ishrn = function(p, S, o) {
      return r(this.negative === 0), this.iushrn(p, S, o);
    }, s.prototype.shln = function(p) {
      return this.clone().ishln(p);
    }, s.prototype.ushln = function(p) {
      return this.clone().iushln(p);
    }, s.prototype.shrn = function(p) {
      return this.clone().ishrn(p);
    }, s.prototype.ushrn = function(p) {
      return this.clone().iushrn(p);
    }, s.prototype.testn = function(p) {
      r(typeof p == "number" && p >= 0);
      var S = p % 26, o = (p - S) / 26, c = 1 << S;
      if (this.length <= o)
        return !1;
      var l = this.words[o];
      return !!(l & c);
    }, s.prototype.imaskn = function(p) {
      r(typeof p == "number" && p >= 0);
      var S = p % 26, o = (p - S) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= o)
        return this;
      if (S !== 0 && o++, this.length = Math.min(o, this.length), S !== 0) {
        var c = 67108863 ^ 67108863 >>> S << S;
        this.words[this.length - 1] &= c;
      }
      return this.strip();
    }, s.prototype.maskn = function(p) {
      return this.clone().imaskn(p);
    }, s.prototype.iaddn = function(p) {
      return r(typeof p == "number"), r(p < 67108864), p < 0 ? this.isubn(-p) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < p ? (this.words[0] = p - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(p), this.negative = 1, this) : this._iaddn(p);
    }, s.prototype._iaddn = function(p) {
      this.words[0] += p;
      for (var S = 0; S < this.length && this.words[S] >= 67108864; S++)
        this.words[S] -= 67108864, S === this.length - 1 ? this.words[S + 1] = 1 : this.words[S + 1]++;
      return this.length = Math.max(this.length, S + 1), this;
    }, s.prototype.isubn = function(p) {
      if (r(typeof p == "number"), r(p < 67108864), p < 0)
        return this.iaddn(-p);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(p), this.negative = 1, this;
      if (this.words[0] -= p, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var S = 0; S < this.length && this.words[S] < 0; S++)
          this.words[S] += 67108864, this.words[S + 1] -= 1;
      return this.strip();
    }, s.prototype.addn = function(p) {
      return this.clone().iaddn(p);
    }, s.prototype.subn = function(p) {
      return this.clone().isubn(p);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(p, S, o) {
      var c = p.length + o, l;
      this._expand(c);
      var E, I = 0;
      for (l = 0; l < p.length; l++) {
        E = (this.words[l + o] | 0) + I;
        var w = (p.words[l] | 0) * S;
        E -= w & 67108863, I = (E >> 26) - (w / 67108864 | 0), this.words[l + o] = E & 67108863;
      }
      for (; l < this.length - o; l++)
        E = (this.words[l + o] | 0) + I, I = E >> 26, this.words[l + o] = E & 67108863;
      if (I === 0)
        return this.strip();
      for (r(I === -1), I = 0, l = 0; l < this.length; l++)
        E = -(this.words[l] | 0) + I, I = E >> 26, this.words[l] = E & 67108863;
      return this.negative = 1, this.strip();
    }, s.prototype._wordDiv = function(p, S) {
      var o = this.length - p.length, c = this.clone(), l = p, E = l.words[l.length - 1] | 0, I = this._countBits(E);
      o = 26 - I, o !== 0 && (l = l.ushln(o), c.iushln(o), E = l.words[l.length - 1] | 0);
      var w = c.length - l.length, u;
      if (S !== "mod") {
        u = new s(null), u.length = w + 1, u.words = new Array(u.length);
        for (var m = 0; m < u.length; m++)
          u.words[m] = 0;
      }
      var b = c.clone()._ishlnsubmul(l, 1, w);
      b.negative === 0 && (c = b, u && (u.words[w] = 1));
      for (var P = w - 1; P >= 0; P--) {
        var B = (c.words[l.length + P] | 0) * 67108864 + (c.words[l.length + P - 1] | 0);
        for (B = Math.min(B / E | 0, 67108863), c._ishlnsubmul(l, B, P); c.negative !== 0; )
          B--, c.negative = 0, c._ishlnsubmul(l, 1, P), c.isZero() || (c.negative ^= 1);
        u && (u.words[P] = B);
      }
      return u && u.strip(), c.strip(), S !== "div" && o !== 0 && c.iushrn(o), {
        div: u || null,
        mod: c
      };
    }, s.prototype.divmod = function(p, S, o) {
      if (r(!p.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var c, l, E;
      return this.negative !== 0 && p.negative === 0 ? (E = this.neg().divmod(p, S), S !== "mod" && (c = E.div.neg()), S !== "div" && (l = E.mod.neg(), o && l.negative !== 0 && l.iadd(p)), {
        div: c,
        mod: l
      }) : this.negative === 0 && p.negative !== 0 ? (E = this.divmod(p.neg(), S), S !== "mod" && (c = E.div.neg()), {
        div: c,
        mod: E.mod
      }) : this.negative & p.negative ? (E = this.neg().divmod(p.neg(), S), S !== "div" && (l = E.mod.neg(), o && l.negative !== 0 && l.isub(p)), {
        div: E.div,
        mod: l
      }) : p.length > this.length || this.cmp(p) < 0 ? {
        div: new s(0),
        mod: this
      } : p.length === 1 ? S === "div" ? {
        div: this.divn(p.words[0]),
        mod: null
      } : S === "mod" ? {
        div: null,
        mod: new s(this.modn(p.words[0]))
      } : {
        div: this.divn(p.words[0]),
        mod: new s(this.modn(p.words[0]))
      } : this._wordDiv(p, S);
    }, s.prototype.div = function(p) {
      return this.divmod(p, "div", !1).div;
    }, s.prototype.mod = function(p) {
      return this.divmod(p, "mod", !1).mod;
    }, s.prototype.umod = function(p) {
      return this.divmod(p, "mod", !0).mod;
    }, s.prototype.divRound = function(p) {
      var S = this.divmod(p);
      if (S.mod.isZero())
        return S.div;
      var o = S.div.negative !== 0 ? S.mod.isub(p) : S.mod, c = p.ushrn(1), l = p.andln(1), E = o.cmp(c);
      return E < 0 || l === 1 && E === 0 ? S.div : S.div.negative !== 0 ? S.div.isubn(1) : S.div.iaddn(1);
    }, s.prototype.modn = function(p) {
      r(p <= 67108863);
      for (var S = (1 << 26) % p, o = 0, c = this.length - 1; c >= 0; c--)
        o = (S * o + (this.words[c] | 0)) % p;
      return o;
    }, s.prototype.idivn = function(p) {
      r(p <= 67108863);
      for (var S = 0, o = this.length - 1; o >= 0; o--) {
        var c = (this.words[o] | 0) + S * 67108864;
        this.words[o] = c / p | 0, S = c % p;
      }
      return this.strip();
    }, s.prototype.divn = function(p) {
      return this.clone().idivn(p);
    }, s.prototype.egcd = function(p) {
      r(p.negative === 0), r(!p.isZero());
      var S = this, o = p.clone();
      S.negative !== 0 ? S = S.umod(p) : S = S.clone();
      for (var c = new s(1), l = new s(0), E = new s(0), I = new s(1), w = 0; S.isEven() && o.isEven(); )
        S.iushrn(1), o.iushrn(1), ++w;
      for (var u = o.clone(), m = S.clone(); !S.isZero(); ) {
        for (var b = 0, P = 1; !(S.words[0] & P) && b < 26; ++b, P <<= 1)
          ;
        if (b > 0)
          for (S.iushrn(b); b-- > 0; )
            (c.isOdd() || l.isOdd()) && (c.iadd(u), l.isub(m)), c.iushrn(1), l.iushrn(1);
        for (var B = 0, G = 1; !(o.words[0] & G) && B < 26; ++B, G <<= 1)
          ;
        if (B > 0)
          for (o.iushrn(B); B-- > 0; )
            (E.isOdd() || I.isOdd()) && (E.iadd(u), I.isub(m)), E.iushrn(1), I.iushrn(1);
        S.cmp(o) >= 0 ? (S.isub(o), c.isub(E), l.isub(I)) : (o.isub(S), E.isub(c), I.isub(l));
      }
      return {
        a: E,
        b: I,
        gcd: o.iushln(w)
      };
    }, s.prototype._invmp = function(p) {
      r(p.negative === 0), r(!p.isZero());
      var S = this, o = p.clone();
      S.negative !== 0 ? S = S.umod(p) : S = S.clone();
      for (var c = new s(1), l = new s(0), E = o.clone(); S.cmpn(1) > 0 && o.cmpn(1) > 0; ) {
        for (var I = 0, w = 1; !(S.words[0] & w) && I < 26; ++I, w <<= 1)
          ;
        if (I > 0)
          for (S.iushrn(I); I-- > 0; )
            c.isOdd() && c.iadd(E), c.iushrn(1);
        for (var u = 0, m = 1; !(o.words[0] & m) && u < 26; ++u, m <<= 1)
          ;
        if (u > 0)
          for (o.iushrn(u); u-- > 0; )
            l.isOdd() && l.iadd(E), l.iushrn(1);
        S.cmp(o) >= 0 ? (S.isub(o), c.isub(l)) : (o.isub(S), l.isub(c));
      }
      var b;
      return S.cmpn(1) === 0 ? b = c : b = l, b.cmpn(0) < 0 && b.iadd(p), b;
    }, s.prototype.gcd = function(p) {
      if (this.isZero())
        return p.abs();
      if (p.isZero())
        return this.abs();
      var S = this.clone(), o = p.clone();
      S.negative = 0, o.negative = 0;
      for (var c = 0; S.isEven() && o.isEven(); c++)
        S.iushrn(1), o.iushrn(1);
      do {
        for (; S.isEven(); )
          S.iushrn(1);
        for (; o.isEven(); )
          o.iushrn(1);
        var l = S.cmp(o);
        if (l < 0) {
          var E = S;
          S = o, o = E;
        } else if (l === 0 || o.cmpn(1) === 0)
          break;
        S.isub(o);
      } while (!0);
      return o.iushln(c);
    }, s.prototype.invm = function(p) {
      return this.egcd(p).a.umod(p);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(p) {
      return this.words[0] & p;
    }, s.prototype.bincn = function(p) {
      r(typeof p == "number");
      var S = p % 26, o = (p - S) / 26, c = 1 << S;
      if (this.length <= o)
        return this._expand(o + 1), this.words[o] |= c, this;
      for (var l = c, E = o; l !== 0 && E < this.length; E++) {
        var I = this.words[E] | 0;
        I += l, l = I >>> 26, I &= 67108863, this.words[E] = I;
      }
      return l !== 0 && (this.words[E] = l, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(p) {
      var S = p < 0;
      if (this.negative !== 0 && !S)
        return -1;
      if (this.negative === 0 && S)
        return 1;
      this.strip();
      var o;
      if (this.length > 1)
        o = 1;
      else {
        S && (p = -p), r(p <= 67108863, "Number is too big");
        var c = this.words[0] | 0;
        o = c === p ? 0 : c < p ? -1 : 1;
      }
      return this.negative !== 0 ? -o | 0 : o;
    }, s.prototype.cmp = function(p) {
      if (this.negative !== 0 && p.negative === 0)
        return -1;
      if (this.negative === 0 && p.negative !== 0)
        return 1;
      var S = this.ucmp(p);
      return this.negative !== 0 ? -S | 0 : S;
    }, s.prototype.ucmp = function(p) {
      if (this.length > p.length)
        return 1;
      if (this.length < p.length)
        return -1;
      for (var S = 0, o = this.length - 1; o >= 0; o--) {
        var c = this.words[o] | 0, l = p.words[o] | 0;
        if (c !== l) {
          c < l ? S = -1 : c > l && (S = 1);
          break;
        }
      }
      return S;
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
      return new Y(p);
    }, s.prototype.toRed = function(p) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), p.convertTo(this)._forceRed(p);
    }, s.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(p) {
      return this.red = p, this;
    }, s.prototype.forceRed = function(p) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(p);
    }, s.prototype.redAdd = function(p) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, p);
    }, s.prototype.redIAdd = function(p) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, p);
    }, s.prototype.redSub = function(p) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, p);
    }, s.prototype.redISub = function(p) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, p);
    }, s.prototype.redShl = function(p) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, p);
    }, s.prototype.redMul = function(p) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, p), this.red.mul(this, p);
    }, s.prototype.redIMul = function(p) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, p), this.red.imul(this, p);
    }, s.prototype.redSqr = function() {
      return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(p) {
      return r(this.red && !p.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, p);
    };
    var K = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function N(p, S) {
      this.name = p, this.p = new s(S, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    N.prototype._tmp = function() {
      var p = new s(null);
      return p.words = new Array(Math.ceil(this.n / 13)), p;
    }, N.prototype.ireduce = function(p) {
      var S = p, o;
      do
        this.split(S, this.tmp), S = this.imulK(S), S = S.iadd(this.tmp), o = S.bitLength();
      while (o > this.n);
      var c = o < this.n ? -1 : S.ucmp(this.p);
      return c === 0 ? (S.words[0] = 0, S.length = 1) : c > 0 ? S.isub(this.p) : S.strip !== void 0 ? S.strip() : S._strip(), S;
    }, N.prototype.split = function(p, S) {
      p.iushrn(this.n, 0, S);
    }, N.prototype.imulK = function(p) {
      return p.imul(this.k);
    };
    function U() {
      N.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    n(U, N), U.prototype.split = function(p, S) {
      for (var o = 4194303, c = Math.min(p.length, 9), l = 0; l < c; l++)
        S.words[l] = p.words[l];
      if (S.length = c, p.length <= 9) {
        p.words[0] = 0, p.length = 1;
        return;
      }
      var E = p.words[9];
      for (S.words[S.length++] = E & o, l = 10; l < p.length; l++) {
        var I = p.words[l] | 0;
        p.words[l - 10] = (I & o) << 4 | E >>> 22, E = I;
      }
      E >>>= 22, p.words[l - 10] = E, E === 0 && p.length > 10 ? p.length -= 10 : p.length -= 9;
    }, U.prototype.imulK = function(p) {
      p.words[p.length] = 0, p.words[p.length + 1] = 0, p.length += 2;
      for (var S = 0, o = 0; o < p.length; o++) {
        var c = p.words[o] | 0;
        S += c * 977, p.words[o] = S & 67108863, S = c * 64 + (S / 67108864 | 0);
      }
      return p.words[p.length - 1] === 0 && (p.length--, p.words[p.length - 1] === 0 && p.length--), p;
    };
    function D() {
      N.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    n(D, N);
    function v() {
      N.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    n(v, N);
    function T() {
      N.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    n(T, N), T.prototype.imulK = function(p) {
      for (var S = 0, o = 0; o < p.length; o++) {
        var c = (p.words[o] | 0) * 19 + S, l = c & 67108863;
        c >>>= 26, p.words[o] = l, S = c;
      }
      return S !== 0 && (p.words[p.length++] = S), p;
    }, s._prime = function(p) {
      if (K[p])
        return K[p];
      var S;
      if (p === "k256")
        S = new U();
      else if (p === "p224")
        S = new D();
      else if (p === "p192")
        S = new v();
      else if (p === "p25519")
        S = new T();
      else
        throw new Error("Unknown prime " + p);
      return K[p] = S, S;
    };
    function Y(p) {
      if (typeof p == "string") {
        var S = s._prime(p);
        this.m = S.p, this.prime = S;
      } else
        r(p.gtn(1), "modulus must be greater than 1"), this.m = p, this.prime = null;
    }
    Y.prototype._verify1 = function(p) {
      r(p.negative === 0, "red works only with positives"), r(p.red, "red works only with red numbers");
    }, Y.prototype._verify2 = function(p, S) {
      r((p.negative | S.negative) === 0, "red works only with positives"), r(
        p.red && p.red === S.red,
        "red works only with red numbers"
      );
    }, Y.prototype.imod = function(p) {
      return this.prime ? this.prime.ireduce(p)._forceRed(this) : p.umod(this.m)._forceRed(this);
    }, Y.prototype.neg = function(p) {
      return p.isZero() ? p.clone() : this.m.sub(p)._forceRed(this);
    }, Y.prototype.add = function(p, S) {
      this._verify2(p, S);
      var o = p.add(S);
      return o.cmp(this.m) >= 0 && o.isub(this.m), o._forceRed(this);
    }, Y.prototype.iadd = function(p, S) {
      this._verify2(p, S);
      var o = p.iadd(S);
      return o.cmp(this.m) >= 0 && o.isub(this.m), o;
    }, Y.prototype.sub = function(p, S) {
      this._verify2(p, S);
      var o = p.sub(S);
      return o.cmpn(0) < 0 && o.iadd(this.m), o._forceRed(this);
    }, Y.prototype.isub = function(p, S) {
      this._verify2(p, S);
      var o = p.isub(S);
      return o.cmpn(0) < 0 && o.iadd(this.m), o;
    }, Y.prototype.shl = function(p, S) {
      return this._verify1(p), this.imod(p.ushln(S));
    }, Y.prototype.imul = function(p, S) {
      return this._verify2(p, S), this.imod(p.imul(S));
    }, Y.prototype.mul = function(p, S) {
      return this._verify2(p, S), this.imod(p.mul(S));
    }, Y.prototype.isqr = function(p) {
      return this.imul(p, p.clone());
    }, Y.prototype.sqr = function(p) {
      return this.mul(p, p);
    }, Y.prototype.sqrt = function(p) {
      if (p.isZero())
        return p.clone();
      var S = this.m.andln(3);
      if (r(S % 2 === 1), S === 3) {
        var o = this.m.add(new s(1)).iushrn(2);
        return this.pow(p, o);
      }
      for (var c = this.m.subn(1), l = 0; !c.isZero() && c.andln(1) === 0; )
        l++, c.iushrn(1);
      r(!c.isZero());
      var E = new s(1).toRed(this), I = E.redNeg(), w = this.m.subn(1).iushrn(1), u = this.m.bitLength();
      for (u = new s(2 * u * u).toRed(this); this.pow(u, w).cmp(I) !== 0; )
        u.redIAdd(I);
      for (var m = this.pow(u, c), b = this.pow(p, c.addn(1).iushrn(1)), P = this.pow(p, c), B = l; P.cmp(E) !== 0; ) {
        for (var G = P, M = 0; G.cmp(E) !== 0; M++)
          G = G.redSqr();
        r(M < B);
        var $ = this.pow(m, new s(1).iushln(B - M - 1));
        b = b.redMul($), m = $.redSqr(), P = P.redMul(m), B = M;
      }
      return b;
    }, Y.prototype.invm = function(p) {
      var S = p._invmp(this.m);
      return S.negative !== 0 ? (S.negative = 0, this.imod(S).redNeg()) : this.imod(S);
    }, Y.prototype.pow = function(p, S) {
      if (S.isZero())
        return new s(1).toRed(this);
      if (S.cmpn(1) === 0)
        return p.clone();
      var o = 4, c = new Array(1 << o);
      c[0] = new s(1).toRed(this), c[1] = p;
      for (var l = 2; l < c.length; l++)
        c[l] = this.mul(c[l - 1], p);
      var E = c[0], I = 0, w = 0, u = S.bitLength() % 26;
      for (u === 0 && (u = 26), l = S.length - 1; l >= 0; l--) {
        for (var m = S.words[l], b = u - 1; b >= 0; b--) {
          var P = m >> b & 1;
          if (E !== c[0] && (E = this.sqr(E)), P === 0 && I === 0) {
            w = 0;
            continue;
          }
          I <<= 1, I |= P, w++, !(w !== o && (l !== 0 || b !== 0)) && (E = this.mul(E, c[I]), w = 0, I = 0);
        }
        u = 26;
      }
      return E;
    }, Y.prototype.convertTo = function(p) {
      var S = p.umod(this.m);
      return S === p ? S.clone() : S;
    }, Y.prototype.convertFrom = function(p) {
      var S = p.clone();
      return S.red = null, S;
    }, s.mont = function(p) {
      return new Q(p);
    };
    function Q(p) {
      Y.call(this, p), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    n(Q, Y), Q.prototype.convertTo = function(p) {
      return this.imod(p.ushln(this.shift));
    }, Q.prototype.convertFrom = function(p) {
      var S = this.imod(p.mul(this.rinv));
      return S.red = null, S;
    }, Q.prototype.imul = function(p, S) {
      if (p.isZero() || S.isZero())
        return p.words[0] = 0, p.length = 1, p;
      var o = p.imul(S), c = o.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), l = o.isub(c).iushrn(this.shift), E = l;
      return l.cmp(this.m) >= 0 ? E = l.isub(this.m) : l.cmpn(0) < 0 && (E = l.iadd(this.m)), E._forceRed(this);
    }, Q.prototype.mul = function(p, S) {
      if (p.isZero() || S.isZero())
        return new s(0)._forceRed(this);
      var o = p.mul(S), c = o.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), l = o.isub(c).iushrn(this.shift), E = l;
      return l.cmp(this.m) >= 0 ? E = l.isub(this.m) : l.cmpn(0) < 0 && (E = l.iadd(this.m)), E._forceRed(this);
    }, Q.prototype.invm = function(p) {
      var S = this.imod(p._invmp(this.m).mul(this.r2));
      return S._forceRed(this);
    };
  })(e, ti);
})(Bu);
var ur = Bu.exports, Da = {};
(function(e) {
  var t = e;
  function i(s, a) {
    if (Array.isArray(s))
      return s.slice();
    if (!s)
      return [];
    var h = [];
    if (typeof s != "string") {
      for (var d = 0; d < s.length; d++)
        h[d] = s[d] | 0;
      return h;
    }
    if (a === "hex") {
      s = s.replace(/[^a-z0-9]+/ig, ""), s.length % 2 !== 0 && (s = "0" + s);
      for (var d = 0; d < s.length; d += 2)
        h.push(parseInt(s[d] + s[d + 1], 16));
    } else
      for (var d = 0; d < s.length; d++) {
        var f = s.charCodeAt(d), g = f >> 8, _ = f & 255;
        g ? h.push(g, _) : h.push(_);
      }
    return h;
  }
  t.toArray = i;
  function r(s) {
    return s.length === 1 ? "0" + s : s;
  }
  t.zero2 = r;
  function n(s) {
    for (var a = "", h = 0; h < s.length; h++)
      a += r(s[h].toString(16));
    return a;
  }
  t.toHex = n, t.encode = function(s, a) {
    return a === "hex" ? n(s) : s;
  };
})(Da);
(function(e) {
  var t = e, i = ur, r = Gr, n = Da;
  t.assert = r, t.toArray = n.toArray, t.zero2 = n.zero2, t.toHex = n.toHex, t.encode = n.encode;
  function s(g, _, x) {
    var A = new Array(Math.max(g.bitLength(), x) + 1), O;
    for (O = 0; O < A.length; O += 1)
      A[O] = 0;
    var j = 1 << _ + 1, F = g.clone();
    for (O = 0; O < A.length; O++) {
      var V, C = F.andln(j - 1);
      F.isOdd() ? (C > (j >> 1) - 1 ? V = (j >> 1) - C : V = C, F.isubn(V)) : V = 0, A[O] = V, F.iushrn(1);
    }
    return A;
  }
  t.getNAF = s;
  function a(g, _) {
    var x = [
      [],
      []
    ];
    g = g.clone(), _ = _.clone();
    for (var A = 0, O = 0, j; g.cmpn(-A) > 0 || _.cmpn(-O) > 0; ) {
      var F = g.andln(3) + A & 3, V = _.andln(3) + O & 3;
      F === 3 && (F = -1), V === 3 && (V = -1);
      var C;
      F & 1 ? (j = g.andln(7) + A & 7, (j === 3 || j === 5) && V === 2 ? C = -F : C = F) : C = 0, x[0].push(C);
      var K;
      V & 1 ? (j = _.andln(7) + O & 7, (j === 3 || j === 5) && F === 2 ? K = -V : K = V) : K = 0, x[1].push(K), 2 * A === C + 1 && (A = 1 - A), 2 * O === K + 1 && (O = 1 - O), g.iushrn(1), _.iushrn(1);
    }
    return x;
  }
  t.getJSF = a;
  function h(g, _, x) {
    var A = "_" + _;
    g.prototype[_] = function() {
      return this[A] !== void 0 ? this[A] : this[A] = x.call(this);
    };
  }
  t.cachedProperty = h;
  function d(g) {
    return typeof g == "string" ? t.toArray(g, "hex") : g;
  }
  t.parseBytes = d;
  function f(g) {
    return new i(g, "hex", "le");
  }
  t.intFromLE = f;
})(oi);
var Fa = { exports: {} }, $o;
Fa.exports = function(e) {
  return $o || ($o = new mr(null)), $o.generate(e);
};
function mr(e) {
  this.rand = e;
}
Fa.exports.Rand = mr;
mr.prototype.generate = function(e) {
  return this._rand(e);
};
mr.prototype._rand = function(e) {
  if (this.rand.getBytes)
    return this.rand.getBytes(e);
  for (var t = new Uint8Array(e), i = 0; i < t.length; i++)
    t[i] = this.rand.getByte();
  return t;
};
if (typeof self == "object")
  self.crypto && self.crypto.getRandomValues ? mr.prototype._rand = function(e) {
    var t = new Uint8Array(e);
    return self.crypto.getRandomValues(t), t;
  } : self.msCrypto && self.msCrypto.getRandomValues ? mr.prototype._rand = function(e) {
    var t = new Uint8Array(e);
    return self.msCrypto.getRandomValues(t), t;
  } : typeof window == "object" && (mr.prototype._rand = function() {
    throw new Error("Not implemented yet");
  });
else
  try {
    var dc = oo;
    if (typeof dc.randomBytes != "function")
      throw new Error("Not supported");
    mr.prototype._rand = function(e) {
      return dc.randomBytes(e);
    };
  } catch {
  }
var $u = Fa.exports, Ka = {}, Nr = ur, os = oi, $s = os.getNAF, Xm = os.getJSF, Vs = os.assert;
function Mr(e, t) {
  this.type = e, this.p = new Nr(t.p, 16), this.red = t.prime ? Nr.red(t.prime) : Nr.mont(this.p), this.zero = new Nr(0).toRed(this.red), this.one = new Nr(1).toRed(this.red), this.two = new Nr(2).toRed(this.red), this.n = t.n && new Nr(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var i = this.n && this.p.div(this.n);
  !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var go = Mr;
Mr.prototype.point = function() {
  throw new Error("Not implemented");
};
Mr.prototype.validate = function() {
  throw new Error("Not implemented");
};
Mr.prototype._fixedNafMul = function(e, t) {
  Vs(e.precomputed);
  var i = e._getDoubles(), r = $s(t, 1, this._bitLength), n = (1 << i.step + 1) - (i.step % 2 === 0 ? 2 : 1);
  n /= 3;
  var s = [], a, h;
  for (a = 0; a < r.length; a += i.step) {
    h = 0;
    for (var d = a + i.step - 1; d >= a; d--)
      h = (h << 1) + r[d];
    s.push(h);
  }
  for (var f = this.jpoint(null, null, null), g = this.jpoint(null, null, null), _ = n; _ > 0; _--) {
    for (a = 0; a < s.length; a++)
      h = s[a], h === _ ? g = g.mixedAdd(i.points[a]) : h === -_ && (g = g.mixedAdd(i.points[a].neg()));
    f = f.add(g);
  }
  return f.toP();
};
Mr.prototype._wnafMul = function(e, t) {
  var i = 4, r = e._getNAFPoints(i);
  i = r.wnd;
  for (var n = r.points, s = $s(t, i, this._bitLength), a = this.jpoint(null, null, null), h = s.length - 1; h >= 0; h--) {
    for (var d = 0; h >= 0 && s[h] === 0; h--)
      d++;
    if (h >= 0 && d++, a = a.dblp(d), h < 0)
      break;
    var f = s[h];
    Vs(f !== 0), e.type === "affine" ? f > 0 ? a = a.mixedAdd(n[f - 1 >> 1]) : a = a.mixedAdd(n[-f - 1 >> 1].neg()) : f > 0 ? a = a.add(n[f - 1 >> 1]) : a = a.add(n[-f - 1 >> 1].neg());
  }
  return e.type === "affine" ? a.toP() : a;
};
Mr.prototype._wnafMulAdd = function(e, t, i, r, n) {
  var s = this._wnafT1, a = this._wnafT2, h = this._wnafT3, d = 0, f, g, _;
  for (f = 0; f < r; f++) {
    _ = t[f];
    var x = _._getNAFPoints(e);
    s[f] = x.wnd, a[f] = x.points;
  }
  for (f = r - 1; f >= 1; f -= 2) {
    var A = f - 1, O = f;
    if (s[A] !== 1 || s[O] !== 1) {
      h[A] = $s(i[A], s[A], this._bitLength), h[O] = $s(i[O], s[O], this._bitLength), d = Math.max(h[A].length, d), d = Math.max(h[O].length, d);
      continue;
    }
    var j = [
      t[A],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      t[O]
      /* 7 */
    ];
    t[A].y.cmp(t[O].y) === 0 ? (j[1] = t[A].add(t[O]), j[2] = t[A].toJ().mixedAdd(t[O].neg())) : t[A].y.cmp(t[O].y.redNeg()) === 0 ? (j[1] = t[A].toJ().mixedAdd(t[O]), j[2] = t[A].add(t[O].neg())) : (j[1] = t[A].toJ().mixedAdd(t[O]), j[2] = t[A].toJ().mixedAdd(t[O].neg()));
    var F = [
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
    ], V = Xm(i[A], i[O]);
    for (d = Math.max(V[0].length, d), h[A] = new Array(d), h[O] = new Array(d), g = 0; g < d; g++) {
      var C = V[0][g] | 0, K = V[1][g] | 0;
      h[A][g] = F[(C + 1) * 3 + (K + 1)], h[O][g] = 0, a[A] = j;
    }
  }
  var N = this.jpoint(null, null, null), U = this._wnafT4;
  for (f = d; f >= 0; f--) {
    for (var D = 0; f >= 0; ) {
      var v = !0;
      for (g = 0; g < r; g++)
        U[g] = h[g][f] | 0, U[g] !== 0 && (v = !1);
      if (!v)
        break;
      D++, f--;
    }
    if (f >= 0 && D++, N = N.dblp(D), f < 0)
      break;
    for (g = 0; g < r; g++) {
      var T = U[g];
      T !== 0 && (T > 0 ? _ = a[g][T - 1 >> 1] : T < 0 && (_ = a[g][-T - 1 >> 1].neg()), _.type === "affine" ? N = N.mixedAdd(_) : N = N.add(_));
    }
  }
  for (f = 0; f < r; f++)
    a[f] = null;
  return n ? N : N.toP();
};
function mi(e, t) {
  this.curve = e, this.type = t, this.precomputed = null;
}
Mr.BasePoint = mi;
mi.prototype.eq = function() {
  throw new Error("Not implemented");
};
mi.prototype.validate = function() {
  return this.curve.validate(this);
};
Mr.prototype.decodePoint = function(e, t) {
  e = os.toArray(e, t);
  var i = this.p.byteLength();
  if ((e[0] === 4 || e[0] === 6 || e[0] === 7) && e.length - 1 === 2 * i) {
    e[0] === 6 ? Vs(e[e.length - 1] % 2 === 0) : e[0] === 7 && Vs(e[e.length - 1] % 2 === 1);
    var r = this.point(
      e.slice(1, 1 + i),
      e.slice(1 + i, 1 + 2 * i)
    );
    return r;
  } else if ((e[0] === 2 || e[0] === 3) && e.length - 1 === i)
    return this.pointFromX(e.slice(1, 1 + i), e[0] === 3);
  throw new Error("Unknown point format");
};
mi.prototype.encodeCompressed = function(e) {
  return this.encode(e, !0);
};
mi.prototype._encode = function(e) {
  var t = this.curve.p.byteLength(), i = this.getX().toArray("be", t);
  return e ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", t));
};
mi.prototype.encode = function(e, t) {
  return os.encode(this._encode(t), e);
};
mi.prototype.precompute = function(e) {
  if (this.precomputed)
    return this;
  var t = {
    doubles: null,
    naf: null,
    beta: null
  };
  return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this;
};
mi.prototype._hasDoubles = function(e) {
  if (!this.precomputed)
    return !1;
  var t = this.precomputed.doubles;
  return t ? t.points.length >= Math.ceil((e.bitLength() + 1) / t.step) : !1;
};
mi.prototype._getDoubles = function(e, t) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var i = [this], r = this, n = 0; n < t; n += e) {
    for (var s = 0; s < e; s++)
      r = r.dbl();
    i.push(r);
  }
  return {
    step: e,
    points: i
  };
};
mi.prototype._getNAFPoints = function(e) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var t = [this], i = (1 << e) - 1, r = i === 1 ? null : this.dbl(), n = 1; n < i; n++)
    t[n] = t[n - 1].add(r);
  return {
    wnd: e,
    points: t
  };
};
mi.prototype._getBeta = function() {
  return null;
};
mi.prototype.dblp = function(e) {
  for (var t = this, i = 0; i < e; i++)
    t = t.dbl();
  return t;
};
var Qm = oi, lt = ur, Ba = co, En = go, e2 = Qm.assert;
function yi(e) {
  En.call(this, "short", e), this.a = new lt(e.a, 16).toRed(this.red), this.b = new lt(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Ba(yi, En);
var t2 = yi;
yi.prototype._getEndomorphism = function(e) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var t, i;
    if (e.beta)
      t = new lt(e.beta, 16).toRed(this.red);
    else {
      var r = this._getEndoRoots(this.p);
      t = r[0].cmp(r[1]) < 0 ? r[0] : r[1], t = t.toRed(this.red);
    }
    if (e.lambda)
      i = new lt(e.lambda, 16);
    else {
      var n = this._getEndoRoots(this.n);
      this.g.mul(n[0]).x.cmp(this.g.x.redMul(t)) === 0 ? i = n[0] : (i = n[1], e2(this.g.mul(i).x.cmp(this.g.x.redMul(t)) === 0));
    }
    var s;
    return e.basis ? s = e.basis.map(function(a) {
      return {
        a: new lt(a.a, 16),
        b: new lt(a.b, 16)
      };
    }) : s = this._getEndoBasis(i), {
      beta: t,
      lambda: i,
      basis: s
    };
  }
};
yi.prototype._getEndoRoots = function(e) {
  var t = e === this.p ? this.red : lt.mont(e), i = new lt(2).toRed(t).redInvm(), r = i.redNeg(), n = new lt(3).toRed(t).redNeg().redSqrt().redMul(i), s = r.redAdd(n).fromRed(), a = r.redSub(n).fromRed();
  return [s, a];
};
yi.prototype._getEndoBasis = function(e) {
  for (var t = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), i = e, r = this.n.clone(), n = new lt(1), s = new lt(0), a = new lt(0), h = new lt(1), d, f, g, _, x, A, O, j = 0, F, V; i.cmpn(0) !== 0; ) {
    var C = r.div(i);
    F = r.sub(C.mul(i)), V = a.sub(C.mul(n));
    var K = h.sub(C.mul(s));
    if (!g && F.cmp(t) < 0)
      d = O.neg(), f = n, g = F.neg(), _ = V;
    else if (g && ++j === 2)
      break;
    O = F, r = i, i = F, a = n, n = V, h = s, s = K;
  }
  x = F.neg(), A = V;
  var N = g.sqr().add(_.sqr()), U = x.sqr().add(A.sqr());
  return U.cmp(N) >= 0 && (x = d, A = f), g.negative && (g = g.neg(), _ = _.neg()), x.negative && (x = x.neg(), A = A.neg()), [
    { a: g, b: _ },
    { a: x, b: A }
  ];
};
yi.prototype._endoSplit = function(e) {
  var t = this.endo.basis, i = t[0], r = t[1], n = r.b.mul(e).divRound(this.n), s = i.b.neg().mul(e).divRound(this.n), a = n.mul(i.a), h = s.mul(r.a), d = n.mul(i.b), f = s.mul(r.b), g = e.sub(a).sub(h), _ = d.add(f).neg();
  return { k1: g, k2: _ };
};
yi.prototype.pointFromX = function(e, t) {
  e = new lt(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), r = i.redSqrt();
  if (r.redSqr().redSub(i).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var n = r.fromRed().isOdd();
  return (t && !n || !t && n) && (r = r.redNeg()), this.point(e, r);
};
yi.prototype.validate = function(e) {
  if (e.inf)
    return !0;
  var t = e.x, i = e.y, r = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(r).redIAdd(this.b);
  return i.redSqr().redISub(n).cmpn(0) === 0;
};
yi.prototype._endoWnafMulAdd = function(e, t, i) {
  for (var r = this._endoWnafT1, n = this._endoWnafT2, s = 0; s < e.length; s++) {
    var a = this._endoSplit(t[s]), h = e[s], d = h._getBeta();
    a.k1.negative && (a.k1.ineg(), h = h.neg(!0)), a.k2.negative && (a.k2.ineg(), d = d.neg(!0)), r[s * 2] = h, r[s * 2 + 1] = d, n[s * 2] = a.k1, n[s * 2 + 1] = a.k2;
  }
  for (var f = this._wnafMulAdd(1, r, n, s * 2, i), g = 0; g < s * 2; g++)
    r[g] = null, n[g] = null;
  return f;
};
function Ot(e, t, i, r) {
  En.BasePoint.call(this, e, "affine"), t === null && i === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new lt(t, 16), this.y = new lt(i, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Ba(Ot, En.BasePoint);
yi.prototype.point = function(e, t, i) {
  return new Ot(this, e, t, i);
};
yi.prototype.pointFromJSON = function(e, t) {
  return Ot.fromJSON(this, e, t);
};
Ot.prototype._getBeta = function() {
  if (this.curve.endo) {
    var e = this.precomputed;
    if (e && e.beta)
      return e.beta;
    var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (e) {
      var i = this.curve, r = function(n) {
        return i.point(n.x.redMul(i.endo.beta), n.y);
      };
      e.beta = t, t.precomputed = {
        beta: null,
        naf: e.naf && {
          wnd: e.naf.wnd,
          points: e.naf.points.map(r)
        },
        doubles: e.doubles && {
          step: e.doubles.step,
          points: e.doubles.points.map(r)
        }
      };
    }
    return t;
  }
};
Ot.prototype.toJSON = function() {
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
Ot.fromJSON = function(e, t, i) {
  typeof t == "string" && (t = JSON.parse(t));
  var r = e.point(t[0], t[1], i);
  if (!t[2])
    return r;
  function n(a) {
    return e.point(a[0], a[1], i);
  }
  var s = t[2];
  return r.precomputed = {
    beta: null,
    doubles: s.doubles && {
      step: s.doubles.step,
      points: [r].concat(s.doubles.points.map(n))
    },
    naf: s.naf && {
      wnd: s.naf.wnd,
      points: [r].concat(s.naf.points.map(n))
    }
  }, r;
};
Ot.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Ot.prototype.isInfinity = function() {
  return this.inf;
};
Ot.prototype.add = function(e) {
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
  var i = t.redSqr().redISub(this.x).redISub(e.x), r = t.redMul(this.x.redSub(i)).redISub(this.y);
  return this.curve.point(i, r);
};
Ot.prototype.dbl = function() {
  if (this.inf)
    return this;
  var e = this.y.redAdd(this.y);
  if (e.cmpn(0) === 0)
    return this.curve.point(null, null);
  var t = this.curve.a, i = this.x.redSqr(), r = e.redInvm(), n = i.redAdd(i).redIAdd(i).redIAdd(t).redMul(r), s = n.redSqr().redISub(this.x.redAdd(this.x)), a = n.redMul(this.x.redSub(s)).redISub(this.y);
  return this.curve.point(s, a);
};
Ot.prototype.getX = function() {
  return this.x.fromRed();
};
Ot.prototype.getY = function() {
  return this.y.fromRed();
};
Ot.prototype.mul = function(e) {
  return e = new lt(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e);
};
Ot.prototype.mulAdd = function(e, t, i) {
  var r = [this, t], n = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(r, n) : this.curve._wnafMulAdd(1, r, n, 2);
};
Ot.prototype.jmulAdd = function(e, t, i) {
  var r = [this, t], n = [e, i];
  return this.curve.endo ? this.curve._endoWnafMulAdd(r, n, !0) : this.curve._wnafMulAdd(1, r, n, 2, !0);
};
Ot.prototype.eq = function(e) {
  return this === e || this.inf === e.inf && (this.inf || this.x.cmp(e.x) === 0 && this.y.cmp(e.y) === 0);
};
Ot.prototype.neg = function(e) {
  if (this.inf)
    return this;
  var t = this.curve.point(this.x, this.y.redNeg());
  if (e && this.precomputed) {
    var i = this.precomputed, r = function(n) {
      return n.neg();
    };
    t.precomputed = {
      naf: i.naf && {
        wnd: i.naf.wnd,
        points: i.naf.points.map(r)
      },
      doubles: i.doubles && {
        step: i.doubles.step,
        points: i.doubles.points.map(r)
      }
    };
  }
  return t;
};
Ot.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var e = this.curve.jpoint(this.x, this.y, this.curve.one);
  return e;
};
function Tt(e, t, i, r) {
  En.BasePoint.call(this, e, "jacobian"), t === null && i === null && r === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new lt(0)) : (this.x = new lt(t, 16), this.y = new lt(i, 16), this.z = new lt(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Ba(Tt, En.BasePoint);
yi.prototype.jpoint = function(e, t, i) {
  return new Tt(this, e, t, i);
};
Tt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var e = this.z.redInvm(), t = e.redSqr(), i = this.x.redMul(t), r = this.y.redMul(t).redMul(e);
  return this.curve.point(i, r);
};
Tt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
Tt.prototype.add = function(e) {
  if (this.isInfinity())
    return e;
  if (e.isInfinity())
    return this;
  var t = e.z.redSqr(), i = this.z.redSqr(), r = this.x.redMul(t), n = e.x.redMul(i), s = this.y.redMul(t.redMul(e.z)), a = e.y.redMul(i.redMul(this.z)), h = r.redSub(n), d = s.redSub(a);
  if (h.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var f = h.redSqr(), g = f.redMul(h), _ = r.redMul(f), x = d.redSqr().redIAdd(g).redISub(_).redISub(_), A = d.redMul(_.redISub(x)).redISub(s.redMul(g)), O = this.z.redMul(e.z).redMul(h);
  return this.curve.jpoint(x, A, O);
};
Tt.prototype.mixedAdd = function(e) {
  if (this.isInfinity())
    return e.toJ();
  if (e.isInfinity())
    return this;
  var t = this.z.redSqr(), i = this.x, r = e.x.redMul(t), n = this.y, s = e.y.redMul(t).redMul(this.z), a = i.redSub(r), h = n.redSub(s);
  if (a.cmpn(0) === 0)
    return h.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var d = a.redSqr(), f = d.redMul(a), g = i.redMul(d), _ = h.redSqr().redIAdd(f).redISub(g).redISub(g), x = h.redMul(g.redISub(_)).redISub(n.redMul(f)), A = this.z.redMul(a);
  return this.curve.jpoint(_, x, A);
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
  var r = this.curve.a, n = this.curve.tinv, s = this.x, a = this.y, h = this.z, d = h.redSqr().redSqr(), f = a.redAdd(a);
  for (t = 0; t < e; t++) {
    var g = s.redSqr(), _ = f.redSqr(), x = _.redSqr(), A = g.redAdd(g).redIAdd(g).redIAdd(r.redMul(d)), O = s.redMul(_), j = A.redSqr().redISub(O.redAdd(O)), F = O.redISub(j), V = A.redMul(F);
    V = V.redIAdd(V).redISub(x);
    var C = f.redMul(h);
    t + 1 < e && (d = d.redMul(x)), s = j, h = C, f = V;
  }
  return this.curve.jpoint(s, f.redMul(n), h);
};
Tt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
Tt.prototype._zeroDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var r = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), a = this.x.redAdd(n).redSqr().redISub(r).redISub(s);
    a = a.redIAdd(a);
    var h = r.redAdd(r).redIAdd(r), d = h.redSqr().redISub(a).redISub(a), f = s.redIAdd(s);
    f = f.redIAdd(f), f = f.redIAdd(f), e = d, t = h.redMul(a.redISub(d)).redISub(f), i = this.y.redAdd(this.y);
  } else {
    var g = this.x.redSqr(), _ = this.y.redSqr(), x = _.redSqr(), A = this.x.redAdd(_).redSqr().redISub(g).redISub(x);
    A = A.redIAdd(A);
    var O = g.redAdd(g).redIAdd(g), j = O.redSqr(), F = x.redIAdd(x);
    F = F.redIAdd(F), F = F.redIAdd(F), e = j.redISub(A).redISub(A), t = O.redMul(A.redISub(e)).redISub(F), i = this.y.redMul(this.z), i = i.redIAdd(i);
  }
  return this.curve.jpoint(e, t, i);
};
Tt.prototype._threeDbl = function() {
  var e, t, i;
  if (this.zOne) {
    var r = this.x.redSqr(), n = this.y.redSqr(), s = n.redSqr(), a = this.x.redAdd(n).redSqr().redISub(r).redISub(s);
    a = a.redIAdd(a);
    var h = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a), d = h.redSqr().redISub(a).redISub(a);
    e = d;
    var f = s.redIAdd(s);
    f = f.redIAdd(f), f = f.redIAdd(f), t = h.redMul(a.redISub(d)).redISub(f), i = this.y.redAdd(this.y);
  } else {
    var g = this.z.redSqr(), _ = this.y.redSqr(), x = this.x.redMul(_), A = this.x.redSub(g).redMul(this.x.redAdd(g));
    A = A.redAdd(A).redIAdd(A);
    var O = x.redIAdd(x);
    O = O.redIAdd(O);
    var j = O.redAdd(O);
    e = A.redSqr().redISub(j), i = this.y.redAdd(this.z).redSqr().redISub(_).redISub(g);
    var F = _.redSqr();
    F = F.redIAdd(F), F = F.redIAdd(F), F = F.redIAdd(F), t = A.redMul(O.redISub(e)).redISub(F);
  }
  return this.curve.jpoint(e, t, i);
};
Tt.prototype._dbl = function() {
  var e = this.curve.a, t = this.x, i = this.y, r = this.z, n = r.redSqr().redSqr(), s = t.redSqr(), a = i.redSqr(), h = s.redAdd(s).redIAdd(s).redIAdd(e.redMul(n)), d = t.redAdd(t);
  d = d.redIAdd(d);
  var f = d.redMul(a), g = h.redSqr().redISub(f.redAdd(f)), _ = f.redISub(g), x = a.redSqr();
  x = x.redIAdd(x), x = x.redIAdd(x), x = x.redIAdd(x);
  var A = h.redMul(_).redISub(x), O = i.redAdd(i).redMul(r);
  return this.curve.jpoint(g, A, O);
};
Tt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr(), r = t.redSqr(), n = e.redAdd(e).redIAdd(e), s = n.redSqr(), a = this.x.redAdd(t).redSqr().redISub(e).redISub(r);
  a = a.redIAdd(a), a = a.redAdd(a).redIAdd(a), a = a.redISub(s);
  var h = a.redSqr(), d = r.redIAdd(r);
  d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
  var f = n.redIAdd(a).redSqr().redISub(s).redISub(h).redISub(d), g = t.redMul(f);
  g = g.redIAdd(g), g = g.redIAdd(g);
  var _ = this.x.redMul(h).redISub(g);
  _ = _.redIAdd(_), _ = _.redIAdd(_);
  var x = this.y.redMul(f.redMul(d.redISub(f)).redISub(a.redMul(h)));
  x = x.redIAdd(x), x = x.redIAdd(x), x = x.redIAdd(x);
  var A = this.z.redAdd(a).redSqr().redISub(i).redISub(h);
  return this.curve.jpoint(_, x, A);
};
Tt.prototype.mul = function(e, t) {
  return e = new lt(e, t), this.curve._wnafMul(this, e);
};
Tt.prototype.eq = function(e) {
  if (e.type === "affine")
    return this.eq(e.toJ());
  if (this === e)
    return !0;
  var t = this.z.redSqr(), i = e.z.redSqr();
  if (this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0) !== 0)
    return !1;
  var r = t.redMul(this.z), n = i.redMul(e.z);
  return this.y.redMul(n).redISub(e.y.redMul(r)).cmpn(0) === 0;
};
Tt.prototype.eqXToP = function(e) {
  var t = this.z.redSqr(), i = e.toRed(this.curve.red).redMul(t);
  if (this.x.cmp(i) === 0)
    return !0;
  for (var r = e.clone(), n = this.curve.redN.redMul(t); ; ) {
    if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)
      return !1;
    if (i.redIAdd(n), this.x.cmp(i) === 0)
      return !0;
  }
};
Tt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
Tt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var on = ur, Vu = co, bo = go, i2 = oi;
function Sn(e) {
  bo.call(this, "mont", e), this.a = new on(e.a, 16).toRed(this.red), this.b = new on(e.b, 16).toRed(this.red), this.i4 = new on(4).toRed(this.red).redInvm(), this.two = new on(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
Vu(Sn, bo);
var r2 = Sn;
Sn.prototype.validate = function(e) {
  var t = e.normalize().x, i = t.redSqr(), r = i.redMul(t).redAdd(i.redMul(this.a)).redAdd(t), n = r.redSqrt();
  return n.redSqr().cmp(r) === 0;
};
function At(e, t, i) {
  bo.BasePoint.call(this, e, "projective"), t === null && i === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new on(t, 16), this.z = new on(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
}
Vu(At, bo.BasePoint);
Sn.prototype.decodePoint = function(e, t) {
  return this.point(i2.toArray(e, t), 1);
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
  var e = this.x.redAdd(this.z), t = e.redSqr(), i = this.x.redSub(this.z), r = i.redSqr(), n = t.redSub(r), s = t.redMul(r), a = n.redMul(r.redAdd(this.curve.a24.redMul(n)));
  return this.curve.point(s, a);
};
At.prototype.add = function() {
  throw new Error("Not supported on Montgomery curve");
};
At.prototype.diffAdd = function(e, t) {
  var i = this.x.redAdd(this.z), r = this.x.redSub(this.z), n = e.x.redAdd(e.z), s = e.x.redSub(e.z), a = s.redMul(i), h = n.redMul(r), d = t.z.redMul(a.redAdd(h).redSqr()), f = t.x.redMul(a.redISub(h).redSqr());
  return this.curve.point(d, f);
};
At.prototype.mul = function(e) {
  for (var t = e.clone(), i = this, r = this.curve.point(null, null), n = this, s = []; t.cmpn(0) !== 0; t.iushrn(1))
    s.push(t.andln(1));
  for (var a = s.length - 1; a >= 0; a--)
    s[a] === 0 ? (i = i.diffAdd(r, n), r = r.dbl()) : (r = i.diffAdd(r, n), i = i.dbl());
  return r;
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
var n2 = oi, ar = ur, Hu = co, mo = go, s2 = n2.assert;
function $i(e) {
  this.twisted = (e.a | 0) !== 1, this.mOneA = this.twisted && (e.a | 0) === -1, this.extended = this.mOneA, mo.call(this, "edwards", e), this.a = new ar(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new ar(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new ar(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), s2(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (e.c | 0) === 1;
}
Hu($i, mo);
var o2 = $i;
$i.prototype._mulA = function(e) {
  return this.mOneA ? e.redNeg() : this.a.redMul(e);
};
$i.prototype._mulC = function(e) {
  return this.oneC ? e : this.c.redMul(e);
};
$i.prototype.jpoint = function(e, t, i, r) {
  return this.point(e, t, i, r);
};
$i.prototype.pointFromX = function(e, t) {
  e = new ar(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr(), r = this.c2.redSub(this.a.redMul(i)), n = this.one.redSub(this.c2.redMul(this.d).redMul(i)), s = r.redMul(n.redInvm()), a = s.redSqrt();
  if (a.redSqr().redSub(s).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var h = a.fromRed().isOdd();
  return (t && !h || !t && h) && (a = a.redNeg()), this.point(e, a);
};
$i.prototype.pointFromY = function(e, t) {
  e = new ar(e, 16), e.red || (e = e.toRed(this.red));
  var i = e.redSqr(), r = i.redSub(this.c2), n = i.redMul(this.d).redMul(this.c2).redSub(this.a), s = r.redMul(n.redInvm());
  if (s.cmp(this.zero) === 0) {
    if (t)
      throw new Error("invalid point");
    return this.point(this.zero, e);
  }
  var a = s.redSqrt();
  if (a.redSqr().redSub(s).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  return a.fromRed().isOdd() !== t && (a = a.redNeg()), this.point(a, e);
};
$i.prototype.validate = function(e) {
  if (e.isInfinity())
    return !0;
  e.normalize();
  var t = e.x.redSqr(), i = e.y.redSqr(), r = t.redMul(this.a).redAdd(i), n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(i)));
  return r.cmp(n) === 0;
};
function at(e, t, i, r, n) {
  mo.BasePoint.call(this, e, "projective"), t === null && i === null && r === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new ar(t, 16), this.y = new ar(i, 16), this.z = r ? new ar(r, 16) : this.curve.one, this.t = n && new ar(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
}
Hu(at, mo.BasePoint);
$i.prototype.pointFromJSON = function(e) {
  return at.fromJSON(this, e);
};
$i.prototype.point = function(e, t, i, r) {
  return new at(this, e, t, i, r);
};
at.fromJSON = function(e, t) {
  return new at(e, t[0], t[1], t[2]);
};
at.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
};
at.prototype.isInfinity = function() {
  return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
};
at.prototype._extDbl = function() {
  var e = this.x.redSqr(), t = this.y.redSqr(), i = this.z.redSqr();
  i = i.redIAdd(i);
  var r = this.curve._mulA(e), n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), s = r.redAdd(t), a = s.redSub(i), h = r.redSub(t), d = n.redMul(a), f = s.redMul(h), g = n.redMul(h), _ = a.redMul(s);
  return this.curve.point(d, f, _, g);
};
at.prototype._projDbl = function() {
  var e = this.x.redAdd(this.y).redSqr(), t = this.x.redSqr(), i = this.y.redSqr(), r, n, s, a, h, d;
  if (this.curve.twisted) {
    a = this.curve._mulA(t);
    var f = a.redAdd(i);
    this.zOne ? (r = e.redSub(t).redSub(i).redMul(f.redSub(this.curve.two)), n = f.redMul(a.redSub(i)), s = f.redSqr().redSub(f).redSub(f)) : (h = this.z.redSqr(), d = f.redSub(h).redISub(h), r = e.redSub(t).redISub(i).redMul(d), n = f.redMul(a.redSub(i)), s = f.redMul(d));
  } else
    a = t.redAdd(i), h = this.curve._mulC(this.z).redSqr(), d = a.redSub(h).redSub(h), r = this.curve._mulC(e.redISub(a)).redMul(d), n = this.curve._mulC(a).redMul(t.redISub(i)), s = a.redMul(d);
  return this.curve.point(r, n, s);
};
at.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
};
at.prototype._extAdd = function(e) {
  var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), i = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)), r = this.t.redMul(this.curve.dd).redMul(e.t), n = this.z.redMul(e.z.redAdd(e.z)), s = i.redSub(t), a = n.redSub(r), h = n.redAdd(r), d = i.redAdd(t), f = s.redMul(a), g = h.redMul(d), _ = s.redMul(d), x = a.redMul(h);
  return this.curve.point(f, g, x, _);
};
at.prototype._projAdd = function(e) {
  var t = this.z.redMul(e.z), i = t.redSqr(), r = this.x.redMul(e.x), n = this.y.redMul(e.y), s = this.curve.d.redMul(r).redMul(n), a = i.redSub(s), h = i.redAdd(s), d = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(r).redISub(n), f = t.redMul(a).redMul(d), g, _;
  return this.curve.twisted ? (g = t.redMul(h).redMul(n.redSub(this.curve._mulA(r))), _ = a.redMul(h)) : (g = t.redMul(h).redMul(n.redSub(r)), _ = this.curve._mulC(a).redMul(h)), this.curve.point(f, g, _);
};
at.prototype.add = function(e) {
  return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e);
};
at.prototype.mul = function(e) {
  return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e);
};
at.prototype.mulAdd = function(e, t, i) {
  return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !1);
};
at.prototype.jmulAdd = function(e, t, i) {
  return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !0);
};
at.prototype.normalize = function() {
  if (this.zOne)
    return this;
  var e = this.z.redInvm();
  return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this;
};
at.prototype.neg = function() {
  return this.curve.point(
    this.x.redNeg(),
    this.y,
    this.z,
    this.t && this.t.redNeg()
  );
};
at.prototype.getX = function() {
  return this.normalize(), this.x.fromRed();
};
at.prototype.getY = function() {
  return this.normalize(), this.y.fromRed();
};
at.prototype.eq = function(e) {
  return this === e || this.getX().cmp(e.getX()) === 0 && this.getY().cmp(e.getY()) === 0;
};
at.prototype.eqXToP = function(e) {
  var t = e.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(t) === 0)
    return !0;
  for (var i = e.clone(), r = this.curve.redN.redMul(this.z); ; ) {
    if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)
      return !1;
    if (t.redIAdd(r), this.x.cmp(t) === 0)
      return !0;
  }
};
at.prototype.toP = at.prototype.normalize;
at.prototype.mixedAdd = at.prototype.add;
(function(e) {
  var t = e;
  t.base = go, t.short = t2, t.mont = r2, t.edwards = o2;
})(Ka);
var yo = {}, lc, pc;
function a2() {
  return pc || (pc = 1, lc = {
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
  }), lc;
}
(function(e) {
  var t = e, i = rs, r = Ka, n = oi, s = n.assert;
  function a(f) {
    f.type === "short" ? this.curve = new r.short(f) : f.type === "edwards" ? this.curve = new r.edwards(f) : this.curve = new r.mont(f), this.g = this.curve.g, this.n = this.curve.n, this.hash = f.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  t.PresetCurve = a;
  function h(f, g) {
    Object.defineProperty(t, f, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var _ = new a(g);
        return Object.defineProperty(t, f, {
          configurable: !0,
          enumerable: !0,
          value: _
        }), _;
      }
    });
  }
  h("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: i.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), h("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: i.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), h("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: i.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), h("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: i.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), h("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: i.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), h("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: i.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), h("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: i.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var d;
  try {
    d = a2();
  } catch {
    d = void 0;
  }
  h("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: i.sha256,
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
      d
    ]
  });
})(yo);
var h2 = rs, Dr = Da, Wu = Gr;
function _r(e) {
  if (!(this instanceof _r))
    return new _r(e);
  this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = Dr.toArray(e.entropy, e.entropyEnc || "hex"), i = Dr.toArray(e.nonce, e.nonceEnc || "hex"), r = Dr.toArray(e.pers, e.persEnc || "hex");
  Wu(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(t, i, r);
}
var c2 = _r;
_r.prototype._init = function(e, t, i) {
  var r = e.concat(t).concat(i);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var n = 0; n < this.V.length; n++)
    this.K[n] = 0, this.V[n] = 1;
  this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656;
};
_r.prototype._hmac = function() {
  return new h2.hmac(this.hash, this.K);
};
_r.prototype._update = function(e) {
  var t = this._hmac().update(this.V).update([0]);
  e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest());
};
_r.prototype.reseed = function(e, t, i, r) {
  typeof t != "string" && (r = i, i = t, t = null), e = Dr.toArray(e, t), i = Dr.toArray(i, r), Wu(
    e.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(e.concat(i || [])), this._reseed = 1;
};
_r.prototype.generate = function(e, t, i, r) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof t != "string" && (r = i, i = t, t = null), i && (i = Dr.toArray(i, r || "hex"), this._update(i));
  for (var n = []; n.length < e; )
    this.V = this._hmac().update(this.V).digest(), n = n.concat(this.V);
  var s = n.slice(0, e);
  return this._update(i), this._reseed++, Dr.encode(s, t);
};
var f2 = ur, u2 = oi, ya = u2.assert;
function zt(e, t) {
  this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var d2 = zt;
zt.fromPublic = function(e, t, i) {
  return t instanceof zt ? t : new zt(e, {
    pub: t,
    pubEnc: i
  });
};
zt.fromPrivate = function(e, t, i) {
  return t instanceof zt ? t : new zt(e, {
    priv: t,
    privEnc: i
  });
};
zt.prototype.validate = function() {
  var e = this.getPublic();
  return e.isInfinity() ? { result: !1, reason: "Invalid public key" } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
zt.prototype.getPublic = function(e, t) {
  return typeof e == "string" && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub;
};
zt.prototype.getPrivate = function(e) {
  return e === "hex" ? this.priv.toString(16, 2) : this.priv;
};
zt.prototype._importPrivate = function(e, t) {
  this.priv = new f2(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
zt.prototype._importPublic = function(e, t) {
  if (e.x || e.y) {
    this.ec.curve.type === "mont" ? ya(e.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && ya(e.x && e.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(e.x, e.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(e, t);
};
zt.prototype.derive = function(e) {
  return e.validate() || ya(e.validate(), "public point not validated"), e.mul(this.priv).getX();
};
zt.prototype.sign = function(e, t, i) {
  return this.ec.sign(e, this, t, i);
};
zt.prototype.verify = function(e, t, i) {
  return this.ec.verify(e, t, this, void 0, i);
};
zt.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var Hs = ur, $a = oi, l2 = $a.assert;
function vo(e, t) {
  if (e instanceof vo)
    return e;
  this._importDER(e, t) || (l2(e.r && e.s, "Signature without r or s"), this.r = new Hs(e.r, 16), this.s = new Hs(e.s, 16), e.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam);
}
var p2 = vo;
function g2() {
  this.place = 0;
}
function Vo(e, t) {
  var i = e[t.place++];
  if (!(i & 128))
    return i;
  var r = i & 15;
  if (r === 0 || r > 4 || e[t.place] === 0)
    return !1;
  for (var n = 0, s = 0, a = t.place; s < r; s++, a++)
    n <<= 8, n |= e[a], n >>>= 0;
  return n <= 127 ? !1 : (t.place = a, n);
}
function gc(e) {
  for (var t = 0, i = e.length - 1; !e[t] && !(e[t + 1] & 128) && t < i; )
    t++;
  return t === 0 ? e : e.slice(t);
}
vo.prototype._importDER = function(e, t) {
  e = $a.toArray(e, t);
  var i = new g2();
  if (e[i.place++] !== 48)
    return !1;
  var r = Vo(e, i);
  if (r === !1 || r + i.place !== e.length || e[i.place++] !== 2)
    return !1;
  var n = Vo(e, i);
  if (n === !1 || e[i.place] & 128)
    return !1;
  var s = e.slice(i.place, n + i.place);
  if (i.place += n, e[i.place++] !== 2)
    return !1;
  var a = Vo(e, i);
  if (a === !1 || e.length !== a + i.place || e[i.place] & 128)
    return !1;
  var h = e.slice(i.place, a + i.place);
  if (s[0] === 0)
    if (s[1] & 128)
      s = s.slice(1);
    else
      return !1;
  if (h[0] === 0)
    if (h[1] & 128)
      h = h.slice(1);
    else
      return !1;
  return this.r = new Hs(s), this.s = new Hs(h), this.recoveryParam = null, !0;
};
function Ho(e, t) {
  if (t < 128) {
    e.push(t);
    return;
  }
  var i = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (e.push(i | 128); --i; )
    e.push(t >>> (i << 3) & 255);
  e.push(t);
}
vo.prototype.toDER = function(e) {
  var t = this.r.toArray(), i = this.s.toArray();
  for (t[0] & 128 && (t = [0].concat(t)), i[0] & 128 && (i = [0].concat(i)), t = gc(t), i = gc(i); !i[0] && !(i[1] & 128); )
    i = i.slice(1);
  var r = [2];
  Ho(r, t.length), r = r.concat(t), r.push(2), Ho(r, i.length);
  var n = r.concat(i), s = [48];
  return Ho(s, n.length), s = s.concat(n), $a.encode(s, e);
};
var Ai = ur, Gu = c2, b2 = oi, Wo = yo, m2 = $u, Cr = b2.assert, Va = d2, wo = p2;
function pi(e) {
  if (!(this instanceof pi))
    return new pi(e);
  typeof e == "string" && (Cr(
    Object.prototype.hasOwnProperty.call(Wo, e),
    "Unknown curve " + e
  ), e = Wo[e]), e instanceof Wo.PresetCurve && (e = { curve: e }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash;
}
var y2 = pi;
pi.prototype.keyPair = function(e) {
  return new Va(this, e);
};
pi.prototype.keyFromPrivate = function(e, t) {
  return Va.fromPrivate(this, e, t);
};
pi.prototype.keyFromPublic = function(e, t) {
  return Va.fromPublic(this, e, t);
};
pi.prototype.genKeyPair = function(e) {
  e || (e = {});
  for (var t = new Gu({
    hash: this.hash,
    pers: e.pers,
    persEnc: e.persEnc || "utf8",
    entropy: e.entropy || m2(this.hash.hmacStrength),
    entropyEnc: e.entropy && e.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), i = this.n.byteLength(), r = this.n.sub(new Ai(2)); ; ) {
    var n = new Ai(t.generate(i));
    if (!(n.cmp(r) > 0))
      return n.iaddn(1), this.keyFromPrivate(n);
  }
};
pi.prototype._truncateToN = function(e, t, i) {
  var r;
  if (Ai.isBN(e) || typeof e == "number")
    e = new Ai(e, 16), r = e.byteLength();
  else if (typeof e == "object")
    r = e.length, e = new Ai(e, 16);
  else {
    var n = e.toString();
    r = n.length + 1 >>> 1, e = new Ai(n, 16);
  }
  typeof i != "number" && (i = r * 8);
  var s = i - this.n.bitLength();
  return s > 0 && (e = e.ushrn(s)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e;
};
pi.prototype.sign = function(e, t, i, r) {
  if (typeof i == "object" && (r = i, i = null), r || (r = {}), typeof e != "string" && typeof e != "number" && !Ai.isBN(e)) {
    Cr(
      typeof e == "object" && e && typeof e.length == "number",
      "Expected message to be an array-like, a hex string, or a BN instance"
    ), Cr(e.length >>> 0 === e.length);
    for (var n = 0; n < e.length; n++)
      Cr((e[n] & 255) === e[n]);
  }
  t = this.keyFromPrivate(t, i), e = this._truncateToN(e, !1, r.msgBitLength), Cr(!e.isNeg(), "Can not sign a negative message");
  var s = this.n.byteLength(), a = t.getPrivate().toArray("be", s), h = e.toArray("be", s);
  Cr(new Ai(h).eq(e), "Can not sign message");
  for (var d = new Gu({
    hash: this.hash,
    entropy: a,
    nonce: h,
    pers: r.pers,
    persEnc: r.persEnc || "utf8"
  }), f = this.n.sub(new Ai(1)), g = 0; ; g++) {
    var _ = r.k ? r.k(g) : new Ai(d.generate(this.n.byteLength()));
    if (_ = this._truncateToN(_, !0), !(_.cmpn(1) <= 0 || _.cmp(f) >= 0)) {
      var x = this.g.mul(_);
      if (!x.isInfinity()) {
        var A = x.getX(), O = A.umod(this.n);
        if (O.cmpn(0) !== 0) {
          var j = _.invm(this.n).mul(O.mul(t.getPrivate()).iadd(e));
          if (j = j.umod(this.n), j.cmpn(0) !== 0) {
            var F = (x.getY().isOdd() ? 1 : 0) | (A.cmp(O) !== 0 ? 2 : 0);
            return r.canonical && j.cmp(this.nh) > 0 && (j = this.n.sub(j), F ^= 1), new wo({ r: O, s: j, recoveryParam: F });
          }
        }
      }
    }
  }
};
pi.prototype.verify = function(e, t, i, r, n) {
  n || (n = {}), e = this._truncateToN(e, !1, n.msgBitLength), i = this.keyFromPublic(i, r), t = new wo(t, "hex");
  var s = t.r, a = t.s;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0 || a.cmpn(1) < 0 || a.cmp(this.n) >= 0)
    return !1;
  var h = a.invm(this.n), d = h.mul(e).umod(this.n), f = h.mul(s).umod(this.n), g;
  return this.curve._maxwellTrick ? (g = this.g.jmulAdd(d, i.getPublic(), f), g.isInfinity() ? !1 : g.eqXToP(s)) : (g = this.g.mulAdd(d, i.getPublic(), f), g.isInfinity() ? !1 : g.getX().umod(this.n).cmp(s) === 0);
};
pi.prototype.recoverPubKey = function(e, t, i, r) {
  Cr((3 & i) === i, "The recovery param is more than two bits"), t = new wo(t, r);
  var n = this.n, s = new Ai(e), a = t.r, h = t.s, d = i & 1, f = i >> 1;
  if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && f)
    throw new Error("Unable to find sencond key candinate");
  f ? a = this.curve.pointFromX(a.add(this.curve.n), d) : a = this.curve.pointFromX(a, d);
  var g = t.r.invm(n), _ = n.sub(s).mul(g).umod(n), x = h.mul(g).umod(n);
  return this.g.mulAdd(_, a, x);
};
pi.prototype.getKeyRecoveryParam = function(e, t, i, r) {
  if (t = new wo(t, r), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var n = 0; n < 4; n++) {
    var s;
    try {
      s = this.recoverPubKey(e, t, n);
    } catch {
      continue;
    }
    if (s.eq(i))
      return n;
  }
  throw new Error("Unable to find valid recovery factor");
};
var as = oi, Yu = as.assert, bc = as.parseBytes, In = as.cachedProperty;
function Mt(e, t) {
  this.eddsa = e, this._secret = bc(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = bc(t.pub);
}
Mt.fromPublic = function(e, t) {
  return t instanceof Mt ? t : new Mt(e, { pub: t });
};
Mt.fromSecret = function(e, t) {
  return t instanceof Mt ? t : new Mt(e, { secret: t });
};
Mt.prototype.secret = function() {
  return this._secret;
};
In(Mt, "pubBytes", function() {
  return this.eddsa.encodePoint(this.pub());
});
In(Mt, "pub", function() {
  return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
});
In(Mt, "privBytes", function() {
  var e = this.eddsa, t = this.hash(), i = e.encodingLength - 1, r = t.slice(0, e.encodingLength);
  return r[0] &= 248, r[i] &= 127, r[i] |= 64, r;
});
In(Mt, "priv", function() {
  return this.eddsa.decodeInt(this.privBytes());
});
In(Mt, "hash", function() {
  return this.eddsa.hash().update(this.secret()).digest();
});
In(Mt, "messagePrefix", function() {
  return this.hash().slice(this.eddsa.encodingLength);
});
Mt.prototype.sign = function(e) {
  return Yu(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this);
};
Mt.prototype.verify = function(e, t) {
  return this.eddsa.verify(e, t, this);
};
Mt.prototype.getSecret = function(e) {
  return Yu(this._secret, "KeyPair is public only"), as.encode(this.secret(), e);
};
Mt.prototype.getPublic = function(e) {
  return as.encode(this.pubBytes(), e);
};
var v2 = Mt, w2 = ur, _o = oi, mc = _o.assert, Eo = _o.cachedProperty, _2 = _o.parseBytes;
function Jr(e, t) {
  this.eddsa = e, typeof t != "object" && (t = _2(t)), Array.isArray(t) && (mc(t.length === e.encodingLength * 2, "Signature has invalid size"), t = {
    R: t.slice(0, e.encodingLength),
    S: t.slice(e.encodingLength)
  }), mc(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof w2 && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded;
}
Eo(Jr, "S", function() {
  return this.eddsa.decodeInt(this.Sencoded());
});
Eo(Jr, "R", function() {
  return this.eddsa.decodePoint(this.Rencoded());
});
Eo(Jr, "Rencoded", function() {
  return this.eddsa.encodePoint(this.R());
});
Eo(Jr, "Sencoded", function() {
  return this.eddsa.encodeInt(this.S());
});
Jr.prototype.toBytes = function() {
  return this.Rencoded().concat(this.Sencoded());
};
Jr.prototype.toHex = function() {
  return _o.encode(this.toBytes(), "hex").toUpperCase();
};
var E2 = Jr, S2 = rs, I2 = yo, pn = oi, M2 = pn.assert, Ju = pn.parseBytes, Zu = v2, yc = E2;
function Jt(e) {
  if (M2(e === "ed25519", "only tested with ed25519 so far"), !(this instanceof Jt))
    return new Jt(e);
  e = I2[e].curve, this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = S2.sha512;
}
var A2 = Jt;
Jt.prototype.sign = function(e, t) {
  e = Ju(e);
  var i = this.keyFromSecret(t), r = this.hashInt(i.messagePrefix(), e), n = this.g.mul(r), s = this.encodePoint(n), a = this.hashInt(s, i.pubBytes(), e).mul(i.priv()), h = r.add(a).umod(this.curve.n);
  return this.makeSignature({ R: n, S: h, Rencoded: s });
};
Jt.prototype.verify = function(e, t, i) {
  if (e = Ju(e), t = this.makeSignature(t), t.S().gte(t.eddsa.curve.n) || t.S().isNeg())
    return !1;
  var r = this.keyFromPublic(i), n = this.hashInt(t.Rencoded(), r.pubBytes(), e), s = this.g.mul(t.S()), a = t.R().add(r.pub().mul(n));
  return a.eq(s);
};
Jt.prototype.hashInt = function() {
  for (var e = this.hash(), t = 0; t < arguments.length; t++)
    e.update(arguments[t]);
  return pn.intFromLE(e.digest()).umod(this.curve.n);
};
Jt.prototype.keyFromPublic = function(e) {
  return Zu.fromPublic(this, e);
};
Jt.prototype.keyFromSecret = function(e) {
  return Zu.fromSecret(this, e);
};
Jt.prototype.makeSignature = function(e) {
  return e instanceof yc ? e : new yc(this, e);
};
Jt.prototype.encodePoint = function(e) {
  var t = e.getY().toArray("le", this.encodingLength);
  return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t;
};
Jt.prototype.decodePoint = function(e) {
  e = pn.parseBytes(e);
  var t = e.length - 1, i = e.slice(0, t).concat(e[t] & -129), r = (e[t] & 128) !== 0, n = pn.intFromLE(i);
  return this.curve.pointFromY(n, r);
};
Jt.prototype.encodeInt = function(e) {
  return e.toArray("le", this.encodingLength);
};
Jt.prototype.decodeInt = function(e) {
  return pn.intFromLE(e);
};
Jt.prototype.isPoint = function(e) {
  return e instanceof this.pointClass;
};
(function(e) {
  var t = e;
  t.version = Zm.version, t.utils = oi, t.rand = $u, t.curve = Ka, t.curves = yo, t.ec = y2, t.eddsa = A2;
})(Ku);
const x2 = { waku: { publish: "waku_publish", batchPublish: "waku_batchPublish", subscribe: "waku_subscribe", batchSubscribe: "waku_batchSubscribe", subscription: "waku_subscription", unsubscribe: "waku_unsubscribe", batchUnsubscribe: "waku_batchUnsubscribe", batchFetchMessages: "waku_batchFetchMessages" }, irn: { publish: "irn_publish", batchPublish: "irn_batchPublish", subscribe: "irn_subscribe", batchSubscribe: "irn_batchSubscribe", subscription: "irn_subscription", unsubscribe: "irn_unsubscribe", batchUnsubscribe: "irn_batchUnsubscribe", batchFetchMessages: "irn_batchFetchMessages" }, iridium: { publish: "iridium_publish", batchPublish: "iridium_batchPublish", subscribe: "iridium_subscribe", batchSubscribe: "iridium_batchSubscribe", subscription: "iridium_subscription", unsubscribe: "iridium_unsubscribe", batchUnsubscribe: "iridium_batchUnsubscribe", batchFetchMessages: "iridium_batchFetchMessages" } }, Ha = ":";
function Rs(e) {
  const [t, i] = e.split(Ha);
  return { namespace: t, reference: i };
}
function O2(e) {
  const { namespace: t, reference: i } = e;
  return [t, i].join(Ha);
}
function P2(e) {
  const [t, i, r] = e.split(Ha);
  return { namespace: t, reference: i, address: r };
}
function N2(e, t) {
  const i = [];
  return e.forEach((r) => {
    const n = t(r);
    i.includes(n) || i.push(n);
  }), i;
}
function R2(e) {
  const { namespace: t, reference: i } = P2(e);
  return O2({ namespace: t, reference: i });
}
function T2(e) {
  return N2(e, R2);
}
function Xu(e, t = []) {
  const i = [];
  return Object.keys(e).forEach((r) => {
    if (t.length && !t.includes(r))
      return;
    const n = e[r];
    i.push(...n.accounts);
  }), i;
}
function Qu(e, t = []) {
  const i = [];
  return Object.keys(e).forEach((r) => {
    if (t.length && !t.includes(r))
      return;
    const n = e[r];
    i.push(...T2(n.accounts));
  }), i;
}
function k2(e, t = []) {
  const i = [];
  return Object.keys(e).forEach((r) => {
    if (t.length && !t.includes(r))
      return;
    const n = e[r];
    i.push(...Wa(r, n));
  }), i;
}
function Wa(e, t) {
  return e.includes(":") ? [e] : t.chains || [];
}
var L2 = Object.defineProperty, vc = Object.getOwnPropertySymbols, C2 = Object.prototype.hasOwnProperty, q2 = Object.prototype.propertyIsEnumerable, wc = (e, t, i) => t in e ? L2(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, _c = (e, t) => {
  for (var i in t || (t = {}))
    C2.call(t, i) && wc(e, i, t[i]);
  if (vc)
    for (var i of vc(t))
      q2.call(t, i) && wc(e, i, t[i]);
  return e;
};
const j2 = "ReactNative", ii = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, z2 = "js";
function Ws() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function Ar() {
  return !is() && !!Pa() && navigator.product === j2;
}
function U2() {
  return Ar() && typeof globalThis < "u" && typeof globalThis?.Platform < "u" && globalThis?.Platform.OS === "android";
}
function D2() {
  return Ar() && typeof globalThis < "u" && typeof globalThis?.Platform < "u" && globalThis?.Platform.OS === "ios";
}
function hs() {
  return !Ws() && !!Pa() && !!is();
}
function cs() {
  return Ar() ? ii.reactNative : Ws() ? ii.node : hs() ? ii.browser : ii.unknown;
}
function Ec() {
  var e;
  try {
    return Ar() && typeof globalThis < "u" && typeof globalThis?.Application < "u" ? (e = globalThis.Application) == null ? void 0 : e.applicationId : void 0;
  } catch {
    return;
  }
}
function F2(e, t) {
  let i = Yn.parse(e);
  return i = _c(_c({}, i), t), e = Yn.stringify(i), e;
}
function ed() {
  return hu() || { name: "", description: "", url: "", icons: [""] };
}
function K2() {
  if (cs() === ii.reactNative && typeof globalThis < "u" && typeof globalThis?.Platform < "u") {
    const { OS: i, Version: r } = globalThis.Platform;
    return [i, r].join("-");
  }
  const e = ou();
  if (e === null)
    return "unknown";
  const t = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser" ? [t, e.name, e.version].join("-") : [t, e.version].join("-");
}
function B2() {
  var e;
  const t = cs();
  return t === ii.browser ? [t, ((e = au()) == null ? void 0 : e.host) || "unknown"].join(":") : t;
}
function td(e, t, i) {
  const r = K2(), n = B2();
  return [[e, t].join("-"), [z2, i].join("-"), r, n].join("/");
}
function $2({ protocol: e, version: t, relayUrl: i, sdkVersion: r, auth: n, projectId: s, useOnCloseEvent: a, bundleId: h, packageName: d }) {
  const f = i.split("?"), g = td(e, t, r), _ = { auth: n, ua: g, projectId: s, useOnCloseEvent: a, packageName: d || void 0, bundleId: h || void 0 }, x = F2(f[1] || "", _);
  return f[0] + "?" + x;
}
function jr(e, t) {
  return e.filter((i) => t.includes(i)).length === e.length;
}
function id(e) {
  return Object.fromEntries(e.entries());
}
function rd(e) {
  return new Map(Object.entries(e));
}
function Lr(e = te.FIVE_MINUTES, t) {
  const i = te.toMiliseconds(e || te.FIVE_MINUTES);
  let r, n, s, a;
  return { resolve: (h) => {
    s && r && (clearTimeout(s), r(h), a = Promise.resolve(h));
  }, reject: (h) => {
    s && n && (clearTimeout(s), n(h));
  }, done: () => new Promise((h, d) => {
    if (a)
      return h(a);
    s = setTimeout(() => {
      const f = new Error(t);
      a = Promise.reject(f), d(f);
    }, i), r = h, n = d;
  }) };
}
function yr(e, t, i) {
  return new Promise(async (r, n) => {
    const s = setTimeout(() => n(new Error(i)), t);
    try {
      const a = await e;
      r(a);
    } catch (a) {
      n(a);
    }
    clearTimeout(s);
  });
}
function nd(e, t) {
  if (typeof t == "string" && t.startsWith(`${e}:`))
    return t;
  if (e.toLowerCase() === "topic") {
    if (typeof t != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof t != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function V2(e) {
  return nd("topic", e);
}
function H2(e) {
  return nd("id", e);
}
function sd(e) {
  const [t, i] = e.split(":"), r = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof i == "string")
    r.topic = i;
  else if (t === "id" && Number.isInteger(Number(i)))
    r.id = Number(i);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${i}`);
  return r;
}
function yt(e, t) {
  return te.fromMiliseconds(Date.now() + te.toMiliseconds(e));
}
function br(e) {
  return Date.now() >= te.toMiliseconds(e);
}
function Ze(e, t) {
  return `${e}${t ? `:${t}` : ""}`;
}
function W2(e = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e, ...t])];
}
async function G2({ id: e, topic: t, wcDeepLink: i }) {
  var r;
  try {
    if (!i)
      return;
    const n = typeof i == "string" ? JSON.parse(i) : i, s = n?.href;
    if (typeof s != "string")
      return;
    const a = Y2(s, e, t), h = cs();
    if (h === ii.browser) {
      if (!((r = is()) != null && r.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      a.startsWith("https://") || a.startsWith("http://") ? window.open(a, "_blank", "noreferrer noopener") : window.open(a, Z2() ? "_blank" : "_self", "noreferrer noopener");
    } else
      h === ii.reactNative && typeof globalThis?.Linking < "u" && await globalThis.Linking.openURL(a);
  } catch (n) {
    console.error(n);
  }
}
function Y2(e, t, i) {
  const r = `requestId=${t}&sessionTopic=${i}`;
  e.endsWith("/") && (e = e.slice(0, -1));
  let n = `${e}`;
  if (e.startsWith("https://t.me")) {
    const s = e.includes("?") ? "&startapp=" : "?startapp=";
    n = `${n}${s}${X2(r, !0)}`;
  } else
    n = `${n}/wc?${r}`;
  return n;
}
async function J2(e, t) {
  let i = "";
  try {
    if (hs() && (i = localStorage.getItem(t), i))
      return i;
    i = await e.getItem(t);
  } catch (r) {
    console.error(r);
  }
  return i;
}
function Sc(e, t) {
  if (!e.includes(t))
    return null;
  const i = e.split(/([&,?,=])/), r = i.indexOf(t);
  return i[r + 2];
}
function Ic() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
function Ga() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function Z2() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function X2(e, t = !1) {
  const i = Buffer.from(e).toString("base64");
  return t ? i.replace(/[=]/g, "") : i;
}
function od(e) {
  return Buffer.from(e, "base64").toString("utf-8");
}
function Q2(e) {
  return new Promise((t) => setTimeout(t, e));
}
const e6 = "https://rpc.walletconnect.org/v1";
async function t6(e, t, i, r, n, s) {
  switch (i.t) {
    case "eip191":
      return i6(e, t, i.s);
    case "eip1271":
      return await r6(e, t, i.s, r, n, s);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${i.t}`);
  }
}
function i6(e, t, i) {
  return qm(pu(t), i).toLowerCase() === e.toLowerCase();
}
async function r6(e, t, i, r, n, s) {
  const a = Rs(r);
  if (!a.namespace || !a.reference)
    throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);
  try {
    const h = "0x1626ba7e", d = "0000000000000000000000000000000000000000000000000000000000000040", f = "0000000000000000000000000000000000000000000000000000000000000041", g = i.substring(2), _ = pu(t).substring(2), x = h + _ + d + f + g, A = await fetch(`${s || e6}/?chainId=${r}&projectId=${n}`, { method: "POST", body: JSON.stringify({ id: n6(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e, data: x }, "latest"] }) }), { result: O } = await A.json();
    return O ? O.slice(0, h.length).toLowerCase() === h.toLowerCase() : !1;
  } catch (h) {
    return console.error("isValidEip1271Signature: ", h), !1;
  }
}
function n6() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var s6 = Object.defineProperty, o6 = Object.defineProperties, a6 = Object.getOwnPropertyDescriptors, Mc = Object.getOwnPropertySymbols, h6 = Object.prototype.hasOwnProperty, c6 = Object.prototype.propertyIsEnumerable, Ac = (e, t, i) => t in e ? s6(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, f6 = (e, t) => {
  for (var i in t || (t = {}))
    h6.call(t, i) && Ac(e, i, t[i]);
  if (Mc)
    for (var i of Mc(t))
      c6.call(t, i) && Ac(e, i, t[i]);
  return e;
}, u6 = (e, t) => o6(e, a6(t));
const d6 = "did:pkh:", Ya = (e) => e?.split(":"), l6 = (e) => {
  const t = e && Ya(e);
  if (t)
    return e.includes(d6) ? t[3] : t[1];
}, va = (e) => {
  const t = e && Ya(e);
  if (t)
    return t[2] + ":" + t[3];
}, Gs = (e) => {
  const t = e && Ya(e);
  if (t)
    return t.pop();
};
async function xc(e) {
  const { cacao: t, projectId: i } = e, { s: r, p: n } = t, s = ad(n, n.iss), a = Gs(n.iss);
  return await t6(a, s, r, va(n.iss), i);
}
const ad = (e, t) => {
  const i = `${e.domain} wants you to sign in with your Ethereum account:`, r = Gs(t);
  if (!e.aud && !e.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let n = e.statement || void 0;
  const s = `URI: ${e.aud || e.uri}`, a = `Version: ${e.version}`, h = `Chain ID: ${l6(t)}`, d = `Nonce: ${e.nonce}`, f = `Issued At: ${e.iat}`, g = e.exp ? `Expiration Time: ${e.exp}` : void 0, _ = e.nbf ? `Not Before: ${e.nbf}` : void 0, x = e.requestId ? `Request ID: ${e.requestId}` : void 0, A = e.resources ? `Resources:${e.resources.map((j) => `
- ${j}`).join("")}` : void 0, O = Ts(e.resources);
  if (O) {
    const j = Jn(O);
    n = E6(n, j);
  }
  return [i, r, "", n, "", s, a, h, d, f, g, _, x, A].filter((j) => j != null).join(`
`);
};
function p6(e) {
  return Buffer.from(JSON.stringify(e)).toString("base64");
}
function g6(e) {
  return JSON.parse(Buffer.from(e, "base64").toString("utf-8"));
}
function Br(e) {
  if (!e)
    throw new Error("No recap provided, value is undefined");
  if (!e.att)
    throw new Error("No `att` property found");
  const t = Object.keys(e.att);
  if (!(t != null && t.length))
    throw new Error("No resources found in `att` property");
  t.forEach((i) => {
    const r = e.att[i];
    if (Array.isArray(r))
      throw new Error(`Resource must be an object: ${i}`);
    if (typeof r != "object")
      throw new Error(`Resource must be an object: ${i}`);
    if (!Object.keys(r).length)
      throw new Error(`Resource object is empty: ${i}`);
    Object.keys(r).forEach((n) => {
      const s = r[n];
      if (!Array.isArray(s))
        throw new Error(`Ability limits ${n} must be an array of objects, found: ${s}`);
      if (!s.length)
        throw new Error(`Value of ${n} is empty array, must be an array with objects`);
      s.forEach((a) => {
        if (typeof a != "object")
          throw new Error(`Ability limits (${n}) must be an array of objects, found: ${a}`);
      });
    });
  });
}
function b6(e, t, i, r = {}) {
  return i?.sort((n, s) => n.localeCompare(s)), { att: { [e]: m6(t, i, r) } };
}
function m6(e, t, i = {}) {
  t = t?.sort((n, s) => n.localeCompare(s));
  const r = t.map((n) => ({ [`${e}/${n}`]: [i] }));
  return Object.assign({}, ...r);
}
function hd(e) {
  return Br(e), `urn:recap:${p6(e).replace(/=/g, "")}`;
}
function Jn(e) {
  const t = g6(e.replace("urn:recap:", ""));
  return Br(t), t;
}
function y6(e, t, i) {
  const r = b6(e, t, i);
  return hd(r);
}
function v6(e) {
  return e && e.includes("urn:recap:");
}
function w6(e, t) {
  const i = Jn(e), r = Jn(t), n = _6(i, r);
  return hd(n);
}
function _6(e, t) {
  Br(e), Br(t);
  const i = Object.keys(e.att).concat(Object.keys(t.att)).sort((n, s) => n.localeCompare(s)), r = { att: {} };
  return i.forEach((n) => {
    var s, a;
    Object.keys(((s = e.att) == null ? void 0 : s[n]) || {}).concat(Object.keys(((a = t.att) == null ? void 0 : a[n]) || {})).sort((h, d) => h.localeCompare(d)).forEach((h) => {
      var d, f;
      r.att[n] = u6(f6({}, r.att[n]), { [h]: ((d = e.att[n]) == null ? void 0 : d[h]) || ((f = t.att[n]) == null ? void 0 : f[h]) });
    });
  }), r;
}
function E6(e = "", t) {
  Br(t);
  const i = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e.includes(i))
    return e;
  const r = [];
  let n = 0;
  Object.keys(t.att).forEach((h) => {
    const d = Object.keys(t.att[h]).map((_) => ({ ability: _.split("/")[0], action: _.split("/")[1] }));
    d.sort((_, x) => _.action.localeCompare(x.action));
    const f = {};
    d.forEach((_) => {
      f[_.ability] || (f[_.ability] = []), f[_.ability].push(_.action);
    });
    const g = Object.keys(f).map((_) => (n++, `(${n}) '${_}': '${f[_].join("', '")}' for '${h}'.`));
    r.push(g.join(", ").replace(".,", "."));
  });
  const s = r.join(" "), a = `${i}${s}`;
  return `${e ? e + " " : ""}${a}`;
}
function Oc(e) {
  var t;
  const i = Jn(e);
  Br(i);
  const r = (t = i.att) == null ? void 0 : t.eip155;
  return r ? Object.keys(r).map((n) => n.split("/")[1]) : [];
}
function Pc(e) {
  const t = Jn(e);
  Br(t);
  const i = [];
  return Object.values(t.att).forEach((r) => {
    Object.values(r).forEach((n) => {
      var s;
      (s = n?.[0]) != null && s.chains && i.push(n[0].chains);
    });
  }), [...new Set(i.flat())];
}
function Ts(e) {
  if (!e)
    return;
  const t = e?.[e.length - 1];
  return v6(t) ? t : void 0;
}
const cd = "base10", Dt = "base16", vr = "base64pad", Cn = "base64url", fs = "utf8", fd = 0, hr = 1, us = 2, S6 = 0, Nc = 1, Bn = 12, Ja = 32;
function I6() {
  const e = Ua.generateKeyPair();
  return { privateKey: It(e.secretKey, Dt), publicKey: It(e.publicKey, Dt) };
}
function wa() {
  const e = Er.randomBytes(Ja);
  return It(e, Dt);
}
function M6(e, t) {
  const i = Ua.sharedKey(St(e, Dt), St(t, Dt), !0), r = new Ym(ss.SHA256, i).expand(Ja);
  return It(r, Dt);
}
function ks(e) {
  const t = ss.hash(St(e, Dt));
  return It(t, Dt);
}
function or(e) {
  const t = ss.hash(St(e, fs));
  return It(t, Dt);
}
function ud(e) {
  return St(`${e}`, cd);
}
function $r(e) {
  return Number(It(e, cd));
}
function A6(e) {
  const t = ud(typeof e.type < "u" ? e.type : fd);
  if ($r(t) === hr && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const i = typeof e.senderPublicKey < "u" ? St(e.senderPublicKey, Dt) : void 0, r = typeof e.iv < "u" ? St(e.iv, Dt) : Er.randomBytes(Bn), n = new ja.ChaCha20Poly1305(St(e.symKey, Dt)).seal(r, St(e.message, fs));
  return dd({ type: t, sealed: n, iv: r, senderPublicKey: i, encoding: e.encoding });
}
function x6(e, t) {
  const i = ud(us), r = Er.randomBytes(Bn), n = St(e, fs);
  return dd({ type: i, sealed: n, iv: r, encoding: t });
}
function O6(e) {
  const t = new ja.ChaCha20Poly1305(St(e.symKey, Dt)), { sealed: i, iv: r } = Zn({ encoded: e.encoded, encoding: e?.encoding }), n = t.open(r, i);
  if (n === null)
    throw new Error("Failed to decrypt");
  return It(n, fs);
}
function P6(e, t) {
  const { sealed: i } = Zn({ encoded: e, encoding: t });
  return It(i, fs);
}
function dd(e) {
  const { encoding: t = vr } = e;
  if ($r(e.type) === us)
    return It(xs([e.type, e.sealed]), t);
  if ($r(e.type) === hr) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return It(xs([e.type, e.senderPublicKey, e.iv, e.sealed]), t);
  }
  return It(xs([e.type, e.iv, e.sealed]), t);
}
function Zn(e) {
  const { encoded: t, encoding: i = vr } = e, r = St(t, i), n = r.slice(S6, Nc), s = Nc;
  if ($r(n) === hr) {
    const f = s + Ja, g = f + Bn, _ = r.slice(s, f), x = r.slice(f, g), A = r.slice(g);
    return { type: n, sealed: A, iv: x, senderPublicKey: _ };
  }
  if ($r(n) === us) {
    const f = r.slice(s), g = Er.randomBytes(Bn);
    return { type: n, sealed: f, iv: g };
  }
  const a = s + Bn, h = r.slice(s, a), d = r.slice(a);
  return { type: n, sealed: d, iv: h };
}
function N6(e, t) {
  const i = Zn({ encoded: e, encoding: t?.encoding });
  return ld({ type: $r(i.type), senderPublicKey: typeof i.senderPublicKey < "u" ? It(i.senderPublicKey, Dt) : void 0, receiverPublicKey: t?.receiverPublicKey });
}
function ld(e) {
  const t = e?.type || fd;
  if (t === hr) {
    if (typeof e?.senderPublicKey > "u")
      throw new Error("missing sender public key");
    if (typeof e?.receiverPublicKey > "u")
      throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e?.senderPublicKey, receiverPublicKey: e?.receiverPublicKey };
}
function Rc(e) {
  return e.type === hr && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
function Tc(e) {
  return e.type === us;
}
function R6(e) {
  return new Ku.ec("p256").keyFromPublic({ x: Buffer.from(e.x, "base64").toString("hex"), y: Buffer.from(e.y, "base64").toString("hex") }, "hex");
}
function T6(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  const i = t.length % 4;
  return i > 0 && (t += "=".repeat(4 - i)), t;
}
function k6(e) {
  return Buffer.from(T6(e), "base64");
}
function L6(e, t) {
  const [i, r, n] = e.split("."), s = k6(n);
  if (s.length !== 64)
    throw new Error("Invalid signature length");
  const a = s.slice(0, 32).toString("hex"), h = s.slice(32, 64).toString("hex"), d = `${i}.${r}`, f = new ss.SHA256().update(Buffer.from(d)).digest(), g = R6(t), _ = Buffer.from(f).toString("hex");
  if (!g.verify(_, { r: a, s: h }))
    throw new Error("Invalid signature");
  return ca(e).payload;
}
const C6 = "irn";
function Ys(e) {
  return e?.relay || { protocol: C6 };
}
function Kn(e) {
  const t = x2[e];
  if (typeof t > "u")
    throw new Error(`Relay Protocol not supported: ${e}`);
  return t;
}
var q6 = Object.defineProperty, j6 = Object.defineProperties, z6 = Object.getOwnPropertyDescriptors, kc = Object.getOwnPropertySymbols, U6 = Object.prototype.hasOwnProperty, D6 = Object.prototype.propertyIsEnumerable, Lc = (e, t, i) => t in e ? q6(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Cc = (e, t) => {
  for (var i in t || (t = {}))
    U6.call(t, i) && Lc(e, i, t[i]);
  if (kc)
    for (var i of kc(t))
      D6.call(t, i) && Lc(e, i, t[i]);
  return e;
}, F6 = (e, t) => j6(e, z6(t));
function K6(e, t = "-") {
  const i = {}, r = "relay" + t;
  return Object.keys(e).forEach((n) => {
    if (n.startsWith(r)) {
      const s = n.replace(r, ""), a = e[n];
      i[s] = a;
    }
  }), i;
}
function qc(e) {
  if (!e.includes("wc:")) {
    const d = od(e);
    d != null && d.includes("wc:") && (e = d);
  }
  e = e.includes("wc://") ? e.replace("wc://", "") : e, e = e.includes("wc:") ? e.replace("wc:", "") : e;
  const t = e.indexOf(":"), i = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, t), n = e.substring(t + 1, i).split("@"), s = typeof i < "u" ? e.substring(i) : "", a = Yn.parse(s), h = typeof a.methods == "string" ? a.methods.split(",") : void 0;
  return { protocol: r, topic: B6(n[0]), version: parseInt(n[1], 10), symKey: a.symKey, relay: K6(a), methods: h, expiryTimestamp: a.expiryTimestamp ? parseInt(a.expiryTimestamp, 10) : void 0 };
}
function B6(e) {
  return e.startsWith("//") ? e.substring(2) : e;
}
function $6(e, t = "-") {
  const i = "relay", r = {};
  return Object.keys(e).forEach((n) => {
    const s = i + t + n;
    e[n] && (r[s] = e[n]);
  }), r;
}
function jc(e) {
  return `${e.protocol}:${e.topic}@${e.version}?` + Yn.stringify(Cc(F6(Cc({ symKey: e.symKey }, $6(e.relay)), { expiryTimestamp: e.expiryTimestamp }), e.methods ? { methods: e.methods.join(",") } : {}));
}
function Es(e, t, i) {
  return `${e}?wc_ev=${i}&topic=${t}`;
}
function Mn(e) {
  const t = [];
  return e.forEach((i) => {
    const [r, n] = i.split(":");
    t.push(`${r}:${n}`);
  }), t;
}
function V6(e) {
  const t = [];
  return Object.values(e).forEach((i) => {
    t.push(...Mn(i.accounts));
  }), t;
}
function H6(e, t) {
  const i = [];
  return Object.values(e).forEach((r) => {
    Mn(r.accounts).includes(t) && i.push(...r.methods);
  }), i;
}
function W6(e, t) {
  const i = [];
  return Object.values(e).forEach((r) => {
    Mn(r.accounts).includes(t) && i.push(...r.events);
  }), i;
}
function G6(e) {
  const t = {};
  return e?.forEach((i) => {
    const [r, n] = i.split(":");
    t[r] || (t[r] = { accounts: [], chains: [], events: [] }), t[r].accounts.push(i), t[r].chains.push(`${r}:${n}`);
  }), t;
}
function zc(e, t) {
  t = t.map((r) => r.replace("did:pkh:", ""));
  const i = G6(t);
  for (const [r, n] of Object.entries(i))
    n.methods ? n.methods = W2(n.methods, e) : n.methods = e, n.events = ["chainChanged", "accountsChanged"];
  return i;
}
const Y6 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, J6 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function ne(e, t) {
  const { message: i, code: r } = J6[e];
  return { message: t ? `${i} ${t}` : i, code: r };
}
function nt(e, t) {
  const { message: i, code: r } = Y6[e];
  return { message: t ? `${i} ${t}` : i, code: r };
}
function So(e, t) {
  return !!Array.isArray(e);
}
function Js(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function Ut(e) {
  return typeof e > "u";
}
function gt(e, t) {
  return t && Ut(e) ? !0 : typeof e == "string" && !!e.trim().length;
}
function Za(e, t) {
  return t && Ut(e) ? !0 : typeof e == "number" && !isNaN(e);
}
function Z6(e, t) {
  const { requiredNamespaces: i } = t, r = Object.keys(e.namespaces), n = Object.keys(i);
  let s = !0;
  return jr(n, r) ? (r.forEach((a) => {
    const { accounts: h, methods: d, events: f } = e.namespaces[a], g = Mn(h), _ = i[a];
    (!jr(Wa(a, _), g) || !jr(_.methods, d) || !jr(_.events, f)) && (s = !1);
  }), s) : !1;
}
function Zs(e) {
  return gt(e, !1) && e.includes(":") ? e.split(":").length === 2 : !1;
}
function X6(e) {
  if (gt(e, !1) && e.includes(":")) {
    const t = e.split(":");
    if (t.length === 3) {
      const i = t[0] + ":" + t[1];
      return !!t[2] && Zs(i);
    }
  }
  return !1;
}
function Q6(e) {
  function t(i) {
    try {
      return typeof new URL(i) < "u";
    } catch {
      return !1;
    }
  }
  try {
    if (gt(e, !1)) {
      if (t(e))
        return !0;
      const i = od(e);
      return t(i);
    }
  } catch {
  }
  return !1;
}
function ey(e) {
  var t;
  return (t = e?.proposer) == null ? void 0 : t.publicKey;
}
function ty(e) {
  return e?.topic;
}
function iy(e, t) {
  let i = null;
  return gt(e?.publicKey, !1) || (i = ne("MISSING_OR_INVALID", `${t} controller public key should be a string`)), i;
}
function Uc(e) {
  let t = !0;
  return So(e) ? e.length && (t = e.every((i) => gt(i, !1))) : t = !1, t;
}
function ry(e, t, i) {
  let r = null;
  return So(t) && t.length ? t.forEach((n) => {
    r || Zs(n) || (r = nt("UNSUPPORTED_CHAINS", `${i}, chain ${n} should be a string and conform to "namespace:chainId" format`));
  }) : Zs(e) || (r = nt("UNSUPPORTED_CHAINS", `${i}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function ny(e, t, i) {
  let r = null;
  return Object.entries(e).forEach(([n, s]) => {
    if (r)
      return;
    const a = ry(n, Wa(n, s), `${t} ${i}`);
    a && (r = a);
  }), r;
}
function sy(e, t) {
  let i = null;
  return So(e) ? e.forEach((r) => {
    i || X6(r) || (i = nt("UNSUPPORTED_ACCOUNTS", `${t}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : i = nt("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), i;
}
function oy(e, t) {
  let i = null;
  return Object.values(e).forEach((r) => {
    if (i)
      return;
    const n = sy(r?.accounts, `${t} namespace`);
    n && (i = n);
  }), i;
}
function ay(e, t) {
  let i = null;
  return Uc(e?.methods) ? Uc(e?.events) || (i = nt("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : i = nt("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), i;
}
function pd(e, t) {
  let i = null;
  return Object.values(e).forEach((r) => {
    if (i)
      return;
    const n = ay(r, `${t}, namespace`);
    n && (i = n);
  }), i;
}
function hy(e, t, i) {
  let r = null;
  if (e && Js(e)) {
    const n = pd(e, t);
    n && (r = n);
    const s = ny(e, t, i);
    s && (r = s);
  } else
    r = ne("MISSING_OR_INVALID", `${t}, ${i} should be an object with data`);
  return r;
}
function Go(e, t) {
  let i = null;
  if (e && Js(e)) {
    const r = pd(e, t);
    r && (i = r);
    const n = oy(e, t);
    n && (i = n);
  } else
    i = ne("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return i;
}
function gd(e) {
  return gt(e.protocol, !0);
}
function cy(e, t) {
  let i = !1;
  return e ? e && So(e) && e.length && e.forEach((r) => {
    i = gd(r);
  }) : i = !0, i;
}
function fy(e) {
  return typeof e == "number";
}
function Gt(e) {
  return typeof e < "u" && typeof e !== null;
}
function uy(e) {
  return !(!e || typeof e != "object" || !e.code || !Za(e.code, !1) || !e.message || !gt(e.message, !1));
}
function dy(e) {
  return !(Ut(e) || !gt(e.method, !1));
}
function ly(e) {
  return !(Ut(e) || Ut(e.result) && Ut(e.error) || !Za(e.id, !1) || !gt(e.jsonrpc, !1));
}
function py(e) {
  return !(Ut(e) || !gt(e.name, !1));
}
function Dc(e, t) {
  return !(!Zs(t) || !V6(e).includes(t));
}
function gy(e, t, i) {
  return gt(i, !1) ? H6(e, t).includes(i) : !1;
}
function by(e, t, i) {
  return gt(i, !1) ? W6(e, t).includes(i) : !1;
}
function Fc(e, t, i) {
  let r = null;
  const n = my(e), s = yy(t), a = Object.keys(n), h = Object.keys(s), d = Kc(Object.keys(e)), f = Kc(Object.keys(t)), g = d.filter((_) => !f.includes(_));
  return g.length && (r = ne("NON_CONFORMING_NAMESPACES", `${i} namespaces keys don't satisfy requiredNamespaces.
      Required: ${g.toString()}
      Received: ${Object.keys(t).toString()}`)), jr(a, h) || (r = ne("NON_CONFORMING_NAMESPACES", `${i} namespaces chains don't satisfy required namespaces.
      Required: ${a.toString()}
      Approved: ${h.toString()}`)), Object.keys(t).forEach((_) => {
    if (!_.includes(":") || r)
      return;
    const x = Mn(t[_].accounts);
    x.includes(_) || (r = ne("NON_CONFORMING_NAMESPACES", `${i} namespaces accounts don't satisfy namespace accounts for ${_}
        Required: ${_}
        Approved: ${x.toString()}`));
  }), a.forEach((_) => {
    r || (jr(n[_].methods, s[_].methods) ? jr(n[_].events, s[_].events) || (r = ne("NON_CONFORMING_NAMESPACES", `${i} namespaces events don't satisfy namespace events for ${_}`)) : r = ne("NON_CONFORMING_NAMESPACES", `${i} namespaces methods don't satisfy namespace methods for ${_}`));
  }), r;
}
function my(e) {
  const t = {};
  return Object.keys(e).forEach((i) => {
    var r;
    i.includes(":") ? t[i] = e[i] : (r = e[i].chains) == null || r.forEach((n) => {
      t[n] = { methods: e[i].methods, events: e[i].events };
    });
  }), t;
}
function Kc(e) {
  return [...new Set(e.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function yy(e) {
  const t = {};
  return Object.keys(e).forEach((i) => {
    i.includes(":") ? t[i] = e[i] : Mn(e[i].accounts)?.forEach((r) => {
      t[r] = { accounts: e[i].accounts.filter((n) => n.includes(`${r}:`)), methods: e[i].methods, events: e[i].events };
    });
  }), t;
}
function vy(e, t) {
  return Za(e, !1) && e <= t.max && e >= t.min;
}
function Bc() {
  const e = cs();
  return new Promise((t) => {
    switch (e) {
      case ii.browser:
        t(wy());
        break;
      case ii.reactNative:
        t(_y());
        break;
      case ii.node:
        t(Ey());
        break;
      default:
        t(!0);
    }
  });
}
function wy() {
  return hs() && navigator?.onLine;
}
async function _y() {
  return Ar() && typeof globalThis < "u" && globalThis != null && globalThis.NetInfo ? (await globalThis?.NetInfo.fetch())?.isConnected : !0;
}
function Ey() {
  return !0;
}
function Sy(e) {
  switch (cs()) {
    case ii.browser:
      Iy(e);
      break;
    case ii.reactNative:
      My(e);
      break;
  }
}
function Iy(e) {
  !Ar() && hs() && (window.addEventListener("online", () => e(!0)), window.addEventListener("offline", () => e(!1)));
}
function My(e) {
  Ar() && typeof globalThis < "u" && globalThis != null && globalThis.NetInfo && globalThis?.NetInfo.addEventListener((t) => e(t?.isConnected));
}
const Yo = {};
class qn {
  static get(t) {
    return Yo[t];
  }
  static set(t, i) {
    Yo[t] = i;
  }
  static delete(t) {
    delete Yo[t];
  }
}
const Ay = "PARSE_ERROR", xy = "INVALID_REQUEST", Oy = "METHOD_NOT_FOUND", Py = "INVALID_PARAMS", bd = "INTERNAL_ERROR", Xa = "SERVER_ERROR", Ny = [-32700, -32600, -32601, -32602, -32603], $n = {
  [Ay]: { code: -32700, message: "Parse error" },
  [xy]: { code: -32600, message: "Invalid Request" },
  [Oy]: { code: -32601, message: "Method not found" },
  [Py]: { code: -32602, message: "Invalid params" },
  [bd]: { code: -32603, message: "Internal error" },
  [Xa]: { code: -32e3, message: "Server error" }
}, md = Xa;
function Ry(e) {
  return Ny.includes(e);
}
function $c(e) {
  return Object.keys($n).includes(e) ? $n[e] : $n[md];
}
function Ty(e) {
  return Object.values($n).find((i) => i.code === e) || $n[md];
}
function ky(e, t, i) {
  return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${i} RPC url at ${t}`) : e;
}
var yd = {}, tr = {}, Vc;
function Ly() {
  if (Vc)
    return tr;
  Vc = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.isBrowserCryptoAvailable = tr.getSubtleCrypto = tr.getBrowerCrypto = void 0;
  function e() {
    return (ti === null || ti === void 0 ? void 0 : ti.crypto) || (ti === null || ti === void 0 ? void 0 : ti.msCrypto) || {};
  }
  tr.getBrowerCrypto = e;
  function t() {
    const r = e();
    return r.subtle || r.webkitSubtle;
  }
  tr.getSubtleCrypto = t;
  function i() {
    return !!e() && !!t();
  }
  return tr.isBrowserCryptoAvailable = i, tr;
}
var ir = {}, Hc;
function Cy() {
  if (Hc)
    return ir;
  Hc = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.isBrowser = ir.isNode = ir.isReactNative = void 0;
  function e() {
    return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative";
  }
  ir.isReactNative = e;
  function t() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
  }
  ir.isNode = t;
  function i() {
    return !e() && !t();
  }
  return ir.isBrowser = i, ir;
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const t = Xn;
  t.__exportStar(Ly(), e), t.__exportStar(Cy(), e);
})(yd);
function sr(e = 3) {
  const t = Date.now() * Math.pow(10, e), i = Math.floor(Math.random() * Math.pow(10, e));
  return t + i;
}
function zr(e = 6) {
  return BigInt(sr(e));
}
function Ur(e, t, i) {
  return {
    id: i || sr(),
    jsonrpc: "2.0",
    method: e,
    params: t
  };
}
function Io(e, t) {
  return {
    id: e,
    jsonrpc: "2.0",
    result: t
  };
}
function Mo(e, t, i) {
  return {
    id: e,
    jsonrpc: "2.0",
    error: qy(t)
  };
}
function qy(e, t) {
  return typeof e > "u" ? $c(bd) : (typeof e == "string" && (e = Object.assign(Object.assign({}, $c(Xa)), { message: e })), Ry(e.code) && (e = Ty(e.code)), e);
}
class vd {
}
let jy = class extends vd {
  constructor(e) {
    super();
  }
};
class zy extends vd {
  constructor() {
    super();
  }
}
let Uy = class extends zy {
  constructor(e) {
    super();
  }
};
const Dy = "^wss?:";
function Fy(e) {
  const t = e.match(new RegExp(/^\w+:/, "gi"));
  if (!(!t || !t.length))
    return t[0];
}
function Ky(e, t) {
  const i = Fy(e);
  return typeof i > "u" ? !1 : new RegExp(t).test(i);
}
function Wc(e) {
  return Ky(e, Dy);
}
function By(e) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(e);
}
function wd(e) {
  return typeof e == "object" && "id" in e && "jsonrpc" in e && e.jsonrpc === "2.0";
}
function Qa(e) {
  return wd(e) && "method" in e;
}
function Ao(e) {
  return wd(e) && (Ri(e) || di(e));
}
function Ri(e) {
  return "result" in e;
}
function di(e) {
  return "error" in e;
}
class _d extends Uy {
  constructor(t) {
    super(t), this.events = new ri.EventEmitter(), this.hasRegisteredEventListeners = !1, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, i) {
    this.events.on(t, i);
  }
  once(t, i) {
    this.events.once(t, i);
  }
  off(t, i) {
    this.events.off(t, i);
  }
  removeListener(t, i) {
    this.events.removeListener(t, i);
  }
  async request(t, i) {
    return this.requestStrict(Ur(t.method, t.params || [], t.id || zr().toString()), i);
  }
  async requestStrict(t, i) {
    return new Promise(async (r, n) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (s) {
          n(s);
        }
      this.events.on(`${t.id}`, (s) => {
        di(s) ? n(s.error) : r(s.result);
      });
      try {
        await this.connection.send(t, i);
      } catch (s) {
        n(s);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), Ao(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = !0);
  }
}
const $y = () => typeof WebSocket < "u" ? WebSocket : typeof globalThis < "u" && typeof globalThis.WebSocket < "u" ? globalThis.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws"), Vy = () => typeof WebSocket < "u" || typeof globalThis < "u" && typeof globalThis.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", Gc = (e) => e.split("?")[0], Yc = 10, Hy = $y();
class Wy {
  constructor(t) {
    if (this.url = t, this.events = new ri.EventEmitter(), this.registering = !1, !Wc(t))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${t}`);
    this.url = t;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(t, i) {
    this.events.on(t, i);
  }
  once(t, i) {
    this.events.once(t, i);
  }
  off(t, i) {
    this.events.off(t, i);
  }
  removeListener(t, i) {
    this.events.removeListener(t, i);
  }
  async open(t = this.url) {
    await this.register(t);
  }
  async close() {
    return new Promise((t, i) => {
      if (typeof this.socket > "u") {
        i(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (r) => {
        this.onClose(r), t();
      }, this.socket.close();
    });
  }
  async send(t) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(Fr(t));
    } catch (i) {
      this.onError(t.id, i);
    }
  }
  register(t = this.url) {
    if (!Wc(t))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${t}`);
    if (this.registering) {
      const i = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= i || this.events.listenerCount("open") >= i) && this.events.setMaxListeners(i + 1), new Promise((r, n) => {
        this.events.once("register_error", (s) => {
          this.resetMaxListeners(), n(s);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return n(new Error("WebSocket connection is missing or invalid"));
          r(this.socket);
        });
      });
    }
    return this.url = t, this.registering = !0, new Promise((i, r) => {
      const n = yd.isReactNative() ? void 0 : { rejectUnauthorized: !By(t) }, s = new Hy(t, [], n);
      Vy() ? s.onerror = (a) => {
        const h = a;
        r(this.emitError(h.error));
      } : s.on("error", (a) => {
        r(this.emitError(a));
      }), s.onopen = () => {
        this.onOpen(s), i(s);
      };
    });
  }
  onOpen(t) {
    t.onmessage = (i) => this.onPayload(i), t.onclose = (i) => this.onClose(i), this.socket = t, this.registering = !1, this.events.emit("open");
  }
  onClose(t) {
    this.socket = void 0, this.registering = !1, this.events.emit("close", t);
  }
  onPayload(t) {
    if (typeof t.data > "u")
      return;
    const i = typeof t.data == "string" ? fn(t.data) : t.data;
    this.events.emit("payload", i);
  }
  onError(t, i) {
    const r = this.parseError(i), n = r.message || r.toString(), s = Mo(t, n);
    this.events.emit("payload", s);
  }
  parseError(t, i = this.url) {
    return ky(t, Gc(i), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > Yc && this.events.setMaxListeners(Yc);
  }
  emitError(t) {
    const i = this.parseError(new Error(t?.message || `WebSocket connection failed for host: ${Gc(this.url)}`));
    return this.events.emit("register_error", i), i;
  }
}
var Xs = { exports: {} };
Xs.exports;
(function(e, t) {
  var i = 200, r = "__lodash_hash_undefined__", n = 1, s = 2, a = 9007199254740991, h = "[object Arguments]", d = "[object Array]", f = "[object AsyncFunction]", g = "[object Boolean]", _ = "[object Date]", x = "[object Error]", A = "[object Function]", O = "[object GeneratorFunction]", j = "[object Map]", F = "[object Number]", V = "[object Null]", C = "[object Object]", K = "[object Promise]", N = "[object Proxy]", U = "[object RegExp]", D = "[object Set]", v = "[object String]", T = "[object Symbol]", Y = "[object Undefined]", Q = "[object WeakMap]", p = "[object ArrayBuffer]", S = "[object DataView]", o = "[object Float32Array]", c = "[object Float64Array]", l = "[object Int8Array]", E = "[object Int16Array]", I = "[object Int32Array]", w = "[object Uint8Array]", u = "[object Uint8ClampedArray]", m = "[object Uint16Array]", b = "[object Uint32Array]", P = /[\\^$.*+?()[\]{}|]/g, B = /^\[object .+?Constructor\]$/, G = /^(?:0|[1-9]\d*)$/, M = {};
  M[o] = M[c] = M[l] = M[E] = M[I] = M[w] = M[u] = M[m] = M[b] = !0, M[h] = M[d] = M[p] = M[g] = M[S] = M[_] = M[x] = M[A] = M[j] = M[F] = M[C] = M[U] = M[D] = M[v] = M[Q] = !1;
  var $ = typeof ti == "object" && ti && ti.Object === Object && ti, L = typeof self == "object" && self && self.Object === Object && self, k = $ || L || Function("return this")(), q = t && !t.nodeType && t, y = q && !0 && e && !e.nodeType && e, R = y && y.exports === q, W = R && $.process, Z = function() {
    try {
      return W && W.binding && W.binding("util");
    } catch {
    }
  }(), J = Z && Z.isTypedArray;
  function oe(z, H) {
    for (var X = -1, ye = z == null ? 0 : z.length, ht = 0, Ge = []; ++X < ye; ) {
      var ut = z[X];
      H(ut, X, z) && (Ge[ht++] = ut);
    }
    return Ge;
  }
  function Ee(z, H) {
    for (var X = -1, ye = H.length, ht = z.length; ++X < ye; )
      z[ht + X] = H[X];
    return z;
  }
  function he(z, H) {
    for (var X = -1, ye = z == null ? 0 : z.length; ++X < ye; )
      if (H(z[X], X, z))
        return !0;
    return !1;
  }
  function Re(z, H) {
    for (var X = -1, ye = Array(z); ++X < z; )
      ye[X] = H(X);
    return ye;
  }
  function Pe(z) {
    return function(H) {
      return z(H);
    };
  }
  function se(z, H) {
    return z.has(H);
  }
  function Se(z, H) {
    return z?.[H];
  }
  function ve(z) {
    var H = -1, X = Array(z.size);
    return z.forEach(function(ye, ht) {
      X[++H] = [ht, ye];
    }), X;
  }
  function ie(z, H) {
    return function(X) {
      return z(H(X));
    };
  }
  function ge(z) {
    var H = -1, X = Array(z.size);
    return z.forEach(function(ye) {
      X[++H] = ye;
    }), X;
  }
  var pe = Array.prototype, ee = Function.prototype, fe = Object.prototype, me = k["__core-js_shared__"], re = ee.toString, ue = fe.hasOwnProperty, Ie = function() {
    var z = /[^.]+$/.exec(me && me.keys && me.keys.IE_PROTO || "");
    return z ? "Symbol(src)_1." + z : "";
  }(), ae = fe.toString, Me = RegExp(
    "^" + re.call(ue).replace(P, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ae = R ? k.Buffer : void 0, ce = k.Symbol, We = k.Uint8Array, Ye = fe.propertyIsEnumerable, xe = pe.splice, $e = ce ? ce.toStringTag : void 0, Xe = Object.getOwnPropertySymbols, Oe = Ae ? Ae.isBuffer : void 0, et = ie(Object.keys, Object), Te = Xr(k, "DataView"), le = Xr(k, "Map"), ke = Xr(k, "Promise"), Le = Xr(k, "Set"), be = Xr(k, "WeakMap"), Ne = Xr(Object, "create"), ze = xr(Te), we = xr(le), Ue = xr(ke), De = xr(Le), _e = xr(be), qe = ce ? ce.prototype : void 0, Ce = qe ? qe.valueOf : void 0;
  function de(z) {
    var H = -1, X = z == null ? 0 : z.length;
    for (this.clear(); ++H < X; ) {
      var ye = z[H];
      this.set(ye[0], ye[1]);
    }
  }
  function Fe() {
    this.__data__ = Ne ? Ne(null) : {}, this.size = 0;
  }
  function Ke(z) {
    var H = this.has(z) && delete this.__data__[z];
    return this.size -= H ? 1 : 0, H;
  }
  function je(z) {
    var H = this.__data__;
    if (Ne) {
      var X = H[z];
      return X === r ? void 0 : X;
    }
    return ue.call(H, z) ? H[z] : void 0;
  }
  function it(z) {
    var H = this.__data__;
    return Ne ? H[z] !== void 0 : ue.call(H, z);
  }
  function tt(z, H) {
    var X = this.__data__;
    return this.size += this.has(z) ? 0 : 1, X[z] = Ne && H === void 0 ? r : H, this;
  }
  de.prototype.clear = Fe, de.prototype.delete = Ke, de.prototype.get = je, de.prototype.has = it, de.prototype.set = tt;
  function Je(z) {
    var H = -1, X = z == null ? 0 : z.length;
    for (this.clear(); ++H < X; ) {
      var ye = z[H];
      this.set(ye[0], ye[1]);
    }
  }
  function Kt() {
    this.__data__ = [], this.size = 0;
  }
  function Bt(z) {
    var H = this.__data__, X = ls(H, z);
    if (X < 0)
      return !1;
    var ye = H.length - 1;
    return X == ye ? H.pop() : xe.call(H, X, 1), --this.size, !0;
  }
  function $t(z) {
    var H = this.__data__, X = ls(H, z);
    return X < 0 ? void 0 : H[X][1];
  }
  function Vt(z) {
    return ls(this.__data__, z) > -1;
  }
  function Ht(z, H) {
    var X = this.__data__, ye = ls(X, z);
    return ye < 0 ? (++this.size, X.push([z, H])) : X[ye][1] = H, this;
  }
  Je.prototype.clear = Kt, Je.prototype.delete = Bt, Je.prototype.get = $t, Je.prototype.has = Vt, Je.prototype.set = Ht;
  function bt(z) {
    var H = -1, X = z == null ? 0 : z.length;
    for (this.clear(); ++H < X; ) {
      var ye = z[H];
      this.set(ye[0], ye[1]);
    }
  }
  function Vi() {
    this.size = 0, this.__data__ = {
      hash: new de(),
      map: new (le || Je)(),
      string: new de()
    };
  }
  function Hi(z) {
    var H = ps(this, z).delete(z);
    return this.size -= H ? 1 : 0, H;
  }
  function Wi(z) {
    return ps(this, z).get(z);
  }
  function Gi(z) {
    return ps(this, z).has(z);
  }
  function Yi(z, H) {
    var X = ps(this, z), ye = X.size;
    return X.set(z, H), this.size += X.size == ye ? 0 : 1, this;
  }
  bt.prototype.clear = Vi, bt.prototype.delete = Hi, bt.prototype.get = Wi, bt.prototype.has = Gi, bt.prototype.set = Yi;
  function ai(z) {
    var H = -1, X = z == null ? 0 : z.length;
    for (this.__data__ = new bt(); ++H < X; )
      this.add(z[H]);
  }
  function Ji(z) {
    return this.__data__.set(z, r), this;
  }
  function Zi(z) {
    return this.__data__.has(z);
  }
  ai.prototype.add = ai.prototype.push = Ji, ai.prototype.has = Zi;
  function Lt(z) {
    var H = this.__data__ = new Je(z);
    this.size = H.size;
  }
  function Xi() {
    this.__data__ = new Je(), this.size = 0;
  }
  function Qi(z) {
    var H = this.__data__, X = H.delete(z);
    return this.size = H.size, X;
  }
  function An(z) {
    return this.__data__.get(z);
  }
  function xn(z) {
    return this.__data__.has(z);
  }
  function Fd(z, H) {
    var X = this.__data__;
    if (X instanceof Je) {
      var ye = X.__data__;
      if (!le || ye.length < i - 1)
        return ye.push([z, H]), this.size = ++X.size, this;
      X = this.__data__ = new bt(ye);
    }
    return X.set(z, H), this.size = X.size, this;
  }
  Lt.prototype.clear = Xi, Lt.prototype.delete = Qi, Lt.prototype.get = An, Lt.prototype.has = xn, Lt.prototype.set = Fd;
  function Kd(z, H) {
    var X = gs(z), ye = !X && rl(z), ht = !X && !ye && No(z), Ge = !X && !ye && !ht && ch(z), ut = X || ye || ht || Ge, vt = ut ? Re(z.length, String) : [], Pt = vt.length;
    for (var ft in z)
      ue.call(z, ft) && !(ut && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ft == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ht && (ft == "offset" || ft == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Ge && (ft == "buffer" || ft == "byteLength" || ft == "byteOffset") || // Skip index properties.
      Xd(ft, Pt))) && vt.push(ft);
    return vt;
  }
  function ls(z, H) {
    for (var X = z.length; X--; )
      if (sh(z[X][0], H))
        return X;
    return -1;
  }
  function Bd(z, H, X) {
    var ye = H(z);
    return gs(z) ? ye : Ee(ye, X(z));
  }
  function On(z) {
    return z == null ? z === void 0 ? Y : V : $e && $e in Object(z) ? Jd(z) : il(z);
  }
  function th(z) {
    return Pn(z) && On(z) == h;
  }
  function ih(z, H, X, ye, ht) {
    return z === H ? !0 : z == null || H == null || !Pn(z) && !Pn(H) ? z !== z && H !== H : $d(z, H, X, ye, ih, ht);
  }
  function $d(z, H, X, ye, ht, Ge) {
    var ut = gs(z), vt = gs(H), Pt = ut ? d : dr(z), ft = vt ? d : dr(H);
    Pt = Pt == h ? C : Pt, ft = ft == h ? C : ft;
    var Xt = Pt == C, vi = ft == C, Ct = Pt == ft;
    if (Ct && No(z)) {
      if (!No(H))
        return !1;
      ut = !0, Xt = !1;
    }
    if (Ct && !Xt)
      return Ge || (Ge = new Lt()), ut || ch(z) ? rh(z, H, X, ye, ht, Ge) : Gd(z, H, Pt, X, ye, ht, Ge);
    if (!(X & n)) {
      var hi = Xt && ue.call(z, "__wrapped__"), ci = vi && ue.call(H, "__wrapped__");
      if (hi || ci) {
        var lr = hi ? z.value() : z, er = ci ? H.value() : H;
        return Ge || (Ge = new Lt()), ht(lr, er, X, ye, Ge);
      }
    }
    return Ct ? (Ge || (Ge = new Lt()), Yd(z, H, X, ye, ht, Ge)) : !1;
  }
  function Vd(z) {
    if (!hh(z) || el(z))
      return !1;
    var H = oh(z) ? Me : B;
    return H.test(xr(z));
  }
  function Hd(z) {
    return Pn(z) && ah(z.length) && !!M[On(z)];
  }
  function Wd(z) {
    if (!tl(z))
      return et(z);
    var H = [];
    for (var X in Object(z))
      ue.call(z, X) && X != "constructor" && H.push(X);
    return H;
  }
  function rh(z, H, X, ye, ht, Ge) {
    var ut = X & n, vt = z.length, Pt = H.length;
    if (vt != Pt && !(ut && Pt > vt))
      return !1;
    var ft = Ge.get(z);
    if (ft && Ge.get(H))
      return ft == H;
    var Xt = -1, vi = !0, Ct = X & s ? new ai() : void 0;
    for (Ge.set(z, H), Ge.set(H, z); ++Xt < vt; ) {
      var hi = z[Xt], ci = H[Xt];
      if (ye)
        var lr = ut ? ye(ci, hi, Xt, H, z, Ge) : ye(hi, ci, Xt, z, H, Ge);
      if (lr !== void 0) {
        if (lr)
          continue;
        vi = !1;
        break;
      }
      if (Ct) {
        if (!he(H, function(er, Or) {
          if (!se(Ct, Or) && (hi === er || ht(hi, er, X, ye, Ge)))
            return Ct.push(Or);
        })) {
          vi = !1;
          break;
        }
      } else if (!(hi === ci || ht(hi, ci, X, ye, Ge))) {
        vi = !1;
        break;
      }
    }
    return Ge.delete(z), Ge.delete(H), vi;
  }
  function Gd(z, H, X, ye, ht, Ge, ut) {
    switch (X) {
      case S:
        if (z.byteLength != H.byteLength || z.byteOffset != H.byteOffset)
          return !1;
        z = z.buffer, H = H.buffer;
      case p:
        return !(z.byteLength != H.byteLength || !Ge(new We(z), new We(H)));
      case g:
      case _:
      case F:
        return sh(+z, +H);
      case x:
        return z.name == H.name && z.message == H.message;
      case U:
      case v:
        return z == H + "";
      case j:
        var vt = ve;
      case D:
        var Pt = ye & n;
        if (vt || (vt = ge), z.size != H.size && !Pt)
          return !1;
        var ft = ut.get(z);
        if (ft)
          return ft == H;
        ye |= s, ut.set(z, H);
        var Xt = rh(vt(z), vt(H), ye, ht, Ge, ut);
        return ut.delete(z), Xt;
      case T:
        if (Ce)
          return Ce.call(z) == Ce.call(H);
    }
    return !1;
  }
  function Yd(z, H, X, ye, ht, Ge) {
    var ut = X & n, vt = nh(z), Pt = vt.length, ft = nh(H), Xt = ft.length;
    if (Pt != Xt && !ut)
      return !1;
    for (var vi = Pt; vi--; ) {
      var Ct = vt[vi];
      if (!(ut ? Ct in H : ue.call(H, Ct)))
        return !1;
    }
    var hi = Ge.get(z);
    if (hi && Ge.get(H))
      return hi == H;
    var ci = !0;
    Ge.set(z, H), Ge.set(H, z);
    for (var lr = ut; ++vi < Pt; ) {
      Ct = vt[vi];
      var er = z[Ct], Or = H[Ct];
      if (ye)
        var fh = ut ? ye(Or, er, Ct, H, z, Ge) : ye(er, Or, Ct, z, H, Ge);
      if (!(fh === void 0 ? er === Or || ht(er, Or, X, ye, Ge) : fh)) {
        ci = !1;
        break;
      }
      lr || (lr = Ct == "constructor");
    }
    if (ci && !lr) {
      var bs = z.constructor, ms = H.constructor;
      bs != ms && "constructor" in z && "constructor" in H && !(typeof bs == "function" && bs instanceof bs && typeof ms == "function" && ms instanceof ms) && (ci = !1);
    }
    return Ge.delete(z), Ge.delete(H), ci;
  }
  function nh(z) {
    return Bd(z, ol, Zd);
  }
  function ps(z, H) {
    var X = z.__data__;
    return Qd(H) ? X[typeof H == "string" ? "string" : "hash"] : X.map;
  }
  function Xr(z, H) {
    var X = Se(z, H);
    return Vd(X) ? X : void 0;
  }
  function Jd(z) {
    var H = ue.call(z, $e), X = z[$e];
    try {
      z[$e] = void 0;
      var ye = !0;
    } catch {
    }
    var ht = ae.call(z);
    return ye && (H ? z[$e] = X : delete z[$e]), ht;
  }
  var Zd = Xe ? function(z) {
    return z == null ? [] : (z = Object(z), oe(Xe(z), function(H) {
      return Ye.call(z, H);
    }));
  } : al, dr = On;
  (Te && dr(new Te(new ArrayBuffer(1))) != S || le && dr(new le()) != j || ke && dr(ke.resolve()) != K || Le && dr(new Le()) != D || be && dr(new be()) != Q) && (dr = function(z) {
    var H = On(z), X = H == C ? z.constructor : void 0, ye = X ? xr(X) : "";
    if (ye)
      switch (ye) {
        case ze:
          return S;
        case we:
          return j;
        case Ue:
          return K;
        case De:
          return D;
        case _e:
          return Q;
      }
    return H;
  });
  function Xd(z, H) {
    return H = H ?? a, !!H && (typeof z == "number" || G.test(z)) && z > -1 && z % 1 == 0 && z < H;
  }
  function Qd(z) {
    var H = typeof z;
    return H == "string" || H == "number" || H == "symbol" || H == "boolean" ? z !== "__proto__" : z === null;
  }
  function el(z) {
    return !!Ie && Ie in z;
  }
  function tl(z) {
    var H = z && z.constructor, X = typeof H == "function" && H.prototype || fe;
    return z === X;
  }
  function il(z) {
    return ae.call(z);
  }
  function xr(z) {
    if (z != null) {
      try {
        return re.call(z);
      } catch {
      }
      try {
        return z + "";
      } catch {
      }
    }
    return "";
  }
  function sh(z, H) {
    return z === H || z !== z && H !== H;
  }
  var rl = th(/* @__PURE__ */ function() {
    return arguments;
  }()) ? th : function(z) {
    return Pn(z) && ue.call(z, "callee") && !Ye.call(z, "callee");
  }, gs = Array.isArray;
  function nl(z) {
    return z != null && ah(z.length) && !oh(z);
  }
  var No = Oe || hl;
  function sl(z, H) {
    return ih(z, H);
  }
  function oh(z) {
    if (!hh(z))
      return !1;
    var H = On(z);
    return H == A || H == O || H == f || H == N;
  }
  function ah(z) {
    return typeof z == "number" && z > -1 && z % 1 == 0 && z <= a;
  }
  function hh(z) {
    var H = typeof z;
    return z != null && (H == "object" || H == "function");
  }
  function Pn(z) {
    return z != null && typeof z == "object";
  }
  var ch = J ? Pe(J) : Hd;
  function ol(z) {
    return nl(z) ? Kd(z) : Wd(z);
  }
  function al() {
    return [];
  }
  function hl() {
    return !1;
  }
  e.exports = sl;
})(Xs, Xs.exports);
var Gy = Xs.exports;
const Yy = /* @__PURE__ */ gn(Gy), Ed = "wc", Sd = 2, _a = "core", Ki = `${Ed}@2:${_a}:`, Jy = { logger: "error" }, Zy = { database: ":memory:" }, Xy = "crypto", Jc = "client_ed25519_seed", Qy = te.ONE_DAY, e3 = "keychain", t3 = "0.3", i3 = "messages", r3 = "0.3", Zc = te.SIX_HOURS, n3 = "publisher", Id = "irn", s3 = "error", Md = "wss://relay.walletconnect.org", o3 = "relayer", Et = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, a3 = "_subscription", fi = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, h3 = 0.1, Ea = "2.17.3", st = { link_mode: "link_mode", relay: "relay" }, c3 = "0.3", f3 = "WALLETCONNECT_CLIENT_ID", Xc = "WALLETCONNECT_LINK_MODE_APPS", Qt = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, u3 = "subscription", d3 = "0.3", l3 = te.FIVE_SECONDS * 1e3, p3 = "pairing", g3 = "0.3", jn = { wc_pairingDelete: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 1e3 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 1001 } }, wc_pairingPing: { req: { ttl: te.THIRTY_SECONDS, prompt: !1, tag: 1002 }, res: { ttl: te.THIRTY_SECONDS, prompt: !1, tag: 1003 } }, unregistered_method: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 0 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 0 } } }, qr = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, _i = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, b3 = "history", m3 = "0.3", y3 = "expirer", ui = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, v3 = "0.3", w3 = "verify-api", _3 = "https://verify.walletconnect.com", Ad = "https://verify.walletconnect.org", Vn = Ad, E3 = `${Vn}/v3`, S3 = [_3, Ad], I3 = "echo", M3 = "https://echo.walletconnect.com", Ni = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" }, nr = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" }, Ei = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" }, Rr = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" }, Tr = { authenticated_session_approve_started: "authenticated_session_approve_started", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve" }, zn = { no_internet_connection: "no_internet_connection", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" }, A3 = 0.1, x3 = "event-client", O3 = 86400, P3 = "https://pulse.walletconnect.org/batch";
function N3(e, t) {
  if (e.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var i = new Uint8Array(256), r = 0; r < i.length; r++)
    i[r] = 255;
  for (var n = 0; n < e.length; n++) {
    var s = e.charAt(n), a = s.charCodeAt(0);
    if (i[a] !== 255)
      throw new TypeError(s + " is ambiguous");
    i[a] = n;
  }
  var h = e.length, d = e.charAt(0), f = Math.log(h) / Math.log(256), g = Math.log(256) / Math.log(h);
  function _(O) {
    if (O instanceof Uint8Array || (ArrayBuffer.isView(O) ? O = new Uint8Array(O.buffer, O.byteOffset, O.byteLength) : Array.isArray(O) && (O = Uint8Array.from(O))), !(O instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (O.length === 0)
      return "";
    for (var j = 0, F = 0, V = 0, C = O.length; V !== C && O[V] === 0; )
      V++, j++;
    for (var K = (C - V) * g + 1 >>> 0, N = new Uint8Array(K); V !== C; ) {
      for (var U = O[V], D = 0, v = K - 1; (U !== 0 || D < F) && v !== -1; v--, D++)
        U += 256 * N[v] >>> 0, N[v] = U % h >>> 0, U = U / h >>> 0;
      if (U !== 0)
        throw new Error("Non-zero carry");
      F = D, V++;
    }
    for (var T = K - F; T !== K && N[T] === 0; )
      T++;
    for (var Y = d.repeat(j); T < K; ++T)
      Y += e.charAt(N[T]);
    return Y;
  }
  function x(O) {
    if (typeof O != "string")
      throw new TypeError("Expected String");
    if (O.length === 0)
      return new Uint8Array();
    var j = 0;
    if (O[j] !== " ") {
      for (var F = 0, V = 0; O[j] === d; )
        F++, j++;
      for (var C = (O.length - j) * f + 1 >>> 0, K = new Uint8Array(C); O[j]; ) {
        var N = i[O.charCodeAt(j)];
        if (N === 255)
          return;
        for (var U = 0, D = C - 1; (N !== 0 || U < V) && D !== -1; D--, U++)
          N += h * K[D] >>> 0, K[D] = N % 256 >>> 0, N = N / 256 >>> 0;
        if (N !== 0)
          throw new Error("Non-zero carry");
        V = U, j++;
      }
      if (O[j] !== " ") {
        for (var v = C - V; v !== C && K[v] === 0; )
          v++;
        for (var T = new Uint8Array(F + (C - v)), Y = F; v !== C; )
          T[Y++] = K[v++];
        return T;
      }
    }
  }
  function A(O) {
    var j = x(O);
    if (j)
      return j;
    throw new Error(`Non-${t} character`);
  }
  return { encode: _, decodeUnsafe: x, decode: A };
}
var R3 = N3, T3 = R3;
const xd = (e) => {
  if (e instanceof Uint8Array && e.constructor.name === "Uint8Array")
    return e;
  if (e instanceof ArrayBuffer)
    return new Uint8Array(e);
  if (ArrayBuffer.isView(e))
    return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
  throw new Error("Unknown type, must be binary type");
}, k3 = (e) => new TextEncoder().encode(e), L3 = (e) => new TextDecoder().decode(e);
class C3 {
  constructor(t, i, r) {
    this.name = t, this.prefix = i, this.baseEncode = r;
  }
  encode(t) {
    if (t instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(t)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class q3 {
  constructor(t, i, r) {
    if (this.name = t, this.prefix = i, i.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = i.codePointAt(0), this.baseDecode = r;
  }
  decode(t) {
    if (typeof t == "string") {
      if (t.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(t.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(t) {
    return Od(this, t);
  }
}
class j3 {
  constructor(t) {
    this.decoders = t;
  }
  or(t) {
    return Od(this, t);
  }
  decode(t) {
    const i = t[0], r = this.decoders[i];
    if (r)
      return r.decode(t);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const Od = (e, t) => new j3({ ...e.decoders || { [e.prefix]: e }, ...t.decoders || { [t.prefix]: t } });
class z3 {
  constructor(t, i, r, n) {
    this.name = t, this.prefix = i, this.baseEncode = r, this.baseDecode = n, this.encoder = new C3(t, i, r), this.decoder = new q3(t, i, n);
  }
  encode(t) {
    return this.encoder.encode(t);
  }
  decode(t) {
    return this.decoder.decode(t);
  }
}
const xo = ({ name: e, prefix: t, encode: i, decode: r }) => new z3(e, t, i, r), ds = ({ prefix: e, name: t, alphabet: i }) => {
  const { encode: r, decode: n } = T3(i, t);
  return xo({ prefix: e, name: t, encode: r, decode: (s) => xd(n(s)) });
}, U3 = (e, t, i, r) => {
  const n = {};
  for (let g = 0; g < t.length; ++g)
    n[t[g]] = g;
  let s = e.length;
  for (; e[s - 1] === "="; )
    --s;
  const a = new Uint8Array(s * i / 8 | 0);
  let h = 0, d = 0, f = 0;
  for (let g = 0; g < s; ++g) {
    const _ = n[e[g]];
    if (_ === void 0)
      throw new SyntaxError(`Non-${r} character`);
    d = d << i | _, h += i, h >= 8 && (h -= 8, a[f++] = 255 & d >> h);
  }
  if (h >= i || 255 & d << 8 - h)
    throw new SyntaxError("Unexpected end of data");
  return a;
}, D3 = (e, t, i) => {
  const r = t[t.length - 1] === "=", n = (1 << i) - 1;
  let s = "", a = 0, h = 0;
  for (let d = 0; d < e.length; ++d)
    for (h = h << 8 | e[d], a += 8; a > i; )
      a -= i, s += t[n & h >> a];
  if (a && (s += t[n & h << i - a]), r)
    for (; s.length * i & 7; )
      s += "=";
  return s;
}, kt = ({ name: e, prefix: t, bitsPerChar: i, alphabet: r }) => xo({ prefix: t, name: e, encode(n) {
  return D3(n, r, i);
}, decode(n) {
  return U3(n, r, i, e);
} }), F3 = xo({ prefix: "\0", name: "identity", encode: (e) => L3(e), decode: (e) => k3(e) });
var K3 = Object.freeze({ __proto__: null, identity: F3 });
const B3 = kt({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var $3 = Object.freeze({ __proto__: null, base2: B3 });
const V3 = kt({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var H3 = Object.freeze({ __proto__: null, base8: V3 });
const W3 = ds({ prefix: "9", name: "base10", alphabet: "0123456789" });
var G3 = Object.freeze({ __proto__: null, base10: W3 });
const Y3 = kt({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), J3 = kt({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Z3 = Object.freeze({ __proto__: null, base16: Y3, base16upper: J3 });
const X3 = kt({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Q3 = kt({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), e5 = kt({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), t5 = kt({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), i5 = kt({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), r5 = kt({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), n5 = kt({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), s5 = kt({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), o5 = kt({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var a5 = Object.freeze({ __proto__: null, base32: X3, base32upper: Q3, base32pad: e5, base32padupper: t5, base32hex: i5, base32hexupper: r5, base32hexpad: n5, base32hexpadupper: s5, base32z: o5 });
const h5 = ds({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), c5 = ds({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var f5 = Object.freeze({ __proto__: null, base36: h5, base36upper: c5 });
const u5 = ds({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), d5 = ds({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var l5 = Object.freeze({ __proto__: null, base58btc: u5, base58flickr: d5 });
const p5 = kt({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), g5 = kt({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), b5 = kt({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), m5 = kt({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var y5 = Object.freeze({ __proto__: null, base64: p5, base64pad: g5, base64url: b5, base64urlpad: m5 });
const Pd = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), v5 = Pd.reduce((e, t, i) => (e[i] = t, e), []), w5 = Pd.reduce((e, t, i) => (e[t.codePointAt(0)] = i, e), []);
function _5(e) {
  return e.reduce((t, i) => (t += v5[i], t), "");
}
function E5(e) {
  const t = [];
  for (const i of e) {
    const r = w5[i.codePointAt(0)];
    if (r === void 0)
      throw new Error(`Non-base256emoji character: ${i}`);
    t.push(r);
  }
  return new Uint8Array(t);
}
const S5 = xo({ prefix: "🚀", name: "base256emoji", encode: _5, decode: E5 });
var I5 = Object.freeze({ __proto__: null, base256emoji: S5 }), M5 = Nd, Qc = 128, A5 = -128, x5 = Math.pow(2, 31);
function Nd(e, t, i) {
  t = t || [], i = i || 0;
  for (var r = i; e >= x5; )
    t[i++] = e & 255 | Qc, e /= 128;
  for (; e & A5; )
    t[i++] = e & 255 | Qc, e >>>= 7;
  return t[i] = e | 0, Nd.bytes = i - r + 1, t;
}
var O5 = Sa, P5 = 128, ef = 127;
function Sa(e, r) {
  var i = 0, r = r || 0, n = 0, s = r, a, h = e.length;
  do {
    if (s >= h)
      throw Sa.bytes = 0, new RangeError("Could not decode varint");
    a = e[s++], i += n < 28 ? (a & ef) << n : (a & ef) * Math.pow(2, n), n += 7;
  } while (a >= P5);
  return Sa.bytes = s - r, i;
}
var N5 = Math.pow(2, 7), R5 = Math.pow(2, 14), T5 = Math.pow(2, 21), k5 = Math.pow(2, 28), L5 = Math.pow(2, 35), C5 = Math.pow(2, 42), q5 = Math.pow(2, 49), j5 = Math.pow(2, 56), z5 = Math.pow(2, 63), U5 = function(e) {
  return e < N5 ? 1 : e < R5 ? 2 : e < T5 ? 3 : e < k5 ? 4 : e < L5 ? 5 : e < C5 ? 6 : e < q5 ? 7 : e < j5 ? 8 : e < z5 ? 9 : 10;
}, D5 = { encode: M5, decode: O5, encodingLength: U5 }, Rd = D5;
const tf = (e, t, i = 0) => (Rd.encode(e, t, i), t), rf = (e) => Rd.encodingLength(e), Ia = (e, t) => {
  const i = t.byteLength, r = rf(e), n = r + rf(i), s = new Uint8Array(n + i);
  return tf(e, s, 0), tf(i, s, r), s.set(t, n), new F5(e, i, t, s);
};
class F5 {
  constructor(t, i, r, n) {
    this.code = t, this.size = i, this.digest = r, this.bytes = n;
  }
}
const Td = ({ name: e, code: t, encode: i }) => new K5(e, t, i);
class K5 {
  constructor(t, i, r) {
    this.name = t, this.code = i, this.encode = r;
  }
  digest(t) {
    if (t instanceof Uint8Array) {
      const i = this.encode(t);
      return i instanceof Uint8Array ? Ia(this.code, i) : i.then((r) => Ia(this.code, r));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const kd = (e) => async (t) => new Uint8Array(await crypto.subtle.digest(e, t)), B5 = Td({ name: "sha2-256", code: 18, encode: kd("SHA-256") }), $5 = Td({ name: "sha2-512", code: 19, encode: kd("SHA-512") });
var V5 = Object.freeze({ __proto__: null, sha256: B5, sha512: $5 });
const Ld = 0, H5 = "identity", Cd = xd, W5 = (e) => Ia(Ld, Cd(e)), G5 = { code: Ld, name: H5, encode: Cd, digest: W5 };
var Y5 = Object.freeze({ __proto__: null, identity: G5 });
new TextEncoder(), new TextDecoder();
const nf = { ...K3, ...$3, ...H3, ...G3, ...Z3, ...a5, ...f5, ...l5, ...y5, ...I5 };
({ ...V5, ...Y5 });
function J5(e = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(e) : new Uint8Array(e);
}
function qd(e, t, i, r) {
  return { name: e, prefix: t, encoder: { name: e, prefix: t, encode: i }, decoder: { decode: r } };
}
const sf = qd("utf8", "u", (e) => "u" + new TextDecoder("utf8").decode(e), (e) => new TextEncoder().encode(e.substring(1))), Jo = qd("ascii", "a", (e) => {
  let t = "a";
  for (let i = 0; i < e.length; i++)
    t += String.fromCharCode(e[i]);
  return t;
}, (e) => {
  e = e.substring(1);
  const t = J5(e.length);
  for (let i = 0; i < e.length; i++)
    t[i] = e.charCodeAt(i);
  return t;
}), Z5 = { utf8: sf, "utf-8": sf, hex: nf.base16, latin1: Jo, ascii: Jo, binary: Jo, ...nf };
function X5(e, t = "utf8") {
  const i = Z5[t];
  if (!i)
    throw new Error(`Unsupported encoding "${t}"`);
  return (t === "utf8" || t === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(e, "utf8") : i.decoder.decode(`${i.prefix}${e}`);
}
class Q5 {
  constructor(t, i) {
    this.core = t, this.logger = i, this.keychain = /* @__PURE__ */ new Map(), this.name = e3, this.version = t3, this.initialized = !1, this.storagePrefix = Ki, this.init = async () => {
      if (!this.initialized) {
        const r = await this.getKeyChain();
        typeof r < "u" && (this.keychain = r), this.initialized = !0;
      }
    }, this.has = (r) => (this.isInitialized(), this.keychain.has(r)), this.set = async (r, n) => {
      this.isInitialized(), this.keychain.set(r, n), await this.persist();
    }, this.get = (r) => {
      this.isInitialized();
      const n = this.keychain.get(r);
      if (typeof n > "u") {
        const { message: s } = ne("NO_MATCHING_KEY", `${this.name}: ${r}`);
        throw new Error(s);
      }
      return n;
    }, this.del = async (r) => {
      this.isInitialized(), this.keychain.delete(r), await this.persist();
    }, this.core = t, this.logger = Ft(i, this.name);
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(t) {
    await this.core.storage.setItem(this.storageKey, id(t));
  }
  async getKeyChain() {
    const t = await this.core.storage.getItem(this.storageKey);
    return typeof t < "u" ? rd(t) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
class ev {
  constructor(t, i, r) {
    this.core = t, this.logger = i, this.name = Xy, this.randomSessionIdentifier = wa(), this.initialized = !1, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = !0);
    }, this.hasKeys = (n) => (this.isInitialized(), this.keychain.has(n)), this.getClientId = async () => {
      this.isInitialized();
      const n = await this.getClientSeed(), s = Dh(n);
      return su(s.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const n = I6();
      return this.setPrivateKey(n.publicKey, n.privateKey);
    }, this.signJWT = async (n) => {
      this.isInitialized();
      const s = await this.getClientSeed(), a = Dh(s), h = this.randomSessionIdentifier;
      return await eg(h, n, Qy, a);
    }, this.generateSharedKey = (n, s, a) => {
      this.isInitialized();
      const h = this.getPrivateKey(n), d = M6(h, s);
      return this.setSymKey(d, a);
    }, this.setSymKey = async (n, s) => {
      this.isInitialized();
      const a = s || ks(n);
      return await this.keychain.set(a, n), a;
    }, this.deleteKeyPair = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.deleteSymKey = async (n) => {
      this.isInitialized(), await this.keychain.del(n);
    }, this.encode = async (n, s, a) => {
      this.isInitialized();
      const h = ld(a), d = Fr(s);
      if (Tc(h))
        return x6(d, a?.encoding);
      if (Rc(h)) {
        const x = h.senderPublicKey, A = h.receiverPublicKey;
        n = await this.generateSharedKey(x, A);
      }
      const f = this.getSymKey(n), { type: g, senderPublicKey: _ } = h;
      return A6({ type: g, symKey: f, message: d, senderPublicKey: _, encoding: a?.encoding });
    }, this.decode = async (n, s, a) => {
      this.isInitialized();
      const h = N6(s, a);
      if (Tc(h)) {
        const d = P6(s, a?.encoding);
        return fn(d);
      }
      if (Rc(h)) {
        const d = h.receiverPublicKey, f = h.senderPublicKey;
        n = await this.generateSharedKey(d, f);
      }
      try {
        const d = this.getSymKey(n), f = O6({ symKey: d, encoded: s, encoding: a?.encoding });
        return fn(f);
      } catch (d) {
        this.logger.error(`Failed to decode message from topic: '${n}', clientId: '${await this.getClientId()}'`), this.logger.error(d);
      }
    }, this.getPayloadType = (n, s = vr) => {
      const a = Zn({ encoded: n, encoding: s });
      return $r(a.type);
    }, this.getPayloadSenderPublicKey = (n, s = vr) => {
      const a = Zn({ encoded: n, encoding: s });
      return a.senderPublicKey ? It(a.senderPublicKey, Dt) : void 0;
    }, this.core = t, this.logger = Ft(i, this.name), this.keychain = r || new Q5(this.core, this.logger);
  }
  get context() {
    return Zt(this.logger);
  }
  async setPrivateKey(t, i) {
    return await this.keychain.set(t, i), t;
  }
  getPrivateKey(t) {
    return this.keychain.get(t);
  }
  async getClientSeed() {
    let t = "";
    try {
      t = this.keychain.get(Jc);
    } catch {
      t = wa(), await this.keychain.set(Jc, t);
    }
    return X5(t, "base16");
  }
  getSymKey(t) {
    return this.keychain.get(t);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
class tv extends sp {
  constructor(t, i) {
    super(t, i), this.logger = t, this.core = i, this.messages = /* @__PURE__ */ new Map(), this.name = i3, this.version = r3, this.initialized = !1, this.storagePrefix = Ki, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const r = await this.getRelayerMessages();
          typeof r < "u" && (this.messages = r), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (r) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(r);
        } finally {
          this.initialized = !0;
        }
      }
    }, this.set = async (r, n) => {
      this.isInitialized();
      const s = or(n);
      let a = this.messages.get(r);
      return typeof a > "u" && (a = {}), typeof a[s] < "u" || (a[s] = n, this.messages.set(r, a), await this.persist()), s;
    }, this.get = (r) => {
      this.isInitialized();
      let n = this.messages.get(r);
      return typeof n > "u" && (n = {}), n;
    }, this.has = (r, n) => {
      this.isInitialized();
      const s = this.get(r), a = or(n);
      return typeof s[a] < "u";
    }, this.del = async (r) => {
      this.isInitialized(), this.messages.delete(r), await this.persist();
    }, this.logger = Ft(t, this.name), this.core = i;
  }
  get context() {
    return Zt(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(t) {
    await this.core.storage.setItem(this.storageKey, id(t));
  }
  async getRelayerMessages() {
    const t = await this.core.storage.getItem(this.storageKey);
    return typeof t < "u" ? rd(t) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
var iv = Object.defineProperty, rv = Object.defineProperties, nv = Object.getOwnPropertyDescriptors, of = Object.getOwnPropertySymbols, sv = Object.prototype.hasOwnProperty, ov = Object.prototype.propertyIsEnumerable, af = (e, t, i) => t in e ? iv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, hf = (e, t) => {
  for (var i in t || (t = {}))
    sv.call(t, i) && af(e, i, t[i]);
  if (of)
    for (var i of of(t))
      ov.call(t, i) && af(e, i, t[i]);
  return e;
}, cf = (e, t) => rv(e, nv(t));
class av extends op {
  constructor(t, i) {
    super(t, i), this.relayer = t, this.logger = i, this.events = new ri.EventEmitter(), this.name = n3, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = te.toMiliseconds(te.ONE_MINUTE), this.initialPublishTimeout = te.toMiliseconds(te.ONE_SECOND * 15), this.needsTransportRestart = !1, this.publish = async (r, n, s) => {
      var a;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: r, message: n, opts: s } });
      const h = s?.ttl || Zc, d = Ys(s), f = s?.prompt || !1, g = s?.tag || 0, _ = s?.id || zr().toString(), x = { topic: r, message: n, opts: { ttl: h, relay: d, prompt: f, tag: g, id: _, attestation: s?.attestation } }, A = `Failed to publish payload, please try again. id:${_} tag:${g}`;
      try {
        const O = new Promise(async (j) => {
          const F = ({ id: C }) => {
            x.opts.id === C && (this.removeRequestFromQueue(C), this.relayer.events.removeListener(Et.publish, F), j(x));
          };
          this.relayer.events.on(Et.publish, F);
          const V = yr(new Promise((C, K) => {
            this.rpcPublish({ topic: r, message: n, ttl: h, prompt: f, tag: g, id: _, attestation: s?.attestation }).then(C).catch((N) => {
              this.logger.warn(N, N?.message), K(N);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${_} tag:${g}`);
          try {
            await V, this.events.removeListener(Et.publish, F);
          } catch (C) {
            this.queue.set(_, cf(hf({}, x), { attempt: 1 })), this.logger.warn(C, C?.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: _, topic: r, message: n, opts: s } }), await yr(O, this.publishTimeout, A);
      } catch (O) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(O), (a = s?.internal) != null && a.throwOnFailedPublish)
          throw O;
      } finally {
        this.queue.delete(_);
      }
    }, this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.relayer = t, this.logger = Ft(i, this.name), this.registerEventListeners();
  }
  get context() {
    return Zt(this.logger);
  }
  async rpcPublish(t) {
    var i, r, n, s;
    const { topic: a, message: h, ttl: d = Zc, prompt: f, tag: g, id: _, attestation: x } = t, A = { method: Kn(Ys().protocol).publish, params: { topic: a, message: h, ttl: d, prompt: f, tag: g, attestation: x }, id: _ };
    Ut((i = A.params) == null ? void 0 : i.prompt) && ((r = A.params) == null || delete r.prompt), Ut((n = A.params) == null ? void 0 : n.tag) && ((s = A.params) == null || delete s.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: A });
    const O = await this.relayer.request(A);
    return this.relayer.events.emit(Et.publish, t), this.logger.debug("Successfully Published Payload"), O;
  }
  removeRequestFromQueue(t) {
    this.queue.delete(t);
  }
  checkQueue() {
    this.queue.forEach(async (t, i) => {
      const r = t.attempt + 1;
      this.queue.set(i, cf(hf({}, t), { attempt: r }));
      const { topic: n, message: s, opts: a, attestation: h } = t;
      this.logger.warn({}, `Publisher: queue->publishing: ${t.opts.id}, tag: ${t.opts.tag}, attempt: ${r}`), await this.rpcPublish({ topic: n, message: s, ttl: a.ttl, prompt: a.prompt, tag: a.tag, id: a.id, attestation: h }), this.logger.warn({}, `Publisher: queue->published: ${t.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(bn.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = !1, this.relayer.events.emit(Et.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(Et.message_ack, (t) => {
      this.removeRequestFromQueue(t.id.toString());
    });
  }
}
class hv {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (t, i) => {
      const r = this.get(t);
      this.exists(t, i) || this.map.set(t, [...r, i]);
    }, this.get = (t) => this.map.get(t) || [], this.exists = (t, i) => this.get(t).includes(i), this.delete = (t, i) => {
      if (typeof i > "u") {
        this.map.delete(t);
        return;
      }
      if (!this.map.has(t))
        return;
      const r = this.get(t);
      if (!this.exists(t, i))
        return;
      const n = r.filter((s) => s !== i);
      if (!n.length) {
        this.map.delete(t);
        return;
      }
      this.map.set(t, n);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var cv = Object.defineProperty, fv = Object.defineProperties, uv = Object.getOwnPropertyDescriptors, ff = Object.getOwnPropertySymbols, dv = Object.prototype.hasOwnProperty, lv = Object.prototype.propertyIsEnumerable, uf = (e, t, i) => t in e ? cv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Un = (e, t) => {
  for (var i in t || (t = {}))
    dv.call(t, i) && uf(e, i, t[i]);
  if (ff)
    for (var i of ff(t))
      lv.call(t, i) && uf(e, i, t[i]);
  return e;
}, Zo = (e, t) => fv(e, uv(t));
class pv extends cp {
  constructor(t, i) {
    super(t, i), this.relayer = t, this.logger = i, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new hv(), this.events = new ri.EventEmitter(), this.name = u3, this.version = d3, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = !1, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = Ki, this.subscribeTimeout = te.toMiliseconds(te.ONE_MINUTE), this.initialSubscribeTimeout = te.toMiliseconds(te.ONE_SECOND * 15), this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId(), await this.restore()), this.initialized = !0;
    }, this.subscribe = async (r, n) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } });
      try {
        const s = Ys(n), a = { topic: r, relay: s, transportType: n?.transportType };
        this.pending.set(r, a);
        const h = await this.rpcSubscribe(r, s, n);
        return typeof h == "string" && (this.onSubscribe(h, a), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: r, opts: n } })), h;
      } catch (s) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(s), s;
      }
    }, this.unsubscribe = async (r, n) => {
      await this.restartToComplete(), this.isInitialized(), typeof n?.id < "u" ? await this.unsubscribeById(r, n.id, n) : await this.unsubscribeByTopic(r, n);
    }, this.isSubscribed = async (r) => {
      if (this.topics.includes(r))
        return !0;
      const n = `${this.pendingSubscriptionWatchLabel}_${r}`;
      return await new Promise((s, a) => {
        const h = new te.Watch();
        h.start(n);
        const d = setInterval(() => {
          (!this.pending.has(r) && this.topics.includes(r) || this.cached.some((f) => f.topic === r)) && (clearInterval(d), h.stop(n), s(!0)), h.elapsed(n) >= l3 && (clearInterval(d), h.stop(n), a(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => !1);
    }, this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.start = async () => {
      await this.onConnect();
    }, this.stop = async () => {
      await this.onDisconnect();
    }, this.restart = async () => {
      await this.restore(), await this.onRestart();
    }, this.checkPending = async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected))
        return;
      const r = [];
      this.pending.forEach((n) => {
        r.push(n);
      }), await this.batchSubscribe(r);
    }, this.registerEventListeners = () => {
      this.relayer.core.heartbeat.on(bn.pulse, async () => {
        await this.checkPending();
      }), this.events.on(Qt.created, async (r) => {
        const n = Qt.created;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      }), this.events.on(Qt.deleted, async (r) => {
        const n = Qt.deleted;
        this.logger.info(`Emitting ${n}`), this.logger.debug({ type: "event", event: n, data: r }), await this.persist();
      });
    }, this.relayer = t, this.logger = Ft(i, this.name), this.clientId = "";
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
  hasSubscription(t, i) {
    let r = !1;
    try {
      r = this.getSubscription(t).topic === i;
    } catch {
    }
    return r;
  }
  reset() {
    this.cached = [], this.initialized = !0;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(t, i) {
    const r = this.topicMap.get(t);
    await Promise.all(r.map(async (n) => await this.unsubscribeById(t, n, i)));
  }
  async unsubscribeById(t, i, r) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: t, id: i, opts: r } });
    try {
      const n = Ys(r);
      await this.rpcUnsubscribe(t, i, n);
      const s = nt("USER_DISCONNECTED", `${this.name}, ${t}`);
      await this.onUnsubscribe(t, i, s), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: t, id: i, opts: r } });
    } catch (n) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(n), n;
    }
  }
  async rpcSubscribe(t, i, r) {
    var n;
    r?.transportType === st.relay && await this.restartToComplete();
    const s = { method: Kn(i.protocol).subscribe, params: { topic: t } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s });
    const a = (n = r?.internal) == null ? void 0 : n.throwOnFailedPublish;
    try {
      const h = this.getSubscriptionId(t);
      if (r?.transportType === st.link_mode)
        return setTimeout(() => {
          (this.relayer.connected || this.relayer.connecting) && this.relayer.request(s).catch((g) => this.logger.warn(g));
        }, te.toMiliseconds(te.ONE_SECOND)), h;
      const d = new Promise(async (g) => {
        const _ = (x) => {
          x.topic === t && (this.events.removeListener(Qt.created, _), g(x.id));
        };
        this.events.on(Qt.created, _);
        try {
          const x = await yr(new Promise((A, O) => {
            this.relayer.request(s).catch((j) => {
              this.logger.warn(j, j?.message), O(j);
            }).then(A);
          }), this.initialSubscribeTimeout, `Subscribing to ${t} failed, please try again`);
          this.events.removeListener(Qt.created, _), g(x);
        } catch {
        }
      }), f = await yr(d, this.subscribeTimeout, `Subscribing to ${t} failed, please try again`);
      if (!f && a)
        throw new Error(`Subscribing to ${t} failed, please try again`);
      return f ? h : null;
    } catch (h) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(Et.connection_stalled), a)
        throw h;
    }
    return null;
  }
  async rpcBatchSubscribe(t) {
    if (!t.length)
      return;
    const i = t[0].relay, r = { method: Kn(i.protocol).batchSubscribe, params: { topics: t.map((n) => n.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    try {
      await await yr(new Promise((n) => {
        this.relayer.request(r).catch((s) => this.logger.warn(s)).then(n);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(Et.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(t) {
    if (!t.length)
      return;
    const i = t[0].relay, r = { method: Kn(i.protocol).batchFetchMessages, params: { topics: t.map((s) => s.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r });
    let n;
    try {
      n = await await yr(new Promise((s, a) => {
        this.relayer.request(r).catch((h) => {
          this.logger.warn(h), a(h);
        }).then(s);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(Et.connection_stalled);
    }
    return n;
  }
  rpcUnsubscribe(t, i, r) {
    const n = { method: Kn(r.protocol).unsubscribe, params: { topic: t, id: i } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: n }), this.relayer.request(n);
  }
  onSubscribe(t, i) {
    this.setSubscription(t, Zo(Un({}, i), { id: t })), this.pending.delete(i.topic);
  }
  onBatchSubscribe(t) {
    t.length && t.forEach((i) => {
      this.setSubscription(i.id, Un({}, i)), this.pending.delete(i.topic);
    });
  }
  async onUnsubscribe(t, i, r) {
    this.events.removeAllListeners(i), this.hasSubscription(i, t) && this.deleteSubscription(i, r), await this.relayer.messages.del(t);
  }
  async setRelayerSubscriptions(t) {
    await this.relayer.core.storage.setItem(this.storageKey, t);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(t, i) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: t, subscription: i }), this.addSubscription(t, i);
  }
  addSubscription(t, i) {
    this.subscriptions.set(t, Un({}, i)), this.topicMap.set(i.topic, t), this.events.emit(Qt.created, i);
  }
  getSubscription(t) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: t });
    const i = this.subscriptions.get(t);
    if (!i) {
      const { message: r } = ne("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw new Error(r);
    }
    return i;
  }
  deleteSubscription(t, i) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: t, reason: i });
    const r = this.getSubscription(t);
    this.subscriptions.delete(t), this.topicMap.delete(r.topic, t), this.events.emit(Qt.deleted, Zo(Un({}, r), { reason: i }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(Qt.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const t = [...this.cached], i = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let r = 0; r < i; r++) {
        const n = t.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(n);
      }
    }
    this.events.emit(Qt.resubscribed);
  }
  async restore() {
    try {
      const t = await this.getRelayerSubscriptions();
      if (typeof t > "u" || !t.length)
        return;
      if (this.subscriptions.size) {
        const { message: i } = ne("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(i), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(i);
      }
      this.cached = t, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(t);
    }
  }
  async batchSubscribe(t) {
    t.length && (await this.rpcBatchSubscribe(t), this.onBatchSubscribe(t.map((i) => Zo(Un({}, i), { id: this.getSubscriptionId(i.topic) }))));
  }
  async batchFetchMessages(t) {
    if (!t.length)
      return;
    this.logger.trace(`Fetching batch messages for ${t.length} subscriptions`);
    const i = await this.rpcBatchFetchMessages(t);
    i && i.messages && (await Q2(te.toMiliseconds(te.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(i.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  async restartToComplete() {
    !this.relayer.connected && !this.relayer.connecting && await this.relayer.transportOpen();
  }
  getSubscriptionId(t) {
    return or(t + this.clientId);
  }
}
var gv = Object.defineProperty, df = Object.getOwnPropertySymbols, bv = Object.prototype.hasOwnProperty, mv = Object.prototype.propertyIsEnumerable, lf = (e, t, i) => t in e ? gv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, pf = (e, t) => {
  for (var i in t || (t = {}))
    bv.call(t, i) && lf(e, i, t[i]);
  if (df)
    for (var i of df(t))
      mv.call(t, i) && lf(e, i, t[i]);
  return e;
};
class yv extends ap {
  constructor(t) {
    super(t), this.protocol = "wc", this.version = 2, this.events = new ri.EventEmitter(), this.name = o3, this.transportExplicitlyClosed = !1, this.initialized = !1, this.connectionAttemptInProgress = !1, this.hasExperiencedNetworkDisruption = !1, this.heartBeatTimeout = te.toMiliseconds(te.THIRTY_SECONDS + te.FIVE_SECONDS), this.requestsInFlight = [], this.connectTimeout = te.toMiliseconds(te.ONE_SECOND * 15), this.request = async (i) => {
      var r, n;
      this.logger.debug("Publishing Request Payload");
      const s = i.id || zr().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: s, method: i.method, topic: (r = i.params) == null ? void 0 : r.topic }, "relayer.request - publishing...");
        const a = `${s}:${((n = i.params) == null ? void 0 : n.tag) || ""}`;
        this.requestsInFlight.push(a);
        const h = await this.provider.request(i);
        return this.requestsInFlight = this.requestsInFlight.filter((d) => d !== a), h;
      } catch (a) {
        throw this.logger.debug(`Failed to Publish Request: ${s}`), a;
      }
    }, this.resetPingTimeout = () => {
      if (Ws())
        try {
          clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
            var i, r, n;
            this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (n = (r = (i = this.provider) == null ? void 0 : i.connection) == null ? void 0 : r.socket) == null || n.terminate();
          }, this.heartBeatTimeout);
        } catch (i) {
          this.logger.warn(i, i?.message);
        }
    }, this.onPayloadHandler = (i) => {
      this.onProviderPayload(i), this.resetPingTimeout();
    }, this.onConnectHandler = () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(Et.connect);
    }, this.onDisconnectHandler = () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (i) => {
      this.logger.fatal(i, `Fatal socket error: ${i?.message}`), this.events.emit(Et.error, i), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(fi.payload, this.onPayloadHandler), this.provider.on(fi.connect, this.onConnectHandler), this.provider.on(fi.disconnect, this.onDisconnectHandler), this.provider.on(fi.error, this.onProviderErrorHandler);
    }, this.core = t.core, this.logger = typeof t.logger < "u" && typeof t.logger != "string" ? Ft(t.logger, this.name) : io(xa({ level: t.logger || s3 })), this.messages = new tv(this.logger, t.core), this.subscriber = new pv(this, this.logger), this.publisher = new av(this, this.logger), this.relayUrl = t?.relayUrl || Md, this.projectId = t.projectId, U2() ? this.packageName = Ec() : D2() && (this.bundleId = Ec()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = !0, this.subscriber.cached.length > 0)
      try {
        await this.transportOpen();
      } catch (t) {
        this.logger.warn(t, t?.message);
      }
  }
  get context() {
    return Zt(this.logger);
  }
  get connected() {
    var t, i, r;
    return ((r = (i = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i.socket) == null ? void 0 : r.readyState) === 1;
  }
  get connecting() {
    var t, i, r;
    return ((r = (i = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : i.socket) == null ? void 0 : r.readyState) === 0;
  }
  async publish(t, i, r) {
    this.isInitialized(), await this.publisher.publish(t, i, r), await this.recordMessageEvent({ topic: t, message: i, publishedAt: Date.now(), transportType: st.relay });
  }
  async subscribe(t, i) {
    var r, n, s;
    this.isInitialized(), (!(i != null && i.transportType) || i?.transportType === "relay") && await this.toEstablishConnection();
    const a = typeof ((r = i?.internal) == null ? void 0 : r.throwOnFailedPublish) > "u" ? !0 : (n = i?.internal) == null ? void 0 : n.throwOnFailedPublish;
    let h = ((s = this.subscriber.topicMap.get(t)) == null ? void 0 : s[0]) || "", d;
    const f = (g) => {
      g.topic === t && (this.subscriber.off(Qt.created, f), d());
    };
    return await Promise.all([new Promise((g) => {
      d = g, this.subscriber.on(Qt.created, f);
    }), new Promise(async (g, _) => {
      h = await this.subscriber.subscribe(t, pf({ internal: { throwOnFailedPublish: a } }, i)).catch((x) => {
        a && _(x);
      }) || h, g();
    })]), h;
  }
  async unsubscribe(t, i) {
    this.isInitialized(), await this.subscriber.unsubscribe(t, i);
  }
  on(t, i) {
    this.events.on(t, i);
  }
  once(t, i) {
    this.events.once(t, i);
  }
  off(t, i) {
    this.events.off(t, i);
  }
  removeListener(t, i) {
    this.events.removeListener(t, i);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await yr(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = !0, await this.transportDisconnect();
  }
  async transportOpen(t) {
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (i, r) => {
      await this.connect(t).then(i).catch(r).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected)
      throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(t) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = t || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Bc())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(t) {
    if (t?.length === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const i = t.sort((r, n) => r.publishedAt - n.publishedAt);
    this.logger.debug(`Batch of ${i.length} message events sorted`);
    for (const r of i)
      try {
        await this.onMessageEvent(r);
      } catch (n) {
        this.logger.warn(n, "Error while processing batch message event: " + n?.message);
      }
    this.logger.trace(`Batch of ${i.length} message events processed`);
  }
  async onLinkMessageEvent(t, i) {
    const { topic: r } = t;
    if (!i.sessionExists) {
      const n = yt(te.FIVE_MINUTES), s = { topic: r, expiry: n, relay: { protocol: "irn" }, active: !1 };
      await this.core.pairing.pairings.set(r, s);
    }
    this.events.emit(Et.message, t), await this.recordMessageEvent(t);
  }
  async connect(t) {
    await this.confirmOnlineStateOrThrow(), t && t !== this.relayUrl && (this.relayUrl = t, await this.transportDisconnect()), this.connectionAttemptInProgress = !0, this.transportExplicitlyClosed = !1;
    let i = 1;
    for (; i < 6; ) {
      try {
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${i}...`), await this.createProvider(), await new Promise(async (r, n) => {
          const s = () => {
            n(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(fi.disconnect, s), await yr(new Promise((a, h) => {
            this.provider.connect().then(a).catch(h);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((a) => {
            n(a);
          }).finally(() => {
            this.provider.off(fi.disconnect, s), clearTimeout(this.reconnectTimeout), this.reconnectTimeout = void 0;
          }), await new Promise(async (a, h) => {
            const d = () => {
              h(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(fi.disconnect, d), await this.subscriber.start().then(a).catch(h).finally(() => {
              this.provider.off(fi.disconnect, d);
            });
          }), this.hasExperiencedNetworkDisruption = !1, r();
        });
      } catch (r) {
        await this.subscriber.stop();
        const n = r;
        this.logger.warn({}, n.message), this.hasExperiencedNetworkDisruption = !0;
      } finally {
        this.connectionAttemptInProgress = !1;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${i}`);
        break;
      }
      await new Promise((r) => setTimeout(r, te.toMiliseconds(i * 1))), i++;
    }
  }
  startPingTimeout() {
    var t, i, r, n, s;
    if (Ws())
      try {
        (i = (t = this.provider) == null ? void 0 : t.connection) != null && i.socket && ((s = (n = (r = this.provider) == null ? void 0 : r.connection) == null ? void 0 : n.socket) == null || s.on("ping", () => {
          this.resetPingTimeout();
        })), this.resetPingTimeout();
      } catch (a) {
        this.logger.warn(a, a?.message);
      }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const t = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new _d(new Wy($2({ sdkVersion: Ea, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: t, useOnCloseEvent: !0, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(t) {
    const { topic: i, message: r } = t;
    await this.messages.set(i, r);
  }
  async shouldIgnoreMessageEvent(t) {
    const { topic: i, message: r } = t;
    if (!r || r.length === 0)
      return this.logger.warn(`Ignoring invalid/empty message: ${r}`), !0;
    if (!await this.subscriber.isSubscribed(i))
      return this.logger.warn(`Ignoring message for non-subscribed topic ${i}`), !0;
    const n = this.messages.has(i, r);
    return n && this.logger.warn(`Ignoring duplicate message: ${r}`), n;
  }
  async onProviderPayload(t) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: t }), Qa(t)) {
      if (!t.method.endsWith(a3))
        return;
      const i = t.params, { topic: r, message: n, publishedAt: s, attestation: a } = i.data, h = { topic: r, message: n, publishedAt: s, transportType: st.relay, attestation: a };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(pf({ type: "event", event: i.id }, h)), this.events.emit(i.id, h), await this.acknowledgePayload(t), await this.onMessageEvent(h);
    } else
      Ao(t) && this.events.emit(Et.message_ack, t);
  }
  async onMessageEvent(t) {
    await this.shouldIgnoreMessageEvent(t) || (this.events.emit(Et.message, t), await this.recordMessageEvent(t));
  }
  async acknowledgePayload(t) {
    const i = Io(t.id, !0);
    await this.provider.connection.send(i);
  }
  unregisterProviderListeners() {
    this.provider.off(fi.payload, this.onPayloadHandler), this.provider.off(fi.connect, this.onConnectHandler), this.provider.off(fi.disconnect, this.onDisconnectHandler), this.provider.off(fi.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let t = await Bc();
    Sy(async (i) => {
      t !== i && (t = i, i ? await this.transportOpen().catch((r) => this.logger.error(r, r?.message)) : (this.hasExperiencedNetworkDisruption = !0, await this.transportDisconnect(), this.transportExplicitlyClosed = !1));
    });
  }
  async onProviderDisconnect() {
    await this.subscriber.stop(), clearTimeout(this.pingTimeout), this.events.emit(Et.disconnect), this.connectionAttemptInProgress = !1, !this.transportExplicitlyClosed && (this.reconnectTimeout || this.connectPromise || (this.reconnectTimeout = setTimeout(async () => {
      clearTimeout(this.reconnectTimeout), await this.transportOpen().catch((t) => this.logger.error(t, t?.message));
    }, te.toMiliseconds(h3))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && await this.transportOpen();
  }
}
var vv = Object.defineProperty, gf = Object.getOwnPropertySymbols, wv = Object.prototype.hasOwnProperty, _v = Object.prototype.propertyIsEnumerable, bf = (e, t, i) => t in e ? vv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, mf = (e, t) => {
  for (var i in t || (t = {}))
    wv.call(t, i) && bf(e, i, t[i]);
  if (gf)
    for (var i of gf(t))
      _v.call(t, i) && bf(e, i, t[i]);
  return e;
};
class Zr extends hp {
  constructor(t, i, r, n = Ki, s = void 0) {
    super(t, i, r, n), this.core = t, this.logger = i, this.name = r, this.map = /* @__PURE__ */ new Map(), this.version = c3, this.cached = [], this.initialized = !1, this.storagePrefix = Ki, this.recentlyDeleted = [], this.recentlyDeletedLimit = 200, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((a) => {
        this.getKey && a !== null && !Ut(a) ? this.map.set(this.getKey(a), a) : ey(a) ? this.map.set(a.id, a) : ty(a) && this.map.set(a.topic, a);
      }), this.cached = [], this.initialized = !0);
    }, this.set = async (a, h) => {
      this.isInitialized(), this.map.has(a) ? await this.update(a, h) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: a, value: h }), this.map.set(a, h), await this.persist());
    }, this.get = (a) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: a }), this.getData(a)), this.getAll = (a) => (this.isInitialized(), a ? this.values.filter((h) => Object.keys(a).every((d) => Yy(h[d], a[d]))) : this.values), this.update = async (a, h) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: a, update: h });
      const d = mf(mf({}, this.getData(a)), h);
      this.map.set(a, d), await this.persist();
    }, this.delete = async (a, h) => {
      this.isInitialized(), this.map.has(a) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: a, reason: h }), this.map.delete(a), this.addToRecentlyDeleted(a), await this.persist());
    }, this.logger = Ft(i, this.name), this.storagePrefix = n, this.getKey = s;
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
  addToRecentlyDeleted(t) {
    this.recentlyDeleted.push(t), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(t) {
    const i = this.map.get(t);
    if (!i) {
      if (this.recentlyDeleted.includes(t)) {
        const { message: n } = ne("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${t}`);
        throw this.logger.error(n), new Error(n);
      }
      const { message: r } = ne("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw this.logger.error(r), new Error(r);
    }
    return i;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const t = await this.getDataStore();
      if (typeof t > "u" || !t.length)
        return;
      if (this.map.size) {
        const { message: i } = ne("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(i), new Error(i);
      }
      this.cached = t, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(t);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
class Ev {
  constructor(t, i) {
    this.core = t, this.logger = i, this.name = p3, this.version = g3, this.events = new jf(), this.initialized = !1, this.storagePrefix = Ki, this.ignoredPayloadTypes = [hr], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = !0, this.logger.trace("Initialized"));
    }, this.register = ({ methods: r }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...r])];
    }, this.create = async (r) => {
      this.isInitialized();
      const n = wa(), s = await this.core.crypto.setSymKey(n), a = yt(te.FIVE_MINUTES), h = { protocol: Id }, d = { topic: s, expiry: a, relay: h, active: !1, methods: r?.methods }, f = jc({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: n, relay: h, expiryTimestamp: a, methods: r?.methods });
      return this.events.emit(qr.create, d), this.core.expirer.set(s, a), await this.pairings.set(s, d), await this.core.relayer.subscribe(s, { transportType: r?.transportType }), { topic: s, uri: f };
    }, this.pair = async (r) => {
      this.isInitialized();
      const n = this.core.eventClient.createEvent({ properties: { topic: r?.uri, trace: [Ni.pairing_started] } });
      this.isValidPair(r, n);
      const { topic: s, symKey: a, relay: h, expiryTimestamp: d, methods: f } = qc(r.uri);
      n.props.properties.topic = s, n.addTrace(Ni.pairing_uri_validation_success), n.addTrace(Ni.pairing_uri_not_expired);
      let g;
      if (this.pairings.keys.includes(s)) {
        if (g = this.pairings.get(s), n.addTrace(Ni.existing_pairing), g.active)
          throw n.setError(nr.active_pairing_already_exists), new Error(`Pairing already exists: ${s}. Please try again with a new connection URI.`);
        n.addTrace(Ni.pairing_not_expired);
      }
      const _ = d || yt(te.FIVE_MINUTES), x = { topic: s, relay: h, expiry: _, active: !1, methods: f };
      this.core.expirer.set(s, _), await this.pairings.set(s, x), n.addTrace(Ni.store_new_pairing), r.activatePairing && await this.activate({ topic: s }), this.events.emit(qr.create, x), n.addTrace(Ni.emit_inactive_pairing), this.core.crypto.keychain.has(s) || await this.core.crypto.setSymKey(a, s), n.addTrace(Ni.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        n.setError(nr.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(s, { relay: h });
      } catch (A) {
        throw n.setError(nr.subscribe_pairing_topic_failure), A;
      }
      return n.addTrace(Ni.subscribe_pairing_topic_success), x;
    }, this.activate = async ({ topic: r }) => {
      this.isInitialized();
      const n = yt(te.THIRTY_DAYS);
      this.core.expirer.set(r, n), await this.pairings.update(r, { active: !0, expiry: n });
    }, this.ping = async (r) => {
      this.isInitialized(), await this.isValidPing(r);
      const { topic: n } = r;
      if (this.pairings.keys.includes(n)) {
        const s = await this.sendRequest(n, "wc_pairingPing", {}), { done: a, resolve: h, reject: d } = Lr();
        this.events.once(Ze("pairing_ping", s), ({ error: f }) => {
          f ? d(f) : h();
        }), await a();
      }
    }, this.updateExpiry = async ({ topic: r, expiry: n }) => {
      this.isInitialized(), await this.pairings.update(r, { expiry: n });
    }, this.updateMetadata = async ({ topic: r, metadata: n }) => {
      this.isInitialized(), await this.pairings.update(r, { peerMetadata: n });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (r) => {
      this.isInitialized(), await this.isValidDisconnect(r);
      const { topic: n } = r;
      this.pairings.keys.includes(n) && (await this.sendRequest(n, "wc_pairingDelete", nt("USER_DISCONNECTED")), await this.deletePairing(n));
    }, this.formatUriFromPairing = (r) => {
      this.isInitialized();
      const { topic: n, relay: s, expiry: a, methods: h } = r, d = this.core.crypto.keychain.get(n);
      return jc({ protocol: this.core.protocol, version: this.core.version, topic: n, symKey: d, relay: s, expiryTimestamp: a, methods: h });
    }, this.sendRequest = async (r, n, s) => {
      const a = Ur(n, s), h = await this.core.crypto.encode(r, a), d = jn[n].req;
      return this.core.history.set(r, a), this.core.relayer.publish(r, h, d), a.id;
    }, this.sendResult = async (r, n, s) => {
      const a = Io(r, s), h = await this.core.crypto.encode(n, a), d = await this.core.history.get(n, r), f = jn[d.request.method].res;
      await this.core.relayer.publish(n, h, f), await this.core.history.resolve(a);
    }, this.sendError = async (r, n, s) => {
      const a = Mo(r, s), h = await this.core.crypto.encode(n, a), d = await this.core.history.get(n, r), f = jn[d.request.method] ? jn[d.request.method].res : jn.unregistered_method.res;
      await this.core.relayer.publish(n, h, f), await this.core.history.resolve(a);
    }, this.deletePairing = async (r, n) => {
      await this.core.relayer.unsubscribe(r), await Promise.all([this.pairings.delete(r, nt("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(r), n ? Promise.resolve() : this.core.expirer.del(r)]);
    }, this.cleanup = async () => {
      const r = this.pairings.getAll().filter((n) => br(n.expiry));
      await Promise.all(r.map((n) => this.deletePairing(n.topic)));
    }, this.onRelayEventRequest = (r) => {
      const { topic: n, payload: s } = r;
      switch (s.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(n, s);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(n, s);
        default:
          return this.onUnknownRpcMethodRequest(n, s);
      }
    }, this.onRelayEventResponse = async (r) => {
      const { topic: n, payload: s } = r, a = (await this.core.history.get(n, s.id)).request.method;
      switch (a) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(n, s);
        default:
          return this.onUnknownRpcMethodResponse(a);
      }
    }, this.onPairingPingRequest = async (r, n) => {
      const { id: s } = n;
      try {
        this.isValidPing({ topic: r }), await this.sendResult(s, r, !0), this.events.emit(qr.ping, { id: s, topic: r });
      } catch (a) {
        await this.sendError(s, r, a), this.logger.error(a);
      }
    }, this.onPairingPingResponse = (r, n) => {
      const { id: s } = n;
      setTimeout(() => {
        Ri(n) ? this.events.emit(Ze("pairing_ping", s), {}) : di(n) && this.events.emit(Ze("pairing_ping", s), { error: n.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (r, n) => {
      const { id: s } = n;
      try {
        this.isValidDisconnect({ topic: r }), await this.deletePairing(r), this.events.emit(qr.delete, { id: s, topic: r });
      } catch (a) {
        await this.sendError(s, r, a), this.logger.error(a);
      }
    }, this.onUnknownRpcMethodRequest = async (r, n) => {
      const { id: s, method: a } = n;
      try {
        if (this.registeredMethods.includes(a))
          return;
        const h = nt("WC_METHOD_UNSUPPORTED", a);
        await this.sendError(s, r, h), this.logger.error(h);
      } catch (h) {
        await this.sendError(s, r, h), this.logger.error(h);
      }
    }, this.onUnknownRpcMethodResponse = (r) => {
      this.registeredMethods.includes(r) || this.logger.error(nt("WC_METHOD_UNSUPPORTED", r));
    }, this.isValidPair = (r, n) => {
      var s;
      if (!Gt(r)) {
        const { message: h } = ne("MISSING_OR_INVALID", `pair() params: ${r}`);
        throw n.setError(nr.malformed_pairing_uri), new Error(h);
      }
      if (!Q6(r.uri)) {
        const { message: h } = ne("MISSING_OR_INVALID", `pair() uri: ${r.uri}`);
        throw n.setError(nr.malformed_pairing_uri), new Error(h);
      }
      const a = qc(r?.uri);
      if (!((s = a?.relay) != null && s.protocol)) {
        const { message: h } = ne("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw n.setError(nr.malformed_pairing_uri), new Error(h);
      }
      if (!(a != null && a.symKey)) {
        const { message: h } = ne("MISSING_OR_INVALID", "pair() uri#symKey");
        throw n.setError(nr.malformed_pairing_uri), new Error(h);
      }
      if (a != null && a.expiryTimestamp && te.toMiliseconds(a?.expiryTimestamp) < Date.now()) {
        n.setError(nr.pairing_expired);
        const { message: h } = ne("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(h);
      }
    }, this.isValidPing = async (r) => {
      if (!Gt(r)) {
        const { message: s } = ne("MISSING_OR_INVALID", `ping() params: ${r}`);
        throw new Error(s);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }, this.isValidDisconnect = async (r) => {
      if (!Gt(r)) {
        const { message: s } = ne("MISSING_OR_INVALID", `disconnect() params: ${r}`);
        throw new Error(s);
      }
      const { topic: n } = r;
      await this.isValidPairingTopic(n);
    }, this.isValidPairingTopic = async (r) => {
      if (!gt(r, !1)) {
        const { message: n } = ne("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
        throw new Error(n);
      }
      if (!this.pairings.keys.includes(r)) {
        const { message: n } = ne("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
        throw new Error(n);
      }
      if (br(this.pairings.get(r).expiry)) {
        await this.deletePairing(r);
        const { message: n } = ne("EXPIRED", `pairing topic: ${r}`);
        throw new Error(n);
      }
    }, this.core = t, this.logger = Ft(i, this.name), this.pairings = new Zr(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return Zt(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(Et.message, async (t) => {
      const { topic: i, message: r, transportType: n } = t;
      if (!this.pairings.keys.includes(i) || n === st.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(r)))
        return;
      const s = await this.core.crypto.decode(i, r);
      try {
        Qa(s) ? (this.core.history.set(i, s), this.onRelayEventRequest({ topic: i, payload: s })) : Ao(s) && (await this.core.history.resolve(s), await this.onRelayEventResponse({ topic: i, payload: s }), this.core.history.delete(i, s.id));
      } catch (a) {
        this.logger.error(a);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(ui.expired, async (t) => {
      const { topic: i } = sd(t.target);
      i && this.pairings.keys.includes(i) && (await this.deletePairing(i, !0), this.events.emit(qr.expire, { topic: i }));
    });
  }
}
class Sv extends np {
  constructor(t, i) {
    super(t, i), this.core = t, this.logger = i, this.records = /* @__PURE__ */ new Map(), this.events = new ri.EventEmitter(), this.name = b3, this.version = m3, this.cached = [], this.initialized = !1, this.storagePrefix = Ki, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.records.set(r.id, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.set = (r, n, s) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: r, request: n, chainId: s }), this.records.has(n.id))
        return;
      const a = { id: n.id, topic: r, request: { method: n.method, params: n.params || null }, chainId: s, expiry: yt(te.THIRTY_DAYS) };
      this.records.set(a.id, a), this.persist(), this.events.emit(_i.created, a);
    }, this.resolve = async (r) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: r }), !this.records.has(r.id))
        return;
      const n = await this.getRecord(r.id);
      typeof n.response > "u" && (n.response = di(r) ? { error: r.error } : { result: r.result }, this.records.set(n.id, n), this.persist(), this.events.emit(_i.updated, n));
    }, this.get = async (r, n) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: r, id: n }), await this.getRecord(n)), this.delete = (r, n) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: n }), this.values.forEach((s) => {
        if (s.topic === r) {
          if (typeof n < "u" && s.id !== n)
            return;
          this.records.delete(s.id), this.events.emit(_i.deleted, s);
        }
      }), this.persist();
    }, this.exists = async (r, n) => (this.isInitialized(), this.records.has(n) ? (await this.getRecord(n)).topic === r : !1), this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.logger = Ft(i, this.name);
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
    const t = [];
    return this.values.forEach((i) => {
      if (typeof i.response < "u")
        return;
      const r = { topic: i.topic, request: Ur(i.request.method, i.request.params, i.id), chainId: i.chainId };
      return t.push(r);
    }), t;
  }
  async setJsonRpcRecords(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(t) {
    this.isInitialized();
    const i = this.records.get(t);
    if (!i) {
      const { message: r } = ne("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw new Error(r);
    }
    return i;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(_i.sync);
  }
  async restore() {
    try {
      const t = await this.getJsonRpcRecords();
      if (typeof t > "u" || !t.length)
        return;
      if (this.records.size) {
        const { message: i } = ne("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(i), new Error(i);
      }
      this.cached = t, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(t);
    }
  }
  registerEventListeners() {
    this.events.on(_i.created, (t) => {
      const i = _i.created;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, record: t });
    }), this.events.on(_i.updated, (t) => {
      const i = _i.updated;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, record: t });
    }), this.events.on(_i.deleted, (t) => {
      const i = _i.deleted;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, record: t });
    }), this.core.heartbeat.on(bn.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let t = !1;
      this.records.forEach((i) => {
        te.toMiliseconds(i.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${i.id}`), this.records.delete(i.id), this.events.emit(_i.deleted, i, !1), t = !0);
      }), t && this.persist();
    } catch (t) {
      this.logger.warn(t);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
class Iv extends fp {
  constructor(t, i) {
    super(t, i), this.core = t, this.logger = i, this.expirations = /* @__PURE__ */ new Map(), this.events = new ri.EventEmitter(), this.name = y3, this.version = v3, this.cached = [], this.initialized = !1, this.storagePrefix = Ki, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((r) => this.expirations.set(r.target, r)), this.cached = [], this.registerEventListeners(), this.initialized = !0);
    }, this.has = (r) => {
      try {
        const n = this.formatTarget(r);
        return typeof this.getExpiration(n) < "u";
      } catch {
        return !1;
      }
    }, this.set = (r, n) => {
      this.isInitialized();
      const s = this.formatTarget(r), a = { target: s, expiry: n };
      this.expirations.set(s, a), this.checkExpiry(s, a), this.events.emit(ui.created, { target: s, expiration: a });
    }, this.get = (r) => {
      this.isInitialized();
      const n = this.formatTarget(r);
      return this.getExpiration(n);
    }, this.del = (r) => {
      if (this.isInitialized(), this.has(r)) {
        const n = this.formatTarget(r), s = this.getExpiration(n);
        this.expirations.delete(n), this.events.emit(ui.deleted, { target: n, expiration: s });
      }
    }, this.on = (r, n) => {
      this.events.on(r, n);
    }, this.once = (r, n) => {
      this.events.once(r, n);
    }, this.off = (r, n) => {
      this.events.off(r, n);
    }, this.removeListener = (r, n) => {
      this.events.removeListener(r, n);
    }, this.logger = Ft(i, this.name);
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
  formatTarget(t) {
    if (typeof t == "string")
      return V2(t);
    if (typeof t == "number")
      return H2(t);
    const { message: i } = ne("UNKNOWN_TYPE", `Target type: ${typeof t}`);
    throw new Error(i);
  }
  async setExpirations(t) {
    await this.core.storage.setItem(this.storageKey, t);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(ui.sync);
  }
  async restore() {
    try {
      const t = await this.getExpirations();
      if (typeof t > "u" || !t.length)
        return;
      if (this.expirations.size) {
        const { message: i } = ne("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(i), new Error(i);
      }
      this.cached = t, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (t) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(t);
    }
  }
  getExpiration(t) {
    const i = this.expirations.get(t);
    if (!i) {
      const { message: r } = ne("NO_MATCHING_KEY", `${this.name}: ${t}`);
      throw this.logger.warn(r), new Error(r);
    }
    return i;
  }
  checkExpiry(t, i) {
    const { expiry: r } = i;
    te.toMiliseconds(r) - Date.now() <= 0 && this.expire(t, i);
  }
  expire(t, i) {
    this.expirations.delete(t), this.events.emit(ui.expired, { target: t, expiration: i });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((t, i) => this.checkExpiry(i, t));
  }
  registerEventListeners() {
    this.core.heartbeat.on(bn.pulse, () => this.checkExpirations()), this.events.on(ui.created, (t) => {
      const i = ui.created;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, data: t }), this.persist();
    }), this.events.on(ui.expired, (t) => {
      const i = ui.expired;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, data: t }), this.persist();
    }), this.events.on(ui.deleted, (t) => {
      const i = ui.deleted;
      this.logger.info(`Emitting ${i}`), this.logger.debug({ type: "event", event: i, data: t }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
}
class Mv extends up {
  constructor(t, i, r) {
    super(t, i, r), this.core = t, this.logger = i, this.store = r, this.name = w3, this.verifyUrlV3 = E3, this.storagePrefix = Ki, this.version = Sd, this.init = async () => {
      var n;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && te.toMiliseconds((n = this.publicKey) == null ? void 0 : n.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }, this.register = async (n) => {
      if (!hs() || this.isDevEnv)
        return;
      const s = window.location.origin, { id: a, decryptedId: h } = n, d = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${s}&id=${a}&decryptedId=${h}`;
      try {
        const f = is(), g = this.startAbortTimer(te.ONE_SECOND * 5), _ = await new Promise((x, A) => {
          const O = () => {
            window.removeEventListener("message", F), f.body.removeChild(j), A("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", O);
          const j = f.createElement("iframe");
          j.src = d, j.style.display = "none", j.addEventListener("error", O, { signal: this.abortController.signal });
          const F = (V) => {
            if (V.data && typeof V.data == "string")
              try {
                const C = JSON.parse(V.data);
                if (C.type === "verify_attestation") {
                  if (ca(C.attestation).payload.id !== a)
                    return;
                  clearInterval(g), f.body.removeChild(j), this.abortController.signal.removeEventListener("abort", O), window.removeEventListener("message", F), x(C.attestation === null ? "" : C.attestation);
                }
              } catch (C) {
                this.logger.warn(C);
              }
          };
          f.body.appendChild(j), window.addEventListener("message", F, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", _), _;
      } catch (f) {
        this.logger.warn(f);
      }
      return "";
    }, this.resolve = async (n) => {
      if (this.isDevEnv)
        return "";
      const { attestationId: s, hash: a, encryptedId: h } = n;
      if (s === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (s) {
        if (ca(s).payload.id !== h)
          return;
        const f = await this.isValidJwtAttestation(s);
        if (f) {
          if (!f.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return f;
        }
      }
      if (!a)
        return;
      const d = this.getVerifyUrl(n?.verifyUrl);
      return this.fetchAttestation(a, d);
    }, this.fetchAttestation = async (n, s) => {
      this.logger.debug(`resolving attestation: ${n} from url: ${s}`);
      const a = this.startAbortTimer(te.ONE_SECOND * 5), h = await fetch(`${s}/attestation/${n}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(a), h.status === 200 ? await h.json() : void 0;
    }, this.getVerifyUrl = (n) => {
      let s = n || Vn;
      return S3.includes(s) || (this.logger.info(`verify url: ${s}, not included in trusted list, assigning default: ${Vn}`), s = Vn), s;
    }, this.fetchPublicKey = async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const n = this.startAbortTimer(te.FIVE_SECONDS), s = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
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
      } catch (h) {
        this.logger.error(h), this.logger.warn("error validating attestation");
      }
      const a = await this.fetchAndPersistPublicKey();
      try {
        if (a)
          return this.validateAttestation(n, a);
      } catch (h) {
        this.logger.error(h), this.logger.warn("error validating attestation");
      }
    }, this.getPublicKey = async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey(), this.fetchAndPersistPublicKey = async () => {
      if (this.fetchPromise)
        return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (s) => {
        const a = await this.fetchPublicKey();
        a && (await this.persistPublicKey(a), s(a));
      });
      const n = await this.fetchPromise;
      return this.fetchPromise = void 0, n;
    }, this.validateAttestation = (n, s) => {
      const a = L6(n, s.publicKey), h = { hasExpired: te.toMiliseconds(a.exp) < Date.now(), payload: a };
      if (h.hasExpired)
        throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: h.payload.origin, isScam: h.payload.isScam, isVerified: h.payload.isVerified };
    }, this.logger = Ft(i, this.name), this.abortController = new AbortController(), this.isDevEnv = Ga(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return Zt(this.logger);
  }
  startAbortTimer(t) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), te.toMiliseconds(t));
  }
}
class Av extends dp {
  constructor(t, i) {
    super(t, i), this.projectId = t, this.logger = i, this.context = I3, this.registerDeviceToken = async (r) => {
      const { clientId: n, token: s, notificationType: a, enableEncrypted: h = !1 } = r, d = `${M3}/${this.projectId}/clients`;
      await fetch(d, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: n, type: a, token: s, always_raw: h }) });
    }, this.logger = Ft(i, this.context);
  }
}
var xv = Object.defineProperty, yf = Object.getOwnPropertySymbols, Ov = Object.prototype.hasOwnProperty, Pv = Object.prototype.propertyIsEnumerable, vf = (e, t, i) => t in e ? xv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Dn = (e, t) => {
  for (var i in t || (t = {}))
    Ov.call(t, i) && vf(e, i, t[i]);
  if (yf)
    for (var i of yf(t))
      Pv.call(t, i) && vf(e, i, t[i]);
  return e;
};
class Nv extends lp {
  constructor(t, i, r = !0) {
    super(t, i, r), this.core = t, this.logger = i, this.context = x3, this.storagePrefix = Ki, this.storageVersion = A3, this.events = /* @__PURE__ */ new Map(), this.shouldPersist = !1, this.init = async () => {
      if (!Ga())
        try {
          const n = { eventId: Ic(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: td(this.core.relayer.protocol, this.core.relayer.version, Ea) } } };
          await this.sendEvent([n]);
        } catch (n) {
          this.logger.warn(n);
        }
    }, this.createEvent = (n) => {
      const { event: s = "ERROR", type: a = "", properties: { topic: h, trace: d } } = n, f = Ic(), g = this.core.projectId || "", _ = Date.now(), x = Dn({ eventId: f, timestamp: _, props: { event: s, type: a, properties: { topic: h, trace: d } }, bundleId: g, domain: this.getAppDomain() }, this.setMethods(f));
      return this.telemetryEnabled && (this.events.set(f, x), this.shouldPersist = !0), x;
    }, this.getEvent = (n) => {
      const { eventId: s, topic: a } = n;
      if (s)
        return this.events.get(s);
      const h = Array.from(this.events.values()).find((d) => d.props.properties.topic === a);
      if (h)
        return Dn(Dn({}, h), this.setMethods(h.eventId));
    }, this.deleteEvent = (n) => {
      const { eventId: s } = n;
      this.events.delete(s), this.shouldPersist = !0;
    }, this.setEventListeners = () => {
      this.core.heartbeat.on(bn.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((n) => {
          te.fromMiliseconds(Date.now()) - te.fromMiliseconds(n.timestamp) > O3 && (this.events.delete(n.eventId), this.shouldPersist = !0);
        });
      });
    }, this.setMethods = (n) => ({ addTrace: (s) => this.addTrace(n, s), setError: (s) => this.setError(n, s) }), this.addTrace = (n, s) => {
      const a = this.events.get(n);
      a && (a.props.properties.trace.push(s), this.events.set(n, a), this.shouldPersist = !0);
    }, this.setError = (n, s) => {
      const a = this.events.get(n);
      a && (a.props.type = s, a.timestamp = Date.now(), this.events.set(n, a), this.shouldPersist = !0);
    }, this.persist = async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = !1;
    }, this.restore = async () => {
      try {
        const n = await this.core.storage.getItem(this.storageKey) || [];
        if (!n.length)
          return;
        n.forEach((s) => {
          this.events.set(s.eventId, Dn(Dn({}, s), this.setMethods(s.eventId)));
        });
      } catch (n) {
        this.logger.warn(n);
      }
    }, this.submit = async () => {
      if (!this.telemetryEnabled || this.events.size === 0)
        return;
      const n = [];
      for (const [s, a] of this.events)
        a.props.type && n.push(a);
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
      return await fetch(`${P3}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Ea}${s}`, { method: "POST", body: JSON.stringify(n) });
    }, this.getAppDomain = () => ed().url, this.logger = Ft(i, this.context), this.telemetryEnabled = r, r ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
}
var Rv = Object.defineProperty, wf = Object.getOwnPropertySymbols, Tv = Object.prototype.hasOwnProperty, kv = Object.prototype.propertyIsEnumerable, _f = (e, t, i) => t in e ? Rv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, Ef = (e, t) => {
  for (var i in t || (t = {}))
    Tv.call(t, i) && _f(e, i, t[i]);
  if (wf)
    for (var i of wf(t))
      kv.call(t, i) && _f(e, i, t[i]);
  return e;
};
let Lv = class jd extends rp {
  constructor(t) {
    var i;
    super(t), this.protocol = Ed, this.version = Sd, this.name = _a, this.events = new ri.EventEmitter(), this.initialized = !1, this.on = (a, h) => this.events.on(a, h), this.once = (a, h) => this.events.once(a, h), this.off = (a, h) => this.events.off(a, h), this.removeListener = (a, h) => this.events.removeListener(a, h), this.dispatchEnvelope = ({ topic: a, message: h, sessionExists: d }) => {
      if (!a || !h)
        return;
      const f = { topic: a, message: h, publishedAt: Date.now(), transportType: st.link_mode };
      this.relayer.onLinkMessageEvent(f, { sessionExists: d });
    }, this.projectId = t?.projectId, this.relayUrl = t?.relayUrl || Md, this.customStoragePrefix = t != null && t.customStoragePrefix ? `:${t.customStoragePrefix}` : "";
    const r = xa({ level: typeof t?.logger == "string" && t.logger ? t.logger : Jy.logger, name: _a }), { logger: n, chunkLoggerController: s } = ip({ opts: r, maxSizeInBytes: t?.maxLogBlobSizeInBytes, loggerOverride: t?.logger });
    this.logChunkController = s, (i = this.logChunkController) != null && i.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var a, h;
      (a = this.logChunkController) != null && a.downloadLogsBlobInBrowser && ((h = this.logChunkController) == null || h.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = Ft(n, this.name), this.heartbeat = new Gl(), this.crypto = new ev(this, this.logger, t?.keychain), this.history = new Sv(this, this.logger), this.expirer = new Iv(this, this.logger), this.storage = t != null && t.storage ? t.storage : new O0(Ef(Ef({}, Zy), t?.storageOptions)), this.relayer = new yv({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Ev(this, this.logger), this.verify = new Mv(this, this.logger, this.storage), this.echoClient = new Av(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new Nv(this, this.logger, t?.telemetryEnabled);
  }
  static async init(t) {
    const i = new jd(t);
    await i.initialize();
    const r = await i.crypto.getClientId();
    return await i.storage.setItem(f3, r), i;
  }
  get context() {
    return Zt(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var t;
    return (t = this.logChunkController) == null ? void 0 : t.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(t) {
    this.linkModeSupportedApps.includes(t) || (this.linkModeSupportedApps.push(t), await this.storage.setItem(Xc, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.eventClient.init(), this.linkModeSupportedApps = await this.storage.getItem(Xc) || [], this.initialized = !0, this.logger.info("Core Initialization Success");
    } catch (t) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, t), this.logger.error(t.message), t;
    }
  }
};
const Cv = Lv, zd = "wc", Ud = 2, Dd = "client", eh = `${zd}@${Ud}:${Dd}:`, Xo = { name: Dd, logger: "error" }, Sf = "WALLETCONNECT_DEEPLINK_CHOICE", qv = "proposal", jv = "Proposal expired", zv = "session", nn = te.SEVEN_DAYS, Uv = "engine", wt = { wc_sessionPropose: { req: { ttl: te.FIVE_MINUTES, prompt: !0, tag: 1100 }, res: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1101 }, reject: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1120 }, autoReject: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1121 } }, wc_sessionSettle: { req: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1102 }, res: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 1104 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 1105 } }, wc_sessionExtend: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 1106 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 1107 } }, wc_sessionRequest: { req: { ttl: te.FIVE_MINUTES, prompt: !0, tag: 1108 }, res: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1109 } }, wc_sessionEvent: { req: { ttl: te.FIVE_MINUTES, prompt: !0, tag: 1110 }, res: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1111 } }, wc_sessionDelete: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 1112 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 1113 } }, wc_sessionPing: { req: { ttl: te.ONE_DAY, prompt: !1, tag: 1114 }, res: { ttl: te.ONE_DAY, prompt: !1, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: te.ONE_HOUR, prompt: !0, tag: 1116 }, res: { ttl: te.ONE_HOUR, prompt: !1, tag: 1117 }, reject: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1118 }, autoReject: { ttl: te.FIVE_MINUTES, prompt: !1, tag: 1119 } } }, Qo = { min: te.FIVE_MINUTES, max: te.SEVEN_DAYS }, Pi = { idle: "IDLE", active: "ACTIVE" }, Dv = "request", Fv = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"], Kv = "wc", Bv = "auth", $v = "authKeys", Vv = "pairingTopics", Hv = "requests", Oo = `${Kv}@${1.5}:${Bv}:`, Ls = `${Oo}:PUB_KEY`;
var Wv = Object.defineProperty, Gv = Object.defineProperties, Yv = Object.getOwnPropertyDescriptors, If = Object.getOwnPropertySymbols, Jv = Object.prototype.hasOwnProperty, Zv = Object.prototype.propertyIsEnumerable, Mf = (e, t, i) => t in e ? Wv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, dt = (e, t) => {
  for (var i in t || (t = {}))
    Jv.call(t, i) && Mf(e, i, t[i]);
  if (If)
    for (var i of If(t))
      Zv.call(t, i) && Mf(e, i, t[i]);
  return e;
}, Si = (e, t) => Gv(e, Yv(t));
class Xv extends gp {
  constructor(t) {
    super(t), this.name = Uv, this.events = new jf(), this.initialized = !1, this.requestQueue = { state: Pi.idle, queue: [] }, this.sessionRequestQueue = { state: Pi.idle, queue: [] }, this.requestQueueDelay = te.ONE_SECOND, this.expectedPairingMethodMap = /* @__PURE__ */ new Map(), this.recentlyDeletedMap = /* @__PURE__ */ new Map(), this.recentlyDeletedLimit = 200, this.relayMessageCache = [], this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(wt) }), this.initialized = !0, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, te.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const r = Si(dt({}, i), { requiredNamespaces: i.requiredNamespaces || {}, optionalNamespaces: i.optionalNamespaces || {} });
      await this.isValidConnect(r);
      const { pairingTopic: n, requiredNamespaces: s, optionalNamespaces: a, sessionProperties: h, relays: d } = r;
      let f = n, g, _ = !1;
      try {
        f && (_ = this.client.core.pairing.pairings.get(f).active);
      } catch (N) {
        throw this.client.logger.error(`connect() -> pairing.get(${f}) failed`), N;
      }
      if (!f || !_) {
        const { topic: N, uri: U } = await this.client.core.pairing.create();
        f = N, g = U;
      }
      if (!f) {
        const { message: N } = ne("NO_MATCHING_KEY", `connect() pairing topic: ${f}`);
        throw new Error(N);
      }
      const x = await this.client.core.crypto.generateKeyPair(), A = wt.wc_sessionPropose.req.ttl || te.FIVE_MINUTES, O = yt(A), j = dt({ requiredNamespaces: s, optionalNamespaces: a, relays: d ?? [{ protocol: Id }], proposer: { publicKey: x, metadata: this.client.metadata }, expiryTimestamp: O, pairingTopic: f }, h && { sessionProperties: h }), { reject: F, resolve: V, done: C } = Lr(A, jv);
      this.events.once(Ze("session_connect"), async ({ error: N, session: U }) => {
        if (N)
          F(N);
        else if (U) {
          U.self.publicKey = x;
          const D = Si(dt({}, U), { pairingTopic: j.pairingTopic, requiredNamespaces: j.requiredNamespaces, optionalNamespaces: j.optionalNamespaces, transportType: st.relay });
          await this.client.session.set(U.topic, D), await this.setExpiry(U.topic, U.expiry), f && await this.client.core.pairing.updateMetadata({ topic: f, metadata: U.peer.metadata }), this.cleanupDuplicatePairings(D), V(D);
        }
      });
      const K = await this.sendRequest({ topic: f, method: "wc_sessionPropose", params: j, throwOnFailedPublish: !0 });
      return await this.setProposal(K, dt({ id: K }, j)), { uri: g, approval: C };
    }, this.pair = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(i);
      } catch (r) {
        throw this.client.logger.error("pair() failed"), r;
      }
    }, this.approve = async (i) => {
      var r, n, s;
      const a = this.client.core.eventClient.createEvent({ properties: { topic: (r = i?.id) == null ? void 0 : r.toString(), trace: [Ei.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (T) {
        throw a.setError(Rr.no_internet_connection), T;
      }
      try {
        await this.isValidProposalId(i?.id);
      } catch (T) {
        throw this.client.logger.error(`approve() -> proposal.get(${i?.id}) failed`), a.setError(Rr.proposal_not_found), T;
      }
      try {
        await this.isValidApprove(i);
      } catch (T) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), a.setError(Rr.session_approve_namespace_validation_failure), T;
      }
      const { id: h, relayProtocol: d, namespaces: f, sessionProperties: g, sessionConfig: _ } = i, x = this.client.proposal.get(h);
      this.client.core.eventClient.deleteEvent({ eventId: a.eventId });
      const { pairingTopic: A, proposer: O, requiredNamespaces: j, optionalNamespaces: F } = x;
      let V = (n = this.client.core.eventClient) == null ? void 0 : n.getEvent({ topic: A });
      V || (V = (s = this.client.core.eventClient) == null ? void 0 : s.createEvent({ type: Ei.session_approve_started, properties: { topic: A, trace: [Ei.session_approve_started, Ei.session_namespaces_validation_success] } }));
      const C = await this.client.core.crypto.generateKeyPair(), K = O.publicKey, N = await this.client.core.crypto.generateSharedKey(C, K), U = dt(dt({ relay: { protocol: d ?? "irn" }, namespaces: f, controller: { publicKey: C, metadata: this.client.metadata }, expiry: yt(nn) }, g && { sessionProperties: g }), _ && { sessionConfig: _ }), D = st.relay;
      V.addTrace(Ei.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(N, { transportType: D });
      } catch (T) {
        throw V.setError(Rr.subscribe_session_topic_failure), T;
      }
      V.addTrace(Ei.subscribe_session_topic_success);
      const v = Si(dt({}, U), { topic: N, requiredNamespaces: j, optionalNamespaces: F, pairingTopic: A, acknowledged: !1, self: U.controller, peer: { publicKey: O.publicKey, metadata: O.metadata }, controller: C, transportType: st.relay });
      await this.client.session.set(N, v), V.addTrace(Ei.store_session);
      try {
        V.addTrace(Ei.publishing_session_settle), await this.sendRequest({ topic: N, method: "wc_sessionSettle", params: U, throwOnFailedPublish: !0 }).catch((T) => {
          throw V?.setError(Rr.session_settle_publish_failure), T;
        }), V.addTrace(Ei.session_settle_publish_success), V.addTrace(Ei.publishing_session_approve), await this.sendResult({ id: h, topic: A, result: { relay: { protocol: d ?? "irn" }, responderPublicKey: C }, throwOnFailedPublish: !0 }).catch((T) => {
          throw V?.setError(Rr.session_approve_publish_failure), T;
        }), V.addTrace(Ei.session_approve_publish_success);
      } catch (T) {
        throw this.client.logger.error(T), this.client.session.delete(N, nt("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(N), T;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: V.eventId }), await this.client.core.pairing.updateMetadata({ topic: A, metadata: O.metadata }), await this.client.proposal.delete(h, nt("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: A }), await this.setExpiry(N, yt(nn)), { topic: N, acknowledged: () => Promise.resolve(this.client.session.get(N)) };
    }, this.reject = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(i);
      } catch (a) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), a;
      }
      const { id: r, reason: n } = i;
      let s;
      try {
        s = this.client.proposal.get(r).pairingTopic;
      } catch (a) {
        throw this.client.logger.error(`reject() -> proposal.get(${r}) failed`), a;
      }
      s && (await this.sendError({ id: r, topic: s, error: n, rpcOpts: wt.wc_sessionPropose.reject }), await this.client.proposal.delete(r, nt("USER_DISCONNECTED")));
    }, this.update = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(i);
      } catch (_) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), _;
      }
      const { topic: r, namespaces: n } = i, { done: s, resolve: a, reject: h } = Lr(), d = sr(), f = zr().toString(), g = this.client.session.get(r).namespaces;
      return this.events.once(Ze("session_update", d), ({ error: _ }) => {
        _ ? h(_) : a();
      }), await this.client.session.update(r, { namespaces: n }), await this.sendRequest({ topic: r, method: "wc_sessionUpdate", params: { namespaces: n }, throwOnFailedPublish: !0, clientRpcId: d, relayRpcId: f }).catch((_) => {
        this.client.logger.error(_), this.client.session.update(r, { namespaces: g }), h(_);
      }), { acknowledged: s };
    }, this.extend = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(i);
      } catch (d) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), d;
      }
      const { topic: r } = i, n = sr(), { done: s, resolve: a, reject: h } = Lr();
      return this.events.once(Ze("session_extend", n), ({ error: d }) => {
        d ? h(d) : a();
      }), await this.setExpiry(r, yt(nn)), this.sendRequest({ topic: r, method: "wc_sessionExtend", params: {}, clientRpcId: n, throwOnFailedPublish: !0 }).catch((d) => {
        h(d);
      }), { acknowledged: s };
    }, this.request = async (i) => {
      this.isInitialized();
      try {
        await this.isValidRequest(i);
      } catch (O) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), O;
      }
      const { chainId: r, request: n, topic: s, expiry: a = wt.wc_sessionRequest.req.ttl } = i, h = this.client.session.get(s);
      h?.transportType === st.relay && await this.confirmOnlineStateOrThrow();
      const d = sr(), f = zr().toString(), { done: g, resolve: _, reject: x } = Lr(a, "Request expired. Please try again.");
      this.events.once(Ze("session_request", d), ({ error: O, result: j }) => {
        O ? x(O) : _(j);
      });
      const A = this.getAppLinkIfEnabled(h.peer.metadata, h.transportType);
      return A ? (await this.sendRequest({ clientRpcId: d, relayRpcId: f, topic: s, method: "wc_sessionRequest", params: { request: Si(dt({}, n), { expiryTimestamp: yt(a) }), chainId: r }, expiry: a, throwOnFailedPublish: !0, appLink: A }).catch((O) => x(O)), this.client.events.emit("session_request_sent", { topic: s, request: n, chainId: r, id: d }), await g()) : await Promise.all([new Promise(async (O) => {
        await this.sendRequest({ clientRpcId: d, relayRpcId: f, topic: s, method: "wc_sessionRequest", params: { request: Si(dt({}, n), { expiryTimestamp: yt(a) }), chainId: r }, expiry: a, throwOnFailedPublish: !0 }).catch((j) => x(j)), this.client.events.emit("session_request_sent", { topic: s, request: n, chainId: r, id: d }), O();
      }), new Promise(async (O) => {
        var j;
        if (!((j = h.sessionConfig) != null && j.disableDeepLink)) {
          const F = await J2(this.client.core.storage, Sf);
          await G2({ id: d, topic: s, wcDeepLink: F });
        }
        O();
      }), g()]).then((O) => O[2]);
    }, this.respond = async (i) => {
      this.isInitialized(), await this.isValidRespond(i);
      const { topic: r, response: n } = i, { id: s } = n, a = this.client.session.get(r);
      a.transportType === st.relay && await this.confirmOnlineStateOrThrow();
      const h = this.getAppLinkIfEnabled(a.peer.metadata, a.transportType);
      Ri(n) ? await this.sendResult({ id: s, topic: r, result: n.result, throwOnFailedPublish: !0, appLink: h }) : di(n) && await this.sendError({ id: s, topic: r, error: n.error, appLink: h }), this.cleanupAfterResponse(i);
    }, this.ping = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(i);
      } catch (n) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), n;
      }
      const { topic: r } = i;
      if (this.client.session.keys.includes(r)) {
        const n = sr(), s = zr().toString(), { done: a, resolve: h, reject: d } = Lr();
        this.events.once(Ze("session_ping", n), ({ error: f }) => {
          f ? d(f) : h();
        }), await Promise.all([this.sendRequest({ topic: r, method: "wc_sessionPing", params: {}, throwOnFailedPublish: !0, clientRpcId: n, relayRpcId: s }), a()]);
      } else
        this.client.core.pairing.pairings.keys.includes(r) && await this.client.core.pairing.ping({ topic: r });
    }, this.emit = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(i);
      const { topic: r, event: n, chainId: s } = i, a = zr().toString(), h = sr();
      await this.sendRequest({ topic: r, method: "wc_sessionEvent", params: { event: n, chainId: s }, throwOnFailedPublish: !0, relayRpcId: a, clientRpcId: h });
    }, this.disconnect = async (i) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(i);
      const { topic: r } = i;
      if (this.client.session.keys.includes(r))
        await this.sendRequest({ topic: r, method: "wc_sessionDelete", params: nt("USER_DISCONNECTED"), throwOnFailedPublish: !0 }), await this.deleteSession({ topic: r, emitEvent: !1 });
      else if (this.client.core.pairing.pairings.keys.includes(r))
        await this.client.core.pairing.disconnect({ topic: r });
      else {
        const { message: n } = ne("MISMATCHED_TOPIC", `Session or pairing topic not found: ${r}`);
        throw new Error(n);
      }
    }, this.find = (i) => (this.isInitialized(), this.client.session.getAll().filter((r) => Z6(r, i))), this.getPendingSessionRequests = () => this.client.pendingRequest.getAll(), this.authenticate = async (i, r) => {
      var n;
      this.isInitialized(), this.isValidAuthenticate(i);
      const s = r && this.client.core.linkModeSupportedApps.includes(r) && ((n = this.client.metadata.redirect) == null ? void 0 : n.linkMode), a = s ? st.link_mode : st.relay;
      a === st.relay && await this.confirmOnlineStateOrThrow();
      const { chains: h, statement: d = "", uri: f, domain: g, nonce: _, type: x, exp: A, nbf: O, methods: j = [], expiry: F } = i, V = [...i.resources || []], { topic: C, uri: K } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: a });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: C, uri: K } });
      const N = await this.client.core.crypto.generateKeyPair(), U = ks(N);
      if (await Promise.all([this.client.auth.authKeys.set(Ls, { responseTopic: U, publicKey: N }), this.client.auth.pairingTopics.set(U, { topic: U, pairingTopic: C })]), await this.client.core.relayer.subscribe(U, { transportType: a }), this.client.logger.info(`sending request to new pairing topic: ${C}`), j.length > 0) {
        const { namespace: w } = Rs(h[0]);
        let u = y6(w, "request", j);
        Ts(V) && (u = w6(u, V.pop())), V.push(u);
      }
      const D = F && F > wt.wc_sessionAuthenticate.req.ttl ? F : wt.wc_sessionAuthenticate.req.ttl, v = { authPayload: { type: x ?? "caip122", chains: h, statement: d, aud: f, domain: g, version: "1", nonce: _, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: A, nbf: O, resources: V }, requester: { publicKey: N, metadata: this.client.metadata }, expiryTimestamp: yt(D) }, T = { eip155: { chains: h, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...j])], events: ["chainChanged", "accountsChanged"] } }, Y = { requiredNamespaces: {}, optionalNamespaces: T, relays: [{ protocol: "irn" }], pairingTopic: C, proposer: { publicKey: N, metadata: this.client.metadata }, expiryTimestamp: yt(wt.wc_sessionPropose.req.ttl) }, { done: Q, resolve: p, reject: S } = Lr(D, "Request expired"), o = async ({ error: w, session: u }) => {
        if (this.events.off(Ze("session_request", l), c), w)
          S(w);
        else if (u) {
          u.self.publicKey = N, await this.client.session.set(u.topic, u), await this.setExpiry(u.topic, u.expiry), C && await this.client.core.pairing.updateMetadata({ topic: C, metadata: u.peer.metadata });
          const m = this.client.session.get(u.topic);
          await this.deleteProposal(E), p({ session: m });
        }
      }, c = async (w) => {
        var u, m, b;
        if (await this.deletePendingAuthRequest(l, { message: "fulfilled", code: 0 }), w.error) {
          const k = nt("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return w.error.code === k.code ? void 0 : (this.events.off(Ze("session_connect"), o), S(w.error.message));
        }
        await this.deleteProposal(E), this.events.off(Ze("session_connect"), o);
        const { cacaos: P, responder: B } = w.result, G = [], M = [];
        for (const k of P) {
          await xc({ cacao: k, projectId: this.client.core.projectId }) || (this.client.logger.error(k, "Signature verification failed"), S(nt("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: q } = k, y = Ts(q.resources), R = [va(q.iss)], W = Gs(q.iss);
          if (y) {
            const Z = Oc(y), J = Pc(y);
            G.push(...Z), R.push(...J);
          }
          for (const Z of R)
            M.push(`${Z}:${W}`);
        }
        const $ = await this.client.core.crypto.generateSharedKey(N, B.publicKey);
        let L;
        G.length > 0 && (L = { topic: $, acknowledged: !0, self: { publicKey: N, metadata: this.client.metadata }, peer: B, controller: B.publicKey, expiry: yt(nn), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: C, namespaces: zc([...new Set(G)], [...new Set(M)]), transportType: a }, await this.client.core.relayer.subscribe($, { transportType: a }), await this.client.session.set($, L), C && await this.client.core.pairing.updateMetadata({ topic: C, metadata: B.metadata }), L = this.client.session.get($)), (u = this.client.metadata.redirect) != null && u.linkMode && (m = B.metadata.redirect) != null && m.linkMode && (b = B.metadata.redirect) != null && b.universal && r && (this.client.core.addLinkModeSupportedApp(B.metadata.redirect.universal), this.client.session.update($, { transportType: st.link_mode })), p({ auths: P, session: L });
      }, l = sr(), E = sr();
      this.events.once(Ze("session_connect"), o), this.events.once(Ze("session_request", l), c);
      let I;
      try {
        if (s) {
          const w = Ur("wc_sessionAuthenticate", v, l);
          this.client.core.history.set(C, w);
          const u = await this.client.core.crypto.encode("", w, { type: us, encoding: Cn });
          I = Es(r, C, u);
        } else
          await Promise.all([this.sendRequest({ topic: C, method: "wc_sessionAuthenticate", params: v, expiry: i.expiry, throwOnFailedPublish: !0, clientRpcId: l }), this.sendRequest({ topic: C, method: "wc_sessionPropose", params: Y, expiry: wt.wc_sessionPropose.req.ttl, throwOnFailedPublish: !0, clientRpcId: E })]);
      } catch (w) {
        throw this.events.off(Ze("session_connect"), o), this.events.off(Ze("session_request", l), c), w;
      }
      return await this.setProposal(E, dt({ id: E }, Y)), await this.setAuthRequest(l, { request: Si(dt({}, v), { verifyContext: {} }), pairingTopic: C, transportType: a }), { uri: I ?? K, response: Q };
    }, this.approveSessionAuthenticate = async (i) => {
      const { id: r, auths: n } = i, s = this.client.core.eventClient.createEvent({ properties: { topic: r.toString(), trace: [Tr.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (F) {
        throw s.setError(zn.no_internet_connection), F;
      }
      const a = this.getPendingAuthRequest(r);
      if (!a)
        throw s.setError(zn.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${r}`);
      const h = a.transportType || st.relay;
      h === st.relay && await this.confirmOnlineStateOrThrow();
      const d = a.requester.publicKey, f = await this.client.core.crypto.generateKeyPair(), g = ks(d), _ = { type: hr, receiverPublicKey: d, senderPublicKey: f }, x = [], A = [];
      for (const F of n) {
        if (!await xc({ cacao: F, projectId: this.client.core.projectId })) {
          s.setError(zn.invalid_cacao);
          const U = nt("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: r, topic: g, error: U, encodeOpts: _ }), new Error(U.message);
        }
        s.addTrace(Tr.cacaos_verified);
        const { p: V } = F, C = Ts(V.resources), K = [va(V.iss)], N = Gs(V.iss);
        if (C) {
          const U = Oc(C), D = Pc(C);
          x.push(...U), K.push(...D);
        }
        for (const U of K)
          A.push(`${U}:${N}`);
      }
      const O = await this.client.core.crypto.generateSharedKey(f, d);
      s.addTrace(Tr.create_authenticated_session_topic);
      let j;
      if (x?.length > 0) {
        j = { topic: O, acknowledged: !0, self: { publicKey: f, metadata: this.client.metadata }, peer: { publicKey: d, metadata: a.requester.metadata }, controller: d, expiry: yt(nn), authentication: n, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: a.pairingTopic, namespaces: zc([...new Set(x)], [...new Set(A)]), transportType: h }, s.addTrace(Tr.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(O, { transportType: h });
        } catch (F) {
          throw s.setError(zn.subscribe_authenticated_session_topic_failure), F;
        }
        s.addTrace(Tr.subscribe_authenticated_session_topic_success), await this.client.session.set(O, j), s.addTrace(Tr.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: a.pairingTopic, metadata: a.requester.metadata });
      }
      s.addTrace(Tr.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: g, id: r, result: { cacaos: n, responder: { publicKey: f, metadata: this.client.metadata } }, encodeOpts: _, throwOnFailedPublish: !0, appLink: this.getAppLinkIfEnabled(a.requester.metadata, h) });
      } catch (F) {
        throw s.setError(zn.authenticated_session_approve_publish_failure), F;
      }
      return await this.client.auth.requests.delete(r, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: a.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: s.eventId }), { session: j };
    }, this.rejectSessionAuthenticate = async (i) => {
      this.isInitialized();
      const { id: r, reason: n } = i, s = this.getPendingAuthRequest(r);
      if (!s)
        throw new Error(`Could not find pending auth request with id ${r}`);
      s.transportType === st.relay && await this.confirmOnlineStateOrThrow();
      const a = s.requester.publicKey, h = await this.client.core.crypto.generateKeyPair(), d = ks(a), f = { type: hr, receiverPublicKey: a, senderPublicKey: h };
      await this.sendError({ id: r, topic: d, error: n, encodeOpts: f, rpcOpts: wt.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(s.requester.metadata, s.transportType) }), await this.client.auth.requests.delete(r, { message: "rejected", code: 0 }), await this.client.proposal.delete(r, nt("USER_DISCONNECTED"));
    }, this.formatAuthMessage = (i) => {
      this.isInitialized();
      const { request: r, iss: n } = i;
      return ad(r, n);
    }, this.processRelayMessageCache = () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0)
          for (; this.relayMessageCache.length > 0; )
            try {
              const i = this.relayMessageCache.shift();
              i && await this.onRelayMessage(i);
            } catch (i) {
              this.client.logger.error(i);
            }
      }, 50);
    }, this.cleanupDuplicatePairings = async (i) => {
      if (i.pairingTopic)
        try {
          const r = this.client.core.pairing.pairings.get(i.pairingTopic), n = this.client.core.pairing.pairings.getAll().filter((s) => {
            var a, h;
            return ((a = s.peerMetadata) == null ? void 0 : a.url) && ((h = s.peerMetadata) == null ? void 0 : h.url) === i.peer.metadata.url && s.topic && s.topic !== r.topic;
          });
          if (n.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${n.length} duplicate pairing(s)`), await Promise.all(n.map((s) => this.client.core.pairing.disconnect({ topic: s.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (r) {
          this.client.logger.error(r);
        }
    }, this.deleteSession = async (i) => {
      var r;
      const { topic: n, expirerHasDeleted: s = !1, emitEvent: a = !0, id: h = 0 } = i, { self: d } = this.client.session.get(n);
      await this.client.core.relayer.unsubscribe(n), await this.client.session.delete(n, nt("USER_DISCONNECTED")), this.addToRecentlyDeleted(n, "session"), this.client.core.crypto.keychain.has(d.publicKey) && await this.client.core.crypto.deleteKeyPair(d.publicKey), this.client.core.crypto.keychain.has(n) && await this.client.core.crypto.deleteSymKey(n), s || this.client.core.expirer.del(n), this.client.core.storage.removeItem(Sf).catch((f) => this.client.logger.warn(f)), this.getPendingSessionRequests().forEach((f) => {
        f.topic === n && this.deletePendingSessionRequest(f.id, nt("USER_DISCONNECTED"));
      }), n === ((r = this.sessionRequestQueue.queue[0]) == null ? void 0 : r.topic) && (this.sessionRequestQueue.state = Pi.idle), a && this.client.events.emit("session_delete", { id: h, topic: n });
    }, this.deleteProposal = async (i, r) => {
      if (r)
        try {
          const n = this.client.proposal.get(i);
          this.client.core.eventClient.getEvent({ topic: n.pairingTopic })?.setError(Rr.proposal_expired);
        } catch {
        }
      await Promise.all([this.client.proposal.delete(i, nt("USER_DISCONNECTED")), r ? Promise.resolve() : this.client.core.expirer.del(i)]), this.addToRecentlyDeleted(i, "proposal");
    }, this.deletePendingSessionRequest = async (i, r, n = !1) => {
      await Promise.all([this.client.pendingRequest.delete(i, r), n ? Promise.resolve() : this.client.core.expirer.del(i)]), this.addToRecentlyDeleted(i, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((s) => s.id !== i), n && (this.sessionRequestQueue.state = Pi.idle, this.client.events.emit("session_request_expire", { id: i }));
    }, this.deletePendingAuthRequest = async (i, r, n = !1) => {
      await Promise.all([this.client.auth.requests.delete(i, r), n ? Promise.resolve() : this.client.core.expirer.del(i)]);
    }, this.setExpiry = async (i, r) => {
      this.client.session.keys.includes(i) && (this.client.core.expirer.set(i, r), await this.client.session.update(i, { expiry: r }));
    }, this.setProposal = async (i, r) => {
      this.client.core.expirer.set(i, yt(wt.wc_sessionPropose.req.ttl)), await this.client.proposal.set(i, r);
    }, this.setAuthRequest = async (i, r) => {
      const { request: n, pairingTopic: s, transportType: a = st.relay } = r;
      this.client.core.expirer.set(i, n.expiryTimestamp), await this.client.auth.requests.set(i, { authPayload: n.authPayload, requester: n.requester, expiryTimestamp: n.expiryTimestamp, id: i, pairingTopic: s, verifyContext: n.verifyContext, transportType: a });
    }, this.setPendingSessionRequest = async (i) => {
      const { id: r, topic: n, params: s, verifyContext: a } = i, h = s.request.expiryTimestamp || yt(wt.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(r, h), await this.client.pendingRequest.set(r, { id: r, topic: n, params: s, verifyContext: a });
    }, this.sendRequest = async (i) => {
      const { topic: r, method: n, params: s, expiry: a, relayRpcId: h, clientRpcId: d, throwOnFailedPublish: f, appLink: g } = i, _ = Ur(n, s, d);
      let x;
      const A = !!g;
      try {
        const F = A ? Cn : vr;
        x = await this.client.core.crypto.encode(r, _, { encoding: F });
      } catch (F) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${r} failed`), F;
      }
      let O;
      if (Fv.includes(n)) {
        const F = or(JSON.stringify(_)), V = or(x);
        O = await this.client.core.verify.register({ id: V, decryptedId: F });
      }
      const j = wt[n].req;
      if (j.attestation = O, a && (j.ttl = a), h && (j.id = h), this.client.core.history.set(r, _), A) {
        const F = Es(g, r, x);
        await globalThis.Linking.openURL(F, this.client.name);
      } else {
        const F = wt[n].req;
        a && (F.ttl = a), h && (F.id = h), f ? (F.internal = Si(dt({}, F.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(r, x, F)) : this.client.core.relayer.publish(r, x, F).catch((V) => this.client.logger.error(V));
      }
      return _.id;
    }, this.sendResult = async (i) => {
      const { id: r, topic: n, result: s, throwOnFailedPublish: a, encodeOpts: h, appLink: d } = i, f = Io(r, s);
      let g;
      const _ = d && typeof globalThis?.Linking < "u";
      try {
        const A = _ ? Cn : vr;
        g = await this.client.core.crypto.encode(n, f, Si(dt({}, h || {}), { encoding: A }));
      } catch (A) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${n} failed`), A;
      }
      let x;
      try {
        x = await this.client.core.history.get(n, r);
      } catch (A) {
        throw this.client.logger.error(`sendResult() -> history.get(${n}, ${r}) failed`), A;
      }
      if (_) {
        const A = Es(d, n, g);
        await globalThis.Linking.openURL(A, this.client.name);
      } else {
        const A = wt[x.request.method].res;
        a ? (A.internal = Si(dt({}, A.internal), { throwOnFailedPublish: !0 }), await this.client.core.relayer.publish(n, g, A)) : this.client.core.relayer.publish(n, g, A).catch((O) => this.client.logger.error(O));
      }
      await this.client.core.history.resolve(f);
    }, this.sendError = async (i) => {
      const { id: r, topic: n, error: s, encodeOpts: a, rpcOpts: h, appLink: d } = i, f = Mo(r, s);
      let g;
      const _ = d && typeof globalThis?.Linking < "u";
      try {
        const A = _ ? Cn : vr;
        g = await this.client.core.crypto.encode(n, f, Si(dt({}, a || {}), { encoding: A }));
      } catch (A) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${n} failed`), A;
      }
      let x;
      try {
        x = await this.client.core.history.get(n, r);
      } catch (A) {
        throw this.client.logger.error(`sendError() -> history.get(${n}, ${r}) failed`), A;
      }
      if (_) {
        const A = Es(d, n, g);
        await globalThis.Linking.openURL(A, this.client.name);
      } else {
        const A = h || wt[x.request.method].res;
        this.client.core.relayer.publish(n, g, A);
      }
      await this.client.core.history.resolve(f);
    }, this.cleanup = async () => {
      const i = [], r = [];
      this.client.session.getAll().forEach((n) => {
        let s = !1;
        br(n.expiry) && (s = !0), this.client.core.crypto.keychain.has(n.topic) || (s = !0), s && i.push(n.topic);
      }), this.client.proposal.getAll().forEach((n) => {
        br(n.expiryTimestamp) && r.push(n.id);
      }), await Promise.all([...i.map((n) => this.deleteSession({ topic: n })), ...r.map((n) => this.deleteProposal(n))]);
    }, this.onRelayEventRequest = async (i) => {
      this.requestQueue.queue.push(i), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === Pi.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = Pi.active;
        const i = this.requestQueue.queue.shift();
        if (i)
          try {
            await this.processRequest(i);
          } catch (r) {
            this.client.logger.warn(r);
          }
      }
      this.requestQueue.state = Pi.idle;
    }, this.processRequest = async (i) => {
      const { topic: r, payload: n, attestation: s, transportType: a, encryptedId: h } = i, d = n.method;
      if (!this.shouldIgnorePairingRequest({ topic: r, requestMethod: d }))
        switch (d) {
          case "wc_sessionPropose":
            return await this.onSessionProposeRequest({ topic: r, payload: n, attestation: s, encryptedId: h });
          case "wc_sessionSettle":
            return await this.onSessionSettleRequest(r, n);
          case "wc_sessionUpdate":
            return await this.onSessionUpdateRequest(r, n);
          case "wc_sessionExtend":
            return await this.onSessionExtendRequest(r, n);
          case "wc_sessionPing":
            return await this.onSessionPingRequest(r, n);
          case "wc_sessionDelete":
            return await this.onSessionDeleteRequest(r, n);
          case "wc_sessionRequest":
            return await this.onSessionRequest({ topic: r, payload: n, attestation: s, encryptedId: h, transportType: a });
          case "wc_sessionEvent":
            return await this.onSessionEventRequest(r, n);
          case "wc_sessionAuthenticate":
            return await this.onSessionAuthenticateRequest({ topic: r, payload: n, attestation: s, encryptedId: h, transportType: a });
          default:
            return this.client.logger.info(`Unsupported request method ${d}`);
        }
    }, this.onRelayEventResponse = async (i) => {
      const { topic: r, payload: n, transportType: s } = i, a = (await this.client.core.history.get(r, n.id)).request.method;
      switch (a) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(r, n, s);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(r, n);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(r, n);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(r, n);
        case "wc_sessionPing":
          return this.onSessionPingResponse(r, n);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(r, n);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(r, n);
        default:
          return this.client.logger.info(`Unsupported response method ${a}`);
      }
    }, this.onRelayEventUnknownPayload = (i) => {
      const { topic: r } = i, { message: n } = ne("MISSING_OR_INVALID", `Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(n);
    }, this.shouldIgnorePairingRequest = (i) => {
      const { topic: r, requestMethod: n } = i, s = this.expectedPairingMethodMap.get(r);
      return !s || s.includes(n) ? !1 : !!(s.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }, this.onSessionProposeRequest = async (i) => {
      const { topic: r, payload: n, attestation: s, encryptedId: a } = i, { params: h, id: d } = n;
      try {
        const f = this.client.core.eventClient.getEvent({ topic: r });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), f?.setError(nr.proposal_listener_not_found)), this.isValidConnect(dt({}, n.params));
        const g = h.expiryTimestamp || yt(wt.wc_sessionPropose.req.ttl), _ = dt({ id: d, pairingTopic: r, expiryTimestamp: g }, h);
        await this.setProposal(d, _);
        const x = await this.getVerifyContext({ attestationId: s, hash: or(JSON.stringify(n)), encryptedId: a, metadata: _.proposer.metadata });
        f?.addTrace(Ni.emit_session_proposal), this.client.events.emit("session_proposal", { id: d, params: _, verifyContext: x });
      } catch (f) {
        await this.sendError({ id: d, topic: r, error: f, rpcOpts: wt.wc_sessionPropose.autoReject }), this.client.logger.error(f);
      }
    }, this.onSessionProposeResponse = async (i, r, n) => {
      const { id: s } = r;
      if (Ri(r)) {
        const { result: a } = r;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: a });
        const h = this.client.proposal.get(s);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: h });
        const d = h.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: d });
        const f = a.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: f });
        const g = await this.client.core.crypto.generateSharedKey(d, f);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: g });
        const _ = await this.client.core.relayer.subscribe(g, { transportType: n });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: _ }), await this.client.core.pairing.activate({ topic: i });
      } else if (di(r)) {
        await this.client.proposal.delete(s, nt("USER_DISCONNECTED"));
        const a = Ze("session_connect");
        if (this.events.listenerCount(a) === 0)
          throw new Error(`emitting ${a} without any listeners, 954`);
        this.events.emit(Ze("session_connect"), { error: r.error });
      }
    }, this.onSessionSettleRequest = async (i, r) => {
      const { id: n, params: s } = r;
      try {
        this.isValidSessionSettleRequest(s);
        const { relay: a, controller: h, expiry: d, namespaces: f, sessionProperties: g, sessionConfig: _ } = r.params, x = Si(dt(dt({ topic: i, relay: a, expiry: d, namespaces: f, acknowledged: !0, pairingTopic: "", requiredNamespaces: {}, optionalNamespaces: {}, controller: h.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: h.publicKey, metadata: h.metadata } }, g && { sessionProperties: g }), _ && { sessionConfig: _ }), { transportType: st.relay }), A = Ze("session_connect");
        if (this.events.listenerCount(A) === 0)
          throw new Error(`emitting ${A} without any listeners 997`);
        this.events.emit(Ze("session_connect"), { session: x }), await this.sendResult({ id: r.id, topic: i, result: !0, throwOnFailedPublish: !0 });
      } catch (a) {
        await this.sendError({ id: n, topic: i, error: a }), this.client.logger.error(a);
      }
    }, this.onSessionSettleResponse = async (i, r) => {
      const { id: n } = r;
      Ri(r) ? (await this.client.session.update(i, { acknowledged: !0 }), this.events.emit(Ze("session_approve", n), {})) : di(r) && (await this.client.session.delete(i, nt("USER_DISCONNECTED")), this.events.emit(Ze("session_approve", n), { error: r.error }));
    }, this.onSessionUpdateRequest = async (i, r) => {
      const { params: n, id: s } = r;
      try {
        const a = `${i}_session_update`, h = qn.get(a);
        if (h && this.isRequestOutOfSync(h, s)) {
          this.client.logger.warn(`Discarding out of sync request - ${s}`), this.sendError({ id: s, topic: i, error: nt("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(dt({ topic: i }, n));
        try {
          qn.set(a, s), await this.client.session.update(i, { namespaces: n.namespaces }), await this.sendResult({ id: s, topic: i, result: !0, throwOnFailedPublish: !0 });
        } catch (d) {
          throw qn.delete(a), d;
        }
        this.client.events.emit("session_update", { id: s, topic: i, params: n });
      } catch (a) {
        await this.sendError({ id: s, topic: i, error: a }), this.client.logger.error(a);
      }
    }, this.isRequestOutOfSync = (i, r) => r.toString().slice(0, -3) < i.toString().slice(0, -3), this.onSessionUpdateResponse = (i, r) => {
      const { id: n } = r, s = Ze("session_update", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Ri(r) ? this.events.emit(Ze("session_update", n), {}) : di(r) && this.events.emit(Ze("session_update", n), { error: r.error });
    }, this.onSessionExtendRequest = async (i, r) => {
      const { id: n } = r;
      try {
        this.isValidExtend({ topic: i }), await this.setExpiry(i, yt(nn)), await this.sendResult({ id: n, topic: i, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_extend", { id: n, topic: i });
      } catch (s) {
        await this.sendError({ id: n, topic: i, error: s }), this.client.logger.error(s);
      }
    }, this.onSessionExtendResponse = (i, r) => {
      const { id: n } = r, s = Ze("session_extend", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Ri(r) ? this.events.emit(Ze("session_extend", n), {}) : di(r) && this.events.emit(Ze("session_extend", n), { error: r.error });
    }, this.onSessionPingRequest = async (i, r) => {
      const { id: n } = r;
      try {
        this.isValidPing({ topic: i }), await this.sendResult({ id: n, topic: i, result: !0, throwOnFailedPublish: !0 }), this.client.events.emit("session_ping", { id: n, topic: i });
      } catch (s) {
        await this.sendError({ id: n, topic: i, error: s }), this.client.logger.error(s);
      }
    }, this.onSessionPingResponse = (i, r) => {
      const { id: n } = r, s = Ze("session_ping", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      setTimeout(() => {
        Ri(r) ? this.events.emit(Ze("session_ping", n), {}) : di(r) && this.events.emit(Ze("session_ping", n), { error: r.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (i, r) => {
      const { id: n } = r;
      try {
        this.isValidDisconnect({ topic: i, reason: r.params }), Promise.all([new Promise((s) => {
          this.client.core.relayer.once(Et.publish, async () => {
            s(await this.deleteSession({ topic: i, id: n }));
          });
        }), this.sendResult({ id: n, topic: i, result: !0, throwOnFailedPublish: !0 }), this.cleanupPendingSentRequestsForTopic({ topic: i, error: nt("USER_DISCONNECTED") })]).catch((s) => this.client.logger.error(s));
      } catch (s) {
        this.client.logger.error(s);
      }
    }, this.onSessionRequest = async (i) => {
      var r, n, s;
      const { topic: a, payload: h, attestation: d, encryptedId: f, transportType: g } = i, { id: _, params: x } = h;
      try {
        await this.isValidRequest(dt({ topic: a }, x));
        const A = this.client.session.get(a), O = await this.getVerifyContext({ attestationId: d, hash: or(JSON.stringify(Ur("wc_sessionRequest", x, _))), encryptedId: f, metadata: A.peer.metadata, transportType: g }), j = { id: _, topic: a, params: x, verifyContext: O };
        await this.setPendingSessionRequest(j), g === st.link_mode && (r = A.peer.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp((n = A.peer.metadata.redirect) == null ? void 0 : n.universal), (s = this.client.signConfig) != null && s.disableRequestQueue ? this.emitSessionRequest(j) : (this.addSessionRequestToSessionRequestQueue(j), this.processSessionRequestQueue());
      } catch (A) {
        await this.sendError({ id: _, topic: a, error: A }), this.client.logger.error(A);
      }
    }, this.onSessionRequestResponse = (i, r) => {
      const { id: n } = r, s = Ze("session_request", n);
      if (this.events.listenerCount(s) === 0)
        throw new Error(`emitting ${s} without any listeners`);
      Ri(r) ? this.events.emit(Ze("session_request", n), { result: r.result }) : di(r) && this.events.emit(Ze("session_request", n), { error: r.error });
    }, this.onSessionEventRequest = async (i, r) => {
      const { id: n, params: s } = r;
      try {
        const a = `${i}_session_event_${s.event.name}`, h = qn.get(a);
        if (h && this.isRequestOutOfSync(h, n)) {
          this.client.logger.info(`Discarding out of sync request - ${n}`);
          return;
        }
        this.isValidEmit(dt({ topic: i }, s)), this.client.events.emit("session_event", { id: n, topic: i, params: s }), qn.set(a, n);
      } catch (a) {
        await this.sendError({ id: n, topic: i, error: a }), this.client.logger.error(a);
      }
    }, this.onSessionAuthenticateResponse = (i, r) => {
      const { id: n } = r;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: i, payload: r }), Ri(r) ? this.events.emit(Ze("session_request", n), { result: r.result }) : di(r) && this.events.emit(Ze("session_request", n), { error: r.error });
    }, this.onSessionAuthenticateRequest = async (i) => {
      var r;
      const { topic: n, payload: s, attestation: a, encryptedId: h, transportType: d } = i;
      try {
        const { requester: f, authPayload: g, expiryTimestamp: _ } = s.params, x = await this.getVerifyContext({ attestationId: a, hash: or(JSON.stringify(s)), encryptedId: h, metadata: f.metadata, transportType: d }), A = { requester: f, pairingTopic: n, id: s.id, authPayload: g, verifyContext: x, expiryTimestamp: _ };
        await this.setAuthRequest(s.id, { request: A, pairingTopic: n, transportType: d }), d === st.link_mode && (r = f.metadata.redirect) != null && r.universal && this.client.core.addLinkModeSupportedApp(f.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: n, params: s.params, id: s.id, verifyContext: x });
      } catch (f) {
        this.client.logger.error(f);
        const g = s.params.requester.publicKey, _ = await this.client.core.crypto.generateKeyPair(), x = this.getAppLinkIfEnabled(s.params.requester.metadata, d), A = { type: hr, receiverPublicKey: g, senderPublicKey: _ };
        await this.sendError({ id: s.id, topic: n, error: f, encodeOpts: A, rpcOpts: wt.wc_sessionAuthenticate.autoReject, appLink: x });
      }
    }, this.addSessionRequestToSessionRequestQueue = (i) => {
      this.sessionRequestQueue.queue.push(i);
    }, this.cleanupAfterResponse = (i) => {
      this.deletePendingSessionRequest(i.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = Pi.idle, this.processSessionRequestQueue();
      }, te.toMiliseconds(this.requestQueueDelay));
    }, this.cleanupPendingSentRequestsForTopic = ({ topic: i, error: r }) => {
      const n = this.client.core.history.pending;
      n.length > 0 && n.filter((s) => s.topic === i && s.request.method === "wc_sessionRequest").forEach((s) => {
        const a = s.request.id, h = Ze("session_request", a);
        if (this.events.listenerCount(h) === 0)
          throw new Error(`emitting ${h} without any listeners`);
        this.events.emit(Ze("session_request", s.request.id), { error: r });
      });
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === Pi.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const i = this.sessionRequestQueue.queue[0];
      if (!i) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = Pi.active, this.emitSessionRequest(i);
      } catch (r) {
        this.client.logger.error(r);
      }
    }, this.emitSessionRequest = (i) => {
      this.client.events.emit("session_request", i);
    }, this.onPairingCreated = (i) => {
      if (i.methods && this.expectedPairingMethodMap.set(i.topic, i.methods), i.active)
        return;
      const r = this.client.proposal.getAll().find((n) => n.pairingTopic === i.topic);
      r && this.onSessionProposeRequest({ topic: i.topic, payload: Ur("wc_sessionPropose", { requiredNamespaces: r.requiredNamespaces, optionalNamespaces: r.optionalNamespaces, relays: r.relays, proposer: r.proposer, sessionProperties: r.sessionProperties }, r.id) });
    }, this.isValidConnect = async (i) => {
      if (!Gt(i)) {
        const { message: d } = ne("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(i)}`);
        throw new Error(d);
      }
      const { pairingTopic: r, requiredNamespaces: n, optionalNamespaces: s, sessionProperties: a, relays: h } = i;
      if (Ut(r) || await this.isValidPairingTopic(r), !cy(h)) {
        const { message: d } = ne("MISSING_OR_INVALID", `connect() relays: ${h}`);
        throw new Error(d);
      }
      !Ut(n) && Js(n) !== 0 && this.validateNamespaces(n, "requiredNamespaces"), !Ut(s) && Js(s) !== 0 && this.validateNamespaces(s, "optionalNamespaces"), Ut(a) || this.validateSessionProps(a, "sessionProperties");
    }, this.validateNamespaces = (i, r) => {
      const n = hy(i, "connect()", r);
      if (n)
        throw new Error(n.message);
    }, this.isValidApprove = async (i) => {
      if (!Gt(i))
        throw new Error(ne("MISSING_OR_INVALID", `approve() params: ${i}`).message);
      const { id: r, namespaces: n, relayProtocol: s, sessionProperties: a } = i;
      this.checkRecentlyDeleted(r), await this.isValidProposalId(r);
      const h = this.client.proposal.get(r), d = Go(n, "approve()");
      if (d)
        throw new Error(d.message);
      const f = Fc(h.requiredNamespaces, n, "approve()");
      if (f)
        throw new Error(f.message);
      if (!gt(s, !0)) {
        const { message: g } = ne("MISSING_OR_INVALID", `approve() relayProtocol: ${s}`);
        throw new Error(g);
      }
      Ut(a) || this.validateSessionProps(a, "sessionProperties");
    }, this.isValidReject = async (i) => {
      if (!Gt(i)) {
        const { message: s } = ne("MISSING_OR_INVALID", `reject() params: ${i}`);
        throw new Error(s);
      }
      const { id: r, reason: n } = i;
      if (this.checkRecentlyDeleted(r), await this.isValidProposalId(r), !uy(n)) {
        const { message: s } = ne("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(n)}`);
        throw new Error(s);
      }
    }, this.isValidSessionSettleRequest = (i) => {
      if (!Gt(i)) {
        const { message: f } = ne("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${i}`);
        throw new Error(f);
      }
      const { relay: r, controller: n, namespaces: s, expiry: a } = i;
      if (!gd(r)) {
        const { message: f } = ne("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(f);
      }
      const h = iy(n, "onSessionSettleRequest()");
      if (h)
        throw new Error(h.message);
      const d = Go(s, "onSessionSettleRequest()");
      if (d)
        throw new Error(d.message);
      if (br(a)) {
        const { message: f } = ne("EXPIRED", "onSessionSettleRequest()");
        throw new Error(f);
      }
    }, this.isValidUpdate = async (i) => {
      if (!Gt(i)) {
        const { message: d } = ne("MISSING_OR_INVALID", `update() params: ${i}`);
        throw new Error(d);
      }
      const { topic: r, namespaces: n } = i;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const s = this.client.session.get(r), a = Go(n, "update()");
      if (a)
        throw new Error(a.message);
      const h = Fc(s.requiredNamespaces, n, "update()");
      if (h)
        throw new Error(h.message);
    }, this.isValidExtend = async (i) => {
      if (!Gt(i)) {
        const { message: n } = ne("MISSING_OR_INVALID", `extend() params: ${i}`);
        throw new Error(n);
      }
      const { topic: r } = i;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
    }, this.isValidRequest = async (i) => {
      if (!Gt(i)) {
        const { message: d } = ne("MISSING_OR_INVALID", `request() params: ${i}`);
        throw new Error(d);
      }
      const { topic: r, request: n, chainId: s, expiry: a } = i;
      this.checkRecentlyDeleted(r), await this.isValidSessionTopic(r);
      const { namespaces: h } = this.client.session.get(r);
      if (!Dc(h, s)) {
        const { message: d } = ne("MISSING_OR_INVALID", `request() chainId: ${s}`);
        throw new Error(d);
      }
      if (!dy(n)) {
        const { message: d } = ne("MISSING_OR_INVALID", `request() ${JSON.stringify(n)}`);
        throw new Error(d);
      }
      if (!gy(h, s, n.method)) {
        const { message: d } = ne("MISSING_OR_INVALID", `request() method: ${n.method}`);
        throw new Error(d);
      }
      if (a && !vy(a, Qo)) {
        const { message: d } = ne("MISSING_OR_INVALID", `request() expiry: ${a}. Expiry must be a number (in seconds) between ${Qo.min} and ${Qo.max}`);
        throw new Error(d);
      }
    }, this.isValidRespond = async (i) => {
      var r;
      if (!Gt(i)) {
        const { message: a } = ne("MISSING_OR_INVALID", `respond() params: ${i}`);
        throw new Error(a);
      }
      const { topic: n, response: s } = i;
      try {
        await this.isValidSessionTopic(n);
      } catch (a) {
        throw (r = i?.response) != null && r.id && this.cleanupAfterResponse(i), a;
      }
      if (!ly(s)) {
        const { message: a } = ne("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(s)}`);
        throw new Error(a);
      }
    }, this.isValidPing = async (i) => {
      if (!Gt(i)) {
        const { message: n } = ne("MISSING_OR_INVALID", `ping() params: ${i}`);
        throw new Error(n);
      }
      const { topic: r } = i;
      await this.isValidSessionOrPairingTopic(r);
    }, this.isValidEmit = async (i) => {
      if (!Gt(i)) {
        const { message: h } = ne("MISSING_OR_INVALID", `emit() params: ${i}`);
        throw new Error(h);
      }
      const { topic: r, event: n, chainId: s } = i;
      await this.isValidSessionTopic(r);
      const { namespaces: a } = this.client.session.get(r);
      if (!Dc(a, s)) {
        const { message: h } = ne("MISSING_OR_INVALID", `emit() chainId: ${s}`);
        throw new Error(h);
      }
      if (!py(n)) {
        const { message: h } = ne("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(h);
      }
      if (!by(a, s, n.name)) {
        const { message: h } = ne("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(n)}`);
        throw new Error(h);
      }
    }, this.isValidDisconnect = async (i) => {
      if (!Gt(i)) {
        const { message: n } = ne("MISSING_OR_INVALID", `disconnect() params: ${i}`);
        throw new Error(n);
      }
      const { topic: r } = i;
      await this.isValidSessionOrPairingTopic(r);
    }, this.isValidAuthenticate = (i) => {
      const { chains: r, uri: n, domain: s, nonce: a } = i;
      if (!Array.isArray(r) || r.length === 0)
        throw new Error("chains is required and must be a non-empty array");
      if (!gt(n, !1))
        throw new Error("uri is required parameter");
      if (!gt(s, !1))
        throw new Error("domain is required parameter");
      if (!gt(a, !1))
        throw new Error("nonce is required parameter");
      if ([...new Set(r.map((d) => Rs(d).namespace))].length > 1)
        throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: h } = Rs(r[0]);
      if (h !== "eip155")
        throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }, this.getVerifyContext = async (i) => {
      const { attestationId: r, hash: n, encryptedId: s, metadata: a, transportType: h } = i, d = { verified: { verifyUrl: a.verifyUrl || Vn, validation: "UNKNOWN", origin: a.url || "" } };
      try {
        if (h === st.link_mode) {
          const g = this.getAppLinkIfEnabled(a, h);
          return d.verified.validation = g && new URL(g).origin === new URL(a.url).origin ? "VALID" : "INVALID", d;
        }
        const f = await this.client.core.verify.resolve({ attestationId: r, hash: n, encryptedId: s, verifyUrl: a.verifyUrl });
        f && (d.verified.origin = f.origin, d.verified.isScam = f.isScam, d.verified.validation = f.origin === new URL(a.url).origin ? "VALID" : "INVALID");
      } catch (f) {
        this.client.logger.warn(f);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(d)}`), d;
    }, this.validateSessionProps = (i, r) => {
      Object.values(i).forEach((n) => {
        if (!gt(n, !1)) {
          const { message: s } = ne("MISSING_OR_INVALID", `${r} must be in Record<string, string> format. Received: ${JSON.stringify(n)}`);
          throw new Error(s);
        }
      });
    }, this.getPendingAuthRequest = (i) => {
      const r = this.client.auth.requests.get(i);
      return typeof r == "object" ? r : void 0;
    }, this.addToRecentlyDeleted = (i, r) => {
      if (this.recentlyDeletedMap.set(i, r), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let n = 0;
        const s = this.recentlyDeletedLimit / 2;
        for (const a of this.recentlyDeletedMap.keys()) {
          if (n++ >= s)
            break;
          this.recentlyDeletedMap.delete(a);
        }
      }
    }, this.checkRecentlyDeleted = (i) => {
      const r = this.recentlyDeletedMap.get(i);
      if (r) {
        const { message: n } = ne("MISSING_OR_INVALID", `Record was recently deleted - ${r}: ${i}`);
        throw new Error(n);
      }
    }, this.isLinkModeEnabled = (i, r) => {
      var n, s, a, h, d, f, g, _, x;
      return !i || r !== st.link_mode ? !1 : ((s = (n = this.client.metadata) == null ? void 0 : n.redirect) == null ? void 0 : s.linkMode) === !0 && ((h = (a = this.client.metadata) == null ? void 0 : a.redirect) == null ? void 0 : h.universal) !== void 0 && ((f = (d = this.client.metadata) == null ? void 0 : d.redirect) == null ? void 0 : f.universal) !== "" && ((g = i?.redirect) == null ? void 0 : g.universal) !== void 0 && ((_ = i?.redirect) == null ? void 0 : _.universal) !== "" && ((x = i?.redirect) == null ? void 0 : x.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(i.redirect.universal) && typeof globalThis?.Linking < "u";
    }, this.getAppLinkIfEnabled = (i, r) => {
      var n;
      return this.isLinkModeEnabled(i, r) ? (n = i?.redirect) == null ? void 0 : n.universal : void 0;
    }, this.handleLinkModeMessage = ({ url: i }) => {
      if (!i || !i.includes("wc_ev") || !i.includes("topic"))
        return;
      const r = Sc(i, "topic") || "", n = decodeURIComponent(Sc(i, "wc_ev") || ""), s = this.client.session.keys.includes(r);
      s && this.client.session.update(r, { transportType: st.link_mode }), this.client.core.dispatchEnvelope({ topic: r, message: n, sessionExists: s });
    }, this.registerLinkModeListeners = async () => {
      var i;
      if (Ga() || Ar() && (i = this.client.metadata.redirect) != null && i.linkMode) {
        const r = globalThis?.Linking;
        if (typeof r < "u") {
          r.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const n = await r.getInitialURL();
          n && setTimeout(() => {
            this.handleLinkModeMessage({ url: n });
          }, 50);
        }
      }
    };
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: t } = ne("NOT_INITIALIZED", this.name);
      throw new Error(t);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(Et.message, (t) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(t) : this.onRelayMessage(t);
    });
  }
  async onRelayMessage(t) {
    const { topic: i, message: r, attestation: n, transportType: s } = t, { publicKey: a } = this.client.auth.authKeys.keys.includes(Ls) ? this.client.auth.authKeys.get(Ls) : { publicKey: void 0 }, h = await this.client.core.crypto.decode(i, r, { receiverPublicKey: a, encoding: s === st.link_mode ? Cn : vr });
    try {
      Qa(h) ? (this.client.core.history.set(i, h), this.onRelayEventRequest({ topic: i, payload: h, attestation: n, transportType: s, encryptedId: or(r) })) : Ao(h) ? (await this.client.core.history.resolve(h), await this.onRelayEventResponse({ topic: i, payload: h, transportType: s }), this.client.core.history.delete(i, h.id)) : this.onRelayEventUnknownPayload({ topic: i, payload: h, transportType: s });
    } catch (d) {
      this.client.logger.error(d);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(ui.expired, async (t) => {
      const { topic: i, id: r } = sd(t.target);
      if (r && this.client.pendingRequest.keys.includes(r))
        return await this.deletePendingSessionRequest(r, ne("EXPIRED"), !0);
      if (r && this.client.auth.requests.keys.includes(r))
        return await this.deletePendingAuthRequest(r, ne("EXPIRED"), !0);
      i ? this.client.session.keys.includes(i) && (await this.deleteSession({ topic: i, expirerHasDeleted: !0 }), this.client.events.emit("session_expire", { topic: i })) : r && (await this.deleteProposal(r, !0), this.client.events.emit("proposal_expire", { id: r }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(qr.create, (t) => this.onPairingCreated(t)), this.client.core.pairing.events.on(qr.delete, (t) => {
      this.addToRecentlyDeleted(t.topic, "pairing");
    });
  }
  isValidPairingTopic(t) {
    if (!gt(t, !1)) {
      const { message: i } = ne("MISSING_OR_INVALID", `pairing topic should be a string: ${t}`);
      throw new Error(i);
    }
    if (!this.client.core.pairing.pairings.keys.includes(t)) {
      const { message: i } = ne("NO_MATCHING_KEY", `pairing topic doesn't exist: ${t}`);
      throw new Error(i);
    }
    if (br(this.client.core.pairing.pairings.get(t).expiry)) {
      const { message: i } = ne("EXPIRED", `pairing topic: ${t}`);
      throw new Error(i);
    }
  }
  async isValidSessionTopic(t) {
    if (!gt(t, !1)) {
      const { message: i } = ne("MISSING_OR_INVALID", `session topic should be a string: ${t}`);
      throw new Error(i);
    }
    if (this.checkRecentlyDeleted(t), !this.client.session.keys.includes(t)) {
      const { message: i } = ne("NO_MATCHING_KEY", `session topic doesn't exist: ${t}`);
      throw new Error(i);
    }
    if (br(this.client.session.get(t).expiry)) {
      await this.deleteSession({ topic: t });
      const { message: i } = ne("EXPIRED", `session topic: ${t}`);
      throw new Error(i);
    }
    if (!this.client.core.crypto.keychain.has(t)) {
      const { message: i } = ne("MISSING_OR_INVALID", `session topic does not exist in keychain: ${t}`);
      throw await this.deleteSession({ topic: t }), new Error(i);
    }
  }
  async isValidSessionOrPairingTopic(t) {
    if (this.checkRecentlyDeleted(t), this.client.session.keys.includes(t))
      await this.isValidSessionTopic(t);
    else if (this.client.core.pairing.pairings.keys.includes(t))
      this.isValidPairingTopic(t);
    else if (gt(t, !1)) {
      const { message: i } = ne("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${t}`);
      throw new Error(i);
    } else {
      const { message: i } = ne("MISSING_OR_INVALID", `session or pairing topic should be a string: ${t}`);
      throw new Error(i);
    }
  }
  async isValidProposalId(t) {
    if (!fy(t)) {
      const { message: i } = ne("MISSING_OR_INVALID", `proposal id should be a number: ${t}`);
      throw new Error(i);
    }
    if (!this.client.proposal.keys.includes(t)) {
      const { message: i } = ne("NO_MATCHING_KEY", `proposal id doesn't exist: ${t}`);
      throw new Error(i);
    }
    if (br(this.client.proposal.get(t).expiryTimestamp)) {
      await this.deleteProposal(t);
      const { message: i } = ne("EXPIRED", `proposal id: ${t}`);
      throw new Error(i);
    }
  }
}
class Qv extends Zr {
  constructor(t, i) {
    super(t, i, qv, eh), this.core = t, this.logger = i;
  }
}
class e8 extends Zr {
  constructor(t, i) {
    super(t, i, zv, eh), this.core = t, this.logger = i;
  }
}
class t8 extends Zr {
  constructor(t, i) {
    super(t, i, Dv, eh, (r) => r.id), this.core = t, this.logger = i;
  }
}
class i8 extends Zr {
  constructor(t, i) {
    super(t, i, $v, Oo, () => Ls), this.core = t, this.logger = i;
  }
}
class r8 extends Zr {
  constructor(t, i) {
    super(t, i, Vv, Oo), this.core = t, this.logger = i;
  }
}
class n8 extends Zr {
  constructor(t, i) {
    super(t, i, Hv, Oo, (r) => r.id), this.core = t, this.logger = i;
  }
}
class s8 {
  constructor(t, i) {
    this.core = t, this.logger = i, this.authKeys = new i8(this.core, this.logger), this.pairingTopics = new r8(this.core, this.logger), this.requests = new n8(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
}
class Po extends pp {
  constructor(t) {
    super(t), this.protocol = zd, this.version = Ud, this.name = Xo.name, this.events = new ri.EventEmitter(), this.on = (r, n) => this.events.on(r, n), this.once = (r, n) => this.events.once(r, n), this.off = (r, n) => this.events.off(r, n), this.removeListener = (r, n) => this.events.removeListener(r, n), this.removeAllListeners = (r) => this.events.removeAllListeners(r), this.connect = async (r) => {
      try {
        return await this.engine.connect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.pair = async (r) => {
      try {
        return await this.engine.pair(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approve = async (r) => {
      try {
        return await this.engine.approve(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.reject = async (r) => {
      try {
        return await this.engine.reject(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.update = async (r) => {
      try {
        return await this.engine.update(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.extend = async (r) => {
      try {
        return await this.engine.extend(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.request = async (r) => {
      try {
        return await this.engine.request(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.respond = async (r) => {
      try {
        return await this.engine.respond(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.ping = async (r) => {
      try {
        return await this.engine.ping(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.emit = async (r) => {
      try {
        return await this.engine.emit(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.disconnect = async (r) => {
      try {
        return await this.engine.disconnect(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.find = (r) => {
      try {
        return this.engine.find(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (r) {
        throw this.logger.error(r.message), r;
      }
    }, this.authenticate = async (r, n) => {
      try {
        return await this.engine.authenticate(r, n);
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.formatAuthMessage = (r) => {
      try {
        return this.engine.formatAuthMessage(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.approveSessionAuthenticate = async (r) => {
      try {
        return await this.engine.approveSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.rejectSessionAuthenticate = async (r) => {
      try {
        return await this.engine.rejectSessionAuthenticate(r);
      } catch (n) {
        throw this.logger.error(n.message), n;
      }
    }, this.name = t?.name || Xo.name, this.metadata = t?.metadata || ed(), this.signConfig = t?.signConfig;
    const i = typeof t?.logger < "u" && typeof t?.logger != "string" ? t.logger : io(xa({ level: t?.logger || Xo.logger }));
    this.core = t?.core || new Cv(t), this.logger = Ft(i, this.name), this.session = new e8(this.core, this.logger), this.proposal = new Qv(this.core, this.logger), this.pendingRequest = new t8(this.core, this.logger), this.engine = new Xv(this), this.auth = new s8(this.core, this.logger);
  }
  static async init(t) {
    const i = new Po(t);
    return await i.initialize(), i;
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
      }, te.toMiliseconds(te.ONE_SECOND));
    } catch (t) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(t.message), t;
    }
  }
}
const o8 = () => {
  const e = ou()?.os?.toLowerCase();
  return e?.includes("android") ? "android" : e?.toLowerCase().includes("ios") || e?.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 ? "ios" : "desktop";
}, Ss = o8(), a8 = {
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
}, h8 = {
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
}, c8 = `
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
class f8 {
  constructor() {
    He(this, "bridgeUrl", "https://login.argent.xyz"), He(this, "mobileUrl", "argent://"), He(this, "type", "overlay"), He(this, "wcUri"), He(this, "overlay"), He(this, "popupWindow"), He(this, "closingTimeout"), He(this, "close", () => {
      this.overlay?.remove(), this.popupWindow?.close(), this.overlay = void 0, this.popupWindow = void 0;
    });
  }
  showConnectionModal(t) {
    const i = encodeURIComponent(t), r = encodeURIComponent(window.location.href);
    this.showModal({
      desktop: `${this.bridgeUrl}?wc=${i}&href=${r}&device=desktop`,
      ios: `${this.mobileUrl}app/wc?uri=${i}&href=${r}&device=mobile`,
      android: `${this.mobileUrl}app/wc?uri=${i}&href=${r}&device=mobile`
    });
  }
  showApprovalModal(t) {
    if (Ss === "desktop") {
      this.showModal({
        desktop: `${this.bridgeUrl}?action=sign`,
        ios: "",
        android: ""
      });
      return;
    }
    const i = encodeURIComponent(window.location.href);
    this.showModal({
      desktop: `${this.bridgeUrl}?action=sign&device=desktop&href=${i}`,
      ios: `${this.mobileUrl}app/wc/request?href=${i}&device=mobile`,
      android: `${this.mobileUrl}app/wc/request?href=${i}&device=mobile`
    });
  }
  closeModal(t) {
    t ? (this.overlay?.querySelector("iframe")?.contentWindow?.postMessage("argent-login.success", "*"), this.popupWindow?.postMessage("argent-login.success", "*"), this.closingTimeout = setTimeout(this.close, 3400)) : this.close();
  }
  showModal(t) {
    if (clearTimeout(this.closingTimeout), (this.overlay || this.popupWindow) && this.close(), Ss === "android" || Ss === "ios") {
      const n = document.createElement("button");
      n.style.display = "none", n.addEventListener("click", () => {
        window.location.href = t[Ss];
      }), n.click();
      return;
    }
    if (this.type === "window") {
      const n = "menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=840,height=540";
      this.popupWindow = window.open(t.desktop, "_blank", n) || void 0;
      return;
    }
    const i = document.createElement("div");
    i.innerHTML = c8, i.id = "argent-mobile-modal-overlay";
    for (const [n, s] of Object.entries(a8))
      i.style[n] = s;
    document.body.appendChild(i), i.addEventListener("click", () => this.closeModal()), this.overlay = i;
    const r = i.querySelector("iframe");
    r.setAttribute("src", t.desktop);
    for (const [n, s] of Object.entries(h8))
      r.style[n] = s;
    i.querySelector(
      ".argent-close-button"
    ).addEventListener("click", () => this.closeModal());
  }
}
const Ti = new f8(), Qs = kr.NetworkName, u8 = async ({
  projectId: e,
  chainId: t,
  name: i,
  description: r,
  rpcUrl: n,
  bridgeUrl: s = d8(t),
  mobileUrl: a = l8(t),
  modalType: h = "overlay",
  url: d,
  icons: f,
  walletConnect: g
}, _) => {
  if (!s)
    throw new Error("bridgeUrl is required");
  if (!a)
    throw new Error("mobileUrl is required");
  Ti.bridgeUrl = s, Ti.mobileUrl = a, Ti.type = h;
  const x = {
    projectId: e,
    metadata: {
      name: i ?? "Unknown dapp",
      description: r ?? "Unknown dapp description",
      url: d ?? "#",
      icons: f ?? [],
      ...g?.metadata
    }
  }, A = await Po.init(x), O = new xf({ nodeUrl: n }), j = new _({ client: A, chainId: t, rpcUrl: n, provider: O });
  A.on("session_event", (F) => {
  }), A.on("session_update", ({ topic: F, params: V }) => {
    const { namespaces: C } = V, K = A.session.get(F);
    j.updateSession({ ...K, namespaces: C });
  }), A.on("session_delete", () => {
  });
  try {
    const F = A.session.getAll().find(j.isValidSession);
    if (F)
      return j.updateSession(F), j;
    const V = { requiredNamespaces: j.getRequiredNamespaces() };
    cl(), await new Promise((N) => setTimeout(N, 200));
    const { uri: C, approval: K } = await A.connect(V);
    if (C) {
      Ti.showConnectionModal(C), Ti.wcUri = C;
      const N = await K();
      j.updateSession(N), Ti.closeModal("animateSuccess");
    }
    return j;
  } catch {
    return console.error("@argent/login::error"), Ti.closeModal(), null;
  }
}, d8 = (e) => {
  if (!e)
    throw new Error(
      `Unknown or unsupported chainId (${e}), either specify a supported chain or set bridgeUrl.`
    );
  const t = parseInt(`${e}`);
  if (String(e).startsWith(Qs.SN_SEPOLIA) || t === 11155111)
    return "https://mobile-login.hydrogen.argent47.net";
  if (String(e).startsWith(Qs.SN_MAIN) || t === 1)
    return "https://login.argent.xyz";
}, l8 = (e) => {
  if (!e)
    throw new Error(
      `Unknown or unsupported chainId (${e}), either specify a supported chain or set mobileUrl.`
    );
  const t = parseInt(`${e}`);
  if (String(e).startsWith(Qs.SN_SEPOLIA) || t === 11155111)
    return "argent-dev://";
  if (String(e).startsWith(Qs.SN_MAIN) || t === 1)
    return "argent://";
};
function p8(e) {
  return typeof e < "u" && typeof e.context < "u";
}
const ki = { init: "signer_init", uri: "signer_uri", created: "signer_created", updated: "signer_updated", deleted: "signer_deleted", event: "signer_event" };
class g8 extends jy {
  constructor(t) {
    super(), this.events = new ri.EventEmitter(), this.pending = !1, this.initializing = !1, this.requiredNamespaces = t?.requiredNamespaces || {}, this.opts = t?.client;
  }
  get connected() {
    return typeof this.session < "u";
  }
  get connecting() {
    return this.pending;
  }
  get chains() {
    return this.session ? Qu(this.session.namespaces) : k2(this.requiredNamespaces);
  }
  get accounts() {
    return this.session ? Xu(this.session.namespaces) : [];
  }
  on(t, i) {
    this.events.on(t, i);
  }
  once(t, i) {
    this.events.once(t, i);
  }
  off(t, i) {
    this.events.off(t, i);
  }
  removeListener(t, i) {
    this.events.removeListener(t, i);
  }
  async open() {
    if (this.pending)
      return new Promise((t, i) => {
        this.events.once("open", () => {
          if (this.events.once("open_error", (r) => {
            i(r);
          }), typeof this.client > "u")
            return i(new Error("Sign Client not initialized"));
          t();
        });
      });
    try {
      this.pending = !0;
      const t = await this.register(), i = t.find({ requiredNamespaces: this.requiredNamespaces });
      if (i.length)
        return this.onOpen(i[0]);
      const { uri: r, approval: n } = await t.connect({ requiredNamespaces: this.requiredNamespaces });
      this.events.emit(ki.uri, { uri: r }), this.session = await n(), this.events.emit(ki.created, this.session), this.onOpen();
    } catch (t) {
      throw this.events.emit("open_error", t), t;
    }
  }
  async close() {
    typeof this.session > "u" || (await (await this.register()).disconnect({ topic: this.session.topic, reason: nt("USER_DISCONNECTED") }), this.onClose());
  }
  async send(t, i) {
    if (typeof this.client > "u" && (this.client = await this.register(), this.connected || await this.open()), typeof this.session > "u")
      throw new Error("Signer connection is missing session");
    this.client.request({ topic: this.session.topic, request: t, chainId: i?.chainId }).then((r) => this.events.emit("payload", Io(t.id, r))).catch((r) => this.events.emit("payload", Mo(t.id, r.message)));
  }
  async register(t = this.opts) {
    if (typeof this.client < "u")
      return this.client;
    if (this.initializing)
      return new Promise((i, r) => {
        this.events.once("register_error", (n) => {
          r(n);
        }), this.events.once(ki.init, () => {
          if (typeof this.client > "u")
            return r(new Error("Sign Client not initialized"));
          i(this.client);
        });
      });
    if (p8(t))
      return this.client = t, this.registerEventListeners(), this.client;
    try {
      return this.initializing = !0, this.client = await Po.init(t), this.initializing = !1, this.registerEventListeners(), this.events.emit(ki.init), this.client;
    } catch (i) {
      throw this.events.emit("register_error", i), i;
    }
  }
  onOpen(t) {
    this.pending = !1, t && (this.session = t), this.events.emit("open");
  }
  onClose() {
    this.pending = !1, this.client && (this.client = void 0), this.events.emit("close");
  }
  registerEventListeners() {
    typeof this.client < "u" && (this.client.on("session_event", (t) => {
      var i;
      this.session && ((i = this.session) == null ? void 0 : i.topic) !== t.topic || this.events.emit(ki.event, t.params);
    }), this.client.on("session_update", (t) => {
      var i;
      typeof this.client < "u" && (this.session && ((i = this.session) == null ? void 0 : i.topic) !== t.topic || (this.session = this.client.session.get(t.topic), this.events.emit(ki.updated, this.session)));
    }), this.client.on("session_delete", (t) => {
      var i;
      this.session && (this.session && ((i = this.session) == null ? void 0 : i.topic) !== t.topic || (this.onClose(), this.events.emit(ki.deleted, this.session), this.session = void 0));
    }));
  }
}
class b8 {
  constructor() {
    He(this, "accounts", []), He(this, "eventEmitter", new ri.EventEmitter()), He(this, "updateSession", (t) => {
      if (!this.isValidSession(t))
        throw console.warn(
          "updateSession incompatible session",
          t,
          "for adapter",
          this.formatChainId(this.chainId)
        ), new Error("Invalid session");
      this.session = t;
      const i = Qu(t.namespaces, [this.namespace]);
      this.setChainIds(i);
      const r = Xu(t.namespaces, [
        this.namespace
      ]);
      this.setAccounts(r);
    }), He(this, "isValidSession", ({
      namespaces: t,
      requiredNamespaces: i
    }) => {
      const r = this.formatChainId(this.chainId);
      return i ? !!i[this.namespace]?.chains?.includes(r) : !!t?.[this.namespace]?.accounts.some(
        (n) => n.startsWith(r)
      );
    });
  }
  getRequiredNamespaces() {
    const t = [this.formatChainId(this.chainId)];
    return {
      [this.namespace]: { chains: t, methods: this.methods, events: this.events }
    };
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : !1;
  }
  setChainIds(t) {
    const i = t.filter((r) => this.isCompatibleChainId(r)).map((r) => this.parseChainId(r)).filter((r) => r !== this.chainId);
    i.length && (this.chainId = i[0], this.eventEmitter.emit("chainChanged", this.chainId));
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const i = this.parseChainId(t);
      this.chainId = i, this.eventEmitter.emit("chainChanged", this.chainId);
    }
  }
  parseAccountId(t) {
    const [i, r, n] = t.split(":");
    return { chainId: `${i}:${r}`, address: n };
  }
  getSignerConnection(t) {
    return new g8({
      requiredNamespaces: {
        [this.namespace]: {
          chains: this.rpc.chains,
          methods: this.rpc.methods,
          events: this.rpc.events
        }
      },
      client: t
    });
  }
  registerEventListeners() {
    this.rpcProvider.on("connect", () => {
      const { chains: t, accounts: i } = this.signerConnection;
      t?.length && this.setChainIds(t), i?.length && this.setAccounts(i);
    }), this.signerConnection.on(ki.created, this.updateSession), this.signerConnection.on(ki.updated, this.updateSession), this.signerConnection.on(ki.event, (t) => {
      if (!this.rpc.chains.includes(t.chainId))
        return;
      const { event: i } = t;
      i.name === "accountsChanged" ? (this.accounts = i.data, this.eventEmitter.emit("accountsChanged", this.accounts)) : i.name === "chainChanged" ? this.setChainId(i.data) : this.eventEmitter.emit(i.name, i.data);
    }), this.rpcProvider.on("disconnect", () => {
      this.eventEmitter.emit("disconnect");
    });
  }
}
class Af extends fl {
  constructor(t, i, r, n) {
    super(t, i, r), this.wallet = n;
  }
  async execute(t, i, r = {}) {
    const n = Array.isArray(t) ? t : [t], s = i === void 0 || Array.isArray(i) ? r : i;
    return await this.wallet.wallet_requestAddInvokeTransaction({
      accountAddress: this.address,
      executionRequest: { calls: n, invocationDetails: s }
    });
  }
  async declare(t, i) {
    throw new Error("Not supported via Argent Login");
  }
  async deployAccount(t, i) {
    throw new Error("Not supported via Argent Login");
  }
}
class m8 {
  constructor(t) {
    this.wallet = t;
  }
  async getPubKey() {
    throw new Error("Not supported via Argent Login");
  }
  async signMessage(t, i) {
    const { signature: r } = await this.wallet.wallet_signTypedData({
      accountAddress: i,
      typedData: t
    });
    return r;
  }
  async signTransaction(t, i, r) {
    throw new Error("Not supported via Argent Login");
  }
  async signDeployAccountTransaction(t) {
    throw new Error("Not supported via Argent Login");
  }
  async signDeclareTransaction(t) {
    throw new Error("Not supported via Argent Login");
  }
}
const y8 = (e) => e.replace(/^SN_/, "SN"), v8 = (e) => e.replace(/^SN/, "SN_");
class w8 extends b8 {
  // TODO: improve typing
  constructor({ client: t, chainId: i, rpcUrl: r, provider: n }) {
    super(), He(this, "id", "argentMobile"), He(this, "name", "Argent Mobile"), He(this, "version", "0.1.0"), He(this, "icon", ""), He(this, "provider"), He(this, "signer"), He(this, "account"), He(this, "selectedAddress", ""), He(this, "namespace", "starknet"), He(this, "methods", [
      "starknet_supportedSpecs",
      "starknet_signTypedData",
      "starknet_requestAddInvokeTransaction",
      "wallet_supportedSpecs",
      "wallet_signTypedData",
      "wallet_addInvokeTransaction"
    ]), He(this, "events", ["chainChanged", "accountsChanged"]), He(this, "remoteSigner"), He(this, "signerConnection"), He(this, "rpcProvider"), He(this, "chainId"), He(this, "client"), He(this, "session"), He(this, "rpc"), He(this, "walletRpc"), He(this, "handleRequest"), He(this, "request", async (s) => {
      if (!this.session)
        throw new Error("No session");
      let a = s.type;
      (a === "wallet_addInvokeTransaction" || a === "wallet_supportedSpecs" || a === "wallet_signTypedData") && (a = a.replace("wallet_", "starknet_"));
      const h = this.handleRequest[a];
      if (h)
        return h(s.params);
      throw new Error(`Not implemented: .request() for ${s.type}`);
    }), He(this, "on", (s, a) => {
      this.eventEmitter.on(s, a);
    }), He(this, "off", (s, a) => {
      this.eventEmitter.off(s, a);
    }), He(this, "handleRequestChainId", () => this.chainId === kr.NetworkName.SN_SEPOLIA ? kr.StarknetChainId.SN_SEPOLIA : kr.StarknetChainId.SN_MAIN), He(this, "handleRequestAccounts", () => this.accounts), He(this, "handleGetPermissions", async () => await this.isPreauthorized() ? ["accounts"] : []), He(this, "handleAddInvokeTransaction", async (s) => {
      const { calls: a } = s;
      return await this.requestWallet({
        method: "starknet_requestAddInvokeTransaction",
        params: {
          accountAddress: this.account.address,
          executionRequest: {
            // will be removed when argent mobile will support entry_point and contract_address
            calls: a?.map(({ contract_address: h, entry_point: d, ...f }) => ({
              ...f,
              contractAddress: h,
              entrypoint: d
            }))
          }
        }
      });
    }), He(this, "handleSignTypedData", async (s) => {
      const a = {
        accountAddress: this.account.address,
        typedData: s
      }, h = await this.requestWallet({
        method: "starknet_signTypedData",
        params: a
      });
      return "signature" in h ? h.signature : h;
    }), He(this, "handleSupportedSpecs", async () => await this.requestWallet({
      method: "starknet_supportedSpecs",
      params: {}
    })), this.chainId = String(i ?? kr.NetworkName.SN_MAIN), this.rpc = {
      chains: i ? [this.formatChainId(this.chainId)] : [],
      methods: this.methods,
      events: this.events
    }, this.signerConnection = this.getSignerConnection(t), this.rpcProvider = new _d(this.signerConnection), this.client = t, this.registerEventListeners(), this.walletRpc = new Proxy({}, {
      get: (s, a) => (h) => this.requestWallet({ method: a, params: h })
    }), this.remoteSigner = new m8(this.walletRpc), this.provider = n || new xf({ nodeUrl: r }), this.account = new Af(
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
      return kr.NetworkName.SN_SEPOLIA;
    if (t === "SN_MAIN")
      return kr.NetworkName.SN_MAIN;
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
      const { topic: i } = this.session, r = this.formatChainId(this.chainId);
      Ti.showApprovalModal(t);
      const n = await this.client.request({ topic: i, chainId: r, request: t });
      return Ti.closeModal("animateSuccess"), n;
    } catch (i) {
      throw Ti.closeModal(), i instanceof Error || i && i.message !== void 0 ? new Error(i.message) : new Error("Unknown error on requestWallet");
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
    return `${this.namespace}:${y8(t)}`;
  }
  parseChainId(t) {
    return v8(t.split(":")[1]);
  }
  setAccounts(t) {
    this.accounts = t.filter(
      (n) => this.parseChainId(this.parseAccountId(n).chainId) === this.chainId
    ).map((n) => this.parseAccountId(n).address);
    const { address: i } = this.parseAccountId(t[0]), r = i.startsWith("0x") ? i : `0x${i}`;
    this.account = new Af(
      this.provider,
      r,
      this.remoteSigner,
      this.walletRpc
    ), this.eventEmitter.emit("accountsChanged", this.accounts), this.selectedAddress = r;
  }
}
const E8 = async (e) => u8(e, w8);
export {
  E8 as getStarknetWindowObject
};
//# sourceMappingURL=index-1c1d2b10-BqRs4xUU.js.map
