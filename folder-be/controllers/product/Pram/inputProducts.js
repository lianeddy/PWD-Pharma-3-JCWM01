const { db } = require("../../../database");

module.exports = (req, res) => {
  let { namaProduk, hargaProduk, gambarProduk, deskripsiProduk, jumlahProduk, selectedCategories } = req.body;
  let insertQuery = `Insert into products values (null, ${db.escape(namaProduk)}, ${db.escape(deskripsiProduk)},
   ${db.escape(gambarProduk)}, ${db.escape(hargaProduk)}, ${db.escape(selectedCategories)}, 'Admin1', null, 'Admin1', null);`;

  db.query(insertQuery, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    // res.status(200).send(results)
    if (results) {
      let insertQuantity = `Insert into inventories values (null, ${results.insertId}, ${db.escape(jumlahProduk)},
       null, null, 'Admin1', NOW(), 'Admin1', NOW(), null, null);`;
      db.query(insertQuantity, (err2, results2) => {
        if (err2) {
          console.log(err2);
          res.status(500).send(err2);
        } else {
          console.log(results2)
          res.status(200).send(results2)
        }
      })
    }
  });
};
