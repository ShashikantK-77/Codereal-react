import React, { useState, useEffect, useContext } from "react";
import { Avatar, Badge, Button } from "@windmill/react-ui";
import { Link } from 'react-router-dom';
import { notifyError, notifySuccess } from "utils/toast";
import { AdminContext } from "context/AdminContext";
import { useHistory } from 'react-router-dom';
import logError from "hooks/useErrorLogger";
import { BaseUrl } from "utils/Constants";

const SuggestStrategy = () => {
  const [strategies, setStrategies] = useState([]);
  const [completeStrategies, setCompleteStrategies] = useState([]);
  const [consolidatedData, setConsolidatedData] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // Default to show all strategies
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  console.log("consolidatedData in SuggestStrategy:", consolidatedData);

  // const low = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'low';
  // });
  // const Mid = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'Mid';
  // });
  // const High = consolidatedData.filter(order => {
  //   return order.strategyDesc[0].Risk === 'High';
  // });

  const history = useHistory();
  const { state } = useContext(AdminContext);

  const { zenithQuark } = state;
  // console.log("zenithQuark userID-------------------:", zenithQuark.UserID);

  // useEffect(() => {
  //   const fetchUserSubscriptions = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/api/userSubscriptions/${zenithQuark.UserID}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user subscriptions");
  //       }
  //       const subscriptions = await response.json();
  //       setUserSubscriptions(subscriptions);
  //     } catch (error) {
  //       console.error("Error fetching user subscriptions:", error);
  //       logError(error.message, "SuggestStrategy.js")
  //     }
  //   };

  //   fetchUserSubscriptions();
  // }, [zenithQuark.UserID]);
 
  useEffect(() => {
    const fetchAvailableBalance = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/fundlimit`, {
          method: 'GET',
          headers: {
            'access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkaGFuIiwicGFydG5lcklkIjoiIiwiZXhwIjoxNzI1NjEzMzUyLCJ0b2tlbkNvbnN1bWVyVHlwZSI6IlNFTEYiLCJ3ZWJob29rVXJsIjoiIiwiZGhhbkNsaWVudElkIjoiMTEwMTM0Mzg3MSJ9.Hm-KSGOhEhfveRUQ25U_hA9nQjrPDpV7UX6WJGaznYV7lRXaf-txSVPqxAqqLvMUJGliA6FfNAM0Fgdi7Dws3Q',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${zenithQuark}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch available balance');
        }

        const responseData = await response.json();
        setAvailableBalance(responseData.availabelBalance) // Assuming a debug value
      } catch (error) {
        console.error('Error fetching available balance:', error.message);
        logError(error.message, "SuggestStrategy.js")
      }
    };

    fetchAvailableBalance();
  }, []);

  useEffect(() => {
    const fetchCompleteStrategies = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/getCompleteStrategies`, {
          headers: {
            "Authorization": `Bearer ${zenithQuark}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCompleteStrategies(data);
        setConsolidatedData(data.details);
        setAvailableBalance(1500) 
      } catch (error) {
        console.error("Error fetching complete strategies:", error);
        logError(error.message, "SuggestStrategy.js");
      }
    };

    fetchCompleteStrategies();
  }, [zenithQuark]);

  // const handleSubscribe = async (id, availableBalance) => {
  //   console.log(" handleSubscribe startegy:",id);
  //   try {
  //     const response = await fetch(`http://localhost:5000/temp/Subscribe`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${zenithQuark}`,
  //       },
  //       body: JSON.stringify({
         
  //         strategyId: id,
  //         availableBalance: availableBalance
  //       })
  //     });

  //     if (response.ok) {
  //       const updatedStrategies = strategies.map((strategy) =>
  //         strategy.UniqueID === id ? { ...strategy, subscribed: true } : strategy
  //       );
  //       setStrategies(updatedStrategies);
  //       notifySuccess("Subscription successful!");
  //     } else {
  //       const errorData = await response.json();
  //       if (errorData.error === "Broker not connected. Please connect to the broker first.") {
  //         notifyError(errorData.error)
  //         history.push('/tradingaccount');
  //       } else {
  //         notifyError(errorData.error || "Failed to subscribe.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error subscribing to strategy:", error);
  //     logError(error.message, "SuggestStrategy.js")
  //     notifyError(error.message || "An unexpected error occurred.");
  //   }
  // };
  
  const handleSubscribe = async (id, availableBalance) => {
    console.log(" handleSubscribe startegy:", id);
    try {
      const response = await fetch(`${BaseUrl}temp/Subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({
          strategyId: id,
          availableBalance: availableBalance
        })
      });
  
      if (response.ok) {
        const updatedStrategies = strategies.map((strategy) =>
          strategy.UniqueID === id ? { ...strategy, subscribed: true } : strategy
        );
        setStrategies(updatedStrategies);
        notifySuccess("Subscription successful!");
      } else {
        const errorData = await response.json();
        notifyError(errorData.error || "Failed to subscribe.");
        if (errorData.error === "Broker not connected. Please connect to the broker first.") {
          history.push('/tradingaccount');
        }
      }
    } catch (error) {
      console.error("Error subscribing to strategy:", error);
      logError(error.message, "SuggestStrategy.js");
      notifyError(error.message || "An unexpected error occurred.");
    }
  };
  
  return (
    <>
      <div className="flex justify-center space-x-4 my-6">
        <Button
          onClick={() => setActiveTab('all')}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeTab === 'all' ? 'bg-blue-700' : ''}`}
        >
          All
        </Button>
        <Button
          onClick={() => setActiveTab('low')}
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${activeTab === 'low' ? 'bg-green-700' : ''}`}
        >
          Low
        </Button>
        <Button
          onClick={() => setActiveTab('mid')}
          className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ${activeTab === 'mid' ? 'bg-yellow-700' : ''}`}
        >
          Mid
        </Button>
        <Button
          onClick={() => setActiveTab('high')}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${activeTab === 'high' ? 'bg-red-700' : ''}`}
        >
          High
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-6">
        {/* {(activeTab === 'low' ? low : activeTab === 'mid' ? Mid : activeTab === 'high' ? High : consolidatedData).map((strategy) => ( */}
        {consolidatedData.map((strategy) => (

          <div
            key={strategy.StrategyID}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative"
          >
          {/* Status Badge in the top-right corner */}
      <div className="absolute top-0 right-0 m-2">
    
          <p className="bg-red-500 text-white p-1 m-1 rounded"> Risk : <span>High</span></p>
          
          {/* <Badge className="bg-yellow-500 text-white">Not Subscribed</Badge> */}
      
      </div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-gray-200">
              {/* {strategy.strategyDesc.map((desc, index) => ( */}
                <span  className="uppercase">{strategy.strategyDesc.strategy_name}, </span>
              {/* ))
              } */}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
        
              {/* {strategy.strategyDesc.map((desc, index) => ( */}
                <span >{strategy.strategyDesc.description}, </span>
              {/* ))} */}
            </p>
            <p className="text-gray-600 dark:text-gray-300  text-sm">
              Symbol:
              {strategy.symbolSelection.map((symbol, index) => (
                <span className="text-lg font-semibold"> {symbol.symbol} </span>
              ))}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
              Average Return: <span className="text-green-500 font-semibold text-lg"> 12.00%</span> per year
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
              Risk Level: <span>High</span>
            </p>
            {userSubscriptions.some(sub => sub.StrategyID === strategy.StrategyID) ? (
              <Badge className="text-sm">Subscribed</Badge>
            ) : (
              <div className="flex items-center justify-between space-x-4">
                {/* <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-grow"
                  onClick={() => handleSubscribe(strategy.strategyDesc.strategy_id, availableBalance)}
                >
                  Subscribe
                </Button> */}
                <div className="flex-grow">
                  <Link  to={{
                      pathname: "/StrategyDetails",
                      state: { strategyData: strategy }
                    }}>
                    <Button className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded w-full">
                      Know More
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SuggestStrategy;
