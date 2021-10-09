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
import Profile from "pages/profile";

const dashboardRoutes = [
  {
    path: "/Home",
    name: "Home",
    icon: Dashboard,
    component: Home,
    layout: "/user",
  },
  {
    path: "/Profile",
    name: "Profile",
    icon: Person,
    component: Profile,
    layout: "/user",
  },
  {
    path: "/Home",
    name: "Admin-Home",
    icon: Dashboard,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/Profile",
    name: "Admin-Profile",
    icon: Person,
    component: Profile,
    layout: "/admin",
  },
];

export default dashboardRoutes;
