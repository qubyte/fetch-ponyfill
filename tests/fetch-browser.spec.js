/* global sinon */

var assert = require('assert');
var ThenPromise = require('promise');
var fetchWrapper = require('../build/fetch-browser');

function responseToText(response) {
  return response.text();
}

describe('fetch in browser', function () {
  var sandbox;
  var nativeFetch = self.fetch;

  beforeEach(function () {
    sandbox = sinon.sandbox.create({useFakeServer: true});
    sandbox.server.autoRespond = true;
    self.fetch = sandbox.stub();
  });

  afterEach(function () {
    self.fetch = nativeFetch;
    sandbox.restore();
  });

  describe('when called without a context', function () {
    var promise;
    var fetch;

    beforeEach(function () {
      fetch = fetchWrapper();
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      sandbox.server.respondWith('https://blah.com/goodbye.world', 'Some other response text.');
      promise = fetch.fetch('https://blah.com/hello.world');
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('does not expose native fetch when available', function () {
      assert.notEqual(self.fetch, fetch.fetch);
    });

    it('returns a native promise instance which resolves to an instance of Response', function () {
      assert.ok(promise instanceof Promise);

      return promise.then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });

    it('can consume Request instances', function () {
      return fetch.fetch(new fetch.Request('https://blah.com/goodbye.world'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some other response text.');
        });
    });
  });

  describe('when called with a context without a Promise field', function () {
    var promise;
    var fetch;

    beforeEach(function () {
      fetch = fetchWrapper({});
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      sandbox.server.respondWith('https://blah.com/goodbye.world', 'Some other response text.');
      promise = fetch.fetch('https://blah.com/hello.world');
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('does not expose native fetch when available', function () {
      assert.notEqual(self.fetch, fetch.fetch);
    });

    it('returns a native promise instance which resolves to an instance of Response', function () {
      assert.ok(promise instanceof Promise);

      return promise.then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });

    it('can consume Request instances', function () {
      return fetch.fetch(new fetch.Request('https://blah.com/goodbye.world'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some other response text.');
        });
    });
  });

  describe('when called with a context with a Promise field', function () {
    var promise;
    var fetch;

    beforeEach(function () {
      fetch = fetchWrapper({Promise: ThenPromise});
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      sandbox.server.respondWith('https://blah.com/goodbye.world', 'Some other response text.');
      promise = fetch.fetch('https://blah.com/hello.world');
    });

    it('exposes fetch, and Request, Response, and Headers methods', function () {
      assert.deepEqual(Object.keys(fetch).sort(), ['Headers', 'Request', 'Response', 'fetch']);
    });

    it('does not expose native fetch when available', function () {
      assert.notEqual(self.fetch, fetch.fetch);
    });

    it('returns an instance of the given promise constructor which resolves to an instance of Response', function () {
      assert.ok(promise instanceof ThenPromise);

      return promise.then(function (res) {
        assert.ok(res instanceof fetch.Response);
      });
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });

    it('can consume Request instances', function () {
      return fetch.fetch(new fetch.Request('https://blah.com/goodbye.world'))
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some other response text.');
        });
    });
  });
});
