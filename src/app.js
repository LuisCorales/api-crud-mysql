// Create express application
const express = require("express");
const app = express();

// Database
const {connectToDB, createDB, createTables} = require("./db/database");
connectToDB;
createDB;
createTables();

// Get the routes of each table
const patientsRoutes = require("./routes/patients");
const doctorsRoutes = require("./routes/doctors");
const hospitalsRoutes = require("./routes/hospitals");
const appointmentsRoutes = require("./routes/appointments");

// Settings -> port = 5500
app.set("port", 5500);
const port = app.set("port");

// Configures express to read and write JSON
app.use(express.json());

// Handle each route
app.use("/patients", patientsRoutes);
app.use("/doctors", doctorsRoutes);
app.use("/hospitals", hospitalsRoutes);
app.use("/appointments", appointmentsRoutes)

// If not fitting route was found, then display error
app.use((req, res, next) => {
    let error = new Error("Type of request not found");

    error.status = 404;
    // Forward this error
    next(error);
});

// Get the forwarded error or any other
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Set up and run the API server
app.listen(port, () => {
    console.log("The server is running on port:", port);
});

