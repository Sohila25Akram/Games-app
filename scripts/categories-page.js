import { fetchGamesListWithFilter } from "./api-fetch.js";
import { renderGameList } from "./game-list.js";

let selectedSort = 'relevance'
let selectedPlatform = 'pc'
let selectedCategory = null

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const gamesCategory = params.get('category');

  if (gamesCategory) {
    selectedCategory = gamesCategory
  } else {
    console.error('No category found in URL.');
  }
  
  fetchGamesListWithFilter(selectedSort, selectedPlatform, selectedCategory).then(r => renderGameList(r));
});
