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

// GET all doctors
router.get("/", (req, res) => {
    let sql = 'SELECT * FROM medicaldb.doctor';

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /doctors',
                doctor: result
            });
            console.log("All doctors printed!");
        }
    });
});

// POST a new doctor
router.post("/", (req, res) => {
    let doctorData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        speciality: req.body.speciality,
        hospitalId: req.body.hospitalId
    }
    let sql = 'INSERT INTO medicaldb.doctor SET ?';

    db.query(sql, doctorData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'POST request to /doctors',
                createdDoctor: doctorData
            });
            console.log("A new doctor was inserted!");
        }
    });  
}); 

// GET a doctor by id
router.get("/:doctorId", (req, res) => {
    let id = req.params.doctorId;

    let sql = 'SELECT * FROM medicaldb.doctor WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /doctors/' + id,
                doctor: result
            });
            console.log("Printed doctor with id = " + id);
        }
    });
});

// PUT/UPDATE a doctor by id
router.put("/:doctorId", (req, res) => {
    let id = req.params.doctorId;
    let doctorData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        speciality: req.body.speciality,
        hospital: req.body.hospitalId
    }

    let sql = 'UPDATE medicaldb.doctor SET ? WHERE id = ' + id;

    db.query(sql, doctorData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'PUT request to /doctors/' + id,
                updatedDoctor: doctorData
            });
            console.log("Updated doctor with id = " + id);
        }
    });  
});

// DELETE a doctor
router.delete("/:doctorId", (req, res) => {
    let id = req.params.doctorId;

    let sql = 'DELETE FROM medicaldb.doctor WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'DELETE request to /doctors/' + id,
                deletedDoctor: result
            });
            console.log("Deleted doctor with id = " + id);
        }
    }); 
});

module.exports = router;