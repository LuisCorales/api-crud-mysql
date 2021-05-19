// Database
const { connectToDB, createDB, createTables } = require("./db/database");
connectToDB();
createDB();
createTables();

// Create express application
const express = require("express");
const app = express();
app.use(express.json());

// Settings -> port = 5500
app.set("port", 5500);
const port = app.set("port");

// Handle each route
const router = require('./routes');
app.use('/', router);

// If not fitting route was found, then display error
app.use((req, res) => {
    return res.status(500).json({
        error: "Type of request not found: " + req.url
    });
});

// Set up and run the API server
app.listen(port, () => {
    console.log("The server is running on port:", port);
});
