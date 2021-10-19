import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import { useParams } from "react-router";
import { Button } from "@material-ui/core";
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardBody from "template-components/Card/CardBody.js";
import StatusWrapper from "components/transaction/user/statuswrapper";
import axios from "axios";
import { URL_API } from "helper/helper";
import Table from "template-components/Table/Table.js";

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

export default function UserTransactionDetail() {
  const [dataOrder, setDataOrder] = useState();
  const [dataItem, setDataItem] = useState();
  const [dataItemF, setDataItemF] = useState();
  const { id } = useParams();
  const dataFetch = (data) => {
    const dataF = data.map((val) => {
      let parsing = {
        ...val,
        IMAGE: <img style={{ width: "200px" }} src={val.IMAGE} />,
      };
      return Object.values(parsing);
    });
    setDataItemF([...dataF]);
    console.log(dataF, "Hello");
  };
  useEffect(() => {
    axios
      .get(`${URL_API}/users/transactionDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dataFetch(res.data.DATA);
        setDataItem(...res.data.DATA);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(`${URL_API}/users/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataOrder({ ...res.data.DATA[0] });
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
            <h4 className={classes.cardTitleWhite}>Detail</h4>
            <p className={classes.cardCategoryWhite}>On going order</p>
          </CardHeader>

          <CardBody>
            <div>
              {dataOrder ? (
                <StatusWrapper
                  status_id={dataOrder.status_id}
                  order_id={dataOrder.id}
                  total={dataOrder.total}
                  payment_proof={
                    dataOrder.payment_proof == "No payment proof"
                      ? null
                      : dataOrder.payment_proof
                  }
                />
              ) : null}
            </div>{" "}
            {dataItemF ? (
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Product Id",
                  "Quantity",
                  "Product Name",
                  "Image",
                  "Total",
                ]}
                tableData={[...dataItemF]}
              />
            ) : null}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
