const express = require('express');
const router = express.Router();
const ExampleModel = require('../models/exampleModel');

router.get('/health', async (req, res) => {
    res.status(200).json({ message: "Backend is up!" })
});

module.exports = router;
