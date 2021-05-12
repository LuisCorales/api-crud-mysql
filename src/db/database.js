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
const connectToDB = db.connect((err) => {
    if(err) {
        throw err;
    }

    console.log("MySQL connected!")
});

// Create DB
const createDB = db.query('CREATE DATABASE IF NOT EXISTS medicaldb', async (err, result) => {
    if(err) {
        console.log(err.message);
    } else if(result.warningCount == 0) {
        console.log("Database 'medicaldb' created!");
    } else {
        console.log("The database 'medicaldb' was not created because it already exists.");
    }
});

// Create Tables
const createTables = () => {
    db.query(patientModel, (err, result) => {
        if(err) {
            console.log(err.message);
        } else if(result.warningCount == 0) {
            console.log("Table 'patient' created!");
        } else {
            console.log("The table 'patient' was not created because it already exists.");
        }
    });

    db.query(hospitalModel, (err, result) => {
        if(err) {
            console.log(err.message);
        } else if(result.warningCount == 0) {
            console.log("Table 'hospital' created!");
        } else {
            console.log("The table 'hospital' was not created because it already exists.");
        }
    });

    db.query(doctorModel, (err, result) => {
        if(err) {
            console.log(err.message);
        } else if(result.warningCount == 0) {
            console.log("Table 'doctor' created!");
        } else {
            console.log("The table 'doctor' was not created because it already exists.");
        }
    });
    

    db.query(appointmentModel, (err, result) => {
        if(err) {
            console.log(err.message);
        } else if(result.warningCount == 0) {
            console.log("Table 'appointment' created!");
        } else {
            console.log("The table 'appointment' was not created because it already exists.");
        }
    });
};

module.exports = {connectToDB, createDB, createTables};