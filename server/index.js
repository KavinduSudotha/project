const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authroutlogin = require('./route/authloginrout');
const pricelistrout = require('./route/pricelistrout');
const jobrout = require('./route/jobrout');
const userawRoutes = require('./route/userawrout');
const inventory = require('./route/inventoryrout');
const wastage = require('./route/wastagerout');
const buyraw = require('./route/buyrawrout');

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST' , 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());

app.use('/auth', authroutlogin); 
app.use('/pricelist', pricelistrout);
app.use('/jobrout', jobrout);
app.use('/userawrout', userawRoutes);
app.use('/Inventory',inventory)
app.use('/wastage',wastage)
app.use('/buyraw',buyraw)
 // Mount the authentication routes
// app.use("/", require("./route/authloginrout"));

// app.use('/', login);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});