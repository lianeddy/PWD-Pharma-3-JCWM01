import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
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
const useStyles = makeStyles(styles);

const Cart = (props) => {
  const classes = useStyles();
  return (
    <div style={{ margin: "0px 25% 0px 25%" }}>
      <GridContainer>
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
      </GridContainer>
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
