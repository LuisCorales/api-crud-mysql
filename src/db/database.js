// Get models
const patientModel = require("./models/patient");
const doctorModel = require("./models/doctor");
const hospitalModel = require("./models/hospital");
const appointmentModel = require("./models/appointment");

const mysql = require("mysql");

// Create connection to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
});

// Connect to MySQL
const connectToDB = () => {
    try {
        db.connect((err) => {
            if(err) {
                throw err;
            }
            console.log("MySQL connected!")
        });
    } catch(e) {
        console.log("ERROR AT CONNECTING DB:", e.message);
    }
};

// Create DB
const createDB = () => {
    try {
        db.query('CREATE DATABASE IF NOT EXISTS medicaldb', (err, result) => {
            if(err) {
                throw err;
            }
            
            if(result.warningCount == 0) {
                console.log("Database 'medicaldb' created!");
            } else {
                console.log("The database 'medicaldb' was not created because it already exists.");
            }
        });
    } catch(e) {
        console.log("ERROR AT CREATING DB:",err.message);
    }
};

// Create Tables
const createTables = () => {
    try {
        db.query(patientModel, (err, result) => {
            if(err) {
                throw err;
            } 
            
            if(result.warningCount == 0) {
                console.log("Table 'patient' created!");
            } else {
                console.log("The table 'patient' was not created because it already exists.");
            }
        });
    
        db.query(hospitalModel, (err, result) => {
            if(err) {
                throw err;
            } 
            
            if(result.warningCount == 0) {
                console.log("Table 'hospital' created!");
            } else {
                console.log("The table 'hospital' was not created because it already exists.");
            }
        });
    
        db.query(doctorModel, (err, result) => {
            if(err) {
                throw err;
            } 
            
            if(result.warningCount == 0) {
                console.log("Table 'doctor' created!");
            } else {
                console.log("The table 'doctor' was not created because it already exists.");
            }
        });
        
    
        db.query(appointmentModel, (err, result) => {
            if(err) {
                throw err;
            } 
            
            if(result.warningCount == 0) {
                console.log("Table 'appointment' created!");
            } else {
                console.log("The table 'appointment' was not created because it already exists.");
            }
        });
    } catch(e) {
        console.log("ERROR AT CREATING TABLES:", e.message);
    }
};

module.exports = {connectToDB, createDB, createTables, db};