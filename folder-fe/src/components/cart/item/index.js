import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridContainer from "template-components/Grid/GridContainer";
import GridItem from "template-components/Grid/GridItem";
import CardHeader from "template-components/Card/CardHeader.js";
import Card from "template-components/Card/Card.js";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Danger from "template-components/Typography/Danger.js";
import CardIcon from "template-components/Card/CardIcon.js";
import CardFooter from "template-components/Card/CardFooter.js";

const useStyles = makeStyles(styles);

const CartItem = ({ data }) => {
  console.log(data);
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="warning" stats icon style={{ textAlign: "left" }}>
        <CardIcon color="warning">
          <img style={{ width: "100px" }} src={data.image} />
        </CardIcon>
        <div style={{ display: "flex" }}>
          <div style={{ width: "40%" }}>
            <p className={classes.cardCategory}>Price</p>
            <h3 className={classes.cardTitle}>{data.price}</h3>
            <h4 className={classes.cardTitle}>Quantity: {data.qty}</h4>
          </div>
          <div
            style={{
              width: "40%",
              height: "40px",
              margin: "auto",
              display: "flex",
            }}
          >
            <Button variant="contained" color="primary">
              -
            </Button>
            <h3>{data.price}</h3>
            <Button variant="contained" color="primary">
              +
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardFooter stats style={{ textAlign: "right", display: "inline" }}>
        <p>Quantity: 1</p>
      </CardFooter>
    </Card>
  );
};

export default CartItem;
