import PATHNAMES from "../constants/pathnames";
import HomePage from "../modules/home/home";

const ROUTES = [
  {
    path: PATHNAMES.HOME,
    isProtected: false,
    component: HomePage,
    exact: true,
  },
];

export default ROUTES;
