import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [Client, setClient] = useState(null); // Initialize as null, since it will hold a single customer object
  const [title, setTitle] = useState("");
  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  const handleUpdate = (id, customer) => {
    setClient(customer); // Set the Client state to the customer object
    setServiceId(id);
    toggleDrawer();
  };

  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (id, title, customer) => {
    setServiceId(id);
    toggleModal();
    setTitle(title);
    setClient(customer); // Set the Client state to the customer object
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId("");
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id, products) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  // console.log("in last line Client------->", Client);

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
