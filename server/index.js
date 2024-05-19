const express = require('express');
const login = require('./control/Login');
const cors = require('cors');
const authroutlogin = require('./route/authloginrout');
const pricelistrout = require('./route/pricelistrout');
const jobrout = require('./route/jobrout');

const bodyParser = require('body-parser');



const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST' , 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/auth', authroutlogin); 
app.use('/pricelist', pricelistrout);
app.use('/jobrout', jobrout);
 // Mount the authentication routes
// app.use("/", require("./route/authloginrout"));

// app.use('/', login);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});