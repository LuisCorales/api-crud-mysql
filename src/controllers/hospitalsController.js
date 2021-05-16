const database = require("../db/database");
const db = database.db;

// If there is an error, send to response
const sendError = (res, e) => {
    return res.status(404).json({
        message: 'There was a problem...',
        error: e.message
    });
};

// All the functions will be executed when a hospitals route is called

// To GET hospitals route
exports.getAll = (req, res) => {
    try {
        let sql = 'SELECT * FROM medicaldb.hospital';

        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            } 

            return res.status(200).json({
                message: 'GET request to /hospitals',
                hospitals: result
            });
        });
    } catch(e) {
        sendError(res, e);
    }
};

// To POST hospitals route
exports.post = (req, res) => {
    try {
        if(req.body.name == null)
        {
            throw new Error("name cannot be NULL");
        }

        let hospitalData = {
            name: req.body.name
        }

        let sql = 'INSERT INTO medicaldb.hospital SET ?';

        db.query(sql, hospitalData, (err) => {
            if(err) {
                throw err;
            } 

            return res.status(200).json({
                message: 'POST request to /hospitals',
                createdHospital: hospitalData
            });
        }); 
    } catch(e) {
        sendError(res, e);
    }
}; 

// To GET by id hospitals route
exports.getOne = (req, res) => {
    try {
        if(isNaN(req.params.hospitalId))
        {
            throw new Error("The id must be a number")
        }

        let id = req.params.hospitalId;

        let sql = 'SELECT * FROM medicaldb.hospital WHERE id = ' + id;

        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            } 
            
            res.status(200).json({
                message: 'GET request to /hospital/' + id,
                hospital: result
            });
        });
    } catch(e) {
        sendError(res, e);
    }
};

// To PUT hospitals route
exports.put = (req, res) => {
    try {
        if(isNaN(req.params.hospitalId))
        {
            throw new Error("The id must be a number")
        }

        if(req.body.name == null)
        {
            throw new Error("name cannot be NULL");
        }

        let id = req.params.hospitalId;

        let hospitalData = {
            name: req.body.name
        }

        let sql = 'UPDATE medicaldb.hospital SET ? WHERE id = ' + id;

        db.query(sql, hospitalData, (err) => {
            if(err) {
                throw err;
            } 
            
            return res.status(200).json({
                message: 'PUT request to /hospitals/' + id,
                updatedHospital: hospitalData
            });
        }); 
    } catch(e) {
        sendError(res, e);
    }
};

// To DELETE hospitals route
exports.delete = async (req, res) => {
    try {
        if(isNaN(req.params.hospitalId))
        {
            throw new Error("The id must be a number")
        }

        let id = req.params.hospitalId;

        let sql = 'DELETE FROM medicaldb.hospital WHERE id = ' + id;

        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            } 
            
            return res.status(200).json({
                message: 'DELETE request to /hospitals/' + id,
                deletedHospital: result
            });
        }); 
    } catch(e) {
        sendError(res, err);
    }
};