const { db, dbDir } = require("../../../database");
const { uploadRecipe, uploader } = require("../../../helper/upload/upload");

const insertCart = async (req, res, cart_id) => {
  const { user_id } = req.user;
  for (let val of req.body.items) {
    let checkItem = `SELECT * FROM CART_ITEMS WHERE PRODUCT_ID = ${db.escape(
      val.productId
    )} && cart_id = ${db.escape(cart_id)}`;
    let [CART_ITEMS] = await dbDir.promise().query(checkItem);
    if (CART_ITEMS.length > 0) {
      let qUpdate = `UPDATE CART_ITEMS SET QUANTITY = QUANTITY+${db.escape(
        val.quantity
      )} WHERE PRODUCT_ID = ${db.escape(
        val.productId
      )} && cart_id = ${db.escape(cart_id)}`;
      let body = await dbDir.promise().query(qUpdate);
    } else {
      let qInsertCartItems = `INSERT INTO CART_ITEMS (cart_id, product_id, quantity, created_by, created_date, modified_by, modified_date)
      VALUES (${db.escape(cart_id)}, ${db.escape(val.productId)}, ${db.escape(
        val.quantity
      )}, ${db.escape(user_id)}, NOW(), ${db.escape(user_id)}, NOW())`;
      await dbDir.promise().query(qInsertCartItems);
    }
  }
  res
    .status(200)
    .send({ message: "SUCCEES", success: true, DATA: { cart_id } });
  // let itemsInsert = req.body.items.map((val) => {
  //   return `(${db.escape(cart_id)}, ${db.escape(val.productId)}, ${db.escape(
  //     val.quantity
  //   )}, ${db.escape(user_id)}, NOW(), ${db.escape(user_id)}, NOW())`;
  // });

  // let qInsertCartItems = `INSERT INTO CART_ITEMS (cart_id, product_id, quantity, created_by, created_date, modified_by, modified_date)
  //     VALUES ${itemsInsert}`;
  // db.query(qInsertCartItems, (err, result_3) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send({ message: "error", success: false });
  //   }
  //   res
  //     .status(200)
  //     .send({ message: result_3, success: true, DATA: { cart_id } });
  // });
};
const insertCartNew = (req, res) => {
  const { user_id } = req.user;
  let qInsert = `INSERT INTO CARTS (user_id, created_by, created_date, modified_by, modified_date)
    values( ${db.escape(user_id)}, ${db.escape(user_id)}, NOW(), ${db.escape(
    user_id
  )}, now())`;
  db.query(qInsert, (err, result_1) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "error", success: false });
      return false;
    }
    let cart_id = result_1.insertId;
    if (req.body.items) {
      console.log(cart_id, "Id");
      insertCart(req, res, cart_id);
    } else {
      res.status(200).send({
        message: "success ",
        success: true,
        DATA: { cart_id },
      });
    }
  });
};
const insertOrderNew = (req, res) => {
  const { user_id } = req.user;
  const { total, cart_id } = req.body;
  let qInsert = `INSERT INTO ORDERS (user_id, status_id, prescription, payment_proof, total, created_by, created_date, modified_by, modified_date) 
  VALUES(${db.escape(user_id)}, 1, false, false, ${db.escape(
    total
  )}, ${db.escape(user_id)}, now(), ${db.escape(user_id)}, now())`;
  db.query(qInsert, (err, result_1) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "error", success: false });
      return false;
    }
    let order_id = result_1.insertId;
    console.log(order_id, "Id");
    if (req.body.items) {
      insertOrderItems(req, res, order_id);
    } else {
      deleteCart(req, res, cart_id, order_id);
    }
  });
};
const insertOrderItems = (req, res, order_id) => {
  const { user_id } = req.user;
  const { cart_id } = req.body;
  let itemsInsert = req.body.items.map((val) => {
    return `(${db.escape(order_id)}, ${db.escape(val.product_id)}, ${db.escape(
      val.quantity
    )}, ${db.escape(user_id)}, NOW(), ${db.escape(user_id)}, NOW())`;
  });
  let qInsertItems = `INSERT INTO ORDER_ITEMS (order_id, product_id, quantity, created_by, created_date, modified_by, modified_date)
      VALUES ${itemsInsert}`;
  db.query(qInsertItems, (err, result_3) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "error", success: false });
    }
    deleteCart(req, res, cart_id, order_id);
  });
};
const deleteCart = (req, res, cart_id, order_id) => {
  let qDelete = `DELETE CARTS, CART_ITEMS FROM CARTS LEFT JOIN CART_ITEMS ON CARTS.CART_ID = CART_ITEMS.CART_ID WHERE CARTS.CART_ID = ${cart_id}`;
  db.query(qDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Failed", success: false, ERROR: err });
      return false;
    }
    res.status(200).send({ message: "Succes", success: true, order_id });
  });
};
const updateCart = (req, res) => {
  let cart_id;
  let getCartId = `select cart_id from carts where user_id = ${db.escape(
    req.user.user_id
  )}`;
  db.query(getCartId, (err, result) => {
    cart_id = result.cart_id;
  });
};
const ErrorCheck = (err, res) => {
  if (err) {
    console.log(err, "Theres an error");
    res
      .status(500)
      .send({ message: "Backend Error", success: false, ERROR: err });
    return true;
  }
  return false;
};

module.exports = {
  getCart: (req, res) => {
    const { user_id } = req.user;
    let qGetId = `SELECT cart_id FROM CARTS WHERE user_id = ${db.escape(
      user_id
    )}`;
    db.query(qGetId, (err, result1) => {
      if (ErrorCheck(err, res)) return null;
      if (result1.length < 1) {
        res.status(200).send({
          message: "No Cart",
          success: true,
          DATA: { cart_id: false, cart_items: false },
        });
        return null;
      }
      console.log(result1[0].cart_id);
      let qGetCartItems = `SELECT * FROM CART_ITEMS C 
      LEFT JOIN PRODUCTS P ON C.PRODUCT_ID = P.PRODUCT_ID 
      WHERE CART_ID = ${db.escape(result1[0].cart_id)}`;
      db.query(qGetCartItems, (err, result2) => {
        if (ErrorCheck(err, res)) return null;
        console.log(result2);
        res.status(200).send({
          message: "Data acquired",
          success: true,
          DATA: { cart_id: result1[0].cart_id, cart_items: result2 },
        });
        return true;
      });
    });
  },
  addCart: async (req, res) => {
    const { user_id } = req.user;
    let qCheck = `SELECT * FROM CARTS WHERE user_id = ${db.escape(user_id)}`;
    let check = await db.query(qCheck, (err, result) => {
      console.log(result);
    });
    db.query(qCheck, (err, result) => {
      if (result.length > 0) {
        if (req.body.items) {
          insertCart(req, res, result[0].cart_id);
        } else {
          res.status(200).send({
            message: "Success",
            success: true,
            DATA: { cart_id: result[0].cart_id },
          });
        }
      } else {
        insertCartNew(req, res);
      }
    });
  },
  editCart: (req, res) => {
    const { user_id } = req.user;
    const item = req.body;
    //{cart_id, product_id, qty, remove}
    let qItem;
    if (item.remove) {
      qItem = `DELETE FROM CART_ITEMS WHERE CART_ID = ${db.escape(
        item.cart_id
      )} AND product_id = ${db.escape(item.product_id)}`;
    } else {
      qItem = `UPDATE CART_ITEMS SET quantity = ${db.escape(item.qty)} 
      WHERE CART_ID = ${db.escape(item.cart_id)} AND PRODUCT_ID = ${db.escape(
        item.product_id
      )}`;
    }
    db.query(qItem, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "failed", success: false });
      }
      res.status(200).send({ message: "Success", success: true, DATA: result });
    });
  },
  checkOut: (req, res) => {
    insertOrderNew(req, res);
  },
  recipeUpload: (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    console.log(id, "this is id");
    try {
      let path = `/images/orders/${id}`;
      const upload = uploader(path, `${id}_${user_id}_recipe`).fields([
        { name: "file" },
      ]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }
        const { file } = req.files;
        const filePath = file ? path + "/" + file[0].filename : null;

        let qUpdatePic = `UPDATE ORDERS SET PRESCRIPTION = ${db.escape(
          filePath
        )}, modified_date = NOW(), modified_by = ${db.escape(
          user_id
        )} WHERE order_id = ${db.escape(id)}`;

        db.query(qUpdatePic, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync(`./public/${filePath}`);
            res.status(500).send({ message: "Upload Failed", success: false });
          }
          res.status(200).send({ message: "Berhasil upload", success: true });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  uploadPicture: (req, res) => {
    const { user_id } = req.user;
    try {
      let path = "/images/users/picture";
      const upload = uploader(path, user_id).fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }
        const { file } = req.files;
        const filePath = file ? path + "/" + file[0].filename : null;
        //let data = JSON.parse(req.body.data);
        //data.image = filePath;

        let qUpdatePic = `UPDATE USERS SET image = ${db.escape(
          filePath
        )}, modified_date = NOW(), modified_by = ${db.escape(
          user_id
        )} WHERE user_id = ${db.escape(user_id)}`;

        db.query(qUpdatePic, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync(`./public/${filePath}`);
            res.status(500).send({ message: "Upload Failed", success: false });
          }
          res.status(200).send({ message: "Berhasil upload", success: true });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
