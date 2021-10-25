/*eslint-disable*/
import  React,{useState} from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
import Axios from 'axios';


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

function ProductDetail(props) {
 const classes = useStyles();
 const [productNotFound, setProductNotFound] = useState()
 const [productData, setProductData] = useState()

 const  fetchProduct = () => {
    Axios.get("http://localhost:3300/products/getData",{
      params:{
        id:props.match.params.productId
      }
    })
    .then((result) => {
    if(result.data.length){
      setProduct({ productData: result.data[0]})
    }else{
      setProduct({ productNotFound:true})
    }
    })
    .catch(() => {
    alert("Terjadi kesalahan di server")
    })
  }

 const  qtyBtnHandler=(action)=>{
    if(action === "increment"){
      setState({quantity:state.quantity+1})
    }else if(action === "decrement" && state.quantity>1) {
      setState({quantity:state.quantity-1})
    }
  }
  

  return (
   
    <Card>
      <CardBody>
          {
          state.productNotFound?
          <Info>
          <h3 className={classes.cardTitle}>
            {props.match.params.productId}
          </h3>
          </Info>
          :
          <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <img
                className={classes.cardImgTop}
                data-src="holder.js/100px180/"
                alt="100%x160"
                style={{ height: "60vh", width: "100%", display: "block" }}
                src={props.productData.image}
                data-holder-rendered="true"
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardBody>
                <Info>
                  <h3 className={classes.cardTitle}>
                    {props.productData.name}
                  </h3>
                </Info>
                <p className={classes.cardCategory}>
                  {props.productData.description}
                </p>
                <ButtonGroup  variant="contained" aria-label="outlined info button group">
                        <Button onClick={qtyBtnHandler("decrement")} color="info"  >{"-"}</Button>
                        <Button color="info" variant="outlined"  aria-label="outlined"> </Button>
                        <Button onClick={qtyBtnHandler("increment")}color="info" >{"+"}</Button>
                </ButtonGroup>
                <LocalOffer />
                {props.productData.price}

              </CardBody>
              <CardFooter stats>
                <CustomButtons
                  color="info"
                  size="sm"
                  onChange={props.addCart()}
                >
                  <AddShoppingCartIcon /> Beli{" "}
                </CustomButtons>
              </CardFooter>
              
            </Card>
          </GridItem>
          </GridContainer>
        }
       
        <br />
        <br />
      </CardBody>
    </Card>
  );
}

export default ProductDetail;
