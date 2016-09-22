import { handleUserClick } from './handlers';

export function renderAccount(account) {
  return `
    <div class="search-results_item js-account" data-id="${account.account_id}">
    ${account.nickname}</div>
  `;
}

export function renderError(message) {
  const searchResults = document.querySelector('#search-results');
  searchResults.innerHTML = message;
}

export function renderUserProfile({ nickname, globalRating, statistics }) {
  const { wins, battles } = statistics.all;
  const winsPercent = ((wins / battles) * 100).toFixed(2);
  return `
    <h1>${nickname}</h1>
    <div>
    <p>Ratings: ${globalRating}</p>
    <p>Battles: ${battles}</p>
    <p>Wins Percent: ${winsPercent} %<p>
    </div>
  `;
}

function addEventListenerForAccountDetails() {
  const searchResultItems = document.querySelectorAll('.js-account');
  for (const item of searchResultItems) {
    item.addEventListener('click', handleUserClick);
  }
}

export function renderSearchResult(accounts) {
  const searchResults = document.querySelector('#search-results');
  let result;
  if (accounts.length !== 0) {
    result = accounts.map(renderAccount).join('');
  } else {
    result = 'Account not found';
  }
  searchResults.innerHTML = result;
  addEventListenerForAccountDetails();
}
