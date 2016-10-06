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

export function renderUserProfile({ nickname, global_rating: globalRating, statistics }) {
  const { wins, battles } = statistics.all;
  const winsPercent = ((wins / battles) * 100).toFixed(2);
  return `
    <p style="font-size:50px"><span class="glyphicon glyphicon-user"> ${nickname}<span></p>
    <div>
    <p class="bg-primary">Ratings: ${globalRating}</p>
    <p class="bg-success">Battles: ${battles}</p>
    <p class="bg-info">Wins Percent: ${winsPercent} %<p>
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
