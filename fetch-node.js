'use strict';

var nodeFetch = require('node-fetch').default;

function wrapFetchForNode(fetch) {
  // Support schemaless URIs on the server for parity with the browser.
  // https://github.com/matthew-andrews/isomorphic-fetch/pull/10
  return function (u, options) {
    if (typeof u === 'string' && u.slice(0, 2) === '//') {
      return fetch('https:' + u, options);
    }

    return fetch(u, options);
  };
}

module.exports = function (context) {
  // This modifies the global `node-fetch` object, which isn't great, since
  // different callers to `fetch-ponyfill` which pass a different Promise
  // implementation would each expect to have their implementation used. But,
  // given the way `node-fetch` is implemented, this is the only way to make
  // it work at all.
  if (context && context.Promise) {
    nodeFetch.Promise = context.Promise;
  }

  return {
    fetch: wrapFetchForNode(nodeFetch),
    Headers: nodeFetch.Headers,
    Request: nodeFetch.Request,
    Response: nodeFetch.Response
  };
};
