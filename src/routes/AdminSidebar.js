
import React from "react";
import {
  FiGrid,
  FiUsers,
  FiSettings,
  FiCompass,
  FiBookOpen,
  FiTarget,
} from "react-icons/fi";

const dummyFeatureData = [
  { name: "Dashboard", enabled: true },
  { name: "Utilities", enabled: true },
  { name: "Strategy", enabled: true },
  { name: "Access Control", enabled: true },
  { name: "User Support", enabled: true },
  { name: "Communication", enabled: false },
  { name: "Feedback", enabled: true },
  { name: "Reports", enabled: false },
  { name: "Data Export", enabled: true },
  { name: "System Config.", enabled: false },
  { name: "Audit Trail", enabled: true },
  { name: "Profile", enabled: false },
  { name: "Training & Doc.", enabled: true },
];

const AdminSidebar = dummyFeatureData
  .filter((feature) => feature.enabled)
  .map((feature) => ({
    icon: getIconByName(feature.name),
    name: feature.name,
    routes: [
      {
        path: `/${feature.name.toLowerCase().replace(" ", "")}`,
        name: feature.name,
      },
    ],
  }));

function getIconByName(name) {
  switch (name) {
    case "Dashboard":
      return FiGrid;
    case "Strategy":
      return FiUsers;
    case "Access Control":
      return FiSettings;
    case "User Support":
      return FiCompass;
    case "Communication":
      return FiCompass;
    case "Feedback":
      return FiBookOpen;
    case "Reports":
      return FiBookOpen;
    case "Data Export":
      return FiTarget;
    case "System Config.":
      return FiTarget;
    case "Audit Trail":
      return FiTarget;
    case "Profile":
      return FiTarget;
    case "Training & Doc.":
      return FiTarget;
    default:
      return null;
  }
}

export default AdminSidebar;



// import React from "react";
// import {
//   FiGrid,
//   FiUsers,
//   FiSettings,
//   FiCompass,
//   FiBookOpen,
//   FiTarget,
// } from "react-icons/fi";

// const dummyFeatureData = [
//   { name: "Dashboard", enabled: true },
//   { name: "Strategy", enabled: true },
//   { name: "Access Control", enabled: true },
//   { name: "User Support", enabled: true },
//   { name: "Communication", enabled: false },
//   { name: "Feedback", enabled: true },
//   { name: "Reports", enabled: false },
//   { name: "Data Export", enabled: true },
//   { name: "System Config.", enabled: false },
//   { name: "Audit Trail", enabled: true },
//   { name: "Profile", enabled: false },
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
