import React, { useState } from "react";
import { useHistory } from "react-router";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import Alert from '@material-ui/lab/Alert';

import Snackbar from '@material-ui/core/Snackbar';

import Logo from "../../assets/img/logo/Klinik.png";

import { getUserdata } from 'redux/actions/userAction';

const useStyles = makeStyles((theme) => ({
    container: {
        background: "#03989e",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    paper: {
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        color: "#03989e",
        fontSize: 24,
    },
    subtitle: {
        color: "#6fbc97",
    },
    subtitle2: {
        color: "#03989e"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        borderRadius: 8,
        backgroundColor: "#03989e",
        margin: theme.spacing(3, 0, 2),
        "&:hover": {
            backgroundColor: "#03989e",
        },
    },
}));

const ChangePassword = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("")

    // Test password eyes
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [alertData, setAlertData] = useState({
        isOpen: false,
        message: '',
        type: ''
    });

    // GO BACK TO LANDING PAGE OR HOME HANDLER
    const goToLandingPage = () => {
        history.push('/')
    }


    // CREATE HANDLER TO CHANGE PASSWORD YA PRAM
    const handleChangePassword = () => {

        if (password === "" || confirmPassword === "" || currentPassword === "") {
            return setAlertData({
                isOpen: true,
                message: "Sandi tidak boleh kosong",
                type: "error"

            })
        }

        if (password !== confirmPassword) {
            return setAlertData({
                isOpen: true,
                message: "Sandi tidak sama",
                type: "error"

            })
        }

        const user_id = props.users.user_id;
        const token = localStorage.getItem('token')
        console.log("=============> ini ", user_id)
        axios
            .patch("http://localhost:3300/users/changepassword", {
                user_id,
                password: currentPassword,
                newPassword: password,
            }, {
                // Express bearer token to read users header
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log("success");
                console.log(res);
                console.log(props.users.role_id.toString(), "=======================================aa=a=a=")
                setAlertData({
                    isOpen: true,
                    message: "Sukses mengganti sandi",
                    type: "success"

                });
                
            }).catch((err) => {
                setAlertData({
                    isOpen: true,
                    message: "Sandi lama salah",
                    type: "error"
                });

            })

    };



    return (
        <div className={classes.container}>
            <Snackbar
                open={alertData.isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={() => setAlertData({
                    isOpen: false,
                    message: '',
                    type: ''
                })}>
                <Alert severity={alertData.type}>{alertData.message}</Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <Paper elevation={3} className={classes.paper}>

                    <Box p={2} textAlign="center">
                        <img src={Logo} width="125px" alt="logo" />
                        <Box mt={1}>
                            <Typography className={classes.title}>
                                <b>KLINIK-KU</b>
                            </Typography>
                            <Typography className={classes.subtitle}>
                                APOTEK ONLINE
                            </Typography>
                        </Box>
                    </Box>
                    <Typography mt={3} className={classes.subtitle2}>
                        GANTI SANDI
                    </Typography>

                    <div className={classes.form} noValidate>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="currentPassword"
                            label="Current Password"
                            name="currentPassword"
                            value={currentPassword}
                            type={showPassword ? "text" : "password"}
                            autoComplete="currentPassword"
                            autoFocus
                            onChange={(event) => {
                                setCurrentPassword(event.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            value={password}
                            type={showPassword ? "text" : "password"}
                            autoComplete="password"
                            autoFocus
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/* CONFIRM PASSWORD */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            value={confirmPassword}
                            label="Confirm password"
                            type={showPassword ? "text" : "password"}
                            id="confirmpassword"
                            autoComplete="confirm-password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/*BACK TO HOME/LANDING PAGE*/}
                        <Typography variant="body2">
                            <Link onClick={goToLandingPage} variant="body2">
                                Kembali ke halaman utama
                            </Link>
                        </Typography>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleChangePassword}
                        >
                            Konfirmasi
                        </Button>
                        <div>
                        </div>
                    </div>
                </Paper>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.userReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserdata: (data) => dispatch(getUserdata(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword))


// NOTES: INGIN MENCOBA MENAMBAHKAN HISTORY() KETIKA SELESAI MERUBAH PASSWORD-
// - TETAPI TIDAK BISA MENGAMBIL ROLE ID DARI GLOBAL STATE. NANTI DICOBA LAGI, UNTUK SEMENTARA-
// MENAMBAHKAN OPSI BALIK KE MENU HALAMAN USER/ADMIN
