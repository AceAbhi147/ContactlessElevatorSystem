const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/simulation', async (req, res) => {
    console.log("Starting elevator Simulator");
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'elevator.html'));
});

router.get('/sketch.js', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'sketch.js'));
});

router.get('/assets/ding.wav', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'assets/ding.wav'));
});

module.exports = router;
