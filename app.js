const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const systemRoutes = require('./src/routes/systemRoutes');
const serverRoutes = require('./src/routes/serverRoutes');
const oauthRoutes = require('./src/routes/oauthRoutes');
const eventsRoutes = require('./src/routes/eventsRoutes');
const path = require('path');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const server = require('http').createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("A user connected");
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});


// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, 'not-found.html')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/', serverRoutes);
app.use('/login', oauthRoutes);
app.use('/system', systemRoutes);
app.use('/events', eventsRoutes(io));


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'not-found.html'));
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});