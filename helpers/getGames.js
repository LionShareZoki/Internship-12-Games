const apiKey = '464bc085dbbf4f33bcb2ccb39d36a6ec';


export const fetchGames = (params, callback) => {
  const baseUrl = 'https://api.rawg.io/api/games';
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ ...params, key: apiKey }).toString();

  fetch(url)
    .then(response => response.json())
    .then(data => callback(data.results))
    .catch(error => console.error('Error fetching data: ', error));
};

export const fetchTopRatedGames = (callback) => {
  const params = { ordering: '-metacritic', page_size: 20 };
  fetchGames(params, callback);
};

export const fetchSpecificGames = (searchCriterion, callback) => {
  const params = { search: searchCriterion, ordering: '-released', page_size: 10 };
  fetchGames(params, callback);
};

export const fetchTopPlatforms = (callback) => {
  const baseUrl = 'https://api.rawg.io/api/platforms';
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ key: apiKey }).toString();

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const topPlatforms = data.results.sort((a, b) => b.games_count - a.games_count).slice(0, 10);
      callback(topPlatforms);
    })
    .catch(error => console.error('Error fetching platforms: ', error));
};

export const fetchGameById = (gameId, callback) => {
  const baseUrl = `https://api.rawg.io/api/games/${gameId}`;
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ key: apiKey }).toString();

  fetch(url)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching data: ', error));
};

export const fetchGameStores = (gameId, callback) => {
  const baseUrl = `https://api.rawg.io/api/games/${gameId}/stores`;
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ key: apiKey }).toString();

  fetch(url)
    .then(response => response.json())
    .then(data => callback(data.results))
    .catch(error => console.error('Error fetching game stores: ', error));
};


export const fetchGameStoresById = (gameId, callback) => {
  const baseUrl = `https://api.rawg.io/api/games/${gameId}/stores`;
  const url = new URL(baseUrl);
  url.search = new URLSearchParams({ key: apiKey }).toString();

  fetch(url)
      .then(response => response.json())
      .then(data => callback(data.results))
      .catch(error => console.error('Error fetching stores: ', error));
};

export function fetchStoreDetails(storeId, callback) {
  const url = `https://api.rawg.io/api/stores/${storeId.store_id}?key=${apiKey}`;
  fetch(url)
      .then(response => response.json())
      .then(data => {
          callback(data);
      })
      .catch(error => console.error('Error fetching store details:', error));
}

