import PATHNAMES from "../constants/pathnames";
import Register from "../modules/auth/register";
import SignIn from "../modules/auth/signin";
import HomePage from "../modules/home";
import Recipe from "../modules/recipe";
import Recipes from "../modules/recipes";
import Restaurants from "../modules/restaurants";

const ROUTES = [
  {
    path: PATHNAMES.HOME,
    isProtected: false,
    component: HomePage,
    exact: true,
  },
  {
    path: PATHNAMES.AUTH,
    isProtected: false,
    component: SignIn,
    exact: true,
  },
  {
    path: PATHNAMES.REGISTER,
    isProtected: false,
    component: Register,
    exact: true,
  },
  {
    path: PATHNAMES.RECIPES,
    isProtected: false,
    component: Recipes,
    exact: true,
  },
  {
    path: `${PATHNAMES.RECIPES}/:id`,
    isProtected: false,
    component: Recipe,
    exact: true,
  },
  {
    path: PATHNAMES.RESTAURANTS,
    isProtected: false,
    component: Restaurants,
    exact: true,
  },
];

export default ROUTES;
