import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button, TableFooter } from "@material-ui/core";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const { tableHead, tableData, tableHeaderColor } = props;
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [inputSearch, setSearch] = useState("");
  useEffect(() => {
    setData([...tableData]);
    setTotalPage(Math.floor(tableData.length / limit));
    let pagination = tableData.slice((page - 1) * limit, page * limit);
    hdnPaging(pagination);
  }, [props.tableData, page]);
  const hdnSort = (key) => {
    let sortData =
      dataFiltered[dataFiltered.length - 1] <= dataFiltered[0]
        ? dataFiltered.sort((a, b) => (a[key] > b[key] ? 1 : -1))
        : dataFiltered.sort((a, b) => (b[key] > a[key] ? 1 : -1));
    setDataFiltered([...sortData]);
  };
  const hdnPaging = (x) => {
    setDataFiltered([...x]);
  };

  const hdnSearch = (e) => {
    let temp = data.filter((x) =>
      x.find((v) => {
        if (typeof v == "object") {
          console.log(v);
          return (
            v?.props?.label
              ?.toLowerCase()
              ?.includes(e.target.value.toLowerCase()) ?? false
          );
        }
        return v
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
    temp = temp.slice((page - 1) * limit, page * limit);
    setDataFiltered([...temp]);
  };
  return (
    <div className={classes.tableResponsive}>
      <input type="text" onChange={(e) => hdnSearch(e)} />
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead
            className={classes[tableHeaderColor + "TableHeader"]}
            style={{ backgroundColor: "#03989e" }}
          >
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <Button
                      onClick={() => hdnSort(key)}
                      style={{ color: "white" }}
                    >
                      {" "}
                      {prop}{" "}
                    </Button>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dataFiltered.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter style={{ float: "right", width: "100%" }}>
          <TableRow>
            <Button
              onClick={(e) => {
                let test = page - 1 <= 0 ? null : setPage(page - 1);
              }}
            >
              {" "}
              {"<"}{" "}
            </Button>
            {page} of {Math.ceil(tableData.length / limit)}{" "}
            <Button
              onClick={(e) => {
                let test =
                  page + 1 > Math.ceil(tableData.length / limit)
                    ? null
                    : setPage(page + 1);
              }}
            >
              {" "}
              {">"}{" "}
            </Button>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
