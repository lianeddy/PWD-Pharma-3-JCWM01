import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { Button } from "@material-ui/core";
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardBody from "template-components/Card/CardBody.js";
import axios from "axios";
import { URL_API } from "helper/helper";
import Table from "template-components/Table/Table.js";
import { Link } from "react-router-dom";

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

export default function AdminTransaction() {
  const [data, setData] = useState();
  const transactionFetch = (res) => {
    if (res.data.success) {
      let temp = res.data.DATA.map((val) => {
        return {
          id: val.id,
          status: val.status_name,
          payment_proof:
            val.payment_proof != "No payment proof" ? (
              <a href={URL_API + val.payment_proof} target="_blank">
                {val.payment_proof == "No payment proof"
                  ? "No payment proof"
                  : "Payment proof available"}
              </a>
            ) : (
              val.payment_proof
            ),
          total: val.total,
          full_name: val.full_name,
          action: (
            <Link to={`/admin/Detail/${val.id}`}>
              <Button variant="contained" color="primary">
                Detail
              </Button>
            </Link>
          ),
        };
      });
      temp = temp.map((val) => {
        return Object.values(val);
      });
      setData([...temp]);
    } else {
      console.log(res);
    }
  };
  useEffect(() => {
    axios
      .get(`${URL_API}/admins/transaction`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(transactionFetch)
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Transaction</h4>
            <p className={classes.cardCategoryWhite}>On going order</p>
          </CardHeader>
          <CardBody>
            {data ? (
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Order id",
                  "Status",
                  "Bukti Permbayaran",
                  "Total",
                  "Nama Pelanggan",
                  "Action",
                ]}
                tableData={[...data]}
              />
            ) : null}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
