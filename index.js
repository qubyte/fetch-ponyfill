'use strict';

var functionBody = [
    '"use strict"',
    'var self = {};',
    require('fs').readFileSync(require.resolve('whatwg-fetch'), 'utf8'),
    'return self.fetch;'
].join('\n');

module.exports = function fetchPonyfill(options) {
    var Promise = options && options.Promise || window.Promise;
    var XMLHttpRequest = options && options.XMLHttpRequest || window.XMLHttpRequest;

    return new Function('Promise', 'XMLHttpRequest', functionBody)(Promise, XMLHttpRequest);
};
