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
import { VpnKeySharp } from "@material-ui/icons";

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

export default function UserTransaction() {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`${URL_API}/users/transaction`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          let temp = res.data.DATA.map((val) => {
            return {
              id: val.id,
              status_name: val.status_name,
              total: val.total,
              payment_proof: val.payment_proof,
              action: (
                <Link to={`/user/Detail/${val.id}`}>
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
      })
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
                  "Order_id",
                  "Status",
                  "Total",
                  "Payment Proof",
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
