import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import { InputAdornment, IconButton } from "@material-ui/core";
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

import { getUserdata } from "redux/actions/userAction";

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

const Signin = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Test password eyes
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [alertData, setAlertData] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // create function to handle button login
  const handleSignin = () => {
    if (username === "" || password === "") {
      return setAlertData({
        isOpen: true,
        message: "Username atau sandi tidak boleh kosong",
        type: "error",
      });
    }

    axios
      .post("http://localhost:3300/users/login", {
        username: username,
        password: password,
      })
      .then(async (res) => {
        const { dataLogin, token } = res.data;
        await props.getUserdata(dataLogin);
        await localStorage.setItem("token", token);

        // IF ROLE ID = 1 (ADMIN) REDIRECT TO ADMIN PAGE
        if (dataLogin.role_id === 1) {
          return history.push("/");
        }

        // IF ROLE ID = 2 (USER) REDIRECT TO HOME
        history.push("/");
        console.log("Login Success ✔");
      })
      .catch((err) => {
        setAlertData({
          isOpen: true,
          message: "Username atau sandi salah",
          type: "error",
        });
      });
  };

  const goToSignup = () => {
    history.push("/register");
  };
  const goToForgetPassword = () => {
    history.push("/forgetpassword");
  };

  return (
    <div className={classes.container}>
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
            {/* USERNAME */}
            <TextField
              variant="outlined"
              margin="normal"
              value={username}
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            {/* PASSWORD */}
            <TextField
              variant="outlined"
              margin="normal"
              value={password}
              required
              fullWidth
              name="password"
              label="Sandi"
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
                ),
              }}
            />
            {/*LUPA PASSWORD*/}
            <Typography variant="body2">
              <Link
                onClick={goToForgetPassword}
                variant="body2"
                component="button"
              >
                Lupa Password
              </Link>
            </Typography>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignin}
            >
              Masuk
            </Button>
            <div>
              <Typography variant="body2">
                Belum punya akun?{" "}
                <Link onClick={goToSignup} variant="body2" component="button">
                  Daftar di sini.
                </Link>
              </Typography>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("===", state);
  return {
    users: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserdata: (data) => dispatch(getUserdata(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

// Sementara kirim id dan user role di local storage tanpa token
