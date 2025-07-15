const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/room-data/:name', (req, res) => {
    const roomData = req.body;
    const filePath = path.join('../data', `${roomData.name}.json`);

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
    const filePath = path.join('../data', `${name}.json`);

    fs.readFile(filePath, 'utf8', (err, json) => {
        if (err) {
            console.log(`Error reading file ${filePath}:`, err.message);
            return res.status(404).send('Room not found');
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });
});

module.exports = router;