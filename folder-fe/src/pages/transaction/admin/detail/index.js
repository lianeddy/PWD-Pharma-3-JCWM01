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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { URL_API } from "helper/helper";
import Table from "template-components/Table/Table.js";
import StatusChanger from "components/transaction/admin/statuschanger";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
const style = {
  position: "absolute",
  overflowY: "scroll",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const useStyles = makeStyles(styles);

export default function AdminTransactionDetail() {
  const [dataOrder, setDataOrder] = useState();
  const [dataItem, setDataItem] = useState();
  const [dataItemF, setDataItemF] = useState();
  const [status_option, setStatus] = useState();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const [rawItems, setRawItems] = useState([]);
  const [rawItemsF, setRawItemsF] = useState([]);
  const [customMed, setCustomMed] = useState([]);
  const [customMedF, setCustomMedF] = useState([]);

  const statusFetch = () => {
    axios
      .get(`${URL_API}/admins/status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setStatus([...res.data.DATA]);
      })
      .catch((err) => console.error(err));
  };
  const transactionDetailFetch = () => {
    axios
      .get(`${URL_API}/admins/transactionDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dataParse(res.data.DATA);
        setDataItem([...res.data.DATA]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const transactionFetch = () => {
    axios
      .get(`${URL_API}/admins/transaction/${id}`, {
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
  };
  const dataParse = (data) => {
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
  const dataParseRaw = (data) => {
    const dataF = data.map((val) => {
      let parsing = {
        id: val.product_id,
        name: val.name,
        desc: val.description,
        IMAGE: <img style={{ width: "200px" }} src={val.image} />,
        price: val.price,
        measurement: val.measurement_ml
          ? `${val.measurement_ml} ml`
          : `${val.measurement_mg} mg`,
        stock: val.quantity_inventory,
        actions: (
          <Button
            onClick={() => hdnAdd(val.product_id)}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        ),
      };
      return Object.values(parsing);
    });
    setRawItemsF([...dataF]);
    console.log(dataF, "Hello");
  };
  const dataParseCutom = (data) => {
    const dataF = data.map((val) => {
      let parsing = {
        id: val.product_id,
        name: val.name,
        price: val.price * val.quantity_inventory,
        measurement: val.measurement_ml
          ? `${val.measurement_ml * val.quantity_inventory} ml`
          : `${val.measurement_mg * val.quantity_inventory} mg`,
        stock: val.quantity_inventory,
        actions: (
          <>
            <Button
              onClick={() => hdbRemove(val.product_id)}
              variant="contained"
              color="primary"
            >
              -
            </Button>
            <Button
              onClick={() => hdnAdd(val.product_id)}
              variant="contained"
              color="primary"
            >
              +
            </Button>
          </>
        ),
      };
      return Object.values(parsing);
    });
    setCustomMedF([...dataF]);
    console.log(dataF, "Hello");
  };
  const rawMedicineFetch = () => {
    axios
      .get(`${URL_API}/admins/getRawMedicine`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRawItems([...res.data.DATA]);
      })
      .catch((err) => console.error(err));
  };
  const classes = useStyles();
  function hdnAdd(id) {
    let valtemp = { ...rawItems.find((x) => x.product_id == id) };

    let temp = rawItems.map((val) =>
      val.product_id == id
        ? {
            ...val,
            quantity_inventory:
              val.quantity_inventory == 1 ? 1 : (val.quantity_inventory -= 1),
          }
        : val
    );

    let temp2;
    if (customMed.find((x) => x.product_id == id)) {
      customMed.find((x) => x.product_id == id).quantity_inventory +=
        valtemp.quantity_inventory == 1 ? 0 : 1;
      temp2 = [...customMed];
    } else {
      temp2 = [...customMed, { ...valtemp, quantity_inventory: 1 }];
    }

    let customF = [...temp2];
    console.log(temp2, "temp2");
    console.log(customF, "customF");
    dataParseRaw(temp);
    setCustomMed([...customF]);
  }
  function hdbRemove(id) {
    let valtemp = { ...rawItems.find((x) => x.product_id == id) };

    let temp = rawItems.map((val) =>
      val.product_id == id
        ? {
            ...val,
            quantity_inventory: (val.quantity_inventory += 1),
          }
        : val
    );

    let temp2;
    if (customMed.find((x) => x.product_id == id)) {
      customMed.find((x) => x.product_id == id).quantity_inventory -= 1;
      temp2 = [...customMed];
    } else {
      temp2 = [...customMed, { ...valtemp, quantity_inventory: 1 }];
    }
    temp2 = temp2.filter((x) => x.quantity_inventory > 0);
    let customF = [...temp2];
    console.log(temp2, "temp2");
    console.log(customF, "customF");
    dataParseRaw(temp);
    setCustomMed([...customF]);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hdnChangeStatus = (order_id, status_id) => {
    console.log({ order_id, status_id }, "Status");
    axios
      .post(
        `${URL_API}/admins/status`,
        {
          order_id,
          status_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        transactionFetch();
      });
  };
  function hdnFinishCustom() {
    let newCustomMeds = customMed.map((x) => {
      return {
        PRODUCT_ID: x.product_id,
        QUANTITY: `${
          x.quantity_inventory *
          (x.measurement_ml ? x.measurement_ml : x.measurement_mg)
        } ${x.measurement_ml ? "ml" : "mg"}`,
        NAME: x.name,
        IMAGE: x.image,
        TOTAL: x.price * x.quantity_inventory,
      };
    });
    let newTotal =
      newCustomMeds.reduce((prev, next) => prev + next.TOTAL, 0) +
      dataOrder.total;
    alert(newTotal);
    setDataOrder({ ...dataOrder, total: newTotal });
    setDataItem([...dataItem, ...newCustomMeds]);
    dataParse([...dataItem, ...newCustomMeds]);
    handleClose();
  }

  useEffect(() => {
    transactionDetailFetch();
    transactionFetch();
    statusFetch();
    rawMedicineFetch();
  }, []);
  useEffect(() => {
    dataParseRaw(rawItems);
  }, [rawItems]);
  useEffect(() => {
    dataParseCutom(customMed);
    dataParseRaw(rawItems);
  }, [customMed]);
  useEffect(() => {
    console.log(dataOrder, "Data IRder");
  });
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
                <>
                  {" "}
                  <StatusChanger
                    order_id={dataOrder.id}
                    status={dataOrder.status_name}
                    status_id={dataOrder.status_id}
                    status_options={status_option}
                    hdnChangeStatus={hdnChangeStatus}
                    prescription={
                      dataOrder.prescription != "0"
                        ? URL_API + dataOrder.prescription
                        : null
                    }
                    total={dataOrder.total}
                  />{" "}
                </>
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
        <Card>
          <CardBody>
            <div>
              <Button
                color="primary"
                style={{ float: "right" }}
                onClick={handleOpen}
              >
                Add Custom Medicine
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Raw Material
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }} sty>
                    {rawItemsF ? (
                      <div>
                        <h4>Inventory</h4>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={[
                            "Product Id",
                            "Name",
                            "Description",
                            "Image",
                            "Price",
                            "Measurement",
                            "Stock",
                            "Action",
                          ]}
                          tableData={[...rawItemsF]}
                        />
                        <h4>Custom</h4>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={[
                            "Product Id",
                            "Name",
                            "Total Price",
                            "Total Measurement",
                            "Stock",
                            "Action",
                          ]}
                          tableData={[...customMedF]}
                        />
                        {customMedF.length > 0 ? (
                          <Button
                            style={{ float: "right" }}
                            color="primary"
                            variant="contained"
                            round
                            onClick={(e) => {
                              if (window.confirm("Selesai merancang resep?")) {
                                hdnFinishCustom();
                              }
                            }}
                          >
                            Finish Custom Meds
                          </Button>
                        ) : null}
                      </div>
                    ) : null}
                  </Typography>
                </Box>
              </Modal>
            </div>
          </CardBody>
        </Card>
      </GridItem>
      <button onClick={() => hdnAdd(222)} />
    </GridContainer>
  );
}
