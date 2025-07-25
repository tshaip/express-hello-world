const multer = require('multer');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const imageQueries = require('../queries/imageQueries.js');

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // z. B. 162987123.jpg
        }
    })
});

router.post('/upload/:roomID/:playerID/:categorie', upload.single('file'), async (req, res) => {
    try {
        const { roomID, playerID, categorie } = req.params;
        const filePath = req.file.path; // Pfad zur hochgeladenen Datei
        
        // Hier speicherst du die Datei-Infos in der Datenbank oder führst Logik aus
        await imageQueries.createImage(playerID, roomID, categorie, filePath);

        res.status(200).send('File uploaded successfully');
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).send('Internal Server Error');
    }
});