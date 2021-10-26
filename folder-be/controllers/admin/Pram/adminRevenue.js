const { db } = require("../../../database");

module.exports = (req, res) => {
  const scriptQuery = `SELECT * from transaction_history;`;
  db.query(scriptQuery, (err, results) => {
        if(err){
          res.status(500).send(err);
        }


        const sumQuery = `select sum(total_payment) as total, monthname(created_date) as month
        from transaction_history
        group by month(created_date);`;

        db.query(sumQuery, (err2, results2) => {
        if(err2){
            res.status(500).send(err2);
          }
            res.status(200).send({ data: results, revenue: results2 });

        })

    }
);
}


