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
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import Verify from "./pages/auth/verify/Verify";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import Blog from "./pages/blog/Blog";
import Shop from "./pages/shop/Shop";
import CartPage from "./pages/cart/tabPage";
import Complete from "./components/pageForTabs/Complete";
import ContactUs from "./pages/contactus/ContactUs";

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
                path:'cart',
                element:
                <ProtectedRouter>
                <CartPage/></ProtectedRouter>
            },
            {
              path:'checkout',
              element:
              <ProtectedRouter>
              <Checkout/></ProtectedRouter>
          },
          {
            path:'complete',
            element:<ProtectedRouter><Complete/></ProtectedRouter> 
        },
          {
            path:'profile',
            element:
            <ProtectedRouter>
            <Profile/></ProtectedRouter>
        },
            {
              path:'categories',
              element:<CategoriesPage/>
          }
            ,{
              path:'Product/:id',
              element:<ProductDetails/>
          },
          {
            path:'contact',
            element:<ContactUs/>
          },
          {
            path:'blog',
            element:<Blog/>
          },
          {
            path:'shop',
            element:<Shop/>
          }
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
          {
            path: "resetpassword",
            element: <ResetPassword />,
          },
        ],

    }
])

