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

// GET all appointments
router.get("/", (req, res) => {
    let sql = 'SELECT * FROM medicaldb.appointment';

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /appointments',
                appointments: result
            });
            console.log("All appointments printed!");
        }
    });
});

// POST a new appointment
router.post("/", (req, res) => {
    let appointmentData = {
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        time: req.body.time,
        duration: req.body.duration
    }
    let sql = 'INSERT INTO medicaldb.appointment SET ?';

    db.query(sql, appointmentData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'POST request to /appointments',
                createdAppointment: appointmentData
            });
            console.log("A new appointment was inserted!");
        }
    });  
}); 

// GET an appointment by id
router.get("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;

    let sql = 'SELECT * FROM medicaldb.appointment WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /appointments/' + id,
                appointment: result
            });
            console.log("Printed appointment with id = " + id);
        }
    });
});

// PUT/UPDATE an appointment by id
router.put("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;
    let appointmentData = {
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        time: req.body.time,
        duration: req.body.duration
    }

    let sql = 'UPDATE medicaldb.appointment SET ? WHERE id = ' + id;

    db.query(sql, appointmentData, (err) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'PUT request to /appointments/' + id,
                updatedAppointment: appointmentData
            });
            console.log("Updated appointment with id = " + id);
        }
    });  
});

// DELETE an appointment
router.delete("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;

    let sql = 'DELETE FROM medicaldb.appointment WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'DELETE request to /appointments/' + id,
                deletedAppointment: result
            });
            console.log("Deleted appointment with id = " + id);
        }
    }); 
});

module.exports = router;