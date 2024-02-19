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

export const fetchGamesByDeveloper = (developerNames, callback) => {
  const params = { developers: developerNames.join(','), ordering: '-rating', page_size: 10 };
  fetchGames(params, callback);
};

export const displayGamesForDeveloper = (games, developerName, containerId) => {
  const mainContainer = document.getElementById(containerId);
  const developerContainer = document.createElement('div');
  developerContainer.className = 'developer-games-container';

  const developerTitle = document.createElement('h3');
  developerTitle.textContent = developerName;
  developerContainer.appendChild(developerTitle);

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    let starsHtml = '';
    const rating = parseFloat(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHtml += `<span class="star full">★</span>`;
      } else if (i - 1 < rating && i > rating) {
        const percentage = (rating - Math.floor(rating)) * 100;
        starsHtml += generatePartialStar(i, percentage);
      } else {
        starsHtml += `<span class="star empty">★</span>`;
      }
    }
    starsHtml = `<div class="game-stars">${starsHtml}</div>`;

    card.innerHTML = `
      <img src="${game.background_image}" alt="${game.name}" loading="lazy">
      <div class="game-card-content">
        <h3 class="game-title">${game.name}</h3>
        <p class="game-release-date">Release Date: ${game.released}</p>
        ${starsHtml}
      </div>
    `;

    developerContainer.appendChild(card);
  });

  mainContainer.appendChild(developerContainer);
};

