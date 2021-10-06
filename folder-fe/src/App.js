import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import Home from "./pages/Home";
import Home1 from "./pages/Home";
import RegisterPage from "./pages/register/registerPage";
import Admin from "layouts/Admin.js";
import User from "layouts/User.js";
import { theme } from "./utils/color";
import { ThemeProvider } from "@material-ui/styles";

import "assets/css/material-dashboard-react.css?v=1.10.0";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route path="/" component={User}  />  
      </Switch>
    </BrowserRouter>
  );
}

export default App;
