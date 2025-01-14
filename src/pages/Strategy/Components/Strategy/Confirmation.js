// import React,{useContext,useEffect, useState} from 'react';
// import {
//   Card,
//   CardBody,
//   Button,
// } from "@windmill/react-ui";
// import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
// import { useListContext } from 'context/ListContext';
// import Counditioncard from './Counditioncard';
// import { notifySuccess } from 'utils/toast';
// import { useHistory } from 'react-router-dom';
// import { CreateStrategyContext } from 'context/CreateStrategyContext';

// const Confirmation = ({  handlePrevious }) => {
//   const { formData,setFormData,setConditions,WorkingStrategy,Assets,Action,indicators } = useListContext();
// const [savedStrat, SetsavedStrat] = useState([]);
//   console.log("WorkingStrategy in confirmation:",Assets,Action,indicators);
//   const history = useHistory();

//   const {  UniqueID } = useContext(CreateStrategyContext);
//   console.log("UniqueID in confirmation:",UniqueID);

//   // useEffect(() => {
//   //   const consolidated = [];
   
//   //     const localStorageKeys = ['assetselection', 'Actionselection', 'indicators'];
//   //     const fetchedData = {};
  
//   //     localStorageKeys.forEach(key => {
//   //       const localStorageData = JSON.parse(localStorage.getItem(key)) || [];
  
//   //       if (key === 'indicators') {
//   //         // For the 'indicators' key, find the data matching the UniqueID
//   //         const filteredData = localStorageData.find(item => item.uniqueID === UniqueID);
//   //         fetchedData[key] = filteredData ? filteredData.conditions : [];
//   //       } else {
//   //         // For other keys, filter the data based on the UniqueID
//   //         const filteredData = localStorageData.filter(item => item.UniqueID === UniqueID);
//   //         fetchedData[key] = filteredData;
//   //       }
//   //     });
//   //     SetsavedStrat([fetchedData]);
//   //     // consolidated.push({ fetchedData });
//   //     // SetsavedStrat(consolidated)

//   //     console.log("consolidated:",consolidated);
  
  
   
//   // }, []);
  
//   useEffect(() => {
//     const fetchConsolidatedData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/consolidatedData/${UniqueID}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch consolidated data');
//         }
//         const fetchedData = await response.json();
//         console.log("fetchedData from api:",fetchedData);
//         SetsavedStrat([fetchedData]);
//         console.log("Fetched consolidated data:", fetchedData);
//       } catch (error) {
//         console.error('Error fetching consolidated data:', error);
//       }
//     };
  
//     fetchConsolidatedData();
//   }, []);
  
  
//   const updateStrategyCompletion = (targetUniqueID) => {
//     try {
//       // Get the existing strategy data from localStorage
//       const storedStrategyData = localStorage.getItem('strategycreation');
//       if (storedStrategyData) {
//         const strategies = JSON.parse(storedStrategyData);

//         // Find the strategy with the provided UniqueID
//         const targetStrategy = strategies.find(strategy => strategy.UniqueID === targetUniqueID);

//         if (targetStrategy) {
//           // Update the isComplete flag of the found strategy to true
//           targetStrategy.isComplete = true;

//           // Save the updated data back to localStorage
//           localStorage.setItem('strategycreation', JSON.stringify(strategies));

//           // Notify success and perform other necessary actions
//           notifySuccess("Strategy marked as complete successfully");
//           // Add any other actions needed after the update

//           // Redirect to '/strategymaster' or any other route
//           // history.replace('/strategymaster');
//         } else {
//           console.error('Strategy with the provided UniqueID not found!');
//         }
//       } else {
//         console.error('No data found in localStorage for "strategycreation"');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating strategy completion:', error);
//     }
//   };


// console.log("SetsavedStrat:",savedStrat);
  
//   const actionstratsubmit = () => {
//     try {
//       // Get existing data from local storage
//       // const existingDataString = localStorage.getItem('actionStrategy');
//       // let existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
//       // Append the new client data to the existing data
//       // existingData.push(formData);
  
//       // Save the updated data back to local storage
//       // localStorage.setItem('actionStrategy', JSON.stringify(existingData));
  
//       // For demonstration purposes, you can log the updated data
//       // console.log('Updated Data:', existingData);
//       // notifySuccess("ActionStrategy saved successfully");
     
//       setFormData("");
      
//       setConditions("");

//       updateStrategyCompletion(WorkingStrategy.UniqueID);
      
//       history.replace('/strategymaster');
     

//     } catch (error) {
//       // Handle any errors that occur during the process
//       console.error('An error occurred:', error);
//     }
//   };
  
//   return (
//     <div className="p-2">
//       <Card className="w-min">
//         <CardBody>
//           <div>
//             {/* Page Title */}
//             <h1 className="text-3xl font-semibold mb-4">Confirmation and Execution</h1>

//             {/* Review of Configured Parameters */}
//             {/* <section>
//               <h2 className="text-xl font-semibold mb-2">Review of Configured Parameters:</h2>

//               Display formData values
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold">Conditions:</h3>
//                 <p>Condition Type: {formData.ConditionType}</p>
//                 <p>Indicator: {formData.Indicator}</p>
//                 <p>Operator: {formData.Operator}</p>
//                 <p>Indicator Value: {formData.IndicatorValue}</p>
//                 <p>Action Type: {formData.Actiontype}</p>
//                 <p>Action Details: {formData.Actiondetails}</p>
//                 <div className='lg:w-2/4 w-full'>
//                 <Counditioncard/>
//                 </div>
//               </div>

//               Risk Management
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold">Risk Management:</h3>
//                 <p>Risk Tolerance: {formData.RiskTolerance}</p>
//                 <p>Position Size: {formData.PositionSize}</p>
//                 <p>Stop Loss: {formData.StopLoss}</p>
//                 <p>Take Profit: {formData.TakeProfit}</p>
//               </div>
//             </section> */}

//              {/* ... other components */}
//     <section>
//       {/* Display fetched data */}
//       {savedStrat.map((data, index) => (
//         <div key={index} className="border p-4 rounded-lg shadow-md">
//           <h3>Assetselection:</h3>
//           <ul>
//             {data.assetselection.map((item, i) => (
//               <li key={i}>
//               Symbol: {item.Symbol}, 
//               strategyName: {item.strategyName}, 
//                 {/* niftyOption: {item.niftyOption},
//                 selectedOption: {item.selectedOption},  */}
//                 strategyDescription : {item.strategyDescription}
//               </li>
//             ))}
//           </ul>
          
//           <h3>Actionselection:</h3>
//           <ul>
//             {data.Actionselection.map((item, i) => (
//               <li key={i}>
//                 Action: {item.Action}, ActionType: {item.ActionType}, UniqueID: {item.UniqueID}
//               </li>
//             ))}
//           </ul>

//           <h3>Indicators:</h3>
//           <ul>
//             {data.indicators.map((item, i) => (
//               <li key={i}>
//                 {/* Render based on different indicator types */}
//                 {
//                   item.Indicator === 'RSI' ? (
//                     <span>
//                       Indicator: {item.Indicator}, Acceleration: {item.acceleration}, Maximum: {item.maximum}
//                     </span>
//                   ) : item.Indicator === 'SMA' ? (
//                     <span>
//                       Indicator: {item.Indicator}, Overbought: {item.overbought}, Oversold: {item.oversold}, Period: {item.period}
//                     </span>
//                   ) : item.Indicator === 'MACD' ? (
//                     <span>
//                       Indicator: {item.Indicator}, Long_Period: {item.Long_Period}, Short_Period: {item.Short_Period}, Signal_Period: {item.Signal_Period}
//                     </span>
//                   ) : item.Indicator === 'PSR' ?
//                   (
//                    <span>  Indicator: {item.Indicator}, max_ma: {item.max_ma}, min_ma: {item.min_ma},
//                    </span> 
//                   ):(<span></span>)
//                 }
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </section>

//             {/* Start Engine Button */}
//             <div className="mt-4">
//               <Button
//                 onClick={actionstratsubmit}
//                 className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
//               >
//                 Save Strategy
//               </Button>
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-4">
//               <Button
//                 onClick={handlePrevious}
//                 className="flex items-center text-gray-600 hover:text-gray-800"
//               >
//                 <MdOutlineNavigateBefore className="mr-2" /> Previous
//               </Button>
//               {/* Add any additional navigation buttons as needed */}
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

// export default Confirmation;




import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { useListContext } from "context/ListContext";
import { notifySuccess } from "utils/toast";
import { useHistory } from "react-router-dom";
import { CreateStrategyContext } from "context/CreateStrategyContext";
import logError from "hooks/useErrorLogger";
import { AdminContext } from "context/AdminContext";
import useDecodedToken from "hooks/useDecodeToken";
import { BaseUrl } from "utils/Constants";

const Confirmation = ({ handlePrevious }) => {
  const {
    setFormData,
    setConditions,
  } = useListContext();
  const [savedStrat, SetsavedStrat] = useState(null);
  const history = useHistory();

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;
  // const { StrategyID } = useContext(CreateStrategyContext);

  const StrategyID = 29

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseUrl}strategy/consolidated/${StrategyID}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${zenithQuark}`, // Add the authorization header
          },
        });
  
        // Log the status code and response text for debugging
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response text:', responseText);
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        // Parse the JSON data
        const data = JSON.parse(responseText);
        console.log("data in respo confirmation:", data);
        SetsavedStrat(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        logError(error.message, 'Confirmation.js');
      }
    };
  
    fetchData();
  }, []);
  
// }, [StrategyID, zenithQuark]);


   

  const updateStrategyCompletion = async (targetUniqueID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/updateStrategyCompletion/${targetUniqueID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark strategy as complete');
      }

      notifySuccess("Strategy completed successfully");
      history.replace('/strategymaster');
    } catch (error) {
      console.error('An error occurred while updating strategy completion:', error);
      logError(error.message, 'Confirmation.js');
    }
  };

  const actionstratsubmit = () => {
    try {
      setFormData("");
      setConditions("");
      updateStrategyCompletion(StrategyID);
    } catch (error) {
      console.error("An error occurred:", error);
      logError(error.message, 'Confirmation.js');
    }
  };

  return (
    <div className="p-2">
      <Card className="w-min">
        <CardBody>
          <div>
            <h1 className="text-3xl font-semibold mb-4">
              Confirmation and Executionnn
            </h1>

            <section>
              {savedStrat ? (
                <div className="border p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">Asset Selection:</h3>
                  <ul>
                    <li>
                      Strategy Name: {savedStrat.strategyDesc?.strategy_name},
                      Strategy Description: {savedStrat.strategyDesc?.description}
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold">Symbol Selection:</h3>
                  {savedStrat.symbolSelection?.map((symbol, index) => (
                    <ul key={index}>
                      <li>
                        Exchange: {symbol.exchange}, Category: {symbol.category},
                        Symbol: {symbol.symbol}
                      </li>
                    </ul>
                  ))}

                  <h3 className="text-lg font-semibold">Action Selection:</h3>
                  {savedStrat.actionSelection?.map((action, index) => (
                    <ul key={index}>
                      <li>
                        Action: {action.action}, Order Type: {action.order_type},
                        Quantity: {action.quantity}, Start Time: {action.start_date}, End Time: {action.end_date}, Execution Count: {action.execution_count}
                      </li>
                    </ul>
                  ))}

                  <h3 className="text-lg font-semibold">Indicators:</h3>
                  {savedStrat.indicators?.length > 0 ? (
                    savedStrat.indicators.map((indicator, index) => (
                      <ul key={index}>
                        <li>
                          Indicator: {indicator.indicator_id},
                          {Object.entries(indicator).map(([key, value]) => (
                            key !== 'indicator_id' ? `, ${key}: ${value}` : null
                          ))}
                        </li>
                      </ul>
                    ))
                  ) : (
                    <div>No indicators found</div>
                  )}
                </div>
              ) : (
                <div>No data availableeeeeeeeeeeee</div>
              )}
            </section>

            <div className="mt-4">
              <Button
                onClick={actionstratsubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
              >
                Save Strategyyyyyyyy
              </Button>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePrevious}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <MdOutlineNavigateBefore className="mr-2" /> Previous
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Confirmation;
