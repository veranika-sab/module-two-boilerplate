import { assert } from 'chai';
import { makeRequest } from 'loaders';
import sinon from 'sinon';

describe.only('makeRequest', function() {
  const fakeData = {foo: 'bar'};
  const url = 'url';

beforeEach(function() {
  sinon.stub(window, 'fetch');
  window.fetch.returns(Promise.resolve({
    json() {
      return {status: 'ok', data: fakeData}
    }
  }))
});

afterEach(function() {
  window.fetch.restore();
})

  it('should fetch with url', function(done) {
    makeRequest(url).then(function(resp) {
      assert.equal(resp, fakeData);
    }).then(done, done);
    assert.equal(window.fetch.firstCall.args[0], url);
  });

  it('should fetch with url2', function(done) {
    makeRequest(url).then(function(resp) {
      assert.equal(resp, {});
    }).then(done, done);
    assert.equal(window.fetch.firstCall.args[0], url);
  });

  // it('', function() {
  // });
});
