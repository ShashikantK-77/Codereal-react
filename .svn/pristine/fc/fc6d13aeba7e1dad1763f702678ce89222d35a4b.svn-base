import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Tooltip from "../tooltip/Tooltip";

const BrokerEditDeleteButton = ({ id, onOpenModal }) => {
  return (
    <div className="flex justify-end text-right">
      <button
        onClick={() => onOpenModal(id)} // Call the function when the button is clicked
        className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
      >
        <Tooltip
          id="edit"
          Icon={FiEdit}
          title="Edit"
          bgColor="#10B981"
        />
      </button>

      <button
        onClick={() => onOpenModal(id)} // Call the function when the button is clicked
        className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
      >
        <Tooltip
          id="delete"
          Icon={FiTrash2}
          title="Delete"
          bgColor="#EF4444"
        />
      </button>
    </div>
  );
};

export default BrokerEditDeleteButton;
