import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "template-components/Grid/GridContainer.js";
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
      });
  }, []);
  return (
    <div>
      <GridContainer>
        <Profile_Information infoRes={infoRes} />
      </GridContainer>
    </div>
  );
}
