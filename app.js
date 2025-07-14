const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static("Public"));

app.get("/", (req, res) => res.sendFile(__dirname + '/Public/homepage.html'));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// JSON-Body verarbeiten
app.use(express.json());

// POST: Raumdaten empfangen und speichern
app.post('/Create-Room', (req, res) => {
  const roomData = req.body;
  const fileName = `${roomData.name || 'raum'}.json`;
  const dirPath = path.join(__dirname, `data/${roomData.name}`);
  const filePath = path.join(dirPath, fileName);

  fs.mkdirSync(dirPath, { recursive: true });

  fs.writeFileSync(filePath, JSON.stringify(roomData, null, 2), err => {
    if (err) {
      console.error('Fehler beim Speichern:', err);
      return res.status(500).send('Fehler beim Speichern');
    }
    res.send('Raum erfolgreich gespeichert!');
  });
});

