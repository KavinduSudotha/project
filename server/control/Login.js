const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/DBconnect');

const login = (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT userid, firstname, status, role, password FROM User WHERE username = ?', [username], (err, rows) => {
    if (err) {
      console.error('Error querying MySQL database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (rows.length === 1) {
      const { userid, firstname, status, role, password: hashedPassword } = rows[0];

      if (status !== 'active') {
        res.status(401).json({ error: 'User is inactive' });
        return;
      }

      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (result) {
          const token = jwt.sign({ userid, firstname, status, role }, 'secret', { expiresIn: '1h' });
          res.json({ auth: true, token: token });
        } else {
          res.status(401).json({ error: 'Invalid username or password' });
        }
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
};

module.exports = login;
