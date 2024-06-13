const connection = require('../config/DBconnect');

const generateReport = (req, res) => {
  const { reportType, startDate, endDate } = req.body;
  let query = '';

  switch (reportType) {
    case 'dailyWastage':
      query = `
        SELECT 
          DATE(date) as date, 
          type, 
          SUM(quantity) as total_quantity 
        FROM addwastage 
        WHERE date BETWEEN ? AND ? 
        GROUP BY DATE(date), type;
      `;
      break;
    case 'monthlyWastage':
      query = `
        SELECT 
          DATE_FORMAT(date, '%Y-%m') as month, 
          type, 
          SUM(quantity) as total_quantity 
        FROM addwastage 
        WHERE date BETWEEN ? AND ? 
        GROUP BY DATE_FORMAT(date, '%Y-%m'), type;
      `;
      break;
    case 'dailyPurchases':
      query = `
        SELECT 
          DATE(date) as date, 
          type, 
          employeeid, 
          wastagechip, 
          densitypeat, 
          sandpeat, 
          suggestprice, 
          buyprice, 
          quantity 
        FROM buyraw 
        WHERE date BETWEEN ? AND ? 
        ORDER BY DATE(date);
      `;
      break;
    case 'monthlyPurchases':
      query = `
        SELECT 
          DATE_FORMAT(date, '%Y-%m') as month, 
          type, 
          SUM(buyprice * quantity) as total_cost 
        FROM buyraw 
        WHERE date BETWEEN ? AND ? 
        GROUP BY DATE_FORMAT(date, '%Y-%m'), type;
      `;
      break;
    case 'currentInventory':
      query = `
        SELECT * 
        FROM inventory 
        WHERE date = (SELECT MAX(date) FROM inventory);
      `;
      break;
    case 'inventoryChange':
      query = `
        SELECT 
          date, 
          time, 
          total_weight_chips_11mm_unwashed, 
          total_weight_chips_11mm_washed, 
          total_weight_chips_9mm_unwashed, 
          total_weight_chips_9mm_washed, 
          total_weight_chips_7mm_unwashed, 
          total_weight_chips_7mm_washed, 
          total_weight_cocopeat_hi_ec, 
          total_weight_cocopeat_low_ec 
        FROM inventory 
        WHERE date BETWEEN ? AND ? 
        ORDER BY date, time;
      `;
      break;
    case 'wastageInventoryCorrelation':
      query = `
        SELECT 
          i.date, 
          i.time, 
          i.total_weight_chips_11mm_unwashed, 
          i.total_weight_chips_11mm_washed, 
          i.total_weight_chips_9mm_unwashed, 
          i.total_weight_chips_9mm_washed, 
          i.total_weight_chips_7mm_unwashed, 
          i.total_weight_chips_7mm_washed, 
          i.total_weight_cocopeat_hi_ec, 
          i.total_weight_cocopeat_low_ec, 
          w.type, 
          w.quantity 
        FROM inventory i 
        JOIN addwastage w 
        ON i.date = w.date 
        WHERE i.date BETWEEN ? AND ? 
        ORDER BY i.date, i.time;
      `;
      break;
    case 'purchaseInventoryEffect':
      query = `
        SELECT 
          b.date, 
          b.type, 
          b.quantity as purchased_quantity, 
          i.total_weight_chips_11mm_unwashed, 
          i.total_weight_chips_11mm_washed, 
          i.total_weight_chips_9mm_unwashed, 
          i.total_weight_chips_9mm_washed, 
          i.total_weight_chips_7mm_unwashed, 
          i.total_weight_chips_7mm_washed, 
          i.total_weight_cocopeat_hi_ec, 
          i.total_weight_cocopeat_low_ec 
        FROM buyraw b 
        JOIN inventory i 
        ON b.date = i.date 
        WHERE b.date BETWEEN ? AND ? 
        ORDER BY b.date;
      `;
      break;
    default:
      res.status(400).send('Invalid report type');
      return;
  }

  connection.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error generating report');
      return;
    }
    res.json(results);
  });
};

module.exports = { generateReport };
