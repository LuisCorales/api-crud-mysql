const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'GET request to /appointments',
    });
});

router.post("/", (req, res) => {
    let appointment = {
        name: req.body.name,
        
    }

    res.status(200).json({
        message: 'POST request to /appointments',
        createdHospital: appointment
    });
}); 

router.get("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;

    res.status(200).json({
        message: 'GET request to /appointments',
        id: id
    });
});

router.put("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;

    res.status(200).json({
        message: 'PUT request to /appointments',
        id: id
    });
});

router.delete("/:appointmentId", (req, res) => {
    let id = req.params.appointmentId;

    res.status(200).json({
        message: 'DELETE request to /appointments',
        id: id
    });
});

module.exports = router;