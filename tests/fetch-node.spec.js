// Originally derived From isomorphic-fetch tests github.com/matthew-andrews/isomorphic-fetch/

'use strict';

var fetchWrapper = require('../fetch-node');
var URL = require('url').URL;
var nock = require('nock');
var assert = require('assert');
var ThenPromise = Promise;

var good = 'hello world. 你好世界。';
var bad = 'good bye cruel world. 再见残酷的世界。';

function responseToText(response) {
  if (response.status >= 400) {
    throw new Error('Bad server response');
  }

  return response.text();
}

describe('fetch in Node', function () {
  beforeEach(function () {
    nock('https://mattandre.ws')
      .get('/succeed.txt')
      .reply(200, good);

    nock('https://mattandre.ws')
      .get('/fail.txt')
      .reply(404, bad);
  });

  afterEach(function () {
    nock.cleanAll();
  });

  describe('when called without a context', function () {
    var fetch;

    before(function () {
      fetch = fetchWrapper();
    });

    it('uses the built-in promise implementation', function () {
      assert.ok(fetch.fetch('https://mattandre.ws/succeed.txt') instanceof Promise);
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('returns a promise which resolves to an instance of Response', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt').then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('makes requests', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch.fetch('https://mattandre.ws/fail.txt')
        .then(responseToText)
        .then(
          function () {
            throw new Error('Promise should reject.');
          },
          function (err) {
            assert.equal(err.message, 'Bad server response');
          }
        );
    });

    it('supports schemaless URIs', function () {
      return fetch.fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports request instances', function () {
      return fetch.fetch(new fetch.Request('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports URL instances', function () {
      return fetch.fetch(new URL('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });
  });

  describe('when called with a context with no Promise field', function () {
    var fetch;

    before(function () {
      fetch = fetchWrapper({});
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('returns a promise which resolves to an instance of Response', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt').then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('uses the built-in promise implementation', function () {
      assert.ok(fetch.fetch('https://mattandre.ws/succeed.txt') instanceof Promise);
    });

    it('makes requests', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch.fetch('https://mattandre.ws/fail.txt')
        .then(responseToText)
        .then(
          function () {
            throw new Error('Promise should reject.');
          },
          function (err) {
            assert.equal(err.message, 'Bad server response');
          }
        );
    });

    it('supports schemaless URIs', function () {
      return fetch.fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports request instances', function () {
      return fetch.fetch(new fetch.Request('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports URL instances', function () {
      return fetch.fetch(new URL('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });
  });

  describe('when called with a context with a Promise field', function () {
    var fetch;

    before(function () {
      fetch = fetchWrapper({ Promise: ThenPromise });
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('returns a promise which resolves to an instance of Response', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt').then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('uses the a given promise implementation', function () {
      assert.ok(fetch.fetch('https://mattandre.ws/succeed.txt') instanceof ThenPromise);
    });

    it('makes requests', function () {
      return fetch.fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch.fetch('https://mattandre.ws/fail.txt')
        .then(responseToText)
        .then(
          function () {
            throw new Error('Promise should reject.');
          },
          function (err) {
            assert.equal(err.message, 'Bad server response');
          }
        );
    });

    it('supports schemaless URIs', function () {
      return fetch.fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports request instances', function () {
      return fetch.fetch(new fetch.Request('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });

    it('supports URL instances', function () {
      return fetch.fetch(new URL('https://mattandre.ws/succeed.txt'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, good);
        });
    });
  });
});
