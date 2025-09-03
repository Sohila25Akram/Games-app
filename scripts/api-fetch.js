import { request } from "./api.js";

//----------- fetch game list -----------
export async function fetchGamesList() {
  try {
    const res = await request("GET", "games");
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

    return res;
  } catch (error) {
    console.error("Error fetching games:", error.message || error);
  }
}


//------- fetch game details--------
export async function fetchGameDetails(gameId) {
  try {
    const endpoint = `game?id=${gameId}`;
    const res = await request("GET", endpoint);

    return res;
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
    return {category, expectedRes};

  }catch(error){
    console.log("Error fetching games for this category", error);
  }
}
