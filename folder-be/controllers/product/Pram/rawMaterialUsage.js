const { db } = require("../../../database");

module.exports = (req, res) => {
  const { page, limit } = req.query
  let queryOffset = parseInt(page) * parseInt(limit)
  let scriptQuery = `Select o.quantity, o.created_date, p.name from order_items o join products p on o.product_id = p.product_id where p.category_id = 5 LIMIT ${queryOffset}, ${limit};`;
  
  db.query(scriptQuery, (err, results) => {
    if (err) return res.status(500).send(err); 

    if(results) {
        const sumQuery = `Select o.quantity, o.created_date, p.name, p.category_id from order_items o join products p on o.product_id = p.product_id where p.category_id = 5;`;
        db.query(sumQuery, (err2, results2) => {
           if (err2) return res.status(500).send(err);

           if (results2) {
             const scriptQuery2 = `SELECT sum(quantity) as Jumlah, p.name as Nama 
             FROM order_items o join products p on o.product_id = p.product_id
             where p.category_id = 5 group by p.product_id;`;
             db.query(scriptQuery2, (err3, results3) => {
              if (err3) return res.status(500).send(err);

            return res.status(200).send({ data: results, sumRawMaterialUsage: results3, total: results2.length });

             })
           }



        })
    }
});
};

// where measurement_mg = 1 or measurement_ml = 1