const mysql = require("mysql2");

const connections = {
    node1: mysql.createConnection({ host: "localhost", port: 3307, user: "root", password: "rootpass", database: "steamgames" }),
    node2: mysql.createConnection({ host: "localhost", port: 3308, user: "root", password: "rootpass", database: "steamgames" }),
    node3: mysql.createConnection({ host: "localhost", port: 3309, user: "root", password: "rootpass", database: "steamgames" })
};

module.exports = connections;
