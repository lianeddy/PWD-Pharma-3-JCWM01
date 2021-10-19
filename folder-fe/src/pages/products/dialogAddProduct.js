import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    gambar: {
        width: 100,
    },
    button: {
        // borderRadius: 8,
        // backgroundColor: "#03989e",
        margin: theme.spacing(3, 0, 2),
        // "&:hover": {
        //   backgroundColor: "#03989e",
        // },
    },
}));
export default function FormDialogAddData(props) {
    const classes = useStyles();

    const [nama, setNama] = useState('')
    const [harga, setHarga] = useState('');
    const [gambar, setGambar] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [jumlah, setJumlah] = useState('')
    const [kategori, setKategori] = useState('')

    const payload = {
        namaProduk: nama,
        hargaProduk: harga,
        gambarProduk: gambar,
        deskripsiProduk: deskripsi,
        jumlahProduk: jumlah,
        selectedCategories: kategori,
    }

    const handleKategori = (e) => {
        setKategori(e.target.value)
    }

    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Menambahkan Produk</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Isi dengan produk baru
                    </DialogContentText> */}
                    <TextField
                        margin={'dense'}
                        label="Nama"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={nama}
                        onChange={(event) => {
                            setNama(event.target.value);
                        }}
                    />

                    <TextField
                        margin={'dense'}
                        label="Harga"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={harga}
                        onChange={(event) => {
                            setHarga(event.target.value);
                        }}
                    />
                    <TextField
                        margin={'dense'}
                        label="Gambar"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={gambar}
                        onChange={(event) => {
                            setGambar(event.target.value);
                        }}
                    />

                    <TextField
                        margin={'dense'}
                        label="Deskripsi"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={deskripsi}
                        onChange={(event) => {
                            setDeskripsi(event.target.value);
                        }}
                    />

                    <TextField
                        margin={'dense'}
                        label="Jumlah"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={jumlah}
                        onChange={(event) => {
                            setJumlah(event.target.value);
                        }}
                    />
                    {props.renderItemCategories(kategori, setKategori)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        BATAL
                    </Button>
                    <Button onClick={ () => props.handleAddProduct(payload)} color="primary">
                        SIMPAN
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
