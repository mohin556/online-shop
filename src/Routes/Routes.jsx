import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../LayOut/Main";
import Oder from "../Pages/Oder/Oder/Oder";
import Category from "../Pages/Home/Category/Category";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";
import Login from "../Pages/Login/Login";
import User from "../Pages/User/User";
// import Mycart from "../Pages/Mycart";
import Dashboard from "../LayOut/Dashboard";
import MyCart from "../Pages/Dashboard/MyCart/MyCart";
import Users from "../Pages/Dashboard/Users/Users";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import OderConfirm from "../Pages/Dashboard/OderConfirm/OderConfirm";
import DriversDetails from "../Pages/Dashboard/DriversDetails/DriversDetails";
import DriversInfo from "../Pages/Dashboard/DriversDetails/DriversInfo";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AdminOrders from "../Pages/Dashboard/AdminHome/AdminOders/AdminOders";
import BannerOption from "../Pages/Home/Banner/BannerOption";
import BannerUpdate from "../Pages/Home/Banner/BannerUpdate";
import Information from "../Pages/Dashboard/Information/Information";
import OderHistory from "../Pages/Oder/Oder/OderHistory/OderHistory";
import OderDetails from "../Pages/Oder/OderDetails/OderDetails";

// import CategoryItems from "../Pages/Home/Category/CategoryItems/CategoryItems";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: '/category',
            element: <Category />
        },
        {
            path: '/category/:category',
            element: <ItemDetails/>,
        },
        {
          path: '/user',
          element: <User></User>,
      },
    //   {
    //     path: '/mycart',
    //     element: <Mycart></Mycart>,
    // },
        {
          path: 'login',
          element: <Login></Login>,
      },
        // {
        //     path: '/item/:id',
        //     element: <Oder />,
        // },
    ]
  },
  {
     path: 'dashboard',
     element: <Dashboard></Dashboard>,
     children: [
      {
        path: 'cart',
        element: <MyCart></MyCart>
      },
      {
        path:'users',
        element:<Users></Users>

      },
      {
        path:'paymentOders',
        element:<AdminOrders></AdminOrders>

      },
      {
        path:'oders',
        element:<OderHistory></OderHistory>

      },
      // {
      //   path: 'oders/:id',
      //   element: <OderHistory />,
      //   loader: ({ params }) => fetch(`https://shop-server-pi.vercel.app/orders/${params.id}`)
      // },
      {
        path:'userHome',
        element:<UserHome></UserHome>

      },
      {
        path:'adminHome',
        element:<AdminHome></AdminHome>

      },
      {
        path:'addItems',
        element:<AddItems></AddItems>

      },
      {
        path:'editItems',
        element:<ManageItems></ManageItems>

      },
   
      {
        path:'oderConfirm',
        element:<OderConfirm></OderConfirm>

      },
      {
        path: 'updateItem/:id',
        element: <UpdateItem />,
        loader: ({ params }) => fetch(`https://shop-server-pi.vercel.app/items/${params.id}`)
      },
      {
        path: 'updateBanner/:id',
        element: <BannerUpdate />,
        loader: ({ params }) => fetch(`https://shop-server-pi.vercel.app/banners/${params.id}`)
      },
      {
        path: 'paymentsOders/:id',
        element: <OderDetails />,
        loader: ({ params }) => fetch(`https://shop-server-pi.vercel.app/orders/${params.id}`)
      },
      {
        path:'drivers',
        element:<DriversDetails></DriversDetails>

      },
      {
        path:'banner',
        element:<BannerOption></BannerOption>

      },
      {
        path: 'information',
        element:<Information></Information>
      },
      {
        path:'drivers/:id',
        element:<DriversInfo></DriversInfo>

      },
     ]
  },
]);
