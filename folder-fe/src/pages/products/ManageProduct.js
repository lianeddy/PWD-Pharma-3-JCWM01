import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { URL_API } from 'helper/helper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
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
    borderRadius: 8,
    backgroundColor: "#03989e",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      backgroundColor: "#03989e",
    },
  },
}));

const Products = (props) => {
  const classes = useStyles();
  // Product yang akan diinput ke dalam table
  const [namaProduk, setNamaProduk] = useState('');
  const [hargaProduk, setHargaProduk] = useState('');
  const [gambarProduk, setGambarProduk] = useState('');
  const [deskripsiProduk, setDeskripsiProduk] = useState('');
  const [jumlahProduk, setJumlahProduk] = useState('');

  // Untuk edit produk
  const [editNama, setEditNama] = useState('');
  const [editHarga, setEditHarga] = useState('');
  const [editGambar, setEditGambar] = useState('');
  const [editDeskripsi, setEditDeskripsi] = useState('');
  const [editJumlah, setEditJumlah] = useState('');

  // Product list adalah sebuah var yang menampung data produk yg didapat dari database.
  const [productList, setProductList] = useState([]);

  // Menampung list categories yg didapatkan dari db
  const [categoriesList, setCategoriesList] = useState([]);
  // Menampung value categories yg dipilih
  const [selectedCategories, setSelectedCategories] = useState([]);
  // Edit value categories pada produk
  const [editSelectedCategories, setEditSelectedCategories] = useState('');

  const [editId, setEditID] = useState(0);

  // to GET data
  const fetchProduct = () => {
    axios.get(`${URL_API}/products/getproducts`,)
      .then((results) => {
        setProductList(results.data)
        console.log(results.data, "ini result data")
      }).catch(() => {
        alert("Server error")
      })
  };

  // to INPUT data
  const handlerInput = () => {
    axios
      .post(`${URL_API}/products/inputproducts`, {
        namaProduk,
        hargaProduk,
        gambarProduk,
        deskripsiProduk,
        jumlahProduk,
        selectedCategories
      })
      .then((res) => {
        setNamaProduk("");
        setHargaProduk("");
        setGambarProduk("");
        setDeskripsiProduk("");
        setJumlahProduk("");
        fetchProduct();

      })
      .catch((err) => {
        console.log(err)
      })
  }

  // to SAVE EDIT DATA
  const handlerEdit = () => {
    axios
      .patch(`${URL_API}/products/editproducts`, {
        editNama,
        editHarga,
        editGambar,
        editDeskripsi,
        editJumlah,
        editSelectedCategories,
        editId

      })
      .then((res) => {
        // setNamaProduk("");
        // setHargaProduk("");
        // setGambarProduk("");
        // setDeskripsiProduk("");
        // setJumlahProduk("");
        fetchProduct();
        cancleEdit();

      })
      .catch((err) => {
        console.log(err)
      })
  }

  // to Get catrgories
  const fetchCategories = () => {
    axios.get(`${URL_API}/products/getcategories`)
      .then((results) => {
        setCategoriesList(results.data)
        console.log(results.data, "ini result data")
      }).catch(() => {
        alert("Server error")
      })
  };

  // All Handler and toggle
  const handleChange = (e) => {
    setSelectedCategories(e.target.value);
  }

  const editHandleChange = (e) => {
    setEditSelectedCategories(e.target.value);
  }

  const editToggle = (product_id) => {
    setEditID(product_id)
  }

  const cancleEdit = () => {
    setEditID(0)
  }

  // to RENDER produk automatically after render
  useEffect(() => {
    fetchCategories()
    fetchProduct()
  }, []);

  // Merender Produk List
  const printData = () => {
    return productList.map((val) => {
      if (val.product_id === editId) {
        return (
          <TableRow key={val.name}>

            <TableCell component="th" scope="row">
              <TextField
                margin={'dense'}
                label="Nama"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                // value={namaProduk}
                value={editNama}
                onChange={(event) => {
                  setEditNama(event.target.value);
                }}
              />
            </TableCell>

            <TableCell align="left">
              <TextField
                margin={'dense'}
                label="Harga"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                // defaultValue={hargaProduk}
                value={editHarga}
                onChange={(event) => {
                  setEditHarga(event.target.value);
                }}
              />
            </TableCell>

            <TableCell align="left">
              <TextField
                margin={'dense'}
                label="Gambar"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                // defaultValue={gambarProduk}
                value={editGambar}
                onChange={(event) => {
                  setEditGambar(event.target.value);
                }}
              />
            </TableCell>

            <TableCell align="left">
              <TextField
                margin={'dense'}
                label="Deskripsi"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                // defaultValue={deskripsiProduk}
                value={editDeskripsi}
                onChange={(event) => {
                  setEditDeskripsi(event.target.value);
                }}
              />
            </TableCell>
            <TableCell align="left">
              <TextField
                margin={'dense'}
                label="Jumlah"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                // defaultValue={jumlahProduk}
                value={editJumlah}
                onChange={(event) => {
                  setEditJumlah(event.target.value);
                }}
              />
            </TableCell>
            <TableCell align="left">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editSelectedCategories}
                  onChange={editHandleChange}
                >
                  {printCategories()}

                </Select>
              </FormControl>
            </TableCell>
            <TableCell align="left"><Button onClick={handlerEdit} className={classes.button} size="medium" variant="contained" color="secondary" m={2} >Simpan</Button></TableCell>
            <TableCell align="left"><Button onClick={cancleEdit} className={classes.button} size="medium" variant="contained" color="secondary" m={2} >Batal</Button></TableCell>
          </TableRow>
        )
      }
      return <TableRow key={val.name}>
        <TableCell component="th" scope="row">
          {val.name}
        </TableCell>
        <TableCell align="left">{val.price}</TableCell>
        <TableCell align="left"> <img className={classes.gambar} src={val.image} alt="produk" /></TableCell>
        <TableCell align="left">{val.description}</TableCell>
        <TableCell align="left">{val.quantity}</TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"><Button onClick={() => { editToggle(val.product_id) }} className={classes.button} size="medium" variant="contained" color="primary" m={2} >Edit</Button></TableCell>
      </TableRow>

    })
  }

  const printCategories = () => {
    return categoriesList.map((val) => {
      return <MenuItem value={val.category_id}>{val.category_name}</MenuItem>
    })
  }

  console.log(productList, "ini product list >>>>>>>>>>>>>>.", editId)
  return (
    <Container>
      <Box p={5}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell>Nama Produk</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Gambar</TableCell>
                <TableCell align="left">Deskripsi</TableCell>
                <TableCell align="left">Jumlah</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Edit Produk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <TextField
                    margin={'dense'}
                    label="Nama"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    value={namaProduk}
                    onChange={(event) => {
                      setNamaProduk(event.target.value);
                    }}
                  /></TableCell>

                <TableCell>
                  <TextField
                    align="left"
                    margin={'dense'}
                    label="Harga"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    value={hargaProduk}
                    onChange={(event) => {
                      setHargaProduk(event.target.value);
                    }}
                  /></TableCell>

                <TableCell>
                  <TextField
                    margin={'dense'}
                    label="Gambar"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    value={gambarProduk}
                    onChange={(event) => {
                      setGambarProduk(event.target.value);
                    }}
                  /></TableCell>
                <TableCell>
                  <TextField
                    margin={'dense'}
                    label="Deskripsi"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    value={deskripsiProduk}
                    onChange={(event) => {
                      setDeskripsiProduk(event.target.value);
                    }}
                  /></TableCell>
                <TableCell>
                  <TextField
                    margin={'dense'}
                    label="Jumlah"
                    id="outlined-size-small"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    value={jumlahProduk}
                    onChange={(event) => {
                      setJumlahProduk(event.target.value);
                    }}
                  /></TableCell>

                <TableCell>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCategories}
                      onChange={handleChange}
                    >
                      {printCategories()}

                    </Select>
                  </FormControl>
                </TableCell>
                <Button onClick={handlerInput} className={classes.button} size="medium" variant="contained" color="primary" m={2} >Tambah</Button>
              </TableRow>
              {printData()}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}


export default Products
