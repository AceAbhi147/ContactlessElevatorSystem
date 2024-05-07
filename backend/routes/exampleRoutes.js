const express = require('express');
const router = express.Router();
const ExampleModel = require('../models/exampleModel');

router.get('/get', async (req, res) => {
    try {
        const examples = await ExampleModel.find();
        console.log("Done fetching data from DB!");
        res.status(200).json(examples);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/health', async (req, res) => {
    res.status(200).json({ message: "Backend is up!" })
});

module.exports = router;
