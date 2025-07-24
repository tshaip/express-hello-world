const db = requires('../db'); // Assuming db.js is in the parent directory

async function createRoom(roomName) {
    await db.query('INSERT INTO room (name) VALUES ($1) RETURNING roomID' , [roomName]);
    return result.rows[0];
};

function createCategorie(categorieName , roomID , position) {
    return db.query('INSERT INTO categorie (name, roomID, position) VALUES ($1, $2, $3) RETURNING categorieID', [categorieName, roomID, position])
};

function checkRoomID(roomID) {
    return db.query('SELECT * FROM room WHERE roomID = $1', [roomID])
};

async function getRoomCategories(roomID) {
    const result = await db.query('SELECT categorieID , name FROM categorie WHERE roomID = $1', [roomID]);
    return result.rows.map(row => ({
        id: row.categorieid,
        name: row.name}));
};

module.exports = {
    createRoom,
    createCategorie, 
    checkRoomID,
    getRoomCategories
};