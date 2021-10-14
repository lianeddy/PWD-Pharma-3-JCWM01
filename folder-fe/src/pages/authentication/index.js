import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { URL_API } from "helper/helper";
import axios from "axios";
import { Link } from "react-router-dom";
import Klinik from "assets/img/Klinik.png";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button } from "@material-ui/core";

const Authentication = (props) => {
  const [status, setStatus] = useState("Processing....");
  const { token } = useParams();
  useEffect(() => {
    axios
      .patch(
        `${URL_API}/users/authentication`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (!res.data.status) {
          //alert(res.data.message);
          setStatus(res.data.message);
          console.log("");
          return false;
        }
        // alert(res.data.message);
        setStatus(res.data.message);
      })
      .catch((err) => {
        //alert(err);
        console.log(err);
        setStatus("Account not found");
      });
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>{status}</h2>
      <Button>
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  );
};

export default Authentication;
