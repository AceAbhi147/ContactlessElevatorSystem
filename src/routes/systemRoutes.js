const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/video', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'video.html'));
});

router.get('/sketch.js', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'sketch.js'));
});

router.get('/assets/ding.wav', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'assets/ding.wav'));
});

router.get('/home', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'navigation.html'));
});

router.get('/elevator.html', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'elevator.html'));
});

router.get('/analytics.js', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'analytics.js'));
});

router.get('/analytics.csv', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'analytics.csv'));
});

module.exports = router;
