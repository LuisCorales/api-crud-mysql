const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const database = require("../db/database");
const db = database.db;

// Asign doctor by speciality
const asingDoctor = (pathology) => {
    var speciality;

    switch (pathology.toLowerCase()) {
        case "cancer":
            speciality = "Oncology";
            break;

        case "leukemia" || "anemia" || "hemophilia":
            speciality = "Hematology";
            break;
        
        case "hypertension" || "heart attack":
        speciality = "Cardiology";
            break;
    
        default:
            speciality = "General";
            break;
    }

    return speciality;
};

// Check if the duration of the appointment is correct
const checkDuration = (startTime, endTime) => {
    let difference = moment.utc(moment(endTime,"YYYY-MM-dd HH:mm:ss").diff(moment(startTime,"YYYY-MM-dd HH:mm:ss"))).format("HH:mm:ss");
    
    let format = "HH:mm:ss",
    differ = moment(difference, format),
    fifteenMin = moment("00:14:00", format), 
    oneHour = moment("01:01:00", format);

    if(differ.isBetween(fifteenMin,oneHour)) {
        // Duration is correct
        var durationMessage = "Duration is less or equal to 1 hour, more or equal to 15 minutes!";
        return [true, durationMessage];
    } else {
        // Duration is incorrect
        var durationMessage = "Duration must be between 15 minutes and 1 hour...";
        return [false, durationMessage];
    }
};

// Check if date overlaps another date from the same doctor
const checkIfOverlap = (startTimeNew, endTimeNew, otherDates) => {
    if(otherDates.length == 0) {   
        var overlapMessage = "There are no appointments yet!";
        return [false, overlapMessage];
    }

    let startTime = moment.utc(moment(startTimeNew).format());
    let endTime = moment.utc(moment(endTimeNew).format());

    // For each appointment with the same doctor, check dates
    for (let i = 0; i < otherDates.length; i++) {
        let dateStart = moment.utc(moment(otherDates[i].startTime).format());
        let dateEnd = moment.utc(moment(otherDates[i].endTime).format());

        var range1 = moment().range(dateStart, dateEnd);
        var range2 = moment().range(startTime, endTime);

        if(range1.contains(startTime) && range1.contains(endTime) || (range2.contains(dateStart) || range2.contains(dateEnd))) {
            // Overlap
            var overlapMessage = "There are dates overlapping...";
            console.log(overlapMessage);
            return [true, overlapMessage];
        }
    }

    var overlapMessage = "There are no overlapping dates!";
    return [false, overlapMessage];
};

// All the functions will be executed when a appointments route is called

// To GET appointments route
exports.getAll = (req, res) => {
    let sql = 'SELECT appointment.id, appointment.startTime, appointment.endTime, ' +
    'CONCAT(patient.firstName, " ", patient.surname) AS patientName, patient.pathology, ' +
    'CONCAT(doctor.firstName, " ", doctor.surname) AS doctorName, doctor.speciality, hospital.name AS hospitalName ' +
    'FROM medicaldb.appointment ' + 
    'INNER JOIN medicaldb.patient ' + 
    'ON appointment.patientId = patient.id ' +
    'INNER JOIN medicaldb.doctor ' +
    'ON appointment.doctorId = doctor.id ' +
    'INNER JOIN medicaldb.hospital ' +
    'ON doctor.hospitalId = hospital.id';

    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
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
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }

    let sql = "SELECT patient.pathology " +
    "FROM medicaldb.patient " + 
    "WHERE patient.id = " + appointmentData.patientId;

    try {
        checkDurationValues = checkDuration(appointmentData.startTime, appointmentData.endTime);

        if(checkDurationValues[0] == false){
            // If duration is incorrect
            throw error = new Error(checkDurationValues[1]);
        }

        // If duration is correct, continues
        console.log(checkDurationValues[1]);

        // Get the patient pathology
        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            }

            // Get the correct speciality
            speciality = asingDoctor(result[0].pathology);

            sql = "SELECT doctor.id " +
            "FROM medicaldb.doctor " + 
            "WHERE doctor.speciality = '" + speciality + "'";

            // Get the correct doctor according to the speciality
            db.query(sql, (err, result) => {
                if(err) {
                    throw err;
                }

                sql = "SELECT appointment.startTime, appointment.endTime " + 
                "FROM medicaldb.appointment " + 
                "WHERE appointment.doctorId = " + result[0].id;

                db.query(sql, (err, dateResult) => {
                    if(err) {
                        throw err;
                    }

                    let overlapping = checkIfOverlap(appointmentData.startTime, appointmentData.endTime, dateResult);

                    if(overlapping[0] == false) {
                        // If it doesn't overlap
                        let data = {
                            patientId: appointmentData.patientId,
                            doctorId: result[0].id,
                            startTime: appointmentData.startTime,
                            endTime: appointmentData.endTime
                        }

                        sql = 'INSERT INTO medicaldb.appointment SET ?';

                        // Insert the data
                        db.query(sql, data, (err) => {
                            if(err) {
                                throw err;
                            }

                            res.status(200).json({
                                message: 'POST request to /appointments',
                                createdAppointment: data
                            });
                            console.log("A new appointment was inserted!");
                        });

                        console.log(overlapping[1]);
                    } else {                         
                        // If it overlaps
                        res.status(401).json({
                            message: 'The date you input is overlapping with another...',
                            yourDate: appointmentData.startTime + " till " + appointmentData.endTime,
                            doctorDates: dateResult
                        });

                        console.log(overlapping[1]);
                    }
                });
            });
        });
    } catch(e) {
        res.status(404).json({
            message: 'There was a problem...',
            error: e.message
        });
        console.log(e.message);
    }
};

// To GET by id appointments route
exports.getOne = (req, res) => {
    let id = req.params.appointmentId;

    let sql = 'SELECT appointment.id, appointment.startTime, appointment.endTime, ' +
    'CONCAT(patient.firstName, " ", patient.surname) AS patientName, patient.pathology, ' +
    'CONCAT(doctor.firstName, " ", doctor.surname) AS doctorName, doctor.speciality, hospital.name AS hospitalName ' +
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
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
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
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }

    let sql = "SELECT patient.pathology " +
    "FROM medicaldb.patient " + 
    "WHERE patient.id = " + appointmentData.patientId;

    try {
        checkDurationValues = checkDuration(appointmentData.startTime, appointmentData.endTime);

        if(checkDurationValues[0] == false){
            // If duration is incorrect
            throw error = new Error(checkDurationValues[1]);
        }

        // If duration is correct, continues
        console.log(checkDurationValues[1]);

        // Get the patient pathology
        db.query(sql, (err, result) => {
            if(err) {
                throw err;
            }

            // Get the correct speciality
            speciality = asingDoctor(result[0].pathology);

            sql = "SELECT doctor.id " +
            "FROM medicaldb.doctor " + 
            "WHERE doctor.speciality = '" + speciality + "'";

            // Get the correct doctor according to the speciality
            db.query(sql, (err, result) => {
                if(err) {
                    throw err;
                }

                sql = "SELECT appointment.startTime, appointment.endTime " + 
                "FROM medicaldb.appointment " + 
                "WHERE appointment.doctorId = " + result[0].id;

                db.query(sql, (err, dateResult) => {
                    if(err) {
                        throw err;
                    }

                    let overlapping = checkIfOverlap(appointmentData.startTime, appointmentData.endTime, dateResult);

                    if(overlapping[0] == false) {
                        // If it doesn't overlap
                        let data = {
                            patientId: appointmentData.patientId,
                            doctorId: result[0].id,
                            startTime: appointmentData.startTime,
                            endTime: appointmentData.endTime
                        }

                        sql = 'UPDATE medicaldb.appointment SET ? WHERE id = ' + id;

                        // Insert the data
                        db.query(sql, data, (err) => {
                            if(err) {
                                throw err;
                            }

                            res.status(200).json({
                                message: 'PUT request to /appointments/' + id,
                                updatedAppointment: data
                            });
                            console.log("Updated appointment with id = " + id);
                        });

                        console.log(overlapping[1]);
                    } else {                         
                        // If it overlaps
                        res.status(401).json({
                            message: 'The date you input is overlapping with another...',
                            yourDate: appointmentData.startTime + " till " + appointmentData.endTime,
                            doctorDates: dateResult
                        });

                        console.log(overlapping[1]);
                    }
                });
            });
        });
    } catch(e) {
        res.status(404).json({
            message: 'There was a problem...',
            error: e.message
        });
        console.log(e.message);
    } 
};

// To DELETE appointments route
exports.delete = (req, res) => {
    let id = req.params.appointmentId;

    let sql = 'DELETE FROM medicaldb.appointment WHERE id = ' + id;

    db.query(sql, (err, result) => {
        if(err) {
            res.status(404).json({
                message: 'There was a problem...',
                error: err.message
            });
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