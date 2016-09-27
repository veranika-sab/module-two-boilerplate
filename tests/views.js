/* eslint-env mocha*/

import { assert } from 'chai';
import { renderAccount } from 'views';

describe('renderAccount', function() {
  const accountData = {
    nickname: 'kotletko',
    account_id: 42
  };

before(function() {
  document.body.innerHTML = renderAccount(accountData);
});

  it('should render account name and id', function() {
    const userNode = document.querySelector('.js-account');
    assert.equal(userNode.innerHTML.trim(), accountData.nickname);
    assert.equal(userNode.getAttribute('data-id'), accountData.account_id);
  });

  it('should be appropriate style', function() {
    assert.isOk(document.querySelector('.search-results_item'));
  });
});
