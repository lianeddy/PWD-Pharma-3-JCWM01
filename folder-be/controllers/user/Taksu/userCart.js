const { db } = require("../../../database");
const { uploader } = require("../../../helper/upload/upload");

const insertCart = (req,res) =>{
  let qInsert = `INSERT INTO CARTS (user_id, created_by, created_date, modified_by, modified_date)
    values( ${db.escape(user_id)}, ${db.escape(user_id)}, NOW(), ${db.escape(
      user_id
    )}, now())`;
    db.query(qInsert, (err, result_1) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "error", success: false });
      }
      let cart_id = result_1.insertId;
      console.log(cart_id, "Id");
      let itemsInsert = req.body.items.map((val) => {
        return `(${db.escape(cart_id)}, ${db.escape(
          val.productId
        )}, ${db.escape(val.quantity)}, ${db.escape(
          user_id
        )}, NOW(), ${db.escape(user_id)}, NOW())`;
      });
      console.log(itemsInsert, "items Insert");
      let qInsertCartItems = `INSERT INTO CART_ITEMS (cart_id, product_id, quantity, created_by, created_date, modified_by, modified_date)
        VALUES ${itemsInsert}`;
      db.query(qInsertCartItems, (err, result_3) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "error", success: false });
        }
        res.status(200).send({ message: result_3, success: true });
      });
    });
}
const putCart = (req, res) => {
  let getCartId = `select cart_id from carts where user_id = ${db.escape(req.user.user_id)}`;
  db.query(getCartId, (err, result)=>{
    //let deleteCurrent =`d`
  })
}
module.exports = {
  addCart: (req, res) => {
    const { user_id } = req.user;
    let qCheck = `SELECT * FROM CARTS WHERE user_id = ${db.escape(user_id)}`
    db.query(qCheck, (err, result)=>{
      if(result.length>0){
        res.status(200).send({message:'Already exist', success:true})
      }
      else{
        insertCart(req, res);
      }
    })
  },
  editCart: (req, res) => {
    const { user_id } = req.user;
    let qCheck = `SELECT * FROM CARTS WHERE user_id = ${db.escape(user_id)}`
    db.query(qCheck, (err, result)=>{
      if(result.length==0){
        res.status(200).send({message:'No cart exist!', success:true})
      }
      else{
        putCart(req, res);
      }
    })
  }
};
