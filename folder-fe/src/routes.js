// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import AlignVerticalBottomTwoToneIcon from '@mui/icons-material/AlignVerticalBottomTwoTone';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Category from "@material-ui/icons/Category";

//Route to App
import Home from "pages/Home";
import Profile from "pages/profile";
import TemptLanding from "pages/tempLanding/TemptLanding";
import Cart from "pages/cart";
import ProductsAdmin from "pages/products/ManageProduct";

import AdminTransaction from "pages/transaction/admin";
import AdminTransactionDetail from "pages/transaction/admin/detail";
import UserTransaction from "pages/transaction/user";
import UserTransactionDetail from "pages/transaction/user/detail";
import AdminRevenue from "pages/revenue/adminRevenue";
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
  {
    path: "/Report",
    name: "Report Admin",
    icon: LibraryBooks,
    component: TemptLanding,
    layout: "/admin",
  },
  {
    path: "/Transaction",
    name: "Admin Transaction",
    icon: LibraryBooks,
    component: AdminTransaction,
    layout: "/admin",
  },
  {
    path: "/Detail/:id",
    name: "Admin Transaction Detail",
    icon: LibraryBooks,
    component: AdminTransactionDetail,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/Transaction",
    name: "User Transaction",
    icon: LibraryBooks,
    component: UserTransaction,
    layout: "/user",
  },
  {
    path: "/Detail/:id",
    name: "User Transaction Detail",
    icon: LibraryBooks,
    component: UserTransactionDetail,
    layout: "/user",
    hide: true,
  },
  {
    path: "/Cart",
    name: "Cart",
    icon: Category,
    component: Cart,
    layout: "/user",
  },
  {
    path: "/ProductsAdmin",
    name: "Product Admin",
    icon: Category,
    component: ProductsAdmin,
    layout: "/admin",
  },
  {
    path: "/AdminRevenue",
    name: "Admin Revenue",
    icon: AlignVerticalBottomTwoToneIcon,
    component: AdminRevenue,
    layout: '/admin',
  }
];

export default dashboardRoutes;
