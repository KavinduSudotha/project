// sellWastage
const db = require('../config/DBconnect');

const sellWastage = (req, res) => {
  const { date, type, quantity, sellPrice, wasteId } = req.body;

  const suggestPriceQuery = `
    SELECT ${type} AS price
    FROM weeklypricelist
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(suggestPriceQuery, (err, result) => {
    if (err) {
      console.error('Error fetching suggest price:', err);
      res.status(500).send('Error fetching suggest price');
      return;
    }

    const suggestPrice = result[0].price * quantity;

    const insertSellWastageQuery = `
      INSERT INTO sellwastage (date, type, quantity, price, waste_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertSellWastageQuery, [date, type, quantity, sellPrice, wasteId], (err, result) => {
      if (err) {
        console.error('Error adding wastage sell:', err);
        res.status(500).send('Error adding wastage sell');
        return;
      }

      const updateSummaryQuery = `
        UPDATE summarytablewastage
        SET available_quantity = available_quantity - ?
        WHERE wastage_id = ?
      `;

      db.query(updateSummaryQuery, [quantity, wasteId], (err, result) => {
        if (err) {
          console.error('Error updating summary table:', err);
          res.status(500).send('Error updating summary table');
          return;
        }

        const deleteSummaryQuery = `
          DELETE FROM summarytablewastage
          WHERE wastage_id = ? AND available_quantity <= 5
        `;

        db.query(deleteSummaryQuery, [wasteId], (err, result) => {
          if (err) {
            console.error('Error deleting from summary table:', err);
            res.status(500).send('Error deleting from summary table');
            return;
          }

          res.status(200).send({ suggestPrice, message: 'Wastage sell and summary update successful' });
        });
      });
    });
  });
};





// getBatches.

const getBatches = (req, res) => {
    const { type } = req.body;
  
    const query = `
      SELECT wastage_id, available_quantity
      FROM summarytablewastage
      WHERE type = ?
    `;
  
    db.query(query, [type], (err, result) => {
      if (err) {
        console.error('Error fetching batches:', err);
        res.status(500).send('Error fetching batches');
        return;
      }
  
      res.status(200).send(result);
    });
  };


// getSuggestPrice

const getSuggestPrice = (req, res) => {
    const { type, quantity } = req.body;
  
    const query = `
      SELECT ${type} AS price
      FROM weeklypricelist
      ORDER BY id DESC
      LIMIT 1
    `;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching suggest price:', err);
        res.status(500).send('Error fetching suggest price');
        return;
      }
      console.log(result);
      console.log(result[0].price);
      console.log(quantity);
      const suggestPrice = result[0].price * quantity;
      res.status(200).send({ suggestPrice });
    });
  };
module.exports = { getSuggestPrice,getBatches,sellWastage };
