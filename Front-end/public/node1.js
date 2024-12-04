// Fetch games from Node 1
async function fetchGames() {
    try {
        const response = await fetch('http://localhost:3000/node1');
        const data = await response.json();
        displayGames(data);
    } catch (error) {
        console.error('Error fetching data from Node 1:', error);
    }
}

// Display games in the Node 1 page
function displayGames(games) {
    const gamesList = document.getElementById('games-list');
    gamesList.innerHTML = ''; // Clear any existing games

    games.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = `${game.name} - $${game.price}`;
        gamesList.appendChild(listItem);
    });
}

// Handle the update form submission
document.getElementById('update-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameId = document.getElementById('game-id').value;
    const gameName = document.getElementById('game-name').value;
    const gamePrice = document.getElementById('game-price').value;

    const updatedGame = {
        game_id: gameId,
        name: gameName,
        price: gamePrice
    };

    try {
        const response = await fetch('http://localhost:3000/node1/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGame)
        });

        const result = await response.text();
        alert(result);
        fetchGames(); // Refresh the game list
    } catch (error) {
        console.error('Error updating game on Node 1:', error);
    }
});

// Fetch games when the page loads
window.onload = fetchGames;
