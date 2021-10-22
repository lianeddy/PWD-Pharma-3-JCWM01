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

        margin: theme.spacing(3, 0, 2),
    
    },
}));
export default function FormDialog(props) {
    const classes = useStyles();

    const [nama, setNama] = useState('')
    const [harga, setHarga] = useState('');
    const [gambar, setGambar] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [jumlah, setJumlah] = useState('')
    const [kategori, setKategori] = useState('')
    const [id, setId] = useState('')
    console.log(props.selectedData.name)


    const payloadEdit = {
        editNama: nama,
        editHarga: harga,
        editGambar: gambar,
        editDeskripsi: deskripsi,
        editJumlah: jumlah,
        editSelectedCategories: kategori,
        editId: id
    }

    

    useEffect(() => {
        setNama(props.selectedData.name)
        setHarga(props.selectedData.price)
        setGambar(props.selectedData.image)
        setDeskripsi(props.selectedData.description)
        setJumlah(props.selectedData.quantity)
        setKategori(props.selectedData.category_id)
        setId(props.selectedData.product_id)

    }, [props.selectedData])

    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit produk</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Merubah data produk
                    </DialogContentText>
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
                    <Button onClick={ () => props.handleConfirm(payloadEdit)} color="primary">
                        SIMPAN
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
