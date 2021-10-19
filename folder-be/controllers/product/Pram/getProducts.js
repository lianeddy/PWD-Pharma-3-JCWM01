const { db } = require("../../../database");

module.exports = (req, res) => {
  const { page, limit } = req.query
  let queryOffset = parseInt(page) * parseInt(limit)
  let scriptQuery = `SELECT p.*, i.quantity FROM products p join inventories i on p.product_id = i.product_id LIMIT ${queryOffset}, ${limit};
  `;
  db.query(scriptQuery, (err, results) => {
    if (results) {
      let scriptQueryForAllData = `SELECT p.*, i.quantity FROM products p join inventories i on p.product_id = i.product_id;`;
      db.query(scriptQueryForAllData, (err2, results2) => {
        if(err2){
          res.status(500).send(err2);
        }

        res.status(200).send({ data: results, total: results2.length });
        
      })
    }
});
};
