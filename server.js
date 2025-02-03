const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost', // Cambiado de 'ANyx' a 'localhost'
    port: 3306, // Puerto de MySQL
    user: 'root', // Cambia esto si tu usuario es diferente
    password: '1q2w3e4r5t@*', // Cambia esto por tu contraseña
    database: 'comprasdb' // Nombre de la base de datos
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.get('/api/registros', (req, res) => {
    const sql = 'SELECT * FROM registros';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al recuperar los registros:', err);
            res.status(500).send('Error al recuperar los registros');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/registros', (req, res) => {
    const registro = req.body;
    console.log('Datos recibidos:', registro); // Verificar los datos recibidos
    const sql = 'INSERT INTO registros SET ?';
    db.query(sql, registro, (err, result) => {
        if (err) {
            console.error('Error al insertar el registro:', err);
            res.status(500).send('Error al insertar el registro');
        } else {
            console.log('Registro agregado:', result);
            res.send('Registro agregado');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});