


import {
    FiGrid,
    FiUsers,
    FiSettings,
    FiCompass,
    FiBookOpen,
    FiTarget,
  } from "react-icons/fi";
  
//   const AdminSidebar = [
//     {
//       path: "/dashboard",
//       icon: FiGrid,
//       name: "Dashboard",
//       routes: [
//         {
//           path: "/dashboard",
//           name: "Overview",
//         },
//         {
//           path: "/dashboard",
//           name: "Analytics",
//         },
//       ],
//     },
//     {
//       icon: FiUsers,
//       name: "Strategy",
//       routes: [
//         {
//           path: "/strategylist",
//           name: "Active Strategies",
//         },
//         {
//           path: "/strategylist",
//           name: "Pending Strategies",
//         },
//         {
//           path: "/strategylist",
//           name: "Approved Strategies",
//         },
//         {
//           path: "/strategylist",
//           name: "Archived Strategies",
//         },
//         {
//           path: "/strategylist",
//           name: "Strategy Analytics",
//         },
//       ],
//     },
//     {
//       icon: FiSettings,
//       name: "Access Control",
//       routes: [
//         {
//           path: "/userslist",
//           name: "User List",
//         },
//         {
//           path: "/myprofile",
//           name: "Profile Modification",
//         },
//         {
//           path: "/passwordreset",
//           name: "Password Reset",
//         },
//         {
//           path: "/roleList",
//           name: "Role List",
//         },
//         {
//           path: "/permissions",
//           name: "Permissions",
//         },
//       ],
//     },
//     {
//       icon: FiCompass,
//       name: "User Support",
//       routes: [
//         {
//           path: "/openTickets",
//           name: "Open Tickets",
//         },
//         {
//           path: "/openTickets",
//           name: "Closed Tickets",
//         },
//       ],
//     },
//     {
//       icon: FiCompass,
//       name: "Communication",
//       routes: [
//         {
//           path: "/announcements",
//           name: "Announcements",
//         },
//         {
//           path: "/messaging",
//           name: "Messaging",
//         },
//       ],
//     },
//     {
//       icon: FiBookOpen,
//       name: "Feedback",
//       routes: [
//         {
//           path: "/feedback",
//           name: "Feedback Analysis",
//         },
//       ],
//     },
//     {
//       icon: FiBookOpen,
//       name: "Reports",
//       routes: [
//         {
//           path: "/usagereports",
//           name: "Usage Reports",
//         },
//         {
//           path: "/usagereports",
//           name: "Performance Reports",
//         },
//       ],
//     },
//     {
//       icon: FiTarget,
//       name: "Data Export",
//       routes: [
//         {
//           path: "/exportlogs",
//           name: "Export Logs",
//         },
//         {
//           path: "/customExports",
//           name: "Custom Exports",
//         },
//       ],
//     },
//     {
//       icon: FiTarget,
//       name: "System Config.",
//       routes: [
//         {
//           path: "/setting",
//           name: "General Settings",
//         },
//         {
//           path: "/setting",
//           name: "Notification Settings",
//         },
//       ],
//     },
//     {
//       icon: FiTarget,
//       name: "Audit Trail",
//       routes: [
//         {
//           path: "/userActivityLogs",
//           name: "User Activity Logs",
//         },
//         {
//           path: "/userActivityLogs",
//           name: "Security Logs",
//         },
//       ],
//     },
//       {
//       icon: FiTarget,
//       name: "Profile",
//       routes: [
//         {
//           path: "/myprofile",
//           name: "My Profile",
//         },
//         {
//           path: "/myprofile",
//           name: "Edit",
//         },
//       ],
//     },
//     {
//       icon: FiTarget,
//       name: "Training & Doc.",
//       routes: [
//         {
//           path: "/articles",
//           name: "Articles",
//         },
//         {
//           path: "/faqs",
//           name: "FAQs",
//         },
//         {
//           path: "/adminTasks",
//           name: "Admin Tasks",
//         },
//         {
//           path: "/systemWalkthrough",
//           name: "System Walkthrough",
//         },
//       ],
//     },
//   ];
  
  


// export const getSidebarData = (adminObject)=>{


//     const userSidebar = adminObject.map(feature =>{

//     })

//     return userSidebar

// }


// export const getSidebarData = (adminObject, AdminID) => {
//   // Retrieve AdminMenu data from local storage
//   const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
//   const adminMenuData = adminMenuString ? JSON.parse(adminMenuString) : [];
//   console.log("adminMenuData,AdminID:",adminMenuData,AdminID);
  
//   const desiredAdminMenu = adminMenuData.find(item => item.adminId == AdminID);

 
  


//   console.log("desiredAdminMenu",desiredAdminMenu);


//   const allMenuString = localStorage.getItem('Menu_Master');
//   const allMenuData = allMenuString ? JSON.parse(allMenuString) : [];


//   // console.log("adminMenuData,allMenuData:",adminMenuData,allMenuData);

//   // Filter dummyFeatureData based on access permissions stored in AdminMenu
//   const userSidebar = allMenuData.reduce((acc, feature) => {
//     // Check if the feature's MID is present in AdminMenu for the given admin ID
//     const adminSidebar = adminMenuData.find(adminItem => adminItem.adminId === AdminID);

//     if (adminSidebar) {
//       // Check if the feature's MID is present in the admin's sidebar data
//       const sidebarItem = adminSidebar.sidebar.find(item => Object.keys(item)[0] == feature.MID);
//       if (sidebarItem) {
//         // Include the feature and its sub-features in the sidebar if it's accessible
//         acc.push({
//           path: feature.PageUrl,
//           // icon: getIconByName(feature.Name), // You need to define getIconByName function
//           icon: FiTarget, // You need to define getIconByName function
//           name: feature.Name,
//           routes: feature.routes.map(subFeature => ({
//             path: subFeature.PageUrl,
//             name: subFeature.Name
//           }))
//         });
//       }
//     }
//     return acc;
//   }, []);

//   return userSidebar;
// };


// export const getSidebarData = (adminObject, AdminID) => {
//   // Retrieve AdminMenu data from local storage
//   const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
//   const adminMenuData = adminMenuString ? JSON.parse(adminMenuString) : [];
//   console.log("adminMenuData,AdminID:", adminMenuData, AdminID);

//   const desiredAdminMenu = adminMenuData.find(item => item.adminId == AdminID);

//   const allMenuString = localStorage.getItem('Menu_Master');
//   const allMenuData = allMenuString ? JSON.parse(allMenuString) : [];

//   // Filter dummyFeatureData based on access permissions stored in AdminMenu
//   const userSidebar = allMenuData.reduce((acc, feature) => {
//     if (desiredAdminMenu) {
//       const sidebarData = desiredAdminMenu.sidebar || [];
//       const sidebarItem = sidebarData.find(sidebarItem => Object.keys(sidebarItem)[0] == feature.MID);
//       if (sidebarItem) {
//         const routesArray = Object.values(sidebarItem)[0]; // Extract routes array from sidebarItem
//         // Include the feature and its sub-features in the sidebar if it's accessible
//         acc.push({
//           path: feature.PageUrl,
//           icon: FiTarget, // You need to define getIconByName function
//           name: feature.Name,
//           routes: routesArray.map(subFeatureId => {
//             // Find subFeature object using subFeatureId from allMenuData
//             const subFeature = allMenuData.find(item => item.MID === subFeatureId);
//             return {
//               path: subFeature.PageUrl,
//               name: subFeature.Name
//             };
//           })
//         });
//       }
//     }
//     return acc;
//   }, []);

//   return userSidebar;
// };


// export const getSidebarData = (adminObject, AdminID) => {
//   // Retrieve AdminMenu data from local storage
//   const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
//   const adminMenuData = adminMenuString ? JSON.parse(adminMenuString) : [];
//   console.log("adminMenuData,AdminID:", adminMenuData, AdminID);

//   const desiredAdminMenu = adminMenuData.find(item => item.adminId == AdminID);

//   const allMenuString = localStorage.getItem('Menu_Master');
//   const allMenuData = allMenuString ? JSON.parse(allMenuString) : [];

//   // Filter dummyFeatureData based on access permissions stored in AdminMenu
//   const userSidebar = allMenuData.reduce((acc, feature) => {
//     if (desiredAdminMenu) {
//       const sidebarData = desiredAdminMenu.sidebar || [];
//       const sidebarItem = sidebarData.find(sidebarItem => Object.keys(sidebarItem)[0] == feature.MID);
//       if (sidebarItem) {
//         const routesArray = Object.values(sidebarItem)[0]; // Extract routes array from sidebarItem
//         // Include the feature and its sub-features in the sidebar if it's accessible
//         if (feature && feature.PageUrl) { // Check if feature is defined and has PageUrl property
//           acc.push({
//             path: feature.PageUrl,
//             icon: FiTarget, // You need to define getIconByName function
//             name: feature.Name,
//             routes: routesArray.map(subFeatureId => {
//               // Find subFeature object using subFeatureId from allMenuData
//               const subFeature = allMenuData.find(item => item.MID === subFeatureId);
//               if (subFeature && subFeature.PageUrl) { // Check if subFeature is defined and has PageUrl property
//                 { console.log("subFeature:",subFeature);}
//                 return {
               
//                   path: subFeature.PageUrl,
//                   name: subFeature.Name
//                 };
//               }
//               return null; // Return null for subFeature with missing PageUrl
//             }).filter(Boolean) // Filter out null values
//           });
//         }
//       }
//     }
//     return acc;
//   }, []);

//   return userSidebar;
// };
// export const getSidebarData = (adminObject, AdminID) => {
//   // Retrieve AdminMenu data from local storage
//   const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
//   const adminMenuData = adminMenuString ? JSON.parse(adminMenuString) : [];
//   console.log("adminMenuData,AdminID:", adminMenuData, AdminID);

//   const desiredAdminMenu = adminMenuData.find(item => item.adminId == AdminID);

//   const allMenuString = localStorage.getItem('Menu_Master');
//   const allMenuData = allMenuString ? JSON.parse(allMenuString) : [];

//   // Filter dummyFeatureData based on access permissions stored in AdminMenu
//   const userSidebar = allMenuData.reduce((acc, feature) => {
//     if (desiredAdminMenu) {
//       const sidebarData = desiredAdminMenu.sidebar || [];
//       const sidebarItem = sidebarData.find(sidebarItem => Object.keys(sidebarItem)[0] == feature.MID);
//       if (sidebarItem) {
//         const routesArray = Object.values(sidebarItem)[0]; // Extract routes array from sidebarItem
//         // Include the feature and its sub-features in the sidebar if it's accessible
//         if (feature && feature.PageUrl) { // Check if feature is defined and has PageUrl property
//           acc.push({
//             path: feature.PageUrl,
//             icon: FiTarget, // You need to define getIconByName function
//             name: feature.Name,
//             routes: routesArray.map(subFeatureId => {
//               // Find subFeature object using subFeatureId from allMenuData
//               const subFeature = allMenuData.find(item => item.MID === subFeatureId);
//               console.log("subFeature::::::::>>>>:",subFeature);
//               if (subFeature && subFeature.PageUrl) { // Check if subFeature is defined and has PageUrl property
//                 console.log("subFeature:", subFeature); // Log subFeature here
//                 return {
//                   path: subFeature.PageUrl,
//                   name: subFeature.Name
//                 };
//               }
//               return null; // Return null for subFeature with missing PageUrl
//             }).filter(Boolean) // Filter out null values
//           });
//         }
//       }
//     }
//     return acc;
//   }, []);

//   return userSidebar;
// };

export const getSidebarData = (adminObject, AdminID) => {
  // Retrieve AdminMenu data from local storage
  const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
  const adminMenuData = adminMenuString ? JSON.parse(adminMenuString) : [];
  console.log("adminMenuData, AdminID:", adminMenuData, AdminID);

  const desiredAdminMenu = adminMenuData.find(item => item.adminId == AdminID);

  const allMenuString = localStorage.getItem('Menu_Master');
  const allMenuData = allMenuString ? JSON.parse(allMenuString) : [];

  // Filter dummyFeatureData based on access permissions stored in AdminMenu
  const userSidebar = allMenuData.reduce((acc, feature) => {
    if (desiredAdminMenu) {
      const sidebarData = desiredAdminMenu.sidebar || [];
      const sidebarItem = sidebarData.find(sidebarItem => Object.keys(sidebarItem)[0] == feature.MID);
      if (sidebarItem) {
        const routesArray = Object.values(sidebarItem)[0]; // Extract routes array from sidebarItem
        // Include the feature and its sub-features in the sidebar if it's accessible
        if (feature && feature.PageUrl) { // Check if feature is defined and has PageUrl property
          acc.push({
            path: feature.PageUrl,
            icon: FiTarget, // You need to define getIconByName function
            name: feature.Name,
            routes: routesArray.map(subFeatureId => {
              console.log("subFeatureId in map:",subFeatureId);
              // console.log(allMenuData);
              const subFeature = allMenuData.find(item => item.MID == subFeatureId);
              console.log("subFeature after filter:",subFeature);
              return subFeature ? { path: subFeature.PageUrl, name: subFeature.Name } : null;
            }).filter(Boolean) // Filter out null values
          });
        }
      }
    }
    return acc;
  }, []);

  return userSidebar;
};



