const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const roomQueries = require('../queries/roomQueries.js'); // Assuming db.js is in the parent directory

router.post('/room-data', (req, res) => {
    roomQueries.createRoom(req.body.name)
    .then(roomID => {
        const categoryPromises = req.body.categories.map((category, index) => {
            return roomQueries.createCategorie(category, roomID, index);
        });
        return Promise.all(categoryPromises);
    })
});

router.get('/room-check/:roomID', (req, res) => {
   roomQueries.checkRoomID(req.params.roomID)
    .then(result => {
        if (result.rows.length === 0) {
            return res.status(404).send('Room not found');
        }
        res.status(200).json(result.rows[0]);
    })
    .catch(err => {
        console.error('Error checking room ID:', err)});
});

router.get('/categories/:roomID', (req, res) => {
    roomQueries.getRoomCategories(req.params.roomID)
    .then(categories => {
        res.status(200).json(categories);
    }) 
    .catch(err => {
        console.error('Error fetching categories:', err);
        res.status(500).send('Internal Server Error');
    });
});

module.exports = router;