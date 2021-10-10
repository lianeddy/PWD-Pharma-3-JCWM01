import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import CustomInput from "template-components/CustomInput/CustomInput.js";
import Button from "template-components/CustomButtons/Button.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardAvatar from "template-components/Card/CardAvatar.js";
import CardBody from "template-components/Card/CardBody.js";
import CardFooter from "template-components/Card/CardFooter.js";
import avatar from "assets/img/faces/marc.jpg";
import axios from "axios";
import Profile_Information from "components/profile/information";
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

export default function UserProfile() {
  const [infoRes, setInfoRes] = useState([]);
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1NTUsInVzZXJuYW1lIjoiQm9iIiwiZW1haWwiOiJ0YWtzdXdpamF5YTA3QGdtYWlsLmNvbSIsInJvbGVfaWQiOjIsImF1dGgiOiJ1bnZlcmlmaWVkIiwiaWF0IjoxNjMzODQxNzIwLCJleHAiOjE2MzM4ODQ5MjB9.i50mmNmvnMV_1a-8AAyoBGE-CH1XyLnEvUtcf9M31Hs"
  );

  const classes = useStyles();
  useEffect(() => {
    axios
      .post(
        `${URL_API}/users/getUserInfomation`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setInfoRes({ ...res.data[0] });
        console.log(infoRes, "Aduh");
      });
  }, []);
  return (
    <div>
      <GridContainer>
        <Profile_Information infoRes={infoRes} />
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
