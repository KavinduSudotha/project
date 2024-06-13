const db = require('../config/DBconnect');

const addwastage = (req, res) => {
  const { date, type, quantity,Userid } = req.body;
  const insertWastageQuery = 'INSERT INTO addwastage (date, type, quantity, emp_id) VALUES (?, ?, ?, ?)';

  db.query(insertWastageQuery, [date, type, quantity, Userid], (err, result) => {
    if (err) {
      console.error('Error adding wastage:', err);
      res.status(500).send('Error adding wastage');
      return;
    }

    const wasteId = result.insertId;

    const insertSummaryQuery = `
      INSERT INTO summarytablewastage (date, type, available_quantity, wastage_id)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertSummaryQuery, [date, type, quantity, wasteId], (err, result) => {
      if (err) {
        console.error('Error adding to summary table:', err);
        res.status(500).send('Error adding to summary table');
        return;
      }

      res.status(200).send('Wastage and summary record added successfully');
    });
  });
};

module.exports = {
  addwastage,
};
