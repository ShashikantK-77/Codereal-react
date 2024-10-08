import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableFooter,
  TableHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from "@windmill/react-ui";

import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { useTranslation } from "react-i18next";
import ShowHideButton from "components/table/ShowHideButton";
import { FiLock, FiUnlock, FiDelete, FiTrash2, FiKey, FiSettings  } from "react-icons/fi";
import Tooltip from "components/tooltip/Tooltip";
import LabelArea from "components/form/LabelArea";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "utils/toast";

const AdminList = () => {
  const { t } = useTranslation();
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch admin data from localStorage or an API and update the state
    const fetchData = async () => {
      try {
        // Fetch data from localStorage
        const localStorageData = localStorage.getItem("Admin_Master");
        const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
  
        // Filter out items with IsDeleted set to true
        const filteredData = parsedData.filter((admin) => !admin.IsDeleted);
  
        // Update the state with the fetched data
        setAdminData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleLockUnlock = (userId) => {
    setAdminData((prevData) => {
      const updatedAdminData = prevData.map((admin) =>
        admin.AdminID === userId
          ? {
              ...admin,
              IsLocked: !admin.IsLocked,
            }
          : admin
      );
      console.log("Updated Data:", updatedAdminData);
  
      localStorage.setItem("Admin_Master", JSON.stringify(updatedAdminData));
      return updatedAdminData;
    });
  };
  

  const handleDeleteAdmin = (adminID) => {
    try {
      // Fetch admin data from localStorage
      const localStorageData = localStorage.getItem("Admin_Master");
      let adminData = localStorageData ? JSON.parse(localStorageData) : [];
  
      // Find the admin with the matching adminID
      const adminIndex = adminData.findIndex((admin) => admin.AdminID === adminID);
  
      if (adminIndex !== -1) {
        // Update the IsDeleted property to true
        adminData[adminIndex].IsDeleted = true;
  
        // Save the updated data back to localStorage
        localStorage.setItem("Admin_Master", JSON.stringify(adminData));
  
        // Optionally, you can re-fetch the data or update the state as needed
        // fetchData();
        // setAdmins(updatedAdminData);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };
  
  // Example usage
  // handleDeleteAdmin("4m3v_a5x");
  
  
  

  const handleResetPassword = (userId) => {
    // Validate password
    const passwordValidation = validate("password", newPassword);
  
    // Validate confirm password
    const cpasswordValidation = validate("cpassword", confirmPassword, newPassword);
  
    // Check if there are any validation errors
    if (passwordValidation !== true || cpasswordValidation !== true) {
      // Handle validation errors (show error notification, etc.)
      console.error("Validation error:", passwordValidation, cpasswordValidation);
      notifyError(passwordValidation, cpasswordValidation);
      // Optionally, you can show a notification or take other actions
      return;
    }
  
    // If both password and confirm password are valid, proceed with your success logic
    try {
      // Fetch admin data from localStorage
      const localStorageData = localStorage.getItem("Admin_Master");
      let adminData = localStorageData ? JSON.parse(localStorageData) : [];
  
      // Find the admin with the matching adminID
      const adminIndex = adminData.findIndex((admin) => admin.AdminID === selectedUserId);
  
      if (adminIndex !== -1) {
        // Update the Password field with the new password
        adminData[adminIndex].Password = newPassword;
  
        // Save the updated data back to localStorage
        localStorage.setItem("Admin_Master", JSON.stringify(adminData));
  
        // Show success notification
        notifySuccess("Password reset successful!");
  
        // Close the modal and reset the form
        setResetPasswordModal(false);
        setSelectedUserId(null);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        // User not found, handle this case (show error notification, etc.)
        console.error("User not found!");
        notifyError("User not found!");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle the error (show error notification, etc.)
      notifyError("Error updating password");
    }
  };
  

  const validate = (type, value, password) => {
    switch (type) {
      case "password":
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) ||
          "Invalid password pattern! Password should contain at least 8 characters including one number, one lowercase, and one uppercase letter.";
      case "cpassword":
        return value === password || "Passwords do not match!";
      default:
        return true;
    }
  };
  

    
  const handleModalClose = () => {
    // Log the values (you can replace this with your actual logic)
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    // Close the modal and reset the form
    setResetPasswordModal(false);
    setSelectedUserId(null);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleModalOpen = (adminID) => {
    setSelectedUserId(adminID);
    setResetPasswordModal(true);
    
  }
  return (
    <>
      <PageTitle>Admin List</PageTitle>

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="items-center">
          
            </div>
          </form>
        </CardBody>
      </Card> */}

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Name / id / mobileno."
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={163} height={20} />
      ) : adminData.length === 0 ? (
        <NotFound title={t("NoAdminsAvailable")} />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("AdminId")}</TableCell>
                <TableCell>{t("Admin Name")}</TableCell>
                {/* <TableCell>{t("Account Type")}</TableCell> */}
                {/* <TableCell>{t("Password")}</TableCell> */}
                <TableCell>{t("Mobile No.")}</TableCell>
                <TableCell>{t("Email")}</TableCell>
                <TableCell>{t("Status")}</TableCell>
                <TableCell className="text-left">{t("Action")}</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {adminData.map((admin) => (
                <tr key={admin.UserID}>
                  <TableCell>{admin.AdminID}</TableCell>
                  <TableCell>{admin.Name}</TableCell>
                  {/* <TableCell>{admin.Account_Type}</TableCell> */}
                  {/* <TableCell>{admin.Password}</TableCell> */}
                  <TableCell>{admin.Mobile_No}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
  {admin.IsLocked ? "Locked" : "UnLocked"}
</TableCell>

                  <TableCell className="text-center flex ">
                
                  {admin.IsLocked ? (
  <Tooltip
    id={admin.UserID}
    Icon={FiUnlock}
    title="Unlock"
    bgColor="#a2a2a2"
    onClick={() => handleLockUnlock(admin.AdminID)}
  />
) : (
  <Tooltip
    id={admin.UserID}
    Icon={FiLock}
    title="Lock"
    bgColor="#10B981"
    onClick={() => handleLockUnlock(admin.AdminID)}
  />
)}


                          
                 
                
                    

                    {/* {admin.IsDelete==="false" &&(
                          <> */}

                    {/* <FiTrash2
                      className="text-center text-gray-500 hover:text-red-600 cursor-pointer m-1"
                      // onClick={() => handleDeleteAdmin(admin.UserID)}
                    /> */}
                     <Tooltip
                  id="delete"
                  Icon={FiTrash2}
                  title="delete"
                  bgColor="#ff1100"
                  onClick={() => handleDeleteAdmin(admin.AdminID)}
                />

                
                 
                    {/* </>
)} */}

                    {/* <FiKey
                      className="text-center text-blue-500 hover:text-blue-600 cursor-pointer m-1"
                      onClick={() => handleResetPassword(admin.UserID)}
                    /> */}

<Tooltip
                  id="Reset Password"
                  Icon={FiKey}
                  title="Reset Password"
                  bgColor="#10B981"
                  onClick={() => handleModalOpen(admin.AdminID)}
                />

<Link to={`/accesscontrol?hfgtyrh=${admin.AdminID}`}>
<Tooltip
                  id="Access Control"
                  Icon={FiSettings }
                  title="Access Control"
                  bgColor="#10B981"
                  // onClick={() => handleResetPassword(admin.AdminID)}
                />
                </Link>
         
                  </TableCell>
                </tr>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            {/* <Pagination label="Table navigation" /> */}
          </TableFooter>
        </TableContainer>
      )}

      {/* You can add more components or controls related to admin list here */}

      {/* Reset Password Modal */}
      <Modal isOpen={resetPasswordModal} onClose={handleModalClose}>
      <ModalHeader>Reset Password</ModalHeader>
      <ModalBody>
        <form>
          <LabelArea label="Password" />
          <Input
            className="border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <LabelArea label="Confirm Password" />
          <Input
            className="border h-12 text-sm focus:outline-none block w-full bg-white-100 dark:bg-white border-transparent focus:bg-white"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="flex justify-between w-full mt-4">
          <Button layout="outline" onClick={handleModalClose} className="w-full m-1">
            {t("Cancel")}
          </Button>
          <Button onClick={handleResetPassword} className="w-full m-1">
            {t("Reset Password")}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
    </>
  );
};

export default AdminList;
