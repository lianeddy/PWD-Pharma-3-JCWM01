import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { URL_API, roles } from "helper/helper";

import { getUserProfile } from "./redux/actions/userAction";

import User from "layouts/User.js";
import Admin from "layouts/Admin.js";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ForgetPassword from "./pages/forgetPassword/ForgetPassPage";
import ResetPassword from "./pages/resetPassword/ResetPassPage";
import ChangePassword from "./pages/changePassword/ChangePassPage";
import TemptLanding from "pages/tempLanding/TemptLanding";
import ErrorPage from "pages/errorPage/ErrorPage";
import Products from "./pages/products/ManageProduct"
import Authentication from "pages/authentication";
import Landing from "./pages/landing/";

import "assets/css/material-dashboard-react.css?v=1.10.0";

function App(props) {
  // get token from localstorage
  const token = localStorage.getItem("token")


  const [roleId, setRoleID] = useState(null)
  const [isFetchProfile, setIsFetchProfile] = useState(true)

  // GET USER PROFILE
  useEffect(() => {
    // JIKA ROLE ID SUDAH ADA
    if (props.users.role_id) {
      // SET ROLE ID PADA VARIABLE ROLEID PADA LOCAL STATE
      setRoleID(props.users.role_id?.toString())
      // JIKA ROLE ID SUDAH DISET, MAKA SETFETCH PROFILE DISET UNTUK MENANDAKAN BAHWA SUDAH MENGAMBIL DATA UNTUK ROLEID.
      setIsFetchProfile(false)

    } else {
      // JIKA ROLE ID PADA GLOBAL STATE BELUM ADA, JALANKAN AXIOS.POST UNTUK MENGAMBIL ROLEID DARI GET USER DATA
      axios.post(`${URL_API}/users/getUserData`, {}, {
        headers: {
          // MENERJEMAHKAN TOKEN
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        // JIKA sukses request endpoint getuserdata, DIKIRIM ULANG OLEH BE DAN DITERIMA OLEH FE DGN BERBENTUK PROMISE YG MEMBAWA DATA
        const { data } = res.data;
        // PROPS.GEUSERPROFILE BETUJUAN UNTUK MEMBERIKAN DATA TERBARU YG TELAH DITERIMA DARI BE UNTUK DIJADIKAN DATA PADA GLOBAL STATE
        props.getUserProfile(data)
        // SET ROLE ID PADA LOCAL STATE UNTUK DIGUNAKAN PADA ROUTE, DAN KONDISI UNTUK AUTORISASI
        setRoleID(data.role_id.toString())
        // JIKA ROLE ID SUDAH ADA, SET ULANG VALUE PADA ISFETCHPROFILE
        setIsFetchProfile(false)

      }).catch(() => {
        setIsFetchProfile(false)
      })
    }
  }, [props.users.role_id]);

  // MENAMPUNG HALAMAN ROUTES AGAR DINAMIS, YANG AKAN DI-MAP DAN ME-RETURN ROUTE COMPONENT
  // KEY COMPONENT = COMPONENT HALAMAN TERSEBUT
  // KEY PATH = PATH HALAMAN
  // KEY ROLE = ROLE APA SAJA YANG BSA MENGAKSES HALAMAN
  const routes = [
  {
    component: LoginPage,
    path: "/login",
    needAuth: false,
    role: [
      roles.Admin,
      roles.User,
    ],
  },
  {
    component: RegisterPage,
    path: "/register",
    needAuth: false,
    role: [
      roles.Admin,
      roles.User,
    ]
  },
  {
    component: ForgetPassword,
    path: "/forgetpassword",
    needAuth: false,
    role: [
      roles.Admin,
      roles.User
    ]
  },
  {
    component: ResetPassword,
    path: "/resetpassword",
    needAuth: false,
    role: [
      roles.Admin,
      roles.User
    ]
  },
  {
    component: ChangePassword,
    path: "/changepassword",
    needAuth: true,
    role: [
      roles.Admin,
      roles.User
    ]
  },
  {
    component: TemptLanding,
    path: "/temptlanding",
    needAuth: false,
    role: [
      roles.Admin,
      roles.User,
    ]
  },
  {
    component: User,
    needAuth: true,
    path: "/",
    role: [
      roles.Admin,
    ]
  },
  {
    component: Products,
    needAuth: true,
    path: "/admin/products",
    role: [
      roles.Admin,
    ]
  },
  
  ]

  return (
    <BrowserRouter>
      <Switch>
        {/* HALAMAN ERROR PAGE */}
        <Route component={ErrorPage} path="/error-404" />

        {/* MAPPING ROUTES UNTUK ME-RETURN ROUTE DARI WEBSITE YG ADA */}
        {routes.map((route, i) => {

          // ISALLOWTOACCESSPAGE UNTUK MENDAPATKAN TRUE ATAU FALSE VALUE ROLE ID YANG SEDANG LOGIN BOLEH MENGAKSES INDEX ROUTE
          if (!isFetchProfile && !roleId && route.needAuth) {
            return <Redirect key={i} from={routes.component} to="/login" />
          }

          if (roleId) {
            const isAllowAccessPage = route.role.includes(roleId);
            // JIKA ROLE ID TIDAK DAPAT MENGAKSES HALAMAN, MAKA AKAN DI-DIRECT KE 404 PAGE
            if (!isFetchProfile && !isAllowAccessPage) {
              if (route.path === "/") return null;
              return <Redirect key={i} from={route.path} to="/error-404" />;
            }
          }
          // ME RETURN SEMUA HASIL MAP PADA COMPONEN ROUTE
          return (
            <Route key={i} exact component={route.component} path={route.path} />
          );
        })}
      </Switch>
    </BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
