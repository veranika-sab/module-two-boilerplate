import { loadUsers, loadProfile } from './loaders'
import { renderUserProfile, renderSearchResult } from './views'
import { toggleSpinner } from './helpers'

export function handleSearchClick(e) {
  let usernameField = document.querySelector('#username')
  toggleSpinner()
  loadUsers(usernameField.value)
  .then(data => renderSearchResult(data))
  .catch(message => renderError(message))
  .then(response => toggleSpinner())
}

export function handleUserClick(e) {
  const userNode = e.target;
  const accountId = userNode.dataset.id
  userNode.classList.toggle('active')
  showAccountProfile(accountId)
}

function showAccountProfile(accountId) {
  let profile = document.querySelector('#profile')
  toggleSpinner()
  loadProfile(accountId)
    .then(data => renderUserProfile(data))
    .then(html => {
      profile.innerHTML = html
      return html
    })
    .then(data => toggleSpinner())
}
