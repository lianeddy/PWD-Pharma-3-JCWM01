const { db } = require("../../../database");

module.exports = (req, res) => {
    let { idProduct } = req.body;
    let scriptQuery = `DELETE FROM products where product_id = ${db.escape(idProduct)};`;
    db.query(scriptQuery, (err, results) => {
        if (err) return res.status(500).send(err)

        if (results) {
            let delQuery = `DELETE FROM inventories where product_id = ${db.escape(idProduct)};`;
            db.query(delQuery, (err2, results2) => {
                
                if (err2) {
                    console.log(err2);
                    return res.status(500).send(err2);
                } else {
                    console.log("Sukses menghapus produk")
                    return res.status(200).send(results2)
                }
            })
        }
    });
};
