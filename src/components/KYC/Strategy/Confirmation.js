// import React, { useContext, useEffect, useState } from "react";
// import { Card, CardBody, Button } from "@windmill/react-ui";
// import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
// import { useListContext } from "context/ListContext";
// import Counditioncard from "./Counditioncard";
// import { notifySuccess } from "utils/toast";
// import { useHistory } from "react-router-dom";
// import { CreateStrategyContext } from "context/CreateStrategyContext";
// import Previousdata from "./Previousdata";
// import logError from "hooks/useErrorLogger";

// const Confirmation = ({ handlePrevious, stepperformData }) => {
//   const [MyUniqueID, SetMyUniqueID] = useState();
//   const {
//     formData,
//     setFormData,
//     setConditions,
//     WorkingStrategy,
//     Assets,
//     Action,
//     indicators,
//   } = useListContext();
//   const [savedStrat, SetsavedStrat] = useState([]);
//   console.log("WorkingStrategy in confirmation:", Assets, Action, indicators);
//   const history = useHistory();

//   const { StrategyID } = useContext(CreateStrategyContext);
//   console.log("StrategyID in confirmation::::::::::::", StrategyID);
//   console.log("stepperformData:", stepperformData);

 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/consolidated/${StrategyID}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         SetsavedStrat([data]);
//         console.log("savedStrat::",savedStrat);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//         logError(error.message, 'Confirmation.js');
//         // Handle error state or display an error message to the user
//       }
//     };
  
//     fetchData();
//   }, [StrategyID]);
  

  


//   const updateStrategyCompletion = async (targetUniqueID) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/updateStrategyCompletion/${targetUniqueID}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//           // Add any other headers if needed
//         },
//         // If you have a request body, you can include it here
//         // body: JSON.stringify({ /* Request body */ })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to mark strategy as complete');
//       }
  
//       // Notify success and perform other necessary actions
//       notifySuccess("Strategy completed successfully");
  
//       // Add any other actions needed after the update
  
//       // Redirect to '/strategymaster' or any other route
//       history.replace('/strategymaster');
//     } catch (error) {
//       console.error('An error occurred while updating strategy completion:', error);
//       logError(error.message, 'Confirmation.js');
//       // Handle error
//     }
//   };
  

//   console.log("SetsavedStrat:", savedStrat);

//   const actionstratsubmit = () => {
//     try {
     
//       setFormData("");

//       setConditions("");
//       console.log("in actionstratsubmit");
    
//       // updateStrategyCompletion(MyUniqueID);
//       updateStrategyCompletion(StrategyID);
      

//       history.replace("/strategymaster");
//     } catch (error) {
//       // Handle any errors that occur during the process
//       console.error("An error occurred:", error);
//       logError(error.message, 'Confirmation.js');
//     }
//   };

//   return (
//     <div className="p-2">
//       <Card className="w-min">
//         <CardBody>
//           <div>
//             {/* Page Title */}
//             <h1 className="text-3xl font-semibold mb-4">
//               Confirmation and Execution
//             </h1>

           

//             {/* ... other components */}
//             {/* <section>
//             {savedStrat.length > 0 ? (
//     savedStrat.map((data, index) => (
//       <div key={index} className="border p-4 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold">Assetselection:</h3>
//         <ul>
//           <li>
//             Strategy Name: {data.strategyDesc.strategyName},
//             Strategy Description : {data.strategyDesc.strategyDescription}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold">Symbol Selection:</h3>

//         <ul>
//           <li>
//             exchange: {data.symbolSelection.exchange}, category: {data.symbolSelection.category},
//             symbol: {data.symbolSelection.symbol}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold">Actionselection:</h3>

//         <ul>
//           <li>
//             Action: {data.actionSelection.Action}, ActionType: {data.actionSelection.ActionType},
//             Quantity: {data.actionSelection.Quantity}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold"> Indicators:</h3>

//         <ul>
//           {Array.isArray(data.indicators) && data.indicators.length > 0 ? (
//             data.indicators.map((indicator, i) => (
//               <li key={i}>
//                 Indicator: {indicator.Indicator},
//                 {Object.entries(indicator).map(([key, value]) => {
//                   if (key !== 'Indicator') {
//                     return `, ${key}: ${value}`;
//                   }
//                   return null;
//                 })}
//               </li>
//             ))
//           ) : (
//             <li>No indicators found</li>
//           )}
//         </ul>
//       </div>
//     ))
//   ) : (
//     <div>No data available</div>
//   )}

//             </section> */}

//             <section>
//   {savedStrat.length > 0 ? (
//     savedStrat.map((data, index) => (
//       <div key={index} className="border p-4 rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold">Assetselection:</h3>
//         <ul>
//           <li>
//             Strategy Name: {data.strategyDesc?.strategyName},
//             Strategy Description: {data.strategyDesc?.strategyDescription}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold">Symbol Selection:</h3>

//         <ul>
//           <li>
//             exchange: {data.symbolSelection?.exchange}, category: {data.symbolSelection?.category},
//             symbol: {data.symbolSelection?.symbol}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold">Actionselection:</h3>

//         <ul>
//           <li>
//             Action: {data.actionSelection?.Action}, ActionType: {data.actionSelection?.ActionType},
//             Quantity: {data.actionSelection?.Quantity}, StartTime: {data.actionSelection?.StartTime}, EndTime: {data.actionSelection?.EndTime}, executionCount: {data.actionSelection?.executionCount}
//           </li>
//         </ul>

//         <h3 className="text-lg font-semibold">Indicators:</h3>

//         <ul>
//           {Array.isArray(data.indicators) && data.indicators.length > 0 ? (
//             data.indicators.map((indicator, i) => (
//               <li key={i}>
//                 Indicator: {indicator.Indicator},
//                 {Object.entries(indicator).map(([key, value]) => {
//                   if (key !== 'Indicator') {
//                     return `, ${key}: ${value}`;
//                   }
//                   return null;
//                 })}
//               </li>
//             ))
//           ) : (
//             <li>No indicators found</li>
//           )}
//         </ul>
//       </div>
//     ))
//   ) : (
//     <div>No data available</div>
//   )}
// </section>


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

//           {/* <Previousdata stepperformData={stepperformData}/> */}
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

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

const indicator_mapping = {
  1: "Simple Moving Average",
  2: "Relative Strength Index",
  3: "Parabolic SAR",
  4: "Moving Average Convergence Divergence",
  5: "Exponential Moving Average"
};


const Confirmation = ({ handlePrevious }) => {
  const {
    setFormData,
    setConditions,
  } = useListContext();
  const [savedStrat, SetsavedStrat] = useState({});
  const history = useHistory();

  const { state } = useContext(AdminContext);
  const { zenithQuark } = state;
  const { StrategyID } = useContext(CreateStrategyContext);

  // const StrategyID = 29

  // Function to group indicators by indicator_id
const groupIndicators = (indicators) => {
  const grouped = {};
  indicators.forEach(indicator => {
    const { indicator_id, param_name, param_value } = indicator;
    if (!grouped[indicator_id]) {
      grouped[indicator_id] = [];
    }
    grouped[indicator_id].push(`${param_name}: ${param_value}`);
  });
  return grouped;
};


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


   

  // const updateStrategyCompletion = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/updateStrategyCompletion/${StrategyID}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to mark strategy as complete');
  //     }

  //     notifySuccess("Strategy completed successfully");
  //     history.replace('/strategymaster');
  //   } catch (error) {
  //     console.error('An error occurred while updating strategy completion:', error);
  //     logError(error.message, 'Confirmation.js');
  //   }
  // };

  const updateStrategyCompletion = async (StrategyID) => {
    try {
      const response = await fetch(`${BaseUrl}strategy/updateStrategyCompletion/${StrategyID}`, {
        method: 'PUT', // Use PUT instead of POST
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${zenithQuark}`,
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

  const groupedIndicators = groupIndicators(savedStrat.indicators || []);
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
                  {/* {savedStrat.indicators?.length > 0 ? (
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
                  )} */}

                  {/* {savedStrat.indicators?.length > 0 ? (
  <ul className="flex flex-wrap space-x-4">

    {savedStrat.indicators.map((indicator, index) => (
      <li key={index} className="mb-2">
        {indicator.param_name}: {indicator.param_value}
      </li>
    ))}
  </ul>
) : (
  <div>No indicators found</div>
)} */}



{/* {savedStrat.indicators?.length > 0 ? (
  <ul className="flex flex-wrap space-x-4">
    {savedStrat.indicators.map((indicator, index) => (
      <li key={index} className="mb-2">
        <div className="font-bold">{indicator_mapping[indicator.indicator_id]}</div>
        <div>
          {savedStrat.indicators
            .filter(ind => ind.indicator_id === indicator.indicator_id)
            .map((ind, i) => `${ind.param_name}: ${ind.param_value}`)
            .join(', ')}
        </div>
      </li>
    ))}
  </ul>
) : (
  <div>No indicators found</div>
)} */}

{Object.keys(groupedIndicators).length > 0 ? (
  <ul className="flex flex-wrap space-x-4">
    {Object.entries(groupedIndicators).map(([indicator_id, params], index) => (
      <li key={index} className="mb-2">
        <div className="font-bold">{indicator_mapping[indicator_id]}</div>
        <div>{params.join(', ')}</div>
      </li>
    ))}
  </ul>
) : (
  <div>No indicators found</div>
)}
                </div>
              ) : (
                <div>No data availableeeeee</div>
              )}
            </section>

            <div className="mt-4">
              <Button
                onClick={actionstratsubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full"
              >
                Save Strategyyyy
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
