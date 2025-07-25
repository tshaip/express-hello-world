const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server);


// Socket.IO Setup
const players = {};

io.on('connection', (socket) => {
  console.log("Verbunden:", socket.id);

  socket.on('register', ({ playerID, roomID }) => {
    players[playerID] = socket.id;
    socket.join(roomID);
    console.log(`Spieler ${playerID} beigetreten zu Raum ${roomID}`);
  });

  socket.on('message', ({ toPlayerID, message }) => {
    const targetSocket = players[toPlayerID];
    if (targetSocket) {
      io.to(targetSocket).emit('message', message);
    }
  });

  socket.on('disconnect', () => {
    // Entferne Player aus players[]
    for (const id in players) {
      if (players[id] === socket.id) {
        delete players[id];
        console.log(`Spieler ${id} hat getrennt`);
        break;
      }
    }
  });
});

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

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// JSON-Body verarbeiten
app.use(express.json());
