# JS#2 Game Discovery

## Overview 

This project is focused on asynchronous data fetching to display video game information on a webpage. Utilizing the RAWG Video Games Database API, the task involves retrieving data about video games,
including details about developers, genres, and more. The API endpoint can be accessed at https://api.rawg.io/api with a required API key included in the query string.

## Features

- Fetch Top 20 Games by Metacritic Rating: Implement a feature to fetch the top 20 games sorted by their Metacritic rating. Display these games as cards on the webpage, showing essential details like the game title, image, release date, and Metacritic rating.
- Game Search by Name: Add a prompt for users to search for games by name. Display the top 10 results sorted by release date as cards on the webpage.
- Top Platforms Discovery: Fetch the top 10 gaming platforms based on the number of games available. Then, allow users to select platforms by name to display games available on those platforms, sorted alphabetically.
- Game Details by ID: Implement a feature where users can enter a game ID to retrieve detailed information about the game, including a rating system represented by stars.
- Discover Stores Selling the Game: For a given game ID, display the stores where the game is available, including store details and the number of games available there.
- Developer-Specific Games Display: Fetch the top 10 developers and allow users to select from them to display the top 10 games by rating for each selected developer.
- Games by Release Date Range: Allow users to input a start and end date to fetch games released within that timeframe, sorted by their Metacritic score.
- Games by Metacritic Score Range: Enable users to specify a range of Metacritic scores to fetch games within that range, sorted by score and then by name.
- ESRB Rating Safety Check: Ensure that each displayed game has a non-null ESRB rating and is not marked with a value indicating it is unsafe.


## How to test locally:
1. Clone the repository
2. Run live server
3. Click the buttons one by one to fetch games by different criteriums
