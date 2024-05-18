const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/login', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'oauth.html'));
});

router.get('/oauth.js', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'oauth.js'));
});

module.exports = router;
