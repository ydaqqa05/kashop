import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },{
                path:'/cart',
                element:<Cart/>
            }
        ]
    },
    {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],

    }
])

