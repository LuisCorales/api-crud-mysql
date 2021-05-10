const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'GET request to /doctors',
    });
});

router.post("/", (req, res) => {
    let doctor = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        speciality: req.body.speciality
    }

    res.status(200).json({
        message: 'POST request to /doctors',
        createdDoctor: doctor
    });
}); 

router.get("/:doctorId", (req, res) => {
    let id = req.params.doctorId;

    res.status(200).json({
        message: 'GET request to /doctors',
        id: id
    });
});

router.patch("/:doctorId", (req, res) => {
    let id = req.params.doctorId;

    res.status(200).json({
        message: 'PATCH request to /doctors',
        id: id
    });
});

router.delete("/:doctorId", (req, res) => {
    let id = req.params.doctorId;

    res.status(200).json({
        message: 'DELETE request to /doctors',
        id: id
    });
});

module.exports = router;