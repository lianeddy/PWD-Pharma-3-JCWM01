import React from "react";
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

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

let ps;

const useStyles = makeStyles(styles);

export default function Guest({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div
      id="test"
      className={localStorage.getItem("role_id") ? classes.wrapper : ""}
      style={{ position: "relative", height: "100vh" }}
    >
      {localStorage.getItem("role_id") ? (
        <Sidebar
          routes={routes}
          logoText={"Klinik-ku"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
      ) : null}

      <div
        className={localStorage.getItem("role_id") ? classes.mainPanel : ""}
        ref={mainPanel}
        style={{ height: "100%" }}
      >
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div
          className={localStorage.getItem("role_id") ? classes.content : ""}
          style={{ padding: "0px 20px 0px 20px" }}
        >
          <div>
            <Switch>
              <Route component={Landing} />
            </Switch>
          </div>
        </div>
        {null}
      </div>
    </div>
  );
}
