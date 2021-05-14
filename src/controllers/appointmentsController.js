const database = require("../db/database");
const db = database.db;

// All the functions will be executed when a appointments route is called

// To GET appointments route
exports.getAll = (req, res) => {
    let sql = 'SELECT appointment.id, appointment.time, appointment.duration, ' +
    'CONCAT(patient.firstName, " ", patient.surname) AS patientName, patient.pathology, ' +
    'CONCAT(doctor.firstName, " ", doctor.surname) AS doctortName, doctor.speciality, hospital.name AS hospitalName ' +
    'FROM medicaldb.appointment ' + 
    'INNER JOIN medicaldb.patient ' + 
    'ON appointment.patientId = patient.id ' +
    'INNER JOIN medicaldb.doctor ' +
    'ON appointment.doctorId = doctor.id ' +
    'INNER JOIN medicaldb.hospital ' +
    'ON doctor.hospitalId = hospital.id';

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

// To POST appointments route
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

// To GET by id appointments route
exports.getOne = (req, res) => {
    let id = req.params.appointmentId;

    let sql = 'SELECT appointment.id, appointment.time, appointment.duration, ' +
    'CONCAT(patient.firstName, " ", patient.surname) AS patientName, patient.pathology, ' +
    'CONCAT(doctor.firstName, " ", doctor.surname) AS doctortName, doctor.speciality, hospital.name AS hospitalName ' +
    'FROM medicaldb.appointment ' + 
    'INNER JOIN medicaldb.patient ' + 
    'ON appointment.patientId = patient.id ' +
    'INNER JOIN medicaldb.doctor ' +
    'ON appointment.doctorId = doctor.id ' +
    'INNER JOIN medicaldb.hospital ' +
    'ON doctor.hospitalId = hospital.id ' +
    'WHERE appointment.id = ' + id;

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

// To PUT appointments route
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

// To DELETE appointments route
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