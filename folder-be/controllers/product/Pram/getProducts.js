const { db } = require("../../../database");

module.exports = (req, res) => {
  let scriptQuery = `SELECT p.*, i.quantity FROM products p join inventories i on p.product_id = i.product_id;
  `;
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
});
};
