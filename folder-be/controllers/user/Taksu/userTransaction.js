const { db } = require("../../../database");
const { uploadRecipe, uploader } = require("../../../helper/upload/upload");

module.exports = {
  getTransaction: (req, res) => {
    const { user_id } = req.user;
    const order_id = req.params ? req.params.id : null;
    let qGetOrder_ID = `select O.order_id as id, S.status_name, S.status_id, CASE WHEN O.payment_proof LIKE '0' THEN 'No payment proof' ELSE O.payment_proof END as payment_proof,
    O.total from orders O left join status S on o.status_id = S.status_id where o.user_id = ${user_id} ${
      order_id ? "&& o.order_id =" + order_id : ""
    } ORDER BY O.order_id DESC`;
    db.query(qGetOrder_ID, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", success: false, error: err });
      } else {
        res
          .status(200)
          .send({ message: "Success", success: true, DATA: result });
      }
    });
  },
  getTransactionDetail: (req, res) => {
    const { id } = req.params;
    let qGet = `SELECT OI.PRODUCT_ID, OI.QUANTITY, P.NAME, P.IMAGE, P.PRICE
    FROM ORDER_ITEMS OI LEFT JOIN PRODUCTS P ON OI.PRODUCT_ID = P.PRODUCT_ID where order_id = ${id}`;

    db.query(qGet, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", success: false, err });
      } else {
        console.log(result);
        res.status(200).send({ message: "Ok", success: true, DATA: result });
      }
    });
  },
  uploadPaymentProof: (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    console.log(req.params);
    try {
      let path = `/images/orders/${id}`;
      const upload = uploader(path, `${id}_${user_id}_payment`).fields([
        {
          name: "file",
        },
      ]);

      upload(req, res, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          const { file } = req.files;
          const filePath = file ? path + "/" + file[0].filename : null;

          let qUpdatePic = `UPDATE ORDERS SET PAYMENT_PROOF = ${db.escape(
            filePath
          )}, modified_date = NOW(), modified_by = ${db.escape(
            user_id
          )} WHERE order_id = ${db.escape(id)}`;

          db.query(qUpdatePic, (err, result) => {
            if (err) {
              console.log(err);
              fs.unlinkSync(`./public/${filePath}`);
              res
                .status(500)
                .send({ message: "Upload Failed", success: false });
            }
            res.status(200).send({ message: "Berhasil upload", success: true });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
