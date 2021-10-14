import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "template-components/Navbars/Navbar.js";
import Footer from "template-components/Footer/Footer.js";
import Sidebar from "template-components/Sidebar/Sidebar.js";
import FixedPlugin from "template-components/FixedPlugin/FixedPlugin.js";
import Landing from "pages/landing";
import routes from "routes.js";
import { connect } from "react-redux";
import { getUserProfile } from "redux/actions/userAction";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route component={Landing} />
  </Switch>
);

const useStyles = makeStyles(styles);

export function User({ users, ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = useState("#03989e");
  const [color, setColor] = useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // initialize and destroy the PerfectScrollbar plugin
  return (
    <div
      id="test"
      className={users.role_id ? classes.wrapper : ""}
      style={{ position: "relative", height: "100vh" }}
    >
      {users.role_id ? (
        <Sidebar
          routes={routes}
          logoText={"Pharmacy group 3"}
          logo={logo}
          bg={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
      ) : null}

      <div
        className={users.role_id ? classes.mainPanel : ""}
        ref={mainPanel}
        style={{ height: "100%" }}
      >
        <Navbar
          user_id={users.role_id}
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div
          className={users.role_id ? classes.content : ""}
          style={{ padding: "0px 20px 0px 20px" }}
        >
          <div>{switchRoutes}</div>
        </div>
        {null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("===", state);
  return {
    users: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (data) => dispatch(getUserProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
