const { db } = require("../../../database");
const insertCart = (req, res, order_id) => {
  const { user_id } = req.user;
  let itemsInsert = req.body.items.map((val) => {
    return `(${db.escape(order_id)}, ${db.escape(val.PRODUCT_ID)}, ${db.escape(
      val.QUANTITY
    )}, ${db.escape(user_id)}, NOW(), ${db.escape(user_id)}, NOW())`;
  });
  let qInsertCartItems = `INSERT INTO ORDER_ITEMS (order_id, product_id, quantity, created_by, created_date, modified_by, modified_date)
      VALUES ${itemsInsert}`;
  db.query(qInsertCartItems, (err, result_3) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "error", success: false });
    }
    res.status(200).send({ message: result_3, success: true });
  });
};

module.exports = {
  getTransaction: (req, res) => {
    const order_id = req.params ? req.params.id : null;
    let qGetOrder_ID = `select O.order_id as id, S.status_id, S.status_name, CASE WHEN O.payment_proof LIKE '0' THEN 'No payment proof' ELSE O.payment_proof END as payment_proof, 
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
  changeStatus: async (req, res) => {
    const { order_id, status_id } = req.body;
    const { user_id } = req.user;
    let qChangeStatus = `UPDATE ORDERS SET STATUS_ID = ${db.escape(
      status_id
    )} WHERE ORDER_ID = ${db.escape(order_id)}`;
    db.query(qChangeStatus, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Failed", success: false, err });
      } else {
        if (status_id === 5) {
          let q = `SELECT O.USER_ID, O.TOTAL FROM ORDERS O WHERE ORDER_ID = ${db.escape(
            order_id
          )}`;
          db.query(q, (error, get) => {
            if (error) {
              console.error(error);
              res
                .status(500)
                .send({ message: "Failed", success: false, error });
            } else {
              let insertTransaction = `INSERT INTO TRANSACTION_HISTORY (order_id, user_id, total_payment, created_by, created_date, modified_by, modified_date)
              VALUES (${db.escape(order_id)}, ${db.escape(
                get[0].USER_ID
              )}, ${db.escape(get[0].TOTAL)}, ${db.escape(
                user_id
              )}, NOW(), ${db.escape(user_id)}, NOW())`;
              db.query(insertTransaction, (err, resultInsert) => {
                if (err) {
                  console.error(err);
                  res
                    .status(500)
                    .send({ message: "Failed", success: false, err });
                } else {
                  res
                    .status(200)
                    .send({ message: "Order Finish", success: true });
                }
              });
            }
          });
        } else {
          res
            .status(200)
            .send({ message: "Order Status change!", success: true });
        }
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
  insertItems: (req, res) => {
    const { order_id } = req.body;
    insertCart(req, res, order_id);
  },
  changeTotal: (req, res) => {
    const { user_id } = req.user;
    const { order_id, total } = req.body;
    let qUpdate = `UPDATE ORDERS SET TOTAL = ${db.escape(
      total
    )}, modified_by = ${db.escape(
      user_id
    )}, modified_date = now() WHERE ORDER_ID = ${db.escape(order_id)}`;
    db.query(qUpdate, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err, success: false });
      } else {
        res.status(200).send({ message: "Total diubah", success: true });
      }
    });
  },
};
