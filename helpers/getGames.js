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
