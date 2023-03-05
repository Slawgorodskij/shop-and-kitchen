import {createBrowserRouter} from "react-router-dom";
import {Login} from "./views/Login";
import {Signup} from "./views/Signup";
import {Home} from "./views/Home";
import {Menu} from "./views/Menu";
import {MenuCompilation} from "./views/MenuCompilation";
import {Recipe} from "./views/Recipe";
import {ShoppingList} from "./views/ShoppingList";
import {Storeroom} from "./views/Storeroom";
import {WeeksRecipes} from "./views/WeeksRecipes";
import {NotFound} from "./views/NotFound";
import {GuestLayout} from "./components/GuestLayout";
import {DefaultLayout} from "./components/DefaultLayout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/home',
        element: <Home/>,
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
