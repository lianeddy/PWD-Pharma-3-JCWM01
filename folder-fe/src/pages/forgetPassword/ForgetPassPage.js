import React, { useState } from "react";
import { connect } from 'react-redux'
// import { useHistory } from "react-router";
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

const ForgetPassword = (props) => {
  const classes = useStyles();
  // const history = useHistory();
  const [email, setEmail] = useState('')

  const [alertData, setAlertData] = useState({
    isOpen: false,
    message: '',
    type: 'success'
  });

  const handlerChangePassword = () => {

    if(email === ""){
      return setAlertData({
        isOpen: true,
        message: "Email tidak boleh kosong",
        type: "error"

      })
    }

    axios
      .post("http://localhost:3300/users/forgetpassword", {
        email: email,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        setAlertData({
          isOpen: true,
          message: "Periksa kotak masuk email kamu",
          type: 'success'

        })
      }).catch((err) => {
        console.log(err)
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
          {/* START OF LOGO SECTION */}
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
          {/* END OF LOGO SECTION */}

          <div className={classes.form} noValidate>
            {/* EMAIL */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Masukkan email"
              name="email"
              value={email}
              autoComplete="username"
              autoFocus
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handlerChangePassword}
            >
              Kirim
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


export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)