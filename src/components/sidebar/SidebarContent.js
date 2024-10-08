import React, { useContext,useState, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";
import logoDark from "assets/img/logo/logo-dark.svg";
import logoLight from "assets/img/logo/logo-light.svg";
import sidebar from "routes/sidebar";
import Clientsidebar from "routes/Clientsidebar";
import useEncryption from "hooks/useEncryption";

import { AdminContext } from "context/AdminContext";
import SidebarSubMenu from "./SidebarSubMenu";
import { useHistory } from "react-router-dom";
// import SidebarSubMenu from "SidebarSubMenu";
import { useTranslation } from "react-i18next";
import AdminSidebar from "routes/AdminSidebar";
import SuperAdminSidebar from "routes/SuperAdminSidebar";

import { getSidebarData } from "utils/getSidebarData";

// import function 








const SidebarContent = () => {

  //Data admin object 

  const [sideBarData,setSideBarData]=useState([])
  const [adminMenuData, setAdminMenuData] = useState(null);

  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const { decrypt } = useEncryption();

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("zenithQuark");

    history.push("/login");
  };


// Decrypt the adminInfo cookie
const adminInfoCookie = Cookies.get('zenithQuark');
const adminData = adminInfoCookie ? decrypt(adminInfoCookie) : {};

// console.log("adminData in sidebarcontent",adminData);

useEffect(()=>{
  const getAdminMenuData = () => {
    const adminMenuString = localStorage.getItem('AdminMenuuuuuuuuuuu');
    if (adminMenuString) {
      const adminMenuData = JSON.parse(adminMenuString);
      setAdminMenuData(adminMenuData);
    }
  };

  // Call the function to get AdminMenu data when the component mounts
  getAdminMenuData();

  const adminmenu  = getSidebarData(adminMenuData,adminData.AdminID)
setSideBarData(adminmenu);
console.log("adminmenu in adminmenu",adminmenu);

},[])

console.log("sideBarData:",sideBarData);

  
 

  // Get the Account_Type from adminData
  const accountType = adminData.Account_Type || "";

   // Choose the appropriate sidebar based on Account_Type
  // const currentSidebar = accountType === "Master" ? sidebar : Clientsidebar;

  let currentSidebar;

  // if (accountType === "User") {
  //   currentSidebar = sidebar;
  // } else if (accountType === "Admin") {
  //   currentSidebar = AdminSidebar;
  // } else if (accountType === "SuperAdmin") {
  //   currentSidebar = SuperAdminSidebar;
  // } else {
  //   console.error("Unexpected account type:", accountType);
  //   // Add default handling or throw an error based on your application's logic.
  // }
  
  // if (adminData.Issuperadmin === true) {
  //   currentSidebar = SuperAdminSidebar;
  // } else if (adminData.Issuperadmin === false) {
  //   currentSidebar = sideBarData;
  // } else if (accountType === "User") {
  //   currentSidebar = sidebar;
  // }
 
  currentSidebar = sidebar;

  return (
    <>
      {currentSidebar.length > 0 && (
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <a className=" text-gray-900 dark:text-gray-200" href="/masterdashboard">
            {mode === "dark" ? (
              <img src={logoLight} alt="dashtar" width="135" className="pl-6" />
            ) : (
              <img src={logoDark} alt="dashtar" width="135" className="pl-6" />
            )}
          </a>
          <ul className="mt-8">
            {currentSidebar.map((route) =>
              route.routes ? (
                <SidebarSubMenu route={route} key={route.name} />
              ) : (
                <li className="relative" key={route.name}>
                  {route?.outside ? (
                    <a
                      href={process.env.REACT_APP_STORE_DOMAIN}
                      target="_blank"
                      className="px-6 py-4 inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200"
                      rel="noreferrer"
                    >
                      <Route path={route.path} exact={route.exact}>
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"
                        ></span>
                      </Route>
                      <route.icon className="w-5 h-5" aria-hidden="true" />
                      <span className="ml-4">{t(`${route.name}`)}</span>
                      {/* <span className="ml-4">{route.name}</span> */}
                    </a>
                  ) : (
                    <NavLink
                      exact
                      to={route.path}
                      target={`${route?.outside ? "_blank" : "_self"}`}
                      className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-green-700 dark:hover:text-gray-200"
                      activeClassName="text-green-500 dark:text-gray-100"
                    >
                      <Route path={route.path} exact={route.exact}>
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"
                        ></span>
                      </Route>
                      <route.icon className="w-5 h-5" aria-hidden="true" />
                      <span className="ml-4">{t(`${route.name}`)}</span>
                    </NavLink>
                  )}
                </li>
              )
            )}
          </ul>
       
        </div>
      )}
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
            <button
              onClick={handleLogOut}
              className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg flex justify-center items-center"
            >
              <IoLogOutOutline className="mr-3 text-lg" />
              <span className="text-sm">{t("LogOut")}</span>
            </button>
          </span>
    </>
  );
  
};

export default SidebarContent;
