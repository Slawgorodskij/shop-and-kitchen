import {createBrowserRouter, Navigate} from "react-router-dom";
import {Login} from "./views/Login/Login.jsx";
import {Signup} from "./views/Signup/Signup.jsx";
import {Home} from "./views/Home/Home.jsx";

import {ShoppingList} from "./views/ShoppingList/ShoppingList.jsx";

import {NotFound} from "./views/NotFound";
import {GuestLayout} from "./components/layout/guestLayout/GuestLayout.jsx";
import {DefaultLayout} from "./components/layout/defaultLayout/DefaultLayout.jsx";


import {AddShoppingList} from "./views/AddShoppingList/AddShoppingList.jsx";


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
                path: '/shopping_list',
                element: <ShoppingList/>,
            },
            {
                path: '/add_shopping_list',
                element: <AddShoppingList/>,
            },

        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    },
])
// export default router;
