// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHeader,
//   TableBody as WindmillTableBody,
//   TableRow,
// } from "@windmill/react-ui";
// import TableLoading from "components/preloader/TableLoading";
// import PageTitle from "components/Typography/PageTitle";
// import { useLocation } from "react-router-dom";
// import { notifyError, notifySuccess } from "utils/toast";

// const AccessControl = () => {
//   const [admins, setAdmins] = useState([]);
//   const [selectedAdmin, setSelectedAdmin] = useState(null);
//   const [features, setFeatures] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedFeatures, setSelectedFeatures] = useState({});

//   const location = useLocation();
//   const userIdParam = new URLSearchParams(location.search).get("hfgtyrh");

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     setLoading(true);
//   //     try {
//   //       // Simulating fetching data from localStorage
//   //       // Replace this with your actual data fetching logic
//   //       // setFeatures(dummyFeatureData);

//   //       const localStorageDataMenu_Master = localStorage.getItem("Menu_Master");
//   //       const parsedDataMenu_Master = localStorageDataMenu_Master ? JSON.parse(localStorageDataMenu_Master) : [];
//   //       setFeatures(parsedDataMenu_Master || []);
  

//   //       const localStorageData = localStorage.getItem("Admin_Master");
//   //       const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
//   //       setAdmins(parsedData || []);

//   //       if (userIdParam) {
//   //         const selected = parsedData.find((admin) => admin.AdminID === userIdParam);
//   //         setSelectedAdmin(selected || null);
//   //       } else {
//   //         setAdmins(parsedData || []);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [userIdParam]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('http://localhost:3001/api/admins');
//         if (!response.ok) {
//           throw new Error('Failed to fetch admins');
//         }
//         const data = await response.json();
//         setAdmins(data);
//         if (userIdParam) {
//           const selected = data.find((admin) => admin.AdminID === userIdParam);
//           setSelectedAdmin(selected || null);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [userIdParam]);
  
//   const handleToggleFeature = (feature) => {
//     setSelectedFeatures((prev) => ({
//       ...prev,
//       [feature.MID]: !prev[feature.MID],
//     }));
//   };

//   const handleToggleSubfeature = (subfeature) => {
//     setSelectedFeatures((prev) => ({
//       ...prev,
//       [subfeature.MID]: !prev[subfeature.MID],
//     }));
//   };

//   const handleSelectAdmin = (adminId) => {
//     const selected = admins.find((admin) => admin.AdminID === adminId);
//     setSelectedAdmin(selected);
//   };

//   function generateUniqueId() {
//     return Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
//   }
  

//   // const handleUpdateFeatures = () => {
//   //   // Update features logic


//   //   const selectedMenus = [];
//   //   for (const [key, value] of Object.entries(selectedFeatures)) {
//   //     if (value) {
//   //       selectedMenus.push({
//   //         AmID: generateUniqueId(), // Generate or fetch AmID
//   //         AdminID: selectedAdmin.AdminID,
//   //         MenuID: key,
//   //         IsActive: true,
//   //         UpdatedDate: new Date().toISOString(),
//   //       });
//   //     }
//   //   }
//   //   localStorage.setItem("Admin_Menus", JSON.stringify(selectedMenus));
//   //   notifySuccess("Saved the updated feature.!");
//   // };


//   // useEffect(()=>{
//   //   localStorage.setItem("Menu_Master", JSON.stringify(dummyFeatureData));
//   // },[]);


// //   const handleUpdateFeatures = () => {
// //   // Update features logic

// //   const existingAdminMenus = JSON.parse(localStorage.getItem("Admin_Menus")) || [];
// //   const selectedMenus = [];

// //   for (const [key, value] of Object.entries(selectedFeatures)) {
// //     if (value) {
// //       // Check if an entry already exists for the selected admin and menu ID
// //       const existingEntryIndex = existingAdminMenus.findIndex(
// //         (entry) => entry.AdminID === selectedAdmin.AdminID && entry.MenuID === key
// //       );

// //       // If no existing entry found, add it to the selectedMenus
// //       if (existingEntryIndex === -1) {
// //         selectedMenus.push({
// //           AmID: generateUniqueId(), // Generate or fetch AmID
// //           AdminID: selectedAdmin.AdminID,
// //           MenuID: key,
// //           IsActive: true,
// //           UpdatedDate: new Date().toISOString(),
// //         });
// //       }
// //     }
// //   }

// //   // Merge existing admin menus with selected menus
// //   const updatedAdminMenus = [...existingAdminMenus, ...selectedMenus];
// //   localStorage.setItem("Admin_Menus", JSON.stringify(updatedAdminMenus));
// //   notifySuccess("Saved the updated feature.!");
// // };


// // const handleUpdateFeatures = () => {
// //   // Update features logic

// //   const existingAdminMenus = JSON.parse(localStorage.getItem("AdminMenuuuuuuuuuuu")) || [];
// //   let updatedAdminMenus = [...existingAdminMenus]; // Copy existing data

// //   // Find the index of the admin in the existing data
// //   const adminIndex = updatedAdminMenus.findIndex(menu => menu.adminId === selectedAdmin.AdminID);

// //   // If the admin exists in the data, update its sidebar
// //   if (adminIndex !== -1) {
// //     const adminSidebar = updatedAdminMenus[adminIndex].sidebar;

// //     const parentFeatures = features.filter(feature => feature.MenuType === 'M' && feature.ParentMID === null);
    
// //     // Iterate over parent features
// //     for (const parentFeature of parentFeatures) {
// //       // Get child subfeatures for the parent feature
// //       const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parentFeature.MID);
      
// //       // Create an array of subfeature MID's
// //       const subfeatureMIDs = subfeatures.map(subfeature => subfeature.MID);
      
// //       // Add parent feature and its subfeatures to the sidebar
// //       adminSidebar.push({ [parentFeature.MID]: subfeatureMIDs });
// //     }

// //     // Update the admin's sidebar in the main data
// //     updatedAdminMenus[adminIndex].sidebar = adminSidebar;
// //   } else {
// //     // If the admin doesn't exist in the data, create a new entry
// //     const newAdminMenu = {
// //       adminId: selectedAdmin.AdminID,
// //       sidebar: []
// //     };

// //     const parentFeatures = features.filter(feature => feature.MenuType === 'M' && feature.ParentMID === null);
    
// //     // Iterate over parent features
// //     for (const parentFeature of parentFeatures) {
// //       // Get child subfeatures for the parent feature
// //       const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parentFeature.MID);
      
// //       // Create an array of subfeature MID's
// //       const subfeatureMIDs = subfeatures.map(subfeature => subfeature.MID);
      
// //       // Add parent feature and its subfeatures to the sidebar
// //       newAdminMenu.sidebar.push({ [parentFeature.MID]: subfeatureMIDs });
// //     }

// //     // Add the new admin's data to the main data
// //     updatedAdminMenus.push(newAdminMenu);
// //   }

// //   // Save the updated data to localStorage
// //   localStorage.setItem("AdminMenuuuuuuuuuuu", JSON.stringify(updatedAdminMenus));

// //   notifySuccess("Saved the updated feature!");
// // };

// // const handleUpdateFeatures = () => {
// //   // Update features logic

// //   const existingAdminMenus = JSON.parse(localStorage.getItem("AdminMenuuuuuuuuuuu")) || [];
// //   let updatedAdminMenus = [...existingAdminMenus]; // Copy existing data

// //   // Find the index of the admin in the existing data
// //   const adminIndex = updatedAdminMenus.findIndex(menu => menu.adminId === selectedAdmin.AdminID);

// //   // If the admin exists in the data, update its adminId
// //   if (adminIndex !== -1) {
// //     updatedAdminMenus[adminIndex].adminId = selectedAdmin.AdminID;
// //   } else {
// //     // If the admin doesn't exist in the data, create a new entry
// //     const newAdminMenu = {
// //       adminId: selectedAdmin.AdminID,
// //       sidebar: []
// //     };

// //     updatedAdminMenus.push(newAdminMenu);
// //   }

// //   // If adminIndex is still -1, set it to the last index
// //   const currentIndex = adminIndex !== -1 ? adminIndex : updatedAdminMenus.length - 1;

// //   // Iterate over selected features
// //   for (const key in selectedFeatures) {
// //     if (selectedFeatures[key]) { // Only include checked features
// //       const parentFeature = features.find(feature => feature.MID === parseInt(key) && feature.MenuType === 'M');
// //       if (parentFeature) {
// //         // Get child subfeatures for the parent feature
// //         const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parseInt(key));

// //         // Create an array of subfeature MID's that are selected
// //         const selectedSubfeatureMIDs = Object.keys(selectedFeatures)
// //           .filter(subfeatureMID => subfeatures.some(subfeature => subfeature.MID === parseInt(subfeatureMID)));

// //         // Add parent feature and its selected subfeatures to the sidebar
// //         updatedAdminMenus[currentIndex].sidebar.push({ [parentFeature.MID]: selectedSubfeatureMIDs });
// //       }
// //     }
// //   }

// //   // Save the updated data to localStorage
// //   localStorage.setItem("AdminMenuuuuuuuuuuu", JSON.stringify(updatedAdminMenus));

// //   setSelectedAdmin(null);
// //   setSelectedFeatures({});
// //   notifySuccess("Saved the updated feature!");
// // };


// const handleUpdateFeatures = async () => {
//   try {
//     // Update features logic

//     // Make the API call to update admin menus
//     const response = await fetch('http://localhost:3001/api/updateAdminMenus', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         selectedAdmin, // Assuming selectedAdmin is defined elsewhere in your code
//         selectedFeatures, // Assuming selectedFeatures is defined elsewhere in your code
//         features, // Assuming features is defined elsewhere in your code
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update admin menus');
//     }

//     // Parse the response data
//     const result = await response.json();

//     // Handle success
//     notifySuccess(result.message);

//     setSelectedAdmin(null);
//     setSelectedFeatures({});
//   } catch (error) {
//     console.error('Error updating admin menus:', error);
//     notifyError('Failed to update admin menus');
//   }
// };




// console.log("selectedFeatures:::::::::::::::::::>>>>>>>>>>",selectedFeatures);


//   return (
//     <>
//       <PageTitle>Access Control</PageTitle>

//       <Card className="mb-5">
//         <CardBody>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               setLoading(true);
//               setTimeout(() => {
//                 handleUpdateFeatures();
//                 setLoading(false);
//               }, 1000);
//             }}
//             className="grid gap-4 md:flex md:justify-between"
//           >
//             <div className="mb-4 md:w-1/3">
//               <label className="text-sm font-medium text-gray-700">Select Admin:</label>
//               <select
//                 className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white rounded"
//                 onChange={(e) => handleSelectAdmin(e.target.value)}
//                 value={selectedAdmin ? selectedAdmin.AdminID : null}
//               >
//                 <option value={null}>Select an admin</option>
//                 {admins.map((admin) => (
//                   <option key={admin.AdminID} value={admin.AdminID}>
//                     {admin.Name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {selectedAdmin && (
//               <div className="md:w-1/3">
//                 <Button
//                   type="submit"
//                   className="w-full h-12 text-white focus:outline-none focus:ring"

//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             )}
//           </form>
//         </CardBody>
//       </Card>

//       <Card className="mb-5">
//         <CardBody>
//           <TableContainer>
//             <Table>
//               <TableHeader>
//                 <tr>
//                   <TableCell className="w-1/6">Select</TableCell>
//                   <TableCell className="w-1/2">Feature</TableCell>
//                   <TableCell className="w-1/3">Subfeatures</TableCell>
//                 </tr>
//               </TableHeader>

//               <WindmillTableBody>
//                 {features.map((feature) => (
//                   <React.Fragment key={feature.MID}>
//                     <TableRow>
//                     {feature.MenuType === "M" && (
//                       <TableCell>
//   <input
//     type="checkbox"
//     checked={selectedFeatures[feature.MID]}
//     onChange={() => handleToggleFeature(feature)}
//     className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
//   />
// </TableCell>

//                       )}
//                       {feature.MenuType === "M" && (
//                         <TableCell className="font-bold">{feature.Name}</TableCell>
//                       )}

//                       <TableCell>
//                         {features
//                           .filter((subfeature) => subfeature.ParentMID === feature.MID)
//                           .map((subfeature) => (
//                             <React.Fragment key={subfeature.MID}>
//                               <input
//                                 type="checkbox"
//                                 checked={selectedFeatures[subfeature.MID]}
//                                 onChange={() => handleToggleSubfeature(subfeature)}
//                                 className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
//                               />
//                               {` ${subfeature.Name}`} {/* Displaying Name instead of PageUrl */}
//                               <br />
//                             </React.Fragment>
//                           ))}
//                       </TableCell>
//                     </TableRow>
//                   </React.Fragment>
//                 ))}
//               </WindmillTableBody>
//             </Table>
//           </TableContainer>
//         </CardBody>
//       </Card>

//       {loading && <TableLoading row={12} col={3} width={163} height={20} />}
//     </>
//   );
// };

// export default AccessControl;

// // const dummyFeatureData = [
//   // { MID: 427038, ParentMID: null, PageUrl: 'Dashboard', MenuType: 'M', IsActive: true, MenuIndex: 0 },
//   // { MID: 5394895, ParentMID: 427038, PageUrl: 'Overview', MenuType: 'S', IsActive: true, MenuIndex: 1 },
//   // { MID: 9857547, ParentMID: 427038, PageUrl: 'Analytics', MenuType: 'S', IsActive: true, MenuIndex: 2 }, 
//   // { MID: 9471903, ParentMID: null, PageUrl: 'Strategy', MenuType: 'M', IsActive: true, MenuIndex: 3 },
//   // { MID: 3365272, ParentMID: 9471903, PageUrl: 'Active Strategy', MenuType: 'S', IsActive: true, MenuIndex: 4 }, 
//   // { MID: 1936068, ParentMID: 9471903, PageUrl: 'Pending Strategy', MenuType: 'S', IsActive: true, MenuIndex: 5 }, 
//   // { MID: 7723346, ParentMID: null, PageUrl: 'SuperAdmin Master', MenuType: 'M', IsActive: true, MenuIndex: 6 }, 
// //   { MID: 2156845, ParentMID: 7723346, PageUrl: 'Admin List', MenuType: 'S', IsActive: true, MenuIndex: 7 },
// //   { MID: 2371892, ParentMID: 7723346, PageUrl: 'Create Admin', MenuType: 'S', IsActive: true, MenuIndex: 8 },
// //   { MID: 6862383, ParentMID: 7723346, PageUrl: 'Access control', MenuType: 'S', IsActive: true, MenuIndex: 9 }, 
// //   { MID: 7730610, ParentMID: null, PageUrl: 'User Support', MenuType: 'M', IsActive: true, MenuIndex: 10 }, 
// //   { MID: 3575572, ParentMID: 7730610, PageUrl: 'Open Tickets', MenuType: 'S', IsActive: true, MenuIndex: 11 }, 
// //   { MID: 6446457, ParentMID: 7730610, PageUrl: 'Closed Tickets', MenuType: 'S', IsActive: true, MenuIndex: 12 },
// //   { MID: 4152227, ParentMID: null, PageUrl: 'Communication', MenuType: 'M', IsActive: true, MenuIndex: 13 }, 
// //   { MID: 2552259, ParentMID: 4152227, PageUrl: 'Announcements', MenuType: 'S', IsActive: true, MenuIndex: 14 },
// //   { MID: 4416159, ParentMID: 4152227, PageUrl: 'Messaging', MenuType: 'S', IsActive: true, MenuIndex: 15 },
// //   { MID: 3163494, ParentMID: null, PageUrl: 'Feedback', MenuType: 'M', IsActive: true, MenuIndex: 16 },
// //   { MID: 870745, ParentMID: 3163494, PageUrl: 'Feedback Analysis', MenuType: 'S', IsActive: true, MenuIndex: 17 },
// //   { MID: 2043340, ParentMID: null, PageUrl: 'Reports', MenuType: 'M', IsActive: true, MenuIndex: 18 },
// // ];
// // Dummy data for features


// const dummyFeatureData = [
//   { MID: 427038, ParentMID: null, Name: 'Dashboard', PageUrl: 'dashboard', MenuType: 'M', IsActive: true, MenuIndex: 0 },
//   { MID: 5394895, ParentMID: 427038, Name: 'Overview', PageUrl: 'overview', MenuType: 'S', IsActive: true, MenuIndex: 1 },
//   { MID: 9857547, ParentMID: 427038, Name: 'Analytics', PageUrl: 'analytics', MenuType: 'S', IsActive: true, MenuIndex: 2 }, 
//   { MID: 9471903, ParentMID: null, Name: 'Strategy', PageUrl: 'strategy', MenuType: 'M', IsActive: true, MenuIndex: 3 },
//   { MID: 3365272, ParentMID: 9471903, Name: 'Active Strategy', PageUrl: 'activestrategy', MenuType: 'S', IsActive: true, MenuIndex: 4 }, 
//   { MID: 1936068, ParentMID: 9471903, Name: 'Pending Strategy', PageUrl: 'pendingstrategy', MenuType: 'S', IsActive: true, MenuIndex: 5 }, 
//   // { MID: 7723346, ParentMID: null, Name: 'Super Admin Master', PageUrl: 'superadminmaster', MenuType: 'M', IsActive: true, MenuIndex: 6 }, 
//   // { MID: 2156845, ParentMID: 7723346, Name: 'AdminList', PageUrl: 'adminlist', MenuType: 'S', IsActive: true, MenuIndex: 7 },
//   // { MID: 2371892, ParentMID: 7723346, Name: 'Create Admin', PageUrl: 'createadmin', MenuType: 'S', IsActive: true, MenuIndex: 8 },
//   // { MID: 6862383, ParentMID: 7723346, Name: 'Access Control', PageUrl: 'accesscontrol', MenuType: 'S', IsActive: true, MenuIndex: 9 }, 
//   { MID: 7730610, ParentMID: null, Name: 'User Support', PageUrl: 'usersupport', MenuType: 'M', IsActive: true, MenuIndex: 10 }, 
//   { MID: 3575572, ParentMID: 7730610, Name: 'OpenTickets', PageUrl: 'opentickets', MenuType: 'S', IsActive: true, MenuIndex: 11 }, 
//   { MID: 6446457, ParentMID: 7730610, Name: 'ClosedTickets', PageUrl: 'closedtickets', MenuType: 'S', IsActive: true, MenuIndex: 12 },
//   { MID: 4152227, ParentMID: null, Name: 'Communication', PageUrl: 'communication', MenuType: 'M', IsActive: true, MenuIndex: 13 }, 
//   { MID: 2552259, ParentMID: 4152227, Name: 'Announcements', PageUrl: 'announcements', MenuType: 'S', IsActive: true, MenuIndex: 14 },
//   { MID: 4416159, ParentMID: 4152227, Name: 'Messaging', PageUrl: 'messaging', MenuType: 'S', IsActive: true, MenuIndex: 15 },
//   { MID: 3163494, ParentMID: null, Name: 'Feedback', PageUrl: 'feedback', MenuType: 'M', IsActive: true, MenuIndex: 16 },
//   { MID: 870745, ParentMID: 3163494, Name: 'FeedbackAnalysis', PageUrl: 'feedbackanalysis', MenuType: 'S', IsActive: true, MenuIndex: 17 },
//   { MID: 2043340, ParentMID: null, Name: 'Reports', PageUrl: 'reports', MenuType: 'M', IsActive: true, MenuIndex: 18 },
// ];

// // const AdminMenu = [
// //   {
// //   adminId : 1706013125044220,
// //   sidebar: [
// //   {
// //     427038:[5394895,9857547],
// //   },
// //   {
// //     4152227:[2552259,4416159],
// //   }
  
// //   ]
// //   }
// //   ]||||||| .r17



import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableBody as WindmillTableBody,
  TableRow,
} from "@windmill/react-ui";
import TableLoading from "components/preloader/TableLoading";
import PageTitle from "components/Typography/PageTitle";
import { useLocation } from "react-router-dom";
import { notifySuccess } from "utils/toast";

const AccessControl = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState({});

  const location = useLocation();
  const userIdParam = new URLSearchParams(location.search).get("hfgtyrh");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulating fetching data from localStorage
        // Replace this with your actual data fetching logic
        // setFeatures(dummyFeatureData);

        const localStorageDataMenu_Master = localStorage.getItem("Menu_Master");
        const parsedDataMenu_Master = localStorageDataMenu_Master ? JSON.parse(localStorageDataMenu_Master) : [];
        setFeatures(parsedDataMenu_Master || []);
  

        const localStorageData = localStorage.getItem("Admin_Master");
        const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
        setAdmins(parsedData || []);

        if (userIdParam) {
          const selected = parsedData.find((admin) => admin.AdminID === userIdParam);
          setSelectedAdmin(selected || null);
        } else {
          setAdmins(parsedData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userIdParam]);

  const handleToggleFeature = (feature) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [feature.MID]: !prev[feature.MID],
    }));
  };

  const handleToggleSubfeature = (subfeature) => {
    setSelectedFeatures((prev) => ({
      ...prev,
      [subfeature.MID]: !prev[subfeature.MID],
    }));
  };

  const handleSelectAdmin = (adminId) => {
    const selected = admins.find((admin) => admin.AdminID === adminId);
    setSelectedAdmin(selected);
  };

  function generateUniqueId() {
    return Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
  }
  

  // const handleUpdateFeatures = () => {
  //   // Update features logic


  //   const selectedMenus = [];
  //   for (const [key, value] of Object.entries(selectedFeatures)) {
  //     if (value) {
  //       selectedMenus.push({
  //         AmID: generateUniqueId(), // Generate or fetch AmID
  //         AdminID: selectedAdmin.AdminID,
  //         MenuID: key,
  //         IsActive: true,
  //         UpdatedDate: new Date().toISOString(),
  //       });
  //     }
  //   }
  //   localStorage.setItem("Admin_Menus", JSON.stringify(selectedMenus));
  //   notifySuccess("Saved the updated feature.!");
  // };


  // useEffect(()=>{
  //   localStorage.setItem("Menu_Master", JSON.stringify(dummyFeatureData));
  // },[]);


//   const handleUpdateFeatures = () => {
//   // Update features logic

//   const existingAdminMenus = JSON.parse(localStorage.getItem("Admin_Menus")) || [];
//   const selectedMenus = [];

//   for (const [key, value] of Object.entries(selectedFeatures)) {
//     if (value) {
//       // Check if an entry already exists for the selected admin and menu ID
//       const existingEntryIndex = existingAdminMenus.findIndex(
//         (entry) => entry.AdminID === selectedAdmin.AdminID && entry.MenuID === key
//       );

//       // If no existing entry found, add it to the selectedMenus
//       if (existingEntryIndex === -1) {
//         selectedMenus.push({
//           AmID: generateUniqueId(), // Generate or fetch AmID
//           AdminID: selectedAdmin.AdminID,
//           MenuID: key,
//           IsActive: true,
//           UpdatedDate: new Date().toISOString(),
//         });
//       }
//     }
//   }

//   // Merge existing admin menus with selected menus
//   const updatedAdminMenus = [...existingAdminMenus, ...selectedMenus];
//   localStorage.setItem("Admin_Menus", JSON.stringify(updatedAdminMenus));
//   notifySuccess("Saved the updated feature.!");
// };


// const handleUpdateFeatures = () => {
//   // Update features logic

//   const existingAdminMenus = JSON.parse(localStorage.getItem("AdminMenuuuuuuuuuuu")) || [];
//   let updatedAdminMenus = [...existingAdminMenus]; // Copy existing data

//   // Find the index of the admin in the existing data
//   const adminIndex = updatedAdminMenus.findIndex(menu => menu.adminId === selectedAdmin.AdminID);

//   // If the admin exists in the data, update its sidebar
//   if (adminIndex !== -1) {
//     const adminSidebar = updatedAdminMenus[adminIndex].sidebar;

//     const parentFeatures = features.filter(feature => feature.MenuType === 'M' && feature.ParentMID === null);
    
//     // Iterate over parent features
//     for (const parentFeature of parentFeatures) {
//       // Get child subfeatures for the parent feature
//       const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parentFeature.MID);
      
//       // Create an array of subfeature MID's
//       const subfeatureMIDs = subfeatures.map(subfeature => subfeature.MID);
      
//       // Add parent feature and its subfeatures to the sidebar
//       adminSidebar.push({ [parentFeature.MID]: subfeatureMIDs });
//     }

//     // Update the admin's sidebar in the main data
//     updatedAdminMenus[adminIndex].sidebar = adminSidebar;
//   } else {
//     // If the admin doesn't exist in the data, create a new entry
//     const newAdminMenu = {
//       adminId: selectedAdmin.AdminID,
//       sidebar: []
//     };

//     const parentFeatures = features.filter(feature => feature.MenuType === 'M' && feature.ParentMID === null);
    
//     // Iterate over parent features
//     for (const parentFeature of parentFeatures) {
//       // Get child subfeatures for the parent feature
//       const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parentFeature.MID);
      
//       // Create an array of subfeature MID's
//       const subfeatureMIDs = subfeatures.map(subfeature => subfeature.MID);
      
//       // Add parent feature and its subfeatures to the sidebar
//       newAdminMenu.sidebar.push({ [parentFeature.MID]: subfeatureMIDs });
//     }

//     // Add the new admin's data to the main data
//     updatedAdminMenus.push(newAdminMenu);
//   }

//   // Save the updated data to localStorage
//   localStorage.setItem("AdminMenuuuuuuuuuuu", JSON.stringify(updatedAdminMenus));

//   notifySuccess("Saved the updated feature!");
// };

const handleUpdateFeatures = () => {
  // Update features logic

  const existingAdminMenus = JSON.parse(localStorage.getItem("AdminMenuuuuuuuuuuu")) || [];
  let updatedAdminMenus = [...existingAdminMenus]; // Copy existing data

  // Find the index of the admin in the existing data
  const adminIndex = updatedAdminMenus.findIndex(menu => menu.adminId === selectedAdmin.AdminID);

  // If the admin exists in the data, update its adminId
  if (adminIndex !== -1) {
    updatedAdminMenus[adminIndex].adminId = selectedAdmin.AdminID;
  } else {
    // If the admin doesn't exist in the data, create a new entry
    const newAdminMenu = {
      adminId: selectedAdmin.AdminID,
      sidebar: []
    };

    updatedAdminMenus.push(newAdminMenu);
  }

  // If adminIndex is still -1, set it to the last index
  const currentIndex = adminIndex !== -1 ? adminIndex : updatedAdminMenus.length - 1;

  // Iterate over selected features
  for (const key in selectedFeatures) {
    if (selectedFeatures[key]) { // Only include checked features
      const parentFeature = features.find(feature => feature.MID === parseInt(key) && feature.MenuType === 'M');
      if (parentFeature) {
        // Get child subfeatures for the parent feature
        const subfeatures = features.filter(subfeature => subfeature.MenuType === 'S' && subfeature.ParentMID === parseInt(key));

        // Create an array of subfeature MID's that are selected
        const selectedSubfeatureMIDs = Object.keys(selectedFeatures)
          .filter(subfeatureMID => subfeatures.some(subfeature => subfeature.MID === parseInt(subfeatureMID)));

        // Add parent feature and its selected subfeatures to the sidebar
        updatedAdminMenus[currentIndex].sidebar.push({ [parentFeature.MID]: selectedSubfeatureMIDs });
      }
    }
  }

  // Save the updated data to localStorage
  localStorage.setItem("AdminMenuuuuuuuuuuu", JSON.stringify(updatedAdminMenus));

  setSelectedAdmin(null);
  setSelectedFeatures({});
  notifySuccess("Saved the updated feature!");
};











console.log("selectedFeatures:::::::::::::::::::>>>>>>>>>>",selectedFeatures);


  return (
    <>
      <PageTitle>Access Control</PageTitle>

      <Card className="mb-5">
        <CardBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                handleUpdateFeatures();
                setLoading(false);
              }, 1000);
            }}
            className="grid gap-4 md:flex md:justify-between"
          >
            <div className="mb-4 md:w-1/3">
              <label className="text-sm font-medium text-gray-700">Select Admin:</label>
              <select
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white rounded"
                onChange={(e) => handleSelectAdmin(e.target.value)}
                value={selectedAdmin ? selectedAdmin.AdminID : null}
              >
                <option value={null}>Select an admin</option>
                {admins.map((admin) => (
                  <option key={admin.AdminID} value={admin.AdminID}>
                    {admin.Name}
                  </option>
                ))}
              </select>
            </div>

            {selectedAdmin && (
              <div className="md:w-1/3">
                <Button
                  type="submit"
                  className="w-full h-12 text-white focus:outline-none focus:ring"

                >
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </CardBody>
      </Card>

      <Card className="mb-5">
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="w-1/6">Select</TableCell>
                  <TableCell className="w-1/2">Feature</TableCell>
                  <TableCell className="w-1/3">Subfeatures</TableCell>
                </tr>
              </TableHeader>

              <WindmillTableBody>
                {features.map((feature) => (
                  <React.Fragment key={feature.MID}>
                    <TableRow>
                    {feature.MenuType === "M" && (
                      <TableCell>
  <input
    type="checkbox"
    checked={selectedFeatures[feature.MID]}
    onChange={() => handleToggleFeature(feature)}
    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
  />
</TableCell>

                      )}
                      {feature.MenuType === "M" && (
                        <TableCell className="font-bold">{feature.Name}</TableCell>
                      )}

                      <TableCell>
                        {features
                          .filter((subfeature) => subfeature.ParentMID === feature.MID)
                          .map((subfeature) => (
                            <React.Fragment key={subfeature.MID}>
                              <input
                                type="checkbox"
                                checked={selectedFeatures[subfeature.MID]}
                                onChange={() => handleToggleSubfeature(subfeature)}
                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 focus:border-blue-400"
                              />
                              {` ${subfeature.Name}`} {/* Displaying Name instead of PageUrl */}
                              <br />
                            </React.Fragment>
                          ))}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </WindmillTableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      {loading && <TableLoading row={12} col={3} width={163} height={20} />}
    </>
  );
};

export default AccessControl;

// const dummyFeatureData = [
  // { MID: 427038, ParentMID: null, PageUrl: 'Dashboard', MenuType: 'M', IsActive: true, MenuIndex: 0 },
  // { MID: 5394895, ParentMID: 427038, PageUrl: 'Overview', MenuType: 'S', IsActive: true, MenuIndex: 1 },
  // { MID: 9857547, ParentMID: 427038, PageUrl: 'Analytics', MenuType: 'S', IsActive: true, MenuIndex: 2 }, 
  // { MID: 9471903, ParentMID: null, PageUrl: 'Strategy', MenuType: 'M', IsActive: true, MenuIndex: 3 },
  // { MID: 3365272, ParentMID: 9471903, PageUrl: 'Active Strategy', MenuType: 'S', IsActive: true, MenuIndex: 4 }, 
  // { MID: 1936068, ParentMID: 9471903, PageUrl: 'Pending Strategy', MenuType: 'S', IsActive: true, MenuIndex: 5 }, 
  // { MID: 7723346, ParentMID: null, PageUrl: 'SuperAdmin Master', MenuType: 'M', IsActive: true, MenuIndex: 6 }, 
//   { MID: 2156845, ParentMID: 7723346, PageUrl: 'Admin List', MenuType: 'S', IsActive: true, MenuIndex: 7 },
//   { MID: 2371892, ParentMID: 7723346, PageUrl: 'Create Admin', MenuType: 'S', IsActive: true, MenuIndex: 8 },
//   { MID: 6862383, ParentMID: 7723346, PageUrl: 'Access control', MenuType: 'S', IsActive: true, MenuIndex: 9 }, 
//   { MID: 7730610, ParentMID: null, PageUrl: 'User Support', MenuType: 'M', IsActive: true, MenuIndex: 10 }, 
//   { MID: 3575572, ParentMID: 7730610, PageUrl: 'Open Tickets', MenuType: 'S', IsActive: true, MenuIndex: 11 }, 
//   { MID: 6446457, ParentMID: 7730610, PageUrl: 'Closed Tickets', MenuType: 'S', IsActive: true, MenuIndex: 12 },
//   { MID: 4152227, ParentMID: null, PageUrl: 'Communication', MenuType: 'M', IsActive: true, MenuIndex: 13 }, 
//   { MID: 2552259, ParentMID: 4152227, PageUrl: 'Announcements', MenuType: 'S', IsActive: true, MenuIndex: 14 },
//   { MID: 4416159, ParentMID: 4152227, PageUrl: 'Messaging', MenuType: 'S', IsActive: true, MenuIndex: 15 },
//   { MID: 3163494, ParentMID: null, PageUrl: 'Feedback', MenuType: 'M', IsActive: true, MenuIndex: 16 },
//   { MID: 870745, ParentMID: 3163494, PageUrl: 'Feedback Analysis', MenuType: 'S', IsActive: true, MenuIndex: 17 },
//   { MID: 2043340, ParentMID: null, PageUrl: 'Reports', MenuType: 'M', IsActive: true, MenuIndex: 18 },
// ];

// const dummyFeatureData = [
//   { MID: 427038, ParentMID: null, Name: 'Dashboard', PageUrl: 'dashboard', MenuType: 'M', IsActive: true, MenuIndex: 0 },
//   { MID: 5394895, ParentMID: 427038, Name: 'Overview', PageUrl: 'overview', MenuType: 'S', IsActive: true, MenuIndex: 1 },
//   { MID: 9857547, ParentMID: 427038, Name: 'Analytics', PageUrl: 'analytics', MenuType: 'S', IsActive: true, MenuIndex: 2 }, 
//   { MID: 9471903, ParentMID: null, Name: 'Strategy', PageUrl: 'strategy', MenuType: 'M', IsActive: true, MenuIndex: 3 },
//   { MID: 3365272, ParentMID: 9471903, Name: 'Active Strategy', PageUrl: 'activestrategy', MenuType: 'S', IsActive: true, MenuIndex: 4 }, 
//   { MID: 1936068, ParentMID: 9471903, Name: 'Pending Strategy', PageUrl: 'pendingstrategy', MenuType: 'S', IsActive: true, MenuIndex: 5 }, 
//   // { MID: 7723346, ParentMID: null, Name: 'Super Admin Master', PageUrl: 'superadminmaster', MenuType: 'M', IsActive: true, MenuIndex: 6 }, 
//   // { MID: 2156845, ParentMID: 7723346, Name: 'AdminList', PageUrl: 'adminlist', MenuType: 'S', IsActive: true, MenuIndex: 7 },
//   // { MID: 2371892, ParentMID: 7723346, Name: 'Create Admin', PageUrl: 'createadmin', MenuType: 'S', IsActive: true, MenuIndex: 8 },
//   // { MID: 6862383, ParentMID: 7723346, Name: 'Access Control', PageUrl: 'accesscontrol', MenuType: 'S', IsActive: true, MenuIndex: 9 }, 
//   { MID: 7730610, ParentMID: null, Name: 'User Support', PageUrl: 'usersupport', MenuType: 'M', IsActive: true, MenuIndex: 10 }, 
//   { MID: 3575572, ParentMID: 7730610, Name: 'OpenTickets', PageUrl: 'opentickets', MenuType: 'S', IsActive: true, MenuIndex: 11 }, 
//   { MID: 6446457, ParentMID: 7730610, Name: 'ClosedTickets', PageUrl: 'closedtickets', MenuType: 'S', IsActive: true, MenuIndex: 12 },
//   { MID: 4152227, ParentMID: null, Name: 'Communication', PageUrl: 'communication', MenuType: 'M', IsActive: true, MenuIndex: 13 }, 
//   { MID: 2552259, ParentMID: 4152227, Name: 'Announcements', PageUrl: 'announcements', MenuType: 'S', IsActive: true, MenuIndex: 14 },
//   { MID: 4416159, ParentMID: 4152227, Name: 'Messaging', PageUrl: 'messaging', MenuType: 'S', IsActive: true, MenuIndex: 15 },
//   { MID: 3163494, ParentMID: null, Name: 'Feedback', PageUrl: 'feedback', MenuType: 'M', IsActive: true, MenuIndex: 16 },
//   { MID: 870745, ParentMID: 3163494, Name: 'FeedbackAnalysis', PageUrl: 'feedbackanalysis', MenuType: 'S', IsActive: true, MenuIndex: 17 },
//   { MID: 2043340, ParentMID: null, Name: 'Reports', PageUrl: 'reports', MenuType: 'M', IsActive: true, MenuIndex: 18 },
// ];

// const AdminMenu = [
//   {
//   adminId : 1706013125044220,
//   sidebar: [
//   {
//     427038:[5394895,9857547],
//   },
//   {
//     4152227:[2552259,4416159],
//   }
  
//   ]
//   }
//   ]