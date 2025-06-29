import { createGameCard } from "./prepare-game-card.js";
import { loadGamesOfCategory } from "./fetch.js";

const mostPopular = [
  {
        "id": 601,
        "title": "Delta Force",
        "thumbnail": "https://www.freetogame.com/g/601/thumbnail.jpg",
        "short_description": "A free-to-play team-based tactical shooter.",
        "game_url": "https://www.freetogame.com/open/delta-force",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "TiMi Studio Group",
        "developer": "Team Jade",
        "release_date": "2024-12-04",
        "freetogame_profile_url": "https://www.freetogame.com/delta-force"
    },
    {
        "id": 516,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },
    {
        "id": 599,
        "title": "Marvel Rivals",
        "thumbnail": "https://www.freetogame.com/g/599/thumbnail.jpg",
        "short_description": "A free-to-play superhero team shooter from NetEase.",
        "game_url": "https://www.freetogame.com/open/marvel-rivals",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "NetEase",
        "developer": "NetEase",
        "release_date": "2024-12-06",
        "freetogame_profile_url": "https://www.freetogame.com/marvel-rivals"
    },
    {
        "id": 57,
        "title": "Fortnite",
        "thumbnail": "https://www.freetogame.com/g/57/thumbnail.jpg",
        "short_description": "A free-to-play, standalone mode of Epic Game's Fortnite. ",
        "game_url": "https://www.freetogame.com/open/fortnite-battle-royale",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "Epic Games",
        "developer": "Epic Games",
        "release_date": "2017-09-26",
        "freetogame_profile_url": "https://www.freetogame.com/fortnite-battle-royale"
    },
]


const listContainer = document.querySelector('.popular-games');
const gameCardContainer = document.querySelector('.game-card-container');
let activeItem = null;

mostPopular.forEach((game, index) => {
  const li = document.createElement('li');

  li.innerHTML = `
    <div class="img-container">
      <img src="${game.thumbnail}" alt="${game.title}">
    </div>
    <div>
      <span>${game.title}</span>
      <p>${game.release_date}</p>
      <p>${game.platform}</p>
    </div>
  `;

  if (index === 0) {
    li.classList.add('active');
    activeItem = li;
    displayGameDetails(game);
  }

    li.addEventListener('click', () => {
     if (activeItem) {
      activeItem.classList.remove('active');
    }

    li.classList.add('active');
    activeItem = li;

    displayGameDetails(game);
  });

  listContainer.appendChild(li);
});

function displayGameDetails(game) {
  gameCardContainer.innerHTML = '';

  const card = createGameCard(game, true);

  gameCardContainer.appendChild(card);
}


loadGamesOfCategory();
