import React, { useState } from "react";
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
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

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("")

    const [alertData, setAlertData] = useState({
        isOpen: false,
        message: '',
        type: ''
    });



    // CREATE HANDLER TO CHANGE PASSWORD YA PRAM
    const handleChangePassword = () => {
        const user_id = localStorage.getItem("userId")
        axios
            .patch("http://localhost:3300/users/changepassword", {
                user_id,
                password: currentPassword,
                newPassword: password,
            })
            .then((res) => {
                console.log("success")

            }).catch((err) => {

                console.log("errorr")

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
                            autoComplete="currentPassword"
                            autoFocus
                            onChange={(event) => {
                                setCurrentPassword(event.target.value);
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
                            autoComplete="password"
                            autoFocus
                            onChange={(event) => {
                                setPassword(event.target.value);
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
                            type="confirmpassword"
                            id="confirmpassword"
                            autoComplete="confirm-password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />

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
        users: state.userReducer.userData
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserdata: (data) => dispatch(getUserdata(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword))