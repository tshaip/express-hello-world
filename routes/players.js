const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { createPlayer , createPlayerRoom } = require('../queries/playerQueries.js');
const { create } = require('domain');

router.post('/player-data', async (req, res) => {
    const playerID = await createPlayer(req.body.playerName);
    const playerRoom = await createPlayerRoom(playerID.playerid, req.body.roomID);
    res.status(200).json(playerRoom);
});