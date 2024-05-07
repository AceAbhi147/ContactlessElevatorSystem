const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const exampleRoutes = require('./routes/exampleRoutes');
const path = require('path');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const server = require('http').createServer(app);
const io = new Server(server);


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, 'not-found.html')));
app.use(express.static(path.resolve(__dirname, '../simulation')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', exampleRoutes);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'not-found.html'));
});

io.on('connection', (socket) => {
    console.log("A user connected");
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});