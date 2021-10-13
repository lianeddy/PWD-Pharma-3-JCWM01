import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios';

import { URL_API, roles } from 'helper/helper';

import { getUserProfile } from "./redux/actions/userAction"

import User from "layouts/User.js";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ForgetPassword from "./pages/forgetPassword/ForgetPassPage";
import ResetPassword from "./pages/resetPassword/ResetPassPage";
import ChangePassword from "./pages/changePassword/ChangePassPage";
import TemptLanding from "pages/tempLanding/TemptLanding";
import ErrorPage from "pages/errorPage/ErrorPage";
import Landing from "./pages/landing/";

import "assets/css/material-dashboard-react.css?v=1.10.0";

function App(props) {
  const token = localStorage.getItem("token")

  const [roleId, setRoleID] = useState(null)
  const [isFetchProfile, setIsFetchProfile] = useState(true)

  // GET USER PROFILE
  useEffect(() => {
    if (props.users.role_id) {
      setRoleID(props.users.role_id?.toString())
      setIsFetchProfile(false)

    } else {
      axios.post(`${URL_API}/users/getUserData`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then( (res) => {
        const { data } = res.data;
        props.getUserProfile(data)
        setRoleID(data.role_id.toString())
        setIsFetchProfile(false)

      }).catch(() => {
        setIsFetchProfile(false)
      })
    }
  }, [props.users.role_id])

  // MENAMPUNG HALAMAN ROUTES AGAR DINAMIS, YANG AKAN DI-MAP DAN ME-RETURN ROUTE COMPONENT
  // KEY COMPONENT = COMPONENT HALAMAN TERSEBUT
  // KEY PATH = PATH HALAMAN
  // KEY ROLE = ROLE APA SAJA YANG BSA MENGAKSES HALAMAN
  const routes = [{
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
  ]

  return (
    <BrowserRouter>
      <Switch>

        {/* HALAMAN ERROR PAGE */}
        <Route component={ErrorPage} path="/error-404" />

        {/* MAPPING ROUTES UNTUK ME-RETURN ROUTE DARI WEBSITE YG ADA */}
        {routes.map((route, i) => {
          
          // ISALLOWTOACCESSPAGE UNTUK MENDAPATKAN TRUE ATAU FALSE VALUE ROLE ID YANG SEDANG LOGIN BOLEH MENGAKSES INDEX ROUTE
          if (!isFetchProfile && !roleId  && route.needAuth) {
            return <Redirect key={i} from={routes.component} to="/login" />
          }




          if (roleId) {
            const isAllowAccessPage = route.role.includes((roleId))
            // JIKA ROLE ID TIDAK DAPAT MENGAKSES HALAMAN, MAKA AKAN DI-DIRECT KE 404 PAGE
            if (!isFetchProfile && !isAllowAccessPage) {
              return <Redirect key={i} from={route.path} to="/error-404" />
            }
          }

          // ME RETURN SEMUA HASIL MAP PADA COMPONEN ROUTE
          return (
            <Route key={i} component={route.component} path={route.path} />
          );
        })}


      </Switch>
    </BrowserRouter>
  );


}



const mapStateToProps = (state) => {
  console.log('===', state)
  return {
    users: state.userReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserProfile: (data) => dispatch(getUserProfile(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
