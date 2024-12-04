const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Example: Get all games
router.get("/games", (req, res) => {
    db.node1.query("SELECT * FROM games", (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

module.exports = router;
