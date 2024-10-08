

import React, { useState, useEffect } from 'react';
import { Button } from '@windmill/react-ui'; // Assuming you're using Windmill UI components
import { Link } from 'react-router-dom';
import { BaseUrl } from 'utils/Constants';

const ConnectTradingAccount = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    // Fetch broker data from API
    const fetchBrokersData = async () => {
      try {
        const response = await fetch(`${BaseUrl}broker/available-brokers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBrokers(data);
      } catch (error) {
        console.error('Error fetching broker data:', error);
      }
    };

    fetchBrokersData();
  }, []);

  return (
    <div className='bg-white dark:bg-gray-900 p-4 py-6 my-4 text-gray-700 dark:text-white rounded-lg shadow-md'>
      <h2 className="text-2xl font-bold mb-4 text-green-600">Connect Your Trading Account</h2>
      <div className="flex flex-wrap">
        {brokers.map((broker) => (
          <Link to="/tradingaccount">
          <img
            key={broker.avail_broker_id}
            src={broker.logo_url}
            alt={broker.name}
            className="w-20 h-20 m-2"
          /></Link>
        ))}
      </div>
      <Link to="tradingaccount">
        <Button className="mt-4" onClick={() => console.log('Map trading account clicked')}>
          Map Trading Account
        </Button>
      </Link>
    </div>
  );
};

export default ConnectTradingAccount;
