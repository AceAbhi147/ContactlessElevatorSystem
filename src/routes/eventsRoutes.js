const express = require('express');
const router = express.Router();
const path = require('path');

module.exports = (io) => {
    router.post('/request', (req, res) => {
        const reqBody = req.body;
        io.emit('spawn', reqBody);
        console.log("Elevator System: Request received from floor: " + reqBody.start + " to floor: " + reqBody.end);
        res.status(200).json({ success: true, message: 'Event triggered for Elevator Request' });
    });

    return router;
};