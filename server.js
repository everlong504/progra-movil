const https = require('https')
const port = 3000

// Import required modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'denis123', // Change to your password
    port: 5432, // Default Port
});

app.use(express.static(path.join('')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../progra-movil/pagina_Web', 'index.html'));
});

app.get('/inventario', (req, res) => {
    const query = 'SELECT * FROM inventario;';

    pool.query(query, (error, result) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('An error occurred while retrieving data from the database.');
        } else {
            const invent = result.rows;
            res.json(invent);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});