
import { lazy } from "react";

// use lazy for better code splitting
const Dashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const AdminProfile = lazy(() => import("../pages/Admin/AdminProfile"));
const StrategyList = lazy(() => import("../pages/Admin/Strategydata"));
const MyProfile = lazy(() => import("../pages/Admin/MyProfile"));
const Customers = lazy(() => import("../pages/Admin/UsersList"));

const Help = lazy(() => import("../pages/Admin/Help"));
const Passwordreset = lazy(() => import("../pages/Admin/PasswordReset"));
const Tickets = lazy(() => import("../pages/Admin/Tickets"));
const Announcements = lazy(() => import("../pages/Admin/Announcements"));
const Messaging = lazy(() => import("../pages/Admin/Messaging"));
const Feedback = lazy(() => import("../pages/Admin/Feedback"));
const Settings = lazy(() => import("../pages/Admin/Setting"));
const Useractivitylogs  = lazy(() => import("../pages/Admin/UserActivityLogs")); 
const ExportLogs  = lazy(() => import("../pages/Admin/ExportLogs")); 
const UsageReports = lazy(() => import("../pages/Admin/UsageReports")); 

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

const AdminRoutes = [
  {
    path: "/admndashboard",
    component: Dashboard,
  },
  {
    path: "/overview",
    component: Dashboard,
  },
  {
    path: "/analytics",
    component: Dashboard,
  },
  {
    path: "/activestrategy",
    component: StrategyList,
  },
  {
    path: "/strategy",
    component: StrategyList,
  },

  {
    path: "/userslist",
    component: Customers,
  },

  {
    path: "/strategylist",
    component: StrategyList,
  },
  {
    path: "/myprofile",
    component: MyProfile,
  },

  {
    path: "/help",
    component: Help,
  },
  {
    path: "/passwordreset",
    component: Passwordreset,
  },
  {
    path: "/openTickets",
    component: Tickets,
  },
  {
    path: "/announcements",
    component: Announcements,
  },
  {
    path: "/messaging",
    component: Messaging,
  },
  {
    path: "/feedback",
    component: Feedback,
  },
  {
    path: "/setting",
    component: Settings,
  },
  {
    path: "/useractivitylogs",
    component: Useractivitylogs,
  },
  {
    path: "/exportlogs",
    component: ExportLogs,
  },
  {
    path: "/reports",
    component: UsageReports,
  },
  {
    path: "/pendingstrategy",
    component: StrategyList,
  },
  {
    path: "/closedtickets",
    component: Tickets,
  },
  {
    path: "/opentickets",
    component: Tickets,
  },
  {
    path: "/communication",
    component: Feedback,
  },

  {
    path: "/communication",
    component: Feedback,
  },
  

  
  
  
];

export default AdminRoutes;
