const database = require("../db/database");
const db = database.db;

// All the functions will be executed when a route is called

// To GET route
exports.getAll = (req, res) => {
    res.send
    
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
};

// To POST route
exports.post = (req, res) => {
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
};

// To GET by id route
exports.getOne = (req, res) => {
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
};

// To PUT route
exports.put = (req, res) => {
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
};

// To DELETE route
exports.delete = (req, res) => {
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
};