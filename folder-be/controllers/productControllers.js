const { db } = require("../database");
module.exports = {
    getData: (req, res) => {
        let scriptQuery = `Select * from products`
        if (req.query.nama) {
            scriptQuery = `Select * from products where name = ${db.escape(req.query.name)};`
        }
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
    },
}