// `whatwg-fetch` is implemented as a polyfill. To avoid modifying the global
// object, we patch that implementation.
//
// We do this in an `npm prepublish` script, which allows the built package to
// be consumed as a bundler-agnostic ordinary CommonJS module.

var moduleBody = [
    "'use strict'",
    '',
    '//',
    '// Generated from whatwg-fetch by fetch-ponyfill.',
    '//',
    '',
    'module.exports = function (Promise, XMLHttpRequest) {',
    '',
    'var self = {};',
    '',
    require('fs').readFileSync(require.resolve('whatwg-fetch'), 'utf8'),
    'return self.fetch;',
    '',
    '};'
].join('\n');

console.log(moduleBody);
