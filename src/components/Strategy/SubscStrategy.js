// import React, { useState, useEffect, useContext } from "react";
// import {
//   Card,
//   CardBody,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@windmill/react-ui";
// import Status from "components/table/Status";
// import { FiX } from "react-icons/fi";
// import Backtest from "./Backtest";
// import useStepperRecord from "hooks/useStepperRecord";
// import Delete from "./Delete";
// import { notifyError, notifySuccess } from "utils/toast";
// import { useHistory } from "react-router-dom";
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { AdminContext } from "context/AdminContext";
// import logError from "hooks/useErrorLogger";
// const SubscStrategy = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
//   const [selectedStrategy, setSelectedStrategy] = useState(null);
//   const [strategies, setStrategies] = useState([]);
//   const [assets, setAssets] = useState([]);
//   const history = useHistory();
//   const [completeStrategies, setCompleteStrategies] = useState([]);
//   const [consolidatedData, setConsolidatedData] = useState([]);

 

//   useEffect(() => {
//     const fetchCompleteStrategies = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/temp/SubscribeStrategies"
//         ); // Fetch data from API endpoint
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const strategies = await response.json();

//         // Set the complete strategies in state
//         setCompleteStrategies(strategies);
//         console.log("completeStrategies::", completeStrategies);
//       } catch (error) {
//         console.error("Error fetching complete strategies:", error);
//         logError(error.message,"SubscStrategy.js")
//       }
//     };

//     fetchCompleteStrategies();
//   }, []);

//   useEffect(() => {
//     const fetchCompleteStrategiesData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/api/completeStrategiesData",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(completeStrategies), // Assuming completeStrategies is defined somewhere
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch complete strategies data");
//         }
//         const data = await response.json();

//         // Set the consolidated data in state
//         setConsolidatedData(data);
//         console.log("Consolidated data:", data);
//       } catch (error) {
//         logError(error.message,"SubscStrategy.js")
//         console.error("Error fetching complete strategies data:", error);
//       }
//     };

//     fetchCompleteStrategiesData();
//   }, [completeStrategies]);

//   console.log("consolidatedData:", consolidatedData);

//   useEffect(() => {

//     setStrategies(consolidatedData);
//     console.log("my consolidatedData:", consolidatedData);
//     console.log("my strategies:", strategies);
    
//   }, []);

//   const openModal = (strategy) => {
//     setSelectedStrategy(strategy);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedStrategy(null);
//     setIsModalOpen(false);
//   };

//   const handleEdit = () => {

//     closeModal();
//   };


//   const handleDelete = () => {
//     try {
//       // Get the UniqueID of the selected strategy
//       const StrategyID = selectedStrategy.StrategyID;

//       // Fetch existing strategy data from local storage
//       const storedStrategyData = localStorage.getItem("strategycreation");
//       if (storedStrategyData) {
//         // Parse the existing strategy data
//         let strategies = JSON.parse(storedStrategyData);

//         // Filter out the strategy with the matching UniqueID
//         strategies = strategies.filter(
//           (strategy) => strategy.StrategyID !== StrategyID
//         );

//         // Update the strategy data in local storage
//         localStorage.setItem("strategycreation", JSON.stringify(strategies));

//         // Update the state to reflect the changes
//         setCompleteStrategies(strategies);

//         // Close the modal
//         closeModal();

//         // Show success message to the user
//         alert("Strategy deleted successfully!");
//       } else {
//         console.error("No strategy data found in local storage");
//         alert("Error: No strategy data found");
//       }
//     } catch (error) {
//       console.error("Error deleting strategy:", error);
//       alert("An error occurred while deleting the strategy");
//     }
//   };

//   const openBacktestModal = (data) => {
//     // const selectedSymbol = data.fetchedData.assetselection[0].Symbol
//     // console.log("selectedSymbol is: in openBacktestModal:", selectedSymbol);
//     setSelectedStrategy(data);
//     setIsBacktestModalOpen(true);
//     setIsModalOpen(false);
//   };

//   const closeBacktestModal = () => {
//     setIsBacktestModalOpen(false);
//   };


//   const Unscubscribe = async (strategyData) => {
//     console.log("strategyData Unscubscribe",strategyData.UniqueID);
    
  
//     try {
//       const response = await fetch(`http://localhost:3001/api/unSubscribe/${strategyData.StrategyID}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (response.ok) {
//         const updatedStrategies = strategies.map((strategy) =>
//           strategy.StrategyID === strategyData.StrategyID ? { ...strategy, subscribed: true } : strategy
//         );
//         setStrategies(updatedStrategies);
//         notifySuccess("UnSubscription successful!");
//       } else {
//         notifyError("Failed to Unsubscribe.");
//       }
//     } catch (error) {
//       console.error("Error subscribing to strategy:", error);
//       notifyError("Failed to Unsubscribe.");
//     }
//   }

//   const handlePaperTrade = (strategyData) => {
//     console.log("Sending strategy data:", strategyData);
//     // Make your API call here using fetch or any other library
//     // You can pass the strategy data to the API as needed
//     // For example:
//     fetch("http://localhost:3001/api/strategy", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any other headers as needed
//       },
//       body: JSON.stringify(strategyData), // Pass the strategy data as the request body
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         // Handle successful response
//         // For example, you can show a success message to the user
//         // alert('Paper trade initiated successfully!');

//         notifySuccess("Trade initiated successfully!");
//         // history.push('/tradedetails');
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error:", error);
//         // For example, you can show an error message to the user
//         // alert('An error occurred while initiating paper trade.');
//         // notifyError('An error occurred while initiating paper trade.');
//         notifySuccess("Trade initiated successfully!");
//       });
//   };

//   const handleDetails = (data) => {
//     // history.push("/Strategystatus");

//     history.push({
//       pathname: '/Strategystatus',
//       state: { consolidatedData : data }
//     });

//   };

 

//   // handleBacktest
//   console.log("before filter consolidatedData:", consolidatedData);

//   // Filter the orders where any strategyDesc object has isSubscribed set to true
//   const Subscribedorders = consolidatedData.filter(order =>
//     order.strategyDesc.some(desc => desc.isSubscribed === true)
//   );
  
//   console.log("after filter Subscribedorders:", Subscribedorders);
//   return (
//     <div className="p-2 flex flex-row">
//       {/* <Card className="w-min"> */}
//       <Card className="w-min ">
    
//         <CardBody >
//           {/* <h1 className="text-xl font-semibold mb-4">Previous Strategies</h1> */}
   
//           <div className="grid grid-cols-2 gap-4 ">
//             {consolidatedData.map((data, index) => (
//               <div
//                 key={index}
//                 className="border p-4 rounded-lg shadow-md  relative"
//               >
             
//                 <ul>
//                   {data.strategyDesc.map((item, i) => (
//                     <>
//                       <li className="text-lg font-bold uppercase" key={i}>
//                         {item.strategyName}
//                       </li>
//                       <li key={`${i}-desc`}>{item.strategyDescription}</li>
//                     </>
//                   ))}
//                 </ul>

//                 {/* Display symbol selection */}
//                 <h2 className="text-lg font-semibold ">Symbol Selection:</h2>
//                 <ul>
//                   {data.symbolSelection.map((item, i) => (
//                     <li key={i}>
//                       Exchange: {item.exchange}, Category: {item.category},
//                       Symbol: {item.symbol}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Display action selection */}
//                 <h2 className="text-lg font-semibold ">Action Selection:</h2>
//                 <ul>
//                   {data.actionSelection.map((item, i) => (
//                     <li key={i}>
//                       Action: {item.Action}, Order Type: {item.ActionType}
//                       {item.ActionType === "limit" && (
//                         <>
//                           , Stop Loss: {item.StopLoss}, Stop Profit:{" "}
//                           {item.StopProfit}
//                         </>
//                       )}
//                       {item.ActionType === "trailing_stop" && (
//                         <>, Trailing Stop Percent: {item.TrailingStopPercent}</>
//                       )}
//                     </li>
//                   ))}
//                 </ul>

//                 {/* Display indicators */}
//                 {/* <h2 className="text-lg text-red-900 font-semibold ">
//                   Indicators:
//                 </h2>
//                 <ul>
//                   {data.indicators.map((indicator, i) => (
//                     <li key={i}>
          
                   
        
//                       {indicator.conditions.map((condition, j) => (
//                         <div key={j}>
//                           <p>Indicator: {condition.Indicator}</p>
//                           <p>Open: {condition.open}</p>
//           <p>Close: {condition.close}</p>
//           <p>Period: {condition.period}</p>
//                         </div>
//                       ))}
//                     </li>
//                   ))}
//                 </ul> */}

//                 <div>
//                   {/* <div className="mt-2"> */}
//                   {/* <div className="absolute top-0 right-0 mt-2 mr-2">
//                     <Status status="Pending" />
//                     <button
//                       onClick={() => openModal(assets[index])}
//                       className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-2 py-1 rounded-full m-2"
//                     >
//                       Edit
//                     </button>
        
//                     <button
//                       onClick={() => openModal(data)}
//                       className="bg-gray-500 hover:bg-gray-500 text-white font-semibold px-2 py-1 rounded-full m-2"
//                     >
//                       Delete
//                     </button>
//                   </div> */}


//                   <div className="absolute top-0 right-0 mt-2 mr-2 flex p-2">
//   <Status status="Waiting" />
//   {/* Edit Icon */}
//   <FiEdit2
//     onClick={() => openModal(assets[index])}
//     className="text-gray-400 hover:text-gray-500 cursor-pointer ml-2"
//     size={20} // Adjust the size of the icon as needed
//   />
//   {/* Delete Icon */}
//   <FiTrash2
//     onClick={() => openModal(data)}
//     className="text-gray-400 hover:text-gray-500 cursor-pointer ml-2"
//     size={20} // Adjust the size of the icon as needed
//   />
// </div>

//                   {/* <div>
//                 <Button
//                     // onClick={openBacktestModal}
//                     onClick={() => openBacktestModal(data)} // Pass entire strategy data to openBacktestModal
//                     // onClick={() => handleBacktest(data)}
//                     className=" hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//                   >
//                     Backtest
//                   </Button>

                 

//                   <Button
//                     // onClick={() => openModal(assets[index])}
//                     className=" hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//                     onClick={() => handlePaperTrade(data)}
//                   >
//                     Paper Trade
//                   </Button>

//                   <Button
//                     // onClick={() => openModal(assets[index])}
//                     className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//                   >
//                     Live
//                   </Button>
//                 </div> */}
//                   <div className="flex justify-between">
//                   <div>
//                     <button
//                       onClick={() => Unscubscribe(data)} // Pass entire strategy data to openBacktestModal
//                       className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full m-2"
//                     >
//                       Unsubscribe
//                     </button>

//                     <button
//                       onClick={() => handlePaperTrade(data)}
//                       className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
//                     >
//                       Paper Trade
//                     </button>

//                     <button
//                       onClick={() => handlePaperTrade(data)}
//                       className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
//                     >
//                       Live
//                     </button>
                  
//                   </div>
//                   <button
//                       onClick={() => handleDetails(data)}
//                       className="bg-purple-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full m-2"
//                     >
//                       Details
//                     </button>
//                   </div>
                

//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardBody>
//       </Card>

//       {/* Edit/Delete Modal */}
//       {selectedStrategy && (
//         <Modal isOpen={isModalOpen} onClose={closeModal}>
//           <div className="flex justify-between items-center">
//             <ModalHeader>Edit or Delete Strategy</ModalHeader>
//             <button
//               onClick={closeModal}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <FiX size={24} />
//             </button>
//           </div>
//           <ModalBody>
//             <Delete />
//           </ModalBody>
//           <ModalFooter>
//             <Button
//               onClick={handleEdit}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full mr-2"
//             >
//               Edit
//             </Button>
//             <Button
//               onClick={handleDelete}
//               className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full"
//             >
//               Delete
//             </Button>
//           </ModalFooter>
//         </Modal>
//       )}

//       {/* Backtest Modal */}
//       {isBacktestModalOpen && (
//         <Modal isOpen={isBacktestModalOpen} onClose={closeBacktestModal}>
//           <div className="flex justify-between items-center">
//             <ModalHeader>Backtest Strategy</ModalHeader>
//             <button
//               onClick={closeBacktestModal}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               <FiX size={24} />
//             </button>
//           </div>
//           <ModalBody>
//             {/* <p>Strategy Name: {selectedStrategy.exchange} </p>
//             <p>Description: {selectedStrategy.selectedOption}</p> */}
//             <Backtest selectedSymbol={selectedStrategy} />
//             {/* selectedStrategy */}
//             {/* <Sample/> */}
//           </ModalBody>
//           <ModalFooter>
//             {/* <Button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full mr-2">
//               Edit
//             </Button>
//             <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full">
//               Delete
//             </Button> */}
//           </ModalFooter>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default SubscStrategy;


import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";
import Status from "components/table/Status";
import { FiX } from "react-icons/fi";
import Backtest from "./Backtest";
import Delete from "./Delete";
import { notifyError, notifySuccess } from "utils/toast";
import { useHistory } from "react-router-dom";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import logError from "hooks/useErrorLogger";
import { AdminContext } from "context/AdminContext";
import { BaseUrl } from "utils/Constants";

const SubscStrategy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [consolidatedData, setConsolidatedData] = useState([]);
  const history = useHistory();
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;

  useEffect(() => {
    const fetchCompleteStrategies = async () => {
      try {
        const response = await fetch(
          `${BaseUrl}temp/SubscribeStrategies`,
          {
            method: 'GET', // or 'POST', 'PUT', etc., depending on your needs
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${zenithQuark}`, // Example for Bearer token
              // Add any other headers you need here
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
  
        if (data.is_success) {
          setConsolidatedData(data.details);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching complete strategies:", error);
        logError(error.message, "SubscStrategy.js");
      }
    };
  
    fetchCompleteStrategies();
  }, []);
  
  
  console.log("in subc startegy consolidatedData:", consolidatedData);

  const openModal = (strategy) => {
    setSelectedStrategy(strategy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStrategy(null);
    setIsModalOpen(false);
  };

  const handleEdit = () => {
    closeModal();
  };

  const handleDelete = () => {
    // Implement delete logic if necessary
    closeModal();
  };

  const openBacktestModal = (data) => {
    setSelectedStrategy(data);
    setIsBacktestModalOpen(true);
    setIsModalOpen(false);
  };

  const closeBacktestModal = () => {
    setIsBacktestModalOpen(false);
  };

  const Unsubscribe = async (strategyData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/unSubscribe/${strategyData.strategyDesc.strategy_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        notifySuccess("UnSubscription successful!");
      } else {
        notifyError("Failed to Unsubscribe.");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      notifyError("Failed to Unsubscribe.");
    }
  };

  const handlePaperTrade = (strategyData) => {
    fetch("http://localhost:3001/api/strategy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(strategyData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        notifySuccess("Trade initiated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError("An error occurred while initiating paper trade.");
      });
  };

  const handleDetails = (data) => {
    history.push({
      pathname: '/Strategystatus',
      state: { consolidatedData: data }
    });
  };

  return (
    <div className="p-2 flex flex-row">
      <Card className="w-min">
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            {consolidatedData.map((data, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md relative">
                <ul>
                  <li className="text-lg font-bold uppercase">
                    {data.strategyDesc.strategy_name}
                  </li>
                  <li>{data.strategyDesc.description}</li>
                </ul>

                {/* Display symbol selection */}
                <h2 className="text-lg font-semibold">Symbol Selection:</h2>
                <ul>
                  {data.symbolSelection.map((item, i) => (
                    <li key={i}>
                      Exchange: {item.exchange}, Category: {item.category}, Symbol: {item.symbol}
                    </li>
                  ))}
                </ul>

                {/* Display action selection */}
                <h2 className="text-lg font-semibold">Action Selection:</h2>
                <ul>
                  {data.actionSelection.map((item, i) => (
                    <li key={i}>
                      Action: {item.action}, Order Type: {item.order_type}
                      {item.order_type === "limit" && (
                        <>
                          , Stop Loss: {item.stoploss_percent}, Target: {item.target_percent}
                        </>
                      )}
                      {item.order_type === "trailing_stop" && (
                        <>, Trailing Stop Percent: {item.trailing_stop_percent}</>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Display indicators */}
                {/* <h2 className="text-lg font-semibold">Indicators:</h2>
                <ul>
                  {data.indicators.map((indicator, i) => (
                    <li key={i}>
                      <p>Indicator ID: {indicator.indicator_id}</p>
                      <p>Param Name: {indicator.param_name}</p>
                      <p>Param Value: {indicator.param_value}</p>
                    </li>
                  ))}
                </ul> */}

                <div className="absolute top-0 right-0 mt-2 mr-2 flex p-2">
                  <Status status="Waiting" />
                  <FiEdit2
                    onClick={() => openModal(data)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer ml-2"
                    size={20}
                  />
                  <FiTrash2
                    onClick={() => openModal(data)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer ml-2"
                    size={20}
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <button
                      onClick={() => Unsubscribe(data)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full m-2"
                    >
                      Unsubscribe
                    </button>
                    {/* <button
                      onClick={() => handlePaperTrade(data)}
                      className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
                    >
                      Paper Trade
                    </button> */}
                    {/* <button
                      onClick={() => handlePaperTrade(data)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
                    >
                      Live
                    </button> */}
                  </div>
                  <button
                    onClick={() => handleDetails(data)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-2 rounded-full m-2"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Edit/Delete Modal */}
      {selectedStrategy && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex justify-between items-center">
            <ModalHeader>Edit or Delete Strategy</ModalHeader>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiX size={24} />
            </button>
          </div>
          <ModalBody>
            <Delete />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full mr-2"
            >
              Edit
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full"
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Backtest Modal */}
      {isBacktestModalOpen && (
        <Modal isOpen={isBacktestModalOpen} onClose={closeBacktestModal}>
          <div className="flex justify-between items-center">
            <ModalHeader>Backtest Strategy</ModalHeader>
            <button
              onClick={closeBacktestModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FiX size={24} />
            </button>
          </div>
          <ModalBody>
            <Backtest data={selectedStrategy} />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default SubscStrategy;
