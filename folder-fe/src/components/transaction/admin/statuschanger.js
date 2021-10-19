import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";

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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);
const StatusChanger = ({
  order_id,
  status,
  status_options,
  hdnChangeStatus,
  prescription,
  total,
  status_id,
}) => {
  const classes = useStyles();
  const [totals, setTotal] = useState(total);
  const [statusChange, setStatusChange] = useState(1);
  useEffect(() => {
    setTotal(total);
  }, [total]);
  return (
    <div>
      <h2>{status}</h2>

      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="success" style={{ margin: "auto" }}>
            {prescription ? (
              <img src={prescription} style={{ width: "200px" }} />
            ) : (
              <h4>Order has no prescription</h4>
            )}
          </CardHeader>
          <CardBody>
            {status_options ? (
              <>
                <Select
                  id="status_id"
                  value={statusChange}
                  style={{ width: "100%" }}
                  onChange={(e) => setStatusChange(e.target.value)}
                >
                  {status_options.map((val) => {
                    return (
                      <MenuItem
                        value={val.STATUS_ID}
                        disabled={val.STATUS_NAME == status ? true : false}
                      >
                        {val.STATUS_NAME}
                      </MenuItem>
                    );
                  })}
                </Select>
              </>
            ) : null}
          </CardBody>
          <CardFooter style={{ margin: "auto", paddingBottom: "10px" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log({
                  order_id,
                  test: statusChange,
                });
                return window.confirm(
                  `Are sure you want to change this order status?`
                )
                  ? hdnChangeStatus(order_id, statusChange)
                  : null;
              }}
            >
              Change Status
            </Button>
          </CardFooter>
        </Card>
      </GridItem>
      <Card></Card>
      <div style={{ float: "right" }}>
        <h2>
          Total: Rp.{" "}
          <input
            type="text"
            style={{ color: "green", fontWeight: "bold", fontSize: "24px" }}
            value={totals}
            onChange={(e) => setTotal(e.target.value)}
          />
        </h2>
      </div>
    </div>
  );
};
export default StatusChanger;
