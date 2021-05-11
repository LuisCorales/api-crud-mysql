const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'GET request to /patients',
    });
});

router.post("/", (req, res) => {
    let patient = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        pathology: req.body.pathology
    }

    res.status(200).json({
        message: 'POST request to /patients',
        createdPatient: patient
    });
}); 

router.get("/:patientId", (req, res) => {
    let id = req.params.patientId;

    res.status(200).json({
        message: 'GET request to /patients',
        id: id
    });
});

router.put("/:patientId", (req, res) => {
    let id = req.params.patientId;

    res.status(200).json({
        message: 'PUT request to /patients',
        id: id
    });
});

router.delete("/:patientId", (req, res) => {
    let id = req.params.patientId;

    res.status(200).json({
        message: 'DELETE request to /patients',
        id: id
    });
});

module.exports = router;