const db = requires('../db');

async function createPlayer(playerName) {
    const result = await db.query('INSERT INTO player (name) VALUES ($1) RETURNING playerID', [playerName]);
    if (result.rows.length === 0) {
        throw new Error("Insert failed");
    }
    return result.rows[0];
}

async function createPlayerRoom(playerID, roomID) {
    const result = await db.query('INSERT INTO player_room (playerID, roomID) VALUES ($1, $2) RETURNING *', [playerID, roomID]);
    if (result.rows.length === 0) {
        throw new Error("Insert failed");
    }
    return result.rows[0];
}



module.exports = {
    createPlayer,
    createPlayerRoom
};
