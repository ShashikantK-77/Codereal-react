import React from "react";
import { Avatar, Badge } from "@windmill/react-ui";

const MasterTradersList = ({ masterTraders }) => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 my-2">
      {masterTraders.map((masterTrader) => (
        <div
          key={masterTrader.id} // Replace with the unique identifier of each master trader
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <Avatar
            className="mx-auto mb-2"
            src={masterTrader.profilePicture}
            alt={`${masterTrader.name}'s Profile`}
            size="large"
          />
          <h3 className="text-lg font-semibold text-gray-800">
            {masterTrader.name}
          </h3>
          <p className="text-gray-600 mb-2 text-sm">{masterTrader.strategy}</p>
          <Badge className="text-sm">{masterTrader.performance}</Badge>
        </div>
      ))}
    </div>
  );
};

export default MasterTradersList;


