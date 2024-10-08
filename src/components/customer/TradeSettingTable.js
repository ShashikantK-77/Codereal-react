import { TableBody, TableCell, TableRow, Input } from "@windmill/react-ui";
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

const TradeSettingTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="text-left">
              <span className="font-semibold uppercase text-xs">
                {" "}
                {user?._id?.substring(20, 24)}
              </span>
            </TableCell>

            <TableCell className="text-left">
              <span className="text-sm">{user.name}</span>
            </TableCell>
            <TableCell className="text-left">
              <span className="text-sm">{user.phone}</span>{" "}
            </TableCell>
            <TableCell className="text-center w-1/12">
              <Input
                className="border h-12 text-sm focus:outline-none block w-1/12 bg-white-100 border-transparent focus:bg-white"
                type="number"
                name="search"
                onChange={(e) => {
                  const inputValue = parseFloat(e.target.value);
                  const formattedValue = inputValue.toFixed(1);
                  e.target.value = formattedValue;
                }}
                placeholder={t("NiftyMultiplier")}
              />
            </TableCell>
            <TableCell className="text-center w-1/12">
              <Input
                className="border h-12 text-sm focus:outline-none block w-1/12 bg-white-100 border-transparent focus:bg-white"
                type="number"
                name="search"
                placeholder={t("BankniftyMultiplier")}
              />
            </TableCell>
            <TableCell className="text-center w-1/12">
              <Input
                className="border h-12 text-sm focus:outline-none block w-1/12 bg-white-100 border-transparent focus:bg-white"
                type="number"
                name="search"
                placeholder={t("FinnfyMultiplier")}
              />
            </TableCell>
            {/* <TableCell className="text-center">
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <Link to={`/customer-order/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={user.name}
                  id={user._id}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TradeSettingTable;
