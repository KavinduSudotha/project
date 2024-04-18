const mysql = require('mysql');
                         
// MySQL database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cocosys'
});
                                                                                                                                                                                                                                                                            
// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;