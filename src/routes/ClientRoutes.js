
import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Dashboard"));
const kyc = lazy(() => import("../pages/Kyc"));
const Onlinekyc = lazy(() => import("../pages/OnlineKyc"));
const MyProfile = lazy(() => import("../pages/Admin/MyProfile"));
const ChangePass = lazy(() => import("../pages/ChangePass"));
const Attributes = lazy(() => import("../pages/Attributes"));
const ChildAttributes = lazy(() => import("../pages/ChildAttributes"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Category = lazy(() => import("../pages/Category"));
const ChildCategory = lazy(() => import("../pages/ChildCategory"));
const Staff = lazy(() => import("../pages/Staff"));
const Customers = lazy(() => import("../pages/Admin/Customers"));
const CustomerOrder = lazy(() => import("../pages/CustomerOrder"));
// const Orders = lazy(() => import("../pages/Orders"));
const OrderInvoice = lazy(() => import("../pages/OrderInvoice"));
const Coupons = lazy(() => import("../pages/Coupons"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Languages = lazy(() => import("../pages/Languages"));
const Currencies = lazy(() => import("../pages/Currencies"));
const Setting = lazy(() => import("../pages/Strategy/Setting"));


/////////////////////////////////////////////////////////////

const AddClient = lazy(() => import("../pages/Tread/AddClient"));
const ClientList = lazy(() => import("../pages/Tread/ClientList"));
const CopyTread = lazy(() => import("../pages/Tread/CopyTread"));
const MakeOrder = lazy(() => import("../pages/Tread/MakeOrder"));
const OrdersList = lazy(() => import("../pages/Tread/PositionList"));
const RemoveClient = lazy(() => import("../pages/Tread/RemoveClient"));
const TradeLogs = lazy(() => import("../pages/Tread/TradeLogs"));
const MasterOrder = lazy(() => import("../pages/Tread/MasterOrder"));
const MasterDashboard = lazy(() => import("../pages/Strategy/MasterDashboard"));



/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const ClientRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },

  // {
  //   path: "/copytradesettings",
  //   component: CopyTread,
  // },
  
  {
    path: "/tradelogs",
    component: TradeLogs,
  },


 
 
];

export default ClientRoutes;
