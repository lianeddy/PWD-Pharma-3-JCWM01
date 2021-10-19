const { db } = require("../../../database");

module.exports = (req, res) => {
    console.log("masuk ke sini<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    let { editNama, editHarga, editGambar, editDeskripsi, editJumlah, editSelectedCategories, editId } = req.body;

    let updateQuery = `UPDATE products set name = ${db.escape(editNama)}, description = ${db.escape(editDeskripsi)}, image = ${db.escape(editGambar)},
   price = ${db.escape(editHarga)}, category_id = ${db.escape(editSelectedCategories)}, created_by = 'Admin1', created_date = NOW(), 
    modified_by = 'Admin1', modified_date = NOW() where product_id = ${db.escape(editId)};`;

    db.query(updateQuery, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results) {
            let updateQuantity = `UPDATE inventories set quantity = ${db.escape(editJumlah)} where product_id = ${db.escape(editId)};`;

            db.query(updateQuantity, (err2, results2) => {
                if (err2) {
                    console.log(err2);
                    res.status(500).send(err2);
                } else {
                    console.log("Sukses menambah produk")
                    res.status(200).send(results2)
                }
            })
        }
    });
};
