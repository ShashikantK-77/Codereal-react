// import React, { useState, useEffect } from "react";
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
// const Strategy = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
//   const [selectedStrategy, setSelectedStrategy] = useState(null);
//   const [strategies, setStrategies] = useState([]);
//   const [assets, setAssets] = useState([]);
//   const history = useHistory();
//   const [completeStrategies, setCompleteStrategies] = useState([]);
//   const [consolidatedData, setConsolidatedData] = useState([]);
//   const [statusData, setStatusData] = useState([]);


//   // Fetch strategies from local storage when the component mounts
//   // useEffect(() => {
//   //   const fetchCompleteStrategies = async () => {
//   //     try {
//   //       const storedStrategyData = localStorage.getItem('strategycreation');
//   //       if (storedStrategyData) {
//   //         const strategies = JSON.parse(storedStrategyData);

//   //         // Filter strategies where isComplete is true
//   //         const completeStrategies = strategies.filter(strategy => strategy.isComplete);

//   //         setCompleteStrategies(completeStrategies);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching complete strategies:', error);
//   //     }
//   //   };

//   //   fetchCompleteStrategies();
//   // }, []);


//   useEffect(() => {
//     const fetchStatusData = async () => {
//       try {
//         const response = await fetch("http://localhost:3001/api/strategyStatus");
//         if (!response.ok) {
//           throw new Error("Failed to fetch status data");
//         }
//         const data = await response.json();
//         setStatusData(data);
//       } catch (error) {
//         console.error("Error fetching status data:", error);
//       }
//     };
  
//     fetchStatusData();
//   }, []);
  
//   console.log("StatusData:",statusData);

//   useEffect(() => {
//     const fetchCompleteStrategies = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3001/api/completeStrategies"
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
//         console.error("Error fetching complete strategies data:", error);
//       }
//     };

//     fetchCompleteStrategiesData();
//   }, [completeStrategies]);

//   console.log("consolidatedData:", consolidatedData);

//   useEffect(() => {
//     // Fetch data from local storage when the component mounts
//     // const existingDataString = localStorage.getItem('actionStrategy');
//     // const existingData = existingDataString ? JSON.parse(existingDataString) : [];
//     setStrategies(consolidatedData);
//     console.log("my consolidatedData:", consolidatedData);
//     console.log("my strategies:", strategies);
//     // const existingDataStringAssets = localStorage.getItem('StrategyMaster');
//     // const existingDataAssets = existingDataStringAssets ? JSON.parse(existingDataStringAssets) : [];
//     // setAssets(existingDataAssets);

//     // console.log('Assets:', existingDataAssets);
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
//     // Handle edit logic here using selectedStrategy
//     // Redirect or open an edit form, etc.
//     closeModal();
//   };

//   // const handleDelete = () => {
//   //   // Handle delete logic here using selectedStrategy
//   //   // Delete the strategy and update the list
//   //   closeModal();
//   // };

//   const handleDelete = () => {
//     try {
//       // Get the UniqueID of the selected strategy
//       const uniqueID = selectedStrategy.UniqueID;

//       // Fetch existing strategy data from local storage
//       const storedStrategyData = localStorage.getItem("strategycreation");
//       if (storedStrategyData) {
//         // Parse the existing strategy data
//         let strategies = JSON.parse(storedStrategyData);

//         // Filter out the strategy with the matching UniqueID
//         strategies = strategies.filter(
//           (strategy) => strategy.UniqueID !== uniqueID
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

//   const handlePaperTrade = (strategyData) => {
//     strategyData.isPaperTrading = true;
//     console.log("Sending strategy data for paper trading:", strategyData);
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

//         notifySuccess("PaperTrade initiated successfully!");
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


//   const handleliveTrade = (strategyData) => {
//     strategyData.isPaperTrading = false;
//     console.log("Sending strategy data for paper trading:", strategyData);
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

//   // const handleBacktest = (strategyData) => {
//   //   console.log('Sending Backtest data:', strategyData);
//   //   // Make your API call here using fetch or any other library
//   //   // You can pass the strategy data to the API as needed
//   //   // For example:
//   //   fetch('http://localhost:3001/api/backtest', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //       // Add any other headers as needed
//   //     },
//   //     body: JSON.stringify(strategyData), // Pass the strategy data as the request body
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok');
//   //       }
//   //       // Handle successful response
//   //       // For example, you can show a success message to the user
//   //       alert('Backtest initiated successfully!');
//   //     })
//   //     .catch((error) => {
//   //       // Handle error
//   //       console.error('Error:', error);
//   //       // For example, you can show an error message to the user
//   //       alert('An error occurred while initiating Backtest.');
//   //     });
//   // };

//   // handleBacktest

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
//                       Action: {item.Action}, Order Type: {item.ActionType},StartTime: {item.StartTime}, EndTime: {item.EndTime}, executionCount:{item.executionCount}
//                       {item.ActionType === "limit" && (
//                         <>
//                           , Stop Loss: {item.StopLoss}, Stop Profit:{item.StopLoss}
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



//                   {/* <div className="flex justify-between">
//                   <div>
//                     <button
//                       onClick={() => openBacktestModal(data)} // Pass entire strategy data to openBacktestModal
//                       className="bg-green-400 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
//                     >
//                       Backtest
//                     </button>

//                     <button
//                       onClick={() => handlePaperTrade(data)}
//                       className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full m-2"
//                     >
//                       Paper Trade
//                     </button>

//                     <button
//                       onClick={() => handleliveTrade(data)}
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
//                   </div> */}


//                   {/* <div className="flex justify-between">
//   <div>
//     <button
//       onClick={() => openBacktestModal(data)}
//       className={`${
//         statusData[data.strategy_id]?.isBacktesting ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-700'
//       } text-white font-semibold px-4 py-2 rounded-full m-2`}
//       disabled={statusData[data.strategy_id]?.isBacktesting}
//     >
//       {statusData[data.strategy_id]?.isBacktesting ? 'Backtest Pending' : 'Backtest'}
//     </button>

//     <button
//       onClick={() => handlePaperTrade(data)}
//       className={`${
//         statusData[data.strategy_id]?.isPaperTrading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'
//       } text-white font-semibold px-4 py-2 rounded-full m-2`}
//       disabled={statusData[data.strategy_id]?.isPaperTrading}
//     >
//       {statusData[data.strategy_id]?.isPaperTrading ? 'Paper Trade Pending' : 'Paper Trade'}
//     </button>

//     <button
//       onClick={() => handleliveTrade(data)}
//       className={`${
//         statusData[data.strategy_id]?.isLiveTrading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
//       } text-white font-semibold px-4 py-2 rounded-full m-2`}
//       disabled={statusData[data.strategy_id]?.isLiveTrading}
//     >
//       {statusData[data.strategy_id]?.isLiveTrading ? 'Live Trade Pending' : 'Live'}
//     </button>
//   </div>
//   <button
//     onClick={() => handleDetails(data)}
//     className="bg-purple-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-full m-2"
//   >
//     Details
//   </button>
//                   </div> */}


           
//       {/* {statusData.map((data) => ( */}
//         <div key={data.strategy_id} className="flex justify-between items-center border-b-2 py-4">
//           <div>
//             {/* <button
//               onClick={() => openBacktestModal(data)}
//               className={`${
//                 data.isBacktesting === 'true' ? 'bg-gray-400' : 'bg-green-400 hover:bg-green-700'
//               } text-white font-semibold px-4 py-2 rounded-full m-2`}
//               disabled={data.isBacktesting === 'true'}
//             >
//               {data.isBacktesting === 'true' ? 'Backtest Pending' : 'Backtest'}
//             </button>

//             <button
//               onClick={() => handlePaperTrade(data)}
//               className={`${
//                 data.isPaperTrading === 'true' ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'
//               } text-white font-semibold px-4 py-2 rounded-full m-2`}
//               disabled={data.isPaperTrading === 'true'}
//             >
//               {data.isPaperTrading === 'true' ? 'Paper Trade Pending' : 'Paper Trade'}
//             </button> */}

//             <button
//               onClick={() => handleliveTrade(data)}
//               className={`${
//                 data.isLiveTrading === 'true' ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
//               } text-white font-semibold px-4 py-2 rounded-full m-2`}
//               disabled={data.isLiveTrading === 'true'}
//             >
//               {data.isLiveTrading === 'true' ? 'Live Trade Pending' : 'Live'}
//             </button>
//           </div>
//           <button
//             onClick={() => handleDetails(data)}
//             className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-2 rounded-full m-2"
//           >
//             Details
//           </button>
//         </div>
//       {/* ))} */}


                

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

// export default Strategy;




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
// import { useHistory } from "react-router-dom";
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { AdminContext } from "context/AdminContext";

// const Strategy = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
//   const [selectedStrategy, setSelectedStrategy] = useState(null);
//   const [completeStrategies, setCompleteStrategies] = useState([]);
//   const [consolidatedData, setConsolidatedData] = useState([]);
//   const history = useHistory();
//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;

//   useEffect(() => {
//     const fetchCompleteStrategies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/strategy/completeStrategies", {
//           headers: {
//             "Authorization": `Bearer ${zenithQuark}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setCompleteStrategies(data);
//         setConsolidatedData(data.details);
//       } catch (error) {
//         console.error("Error fetching complete strategies:", error);
//       }
//     };

//     fetchCompleteStrategies();
//   }, [zenithQuark]);

//   const openModal = (strategy) => {
//     setSelectedStrategy(strategy);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedStrategy(null);
//     setIsModalOpen(false);
//   };

//   const handleDetails = (data) => {
//     history.push({
//       pathname: '/Strategystatus',
//       state: { consolidatedData: data }
//     });
//   };



//   const handleCompleteStrategy = async (strategyId) => {
//     try {
//       const response = await fetch('http://localhost:5000/strategy/complete-strategy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${zenithQuark}`,

//         },
//         body: JSON.stringify({ strategy_id: strategyId }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.message || 'Failed to update strategy');
//       }
//     } catch (error) {
//       console.error('Error completing strategy:', error);
//       alert('An error occurred while completing the strategy');
//     }
//   };
  



//   return (
//     <div className="p-2 flex flex-row">
//       <Card className="w-full ">
//         <CardBody>
//           <div className="grid grid-cols-2 gap-4 ">
//             {consolidatedData.map((data, index) => (
//               <div key={index} className="border p-4 rounded-lg shadow-md relative">
//                 <ul>
//                   <li className="text-lg font-bold uppercase">
//                     {data.strategyDesc.strategy_name}
//                   </li>
//                   <li><strong>Strategy ID:</strong> {data.strategyDesc.strategy_id}</li>
//                   <li><strong>Required Fund:</strong> {data.strategyDesc.required_fund}</li>
//                   <li><strong>Complete:</strong> {data.strategyDesc.is_complete ? "Yes" : "No"}</li>
//                   <li><strong>Date:</strong> {new Date(data.strategyDesc.date).toLocaleString()}</li>
//                   <li><strong>Description:</strong> {data.strategyDesc.description || "N/A"}</li>
//                   <li className="mt-4">
//                     <strong>Symbols:</strong>
//                     <ul>
//                       {data.symbolSelection.map((symbol, i) => (
//                         <li key={i}>
//                           {symbol.exchange} - {symbol.category} - {symbol.symbol}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-4">
//                     <strong>Actions:</strong>
//                     <ul>
//                       {data.actionSelection.map((action, i) => (
//                         <li key={i}>
//                           {action.action} - {action.order_type} - Qty: {action.quantity}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-4">
//                     <strong>Indicators:</strong>
//                     <ul>
//                       {data.indicators.map((indicator, i) => (
//                         <li key={i}>
//                           {indicator.param_name}: {indicator.param_value}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                     <div>
                 

//                     <Button
//   onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
//   className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
// >
//   Live
// </Button>
//                   </div>
              
//                 </ul>
//                 <div className="absolute top-0 right-0 p-2">
//                   <Button layout="link" size="icon" onClick={() => openModal(data)}>
//                     <FiEdit2 className="w-5 h-5" />
//                   </Button>
//                   <Button layout="link" size="icon" className="ml-2">
//                     <FiTrash2 className="w-5 h-5" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardBody>
//       </Card>

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalHeader>Edit Strategy</ModalHeader>
//         <ModalBody>
//           {/* Add your form for editing the strategy */}
//         </ModalBody>
//         <ModalFooter>
//           <Button layout="outline" onClick={closeModal}>
//             Cancel
//           </Button>
//           {/* <Button onClick={handleEdit}>Save</Button> */}
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default Strategy;


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
// import { useHistory } from "react-router-dom";
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { AdminContext } from "context/AdminContext";

// const Strategy = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
//   const [selectedStrategy, setSelectedStrategy] = useState(null);
//   const [completeStrategies, setCompleteStrategies] = useState([]);
//   const [consolidatedData, setConsolidatedData] = useState([]);
//   const [view, setView] = useState('complete'); // State to manage current view
//   const history = useHistory();
//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;

//   useEffect(() => {
//     const fetchCompleteStrategies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/strategy/completeStrategies", {
//           headers: {
//             "Authorization": `Bearer ${zenithQuark}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setCompleteStrategies(data.details);
//         setConsolidatedData(data.details);
//       } catch (error) {
//         console.error("Error fetching complete strategies:", error);
//       }
//     };

//     fetchCompleteStrategies();
//   }, [zenithQuark]);

//   const openModal = (strategy) => {
//     setSelectedStrategy(strategy);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedStrategy(null);
//     setIsModalOpen(false);
//   };

//   const handleDetails = (data) => {
//     history.push({
//       pathname: '/Strategystatus',
//       state: { consolidatedData: data }
//     });
//   };

//   const handleCompleteStrategy = async (strategyId) => {
//     try {
//       const response = await fetch('http://localhost:5000/strategy/complete-strategy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${zenithQuark}`,
//         },
//         body: JSON.stringify({ strategy_id: strategyId }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.message || 'Failed to update strategy');
//       }
//     } catch (error) {
//       console.error('Error completing strategy:', error);
//       alert('An error occurred while completing the strategy');
//     }
//   };

//   const filteredData = consolidatedData.filter(strategy => 
//     view === 'complete' ? strategy.strategyDesc.is_complete : !strategy.strategyDesc.is_complete
//   );

//   return (
//     <div className="p-2 flex flex-col">
//       <div className="mb-4 flex justify-center">
//         <Button
//           onClick={() => setView('complete')}
//           className={`mr-2 ${view === 'complete' ? 'bg-blue-500' : 'bg-gray-300'}`}
//         >
//           Completed Strategies
//         </Button>
//         <Button
//           onClick={() => setView('incomplete')}
//           className={`${view === 'incomplete' ? 'bg-blue-500' : 'bg-gray-300'}`}
//         >
//           Incomplete Strategies
//         </Button>
//       </div>
//       <Card className="w-full">
//         <CardBody>
//           <div className="grid grid-cols-2 gap-4">
//             {filteredData.map((data, index) => (
//               <div key={index} className="border p-4 rounded-lg shadow-md relative">
//                 <ul>


//                 <div className="">
//   <div className="flex"><strong className="uppercase">{data.strategyDesc.strategy_name}</strong> </div>
//   {/* <div className="flex"><strong>Strategy ID:</strong> {data.strategyDesc.strategy_id}</div> */}
//   {/* <div className="flex"> <strong>Required Fund:</strong> {data.strategyDesc.required_fund}</div>
//   <div className="flex"><strong>Complete:</strong> {data.strategyDesc.is_complete ? "Yes" : "No"}</div>
//   <div className="flex"><strong>Date:</strong> {new Date(data.strategyDesc.date).toLocaleString()}</div> */}
//   <div className="flex">{data.strategyDesc.description || "N/A"}</div>
// </div>

                  
                  
//                   <li className="mt-1 flex flex-wrap">


//                     <strong>Symbols:</strong>
//                     <ul >
//                       {data.symbolSelection.map((symbol, i) => (
//                         <li key={i}>
//                           {symbol.exchange} - {symbol.category} - {symbol.symbol}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-1 flex flex-wrap">
//                     <strong>Actions:</strong>
//                     <ul>
//                       {data.actionSelection.map((action, i) => (
//                         <li key={i}>
//                           {action.action} - {action.order_type} - Qty: {action.quantity}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-1 flex flex-wrap">
//                     <strong>Indicators:</strong>
//                     <ul className="flex flex-wrap space-x-4">
//                       {data.indicators.map((indicator, i) => (
//                         <li key={i} >
//                           {indicator.param_name}: {indicator.param_value}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <div>
           
// {view === 'complete' && (
//   <Button
//     onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
//     className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//   >
//     Live
//   </Button>
// )}


// {view === 'incomplete' && (
//   <Button
//     // onClick={() => handleContinueSetup(data.strategyDesc.strategy_id)}
//     className="bg-green-600 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//   >
//     Continue Setup
//   </Button>
// )}
//                   </div>
//                 </ul>
//                 <div className="absolute top-0 right-0 p-2">
//                   <Button layout="link" size="icon" onClick={() => openModal(data)}>
//                     <FiEdit2 className="w-5 h-5" />
//                   </Button>
//                   <Button layout="link" size="icon" className="ml-2">
//                     <FiTrash2 className="w-5 h-5" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardBody>
//       </Card>

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalHeader>Edit Strategy</ModalHeader>
//         <ModalBody>
//           {/* Add your form for editing the strategy */}
//         </ModalBody>
//         <ModalFooter>
//           <Button layout="outline" onClick={closeModal}>
//             Cancel
//           </Button>
//           {/* <Button onClick={handleEdit}>Save</Button> */}
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default Strategy;


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
// import { useHistory } from "react-router-dom";
// import { FiEdit2, FiTrash2 } from 'react-icons/fi';
// import { AdminContext } from "context/AdminContext";

// const Strategy = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
//   const [selectedStrategy, setSelectedStrategy] = useState(null);
//   const [completeStrategies, setCompleteStrategies] = useState([]);
//   const [consolidatedData, setConsolidatedData] = useState([]);
//   const [view, setView] = useState('complete'); // State to manage current view
//   const history = useHistory();
//   const { state } = useContext(AdminContext);
//   const { zenithQuark } = state;

//   useEffect(() => {
//     const fetchCompleteStrategies = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/strategy/completeStrategies", {
//           headers: {
//             "Authorization": `Bearer ${zenithQuark}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setCompleteStrategies(data.details);
//         setConsolidatedData(data.details);
//       } catch (error) {
//         console.error("Error fetching complete strategies:", error);
//       }
//     };

//     fetchCompleteStrategies();
//   }, [zenithQuark]);

//   const openModal = (strategy) => {
//     setSelectedStrategy(strategy);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedStrategy(null);
//     setIsModalOpen(false);
//   };

//   const handleDetails = (data) => {
//     history.push({
//       pathname: '/Strategystatus',
//       state: { consolidatedData: data }
//     });
//   };

//   const handleCompleteStrategy = async (strategyId) => {
//     try {
//       const response = await fetch('http://localhost:5000/strategy/complete-strategy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${zenithQuark}`,
//         },
//         body: JSON.stringify({ strategy_id: strategyId }),
//       });
  
//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message);
//       } else {
//         alert(data.message || 'Failed to update strategy');
//       }
//     } catch (error) {
//       console.error('Error completing strategy:', error);
//       alert('An error occurred while completing the strategy');
//     }
//   };

//   const filteredData = consolidatedData.filter(strategy => 
//     view === 'complete' ? strategy.strategyDesc.is_complete : !strategy.strategyDesc.is_complete
//   );

//   return (
//     <div className="p-2 flex flex-col">
//       <div className="mb-4 flex justify-center">
//         <Button
//           onClick={() => setView('complete')}
//           className={`mr-2 ${view === 'complete' ? 'bg-blue-500' : 'bg-gray-300'}`}
//         >
//           Completed Strategies
//         </Button>
//         <Button
//           onClick={() => setView('incomplete')}
//           className={`${view === 'incomplete' ? 'bg-blue-500' : 'bg-gray-300'}`}
//         >
//           Incomplete Strategies
//         </Button>
//       </div>
//       <Card className="w-full">
//         <CardBody>
//           <div className="grid grid-cols-2 gap-4">
//             {filteredData.map((data, index) => (
//               <div key={index} className="border p-4 rounded-lg shadow-md relative">
//                 <ul>


//                 <div className="">
//   <div className="flex"><strong className="uppercase">{data.strategyDesc.strategy_name}</strong> </div>
//   {/* <div className="flex"><strong>Strategy ID:</strong> {data.strategyDesc.strategy_id}</div> */}
//   {/* <div className="flex"> <strong>Required Fund:</strong> {data.strategyDesc.required_fund}</div>
//   <div className="flex"><strong>Complete:</strong> {data.strategyDesc.is_complete ? "Yes" : "No"}</div>
//   <div className="flex"><strong>Date:</strong> {new Date(data.strategyDesc.date).toLocaleString()}</div> */}
//   <div className="flex">{data.strategyDesc.description || "N/A"}</div>
// </div>

                  
                  
//                   <li className="mt-1 flex flex-wrap">


//                     <strong>Symbols:</strong>
//                     <ul >
//                       {data.symbolSelection.map((symbol, i) => (
//                         <li key={i}>
//                           {symbol.exchange} - {symbol.category} - {symbol.symbol}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-1 flex flex-wrap">
//                     <strong>Actions:</strong>
//                     <ul>
//                       {data.actionSelection.map((action, i) => (
//                         <li key={i}>
//                           {action.action} - {action.order_type} - Qty: {action.quantity}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <li className="mt-1 flex flex-wrap">
//                     <strong>Indicators:</strong>
//                     <ul className="flex flex-wrap space-x-4">
//                       {data.indicators.map((indicator, i) => (
//                         <li key={i} >
//                           {indicator.param_name}: {indicator.param_value}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
//                   <div>
           
// {view === 'complete' && (
//   <Button
//     onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
//     className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//   >
//     Live
//   </Button>
// )}


// {view === 'incomplete' && (
//   <Button
//     // onClick={() => handleContinueSetup(data.strategyDesc.strategy_id)}
//     className="bg-green-600 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded-full m-2"
//   >
//     Continue Setup
//   </Button>
// )}
//                   </div>
//                 </ul>
//                 <div className="absolute top-0 right-0 p-2">
//                   <Button layout="link" size="icon" onClick={() => openModal(data)}>
//                     <FiEdit2 className="w-5 h-5" />
//                   </Button>
//                   <Button layout="link" size="icon" className="ml-2">
//                     <FiTrash2 className="w-5 h-5" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardBody>
//       </Card>

//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalHeader>Edit Strategy</ModalHeader>
//         <ModalBody>
//           {/* Add your form for editing the strategy */}
//         </ModalBody>
//         <ModalFooter>
//           <Button layout="outline" onClick={closeModal}>
//             Cancel
//           </Button>
//           {/* <Button onClick={handleEdit}>Save</Button> */}
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default Strategy;

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
import { useHistory } from "react-router-dom";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { AdminContext } from "context/AdminContext";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import Status from "components/table/Status";
import { notifyError, notifySuccess } from "utils/toast";
import { BaseUrl } from "utils/Constants";


const Strategy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBacktestModalOpen, setIsBacktestModalOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [completeStrategies, setCompleteStrategies] = useState([]);
  const [consolidatedData, setConsolidatedData] = useState([]);


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [strategyToDelete, setStrategyToDelete] = useState(null);

  const history = useHistory();
  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;
  const { SetStrategyID } = useContext(CreateStrategyContext);

  useEffect(() => {
 

    getallstartegies();
  }, [zenithQuark]);

  const getallstartegies = async () => {
    try {
      const response = await fetch(`${BaseUrl}strategy/getallstartegies`, {
        headers: {
          "Authorization": `Bearer ${zenithQuark}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCompleteStrategies(data.details);
      setConsolidatedData(data.details);
    } catch (error) {
      console.error("Error fetching complete strategies:", error);
    }
  };

  const openModal = (strategy) => {
    setSelectedStrategy(strategy);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStrategy(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = (strategy) => {
    setStrategyToDelete(strategy);
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setStrategyToDelete(null);
    setIsDeleteModalOpen(false);
  };
  
  const handleDeleteStrategy = async () => {
    try {
      const response = await fetch('http://localhost:5000/strategy/delete-strategy', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({ strategy_id: strategyToDelete.strategyDesc.strategy_id }),
      });
  
      const data = await response.json();
      if (response.ok) {
        notifySuccess(data.message);
        // Refresh strategies after delete
        getallstartegies();
      } else {
        notifyError(data.message || 'Failed to delete strategy');
      }
    } catch (error) {
      console.error('Error deleting strategy:', error);
      notifyError('An error occurred while deleting the strategy');
    } finally {
      closeDeleteModal();
    }
  };

  const handleDetails = (data) => {
    history.push({
      pathname: '/Strategystatus',
      state: { consolidatedData: data }
    });
  };

  const handleCompleteStrategy = async (strategyId) => {
    try {
      const response = await fetch(`${BaseUrl}strategy/complete-strategy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({ strategy_id: strategyId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        notifySuccess(data.message)
        getallstartegies();
      } else {
        // alert(data.message || 'Failed to update strategy');
        notifyError(data.message || 'Failed to update strategy')
      }
    } catch (error) {
      console.error('Error completing strategy:', error);
      alert('An error occurred while completing the strategy');
    }
  };


  const handleStopStrategy = async (strategyId) => {
    try {
      const response = await fetch(`${BaseUrl}strategy/stop-strategy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${zenithQuark}`,
        },
        body: JSON.stringify({ strategy_id: strategyId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // alert(data.message);
        notifySuccess(data.message)
        getallstartegies();
      } else {
        // alert(data.message || 'Failed to update strategy');
        notifyError(data.message || 'Failed to update strategy')
      }
    } catch (error) {
      console.error('Error completing strategy:', error);
      alert('An error occurred while completing the strategy');
    }
  };

  // const handleContinueSetup = async (data) => {
  //   console.log("in handleContinueSetup data:",data);
  // }

  const handleContinueSetup = async (data) => {
    const initialStep = data.strategyDesc.completed_stages;
    SetStrategyID(data.strategyDesc.strategy_id)
    history.push({
      pathname: '/makestrategy',
      state: { initialStep: initialStep, data: data  }
    });
  };

  return (
    <div className="p-2 flex flex-col">
      <Card className="w-full">
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            {consolidatedData.map((data, index) => (
              <div
                key={index}
                className={`border p-4 rounded-lg shadow-md relative ${data.strategyDesc.is_complete ? 'bg-green-100' : 'bg-gray-100'}`}
              >
                <ul>
                  <div className="">
                    <div className="flex"><strong className="uppercase">{data.strategyDesc.strategy_name}</strong> </div>
                    <div className="flex">{data.strategyDesc.description || "N/A"}</div>
                  </div>

                  <li className="mt-1 flex flex-wrap">
                    <strong>Symbols:</strong>
                    <ul>
                      {data.symbolSelection.map((symbol, i) => (
                        <li key={i}>
                          {symbol.exchange} - {symbol.category} - {symbol.symbol}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-1 flex flex-wrap">
                    <strong>Actions:</strong>
                    <ul>
                      {data.actionSelection.map((action, i) => (
                        <li key={i}>
                          {action.action} - {action.order_type} - Qty: {action.quantity}
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-1 flex flex-wrap">
                    <strong>Indicators:</strong>
                    <ul className="flex flex-wrap space-x-4">
                      {data.indicators.map((indicator, i) => (
                        <li key={i} >
                          {indicator.param_name}: {indicator.param_value}
                        </li>
                      ))}
                    </ul>
                  </li>
                  {/* <div className="mt-2 flex justify-end">
                    {data.strategyDesc.is_complete ? (
                      <Button
                        onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
                        className="bg-red-600 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded-full m-2"
                      >
                        Live
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleContinueSetup(data)}
                        className="bg-green-600 hover:bg-green-600 text-white font-semibold px-2 py-1 rounded-full m-2"
                      >
                        Continue Setup
                      </Button>
                    )}
                  </div> */}


                  <div className="mt-2 flex justify-end">
  {data.strategyDesc.is_complete ? (
    data.strategyDesc.execution_status === "waiting" ? (
      <div className="flex">
      <button
        // onClick={() => handleStrategyDetails(data.strategyDesc.strategy_id)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-2 py-2 rounded-full m-2"
      >
        Strategy Details
      </button>
      <button
        onClick={() => handleStopStrategy(data.strategyDesc.strategy_id)}
        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-full m-2"
      >
        Stop
      </button>
      </div>
    ) : (
      <button
        onClick={() => handleCompleteStrategy(data.strategyDesc.strategy_id)}
        className="bg-indigo-600	 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-full m-2"
      >
        Live
      </button>
    )
  ) : (
    <button
      onClick={() => handleContinueSetup(data)}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-2 py-2 rounded-full m-2"
    >
      Continue Setup
    </button>
   
  )}
</div>
                </ul>
                {/* <div className="absolute top-0 right-0 p-2">
                  <Button layout="link" size="icon" onClick={() => openModal(data)}>
                    <FiEdit2 className="w-5 h-5" />
                  </Button>
                  <Button layout="link" size="icon" className="ml-2">
                    <FiTrash2 className="w-5 h-5" />
                  </Button>
                </div> */}


                {(data.strategyDesc.execution_status === null || data.strategyDesc.execution_status === "") && (
                  <div className="absolute top-0 right-0 p-2">
                    <Button layout="link" size="icon" onClick={() => openModal(data)}>
                      <FiEdit2 className="w-5 h-5" />
                    </Button>
                    <Button layout="link" size="icon" className="ml-2" onClick={() => openDeleteModal(data) }>
                      <FiTrash2  className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {data.strategyDesc.execution_status != null && (
                  <div className="absolute top-0 right-0 p-2">
                    <Status status={data.strategyDesc.execution_status}/>
                  </div>
                )}

              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Edit Strategy</ModalHeader>
        <ModalBody>
          {/* Add your form for editing the strategy */}
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          {/* <Button onClick={handleEdit}>Save</Button> */}
        </ModalFooter>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
  <ModalHeader>Confirm Delete</ModalHeader>
  <ModalBody>
 
    Are you sure you want to delete this strategy?
  </ModalBody>
  <ModalFooter>
    <Button layout="outline" onClick={closeDeleteModal}>
      Cancel
    </Button>
    <Button onClick={handleDeleteStrategy} className="bg-red-600 hover:bg-red-600 text-white font-semibold">
      Delete
    </Button>
  </ModalFooter>
</Modal>

    </div>
  );
};

export default Strategy;
