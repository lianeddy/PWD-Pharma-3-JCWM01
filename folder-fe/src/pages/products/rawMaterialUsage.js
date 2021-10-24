import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { URL_API } from 'helper/helper';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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
  title: {
    color: "#03989e",
    fontSize: 24,
  
  },
  table: {
    border: '1px solid "#03989e"',
  },
  titleTable: {
    color: "#03989e",
    fontSize: 20,
    marginBottom: 20,
  }
}));


const RawMaterialUsage = () => {

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false)

  const [rawMaterialUsage, setRawMaterialUsage] = useState([]);
  const [sumTotal, setSumTotal] = useState([]);

  // For paginate
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(2)

  const [total, setTotal] = useState(0)

  // For Paginate
  const handleChangePage = (e, number) => {
    setPage(number)
  }

  const handleChangeRowsPerPage = (e) => {
    setLimit(e.target.value);

  }


  console.log('rawMaterialUsage', rawMaterialUsage)

  const fetchRawMaterialUsage = () => {
    setIsLoading(true)
    axios.get(`${URL_API}/products/rawmaterialusage?page=${page}&limit=${limit}`,)
      .then((results) => {
        setRawMaterialUsage(results.data.data)
        setSumTotal(results.data.sumRawMaterialUsage)
        setTotal(results.data.total)
        setIsLoading(false)
      }).catch(() => {
        alert("Server error")
        setIsLoading(false)
      })
  };

  useEffect(() => {
    fetchRawMaterialUsage()
  }, []);

  useEffect(() => {
    fetchRawMaterialUsage()
  }, [page, limit]);


  const renderRawMaterialUsage = () => {
    console.log('rawMaterialUsage', rawMaterialUsage)
    return rawMaterialUsage.map((val, index) => {
      return <TableRow key={`${val.name}${index}`}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {val.name}
        </TableCell>
        <TableCell align="left">{val.quantity}</TableCell>
        <TableCell align="left">{val.created_date}</TableCell>
      </TableRow>
    })
  };

  const renderSumTotal = () => {
    return sumTotal.map((val, index) => {
      return <TableRow key={index}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {val.Nama}
        </TableCell>
        <TableCell align="left">{val.Jumlah}</TableCell>
        <TableCell align="left"></TableCell>
      </TableRow>
    })
  };

  return (
    <div>
      <Box p={5} >
        <Typography className={classes.title} align="center">
          <b>KLINIK-KU</b>
        </Typography>
        <Typography className={classes.titleTable} align="center">
          <b>Total Pemakaian Bahan Mentah</b>
          </Typography>
        <Box mb={4}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell align="left">Nama Produk</TableCell>
                  <TableCell align="left">Jumlah</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {renderSumTotal()}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography className={classes.titleTable} align="center">
          <b>Daftar Pemakaian Bahan</b>
          </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell align="left">No.</TableCell>
                <TableCell align="left">Nama Produk</TableCell>
                <TableCell align="left">Jumlah</TableCell>
                <TableCell align="left">Tanggal Penjualan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log('rawMaterialUsage [[[[ ', rawMaterialUsage)}
              {isLoading && <TableRow>
                <TableCell colSpan={4} align="left"><Box display="flex" width="100%" justifyContent="center"> <CircularProgress size={18} /></Box></TableCell>
              </TableRow>}
              {!isLoading && renderRawMaterialUsage()}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[2, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            classes={{ spacer: classes.paginationSpacer }}
          />
        </TableContainer>
      </Box>
    </div>
  )
}

export default RawMaterialUsage;