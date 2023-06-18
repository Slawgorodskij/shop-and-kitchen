import {createBrowserRouter, Navigate} from "react-router-dom";
import {Login} from "./views/Login/Login.jsx";
import {Signup} from "./views/Signup/Signup.jsx";
import {Home} from "./views/Home/Home.jsx";
import {NewMenu} from "./views/NewMenu/NewMenu.jsx";
import {MenuCompilation} from "./views/MenuCompilation";
import {Recipe} from "./views/Recipe";
import {ShoppingList} from "./views/ShoppingList/ShoppingList.jsx";
import {Storeroom} from "./views/Storeroom/Storeroom.jsx";
import {WeeksRecipes} from "./views/WeeksRecipes";
import {NotFound} from "./views/NotFound";
import {GuestLayout} from "./components/layout/guestLayout/GuestLayout.jsx";
import {DefaultLayout} from "./components/layout/defaultLayout/DefaultLayout.jsx";
import {HomeGuest} from "./views/homeGuest/HomeGuest.jsx";
import {OldMenu} from "./views/OldMenu/OldMenu.jsx";
import {AddShoppingList} from "./views/AddShoppingList/AddShoppingList.jsx";
import {ShowProducts} from "./views/ShowProducts/ShowProducts.jsx";

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
        path: '/new_menu',
        element: <NewMenu/>,
      },
      {
        path: '/old_menu',
        element: <OldMenu/>,
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
        path: '/add_shopping_list',
        element: <AddShoppingList/>,
      },
      {
        path: '/storeroom',
        element: <Storeroom/>,
      },
      {
        path: '/weeks_recipes',
        element: <WeeksRecipes/>,
      },
      {
        path: '/show_product/:typeProductId',
        element: <ShowProducts/>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>,
  },
])
// export default router;
