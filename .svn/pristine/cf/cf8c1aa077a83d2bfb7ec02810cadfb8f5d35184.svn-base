import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import logError from "hooks/useErrorLogger";

const StrategyDetailscomp = ({ strategyData }) => {
  console.log("strategyData", strategyData);

  const [showChart, setShowChart] = useState(false);
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Performance",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const indicator_mapping = {
    1: "Simple Moving Average",
    2: "Relative Strength Index",
    3: "Parabolic SAR",
    4: "Moving Average Convergence Divergence",
    5: "Exponential Moving Average",
  };

  const suggestedStrategies = {
    id: 1,
    title: "Short Straddle",
    status: "2 Leg | Nifty Bank | Intraday | Required Margin 180K",
    description:
      "Bank Nifty will experience very little volatility. Sell Call and sell Put option of the same strike price. Risk is unlimited and Reward is...",
    time: "Start Time: 09 : 30 | End Time: 15 : 00",
    subscribed: false,
  };

  if (!strategyData) {
    return <p>No strategy data available.</p>;
  }
  const { strategyDesc, symbolSelection, actionSelection, indicators } =
    strategyData;
  return (
    <div className="max-w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-red-600">
        {strategyDesc.strategy_name}
      </h1>
      <div className="max-w-full flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-white shadow-md rounded-md p-6 flex-grow max-w-full">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          {/* <div className="mb-2">
            <span className="font-semibold">Strategy Name:</span> {strategyDesc.strategy_name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Description:</span> {strategyDesc.description}
          </div> */}
          <div className="mb-2">
            <span className="font-semibold">Required Fund:</span>{" "}
            {strategyDesc.required_fund}
          </div>
          {/* <div className="mb-2">
            <span className="font-semibold">Execution Status:</span> {strategyDesc.execution_status}
          </div> */}
          {symbolSelection.map((symbol) => (
            <div className="mb-2" key={symbol.str_sym_id}>
              <span className="font-semibold">Symbol:</span> {symbol.symbol} (
              {symbol.exchange}, {symbol.category})
            </div>
          ))}

          {/* Add other basic information as needed */}
        </div>
        <div className="bg-white shadow-md rounded-md p-6 flex-grow max-w-full">
          <h2 className="text-xl font-semibold mb-4">Action Selection</h2>
          {actionSelection.map((action) => (
            <div className="mb-4" key={action.str_act_id}>
              <span className="font-semibold">Action:</span> {action.action} (
              {action.order_type})
              <br />
              <span className="font-semibold">Quantity:</span> {action.quantity}
              <br />
              <span className="font-semibold">Target Percent:</span>{" "}
              {action.target_percent}%
              <br />
              <span className="font-semibold">Stoploss Percent:</span>{" "}
              {action.stoploss_percent}%
              {/* <h2 className="text-xl font-semibold mb-4">Indicators</h2> */}
              {/* Add other action selection details as needed */}
              <div className="mb-4">
                <span className="font-semibold">Indicator:</span>{" "}
                {indicator_mapping[indicators[0].indicator_id]}
                <br />
              </div>
            </div>
          ))}
        </div>
      </div>

  

      <div className="bg-white shadow-md rounded-md p-6 mb-8 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="mb-6">{strategyDesc.description}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowChart(!showChart)}>
          Backtest
        </button>
        {/* Placeholder for chart */}
        {showChart && (
          <div className="flex justify-center mt-4">
            <div style={{ width: "60%" }}>
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyDetailscomp;
