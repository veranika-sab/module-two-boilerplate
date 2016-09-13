import { handleUserClick } from './handlers'
import { loadUsers } from './loaders'
import { toggleSpinner } from './helpers'


export function renderAccount(account) {
  return `
    <div class="search-results_item js-account" data-id="${account.account_id}">
    ${account.nickname}</div>
  `
}

export function renderError(message) {
  let searchResults = document.querySelector('#search-results')
  searchResults.innerHTML = message
}

export function renderUserProfile({nickname, global_rating, statistics}) {
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

export function renderSearchResult(accounts) {
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

function addEventListenerForAccountDetails() {
  let searchResultItems = document.querySelectorAll('.js-account')
  for (let item of searchResultItems) {
    item.addEventListener('click', handleUserClick)
  }
}
