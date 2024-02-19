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
