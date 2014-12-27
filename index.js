'use strict';

var functionBody = [
    '"use strict"',
    'var window = {};',
    require('fs').readFileSync(__dirname + '/node_modules/fetch/fetch.js', 'utf8'),
    'return window.fetch;'
].join('\n');

module.exports = function fetchPonyfill(options) {
    var Promise = options && options.Promise || window.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || window.XMLHttpRequest;

    return new Function('Promise', 'XMLHttpRequest', functionBody)(Promise, XMLHttpRequest);
};
