import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import { URL_API } from 'helper/helper';

import FormDialog from './dialogDeleteProducts';
import FormEditDialog from './dialogEditProducts';
import FormDialogAddProduct from './dialogAddProduct'

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
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TablePagination from '@material-ui/core/TablePagination';

import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import EditIcon from '@material-ui/icons/EditOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import { IconButton } from '@material-ui/core';




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
}));

const ProductsAdmin = (props) => {
  const classes = useStyles();
  // Product yang akan diinput ke dalam table
  // const [namaProduk, setNamaProduk] = useState('');
  // const [hargaProduk, setHargaProduk] = useState('');
  // const [gambarProduk, setGambarProduk] = useState('');
  // const [deskripsiProduk, setDeskripsiProduk] = useState('');
  // const [jumlahProduk, setJumlahProduk] = useState('');
  const [addOpen, setAddOpen] = useState(false)

  // Product list adalah sebuah var yang menampung data produk yg didapat dari database.
  const [productList, setProductList] = useState([]);

  // Menampung list categories yg didapatkan dari db
  const [categoriesList, setCategoriesList] = useState([]);
  // Menampung value categories yg dipilih
  const [selectedCategories, setSelectedCategories] = useState('');
  // Edit value categories pada produk
  const [editSelectedCategories, setEditSelectedCategories] = useState('');

  const [editId, setEditID] = useState(0);

  // For paginate
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)

  const [total, setTotal] = useState(0)
  // const [rowsPerPage, setRowPerPage] = useState()

  // For Dialog Delete/
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('')
  const [selectedData, setSelectedData] = useState('')

  // All Handler and toggle
  // const handleChange = (e) => {
  //   setSelectedCategories(e.target.value);
  // }

  // const editHandleChange = (e) => {
  //   setEditSelectedCategories(e.target.value);
  // }

  // const editToggle = (product_id) => {
  //   setEditID(product_id)
  // }

  const cancleEdit = () => {
    setEditID(0)
  }

  // For Dialog Edit
  const [openEdit, setOpenEdit] = useState(false);


  const handleDialogEditOpen = () => {
    console.log('masuk ===  ', open)

    setOpenEdit(true);
  };

  const handleDialogEditClose = () => {
    setOpenEdit(false);
  };


  // For Dialog Delete
  const handleDialogOpen = () => {
    console.log('masuk ===  ', open)

    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    console.log('masuk ', open)
  };



  // For Paginate
  const handleChangePage = (e, number) => {
    setPage(number)
  }

  const handleChangeRowsPerPage = (e) => {
    setLimit(e.target.value);

  }

  // For Dialog Add
  const handleOpenAdd = () => {
    setAddOpen(true)
  }

  const handleCloseAdd = () => {
    setAddOpen(false)
  }




  // to GET data
  const fetchProduct = () => {
    axios.get(`${URL_API}/products/getproducts?page=${page}&limit=${limit}`,)
      .then((results) => {
        setProductList(results.data.data)
        setTotal(results.data.total)
      }).catch(() => {
        alert("Server error")
      })
  };



  // to INPUT data
  const handleAddProduct = (payload) => {
    console.log('------', payload)
    axios
      .post(`${URL_API}/products/inputproducts`, payload)
      .then((res) => {
        fetchProduct();
        handleCloseAdd();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // to SAVE EDIT DATA
  const handleEditProduct = (payload) => {
    axios
      .patch(`${URL_API}/products/editproducts`, payload)
      .then((res) => {
        fetchProduct();
        handleDialogEditClose()

      })
      .catch((err) => {
        console.log(err)
        handleDialogEditClose()
      })
  }

  // to Get categories
  const fetchCategories = () => {
    axios.get(`${URL_API}/products/getcategories`)
      .then((results) => {
        setCategoriesList(results.data)
      }).catch(() => {
        alert("Server error")
      })
  };



  const deleteBtnHandler = () => {
    axios
      .delete(`${URL_API}/products/deleteproducts`, {

        data: {
          idProduct: selectedId
        }
      })
      .then((res) => {
        fetchProduct();
        cancleEdit();
      })
      .catch((err) => {
        console.log("ini id dalam delete")
      })

    handleDialogClose()


  }

  // to RENDER product automatically after render
  useEffect(() => {
    fetchCategories()
    fetchProduct()
  }, []);

  // to RENDER produk automatically after render
  useEffect(() => {
    fetchProduct()
  }, [page, limit]);


  const renderItemCategories = (value, onChange) => {
    return <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {categoriesList.map((val) => {
        return <MenuItem value={val.category_id}>{val.category_name}</MenuItem>
      })}
    </Select>
  }


  // Merender Produk List
  const renderProductList = () => {
    return productList.map((val, index) => {
      const category = categoriesList.find((cat) => { return cat.category_id === val.category_id })
      return <TableRow key={index}>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {val.name}
        </TableCell>
        <TableCell align="left">{val.price}</TableCell>
        <TableCell align="left"> <img className={classes.gambar} src={val.image} alt="produk" /></TableCell>
        <TableCell align="left">{val.description}</TableCell>
        <TableCell align="left">{val.quantity}</TableCell>
        <TableCell align="left">{category.category_name}</TableCell>
        <TableCell align="left">
          <IconButton onClick={() => {
            // editToggle(val.product_id)
            setSelectedData(val)
            handleDialogEditOpen()
          }}
            className={classes.button} size="medium" variant="contained" color="primary" m={2} >
            <EditIcon />

          </IconButton>
        </TableCell>

        <TableCell align="left"><IconButton onClick={() => {
          setSelectedId(val.product_id)
          handleDialogOpen()
        }} className={classes.button} size="medium" variant="contained" color="secondary" m={2} >
          <DeleteIcon />
        </IconButton></TableCell>
      </TableRow>

    })
  }


  return (
    <Container>
      {/* Dialog */}
      <FormDialog
        open={open}
        handleClickOpen={handleDialogOpen}
        handleClose={handleDialogClose}
        handleConfirm={deleteBtnHandler}
      />

      <FormEditDialog
        open={openEdit}
        handleClickOpen={handleDialogEditOpen}
        handleClose={handleDialogEditClose}
        renderItemCategories={renderItemCategories}
        selectedData={selectedData}
        handleConfirm={handleEditProduct}
      />

      <FormDialogAddProduct
        open={addOpen}
        handleClose={handleCloseAdd}
        renderItemCategories={renderItemCategories}
        handleAddProduct={handleAddProduct}
      />
      {/* start from here */}


        <TableContainer component={Paper}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mr={2}>
            <Button onClick={() => { handleOpenAdd() }} className={classes.button} size="medium" variant="contained" color="primary" m={2} >Tambah Product <AddIcon fontSize="small" /></Button>
          </Box>
          <Table className={classes.table} aria-label="caption table">
            {/* <caption>A basic table example with a caption</caption> */}
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Nama Produk</TableCell>
                <TableCell align="left">Harga</TableCell>
                <TableCell align="left">Gambar</TableCell>
                <TableCell align="left">Deskripsi</TableCell>
                <TableCell align="left">Jumlah</TableCell>
                <TableCell align="left">Kategori</TableCell>
                <TableCell align="left">Edit Produk</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderProductList()}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            classes={{ spacer: classes.paginationSpacer }}
          />
        </TableContainer>


    </Container>
  );
}


export default ProductsAdmin;
