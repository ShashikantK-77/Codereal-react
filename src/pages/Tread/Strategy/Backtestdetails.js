import HeadKyc from 'components/KYC/HeadKyc';
import PageTitle from 'components/Typography/PageTitle';
import React from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import PieChart from 'components/chart/Pie/PieChart';
import LineChart from 'components/chart/LineChart/LineChart';
import { Link } from 'react-router-dom';
const Backtestdetails = () => {
    const salesReport = [
        { date: '2024-01-01', total: 1000, order: 20 },
        { date: '2024-01-02', total: 1500, order: 30 },
        { date: '2024-01-03', total: 1200, order: 25 },
        { date: '2024-01-04', total: 1800, order: 35 },
        { date: '2024-01-05', total: 2000, order: 40 },
        { date: '2024-01-06', total: 2200, order: 45 },
        { date: '2024-01-07', total: 2500, order: 50 },
        // Add more data as needed
    ];

    // Define strategy information
    const strategyName = "Strategy 1";
    const symbolName = "AAPL";
    const startTime = "Monday, February 14, 2024";
    const endTime = "Monday, February 21, 2024"; // Assuming this is the end time of your backtest


  return (
    <div>
      <PageTitle> Backtest Summary: </PageTitle>
      <div className="flex flex-wrap my-2">
        {/* Render the first four cards in a row */}   <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {/* Render strategy information */}
          <Card className="p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3">
  <div className="grid grid-cols-3 gap-4">
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-1">Strategy Name:</h2>
      <p className="text-lg font-bold text-blue-500">{strategyName}</p>
    </div>
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-1">Symbol Name:</h2>
      <p className="text-lg font-bold text-blue-500">{symbolName}</p>
    </div>
    <div className="text-center">
      <h2 className="text-lg font-semibold mb-1">Time Period:</h2>
      <p className="text-lg font-bold text-blue-500">{startTime} - {endTime}</p>
    </div>
  </div>
</Card>


</div>

    
        <div className="flex flex-wrap">
  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">Trade</h2>
      <p className="text-4xl font-bold text-blue-500">22</p>
    </div>
  </Card>

  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">Profitable Trades</h2>
      <p className="text-4xl font-bold text-blue-500">15</p>
    </div>
  </Card>

  
  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">Losing Trades</h2>
      <p className="text-4xl font-bold text-blue-500">22</p>
    </div>
  </Card>

  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">Avg. Profit Per Trades</h2>
      <p className="text-4xl font-bold text-blue-500">22</p>
    </div>
  </Card>

  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">PNL</h2>
      <p className="text-4xl font-bold text-green-500">+205.30</p>
    </div>
  </Card>

  <Card className="flex-auto p-2 border border-gray-200 rounded-lg shadow-md mx-2 my-3 w-64 h-32">
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-lg font-semibold mb-1">INVESTMENT</h2>
      <p className="text-4xl font-bold text-green-500">1000</p>
    </div>
  </Card>


</div>



        {/* Render the fifth card with full width */}
        <Card className="p-4 border border-gray-200 rounded-lg shadow-md w-full mb-4">
          <CardBody>
            <div className="flex">
              <div className="w-1/2">
                <LineChart salesReport={salesReport} />
              </div>
              <div className="w-1/2 relative">
            <h2 className='font-normal'>Strategy Period</h2>
            <p className='font-semibold'>First Entry Timing: Monday, February 14, 2024</p>
            <p className='font-semibold'>Exit Timing: Monday, February 14, 2024</p>
            <Link to="/papertrading">
            <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Backtest Details
            </button>
            </Link>
          </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div></div>

  );
};

export default Backtestdetails;
