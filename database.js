//Creacion de la base de datos 
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL
        )
    `);
});

export default db;
