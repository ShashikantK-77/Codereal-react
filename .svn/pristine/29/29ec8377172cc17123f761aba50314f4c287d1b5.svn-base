
import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/SuperAdmin/Dashboard"));
const AdminList = lazy(() => import("../pages/SuperAdmin/AdminList"));
const Access = lazy(() => import("../pages/SuperAdmin/AccessControl"));

const AdminLogin = lazy(() => import('../pages/Admin/AdminLogin'));


const SignUp = lazy(() => import("../pages/Admin/AdminSignUp"));

const Myprofile = lazy(() => import("../pages/Admin/MyProfile"));


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

const SuperAdminRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/adminlogin",
    component: AdminLogin,
  },
  {
    path: "/createadmin",
    component: SignUp,
  },
  {
    path: "/dashboard",
    component: AdminLogin,
  },
  {
    path: "/adminlist",
    component: AdminList,
  },
  {
    path: "/accesscontrol",
    component: Access,
  },
  
  // {
  //   path: "/copytradesettings",
  //   component: CopyTread,
  // },
  


 
 
];

export default SuperAdminRoutes;
