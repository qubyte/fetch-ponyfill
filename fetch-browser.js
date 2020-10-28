(function (global) {
  'use strict';

  function fetchPonyfill(options) {
    var Promise = options && options.Promise || global.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || global.XMLHttpRequest;

    return (function () {
      var globalThis = Object.create(global, {
        fetch: {
          value: undefined,
          writable: true
        }
      });

      // {{whatwgFetch}}

      return {
        fetch: globalThis.fetch,
        Headers: globalThis.Headers,
        Request: globalThis.Request,
        Response: globalThis.Response,
        DOMException: globalThis.DOMException
      };
    }());
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return fetchPonyfill;
    });
  } else if (typeof exports === 'object') {
    module.exports = fetchPonyfill;
  } else {
    global.fetchPonyfill = fetchPonyfill;
  }
}(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : this));
