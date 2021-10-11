import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";


import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import Logo from "../../assets/img/logo/Klinik.png";

const useStyles = makeStyles((theme) => ({
  wrapper: {
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
    margin: theme.spacing(2, 0, 2),
    "&:hover": {
      backgroundColor: "#03989e",
    },
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertData, setAlertData] = useState({
    isOpen: false,
    message: '',
    type: ''
  });


  const handlerRegister = () => {

    if(username === "" || password === "" || full_name === "" || email === "" ){
      return setAlertData({
        isOpen: true,
        message: "Field tidak boleh kosong",
        type: "error"

      })
    }

    axios
      .post("http://localhost:3300/users/register", {
        full_name: full_name,
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        setFullName('')
        setEmail('')
        setPassword('')
        setUsername('')

        setAlertData({
          isOpen: true,
          message: "Register Success",
          type: 'success'
        })
        
        
        console.log("sukses");
      })
      .catch((err) => {
        console.log(err);
      });
  };


 

  const goToSignin = () => {
    history.push("/login");
  };

  return (
    <div className={classes.wrapper}>

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
            <img src={Logo} width="96px" alt="logo" />
            <Box mt={1}>
              <Typography className={classes.title}>
                <b>KLINIK-KU</b>
              </Typography>
              <Typography className={classes.subtitle}>
                APOTEK ONLINE
              </Typography>
            </Box>
          </Box>
          

          <TextField
            margin="normal"
            autoComplete="fname"
            name="full_name"
            value={full_name}
            variant="outlined"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            autoFocus
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            autoComplete="uname"
            name="username"
            value={username}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            autoComplete="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handlerRegister}
          >
            Daftar
          </Button>
          <div>
            <Typography variant="body2">
              Sudah punya akun?{" "}
              <Link onClick={goToSignin} variant="body2">
                Masuk di sini.
              </Link>
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}


