import React, { useState } from 'react';
import { notifySuccess } from 'utils/toast';
import { useHistory } from 'react-router-dom';

const Backtest = ({selectedSymbol}) => {
  const [symbol, setSymbol] = useState(selectedSymbol);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [limitDays, setLimitDays] = useState(30); // Default limit days to 30
  const history = useHistory(); // Use history hook

  


  const handleBacktest = (strategyData,limitDays) => {

    
  const requestBody = {
    ...strategyData, // Include the existing strategyData
    limitDays: limitDays // Add the limitDays property
  };
  requestBody.isBacktesting = true
  // history.push('/backtestdetails', { strategyData: requestBody }); // Navigate to backtestdetails with data
  console.log('Sending Backtest data:', requestBody);
  // Make your API call here using fetch or any other library
  // You can pass the strategy data to the API as needed
  // For example:
  fetch('http://localhost:3001/api/backtest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers as needed
    },
    body: JSON.stringify(requestBody), // Pass the strategy data as the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful response
      // For example, you can show a success message to the user
      notifySuccess("Backtest initiated successfully!")
      // alert('Backtest initiated successfully!');
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
      // For example, you can show an error message to the user
      alert('An error occurred while initiating Backtest.');
    });
};

  console.log("selectedSymbol is:",selectedSymbol);

  return (
    <div className="mx-auto max-w-md p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Backtest Component</h1>
      <div className="mb-4">
      {/* <h2 className='text-lg font-bold'>{selectedSymbol}</h2> */}
        {/* <label className="block mb-2">
    
          Symbol:
          <input
            type="text"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </label> */}
      </div>
      {/* <div className="mb-4">
        <label className="block mb-2">
          Start Date:
          <input
            type="date"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div> */}
      {/* <div className="mb-4">
        <label className="block mb-2">
          End Date:
          <input
            type="date"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div> */}

      <div className="mb-4">
        <label className="block mb-2">
          Limit Days:
          <input
            type="number"
            min="1"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={limitDays}
            onChange={(e) => setLimitDays(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        // onClick={handleBacktest(selectedSymbol,limitDays)}
        onClick={() => handleBacktest(selectedSymbol, limitDays)}
      >
        Perform Backtest
      </button>
      {isLoading && <p>Loading...</p>} {/* Display loading screen if isLoading is true */}
      {response && !isLoading && (
        {/* <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Backtest Results:</h2>
          <p>Summary: {response.summary}</p>
          <p>Total Trades: {response.totalTrades}</p>
          <p>Total Profit: {response.totalProfit}</p>
          <p>Average Profit Per Trade: {response.averageProfitPerTrade}</p>
        </div> */}
      )}
    </div>
  );
}

export default Backtest;
