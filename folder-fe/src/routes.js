// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";

//Route to App
import Home from "pages/Home";

const dashboardRoutes = [
  {
    path: "/Home",
    name: "Home",
    icon: Dashboard,
    component: Home,
    layout: "/user",
  },
];

export default dashboardRoutes;
