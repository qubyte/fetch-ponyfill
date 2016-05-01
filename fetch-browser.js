'use strict';

module.exports = function fetchPonyfill(options) {
    var Promise = options && options.Promise || window.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || window.XMLHttpRequest;

    return require('./build/whatwg-fetch-patched')(Promise, XMLHttpRequest);
};
