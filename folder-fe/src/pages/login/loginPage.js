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

import Logo from "../../assets/img/logo/Klinik.png";

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

export default function Signin() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // create function to handle button login
  const handleSignin = () => {
    axios
      .post("http://localhost:3300/users/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        // kalo sukses redirect ke home
      })
      .catch((err) => {
        // kalo error ngapain?
      });
  };

  const goToSignup = () => {
    history.push("/register");

  }

  return (
    <div className={classes.container}>
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
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
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
                <Link onClick={goToSignup} variant="body2">
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


