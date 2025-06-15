const API_KEY = "e2bdb23016mshf6f501928e1708ap1200e8jsn6aa96772eb24";
const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api";

const api = BASE_URL;

export async function request(method, endpoint) {
  try {
    const response = await fetch(`${api}/${endpoint}`, {
      method,
      headers: {
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in request function:", error.message);
    return null;
  }
}
