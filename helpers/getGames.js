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
