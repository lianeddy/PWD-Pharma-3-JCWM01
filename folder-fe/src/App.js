import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from './pages/login/loginPage';
import Home from './pages/Home';
import RegisterPage from "./pages/register/registerPage";

import { theme } from './utils/color'
import { ThemeProvider } from '@material-ui/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
      </Switch>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
