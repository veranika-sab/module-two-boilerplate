import { loadUsers, loadProfile } from './loaders';
import { renderError, renderUserProfile, renderSearchResult } from './views';
import toggleSpinner from './helpers';

export function handleSearchClick() {
  const usernameField = document.querySelector('#username');
  toggleSpinner();
  loadUsers(usernameField.value)
  .then(data => renderSearchResult(data))
  .catch(message => renderError(message))
  .then(() => toggleSpinner());
}

function showAccountProfile(accountId) {
  const profile = document.querySelector('#profile');
  toggleSpinner();
  loadProfile(accountId)
    .then(data => renderUserProfile(data))
    .then((html) => {
      profile.innerHTML = html;
      return html;
    })
    .then(() => toggleSpinner());
}

export function handleUserClick(e) {
  const userNode = e.target;
  const accountId = userNode.dataset.id;
  userNode.classList.toggle('active');
  showAccountProfile(accountId);
}
