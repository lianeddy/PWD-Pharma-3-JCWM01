const { db } = require("../../../database");

module.exports = {
  getTransaction: (req, res) => {
    const order_id = req.params ? req.params.id : null;
    let qGetOrder_ID = `select O.order_id as id, S.status_name, CASE WHEN O.payment_proof LIKE '0' THEN 'No payment proof' ELSE O.payment_proof END as payment_proof, 
    O.total, U.full_name, U.phone_no, U.email, U.gender, O.prescription from orders O left join status S on o.status_id = S.status_id LEFT JOIN USERS U ON O.USER_ID = U.USER_ID  ${
      order_id ? "where o.order_id =" + order_id : ""
    }`;
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
        res.status(200).send({ message: "Ok", success: true, DATA: result });
      }
    });
  },
  getStatus: (req, res) => {
    let query = "SELECT STATUS_ID, STATUS_NAME FROM STATUS";
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error", success: false, err });
      } else {
        res.status(200).send({ message: "Ok", success: true, DATA: result });
      }
    });
  },
  changeStatus: (req, res) => {
    const { order_id, status_id } = req.body;

    let qChangeStatus = `UPDATE ORDERS SET STATUS_ID = ${db.escape(
      status_id
    )} WHERE ORDER_ID = ${db.escape(order_id)}`;
    db.query(qChangeStatus, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Failed", success: false, err });
      } else {
        res
          .status(200)
          .send({ message: "Order Status change!", success: true });
      }
    });
  },
  getRawMedicine: (req, res) => {
    let qGet =
      "SELECT p.product_id, p.name, p.description, p.image, p.price, I.quantity as quantity_inventory, I.measurement_ml, I.measurement_mg FROM PRODUCTS P LEFT JOIN INVENTORIES I ON P.PRODUCT_ID = I.PRODUCT_ID WHERE P.CATEGORY_id = 5";
    db.query(qGet, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to get data", success: false });
      } else {
        res
          .status(200)
          .send({ message: "Success", success: true, DATA: result });
      }
    });
  },
};
