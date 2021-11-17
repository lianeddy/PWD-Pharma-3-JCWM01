import React, { useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { URL_API } from "helper/helper";
// core components
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import Table from "template-components/Table/Table.js";
import Tasks from "template-components/Tasks/Tasks.js";
import CustomTabs from "template-components/CustomTabs/CustomTabs.js";
import Danger from "template-components/Typography/Danger.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardIcon from "template-components/Card/CardIcon.js";
import CardBody from "template-components/Card/CardBody.js";
import CardFooter from "template-components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import Klinik from "assets/img/Klinik.png";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Landing() {
  const classes = useStyles();
  const [img, setImg] = useState();
  const addImg = () => {
    let formData = new FormData();
    let obj = {
      name: "Random",
    };
    formData.append("data", JSON.stringify(obj));
    formData.append("file", img);
    axios
      .post(`${URL_API}/users/testupload`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          borderBottom: "solid 1px black",
        }}
      >
        <img src={Klinik} style={{ width: "20%", marginTop: "20px" }} />
        <h2>APOTEK UNTUK KITA SEMUA</h2>
        <p
          style={{
            padding: "0px 100px 100px 100px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          KLINIK-KU adalah sebuah apotek yang menyediakan layanan beli
          produk secara online, layanan kami dari produk barang beli langsung
          yang bisa dipilih secara online, juga layanan rancang obat dari resep
          dokter. Tak lagi harus pergi ke apotek untuk mencari apakah obat yang
          dicari tersedia atau tidak, dengan KLINIK-KU semua menjadi lebih mudah!
        </p>
      </div>
      <div style={{ marginTop: "100px" }}></div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader
              color="success"
              stats
              icon
              style={{ textAlign: "left" }}
            >
              <CardIcon color="success">
                <Icon>done</Icon>
              </CardIcon>
              <h3 className={classes.cardCategory}>Great Medicine</h3>
              <p className={classes.cardTitle}>
                Produk kami 100% produk asli dan dengan harga terjangkau! Kami
                yakin produk yang kami jual adalah produk yang berkualitas dan
                aman untuk digunakan.
              </p>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader
              color="success"
              stats
              icon
              style={{ textAlign: "left" }}
            >
              <CardIcon color="success">
                <Icon>done</Icon>
              </CardIcon>
              <h3 className={classes.cardCategory}>Great Service</h3>
              <p className={classes.cardTitle}>
                Tim kami selalu siap untuk membantu anda! Apapun yang anda
                butuhkan, obat yang anda inginkan, kami siap untuk membantu anda
                dalam proses pembelian kebutuhan obat-obat!
              </p>
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader
              color="success"
              stats
              icon
              style={{ textAlign: "left" }}
            >
              <CardIcon color="success">
                <Icon>done</Icon>
              </CardIcon>
              <h3 className={classes.cardCategory}>Great People</h3>
              <p className={classes.cardTitle}>
                Kami yakin dengan menyediakan produk dan servis yang menjangkau
                kita bisa membuat anda bahagia!
              </p>
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
      <div
        style={{ marginTop: "100px", borderBottom: "solid 1px black" }}
      ></div>
      {/* <div style={{ textAlign: "center" }}>
        <h2>Catalogue</h2>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
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
                <p className={""}>
                  <span className={""}>
                    <AccessTime className={""} /> 55%
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
                <p className={""}>
                  <span className={""}>
                    <AccessTime className={""} /> 55%
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
                <p className={""}>
                  <span className={""}>
                    <AccessTime className={""} /> 55%
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
        </GridContainer>
      </div> */}
    </div>
  );
}
