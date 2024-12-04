// Fetch games from the specified node and display them
async function fetchGames(node) {
    try {
        const response = await fetch(`http://localhost:3000/${node}`);
        const data = await response.json();
        displayGames(node, data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display the fetched games in the corresponding section of the page
function displayGames(node, games) {
    const gamesDiv = document.getElementById(`${node}-games`);
    gamesDiv.innerHTML = `<ul>${games.map(game => `<li>${game.name} - $${game.price}</li>`).join('')}</ul>`;
}

// Handle updating a game on the specified node
async function updateGame(event, node) {
    event.preventDefault();

    // Get the game ID, new price, and new name from the form
    const game_id = document.getElementById(`game_id${node}`).value;
    const price = document.getElementById(`price${node}`).value;
    const name = document.getElementById(`name${node}`).value;

    // Prepare the game data for updating
    const gameData = { game_id, price, name };

    try {
        // Send the update request to the correct node
        const response = await fetch(`http://localhost:3000/${node}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Error updating game:', error);
    }
}

// Attach event listeners to update forms for each node
document.getElementById('node1-update-form').addEventListener('submit', (event) => updateGame(event, 'node1'));
document.getElementById('node2-update-form').addEventListener('submit', (event) => updateGame(event, 'node2'));
document.getElementById('node3-update-form').addEventListener('submit', (event) => updateGame(event, 'node3'));

// Fetch games for Node 1, Node 2, and Node 3 when their respective buttons are clicked
document.getElementById('fetch-node1').addEventListener('click', () => fetchGames('node1'));
document.getElementById('fetch-node2').addEventListener('click', () => fetchGames('node2'));
document.getElementById('fetch-node3').addEventListener('click', () => fetchGames('node3'));

async function addGame(event) {
    event.preventDefault(); // Prevent form submission default behavior

    const app_id = document.getElementById('app_id').value;
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const about_the_game = document.getElementById('about_the_game').value;
    const windows = parseInt(document.getElementById('windows').value);
    const linux = parseInt(document.getElementById('linux').value);
    const mac = parseInt(document.getElementById('mac').value);

    const gameData = { app_id, name, price, about_the_game, windows, linux, mac };

    try {
        const response = await fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData)
        });

        const result = await response.json();
        document.getElementById('output').innerHTML = `
            <p>${result.message}</p>
        `;
    } catch (error) {
        document.getElementById('output').innerHTML = `
            <p style="color: red;">Error adding game: ${error.message}</p>
        `;
    }
}