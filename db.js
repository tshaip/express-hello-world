require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // Render braucht SSL
});

pool.connect()
  .then(() => console.log("🟢 DB verbunden"))
  .catch(err => console.error("❌ DB Fehler", err));

pool.query(`
    CREATE TABLE IF NOT EXISTS room (roomID SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS categorie (categorieID SERIAL PRIMARY KEY, roomID INTEGER REFERENCES room(roomID) ON DELETE CASCADE, name TEXT NOT NULL, position INTEGER CHECK (position BETWEEN 1 AND 10));
    CREATE TABLE IF NOT EXISTS player (playerID SERIAL PRIMARY KEY, name VARCHAR (255) NOT NULL);
    CREATE TABLE IF NOT EXISTS player_room (playerID INTEGER REFERENCES player(playerID) ON DELETE CASCADE, roomID INTEGER REFERENCES room(roomID) ON DELETE CASCADE, PRIMARY KEY (playerID, roomID));
    CREATE TABLE IF NOT EXISTS image (imageID SERIAL PRIMARY KEY, playerID INTEGER REFERENCES player(playerID) ON DELETE CASCADE, roomID INTEGER REFERENCES room(roomID) ON DELETE CASCADE,  categorieID INTEGER REFERENCES categorie(categorieID) ON DELETE CASCADE, imageURL TEXT NOT NULL, UNIQUE (roomID, categorieID, playerID));`
);

module.exports = pool;
