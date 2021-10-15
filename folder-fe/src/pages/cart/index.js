import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
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
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 3,
      },
      {
        productId: 3,
        quantity: 2,
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
  const hdnModifyCart = () => {
    const items = [
      {
        productId: Math.ceil(Math.random()*7),
        quantity:  Math.ceil(Math.random()*100),
      },
      {
        productId: Math.ceil(Math.random()*7),
        quantity: Math.ceil(Math.random()*100),
      },
      {
        productId: Math.ceil(Math.random()*7),
        quantity: Math.ceil(Math.random()*100),
      },
    ];

    axios.put(
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

  return (
    <div style={{ margin: "0px 25% 0px 25%" }}>
      <GridContainer>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Cart</h4>
            <p className={classes.cardCategoryWhite}>Your Cart</p>
          </CardHeader>
          <GridItem xs={12} sm={12} md={12}>
            <CartItem
              data={{
                image:
                  "https://hdmall.id/system/image_attachments/images/000/036/664/medium/Azithromycin_KF.jpeg",
                price: 100,
                qty: 2,
              }}
            />
            <CartItem
              data={{
                image:
                  "https://hdmall.id/system/image_attachments/images/000/017/798/medium/rhinos-sr-kapsul-1.jpg",
                price: 100,
                qty: 2,
              }}
            />
          </GridItem>
        </Card>
      </GridContainer>
      <Button color="primary" variant="contained" onClick={hdnCreateCart} style={{margin:'10px'}}>
        Create Cart
      </Button>
      <Button color="primary" variant="contained" onClick={hdnModifyCart}>
        Modify Cart
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
