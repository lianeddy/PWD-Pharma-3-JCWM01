import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import {InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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
  text: {
    fontSize: 10,
  }
}));

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Test password eyes
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [alertData, setAlertData] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handlerRegister = () => {

    if(username === "" || password === "" || full_name === "" || email === "" ){
      return setAlertData({
        isOpen: true,
        message: "Field tidak boleh kosong",
        type: "error",
      });
    }

   
      if (password.length < 8) {
        return setAlertData({
          isOpen:true,
          message: "Sandi tidak boleh kurang dari 8 karakter",
          type: "error",
        })
      
    }

    const upperCaseLetters = /[A-Z]/g;
    if(!password.match(upperCaseLetters)){
      return setAlertData({
        isOpen:true,
        message: "Sandi harus menggunakan setidaknya 1 huruf besar",
        type: "error",
      })
    }

    const numbers = /[0-9]/g;
    if(!password.match(numbers)){
      return setAlertData({
        isOpen:true,
        message: "Sandi harus menggunakan setidaknya 1 angka",
        type: "error",
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
        if(!res.data.success) {
          setAlertData({
            isOpen: true,
            message: res.data.message,
            type: "error",
          });
        } else {
          setAlertData({
            isOpen: true,
            message: res.data.message,
            type: "success",
          });

        setFullName("");
        setEmail("");
        setPassword("");
        setUsername("");
        }
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
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() =>
          setAlertData({
            isOpen: false,
            message: "",
            type: "",
          })
        }
      >
        <Alert severity={alertData.type}>{alertData.message}</Alert>
      </Snackbar>

      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className={classes.paper}>
          <Box p={2} textAlign="center">
            <img src={Logo} width="80px" alt="logo" />
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
          type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
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
          <Typography  variant="caption">*sandi setidaknya harus menggunakan 1 huruf kapital, 1 angka, dan minimal 8 karakter</Typography> 
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
              <Link onClick={goToSignin} variant="body2"  component="button">
                Masuk di sini.
              </Link>
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
