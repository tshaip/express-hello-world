const db = requires('../db');

async function createImage(playerID, roomID, categorieID, imageURL) {
    await db.query('INSERT INTO image (playerID, roomID, categorieID, imageURL) VALUES ($1, $2, $3, $4 )', [playerID, roomID, categorieID, imageURL]);
}

module.exports = {
    createImage
};