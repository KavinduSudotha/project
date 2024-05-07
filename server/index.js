const express = require('express');
const login = require('./control/Login');
const cors = require('cors');
const authroutlogin = require('./route/authloginrout');
const pricelistrout = require('./route/pricelistrout');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use('/auth', authroutlogin); 
// app.use('/pricelist', pricelistrout); // Mount the authentication routes
// app.use("/", require("./route/authloginrout"));

// app.use('/', login);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});