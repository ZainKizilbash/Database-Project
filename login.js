const express = require('express');
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true })); // Use built-in body parser
app.use('/css', express.static(path.join(__dirname, 'css')));

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "zain",
    database: "postgres"
});

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch(err => {
        console.error('Error connecting to PostgreSQL', err);
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// ... (your existing code)

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database to check if a user with the provided email and password exists
        const result = await client.query(
            'SELECT * FROM students WHERE email = $1 AND password = $2',
            [email, password]
        );

        // If a user is found, consider them logged in
        if (result.rows.length > 0) {
            res.send('Logged in successfully!');
        } else {
            // If no user is found, indicate that there is no such account
            res.send('No such account. Please check your email and password.');
        }
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).send('Internal Server Error');
    }
});

// ... (your existing code)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
