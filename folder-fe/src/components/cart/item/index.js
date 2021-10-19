import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import GridContainer from "template-components/Grid/GridContainer";
import GridItem from "template-components/Grid/GridItem";
import CardHeader from "template-components/Card/CardHeader.js";
import Card from "template-components/Card/Card.js";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Danger from "template-components/Typography/Danger.js";
import CardIcon from "template-components/Card/CardIcon.js";
import CardFooter from "template-components/Card/CardFooter.js";
import { URL_API } from "helper/helper";
import { updateCart } from "redux/actions/cartAction";

const useStyles = makeStyles(styles);

const CartItem = ({ data, updateCart }) => {
  const [clickTimeout, setClick] = useState(0);
  const [dataItem, setDataItem] = useState(data);
  const updateItem = (red) => {
    clearTimeout(clickTimeout);
    data.qty += red;
    //data.qty += red;
    setDataItem({ ...data, qty: data.qty, total: data.qty * data.price });
    setClick(
      setTimeout(() => {
        updateCart(data.product_id, data.qty);
        axios.patch(
          `${URL_API}/users/cart`,
          {
            cart_id: dataItem.cart_id,
            product_id: dataItem.product_id,
            qty: data.qty,
            remove: false,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("test", data.qty);
      }, 1000)
    );
  };
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="warning" stats icon style={{ textAlign: "left" }}>
        <CardIcon color="warning">
          <img style={{ width: "100px" }} src={dataItem.image} />
        </CardIcon>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ width: "40%" }}>
            <p className={classes.cardCategory}>Price</p>
            <h3 className={classes.cardTitle}>{dataItem.price}</h3>
            <h4 className={classes.cardTitle}>Quantity: {dataItem.qty}</h4>
          </div>
          <div
            style={{
              width: "100%",
              float: "right",
            }}
          >
            <h4 className={classes.cardTitle}>Total</h4>
            <h3 className={classes.cardTitle}>{dataItem.total}</h3>
          </div>
        </div>
      </CardHeader>
      <CardFooter stats style={{ textAlign: "right", display: "inline" }}>
        <div
          style={{
            width: "40%",
            height: "40px",
            margin: "auto",
            display: "flex",
            float: "right",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateItem(-1)}
          >
            -
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateItem(1)}
          >
            +
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  updateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
