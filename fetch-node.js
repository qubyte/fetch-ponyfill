'use strict';

var wrapFetchForNode = function (fetch) {
    // Support schemaless URIs on the server for parity with the browser.
    // https://github.com/matthew-andrews/isomorphic-fetch/pull/10
    return function (url, options) {
        if (url.slice(0, 2) === '//') {
            url = 'https:' + url;
        }
        return fetch.call(undefined, url, options);
    };
};

module.exports = function (context) {
    var fetch = require('node-fetch');

    // This modifies the global `node-fetch` object, which isn't great, since
    // different callers to `fetch-ponyfill` which pass a different Promise
    // implementation would each expect to have their implementation used. But,
    // given the way `node-fetch` is implemented, this is the only way to make
    // it work at all.
    if (context && context.Promise) {
        fetch.Promise = context.Promise;
    }

    return wrapFetchForNode(fetch);
};
