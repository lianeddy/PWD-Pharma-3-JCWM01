import React, {useEffect, useState} from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { URL_API } from 'helper/helper';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";


const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    gambar: {
      width: 100,
    },
    button: {
      backgroundColor: "#03989e",
      margin: theme.spacing(3, 0, 2),
      color: '#fff',
      "&:hover": {
        backgroundColor: "#00cbd3",
      },
    },
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
    cardHeader: {
      backgroundColor: "#03989e"
    }
  }));


const AdminRevenue = () => {

    const classes = useStyles();

    const [transactionList, setTransactionList] = useState([])
    const [dataChart, setDataChart] = useState([])


    const fetchTransaction = () => {
        axios.get(`${URL_API}/admins/admin/revenue`,)
          .then((results) => {
            setTransactionList(results.data.data)
            setDataChart(results.data.revenue)
          }).catch(() => {
            alert("Server error")
          })
      };

      useEffect(() => {
        fetchTransaction()
     
      }, []);

    
    

      const renderTransaction = () => {
        return transactionList.map((val, index) => {
            return <TableRow key={val.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {val.user_id}
              </TableCell>
              <TableCell align="left">{val.created_date}</TableCell>
              <TableCell align="left">{val.total_payment.toLocaleString()}</TableCell>
            </TableRow>
      
          })
      }
     
    return(
        <Box p={5}>
          
        <CardHeader className={classes.cardHeader} >
          <h4 className={classes.cardTitleWhite}>Admin Revenue</h4>
        </CardHeader>
       
          <Box p={5}>
          <LineChart width={981} height={350} data={dataChart} margin={{ top: 5, right: 140, bottom: 5, left: 30 }}>
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis type="number" domain={[0, 10000000]}/>
          <Tooltip />
        </LineChart>
        </Box>
        
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell align="left">Tanggal Transaksi</TableCell>
                <TableCell align="left">Total Pembayaran</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {renderTransaction()}
            </TableBody>
          </Table>
        
        </TableContainer>
      </Box>
    )
}

export default AdminRevenue;