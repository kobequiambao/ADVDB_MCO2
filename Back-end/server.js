const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, '../Front-end/public')));

// Routes for nodes
app.get('/node1', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: 1234,
        database: 'steamgames',
        port: 3307 // Node 1
    });
    connection.query('SELECT * FROM games LIMIT 10', (err, results) => {
        if (err) res.status(500).send(err.message);
        else res.json(results);
    });
    connection.end();
});

app.get('/node2', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: 1234,
        database: 'steamgames',
        port: 3308 // Node 2
    });
    connection.query('SELECT * FROM games WHERE price < 10', (err, results) => {
        if (err) res.status(500).send(err.message);
        else res.json(results);
    });
    connection.end();
});

app.get('/node3', async (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
//      password: 'rootpass',
        password: 1234,
        database: 'steamgames',
        port: 3309 // Node 3
    });
    connection.query('SELECT * FROM games WHERE price >= 10', (err, results) => {
        if (err) res.status(500).send(err.message);
        else res.json(results);
    });
    connection.end();
});

// Default route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
