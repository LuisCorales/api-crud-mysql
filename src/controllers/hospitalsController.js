const database = require("../db/database");
const db = database.db;

// All the functions will be executed when a hospitals route is called

// To GET hospitals route
exports.getAll = (req, res) => {
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
};

// To POST hospitals route
exports.post = (req, res) => {
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
}; 

// To GET by id hospitals route
exports.getOne = (req, res) => {
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
};

// To PUT hospitals route
exports.put = (req, res) => {
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
};

// To DELETE hospitals route
exports.delete = async (req, res) => {
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
};