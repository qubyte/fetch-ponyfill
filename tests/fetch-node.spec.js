// From isomorphic-fetch
// Copyright (c) 2015 Matt Andrews
// MIT License

'use strict';

var fetch = require('../fetch-node')();
var expect = require('chai').expect;
var nock = require('nock');
var good = 'hello world. 你好世界。';
var bad = 'good bye cruel world. 再见残酷的世界。';

function responseToText(response) {
    if (response.status >= 400) throw new Error('Bad server response');
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

    it('should make requests', function(done) {
        fetch('https://mattandre.ws/succeed.txt')
            .then(responseToText)
            .then(function(data) {
                expect(data).to.equal(good);
                done();
            })
            .catch(done);
    });

    it('should do the right thing with bad requests', function(done) {
        fetch('https://mattandre.ws/fail.txt')
            .then(responseToText)
            .catch(function(err) {
                expect(err.toString()).to.equal('Error: Bad server response');
                done();
            })
            .catch(done);
    });

    it('should support schemaless URIs', function(done) {
        fetch('//mattandre.ws/succeed.txt')
            .then(responseToText)
            .then(function(data) {
                expect(data).to.equal(good);
                done();
            })
            .catch(done);
    });

    it('should use the built-in promise implementation', function() {
        expect(fetch('https://mattandre.ws/succeed.txt')).to.be.instanceof(Promise);
    });

    it('should work with then/promise', function (done) {
        var ThenPromise = require('promise');
        var fetch = require('../fetch-node')({ Promise: ThenPromise });

        fetch('https://mattandre.ws/succeed.txt')
            .then(responseToText)
            .then(function(data) {
                expect(data).to.equal(good);
                done();
            })
            .catch(done);
    });

    it('should use the given promise implementation', function() {
        var ThenPromise = require('promise');
        var fetch = require('../fetch-node')({ Promise: ThenPromise });

        expect(fetch('https://mattandre.ws/succeed.txt')).to.be.instanceof(ThenPromise);
        expect(fetch('https://mattandre.ws/succeed.txt')).not.to.be.instanceof(Promise);
    });

});
