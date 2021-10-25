import React from "react";
import {makeStyles} from '@material-ui/core/styles'


//@material-ui/icon components
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOffer from "@material-ui/icons/LocalOffer";


//@material-ui/core components
import Card from "template-components/Card/Card.js";
import CardBody from "template-components/Card/CardBody.js";
import CardFooter from "template-components/Card/CardFooter.js";
import CustomButtons from "template-components/CustomButtons/Button";
import Info from "template-components/Typography/Info.js";


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js"
const useStyles = makeStyles(styles);
function ProductCard(props) {
     const classes = useStyles();
    
    return (
        <div>
                    <Card>
                        <img
                            className={classes.cardImgTop}
                            data-src="holder.js/100px180/"
                            alt="100%x160"
                            style={{ height: "160px", width: "100%", display: "block" }}
                            src={props.productData.image}
                            data-holder-rendered="true"
                        />
                        <CardBody>
                        <Info><a href="/ProductDetail"><h4 className={classes.cardTitle}>{props.productData.name}</h4></a></Info>
                        <p className={classes.cardCategory}>
                        {props.productData.description}
                        </p> 
                        </CardBody>
                        <CardFooter stats>
                            <div className={classes.stats}>
                            <LocalOffer /> 
                            {props.productData.price}
                            </div>
                            <CustomButtons color="info" size="sm"><AddShoppingCartIcon/> Beli </CustomButtons >
                        </CardFooter>
                    </Card>
          
          
        </div>
    );

}
export default ProductCard;  


