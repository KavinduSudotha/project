const express = require('express');
const login = require('../control/Login');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/login', login); // Mount the authentication routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});