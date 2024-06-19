const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Onsase@96', // Provide your MySQL password here
    database: 'client_management'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database Connected');
});

// Use body-parser middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { id, name, location } = req.body;

    const sql = 'INSERT INTO clients (id, name, location) VALUES (?, ?, ?)';
    db.query(sql, [id, name, location], (err, result) => {
        if (err) {
            console.error('Error adding client:', err);
            res.status(500).send('There was an error processing your request');
            return;
        }
        console.log('Client added successfully!');
        res.status(200).send('Client added successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
