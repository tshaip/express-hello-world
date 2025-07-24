const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("Public"));

app.get("/", (req, res) => res.sendFile(__dirname + '/Public/homepage.html'));

app.use(express.json());

//Routen importieren

const roomRoutes = requires('./routes/rooms');
const playerRoutes = requires('./routes/players');
const imageRoutes = requires('./routes/images');

//Routen einbinden

app.use('/room', roomRoutes);
app.use('/player', playerRoutes);
app.use('/image', imageRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// JSON-Body verarbeiten
app.use(express.json());
