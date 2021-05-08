const express = require("express");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "medicaldb"
});

// Connect to MySQL DB
db.connect((err) => {
    if(err) {
        throw err;
    }

    console.log("MySQL connected!")
});

const app = express();

// Route: Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE medicaldb';
    
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send("Database created!");
    });
});

// Route: Create table
app.get('/createpatienttable', (req, res) => {
    let sql = 'CREATE TABLE Patient ( id int AUTO_INCREMENT, firstName VARCHAR(60), surname VARCHAR(60), pathology VARCHAR(100), PRIMARY KEY(id) )';
    
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('Patient table created!')
    });
});

// 

// Settings -> port = 5500
app.set("port", 5500);
const port = app.set("port");

app.listen(port, () => {
    console.log("The server is running on port:", port);
});