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

// GET all patients
router.get("/", (req, res) => {
    let sql = 'SELECT * FROM medicaldb.patient';

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /patients',
                patients: result
            });
            console.log("All patients printed!");
        }
    });
});

// POST a new patient
router.post("/", (req, res) => {
    let patientData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        pathology: req.body.pathology
    }
    let sql = 'INSERT INTO medicaldb.patient SET ?';

    db.query(sql, patientData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'POST request to /patients',
                createdPatient: patientData
            });
            console.log("A new patient was inserted!");
        }
    });  
}); 

// GET a patient by id
router.get("/:patientId", (req, res) => {
    let id = req.params.patientId;

    let sql = 'SELECT * FROM medicaldb.patient WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /patients/' + id,
                patient: result
            });
            console.log("Printed patient with id = " + id);
        }
    });
});

// PUT/UPDATE a patient by id
router.put("/:patientId", (req, res) => {
    let id = req.params.patientId;
    let patientData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        pathology: req.body.pathology
    }

    let sql = 'UPDATE medicaldb.patient SET ? WHERE id = ' + id;

    db.query(sql, patientData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'PUT request to /patients/' + id,
                updatedPatient: patientData
            });
            console.log("Updated patient with id = " + id);
        }
    });  
});

// DELETE a patient
router.delete("/:patientId", (req, res) => {
    let id = req.params.patientId;

    let sql = 'DELETE FROM medicaldb.patient WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'DELETE request to /patients/' + id,
                deletedPatient: result
            });
            console.log("Deleted patient with id = " + id);
        }
    }); 
});

module.exports = router;