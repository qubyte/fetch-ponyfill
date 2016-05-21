var assert = require('assert');

var fetch = require('../build/fetch-browser')();

var good = 'hello world. 你好世界。\n';

function responseToText(response) {
  if (response.status >= 400) throw new Error('Bad server response');
  return response.text();
}

describe('fetch', function() {

  it('should make requests', function (done) {
    fetch('https://s3.amazonaws.com/bodylabs-edge/unittest/fetch/hello.1.0.0.txt')
      .then(responseToText)
      .then(function(data) {
        assert.equal(data, good);

        done();
      })
      .catch(done);
  });

  it('should do the right thing with bad requests', function (done) {
    fetch('https://s3.amazonaws.com/bodylabs-edge/nonexistent.txt')
      .then(responseToText)
      .catch(function(err) {
        assert.equal(err.toString(), 'Error: Bad server response');

        done();
      })
      .catch(done);
  });

});
