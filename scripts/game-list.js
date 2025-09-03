import { createGameCard } from "./game-card.js";
import { renderNoItems } from "./no-items.js";

const gamesList = document.querySelector('.games-container')


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
