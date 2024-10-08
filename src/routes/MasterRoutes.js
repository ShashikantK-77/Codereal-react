
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
// const Setting = lazy(() => import("../pages/Setting"));


/////////////////////////////////////////////////////////////

const AddClient = lazy(() => import("../pages/Tread/AddClient"));
const ClientList = lazy(() => import("../pages/Tread/ClientList"));
const CopyTread = lazy(() => import("../pages/Tread/CopyTread"));
const MakeOrder = lazy(() => import("../pages/Tread/MakeOrder"));
const OrdersList = lazy(() => import("../pages/Tread/PositionList"));
const RemoveClient = lazy(() => import("../pages/Tread/RemoveClient"));
const TradeLogs = lazy(() => import("../pages/Tread/TradeLogs"));
const MasterOrder = lazy(() => import("../pages/Tread/MasterOrder"));


const StrategyDetails = lazy(() => import("../pages/Tread/StrategyDetails"));


const MasterDashboard = lazy(() => import("../pages/Strategy/MasterDashboard"));
const Payment = lazy(() => import("../pages/Strategy/Payment"));
const Templates = lazy(() => import("../pages/Strategy/Templates"));
const Help  = lazy(() => import("../pages/Strategy/Help"));
const Settings  = lazy(() => import("../pages/Strategy/Setting"));
const makestartegy = lazy(() => import("../pages/Strategy/Makestrategy"));
const StrategyMaster = lazy(() => import("../pages/Strategy/StrategyMaster"));

const TradingAccount = lazy(() => import("../pages/Strategy/TradingAccount"));
const PaperTrading = lazy(() => import("../pages/Strategy/PaperTrading"));
const Tradedetails = lazy(() => import("../pages/Tread/Strategy/Tradedetails"));
const PaperTradedetails = lazy(() => import("../pages/Tread/Strategy/PaperTradeOrder"));
const Strategyperformance = lazy(() => import("../pages/Tread/Strategy/Strategydetails"));
// const Backtestdetails = lazy(() => import("../pages/Tread/Strategy/BacktestDetailsDyn"));
const Backtestdetails = lazy(() => import("../pages/Tread/Strategy/BacktestTradeOrder"));
const Positions = lazy(() => import("../pages/Tread/PositionList"));
const Orders  = lazy(() => import("../pages/Tread/OrdersList"));
const SubscribeStrategy = lazy(() => import("../pages/Tread/SubscribeStrategy"));
const Pnl = lazy(() => import("../pages/Tread/Strategy/Pnl"));
const OrderHistoryList = lazy(() => import("../pages/Tread/OrderHistory"));
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

const MasterRoutes = [

  {
    path: "/masterdashboard",
    component: MasterDashboard,
  },

  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/makestrategy",
    component: makestartegy,
  },
  {
    path: "/strategymaster",
    component: StrategyMaster,
  },
  {
    path: "/StrategyDetails",
    component: StrategyDetails,
  },
  {
    path: "/Strategystatus",
    component: Strategyperformance,
  },

  
  {
    path: "/payment",
    component: Payment,
  },
  {
    path: "/templates",
    component: Templates,
  },
  {
    path: "/help",
    component: Help,
  },
  {
    path: "/settings",
    component: Settings,
  },
  // {
  //   path: "/papertrading",
  //   component: MakeOrder,
  // },
  {
    path: "/papertrading",
    component: PaperTrading,
  },
  {
    path: "/tradedetails",
    component: Tradedetails,
  },
  {
    path: "/backtestdetails",
    component: Backtestdetails,
  },
  {
    path: "/pnl",
    component: Pnl,
  },
  {
    path: "/tradingaccount",
    component: TradingAccount,
  },
  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/positions",
    component: Positions,
  },
  {
    path: "/subscribelist",
    component: SubscribeStrategy,
  },
  {
    path: "/papertrades",
    component: PaperTradedetails,
  },
  {
    path: "/orderhistory",
    component: OrderHistoryList,
  },

];

export default MasterRoutes;
