import { fetchGameDetails } from "./api-fetch.js";
import { createGameDetails } from "./game-details.js";

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('id');

  if (gameId) {
    fetchGameDetails(gameId).then(r => createGameDetails(r));
  } else {
    console.error('No game ID found in URL.');
  }
});
