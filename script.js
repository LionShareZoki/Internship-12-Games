import { fetchTopRatedGames, fetchSpecificGames, fetchTopPlatforms, fetchGames, fetchGameById, fetchGameStoresById, fetchStoreDetails, fetchGamesByDeveloper, displayGamesForDeveloper, fetchGamesWithinDateRange } from './helpers/getGames.js';

const displayGames = (games, containerId) => {
  const backupImageUrl = "https://files.oaiusercontent.com/file-r98Ct0j3jBPilBgSpPv3tLxO?se=2024-02-19T17%3A01%3A56Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D6d28da3d-c0a7-40f6-8c9a-327edbdbc16d.webp&sig=mTNCW/LAGkoUypsmdY2t0Iir9SoPKI4%2B/RSYRRG2b2s%3D"
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    let starsHtml = '';
    if (games.length === 1) {
      const rating = parseFloat(game.rating);
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          starsHtml += `<span class="star full">★</span>`;
        } else if (i - 1 < rating && i > rating) {
          const percentage = (rating - Math.floor(rating)) * 100;
          starsHtml += generatePartialStar(i, percentage);
          continue;
        } else {
          starsHtml += `<span class="star empty">★</span>`;
        }
      }
      starsHtml = `<div class="game-stars">${starsHtml}</div>`;
    } else {
      starsHtml = `<div class="game-rating">Rating: ${game.rating}</div>`;
    }

    card.innerHTML = `
        <img src="${game.background_image || backupImageUrl}" alt="${game.name}" loading="lazy">
        <div class="game-card-content">
            <h3 class="game-title">${game.name}</h3>
            <p class="game-release-date">Release Date: ${game.released}</p>
            ${starsHtml}
        </div>
    `;
    container.appendChild(card);
  });
};

export function generatePartialStar(index, percentage) {
  return `<svg height="17" width="17" viewbox="0 0 25 25" class="star">
      <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="${percentage}%" stop-color="gold" />
              <stop offset="${percentage}%" stop-color="grey" />
          </linearGradient>
      </defs>
      <polygon points="12.5,0 16.0,8.0 25,9.1 18.5,15.0 20,24 12.5,19.8 5,24 6.5,15.0 0,9.1 8.9,8.0" style="fill:url(#grad${index}); stroke:gold; stroke-width:0.5"/>
  </svg>`;
}

const loadGamesByDevelopers = () => {
  const developerNamesInput = prompt("Enter developer names separated by commas:");
  if (developerNamesInput) {
    const developerNames = developerNamesInput.split(',').map(name => name.trim());
    developerNames.forEach(developerName => {
      fetchGamesByDeveloper([developerName], games => {
        displayGamesForDeveloper(games, developerName, 'developer-games-container');
      });
    });
  }
};

const promptForDatesAndFetchGames = () => {
  let startDate = prompt("Enter the start date (YYYY-MM-DD):");
  let endDate = prompt("Enter the end date (YYYY-MM-DD):");

  while (!isValidDate(startDate) || !isValidDate(endDate) || new Date(startDate) > new Date(endDate)) {
    alert("Invalid dates entered. Please enter valid start and end dates.");
    startDate = prompt("Enter the start date (YYYY-MM-DD):");
    endDate = prompt("Enter the end date (YYYY-MM-DD):");
  }

  fetchGamesWithinDateRange(startDate, endDate, games => {
    const sortedGames = games.sort((a, b) => b.rating - a.rating);
    displayGames(sortedGames, 'games-container-by-date');
  });
};

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateString.match(regex) === null) {
    return false;
  }
  const date = new Date(dateString);
  const timestamp = date.getTime();
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }
  return date.toISOString().startsWith(dateString);
};

const promptForMetacriticScoresAndFetchGames = () => {
  let minScore = prompt("Enter the minimum Metacritic score (0-100):");
  let maxScore = prompt("Enter the maximum Metacritic score (0-100):");

  while (!isValidScore(minScore) || !isValidScore(maxScore) || parseInt(minScore) > parseInt(maxScore)) {
    alert("Invalid scores entered. The minimum score must be less than or equal to the maximum score, and both must be between 0 and 100.");
    minScore = prompt("Enter the minimum Metacritic score (0-100):");
    maxScore = prompt("Enter the maximum Metacritic score (0-100):");
  }

  const params = {
    metacritic: `${minScore},${maxScore}`,
    ordering: '-metacritic,name',
    page_size: 20
  };
  fetchGames(params, games => displayGames(games, 'games-container-by-score'));
};

const isValidScore = (score) => {
  return score !== null && score >= 0 && score <= 100 && !isNaN(score);
};

document.addEventListener('DOMContentLoaded', () => {
  fetchTopRatedGames(games => displayGames(games, 'games-container'));
  document.getElementById('load-specific-games').addEventListener('click', loadSpecificGames);
  document.getElementById('load-games-by-platforms').addEventListener('click', loadGamesByPlatforms);
  document.getElementById('load-game-by-id').addEventListener('click', loadGameById);
  document.getElementById('load-game-stores').addEventListener('click', () => {
    const gameId = prompt("Enter the game ID to see details and available stores:");
    if (gameId) {
      loadGameDetailsAndStores(gameId);
    }
  });
  document.getElementById('load-game-by-developers').addEventListener('click', loadGamesByDevelopers);
  document.getElementById('load-games-by-date').addEventListener('click', promptForDatesAndFetchGames);
  document.getElementById('load-games-by-metacritic').addEventListener('click', promptForMetacriticScoresAndFetchGames);

});

const loadSpecificGames = () => {
  const searchCriterion = prompt("Enter a keyword to search for games:");
  if (searchCriterion) {
    fetchSpecificGames(searchCriterion, games => displayGames(games, 'specific-games-container'));
  }
};

const loadGamesByPlatforms = () => {
  fetchTopPlatforms(platforms => {
    const platformNames = platforms.map(platform => platform.name).join(', ');
    const userPlatformsInput = prompt("Enter platform names separated by commas (Available: " + platformNames + "):");
    const userPlatforms = userPlatformsInput.split(',').map(name => name.trim());

    const platformIds = platforms.filter(platform => userPlatforms.includes(platform.name)).map(platform => platform.id);

    if (platformIds.length > 0) {
      const params = { platforms: platformIds.join(','), ordering: 'name', page_size: 20 };
      fetchGames(params, games => displayGames(games, 'platform-games-container'));
    } else {
      alert('No valid platforms entered. Please try again.');
    }
  });
};

const loadGameById = () => {
  const gameId = prompt("Enter the game ID:");
  if (gameId) {
    fetchGameById(gameId, game => displayGames([game], 'game-by-id-container'));
  }
};

const displayStores = (stores, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  stores.forEach(store => {
    const card = document.createElement('div');
    card.className = 'store-card';

    card.innerHTML = `
      <div class="store-card-content">
          <img src="${store.image_background || 'placeholder-image-url.jpg'}" alt="${store.name}" class="store-image">
          <h3 class="store-name">${store.name}</h3>
          <p>Number of Games: ${store.games_count || 'N/A'}</p>
      </div>
    `;
    container.appendChild(card);
  });
};

const displayStore = (store, containerId) => {
  const container = document.getElementById(containerId);
  const card = document.createElement('div');
  card.className = 'store-card';
  console.log(store)

  card.innerHTML = `
    <div class="store-card-content">
      <img class="store-image" src="${store.image_background || 'placeholder-image-url.jpg'}" alt="Store image" class="store-image">
      <h3 class="store-name">${store.name}</h3>
      <p>Number of Games: ${store.games_count || 'N/A'}</p>
    </div>
  `;
  container.appendChild(card);
};



const loadGameDetailsAndStores = (gameId) => {
  fetchGameById(gameId, game => {
    displayGames([game], 'game-by-id-container2');
  });

  fetchGameStoresById(gameId, stores => {
    stores.forEach(storeId => {
      fetchStoreDetails(storeId, storeDetails => {
        displayStore(storeDetails, 'game-stores-container');
      });
    });
  });
};

  fetchGameStoresById(gameId, stores => {
    displayStores(stores, 'game-stores-container');
  });

