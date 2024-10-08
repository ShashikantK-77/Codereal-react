


import React from "react";
import StrategyDetailscomp from "../Strategy/StrategyDetailscomp";
import { Link } from 'react-router-dom'; 
import AnimatedButton from "../Strategy/AnimatetButton";
import { useLocation } from "react-router-dom"; 

const StrategyDetails = () => {
  const location = useLocation();
  const { strategyData } = location.state || {}; // Safely access strategyData
  return (
    <div className="max-w-full  p-6 flex gap-6">
      <div className="flex-1">
        <StrategyDetailscomp strategyData={strategyData} />
      </div>
     <AnimatedButton/>
    </div>
  );
};

export default StrategyDetails;
