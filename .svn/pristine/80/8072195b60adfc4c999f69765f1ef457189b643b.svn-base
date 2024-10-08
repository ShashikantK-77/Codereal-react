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
const AccessControl = () => {
  const [admins, setAdmins] = useState(dummyAdminData);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [features, setFeatures] = useState(dummyFeatureData);

  console.log("features",features);

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const userIdParam = new URLSearchParams(location.search).get("userId");

  // useEffect(()=>{
    
  // // Convert the fetched data to the desired structure
  // const adminFeaturesData = JSON.parse(localStorage.getItem('adminFeatures')) || [];

  // // Set the featureTableData in state
  // setFeatures(adminFeaturesData);

  // console.log('Feature Table Data:', adminFeaturesData);
  // },[])


  // useEffect(() => {
  //   // Update localStorage with new features data whenever features state changes
  //   localStorage.setItem("Menu_Master", JSON.stringify(features));
  // }, [features]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch admin data from localStorage
        const localStorageData = localStorage.getItem("Admin_Master");
        const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
        setAdmins(parsedData || []);
        if (userIdParam) {
          // Find the admin with the matching userId
          const selected = parsedData.find((admin) => admin.AdminID === userIdParam);
          console.log("selected:",selected);
          // Update the state with the fetched data
          setSelectedAdmin(selected || null);
        } else {
          // No userId parameter, set admins to the entire array
          setAdmins(parsedData || []);
          // Set selectedAdmin to the first admin in the array
          // setSelectedAdmin(parsedData.length > 0 ? parsedData[0] : null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userIdParam]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

  const handleToggleFeature = (featureName) => {
    // Access control logic here, e.g., check user role, permissions, etc.
    // For demonstration purposes, assume all users have access to toggle features
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.name === featureName
          ? {
              ...feature,
              enabled: !feature.enabled,
              subfeatures: feature.subfeatures.map((subfeature) => ({
                ...subfeature,
                enabled: !feature.enabled,
              })),
            }
          : feature
      )
    );
  };

  const handleToggleSubfeature = (featureName, subfeatureName) => {
    // Access control logic here, e.g., check user role, permissions, etc.
    // For demonstration purposes, assume all users have access to toggle subfeatures
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.name === featureName
          ? {
              ...feature,
              subfeatures: feature.subfeatures.map((subfeature) =>
                subfeature.name === subfeatureName
                  ? { ...subfeature, enabled: !subfeature.enabled }
                  : subfeature
              ),
              enabled: feature.subfeatures.some((subfeature) => subfeature.enabled),
            }
          : feature
      )
    );
  };

  const handleSelectAdmin = (adminId) => {
    const selected = admins.find((admin) => admin.AdminID === adminId);
    setSelectedAdmin(selected);
  };

  const handleUpdateFeatures = () => {
    try {
      setLoading(true);

      // Access control logic here, e.g., check user role, permissions, etc.
      // For demonstration purposes, assume all users have access to update features
      let existingAdminFeatures = JSON.parse(localStorage.getItem('adminFeatures')) || [];

      if (!Array.isArray(existingAdminFeatures)) {
        existingAdminFeatures = [];
      }

      const adminFeatures = {
        adminId: selectedAdmin.AdminID,
        features: features.map((feature) => ({
          name: feature.name,
          enabled: feature.enabled,
          subfeatures: feature.subfeatures.map((subfeature) => ({
            name: subfeature.name,
            enabled: subfeature.enabled,
          })),
        })),
      };

      const existingIndex = existingAdminFeatures.findIndex(entry => entry && entry.adminId === selectedAdmin.AdminID);

      if (existingIndex !== -1) {
        existingAdminFeatures[existingIndex] = adminFeatures;
      } else {
        existingAdminFeatures.push(adminFeatures);
      }

      localStorage.setItem('adminFeatures', JSON.stringify(existingAdminFeatures));
      console.log('Features updated and stored in localStorage:', existingAdminFeatures);
    } catch (error) {
      console.error('Error updating and storing features:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
                  onClick={() => handleUpdateFeatures()}
                  className="w-full h-12  text-white  focus:outline-none focus:ring "
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
                  <React.Fragment key={feature.itemId}>
                    <TableRow>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={feature.enabled}
                          onChange={() => handleToggleFeature(feature.name)}
                          className="form-checkbox h-5 w-5 text-blue-500"
                        />
                      </TableCell>
                      <TableCell className={feature.type === 'feature' ? 'font-bold' : ''}>
                        {feature.name}
                      </TableCell>
                      <TableCell>
                        {feature.subfeatures && feature.subfeatures.length > 0 && (
                          <ul className="pl-4">
                            {feature.subfeatures.map((subfeature) => (
                              <li key={subfeature.itemId}>
                                <input
                                  type="checkbox"
                                  checked={subfeature.enabled}
                                  onChange={() => handleToggleSubfeature(feature.name, subfeature.name)}
                                  className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                {` ${subfeature.name}`}
                              </li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                    </TableRow>
                    {/* Display subfeatures of subfeatures */}
                    {feature.subfeatures && feature.subfeatures.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <ul className="pl-8">
                            {feature.subfeatures.map((subfeature) => (
                              <li key={subfeature.itemId}>
                                <input
                                  type="checkbox"
                                  checked={subfeature.enabled}
                                  onChange={() => handleToggleSubfeature(feature.name, subfeature.name)}
                                  className="form-checkbox h-5 w-5 text-blue-500"
                                />
                                {` ${subfeature.name}`}
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                      </TableRow>
                    )}
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




const dummyAdminData = [
  { id: 1, name: "Admin 1", selected: false },
  { id: 2, name: "Admin 2", selected: false },
  { id: 3, name: "Admin 3", selected: false },
];

// const dummyFeatureData = [
//   {
//     name: "Dashboard",
//     enabled: true,
//     subfeatures: [
//       { name: "Overview", enabled: true },
//       { name: "Analytics", enabled: true },
//     ],
//   },
//   {
//     name: "Strategy",
//     enabled: true,
//     subfeatures: [
//       { name: "Active Strategy", enabled: true },
//       { name: "Pending Strategy", enabled: true },
//     ],
//   },
//   { name: "SuperAdmin Master", 
//   enabled: true, 
//   subfeatures: [
//     { name: "Admin List", enabled: true },
//     { name: "Create Admin", enabled: true },
//     { name: "Access control", enabled: true },
//   ] },

//   { name: "User Support", enabled: true, subfeatures: [
//     { name: "Open Tickets", enabled: true },
//     { name: "Closed Tickets", enabled: true },

//   ] },
//   {
//     name: "Communication",
//     enabled: true,
//     subfeatures: [
//       { name: "Announcements", enabled: true },
//       { name: "Messaging", enabled: true },
//     ],
//   },
//   { name: "Feedback", enabled: true, subfeatures: [
//     { name: "Feedback Analysis", enabled: true },
//   ] },
//   { name: "Reports", enabled: true, subfeatures: [
//     { name: "Usage Reports", enabled: true },
//       { name: "Performance Reports", enabled: true },
//   ] },
//   { name: "Data Export", enabled: true, subfeatures: [
//     { name: "Export Logs", enabled: true },
//     { name: "Custom Logs", enabled: true },
//   ] },
//   { name: "System Config.", enabled: true, subfeatures: [
//     { name: "Genral Settings", enabled: true },
//     { name: "Notification Settings", enabled: true },
//   ] },
//   { name: "Audit Trail", enabled: true, subfeatures: [] },
//   { name: "Profile", enabled: true, subfeatures: [] },
//   { name: "Training & Doc.", enabled: true, subfeatures: [] },
// ];

const dummyFeatureData = [
  { MID: 427038, ParentMID: null, PageUrl: 'Dashboard', MenuType: 'M', IsActive: true, MenuIndex: 0 },
  { MID: 5394895, ParentMID: 427038, PageUrl: 'Overview', MenuType: 'S', IsActive: true, MenuIndex: 1 },
  { MID: 9857547, ParentMID: 427038, PageUrl: 'Analytics', MenuType: 'S', IsActive: true, MenuIndex: 2 }, 
  { MID: 9471903, ParentMID: null, PageUrl: 'Strategy', MenuType: 'M', IsActive: true, MenuIndex: 3 },
  { MID: 3365272, ParentMID: 9471903, PageUrl: 'Active Strategy', MenuType: 'S', IsActive: true, MenuIndex: 4 }, 
  { MID: 1936068, ParentMID: 9471903, PageUrl: 'Pending Strategy', MenuType: 'S', IsActive: true, MenuIndex: 5 }, 
  { MID: 7723346, ParentMID: null, PageUrl: 'SuperAdmin Master', MenuType: 'M', IsActive: true, MenuIndex: 6 }, 
  { MID: 2156845, ParentMID: 7723346, PageUrl: 'Admin List', MenuType: 'S', IsActive: true, MenuIndex: 7 },
  { MID: 2371892, ParentMID: 7723346, PageUrl: 'Create Admin', MenuType: 'S', IsActive: true, MenuIndex: 8 },
  { MID: 6862383, ParentMID: 7723346, PageUrl: 'Access control', MenuType: 'S', IsActive: true, MenuIndex: 9 }, 
  { MID: 7730610, ParentMID: null, PageUrl: 'User Support', MenuType: 'M', IsActive: true, MenuIndex: 10 }, 
  { MID: 3575572, ParentMID: 7730610, PageUrl: 'Open Tickets', MenuType: 'S', IsActive: true, MenuIndex: 11 }, 
  { MID: 6446457, ParentMID: 7730610, PageUrl: 'Closed Tickets', MenuType: 'S', IsActive: true, MenuIndex: 12 },
  { MID: 4152227, ParentMID: null, PageUrl: 'Communication', MenuType: 'M', IsActive: true, MenuIndex: 13 }, 
  { MID: 2552259, ParentMID: 4152227, PageUrl: 'Announcements', MenuType: 'S', IsActive: true, MenuIndex: 14 },
  { MID: 4416159, ParentMID: 4152227, PageUrl: 'Messaging', MenuType: 'S', IsActive: true, MenuIndex: 15 },
  { MID: 3163494, ParentMID: null, PageUrl: 'Feedback', MenuType: 'M', IsActive: true, MenuIndex: 16 },
  { MID: 870745, ParentMID: 3163494, PageUrl: 'Feedback Analysis', MenuType: 'S', IsActive: true, MenuIndex: 17 },
  { MID: 2043340, ParentMID: null, PageUrl: 'Reports', MenuType: 'M', IsActive: true, MenuIndex: 18 },
];
