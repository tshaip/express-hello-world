const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/room-data/:name', (req, res) => {
    const roomData = req.body;
    const filePath = path.join(__dirname, `${roomData.name}.json`);

    fs.writeFile(filePath, JSON.stringify(roomData, null, 2), (err) => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err.message);
            return res.status(500).send('Error saving room data');
        }
        res.status(201).send('Room created successfully');
    });
});

router.get('/room-data/:name', (req, res) => {
    const name = req.params.name;
    const filePath = path.join(__dirname, `${name}.json`);

    if (!fs.existsSync(filePath)) {
        console.log(`Room with name '${name}' does not exist.`);
        return res.status(404).send('Room not found.');
    }   else 
    {
    fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
        console.error("Fehler beim Lesen der Datei:", err);
        return res.status(500).send("Datei konnte nicht gelesen werden.");
    }

    try {
        const json = JSON.parse(jsonString);
        res.json(json);
         } catch (parseErr) {
        console.error("Fehler beim Parsen des JSON:", parseErr);
        res.status(500).send("Ungültiges JSON-Format in der Datei.");
    }
    });}
});

module.exports = router;