import React, { useState } from "react";
import { connect } from 'react-redux'
import { useHistory, withRouter } from "react-router";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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

const ResetPassword = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [alertData, setAlertData] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  //Get token from route param
  const params = new URLSearchParams(props.location.search);
  const token = params.get('token');

  const goToSignin = () => {
    history.push('/login')
  }

  // create function to handle button login
  const handlerResetPassword = () => {
    // Condition for password form field
    if (password === "" || confirmPassword === "") {
      return setAlertData({
        isOpen: true,
        message: "Field tidak boleh kosong",
        type: "error"

      })
    };

    // Axios patch to change one specific data from table
    axios
      .patch("http://localhost:3300/users/resetpassword", {
        password,
        confirmPassword
      }, {
        // Express bearer token to read users header
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        // Run set data for alert if success
        setAlertData({
          isOpen: true,
          message: 'Berhasil mengubah sandi',
          type: 'success'
        })

      }).catch((err) => {
        console.log("errorr")
        setAlertData({
          isOpen: true,
          message: 'Terjadi kesalahan ',
          type: 'success'
        })

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
          <Typography className={classes.subtitle2}>
                MENGATUR ULANG SANDI
              </Typography>

          <div className={classes.form} noValidate>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Sandi"
              name="password"
              value={password}
              autoComplete="password"
              autoFocus
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            {/* PASSWORD */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              value={confirmPassword}
              label="Konfirmasi Sandi"
              type="confirmpassword"
              id="confirmpassword"
              autoComplete="current-password"
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
              onClick={handlerResetPassword}
            >
              Konfirmasi
            </Button>

            <Typography variant="body2">
             
              <Link onClick={goToSignin} variant="body2">Kembali ke halaman Login</Link>
            </Typography>

            <div>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('===', state)
  return {
    users: state.userReducer
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getUserdata: (data) => dispatch(getUserdata(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword))