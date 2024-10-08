import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Main from "./Main";
import routes from "../routes";
import ClientRoutes from "routes/ClientRoutes";
import MasterRoutes from "routes/MasterRoutes";
import AdminRoutes from "routes/AdminRoutes";
import SuperAdminRoutes from "routes/SuperAdminRoutes";
import Header from "components/header/Header";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "context/SidebarContext";
import ThemeSuspense from "components/theme/ThemeSuspense";
import useEncryption from "hooks/useEncryption";

const Page404 = lazy(() => import("../pages/404"));

// import routes from '../routes/index';

const Layout = () => {
  const { isSidebarOpen, closeSidebar, navBar } = useContext(SidebarContext);
  let location = useLocation();
  const { decrypt } = useEncryption();

  // console.log('routes',routes)

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Read adminInfo cookie and parse JSON
  // const adminInfo = Cookies.get("adminInfo");
  // const adminData = adminInfo ? JSON.parse(adminInfo) : {};

  const adminInfoCookie = Cookies.get('zenithQuark');
  const adminData = adminInfoCookie ? decrypt(adminInfoCookie) : {};

  // console.log("adminData in layout:",adminData);



  // Get the Account_Type from adminData
  // const accountType = adminData.Account_Type || "";

   // Choose the appropriate routes based on Account_Type
  // const currentRoutes = accountType === "Master" ? MasterRoutes : ClientRoutes;

  const currentRoutes =
   adminData.Issuperadmin ? SuperAdminRoutes :
  adminData.Account_Type === "Admin" ? AdminRoutes :
  MasterRoutes;

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      {navBar && <Sidebar />}

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemeSuspense />}>
            <Switch>
              {currentRoutes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null;
              })}
              <Redirect exact from="/" to="/dashboard" />
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
};

export default Layout;
