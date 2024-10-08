


import { SidebarContext } from "context/SidebarContext";
import Drawer from "rc-drawer";
import React, { useContext, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const MainBrokerDrawer = ({ children, product,}) => {
  const { isBrokerDrawerOpen,toggleBrokerDrawer, windowDimension } = useContext(SidebarContext);
    // const { windowDimension, } = useContext(SidebarContext);
  // const { toggleEditDrawerLocal,isEditDrawerOpen,  windowDimension } = useContext(SidebarContext);

  const [isProduct, setIsProduct] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/products") {
  //     setIsProduct(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  // console.log("isEditDrawerOpen:",isEditDrawerOpen); // Add this line to check the value

  return (
    <Drawer
      open={isBrokerDrawerOpen}
      // open={toggleDrawer}
      onClose={toggleBrokerDrawer}
      parent={null}
      level={null}
      placement={"right"}
      width={`${windowDimension <= 575 ? "100%" : product || isProduct ? "85%" : "50%"}`}
    >
      <button
        onClick={toggleBrokerDrawer}
        className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
      >
        <FiX className="mx-auto" />
      </button>

      <div className="flex flex-col w-full h-full justify-between">{children}</div>
    </Drawer>
  );
};

export default React.memo(MainBrokerDrawer);

