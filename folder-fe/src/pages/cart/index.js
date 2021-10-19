import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getCart, recipeCart } from "redux/actions/cartAction";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

import CartItem from "components/cart/item";
import GridContainer from "template-components/Grid/GridContainer";
import GridItem from "template-components/Grid/GridItem";
import CardHeader from "template-components/Card/CardHeader.js";
import Card from "template-components/Card/Card.js";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Danger from "template-components/Typography/Danger.js";
import CardIcon from "template-components/Card/CardIcon.js";
import CardFooter from "template-components/Card/CardFooter.js";
import axios from "axios";
import { URL_API } from "helper/helper";
import { Label } from "@material-ui/icons";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const Cart = (props) => {
  const classes = useStyles();
  const hdnCreateCart = () => {
    const items = [
      {
        productId: 5,
        quantity: Math.ceil(Math.random() * 10),
      },
      {
        productId: 7,
        quantity: Math.ceil(Math.random() * 10),
      },
      {
        productId: 435,
        quantity: Math.ceil(Math.random() * 10),
      },
    ];

    axios.post(
      `${URL_API}/users/cart`,
      {
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  const hdnSubmitOrder = () => {
    let form = new FormData();
    form.append("file", props.recipe);
    form.append(
      "data",
      JSON.stringify({ cart_id: props.cart_id, cart: props.cart })
    );
    axios
      .post(
        `${URL_API}/users/checkOut`,
        {
          cart_id: props.cart_id,
          items: props.cart,
          total: props.cart.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (props.recipe) {
          hdnSubmitRecipe(res.data.order_id);
        }

        props.getCart(props.users);
      });
  };
  const hdnSubmitRecipe = (id) => {
    let form = new FormData();
    form.append("file", props.recipe);
    form.append(
      "data",
      JSON.stringify({ cart_id: props.cart_id, cart: props.cart })
    );
    axios
      .post(`${URL_API}/users/recipeUpload/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    props.getCart(props.users);
  }, []);

  return (
    <div style={{ margin: "0px 25% 0px 25%" }}>
      {console.log(props.cart, "Current cart")}
      <GridContainer>
        {props.cart.length > 0 ? (
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Cart</h4>
              <p className={classes.cardCategoryWhite}>Your Cart</p>
            </CardHeader>
            <GridItem xs={12} sm={12} md={12}>
              {props.cart
                ? props.cart.map((val) => {
                    return (
                      <CartItem
                        data={{
                          cart_id: val.cart_id,
                          image: val.image,
                          product_id: val.product_id,
                          price: val.price,
                          qty: val.quantity,
                          total: val.quantity * val.price,
                        }}
                      />
                    );
                  })
                : null}
            </GridItem>
          </Card>
        ) : (
          <h2>Your cart is empty</h2>
        )}
        <Card style={{ padding: "10px" }}>
          <h4>Upload recipe</h4>
          {props.recipe ? (
            <img
              style={{
                objectFit: "contain",
                width: "100%",
                maxWidth: "400px",
                maxHeight: "500px",
              }}
              src={URL.createObjectURL(props.recipe)}
            />
          ) : null}
          <input
            type="file"
            id="recipe_upload"
            onChange={(e) => props.recipeCart(e.target.files[0])}
          />
        </Card>
      </GridContainer>
      <Button
        color="primary"
        variant="contained"
        onClick={hdnCreateCart}
        style={{ margin: "10px" }}
      >
        Create Cart
      </Button>
      {/* <Button
        color="primary"
        variant="contained"
        onClick={hdnModifyCart}
        style={{ margin: "10px" }}
      >
        Modify Cart
      </Button> */}
      <Button
        color="primary"
        variant="contained"
        onClick={(e) => props.getCart(props.users)}
        style={{ margin: "10px" }}
      >
        Get Cart
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={hdnSubmitOrder}
        style={{ margin: "10px" }}
      >
        Submit Order
      </Button>
      {/* <Button
        color="primary"
        variant="contained"
        onClick={hdnSubmitRecipe}
        style={{ margin: "10px" }}
      >
        Submit Photo
      </Button> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
    cart: state.cartReducer.cart_item,
    recipe: state.cartReducer.recipe_image,
    cart_id: state.cartReducer.cart_id,
  };
};

const mapDispatchToProps = {
  getCart,
  recipeCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
