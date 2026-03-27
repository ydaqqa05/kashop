import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProductDetails from "./pages/products/ProductDetails";
import CategoriesPage from "./pages/categories/CategoriesPage";
import ProtectedRouter from "./ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfileOrders from "./pages/profile/ProfileOrders";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import Verify from "./pages/auth/verify/Verify";
import HomePage from "./pages/home/HomePage";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
              path:'homePage',
              element:<HomePage/>
          },
            {
                path:'cart',
                element:
                <ProtectedRouter>
                <Cart/></ProtectedRouter>
            },
            {
              path:'checkout',
              element:
              <ProtectedRouter>
              <Checkout/></ProtectedRouter>
          },
          {
            path:'profile',
            element:
            <ProtectedRouter>
            <Profile/></ProtectedRouter>,
            children:[{
              index:true,
              element:<ProfileInfo/>
            },{
              path:'orders',
              element:<ProfileOrders/>
            }]
        },
            {
              path:'categories',
              element:<CategoriesPage/>
          }
            ,{
              path:'Product/:id',
              element:<ProductDetails/>
          },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgetpassword",
            element: <ForgetPassword />,
          },
          {
            path: "verify",
            element: <Verify />,
          },
        ],

    }
])

