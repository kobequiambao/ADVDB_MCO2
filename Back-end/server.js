const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../Front-end/public')));
app.use(express.json()); // Middleware to parse JSON data

// Route for the homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-end/public', 'index.html'));
});

app.use(cors());

app.get('/node1', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: '1234',
        database: 'steamgames',
        port: 3307 // Node 1
    });

    connection.query('SELECT * FROM games LIMIT 50', (err, results) => {
        if (err) {
            console.error('Error fetching data from Node 1:', err);
            return res.status(500).send('Error fetching data from Node 1');
        }
        console.log('Fetched data from Node 1:', results);
        res.json(results);
    });

    connection.end();
});

// Handle game updates on Node 1
app.post('/node1/update', async (req, res) => {
    const { game_id, name, price } = req.body;
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootpass',
        database: 'steamgames',
        port: 3307 // Node 1
    });

    const query = 'UPDATE games SET name = ?, price = ? WHERE game_id = ?';
    try {
        const [result] = await connection.execute(query, [name, price, game_id]);
        connection.end();

        if (result.affectedRows > 0) {
            res.send('Game updated successfully');
        } else {
            res.send('No game found with the given ID');
        }
    } catch (err) {
        console.error('Error updating game on Node 1:', err);
        res.status(500).send('Error updating game');
    }
});

app.get('/node2', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: '1234',
        database: 'steamgames',
        port: 3308 // Node 2
    });

    connection.query('SELECT * FROM games WHERE price < 10 LIMIT 50', (err, results) => {
        if (err) {
            console.error('Error fetching data from Node 2:', err);
            return res.status(500).send('Error fetching data from Node 2');
        }
        console.log('Fetched data from Node 2:', results);
        res.json(results);
    });

    connection.end();
});

app.get('/node3', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: '1234',
        database: 'steamgames',
        port: 3309 // Node 3
    });

    connection.query('SELECT * FROM games WHERE price >= 10 LIMIT 50', (err, results) => {
        if (err) {
            console.error('Error fetching data from Node 3:', err);
            return res.status(500).send('Error fetching data from Node 3');
        }
        console.log('Fetched data from Node 3:', results);
        res.json(results);
    });

    connection.end();
});

app.post('/add', (req, res) => {
    const { app_id, name, price, about_the_game, windows, mac, linux } = req.body;

    if (!app_id || !name || price === undefined) {
        return res.status(400).json({ message: 'Required fields are missing.' });
    }

    let secondNodePort = price <= 10 ? 3308 : 3309;

    const node1Config = {
        host: 'localhost',
        user: 'root',
        password: '1234', // Fix: password as a string
        database: 'steamgames',
        port: 3307 // Node 1
    };

    const secondNodeConfig = {
        host: 'localhost',
        user: 'root',
        password: '1234', // Fix: password as a string
        database: 'steamgames',
        port: secondNodePort
    };

    const query = `
        INSERT INTO games (app_id, name, price, about_the_game, windows, mac, linux)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [app_id, name, price, about_the_game, windows, mac, linux];

    const executeQuery = (config, callback) => {
        const connection = mysql.createConnection(config);
        connection.query(query, values, (err, results) => {
            callback(err, results);
        });
        connection.end();
    };

    executeQuery(node1Config, (err1) => {
        if (err1) return res.status(500).json({ message: `Error on Node 1: ${err1.message}` });

        executeQuery(secondNodeConfig, (err2) => {
            if (err2) {
                return res.status(500).json({ message: `Error on secondary node: ${err2.message}` });
            }

            res.json({ message: 'Game added successfully to both nodes.' });
        });
    });
});

// Server listening on the specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
