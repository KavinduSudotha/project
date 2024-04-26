const express = require('express');
const login = require('./control/Login');
const cors = require('cors');
const authrout = require('./route/authloginrout');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/', login); // Mount the authentication routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});