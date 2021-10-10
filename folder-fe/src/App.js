import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/Home";
import Home1 from "./pages/Home";
import RegisterPage from "./pages/register/RegisterPage";
import Admin from "layouts/Admin.js";
import User from "layouts/User.js";
import { theme } from "./utils/color";
import { ThemeProvider } from "@material-ui/styles";
import ForgetPassword from "./pages/forgetPassword/ForgetPassPage";
import ResetPassword from "./pages/resetPassword/ResetPassPage"
import ChangePassword from "./pages/changePassword/ChangePassPage"
import TemptLanding from "pages/tempLanding/TemptLanding";
import ErrorPage from "pages/errorPage/ErrorPage";

import "assets/css/material-dashboard-react.css?v=1.10.0";


function App() {
  // GET ROLE ID FROM LOCALSTORAGE
  const roleId = localStorage.getItem("roleId") // 2

  // DEFINE AVAIABLE ROLES 
  const roles = {
    Admin: "1",
    User: "2",
    Non: null
    
  }
  
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
        {console.log(roleId, "=================================")}
        {/* HALAMAN ERROR PAGE */}
      <Route component={ErrorPage} path="/error-404" />

        {/* MAPPING ROUTES UNTUK ME-RETURN ROUTE DARI WEBSITE YG ADA */}
        {routes.map((route, i) => {
          // ISALLOWTOACCESSPAGE UNTUK MENDAPATKAN TRUE ATAU FALSE VALUE ROLE ID YANG SEDANG LOGIN BOLEH MENGAKSES INDEX ROUTE

          if(!roleId && route.needAuth){
            return  <Redirect key={i} from={routes.component} to="/login" />
          }

          if(roleId) {
            const isAllowAccessPage = route.role.includes((roleId))
            // JIKA ROLE ID TIDAK DAPAT MENGAKSES HALAMAN, MAKA AKAN DI-DIRECT KE 404 PAGE
            if(!isAllowAccessPage){
             return  <Redirect key={i} from={route.path} to="/error-404" />
            }

          }
          

          // ME RETURN SEMUA HASIL MAP PADA COMPONEN ROUTE
          return <Route key={i} component={route.component} path={route.path} />
        })}
       

      </Switch>
    </BrowserRouter>
  );
}

export default App;
