const API_PROXY_URL = 'http://188.166.73.133/wg-api'

const GAME = 'wot'

/*
full API description you can find here:
https://ru.wargaming.net/developers/api_reference

you don't have to pass application_id query param.
It will be passed automatically via proxy server
*/


function loadUsers(username) {
  const url = `${API_PROXY_URL}/${GAME}/account/list/?search=${username}`
  return makeRequest(url)
}

function loadProfile(accountId) {
  const url = `${API_PROXY_URL}/${GAME}/account/info/?account_id=${accountId}`
  return makeRequest(url)
    .then(data => data[accountId])
}

function makeRequest(url) {
  return fetch(url)
  .then(response => response.json())
  .then(responseJson => new Promise(function(resolve, reject) {
    if (responseJson.status === 'ok') {
      resolve(responseJson.data)
    } else {
      reject(responseJson.error.message)
    }
  }))
}

function toggleSpinner() {
  let spinner = document.querySelector('#spinner')
  spinner.classList.toggle('show')
}

function renderAccount(account) {
  return `
    <div class="search-results_item js-account" data-id="${account.account_id}">
    ${account.nickname}</div>
  `
}

function renderUserProfile({nickname, global_rating, statistics}) {
  const {wins, battles} = statistics.all
  const winsPercent = (wins / battles * 100).toFixed(2)
  return `
    <h1>${nickname}</h1>
    <div>
    <p>Ratings: ${global_rating}</p>
    <p>Battles: ${battles}</p>
    <p>Wins Percent: ${winsPercent} %<p>
    </div>
  `
}

function addEventListenerForAccountDetails() {
  let searchResultItems = document.querySelectorAll('.js-account')
  for (item of searchResultItems) {
    item.addEventListener('click', handleUserClick)
  }
}

function renderSearchResult(accounts) {
  let searchResults = document.querySelector('#search-results')
  let result
  if (accounts.length !== 0) {
    result = accounts.map(renderAccount).join('')
  } else {
    result = 'Account not found'
  }
  searchResults.innerHTML = result
  addEventListenerForAccountDetails()
}

function renderError(message) {
  console.log(message)
  let searchResults = document.querySelector('#search-results')
  searchResults.innerHTML = message
}

function handleSearchClick(e) {
  let usernameField = document.querySelector('#username')
  toggleSpinner()
  loadUsers(usernameField.value)
  .then(data => renderSearchResult(data))
  .catch(message => renderError(message))
  .then(response => toggleSpinner())
}

function handleUserClick(e) {
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

document.addEventListener('DOMContentLoaded', () => {
  let searchButton = document.querySelector('#search');
  searchButton.addEventListener('click', handleSearchClick);
})
