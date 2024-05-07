
const bodyParser = require('body-parser');
const connection = require('../config/DBconnect');


//router.use(bodyParser.json());
 
const login = (req, res) => {
    const { username, password } = req.body;

    connection.query('SELECT role FROM User WHERE username = ? AND password = ?', [username, password], (err, rows) => {
        if (err) {  
            console.error('Error querying MySQL database:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (rows.length === 1) {
            const { role } = rows[0];
            res.json({ role });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
}

module.exports = login;

