const express = require("express");
const router = express.Router();

const mysql = require("mysql");

// Create connection to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
});

db.connect((err) => {
    if(err) {
        throw err;
    }

    console.log("MySQL connected!")
});

// GET all hospitals
router.get("/", (req, res) => {
    let sql = 'SELECT * FROM medicaldb.hospital';

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /hospitals',
                hospitals: result
            });
            console.log("All hospitals printed!");
        }
    });
});

// POST a new hospital
router.post("/", (req, res) => {
    let hospitalData = {
        name: req.body.name
    }
    let sql = 'INSERT INTO medicaldb.hospital SET ?';

    db.query(sql, hospitalData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'POST request to /hospitals',
                createdHospital: hospitalData
            });
            console.log("A new hospital was inserted!");
        }
    });  
});

// GET a hospital by id
router.get("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;

    let sql = 'SELECT * FROM medicaldb.hospital WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /hospital/' + id,
                hospital: result
            });
            console.log("Printed hospital with id = " + id);
        }
    });
});

// PUT/UPDATE a hospital by id
router.put("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;
    let hospitalData = {
        name: req.body.name
    }

    let sql = 'UPDATE medicaldb.hospital SET ? WHERE id = ' + id;

    db.query(sql, hospitalData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'PUT request to /hospitals/' + id,
                updatedHospital: hospitalData
            });
            console.log("Updated hospital with id = " + id);
        }
    });  
});

// DELETE a hospital
router.delete("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;

    let sql = 'DELETE FROM medicaldb.hospital WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'DELETE request to /hospitals/' + id,
                deletedHospital: result
            });
            console.log("Deleted hospital with id = " + id);
        }
    }); 
});

module.exports = router;