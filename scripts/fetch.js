import { request } from "./api.js";
import { renderGameList } from "./script.js";
import {createGameDetails} from './prepare-game-details.js'
import { createGameCard } from "./prepare-game-card.js";

//----------- fetch game list -----------
export async function fetchGamesList() {
  try {
    const res = await request("GET", "games");
    renderGameList(res);
    return res;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}


//----------- fetch filtered games -----------
export async function fetchGamesListWithFilter(
  selectedSort = "alphabetical",
  selectedPlatform = "pc",
  selectedCategory = null
) {
    try {
    let endpoint = `games?platform=${selectedPlatform}&sort-by=${selectedSort}`;

    if (selectedCategory) {
      endpoint += `&category=${selectedCategory}`;
    }

    const res = await request("GET", endpoint);

    if (!res || !Array.isArray(res)) {
      throw new Error("Invalid response from API");
    }

    console.log("API Response:", res);
    console.log("Data Length:", res.length);
    console.log("First Item:", res[0]);

    renderGameList(res);
  } catch (error) {
    console.error("Error fetching games:", error.message || error);
  }
}


//------- fetch game details--------
export async function fetchGameDetails(gameId) {
  try {
    const endpoint = `game?id=${gameId}`;
    const res = await request("GET", endpoint);

    createGameDetails(res);
  } catch (error) {
    console.error("Error fetching game details:", error);
  }
}


//----------- get num of games for each category -----------
export async function fetchGamesOfCategory(category){
  try{
    const endpoint =  `games?category=${(category)}`;
    const res = await request("GET", endpoint);

    const expectedRes = res.slice(0, 3);
    createGamesListSnapshot(category, expectedRes);

  }catch(error){
    console.log("Error fetching games for this category", error);
  }
}

const gamesOfCategory = document.querySelector('#games-of-category .container')

function createGamesListSnapshot(category, games){

  const categorySection = document.createElement('section');
  categorySection.id = `category-${category}`;
  categorySection.className = 'category-sec';

  const headSec = document.createElement('div');
  headSec.className = 'head-sec'

  const title = document.createElement('h2');
  title.textContent = category;

  const linkViewMore = document.createElement('a');
  linkViewMore.href = `categories.html?category=${category}`;
  linkViewMore.textContent = 'view more';

  headSec.appendChild(title);
  headSec.appendChild(linkViewMore);
  categorySection.appendChild(headSec);

  const gamesList = document.createElement('div');
  gamesList.className = 'games-list';

  games.forEach(item => {
    const card = createGameCard(item);
    gamesList.appendChild(card);
  });

  categorySection.appendChild(gamesList);
  gamesOfCategory.appendChild(categorySection);
}

const mostPopularCategories = [
  'action',
  'strategy',
  'shooter',
  'sandbox',
  'pvp',
  'survival',
  'anime',
  'open-world',
  'sports',
  'tower-defense',
  'battle-royale',
  'moba',
  'pixel',
  '2d'

]
export function loadGamesOfCategory() {
  mostPopularCategories.forEach(c => {
    fetchGamesOfCategory(c);
  });
}

