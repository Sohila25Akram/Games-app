import { fetchGamesList } from "./fetch.js";
import { createGameCard } from "./prepare-game-card.js";
import { fetchGameDetails } from "./fetch.js";

const gamesList = document.querySelector('.games-container')

fetchGamesList();


export async function renderGameList(res) {
  gamesList.innerHTML = "";

  if (res.length > 0) {
    res.forEach((element) => {
      const card = createGameCard(element);
      gamesList.appendChild(card);
    });
  } else {
    renderNoItems();
  }
}

//--------- no item found -----------
function renderNoItems() {
  gamesList.innerHTML = `<p class='no-items'>No items found</p>`;
}



window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('id');

  if (gameId) {
    fetchGameDetails(gameId);
  } else {
    console.error('No game ID found in URL.');
  }
});
