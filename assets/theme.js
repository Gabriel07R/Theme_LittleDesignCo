window.theme = window.theme || {};
window.themeInfo = {name: "Vantage"};

(function polyfillNodeList(){
  /* For IE 11+ Nodelist forEach Function */
  if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
          thisArg = thisArg || window;
          for (var i = 0; i < this.length; i++) {
              callback.call(thisArg, this[i], i, this);
          }
      };
  }


  /* IE 11 Includes Polyfill */
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  /* IE11 Polyfill for remove */
  (function (arr) {
    arr.forEach(function (item) {
      if (item.hasOwnProperty('remove')) {
        return;
      }
      Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
          this.parentNode.removeChild(this);
        }
      });
    });
  })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
})();

(function vendorModernizr() {
  /* Modernizr 2.8.2 (Custom Build) | MIT & BSD
   * Build: http://modernizr.com/download/#-fontface-csstransforms-csstransforms3d-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-cssclassprefix:supports!
   */
  ;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.8.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.fontface=function(){var a;return w('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" supports-"+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" supports-js supports-"+t.join(" supports-"):""),e}(this,this.document);
})();

(function helperCookie(){
  !function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function t(o){function r(){}function i(n,t,i){if("undefined"!=typeof document){"number"==typeof(i=e({path:"/"},r.defaults,i)).expires&&(i.expires=new Date(1*new Date+864e5*i.expires)),i.expires=i.expires?i.expires.toUTCString():"";try{var c=JSON.stringify(t);/^[\{\[]/.test(c)&&(t=c)}catch(e){}t=o.write?o.write(t,n):encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var f="";for(var u in i)i[u]&&(f+="; "+u,!0!==i[u]&&(f+="="+i[u].split(";")[0]));return document.cookie=n+"="+t+f}}function c(e,t){if("undefined"!=typeof document){for(var r={},i=document.cookie?document.cookie.split("; "):[],c=0;c<i.length;c++){var f=i[c].split("="),u=f.slice(1).join("=");t||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var a=n(f[0]);if(u=(o.read||o)(u,a)||n(u),t)try{u=JSON.parse(u)}catch(e){}if(r[a]=u,e===a)break}catch(e){}}return e?r[e]:r}}return r.set=i,r.get=function(e){return c(e,!1)},r.getJSON=function(e){return c(e,!0)},r.remove=function(n,t){i(n,"",e(t,{expires:-1}))},r.defaults={},r.withConverter=t,r}(function(){})});
})();

(function vendorLodash(){
  // lodash.core.min.js

  /**
   * @license
   * lodash 4.5.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
   * Build: `lodash core -o ./dist/lodash.core.js`
   */
  ;(function(){function n(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function t(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===an?i===i:r(i,c)))var c=i,f=o}return f}function r(n,t,r){var e;return r(n,function(n,r,u){return t(n,r,u)?(e=n,false):void 0}),e}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return O(t,function(t){return n[t]})}function o(n){return n&&n.Object===Object?n:null}function i(n){return vn[n];
  }function c(n){var t=false;if(null!=n&&typeof n.toString!="function")try{t=!!(n+"")}catch(r){}return t}function f(n,t){return n=typeof n=="number"||hn.test(n)?+n:-1,n>-1&&0==n%1&&(null==t?9007199254740991:t)>n}function a(n){if(Y(n)&&!Pn(n)){if(n instanceof l)return n;if(En.call(n,"__wrapped__")){var t=new l(n.__wrapped__,n.__chain__);return t.__actions__=N(n.__actions__),t}}return new l(n)}function l(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function p(n,t,r,e){var u;return(u=n===an)||(u=xn[r],
  u=(n===u||n!==n&&u!==u)&&!En.call(e,r)),u?t:n}function s(n){return X(n)?Fn(n):{}}function h(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");return setTimeout(function(){n.apply(an,r)},t)}function v(n,t){var r=true;return $n(n,function(n,e,u){return r=!!t(n,e,u)}),r}function y(n,t){var r=[];return $n(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function _(t,r,e,u){u||(u=[]);for(var o=-1,i=t.length;++o<i;){var c=t[o];r>0&&Y(c)&&L(c)&&(e||Pn(c)||K(c))?r>1?_(c,r-1,e,u):n(u,c):e||(u[u.length]=c);
  }return u}function g(n,t){return n&&qn(n,t,en)}function b(n,t){return y(t,function(t){return Q(n[t])})}function j(n,t,r,e,u){return n===t?true:null==n||null==t||!X(n)&&!Y(t)?n!==n&&t!==t:m(n,t,j,r,e,u)}function m(n,t,r,e,u,o){var i=Pn(n),f=Pn(t),a="[object Array]",l="[object Array]";i||(a=kn.call(n),"[object Arguments]"==a&&(a="[object Object]")),f||(l=kn.call(t),"[object Arguments]"==l&&(l="[object Object]"));var p="[object Object]"==a&&!c(n),f="[object Object]"==l&&!c(t);return!(l=a==l)||i||p?2&u||(a=p&&En.call(n,"__wrapped__"),
  f=f&&En.call(t,"__wrapped__"),!a&&!f)?l?(o||(o=[]),(a=J(o,function(t){return t[0]===n}))&&a[1]?a[1]==t:(o.push([n,t]),t=(i?I:q)(n,t,r,e,u,o),o.pop(),t)):false:r(a?n.value():n,f?t.value():t,e,u,o):$(n,t,a)}function d(n){var t=typeof n;return"function"==t?n:null==n?cn:("object"==t?x:A)(n)}function w(n){n=null==n?n:Object(n);var t,r=[];for(t in n)r.push(t);return r}function O(n,t){var r=-1,e=L(n)?Array(n.length):[];return $n(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function x(n){var t=en(n);return function(r){
    var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&j(n[u],r[u],an,3)))return false}return true}}function E(n,t){return n=Object(n),P(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function A(n){return function(t){return null==t?an:t[n]}}function k(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function N(n){return k(n,0,n.length)}function S(n,t){var r;return $n(n,function(n,e,u){return r=t(n,e,u),
      !r}),!!r}function T(t,r){return P(r,function(t,r){return r.func.apply(r.thisArg,n([t],r.args))},t)}function F(n,t,r,e){r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=e?e(r[i],n[i],i,r,n):n[i],f=r,a=f[i];En.call(f,i)&&(a===c||a!==a&&c!==c)&&(c!==an||i in f)||(f[i]=c)}return r}function R(n){return V(function(t,r){var e=-1,u=r.length,o=u>1?r[u-1]:an,o=typeof o=="function"?(u--,o):an;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function B(n){return function(){var t=arguments,r=s(n.prototype),t=n.apply(r,t);
  return X(t)?t:r}}function D(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==wn&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");var u=B(n);return e}function I(n,t,r,e,u,o){var i=-1,c=1&u,f=n.length,a=t.length;if(f!=a&&!(2&u&&a>f))return false;for(a=true;++i<f;){var l=n[i],p=t[i];if(void 0!==an){a=false;break}if(c){if(!S(t,function(n){return l===n||r(l,n,e,u,o);
  })){a=false;break}}else if(l!==p&&!r(l,p,e,u,o)){a=false;break}}return a}function $(n,t,r){switch(r){case"[object Boolean]":case"[object Date]":return+n==+t;case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object Number]":return n!=+n?t!=+t:n==+t;case"[object RegExp]":case"[object String]":return n==t+""}return false}function q(n,t,r,e,u,o){var i=2&u,c=en(n),f=c.length,a=en(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:En.call(t,p)))return false}for(a=true;++l<f;){
    var p=c[l],s=n[p],h=t[p];if(void 0!==an||s!==h&&!r(s,h,e,u,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function z(n){var t=n?n.length:an;if(W(t)&&(Pn(n)||nn(n)||K(n))){n=String;for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);t=e}else t=null;return t}function C(n){var t=n&&n.constructor,t=Q(t)&&t.prototype||xn;return n===t}function G(n){
      return n?n[0]:an}function J(n,t){return r(n,d(t),$n)}function M(n,t){return $n(n,typeof t=="function"?t:cn)}function P(n,t,r){return e(n,d(t),r,3>arguments.length,$n)}function U(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Un(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=an),r}}function V(n){var t;if(typeof n!="function")throw new TypeError("Expected a function");return t=In(t===an?n.length-1:Un(t),0),function(){for(var r=arguments,e=-1,u=In(r.length-t,0),o=Array(u);++e<u;)o[e]=r[t+e];
  for(u=Array(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function H(n,t){return n>t}function K(n){return Y(n)&&L(n)&&En.call(n,"callee")&&(!Rn.call(n,"callee")||"[object Arguments]"==kn.call(n))}function L(n){return null!=n&&!(typeof n=="function"&&Q(n))&&W(zn(n))}function Q(n){return n=X(n)?kn.call(n):"","[object Function]"==n||"[object GeneratorFunction]"==n}function W(n){return typeof n=="number"&&n>-1&&0==n%1&&9007199254740991>=n}function X(n){var t=typeof n;return!!n&&("object"==t||"function"==t);
  }function Y(n){return!!n&&typeof n=="object"}function Z(n){return typeof n=="number"||Y(n)&&"[object Number]"==kn.call(n)}function nn(n){return typeof n=="string"||!Pn(n)&&Y(n)&&"[object String]"==kn.call(n)}function tn(n,t){return t>n}function rn(n){return typeof n=="string"?n:null==n?"":n+""}function en(n){var t=C(n);if(!t&&!L(n))return Dn(Object(n));var r,e=z(n),u=!!e,e=e||[],o=e.length;for(r in n)!En.call(n,r)||u&&("length"==r||f(r,o))||t&&"constructor"==r||e.push(r);return e}function un(n){for(var t=-1,r=C(n),e=w(n),u=e.length,o=z(n),i=!!o,o=o||[],c=o.length;++t<u;){
    var a=e[t];i&&("length"==a||f(a,c))||"constructor"==a&&(r||!En.call(n,a))||o.push(a)}return o}function on(n){return n?u(n,en(n)):[]}function cn(n){return n}function fn(t,r,e){var u=en(r),o=b(r,u);null!=e||X(r)&&(o.length||!u.length)||(e=r,r=t,t=this,o=b(r,en(r)));var i=X(e)&&"chain"in e?e.chain:true,c=Q(t);return $n(o,function(e){var u=r[e];t[e]=u,c&&(t.prototype[e]=function(){var r=this.__chain__;if(i||r){var e=t(this.__wrapped__);return(e.__actions__=N(this.__actions__)).push({func:u,args:arguments,
  thisArg:t}),e.__chain__=r,e}return u.apply(t,n([this.value()],arguments))})}),t}var an,ln=1/0,pn=/[&<>"'`]/g,sn=RegExp(pn.source),hn=/^(?:0|[1-9]\d*)$/,vn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},yn={"function":true,object:true},_n=yn[typeof exports]&&exports&&!exports.nodeType?exports:an,gn=yn[typeof module]&&module&&!module.nodeType?module:an,bn=gn&&gn.exports===_n?_n:an,jn=o(yn[typeof self]&&self),mn=o(yn[typeof window]&&window),dn=o(yn[typeof this]&&this),wn=o(_n&&gn&&typeof global=="object"&&global)||mn!==(dn&&dn.window)&&mn||jn||dn||Function("return this")(),On=Array.prototype,xn=Object.prototype,En=xn.hasOwnProperty,An=0,kn=xn.toString,Nn=wn._,Sn=wn.Reflect,Tn=Sn?Sn.f:an,Fn=Object.create,Rn=xn.propertyIsEnumerable,Bn=wn.isFinite,Dn=Object.keys,In=Math.max,$n=function(n,t){
      return function(r,e){if(null==r)return r;if(!L(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(g),qn=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}();Tn&&!Rn.call({valueOf:1},"valueOf")&&(w=function(n){n=Tn(n);for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r});var zn=A("length"),Cn=V(function(t,r){return Pn(t)||(t=null==t?[]:[Object(t)]),_(r,1),
      n(N(t),on)}),Gn=V(function(n,t,r){return D(n,t,r)}),Jn=V(function(n,t){return h(n,1,t)}),Mn=V(function(n,t,r){return h(n,Vn(t)||0,r)}),Pn=Array.isArray,Un=Number,Vn=Number,Hn=R(function(n,t){F(t,en(t),n)}),Kn=R(function(n,t){F(t,un(t),n)}),Ln=R(function(n,t,r,e){F(t,un(t),n,e)}),Qn=V(function(n){return n.push(an,p),Ln.apply(an,n)}),Wn=V(function(n,t){return null==n?{}:E(n,_(t,1))}),Xn=d;l.prototype=s(a.prototype),l.prototype.constructor=l,a.assignIn=Kn,a.before=U,a.bind=Gn,a.chain=function(n){return n=a(n),
      n.__chain__=true,n},a.compact=function(n){return y(n,Boolean)},a.concat=Cn,a.create=function(n,t){var r=s(n);return t?Hn(r,t):r},a.defaults=Qn,a.defer=Jn,a.delay=Mn,a.filter=function(n,t){return y(n,d(t))},a.flatten=function(n){return n&&n.length?_(n,1):[]},a.flattenDeep=function(n){return n&&n.length?_(n,ln):[]},a.iteratee=Xn,a.keys=en,a.map=function(n,t){return O(n,d(t))},a.matches=function(n){return x(Hn({},n))},a.mixin=fn,a.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");
  return function(){return!n.apply(this,arguments)}},a.once=function(n){return U(2,n)},a.pick=Wn,a.slice=function(n,t,r){var e=n?n.length:0;return r=r===an?e:+r,e?k(n,null==t?0:+t,r):[]},a.sortBy=function(n,t){var r=0;return t=d(t),O(O(n,function(n,e,u){return{c:n,b:r++,a:t(n,e,u)}}).sort(function(n,t){var r;n:{r=n.a;var e=t.a;if(r!==e){var u=null===r,o=r===an,i=r===r,c=null===e,f=e===an,a=e===e;if(r>e&&!c||!i||u&&!f&&a||o&&a){r=1;break n}if(e>r&&!u||!a||c&&!o&&i||f&&i){r=-1;break n}}r=0}return r||n.b-t.b;
  }),A("c"))},a.tap=function(n,t){return t(n),n},a.thru=function(n,t){return t(n)},a.toArray=function(n){return L(n)?n.length?N(n):[]:on(n)},a.values=on,a.extend=Kn,fn(a,a),a.clone=function(n){return X(n)?Pn(n)?N(n):F(n,en(n)):n},a.escape=function(n){return(n=rn(n))&&sn.test(n)?n.replace(pn,i):n},a.every=function(n,t,r){return t=r?an:t,v(n,d(t))},a.find=J,a.forEach=M,a.has=function(n,t){return null!=n&&En.call(n,t)},a.head=G,a.identity=cn,a.indexOf=function(n,t,r){var e=n?n.length:0;r=typeof r=="number"?0>r?In(e+r,0):r:0,
      r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1},a.isArguments=K,a.isArray=Pn,a.isBoolean=function(n){return true===n||false===n||Y(n)&&"[object Boolean]"==kn.call(n)},a.isDate=function(n){return Y(n)&&"[object Date]"==kn.call(n)},a.isEmpty=function(n){if(L(n)&&(Pn(n)||nn(n)||Q(n.splice)||K(n)))return!n.length;for(var t in n)if(En.call(n,t))return false;return true},a.isEqual=function(n,t){return j(n,t)},a.isFinite=function(n){return typeof n=="number"&&Bn(n)},a.isFunction=Q,a.isNaN=function(n){
      return Z(n)&&n!=+n},a.isNull=function(n){return null===n},a.isNumber=Z,a.isObject=X,a.isRegExp=function(n){return X(n)&&"[object RegExp]"==kn.call(n)},a.isString=nn,a.isUndefined=function(n){return n===an},a.last=function(n){var t=n?n.length:0;return t?n[t-1]:an},a.max=function(n){return n&&n.length?t(n,cn,H):an},a.min=function(n){return n&&n.length?t(n,cn,tn):an},a.noConflict=function(){return wn._===this&&(wn._=Nn),this},a.noop=function(){},a.reduce=P,a.result=function(n,t,r){return t=null==n?an:n[t],
      t===an&&(t=r),Q(t)?t.call(n):t},a.size=function(n){return null==n?0:(n=L(n)?n:en(n),n.length)},a.some=function(n,t,r){return t=r?an:t,S(n,d(t))},a.uniqueId=function(n){var t=++An;return rn(n)+t},a.each=M,a.first=G,fn(a,function(){var n={};return g(a,function(t,r){En.call(a.prototype,r)||(n[r]=t)}),n}(),{chain:false}),a.VERSION="4.5.1",$n("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:On)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);
  a.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),a.prototype.toJSON=a.prototype.valueOf=a.prototype.value=function(){return T(this.__wrapped__,this.__actions__)},(mn||jn||{})._=a,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return a}):_n&&gn?(bn&&((gn.exports=a)._=a),_n._=a):wn._=a}).call(this);
})();

(function vendorFlickity() {

  /*!
   * Flickity PACKAGED v2.3.0
   * Touch, responsive, flickable carousels
   *
   * Licensed GPLv3 for open source use
   * or Flickity Commercial License for commercial use
   *
   * https://flickity.metafizzy.co
   * Copyright 2015-2021 Metafizzy
   */
  (function(e,i){if(typeof define=="function"&&define.amd){define("jquery-bridget/jquery-bridget",["jquery"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("jquery"))}else{e.jQueryBridget=i(e,e.jQuery)}})(window,function t(e,r){"use strict";var o=Array.prototype.slice;var i=e.console;var u=typeof i=="undefined"?function(){}:function(t){i.error(t)};function n(h,s,c){c=c||r||e.jQuery;if(!c){return}if(!s.prototype.option){s.prototype.option=function(t){if(!c.isPlainObject(t)){return}this.options=c.extend(true,this.options,t)}}c.fn[h]=function(t){if(typeof t=="string"){var e=o.call(arguments,1);return i(this,t,e)}n(this,t);return this};function i(t,r,o){var a;var l="$()."+h+'("'+r+'")';t.each(function(t,e){var i=c.data(e,h);if(!i){u(h+" not initialized. Cannot call methods, i.e. "+l);return}var n=i[r];if(!n||r.charAt(0)=="_"){u(l+" is not a valid method");return}var s=n.apply(i,o);a=a===undefined?s:a});return a!==undefined?a:t}function n(t,n){t.each(function(t,e){var i=c.data(e,h);if(i){i.option(n);i._init()}else{i=new s(e,n);c.data(e,h,i)}})}a(c)}function a(t){if(!t||t&&t.bridget){return}t.bridget=n}a(r||e.jQuery);return n});(function(t,e){if(typeof define=="function"&&define.amd){define("ev-emitter/ev-emitter",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.EvEmitter=e()}})(typeof window!="undefined"?window:this,function(){function t(){}var e=t.prototype;e.on=function(t,e){if(!t||!e){return}var i=this._events=this._events||{};var n=i[t]=i[t]||[];if(n.indexOf(e)==-1){n.push(e)}return this};e.once=function(t,e){if(!t||!e){return}this.on(t,e);var i=this._onceEvents=this._onceEvents||{};var n=i[t]=i[t]||{};n[e]=true;return this};e.off=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length){return}var n=i.indexOf(e);if(n!=-1){i.splice(n,1)}return this};e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(!i||!i.length){return}i=i.slice(0);e=e||[];var n=this._onceEvents&&this._onceEvents[t];for(var s=0;s<i.length;s++){var r=i[s];var o=n&&n[r];if(o){this.off(t,r);delete n[r]}r.apply(this,e)}return this};e.allOff=function(){delete this._events;delete this._onceEvents};return t});
  /*!
   * getSize v2.0.3
   * measure size of elements
   * MIT license
   */
  (function(t,e){if(typeof define=="function"&&define.amd){define("get-size/get-size",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.getSize=e()}})(window,function t(){"use strict";function m(t){var e=parseFloat(t);var i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}var i=typeof console=="undefined"?e:function(t){console.error(t)};var y=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];var b=y.length;function E(){var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};for(var e=0;e<b;e++){var i=y[e];t[i]=0}return t}function S(t){var e=getComputedStyle(t);if(!e){i("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? "+"See https://bit.ly/getsizebug1")}return e}var n=false;var C;function x(){if(n){return}n=true;var t=document.createElement("div");t.style.width="200px";t.style.padding="1px 2px 3px 4px";t.style.borderStyle="solid";t.style.borderWidth="1px 2px 3px 4px";t.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(t);var i=S(t);C=Math.round(m(i.width))==200;s.isBoxSizeOuter=C;e.removeChild(t)}function s(t){x();if(typeof t=="string"){t=document.querySelector(t)}if(!t||typeof t!="object"||!t.nodeType){return}var e=S(t);if(e.display=="none"){return E()}var i={};i.width=t.offsetWidth;i.height=t.offsetHeight;var n=i.isBorderBox=e.boxSizing=="border-box";for(var s=0;s<b;s++){var r=y[s];var o=e[r];var a=parseFloat(o);i[r]=!isNaN(a)?a:0}var l=i.paddingLeft+i.paddingRight;var h=i.paddingTop+i.paddingBottom;var c=i.marginLeft+i.marginRight;var u=i.marginTop+i.marginBottom;var d=i.borderLeftWidth+i.borderRightWidth;var f=i.borderTopWidth+i.borderBottomWidth;var p=n&&C;var v=m(e.width);if(v!==false){i.width=v+(p?0:l+d)}var g=m(e.height);if(g!==false){i.height=g+(p?0:h+f)}i.innerWidth=i.width-(l+d);i.innerHeight=i.height-(h+f);i.outerWidth=i.width+c;i.outerHeight=i.height+u;return i}return s});(function(t,e){"use strict";if(typeof define=="function"&&define.amd){define("desandro-matches-selector/matches-selector",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.matchesSelector=e()}})(window,function t(){"use strict";var n=function(){var t=window.Element.prototype;if(t.matches){return"matches"}if(t.matchesSelector){return"matchesSelector"}var e=["webkit","moz","ms","o"];for(var i=0;i<e.length;i++){var n=e[i];var s=n+"MatchesSelector";if(t[s]){return s}}}();return function t(e,i){return e[n](i)}});(function(e,i){if(typeof define=="function"&&define.amd){define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("desandro-matches-selector"))}else{e.fizzyUIUtils=i(e,e.matchesSelector)}})(window,function t(h,r){var c={};c.extend=function(t,e){for(var i in e){t[i]=e[i]}return t};c.modulo=function(t,e){return(t%e+e)%e};var i=Array.prototype.slice;c.makeArray=function(t){if(Array.isArray(t)){return t}if(t===null||t===undefined){return[]}var e=typeof t=="object"&&typeof t.length=="number";if(e){return i.call(t)}return[t]};c.removeFrom=function(t,e){var i=t.indexOf(e);if(i!=-1){t.splice(i,1)}};c.getParent=function(t,e){while(t.parentNode&&t!=document.body){t=t.parentNode;if(r(t,e)){return t}}};c.getQueryElement=function(t){if(typeof t=="string"){return document.querySelector(t)}return t};c.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};c.filterFindElements=function(t,n){t=c.makeArray(t);var s=[];t.forEach(function(t){if(!(t instanceof HTMLElement)){return}if(!n){s.push(t);return}if(r(t,n)){s.push(t)}var e=t.querySelectorAll(n);for(var i=0;i<e.length;i++){s.push(e[i])}});return s};c.debounceMethod=function(t,e,n){n=n||100;var s=t.prototype[e];var r=e+"Timeout";t.prototype[e]=function(){var t=this[r];clearTimeout(t);var e=arguments;var i=this;this[r]=setTimeout(function(){s.apply(i,e);delete i[r]},n)}};c.docReady=function(t){var e=document.readyState;if(e=="complete"||e=="interactive"){setTimeout(t)}else{document.addEventListener("DOMContentLoaded",t)}};c.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var u=h.console;c.htmlInit=function(a,l){c.docReady(function(){var t=c.toDashed(l);var s="data-"+t;var e=document.querySelectorAll("["+s+"]");var i=document.querySelectorAll(".js-"+t);var n=c.makeArray(e).concat(c.makeArray(i));var r=s+"-options";var o=h.jQuery;n.forEach(function(e){var t=e.getAttribute(s)||e.getAttribute(r);var i;try{i=t&&JSON.parse(t)}catch(t){if(u){u.error("Error parsing "+s+" on "+e.className+": "+t)}return}var n=new a(e,i);if(o){o.data(e,l,n)}})})};return c});(function(e,i){if(typeof define=="function"&&define.amd){define("flickity/js/cell",["get-size/get-size"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("get-size"))}else{e.Flickity=e.Flickity||{};e.Flickity.Cell=i(e,e.getSize)}})(window,function t(e,i){function n(t,e){this.element=t;this.parent=e;this.create()}var s=n.prototype;s.create=function(){this.element.style.position="absolute";this.element.setAttribute("aria-hidden","true");this.x=0;this.shift=0;this.element.style[this.parent.originSide]=0};s.destroy=function(){this.unselect();this.element.style.position="";var t=this.parent.originSide;this.element.style[t]="";this.element.style.transform="";this.element.removeAttribute("aria-hidden")};s.getSize=function(){this.size=i(this.element)};s.setPosition=function(t){this.x=t;this.updateTarget();this.renderPosition(t)};s.updateTarget=s.setDefaultTarget=function(){var t=this.parent.originSide=="left"?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign};s.renderPosition=function(t){var e=this.parent.originSide==="left"?1:-1;var i=this.parent.options.percentPosition?t*e*(this.parent.size.innerWidth/this.size.width):t*e;this.element.style.transform="translateX("+this.parent.getPositionValue(i)+")"};s.select=function(){this.element.classList.add("is-selected");this.element.removeAttribute("aria-hidden")};s.unselect=function(){this.element.classList.remove("is-selected");this.element.setAttribute("aria-hidden","true")};s.wrapShift=function(t){this.shift=t;this.renderPosition(this.x+this.parent.slideableWidth*t)};s.remove=function(){this.element.parentNode.removeChild(this.element)};return n});(function(t,e){if(typeof define=="function"&&define.amd){define("flickity/js/slide",e)}else if(typeof module=="object"&&module.exports){module.exports=e()}else{t.Flickity=t.Flickity||{};t.Flickity.Slide=e()}})(window,function t(){"use strict";function e(t){this.parent=t;this.isOriginLeft=t.originSide=="left";this.cells=[];this.outerWidth=0;this.height=0}var i=e.prototype;i.addCell=function(t){this.cells.push(t);this.outerWidth+=t.size.outerWidth;this.height=Math.max(t.size.outerHeight,this.height);if(this.cells.length==1){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}};i.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft";var e=this.getLastCell();var i=e?e.size[t]:0;var n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign};i.getLastCell=function(){return this.cells[this.cells.length-1]};i.select=function(){this.cells.forEach(function(t){t.select()})};i.unselect=function(){this.cells.forEach(function(t){t.unselect()})};i.getCellElements=function(){return this.cells.map(function(t){return t.element})};return e});(function(e,i){if(typeof define=="function"&&define.amd){define("flickity/js/animate",["fizzy-ui-utils/utils"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("fizzy-ui-utils"))}else{e.Flickity=e.Flickity||{};e.Flickity.animatePrototype=i(e,e.fizzyUIUtils)}})(window,function t(e,i){var n={};n.startAnimation=function(){if(this.isAnimating){return}this.isAnimating=true;this.restingFrames=0;this.animate()};n.animate=function(){this.applyDragForce();this.applySelectedAttraction();var t=this.x;this.integratePhysics();this.positionSlider();this.settle(t);if(this.isAnimating){var e=this;requestAnimationFrame(function t(){e.animate()})}};n.positionSlider=function(){var t=this.x;if(this.options.wrapAround&&this.cells.length>1){t=i.modulo(t,this.slideableWidth);t-=this.slideableWidth;this.shiftWrapCells(t)}this.setTranslateX(t,this.isAnimating);this.dispatchScrollEvent()};n.setTranslateX=function(t,e){t+=this.cursorPosition;t=this.options.rightToLeft?-t:t;var i=this.getPositionValue(t);this.slider.style.transform=e?"translate3d("+i+",0,0)":"translateX("+i+")"};n.dispatchScrollEvent=function(){var t=this.slides[0];if(!t){return}var e=-this.x-t.target;var i=e/this.slidesWidth;this.dispatchEvent("scroll",null,[i,e])};n.positionSliderAtSelected=function(){if(!this.cells.length){return}this.x=-this.selectedSlide.target;this.velocity=0;this.positionSlider()};n.getPositionValue=function(t){if(this.options.percentPosition){return Math.round(t/this.size.innerWidth*1e4)*.01+"%"}else{return Math.round(t)+"px"}};n.settle=function(t){var e=!this.isPointerDown&&Math.round(this.x*100)==Math.round(t*100);if(e){this.restingFrames++}if(this.restingFrames>2){this.isAnimating=false;delete this.isFreeScrolling;this.positionSlider();this.dispatchEvent("settle",null,[this.selectedIndex])}};n.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)};n._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n];var r=e>0?i:0;s.wrapShift(r);e-=s.size.outerWidth}};n._unshiftCells=function(t){if(!t||!t.length){return}for(var e=0;e<t.length;e++){t[e].wrapShift(0)}};n.integratePhysics=function(){this.x+=this.velocity;this.velocity*=this.getFrictionFactor()};n.applyForce=function(t){this.velocity+=t};n.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]};n.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())};n.applyDragForce=function(){if(!this.isDraggable||!this.isPointerDown){return}var t=this.dragX-this.x;var e=t-this.velocity;this.applyForce(e)};n.applySelectedAttraction=function(){var t=this.isDraggable&&this.isPointerDown;if(t||this.isFreeScrolling||!this.slides.length){return}var e=this.selectedSlide.target*-1-this.x;var i=e*this.options.selectedAttraction;this.applyForce(i)};return n});(function(o,a){if(typeof define=="function"&&define.amd){define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(t,e,i,n,s,r){return a(o,t,e,i,n,s,r)})}else if(typeof module=="object"&&module.exports){module.exports=a(o,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"))}else{var t=o.Flickity;o.Flickity=a(o,o.EvEmitter,o.getSize,o.fizzyUIUtils,t.Cell,t.Slide,t.animatePrototype)}})(window,function t(n,e,i,a,s,o,r){var l=n.jQuery;var h=n.getComputedStyle;var c=n.console;function u(t,e){t=a.makeArray(t);while(t.length){e.appendChild(t.shift())}}var d=0;var f={};function p(t,e){var i=a.getQueryElement(t);if(!i){if(c){c.error("Bad element for Flickity: "+(i||t))}return}this.element=i;if(this.element.flickityGUID){var n=f[this.element.flickityGUID];if(n)n.option(e);return n}if(l){this.$element=l(this.element)}this.options=a.extend({},this.constructor.defaults);this.option(e);this._create()}p.defaults={accessibility:true,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:true,percentPosition:true,resize:true,selectedAttraction:.025,setGallerySize:true};p.createMethods=[];var v=p.prototype;a.extend(v,e.prototype);v._create=function(){var t=this.guid=++d;this.element.flickityGUID=t;f[t]=this;this.selectedIndex=0;this.restingFrames=0;this.x=0;this.velocity=0;this.originSide=this.options.rightToLeft?"right":"left";this.viewport=document.createElement("div");this.viewport.className="flickity-viewport";this._createSlider();if(this.options.resize||this.options.watchCSS){n.addEventListener("resize",this)}for(var e in this.options.on){var i=this.options.on[e];this.on(e,i)}p.createMethods.forEach(function(t){this[t]()},this);if(this.options.watchCSS){this.watchCSS()}else{this.activate()}};v.option=function(t){a.extend(this.options,t)};v.activate=function(){if(this.isActive){return}this.isActive=true;this.element.classList.add("flickity-enabled");if(this.options.rightToLeft){this.element.classList.add("flickity-rtl")}this.getSize();var t=this._filterFindCellElements(this.element.children);u(t,this.slider);this.viewport.appendChild(this.slider);this.element.appendChild(this.viewport);this.reloadCells();if(this.options.accessibility){this.element.tabIndex=0;this.element.addEventListener("keydown",this)}this.emitEvent("activate");this.selectInitialIndex();this.isInitActivated=true;this.dispatchEvent("ready")};v._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider";t.style[this.originSide]=0;this.slider=t};v._filterFindCellElements=function(t){return a.filterFindElements(t,this.options.cellSelector)};v.reloadCells=function(){this.cells=this._makeCells(this.slider.children);this.positionCells();this._getWrapShiftCells();this.setGallerySize()};v._makeCells=function(t){var e=this._filterFindCellElements(t);var i=e.map(function(t){return new s(t,this)},this);return i};v.getLastCell=function(){return this.cells[this.cells.length-1]};v.getLastSlide=function(){return this.slides[this.slides.length-1]};v.positionCells=function(){this._sizeCells(this.cells);this._positionCells(0)};v._positionCells=function(t){t=t||0;this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}var n=this.cells.length;for(var s=t;s<n;s++){var r=this.cells[s];r.setPosition(e);e+=r.size.outerWidth;this.maxCellHeight=Math.max(r.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e;this.updateSlides();this._containSlides();this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0};v._sizeCells=function(t){t.forEach(function(t){t.getSize()})};v.updateSlides=function(){this.slides=[];if(!this.cells.length){return}var n=new o(this);this.slides.push(n);var t=this.originSide=="left";var s=t?"marginRight":"marginLeft";var r=this._getCanCellFit();this.cells.forEach(function(t,e){if(!n.cells.length){n.addCell(t);return}var i=n.outerWidth-n.firstMargin+(t.size.outerWidth-t.size[s]);if(r.call(this,e,i)){n.addCell(t)}else{n.updateTarget();n=new o(this);this.slides.push(n);n.addCell(t)}},this);n.updateTarget();this.updateSelectedSlide()};v._getCanCellFit=function(){var t=this.options.groupCells;if(!t){return function(){return false}}else if(typeof t=="number"){var e=parseInt(t,10);return function(t){return t%e!==0}}var i=typeof t=="string"&&t.match(/^(\d+)%$/);var n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}};v._init=v.reposition=function(){this.positionCells();this.positionSliderAtSelected()};v.getSize=function(){this.size=i(this.element);this.setCellAlign();this.cursorPosition=this.size.innerWidth*this.cellAlign};var g={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};v.setCellAlign=function(){var t=g[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign};v.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}};v._getWrapShiftCells=function(){if(!this.options.wrapAround){return}this._unshiftCells(this.beforeShiftCells);this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition;var e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1);t=this.size.innerWidth-this.cursorPosition;this.afterShiftCells=this._getGapCells(t,0,1)};v._getGapCells=function(t,e,i){var n=[];while(t>0){var s=this.cells[e];if(!s){break}n.push(s);e+=i;t-=s.size.outerWidth}return n};v._containSlides=function(){if(!this.options.contain||this.options.wrapAround||!this.cells.length){return}var t=this.options.rightToLeft;var e=t?"marginRight":"marginLeft";var i=t?"marginLeft":"marginRight";var n=this.slideableWidth-this.getLastCell().size[i];var s=n<this.size.innerWidth;var r=this.cursorPosition+this.cells[0].size[e];var o=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){if(s){t.target=n*this.cellAlign}else{t.target=Math.max(t.target,r);t.target=Math.min(t.target,o)}},this)};v.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;this.emitEvent(t,n);if(l&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var r=new l.Event(e);r.type=t;s=r}this.$element.trigger(s,i)}};v.select=function(t,e,i){if(!this.isActive){return}t=parseInt(t,10);this._wrapSelect(t);if(this.options.wrapAround||e){t=a.modulo(t,this.slides.length)}if(!this.slides[t]){return}var n=this.selectedIndex;this.selectedIndex=t;this.updateSelectedSlide();if(i){this.positionSliderAtSelected()}else{this.startAnimation()}if(this.options.adaptiveHeight){this.setGallerySize()}this.dispatchEvent("select",null,[t]);if(t!=n){this.dispatchEvent("change",null,[t])}this.dispatchEvent("cellSelect")};v._wrapSelect=function(t){var e=this.slides.length;var i=this.options.wrapAround&&e>1;if(!i){return t}var n=a.modulo(t,e);var s=Math.abs(n-this.selectedIndex);var r=Math.abs(n+e-this.selectedIndex);var o=Math.abs(n-e-this.selectedIndex);if(!this.isDragSelect&&r<s){t+=e}else if(!this.isDragSelect&&o<s){t-=e}if(t<0){this.x-=this.slideableWidth}else if(t>=e){this.x+=this.slideableWidth}};v.previous=function(t,e){this.select(this.selectedIndex-1,t,e)};v.next=function(t,e){this.select(this.selectedIndex+1,t,e)};v.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];if(!t){return}this.unselectSelectedSlide();this.selectedSlide=t;t.select();this.selectedCells=t.cells;this.selectedElements=t.getCellElements();this.selectedCell=t.cells[0];this.selectedElement=this.selectedElements[0]};v.unselectSelectedSlide=function(){if(this.selectedSlide){this.selectedSlide.unselect()}};v.selectInitialIndex=function(){var t=this.options.initialIndex;if(this.isInitActivated){this.select(this.selectedIndex,false,true);return}if(t&&typeof t=="string"){var e=this.queryCell(t);if(e){this.selectCell(t,false,true);return}}var i=0;if(t&&this.slides[t]){i=t}this.select(i,false,true)};v.selectCell=function(t,e,i){var n=this.queryCell(t);if(!n){return}var s=this.getCellSlideIndex(n);this.select(s,e,i)};v.getCellSlideIndex=function(t){for(var e=0;e<this.slides.length;e++){var i=this.slides[e];var n=i.cells.indexOf(t);if(n!=-1){return e}}};v.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t){return i}}};v.getCells=function(t){t=a.makeArray(t);var i=[];t.forEach(function(t){var e=this.getCell(t);if(e){i.push(e)}},this);return i};v.getCellElements=function(){return this.cells.map(function(t){return t.element})};v.getParentCell=function(t){var e=this.getCell(t);if(e){return e}t=a.getParent(t,".flickity-slider > *");return this.getCell(t)};v.getAdjacentCellElements=function(t,e){if(!t){return this.selectedSlide.getCellElements()}e=e===undefined?this.selectedIndex:e;var i=this.slides.length;if(1+t*2>=i){return this.getCellElements()}var n=[];for(var s=e-t;s<=e+t;s++){var r=this.options.wrapAround?a.modulo(s,i):s;var o=this.slides[r];if(o){n=n.concat(o.getCellElements())}}return n};v.queryCell=function(t){if(typeof t=="number"){return this.cells[t]}if(typeof t=="string"){if(t.match(/^[#.]?[\d/]/)){return}t=this.element.querySelector(t)}return this.getCell(t)};v.uiChange=function(){this.emitEvent("uiChange")};v.childUIPointerDown=function(t){if(t.type!="touchstart"){t.preventDefault()}this.focus()};v.onresize=function(){this.watchCSS();this.resize()};a.debounceMethod(p,"onresize",150);v.resize=function(){if(!this.isActive||this.isAnimating||this.isDragging){return}this.getSize();if(this.options.wrapAround){this.x=a.modulo(this.x,this.slideableWidth)}this.positionCells();this._getWrapShiftCells();this.setGallerySize();this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,false,true)};v.watchCSS=function(){var t=this.options.watchCSS;if(!t){return}var e=h(this.element,":after").content;if(e.indexOf("flickity")!=-1){this.activate()}else{this.deactivate()}};v.onkeydown=function(t){var e=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||e){return}var i=p.keyboardHandlers[t.keyCode];if(i){i.call(this)}};p.keyboardHandlers={37:function(){var t=this.options.rightToLeft?"next":"previous";this.uiChange();this[t]()},39:function(){var t=this.options.rightToLeft?"previous":"next";this.uiChange();this[t]()}};v.focus=function(){var t=n.pageYOffset;this.element.focus({preventScroll:true});if(n.pageYOffset!=t){n.scrollTo(n.pageXOffset,t)}};v.deactivate=function(){if(!this.isActive){return}this.element.classList.remove("flickity-enabled");this.element.classList.remove("flickity-rtl");this.unselectSelectedSlide();this.cells.forEach(function(t){t.destroy()});this.element.removeChild(this.viewport);u(this.slider.children,this.element);if(this.options.accessibility){this.element.removeAttribute("tabIndex");this.element.removeEventListener("keydown",this)}this.isActive=false;this.emitEvent("deactivate")};v.destroy=function(){this.deactivate();n.removeEventListener("resize",this);this.allOff();this.emitEvent("destroy");if(l&&this.$element){l.removeData(this.element,"flickity")}delete this.element.flickityGUID;delete f[this.guid]};a.extend(v,r);p.data=function(t){t=a.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]};a.htmlInit(p,"flickity");if(l&&l.bridget){l.bridget("flickity",p)}p.setJQuery=function(t){l=t};p.Cell=s;p.Slide=o;return p});
  /*!
   * Unipointer v2.4.0
   * base class for doing one thing with pointer event
   * MIT license
   */
  (function(e,i){if(typeof define=="function"&&define.amd){define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("ev-emitter"))}else{e.Unipointer=i(e,e.EvEmitter)}})(window,function t(s,e){function i(){}function n(){}var r=n.prototype=Object.create(e.prototype);r.bindStartEvent=function(t){this._bindStartEvent(t,true)};r.unbindStartEvent=function(t){this._bindStartEvent(t,false)};r._bindStartEvent=function(t,e){e=e===undefined?true:e;var i=e?"addEventListener":"removeEventListener";var n="mousedown";if("ontouchstart"in s){n="touchstart"}else if(s.PointerEvent){n="pointerdown"}t[i](n,this)};r.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};r.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier){return i}}};r.onmousedown=function(t){var e=t.button;if(e&&(e!==0&&e!==1)){return}this._pointerDown(t,t)};r.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])};r.onpointerdown=function(t){this._pointerDown(t,t)};r._pointerDown=function(t,e){if(t.button||this.isPointerDown){return}this.isPointerDown=true;this.pointerIdentifier=e.pointerId!==undefined?e.pointerId:e.identifier;this.pointerDown(t,e)};r.pointerDown=function(t,e){this._bindPostStartEvents(t);this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};r._bindPostStartEvents=function(t){if(!t){return}var e=o[t.type];e.forEach(function(t){s.addEventListener(t,this)},this);this._boundPointerEvents=e};r._unbindPostStartEvents=function(){if(!this._boundPointerEvents){return}this._boundPointerEvents.forEach(function(t){s.removeEventListener(t,this)},this);delete this._boundPointerEvents};r.onmousemove=function(t){this._pointerMove(t,t)};r.onpointermove=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerMove(t,t)}};r.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerMove(t,e)}};r._pointerMove=function(t,e){this.pointerMove(t,e)};r.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])};r.onmouseup=function(t){this._pointerUp(t,t)};r.onpointerup=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerUp(t,t)}};r.ontouchend=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerUp(t,e)}};r._pointerUp=function(t,e){this._pointerDone();this.pointerUp(t,e)};r.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])};r._pointerDone=function(){this._pointerReset();this._unbindPostStartEvents();this.pointerDone()};r._pointerReset=function(){this.isPointerDown=false;delete this.pointerIdentifier};r.pointerDone=i;r.onpointercancel=function(t){if(t.pointerId==this.pointerIdentifier){this._pointerCancel(t,t)}};r.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);if(e){this._pointerCancel(t,e)}};r._pointerCancel=function(t,e){this._pointerDone();this.pointerCancel(t,e)};r.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])};n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}};return n});
  /*!
   * Unidragger v2.4.0
   * Draggable base class
   * MIT license
   */
  (function(e,i){if(typeof define=="function"&&define.amd){define("unidragger/unidragger",["unipointer/unipointer"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("unipointer"))}else{e.Unidragger=i(e,e.Unipointer)}})(window,function t(r,e){function i(){}var n=i.prototype=Object.create(e.prototype);n.bindHandles=function(){this._bindHandles(true)};n.unbindHandles=function(){this._bindHandles(false)};n._bindHandles=function(t){t=t===undefined?true:t;var e=t?"addEventListener":"removeEventListener";var i=t?this._touchActionValue:"";for(var n=0;n<this.handles.length;n++){var s=this.handles[n];this._bindStartEvent(s,t);s[e]("click",this);if(r.PointerEvent){s.style.touchAction=i}}};n._touchActionValue="none";n.pointerDown=function(t,e){var i=this.okayPointerDown(t);if(!i){return}this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY};t.preventDefault();this.pointerDownBlur();this._bindPostStartEvents(t);this.emitEvent("pointerDown",[t,e])};var s={TEXTAREA:true,INPUT:true,SELECT:true,OPTION:true};var o={radio:true,checkbox:true,button:true,submit:true,image:true,file:true};n.okayPointerDown=function(t){var e=s[t.target.nodeName];var i=o[t.target.type];var n=!e||i;if(!n){this._pointerReset()}return n};n.pointerDownBlur=function(){var t=document.activeElement;var e=t&&t.blur&&t!=document.body;if(e){t.blur()}};n.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]);this._dragMove(t,e,i)};n._dragPointerMove=function(t,e){var i={x:e.pageX-this.pointerDownPointer.pageX,y:e.pageY-this.pointerDownPointer.pageY};if(!this.isDragging&&this.hasDragStarted(i)){this._dragStart(t,e)}return i};n.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3};n.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]);this._dragPointerUp(t,e)};n._dragPointerUp=function(t,e){if(this.isDragging){this._dragEnd(t,e)}else{this._staticClick(t,e)}};n._dragStart=function(t,e){this.isDragging=true;this.isPreventingClicks=true;this.dragStart(t,e)};n.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])};n._dragMove=function(t,e,i){if(!this.isDragging){return}this.dragMove(t,e,i)};n.dragMove=function(t,e,i){t.preventDefault();this.emitEvent("dragMove",[t,e,i])};n._dragEnd=function(t,e){this.isDragging=false;setTimeout(function(){delete this.isPreventingClicks}.bind(this));this.dragEnd(t,e)};n.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])};n.onclick=function(t){if(this.isPreventingClicks){t.preventDefault()}};n._staticClick=function(t,e){if(this.isIgnoringMouseUp&&t.type=="mouseup"){return}this.staticClick(t,e);if(t.type!="mouseup"){this.isIgnoringMouseUp=true;setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)}};n.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])};i.getPointerPoint=e.getPointerPoint;return i});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unidragger"),require("fizzy-ui-utils"))}else{n.Flickity=s(n,n.Flickity,n.Unidragger,n.fizzyUIUtils)}})(window,function t(n,e,i,a){a.extend(e.defaults,{draggable:">1",dragThreshold:3});e.createMethods.push("_createDrag");var s=e.prototype;a.extend(s,i.prototype);s._touchActionValue="pan-y";s._createDrag=function(){this.on("activate",this.onActivateDrag);this.on("uiChange",this._uiChangeDrag);this.on("deactivate",this.onDeactivateDrag);this.on("cellChange",this.updateDraggable)};s.onActivateDrag=function(){this.handles=[this.viewport];this.bindHandles();this.updateDraggable()};s.onDeactivateDrag=function(){this.unbindHandles();this.element.classList.remove("is-draggable")};s.updateDraggable=function(){if(this.options.draggable==">1"){this.isDraggable=this.slides.length>1}else{this.isDraggable=this.options.draggable}if(this.isDraggable){this.element.classList.add("is-draggable")}else{this.element.classList.remove("is-draggable")}};s.bindDrag=function(){this.options.draggable=true;this.updateDraggable()};s.unbindDrag=function(){this.options.draggable=false;this.updateDraggable()};s._uiChangeDrag=function(){delete this.isFreeScrolling};s.pointerDown=function(t,e){if(!this.isDraggable){this._pointerDownDefault(t,e);return}var i=this.okayPointerDown(t);if(!i){return}this._pointerDownPreventDefault(t);this.pointerDownFocus(t);if(document.activeElement!=this.element){this.pointerDownBlur()}this.dragX=this.x;this.viewport.classList.add("is-pointer-down");this.pointerDownScroll=o();n.addEventListener("scroll",this);this._pointerDownDefault(t,e)};s._pointerDownDefault=function(t,e){this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY};this._bindPostStartEvents(t);this.dispatchEvent("pointerDown",t,[e])};var r={INPUT:true,TEXTAREA:true,SELECT:true};s.pointerDownFocus=function(t){var e=r[t.target.nodeName];if(!e){this.focus()}};s._pointerDownPreventDefault=function(t){var e=t.type=="touchstart";var i=t.pointerType=="touch";var n=r[t.target.nodeName];if(!e&&!i&&!n){t.preventDefault()}};s.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold};s.pointerUp=function(t,e){delete this.isTouchScrolling;this.viewport.classList.remove("is-pointer-down");this.dispatchEvent("pointerUp",t,[e]);this._dragPointerUp(t,e)};s.pointerDone=function(){n.removeEventListener("scroll",this);delete this.pointerDownScroll};s.dragStart=function(t,e){if(!this.isDraggable){return}this.dragStartPosition=this.x;this.startAnimation();n.removeEventListener("scroll",this);this.dispatchEvent("dragStart",t,[e])};s.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]);this._dragMove(t,e,i)};s.dragMove=function(t,e,i){if(!this.isDraggable){return}t.preventDefault();this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1;if(this.options.wrapAround){i.x%=this.slideableWidth}var s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var r=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>r?(s+r)*.5:s;var o=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<o?(s+o)*.5:s}this.dragX=s;this.dragMoveTime=new Date;this.dispatchEvent("dragMove",t,[e,i])};s.dragEnd=function(t,e){if(!this.isDraggable){return}if(this.options.freeScroll){this.isFreeScrolling=true}var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else if(!this.options.freeScroll&&i==this.selectedIndex){i+=this.dragEndBoostSelect()}delete this.previousDragX;this.isDragSelect=this.options.wrapAround;this.select(i);delete this.isDragSelect;this.dispatchEvent("dragEnd",t,[e])};s.dragEndRestingSelect=function(){var t=this.getRestingPosition();var e=Math.abs(this.getSlideDistance(-t,this.selectedIndex));var i=this._getClosestResting(t,e,1);var n=this._getClosestResting(t,e,-1);var s=i.distance<n.distance?i.index:n.index;return s};s._getClosestResting=function(t,e,i){var n=this.selectedIndex;var s=Infinity;var r=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};while(r(e,s)){n+=i;s=e;e=this.getSlideDistance(-t,n);if(e===null){break}e=Math.abs(e)}return{distance:s,index:n-i}};s.getSlideDistance=function(t,e){var i=this.slides.length;var n=this.options.wrapAround&&i>1;var s=n?a.modulo(e,i):e;var r=this.slides[s];if(!r){return null}var o=n?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+o)};s.dragEndBoostSelect=function(){if(this.previousDragX===undefined||!this.dragMoveTime||new Date-this.dragMoveTime>100){return 0}var t=this.getSlideDistance(-this.dragX,this.selectedIndex);var e=this.previousDragX-this.dragX;if(t>0&&e>0){return 1}else if(t<0&&e<0){return-1}return 0};s.staticClick=function(t,e){var i=this.getParentCell(t.target);var n=i&&i.element;var s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])};s.onscroll=function(){var t=o();var e=this.pointerDownScroll.x-t.x;var i=this.pointerDownScroll.y-t.y;if(Math.abs(e)>3||Math.abs(i)>3){this._pointerDone()}};function o(){return{x:n.pageXOffset,y:n.pageYOffset}}return e});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/prev-next-button",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils"))}else{s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}})(window,function t(e,i,n,s){"use strict";var r="http://www.w3.org/2000/svg";function o(t,e){this.direction=t;this.parent=e;this._create()}o.prototype=Object.create(n.prototype);o.prototype._create=function(){this.isEnabled=true;this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-button flickity-prev-next-button";e.className+=this.isPrevious?" previous":" next";e.setAttribute("type","button");this.disable();e.setAttribute("aria-label",this.isPrevious?"Previous":"Next");var i=this.createSVG();e.appendChild(i);this.parent.on("select",this.update.bind(this));this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))};o.prototype.activate=function(){this.bindStartEvent(this.element);this.element.addEventListener("click",this);this.parent.element.appendChild(this.element)};o.prototype.deactivate=function(){this.parent.element.removeChild(this.element);this.unbindStartEvent(this.element);this.element.removeEventListener("click",this)};o.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("class","flickity-button-icon");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path");var i=a(this.parent.options.arrowShape);e.setAttribute("d",i);e.setAttribute("class","arrow");if(!this.isLeft){e.setAttribute("transform","translate(100, 100) rotate(180) ")}t.appendChild(e);return t};function a(t){if(typeof t=="string"){return t}return"M "+t.x0+",50"+" L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50 "+" L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}o.prototype.handleEvent=s.handleEvent;o.prototype.onclick=function(){if(!this.isEnabled){return}this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()};o.prototype.enable=function(){if(this.isEnabled){return}this.element.disabled=false;this.isEnabled=true};o.prototype.disable=function(){if(!this.isEnabled){return}this.element.disabled=true;this.isEnabled=false};o.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1){this.enable();return}var e=t.length?t.length-1:0;var i=this.isPrevious?0:e;var n=this.parent.selectedIndex==i?"disable":"enable";this[n]()};o.prototype.destroy=function(){this.deactivate();this.allOff()};s.extend(i.defaults,{prevNextButtons:true,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}});i.createMethods.push("_createPrevNextButtons");var l=i.prototype;l._createPrevNextButtons=function(){if(!this.options.prevNextButtons){return}this.prevButton=new o(-1,this);this.nextButton=new o(1,this);this.on("activate",this.activatePrevNextButtons)};l.activatePrevNextButtons=function(){this.prevButton.activate();this.nextButton.activate();this.on("deactivate",this.deactivatePrevNextButtons)};l.deactivatePrevNextButtons=function(){this.prevButton.deactivate();this.nextButton.deactivate();this.off("deactivate",this.deactivatePrevNextButtons)};i.PrevNextButton=o;return i});(function(n,s){if(typeof define=="function"&&define.amd){define("flickity/js/page-dots",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils"))}else{s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}})(window,function t(e,i,n,s){function r(t){this.parent=t;this._create()}r.prototype=Object.create(n.prototype);r.prototype._create=function(){this.holder=document.createElement("ol");this.holder.className="flickity-page-dots";this.dots=[];this.handleClick=this.onClick.bind(this);this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))};r.prototype.activate=function(){this.setDots();this.holder.addEventListener("click",this.handleClick);this.bindStartEvent(this.holder);this.parent.element.appendChild(this.holder)};r.prototype.deactivate=function(){this.holder.removeEventListener("click",this.handleClick);this.unbindStartEvent(this.holder);this.parent.element.removeChild(this.holder)};r.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;if(t>0){this.addDots(t)}else if(t<0){this.removeDots(-t)}};r.prototype.addDots=function(t){var e=document.createDocumentFragment();var i=[];var n=this.dots.length;var s=n+t;for(var r=n;r<s;r++){var o=document.createElement("li");o.className="dot";o.setAttribute("aria-label","Page dot "+(r+1));e.appendChild(o);i.push(o)}this.holder.appendChild(e);this.dots=this.dots.concat(i)};r.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)};r.prototype.updateSelected=function(){if(this.selectedDot){this.selectedDot.className="dot";this.selectedDot.removeAttribute("aria-current")}if(!this.dots.length){return}this.selectedDot=this.dots[this.parent.selectedIndex];this.selectedDot.className="dot is-selected";this.selectedDot.setAttribute("aria-current","step")};r.prototype.onTap=r.prototype.onClick=function(t){var e=t.target;if(e.nodeName!="LI"){return}this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)};r.prototype.destroy=function(){this.deactivate();this.allOff()};i.PageDots=r;s.extend(i.defaults,{pageDots:true});i.createMethods.push("_createPageDots");var o=i.prototype;o._createPageDots=function(){if(!this.options.pageDots){return}this.pageDots=new r(this);this.on("activate",this.activatePageDots);this.on("select",this.updateSelectedPageDots);this.on("cellChange",this.updatePageDots);this.on("resize",this.updatePageDots);this.on("deactivate",this.deactivatePageDots)};o.activatePageDots=function(){this.pageDots.activate()};o.updateSelectedPageDots=function(){this.pageDots.updateSelected()};o.updatePageDots=function(){this.pageDots.setDots()};o.deactivatePageDots=function(){this.pageDots.deactivate()};i.PageDots=r;return i});(function(t,n){if(typeof define=="function"&&define.amd){define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,e,i){return n(t,e,i)})}else if(typeof module=="object"&&module.exports){module.exports=n(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity"))}else{n(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}})(window,function t(e,i,n){function s(t){this.parent=t;this.state="stopped";this.onVisibilityChange=this.visibilityChange.bind(this);this.onVisibilityPlay=this.visibilityPlay.bind(this)}s.prototype=Object.create(e.prototype);s.prototype.play=function(){if(this.state=="playing"){return}var t=document.hidden;if(t){document.addEventListener("visibilitychange",this.onVisibilityPlay);return}this.state="playing";document.addEventListener("visibilitychange",this.onVisibilityChange);this.tick()};s.prototype.tick=function(){if(this.state!="playing"){return}var t=this.parent.options.autoPlay;t=typeof t=="number"?t:3e3;var e=this;this.clear();this.timeout=setTimeout(function(){e.parent.next(true);e.tick()},t)};s.prototype.stop=function(){this.state="stopped";this.clear();document.removeEventListener("visibilitychange",this.onVisibilityChange)};s.prototype.clear=function(){clearTimeout(this.timeout)};s.prototype.pause=function(){if(this.state=="playing"){this.state="paused";this.clear()}};s.prototype.unpause=function(){if(this.state=="paused"){this.play()}};s.prototype.visibilityChange=function(){var t=document.hidden;this[t?"pause":"unpause"]()};s.prototype.visibilityPlay=function(){this.play();document.removeEventListener("visibilitychange",this.onVisibilityPlay)};i.extend(n.defaults,{pauseAutoPlayOnHover:true});n.createMethods.push("_createPlayer");var r=n.prototype;r._createPlayer=function(){this.player=new s(this);this.on("activate",this.activatePlayer);this.on("uiChange",this.stopPlayer);this.on("pointerDown",this.stopPlayer);this.on("deactivate",this.deactivatePlayer)};r.activatePlayer=function(){if(!this.options.autoPlay){return}this.player.play();this.element.addEventListener("mouseenter",this)};r.playPlayer=function(){this.player.play()};r.stopPlayer=function(){this.player.stop()};r.pausePlayer=function(){this.player.pause()};r.unpausePlayer=function(){this.player.unpause()};r.deactivatePlayer=function(){this.player.stop();this.element.removeEventListener("mouseenter",this)};r.onmouseenter=function(){if(!this.options.pauseAutoPlayOnHover){return}this.player.pause();this.element.addEventListener("mouseleave",this)};r.onmouseleave=function(){this.player.unpause();this.element.removeEventListener("mouseleave",this)};n.Player=s;return n});(function(i,n){if(typeof define=="function"&&define.amd){define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("./flickity"),require("fizzy-ui-utils"))}else{n(i,i.Flickity,i.fizzyUIUtils)}})(window,function t(e,i,n){function l(t){var e=document.createDocumentFragment();t.forEach(function(t){e.appendChild(t.element)});return e}var s=i.prototype;s.insert=function(t,e){var i=this._makeCells(t);if(!i||!i.length){return}var n=this.cells.length;e=e===undefined?n:e;var s=l(i);var r=e==n;if(r){this.slider.appendChild(s)}else{var o=this.cells[e].element;this.slider.insertBefore(s,o)}if(e===0){this.cells=i.concat(this.cells)}else if(r){this.cells=this.cells.concat(i)}else{var a=this.cells.splice(e,n-e);this.cells=this.cells.concat(i).concat(a)}this._sizeCells(i);this.cellChange(e,true)};s.append=function(t){this.insert(t,this.cells.length)};s.prepend=function(t){this.insert(t,0)};s.remove=function(t){var e=this.getCells(t);if(!e||!e.length){return}var i=this.cells.length-1;e.forEach(function(t){t.remove();var e=this.cells.indexOf(t);i=Math.min(e,i);n.removeFrom(this.cells,t)},this);this.cellChange(i,true)};s.cellSizeChange=function(t){var e=this.getCell(t);if(!e){return}e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)};s.cellChange=function(t,e){var i=this.selectedElement;this._positionCells(t);this._getWrapShiftCells();this.setGallerySize();var n=this.getCell(i);if(n){this.selectedIndex=this.getCellSlideIndex(n)}this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex);this.emitEvent("cellChange",[t]);this.select(this.selectedIndex);if(e){this.positionSliderAtSelected()}};return i});(function(i,n){if(typeof define=="function"&&define.amd){define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("./flickity"),require("fizzy-ui-utils"))}else{n(i,i.Flickity,i.fizzyUIUtils)}})(window,function t(e,i,o){"use strict";i.createMethods.push("_createLazyload");var n=i.prototype;n._createLazyload=function(){this.on("select",this.lazyLoad)};n.lazyLoad=function(){var t=this.options.lazyLoad;if(!t){return}var e=typeof t=="number"?t:0;var i=this.getAdjacentCellElements(e);var n=[];i.forEach(function(t){var e=s(t);n=n.concat(e)});n.forEach(function(t){new r(t,this)},this)};function s(t){if(t.nodeName=="IMG"){var e=t.getAttribute("data-flickity-lazyload");var i=t.getAttribute("data-flickity-lazyload-src");var n=t.getAttribute("data-flickity-lazyload-srcset");if(e||i||n){return[t]}}var s="img[data-flickity-lazyload], "+"img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]";var r=t.querySelectorAll(s);return o.makeArray(r)}function r(t,e){this.img=t;this.flickity=e;this.load()}r.prototype.handleEvent=o.handleEvent;r.prototype.load=function(){this.img.addEventListener("load",this);this.img.addEventListener("error",this);var t=this.img.getAttribute("data-flickity-lazyload")||this.img.getAttribute("data-flickity-lazyload-src");var e=this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src=t;if(e){this.img.setAttribute("srcset",e)}this.img.removeAttribute("data-flickity-lazyload");this.img.removeAttribute("data-flickity-lazyload-src");this.img.removeAttribute("data-flickity-lazyload-srcset")};r.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")};r.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")};r.prototype.complete=function(t,e){this.img.removeEventListener("load",this);this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img);var n=i&&i.element;this.flickity.cellSizeChange(n);this.img.classList.add(e);this.flickity.dispatchEvent("lazyLoad",t,n)};i.LazyLoader=r;return i});
  /*!
   * Flickity v2.3.0
   * Touch, responsive, flickable carousels
   *
   * Licensed GPLv3 for open source use
   * or Flickity Commercial License for commercial use
   *
   * https://flickity.metafizzy.co
   * Copyright 2015-2021 Metafizzy
   */
  (function(t,e){if(typeof define=="function"&&define.amd){define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e)}else if(typeof module=="object"&&module.exports){module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload"))}})(window,function t(e){return e});
  /*!
   * Flickity asNavFor v2.0.2
   * enable asNavFor for Flickity
   */
  (function(t,e){if(typeof define=="function"&&define.amd){define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e)}else if(typeof module=="object"&&module.exports){module.exports=e(require("flickity"),require("fizzy-ui-utils"))}else{t.Flickity=e(t.Flickity,t.fizzyUIUtils)}})(window,function t(n,s){n.createMethods.push("_createAsNavFor");var e=n.prototype;e._createAsNavFor=function(){this.on("activate",this.activateAsNavFor);this.on("deactivate",this.deactivateAsNavFor);this.on("destroy",this.destroyAsNavFor);var e=this.options.asNavFor;if(!e){return}var i=this;setTimeout(function t(){i.setNavCompanion(e)})};e.setNavCompanion=function(t){t=s.getQueryElement(t);var e=n.data(t);if(!e||e==this){return}this.navCompanion=e;var i=this;this.onNavCompanionSelect=function(){i.navCompanionSelect()};e.on("select",this.onNavCompanionSelect);this.on("staticClick",this.onNavStaticClick);this.navCompanionSelect(true)};e.navCompanionSelect=function(t){var e=this.navCompanion&&this.navCompanion.selectedCells;if(!e){return}var i=e[0];var n=this.navCompanion.cells.indexOf(i);var s=n+e.length-1;var r=Math.floor(a(n,s,this.navCompanion.cellAlign));this.selectCell(r,false,t);this.removeNavSelectedElements();if(r>=this.cells.length){return}var o=this.cells.slice(n,s+1);this.navSelectedElements=o.map(function(t){return t.element});this.changeNavSelectedClass("add")};function a(t,e,i){return(e-t)*i+t}e.changeNavSelectedClass=function(e){this.navSelectedElements.forEach(function(t){t.classList[e]("is-nav-selected")})};e.activateAsNavFor=function(){this.navCompanionSelect(true)};e.removeNavSelectedElements=function(){if(!this.navSelectedElements){return}this.changeNavSelectedClass("remove");delete this.navSelectedElements};e.onNavStaticClick=function(t,e,i,n){if(typeof n=="number"){this.navCompanion.selectCell(n)}};e.deactivateAsNavFor=function(){this.removeNavSelectedElements()};e.destroyAsNavFor=function(){if(!this.navCompanion){return}this.navCompanion.off("select",this.onNavCompanionSelect);this.off("staticClick",this.onNavStaticClick);delete this.navCompanion};return n});
  /*!
   * imagesLoaded v4.1.4
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */
  (function(e,i){"use strict";if(typeof define=="function"&&define.amd){define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(t){return i(e,t)})}else if(typeof module=="object"&&module.exports){module.exports=i(e,require("ev-emitter"))}else{e.imagesLoaded=i(e,e.EvEmitter)}})(typeof window!=="undefined"?window:this,function t(e,i){var s=e.jQuery;var r=e.console;function o(t,e){for(var i in e){t[i]=e[i]}return t}var n=Array.prototype.slice;function a(t){if(Array.isArray(t)){return t}var e=typeof t=="object"&&typeof t.length=="number";if(e){return n.call(t)}return[t]}function l(t,e,i){if(!(this instanceof l)){return new l(t,e,i)}var n=t;if(typeof t=="string"){n=document.querySelectorAll(t)}if(!n){r.error("Bad element for imagesLoaded "+(n||t));return}this.elements=a(n);this.options=o({},this.options);if(typeof e=="function"){i=e}else{o(this.options,e)}if(i){this.on("always",i)}this.getImages();if(s){this.jqDeferred=new s.Deferred}setTimeout(this.check.bind(this))}l.prototype=Object.create(i.prototype);l.prototype.options={};l.prototype.getImages=function(){this.images=[];this.elements.forEach(this.addElementImages,this)};l.prototype.addElementImages=function(t){if(t.nodeName=="IMG"){this.addImage(t)}if(this.options.background===true){this.addElementBackgroundImages(t)}var e=t.nodeType;if(!e||!h[e]){return}var i=t.querySelectorAll("img");for(var n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if(typeof this.options.background=="string"){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var o=r[n];this.addElementBackgroundImages(o)}}};var h={1:true,9:true,11:true};l.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(!e){return}var i=/url\((['"])?(.*?)\1\)/gi;var n=i.exec(e.backgroundImage);while(n!==null){var s=n&&n[2];if(s){this.addBackground(s,t)}n=i.exec(e.backgroundImage)}};l.prototype.addImage=function(t){var e=new c(t);this.images.push(e)};l.prototype.addBackground=function(t,e){var i=new u(t,e);this.images.push(i)};l.prototype.check=function(){var n=this;this.progressedCount=0;this.hasAnyBroken=false;if(!this.images.length){this.complete();return}function e(t,e,i){setTimeout(function(){n.progress(t,e,i)})}this.images.forEach(function(t){t.once("progress",e);t.check()})};l.prototype.progress=function(t,e,i){this.progressedCount++;this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;this.emitEvent("progress",[this,t,e]);if(this.jqDeferred&&this.jqDeferred.notify){this.jqDeferred.notify(this,t)}if(this.progressedCount==this.images.length){this.complete()}if(this.options.debug&&r){r.log("progress: "+i,t,e)}};l.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";this.isComplete=true;this.emitEvent(t,[this]);this.emitEvent("always",[this]);if(this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}};function c(t){this.img=t}c.prototype=Object.create(i.prototype);c.prototype.check=function(){var t=this.getIsImageComplete();if(t){this.confirm(this.img.naturalWidth!==0,"naturalWidth");return}this.proxyImage=new Image;this.proxyImage.addEventListener("load",this);this.proxyImage.addEventListener("error",this);this.img.addEventListener("load",this);this.img.addEventListener("error",this);this.proxyImage.src=this.img.src};c.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth};c.prototype.confirm=function(t,e){this.isLoaded=t;this.emitEvent("progress",[this,this.img,e])};c.prototype.handleEvent=function(t){var e="on"+t.type;if(this[e]){this[e](t)}};c.prototype.onload=function(){this.confirm(true,"onload");this.unbindEvents()};c.prototype.onerror=function(){this.confirm(false,"onerror");this.unbindEvents()};c.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this);this.proxyImage.removeEventListener("error",this);this.img.removeEventListener("load",this);this.img.removeEventListener("error",this)};function u(t,e){this.url=t;this.element=e;this.img=new Image}u.prototype=Object.create(c.prototype);u.prototype.check=function(){this.img.addEventListener("load",this);this.img.addEventListener("error",this);this.img.src=this.url;var t=this.getIsImageComplete();if(t){this.confirm(this.img.naturalWidth!==0,"naturalWidth");this.unbindEvents()}};u.prototype.unbindEvents=function(){this.img.removeEventListener("load",this);this.img.removeEventListener("error",this)};u.prototype.confirm=function(t,e){this.isLoaded=t;this.emitEvent("progress",[this,this.element,e])};l.makeJQueryPlugin=function(t){t=t||e.jQuery;if(!t){return}s=t;s.fn.imagesLoaded=function(t,e){var i=new l(this,t,e);return i.jqDeferred.promise(s(this))}};l.makeJQueryPlugin();return l});
  /*!
   * Flickity imagesLoaded v2.0.0
   * enables imagesLoaded option for Flickity
   */
  (function(i,n){if(typeof define=="function"&&define.amd){define(["flickity/js/index","imagesloaded/imagesloaded"],function(t,e){return n(i,t,e)})}else if(typeof module=="object"&&module.exports){module.exports=n(i,require("flickity"),require("imagesloaded"))}else{i.Flickity=n(i,i.Flickity,i.imagesLoaded)}})(window,function t(e,i,s){"use strict";i.createMethods.push("_createImagesLoaded");var n=i.prototype;n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)};n.imagesLoaded=function(){if(!this.options.imagesLoaded){return}var n=this;function t(t,e){var i=n.getParentCell(e.img);n.cellSizeChange(i&&i.element);if(!n.options.freeScroll){n.positionSliderAtSelected()}}s(this.slider).on("progress",t)};return i});
  /**
   * Flickity fade v1.0.0
   * Fade between Flickity slides
   */

  /* jshint browser: true, undef: true, unused: true */

  !function(e,t){"function"==typeof define&&define.amd?define(["flickity/js/index","fizzy-ui-utils/utils"],t):"object"==typeof module&&module.exports?module.exports=t(require("flickity"),require("fizzy-ui-utils")):t(e.Flickity,e.fizzyUIUtils)}(this,(function(e,t){var i=e.Slide,s=i.prototype.updateTarget;i.prototype.updateTarget=function(){if(s.apply(this,arguments),this.parent.options.fade){var e=this.target-this.x,t=this.cells[0].x;this.cells.forEach((function(i){var s=i.x-t-e;i.renderPosition(s)}))}},i.prototype.setOpacity=function(e){this.cells.forEach((function(t){t.element.style.opacity=e}))};var a=e.prototype;e.createMethods.push("_createFade"),a._createFade=function(){this.fadeIndex=this.selectedIndex,this.prevSelectedIndex=this.selectedIndex,this.on("select",this.onSelectFade),this.on("dragEnd",this.onDragEndFade),this.on("settle",this.onSettleFade),this.on("activate",this.onActivateFade),this.on("deactivate",this.onDeactivateFade)};var n=a.updateSlides;a.updateSlides=function(){n.apply(this,arguments),this.options.fade&&this.slides.forEach((function(e,t){var i=t==this.selectedIndex?1:0;e.setOpacity(i)}),this)},a.onSelectFade=function(){this.fadeIndex=Math.min(this.prevSelectedIndex,this.slides.length-1),this.prevSelectedIndex=this.selectedIndex},a.onSettleFade=function(){(delete this.didDragEnd,this.options.fade)&&(this.selectedSlide.setOpacity(1),this.slides[this.fadeIndex]&&this.fadeIndex!=this.selectedIndex&&this.slides[this.fadeIndex].setOpacity(0))},a.onDragEndFade=function(){this.didDragEnd=!0},a.onActivateFade=function(){this.options.fade&&this.element.classList.add("is-fade")},a.onDeactivateFade=function(){this.options.fade&&(this.element.classList.remove("is-fade"),this.slides.forEach((function(e){e.setOpacity("")})))};var d=a.positionSlider;a.positionSlider=function(){this.options.fade?(this.fadeSlides(),this.dispatchScrollEvent()):d.apply(this,arguments)};var h=a.positionSliderAtSelected;a.positionSliderAtSelected=function(){this.options.fade&&this.setTranslateX(0),h.apply(this,arguments)},a.fadeSlides=function(){if(!(this.slides.length<2)){var e=this.getFadeIndexes(),t=this.slides[e.a],i=this.slides[e.b],s=this.wrapDifference(t.target,i.target),a=this.wrapDifference(t.target,-this.x);a=Math.abs(a/s),t.setOpacity(1-a),i.setOpacity(a);var n=e.a;this.isDragging&&(n=a>.5?e.a:e.b),null!=this.fadeHideIndex&&this.fadeHideIndex!=n&&this.fadeHideIndex!=e.a&&this.fadeHideIndex!=e.b&&this.slides[this.fadeHideIndex].setOpacity(0),this.fadeHideIndex=n}},a.getFadeIndexes=function(){return this.isDragging||this.didDragEnd?this.options.wrapAround?this.getFadeDragWrapIndexes():this.getFadeDragLimitIndexes():{a:this.fadeIndex,b:this.selectedIndex}},a.getFadeDragWrapIndexes=function(){var e=this.slides.map((function(e,t){return this.getSlideDistance(-this.x,t)}),this),i=e.map((function(e){return Math.abs(e)})),s=Math.min.apply(Math,i),a=i.indexOf(s),n=e[a],d=this.slides.length,h=n>=0?1:-1;return{a:a,b:t.modulo(a+h,d)}},a.getFadeDragLimitIndexes=function(){for(var e=0,t=0;t<this.slides.length-1;t++){var i=this.slides[t];if(-this.x<i.target)break;e=t}return{a:e,b:e+1}},a.wrapDifference=function(e,t){var i=t-e;if(!this.options.wrapAround)return i;var s=i+this.slideableWidth,a=i-this.slideableWidth;return Math.abs(s)<Math.abs(i)&&(i=s),Math.abs(a)<Math.abs(i)&&(i=a),i};var o=a._getWrapShiftCells;a._getWrapShiftCells=function(){this.options.fade||o.apply(this,arguments)};var r=a.shiftWrapCells;return a.shiftWrapCells=function(){this.options.fade||r.apply(this,arguments)},e}));

  /*!
 * Flickity sync v2.0.0
 * enable sync for Flickity
 */

  /*jshint browser: true, undef: true, unused: true, strict: true*/

  !function(t,n){"function"==typeof define&&define.amd?define(["flickity/js/index","fizzy-ui-utils/utils"],n):"object"==typeof module&&module.exports?module.exports=n(require("flickity"),require("fizzy-ui-utils")):t.Flickity=n(t.Flickity,t.fizzyUIUtils)}(window,function(t,n){"use strict";return t.createMethods.push("_createSync"),t.prototype._createSync=function(){this.syncers={};var t=this.options.sync;if(this.on("destroy",this.unsyncAll),t){var n=this;setTimeout(function(){n.sync(t)})}},t.prototype.sync=function(i){i=n.getQueryElement(i);var e=t.data(i);e&&(this._syncCompanion(e),e._syncCompanion(this))},t.prototype._syncCompanion=function(t){var n=this;function i(){var i=n.selectedIndex;t.selectedIndex!=i&&t.select(i)}this.on("select",i),this.syncers[t.guid]={flickity:t,listener:i}},t.prototype.unsync=function(i){i=n.getQueryElement(i);var e=t.data(i);this._unsync(e)},t.prototype._unsync=function(t){t&&(this._unsyncCompanion(t),t._unsyncCompanion(this))},t.prototype._unsyncCompanion=function(t){var n=t.guid,i=this.syncers[n];this.off("select",i.listener),delete this.syncers[n]},t.prototype.unsyncAll=function(){for(var t in this.syncers){var n=this.syncers[t];this._unsync(n.flickity)}},t});

})();

(function vendorPhotoSwipe(){
  /*! PhotoSwipe - v4.1.3 - 2019-01-08
  * http://photoswipe.com
  * Copyright (c) 2019 Dmitry Semenov; */
  !function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipe=b()}(this,function(){"use strict";var a=function(a,b,c,d){var e={features:null,bind:function(a,b,c,d){var e=(d?"remove":"add")+"EventListener";b=b.split(" ");for(var f=0;f<b.length;f++)b[f]&&a[e](b[f],c,!1)},isArray:function(a){return a instanceof Array},createEl:function(a,b){var c=document.createElement(b||"div");return a&&(c.className=a),c},getScrollY:function(){var a=window.pageYOffset;return void 0!==a?a:document.documentElement.scrollTop},unbind:function(a,b,c){e.bind(a,b,c,!0)},removeClass:function(a,b){var c=new RegExp("(\\s|^)"+b+"(\\s|$)");a.className=a.className.replace(c," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(a,b){e.hasClass(a,b)||(a.className+=(a.className?" ":"")+b)},hasClass:function(a,b){return a.className&&new RegExp("(^|\\s)"+b+"(\\s|$)").test(a.className)},getChildByClass:function(a,b){for(var c=a.firstChild;c;){if(e.hasClass(c,b))return c;c=c.nextSibling}},arraySearch:function(a,b,c){for(var d=a.length;d--;)if(a[d][c]===b)return d;return-1},extend:function(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){if(c&&a.hasOwnProperty(d))continue;a[d]=b[d]}},easing:{sine:{out:function(a){return Math.sin(a*(Math.PI/2))},inOut:function(a){return-(Math.cos(Math.PI*a)-1)/2}},cubic:{out:function(a){return--a*a*a+1}}},detectFeatures:function(){if(e.features)return e.features;var a=e.createEl(),b=a.style,c="",d={};if(d.oldIE=document.all&&!document.addEventListener,d.touch="ontouchstart"in window,window.requestAnimationFrame&&(d.raf=window.requestAnimationFrame,d.caf=window.cancelAnimationFrame),d.pointerEvent=!!window.PointerEvent||navigator.msPointerEnabled,!d.pointerEvent){var f=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var g=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);g&&g.length>0&&(g=parseInt(g[1],10),g>=1&&g<8&&(d.isOldIOSPhone=!0))}var h=f.match(/Android\s([0-9\.]*)/),i=h?h[1]:0;i=parseFloat(i),i>=1&&(i<4.4&&(d.isOldAndroid=!0),d.androidVersion=i),d.isMobileOpera=/opera mini|opera mobi/i.test(f)}for(var j,k,l=["transform","perspective","animationName"],m=["","webkit","Moz","ms","O"],n=0;n<4;n++){c=m[n];for(var o=0;o<3;o++)j=l[o],k=c+(c?j.charAt(0).toUpperCase()+j.slice(1):j),!d[j]&&k in b&&(d[j]=k);c&&!d.raf&&(c=c.toLowerCase(),d.raf=window[c+"RequestAnimationFrame"],d.raf&&(d.caf=window[c+"CancelAnimationFrame"]||window[c+"CancelRequestAnimationFrame"]))}if(!d.raf){var p=0;d.raf=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-p)),d=window.setTimeout(function(){a(b+c)},c);return p=b+c,d},d.caf=function(a){clearTimeout(a)}}return d.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,e.features=d,d}};e.detectFeatures(),e.features.oldIE&&(e.bind=function(a,b,c,d){b=b.split(" ");for(var e,f=(d?"detach":"attach")+"Event",g=function(){c.handleEvent.call(c)},h=0;h<b.length;h++)if(e=b[h])if("object"==typeof c&&c.handleEvent){if(d){if(!c["oldIE"+e])return!1}else c["oldIE"+e]=g;a[f]("on"+e,c["oldIE"+e])}else a[f]("on"+e,c)});var f=this,g=25,h=3,i={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(a){return"A"===a.tagName},getDoubleTapZoom:function(a,b){return a?1:b.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};e.extend(i,d);var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,ca,da,ea,fa,ga,ha,ia,ja,ka,la,ma=function(){return{x:0,y:0}},na=ma(),oa=ma(),pa=ma(),qa={},ra=0,sa={},ta=ma(),ua=0,va=!0,wa=[],xa={},ya=!1,za=function(a,b){e.extend(f,b.publicMethods),wa.push(a)},Aa=function(a){var b=ac();return a>b-1?a-b:a<0?b+a:a},Ba={},Ca=function(a,b){return Ba[a]||(Ba[a]=[]),Ba[a].push(b)},Da=function(a){var b=Ba[a];if(b){var c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<b.length;d++)b[d].apply(f,c)}},Ea=function(){return(new Date).getTime()},Fa=function(a){ja=a,f.bg.style.opacity=a*i.bgOpacity},Ga=function(a,b,c,d,e){(!ya||e&&e!==f.currItem)&&(d/=e?e.fitRatio:f.currItem.fitRatio),a[E]=u+b+"px, "+c+"px"+v+" scale("+d+")"},Ha=function(a){ea&&(a&&(s>f.currItem.fitRatio?ya||(mc(f.currItem,!1,!0),ya=!0):ya&&(mc(f.currItem),ya=!1)),Ga(ea,pa.x,pa.y,s))},Ia=function(a){a.container&&Ga(a.container.style,a.initialPosition.x,a.initialPosition.y,a.initialZoomLevel,a)},Ja=function(a,b){b[E]=u+a+"px, 0px"+v},Ka=function(a,b){if(!i.loop&&b){var c=m+(ta.x*ra-a)/ta.x,d=Math.round(a-tb.x);(c<0&&d>0||c>=ac()-1&&d<0)&&(a=tb.x+d*i.mainScrollEndFriction)}tb.x=a,Ja(a,n)},La=function(a,b){var c=ub[a]-sa[a];return oa[a]+na[a]+c-c*(b/t)},Ma=function(a,b){a.x=b.x,a.y=b.y,b.id&&(a.id=b.id)},Na=function(a){a.x=Math.round(a.x),a.y=Math.round(a.y)},Oa=null,Pa=function(){Oa&&(e.unbind(document,"mousemove",Pa),e.addClass(a,"pswp--has_mouse"),i.mouseUsed=!0,Da("mouseUsed")),Oa=setTimeout(function(){Oa=null},100)},Qa=function(){e.bind(document,"keydown",f),N.transform&&e.bind(f.scrollWrap,"click",f),i.mouseUsed||e.bind(document,"mousemove",Pa),e.bind(window,"resize scroll orientationchange",f),Da("bindEvents")},Ra=function(){e.unbind(window,"resize scroll orientationchange",f),e.unbind(window,"scroll",r.scroll),e.unbind(document,"keydown",f),e.unbind(document,"mousemove",Pa),N.transform&&e.unbind(f.scrollWrap,"click",f),V&&e.unbind(window,p,f),clearTimeout(O),Da("unbindEvents")},Sa=function(a,b){var c=ic(f.currItem,qa,a);return b&&(da=c),c},Ta=function(a){return a||(a=f.currItem),a.initialZoomLevel},Ua=function(a){return a||(a=f.currItem),a.w>0?i.maxSpreadZoom:1},Va=function(a,b,c,d){return d===f.currItem.initialZoomLevel?(c[a]=f.currItem.initialPosition[a],!0):(c[a]=La(a,d),c[a]>b.min[a]?(c[a]=b.min[a],!0):c[a]<b.max[a]&&(c[a]=b.max[a],!0))},Wa=function(){if(E){var b=N.perspective&&!G;return u="translate"+(b?"3d(":"("),void(v=N.perspective?", 0px)":")")}E="left",e.addClass(a,"pswp--ie"),Ja=function(a,b){b.left=a+"px"},Ia=function(a){var b=a.fitRatio>1?1:a.fitRatio,c=a.container.style,d=b*a.w,e=b*a.h;c.width=d+"px",c.height=e+"px",c.left=a.initialPosition.x+"px",c.top=a.initialPosition.y+"px"},Ha=function(){if(ea){var a=ea,b=f.currItem,c=b.fitRatio>1?1:b.fitRatio,d=c*b.w,e=c*b.h;a.width=d+"px",a.height=e+"px",a.left=pa.x+"px",a.top=pa.y+"px"}}},Xa=function(a){var b="";i.escKey&&27===a.keyCode?b="close":i.arrowKeys&&(37===a.keyCode?b="prev":39===a.keyCode&&(b="next")),b&&(a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||(a.preventDefault?a.preventDefault():a.returnValue=!1,f[b]()))},Ya=function(a){a&&(Y||X||fa||T)&&(a.preventDefault(),a.stopPropagation())},Za=function(){f.setScrollOffset(0,e.getScrollY())},$a={},_a=0,ab=function(a){$a[a]&&($a[a].raf&&I($a[a].raf),_a--,delete $a[a])},bb=function(a){$a[a]&&ab(a),$a[a]||(_a++,$a[a]={})},cb=function(){for(var a in $a)$a.hasOwnProperty(a)&&ab(a)},db=function(a,b,c,d,e,f,g){var h,i=Ea();bb(a);var j=function(){if($a[a]){if(h=Ea()-i,h>=d)return ab(a),f(c),void(g&&g());f((c-b)*e(h/d)+b),$a[a].raf=H(j)}};j()},eb={shout:Da,listen:Ca,viewportSize:qa,options:i,isMainScrollAnimating:function(){return fa},getZoomLevel:function(){return s},getCurrentIndex:function(){return m},isDragging:function(){return V},isZooming:function(){return aa},setScrollOffset:function(a,b){sa.x=a,M=sa.y=b,Da("updateScrollOffset",sa)},applyZoomPan:function(a,b,c,d){pa.x=b,pa.y=c,s=a,Ha(d)},init:function(){if(!j&&!k){var c;f.framework=e,f.template=a,f.bg=e.getChildByClass(a,"pswp__bg"),J=a.className,j=!0,N=e.detectFeatures(),H=N.raf,I=N.caf,E=N.transform,L=N.oldIE,f.scrollWrap=e.getChildByClass(a,"pswp__scroll-wrap"),f.container=e.getChildByClass(f.scrollWrap,"pswp__container"),n=f.container.style,f.itemHolders=y=[{el:f.container.children[0],wrap:0,index:-1},{el:f.container.children[1],wrap:0,index:-1},{el:f.container.children[2],wrap:0,index:-1}],y[0].el.style.display=y[2].el.style.display="none",Wa(),r={resize:f.updateSize,orientationchange:function(){clearTimeout(O),O=setTimeout(function(){qa.x!==f.scrollWrap.clientWidth&&f.updateSize()},500)},scroll:Za,keydown:Xa,click:Ya};var d=N.isOldIOSPhone||N.isOldAndroid||N.isMobileOpera;for(N.animationName&&N.transform&&!d||(i.showAnimationDuration=i.hideAnimationDuration=0),c=0;c<wa.length;c++)f["init"+wa[c]]();if(b){var g=f.ui=new b(f,e);g.init()}Da("firstUpdate"),m=m||i.index||0,(isNaN(m)||m<0||m>=ac())&&(m=0),f.currItem=_b(m),(N.isOldIOSPhone||N.isOldAndroid)&&(va=!1),a.setAttribute("aria-hidden","false"),i.modal&&(va?a.style.position="fixed":(a.style.position="absolute",a.style.top=e.getScrollY()+"px")),void 0===M&&(Da("initialLayout"),M=K=e.getScrollY());var l="pswp--open ";for(i.mainClass&&(l+=i.mainClass+" "),i.showHideOpacity&&(l+="pswp--animate_opacity "),l+=G?"pswp--touch":"pswp--notouch",l+=N.animationName?" pswp--css_animation":"",l+=N.svg?" pswp--svg":"",e.addClass(a,l),f.updateSize(),o=-1,ua=null,c=0;c<h;c++)Ja((c+o)*ta.x,y[c].el.style);L||e.bind(f.scrollWrap,q,f),Ca("initialZoomInEnd",function(){f.setContent(y[0],m-1),f.setContent(y[2],m+1),y[0].el.style.display=y[2].el.style.display="block",i.focus&&a.focus(),Qa()}),f.setContent(y[1],m),f.updateCurrItem(),Da("afterInit"),va||(w=setInterval(function(){_a||V||aa||s!==f.currItem.initialZoomLevel||f.updateSize()},1e3)),e.addClass(a,"pswp--visible")}},close:function(){j&&(j=!1,k=!0,Da("close"),Ra(),cc(f.currItem,null,!0,f.destroy))},destroy:function(){Da("destroy"),Xb&&clearTimeout(Xb),a.setAttribute("aria-hidden","true"),a.className=J,w&&clearInterval(w),e.unbind(f.scrollWrap,q,f),e.unbind(window,"scroll",f),zb(),cb(),Ba=null},panTo:function(a,b,c){c||(a>da.min.x?a=da.min.x:a<da.max.x&&(a=da.max.x),b>da.min.y?b=da.min.y:b<da.max.y&&(b=da.max.y)),pa.x=a,pa.y=b,Ha()},handleEvent:function(a){a=a||window.event,r[a.type]&&r[a.type](a)},goTo:function(a){a=Aa(a);var b=a-m;ua=b,m=a,f.currItem=_b(m),ra-=b,Ka(ta.x*ra),cb(),fa=!1,f.updateCurrItem()},next:function(){f.goTo(m+1)},prev:function(){f.goTo(m-1)},updateCurrZoomItem:function(a){if(a&&Da("beforeChange",0),y[1].el.children.length){var b=y[1].el.children[0];ea=e.hasClass(b,"pswp__zoom-wrap")?b.style:null}else ea=null;da=f.currItem.bounds,t=s=f.currItem.initialZoomLevel,pa.x=da.center.x,pa.y=da.center.y,a&&Da("afterChange")},invalidateCurrItems:function(){x=!0;for(var a=0;a<h;a++)y[a].item&&(y[a].item.needsUpdate=!0)},updateCurrItem:function(a){if(0!==ua){var b,c=Math.abs(ua);if(!(a&&c<2)){f.currItem=_b(m),ya=!1,Da("beforeChange",ua),c>=h&&(o+=ua+(ua>0?-h:h),c=h);for(var d=0;d<c;d++)ua>0?(b=y.shift(),y[h-1]=b,o++,Ja((o+2)*ta.x,b.el.style),f.setContent(b,m-c+d+1+1)):(b=y.pop(),y.unshift(b),o--,Ja(o*ta.x,b.el.style),f.setContent(b,m+c-d-1-1));if(ea&&1===Math.abs(ua)){var e=_b(z);e.initialZoomLevel!==s&&(ic(e,qa),mc(e),Ia(e))}ua=0,f.updateCurrZoomItem(),z=m,Da("afterChange")}}},updateSize:function(b){if(!va&&i.modal){var c=e.getScrollY();if(M!==c&&(a.style.top=c+"px",M=c),!b&&xa.x===window.innerWidth&&xa.y===window.innerHeight)return;xa.x=window.innerWidth,xa.y=window.innerHeight,a.style.height=xa.y+"px"}if(qa.x=f.scrollWrap.clientWidth,qa.y=f.scrollWrap.clientHeight,Za(),ta.x=qa.x+Math.round(qa.x*i.spacing),ta.y=qa.y,Ka(ta.x*ra),Da("beforeResize"),void 0!==o){for(var d,g,j,k=0;k<h;k++)d=y[k],Ja((k+o)*ta.x,d.el.style),j=m+k-1,i.loop&&ac()>2&&(j=Aa(j)),g=_b(j),g&&(x||g.needsUpdate||!g.bounds)?(f.cleanSlide(g),f.setContent(d,j),1===k&&(f.currItem=g,f.updateCurrZoomItem(!0)),g.needsUpdate=!1):d.index===-1&&j>=0&&f.setContent(d,j),g&&g.container&&(ic(g,qa),mc(g),Ia(g));x=!1}t=s=f.currItem.initialZoomLevel,da=f.currItem.bounds,da&&(pa.x=da.center.x,pa.y=da.center.y,Ha(!0)),Da("resize")},zoomTo:function(a,b,c,d,f){b&&(t=s,ub.x=Math.abs(b.x)-pa.x,ub.y=Math.abs(b.y)-pa.y,Ma(oa,pa));var g=Sa(a,!1),h={};Va("x",g,h,a),Va("y",g,h,a);var i=s,j={x:pa.x,y:pa.y};Na(h);var k=function(b){1===b?(s=a,pa.x=h.x,pa.y=h.y):(s=(a-i)*b+i,pa.x=(h.x-j.x)*b+j.x,pa.y=(h.y-j.y)*b+j.y),f&&f(b),Ha(1===b)};c?db("customZoomTo",0,1,c,d||e.easing.sine.inOut,k):k(1)}},fb=30,gb=10,hb={},ib={},jb={},kb={},lb={},mb=[],nb={},ob=[],pb={},qb=0,rb=ma(),sb=0,tb=ma(),ub=ma(),vb=ma(),wb=function(a,b){return a.x===b.x&&a.y===b.y},xb=function(a,b){return Math.abs(a.x-b.x)<g&&Math.abs(a.y-b.y)<g},yb=function(a,b){return pb.x=Math.abs(a.x-b.x),pb.y=Math.abs(a.y-b.y),Math.sqrt(pb.x*pb.x+pb.y*pb.y)},zb=function(){Z&&(I(Z),Z=null)},Ab=function(){V&&(Z=H(Ab),Qb())},Bb=function(){return!("fit"===i.scaleMode&&s===f.currItem.initialZoomLevel)},Cb=function(a,b){return!(!a||a===document)&&(!(a.getAttribute("class")&&a.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(b(a)?a:Cb(a.parentNode,b)))},Db={},Eb=function(a,b){return Db.prevent=!Cb(a.target,i.isClickableElement),Da("preventDragEvent",a,b,Db),Db.prevent},Fb=function(a,b){return b.x=a.pageX,b.y=a.pageY,b.id=a.identifier,b},Gb=function(a,b,c){c.x=.5*(a.x+b.x),c.y=.5*(a.y+b.y)},Hb=function(a,b,c){if(a-Q>50){var d=ob.length>2?ob.shift():{};d.x=b,d.y=c,ob.push(d),Q=a}},Ib=function(){var a=pa.y-f.currItem.initialPosition.y;return 1-Math.abs(a/(qa.y/2))},Jb={},Kb={},Lb=[],Mb=function(a){for(;Lb.length>0;)Lb.pop();return F?(la=0,mb.forEach(function(a){0===la?Lb[0]=a:1===la&&(Lb[1]=a),la++})):a.type.indexOf("touch")>-1?a.touches&&a.touches.length>0&&(Lb[0]=Fb(a.touches[0],Jb),a.touches.length>1&&(Lb[1]=Fb(a.touches[1],Kb))):(Jb.x=a.pageX,Jb.y=a.pageY,Jb.id="",Lb[0]=Jb),Lb},Nb=function(a,b){var c,d,e,g,h=0,j=pa[a]+b[a],k=b[a]>0,l=tb.x+b.x,m=tb.x-nb.x;return c=j>da.min[a]||j<da.max[a]?i.panEndFriction:1,j=pa[a]+b[a]*c,!i.allowPanToNext&&s!==f.currItem.initialZoomLevel||(ea?"h"!==ga||"x"!==a||X||(k?(j>da.min[a]&&(c=i.panEndFriction,h=da.min[a]-j,d=da.min[a]-oa[a]),(d<=0||m<0)&&ac()>1?(g=l,m<0&&l>nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j)):(j<da.max[a]&&(c=i.panEndFriction,h=j-da.max[a],d=oa[a]-da.max[a]),(d<=0||m>0)&&ac()>1?(g=l,m>0&&l<nb.x&&(g=nb.x)):da.min.x!==da.max.x&&(e=j))):g=l,"x"!==a)?void(fa||$||s>f.currItem.fitRatio&&(pa[a]+=b[a]*c)):(void 0!==g&&(Ka(g,!0),$=g!==nb.x),da.min.x!==da.max.x&&(void 0!==e?pa.x=e:$||(pa.x+=b.x*c)),void 0!==g)},Ob=function(a){if(!("mousedown"===a.type&&a.button>0)){if($b)return void a.preventDefault();if(!U||"mousedown"!==a.type){if(Eb(a,!0)&&a.preventDefault(),Da("pointerDown"),F){var b=e.arraySearch(mb,a.pointerId,"id");b<0&&(b=mb.length),mb[b]={x:a.pageX,y:a.pageY,id:a.pointerId}}var c=Mb(a),d=c.length;_=null,cb(),V&&1!==d||(V=ha=!0,e.bind(window,p,f),S=ka=ia=T=$=Y=W=X=!1,ga=null,Da("firstTouchStart",c),Ma(oa,pa),na.x=na.y=0,Ma(kb,c[0]),Ma(lb,kb),nb.x=ta.x*ra,ob=[{x:kb.x,y:kb.y}],Q=P=Ea(),Sa(s,!0),zb(),Ab()),!aa&&d>1&&!fa&&!$&&(t=s,X=!1,aa=W=!0,na.y=na.x=0,Ma(oa,pa),Ma(hb,c[0]),Ma(ib,c[1]),Gb(hb,ib,vb),ub.x=Math.abs(vb.x)-pa.x,ub.y=Math.abs(vb.y)-pa.y,ba=ca=yb(hb,ib))}}},Pb=function(a){if(a.preventDefault(),F){var b=e.arraySearch(mb,a.pointerId,"id");if(b>-1){var c=mb[b];c.x=a.pageX,c.y=a.pageY}}if(V){var d=Mb(a);if(ga||Y||aa)_=d;else if(tb.x!==ta.x*ra)ga="h";else{var f=Math.abs(d[0].x-kb.x)-Math.abs(d[0].y-kb.y);Math.abs(f)>=gb&&(ga=f>0?"h":"v",_=d)}}},Qb=function(){if(_){var a=_.length;if(0!==a)if(Ma(hb,_[0]),jb.x=hb.x-kb.x,jb.y=hb.y-kb.y,aa&&a>1){if(kb.x=hb.x,kb.y=hb.y,!jb.x&&!jb.y&&wb(_[1],ib))return;Ma(ib,_[1]),X||(X=!0,Da("zoomGestureStarted"));var b=yb(hb,ib),c=Vb(b);c>f.currItem.initialZoomLevel+f.currItem.initialZoomLevel/15&&(ka=!0);var d=1,e=Ta(),g=Ua();if(c<e)if(i.pinchToClose&&!ka&&t<=f.currItem.initialZoomLevel){var h=e-c,j=1-h/(e/1.2);Fa(j),Da("onPinchClose",j),ia=!0}else d=(e-c)/e,d>1&&(d=1),c=e-d*(e/3);else c>g&&(d=(c-g)/(6*e),d>1&&(d=1),c=g+d*e);d<0&&(d=0),ba=b,Gb(hb,ib,rb),na.x+=rb.x-vb.x,na.y+=rb.y-vb.y,Ma(vb,rb),pa.x=La("x",c),pa.y=La("y",c),S=c>s,s=c,Ha()}else{if(!ga)return;if(ha&&(ha=!1,Math.abs(jb.x)>=gb&&(jb.x-=_[0].x-lb.x),Math.abs(jb.y)>=gb&&(jb.y-=_[0].y-lb.y)),kb.x=hb.x,kb.y=hb.y,0===jb.x&&0===jb.y)return;if("v"===ga&&i.closeOnVerticalDrag&&!Bb()){na.y+=jb.y,pa.y+=jb.y;var k=Ib();return T=!0,Da("onVerticalDrag",k),Fa(k),void Ha()}Hb(Ea(),hb.x,hb.y),Y=!0,da=f.currItem.bounds;var l=Nb("x",jb);l||(Nb("y",jb),Na(pa),Ha())}}},Rb=function(a){if(N.isOldAndroid){if(U&&"mouseup"===a.type)return;a.type.indexOf("touch")>-1&&(clearTimeout(U),U=setTimeout(function(){U=0},600))}Da("pointerUp"),Eb(a,!1)&&a.preventDefault();var b;if(F){var c=e.arraySearch(mb,a.pointerId,"id");if(c>-1)if(b=mb.splice(c,1)[0],navigator.msPointerEnabled){var d={4:"mouse",2:"touch",3:"pen"};b.type=d[a.pointerType],b.type||(b.type=a.pointerType||"mouse")}else b.type=a.pointerType||"mouse"}var g,h=Mb(a),j=h.length;if("mouseup"===a.type&&(j=0),2===j)return _=null,!0;1===j&&Ma(lb,h[0]),0!==j||ga||fa||(b||("mouseup"===a.type?b={x:a.pageX,y:a.pageY,type:"mouse"}:a.changedTouches&&a.changedTouches[0]&&(b={x:a.changedTouches[0].pageX,y:a.changedTouches[0].pageY,type:"touch"})),Da("touchRelease",a,b));var k=-1;if(0===j&&(V=!1,e.unbind(window,p,f),zb(),aa?k=0:sb!==-1&&(k=Ea()-sb)),sb=1===j?Ea():-1,g=k!==-1&&k<150?"zoom":"swipe",aa&&j<2&&(aa=!1,1===j&&(g="zoomPointerUp"),Da("zoomGestureEnded")),_=null,Y||X||fa||T)if(cb(),R||(R=Sb()),R.calculateSwipeSpeed("x"),T){var l=Ib();if(l<i.verticalDragRange)f.close();else{var m=pa.y,n=ja;db("verticalDrag",0,1,300,e.easing.cubic.out,function(a){pa.y=(f.currItem.initialPosition.y-m)*a+m,Fa((1-n)*a+n),Ha()}),Da("onVerticalDrag",1)}}else{if(($||fa)&&0===j){var o=Ub(g,R);if(o)return;g="zoomPointerUp"}if(!fa)return"swipe"!==g?void Wb():void(!$&&s>f.currItem.fitRatio&&Tb(R))}},Sb=function(){var a,b,c={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(d){ob.length>1?(a=Ea()-Q+50,b=ob[ob.length-2][d]):(a=Ea()-P,b=lb[d]),c.lastFlickOffset[d]=kb[d]-b,c.lastFlickDist[d]=Math.abs(c.lastFlickOffset[d]),c.lastFlickDist[d]>20?c.lastFlickSpeed[d]=c.lastFlickOffset[d]/a:c.lastFlickSpeed[d]=0,Math.abs(c.lastFlickSpeed[d])<.1&&(c.lastFlickSpeed[d]=0),c.slowDownRatio[d]=.95,c.slowDownRatioReverse[d]=1-c.slowDownRatio[d],c.speedDecelerationRatio[d]=1},calculateOverBoundsAnimOffset:function(a,b){c.backAnimStarted[a]||(pa[a]>da.min[a]?c.backAnimDestination[a]=da.min[a]:pa[a]<da.max[a]&&(c.backAnimDestination[a]=da.max[a]),void 0!==c.backAnimDestination[a]&&(c.slowDownRatio[a]=.7,c.slowDownRatioReverse[a]=1-c.slowDownRatio[a],c.speedDecelerationRatioAbs[a]<.05&&(c.lastFlickSpeed[a]=0,c.backAnimStarted[a]=!0,db("bounceZoomPan"+a,pa[a],c.backAnimDestination[a],b||300,e.easing.sine.out,function(b){pa[a]=b,Ha()}))))},calculateAnimOffset:function(a){c.backAnimStarted[a]||(c.speedDecelerationRatio[a]=c.speedDecelerationRatio[a]*(c.slowDownRatio[a]+c.slowDownRatioReverse[a]-c.slowDownRatioReverse[a]*c.timeDiff/10),c.speedDecelerationRatioAbs[a]=Math.abs(c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]),c.distanceOffset[a]=c.lastFlickSpeed[a]*c.speedDecelerationRatio[a]*c.timeDiff,pa[a]+=c.distanceOffset[a])},panAnimLoop:function(){if($a.zoomPan&&($a.zoomPan.raf=H(c.panAnimLoop),c.now=Ea(),c.timeDiff=c.now-c.lastNow,c.lastNow=c.now,c.calculateAnimOffset("x"),c.calculateAnimOffset("y"),Ha(),c.calculateOverBoundsAnimOffset("x"),c.calculateOverBoundsAnimOffset("y"),c.speedDecelerationRatioAbs.x<.05&&c.speedDecelerationRatioAbs.y<.05))return pa.x=Math.round(pa.x),pa.y=Math.round(pa.y),Ha(),void ab("zoomPan")}};return c},Tb=function(a){return a.calculateSwipeSpeed("y"),da=f.currItem.bounds,a.backAnimDestination={},a.backAnimStarted={},Math.abs(a.lastFlickSpeed.x)<=.05&&Math.abs(a.lastFlickSpeed.y)<=.05?(a.speedDecelerationRatioAbs.x=a.speedDecelerationRatioAbs.y=0,a.calculateOverBoundsAnimOffset("x"),a.calculateOverBoundsAnimOffset("y"),!0):(bb("zoomPan"),a.lastNow=Ea(),void a.panAnimLoop())},Ub=function(a,b){var c;fa||(qb=m);var d;if("swipe"===a){var g=kb.x-lb.x,h=b.lastFlickDist.x<10;g>fb&&(h||b.lastFlickOffset.x>20)?d=-1:g<-fb&&(h||b.lastFlickOffset.x<-20)&&(d=1)}var j;d&&(m+=d,m<0?(m=i.loop?ac()-1:0,j=!0):m>=ac()&&(m=i.loop?0:ac()-1,j=!0),j&&!i.loop||(ua+=d,ra-=d,c=!0));var k,l=ta.x*ra,n=Math.abs(l-tb.x);return c||l>tb.x==b.lastFlickSpeed.x>0?(k=Math.abs(b.lastFlickSpeed.x)>0?n/Math.abs(b.lastFlickSpeed.x):333,k=Math.min(k,400),k=Math.max(k,250)):k=333,qb===m&&(c=!1),fa=!0,Da("mainScrollAnimStart"),db("mainScroll",tb.x,l,k,e.easing.cubic.out,Ka,function(){cb(),fa=!1,qb=-1,(c||qb!==m)&&f.updateCurrItem(),Da("mainScrollAnimComplete")}),c&&f.updateCurrItem(!0),c},Vb=function(a){return 1/ca*a*t},Wb=function(){var a=s,b=Ta(),c=Ua();s<b?a=b:s>c&&(a=c);var d,g=1,h=ja;return ia&&!S&&!ka&&s<b?(f.close(),!0):(ia&&(d=function(a){Fa((g-h)*a+h)}),f.zoomTo(a,0,200,e.easing.cubic.out,d),!0)};za("Gestures",{publicMethods:{initGestures:function(){var a=function(a,b,c,d,e){A=a+b,B=a+c,C=a+d,D=e?a+e:""};F=N.pointerEvent,F&&N.touch&&(N.touch=!1),F?navigator.msPointerEnabled?a("MSPointer","Down","Move","Up","Cancel"):a("pointer","down","move","up","cancel"):N.touch?(a("touch","start","move","end","cancel"),G=!0):a("mouse","down","move","up"),p=B+" "+C+" "+D,q=A,F&&!G&&(G=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),f.likelyTouchDevice=G,r[A]=Ob,r[B]=Pb,r[C]=Rb,D&&(r[D]=r[C]),N.touch&&(q+=" mousedown",p+=" mousemove mouseup",r.mousedown=r[A],r.mousemove=r[B],r.mouseup=r[C]),G||(i.allowPanToNext=!1)}}});var Xb,Yb,Zb,$b,_b,ac,bc,cc=function(b,c,d,g){Xb&&clearTimeout(Xb),$b=!0,Zb=!0;var h;b.initialLayout?(h=b.initialLayout,b.initialLayout=null):h=i.getThumbBoundsFn&&i.getThumbBoundsFn(m);var j=d?i.hideAnimationDuration:i.showAnimationDuration,k=function(){ab("initialZoom"),d?(f.template.removeAttribute("style"),f.bg.removeAttribute("style")):(Fa(1),c&&(c.style.display="block"),e.addClass(a,"pswp--animated-in"),Da("initialZoom"+(d?"OutEnd":"InEnd"))),g&&g(),$b=!1};if(!j||!h||void 0===h.x)return Da("initialZoom"+(d?"Out":"In")),s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),a.style.opacity=d?0:1,Fa(1),void(j?setTimeout(function(){k()},j):k());var n=function(){var c=l,g=!f.currItem.src||f.currItem.loadError||i.showHideOpacity;b.miniImg&&(b.miniImg.style.webkitBackfaceVisibility="hidden"),d||(s=h.w/b.w,pa.x=h.x,pa.y=h.y-K,f[g?"template":"bg"].style.opacity=.001,Ha()),bb("initialZoom"),d&&!c&&e.removeClass(a,"pswp--animated-in"),g&&(d?e[(c?"remove":"add")+"Class"](a,"pswp--animate_opacity"):setTimeout(function(){e.addClass(a,"pswp--animate_opacity")},30)),Xb=setTimeout(function(){if(Da("initialZoom"+(d?"Out":"In")),d){var f=h.w/b.w,i={x:pa.x,y:pa.y},l=s,m=ja,n=function(b){1===b?(s=f,pa.x=h.x,pa.y=h.y-M):(s=(f-l)*b+l,pa.x=(h.x-i.x)*b+i.x,pa.y=(h.y-M-i.y)*b+i.y),Ha(),g?a.style.opacity=1-b:Fa(m-b*m)};c?db("initialZoom",0,1,j,e.easing.cubic.out,n,k):(n(1),Xb=setTimeout(k,j+20))}else s=b.initialZoomLevel,Ma(pa,b.initialPosition),Ha(),Fa(1),g?a.style.opacity=1:Fa(1),Xb=setTimeout(k,j+20)},d?25:90)};n()},dc={},ec=[],fc={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Yb.length}},gc=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},hc=function(a,b,c){var d=a.bounds;d.center.x=Math.round((dc.x-b)/2),d.center.y=Math.round((dc.y-c)/2)+a.vGap.top,d.max.x=b>dc.x?Math.round(dc.x-b):d.center.x,d.max.y=c>dc.y?Math.round(dc.y-c)+a.vGap.top:d.center.y,d.min.x=b>dc.x?0:d.center.x,d.min.y=c>dc.y?a.vGap.top:d.center.y},ic=function(a,b,c){if(a.src&&!a.loadError){var d=!c;if(d&&(a.vGap||(a.vGap={top:0,bottom:0}),Da("parseVerticalMargin",a)),dc.x=b.x,dc.y=b.y-a.vGap.top-a.vGap.bottom,d){var e=dc.x/a.w,f=dc.y/a.h;a.fitRatio=e<f?e:f;var g=i.scaleMode;"orig"===g?c=1:"fit"===g&&(c=a.fitRatio),c>1&&(c=1),a.initialZoomLevel=c,a.bounds||(a.bounds=gc())}if(!c)return;return hc(a,a.w*c,a.h*c),d&&c===a.initialZoomLevel&&(a.initialPosition=a.bounds.center),a.bounds}return a.w=a.h=0,a.initialZoomLevel=a.fitRatio=1,a.bounds=gc(),a.initialPosition=a.bounds.center,a.bounds},jc=function(a,b,c,d,e,g){b.loadError||d&&(b.imageAppended=!0,mc(b,d,b===f.currItem&&ya),c.appendChild(d),g&&setTimeout(function(){b&&b.loaded&&b.placeholder&&(b.placeholder.style.display="none",b.placeholder=null)},500))},kc=function(a){a.loading=!0,a.loaded=!1;var b=a.img=e.createEl("pswp__img","img"),c=function(){a.loading=!1,a.loaded=!0,a.loadComplete?a.loadComplete(a):a.img=null,b.onload=b.onerror=null,b=null};return b.onload=c,b.onerror=function(){a.loadError=!0,c()},b.src=a.src,b},lc=function(a,b){if(a.src&&a.loadError&&a.container)return b&&(a.container.innerHTML=""),a.container.innerHTML=i.errorMsg.replace("%url%",a.src),!0},mc=function(a,b,c){if(a.src){b||(b=a.container.lastChild);var d=c?a.w:Math.round(a.w*a.fitRatio),e=c?a.h:Math.round(a.h*a.fitRatio);a.placeholder&&!a.loaded&&(a.placeholder.style.width=d+"px",a.placeholder.style.height=e+"px"),b.style.width=d+"px",b.style.height=e+"px"}},nc=function(){if(ec.length){for(var a,b=0;b<ec.length;b++)a=ec[b],a.holder.index===a.index&&jc(a.index,a.item,a.baseDiv,a.img,!1,a.clearPlaceholder);ec=[]}};za("Controller",{publicMethods:{lazyLoadItem:function(a){a=Aa(a);var b=_b(a);b&&(!b.loaded&&!b.loading||x)&&(Da("gettingData",a,b),b.src&&kc(b))},initController:function(){e.extend(i,fc,!0),f.items=Yb=c,_b=f.getItemAt,ac=i.getNumItemsFn,bc=i.loop,ac()<3&&(i.loop=!1),Ca("beforeChange",function(a){var b,c=i.preload,d=null===a||a>=0,e=Math.min(c[0],ac()),g=Math.min(c[1],ac());for(b=1;b<=(d?g:e);b++)f.lazyLoadItem(m+b);for(b=1;b<=(d?e:g);b++)f.lazyLoadItem(m-b)}),Ca("initialLayout",function(){f.currItem.initialLayout=i.getThumbBoundsFn&&i.getThumbBoundsFn(m)}),Ca("mainScrollAnimComplete",nc),Ca("initialZoomInEnd",nc),Ca("destroy",function(){for(var a,b=0;b<Yb.length;b++)a=Yb[b],a.container&&(a.container=null),a.placeholder&&(a.placeholder=null),a.img&&(a.img=null),a.preloader&&(a.preloader=null),a.loadError&&(a.loaded=a.loadError=!1);ec=null})},getItemAt:function(a){return a>=0&&(void 0!==Yb[a]&&Yb[a])},allowProgressiveImg:function(){return i.forceProgressiveLoading||!G||i.mouseUsed||screen.width>1200},setContent:function(a,b){i.loop&&(b=Aa(b));var c=f.getItemAt(a.index);c&&(c.container=null);var d,g=f.getItemAt(b);if(!g)return void(a.el.innerHTML="");Da("gettingData",b,g),a.index=b,a.item=g;var h=g.container=e.createEl("pswp__zoom-wrap");if(!g.src&&g.html&&(g.html.tagName?h.appendChild(g.html):h.innerHTML=g.html),lc(g),ic(g,qa),!g.src||g.loadError||g.loaded)g.src&&!g.loadError&&(d=e.createEl("pswp__img","img"),d.style.opacity=1,d.src=g.src,mc(g,d),jc(b,g,h,d,!0));else{if(g.loadComplete=function(c){if(j){if(a&&a.index===b){if(lc(c,!0))return c.loadComplete=c.img=null,ic(c,qa),Ia(c),void(a.index===m&&f.updateCurrZoomItem());c.imageAppended?!$b&&c.placeholder&&(c.placeholder.style.display="none",c.placeholder=null):N.transform&&(fa||$b)?ec.push({item:c,baseDiv:h,img:c.img,index:b,holder:a,clearPlaceholder:!0}):jc(b,c,h,c.img,fa||$b,!0)}c.loadComplete=null,c.img=null,Da("imageLoadComplete",b,c)}},e.features.transform){var k="pswp__img pswp__img--placeholder";k+=g.msrc?"":" pswp__img--placeholder--blank";var l=e.createEl(k,g.msrc?"img":"");g.msrc&&(l.src=g.msrc),mc(g,l),h.appendChild(l),g.placeholder=l}g.loading||kc(g),f.allowProgressiveImg()&&(!Zb&&N.transform?ec.push({item:g,baseDiv:h,img:g.img,index:b,holder:a}):jc(b,g,h,g.img,!0,!0))}Zb||b!==m?Ia(g):(ea=h.style,cc(g,d||g.img)),a.el.innerHTML="",a.el.appendChild(h)},cleanSlide:function(a){a.img&&(a.img.onload=a.img.onerror=null),a.loaded=a.loading=a.img=a.imageAppended=!1}}});var oc,pc={},qc=function(a,b,c){var d=document.createEvent("CustomEvent"),e={origEvent:a,target:a.target,releasePoint:b,pointerType:c||"touch"};d.initCustomEvent("pswpTap",!0,!0,e),a.target.dispatchEvent(d)};za("Tap",{publicMethods:{initTap:function(){Ca("firstTouchStart",f.onTapStart),Ca("touchRelease",f.onTapRelease),Ca("destroy",function(){pc={},oc=null})},onTapStart:function(a){a.length>1&&(clearTimeout(oc),oc=null)},onTapRelease:function(a,b){if(b&&!Y&&!W&&!_a){var c=b;if(oc&&(clearTimeout(oc),oc=null,xb(c,pc)))return void Da("doubleTap",c);if("mouse"===b.type)return void qc(a,b,"mouse");var d=a.target.tagName.toUpperCase();if("BUTTON"===d||e.hasClass(a.target,"pswp__single-tap"))return void qc(a,b);Ma(pc,c),oc=setTimeout(function(){qc(a,b),oc=null},300)}}}});var rc;za("DesktopZoom",{publicMethods:{initDesktopZoom:function(){L||(G?Ca("mouseUsed",function(){f.setupDesktopZoom()}):f.setupDesktopZoom(!0))},setupDesktopZoom:function(b){rc={};var c="wheel mousewheel DOMMouseScroll";Ca("bindEvents",function(){e.bind(a,c,f.handleMouseWheel)}),Ca("unbindEvents",function(){rc&&e.unbind(a,c,f.handleMouseWheel)}),f.mouseZoomedIn=!1;var d,g=function(){f.mouseZoomedIn&&(e.removeClass(a,"pswp--zoomed-in"),f.mouseZoomedIn=!1),s<1?e.addClass(a,"pswp--zoom-allowed"):e.removeClass(a,"pswp--zoom-allowed"),h()},h=function(){d&&(e.removeClass(a,"pswp--dragging"),d=!1)};Ca("resize",g),Ca("afterChange",g),Ca("pointerDown",function(){f.mouseZoomedIn&&(d=!0,e.addClass(a,"pswp--dragging"))}),Ca("pointerUp",h),b||g()},handleMouseWheel:function(a){if(s<=f.currItem.fitRatio)return i.modal&&(!i.closeOnScroll||_a||V?a.preventDefault():E&&Math.abs(a.deltaY)>2&&(l=!0,f.close())),!0;if(a.stopPropagation(),rc.x=0,"deltaX"in a)1===a.deltaMode?(rc.x=18*a.deltaX,rc.y=18*a.deltaY):(rc.x=a.deltaX,rc.y=a.deltaY);else if("wheelDelta"in a)a.wheelDeltaX&&(rc.x=-.16*a.wheelDeltaX),a.wheelDeltaY?rc.y=-.16*a.wheelDeltaY:rc.y=-.16*a.wheelDelta;else{if(!("detail"in a))return;rc.y=a.detail}Sa(s,!0);var b=pa.x-rc.x,c=pa.y-rc.y;(i.modal||b<=da.min.x&&b>=da.max.x&&c<=da.min.y&&c>=da.max.y)&&a.preventDefault(),f.panTo(b,c)},toggleDesktopZoom:function(b){b=b||{x:qa.x/2+sa.x,y:qa.y/2+sa.y};var c=i.getDoubleTapZoom(!0,f.currItem),d=s===c;f.mouseZoomedIn=!d,f.zoomTo(d?f.currItem.initialZoomLevel:c,b,333),e[(d?"remove":"add")+"Class"](a,"pswp--zoomed-in")}}});var sc,tc,uc,vc,wc,xc,yc,zc,Ac,Bc,Cc,Dc,Ec={history:!0,galleryUID:1},Fc=function(){return Cc.hash.substring(1)},Gc=function(){sc&&clearTimeout(sc),uc&&clearTimeout(uc)},Hc=function(){var a=Fc(),b={};if(a.length<5)return b;var c,d=a.split("&");for(c=0;c<d.length;c++)if(d[c]){var e=d[c].split("=");e.length<2||(b[e[0]]=e[1])}if(i.galleryPIDs){var f=b.pid;for(b.pid=0,c=0;c<Yb.length;c++)if(Yb[c].pid===f){b.pid=c;break}}else b.pid=parseInt(b.pid,10)-1;return b.pid<0&&(b.pid=0),b},Ic=function(){if(uc&&clearTimeout(uc),_a||V)return void(uc=setTimeout(Ic,500));vc?clearTimeout(tc):vc=!0;var a=m+1,b=_b(m);b.hasOwnProperty("pid")&&(a=b.pid);var c=yc+"&gid="+i.galleryUID+"&pid="+a;zc||Cc.hash.indexOf(c)===-1&&(Bc=!0);var d=Cc.href.split("#")[0]+"#"+c;Dc?"#"+c!==window.location.hash&&history[zc?"replaceState":"pushState"]("",document.title,d):zc?Cc.replace(d):Cc.hash=c,zc=!0,tc=setTimeout(function(){vc=!1},60)};za("History",{publicMethods:{initHistory:function(){if(e.extend(i,Ec,!0),i.history){Cc=window.location,Bc=!1,Ac=!1,zc=!1,yc=Fc(),Dc="pushState"in history,yc.indexOf("gid=")>-1&&(yc=yc.split("&gid=")[0],yc=yc.split("?gid=")[0]),Ca("afterChange",f.updateURL),Ca("unbindEvents",function(){e.unbind(window,"hashchange",f.onHashChange)});var a=function(){xc=!0,Ac||(Bc?history.back():yc?Cc.hash=yc:Dc?history.pushState("",document.title,Cc.pathname+Cc.search):Cc.hash=""),Gc()};Ca("unbindEvents",function(){l&&a()}),Ca("destroy",function(){xc||a()}),Ca("firstUpdate",function(){m=Hc().pid});var b=yc.indexOf("pid=");b>-1&&(yc=yc.substring(0,b),"&"===yc.slice(-1)&&(yc=yc.slice(0,-1))),setTimeout(function(){j&&e.bind(window,"hashchange",f.onHashChange)},40)}},onHashChange:function(){return Fc()===yc?(Ac=!0,void f.close()):void(vc||(wc=!0,f.goTo(Hc().pid),wc=!1))},updateURL:function(){Gc(),wc||(zc?sc=setTimeout(Ic,800):Ic())}}}),e.extend(f,eb)};return a});

  /*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
  * http://photoswipe.com
  * Copyright (c) 2019 Dmitry Semenov; */
  !function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.PhotoSwipeUI_Default=b()}(this,function(){"use strict";var a=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v=this,w=!1,x=!0,y=!0,z={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(a,b){return a.title?(b.children[0].innerHTML=a.title,!0):(b.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return a.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return a.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},A=function(a){if(r)return!0;a=a||window.event,q.timeToIdle&&q.mouseUsed&&!k&&K();for(var c,d,e=a.target||a.srcElement,f=e.getAttribute("class")||"",g=0;g<S.length;g++)c=S[g],c.onTap&&f.indexOf("pswp__"+c.name)>-1&&(c.onTap(),d=!0);if(d){a.stopPropagation&&a.stopPropagation(),r=!0;var h=b.features.isOldAndroid?600:30;s=setTimeout(function(){r=!1},h)}},B=function(){return!a.likelyTouchDevice||q.mouseUsed||screen.width>q.fitControlsWidth},C=function(a,c,d){b[(d?"add":"remove")+"Class"](a,"pswp__"+c)},D=function(){var a=1===q.getNumItemsFn();a!==p&&(C(d,"ui--one-slide",a),p=a)},E=function(){C(i,"share-modal--hidden",y)},F=function(){return y=!y,y?(b.removeClass(i,"pswp__share-modal--fade-in"),setTimeout(function(){y&&E()},300)):(E(),setTimeout(function(){y||b.addClass(i,"pswp__share-modal--fade-in")},30)),y||H(),!1},G=function(b){b=b||window.event;var c=b.target||b.srcElement;return a.shout("shareLinkClick",b,c),!!c.href&&(!!c.hasAttribute("download")||(window.open(c.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),y||F(),!1))},H=function(){for(var a,b,c,d,e,f="",g=0;g<q.shareButtons.length;g++)a=q.shareButtons[g],c=q.getImageURLForShare(a),d=q.getPageURLForShare(a),e=q.getTextForShare(a),b=a.url.replace("{{url}}",encodeURIComponent(d)).replace("{{image_url}}",encodeURIComponent(c)).replace("{{raw_image_url}}",c).replace("{{text}}",encodeURIComponent(e)),f+='<a href="'+b+'" target="_blank" class="pswp__share--'+a.id+'"'+(a.download?"download":"")+">"+a.label+"</a>",q.parseShareButtonOut&&(f=q.parseShareButtonOut(a,f));i.children[0].innerHTML=f,i.children[0].onclick=G},I=function(a){for(var c=0;c<q.closeElClasses.length;c++)if(b.hasClass(a,"pswp__"+q.closeElClasses[c]))return!0},J=0,K=function(){clearTimeout(u),J=0,k&&v.setIdle(!1)},L=function(a){a=a?a:window.event;var b=a.relatedTarget||a.toElement;b&&"HTML"!==b.nodeName||(clearTimeout(u),u=setTimeout(function(){v.setIdle(!0)},q.timeToIdleOutside))},M=function(){q.fullscreenEl&&!b.features.isOldAndroid&&(c||(c=v.getFullscreenAPI()),c?(b.bind(document,c.eventK,v.updateFullscreen),v.updateFullscreen(),b.addClass(a.template,"pswp--supports-fs")):b.removeClass(a.template,"pswp--supports-fs"))},N=function(){q.preloaderEl&&(O(!0),l("beforeChange",function(){clearTimeout(o),o=setTimeout(function(){a.currItem&&a.currItem.loading?(!a.allowProgressiveImg()||a.currItem.img&&!a.currItem.img.naturalWidth)&&O(!1):O(!0)},q.loadingIndicatorDelay)}),l("imageLoadComplete",function(b,c){a.currItem===c&&O(!0)}))},O=function(a){n!==a&&(C(m,"preloader--active",!a),n=a)},P=function(a){var c=a.vGap;if(B()){var g=q.barsSize;if(q.captionEl&&"auto"===g.bottom)if(f||(f=b.createEl("pswp__caption pswp__caption--fake"),f.appendChild(b.createEl("pswp__caption__center")),d.insertBefore(f,e),b.addClass(d,"pswp__ui--fit")),q.addCaptionHTMLFn(a,f,!0)){var h=f.clientHeight;c.bottom=parseInt(h,10)||44}else c.bottom=g.top;else c.bottom="auto"===g.bottom?0:g.bottom;c.top=g.top}else c.top=c.bottom=0},Q=function(){q.timeToIdle&&l("mouseUsed",function(){b.bind(document,"mousemove",K),b.bind(document,"mouseout",L),t=setInterval(function(){J++,2===J&&v.setIdle(!0)},q.timeToIdle/2)})},R=function(){l("onVerticalDrag",function(a){x&&a<.95?v.hideControls():!x&&a>=.95&&v.showControls()});var a;l("onPinchClose",function(b){x&&b<.9?(v.hideControls(),a=!0):a&&!x&&b>.9&&v.showControls()}),l("zoomGestureEnded",function(){a=!1,a&&!x&&v.showControls()})},S=[{name:"caption",option:"captionEl",onInit:function(a){e=a}},{name:"share-modal",option:"shareEl",onInit:function(a){i=a},onTap:function(){F()}},{name:"button--share",option:"shareEl",onInit:function(a){h=a},onTap:function(){F()}},{name:"button--zoom",option:"zoomEl",onTap:a.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(a){g=a}},{name:"button--close",option:"closeEl",onTap:a.close},{name:"button--arrow--left",option:"arrowEl",onTap:a.prev},{name:"button--arrow--right",option:"arrowEl",onTap:a.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){c.isFullscreen()?c.exit():c.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(a){m=a}}],T=function(){var a,c,e,f=function(d){if(d)for(var f=d.length,g=0;g<f;g++){a=d[g],c=a.className;for(var h=0;h<S.length;h++)e=S[h],c.indexOf("pswp__"+e.name)>-1&&(q[e.option]?(b.removeClass(a,"pswp__element--disabled"),e.onInit&&e.onInit(a)):b.addClass(a,"pswp__element--disabled"))}};f(d.children);var g=b.getChildByClass(d,"pswp__top-bar");g&&f(g.children)};v.init=function(){b.extend(a.options,z,!0),q=a.options,d=b.getChildByClass(a.scrollWrap,"pswp__ui"),l=a.listen,R(),l("beforeChange",v.update),l("doubleTap",function(b){var c=a.currItem.initialZoomLevel;a.getZoomLevel()!==c?a.zoomTo(c,b,333):a.zoomTo(q.getDoubleTapZoom(!1,a.currItem),b,333)}),l("preventDragEvent",function(a,b,c){var d=a.target||a.srcElement;d&&d.getAttribute("class")&&a.type.indexOf("mouse")>-1&&(d.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(d.tagName))&&(c.prevent=!1)}),l("bindEvents",function(){b.bind(d,"pswpTap click",A),b.bind(a.scrollWrap,"pswpTap",v.onGlobalTap),a.likelyTouchDevice||b.bind(a.scrollWrap,"mouseover",v.onMouseOver)}),l("unbindEvents",function(){y||F(),t&&clearInterval(t),b.unbind(document,"mouseout",L),b.unbind(document,"mousemove",K),b.unbind(d,"pswpTap click",A),b.unbind(a.scrollWrap,"pswpTap",v.onGlobalTap),b.unbind(a.scrollWrap,"mouseover",v.onMouseOver),c&&(b.unbind(document,c.eventK,v.updateFullscreen),c.isFullscreen()&&(q.hideAnimationDuration=0,c.exit()),c=null)}),l("destroy",function(){q.captionEl&&(f&&d.removeChild(f),b.removeClass(e,"pswp__caption--empty")),i&&(i.children[0].onclick=null),b.removeClass(d,"pswp__ui--over-close"),b.addClass(d,"pswp__ui--hidden"),v.setIdle(!1)}),q.showAnimationDuration||b.removeClass(d,"pswp__ui--hidden"),l("initialZoomIn",function(){q.showAnimationDuration&&b.removeClass(d,"pswp__ui--hidden")}),l("initialZoomOut",function(){b.addClass(d,"pswp__ui--hidden")}),l("parseVerticalMargin",P),T(),q.shareEl&&h&&i&&(y=!0),D(),Q(),M(),N()},v.setIdle=function(a){k=a,C(d,"ui--idle",a)},v.update=function(){x&&a.currItem?(v.updateIndexIndicator(),q.captionEl&&(q.addCaptionHTMLFn(a.currItem,e),C(e,"caption--empty",!a.currItem.title)),w=!0):w=!1,y||F(),D()},v.updateFullscreen=function(d){d&&setTimeout(function(){a.setScrollOffset(0,b.getScrollY())},50),b[(c.isFullscreen()?"add":"remove")+"Class"](a.template,"pswp--fs")},v.updateIndexIndicator=function(){q.counterEl&&(g.innerHTML=a.getCurrentIndex()+1+q.indexIndicatorSep+q.getNumItemsFn())},v.onGlobalTap=function(c){c=c||window.event;var d=c.target||c.srcElement;if(!r)if(c.detail&&"mouse"===c.detail.pointerType){if(I(d))return void a.close();b.hasClass(d,"pswp__img")&&(1===a.getZoomLevel()&&a.getZoomLevel()<=a.currItem.fitRatio?q.clickToCloseNonZoomable&&a.close():a.toggleDesktopZoom(c.detail.releasePoint))}else if(q.tapToToggleControls&&(x?v.hideControls():v.showControls()),q.tapToClose&&(b.hasClass(d,"pswp__img")||I(d)))return void a.close()},v.onMouseOver=function(a){a=a||window.event;var b=a.target||a.srcElement;C(d,"ui--over-close",I(b))},v.hideControls=function(){b.addClass(d,"pswp__ui--hidden"),x=!1},v.showControls=function(){x=!0,w||v.update(),b.removeClass(d,"pswp__ui--hidden")},v.supportsFullscreen=function(){var a=document;return!!(a.exitFullscreen||a.mozCancelFullScreen||a.webkitExitFullscreen||a.msExitFullscreen)},v.getFullscreenAPI=function(){var b,c=document.documentElement,d="fullscreenchange";return c.requestFullscreen?b={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:d}:c.mozRequestFullScreen?b={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+d}:c.webkitRequestFullscreen?b={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+d}:c.msRequestFullscreen&&(b={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),b&&(b.enter=function(){return j=q.closeOnScroll,q.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?a.template[this.enterK]():void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},b.exit=function(){return q.closeOnScroll=j,document[this.exitK]()},b.isFullscreen=function(){return document[this.elementK]}),b}};return a});
})();

/*============================================================================
 Underground Functions
==============================================================================*/
var Events = new EventEmitter3();
Events.trigger = Events.emit; // trigger alias

window.WAU = window.WAU || {};

WAU.Popover = (() => {
  return {
    show: (name) => {
      if (!name) {
        console.log('Error. Must provide a name.');
        return false;
      }
      document.getElementById(name)?.showPopover();
    },
    hide: (name) => {
      if (!name) {
        console.log('Error. Must provide a name.');
        return false;
      }
      document.getElementById(name)?.hidePopover();
    }
  }
})();

WAU.Slideout = (() => {
  return {
    _openByName(id) {
      WAU.Popover.show(id);
    },
    _closeByName(id) {
      WAU.Popover.hide(id);
    }
  }
})();

WAU.Modal = (() => {
  return {
    _openByName(id) {
      WAU.Popover.show(id);
    },
    _closeByName(id) {
      WAU.Popover.hide(id);
    }
  }
})();

WAU.Sections = (function() {
	document.querySelectorAll('[data-section-type]').forEach(function(container) {

		let callback = (entries, observer) => {
			entries.forEach(entry => {
				if ( entry.isIntersecting ) {
					if (container.hasAttribute('data-section-loaded') ) {
						container.setAttribute('data-section-loaded', 'true');
					}
				}
			});
		};

		let observer = new IntersectionObserver(callback);
		observer.observe(container);

		document.addEventListener('shopify:section:select', function(event){
			if ( container.dataset.sectionId == event.detail.sectionId ) {
				if (container.hasAttribute('data-section-loaded') ) {
					event.target.classList.add('section--reloaded');
				}
			}
		});
		document.addEventListener('shopify:section:load', function(event){
			event.target.classList.add('section--reloaded');
		});

	});
})();

WAU.ProductGridVideo = {
  init: function init() {
    document.querySelectorAll('.js-bg-video-wrapper').forEach(function(element){
      WAU.ProductGridVideo.initVideo(element);
    });
  },
  initVideo: function initVideo(element) {
    var selectorId = element.dataset.productId,
        videoUrl = element.dataset.videoUrl,
        selector = '.js-bg-video-' + selectorId + ':not(.is-active)';

    var el = document.querySelector(selector);

    if (!el) {
      return false;
    }

    var options = {
      mp4: videoUrl,
    }
    var instance = new vidbg(selector, options);

    el.classList.add('is-active');

    document.addEventListener("shopify:section:unload", function(event) {
      WAU.ProductGridVideo.destroyVideo(instance);
    });
    document.addEventListener("shopify:section:select", function(event) {
      WAU.ProductGridVideo.reinitVideo(selector, options);
    });

    WAU.ProductGridVideo.addIntersectionObserver(instance);

  },
  addIntersectionObserver: function addIntersectionObserver(instance) {
    if (!instance) {
      console.error('No instance provided to the function.');
      return false;
    }
    if ('IntersectionObserver' in window) {

      const target = instance.videoEl;

      if (!target) {
        console.error('Error. not a valid target to observe.');
        return false;
      }

      function callback(entries, observer) {
        entries.forEach(entry => {
          // If intersection
          if (entry.isIntersecting) {
            if (!instance.isVideoPlaying()) {
              instance.playVideo();
            }
          } else {
            if (instance.isVideoPlaying()) {
              instance.pauseVideo();
            }
          }
        });
      };

      function observeElementHandler(event) {
        let observer = new IntersectionObserver(callback);
        observer.observe(target);
        target.removeEventListener('playing', observeElementHandler);
      };

      target.addEventListener('playing', observeElementHandler);
    } else {
      console.log('Intersection observer API not supported in this browser.');
    }
  },
  destroyVideo: function destroyVideo(element) {
    element.destroy();
  },
  reinitVideo: function reinitVideo(selector, options) {
    var instance = new vidbg(selector, options);
    return instance;
  }
}

if (window.Shopify && window.Shopify.theme && navigator.sendBeacon && window.Shopify.designMode) {
  if (!sessionStorage.getItem('beaconSent')) {
    try {
      const url = 'https://api.weareunderground.com/beacon';

      const themeName = Shopify.theme?.name || 'Unknown';
      const themeVersion = Shopify.theme?.schema_version || 'Unknown';

      console.log("Theme Name:", themeName, "Theme Version:", themeVersion);

      const params = new URLSearchParams({
        shop: window.Shopify.shop,
        themeName: `${themeName} v${themeVersion}`,
        role: window.Shopify.theme.role,
        route: window.location.pathname,
        themeId: window.Shopify.theme.id,
        themeStoreId: window.Shopify.theme.theme_store_id || 0,
        isThemeEditor: !!window.Shopify.designMode
      });

      if (!navigator.sendBeacon(url, params)) {
        fetch(url, { method: 'POST', body: params }).catch(() => {});
      }
      sessionStorage.setItem('beaconSent', 'true');
    } catch (error) {
    }
  }
}

/*============================================================================
 Theme Functions
==============================================================================*/
window.theme = window.theme || {};

theme.a11yHelpers = (function () {

 let alreadySetUpKeyEvents = false;

 /*
  * @description - Sets up the aria-expanded property to true and false on hover.
  */
 function setUpAriaExpansion() {
   const ariaExpandEls = document.querySelectorAll('.js-aria-expand');

   ariaExpandEls.forEach(function (ariaExpandEl) {
     ariaExpandEl.addEventListener('mouseover', function (event) {
       ariaExpandEl.setAttribute('aria-expanded', 'true');
   });

     ariaExpandEl.addEventListener('mouseout', function (event) {
       ariaExpandEl.setAttribute('aria-expanded', 'false');
     });
   });
 }

   /*
  * @description - Takes a parent element and focuses on the next focusable element inside of there.
  */
 function focusOnElement(parent) {
   var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

   const elementToFocusOn = parent.querySelector(focussableElements);

   if (elementToFocusOn) {
     elementToFocusOn.focus();
   }

 }

 function findFocusableElement(parent, element, direction) {
   const focusableElementSelectors = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
   const focusableElements = parent.querySelectorAll(focusableElementSelectors);
   const numOfFocusableElements = focusableElements.length;

   var elementIndex = 0;

   for (let i = 0; i < focusableElements.length; i += 1) {
     let currentElement = focusableElements[i];

     if (currentElement === element) {
       elementIndex = i;
     }
   }

   if (direction === 'next') {
     if (elementIndex === (numOfFocusableElements - 1)) {
       return focusableElements[0];
     } else {
       return focusableElements[elementIndex + 1];
     }
   }

   if (direction === 'prev') {
     if (elementIndex === 0) {
       return focusableElements[numOfFocusableElements - 1];
     } else {
       return focusableElements[elementIndex - 1];
     }
   }
 }

 /*
  * @description - Takes a parent and a dom node and returns the next element that is focusable that is not the current element.
  * @param parent:DOMNode
  * @param element:DOMNode
  * @return DOMNode
  */
 function findNextFocusableElement(parent, element) {
   return findFocusableElement(parent, element, 'next');
 }

 function findPreviousFocusableElement(parent, element) {
   return findFocusableElement(parent, element, 'prev');
 }

   /*
  * @description - Enables accessible keyboard navigation throughout the navigation menus.
  */
 function setUpAccessibleNavigationMenus() {

   function closeDropdownMenus() {
     const activeMenuItems = document.querySelectorAll('.navigation__menuitem--active');
     activeMenuItems.forEach(function (activeMenuItem) {
       activeMenuItem.classList.remove('navigation__menuitem--active');
       activeMenuItem.setAttribute('aria-expanded', 'false');
     });
   }

   function closeNestedDropdownMenus() {
     //remove the class that makes the dropdown show... the active class
     const nestedDropdowns = document.querySelectorAll(".js-menuitem-with-nested-dropdown");

     nestedDropdowns.forEach(function (nestedDropdown) {
       nestedDropdown.classList.remove("dropdown__menuitem--active");
       nestedDropdown.setAttribute('aria-expanded', 'false');
     });

   }

   function closeNestedMegaMenuDropdownMenus() {
     const nestedDropdowns = document.querySelectorAll(".js-megamenu-listitem-with-nested-dropdown");

     nestedDropdowns.forEach(function (nestedDropdown) {
       nestedDropdown.classList.remove("megamenu__listitem--active");
       nestedDropdown.setAttribute('aria-expanded', 'false');
     });
   }

   function addEdgeToDropdown(dropdown) {
     setTimeout(function () {
       if (theme.DOMHelpers.isElementPastEdge(dropdown)) {
         dropdown.classList.add("dropdown--edge");
       } else {
         dropdown.classList.remove("dropdown--edge");
       }
     }, 0);
   }

   if (!alreadySetUpKeyEvents) {
     document.addEventListener('keyup', function (event) {
       if (event.key === 'Escape') {
         const openNestedDropdownMenus = document.querySelectorAll(".dropdown__menuitem--active"),
               openDropdownMenus = document.querySelectorAll(".navigation__menuitem--active"),
               openMegaMenuNestedDropdownMenus = document.querySelectorAll(".megamenu__listitem--active");

         event.preventDefault();

         if (openNestedDropdownMenus.length >= 1) {
           closeNestedDropdownMenus();
           return;
         }

         if (openMegaMenuNestedDropdownMenus.length >= 1){
           closeNestedMegaMenuDropdownMenus();
           return;
         }

         if (openDropdownMenus.length >= 1) {
           closeDropdownMenus();
           return;
         }

       }
     });
   }

   if (!alreadySetUpKeyEvents) {
     document.addEventListener('keydown', function (event) {
       if (event.key === 'Enter') {

         if (document.activeElement.classList.contains("js-open-dropdown-on-key") || document.activeElement.parentNode.classList.contains("js-menuitem-with-nested-dropdown") || document.activeElement.parentNode.classList.contains("js-megamenu-listitem-with-nested-dropdown")) {
           event.stopPropagation();
           event.preventDefault();
         }

         if (document.activeElement.parentNode.classList.contains("navigation__menuitem--active")) {
           closeDropdownMenus();
           return;
         }

         if (document.activeElement.parentNode.classList.contains("dropdown__menuitem--active")) {
           closeNestedDropdownMenus();
           return;
         }

         if (document.activeElement.parentNode.classList.contains("megamenu__listitem--active")) {
           closeNestedMegaMenuDropdownMenus();
           return;
         }

         if (document.activeElement.classList.contains("js-open-dropdown-on-key")) {
           document.activeElement.parentNode.classList.add("navigation__menuitem--active"); // Show the menu by adding the appropriate class.
           return;
         }

         if (document.activeElement.parentNode.classList.contains("js-menuitem-with-nested-dropdown")) {
           document.activeElement.parentNode.classList.add("dropdown__menuitem--active");
           addEdgeToDropdown(document.activeElement.parentNode);
           return;
         }

         if (document.activeElement.parentNode.classList.contains("js-megamenu-listitem-with-nested-dropdown")) {
           document.activeElement.parentNode.classList.add("megamenu__listitem--active");
           addEdgeToDropdown(document.activeElement.parentNode);
           return;
         }

       }
     });
   }

   alreadySetUpKeyEvents = true;

 }

 return {
   setUpAriaExpansion: setUpAriaExpansion,
   setUpAccessibleNavigationMenus: setUpAccessibleNavigationMenus,
   focusOnElement: focusOnElement
 }

}());

theme.DOMHelpers = (function () {

	/*
	 * @description - Determines if an element is off screen or not.
	 * @param element:<Node> - A DOMNode
	 * @return Boolean
	 */
	function isElementPastEdge(element) {
		const bounding = element.getBoundingClientRect(),
					l = bounding.left,
					w = bounding.width,
					docH = document.documentElement.clientHeight,
					docW = document.documentElement.clientWidth;

		return (l + w >= docW);
	}

    // Check if an element is out of bounds
  function isOutOfBounds(elem) {

   if (!elem) {
     console.log('Error. Must provide element to check out of bounds');
     return false;
   }

   // Get element's bounding.
   var bounding = elem.getBoundingClientRect();

   // Check if it's out of the viewport on each side
   var out = {};
   out.left = bounding.left < 0;
   out.leftAmount = bounding.left;
   out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
   out.rightAmount = bounding.right - (window.innerWidth || document.documentElement.clientWidth);
   out.any = out.top || out.left || out.bottom || out.right;
   out.all = out.top && out.left && out.bottom && out.right;

   return out;

  };

  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {NodeList} options.tables - Elements of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */

   function wrapTable(options) {
     options.tables.forEach(function(table) {
       var wrapper = document.createElement('div');
       wrapper.classList.add(options.tableWrapperClass);
       table.parentNode.insertBefore(wrapper, table);
       wrapper.appendChild(table);
     });
   }

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {NodeList} options.iframes - Elements of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
   function wrapIframe(options) {
     options.iframes.forEach(function(iframe) {
       var wrapper = document.createElement('div');
       wrapper.classList.add(options.iframeWrapperClass);
       iframe.parentNode.insertBefore(wrapper, iframe);
       wrapper.appendChild(iframe);
       iframe.src = iframe.src;
     });
   }

   /*
    * @description - Adjust element's x (horizontal) position to be on screen
    * @param element: <node> - A DOM element
    * @param number:         - How much padding to add
    * @return Boolean
    */
   function adjustElementXPosition(element, padding) {
       const bounding = element.getBoundingClientRect(),
             l = bounding.left,
             w = bounding.width,
             docH = document.documentElement.clientHeight,
             docW = document.documentElement.clientWidth;

       const adjustAmount = (l + w) - docW;
       if (adjustAmount > 0) {
         element.style.transform = `translateX(-${adjustAmount + padding}px)`;
         return true;
       } else {
         return false;
       }
   }

	return {
		isElementPastEdge: isElementPastEdge,
    isOutOfBounds: isOutOfBounds,
    wrapIframe: wrapIframe,
    wrapTable: wrapTable,
    adjustElementXPosition: adjustElementXPosition
	};

}());

theme.Helpers = (function() {
  var touchDevice = false;

  function setTouch() {
    touchDevice = true;
  }

  function isTouch() {
    return touchDevice;
  }

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this,
        args = arguments;

      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function makeSticky(amountToScroll, elementClass, elementHeight) {
    const clearElement = document.querySelector(".js-clear-element"),
          stickyElement = document.querySelector(elementClass),
          height = elementHeight  + "px";

    if (window.pageYOffset >= amountToScroll) {
      stickyElement.classList.add('sticky--active');
      clearElement.style.height = height;
    } else {
      stickyElement.classList.remove('sticky--active');
      clearElement.style.height = "0px";
    }
  }

  function Toggle(id) {
    var element = document.getElementById(id);
    if ( element.classList.contains('animate-hide') ) {
      element.classList.remove("animate-hide", "fadeOut");
      element.classList.add("animate-show", "fadeIn");
      element.style.visibility = "visible";
    } else {
      element.classList.remove("animate-show", "fadeIn");
      element.classList.add("animate-hide", "fadeOut");
      element.style.visibility = "hidden";
    }
  }

  function toggleClass(id, className) {
    var element = document.getElementById(id);
    if (!element) return false;
    if ( element.classList.contains(className) ) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  function Accordion(container, tlink, submenu) {

    let accorContent = container.querySelector(submenu);

    if ( !container.querySelector(tlink) ) return false;

    container.querySelector(tlink).addEventListener('click', function(event) {
      event.preventDefault();

      // Toggle class on label and update a11y
      if ( this.classList.contains('closed') ) {
        this.classList.remove('closed');
        this.parentElement.classList.remove('closed');
        this.setAttribute('aria-expanded', 'true');
      } else {
        this.classList.add('closed');
        this.parentElement.classList.add('closed');
        this.setAttribute('aria-expanded', 'false');
      }

      // Show content
      if ( accorContent.classList.contains('closed') ) {
        accorContent.classList.remove("closed");
        accorContent.style.display = "block";
      } else {
        accorContent.classList.add("closed");
        accorContent.style.display = "none";
      }

    });
  }

  function fadeOut(el){
    el.style.opacity = 1;

    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el, display){
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  function smoothScrollTo(endX, endY, duration) {
     let startX = window.scrollX || window.pageXOffset,
     startY = window.scrollY || window.pageYOffset,
     distanceX = endX - startX,
     distanceY = endY - startY,
     startTime = new Date().getTime();
     // Easing function
     let easeInOutQuart = function(time, from, distance, duration) {
         if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
         return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
     };
     let timer = window.setInterval(function() {
         let time = new Date().getTime() - startTime,
         newX = easeInOutQuart(time, startX, distanceX, duration),
         newY = easeInOutQuart(time, startY, distanceY, duration);
         if (time >= duration) {
             window.clearInterval(timer);
         }
         window.scrollTo(newX, newY);
     }, 1000 / 60); // 60 fps
  }

  function formatMoney(cents, format) {
    const moneyFormat = '${{amount}}';

    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || moneyFormat;

    function formatWithDelimiters(
      number,
      precision = 2,
      thousands = ',',
      decimal = '.'
    ) {
      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      const parts = number.split('.');
      const dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        `$1${thousands}`
      );
      const centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  function scriptLoader() {
    /**
     * Promise-based script loader
     * @param {string} url
     * @param {object=} attr
     * @returns {Promise}
     */
    const loader = (url, attr) => new Promise((resolve, reject) => {
      const script = window.document.createElement('script');
      script.src = url;
      script.async = true;
      script.crossOrigin = 'anonymous';

      attr = attr || {};

      for (const attrName in attr) {
        script[attrName] = attr[attrName];
      }

      script.addEventListener('load', () => {
        resolve(script);
      }, false);

      script.addEventListener('error', () => {
        reject(script);
      }, false);

      function scriptExists(url) {
        return document.querySelectorAll(`script[src="${url}"]`).length > 0;
      }

      if ( !scriptExists(url) ) {
        window.document.head.appendChild(script);
      } else {
        resolve(script);
      }

    });

    /**
     * Loads scripts asynchronously
     * @param {string|string[]} urls
     * @param {object=} attr Other script tag attributes
     * @returns {Promise}
     */
    this.load = (urls, attr) => {
      if (!Array.isArray(urls)) {
        urls = [urls];
      }

      return Promise.all(urls.map(url => loader(url, attr)));
    }

    /**
     * Loads scripts asynchronously. It supports multiple url arguments, so each one will be loaded right after the
     * previous is loaded. This is a way of chaining dependency loading.
     *
     * @param {string|string[]} urls, ...
     * @returns {Promise}
     */
    this.loadChain = function (urls) {
      const args = Array.isArray(arguments) ? arguments : Array.prototype.slice.call(arguments);
      const p = this.require(args.shift());
      const self = this;
      return args.length ? p.then(() => {
        self.requireChain(...args);
      }) : p;
    }
  }

  function scriptExists(url) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
  }

  return {
    setTouch: setTouch,
    isTouch: isTouch,
    debounce: debounce,
    makeSticky: makeSticky,
    Toggle: Toggle,
    toggleClass: toggleClass,
    Accordion: Accordion,
    fadeOut: fadeOut,
    fadeIn: fadeIn,
    getScrollbarWidth: getScrollbarWidth,
    smoothScrollTo: smoothScrollTo,
    formatMoney: formatMoney,
    scriptLoader,
    scriptExists,
  };
})();

theme.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    youtubeSdk: {
      tagId: 'youtube-sdk',
      src: 'https://www.youtube.com/iframe_api',
      type: types.script
    },
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();

/* ---- WAU SECTIONS - v1.0 ---- */
WAU.Sections = (function() {
	document.querySelectorAll('[data-section-type]').forEach(function(container) {

    // Pre-load vendor before section script
    if (container.hasAttribute('data-preload-vendor')) {
      const loader = new theme.Helpers.scriptLoader();
      loader.load([container.dataset.preloadVendor]).then(({length}) => {
        // console.log(container.dataset.sectionType + ' script loaded');
      });
    }

    // Load these containers instantly
    if (container.hasAttribute('data-asset-preload')) {
      loadAssets(container);
      if (container.hasAttribute('data-section-loaded') ) {
        container.setAttribute('data-section-loaded', 'true');
      }
    }

		let callback = (entries, observer) => {
			entries.forEach(entry => {
				if ( entry.isIntersecting ) {
					loadAssets(container);
					if (container.hasAttribute('data-section-loaded') ) {
						container.setAttribute('data-section-loaded', 'true');
					}
				}
			});
		};

		let observer = new IntersectionObserver(callback);
		observer.observe(container);

		function loadAssets (container) {
			// Load section assets
			if ( container.dataset.assetUrl ) {
				const loader = new theme.Helpers.scriptLoader();
				loader.load([container.dataset.assetUrl]).then(({length}) => {
					// console.log(container.dataset.sectionType + ' script loaded');
				});
			}
		}

		document.addEventListener('shopify:section:select', function(event){
			if ( container.dataset.sectionId == event.detail.sectionId ) {
				if (container.hasAttribute('data-section-loaded') ) {
					event.target.classList.add('section--reloaded');
				}
			}
		});
		document.addEventListener('shopify:section:load', function(event){
      loadAssets(event.target.querySelector('[data-section-type]'));
			event.target.classList.add('section--reloaded');
		});

	});
})();

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];
  document.addEventListener(
    'shopify:section:load',
    this._onSectionLoad.bind(this)
  );
  document.addEventListener(
    'shopify:section:unload',
    this._onSectionUnload.bind(this)
  );
  document.addEventListener(
    'shopify:section:select',
    this._onSelect.bind(this)
  );
  document.addEventListener(
    'shopify:section:deselect',
    this._onDeselect.bind(this)
  );
  document.addEventListener(
    'shopify:block:select',
    this._onBlockSelect.bind(this)
  );
  document.addEventListener(
    'shopify:block:deselect',
    this._onBlockDeselect.bind(this)
  );
};

theme.Sections.prototype = Object.assign({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var id = container.getAttribute('data-section-id');
    var type = container.getAttribute('data-section-type');
    constructor = constructor || this.constructors[type];
    if (typeof constructor === 'undefined') {
      return;
    }
    var instance = Object.assign(new constructor(container), {
      id: id,
      type: type,
      container: container
    });
    this.instances.push(instance);
  },
  _onSectionLoad: function(evt) {
    var container = document.querySelector(
      '[data-section-id="' + evt.detail.sectionId + '"]'
    );
    if (container) {
      this._createInstance(container);
    }
  },
  _onSectionUnload: function(evt) {
    this.instances = this.instances.filter(function(instance) {
      var isEventInstance = instance.id === evt.detail.sectionId;
      if (isEventInstance) {
        if (typeof instance.onUnload === 'function') {
          instance.onUnload(evt);
        }
      }
      return !isEventInstance;
    });
  },
  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });
    if (
      typeof instance !== 'undefined' &&
      typeof instance.onSelect === 'function'
    ) {
      instance.onSelect(evt);
    }
  },
  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });
    if (
      typeof instance !== 'undefined' &&
      typeof instance.onDeselect === 'function'
    ) {
      instance.onDeselect(evt);
    }
  },
  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });
    if (
      typeof instance !== 'undefined' &&
      typeof instance.onBlockSelect === 'function'
    ) {
      instance.onBlockSelect(evt);
    }
  },
  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = this.instances.find(function(instance) {
      return instance.id === evt.detail.sectionId;
    });
    if (
      typeof instance !== 'undefined' &&
      typeof instance.onBlockDeselect === 'function'
    ) {
      instance.onBlockDeselect(evt);
    }
  },
  register: function(type, constructor) {
    this.constructors[type] = constructor;
    document.querySelectorAll('[data-section-type="' + type + '"]').forEach(
      function(container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

theme.Disclosure = (function() {
  var selectors = {
    disclosureForm: '[data-disclosure-form]',
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
  };

  var classes = {
    listVisible: 'disclosure-list--visible'
  };

  function Disclosure(disclosure) {
    this.container = disclosure;
    this._cacheSelectors();
    this._setupListeners();
  }

  Disclosure.prototype = Object.assign({}, Disclosure.prototype, {
    _cacheSelectors: function() {
      this.cache = {
        disclosureForm: this.container.closest(selectors.disclosureForm),
        disclosureList: this.container.querySelector(selectors.disclosureList),
        disclosureToggle: this.container.querySelector(
          selectors.disclosureToggle
        ),
        disclosureInput: this.container.querySelector(
          selectors.disclosureInput
        ),
        disclosureOptions: this.container.querySelectorAll(
          selectors.disclosureOptions
        )
      };
    },

    _setupListeners: function() {
      this.eventHandlers = this._setupEventHandlers();

      this.cache.disclosureToggle.addEventListener(
        'click',
        this.eventHandlers.toggleList
      );

      this.cache.disclosureOptions.forEach(function(disclosureOption) {
        disclosureOption.addEventListener(
          'click',
          this.eventHandlers.connectOptions
        );
      }, this);

      this.container.addEventListener(
        'keyup',
        this.eventHandlers.onDisclosureKeyUp
      );

      this.cache.disclosureList.addEventListener(
        'focusout',
        this.eventHandlers.onDisclosureListFocusOut
      );

      this.cache.disclosureToggle.addEventListener(
        'focusout',
        this.eventHandlers.onDisclosureToggleFocusOut
      );

      document.body.addEventListener('click', this.eventHandlers.onBodyClick);
    },

    _setupEventHandlers: function() {
      return {
        connectOptions: this._connectOptions.bind(this),
        toggleList: this._toggleList.bind(this),
        onBodyClick: this._onBodyClick.bind(this),
        onDisclosureKeyUp: this._onDisclosureKeyUp.bind(this),
        onDisclosureListFocusOut: this._onDisclosureListFocusOut.bind(this),
        onDisclosureToggleFocusOut: this._onDisclosureToggleFocusOut.bind(this)
      };
    },

    _connectOptions: function(event) {
      event.preventDefault();

      this._submitForm(event.currentTarget.dataset.value);
    },

    _onDisclosureToggleFocusOut: function(event) {
      var disclosureLostFocus =
        this.container.contains(event.relatedTarget) === false;

      if (disclosureLostFocus) {
        this._hideList();
      }
    },

    _onDisclosureListFocusOut: function(event) {
      var childInFocus = event.currentTarget.contains(event.relatedTarget);

      var isVisible = this.cache.disclosureList.classList.contains(
        classes.listVisible
      );

      if (isVisible && !childInFocus) {
        this._hideList();
      }
    },

    _onDisclosureKeyUp: function(event) {
      if (event.which !== 27) return;
      this._hideList();
      this.cache.disclosureToggle.focus();
    },

    _onBodyClick: function(event) {
      var isOption = this.container.contains(event.target);
      var isVisible = this.cache.disclosureList.classList.contains(
        classes.listVisible
      );

      if (isVisible && !isOption) {
        this._hideList();
      }
    },

    _submitForm: function(value) {
      this.cache.disclosureInput.value = value;
      this.cache.disclosureForm.submit();
    },

    _hideList: function() {
      this.cache.disclosureList.classList.remove(classes.listVisible);
      this.cache.disclosureToggle.setAttribute('aria-expanded', false);
    },

    _toggleList: function() {
      var ariaExpanded =
        this.cache.disclosureToggle.getAttribute('aria-expanded') === 'true';
      this.cache.disclosureList.classList.toggle(classes.listVisible);
      this.cache.disclosureToggle.setAttribute('aria-expanded', !ariaExpanded);
    },

    destroy: function() {
      this.cache.disclosureToggle.removeEventListener(
        'click',
        this.eventHandlers.toggleList
      );

      this.cache.disclosureOptions.forEach(function(disclosureOption) {
        disclosureOption.removeEventListener(
          'click',
          this.eventHandlers.connectOptions
        );
      }, this);

      this.container.removeEventListener(
        'keyup',
        this.eventHandlers.onDisclosureKeyUp
      );

      this.cache.disclosureList.removeEventListener(
        'focusout',
        this.eventHandlers.onDisclosureListFocusOut
      );

      this.cache.disclosureToggle.removeEventListener(
        'focusout',
        this.eventHandlers.onDisclosureToggleFocusOut
      );

      document.body.removeEventListener(
        'click',
        this.eventHandlers.onBodyClick
      );
    }
  });

  return Disclosure;
})();

/*============================================================================
 Shopify Functions
==============================================================================*/
Shopify.theme.cart = (function (exports) {
  'use strict';

  function getDefaultRequestConfig() {
    return JSON.parse(
      JSON.stringify({
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;'
        }
      })
    );
  }

  function fetchJSON(url, config) {
    return fetch(url, config).then(function(response) {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }

  function cart() {
    return fetchJSON('/cart.js', getDefaultRequestConfig());
  }

  function cartAdd(id, quantity, properties) {
    var config = getDefaultRequestConfig();

    config.method = 'POST';
    config.body = JSON.stringify({
      id: id,
      quantity: quantity,
      properties: properties
    });

    return fetchJSON('/cart/add.js', config);
  }

  function cartAddFromForm(formData) {
    var config = getDefaultRequestConfig();
    delete config.headers['Content-Type'];

    config.method = 'POST';
    config.body = formData;

    return fetchJSON('/cart/add.js', config);
  }

  function cartChange(line, options) {
    var config = getDefaultRequestConfig();

    options = options || {};

    config.method = 'POST';
    config.body = JSON.stringify({
      line: line,
      quantity: options.quantity,
      properties: options.properties
    });

    return fetchJSON('/cart/change.js', config);
  }

  // Plus use update endpoint for multiple items
  function plusCartUpdate(items, options) {
    var config = getDefaultRequestConfig();
    var updateData = {};
    for (let item in items) {
      updateData[item] = options.quantity;
    }
    options = options || {};

    config.method = "POST";
    config.body = JSON.stringify({
      updates: updateData,
      quantity: options.quantity,
      properties: options.properties,
    });

    return fetchJSON(window.Shopify.routes.root + "cart/update.js", config);
  }

  function cartClear() {
    var config = getDefaultRequestConfig();
    config.method = 'POST';

    return fetchJSON('/cart/clear.js', config);
  }

  function cartUpdate(body) {
    var config = getDefaultRequestConfig();

    config.method = 'POST';
    config.body = JSON.stringify(body);

    return fetchJSON('/cart/update.js', config);
  }

  function cartShippingRates() {
    return fetchJSON('/cart/shipping_rates.json', getDefaultRequestConfig());
  }

  function key(key) {
    if (typeof key !== 'string' || key.split(':').length !== 2) {
      throw new TypeError(
        'Theme Cart: Provided key value is not a string with the format xxx:xxx'
      );
    }
  }

  function quantity(quantity) {
    if (typeof quantity !== 'number' || isNaN(quantity)) {
      throw new TypeError(
        'Theme Cart: An object which specifies a quantity or properties value is required'
      );
    }
  }

  function id(id) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new TypeError('Theme Cart: Variant ID must be a number');
    }
  }

  function properties(properties) {
    if (typeof properties !== 'object') {
      throw new TypeError('Theme Cart: Properties must be an object');
    }
  }

  function form(form) {
    if (!(form instanceof HTMLFormElement)) {
      throw new TypeError('Theme Cart: Form must be an instance of HTMLFormElement');
    }
  }

  function options(options) {
    if (typeof options !== 'object') {
      throw new TypeError('Theme Cart: Options must be an object');
    }

    if (
      typeof options.quantity === 'undefined' &&
      typeof options.properties === 'undefined'
    ) {
      throw new Error(
        'Theme Cart: You muse define a value for quantity or properties'
      );
    }

    if (typeof options.quantity !== 'undefined') {
      quantity(options.quantity);
    }

    if (typeof options.properties !== 'undefined') {
      properties(options.properties);
    }
  }

  /**
   * Cart Template Script
   * ------------------------------------------------------------------------------
   * A file that contains scripts highly couple code to the Cart template.
   *
   * @namespace cart
   */

  /**
   * Returns the state object of the cart
   * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
   */
  function getState() {
    return cart().then(function(cart) {
      Events.trigger("cart:ready", cart)
    });
  }

  /**
   * Returns the object of the cart
   * @returns {Promise} Resolves with the object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
   */
  function getCart() {
    return cart().then(function(cart) {
      return cart;
    });
  }

  /**
   * Returns the index of the cart line item
   * @param {string} key The unique key of the line item
   * @returns {Promise} Resolves with the index number of the line item
   */
  function getItemIndex(key$$1) {
    key(key$$1);

    return cart().then(function(state) {
      var index = -1;

      state.items.forEach(function(item, i) {
        index = item.key === key$$1 ? i + 1 : index;
      });

      if (index === -1) {
        return Promise.reject(
          new Error('Theme Cart: Unable to match line item with provided key')
        );
      }

      return index;
    });
  }

  /**
   * Fetches the line item object
   * @param {string} key The unique key of the line item
   * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
   */
  function getItem(key$$1) {
    key(key$$1);

    return cart().then(function(state) {
      var lineItem = null;

      state.items.forEach(function(item) {
        lineItem = item.key === key$$1 ? item : lineItem;
      });

      if (lineItem === null) {
        return Promise.reject(
          new Error('Theme Cart: Unable to match line item with provided key')
        );
      }
      return lineItem;
    });
  }

  /**
   * Add a new line item to the cart
   * @param {number} id The variant's unique ID
   * @param {object} options Optional values to pass to /cart/add.js
   * @param {number} options.quantity The quantity of items to be added to the cart
   * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
   * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
   */
  function addItem(id$$1, options$$1) {
    options$$1 = options$$1 || {};

    id(id$$1);

    return cartAdd(id$$1, options$$1.quantity, options$$1.properties);
  }

  /**
   * Add a new line item to the cart from a product form
   * @param {object} form DOM element which is equal to the <form> node
   * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
   */
  function addItemFromForm(form$$1) {
    form(form$$1);

    var formData = new FormData(form$$1);
    id(parseInt(formData.get('items[0][id]'), 10));

    return cartAddFromForm(formData);
  }

  /**
   * Changes the quantity and/or properties of an existing line item.
   * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
   * @param {object} options Optional values to pass to /cart/add.js
   * @param {number} options.quantity The quantity of items to be added to the cart
   * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
   * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
   */
  function updateItem(key$$1, options$$1) {
    key(key$$1);
    options(options$$1);

    return getItemIndex(key$$1).then(function(line) {
      return cartChange(line, options$$1);
    });
  }

    // Plus update multiple items
    function updateItems(updates, options$$1) {
      for (let item in updates) {
        key(item);
        options(options$$1);
      }
  
      return plusCartUpdate(updates, options$$1);
    }

  /**
   * Removes a line item from the cart
   * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
   * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
   */
  function removeItem(key$$1) {
    key(key$$1);

    return getItemIndex(key$$1).then(function(line) {
      return cartChange(line, { quantity: 0 });
    });
  }

  /**
   * Sets all quantities of all line items in the cart to zero. This does not remove cart attributes nor the cart note.
   * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
   */
  function clearItems() {
    return cartClear().then(function() {
      Events.trigger("cart:clear");
    });
  }

  /**
   * Gets all cart attributes
   * @returns {Promise} Resolves with the cart attributes object
   */
  function getAttributes() {
    return cart().then(function(state) {
      return state.attributes;
    });
  }

  /**
   * Sets all cart attributes
   * @returns {Promise} Resolves with the cart state object
   */
  function updateAttributes(attributes) {
    return cartUpdate({ attributes: attributes });
  }

  /**
   * Clears all cart attributes
   * @returns {Promise} Resolves with the cart state object
   */
  function clearAttributes() {
    return getAttributes().then(function(attributes) {
      for (var key$$1 in attributes) {
        attributes[key$$1] = '';
      }
      return updateAttributes(attributes);
    });
  }

  /**
   * Gets cart note
   * @returns {Promise} Resolves with the cart note string
   */
  function getNote() {
    return cart().then(function(state) {
      return state.note;
    });
  }

  /**
   * Sets cart note
   * @returns {Promise} Resolves with the cart state object
   */
  function updateNote(note) {
    return cartUpdate({ note: note });
  }

  /**
   * Clears cart note
   * @returns {Promise} Resolves with the cart state object
   */
  function clearNote() {
    return cartUpdate({ note: '' });
  }

  /**
   * Get estimated shipping rates.
   * @returns {Promise} Resolves with response of /cart/shipping_rates.json (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates)
   */
  function getShippingRates() {
    return cartShippingRates();
  }

  exports.getState = getState;
  exports.getCart = getCart;
  exports.getItemIndex = getItemIndex;
  exports.getItem = getItem;
  exports.addItem = addItem;
  exports.addItemFromForm = addItemFromForm;
  exports.getDefaultRequestConfig = getDefaultRequestConfig;
  exports.updateItem = updateItem;
  exports.updateItems = updateItems;
  exports.removeItem = removeItem;
  exports.clearItems = clearItems;
  exports.getAttributes = getAttributes;
  exports.updateAttributes = updateAttributes;
  exports.clearAttributes = clearAttributes;
  exports.getNote = getNote;
  exports.updateNote = updateNote;
  exports.clearNote = clearNote;
  exports.getShippingRates = getShippingRates;

  return exports;

}({}));

Shopify.theme.ajaxCart = {
  init: function init() {
    let config = document.getElementById('cart-config');
    if ( !config ) return false;
    config = JSON.parse(config.innerHTML || '{}');

    var selectors = {
      cartTrigger: '.js-mini-cart-trigger',
      cartPageLoader: '.ajax-cart__page-wrapper .js-mini-cart-loader',
      addToCart: '.js-ajax-submit',
      stickyCart: '.js-sticky-cart'
    };

    // Init carts
    this.initializeAjaxCart(config);

    // Set No Js Cart or Remove
   if (config.cart_action == 'no_js_cart') {
     if ( document.querySelector('.js-ajax-cart-content') ) {
       document.querySelector('.js-ajax-cart-content').remove();
     }
   } else {
     if ( document.querySelector('.js-ajax-cart-content-nojs') ){
       document.querySelector('.js-ajax-cart-content-nojs').remove();
     }
   }

    // Plus check insert before cart add
    function disableElements(selector) {
      const elements = document.querySelectorAll(selector);
      for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
      }
    }
    function checkInsert(){
      let id = document.querySelector('.formVariantId').value;
      let checkboxWrap = document.querySelector(`[data-variant-id="${id}"]`);
      if (!checkboxWrap) {
       return false;
      }
      const checkbox = checkboxWrap.querySelector('input[type="checkbox"]');
      if (!checkbox) {
        return false;
      }
      if (checkbox.checked) {
        return true;
      } else {
        disableElements('.formQty, .formVariantId.insertId, .insertProperty');
        return false;
      }
    }

    // Override add to cart form
    document.querySelectorAll(selectors.addToCart).forEach((element, i) => {

      // Prevent multiple bindings if init() runs again
      if (element.dataset.ajaxBound === '1') return;
      element.dataset.ajaxBound = '1';

      element.addEventListener('click', function (e) {
        e.preventDefault();

        checkInsert();
        var addToCartForm = this.closest('form');
        var isQuickAdd = this.hasAttribute('data-quick-add') || !!e.target.closest('[data-quick-add]');
        Shopify.theme.ajaxCart.addToCart(addToCartForm, element.parentNode, config, false, isQuickAdd);

        return false;
      });
    });

    // Update cart page on load
    if (document.querySelector('body').classList.contains('template-cart')) {
      Shopify.theme.cart.getCart().then(Cart => {
        Shopify.theme.ajaxCart.updateView(config, Cart);

        // Remove page loader
        setTimeout(function(){
          document.querySelector('body').classList.add('cart-loaded');
          // Trigger sticky cart on cart page
          Shopify.theme.ajaxCart.cartStickyBar();
        }, 800);

      });
    }

    // On cart trigger click
    let cartTriggers = document.querySelectorAll(selectors.cartTrigger);

    cartTriggers.forEach((item, i) => {
      item.addEventListener('click', function (e) {
        e.preventDefault();

        // Open drawer
        Shopify.theme.cart.getCart().then(Cart => {

          Shopify.theme.ajaxCart.updateView(config, Cart);

          if (config.cart_action == 'drawer') {
            Shopify.theme.ajaxCart.showDrawer(config);
          } else if (config.cart_action == 'modal_cart' )  {
            Shopify.theme.ajaxCart.showModal(config);
          } else if (config.cart_action == 'mini_cart') {
            Shopify.theme.ajaxCart.showModal(config);
          } else {
            window.location.href = config.cart_url;
          }

        });

        return false;
      });
    });
  },
  cartStickyBar: function cartStickyBar() {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function initSticky(scrollPos) {
      var cartForm = document.querySelectorAll('.js-cart-form');
      if ( !cartForm ) return false;

      cartForm.forEach((item, i) => {
        var topOfHiddenDiv = item.offsetTop;
        var position = scrollPos >= topOfHiddenDiv,
            footer = document.getElementById('footer'),
            stickyBar = document.querySelector('.js-sticky-cart');

        if ( i === 1 ) return false;

        if( position && !stickyBar.classList.contains('show')) {
          stickyBar.classList.add('show');
          footer.classList.add('padding-sticky');
        } else if( !position && stickyBar.classList.contains('show')) {
          stickyBar.classList.remove('show');
          footer.classList.remove('padding-sticky');
        }
      });
    }

    document.addEventListener('scroll', function(e) {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          initSticky(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    });

  },
  cartEvents: function cartEvents(config) {
    var selectors = {
      cartDrawerRemove: '.js-cart-remove',
      cartDrawerQty: '[data-item-qty]',
      cartDrawerQtyDecrease: '[data-ajax-qty-decrease]',
      cartDrawerQtyIncrease: '[data-ajax-qty-increase]',
      cartNote: '.js-cart-note'
    };

    // Cart Events
    var cartDrawerQtyElems = document.querySelectorAll(selectors.cartDrawerQty);
    if (cartDrawerQtyElems.length === 0) {
      return false;
    }
    cartDrawerQtyElems.forEach((element, i) => {
      element.addEventListener('change', function(e) {
        e.preventDefault();

        var quantity = parseInt(this.value),
            itemKey = this.dataset.itemKey,
            itemMax = this.dataset.limit,
            lineElement = element.closest('.ajax-cart__cart-item');

        // Set new quantity
        element.value = quantity;
        // Plus link insert quantity to parent product
        let insertQty = findInsertElement(element, cartDrawerQtyElems);
        let insertKey; 
        let insertMax;
        let insertElement;
        const updates = {};
        if (insertQty){
        insertKey = insertQty.dataset.itemKey;
        insertMax = insertQty.dataset.limit;
        insertElement = insertQty.closest('.ajax-cart__cart-item');
        insertQty.value = quantity;
        updates[insertKey] = quantity;
        updates[itemKey] = quantity;
        }

        // Adjust cart object
        setTimeout(function() {

          if (quantity === 0) {
            if (insertQty){
              Shopify.theme.cart.updateItems(updates, {quantity}).then(state => {
                Shopify.theme.ajaxCart.updateView(config, state);
              });
            } else {
              Shopify.theme.ajaxCart.removeFromCart(itemKey, config);
            } 
          } else {
            Shopify.theme.ajaxCart.checkLimit(itemMax, quantity, lineElement, config);
            if (insertQty){
              Shopify.theme.ajaxCart.checkLimit(insertMax, quantity, insertElement, config);
              Shopify.theme.cart.updateItems(updates, {quantity}).then(state => {
                Shopify.theme.ajaxCart.updateView(config, state);
              });
            } else {
              Shopify.theme.cart.updateItem(itemKey, {quantity}).then(state => {
                Shopify.theme.ajaxCart.updateView(config, state);
              });
            }
          }
        }, 250);
        return false;
      }); // End add event listener
    }); // End of querySelectorAll
    // Plus
    // check cart drawer for inserts connected to the pillow
    function findInsertElement(element, cartElems) {
      let insertExists = element.dataset.insertId;
    // Set pillow variant's id 
      let pillowId = element.dataset.itemId.split('-').shift();
      // Check if there is an insert attached to the pillow
      if (insertExists) {
        let insertElement = null;
        //look through each cart item for
        // a pillow data attribute passed from a line item property
        cartElems.forEach(cartElement => { 
            let id = cartElement.dataset.pillowId;
            if (id == pillowId) {
              insertElement = cartElement;
            }
        });
        return insertElement;
      }
    }
    document.querySelectorAll(selectors.cartDrawerRemove).forEach((element, i) => {
      element.addEventListener('click', function (e) {
        e.preventDefault();

        var itemKey = this.dataset.itemKey;

        // Plus remove insert if linked to product and product is removed
        let insertElement = findInsertElement(this, cartDrawerQtyElems);
        // if there's an insert in the cart, remove it too.
        const updates = {};
        if (insertElement) {
          let quantity = 0;
          let insertKey = insertElement.dataset.itemKey;
          updates[insertKey] = quantity;
          updates[itemKey] = quantity;
          Shopify.theme.cart.updateItems(updates, { quantity }).then((state) => {
            Shopify.theme.ajaxCart.updateView(config, state);
          });
        } else {
          Shopify.theme.ajaxCart.removeFromCart(itemKey, config);
        }

        return false;
      });
    });
    document.querySelectorAll(selectors.cartDrawerQtyDecrease).forEach((element, i) => {
      element.addEventListener('click', function (e) {
        e.preventDefault();

        var itemKey = this.dataset.itemKey;
        // Plus remove insert if linked to product and product is removed
       let insertElement = findInsertElement(this, cartDrawerQtyElems);
       // if there's an insert in the cart, remove it too.
       const updates = {};
        if (this.nextElementSibling.value === '1' ) {
          if (insertElement) {
            let quantity = 0;
            let insertKey = insertElement.dataset.itemKey;
            updates[insertKey] = quantity;
            updates[itemKey] = quantity;
            Shopify.theme.cart.updateItems(updates, { quantity }).then((state) => {
              Shopify.theme.ajaxCart.updateView(config, state);
            });
          } else {
            Shopify.theme.ajaxCart.removeFromCart(itemKey, config);
        };
        } else {
          var itemId = this.dataset.ajaxQtyDecrease;
          // Plus decrease insert quantity too
          if (insertElement) {
            let quantity = parseInt(this.nextElementSibling.value) - 1;
            let insertKey = insertElement.dataset.itemKey;
            updates[insertKey] = quantity;
            updates[itemKey] = quantity;
            Shopify.theme.cart.updateItems(updates, { quantity }).then((state) => {
              Shopify.theme.ajaxCart.updateView(config, state);
            });
          } else {
            Shopify.theme.ajaxCart.adjustQty(-1, itemId, config);
          }
        }

        return false;
      });
    });
    document.querySelectorAll(selectors.cartDrawerQtyIncrease).forEach((element, i) => {
      element.addEventListener('click', function (e) {
        e.preventDefault();

        var itemId = this.dataset.ajaxQtyIncrease;
        var itemKey = this.dataset.itemKey;
        // Plus increase insert quantity too
        let insertElement = findInsertElement(this, cartDrawerQtyElems);
        const updates = {};
        if (insertElement){
         let quantity = parseInt(this.previousElementSibling.value) + 1;
         let insertKey = insertElement.dataset.itemKey;
         updates[insertKey] = quantity;
         updates[itemKey] = quantity;
         Shopify.theme.cart.updateItems(updates, { quantity }).then((state) => {
           Shopify.theme.ajaxCart.updateView(config, state);
         });
        } else {
          Shopify.theme.ajaxCart.adjustQty(+1, itemId, config);
        }

        return false;
      });
    });
    document.querySelectorAll(selectors.cartNote).forEach((element, i) => {

      element.addEventListener('blur', (event) => {
        let note = element.value;
        Shopify.theme.cart.updateNote(note).then(state => {
          Shopify.theme.ajaxCart.updateView(config, state);
        });
      });

    });

    // Restart Payment buttons
    if (Shopify && Shopify.StorefrontExpressButtons) {
      Shopify.StorefrontExpressButtons.initialize();
    }
  },
  showDrawer: function showDrawer(config) {
    if (config.cart_action != 'drawer') return false;

    WAU.Slideout._openByName("slideout-ajax-cart");
  },
  hideDrawer: function hideDrawer(config) {
    if (config.cart_action != 'drawer') return false;

    WAU.Slideout._closeByName("slideout-ajax-cart");
  },
  showModal: function showModal(config) {
    if (config.cart_action == 'modal_cart') {
      WAU.Modal._openByName("modal-ajax-cart");
    } else if (config.cart_action == 'mini_cart') {
      WAU.Modal._openByName("mini-ajax-cart");
    }
  },
  hideModal: function hideModal(config) {
    if (config.cart_action == 'modal_cart') {
      WAU.Modal._closeByName("modal-ajax-cart");
    } else if (config.cart_action == 'mini_cart') {
      WAU.Modal._closeByName("mini-ajax-cart");
    }
  },
  removeFromCart: function removeFromCart(itemKey, config, callback) {
    Shopify.theme.cart.removeItem(itemKey).then(state => {
      Shopify.theme.ajaxCart.updateView(config, state);
    });
  },
  adjustQty: function adjustQty(value, itemId, config) {

    var selectors = {
      lineItem: '.item_' + itemId,
      updatesItem: '.updates_' + itemId
    };

    // Update Line Item
    document.querySelectorAll(selectors.lineItem).forEach((element, i) => {
      elementInput = element.querySelector(selectors.updatesItem),
      key = elementInput.dataset.itemKey,
      max = elementInput.dataset.limit,
      quantity = parseInt(elementInput.value) + parseInt(value);

      // Check limit to prevent over adding
      if (Shopify.theme.ajaxCart.checkLimit(max, quantity, element, config)) return false;

      // Check new qty to prevent going lower than 1
      if (quantity === 0 ) return false;

      // Set new quantity
      elementInput.value = quantity;

      // Adjust cart object
      setTimeout(function() {
        Shopify.theme.cart.updateItem(key, { quantity }).then(state => {
          Shopify.theme.ajaxCart.updateView(config, state);
        });
      }, 250);

    });
  },
  checkLimit: function checkLimit(max, quantity, element, config) {
    // Check limit to prevent over adding
    if (max != '' && quantity > max) {

      let cartNote = document.createElement('div');

      cartNote.classList.add('mini-cart__cart-note');
      cartNote.innerHTML = '<p class="a-center"><strong>' + config.cart_error +'</strong> ' + config.update_qty_error + '</p>';

      let adjacentElement = element.querySelector('.js-item-quantity');
      let parentElement = adjacentElement.parentNode;

      parentElement.appendChild(cartNote, adjacentElement);

      setTimeout(function() {
        theme.Helpers.fadeOut(cartNote);
        parentElement.removeChild(cartNote);
      }, 2000);

      return true;
    }
  },
  addToCart: function addToCart(addToCartForm, formContext, config, isQuickview, isQuickAdd = false) {
    var selectors = {
      addToCart: '.js-ajax-submit',
      cartAddedMsg: '.js-added-msg'
    }

    let context;

    if ( isQuickview ) {
      context = document.querySelector('.js-quickview-content');
    } else {
      context = formContext;
    }

    // Check if we have a recipient form.
    const isRecipientForm = [...addToCartForm.elements].filter(element => {
      return element.name == 'properties[__shopify_send_gift_card_to_recipient]' && element.checked;
    }).length !== 0;

    if (isRecipientForm) {

      const recipientConfig = Shopify.theme.cart.getDefaultRequestConfig();
      const formData = new FormData(addToCartForm);

      delete recipientConfig.headers['Content-Type'];
      recipientConfig.method = 'POST';
      recipientConfig.body = formData;

      fetch('/cart/add.js', recipientConfig)
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          if (data.status == 422) {
            const errors = data.description;
            const messages  = data.message;
            Events.trigger("recipientform:errors", messages, errors, config, addToCartForm);
          }
        }).catch(function(error) {
          console.error(error);
        });
    }

    if (theme.ProductProperties.checkLineItemProperties(addToCartForm) === false) return;

    // Disable add to cart button temporarily]
    context.querySelector(selectors.addToCart).value = config.adding_to_cart;
    context.querySelector(selectors.addToCart).classList.add('disabled');
    context.querySelector(selectors.addToCart).setAttribute('disabled', 'disabled');

    Shopify.theme.cart.addItemFromForm(addToCartForm).then(item => {
      // Re-enable add to cart button
      context.querySelector(selectors.addToCart).value = config.added_to_cart;
      context.querySelector(selectors.addToCart).classList.remove('disabled');
      context.querySelector(selectors.addToCart).removeAttribute('disabled', 'disabled');

      setTimeout(function(){
        context.querySelector(selectors.addToCart).value = config.add_to_cart;
      }, 3000);

      Shopify.theme.cart.getCart().then(Cart => {

        if ( isQuickview && config.cart_added_event != 'product_page') {
          Shopify.theme.quickview.hideModal();
        } else if ( isQuickview && config.cart_added_event == 'product_page') {
          theme.Helpers.fadeIn(context.querySelector(selectors.cartAddedMsg));

          setTimeout(function(){
            theme.Helpers.fadeOut(context.querySelector(selectors.cartAddedMsg));
          }, 3000);
        }

        if (config.cart_action == 'drawer' && config.cart_added_event == 'go_to_active_cart') {
          Shopify.theme.ajaxCart.showDrawer(config);
        } else if (config.cart_action == 'modal_cart' && config.cart_added_event == 'go_to_active_cart' )  {
          Shopify.theme.ajaxCart.showModal(config);
        } else if (config.cart_action == 'mini_cart' && config.cart_added_event == 'go_to_active_cart' )  {
          Shopify.theme.ajaxCart.showModal(config);
        } else if (config.cart_action == 'page_only' && config.cart_added_event == 'go_to_active_cart' )  {
          window.location.href = config.cart_url;
        } else if ( config.cart_added_event == 'product_page' ) {
          if (!isQuickAdd) {
            theme.Helpers.fadeIn(context.querySelector(selectors.cartAddedMsg));
          }
        } else {
          window.location.href = config.cart_url;
        }

        Shopify.theme.ajaxCart.updateView(config, Cart);
      });
    }).catch(error => {
      if (error.status == 422) {

        // Show error msg
        theme.Helpers.fadeIn(context.querySelector('.js-error-msg'));

        // Re-enable add to cart button
        context.querySelector(selectors.addToCart).value = config.add_to_cart;
        context.querySelector(selectors.addToCart).classList.remove('disabled');
        context.querySelector(selectors.addToCart).removeAttribute('disabled', 'disabled');
      } else {
        console.log(error)
      }
    });
  },
  getAjaxCart: function getAjaxCart(response) {
    const el = document.createElement('div');
    el.innerHTML = response;

    const responseOptions = JSON.parse(el.querySelector('[data-options]').innerHTML);
    const htmls = el.querySelectorAll('[data-html]');

    let html = {};
    if (htmls.length === 1 && htmls[0].getAttribute('data-html') === '') {
      html = htmls[0].innerHTML;
    } else {
      for (let i = 0; i < htmls.length; i++) {
        html[htmls[i].getAttribute('data-html')] = htmls[i].innerHTML;
      }
    }
    let options = responseOptions;

    return html;
  },
  initializeAjaxCart: function initializeAjaxCart(config) {
    let data, url;
    url = config.cart_url + '/?view=ajax';

    fetch(url, data)
    .then(res => res.text())
    .then(response => {
      let html = Shopify.theme.ajaxCart.getAjaxCart(response);

      // Replace cart content
      document.querySelectorAll('.js-ajax-cart-content').forEach((item, i) => {
        item.innerHTML = html.content;
      });

    }).catch(error => {
      console.log(error)
    });
  },
  updateView: function updateView(config, Cart) {
    let data, url;
    url = config.cart_url + '/?view=ajax';


    function showHideExpressCheckoutButtons() {

      console.count('showHideExpressCheckoutButtons');

      // Get the footer wrapper element.
      let footerWrapperEl = document.querySelector('#dynamic');

      // Bail if no footer wrapper element.
      if (!footerWrapperEl) return;

      // If we have less than 1 item in the cart (0) then
      // hide the cart footer element. Otherwise display it
      // as normal.
      if (Cart.item_count < 1) {
        footerWrapperEl.style.display = 'none';
      } else {
        footerWrapperEl.style.display = 'block';
      }
    }

    // Invoke the function.
    showHideExpressCheckoutButtons();

    fetch(url, data)
    .then(res => res.text())
    .then(response => {
      let html = Shopify.theme.ajaxCart.getAjaxCart(response);

      var selectors = {
        cartContent: '.js-ajax-cart-content',
        cartEmpty: '.js-cart-empty',
        cartForm: '.js-cart-form',
        cartAccordion: '.js-cart-accordion',
        cartCount: '.js-cart-count',
        cartSubtotal: '.js-cart-subtotal',
        cartTradeDiscount: '.js-cart-trade-dicount'
      };

      /**
       * Updates the sticky cart
       * @param  {object} Cart   Cart object
       * @param  {config} config config object
       */
      const updateStickyCart = function(cart, config, disable = false) {

        const selectors = {
          stickyCart: '.js-sticky-cart',
          cartTotal: '.js-cart-total',
          checkoutButton: '.js-sticky-checkout-btn'
        };

        // Check for necessary arguments
        if (!cart) {
          console.log('Error. updateStickyCart requires a Cart object');
          return false;
        }
        if (!config) {
          console.log('Error. updateStickyCart requires a config object');
          return false;
        }

        // Update sticky cart price

        var stickyCartElems = document.querySelectorAll(selectors.stickyCart);

        if (stickyCartElems.length === 0) {
          return false;
        }

        stickyCartElems.forEach((stickyCart, i) => {

          // Get the original price element
          let cartOriginalPriceEl = stickyCart.querySelector(selectors.cartTotal);

          // Format the price
          let formattedPrice = theme.Helpers.formatMoney(cart.total_price, config.money_format);

          // Log error if no original price element was found
          if (!cartOriginalPriceEl) {
            console.log('Error. No original price element found in sticky cart');
          }

          // Update the price
          cartOriginalPriceEl.innerHTML = formattedPrice;

          //
          // Disable checkout button
          //

          // Get the checkout button
          let checkoutButton = stickyCart.querySelector(selectors.checkoutButton);

          // If disable
          if (disable && checkoutButton && checkoutButton.disabled == false) {
            checkoutButton.disabled = true;
          } else {
            checkoutButton.disabled = false;
          }
        });
      };

      if (Cart.item_count === 0) {
        // Hide form
        document.querySelectorAll(selectors.cartForm).forEach((item, i) => {
          item.classList.add('hide');
        });
        // Show empty msg
        document.querySelectorAll(selectors.cartEmpty).forEach((item, i) => {
          item.classList.remove('hide');
        });
        // Update cart count
        document.querySelectorAll(selectors.cartCount).forEach((item, i) => {
          item.innerHTML = '0';
        });
        // Update cart subtotal
        document.querySelectorAll(selectors.cartSubtotal).forEach((item, i) => {
          item.innerHTML = '';
        });

        // Update sticky cart total if on the cart page
        if (document.querySelector('body').classList.contains('template-cart')) {
          updateStickyCart(Cart, config, true);
        }
      } else {
        // Hide empty msg
        document.querySelectorAll(selectors.cartEmpty).forEach((item, i) => {
          item.classList.add('hide');
        });
        // Update cart count
        document.querySelectorAll(selectors.cartCount).forEach((item, i) => {
          item.innerHTML = Cart.item_count;
        });
        // Replace cart page and drawer content
        document.querySelectorAll(selectors.cartContent).forEach((item, i) => {
          item.innerHTML = html.content;
        });
        // Update cart subtotal
        document.querySelectorAll(selectors.cartSubtotal).forEach((item, i) => {
          let formattedPrice = theme.Helpers.formatMoney(Cart.items_subtotal_price, config.money_format);
          item.innerHTML = formattedPrice;
        });

        // zeke update Trade discount
        document.querySelectorAll(selectors.cartTradeDiscount).forEach((item, i) => {
          let testPrice = (Cart.items_subtotal_price / 0.8) - Cart.items_subtotal_price;
          let formattedPrice = theme.Helpers.formatMoney(testPrice, config.money_format);
          item.innerHTML = `- ${formattedPrice}`;
          
        });
        // Reload accordions
        document.querySelectorAll(selectors.cartAccordion).forEach((item, i) => {
          theme.Helpers.Accordion(item, '.tlink.has_sub_menu a', '.accordion-content.sub');
          theme.Helpers.Accordion(item, '.tlink2.has_sub_menu a', '.accordion-content2.sub');
        });

        // Update sticky cart total if on the cart page
        if (document.querySelector('body').classList.contains('template-cart')) {
          updateStickyCart(Cart, config);
        }

        // Reload events
        Shopify.theme.ajaxCart.cartEvents(config);

      }

      // Set Cart Loaded
      setTimeout(function(){
        document.querySelector('body').classList.add('cart-loaded');

        // Remove dynamic buttons from drawer or model if on cart page
        if (config.cart_action == 'mini_cart') {
          if (document.querySelectorAll('#dynamic-checkout-cart').length > 2) {
            document.querySelectorAll('.js-mini-cart-wrapper #dynamic-checkout-cart').forEach((item, i) => {
              item.remove();
            });
          }
        } else {
          if (document.querySelectorAll('#dynamic-checkout-cart').length >= 2) document.querySelectorAll('#dynamic-checkout-cart')[1].remove();
        }

      }, 500);
    })
    .catch(error => {
      console.log(error)
    });
  }
}

Shopify.theme.quickview = {
  cache: new Map(),
  init: function init() {

    var selectors = {
      quickviewButton: '.js-quickview-trigger'
    }

    // Init on click event for buttons
    document.querySelectorAll(selectors.quickviewButton).forEach((button, i) => {

      button.addEventListener('click', function(event) {
        event.preventDefault();

        // Get template
        var productUrl = this.dataset.productUrl,
            productUrl = Shopify.theme.quickview.cleanUrl(productUrl, 'variant');

        Shopify.theme.quickview.getTemplate(productUrl);

      });

      Shopify.theme.quickview.prefetchQuickview(button);
    });

  },
  prefetchQuickview: async function({dataset}) {
    const { productUrl } = dataset;
    const cleanUrl = Shopify.theme.quickview.cleanUrl(productUrl);

    // Add the cached HTML if it does not already exist.
    if (!Shopify.theme.quickview.cache.has(cleanUrl)) {
      const response = await fetch(productUrl);
      htmlText = await response.text();
      Shopify.theme.quickview.cache.set(productUrl, htmlText);
    }
  },
  formatTemplate: function getAjaxCart(response) {
    const el = document.createElement('div');
    el.innerHTML = response;

    const htmls = el.querySelectorAll('[data-html]');

    let html = {};
    if (htmls.length === 1 && htmls[0].getAttribute('data-html') === '') {
      html = htmls[0].innerHTML;
    } else {
      for (let i = 0; i < htmls.length; i++) {
        html[htmls[i].getAttribute('data-html')] = htmls[i].innerHTML;
      }
    }

    return html;
  },
  showModal: function showModal() {

    WAU.Modal._openByName("modal-quickview-cart");
  },
  hideModal: function hideModal() {

    document.querySelector('.js-quickview-content').innerHTML = '';

    WAU.Modal._closeByName("modal-quickview-cart");
  },
  cleanUrl: function cleanUrl(url, key) {
    return url.split('?')[0] + '?view=quick';
  },
  getTemplate: async function getTemplate(productUrl) {

    try {
      // Use cached HTML if available
      let htmlText;

      if (Shopify.theme.quickview.cache.has(productUrl)) {
        htmlText = Shopify.theme.quickview.cache.get(productUrl);
      } else {
        const response = await fetch(productUrl);
        htmlText = await response.text();
      }

      let html = Shopify.theme.quickview.formatTemplate(htmlText);

      // Replace modal content
      document.querySelector('.js-quickview-content').innerHTML = html.content;

      let context = document.querySelector('.js-quickview-wrapper');

      // Trigger quickview event
      theme.Product(context);

      // Load Payment Buttons
      if (context.dataset.paymentButton == 'true' && Shopify.PaymentButton) {
        Shopify.PaymentButton.init();
      }

      // Trigger event for add to cart
      context.querySelector('.js-ajax-submit').addEventListener('click', function (e) {
        e.preventDefault();

        var addToCartForm = this.closest('form');

        let cartConfig = document.getElementById('cart-config');
        if (!cartConfig) return false;
        cartConfig = JSON.parse(cartConfig.innerHTML || '{}');

        Shopify.theme.ajaxCart.addToCart(addToCartForm, null, cartConfig, true);

        return false;
      });

      // Show modal
      Shopify.theme.quickview.showModal();

    } catch (error) {
      console.log(error);
    }
  }
}

Shopify.theme.quickview.init();
Shopify.theme.ajaxCart.init();

// Reinit cart on section events
document.addEventListener('shopify:section:select', function(event){
  Shopify.theme.quickview.init();
  Shopify.theme.ajaxCart.init();
});

const ViewedProducts = (function() {


  let Constructor = function(params) {
    const publicAPIs = {};

    // default configs
    var config = {
      howManyToShow: 3,
      howManyToStoreInMemory: 30,
      wrapperId: "recently-viewed-products",
      onComplete: null,
    };

    // array containing recently viewed products
    var productHandleQueue = [];

    // wrapper element that displays the products
    var wrapper = null;

    // variable to keep track of how many products have been shown
    var shown = 0;

    // Handle cookie related operations
    var cookie = {
      configuration: {
        expires: 90,
        path: "/",
        domain: window.location.hostname,
        sameSite: "none",
        secure: true
      },
      name: "shopify_recently_viewed",
      write: function(recentlyViewed) {
        Cookies.set(this.name, recentlyViewed.join(" "), this.configuration);
      },
      read: function() {
        var recentlyViewed = [];
        var cookieValue = Cookies.get(this.name);
        if (cookieValue !== undefined && cookieValue !== '') {
          recentlyViewed = cookieValue.split(" ");
        }
        return recentlyViewed;
      },
      destroy: function() {
        Cookies.remove(this.name, null, this.configuration);
      },
      remove: function(productHandle) {
        var recentlyViewed = this.read();
        var position = recentlyViewed.indexOf(productHandle);
        if (position !== -1) {
          recentlyViewed.splice(position, 1);
          this.write(recentlyViewed);
        }
      },
    };

    // Reveal wrapper element and show recently viewed products and run call back if provided one.
    var finalize = function() {
      // Check if any products were shown.
      if (shown > 0) {

        // Remove hidden class if it exists
        if (wrapper.classList.contains('recently-viewed-products--hidden')) {
          wrapper.classList.remove('recently-viewed-products--hidden');
        }

        // If we have a callback.
        if (config.onComplete) {
          try {
            config.onComplete();
          } catch (error) {}
        }
      } else {
        console.log('No recently viewed products to show');
        return false;
      }
    };

    // Format the product listing template by converting it into a DOM node, determining it's CSS grid classes and then wrapping it with those classes
    var formatTemplate = (product, simpleListing = false) => {

      // Check if the product data was passed
      if (!product) {
        console.log('Error. Must provide a valid product in order to format it');
        return false;
      }

      //
      // Convert the product into a node.
      //

      // Parse the product HTML into a DOM node.
      var parser = new DOMParser();
      var doc = parser.parseFromString(product, 'text/html');

      // Get the template element.
      if (simpleListing) {
        var template = doc.querySelector('[data-html="simple-listing"]');
      } else {
        var template = doc.querySelector('[data-html="listing"]');
      }

      // Check if we have a valid template element.
      if (!template) {
        console.log('Error. Could not find template elment.');
        return false;
      }

      //
      // Wrap the product in a div with grid classes.
      //

      // Create div element
      let productWrap = document.createElement('div');


      // Apply classes
      productWrap.classList.add('product', 'product-index', 'recently-viewed-products__product', 'js-product-listing');

      // Append product in wrapper element
      productWrap.appendChild(template.content);

      // Return the final product template
      return productWrap;
    };


    // Use fetch api to get product data and add it to the list
    var moveAlong = function(simpleListing = false) {

      if (productHandleQueue.length && shown < config.howManyToShow) {

        // Build fetch url
        let furl =  `${window.Shopify.routes.root}products/${productHandleQueue[0]}?view=listing`;

        // Fetch the product data
        fetch(furl)
          .then((response) => {
            // Convert data to text
            return response.text();
          })
          .then((response) => {

            // Get the formated product node with the data
            let product = formatTemplate(response, simpleListing);

            // Append the product to the wrapper element
            wrapper.appendChild(product);

            // Remove first element from the array
            productHandleQueue.shift();

            // Increment shown
            shown++;

            // Recursively call function
            moveAlong(simpleListing);
          })
          .catch((error) => {
            // Log error
            console.log(error.message);
            // Remove first product from the array from the cookie
            cookie.remove(productHandleQueue[0]);
            productHandleQueue.shift();
            moveAlong(simpleListing);
          });
      } else {
        finalize();
      }
    };

    publicAPIs.showRecentlyViewed = function(params) {
      var params = params || {};

      // Update defaults.
      config = Object.assign(config, params);

      // Reset
      shown = 0;
      productHandleQueue = [];
      wrapper = null;
      template = null;

      // Read cookie.
      productHandleQueue = cookie.read();

      // Get the wrapper element
      wrapper = document.getElementById(config.wrapperId);

      // If we have any to show.
      if (config.howManyToShow && wrapper) {
        // Getting each product with an Ajax call and rendering it on the page.
        moveAlong(config.simpleListing);
      }
    };
    publicAPIs.getConfig = function() {
      return config;
    };
    publicAPIs.clearList = function() {
      cookie.destroy();
    };
    publicAPIs.getCount = function() {
      let productHandleQueue = cookie.read();
      return productHandleQueue.length;
    };

    publicAPIs.showRecentlyViewed(params);

    return publicAPIs;
  };

  return Constructor;
})();


Shopify.RecordViewedProducts = (function() {

  // default configs
  var config = {
    howManyToShow: 3,
    howManyToStoreInMemory: 30,
    wrapperId: "recently-viewed-products",
    onComplete: null,
  };

  // array containing recently viewed products
  var productHandleQueue = [];

  // wrapper element that displays the products
  var wrapper = null;

  // variable to keep track of how many products have been shown
  var shown = 0;

  // Handle cookie related operations
  var cookie = {
    configuration: {
      expires: 90,
      path: "/",
      domain: window.location.hostname,
      sameSite: "none",
      secure: true
    },
    name: "shopify_recently_viewed",
    write: function(recentlyViewed) {
      Cookies.set(this.name, recentlyViewed.join(" "), this.configuration);
    },
    read: function() {
      var recentlyViewed = [];
      var cookieValue = Cookies.get(this.name);
      if (cookieValue !== undefined && cookieValue !== '') {
        recentlyViewed = cookieValue.split(" ");
      }
      return recentlyViewed;
    },
    destroy: function() {
      Cookies.remove(this.name, null, this.configuration);
    },
    remove: function(productHandle) {
      var recentlyViewed = this.read();
      var position = recentlyViewed.indexOf(productHandle);
      if (position !== -1) {
        recentlyViewed.splice(position, 1);
        this.write(recentlyViewed);
      }
    },
  };

  return {
    getConfig: function() {
      return config;
    },
    clearList: function() {
      cookie.destroy();
    },
    getCount: function() {
      let productHandleQueue = cookie.read();
      return productHandleQueue.length;
    },
    recordRecentlyViewed: function(params) {

      var params = params || {};

      // Update defaults.
      config = Object.assign(config, params);

      // Read cookie.
      var recentlyViewed = cookie.read();

      // If we are on a product page.
      if (window.location.pathname.indexOf("/products/") !== -1) {

        // What is the product handle on this page.
        var urlPathname = new URL(window.location).pathname;
        var urlArray = decodeURIComponent(urlPathname).split('/');
        var productHandle = urlArray[urlArray.indexOf('products') + 1];
        if (!productHandle) {
          console.log('Error, no product handle found.');
          return false;
        }

        // In what position is that product in memory.
        var position = recentlyViewed.indexOf(productHandle);


        // If not in memory. (product handle was not found in the recentlyv)
        if (position === -1) {

          // Add product at the start of the list.
          recentlyViewed.unshift(productHandle);

          // Only keep what we need.
          recentlyViewed = recentlyViewed.splice(
            0,
            config.howManyToStoreInMemory
          );
        } else {
          recentlyViewed.splice(position, 1);
          recentlyViewed.unshift(productHandle);
        }

        // Update cookie.
        cookie.write(recentlyViewed);
      }
    },
  };
})();

/*============================================================================
  Customer Login
==============================================================================*/
theme.CustomerLogin = (function() {

  function CustomerLogin(container) {
    window.addEventListener('DOMContentLoaded', (event) => {
      if (document.querySelector('#password-success')) {
        setTimeout(() => {
          WAU.Modal._openByName('password-success');
        }, 1000);
      }
    });
  }
  return CustomerLogin;
})();

/*============================================================================
  Other
==============================================================================*/
var mobile = window.matchMedia('(max-width: 740px)');
var tablet = window.matchMedia('(max-width: 979px) and (min-width: 741px)');
var desktop = window.matchMedia('(min-width: 980px)');

/*============================================================================
  Announcement Bar Section
==============================================================================*/

var selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCurrency: '[data-disclosure-currency]'
};

theme.AnnouncementBar = (function() {
  function AnnouncementBar(container) {

    /* lang and currency disclosure */
    this.container = container;
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.localeDisclosure) {
      this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure);
     }

     if (this.cache.currencyDisclosure) {
      this.currencyDisclosure = new theme.Disclosure(this.cache.currencyDisclosure);
     }

  }; // end AnnouncementBar function

  AnnouncementBar.prototype = _.assignIn({}, AnnouncementBar.prototype, {
    cacheSelectors: function() {
      this.cache = {
        localeDisclosure: this.container.querySelector(selectors.disclosureLocale),
        currencyDisclosure: this.container.querySelector(selectors.disclosureCurrency)
      };
    },
    onUnload: function() {
      if (this.cache.localeDisclosure) {
        this.localeDisclosure.destroy();
      }

      if (this.cache.currencyDisclosure) {
        this.currencyDisclosure.destroy();
      }
    }
  });

  return AnnouncementBar;
})();

/*============================================================================
  Header
==============================================================================*/

theme.Header = (function() {
  function Header(container) {
    const selectors = {
      mobileHeader: '.js-mobile-header',
      blockHeader: '.js-block-header',
      header: '.js-theme-header'
    }
    const mobileHeader = document.querySelector(selectors.mobileHeader),
          blockTopWrapper = document.querySelector(selectors.blockHeader),
					clearElement = document.querySelector(".js-clear-element"),
          menuItemsWithNestedDropdowns = document.querySelectorAll(".js-menuitem-with-nested-dropdown"),
					doubleTapToGoItems = document.querySelectorAll(".js-doubletap-to-go"),
					topBar = document.querySelector(".js-top-bar"),
          isMobile = window.innerWidth < 740,
          isDesktop = window.innerWidth > 740;

  	window.addEventListener('scroll', function (event) {
      prepareSticky();
		});
    window.addEventListener('resize', function (event) {
      prepareSticky();
    });
    window.addEventListener('shopify:section:select', function (event) {
      prepareSticky();
    });
    window.addEventListener('shopify:section:reorder', function (event) {
      if (event.target.classList.contains('js-site-header') || event.target.classList.contains('js-site-announcement-bar')) {
        prepareSticky();
      }
    });

    function getAmountToScroll() {
      const selectors = {
        carousel: '.js-site-announcement-carousel',
        announcements: '.js-site-announcement-bar',
        navigation: '.js-theme-header',
        header: '.js-site-header'
      }

      let totalHeight = 0;

      const elements = {
        carousel: document.querySelector(selectors.carousel),
        announcements: document.querySelector(selectors.announcements),
        navigation: document.querySelector(selectors.navigation),
        header: document.querySelector(selectors.header)
      }

      const previousSiblings = getPreviousSiblings(elements["header"]);

      if (previousSiblings.length > 0) {
        previousSiblings.forEach((previousSibling) => {
          totalHeight += previousSibling.clientHeight;
        });
      }

      // Helper function to get all previous siblings
      function getPreviousSiblings(target) {
        const siblings = [];
        let el = target.previousElementSibling;
        while (el) {
          siblings.push(el);
          el = el.previousElementSibling;
        }
        return siblings;
      }

      const navigationHeight = elements.navigation.clientHeight;
      const headerHeight = elements.header.clientHeight;

      if (window.matchMedia('(min-width: 740px)').matches) {
        totalHeight += (headerHeight - navigationHeight);
      }

      return totalHeight;
    }

    function prepareSticky() {
      let isMobile = window.innerWidth < 740,
          elementClass,
          elementHeight,
          amountToScroll;

      if (isMobile) {
        amountToScroll = getAmountToScroll();
        elementClass = selectors.mobileHeader;
        elementHeight = document.querySelector(selectors.mobileHeader)?.clientHeight;
      } else {
        amountToScroll = getAmountToScroll();
        elementClass = selectors.header;
        elementHeight = document.querySelector(selectors.header)?.clientHeight;
      }

      document.body.style.setProperty('--header-height', `${elementHeight}px`);

      return theme.Helpers.makeSticky(amountToScroll, elementClass, elementHeight);
    }

    // Aria support
		theme.a11yHelpers.setUpAriaExpansion();
		theme.a11yHelpers.setUpAccessibleNavigationMenus();

		// Making sure that nested dropdowns are properly placed in the correct place if they're offscreen.
		menuItemsWithNestedDropdowns.forEach(function (menuItem) {
			menuItem.addEventListener('mouseenter', function (event) {
				const nestedDropdown = menuItem.querySelector(".js-dropdown-nested");

				if (nestedDropdown) {
					if (theme.DOMHelpers.isElementPastEdge(nestedDropdown)) {
						nestedDropdown.classList.add("dropdown--edge");
					}
				}

			});
		});

    (function handleFirstLevelSubmenus() {

      // Dependency detection

      if (typeof theme.DOMHelpers.isOutOfBounds !== 'function') {
        console.error('Error. Missing helper function isOutOfBounds.');
        return false;
      }

      // Variables

      const firstLevelSubmenus = document.querySelectorAll('#main-nav > .has_sub_menu');
      const PADDING = 20;

      if (firstLevelSubmenus.length > 0) {

        firstLevelSubmenus.forEach((submenu) => {

          const nestedDropdown = submenu.querySelector('.header__nav__submenu');

          if (nestedDropdown) {
            const isOut = theme.DOMHelpers.isOutOfBounds(nestedDropdown);

            if (isOut.left) nestedDropdown.style.transform = `translateX(${Math.round(Math.abs(isOut.leftAmount)) + PADDING}px)`;

            if (isOut.right) nestedDropdown.style.transform = `translateX(${(Math.round(isOut.rightAmount) + (PADDING * 2)) * -1}px)`;
          }
        });
      }
    })();

    // Double Tap To Go on Tablets
		function closeMenu(activeClass) {
			document
				.querySelectorAll(`[data-active-class="${activeClass}"]`)
				.forEach(function (activeMenu) {
					activeMenu.classList.remove(activeClass);
				});
		}
		doubleTapToGoItems.forEach(function (doubleTapItem) {
			let preventClick = false,
				prevEventTarget = undefined;

			const activeClass = doubleTapItem.getAttribute("data-active-class");

      Events.on("device:touchstart", function() {
        preventClick = true;
      });

      doubleTapItem.addEventListener("click", function (event) {
        if (preventClick) {
          event.preventDefault();
        }
      });

      doubleTapItem.addEventListener("touchstart", function (event) {
        event.target.setAttribute("aria-expanded", "false");
        closeMenu(activeClass);

        if (prevEventTarget === event.target) {
          preventClick = false;
        } else {
          event.target.classList.toggle(activeClass);
          event.target.setAttribute("aria-expanded", "true");
        }

        prevEventTarget = event.target;
      });
		});
  }
  Header.prototype = _.assignIn({}, Header.prototype, {
    onSelect: function () {}
  });
  return Header;
})();


/*============================================================================
  Image Carousel with Text Section
==============================================================================*/
theme.Carousel = (function() {
  function Carousel(container) {

    const slideshows = document.querySelectorAll('.js-slideshow');

    slideshows.forEach(Slideshow => {
      const flktyData = Slideshow.getAttribute('data-flickity');
      const flktyOptions = JSON.parse(flktyData);
        new Flickity(Slideshow, flktyOptions);
    });

  }
  return Carousel;
})();

theme.Carousel.prototype = _.assignIn({}, theme.Carousel.prototype, {

  onLoad: function(event) {
    const Slideshow = event.target.closest('.js-slideshow');
    const flktyData = Slideshow.getAttribute('data-flickity');
    const flktyOptions = JSON.parse(flktyData);
        new Flickity('.js-slideshow', flktyOptions);
  },

  onBlockSelect: function(event) {
   const Slideshow = event.target.closest('.js-slideshow');
   const flkty = Flickity.data( Slideshow );
   const Slide = event.target.getAttribute("data-slider-index");
   flkty.select( Slide );
  }

});

/*============================================================================
  Collection Section
==============================================================================*/

theme.Collection = (function() {
  function Collection(container) {

    theme.CollectionPage.init(container, container.dataset.sectionId);
  }
    Collection.prototype = _.assignIn({}, Collection.prototype, {

   onBlockSelect: function(event) {

    if (event.target.classList.contains('collection--loop_ad')) {
      return
    }

     WAU.Slideout._openByName("slideout-collection-sidebar");

     const activeSlideout = document.querySelector('.slideout--active');
     const activeSlideoutName = activeSlideout.getAttribute('data-wau-slideout');

     document.addEventListener('shopify:section:unload', function(event){
       WAU.Slideout._closeByName("slideout-collection-sidebar");
     });

   }
  });

  return Collection;
})();

theme.CollectionPage = {
	init: function init(container, sectionId) {
		if ( container.querySelector("[data-collection-filter-results]") ) {
			theme.CollectionPage.currentFilters();
		}
    if ( container.querySelector("[data-collection-grid-layout]") ) {
      theme.CollectionPage.gridLayout();
    }
    if ( container.querySelector("[data-collection-accordion-links]") ) {
      theme.CollectionPage.slideoutLinks();
    }
    if ( container.querySelector("[data-collection-sidebar]") || container.querySelector("[data-collection-sort-by]") ) {
      theme.CollectionPage.sidebarFilters();
    }
    if ( container.querySelector("[data-collection-filters-price-range]") ) {
      theme.CollectionPage.priceRange();
      theme.CollectionPage.priceSlider();
    }
    if ( container.querySelector("[data-collection-sidebar-layout]") ) {
      theme.CollectionPage.sidebarToggle(container);
    }
		this.filterData = [];

	},
  sidebarToggle: function sidebarToggle() {
    const sidebarToggle = document.querySelector('.js-sidebar-toggle');
    const collectionSidebar = document.getElementById('collection--sidebar_container');
    const collectionGrid = document.getElementById('main-collection-product-grid');
    const localStorageKey = "sidebarOpenState";

    if (!sidebarToggle || !collectionSidebar || !collectionGrid) return false;

    // Function to set the grid class based on the sidebar state
    function setGridClass() {
        if (collectionSidebar.classList.contains("open")) {
            collectionGrid.classList.remove("span-12");
            collectionGrid.classList.add("span-9");
            sidebarToggle.classList.add("open");
        } else {
            collectionGrid.classList.remove("span-9");
            collectionGrid.classList.add("span-12");
            sidebarToggle.classList.remove("open");
        }
    }
    // Function to toggle sidebar and set localStorage
    function toggleSidebar() {
        collectionSidebar.classList.toggle("open");
        setGridClass();

        if (desktop.matches) {
          // Save the current state in localStorage for desktop devices
          const isOpen = collectionSidebar.classList.contains("open");
          localStorage.setItem(localStorageKey, isOpen.toString());
        }
    }

    // Set initial state based on localStorage
    const savedState = localStorage.getItem(localStorageKey);
    if (savedState === "true") {
        collectionSidebar.classList.add("open");
        collectionGrid.classList.remove("span-12");
        collectionGrid.classList.add("span-9");
        sidebarToggle.classList.add("open");
    } else {
        collectionSidebar.classList.remove("open");
        collectionGrid.classList.remove("span-9");
        collectionGrid.classList.add("span-12");
        sidebarToggle.classList.remove("open");
    }

    if (device.matches) {
      document.addEventListener("DOMContentLoaded", function() {
        if (device.matches) {
            // Close sidebar by default on mobile & tablet devices
            collectionSidebar.classList.remove("open");
            collectionGrid.classList.add("span-12");
        }
      });
    }

    // Add click event listener to sidebar toggle
    sidebarToggle.addEventListener('click', function(event){
        event.preventDefault();
        toggleSidebar();
    });
  },
	priceRange: function priceRange() {
		// Add filter to urlParm after text input changes
		const filters = document.querySelectorAll('.js-filter-range-input');
		if (filters.length > 0) {
			filters.forEach((item, i) => {
				item.addEventListener('change', function(event){
					setTimeout(function() {
						const formData = new FormData(item.closest('form'));
						const searchParams = new URLSearchParams(formData).toString();
            const accordionContext = item.closest('.c-accordion__panel');

						theme.CollectionPage.renderPage(searchParams, accordionContext, true);

					}, 1000);
				});
			});
		}
	},
  priceSlider: function priceSlider() {
    var parents = document.querySelectorAll(".js-price-range");

    if ( !parents ) return false;

    parents.forEach((parent, i) => {
      var rangeS = parent.querySelectorAll("input[type=range]"),
          numberS = parent.querySelectorAll("input[type=number]");

      rangeS.forEach(function(el) {
        el.oninput = function() {
          var slide1 = parseFloat(rangeS[0].value),
              slide2 = parseFloat(rangeS[1].value);

          var slide1Dec = (Math.round(slide1 * 100) / 100).toFixed(2),
              slide2Dec = (Math.round(slide2 * 100) / 100).toFixed(2);

          if (parseFloat(slide1Dec) > parseFloat(slide2Dec)) { [slide1Dec, slide2Dec] = [slide2Dec, slide1Dec] }

          numberS[0].value = slide1Dec;
          numberS[1].value = slide2Dec;
        }
      });

      rangeS[0].onchange = function() {
        numberS[0].dispatchEvent(new Event('change', { bubbles: true }));
      }
      rangeS[1].onchange = function() {
        numberS[1].dispatchEvent(new Event('change', { bubbles: true }));
      }

      numberS.forEach(function(el) {
        el.oninput = function() {
          var number1 = parseFloat(numberS[0].value),
              number2 = parseFloat(numberS[1].value);

          var number1Dec = (Math.round(number1 * 100) / 100).toFixed(2),
              number2Dec = (Math.round(number2 * 100) / 100).toFixed(2);

          if (number1Dec > number2Dec) {
            var tmp = number1Dec;
            numberS[0].value = number2Dec;
            numberS[1].value = tmp;
          }

          rangeS[0].value = number1Dec;
          rangeS[1].value = number2Dec;

        }
      });
    });
  },
	currentFilters: function currentFilters() {
		const filters = document.querySelectorAll('.js-current-filter');

		filters.forEach((item, i) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				theme.CollectionPage.onActiveFilterClick(event);
			});
		});
	},
	sidebarFilters: function sidebarFilters(context) {
		const filters = document.querySelectorAll('.js-collection-side-filter');

		filters.forEach((item, i) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();

				if ( item.querySelector('input[type="checkbox"]').checked ) {
					item.classList.remove('current');
					item.querySelector('input[type="checkbox"]').checked = false;
				} else {
					item.classList.add('current');
					item.querySelector('input[type="checkbox"]').checked = true;
				}

				const formData = new FormData(item.closest('form'));
				const searchParams = new URLSearchParams(formData).toString();
        const accordionContext = item.closest('.c-accordion__panel');

				theme.CollectionPage.renderPage(searchParams, accordionContext, true);
			});
		});
	},
  gridLayout: function gridLayout() {
    var gridIcons = document.querySelectorAll('.js-collection-layout');

    if ( !gridIcons ) return false;

    gridIcons.forEach((item, i) => {

      item.addEventListener('click', function() {
        gridIcons.forEach(gridIcon => {
          gridIcon.classList.remove('active');
        });
        item.classList.add('active');

        var gridType = item.dataset.gridType;
        document.querySelector('.product-loop').setAttribute('data-grid-type', gridType);
      });
    });
  },
  slideoutLinks: function slideoutLinks() {
    const links = document.querySelectorAll('.js-collection-slideout-link');

    const slideoutExists = !!document.querySelector('[data-wau-slideout="collection-sidebar"]');
    if (!slideoutExists) {
      return;
    }
  },
	renderFilters: function renderFilters(accordionContext, sidebarOpen) {
    if ( document.querySelector("[data-collection-filter-results]") ) {
			theme.CollectionPage.currentFilters();
		}
    if ( document.querySelector("[data-collection-sidebar]") || document.querySelector("[data-collection-sort-by]") ) {
      theme.CollectionPage.sidebarFilters();

      const slideoutExists = !!document.querySelector('[data-wau-slideout="collection-sidebar"]');
      if (sidebarOpen && slideoutExists) { // Updated line
        WAU.Slideout._openByName("slideout-collection-sidebar");
      }
    }
    if ( document.querySelector("[data-collection-filters-price-range]") ) {
      theme.CollectionPage.priceRange();
      theme.CollectionPage.priceSlider();
    }
    if ( document.querySelector("[data-collection-grid-layout]") ) {
      theme.CollectionPage.gridLayout();
    }
    if ( document.querySelector("[data-collection-accordion-links]") ) {
      theme.CollectionPage.slideoutLinks();
    }
    if ( document.querySelector("[data-collection-sidebar-layout]") ) {
      console.log('renderFilters');
      theme.CollectionPage.sidebarToggle();
    }

    Shopify.theme.quickview.init();
    WAU.ProductGridVideo.init();
	},
	renderSectionFromFetch: function renderSectionFromFetch(url, section, accordionContext, sidebarOpen) {
    	fetch(url)
			.then(response => response.text())
			.then((responseText) => {
				const html = responseText;
				this.filterData = [...this.filterData, { html, url }];
				theme.CollectionPage.renderProductGrid(html);
				theme.CollectionPage.renderFilters(accordionContext, sidebarOpen);
			});
	},
	renderSectionFromCache: function renderSectionFromCache(filterDataUrl, section, accordionContext, sidebarOpen) {
		const html = this.filterData.find(filterDataUrl).html;
		theme.CollectionPage.renderProductGrid(html);
		theme.CollectionPage.renderFilters(accordionContext, sidebarOpen);
	},
	renderPage: function renderPage(searchParams, accordionContext, sidebarOpen, updateURLHash = true) {
		const sections = theme.CollectionPage.getSections();
    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = element => element.url === url;
      this.filterData.some(filterDataUrl) ?
        theme.CollectionPage.renderSectionFromCache(filterDataUrl, section, accordionContext, sidebarOpen) :
        theme.CollectionPage.renderSectionFromFetch(url, section, accordionContext, sidebarOpen);
    });

    if (updateURLHash) theme.CollectionPage.updateURLHash(searchParams);
	},
	renderProductGrid: function renderProductGrid(html) {
    const innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('CollectionProductGrid').innerHTML;

    document.getElementById('CollectionProductGrid').innerHTML = innerHTML;
	},
	onActiveFilterClick: function onActiveFilterClick(event) {
		event.preventDefault();
		theme.CollectionPage.renderPage(new URL(event.currentTarget.href).searchParams.toString(), false);
	},
	updateURLHash: function updateURLHash(searchParams) {
		history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
	},
	getSections: function getSections() {
    return [
      {
        id: 'main-collection-product-grid',
        section: document.getElementById('main-collection-product-grid').dataset.id,
      }
    ]
  }
}

/*============================================================================
  Search Section
==============================================================================*/
theme.Search = (function() {
  function Search(container) {

    theme.SearchPage.init(container, container.dataset.sectionId);
  }
  Search.prototype = _.assignIn({}, Search.prototype, {
  });

  return Search;
})();

theme.SearchPage = {
	init: function init(container, sectionId) {
		if ( container.querySelector("[data-collection-filter-results]") ) {
			theme.SearchPage.currentFilters();
		}
    if ( container.querySelector("[data-collection-grid-layout]") ) {
      theme.SearchPage.gridLayout();
    }
    if ( container.querySelector("[data-collection-accordion-links]") ) {
      theme.SearchPage.slideoutLinks();
    }
    if ( container.querySelector("[data-collection-sidebar]") || container.querySelector("[data-collection-sort-by]") ) {
      theme.SearchPage.sidebarFilters();
    }
    if ( container.querySelector("[data-collection-filters-price-range]") ) {
      theme.SearchPage.priceRange();
      theme.SearchPage.priceSlider();
    }
    if ( container.querySelector("[data-search-sidebar-layout]") ) {
      theme.SearchPage.sidebarToggle();
    }
		this.filterData = [];

	},
  sidebarToggle: function sidebarToggle() {
    const sidebarToggle = document.querySelector('.js-sidebar-toggle');
    const searchSidebar = document.getElementById('search--sidebar_container');
    const searchGrid = document.getElementById('main-search-results-grid');
    const localStorageKey = "sidebarOpenState";

    if (!sidebarToggle || !searchSidebar || !searchGrid) return false;

    // Function to set the grid class based on the sidebar state
    function setGridClass() {
        if (searchSidebar.classList.contains("open")) {
            searchGrid.classList.remove("span-12");
            searchGrid.classList.add("span-9");
            sidebarToggle.classList.add("open");
        } else {
            searchGrid.classList.remove("span-9");
            searchGrid.classList.add("span-12");
            sidebarToggle.classList.remove("open");
        }
    }
    // Function to toggle sidebar and set localStorage
    function toggleSidebar() {
        searchSidebar.classList.toggle("open");
        setGridClass();

        if (desktop.matches) {
          // Save the current state in localStorage for desktop devices
          const isOpen = searchSidebar.classList.contains("open");
          localStorage.setItem(localStorageKey, isOpen.toString());
        }
    }

    // Set initial state based on localStorage
    const savedState = localStorage.getItem(localStorageKey);
    if (savedState === "true") {
        searchSidebar.classList.add("open");
        searchGrid.classList.remove("span-12");
        searchGrid.classList.add("span-9");
        sidebarToggle.classList.add("open");
    } else {
        searchSidebar.classList.remove("open");
        searchGrid.classList.remove("span-9");
        searchGrid.classList.add("span-12");
        sidebarToggle.classList.remove("open");
    }

    if (device.matches) {
      document.addEventListener("DOMContentLoaded", function() {
        if (device.matches) {
            // Close sidebar by default on mobile & tablet devices
            searchSidebar.classList.remove("open");
            searchGrid.classList.add("span-12");
        }
      });
    }

    // Add click event listener to sidebar toggle
    sidebarToggle.addEventListener('click', function(event){
        event.preventDefault();
        toggleSidebar();
    });
  },
	priceRange: function priceRange() {
		// Add filter to urlParm after text input changes
		const filters = document.querySelectorAll('.js-filter-range-input');
		if (filters.length > 0) {
			filters.forEach((item, i) => {
				item.addEventListener('change', function(event){
					setTimeout(function() {
						const formData = new FormData(item.closest('form'));
						const searchParams = new URLSearchParams(formData).toString();
            const accordionContext = item.closest('.c-accordion__panel');
            var searchString = window.location.search.toString(),
                searchString = searchString.replace('?', '');
            const finalSearchParams = searchString + '&' + searchParams;

						theme.SearchPage.renderPage(finalSearchParams, accordionContext, true);

					}, 1000);
				});
			});
		}
	},
  priceSlider: function priceSlider() {
    var parents = document.querySelectorAll(".js-price-range");

    if ( !parents ) return false;

    parents.forEach((parent, i) => {
      var rangeS = parent.querySelectorAll("input[type=range]"),
          numberS = parent.querySelectorAll("input[type=number]");

      rangeS.forEach(function(el) {
        el.oninput = function() {
          var slide1 = parseFloat(rangeS[0].value),
              slide2 = parseFloat(rangeS[1].value);

          var slide1Dec = (Math.round(slide1 * 100) / 100).toFixed(2),
              slide2Dec = (Math.round(slide2 * 100) / 100).toFixed(2);

          if (parseFloat(slide1Dec) > parseFloat(slide2Dec)) { [slide1Dec, slide2Dec] = [slide2Dec, slide1Dec] }

          numberS[0].value = slide1Dec;
          numberS[1].value = slide2Dec;
        }
      });

      rangeS[0].onchange = function() {
        numberS[0].dispatchEvent(new Event('change', { bubbles: true }));
      }
      rangeS[1].onchange = function() {
        numberS[1].dispatchEvent(new Event('change', { bubbles: true }));
      }

      numberS.forEach(function(el) {
        el.oninput = function() {
          var number1 = parseFloat(numberS[0].value),
              number2 = parseFloat(numberS[1].value);

          var number1Dec = (Math.round(number1 * 100) / 100).toFixed(2),
              number2Dec = (Math.round(number2 * 100) / 100).toFixed(2);

          if (number1Dec > number2Dec) {
            var tmp = number1Dec;
            numberS[0].value = number2Dec;
            numberS[1].value = tmp;
          }

          rangeS[0].value = number1Dec;
          rangeS[1].value = number2Dec;

        }
      });
    });
  },
	currentFilters: function currentFilters() {
		const filters = document.querySelectorAll('.js-current-filter');

		filters.forEach((item, i) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				theme.SearchPage.onActiveFilterClick(event);
			});
		});
	},
	sidebarFilters: function sidebarFilters(context) {
		const filters = document.querySelectorAll('.js-collection-side-filter');

		filters.forEach((item, i) => {
			item.addEventListener('click', (event) => {
				event.preventDefault();

				if ( item.querySelector('input[type="checkbox"]').checked ) {
					item.classList.remove('current');
					item.querySelector('input[type="checkbox"]').checked = false;
				} else {
					item.classList.add('current');
					item.querySelector('input[type="checkbox"]').checked = true;
				}

				const formData = new FormData(item.closest('form'));
				const searchParams = new URLSearchParams(formData).toString();
        const accordionContext = item.closest('.c-accordion__panel');
        var searchString = window.location.search.toString(),
            searchString = searchString.replace('?', '');
        const finalSearchParams = searchString + '&' + searchParams;

				theme.SearchPage.renderPage(finalSearchParams, accordionContext, true);
			});
		});
	},
  gridLayout: function gridLayout() {
    var gridIcons = document.querySelectorAll('.js-collection-layout');

    if ( !gridIcons ) return false;

    gridIcons.forEach((item, i) => {

      item.addEventListener('click', function() {
        gridIcons.forEach(gridIcon => {
          gridIcon.classList.remove('active');
        });
        item.classList.add('active');

        var gridType = item.dataset.gridType;
        document.querySelector('.search__grid').setAttribute('data-grid-type', gridType);
      });
    });
  },
  slideoutLinks: function slideoutLinks() {
    const links = document.querySelectorAll('.js-collection-slideout-link');

    const slideoutExists = !!document.querySelector('[data-wau-slideout="collection-sidebar"]');
    if (!slideoutExists) {
      return;
    }
  },
	renderFilters: function renderFilters(accordionContext, sidebarOpen) {
    if ( document.querySelector("[data-collection-filter-results]") ) {
			theme.SearchPage.currentFilters();
		}
    if ( document.querySelector("[data-collection-sidebar]") || document.querySelector("[data-collection-sort-by]") ) {
      theme.SearchPage.sidebarFilters();

      const slideoutExists = !!document.querySelector('[data-wau-slideout="collection-sidebar"]');
      if (sidebarOpen && slideoutExists) { // Updated line
        WAU.Slideout._openByName("slideout-collection-sidebar");
      }
    }
    if ( document.querySelector("[data-collection-filters-price-range]") ) {
      theme.SearchPage.priceRange();
      theme.SearchPage.priceSlider();
    }
    if ( document.querySelector("[data-collection-grid-layout]") ) {
      theme.SearchPage.gridLayout();
    }
    if ( document.querySelector("[data-collection-accordion-links]") ) {
      theme.SearchPage.slideoutLinks();
    }
    if ( document.querySelector("[data-search-sidebar-layout]") ) {
      theme.SearchPage.sidebarToggle();
    }

    Shopify.theme.quickview.init();
    WAU.ProductGridVideo.init();
	},
	renderSectionFromFetch: function renderSectionFromFetch(url, section, accordionContext, sidebarOpen) {
    	fetch(url)
			.then(response => response.text())
			.then((responseText) => {
				const html = responseText;
				this.filterData = [...this.filterData, { html, url }];
				theme.SearchPage.renderSearchGrid(html);
				theme.SearchPage.renderFilters(accordionContext, sidebarOpen);
			});
	},
	renderSectionFromCache: function renderSectionFromCache(filterDataUrl, section, accordionContext, sidebarOpen) {
		const html = this.filterData.find(filterDataUrl).html;
		theme.SearchPage.renderSearchGrid(html);
		theme.SearchPage.renderFilters(accordionContext, sidebarOpen);
	},
	renderPage: function renderPage(searchParams, accordionContext, sidebarOpen, updateURLHash = true) {
		const sections = theme.SearchPage.getSections();
    sections.forEach((section) => {
      const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
      const filterDataUrl = element => element.url === url;

      this.filterData.some(filterDataUrl) ?
        theme.SearchPage.renderSectionFromCache(filterDataUrl, section, accordionContext, sidebarOpen) :
        theme.SearchPage.renderSectionFromFetch(url, section, accordionContext, sidebarOpen);
    });

    if (updateURLHash) theme.SearchPage.updateURLHash(searchParams);
	},
  renderSearchGrid: function renderSearchGrid(html) {
    const innerHTML = new DOMParser()
      .parseFromString(html, 'text/html')
      .getElementById('searchResultsWrapper').innerHTML;

    document.getElementById('searchResultsWrapper').innerHTML = innerHTML;
	},
  onActiveFilterClick: function onActiveFilterClick(event) {
    event.preventDefault();
    const searchParams = new URL(event.currentTarget.href).searchParams.toString();
    const searchString = new URL(window.location).searchParams.get('q');

    var finalSearchParams = ( searchParams ) ? searchParams : 'q=' + searchString;

    theme.SearchPage.renderPage(finalSearchParams);
  },
	updateURLHash: function updateURLHash(searchParams) {
		history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
	},
  getSections: function getSections() {
    return [
      {
        id: 'main-search-results',
        section: document.getElementById('main-search-results').dataset.id,
      }
    ]
  }
}

/*============================================================================
  Product Modules
==============================================================================*/
var mobile = window.matchMedia('(max-width: 740px)');
var tablet = window.matchMedia('(max-width: 979px) and (min-width: 741px)');
var desktop = window.matchMedia('(min-width: 980px)');

theme.refreshVariantSelectors = async function({
  context,
  sectionId,
  Product,
  events,
  callback,
  wrapperSelector,
  selectedValueSelector,
  getSelectedValues,
  config
}) {

  const swatchWrapper = context.querySelector(wrapperSelector);
  if (!swatchWrapper) return;

  const sectionUrl = swatchWrapper.dataset.url || window.location.pathname;
  const selectedOptionValues = getSelectedValues(context, swatchWrapper);

  const params = selectedOptionValues.length > 0
    ? `&option_values=${selectedOptionValues.join(',')}`
    : '';

  swatchWrapper.classList.add('is-loading');

  const { quickview: isQuickview } = config;

  const hashKey = `${selectedOptionValues.join(',')}-${sectionId}`;

  function getVariant(html) {
    if (!html) return false;
    const variant = html.querySelector('[data-selected-variant]')?.innerHTML;
    return !variant ? undefined : JSON.parse(variant);
  }

  async function fetchData(url, hashKey) {
    if (!theme.cachedVariantHtml.has(hashKey)) {
      const response = await fetch(url) ;
      const responseText = await response.text();
      return responseText;
    } else {
      return theme.cachedVariantHtml.get(hashKey);
    }
  }

    if (isQuickview) {

    const responseText = await fetchData(`${sectionUrl}?${params}`, hashKey);

    const html = new DOMParser().parseFromString(responseText, 'text/html');

    const template = html.querySelector('template#quickview');

    if (!template) return;

    const content = template.content.cloneNode(true);

    if (!content) return;

    const newWrapper = content.querySelector(`${wrapperSelector}`);

    if (!newWrapper) return;

    swatchWrapper.innerHTML = newWrapper.innerHTML;
    swatchWrapper.classList.remove('is-loading');

    const newVariant = getVariant(html);

    theme.ProductForm(context, sectionId, events, Product);

    const config = JSON.parse(context.querySelector(`#product-form-${sectionId}`).dataset.productForm || "{}");

    if (callback && typeof callback === "function") {
      callback(context, newVariant, config);
    }

  } else {

    const responseText = await fetchData(`${sectionUrl}?section_id=${sectionId}${params}`, hashKey);

    const html = new DOMParser().parseFromString(responseText, 'text/html');
    const newWrapper = html.querySelector(`${wrapperSelector}`);

    if (!newWrapper) return;

    swatchWrapper.innerHTML = newWrapper.innerHTML;
    swatchWrapper.classList.remove('is-loading');

    const newVariant = getVariant(html);

    theme.ProductForm(context, sectionId, events, Product);

    const config = JSON.parse(context.querySelector(`#product-form-${sectionId}`).dataset.productForm || "{}");

    if (callback && typeof callback === "function") {
      callback(context, newVariant, config);
    }
  }
}

// Swatches
theme.RefreshSwatches = function(context, sectionId, Product, events, config, callback) {
  theme.refreshVariantSelectors({
    context,
    sectionId,
    Product,
    events,
    callback,
    wrapperSelector: '.product__variants-swatches',
    selectedValueSelector: 'input[type="radio"]:checked',
    getSelectedValues: (ctx, wrapper) =>
      Array.from(wrapper.querySelectorAll('input[type="radio"]:checked')).map(({ dataset }) => dataset.optionValueId),
    config
  });
};

// Dropdowns
theme.RefreshDropdowns = function(context, sectionId, Product, events, config, callback) {
  theme.refreshVariantSelectors({
    context,
    sectionId,
    Product,
    events,
    callback,
    wrapperSelector: '.product__variants-select',
    selectedValueSelector: 'select.js-variant-selector',
    getSelectedValues: (ctx, wrapper) =>
      Array.from(wrapper.querySelectorAll('select.js-variant-selector')).map(select => select.selectedOptions[0]?.dataset.optionValueId),
    config
  });
};

theme.cachedVariantHtml = new Map();

theme.prefetchVariants = function(context, {elements}, sectionId, config) {

  const selectors = {
    "swatches": ".product__variants-swatches",
    "dropdowns": ".product__variants-select"
  };

  const hasSwatches = context.querySelector(selectors.swatches) ? true : false;

  function getOptionValuesFromSwatches(input) {
    const optionValues = [input, ...Array.from(elements).filter(item => item.matches(`input[type="radio"]:not([name="${input.name}"]):checked`))].sort((a,b) => parseInt(a.getAttribute('data-position')) - parseInt(b.getAttribute('data-position'))).map((input2) => input2.getAttribute('data-option-value-id'));
    return optionValues
  };

  function getOptionValuesFromDropdowns(input, allOptions) {
    const optionValues = [input, ...Array.from(allOptions).filter(option => option.matches(`option[data-option-value-id]:not([name="${input.getAttribute('name')}"]):checked`))].sort((a,b) => parseInt(a.getAttribute('data-position')) - parseInt(b.getAttribute('data-position'))).map(input => input.getAttribute('data-option-value-id'));
    return optionValues;
  };

  async function cacheHtmlPromise(optionValues) {

    const { url: sectionUrl } = hasSwatches ? context.querySelector(selectors.swatches).dataset : context.querySelector(selectors.dropdowns).dataset;

    const params = optionValues.length > 0
    ? `&option_values=${optionValues.join(',')}`
    : '';

    const hashKey = `${optionValues.join(',')}-${sectionId}`;

    if (!theme.cachedVariantHtml.has(hashKey)) {
      const { quickview: isQuickview } = config;
      const response = isQuickview ? await fetch(`${sectionUrl}?${params}`) : await fetch(`${sectionUrl}?section_id=${sectionId}${params}`);
      const responseText = await response.text();
      theme.cachedVariantHtml.set(hashKey, responseText);
    }
  };

  function handleSwatches(elements) {
    Array.from(elements).filter(item => item.matches('input[type="radio"]:not(:checked)')).forEach(item => {
      const optionValues = getOptionValuesFromSwatches(item);
      cacheHtmlPromise(optionValues);
    });
  };

  function handleDropdowns(context) {
    const allOptions = context.querySelectorAll('option[data-option-value-id]');
    Array.from(context.querySelectorAll('option[data-option-value-id]:not(:checked)')).forEach(item => {
      const optionValues = getOptionValuesFromDropdowns(item, allOptions);
      cacheHtmlPromise(optionValues);
    });
  };

  if (hasSwatches) {
    handleSwatches(elements);
  } else {
    // We cannot pass elements to this function because the <option> element is not included.
    // See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements#value
    handleDropdowns(context);
  }
};

theme.ProductForm = function (context, sectionId, events, Product) {
  var prodForm = context.querySelector(`#product-form-${sectionId}`);
  var config = JSON.parse(prodForm.dataset.productForm || '{}');
  var selector, varSelectors, options, variant;

  context.querySelectorAll('.formVariantId').forEach((item, i) => {
    // Plus initialize hidden insert variant selector 
    // insertVariant object is 'add_an_insert' metafield and can be found in product-json.liquid
    if (item.classList.contains('insertId')){
      item.setAttribute("name", "items[1][id]");
    } else {
      item.setAttribute("name", "items[0][id]");
    }
  });

  (function clearCartMessages() {

    const addToCartButton = context.querySelector('.js-ajax-submit');

    if (!addToCartButton) return;

    events.on('variantchange', clearMessages);
    events.on('variantunavailable', clearMessages);
    addToCartButton.addEventListener('click', clearMessages);

    function clearMessages() {
      const elements = context.querySelectorAll(`.js-error-msg, .js-added-msg`);
      if (elements.length > 0) {
        elements.forEach((element) => {
          theme.Helpers.fadeOut(element);
        });
      }
    }
  })();

  // Plus Add event listener on checkbox check to toggle all other checkboxes off
  // As well as enable hidden insert input on add to cart forms
  const checkboxes = document.querySelectorAll('.plus-insert-widget input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      let insertId = this.dataset.insertId;
      let inputs = document.querySelectorAll(".insertId");
      let qtys = document.querySelectorAll(".insertQty");
      let properties = document.querySelectorAll(".insertProperty");
      if (this.checked){
        inputs.forEach(input => {
          if (input.value == insertId){
            input.removeAttribute('disabled');
            enableInputs(qtys);
            enableInputs(properties);
          }
          checkboxes.forEach(function(otherCheckbox) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
        }); 
      } else {
        disableInputs(inputs);
        disableInputs(qtys);
        disableInputs(properties);
      }
    });
  });

  if ( Product.variants.length == 1 ) {
    if ( context.querySelector('[data-store-availability-container]') ) {
      events.trigger("storeavailability:variant", Product.variants[0].id, Product.title, context);
    }
    return false;
  }

  // variant only js below
  if ( Product.has_only_default_variant ) return false;

  (function lazyLoadPrefetch() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(context);
        theme.prefetchVariants(context, prodForm, sectionId, config);
      },
      {
        rootMargin: '0px 0px 200px 0px',
      });
      observer.observe(context);
    } else {
      theme.prefetchVariants(context, prodForm, sectionId, config);
    }
  })();

  varSelectors = context.querySelectorAll('.js-variant-selector');

  varSelectors.forEach((item, i) => {
    item.addEventListener("change", function (event) {
      event.preventDefault();

      // Optional: skip if config.swatches is not active
      if (config.swatches === 'swatches') {
        theme.RefreshSwatches(context, sectionId, Product, events, config, variantEvents);
        return;
      }

      if (config.swatches === 'drop-downs' || config.swatches === 'dropdowns') {
        theme.RefreshDropdowns(context, sectionId, Product, events, config, variantEvents);
        return;
      }

      // fallback for dropdowns or legacy
      options = Array.from(context.querySelectorAll('select.js-variant-selector'), (select) => select.value);

      variant = Product.variants.find((variant) => {
        return !variant.options.map((option, index) => {
          return options[index] === option;
        }).includes(false);
      });

      variantEvents(context, variant, config);
    });
  });

  (function sale_icon() {
    const acceptedFormats = {
      "icon": "icon",
      "percentage": "percentage",
      "amount": "amount"
    };
    const selectors = {
      salePriceBadge: ".price__badge.price__badge--sale"
    };

    const saleIconEl = context.querySelector(selectors.salePriceBadge);
    const dataFormat = context.dataset.saleFormat;
    const savingsString = config.savings;

    if (typeof money !== 'function') {
      console.log('sale_icon:: Error. Money helper function is not available.');
      return false;
    }

    if (dataFormat == acceptedFormats.icon) {
      console.log('sale_icon:: Error. Format does not match an accepted format.');
      return false;
    }

    if (!config) {
      console.log('sale_icon:: Error. Do not have access to the config object for translations.');
      return false;
    }

    if (!saleIconEl) {
      console.log('sale_icon:: Error. No Sale icon element to work with.');
      return false;
    }

    function salePercentage(variant) {
      const difference = variant.compare_at_price - variant.price;
      const differencePercentage = Math.floor((difference / variant.compare_at_price) * 100);
      return differencePercentage + '%';
    };

    function saleAmount(variant) {
      const difference = variant.compare_at_price - variant.price;
      return money(difference);
    };

    function showDiscount(variant, format, string, regex = /{{ savings }}/i) {

      if (!variant) {
        console.log('Error. No variant passed into function.');
        return false;
      }
      if (!format) {
        console.log('Error. No format was passed into function.');
        return false;
      }
      if (!string) {
        console.log('Error. No string passed into function.');
        return false;
      }

      switch (format) {
        case acceptedFormats.percentage:
          return string.replace(regex, salePercentage(variant));
          break;
        case acceptedFormats.amount:
          return string.replace(regex, saleAmount(variant));
          break;
      };
    };

    function updateSaleIcon(variant) {
      if ( variant.compare_at_price > variant.price ) {
        saleIconEl.innerHTML = showDiscount(variant, dataFormat, savingsString);
      }
    }

    events.on("variantchange", updateSaleIcon);
  })();

  (function variantInventoryQuantity() {

    const classes = {
      variantStockLevels: 'js-variant-stock-levels',
      variantStockLevelsMessage: 'js-variant-stock-levels__message',
      hide: 'visually-hidden'
    };
    const selectors = {
      variantStockLevels: '.' + classes.variantStockLevels,
      variantStockLevelsMessage: '.' + classes.variantStockLevelsMessage,
      variantStockLevelsTheshold: 'data-variant-stock-level-threshold'
    };
    const DEFAULT_LIMIT = 11;
    const variantStockLevelEl = context.querySelector(selectors.variantStockLevels);
    const variantStockLevelMessageEl = context.querySelector(selectors.variantStockLevelsMessage);

    if (!variantStockLevelEl) {
      console.log('Error. Could not find product inventory element.');
      return false;
    }

    const stockLevelThreshold = variantStockLevelEl.getAttribute(selectors.variantStockLevelsTheshold) !== undefined ? parseInt(variantStockLevelEl.dataset.stockLevelThreshold, 10) : DEFAULT_LIMIT;

    const checkFadeSupport = () => typeof theme.Helpers.fadeIn === 'function' && typeof theme.Helpers.fadeOut === 'function';

    const showElement = (element) => {
      if (!element) return;
      element.classList.remove(classes.hide);
      if (checkFadeSupport) {
        theme.Helpers.fadeIn(element);
      }
    };

    const hideElement = (element) => {
      if (!element) return;
      if (checkFadeSupport) {
        theme.Helpers.fadeOut(element);
      }
      // element.classList.add(classes.hide);
    };

    const getMessage = (config, quantity, regex = /{{ count }}/) => {
      if (quantity == 1) {
        if (config.only_left.one.includes(regex.source)) {
          return config.only_left.one.replace(regex, quantity);
        } else {
          return config.only_left.one;
        }
      } else {
        if (config.only_left.one.includes(regex.source)) {
          return config.only_left.other.replace(regex, quantity);
        } else {
          return config.only_left.other;
        }
      }
    };

    events.on("variantchange", (variant) => {
      if (variant.inventory_management && variant.inventory_quantity < stockLevelThreshold && variant.inventory_quantity > 0) {
        variantStockLevelMessageEl.innerHTML = getMessage(config, variant.inventory_quantity);
        showElement(variantStockLevelEl);
      } else {
        hideElement(variantStockLevelEl);
      }
    });
    events.on("variantunavailable", (variant) => {
      hideElement(variantStockLevelEl);
    });
  })();

  (function price() {
      var element = context.querySelector(".price__regular .price-item--regular");
      var originalElement = context.querySelector(".original-price-container");
      var spanElem = originalElement.querySelectorAll(".js-original-price");

      if (!element) return false;

      events.on("variantchange", function (variant) {
        var price = money(variant.price);
        element.innerHTML = price;
        spanElem.forEach((item, i) => {
          
          if (item.dataset.variantPriceId == variant.id) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }

        });

        events.on("variantunavailable", function (variant) {
          element.innerHTML = '';
        });
      });
    })();

  (function price_classes() {
    var element = context.querySelector("[data-price]");

    if (!element) return false;

    events.on("variantchange", function (variant) {
      if ( variant.available && variant.compare_at_price > variant.price ) {
        element.classList.add('price--on-sale');
        element.classList.remove('price--sold-out');
      } else if ( !variant.available && variant.compare_at_price > variant.price ) {
        element.classList.add('price--sold-out');
        element.classList.add('price--on-sale');
      } else if ( !variant.available ) {
        element.classList.add('price--sold-out');
        element.classList.remove('price--on-sale');
      } else {
        element.classList.remove('price--on-sale');
        element.classList.remove('price--sold-out');
      }

      if (variant.unit_price_measurement) {
        element.classList.add('price--unit-available');
      } else {
        element.classList.remove('price--unit-available');
      }
    });

  })();

  (function unit_price() {
    var element = context.querySelector("[data-unit-price]");
    var wrapper = context.querySelector(".price__unit");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var unitPrice = "";

      if (variant.unit_price) {
        unitPrice =
          theme.Helpers.formatMoney(variant.unit_price, config.money_format); +
          ' ' +
          config.unit_price_separator +
          ' ' +
          getBaseUnit(variant);

          wrapper.style.display = "flex";
      } else {
        wrapper.style.display = "none";
      }

      element.innerHTML = unitPrice;
    });
  })();

  (function compare_price() {
    var saleEl = context.querySelector(".price__sale .price-item--sale");
    var regEl = context.querySelector(".price__sale .price-item--regular");

    if ( !saleEl ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var salePrice = "",
          regPrice = "";

      if ( variant.compare_at_price > variant.price ) {
        regPrice = money(variant.compare_at_price);
        salePrice = money(variant.price);
      }

      saleEl.innerHTML = salePrice;
      regEl.innerHTML = regPrice;
    });
  })();

  (function add_to_cart() {
    var element = context.querySelector(".js-ajax-submit");

    if (!element) return false;

    events.on("variantchange", function (variant) {
      var text = config.button;
      var disabled = false;

      if ( !variant.available ) {
        text = config.sold_out;
        disabled = true;
      }

      element.value = text;
      element.disabled = disabled;
    });

    events.on("variantunavailable", function () {
      element.value = config.unavailable;
      element.disabled = true;
    });
  })();

  (function shop_pay() {
    const element = context.querySelector('.product-form-installment');

    if (!element) return false;

    const input = element.querySelector('input[name="id"]');
    const selectId = element.querySelector('select[name="id"]');

    events.on("variantchange", function (variant) {
      selectId.value = parseInt(variant.id);
      input.value = variant.id;
      selectId.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  })();

  (function smart_payment_buttons() {
    var element = context.querySelector(".shopify-payment-button");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {

      if ( !variant.available ) {
         element.style.display = 'none';
       } else {
         element.style.display = 'block';
       }

    });
  })();

  (function sticky_bar() {
    var stickyBar = document.getElementById('sticky-cart');

    if ( !stickyBar ) return false;

    var button = stickyBar.querySelector(".sticky-add");
    var text = config.button;
    var disabled = false;

    events.on("variantunavailable", function (variant) {
      // Get the element
      var element = context.querySelector("#sticky-cart .price__regular .price-item--regular");

      // Update the price
      price = config.unavailable;
      element.innerHTML = price;

      // Update the button
      button.value = config.unavailable;
      button.disabled = true;
    });

    events.on("variantchange", function (variant) {
      var isMain = context.getAttribute("data-main-product");

      if ( isMain === null ) return false;

      (function price() {
        var element = context.querySelector("#sticky-cart .price__regular .price-item--regular");

        var price = money(variant.price);
        element.innerHTML = price;

        events.on("variantunavailable", function (variant) {
          price = config.unavailable;
          element.innerHTML = price;
        });
      })();

      (function price_classes() {
        var element = context.querySelector("#sticky-cart [data-price]");

        if ( variant.available && variant.compare_at_price > variant.price ) {
          element.classList.add('price--on-sale');
          element.classList.remove('price--sold-out');
        } else if ( !variant.available && variant.compare_at_price > variant.price ) {
          element.classList.add('price--sold-out');
          element.classList.add('price--on-sale');
        } else if ( !variant.available ) {
          element.classList.add('price--sold-out');
          element.classList.remove('price--on-sale');
        } else {
          element.classList.remove('price--on-sale');
          element.classList.remove('price--sold-out');
        }

        if (variant.unit_price_measurement) {
          element.classList.add('price--unit-available');
        } else {
          element.classList.remove('price--unit-available');
        }

      })();

      (function unit_price() {
        var element = context.querySelector("#sticky-cart [data-unit-price]");
        var wrapper = context.querySelector("#sticky-cart .price__unit");

        if ( !element ) {
          return false;
        }

        var unitPrice = "";

        if (variant.unit_price) {
          unitPrice =
            theme.Helpers.formatMoney(variant.unit_price, config.money_format); +
            ' ' +
            config.unit_price_separator +
            ' ' +
            getBaseUnit(variant);

            wrapper.style.display = "flex";
        } else {
          wrapper.style.display = "none";
        }

        element.innerHTML = unitPrice;
      })();

      (function compare_price() {
        var saleEl = context.querySelector("#sticky-cart .price__sale .price-item--sale");
        var regEl = context.querySelector("#sticky-cart .price__sale .price-item--regular");

        if ( !saleEl ) {
          return false;
        }

        var salePrice = "",
            regPrice = "";

        if ( variant.compare_at_price > variant.price ) {
          regPrice = money(variant.compare_at_price);
          salePrice = money(variant.price);
        }

        saleEl.innerHTML = salePrice;
        regEl.innerHTML = regPrice;
      })();


      // Update Option 1
      var option1 = stickyBar.querySelector('#current-option-1 .option-selected');

      if ( option1 ) {
        stickyBar.querySelector('#current-option-1 .option-selected').innerHTML = variant.option1;
      }

      var option2 = stickyBar.querySelector('#current-option-2 .option-selected');
      if ( option2 ) {
        stickyBar.querySelector('#current-option-2 .option-selected').innerHTML = variant.option2;
      }

      var option3 = stickyBar.querySelector('#current-option-3 .option-selected');
      if ( option3 ) {
        stickyBar.querySelector('#current-option-3 .option-selected').innerHTML = variant.option3;
      }

      // Update button
      var button = stickyBar.querySelector(".sticky-add");
      var text = config.button;
      var disabled = false;

      if ( !variant.available ) {
        text = config.sold_out;
        disabled = true;
      }

      button.value = text;
      button.disabled = disabled;

      events.on("variantunavailable", function () {
        button.value = config.unavailable;
        button.disabled = true;
      });
    });

  })();

  (function variant_weight() {
    var element = context.querySelector(".js-variant-weight");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_weight = `${variant.weight_in_unit} ${variant.weight_unit}`;

      element.innerHTML = variant_weight;

      if ( variant_weight === "" ) {
        context.querySelector(".js-variant-weight-container").classList.add('hide');
      } else {
        context.querySelector(".js-variant-weight-container").classList.remove('hide');
      }

    });
    events.on("variantunavailable", function (variant) {
      var variant_weight = config.unavailable;
      element.innerHTML = variant_weight;
    });

  })();

  (function variant_inventory() {
    var element = context.querySelector(".js-variant-inventory");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_inventory = variant.inventory_quantity;

      element.innerHTML = variant_inventory;

      if ( variant_inventory === "" ) {
        context.querySelector(".js-variant-inventory-container").classList.add('hide');
      } else {
        context.querySelector(".js-variant-inventory-container").classList.remove('hide');
      }

    });
    events.on("variantunavailable", function (variant) {
      var variant_inventory = config.unavailable;
      element.innerHTML = variant_inventory;
    });

  })();

  (function variant_selected() {
    var element = context.querySelector(".js-variant-selected");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_title = variant.title;

      element.innerHTML = variant_title;

      if ( variant_title === "" ) {
        context.querySelector(".js-variant-selected-container").classList.add('hide');
      } else {
        context.querySelector(".js-variant-selected-container").classList.remove('hide');
      }

    });
    events.on("variantunavailable", function (variant) {
      var variant_title = config.unavailable;
      element.innerHTML = variant_title;
    });

  })();

  (function variant_sku() {
    var element = context.querySelector(".js-product-sku");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_sku = variant.sku;

      element.innerHTML = variant_sku;

      if ( variant_sku === "" ) {
        context.querySelector(".js-product-sku-container").classList.add('hide');
      } else {
        context.querySelector(".js-product-sku-container").classList.remove('hide');
      }

    });
    events.on("variantunavailable", function (variant) {
      var variant_sku = config.unavailable;
      element.innerHTML = variant_sku;
    });

  })();

  // Plus KR changed 4/24/2023 updates 'add insert' checkbox on variant change
  // Helper functions to set 'disabled' attribute on hidden inputs.
  function disableInputs (items){
    items.forEach(item => item.setAttribute('disabled', true));
  };
  function enableInputs (items){
    items.forEach(item => item.removeAttribute('disabled'));
  };

  events.on("variantchange", function (variant) {
    let checkboxContainers = document.querySelectorAll(".plus-insert-checkbox");
    let inputs = document.querySelectorAll(".insertId");
    let qtys = document.querySelectorAll(".insertQty");
    let properties = document.querySelectorAll(".insertProperty");
    checkboxContainers.forEach((checkboxContainer) => {
      let dataID = parseInt(checkboxContainer.dataset.variantId);
      let checkbox = checkboxContainer.querySelector("input[type='checkbox']");
      if (dataID === variant.id) {
        checkboxContainer.classList.remove("display-none");
      } else {
        checkboxContainer.classList.add("display-none");
        if (checkbox.checked) {
          checkbox.checked = false;
        }
        disableInputs(inputs);
        disableInputs(qtys);
        disableInputs(properties);
      }
    });
  });

  function money(cents) {
    return theme.Helpers.formatMoney(cents, config.money_format);
  }

  function getBaseUnit(variant) {
   return variant.unit_price_measurement.reference_value === 1
     ? variant.unit_price_measurement.reference_unit
     : variant.unit_price_measurement.reference_value +
         variant.unit_price_measurement.reference_unit;
  }

  function variantEvents(context, variant, config) {
    if ( !variant ) {
     events.trigger("variantunavailable", config);
     Events.trigger("storeavailability:unavailable");
     events.trigger("storeavailability:unavailable");
     return;
    }

    if ( Product.variants.length == 1 ) {
     if ( !variant.available ) {
       var element = context.querySelector(".product-price");
       element.innerHTML = config.sold_out;
     }
     return;
    }

    events.trigger("variantchange", variant, config);
    events.trigger("variantchange:option1:" + variant.option1);
    events.trigger("variantchange:option2:" + variant.option2);
    events.trigger("variantchange:option3:" + variant.option3);

    if ( context.querySelector('[data-store-availability-container]') ) {
     events.trigger("storeavailability:variant", variant.id, Product.title, context);
    }

    if ( variant.featured_media ) {
     Events.trigger("variantchange:image", variant.featured_media.id, context);
    }

    if ( config.enable_history ) historyState(variant, context);

    updateVariantInput(variant, context);
  }

  function historyState(variant, context) {
    if ( !variant ) return;
    window.history.replaceState({ }, '', `${context.dataset.url}?variant=${variant.id}`);
  }

  function updateVariantInput(variant, context) {
    context.querySelectorAll('.formVariantId').forEach((item, i) => {
      // Plus update hidden insert variant selector 
      // insertVariant object is 'add_an_insert' metafield and can be found in product-json.liquid
      if (item.classList.contains('insertId') && variant.insertVariant){
        item.value = variant.insertVariant.id;
        item.setAttribute("name", "items[1][id]");
        // Plus update the line item property id too
        let property = item.nextElementSibling;
        property.value = variant.id;
      } else {
        item.value = variant.id;
        item.setAttribute("name", "items[0][id]");
      }
      item.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }
}

theme.ProductQty = function(context, events) {
  var elements = context.querySelectorAll(".product-qty, .formQty");

  if (!elements) {
    return false;
  }

  elements.forEach((element, i) => {
    events.on("quantitycontrol:click", change);
    events.on("variantchange", reset);

    element.addEventListener('change', (event) => {
      elements.forEach((element) => {
        element.value = parseInt(event.target.value);
      });
    });

    function change(value) {
      var quantity = parseInt(element.value) + value;

      if ( quantity < 1 ) {
        return false;
      }

      element.value = quantity;
    }
    function reset() {
      element.value = 1;
    }
  });
}

theme.ProductQuantityControls = function(context, events) {
  Control(".quantity-control-up", 1);
  Control(".quantity-control-down", -1);

  function Control(selector, value) {
    var element = context.querySelector(selector);

    if ( !element ) {
      return false;
    }

    element.addEventListener("click", function (event) {
      event.preventDefault();
      events.trigger("quantitycontrol:click", value);
    });
  }
};

theme.ProductScrollGallery = (function () {
  function init(context, sectionId, events, Product) {
    let config = JSON.parse(context.querySelector('.js-product-gallery').dataset.galleryConfig || '{}'),
        main = context.querySelector('.js-carousel-main');

    if ( !main ) return false;

    if (mobile.matches) {
      theme.ProductScrollGallery.enableCarousel(main, config, context);
    }
    /* If mobile trigger gallery */
    Events.on("mediaquery:mobile", function() {
      theme.ProductScrollGallery.enableCarousel(main, config, context);
    });
    Events.on("mediaquery:tablet", function() {
      theme.ProductScrollGallery.enableCarousel(main, config, context);
    });

    /* If click to enlarge */
    if ( config.clickToEnlarge ) theme.ProductScrollGallery.enlargePhoto(context);

    /* Trigger Scroll To on Variant Change */
    Events.on('variantchange:image', function(id, context){
      if ( context.dataset.sectionId === "quickview" ) return false;
      if ( id === null ) return false;
      /* Select new image in flickity */
      let main = context.querySelector('.js-carousel-main'),
          el = main.querySelector("[data-image-id='" + id + "']"),
          index = el.dataset.slideIndex;

      if ( desktop.matches ) {
        theme.ProductScrollGallery.scrollToImage(index, context, el);
      }
    });

    /* Update active element on media click */
    if (mobile.matches) return false;
    context.querySelectorAll('.product-media-container').forEach((item, i) => {
      item.addEventListener('YTVideoStart', function() {
        theme.ProductScrollGallery.switchMedia(item.dataset.mediaNumber, context);
      });
      document.body.addEventListener('click', function (event) {
        if (item.contains(event.target)) {
          theme.ProductScrollGallery.switchMedia(item.dataset.mediaNumber, context);
        }
      });
    });
  }

  function enableCarousel(main, config, context) {
    let initialEl = main.querySelector("[data-image-id='" + context.dataset.initialVariant + "']"),
        initialIndex;

    if ( initialEl ) {
      initialIndex = initialEl.dataset.slideIndex;
    } else {
      initialIndex = 0;
    }

    if (config.navStyle == 'dots') {
      var dots = true,
          arrows = false;
    } else {
      var dots = false,
          arrows = true;
    }

    var flkty = new Flickity( main, {
      // options
      fade: true,
      wrapAround: true,
      cellAlign: 'left',
      draggable: true,
      contain: true,
      pageDots: dots,
      prevNextButtons: arrows,
      autoPlay: false,
      selectedAttraction: 0.01,
      dragThreshold: 5,
      accessibility: false,
      adaptiveHeight: false,
      imagesLoaded: true,
      initialIndex: initialIndex,
      on: {
        ready: function() {
          let id = this.selectedElement.dataset.imageId;

          /* Fade in */
          context.querySelector('.js-product-gallery').style.visibility = "visible";
        },
        change: function() {
          /* Set focus control on change */
          theme.ProductScrollGallery.removeFocus(context);
          theme.ProductScrollGallery.addFocus(this.selectedElement, context);

          /* Set media */
          theme.ProductScrollGallery.switchMedia(this.selectedElement.dataset.imageId, context);

          /* Allow model drag */
          if ( this.selectedElement.classList.contains('model-slide') ) {
            if ( this.isDraggable ) {
              /* Turn off drag for model usage */
              this.options.draggable = !this.options.draggable;
              this.updateDraggable();
            }
          }
        }
      }
    });

    theme.ProductScrollGallery.galleryEvents(flkty, main, config, context);
  }

  function disableCarousel(flkty) {
    flkty.destroy();
  }

  function galleryEvents(flkty, main, config, context) {

    /* On Variant Change and Initial Load */
    Events.on('variantchange:image', function(id, context){
      if ( context.dataset.sectionId === "quickview" ) return false;
      if ( id === null ) return false;

      /* Select new image in flickity */
      let main = context.querySelector('.js-carousel-main'),
          el = main.querySelector("[data-image-id='" + id + "']"),
          index = el.dataset.slideIndex;

      theme.ProductScrollGallery.switchMedia(id, context);

      if ( desktop.matches ) {
        theme.ProductScrollGallery.scrollToImage(index, context, el);
      } else {
        flkty.select( index );
      }
    });

    Events.on("mediaquery:desktop", function() {
      theme.ProductScrollGallery.disableCarousel(flkty);
    });

    Events.on("editor:section:select", function() {
      if ( desktop.matches ) {
        theme.ProductScrollGallery.disableCarousel(flkty);
      } else {
        theme.ProductScrollGallery.enableCarousel(main, config, context);
      }
    });

  }

  function removeFocus(context) {
    let main;

    if ( context ) {
      main = context;
    } else {
      main = context.querySelector('.js-carousel-main');
    }

    /* Set all elements to no tab */
    context.querySelectorAll('.js-carousel-main *').forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.blur();
    });

    let buttonContents = context.querySelectorAll('.flickity-button *');
    buttonContents.forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.classList.add('js-hide-focus')
    });

    if (main.classList.contains('.flickity-enabled')) {
      main.setAttribute('tabIndex', '-1');
      main.classList.add('js-hide-focus');
    }

  }

  function addFocus(current, context) {
    /* Set current element to tab */
    if ( current.classList.contains('image-slide') ) {
      current.querySelector('img').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('video-slide') ) {
      current.querySelectorAll('.plyr__controls *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    } else if ( current.classList.contains('external_video-slide') ) {
      current.querySelector('iframe').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('model-slide') ) {
      current.querySelectorAll('.shopify-model-viewer-ui__controls-area *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    }
  }

  function scrollToImage(index, context, currentItem) {
    let elements = context.querySelectorAll('.js-product-image-item');

    elements.forEach((item, i) => {
      item.classList.remove('selected');
    });

    if ( !currentItem ) return false;
    currentItem.classList.add('selected');

    if ( document.querySelector('body').classList.contains("template-index") ) {
      currentItem.scrollIntoView();
    } else {
      const headerHeight = getComputedStyle(document.documentElement).getPropertyValue('--header-height').replace('px', '');

      document.documentElement.scrollTo({
        top: currentItem.offsetTop - headerHeight + 250,
        left: 0,
        behavior: 'smooth'
      });
    }

  }

  function enlargePhoto(context) {

    let buttons = context.querySelectorAll('.zoom_btn');

    if ( !buttons ) return false;

    buttons.forEach((button, i) => {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        var btn = event.target;
        openPhotoSwipe(i);
      });
    });

    var openPhotoSwipe = function(index) {
      var pswpElement = document.querySelectorAll('.pswp')[0];

      let images = context.querySelectorAll('.js-image-slide');

      if ( images.length < 2 ) {
        var arrows = false;
      } else {
        var arrows = true;
      }

      let items = [];
      images.forEach((image, i) => {
        let imageTag = image.querySelector('.product__image');

        let item = {
          src: imageTag.getAttribute('data-zoom-src'),
          w: imageTag.getAttribute('data-width'),
          h: imageTag.getAttribute('data-height')
        }
        items.push(item);
      });

      var options = {
        index: index,
        arrowEl: arrows,
        captionEl: false,
        closeOnScroll: false,
        counterEl: false,
        history: false,
        fullscreenEl: false,
        preloaderEl: false,
        shareEl: false,
        tapToClose: false,
        getThumbBoundsFn: function(index) {
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var thumbnail = context.querySelector('.product__image');
          var rect = thumbnail.getBoundingClientRect();
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }
      };

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      gallery.listen('afterChange', function() {
        var flkty = Flickity.data('.js-carousel-main');
        if (!flkty) return false;
        var newIndex = gallery.getCurrentIndex();
        flkty.select (newIndex);
      });

    };
  }

  function switchMedia(mediaId, context) {
    let main = context.querySelector('.js-carousel-main'),
        currentMedia = main.querySelector('[data-product-single-media-wrapper]:not(.inactive)'),
        newMedia = main.querySelector('[data-product-single-media-wrapper]' + "[data-thumbnail-id='product-template-" + mediaId +"']"),
        otherMedia = main.querySelectorAll('[data-product-single-media-wrapper]' + ":not([data-thumbnail-id='product-template-" + mediaId + "'])");

    if ( currentMedia ) {
      currentMedia.dispatchEvent(
        new CustomEvent('mediaHidden', {
          bubbles: true,
          cancelable: true
        })
      );
    }
    if ( newMedia ) {
      newMedia.classList.add('active-slide');
      newMedia.classList.remove('inactive');
      newMedia.dispatchEvent(
        new CustomEvent('mediaVisible', {
          bubbles: true,
          cancelable: true
        })
      );
    }
    if ( otherMedia ) {
      otherMedia.forEach(
        function(el) {
          el.classList.add('inactive');
          el.classList.remove('active-slide');
        }.bind(this)
      );
    }
  }

  return {
    init: init,
    enableCarousel: enableCarousel,
    disableCarousel: disableCarousel,
    galleryEvents: galleryEvents,
    addFocus: addFocus,
    removeFocus: removeFocus,
    scrollToImage: scrollToImage,
    enlargePhoto: enlargePhoto,
    switchMedia: switchMedia
  };

})();

theme.ProductGallery = (function () {
  function init(context, sectionId, events, Product) {
    let config = JSON.parse(context.querySelector('.js-product-gallery').dataset.galleryConfig || '{}'),
        main = context.querySelector('.js-carousel-main'),
        carouselNav = context.querySelector('.js-thumb-carousel-nav');

    if ( !main ) return false;

    this.mainSlider(main, carouselNav, config, context);

    if ( config.thumbPosition == 'bottom' && config.thumbSlider == true ) this.thumbSlider(carouselNav, main, context);

    if ( config.clickToEnlarge ) theme.ProductGallery.enlargePhoto(context);
  }

  function mainSlider(main, carouselNav, config, context) {
    let initialEl = main.querySelector("[data-image-id='" + context.dataset.initialVariant + "']"),
        initialIndex;

    if ( initialEl ) {
      initialIndex = initialEl.dataset.slideIndex;
    } else {
      initialIndex = 0;
    }

    if (config.navStyle == 'dots') {
      var dots = true,
          arrows = false;
    } else {
      var dots = false,
          arrows = true;
    }

    var flkty = new Flickity( main, {
      // options
      fade: true,
      wrapAround: true,
      cellAlign: 'left',
      draggable: true,
      contain: true,
      pageDots: dots,
      prevNextButtons: arrows,
      autoPlay: false,
      selectedAttraction: 0.01,
      dragThreshold: 5,
      adaptiveHeight: config.adaptiveHeight,
      imagesLoaded: true,
      initialIndex: initialIndex,
      on: {
        ready: function() {
          let id = this.selectedElement.dataset.imageId;

          /* Fade in */
          context.querySelector('.js-product-gallery').style.visibility = "visible";
        },
        change: function() {
          /* Set focus control on change */
          theme.ProductGallery.removeFocus(context);
          theme.ProductGallery.addFocus(this.selectedElement, context);

          /* Set media */
          theme.ProductGallery.setActiveThumbnail(this.selectedElement.dataset.imageId, this.selectedElement, context);
          theme.ProductGallery.switchMedia(this.selectedElement.dataset.imageId, context);

          /* Allow model drag */
          if ( this.selectedElement.classList.contains('model-slide') ) {
            if ( this.isDraggable ) {
              /* Turn off drag for model usage */
              this.options.draggable = !this.options.draggable;
              this.updateDraggable();
            }
          }
        },
        dragStart: function () {
          document.ontouchmove = e => e.preventDefault();
        },
        dragEnd: function () {
          document.ontouchmove = () => true
        }
      }
    });

    theme.ProductGallery.galleryEvents(flkty, context);

    if ( carouselNav ) theme.ProductGallery.thumbnails(flkty, carouselNav, config, context);
  }

  function thumbSlider(wrapper, main, context) {
    var flktyThumbs = new Flickity( wrapper, {
      // options
      asNavFor: main,
      wrapAround: false,
      groupCells: true,
      cellAlign: 'left',
      draggable: false,
      contain: true,
      imagesLoaded: true,
      pageDots: false,
      autoPlay: false,
      selectedAttraction: 0.01,
      dragThreshold: 5,
      accessibility: false
    });
  }

  function thumbnails(flkty, carouselNav, config, context) {
    if ( !carouselNav ) return false;

    let thumbs = carouselNav.querySelectorAll('.js-thumb-item');

    if ( !thumbs ) return false;

    /* on thumbnail click and key enter */
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', function(event){
        event.preventDefault();

        let index = this.dataset.slideIndex,
            el = carouselNav.querySelectorAll('.js-thumb-item')[index],
            mediaId = this.dataset.imageId;

        /* Update classes & aria */
        theme.ProductGallery.setActiveThumbnail(mediaId, el, context);
        theme.ProductGallery.switchMedia(mediaId, context);

        /* move thumb slider to position */
        theme.ProductGallery.setThumbPos(this, carouselNav);

        /* change slide */
        flkty.select( index );

      });

      thumb.addEventListener('keypress', function(event){
        event.preventDefault();

        if(event.which == 13){ //Enter key pressed

          let index = this.dataset.slideIndex,
              el = carouselNav.querySelectorAll('.js-thumb-item')[index],
              mediaId = this.dataset.imageId;

          /* Update classes & aria */
          theme.ProductGallery.setActiveThumbnail(mediaId, el, context);
          theme.ProductGallery.switchMedia(mediaId, context);

          /* move thumb slider to position */
          theme.ProductGallery.setThumbPos(this, carouselNav);

          /* change slide */
          flkty.select( index );

        }
      });
    });

  }


  function setThumbPos(selected, carouselNav) {

    carouselNav.scrollTo({
      top: selected.offsetTop - 20,
      left: 0,
      behavior: 'smooth'
    });
  }

  function galleryEvents(flkty, context) {

    /* On Variant Change and Initial Load */
    Events.on('variantchange:image', function(id, context){

      if ( id === null ) return false;
      let thumbs = context.querySelector('.js-thumb-item');
      if (!thumbs) return false;

      /* Select new image in flickity */
      var main, el, index, curFlkty;

      main = context.querySelector('.js-carousel-main');
      el = main.querySelector("[data-image-id='" + id + "']");
      index = el.dataset.slideIndex;

      theme.ProductGallery.setActiveThumbnail(id, el, context);
      theme.ProductGallery.switchMedia(id, context);

      curFlkty = Flickity.data( main );
      curFlkty.select( index );

    });
  }

  function removeFocus(context) {
    let main;

    if ( context ) {
      main = context;
    } else {
      main = context.querySelector('.js-carousel-main');
    }

    /* Set all elements to no tab */
    context.querySelectorAll('.js-carousel-main *').forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.blur();
    });

    let buttonContents = context.querySelectorAll('.flickity-button *');
    buttonContents.forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.classList.add('js-hide-focus')
    });

    if (main.classList.contains('.flickity-enabled')) {
      main.setAttribute('tabIndex', '-1');
      main.classList.add('js-hide-focus');
    }

  }

  function addFocus(current, context) {
    /* Set current element to tab */
    if ( current.classList.contains('image-slide') ) {
      current.querySelector('img').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('video-slide') ) {
      current.querySelectorAll('.plyr__controls *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    } else if ( current.classList.contains('external_video-slide') ) {
      current.querySelector('iframe').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('model-slide') ) {
      current.querySelectorAll('.shopify-model-viewer-ui__controls-area *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    }
  }

  function enlargePhoto(context) {

    let buttons = context.querySelectorAll('.zoom_btn');

    if ( !buttons ) return false;
    buttons.forEach((button, i) => {
      button.addEventListener('click', function (event) {
      event.preventDefault();
      var btn = event.target,
          index = btn.getAttribute('data-ps-slide-index'),
          index = parseInt(index,10);

          openPhotoSwipe(index);
      });
    });

    var openPhotoSwipe = function(index) {
      var pswpElement = document.querySelectorAll('.pswp')[0];

      let images = context.querySelectorAll('.js-carousel-main .image-slide');

      if ( images.length < 2 ) {
        var arrows = false;
      } else {
        var arrows = true;
      }

      let items = [];
      images.forEach((image, i) => {
        let imageTag = image.querySelector('.product__image');

        let item = {
          src: imageTag.getAttribute('data-zoom-src'),
          w: imageTag.getAttribute('data-width'),
          h: imageTag.getAttribute('data-height')
        }
        items.push(item);
      });

      var options = {
        index: index,
        arrowEl: arrows,
        captionEl: false,
        closeOnScroll: false,
        counterEl: false,
        history: false,
        fullscreenEl: false,
        preloaderEl: false,
        shareEl: false,
        tapToClose: false,
        getThumbBoundsFn: function(index) {
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var thumbnail = context.querySelector('.product__image');
          var rect = thumbnail.getBoundingClientRect();
          return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }
      };

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      gallery.listen('afterChange', function() {
        var flkty = Flickity.data('.slides.carousel-main');
        var newIndex = gallery.getCurrentIndex();
        let sliderImage = document.querySelector(`[data-ps-slide-index="${newIndex}"]`);
        let newNewIndex = parseInt(sliderImage.dataset.index, 10);
        flkty.select (newNewIndex);
      });

    };
  }

  function switchMedia(mediaId, context) {
    let main = context.querySelector('.js-carousel-main'),
        currentMedia = main.querySelector('[data-product-single-media-wrapper]:not(.inactive)'),
        newMedia = main.querySelector('[data-product-single-media-wrapper]' + "[data-thumbnail-id='product-template-" + mediaId +"']"),
        otherMedia = main.querySelectorAll('[data-product-single-media-wrapper]' + ":not([data-thumbnail-id='product-template-" + mediaId + "'])");

    currentMedia.dispatchEvent(
      new CustomEvent('mediaHidden', {
        bubbles: true,
        cancelable: true
      })
    );

    newMedia.classList.add('active-slide');
    newMedia.classList.remove('inactive');
    newMedia.dispatchEvent(
      new CustomEvent('mediaVisible', {
        bubbles: true,
        cancelable: true
      })
    );

    otherMedia.forEach(
      function(el) {
        el.classList.add('inactive');
        el.classList.remove('active-slide');
      }.bind(this)
    );
  }

  function setActiveThumbnail(mediaId, el, context) {

    let main = context.querySelector('.js-carousel-main'),
        carouselNav = context.querySelector('.js-thumb-carousel-nav');

    if (typeof mediaId === 'undefined') {
      mediaId = main.querySelector('[data-product-single-media-wrapper]:not(.hide)').dataset.mediaId;
    }

    if ( carouselNav ) {
      /* remove selected class from all */
      carouselNav.querySelectorAll('.js-thumb-item').forEach((item, i) => {
        item.classList.remove('is-nav-selected');
        item.classList.remove('active-slide');
        item.removeAttribute('aria-current');
      });
    }

    /* add selected class */
    let thumbActive = context.querySelector(".js-thumb-item[data-image-id='" + mediaId + "']");
    if ( thumbActive ) {
      thumbActive.classList.add('is-nav-selected');
      thumbActive.classList.add('active-slide');
      thumbActive.setAttribute('aria-current', true);
    }
  }

  return {
    init: init,
    mainSlider: mainSlider,
    thumbSlider: thumbSlider,
    thumbnails: thumbnails,
    setThumbPos: setThumbPos,
    galleryEvents: galleryEvents,
    removeFocus: removeFocus,
    addFocus: addFocus,
    enlargePhoto: enlargePhoto,
    switchMedia: switchMedia,
    setActiveThumbnail: setActiveThumbnail
  };

})();

theme.ProductFullGallery = (function () {
  function init(context, sectionId, events, Product) {
    let config = JSON.parse(context.querySelector('.js-product-gallery').dataset.galleryConfig || '{}'),
        main = context.querySelector('.js-carousel-main');

    if ( !main ) return false;

    this.mainSlider(main, config, context);

    if ( config.clickToEnlarge ) theme.ProductFullGallery.enlargePhoto(context);
  }

  function mainSlider(main, config, context) {
    let initialEl = main.querySelector("[data-image-id='" + context.dataset.initialVariant + "']"),
        initialIndex;

    if ( initialEl ) {
      initialIndex = initialEl.dataset.slideIndex;
    } else {
      initialIndex = 0;
    }

    var flkty = new Flickity( main, {
     // options
     fade: false,
     wrapAround: false,
     cellAlign: 'center',
     draggable: true,
     contain: true,
     imagesLoaded: true,
     lazyLoad: 2,
     pageDots: true,
     prevNextButtons: true,
     autoPlay: false,
     selectedAttraction: 0.1,
     friction: 0.8,
     adaptiveHeight: false,
     initialIndex: initialIndex,
     dragThreshold: 5,
     on: {
       ready: function() {
         let id = this.selectedElement.dataset.imageId;

         /* Fade in */
         context.querySelector('.js-product-gallery').style.visibility = "visible";
       },
       change: function() {
         /* Set focus control on change */
         theme.ProductFullGallery.removeFocus(context);
         theme.ProductFullGallery.addFocus(this.selectedElement, context);

         /* Set media */
         theme.ProductFullGallery.switchMedia(this.selectedElement.dataset.imageId, context);

         /* Allow model drag */
         if ( this.selectedElement.classList.contains('model-slide') ) {
           if ( this.isDraggable ) {
             /* Turn off drag for model usage */
             this.options.draggable = !this.options.draggable;
             this.updateDraggable();
           }
         }
       },
       dragStart: function () {
         document.ontouchmove = e => e.preventDefault();
       },
       dragEnd: function () {
         document.ontouchmove = () => true
       }

     }
   });

    theme.ProductFullGallery.galleryEvents(flkty, context);
  }

  function galleryEvents(flkty, context) {

    /* On Variant Change and Initial Load */
    Events.on('variantchange:image', function(id, context){

      if ( id === null ) return false;

      /* Select new image in flickity */
      let main = context.querySelector('.js-carousel-main'),
          el = main.querySelector("[data-image-id='" + id + "']"),
          index = el.dataset.slideIndex;

      theme.ProductFullGallery.switchMedia(id, context);

      flkty.select( index );

    });
  }

  function removeFocus(context) {
    let main;

    if ( context ) {
      main = context;
    } else {
      main = context.querySelector('.js-carousel-main');
    }

    /* Set all elements to no tab */
    context.querySelectorAll('.js-carousel-main *').forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.blur();
    });

    let buttonContents = context.querySelectorAll('.flickity-button *');
    buttonContents.forEach((item, i) => {
      item.setAttribute('tabIndex', '-1');
      item.classList.add('js-hide-focus')
    });

    if (main.classList.contains('.flickity-enabled')) {
      main.setAttribute('tabIndex', '-1');
      main.classList.add('js-hide-focus');
    }

  }

  function addFocus(current, context) {
    /* Set buttons to tab */
    context.querySelectorAll('.flickity-button').forEach((item, i) => {
      item.setAttribute("tabIndex", "0");
    });
    /* Set current element to tab */
    if ( current.classList.contains('image-slide') ) {
      current.querySelector('img').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('video-slide') ) {
      current.querySelectorAll('.plyr__controls *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    } else if ( current.classList.contains('external_video-slide') ) {
      current.querySelector('iframe').setAttribute("tabIndex", "0");
    } else if ( current.classList.contains('model-slide') ) {
      current.querySelectorAll('.shopify-model-viewer-ui__controls-area *').forEach((item, i) => {
        item.setAttribute("tabIndex", "0");
      });
    }
  }

  function enlargePhoto(context) {

    let buttons = context.querySelectorAll('.zoom_btn');

    if ( !buttons ) return false;
    buttons.forEach((button, i) => {
      button.addEventListener('click', function (event) {
    	event.preventDefault();
      var btn = event.target,
          index = btn.getAttribute('data-ps-slide-index'),
          index = parseInt(index,10);

          openPhotoSwipe(index);
      });
    });

    var openPhotoSwipe = function(index) {
      var pswpElement = document.querySelectorAll('.pswp')[0];

      let images = context.querySelectorAll('.js-carousel-main .image-slide');

      if ( images.length < 2 ) {
        var arrows = false;
      } else {
        var arrows = true;
      }

      let items = [];
      images.forEach((image, i) => {
        let imageTag = image.querySelector('.product__image');

        let item = {
          src: imageTag.getAttribute('data-zoom-src'),
          w: imageTag.getAttribute('data-width'),
          h: imageTag.getAttribute('data-height')
        }
        items.push(item);
      });

      var options = {
        index: index,
        arrowEl: arrows,
        captionEl: false,
        closeOnScroll: false,
        counterEl: false,
        history: false,
        fullscreenEl: false,
        preloaderEl: false,
        shareEl: false,
        tapToClose: false,
        getThumbBoundsFn: function(index) {
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var thumbnail = context.querySelector('.product__image');
          var rect = thumbnail.getBoundingClientRect();
          return {x:rect.left, y:rect.top, width:rect.width, height:rect.height};
        }
      };

      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      gallery.listen('afterChange', function() {
        var flkty = Flickity.data('.slides.carousel-main');
        var newIndex = gallery.getCurrentIndex();
        let sliderImage = document.querySelector(`[data-ps-slide-index="${newIndex}"]`);
        let newNewIndex = parseInt(sliderImage.dataset.index, 10);
        flkty.select (newNewIndex);
      });

    };
  }

  function switchMedia(mediaId, context) {
    let main = context.querySelector('.js-carousel-main'),
        currentMedia = main.querySelector('[data-product-single-media-wrapper]:not(.inactive)'),
        newMedia = main.querySelector('[data-product-single-media-wrapper]' + "[data-thumbnail-id='product-template-" + mediaId +"']"),
        otherMedia = main.querySelectorAll('[data-product-single-media-wrapper]' + ":not([data-thumbnail-id='product-template-" + mediaId + "'])");

    currentMedia.dispatchEvent(
      new CustomEvent('mediaHidden', {
        bubbles: true,
        cancelable: true
      })
    );

    newMedia.classList.add('active-slide');
    newMedia.classList.remove('inactive');
    newMedia.dispatchEvent(
      new CustomEvent('mediaVisible', {
        bubbles: true,
        cancelable: true
      })
    );

    otherMedia.forEach(
      function(el) {
        el.classList.add('inactive');
        el.classList.remove('active-slide');
      }.bind(this)
    );
  }

  return {
    init: init,
    mainSlider: mainSlider,
    galleryEvents: galleryEvents,
    removeFocus: removeFocus,
    addFocus: addFocus,
    enlargePhoto: enlargePhoto,
    switchMedia: switchMedia
  };

})();

// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
}

theme.ProductVideo = (function(context, sectionId) {
  var videos = {};

  var hosts = {
    html5: 'html5',
    youtube: 'youtube'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer) {
      return;
    }

    var videoElement = videoContainer.querySelector('iframe, video');

    if (!videoElement) {
      return;
    }

    var mediaId = videoContainer.getAttribute('data-media-id');

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function() {
        createPlayer(this);
      }
    };

    var video = videos[mediaId];

    switch (video.host) {
      case hosts.html5:
        window.Shopify.loadFeatures([
          {
            name: 'video-ui',
            version: '1.0',
            onLoad: setupPlyrVideos
          }
        ]);
        theme.LibraryLoader.load('plyrShopifyStyles');
        break;
      case hosts.youtube:
        theme.LibraryLoader.load('youtubeSdk', setupYouTubeVideos);
        break;
    }
  }

  function setupPlyrVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos(hosts.html5);
  }

  function setupYouTubeVideos() {
    if (!window.YT.Player) return;

    loadVideos(hosts.youtube);
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );

    var enableLooping = productMediaWrapper.getAttribute(
      'data-' + attributes.enableVideoLooping
    ) === 'true';

    switch (video.host) {
      case hosts.html5:
        // eslint-disable-next-line no-undef
        video.player = new Shopify.Plyr(video.element, {
          loop: { active: enableLooping },
          muted: true,
          hideControlsOnPause: true,
          tooltips: { controls: false, seek: true }
        });
        video.player.on('ready', event => {
          video.container.querySelector('.plyr--full-ui').setAttribute('tabindex', '-1');
          video.container.querySelectorAll('.plyr--full-ui *').forEach((item, i) => {
            item.setAttribute('tabindex', '-1');
          });

        });
        video.player.on('play', event => {
          video.container.querySelectorAll('.plyr__controls *').forEach((item, i) => {
            item.setAttribute("tabIndex", "0");
          });
        });
        break;
      case hosts.youtube:
      var videoId = productMediaWrapper.getAttribute(
        'data-' + attributes.videoId
      );

        video.player = new YT.Player(video.element, {
          videoId: videoId,
          events: {
            onStateChange: function(event) {
              if (event.data === 0 && enableLooping) event.target.seekTo(0);
            },
            onReady: function(event) {
              video.player.mute();
            }
          }
        });
        break;
    }

    var pauseVideo = function() {
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }

      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }
    };

    productMediaWrapper.addEventListener('mediaHidden', pauseVideo);
    productMediaWrapper.addEventListener('xrLaunch', pauseVideo);

    productMediaWrapper.addEventListener('mediaHidden xrLaunch', function() {

      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }
      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }

    });

    productMediaWrapper.addEventListener('mediaVisible', function() {

      if (theme.Helpers.isTouch()) return;

      if (!video.player) return;

      if (video.host === hosts.html5) {
        if (desktop.matches) {
          video.player.play();
        }
      }

      if (video.host === hosts.youtube && video.player.playVideo) {
        if (desktop.matches) {
          video.player.playVideo();
        }
      }
    });

  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.html5;
    }

    if (video.tagName === 'IFRAME') {
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          video.src
        )
      ) {
        return hosts.youtube;
      }
    }
    return null;
  }

  function loadVideos(host) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        if (video.host === host) {
          video.ready();
        }
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.html5) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };

})();

theme.ProductModel = (function() {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId) {
     modelJsonSections[sectionId] = {
       loaded: false
     };

     modelViewerContainers.forEach(function(modelViewerContainer, index) {
       var mediaId = modelViewerContainer.getAttribute('data-media-id');
       var modelViewerElement = modelViewerContainer.querySelector(
         'model-viewer'
       );
       var modelId = modelViewerElement.getAttribute('data-model-id');

       if (index === 0) {
         var mediaGroup = modelViewerContainer.closest(selectors.mediaGroup);
         var xrButton = mediaGroup.querySelector(selectors.xrButton);
         xrButtons[sectionId] = {
           element: xrButton,
           defaultId: modelId
         };
       }

       models[mediaId] = {
         modelId: modelId,
         sectionId: sectionId,
         container: modelViewerContainer,
         element: modelViewerElement
       };
     });

     window.Shopify.loadFeatures([
       {
         name: 'shopify-xr',
         version: '1.0',
         onLoad: setupShopifyXr
       },
       {
         name: 'model-viewer-ui',
         version: '1.0',
         onLoad: setupModelViewerUi
       }
     ]);
     theme.LibraryLoader.load('modelViewerUiStyles');
   }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
     document.addEventListener('shopify_xr_initialized', function() {
       setupShopifyXr();
     });
     return;
    }

    for (var sectionId in modelJsonSections) {
     if (modelJsonSections.hasOwnProperty(sectionId)) {
       var modelSection = modelJsonSections[sectionId];

       if (modelSection.loaded) continue;
       var modelJson = document.querySelector('#ModelJson-' + sectionId);
       if (!modelJson) return false;
       window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
       modelSection.loaded = true;
     }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
        }
        setupModelViewerListeners(model);
      }
    }
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId];

    model.container.addEventListener('mediaVisible', function() {
      xrButton.element.setAttribute('data-shopify-model3d-id', model.modelId);
      if (mobile.matches) return;
      model.modelViewerUi.play();
    });

    model.container.addEventListener('mediaHidden', function() {
      xrButton.element.setAttribute(
        'data-shopify-model3d-id',
        xrButton.defaultId
      );
      model.modelViewerUi.pause();
    });

    model.container.addEventListener('xrLaunch', function() {
      model.modelViewerUi.pause();
    });
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();

theme.ProductDetails = function (context, events, Product) {
  (function sku() {
    var element = context.querySelector(".variant_sku");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant, config) {
      var variant_sku = variant.sku;
      element.innerHTML = variant_sku;
    });
    events.on("variantunavailable", function (variant, config) {
      var variant_sku = config.unavailable;
      element.innerHTML = variant_sku;
    });

  })();

  (function current_variant() {
    var element = context.querySelector(".variant_selected");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant) {
      var variant_selected = variant.title;
      element.innerHTML = variant_selected;
    });
    events.on("variantunavailable", function (variant, config) {
      var variant_selected = config.unavailable;
      element.innerHTML = variant_selected;
    });

  })();

  (function inventory() {
    var element = context.querySelector(".variant_inventory");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant, config) {
      var inventory_quantity = variant.inventory_quantity;
      if ( inventory_quantity > 0 ) {
        element.innerHTML = inventory_quantity;
      } else {
        element.innerHTML = config.unavailable;
      }
    });
    events.on("variantunavailable", function (variant, config) {
      var inventory_quantity = config.unavailable;
      element.innerHTML = inventory_quantity;
    });

  })();

  (function weight() {
    var element = context.querySelector(".variant_weight");

    if ( !element ) {
      return false;
    }

    events.on("variantchange", function (variant, config) {
      var variant_weight = variant.weight_in_unit;
      var variant_weight_unit = variant.weight_unit;
      if ( variant_weight > 0 ) {
        element.innerHTML = variant_weight + ' ' + variant_weight_unit;
      } else {
        element.innerHTML = config.unavailable;
      }
    });
    events.on("variantunavailable", function (variant, config) {
      var variant_weight = config.unavailable;
      element.innerHTML = variant_weight;
    });

  })();
}

theme.ProductStickyBar = function () {
  var stickyBar = document.getElementById('sticky-cart');

  if ( !stickyBar ) return false;

  let lastKnownScrollPosition = 0;
  let ticking = false;

  function initSticky(scrollPos) {
    var cartForm = document.querySelectorAll('.js-product-bottom');
    if ( !cartForm ) return false;

    cartForm.forEach((item, i) => {
      var topOfHiddenDiv = item.offsetTop;
      var position = scrollPos >= topOfHiddenDiv,
          footer = document.getElementById('footer'),
          stickyBar = document.querySelector('.js-sticky-cart');

      if ( i === 1 ) return false;

      if( position && !stickyBar.classList.contains('show')) {
        stickyBar.classList.add('show');
        footer.classList.add('padding-sticky');
      } else if( !position && stickyBar.classList.contains('show')) {
        stickyBar.classList.remove('show');
        footer.classList.remove('padding-sticky');
      }
    });
  }

  document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        initSticky(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
}

/*======================================================
  Recently Viewed
========================================================*/

theme.RecentlyViewed = (function() {

  /**
   * Initializes the recently viewed section. Only works on once per page.
   * @param {Node} container section container element
   */
  function RecentlyViewed(container) {

    // Check for container
    if (!container) {
      console.log('Error. Recently viewed section must be provided a container in order to work.');
      return false;
    }

    //
    // Get data- attribute information.
    //

    // Get how many products to show variable.
    const DEFAULT_LIMIT = 6;

    // Get the data-limit value or set to default limit (6).
    const limit = container.dataset.limit ? container.dataset.limit : DEFAULT_LIMIT;

    const grid = container.dataset.grid;

    // Get the data-carousel value or set to false (boolean)
    const carousel = container.dataset.carousel ? container.dataset.carousel : false;

    // If data-carousel attribute is set to a string "true", then convert to the "true" boolean value otherwise return "false" boolean
    const carouselEnabled = (carousel === 'true');

    const wrapperId = container.dataset.wrapperId;

    //
    // Helper functions
    //

    /**
     * Callback function to reveal the entire section
     * @param  {String} wrapperId wrapper element
     * @todo use container instead of wrapper?
     */
    const revealOuterWrapper = (wrapperId = 'recently-viewed') => {

      // Bail if not wrapper Id
      if (!wrapperId) {
        console.log('Error. must provide a wrapperId as an argument.');
        return false;
      }

      // Get the wrapper element
      let wrapper = document.getElementById(wrapperId);

      // Bail if no wrapper element was found
      if (!wrapper) {
        console.log('Error. No wrapper element was found.');
        return false;
      }

      // If the fadeIn helper method is not available then simply
      // change to display block. Otherwise use the fadeIn helper
      // method to display the section.
      if (typeof theme.Helpers.fadeIn === undefined) {
        wrapper.style.display = 'block';
      } else if (typeof theme.Helpers.fadeIn === 'function') {
        theme.Helpers.fadeIn(wrapper);
      }
    };


    /**
     * Initialize the Flickity carousel.
     * @todo pass in container instead of using querySelector
     */
    const initCarousel = (wrapperId) => {

      if (!wrapperId) {
        console.log('Error. Must provide a wrapper element to initialze the carousel on.');
        return false;
      }

      // Get the carousel element
      const carousel = document.getElementById(wrapperId);

      // Bail if it does not exists.
      if (!carousel) {
        console.log('Error. No carousel element for recently viewed products found!');
        return false;
      }

      // Get config object from data- attribute
      const flktyData = carousel.dataset.flickityConfig;

      // Convert to a JSON object
      const flktyOptions = JSON.parse(flktyData);

      // If there are more products to show than what the products per row or "grid" option then there is enough to wrapAround, show prevNext buttons.
      if (Shopify.RecordViewedProducts.getCount() > grid) {
        flktyOptions.wrapAround = true;
        flktyOptions.prevNextButtons = true;
        flktyOptions.draggable = true;
      };

      // Initiate Flickity
      new Flickity(carousel, flktyOptions);
    };

    /**
     * Functions to run when showRecentlyViewed is done
     * @param  {boolean} carousel  determine sif using in a carousel or not
     * @param  {node} container container element
     * @param  {string} wrapperId ID of the wrapper inside the container that displays the products
     * @return {[type]}           [description]
     * @todo add checks
     */
    const afterComplete = (carousel, container, wrapperId) => {

      revealOuterWrapper(container.id);

      // If carousel is enabled
      if (carousel === true) {

        // Initialize the carousel
        initCarousel(wrapperId, this.container);
      }

      // Re-initialize Quickview
      Shopify.theme.quickview.init();
      Shopify.theme.ajaxCart.init();
      WAU.ProductGridVideo.init();

      // Initialize the color swatches
      // WAU.ProductColorSwatches.init(container, 200);
    };

    const viewedProduct = new ViewedProducts({
      howManyToShow: limit,
      wrapperId: wrapperId,
      onComplete: afterComplete.bind(this, carouselEnabled, container, wrapperId)
    });
  };

  return RecentlyViewed;
})();


theme.CartRecentlyViewedProducts = (function() {

  console.count('theme.CartRecentlyViewedProducts');

  function CartRecentlyViewedProducts(container) {
    console.log('container', container);

    new ViewedProducts({
      howManyToShow: 6,
      wrapperId: "cart-recently-viewed-products-wrapper",
      simpleListing: true,
      // listing: {default|simple}
      // onComplete: afterComplete.bind(this, carouselEnabled, container, wrapperId)
    });
  }

  return CartRecentlyViewedProducts;
})();

theme.GiftCardRecipient = function (context, sectionId, events, Product) {
  const container = context.querySelector(".recipient-form");
  if (!container) return false;
  const recipientCheckbox = container.querySelector(`#Recipient-Checkbox-${ sectionId }`);
  recipientCheckbox.disabled = false;
  const emailInput = container.querySelector(`#Recipient-email-${ sectionId }`);
  const nameInput = container.querySelector(`#Recipient-name-${ sectionId }`);
  const messageInput = container.querySelector(`#Recipient-message-${ sectionId }`);
  const hiddenField = container.querySelector(`#Recipient-Control-${ sectionId }`);
  hiddenField.disabled = true;
  const form = container.closest('.js-prod-form-submit');
  const formSubmitButton = form.querySelector('.js-ajax-submit');
  const defaultErrorMessage = context.querySelector('.js-error-msg').innerHTML;

  form.addEventListener('change', handleChange);

  function handleChange(event) {
    if (!recipientCheckbox.checked) {
      clearForm();
    } else {
      emailInput.required = true;
    }
  }

  function clearForm() {
    clearErrorMessage();
    emailInput.value = '';
    nameInput.value = '';
    messageInput.value = '';
    emailInput.required = false;
  }

  function clearErrorMessage() {
    container.querySelectorAll('.recipient-fields .form__message').forEach(field => {
      field.classList.add('hidden');
      const textField = field.querySelector('.error-message');
      if (textField) textField.innerText = '';
    });
  }

  function displayErrorMessage(title, body, formContext) {
    if (!form.isSameNode(formContext)) return;
    clearErrorMessage();
    if (typeof body === 'object') {
      return Object.entries(body).forEach(([key, value]) => {
        const errorMessageId = `RecipientForm-${ key }-error-${ sectionId }`
        const fieldSelector = `#Recipient-${ key }-${ sectionId }`;
        const placeholderElement = container.querySelector(`${fieldSelector}`);
        const label = placeholderElement?.getAttribute('placeholder') || key;
        const message = `${label} ${value}`;
        const errorMessageElement = container.querySelector(`#${errorMessageId}`);
        const errorTextElement = errorMessageElement?.querySelector('.error-message')
        if (!errorTextElement) return;

        errorTextElement.innerText = `${message}.`;
        errorMessageElement.classList.remove('hidden');
      });
    }
  }

  function updateErrorMessage(title, config, formContext) {
    if (!form.isSameNode(formContext)) return;
    const errorMessage = context.querySelector('.js-error-msg');
    if (!errorMessage) {
      console.warn('No error message found.');
      return;
    }
    errorMessage.innerHTML = `<strong>${config.form_error}</strong> ${title}`;

    // Set back to default
    setTimeout(() => {
      errorMessage.innerHTML = defaultErrorMessage;
    }, 4000)
  }

  Events.on('recipientform:errors', function(title, body, config, addToCartForm) {
    displayErrorMessage(title, body, addToCartForm);
    updateErrorMessage(title, config, addToCartForm);
  });
};

theme.ProductRecommendations = (function () {
  function ProductRecommendations() {
    var loadProductRecommendationsIntoSection = function() {
      // Look for an element with class 'product-recommendations'
      var container = document.querySelector(".js-product-rec-wrapper");

      if ( !container ) return false;

      var baseUrl = container.dataset.baseUrl;

      if (container === null) { return; }
      // Read product id from data attribute
      var productId = container.dataset.productId;
      var sectionId = container.dataset.sectionId;
      var limit = container.dataset.limit;
      var intent = container.dataset.intent;

      // Build request URL
      var recommendationsSectionUrl = baseUrl + '?section_id=' + sectionId + '&product_id=' + productId + '&intent=' + intent;

      fetch(recommendationsSectionUrl)
      .then(function(response) {
        return response.text();
      })
      .then(function(productHtml) {
        if (productHtml.trim() === '') return;

        container.innerHTML = productHtml;
        container.innerHTML = container.firstElementChild.innerHTML;

        Shopify.theme.quickview.init();
        Shopify.theme.ajaxCart.init();
        WAU.ProductGridVideo.init();
      });
    }

    document.addEventListener("shopify:section:select", function(event) {
      if (event.detail.sectionId.includes("product-recommendations")) {
        loadProductRecommendationsIntoSection();
      }
    });

    // Fetching the recommendations on page load
    loadProductRecommendationsIntoSection();

  }

  return ProductRecommendations;
})();

theme.complementaryProducts = function(context, events) {
  (function complementaryProducts() {
    var element = context.querySelector(".js-complementary-products");

    if ( !element ) return false;

    var loadComplementaryProducts = function() {

      var baseUrl = element.dataset.baseUrl;

      if (element === null) { return; }
      // Read product id from data attribute
      var productId = element.dataset.productId;
			var sectionId = element.dataset.sectionId;
      var limit = element.dataset.limit;
      var intent = element.dataset.intent;

      var complementarySectionUrl = baseUrl + '?section_id='+ sectionId + '&product_id=' + productId + '&limit=' + limit + '&intent=' + intent;

      fetch(complementarySectionUrl)

      .then(response => response.text())
      .then(text => {
        const html = document.createElement('div');
        html.innerHTML = text;
        const recommendations = html.querySelector('.js-complementary-products');

        if (recommendations && recommendations.innerHTML.trim().length) {
          element.innerHTML = recommendations.innerHTML;
        }
        Shopify.theme.quickview.init();
        WAU.ProductGridVideo.init();
        Shopify.theme.ajaxCart.init();

      })

    }
    loadComplementaryProducts();

  })();
}

theme.ProductProperties = (function() {
  const publicAPIs  = {};

  const updateValue = function(value, i) {
    let current = value.split("properties[")[1].split("]")[0];
    let newValue = `${current}${i}`;
    return `properties[${newValue}]`;
  }

  const fixDuplicateNameValues = function(addToCartForm) {
    const elements = [...addToCartForm.elements].filter(element => {
      return element.hasAttribute('data-product-property');
    });

    if (!elements) {
      console.error('Error. No elements.');
      return;
    }

    const arr = [];
    let j = 0;
    let current;

    // Fill out array.
    elements.forEach((element) => {
      arr.push(element.getAttribute("name"));
    });

    // Loop through each element and update name attribute.
    elements.forEach((element, i) => {
      let name = element.getAttribute('name');
      if (current != name) {
        current = name;
      } else {
        elements[i].setAttribute('name', updateValue(name, j++));
      }
    });
  };

  /**
   * Scrolls to the first error message.
   * @return {[type]} [description]
   */
  const scrollToFirstError = function() {

    // Bail if scrollTo is not supported.
    if (typeof window.scrollTo !== 'function') return;

    // Get the first error input.
    // TODO: Scope to form
    const firstErrorInput = document.querySelector('.required-error');

    // If we have an error input then scroll to it.
    if (firstErrorInput) {
      const coords = firstErrorInput.getBoundingClientRect();
      window.scrollTo({
        top: coords.y,
        left: coords.x,
        behavior: 'smooth'
      });
    }
  }

  //
  // Public methods
  //

  publicAPIs.checkLineItemProperties = function(addToCartForm) {

    // Check line item properties required
    if (addToCartForm.elements.length > 0) {

      // Invoke checking for duplicate name values.
      fixDuplicateNameValues(addToCartForm);

      // Get the required "custom property" fields
      const requiredFields = [...addToCartForm.elements].filter((element) => {
        return element.hasAttribute('data-product-property') && element.required;
      });

      if (requiredFields.length > 0) {

        let required = false;

        requiredFields.forEach((requiredField) => {

          requiredField.classList.remove('required-error');

          if (requiredField.value === '') {

            required = true;

            requiredField.classList.add('required-error');
          }
        });

        scrollToFirstError();

        if (required) return false;
      }
    };
  }

  return publicAPIs;
})();

theme.Product = (function () {
  function Product(context) {
    var events = new EventEmitter3();
        events.trigger = events.emit; // alias

    var productJson = context.querySelector('.product-json');

    if ( !productJson ) {
      return false;
    }

    var Product = productJson.innerHTML,
        Product = JSON.parse(Product || '{}');

    var sectionId = context.dataset.sectionId;

      // Record if on a product page
      if (document.body.classList.contains('template-product')) {
        Shopify.RecordViewedProducts.recordRecentlyViewed();
      }

      if ( context.querySelector("[data-product-details]") ) {
        theme.ProductDetails(context, events, Product);
      }

      if ( context.querySelector("[data-gallery-thumbnails]") ) {
        theme.ProductGallery.init(context, sectionId, events, Product);
      }

      if ( context.querySelector("[data-scroll-gallery]") ) {
        theme.ProductScrollGallery.init(context, sectionId, events, Product);
      }

      if (context.querySelector('pickup-availability')) {
        context.querySelector('pickup-availability').instance = events;
      }

      if ( context.querySelector("[data-gallery-fullwidth]") ) {
        theme.ProductFullGallery.init(context, sectionId, events, Product);
      }

      if ( context.querySelector("[data-product-form]") ) {
        theme.ProductForm(context, sectionId, events, Product);
      }

      if ( context.querySelector("[data-product-qty]") ) {
        theme.ProductQty(context, events);
        theme.ProductQuantityControls(context, events);
      }

      if ( context.querySelector('[data-recipient-form]') ) {
        theme.GiftCardRecipient(context, sectionId, events, Product);
      }

      if ( context.querySelector("[data-product-sticky-bar]") ) {
        theme.ProductStickyBar(context, events, Product);
      }

      if ( context.querySelector("[data-complementary-products]") ) {
        theme.complementaryProducts(context, sectionId, events, Product);
      }

      /* Product media */
      context.querySelectorAll("[data-product-media-type-video]").forEach(function (context, sectionId) {
        theme.ProductVideo.init(context, sectionId);
      });

      let modelViewerElements = context.querySelectorAll('[data-product-media-type-model]');

      if (modelViewerElements.length > 0) {
        theme.ProductModel.init(modelViewerElements, sectionId);
      }

      var self = this;

      document.addEventListener('shopify_xr_launch', function() {
        var currentMedia = document.querySelector('[data-product-single-media-wrapper]:not(.inactive)', self);

        currentMedia.dispatchEvent(
          new CustomEvent('xrLaunch', {
            bubbles: true,
            cancelable: true
          })
        );
      });
  }

  document.addEventListener('shopify:section:load', function(event){
    if (event.target.querySelector('[data-section-type="product__section"]')) return Product;
  });

  return Product;
})();

if (!customElements.get('pickup-availability')) {
  customElements.define('pickup-availability', class PickupAvailability extends HTMLElement {
    constructor() {

      super();

      this.variantId = this.dataset.variantId;
      this.productTitle = this.dataset.productTitle;
      this.hasOnlyDefaultVariant = (this.dataset.hasOnlyDefaultVariant === 'true') ? true : false;
      this.baseUrl = this.dataset.baseUrl;

      this.loadAvailability(this.variantId, this.productTitle);
    }

    // Set event instance
    set instance(instance) {
      if (!instance) return false;
      this.events = instance;
      this.handleEvents();
    }

    // Not sure if we need this
    get instance() {
      return this.events;
    }

    // Update
    set handleHtml(value) {
      // Valdiate as a function
      if (typeof value !== 'function') {
        console.error('Error. Must provide a callback function.');
        return false;
      }
      this._callback = value;
    }

    // Unnecessary
    // get handleHtml() {
    //   return this._callback();
    // }

    handleEvents() {
      if (this.events) {
        this.events.on("storeavailability:variant", (id, title) => {
          this.loadAvailability(id, title)
        });

        this.events.on("storeavailability:unavailable", () => {
          this.style.display = 'none';
        });
      }
    }

    /**
     * [loadAvailability description]
     * @param  {String} id    Product Id.
     * @param  {String} title Product title.
     * @return {[type]}       [description]
     */
    loadAvailability(id, title) {

      const container = this;
      const blockId = this.dataset.blockId;
      const variantSectionUrl = this.baseUrl + '/variants/' + id + '/?section_id=pickup-availability';
      container.innerHTML = '';
      const newStr = `store-availability--${blockId}`;

      fetch(variantSectionUrl)
      .then((response) => {
        return response.text();
      })
      .then((storeAvailabilityHTML) => {

        if (storeAvailabilityHTML.trim() === '') {
          console.warn('Error, no HTML content returned.');
          return;
        }

        container.innerHTML = storeAvailabilityHTML;
        container.innerHTML = container.firstElementChild.innerHTML;

        // Update buttons
        container.querySelectorAll('[popovertarget]')?.forEach((button) => {
          button.setAttribute('popovertarget', newStr);
        });

        // Update Slideout Id
        container.querySelector('[id^=store-availability--]')?.setAttribute('id', newStr);

        container.style.opacity = 1;
        container.style.display = "block";

        // Get container element
        const containerEl = container.querySelector('.store-availability-container');

        // Set display
        if (containerEl) {
          containerEl.classList.remove('fadeOut');
          containerEl.classList.display = "block";
        }

        // Get content
        const content = container.querySelector('.store-availability__pickup-details');

        // Fade in content
        if (content) {
          content.classList.add('fadeIn');
        }

        if ( document.querySelector('[data-pick-up-available="false"]') ) {
          container.style.display = "none";
          console.warn('Error. No pickup available with data attribute set to true.');
          return false;
        } else {
          container.style.visibility = "visible";
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  });
}

/*============================================================================
  Slideshow Section
==============================================================================*/
theme.Slideshow = (function() {
  function Slideshow(container) {

    const slideshows = document.querySelectorAll('.js-slideshow');

    slideshows.forEach(Slideshow => {
      const flktyData = Slideshow.getAttribute('data-flickity');
      const flktyOptions = JSON.parse(flktyData);
        new Flickity(Slideshow, flktyOptions);
    });

  }

  return Slideshow;
})();

theme.Slideshow.prototype = _.assignIn({}, theme.Slideshow.prototype, {

  onLoad: function(event) {
    const Slideshow = event.target.closest('.js-slideshow');
    const flktyData = Slideshow.getAttribute('data-flickity');
    const flktyOptions = JSON.parse(flktyData);
        new Flickity('.js-slideshow', flktyOptions);
  },

  onBlockSelect: function(event) {
   const Slideshow = event.target.closest('.js-slideshow');
   const flkty = Flickity.data( Slideshow );
   const Slide = event.target.getAttribute("data-slider-index");
   flkty.select( Slide );
   flkty.pausePlayer();
  },

  onBlockDeselect: function() {
    const Slideshow = event.target.closest('.js-slideshow');
    const flkty = Flickity.data( Slideshow );
    flkty.unpausePlayer();
  }
});

/*============================================================================
  Map Section
==============================================================================*/
theme.Maps = (function() {

  var google_api_loaded = false;
  let allMaps = [];

  var events = new EventEmitter3();
      events.trigger = events.emit; // alias

  window.gm_authFailure = function () {
    google_api_loaded = false;

    if ( Shopify.designMode ) {
      events.trigger("gmauthfailure:themeeditor");
    } else {
      events.trigger("gmauthfailure");
    }
  };

  const getScript = url => new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.async = true

    script.onerror = reject

    script.onload = script.onreadystatechange = function() {
      const loadState = this.readyState

      if (loadState && loadState !== 'loaded' && loadState !== 'complete') return

      script.onload = script.onreadystatechange = null

      resolve()
    }

    document.head.appendChild(script)
  });

  function Map(container) {

    var config = container.querySelector("[data-map-config]").innerHTML,
        config = JSON.parse(config);

    if ( !config.api_key ) {
      return false;
    }

    (function section_container() {
      var element = container;

      events.on("gmauthfailure:themeeditor", error);
      events.on("map:error", error);

      function error() {
        element.classList.add("map-section-load-error");
      }
    })();

    (function background_image() {
      var element = container.querySelector("[data-bg-image]");

      events.on("gmauthfailure", show);

      function show() {
        element.classList.add("show-image");
      }
    })();

    (function overlay() {
      var element = container.querySelector("[data-map-overlay]");

      events.on("gmauthfailure:themeeditor", error);
      events.on("map:error", error);

      function error(message) {
        message = message || config.auth_error;
        element.innerHTML = '<div class="map-section-error errors text-center">' + message + '</div>';
      }
    })();

    function map() {
      var element = container.querySelector("[data-map]");

      events.on("ready", geolocate);

      function geolocate() {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: config.address }, function(results, status) {
          if ( status == google.maps.GeocoderStatus.OK ) {
            render(results);
          } else {
            error(status);
          }
        });
      }

      function render(results) {
        element.innerHTML = "";

        var map = new google.maps.Map(element, {
          zoom: config.zoom,
          center: results[0].geometry.location,
          draggable: false,
          clickableIcons: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          styles: config.styles,
          disableDefaultUI: true
        });

        var center = map.getCenter();

        new google.maps.Marker({
          map: map,
          position: center
        });

        google.maps.event.addDomListener(window, "resize", function() {
          theme.Helpers.debounce(function() {
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
          }, 250);
        });

        document.addEventListener('shopify:section:unload', function() {
          google.maps.event.clearListeners(map, "resize");
        });
      }

      function error(status) {
        var message = config.address_error;

        switch (status) {
          case 'ZERO_RESULTS':
            message = config.address_no_results;
            break;
          case 'OVER_QUERY_LIMIT':
            message = config.address_query_limit;
            break;
          case 'REQUEST_DENIED':
            message = config.auth_error;
            break;
        }

        if ( Shopify.designMode ) {
          events.trigger("map:error", message);
        }
      }
    };
    map(container);

    if ( google_api_loaded === true ) {
      events.trigger("ready");
    } else {
      if (google_api_loaded !== 'loading') {

        google_api_loaded = 'loading';

        if (typeof window.google === 'undefined') {

          getScript("https://maps.googleapis.com/maps/api/js?key=" + config.api_key)
          .then(() => {
            google_api_loaded = true;
            events.trigger("ready");
          })
          .catch(() => {
            events.trigger("map:error", 'Could not load map with API key. Check billing with Google.');
            console.error('Could not load script with api given')
          });
        }
      }
    }
  }

  Map.prototype = _.assignIn({}, Map.prototype, {});

  return Map;
})();

/*============================================================================
  Featured Collection Section
==============================================================================*/
theme.CarouselSection = (function() {
  function CarouselSection(container) {

    const defaultOptions = {
      // options
      fade: false,
      wrapAround: false,
      cellAlign: 'center',
      draggable: true,
      contain: true,
      imagesLoaded: true,
      lazyLoad: 2,
      pageDots: true,
      // prevNextButtons: true,
      // autoPlay: false,
      // selectedAttraction: 0.1,
      selectedAttraction: 0.6,
      // friction: 0.8,
      friction: 1,
      // adaptiveHeight: false,
      // initialIndex: initialIndex,
      // dragThreshold: 5,
      dragThreshold: 15,
      on: {
        dragStart: function () {
          document.ontouchmove = e => e.preventDefault();
        },
        dragEnd: function () {
          document.ontouchmove = () => true
        }
      }
    };

  var Carousel = container.querySelector('.section--carousel');
  if ( !Carousel ) {
    return false;
  }
  const flktyData = Carousel.getAttribute('data-flickity-config');
  const flktyOptions = JSON.parse(flktyData);
  let finalOptions = Object.assign({}, defaultOptions, flktyOptions);
  new Flickity(Carousel, flktyOptions);

     document.addEventListener('shopify:section:unload', function(event){
       var Carousel = event.target.closest('.section--carousel');
       if ( !Carousel ) {
         return false;
       }
       const flkty = Flickity.data(Carousel);
       flkty.destroy()
     });

     document.addEventListener('shopify:section:load', function(event){
       var Carousel = event.target.closest('.js-carousel');
       if ( !Carousel ) {
         return false;
       }
       const flktyData = Carousel.getAttribute('data-flickity');
       const flktyOptions = JSON.parse(flktyData);
           new Flickity('.js-carousel', flktyOptions);
     });

   }

   CarouselSection.prototype = _.assignIn({}, CarouselSection.prototype, {});
   return CarouselSection;
})();

/*============================================================================
  Mobile Nav
==============================================================================*/
var selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCurrency: '[data-disclosure-country]'
};

theme.mobileNav = (function() {

  function mobileNav(container) {

    this.container = container;
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.localeDisclosure) {
      this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure);
    }

    if (this.cache.currencyDisclosure) {
      this.currencyDisclosure = new theme.Disclosure(
        this.cache.currencyDisclosure
      );
    }

    const MobileNavDisclosureButtons = container.querySelectorAll('.disclosure__toggle');

    if (MobileNavDisclosureButtons.length > 0) {
      MobileNavDisclosureButtons.forEach((button) => {
         button.addEventListener('click', (event) => {
            let disclosureList = event.target.closest('.disclosure').querySelector('.disclosure-list');
            if (!disclosureList) {
              console.warn('Error. Could not find disclosure list.');
              return false;
            }
            if (disclosureList.classList.contains('disclosure-list--visible')) {
              let isOut = theme.DOMHelpers.isOutOfBounds(disclosureList);
              if (isOut.left) {
                disclosureList.style.transform = `translateX(${Math.round(Math.abs(isOut.leftAmount)) + 10}px)`;
              }
            }
         });
      });
    } else {
      console.warn('Error. No buttons found.');
    }

  }

  mobileNav.prototype = _.assignIn({}, mobileNav.prototype, {

    cacheSelectors: function() {
      this.cache = {
        localeDisclosure: this.container.querySelector(
          selectors.disclosureLocale
        ),
        currencyDisclosure: this.container.querySelector(
          selectors.disclosureCurrency
        )
      };
    },
    onUnload: function() {
      if (this.cache.localeDisclosure) {
        this.localeDisclosure.destroy();
      }

      if (this.cache.currencyDisclosure) {
        this.currencyDisclosure.destroy();
      }
    },

    onSelect: function() {
			WAU.Slideout._openByName("slideout-mobile-navigation");
    },
    onDeselect: function() {
			WAU.Slideout._closeByName("slideout-mobile-navigation");
    },
    onBlockSelect: function() {
			WAU.Slideout._openByName("slideout-mobile-navigation");
    }
  });

  return mobileNav;

})();

/*============================================================================
  Homepage Collection slider
==============================================================================*/
theme.CollectionSlider = function () {

  let slideshowPlugin = (function () {
    "use strict";

    let publicAPIs = {};
    // Store the index slide for each slider
    let slideIndex = [];
    // Id for each slider
    let slideId = [];

    // Helper function to get the index of the slideId array
    let getSliderIdIndex = function (sliderId) {
      return slideId.indexOf(sliderId);
    };

    // Wrapper function to determine which slide to show
    let _selectSlide = function (n, no) {
      showDivs(n, no);
    };

    // Change slide
    let showDivs = function (n, no) {
      // Increment variable used for for loop
      let i;
      let parentSlide = document.getElementById(slideId[no]);
      let slides = parentSlide.querySelectorAll(".slide");

      // If slide index is greater than slideshow slides then go to first slide
      if (n > slides.length) {
        slideIndex[no] = 1;
      }

      // If slide index is less than 1 then go to last slide
      if (n < 1) {
        slideIndex[no] = slides.length;
      }

      slides.forEach((slide) => {
        slide.style.display = "none";
      });

      // Show this slide
      // slides[slideIndex[no] - 1].style.display = "block";
      slides[slideIndex[no] - 1].style.display = "flex";
    };

    // Select a specific slide
    publicAPIs.selectSlide = function (n, sliderId) {
      let no = getSliderIdIndex(sliderId);
      _selectSlide((slideIndex[no] = n), no);
    };

    // Select the next slide
    publicAPIs.nextSlide = function (sliderId) {
      let n = 1;
      let no = getSliderIdIndex(sliderId);
      _selectSlide((slideIndex[no] += n), no);
    };

    // Select the previous slide
    publicAPIs.prevSlide = function (sliderId) {
      let n = -1;
      let no = getSliderIdIndex(sliderId);
      _selectSlide((slideIndex[no] += n), no);
    };

    // Initialize plugin
    publicAPIs.init = function () {
      // Get all slideshows
      let slideshows = document.querySelectorAll(".featured-collections-slider");

      // Bail if not slideshows
      if (!slideshows) {
        console.log("Error, no slideshows");
        return;
      }

      // Initialize each slideshow
      slideshows.forEach((slideshow, i) => {
        slideIndex.push(1);
        slideId.push(slideshow.id);
        showDivs(1, i);
      });

      // Add event handlers for buttons
      document.addEventListener("click", (event) => {

        let target = event.target;


        // If child SVG element is selected then get parent button element
        if (target.classList.contains('left-arrow') || target.classList.contains('right-arrow')) {
          target = target.parentElement;
        }

        // Check which slider action to do
        if (target.hasAttribute("data-arrow-prev")) {
          publicAPIs.prevSlide(target.dataset.parent);
        } else if (target.hasAttribute("data-arrow-next")) {
          publicAPIs.nextSlide(target.dataset.parent);
        } else if (target.hasAttribute("data-slide-to")) {
          publicAPIs.selectSlide(
            Number(target.dataset.slideTo),
            target.dataset.parent
          );
        } else {
          // console.log("not an arrow button");
          return;
        }
      });
    };

    return publicAPIs;
  })();

  slideshowPlugin.init();

  // Theme editor interaction
  document.addEventListener('shopify:block:select', function(event) {
    var id = event.detail.blockId;
    let sliderId = event.target.parentElement.id;
    let slideIndex = event.target.dataset.slideIndex;
    slideshowPlugin.selectSlide(Number(slideIndex), sliderId);
  });
}

/*============================================================================
  Footer Section
==============================================================================*/
var selectors = {
  disclosureLocale: '[data-disclosure-locale]',
  disclosureCurrency: '[data-disclosure-currency]'
};

theme.Footer = (function() {
  function Footer(container) {
    this.container = container;
    this.cache = {};
    this.cacheSelectors();

    if (this.cache.localeDisclosure) {
      this.localeDisclosure = new theme.Disclosure(this.cache.localeDisclosure);
    }

    if (this.cache.currencyDisclosure) {
      this.currencyDisclosure = new theme.Disclosure(
        this.cache.currencyDisclosure
      );
    }
  }

  Footer.prototype = _.assignIn({}, Footer.prototype, {
    cacheSelectors: function() {
      this.cache = {
        localeDisclosure: this.container.querySelector(
          selectors.disclosureLocale
        ),
        currencyDisclosure: this.container.querySelector(
          selectors.disclosureCurrency
        )
      };
    },
    onUnload: function() {
      if (this.cache.localeDisclosure) {
        this.localeDisclosure.destroy();
      }

      if (this.cache.currencyDisclosure) {
        this.currencyDisclosure.destroy();
      }
    }
  });

  return Footer;
})();


/*============================================================================
  Image Gallery
==============================================================================*/
theme.ImageGallery = (function() {
  function ImageGallery(container) {

    this.container = container;

    function addAnimateClass() {
      let blocks = container.querySelectorAll('.gallery-block');
      if (blocks.length > 0) {
        blocks.forEach((block) => {
          block.classList.add('animate');
        });
      }
    }

    function removeAnimateClass() {
      let blocks = container.querySelectorAll('.gallery-block');
      if (blocks.length > 0) {
        blocks.forEach((block) => {
          block.classList.remove('animate');
        });
      }
    }

    const mediaQuery = window.matchMedia('screen and (max-width: 740px)');

    function handleMediaQueryChange(mql) {
      if (mql.matches) {
        removeAnimateClass();
      } else {
        addAnimateClass();
      }
    }

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

  }

  return ImageGallery;
})();

/*======================================================
  Password Page Section
========================================================*/
theme.Password = (function() {
  function Password(container) {

    window.addEventListener('DOMContentLoaded', (event) => {
			const passwordError = document.querySelector('.errors');

      if (passwordError) {
				WAU.Slideout._openByName("password-slideout");
      } else {
				return false;
			}

    });
  }

  Password.prototype = _.assignIn({}, Password.prototype, {});
  return Password;
})();

/*======================================================
  Mailing Popup
========================================================*/
theme.MailingPopup = (function() {

  const Popup = (function() {

    const defaults = {
      selectors: {
        popupContainer: ".newsletter__popup-container",
        popupOverlay: ".newsletter__popup-overlay",
        popupCloseButton: ".newsletter__popup-container-close"
      },
      classes: {
        visible: "is-visible",
      },
      viewportWidth: 1, // Viewport must be greater than this number to open
      overlay: true,      // Enabled overlay
      defaultFrequency: 5,  // Days
      defaultPopupDelay: 5000, // Milliseconds
      cookieSetName: "popupShown", // What cookie sets
      debug: false,
      escape: true, // Listen to escape button to close the pop up
      successMessage: false, // Show popup on success ?customer_posted=true
      fadeAnimation: false, // Use fade functions from theme helpers
      formId: '#mailing-popup-form' // Used to differentiate popup form from other forms
    };

    let lastFocus, popupTestMode, popupFrequency;
    const publicAPIs = {};

    /*
     * @description check URL query string. Determines if customer post success is true or not
     */
    const checkURLQueryString = () => {

      if (settings.debug) {
        console.log(`checkURLQueryString() ran`);
      }

      if (settings.successMessage) {
        const url = new URL(location);
        if (url.hash == settings.formId && url.searchParams.get('customer_posted') == 'true') {
          return true;
        }
      }
      return false;
    };

    /*
     * @description return the viewport width
     */
    const getViewportWidth = () => window.innerWidth || document.documentElement.clientWidth;

    /*
     * @description handle overlay click event to exit overlay
     */
    const handleOverlayEvent = (event) => {
      if (event.target === document.querySelector(`${settings.selectors.popupOverlay}.${settings.classes.visible}`)) {
          publicAPIs.close();
      }
    };

    /*
     * @description handle escape keyboard event
     */
    const handleEscapeKeyboardEvent = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        publicAPIs.close();
      }
    };

    /*
     * @description check if theme.Helper fade functions are available
     */
    const checkFadeSupport = () => typeof theme.Helpers.fadeIn === 'function' && typeof theme.Helpers.fadeOut === 'function';

    /*
     * @description checks to see if fadeAnimations option is enabled and supported
     */
    const useFadeAnimation = () => settings.fadeAnimation && checkFadeSupport();

    /*
     * @description handle close button event
     */
    const handleCloseButtonEvent = (event) => {
      publicAPIs.close(event);
    };

    /*
     * @description check if working in the theme editor
     */
    const themeEditorCheck = () => Shopify.designMode;

    /*
     * @description open the pop up
     */
    publicAPIs.open = () => {

      if (getViewportWidth() < settings.viewportWidth) {
        return;
      }

      if (settings.overlay && document.querySelector(settings.selectors.popupOverlay)) document.querySelector(settings.selectors.popupOverlay).classList.add(settings.classes.visible);

      if (document.querySelector(settings.selectors.popupContainer)) {
        if (useFadeAnimation()) {
          theme.Helpers.fadeIn(document.querySelector(settings.selectors.popupContainer));
        } else {
          document.querySelector(settings.selectors.popupContainer).style.display = "block";
        }
      }

      // Don't set cookie when inside the theme editor
      if (themeEditorCheck() !== true) {
        Cookies.set(settings.cookieSetName, 'yes', { expires: popupFrequency });
      }

      if (typeof theme.a11yHelpers.focusOnElement === 'function') {
        theme.a11yHelpers.focusOnElement(document.querySelector(settings.selectors.popupContainer));
      }
    };

    /*
     * @description close the pop up
     */
    publicAPIs.close = event => {

      if (document.querySelector(settings.selectors.popupContainer)) {
        if (useFadeAnimation()) {
          theme.Helpers.fadeOut(document.querySelector(settings.selectors.popupContainer));
        } else {
          document.querySelector(settings.selectors.popupContainer).style.display = "none";
        }
      }

      if (settings.overlay && document.querySelector(settings.selectors.popupOverlay)) document.querySelector(settings.selectors.popupOverlay).classList.remove(settings.classes.visible);

      // If there was an event passed in, prevent it from redirecting
      if (event) event.preventDefault();

      // If there is a lastFocus element then focus on it
      if (lastFocus) lastFocus.focus();
    };

    /*
     * @description initialize the pop up
     */
    publicAPIs.init = (options) => {

      settings = Object.assign({}, defaults, options);

      popupFrequency = document.querySelector(settings.selectors.popupContainer).getAttribute('data-popup-frequency') ? Number(document.querySelector(settings.selectors.popupContainer).getAttribute('data-popup-frequency')) : settings.defaultFrequency;

      const popupDelayAttribute = document.querySelector(settings.selectors.popupContainer).getAttribute('data-popup-delay');

      let popupDelay = Number(popupDelayAttribute) * 1000;

      const popupCloseEl = document.querySelector(settings.selectors.popupCloseButton);

      if (!popupCloseEl) {
        if (settings.debug) console.log('err. no popup close button');
      }

      const popupEnabledAttribute = document.querySelector(settings.selectors.popupContainer).getAttribute('data-popup-enabled');

      const popupEnabled = popupEnabledAttribute == 'true' ? true : false;

      // Register events
      popupCloseEl.addEventListener('click', handleCloseButtonEvent)

      if (settings.escape) {
        document.addEventListener('keyup', handleEscapeKeyboardEvent);
      }

      if (settings.overlay) {
        document.addEventListener('click', handleOverlayEvent);
      }

      // Bail if working inside the theme editor
      if (themeEditorCheck() || !popupEnabled ) return;

      if (checkURLQueryString()) {
        popupDelay = 10;
      }

      setTimeout(function() {

        // if (themeEditorCheck() == true || checkURLQueryString() ) {
        if ( checkURLQueryString() ) {

          lastFocus = document.activeElement;

          publicAPIs.open();

        } else {

          const popUpShownCookie = Cookies.get(settings.cookieSetName);

          if (!popUpShownCookie) {
            lastFocus = document.activeElement;
            publicAPIs.open();
          }
        }
      }, popupDelay);
    };

    return publicAPIs;

  })();

  function MailingPopup(container) {
    // Initialize pop up
    Popup.init({
      selectors: {
        popupContainer: ".js-popup",
        popupOverlay: ".js-popup-overlay",
        popupCloseButton: ".js-mailing-popup-close",
      },
      overlay: true,
      successMessage: true
    });
  };

  // Interact with the theme editor
  MailingPopup.prototype = _.assignIn({}, MailingPopup.prototype, {
    onSelect: function() {
      Popup.open();
    },
    onDeselect: function() {
      Popup.close();
    }
  });

  return MailingPopup;
})();

/*======================================================
  Shop The Look
========================================================*/
theme.ShopTheLook = (function() {

  function ShopTheLook(container) {


    const PADDING = 10;

    // Handle product popup adjusts the product's position
    // based on if it goes out of bounds or not.
    const handleProductPopup = event => {

      // Get event target.
      let target = event.target;

      // Bail if there is no event target.
      if (!target) {
        return false;
      }

      // Bail if document element
      if (target.nodeName === '#document') {
        return false;
      }

      // Bail if target is not a hotspot
      if (!target.matches('.hotspot')) {
        return false;
      }

      // Get child product.
      let product = target.querySelector('.product-hotspot');
      // Use helper method to determine if it is out of bounds
      // or not.
      let isOut = theme.DOMHelpers.isOutOfBounds(product);

      if (isOut.left) {
        product.style.transform = `translateX(${Math.round(Math.abs(isOut.leftAmount)) + PADDING}px)`;
      }
      if (isOut.right) {
        product.style.transform = `translateX(${(Math.round(isOut.rightAmount) + (PADDING * 2)) * -1}px)`;
      }
    };

    // Get all the hotspots in the section container.
    let hotspots = container.querySelectorAll('.hotspot');

    // Check if there are hotspots
    if (hotspots.length > 0) {
      // Apply event listeners to all of them
      hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', handleProductPopup);
        hotspot.addEventListener('mouseenter', handleProductPopup);
      });
    };
  }
  ShopTheLook.prototype = _.assignIn({}, ShopTheLook.prototype, {});
  return ShopTheLook;
})();

/*======================================================
  Countdown
======================================================*/

theme.Countdown = (function() {
  function getCountDown(container){
    // Fade countdown in
    setTimeout(function() {
      container.querySelectorAll('.countdown__time--wrapper').forEach((item, i) => {
        item.style.opacity = 1;
      });
    }, 100);

    var timestamp = container.getAttribute('data-launch-date'),
        timestamp = parseInt(timestamp);

    if ( !timestamp ) return false;

    var count = setInterval(function(){
      var nowTime = new Date();
      var endTime = new Date(timestamp * 1000);

      var t = endTime.getTime() - nowTime.getTime();
      var days = Math.floor(t/1000/60/60/24);
      var hours = Math.floor(t/1000/60/60%24);
      var mins = Math.floor(t/1000/60%60);
      var secs = Math.floor(t/1000%60);

      if (days < 10) {
        days = "0" + days;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (mins < 10) {
        mins = "0" + mins;
      }
      if (secs < 10) {
        secs = "0" + secs;
      }

      if ( days >= 0 ) container.querySelector('[data-launch-days]').innerHTML = days;
      if ( hours >= 0 ) container.querySelector('[data-launch-hours]').innerHTML = hours;
      if ( mins >= 0 ) container.querySelector('[data-launch-mins]').innerHTML = mins;
      if ( secs > 0 ) container.querySelector('[data-launch-secs]').innerHTML = secs;

      if (t < 0) {
        clearInterval(count);
        reloadSection(container);
      }

    },1000);
  }

function reloadSection(container) {
  const id = container.dataset.sectionId;
  const url = `${container.dataset.baseUrl}?section_id=${ id }`;

  fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(function(html) {
      if (html.trim() === '') {
        return;
      }
      // Convert the HTML string into a document object
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // Check if #countdownWrapper exists before performing any actions on them
      var countdownWrapper = doc.querySelector('#countdownWrapper');
      if (!countdownWrapper) {
        return;
      }

      var containerCountdownWrapper = container.querySelector('#countdownWrapper');
      if (!containerCountdownWrapper) {
        return;
      }

      containerCountdownWrapper.innerHTML = countdownWrapper.innerHTML;
    });
}

  document.querySelectorAll('[data-section-type="countdown"]').forEach(function(container, i){
    getCountDown(container);
  });
  document.addEventListener("shopify:section:select", function(event) {
    if (!event.target.querySelector('[data-section-type="countdown"]')) return false;
    var container = event.target.querySelector('[data-section-type="countdown"]');

    getCountDown(container);
  });

return getCountDown;
})();

/*============================================================================
  Global Events
==============================================================================*/
var mobile = window.matchMedia('(max-width: 740px)');
var tablet = window.matchMedia('(max-width: 979px) and (min-width: 741px)');
var device = window.matchMedia('(max-width: 980px)');
var desktop = window.matchMedia('(min-width: 980px)');

window.addEventListener('DOMContentLoaded', (event) => {

  /* Initialize Accordions */
  theme.Accordion();

  (function helperRteFormat() {
    theme.DOMHelpers.wrapIframe({
      iframes: document.querySelectorAll('.rte iframe, .rte iframe'),
      iframeWrapperClass: 'videoWrapper'
    });

    theme.DOMHelpers.wrapTable({
      tables: document.querySelectorAll('.rte table'),
      tableWrapperClass: 'table-wrapper'
    });
  })();

  (function eventTriggers() {
    if ( mobile.matches ) {
      Events.trigger("mediaquery:mobile");
    }
    if ( tablet.matches ) {
      Events.trigger("mediaquery:tablet");
    }
    if ( device.matches ) {
      Events.trigger("mediaquery:device");
    }
    if (desktop.matches) {
      Events.trigger("mediaquery:desktop");
    }
    window.addEventListener("resize", function () {
      if ( mobile.matches ) {
        Events.trigger("mediaquery:mobile");
      }
      if ( tablet.matches ) {
        Events.trigger("mediaquery:tablet");
      }
      if ( device.matches ) {
        Events.trigger("mediaquery:device");
      }
      if ( desktop.matches ) {
        Events.trigger("mediaquery:desktop");
      }
    });
    window.addEventListener('touchstart', function onFirstTouch() {
      Events.trigger("device:touchstart");
      window.removeEventListener('touchstart', onFirstTouch, false);
    });
    document.addEventListener('shopify:section:select', function(event){
      Events.trigger("editor:section:select", event);
    });
    document.addEventListener('shopify:section:deselect', function(event){
      Events.trigger("editor:section:deselect", event);
    });
    document.addEventListener('shopify:section:load', function(event){
      Events.trigger("editor:section:load", event);
    });
    document.addEventListener('shopify:section:unload', function(event){
      Events.trigger("editor:section:unload", event);
    });
    document.addEventListener('shopify:block:select', function(event){
      Events.trigger("editor:block:select", event);
    });
    document.addEventListener('shopify:block:deselect', function(event){
      Events.trigger("editor:block:deselect", event);
    });
    document.addEventListener('lazyloaded', function(e){
      Events.trigger("lazyLoad:complete");
    });

    if ( document.querySelectorAll('.js-bg-video-wrapper') ) {
      WAU.ProductGridVideo.init();
    }

    Events.trigger('DOMContentLoaded');
  })();

  (function adjustDisclosureListsPastEdge() {
    if (theme.DOMHelpers.isElementPastEdge === undefined || theme.DOMHelpers.adjustElementXPosition === undefined ) {
      console.log('Error. Missing helper functions');
      return;
    }

    document.addEventListener('click', event => {

      let target = event.target;

      if (!target.classList.contains('disclosure__toggle')) {
        return;
      }

      let parentEl = target.closest('.disclosure');

      let disclosureList = parentEl.querySelector('.disclosure-list');

      if (theme.DOMHelpers.isElementPastEdge(disclosureList)) {
        theme.DOMHelpers.adjustElementXPosition(disclosureList, 10);
        return;
      }

    })
  })();

  (function initPredictiveSearch() {

    const selectors = {
      input: 'input[type="search"]',
      results: '#predictive-search'
    };

    class PredictiveSearch extends HTMLElement {
      constructor() {
        super();

        // Make sure that theme helper methods and the browser supports.
        this.featureDetections();

        // Get data attributes from element
        this.routesPredictiveSearchURL = this.dataset.routes;
        this.inputSelector = this.dataset.inputSelector;
        this.resultsSelector = this.dataset.resultsSelector;

        // Get DOM elements
        this.input = this.querySelector(this.inputSelector) ? this.querySelector(this.inputSelector) : this.querySelector(selectors.input);
        this.predictiveSearchResults = this.querySelector(this.resultsSelector) ? this.querySelector(this.resultsSelector) : this.querySelector(selectors.results);

        // Add event listeners
        this.input.addEventListener('input', theme.Helpers.debounce((event) => {
          this.onChange(event);
        }, 300).bind(this));

        this.addEventListener('focusout', this.onFocusOut.bind(this));
      }

      featureDetections() {
        if (
           ! this.isFunction(theme.Helpers.debounce)
          ) {
          console.log('Error. Missing debouce theme helper method for predictive search.');
          return false;
        }
        if (
          ! window.fetch
        ) {
          console.log('Error. Web browser does not support fetch required for predictive search');
          return false;
        }
      }

      getTypeOf(value) {
        return Object.prototype.toString.call(value);
      }

      isFunction(value) {
        return this.getTypeOf(value) === '[object Function]';
      }

      onChange() {
        const searchTerm = this.input.value.trim();

        if (!searchTerm.length) {
          this.close();
          return;
        }

        this.getSearchResults(searchTerm);
      }

      getSearchResults(searchTerm) {

        fetch(`${this.routesPredictiveSearchURL}?q=${encodeURIComponent(searchTerm)}&section_id=predictive-search`)
          .then((response) => {
            if (!response.ok) {
              var error = new Error(response.status);
              this.close();
              throw error;
            }

            return response.text();
          })
          .then((text) => {
            const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
            this.predictiveSearchResults.innerHTML = resultsMarkup;
            this.open();
          })
          .catch((error) => {
            this.close();
            throw error;
          });
      }

      open() {
        WAU.ProductGridVideo.init();
        Shopify.theme.ajaxCart.init();
        if (typeof theme.Helpers.fadeIn === 'function') {
          theme.Helpers.fadeIn(this.predictiveSearchResults);
        } else {
          this.predictiveSearchResults.style.display = 'block';
        }
      }

      close() {
        if (typeof theme.Helpers.fadeOut === 'function') {
          theme.Helpers.fadeOut(this.predictiveSearchResults);
        } else {
          this.predictiveSearchResults.style.display = 'none';
        }
      }

      onFocusOut() {
        setTimeout(() => {
          if (!this.contains(document.activeElement)) this.close();
        })
      }
    }

    customElements.define('predictive-search', PredictiveSearch);
  })();
});

theme.BeforeAfter = (function() {
  function BeforeAfter(container) {
    const baContainer = container.querySelector('.before--after');
    const before = container.querySelector('.before-image');
    const beforeImage = before.querySelector('img') || before.querySelector('.before--image_placeholder');
    const slider = container.querySelector('.before--after_slider');
    let active = false;
    let width = baContainer.offsetWidth;

    function initBeforeAfter() {
      // Add width to first image so that it does not shrink
      beforeImage.style.width = width + 'px';

      // Recalculate width on resize
      let resizeId;
      window.addEventListener('resize', function() {
        cancelAnimationFrame(resizeId);
        resizeId = requestAnimationFrame(function() {
          width = baContainer.offsetWidth;
          beforeImage.style.width = width + 'px';
        });
      });

      // Handle mouse events
      slider.addEventListener('mousedown', function() {
        active = true;
        slider.classList.add('resize');
      });

      document.body.addEventListener('mouseup', function() {
        active = false;
        slider.classList.remove('resize');
      });

      document.body.addEventListener('mouseleave', function() {
        active = false;
        slider.classList.remove('resize');
      });

      document.body.addEventListener('mousemove', function(e) {
        if (!active) return;
        const x = e.pageX - baContainer.getBoundingClientRect().left;
        slideIt(x);
        pauseEvent(e);
      });

      // Handle touch events
      slider.addEventListener('touchstart', function(e) {
        active = true;
        slider.classList.add('resize');
        e.preventDefault();
      }, { passive: true });

      document.body.addEventListener('touchend', function() {
        active = false;
        slider.classList.remove('resize');
      });

      document.body.addEventListener('touchcancel', function() {
        active = false;
        slider.classList.remove('resize');
      });

      document.body.addEventListener('touchmove', function(e) {
        if (!active) return;
        const x = e.changedTouches[e.changedTouches.length - 1].pageX - baContainer.getBoundingClientRect().left;
        slideIt(x);
        pauseEvent(e);
      }, { passive: true });

      // Helper functions
      function slideIt(x) {
        const transform = Math.max(0, Math.min(x, width));
        before.style.width = transform + 'px';
        slider.style.left = transform + 'px';
      }

      function pauseEvent(e) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    initBeforeAfter();
  }

  return BeforeAfter;
})();

theme.BeforeAfter.prototype = _.assignIn({}, theme.BeforeAfter.prototype, {});

/*============================================================================
  Registering Sections
==============================================================================*/

document.addEventListener("DOMContentLoaded", function(){
  var sections = new theme.Sections();
  sections.register('slideshow-section', theme.Slideshow);
  sections.register('collection-slider', theme.CollectionSlider);
  sections.register('carousel-section', theme.CarouselSection);
  sections.register('product-section', theme.Product);
  sections.register('product-recommendations', theme.ProductRecommendations);
  sections.register('recently-viewed', theme.RecentlyViewed);
  sections.register('cart-recently-viewed-products', theme.CartRecentlyViewedProducts);
  sections.register('store-availability', theme.StoreAvailability);
  sections.register('collection-list-section', theme.CollectionList);
  sections.register('collection-section', theme.Collection);
  sections.register('search-section', theme.Search);
  sections.register('mobile-navigation', theme.mobileNav);
  sections.register('header-section', theme.Header);
  sections.register('announcement-bar', theme.AnnouncementBar);
  sections.register('footer-section', theme.Footer);
  sections.register('image-carousel', theme.Carousel);
  sections.register('map', theme.Maps);
  sections.register('password-page', theme.Password);
  sections.register('shop-the-look', theme.ShopTheLook);
  sections.register('mailing-popup', theme.MailingPopup);
  sections.register('accordion', theme.Accordion);
  sections.register('image-gallery', theme.ImageGallery);
  sections.register('before-after', theme.BeforeAfter);
  sections.register('countdown', theme.Countdown);
  sections.register('customer-login', theme.CustomerLogin);
});

/* Log Theme Version */
log = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(console);
    return Function.prototype.bind.apply(console.log, args);
}

log("Vantage Version 12.2.0 by Underground", {bar: 1})();

if (!customElements.get('wau-quick-add')) {
  customElements.define('wau-quick-add', class WAUQuickAdd extends HTMLElement {

    // Contstructor
    constructor() {
      super();

      this.formId = this.getAttribute('data-product-form-id');
      this.form = document.querySelector(`#product_form_${this.formId}`);
      this.button = this.form.querySelector('.js-ajax-submit');
      this.variantIdField = this.form.querySelector('[name="id"]');
      this.sizeButtons = this.querySelectorAll('.add');


      if (this.sizeButtons.length > 0) {
        this.sizeButtons.forEach((button) => {
          button.addEventListener('click', (event) => {
            event.preventDefault();
            this.variantIdField.value = event.target.getAttribute('data-variant-id');
            this.button.click();
          });
        });
      }
    }
  });
}

/**
 * WAU Popover Polyfill
 * @description This script checks if the Popover API is supported in the browser. If not, it loads a polyfill script dynamically.
 */
class WAUPopoverLoader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.path = this.getAttribute('data-asset-url');
    this.cssClass = this.getAttribute('data-css-class');

    if (!this.path) {
      console.error('No asset URL provided for the popover polyfill.');
      return;
    }

    if (!this.cssClass) {
      console.error('No class name provided for the popover polyfill.');
      return;
    }

    this.loadPopoverPolyfill(this.path, this.cssClass);
  }

  loadPopoverPolyfill(path, cssClass = 'popover') {
    if (!('popover' in HTMLElement.prototype)) {
      const polyfillScript = document.createElement('script');
      polyfillScript.src = path;
      document.head.appendChild(polyfillScript);

      polyfillScript.onload = () => {
        console.log('Popover API polyfill loaded.');
      };

      polyfillScript.onerror = () => {
        console.error('Failed to load Popover API polyfill.');
      };
      document.documentElement.classList.add(`no-${cssClass}`);
    } else {
      console.log('Popover API is natively supported.');
      document.documentElement.classList.add(`${cssClass}`);
    }
  }
}

customElements.define('wau-popover-loader', WAUPopoverLoader);

theme.Accordion = function(container) {

  document.addEventListener('shopify:block:select', function({target}){
    if (target.tagName !== 'DETAILS') return;
    target.open = true;
  });

  document.addEventListener('shopify:block:deselect', function({target}){

    const { defaultOpenAccordion } = target.dataset;
    const openByDefault = defaultOpenAccordion === 'true';

    if (target.tagName !== 'DETAILS' || openByDefault) return;

    target.open = false;
  });
}

if (!customElements.get("wau-shipping-calculator")) {
  customElements.define(
    "wau-shipping-calculator",
    class extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        const allInstances = document.querySelectorAll("wau-shipping-calculator");
        const instanceIndex = Array.from(allInstances).indexOf(this);
        this._instance = instanceIndex;
        this.update()
      }

      update() {

        const provinceContainer = this.querySelector(
          "#address_province_container"
        );

        if (provinceContainer) {
          this.setIdWithInstanceNumber(provinceContainer);
        }

        const addressCountry = this.querySelector("#address_country");

        if (addressCountry) {
          this.setIdWithInstanceNumber(addressCountry);
        }

        const address_province = this.querySelector("#address_province");

        if (address_province) {
          this.setIdWithInstanceNumber(address_province);
        }

        this.init();
      }

      setIdWithInstanceNumber(element) {
        element.setAttribute(
          "id",
          `${element.id}-${this._instance}`
        );
      }

      init() {
        var config = document.getElementById("cart-config");
        if (!config) return false;
        var config = JSON.parse(config.innerHTML || "{}");

        var selectors = {
          container: ".js-shipping-calc-wrapper",
          submitButton: ".js-shipping-calc-submit",
          addressZip: ".js-shipping-calc-address-zip",
          addressCountry: ".js-shipping-calc-address-country",
          addressProvince: ".js-shipping-calc-address-province",
          addressProvinceLabel: ".js-shipping-calc-address-province-label",
          response: ".js-shipping-calc-response",
        };

        let container = this.querySelector(selectors.container);

        // Initialize observer on shipping address.
        new Shopify.CountryProvinceSelector(
          `address_country-${this._instance}`,
          `address_province-${this._instance}`,
          {
            hideElement: `address_province_container-${this._instance}`,
          }
        );

        // Updating province label.
        var countriesSelect = container.querySelector(selectors.addressCountry);
        var addressProvinceLabelEl = container.querySelector(
          selectors.addressProvinceLabel
        );

        if (typeof Countries !== "undefined") {
          Countries.updateProvinceLabel(
            countriesSelect.val(),
            addressProvinceLabelEl
          );
          countriesSelect.change(function () {
            Countries.updateProvinceLabel(
              countriesSelect.val(),
              addressProvinceLabelEl
            );
          });
        }

        // When any of the calculator buttons is clicked, get rates.
        let button = container.querySelector(selectors.submitButton);

        button.addEventListener(
          "click",
          function (e) {
            e.preventDefault();

            // Disabling all buttons.
            this.disableButtons(config, container);

            // Hiding response.
            container.querySelector(selectors.response).style.display = "none";

            // Reading shipping address for submission.
            let shippingAddress = {};
            shippingAddress.zip =
              container.querySelector(selectors.addressZip).value || "";
            shippingAddress.country =
              container.querySelector(selectors.addressCountry).value || "";
            shippingAddress.province =
              container.querySelector(selectors.addressProvince).value || "";

            this.getRates(config, shippingAddress, container);
          }.bind(this)
        );
      }
      enableButtons(config, container) {
        var selectors = {
          submitButton: ".js-shipping-calc-submit",
        };
        container
          .querySelector(selectors.submitButton)
          .removeAttribute("disabled");
        container
          .querySelector(selectors.submitButton)
          .classList.remove("disabled");
        container.querySelector(selectors.submitButton).value =
          config.calculator_submit;
      }
      disableButtons(config, container) {
        var selectors = {
          submitButton: ".js-shipping-calc-submit",
        };
        container
          .querySelector(selectors.submitButton)
          .setAttribute("disabled", "disabled");
        container
          .querySelector(selectors.submitButton)
          .classList.add("disabled");
        container.querySelector(selectors.submitButton).value =
          config.calculator_calculating;
      }
      getRates(config, shipping_address, container) {
        let url =
          "/cart/shipping_rates.json?shipping_address%5Bzip%5D=" +
          shipping_address.zip +
          "&shipping_address%5Bcountry%5D=" +
          shipping_address.country +
          "&shipping_address%5Bprovince%5D=" +
          shipping_address.province;

        fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            if (!response.shipping_rates) {
              this.onError(response, config, container);
            } else {
              let rates = response.shipping_rates;
              this.onRatesUpdate(rates, shipping_address, config, container);
            }
          })
          .catch((error) => {
            this.onError(error, config, container);
          });
      }
      onError(error, config, container) {
        // Re-enable calculate shipping buttons.
        this.enableButtons(config, container);

        let feedback =
          config.calculator_error +
          " " +
          Object.keys(error)[0] +
          " " +
          Object.values(error)[0];

        // Update calculator.
        this.render(
          { rates: [], errorFeedback: feedback, success: false },
          container,
          config
        );

        container.querySelector(".js-shipping-calc-rates").style.display =
          "none";
        container.querySelector(".js-shipping-calc-response").style.display =
          "block";
      }
      onRatesUpdate(rates, shipping_address, config, container) {
        // Re-enable calculate shipping buttons.
        this.enableButtons(config, container);

        // Formatting shipping address.
        var readable_address = "";
        if (shipping_address.zip)
          readable_address += shipping_address.zip + ", ";
        if (shipping_address.province)
          readable_address += shipping_address.province + ", ";
        readable_address += shipping_address.country;

        if (!rates) return false;

        // Format rates for moneyFormat
        rates.forEach((rate, i) => {
          rate.price = this.formatRate(rate.price, config);
        });

        // Show rates and feedback.
        this.render(
          { rates: rates, address: readable_address, success: true },
          container,
          config
        );
      }
      formatRate(ratePrice, config) {
        let formatDollarsToCents = function (value) {
          value = (value + "").replace(/[^\d.-]/g, "");
          if (value && value.includes(".")) {
            value = value.substring(0, value.indexOf(".") + 3);
          }
          return value ? Math.round(parseFloat(value) * 100) : 0;
        };
        let cents = formatDollarsToCents(ratePrice);

        return theme.Helpers.formatMoney(cents, config.money_format);
      }
      render(response, container, config) {
        let rateFeedback = container.querySelector(
            ".js-shipping-calc-rates-feedback"
          ),
          rateList = container.querySelector(".js-shipping-calc-rates");

        // Empty feedback
        rateFeedback.innerHTML = "";

        // Update feedback
        if (response.rates.length > 1) {
          rateFeedback.innerHTML =
            config.shipping_multi_rate_one +
            response.rates.length +
            config.shipping_multi_rate_two +
            response.address +
            config.shipping_multi_rate_three +
            response.rates[0].price;
        } else if (response.rates.length === 1) {
          rateFeedback.innerHTML =
            config.shipping_single_rate + response.address;
        } else {
          rateFeedback.innerHTML = config.shipping_no_destination;
        }

        // Empty rates
        rateList.innerHTML = "";

        // Update rates
        response.rates.forEach((rate, i) => {
          const rateLI = document.createElement("li");
          rateLI.classList.add("shipping-calc__rate");
          rateLI.innerHTML = rate.name + " at " + rate.price;
          rateList.appendChild(rateLI);
        });

        container.querySelector(".js-shipping-calc-rates").style.display =
          "block";
        container.querySelector(".js-shipping-calc-response").style.display =
          "block";
      }
    }
  );
}

// --- Zeke Original Price Updater (Vantage event version) ---
document.addEventListener("variantchange", e => {
  const matchedVariant = e.detail?.variant;
  if (!matchedVariant) return;

  const OrigPriceText = document.querySelector('.js-original-price');
  if (!OrigPriceText) return;

  const price = matchedVariant.price / 100;
  const originalMeta = matchedVariant.metafields?.custom?.original_price;
  const originalPrice = originalMeta ? parseFloat(originalMeta.value) : null;

  if (originalPrice && originalPrice !== price) {
    console.log("test")
    OrigPriceText.innerHTML = `$${originalPrice.toFixed(2)}`;
    OrigPriceText.style.display = 'inline';
  } else {
    OrigPriceText.style.display = 'none';
  }
});



// +++ Final robust Insert widget handler for Vantage +++
// Handles visibility, hidden inputs, variant changes, and fallback visibility

(function () {
  const DEBUG = true;
  //const log = (...args) => DEBUG && console.log('[InsertFix]', ...args);

  function closestForm(el) {
    return el ? el.closest('form.product_form') || el.closest('form') : null;
  }

  function getNextItemsIndex(form) {
    const inputs = Array.from(form.querySelectorAll('[name]'));
    let maxIndex = -1;
    const re = /^items\[(\d+)\]\[id\]$/;
    inputs.forEach(i => {
      const m = i.getAttribute('name')?.match(re);
      if (m) maxIndex = Math.max(maxIndex, parseInt(m[1], 10));
    });
    return maxIndex + 1;
  }

  function disableInsertFields(form) {
    form?.querySelectorAll('.insertId, .insertQty, .insertProperty').forEach(input => {
      input.disabled = true;
      input.removeAttribute('name');
    });
  }

  function enableOrUpdateInsertFields(form, insertVariantId, mainVariantId) {
    const idx = getNextItemsIndex(form);
    const idInput  = form.querySelector('.insertId');
    const qtyInput = form.querySelector('.insertQty');
    const propInput= form.querySelector('.insertProperty');
    if (!idInput || !qtyInput || !propInput) return;

    idInput.name  = `items[${idx}][id]`;
    qtyInput.name = `items[${idx}][quantity]`;
    propInput.name= `items[${idx}][properties][_insertPillowId]`;

    idInput.value  = insertVariantId || '';
    qtyInput.value = qtyInput.value || 1;
    propInput.value= mainVariantId  || '';

    idInput.disabled  = false;
    qtyInput.disabled = false;
    propInput.disabled= false;

    log('Enabled insert fields', { idx, insertVariantId, mainVariantId });
  }

  function getSelectedMainVariantId(form) {
    const idField = form.querySelector('input[name="id"], select[name="id"], input.formVariantId');
    if (idField) return idField.value;
    const productSection = form.closest('[data-product-id]');
    return productSection?.dataset.initialVariant || null;
  }

  function syncCheckboxVisibilityForWidget(widget) {
    if (!widget) return;
    const form = closestForm(widget) || document.querySelector('form.product_form');
    if (!form) return;

    const mainVariantId = getSelectedMainVariantId(form);
    log('Syncing widget for variant', mainVariantId);

    widget.querySelectorAll('.plus-insert-checkbox').forEach(el => {
      const vid = el.dataset.variantId;
      const match = String(vid) === String(mainVariantId);
      el.classList.toggle('display-none', !match);
      const cb = el.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = false;
      log('checkbox', { dataVariantId: vid, match });
    });

    // --- Fallback: if none are visible, show the first one ---
    const visible = widget.querySelectorAll('.plus-insert-checkbox:not(.display-none)');
    if (!visible.length) {
      const first = widget.querySelector('.plus-insert-checkbox');
      if (first) {
        first.classList.remove('display-none');
        const cb = first.querySelector('input[type="checkbox"]');
        if (cb) cb.checked = false;
        console.warn('[InsertFix] No matching checkbox found for variant — showing first as fallback.');
      }
    }

    disableInsertFields(form);
  }

  function syncAllWidgets() {
    document.querySelectorAll('.plus-insert-widget').forEach(syncCheckboxVisibilityForWidget);
  }

  // --- Checkbox toggle (delegated) ---
  document.addEventListener('change', e => {
    if (!e.target.matches('.plus-insert-checkbox input[type="checkbox"]')) return;
    const cb = e.target;
    const form = closestForm(cb);
    if (!form) return;
    const insertVariantId = cb.dataset.insertId;
    const mainVariantId = getSelectedMainVariantId(form);

    cb.checked
      ? enableOrUpdateInsertFields(form, insertVariantId, mainVariantId)
      : disableInsertFields(form);
  });

  // --- Variant selector change ---
  document.addEventListener('change', e => {
    const isVariantChange = e.target.matches('input[name="id"], select[name="id"], .js-variant-selector, input.formVariantId');
    if (!isVariantChange) return;
    const form = closestForm(e.target);
    setTimeout(() => {
      const widget = form?.querySelector('.plus-insert-widget') || document.querySelector('.plus-insert-widget');
      widget ? syncCheckboxVisibilityForWidget(widget) : syncAllWidgets();
    }, 300);
  });

  // --- Form submit safeguard ---
  document.addEventListener('submit', e => {
    const form = e.target;
    if (!form.matches('form.product_form')) return;
    const checked = form.querySelector('.plus-insert-checkbox input[type="checkbox"]:checked');
    if (checked) {
      enableOrUpdateInsertFields(form, checked.dataset.insertId, getSelectedMainVariantId(form));
    } else {
      disableInsertFields(form);
    }
  }, true);

  // --- MutationObserver: re-sync when theme replaces product form ---
  const observer = new MutationObserver(muts => {
    for (const m of muts) {
      if ([...m.addedNodes, ...m.removedNodes].some(n =>
        n instanceof Element && (n.matches('.plus-insert-widget') || n.querySelector?.('.plus-insert-widget'))
      )) {
        log('DOM change detected — syncing widgets');
        setTimeout(syncAllWidgets, 200);
        break;
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // --- Initial load + delayed passes ---
  document.addEventListener('DOMContentLoaded', () => {
    log('Initial sync on DOMContentLoaded');
    syncAllWidgets();
    setTimeout(() => { log('Delayed sync #1'); syncAllWidgets(); }, 300);
    setTimeout(() => { log('Delayed sync #2'); syncAllWidgets(); }, 800);
  });
})();

// drapes

// +++ Custom product property placement fix for Vantage +++
(function () {
  const DEBUG = false;
  const log = (...args) => DEBUG && console.log('[CustomPropsPlacement]', ...args);

  const savedValues = {};

  function saveCustomValues() {
    document.querySelectorAll('.custom-property-input').forEach((input) => {
      const key = input.dataset.customPropertyKey;
      if (!key) return;
      savedValues[key] = input.value;
    });

    log('Saved values', savedValues);
  }

  function restoreCustomValues() {
    document.querySelectorAll('.custom-property-input').forEach((input) => {
      const key = input.dataset.customPropertyKey;
      if (!key) return;

      if (Object.prototype.hasOwnProperty.call(savedValues, key)) {
        input.value = savedValues[key];
      }
    });

    log('Restored values', savedValues);
  }

  function getSectionIdFromSlot(slot) {
    const match = slot.id.match(/custom-fields-after-option-[23]-(.+)$/);
    return match ? match[1] : null;
  }

  function renderTemplateIntoSlot(slot, templatePrefix) {
    const sectionId = getSectionIdFromSlot(slot);
    if (!sectionId) return;

    const template = document.querySelector(`#${templatePrefix}-${sectionId}`);
    if (!template) return;

    slot.innerHTML = '';
    slot.appendChild(template.content.cloneNode(true));
  }

  function renderCustomFields() {
    document.querySelectorAll('[id^="custom-fields-after-option-2-"]').forEach((slot) => {
      renderTemplateIntoSlot(slot, 'custom-fields-template-after-option-2');
    });

    document.querySelectorAll('[id^="custom-fields-after-option-3-"]').forEach((slot) => {
      renderTemplateIntoSlot(slot, 'custom-fields-template-after-option-3');
    });

    restoreCustomValues();

    log('Rendered custom fields');
  }

  document.addEventListener('change', function (event) {
    if (event.target.matches('.custom-property-input')) {
      saveCustomValues();
      return;
    }

    if (event.target.matches('.js-variant-selector, input[name="id"], select[name="id"], input.formVariantId')) {
      saveCustomValues();

      setTimeout(renderCustomFields, 100);
      setTimeout(renderCustomFields, 300);
      setTimeout(renderCustomFields, 700);
    }
  });

  document.addEventListener('submit', function (event) {
    if (!event.target.matches('form.product_form')) return;

    saveCustomValues();
    restoreCustomValues();
  }, true);

  const observer = new MutationObserver(function (mutations) {
    const variantAreaChanged = mutations.some((mutation) => {
      return Array.from(mutation.addedNodes).some((node) => {
        return node instanceof Element && (
          node.matches?.('.product__variants-select') ||
          node.querySelector?.('.product__variants-select') ||
          node.matches?.('.custom-fields-slot') ||
          node.querySelector?.('.custom-fields-slot')
        );
      });
    });

    if (variantAreaChanged) {
      setTimeout(renderCustomFields, 100);
      setTimeout(renderCustomFields, 300);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  document.addEventListener('DOMContentLoaded', function () {
    renderCustomFields();
    setTimeout(renderCustomFields, 300);
    setTimeout(renderCustomFields, 800);
  });
})();

// +++ Custom dropdown hidden mirror sync +++
(function () {
  const DEBUG = true;
  const log = (...args) => DEBUG && console.log('[CustomMirror]', ...args);

  function getValueByKey(key) {
    const field = document.querySelector(`[data-custom-property-key="${key}"]`);
    return field ? field.value : '';
  }

  function syncMirrorInputs() {
    const pleatValue = getValueByKey('Pleat Style');
    const fabricValue = getValueByKey('Fabric Colorway');

    const pleatMirror = document.querySelector(
      'input[type="hidden"][data-custom-property-mirror="Pleat Style"]'
    );

    const fabricMirror = document.querySelector(
      'input[type="hidden"][data-custom-property-mirror="Fabric Colorway"]'
    );

    if (pleatMirror) {
      pleatMirror.value = pleatValue;
      pleatMirror.disabled = !pleatValue;
    }

    if (fabricMirror) {
      fabricMirror.value = fabricValue;
      fabricMirror.disabled = !fabricValue;
    }

    log('Synced mirrors', {
      pleatValue,
      fabricValue
    });
  }

  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-custom-property-key]')) {
      syncMirrorInputs();
    }

    if (event.target.matches('.js-variant-selector')) {
      setTimeout(syncMirrorInputs, 100);
      setTimeout(syncMirrorInputs, 300);
      setTimeout(syncMirrorInputs, 700);
    }
  });

  document.addEventListener(
    'click',
    function (event) {
      if (event.target.closest('.AddtoCart, .js-ajax-submit, button[type="submit"], input[type="submit"]')) {
        syncMirrorInputs();
      }
    },
    true
  );

  document.addEventListener(
    'submit',
    function (event) {
      if (event.target.matches('form.product_form')) {
        syncMirrorInputs();
      }
    },
    true
  );

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(syncMirrorInputs, 100);
    setTimeout(syncMirrorInputs, 500);
  });
})();
