import React from "react";
import {makeStyles} from '@material-ui/core/styles'
import {CssBaseline} from '@material-ui/core';

//@material-ui/icon components
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import MedicationIcon from '@mui/icons-material/Medication';
import AccessTime from "@material-ui/icons/AccessTime";
import CardMedia from '@mui/material/CardMedia';
//@material-ui/core components
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardIcon from "template-components/Card/CardIcon.js";
import CardBody from "template-components/Card/CardBody.js";
import CardFooter from "template-components/Card/CardFooter.js";


//custom template-components
// import Navbar from "template-components/Navbars/Navbar.js";
// import NavbarLanding from "template-components/Navbars/NavbarLanding.js";
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
const useStyles = makeStyles(styles);
function Home() {
    const classes = useStyles();
    return (
        <div>
            {/* <NavbarLanding/> */}
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                
                <Card>
                {/* <CardHeader color="success"> </CardHeader> */}
                    <img
                        className={classes.cardImgTop}
                        data-src="holder.js/100px180/"
                        alt="100%x180"
                        style={{ height: "180px", width: "100%", display: "block" }}
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163df23d717%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163df23d717%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                        data-holder-rendered="true"
                     />
                    <CardBody>
                    <h4 className={classes.cardTitle}>Product Name</h4>
                    {/* <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                            
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                        </span>{" "}
                        increase in today sales.
                    </p>  */}
                    <p className={""}>
                        <span className={""}>
                            
                        <MedicationIcon className={""} /> 55%
                        </span>{" "}
                        increase in today sales.
                    </p>
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 4 minutes ago
                    </div>
                    </CardFooter>
                
                </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                
                <Card>
                {/* <CardHeader color="success"> </CardHeader> */}
                    <CardMedia
                    component="img"
                    height="140"
                    image="../assets/img/anding-adam-niescioruk-hWzrJsS8gwI-unsplash.jpg"
                    alt="green iguana"
                    />
                    <CardBody>
                    <h4 className={classes.cardTitle}>Product Name</h4>
                    <p className={classes.cardCategory}>
                        <span className={classes.successText}>
                            
                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                        </span>{" "}
                        increase in today sales.
                    </p> 
                    {/* <p className={""}>
                        <span className={""}>
                            
                        <MedicationIcon className={""} /> 55%
                        </span>{" "}
                        increase in today sales.
                    </p> */}
                    </CardBody>
                    <CardFooter chart>
                    <div className={classes.stats}>
                        <AccessTime /> updated 4 minutes ago
                    </div>
                    </CardFooter>
                
                </Card>
                </GridItem>
            </GridContainer>
        </div>
    );

}
export default Home;  


