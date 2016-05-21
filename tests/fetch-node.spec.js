// Originally derived From isomorphic-fetch tests github.com/matthew-andrews/isomorphic-fetch/

'use strict';

var fetchWrapper = require('../fetch-node');
var nock = require('nock');
var assert = require('assert');
var ThenPromise = require('promise');

var good = 'hello world. 你好世界。';
var bad = 'good bye cruel world. 再见残酷的世界。';

function responseToText(response) {
  if (response.status >= 400) {
    throw new Error('Bad server response');
  }

  return response.text();
}

describe('fetch in Node', function() {
  beforeEach(function() {
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
    
    it('uess the built-in promise implementation', function () {
      assert.ok(fetch('https://mattandre.ws/succeed.txt') instanceof Promise);
    });

    it('makes requests', function () {
      return fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch('https://mattandre.ws/fail.txt')
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
      return fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });
  });
  
  describe('when called with a context with no Promise field', function () {
    var fetch;
    
    before(function () {
      fetch = fetchWrapper({});
    });
    
    it('uess the built-in promise implementation', function () {
      assert.ok(fetch('https://mattandre.ws/succeed.txt') instanceof Promise);
    });

    it('makes requests', function () {
      return fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch('https://mattandre.ws/fail.txt')
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
      return fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });
  });

  describe('when called with a context with a Promise field', function () {
    var fetch;
    
    before(function () {
      fetch = fetchWrapper({ Promise: ThenPromise });
    });
    
    it('uses the a given promise implementation', function () {
      assert.ok(fetch('https://mattandre.ws/succeed.txt') instanceof ThenPromise);
    });

    it('makes requests', function () {
      return fetch('https://mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });

    it('rejects with an error on a bad request', function () {
      return fetch('https://mattandre.ws/fail.txt')
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
      return fetch('//mattandre.ws/succeed.txt')
        .then(responseToText)
        .then(function(data) {
          assert.equal(data, good);
        });
    });
  });
});
