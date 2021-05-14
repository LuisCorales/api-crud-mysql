const database = require("../db/database");
const db = database.db;

// All the functions will be executed when a doctors route is called

// To GET doctors route
exports.getAll = (req, res) => {
    let sql = 'SELECT doctor.firstName, doctor.surname, doctor.speciality, ' + 
    'hospital.name AS hospitalName ' + 
    'FROM medicaldb.doctor ' +
    'INNER JOIN medicaldb.hospital ' +
    'ON doctor.hospitalId = hospital.id';

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
};

// To POST doctors route
exports.post = (req, res) => {
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
}; 

// To GET by id doctors route
exports.getOne = (req, res) => {
    let id = req.params.doctorId;

    let sql = 'SELECT doctor.firstName, doctor.surname, doctor.speciality, ' + 
    'hospital.name AS hospitalName ' + 
    'FROM medicaldb.doctor ' +
    'INNER JOIN medicaldb.hospital ' +
    'ON doctor.hospitalId = hospital.id ' +
    'WHERE doctor.id = ' + id;

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
};

// To PUT doctors route
exports.put = (req, res) => {
    let id = req.params.doctorId;
    let doctorData = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        speciality: req.body.speciality,
        hospitalId: req.body.hospitalId
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
};

// To DELETE doctors route
exports.delete = async (req, res) => {
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
};