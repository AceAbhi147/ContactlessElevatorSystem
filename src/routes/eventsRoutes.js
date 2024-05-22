const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = (io) => {
    router.post('/request', (req, res) => {
        const reqBody = req.body;
        io.emit('spawn', reqBody);

        res.status(200).json({ success: true, message: 'Event triggered for Elevator Request' });
    });

    return router;
};