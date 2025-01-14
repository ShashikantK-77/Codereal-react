// import React from "react";
// import {
//   FiGrid,
//   FiUsers,
//   FiSettings,
//   FiCompass,
//   FiBookOpen,
//   FiTarget,
// } from "react-icons/fi";


// import { useListContext } from "context/ListContext";

// // const { features } = useListContext();

// const dummyFeatureData = [
//   { name: "Dashboard", enabled: true },
//   { name: "Strategy", enabled: true },
//   { name: "Access Control", enabled: true },
//   { name: "User Support", enabled: true },
//   { name: "Communication", enabled: true },
//   { name: "Feedback", enabled: true },
//   { name: "Reports", enabled: true },
//   { name: "Data Export", enabled: true },
//   { name: "System Config.", enabled: false },
//   { name: "Audit Trail", enabled: true },
//   { name: "Profile", enabled: true },
//   { name: "Training & Doc.", enabled: true },
// ];

// const AdminSidebar = dummyFeatureData
//   .filter((feature) => feature.enabled)
//   .map((feature) => ({
//     icon: getIconByName(feature.name),
//     name: feature.name,
//     routes: [
//       {
//         path: `/${feature.name.toLowerCase().replace(" ", "")}`,
//         name: feature.name,
//       },
//     ],
//   }));

// function getIconByName(name) {
//   switch (name) {
//     case "Dashboard":
//       return FiGrid;
//     case "Strategy":
//       return FiUsers;
//     case "Access Control":
//       return FiSettings;
//     case "User Support":
//       return FiCompass;
//     case "Communication":
//       return FiCompass;
//     case "Feedback":
//       return FiBookOpen;
//     case "Reports":
//       return FiBookOpen;
//     case "Data Export":
//       return FiTarget;
//     case "System Config.":
//       return FiTarget;
//     case "Audit Trail":
//       return FiTarget;
//     case "Profile":
//       return FiTarget;
//     case "Training & Doc.":
//       return FiTarget;
//     default:
//       return null;
//   }
// }

// export default AdminSidebar;











import {
  FiGrid,
  FiUsers,
  FiSettings,
  FiCompass,
  FiBookOpen,
  FiTarget,
} from "react-icons/fi";

import { useListContext } from "context/ListContext";





const AdminSidebar = [
  {
    path: "/dashboard",
    icon: FiGrid,
    name: "Dashboard",
    routes: [
      {
        path: "/dashboard",
        name: "Overview",
      },
      {
        path: "/dashboard",
        name: "Analytics",
      },
    ],
  },
  {
    icon: FiUsers,
    name: "Strategy",
    routes: [
      {
        path: "/strategylist",
        name: "Active Strategies",
      },
      {
        path: "/strategylist",
        name: "Pending Strategies",
      },
      {
        path: "/strategylist",
        name: "Approved Strategies",
      },
      {
        path: "/strategylist",
        name: "Archived Strategies",
      },
      {
        path: "/strategylist",
        name: "Strategy Analytics",
      },
    ],
  },
  {
    icon: FiSettings,
    name: "Access Control",
    routes: [
      {
        path: "/userslist",
        name: "User List",
      },
      {
        path: "/myprofile",
        name: "Profile Modification",
      },
      {
        path: "/passwordreset",
        name: "Password Reset",
      },
      {
        path: "/roleList",
        name: "Role List",
      },
      {
        path: "/permissions",
        name: "Permissions",
      },
    ],
  },
  {
    icon: FiCompass,
    name: "User Support",
    routes: [
      {
        path: "/openTickets",
        name: "Open Tickets",
      },
      {
        path: "/openTickets",
        name: "Closed Tickets",
      },
    ],
  },
  {
    icon: FiCompass,
    name: "Communication",
    routes: [
      {
        path: "/announcements",
        name: "Announcements",
      },
      {
        path: "/messaging",
        name: "Messaging",
      },
    ],
  },
  {
    icon: FiBookOpen,
    name: "Feedback",
    routes: [
      {
        path: "/feedback",
        name: "Feedback Analysis",
      },
    ],
  },
  {
    icon: FiBookOpen,
    name: "Reports",
    routes: [
      {
        path: "/usagereports",
        name: "Usage Reports",
      },
      {
        path: "/usagereports",
        name: "Performance Reports",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "Data Export",
    routes: [
      {
        path: "/exportlogs",
        name: "Export Logs",
      },
      {
        path: "/customExports",
        name: "Custom Exports",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "System Config.",
    routes: [
      {
        path: "/setting",
        name: "General Settings",
      },
      {
        path: "/setting",
        name: "Notification Settings",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "Audit Trail",
    routes: [
      {
        path: "/userActivityLogs",
        name: "User Activity Logs",
      },
      {
        path: "/userActivityLogs",
        name: "Security Logs",
      },
    ],
  },
    {
    icon: FiTarget,
    name: "Profile",
    routes: [
      {
        path: "/myprofile",
        name: "My Profile",
      },
      {
        path: "/myprofile",
        name: "Edit",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "Training & Doc.",
    routes: [
      {
        path: "/articles",
        name: "Articles",
      },
      {
        path: "/faqs",
        name: "FAQs",
      },
      {
        path: "/adminTasks",
        name: "Admin Tasks",
      },
      {
        path: "/systemWalkthrough",
        name: "System Walkthrough",
      },
    ],
  },
];

export default AdminSidebar;

