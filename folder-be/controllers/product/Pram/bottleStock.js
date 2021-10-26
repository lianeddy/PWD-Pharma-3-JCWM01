const { db } = require("../../../database");

module.exports = (req, res) => {
  let scriptQuery = `SELECT i.total_volume, i.per_bottle, p.name FROM inventories i join products p on i.product_id = p.product_id  where measurement_mg = 1 or measurement_ml = 1;`;
  db.query(scriptQuery, (err, results) => {
      
        const results1 = results.map((val) =>{
           const quantity =  Math.ceil(val.total_volume/val.per_bottle)
           return {
               ...val,
               jumlah: quantity
           }
        })
console.log(results1, "ini ress 1")
    if (err) return res.status(500).send(err);
    res.status(200).send({data: results1});
});
};
