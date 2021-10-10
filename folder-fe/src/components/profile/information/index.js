import React, { useState, useEffect } from "react";
// @material-ui/core components
import InputLabel from "@material-ui/core/InputLabel";
import AddAlert from "@material-ui/icons/AddAlert";
// core components

import { makeStyles } from "@material-ui/core/styles";
import GridItem from "template-components/Grid/GridItem.js";
import GridContainer from "template-components/Grid/GridContainer.js";
import CustomInput from "template-components/CustomInput/CustomInput.js";
import Button from "template-components/CustomButtons/Button.js";
import Card from "template-components/Card/Card.js";
import CardHeader from "template-components/Card/CardHeader.js";
import CardBody from "template-components/Card/CardBody.js";
import CardFooter from "template-components/Card/CardFooter.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DatePicker } from "@material-ui/pickers";
import { alpha } from "@material-ui/core/styles";
import SnackbarContent from "template-components/Snackbar/SnackbarContent.js";
import Snackbar from "template-components/Snackbar/Snackbar.js";
import axios from "axios";
import { URL_API } from "helper/helper";
import { color } from "@mui/system";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);
const Profile_Information = ({ infoRes }) => {
  const [edit, setEdit] = useState(true);
  const [message, setMessage] = useState({
    state: false,
    message: "",
    color: "WARNING",
  });
  const [formData, setFormData] = useState({
    full_name: "Loading...",
    username: "Loading...",
    email_address: "Loading...",
    birthdate: new Date(),
    phone_number: "Loading...",
    gender: "Loading...",
    address: "Loading...",
  });
  useEffect(() => {
    setFormData({
      full_name: infoRes.full_name ? infoRes.full_name : "Data Not Found",
      username: infoRes.username ? infoRes.username : "Data Not Found",
      email_address: infoRes.email ? infoRes.email : "Data Not Found",
      birthdate: infoRes.birthdate ? new Date(infoRes.birthdate) : new Date(),
      phone_number: infoRes.phone_no ? infoRes.phone_no : "Data Not Found",
      gender: infoRes.gender ? infoRes.gender : "Male",
      address: infoRes.address ? infoRes.address : "Data Not Found",
    });
  }, [infoRes]);
  const classes = useStyles();

  const hdnInputChange = (e) => {
    console.log(e);
    const key = e.target.name;
    const val = e.target.value;
    setFormData({ ...formData, [key]: val });
  };
  const hdnDateChange = (e) => {
    const date = new Date(e).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setFormData({ ...formData, birthdate: date });
  };
  const hdnSubmit = (e) => {
    setEdit(true);
    setMessage({
      state: true,
      message: "Please wait while we process your data",
      color: "warning",
    });
    axios
      .patch(
        `${URL_API}/users/updateUserInformation`,
        {
          full_name: formData.full_name,
          email: formData.email_address,
          username: formData.username,
          birthdate: formData.birthdate,
          address: formData.address,
          gender: formData.gender,
          phone_no: formData.phone_number,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setMessage({
            state: true,
            message: "Profile have been Updated!",
            color: "success",
          });
        } else {
          setMessage({
            state: true,
            message: "An error occured when updating profile data",
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setMessage({
          state: true,
          message: "An error occured!",
          color: "danger",
        });
      });
  };

  return (
    <GridItem xs={12} sm={12} md={12}>
      <Snackbar
        place="tc"
        color={message.color}
        icon={AddAlert}
        message={message.message}
        open={message.state}
        closeNotification={() =>
          setMessage({ ...message, state: !message.state })
        }
        close
      />
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Profile</h4>
          <p className={classes.cardCategoryWhite}>Your account Information</p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText="Full_Name"
                name="full_name"
                formControlProps={{
                  fullWidth: true,
                  disabled: edit,
                }}
                inputProps={{
                  value: formData.full_name,
                }}
                onChange={hdnInputChange}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <CustomInput
                labelText="User Name"
                name="username"
                formControlProps={{
                  fullWidth: true,
                  disabled: edit,
                }}
                inputProps={{ value: formData.username }}
                onChange={hdnInputChange}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <CustomInput
                labelText="Email Address"
                name="email_address"
                formControlProps={{
                  fullWidth: true,
                  disabled: edit,
                }}
                inputProps={{ value: formData.email_address }}
                onChange={hdnInputChange}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <DatePicker
                name="birthdate"
                variant="inline"
                label="Birthdate"
                style={{ margin: "27px 0 0 0", position: "relative" }}
                value={formData.birthdate}
                onChange={hdnDateChange}
                disabled={edit}
                format="yyyy-MM-dd"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Phone Number"
                name="phone_number"
                formControlProps={{
                  fullWidth: true,
                  disabled: edit,
                }}
                inputProps={{
                  value: formData.phone_number,
                }}
                onChange={hdnInputChange}
              />
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <InputLabel style={{ color: "#AAAAAA" }}>Gender</InputLabel>
              <Select
                style={{ margin: "27px 0 27px 0", position: "relative" }}
                labelId="gender"
                name="gender"
                value={formData.gender}
                label="Age"
                onChange={hdnInputChange}
                disabled={edit}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel style={{ color: "#AAAAAA" }}>Address</InputLabel>
              <CustomInput
                name="address"
                formControlProps={{
                  fullWidth: true,
                  disabled: edit,
                }}
                inputProps={{ value: formData.address }}
                onChange={hdnInputChange}
              />
            </GridItem>
          </GridContainer>
        </CardBody>
        <CardFooter>
          {!edit ? (
            <Button onClick={hdnSubmit} color="primary">
              Update Profile
            </Button>
          ) : null}
          <div>
            {edit ? (
              <Button onClick={() => setEdit(!edit)} color="primary">
                Edit Profile
              </Button>
            ) : (
              <Button onClick={() => setEdit(!edit)} color="primary">
                Cancel Edit Profile
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

export default Profile_Information;
