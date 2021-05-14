const database = require("../db/database");
const db = database.db;

// All the functions will be executed when a patients route is called

// To GET patients route
exports.getAll = (req, res) => {
    let sql = 'SELECT * FROM medicaldb.patient';

    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /patients',
                patients: result
            });
            console.log("All patients printed!");
        }
    });
};

// To POST patients route
exports.post = (req, res) => {
    let patientData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        pathology: req.body.pathology
    }
    let sql = 'INSERT INTO medicaldb.patient SET ?';

    db.query(sql, patientData, (err) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'POST request to /patients',
                createdPatient: patientData
            });
            console.log("A new patient was inserted!");
        }
    });  
}; 

// To GET by id patients route
exports.getOne = (req, res) => {
    let id = req.params.patientId;

    let sql = 'SELECT * FROM medicaldb.patient WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'GET request to /patients/' + id,
                patient: result
            });
            console.log("Printed patient with id = " + id);
        }
    });
};

// To PUT patients route
exports.put = (req, res) => {
    let id = req.params.patientId;
    let patientData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        pathology: req.body.pathology
    }

    let sql = 'UPDATE medicaldb.patient SET ? WHERE id = ' + id;

    db.query(sql, patientData, (err) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'PUT request to /patients/' + id,
                updatedPatient: patientData
            });
            console.log("Updated patient with id = " + id);
        }
    });  
};

// To DELETE patients route
exports.delete = async (req, res) => {
    let id = req.params.patientId;

    let sql = 'DELETE FROM medicaldb.patient WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
            console.log(err.message);
        } else {
            res.status(200).json({
                message: 'DELETE request to /patients/' + id,
                deletedPatient: result
            });
            console.log("Deleted patient with id = " + id);
        }
    }); 
};