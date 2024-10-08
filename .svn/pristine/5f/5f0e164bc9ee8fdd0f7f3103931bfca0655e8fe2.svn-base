import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";


const useToggleDrawer = (customer) => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [Client, setClient] = useState([]);
  const [title, setTitle] = useState("");
  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  const handleUpdate = (id) => {
    // console.log("in handleUpdate useToggleDrawer",id);
    // setServiceId(id);
    setClient(id);

    toggleDrawer();
    // console.log("serviceId in serviceId handleUpdate Client",Client);
    // console.log("serviceId in serviceId handleUpdate",id);
  };

  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (id, title,customer) => {
    setServiceId(id);
    toggleModal();
    setTitle(title);
    setClient(Client);
  
    console.log("serviceId in serviceId handleModalOpen",Client);
    // console.log("in toggledrwer",customer);
  };
  
 

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId();
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id, products) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  // console.log("serviceId in serviceId  last line",Client);

  return {
    title,
    allId,
    serviceId,
    Client,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,

  };
};

export default useToggleDrawer;
