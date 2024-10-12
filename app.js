//Se importo express 
//Se importo la base de datos SQLITE3 
//se asigno el puerto 3001
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';  

const app = express();
const port = 3001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Se enlaza a la pagina index HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Se crea la ruta tasks del metodo get el cual consulta toda la tabla task
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

//Se crea ruta tasks con el metodo post para insertar algun producto
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO tasks (title) VALUES (?)', [title], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
});

// Ruta para eliminar una tarea
app.post('/tasks/delete', (req, res) => {
  const { id } = req.body;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
});

//Se crea ruta tasks con el metodo post para actualizar 
app.post('/tasks/update', (req, res) => {
  const { id , title} = req.body;
  db.run('update tasks SET title = ? WHERE id = ?', [title, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/');
  });
});

// Escucha en el puerto
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});




