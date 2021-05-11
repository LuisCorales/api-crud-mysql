const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'GET request to /hospitals',
    });
});

router.post("/", (req, res) => {
    let hospital = {
        name: req.body.name,
        
    }

    res.status(200).json({
        message: 'POST request to /hospitals',
        createdHospital: hospital
    });
}); 

router.get("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;

    res.status(200).json({
        message: 'GET request to /hospitals',
        id: id
    });
});

router.put("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;

    res.status(200).json({
        message: 'PUT request to /hospitals',
        id: id
    });
});

router.delete("/:hospitalId", (req, res) => {
    let id = req.params.hospitalId;

    res.status(200).json({
        message: 'DELETE request to /hospitals',
        id: id
    });
});

module.exports = router;