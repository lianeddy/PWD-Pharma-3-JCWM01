import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Admin from "layouts/Admin.js";
import User from "layouts/User.js";
import Authentication from "./pages/authentication";
import Guest from "layouts/Guest.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route component={Authentication} path="/authentication/:test" />
        {Number(localStorage.getItem("role_id")) === 1 ? (
          <Route path="/" component={Admin} />
        ) : Number(localStorage.getItem("role_id")) === 2 ? (
          <Route path="/" component={User} />
        ) : (
          <>
            <Route component={Guest} path="/" />
            <Redirect to="/" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
