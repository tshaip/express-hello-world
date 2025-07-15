const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("Public"));

app.get("/", (req, res) => res.sendFile(__dirname + '/Public/homepage.html'));

app.use(express.json());

//Routen importieren

const roomRoutes = require('./routes/rooms');

//Routen einbinden

app.use('/', roomRoutes);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// JSON-Body verarbeiten
app.use(express.json());
