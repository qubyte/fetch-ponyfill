var assert = require('assert');
var sinon = require('sinon');
var ThenPromise = require('promise');
var fetchWrapper = require('../build/fetch-browser');

function responseToText(response) {
  return response.text();
}

describe('fetch in browser', function () {
  var sandbox;
  var server;
  var requests;

  beforeEach(function () {
    sandbox = sinon.sandbox.create({ useFakeServer: true });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when called without a context', function () {
    var promise;

    beforeEach(function () {
      var fetch = fetchWrapper();
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      promise = fetch('https://blah.com/hello.world');
      sandbox.server.respond();
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('returns a promise', function () {
      assert.ok(promise instanceof Promise);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });
  });

  describe('when called with a context without a Promise field', function () {
    var promise;

    beforeEach(function () {
      var fetch = fetchWrapper({});
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      promise = fetch('https://blah.com/hello.world');
      sandbox.server.respond();
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('returns a promise', function () {
      assert.ok(promise instanceof Promise);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });
  });

  describe('when called with a context with a Promise field', function () {
    var promise;

    beforeEach(function () {
      var fetch = fetchWrapper({Promise: ThenPromise});
      sandbox.server.respondWith('https://blah.com/hello.world', 'Some response text.');
      promise = fetch('https://blah.com/hello.world');
      sandbox.server.respond();
    });

    it('makes requests', function () {
      assert.equal(sandbox.server.requests.length, 1);
    });

    it('returns an instance of the given Promise constructor', function () {
      assert.ok(promise instanceof ThenPromise);
    });

    it('resolves when the server responds', function () {
      return promise
        .then(responseToText)
        .then(function (data) {
          assert.equal(data, 'Some response text.');
        });
    });
  });
});
