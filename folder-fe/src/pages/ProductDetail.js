/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// core components
import GridItem from "../template-components/Grid/GridItem.js";
import GridContainer from "../template-components/Grid/GridContainer.js";
import Button from "../template-components/CustomButtons/Button.js";
import SnackbarContent from "../template-components//Snackbar/SnackbarContent.js";
import Snackbar from "../template-components/Snackbar/Snackbar.js";
import Card from "../template-components/Card/Card.js";
import CardHeader from "../template-components/Card/CardHeader.js";
import CardBody from "../template-components/Card/CardBody.js";
import CardFooter from "../template-components/Card/CardFooter.js";
import CustomButtons from "../template-components/CustomButtons/Button";
import Info from "../template-components/Typography/Info.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

 function ProductDetail() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  return (
    <Card>
      <CardHeader color="info">
        {/* <h4 className={classes.cardTitleWhite}>Notifications</h4>
        <p className={classes.cardCategoryWhite}>
          
          .
        </p> */}
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
          <Card>
                        <img
                            className={classes.cardImgTop}
                            data-src="holder.js/100px180/"
                            alt="100%x160"
                            style={{ height: "60vh", width: "100%", display: "block" }}
                            src="https://hdmall.id/system/image_attachments/images/000/036/664/medium/Azithromycin_KF.jpeg"
                            data-holder-rendered="true"
                        />
            </Card>
     
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
           <Card>
                <CardBody>
                <Info><h3 className={classes.cardTitle}>Azithromycin KF</h3></Info>
                <p className={classes.cardCategory}>
                    Azithromycin is an antibiotic. It\'s widely used to treat chest infections such as pneumonia, infections 
                </p> 
                <LocalOffer /> 
                            70000
                </CardBody>
                <CardFooter stats>
                    <CustomButtons color="info" size="sm"><AddShoppingCartIcon/> Beli </CustomButtons >
                </CardFooter>
           </Card>
          </GridItem>
        </GridContainer>
        <br />
        <br />
     
      </CardBody>
    </Card>
  );
}

export default ProductDetail