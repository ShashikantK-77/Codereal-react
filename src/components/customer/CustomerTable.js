import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import CustomerDrawer from "components/drawer/CustomerDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import Tooltip from "components/tooltip/Tooltip";
import * as dayjs from "dayjs";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import React from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
// internal imports

const CustomerTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  console.log("in CustomerTable::::::::::::::::::::::::::::::",customers);

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      {/* <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
   
  {customers?.map((user) => (
    <TableRow key={user.account_number}>
      <TableCell>
        <span className="font-semibold uppercase text-xs">
          {/* {user.account_number} */}
          <h2>shashi</h2>
        </span>
      </TableCell> 
      
      <TableCell>
        <span className="text-sm">{user.buying_power}</span>
      </TableCell>
     <TableCell>
        <span className="text-sm">{user.status}</span>
      </TableCell>
     <TableCell>
        <span className="text-sm font-medium">{user.buying_power}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm font-medium">{user.portfolio_value}</span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {dayjs(user.created_at).format("MMM D, YYYY")}
        </span>
      </TableCell>

    </TableRow> 
 ))} 

</TableBody> 




    </>
  );
};

export default CustomerTable;
