import {createBrowserRouter, Navigate} from "react-router-dom";
import {Login} from "./views/Login/Login.jsx";
import {Signup} from "./views/Signup/Signup.jsx";
import {Home} from "./views/Home";
import {Menu} from "./views/Menu";
import {MenuCompilation} from "./views/MenuCompilation";
import {Recipe} from "./views/Recipe";
import {ShoppingList} from "./views/ShoppingList";
import {Storeroom} from "./views/Storeroom";
import {WeeksRecipes} from "./views/WeeksRecipes";
import {NotFound} from "./views/NotFound";
import {GuestLayout} from "./components/layout/guestLayout/GuestLayout.jsx";
import {DefaultLayout} from "./components/layout/defaultLayout/DefaultLayout.jsx";
import {HomeGuest} from "./views/homeGuest/HomeGuest.jsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/home_guest"/>
      },
      {
        path: '/home_guest',
        element: <HomeGuest/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/signup',
        element: <Signup/>,
      },
    ]
  },
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/home"/>
      },
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/menu',
        element: <Menu/>,
      },
      {
        path: '/menu_compilation',
        element: <MenuCompilation/>,
      },
      {
        path: '/recipe',
        element: <Recipe/>,
      },
      {
        path: '/shopping_list',
        element: <ShoppingList/>,
      },
      {
        path: '/storeroom',
        element: <Storeroom/>,
      },
      {
        path: '/weeks_recipes',
        element: <WeeksRecipes/>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>,
  },
])
// export default router;
