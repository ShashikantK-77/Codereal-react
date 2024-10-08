

import { FiLayout, FiHelpCircle, FiSettings, FiTrello, FiGrid,FiTrendingUp,FiDollarSign, FiRepeat, FiList  } from 'react-icons/fi';


/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/masterdashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/strategymaster",
    icon: FiTrello,
    name: "Strategies",
  },
  {
    path: "/templates",
    icon: FiLayout,
    name: "Templates",
  },

  // {
  //   path: "/papertrades",
  //   icon: FiTrendingUp ,
  //   name: "PaperTrading",
  // },

  // {
  //   path: "/backtestdetails",
  //   icon: FiTrendingUp ,
  //   name: "BackTesting",
  // },

  {
    path: "/positions",
    icon: FiDollarSign ,
    name: "Positions",
  },

  {
    path: "/orders",
    icon: FiList ,
    name: "Orders",
  },
  {
    path: "/pnl",
    icon: FiTrendingUp ,
    name: "PnL",
  },
  {
    path: "/subscribelist",
    icon: FiRepeat ,
    name: "Subscriptions",
  },
  {
    path: "/settings",
    icon: FiSettings,
    name: "Settings",
  },

  {
    path: "/help",
    icon: FiHelpCircle,
    name: "Help",
  },


  


  
];

export default sidebar;



