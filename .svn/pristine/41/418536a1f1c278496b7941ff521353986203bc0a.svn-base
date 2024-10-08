// // import React from 'react';
// // import { Card } from "@windmill/react-ui";

// // const Previousdata = ({ stepperformData }) => {
// //   // Function to render key-value pairs
// //   const renderData = (data) => {
// //     return Object.entries(data).map(([key, value]) => (
// //       <div key={key} className="mb-2">
// //         <span className="font-bold">{key}:</span> {value}
// //       </div>
// //     ));
// //   };

// //   return (
  
// //     <div className="ml-16">
// //       <Card className="w-3/5 ml-5 rounded shadow">
// //         <div className="p-4">
// //           <h2 className="text-lg font-semibold mb-4">Previous Data</h2>
// //           {stepperformData && renderData(stepperformData)}
// //         </div>
// //       </Card>
// //      </div>
// //   );
// // };

// // export default Previousdata;


// // import React from 'react';
// // import { Card } from "@windmill/react-ui";

// // const Previousdata = ({ stepperformData }) => {

// //   return (
// //     <div className="ml-16">
// //       <Card className="w-3/5 ml-5 rounded shadow">
// //         <div className="p-4">
// //           <h2 className="text-lg font-semibold mb-4">Strategy Details:</h2>
// //           {stepperformData.UniqueID && <div className="mb-2"><span className="font-bold">Strategy ID:</span> {stepperformData.UniqueID}</div>}

// //           {stepperformData.strategyName && <div className="mb-2"><span className="font-bold">Strategy Name:</span> {stepperformData.strategyName}</div>}
// //           {/* {stepperformData.strategyDescription && <div className="mb-2"><span className="font-bold">Strategy Description:</span> {stepperformData.strategyDescription}</div>} */}
// //           {stepperformData.exchange && <div className="mb-2"><span className="font-bold">Exchange:</span> {stepperformData.exchange}</div>}
// //           {stepperformData.category && <div className="mb-2"><span className="font-bold">Category:</span> {stepperformData.category}</div>}
// //           {stepperformData.symbol && <div className="mb-2"><span className="font-bold">Symbol:</span> {stepperformData.symbol}</div>}
// //           {stepperformData.openValue && <div className="mb-2"><span className="font-bold">openValue:</span> {stepperformData.openValue}</div>}
// //           {stepperformData.Quantity && <div className="mb-2"><span className="font-bold">Quantity:</span> {stepperformData.Quantity}</div>}
// //           {stepperformData.Action && <div className="mb-2"><span className="font-bold">Action:</span> {stepperformData.Action}</div>}
// //           {stepperformData.ActionType && <div className="mb-2"><span className="font-bold">Order Type:</span> {stepperformData.ActionType}</div>}
// //           {stepperformData.StartTime && <div className="mb-2"><span className="font-bold">StartTime:</span> {stepperformData.StartTime}</div>}
// //           {stepperformData.EndTime && <div className="mb-2"><span className="font-bold">EndTime:</span> {stepperformData.EndTime}</div>}
// //           {stepperformData.StopLoss && <div className="mb-2"><span className="font-bold">Stop Loss:</span> {stepperformData.StopLoss}</div>}
// //           {stepperformData.StopProfit && <div className="mb-2"><span className="font-bold">Stop Profit:</span> {stepperformData.StopProfit}</div>}
// //           {stepperformData.TrailingStopPercent && <div className="mb-2"><span className="font-bold">Trailing Stop Percent:</span> {stepperformData.TrailingStopPercent}</div>}

// //           {/* Conditionally render Bracket fields if ActionType is "Bracket" */}
// //           {stepperformData.ActionType === "Bracket" && (
// //             <>
// //               {stepperformData.BracketPriceAt && <div className="mb-2"><span className="font-bold">Bracket Price At:</span> {stepperformData.BracketPriceAt}</div>}
// //               {stepperformData.BracketStopLoss && <div className="mb-2"><span className="font-bold">Bracket Stop Loss:</span> {stepperformData.BracketStopLoss}</div>}
// //               {stepperformData.BracketTarget && <div className="mb-2"><span className="font-bold">Bracket Target:</span> {stepperformData.BracketTarget}</div>}
// //             </>
// //           )}
// //           {stepperformData.ActionType === "trigger" && (
// //             <>
// //               {stepperformData.TriggerPriceAt && <div className="mb-2"><span className="font-bold">Trigger Price At:</span> {stepperformData.TriggerPriceAt}</div>}
// //               {stepperformData.TriggerTriggerPrice && <div className="mb-2"><span className="font-bold">Trigger Price:</span> {stepperformData.TriggerTriggerPrice}</div>}
              
// //             </>
// //           )}
// //           {stepperformData.ActionType === "limit" && (
// //             <>
// //               {stepperformData.LimitPrice && <div className="mb-2"><span className="font-bold">Limit Price:</span> {stepperformData.LimitPrice}</div>}
             
// //             </>
// //           )}
// //            {stepperformData.ActionType === "cover" && (
// //             <>
// //               {stepperformData.CoverPrice && <div className="mb-2"><span className="font-bold">Cover Price:</span> {stepperformData.CoverPrice}</div>}
// //               {stepperformData.CoverStopLoss && <div className="mb-2"><span className="font-bold">Cover Stop Loss:</span> {stepperformData.CoverStopLoss}</div>}
// //               {stepperformData.CoverTriggerPrice && <div className="mb-2"><span className="font-bold">Cover Trigger Price:</span> {stepperformData.CoverTriggerPrice}</div>}
          
// //            </>
// //           )}

        
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default Previousdata;




// import React from 'react';
// import { Card } from "@windmill/react-ui";

// const Previousdata = ({ stepperformData }) => {
//   const strategyDesc = stepperformData.strategyDesc || {};
//   const symbolSelection = stepperformData.symbolSelection || [];
//   const actionSelection = stepperformData.actionSelection || [];

//   return (
//     <div className="ml-16">
//       <Card className="w-3/5 ml-5 rounded shadow">
//         <div className="p-4">
//           <h2 className="text-lg font-semibold mb-4">Strategy Details:</h2>
//           {strategyDesc.strategy_id && (
//             <div className="mb-2">
//               <span className="font-bold">Strategy ID:</span> {strategyDesc.strategy_id}
//             </div>
//           )}
//           {strategyDesc.strategy_name && (
//             <div className="mb-2">
//               <span className="font-bold">Strategy Name:</span> {strategyDesc.strategy_name}
//             </div>
//           )}
//           {strategyDesc.description && (
//             <div className="mb-2">
//               <span className="font-bold">Description:</span> {strategyDesc.description}
//             </div>
//           )}
//           {symbolSelection.length > 0 && (
//             <>
//               <div className="mb-2">
//                 <span className="font-bold">Exchange:</span> {symbolSelection[0].exchange}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Category:</span> {symbolSelection[0].category}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Symbol:</span> {symbolSelection[0].symbol}
//               </div>
//             </>
//           )}
//           {actionSelection.length > 0 && (
//             <>
//               <div className="mb-2">
//                 <span className="font-bold">Quantity:</span> {actionSelection[0].quantity}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Action:</span> {actionSelection[0].action}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Order Type:</span> {actionSelection[0].order_type}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Start Time:</span> {new Date(actionSelection[0].start_date).toLocaleString()}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">End Time:</span> {new Date(actionSelection[0].end_date).toLocaleString()}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Stop Loss:</span> {actionSelection[0].stoploss_percent}
//               </div>
//               <div className="mb-2">
//                 <span className="font-bold">Stop Profit:</span> {actionSelection[0].target_percent}
//               </div>
//               {actionSelection[0].ActionType === "Bracket" && (
//                 <>
//                   {actionSelection[0].bracket_price_at && (
//                     <div className="mb-2">
//                       <span className="font-bold">Bracket Price At:</span> {actionSelection[0].bracket_price_at}
//                     </div>
//                   )}
//                   {actionSelection[0].bracket_stop_loss && (
//                     <div className="mb-2">
//                       <span className="font-bold">Bracket Stop Loss:</span> {actionSelection[0].bracket_stop_loss}
//                     </div>
//                   )}
//                   {actionSelection[0].bracket_target && (
//                     <div className="mb-2">
//                       <span className="font-bold">Bracket Target:</span> {actionSelection[0].bracket_target}
//                     </div>
//                   )}
//                 </>
//               )}
//               {actionSelection[0].ActionType === "trigger" && (
//                 <>
//                   {actionSelection[0].trigger_price_at && (
//                     <div className="mb-2">
//                       <span className="font-bold">Trigger Price At:</span> {actionSelection[0].trigger_price_at}
//                     </div>
//                   )}
//                   {actionSelection[0].trigger_trigger_price && (
//                     <div className="mb-2">
//                       <span className="font-bold">Trigger Price:</span> {actionSelection[0].trigger_trigger_price}
//                     </div>
//                   )}
//                 </>
//               )}
//               {actionSelection[0].ActionType === "limit" && (
//                 <>
//                   {actionSelection[0].limit_price && (
//                     <div className="mb-2">
//                       <span className="font-bold">Limit Price:</span> {actionSelection[0].limit_price}
//                     </div>
//                   )}
//                 </>
//               )}
//               {actionSelection[0].ActionType === "cover" && (
//                 <>
//                   {actionSelection[0].cover_price && (
//                     <div className="mb-2">
//                       <span className="font-bold">Cover Price:</span> {actionSelection[0].cover_price}
//                     </div>
//                   )}
//                   {actionSelection[0].cover_stop_loss && (
//                     <div className="mb-2">
//                       <span className="font-bold">Cover Stop Loss:</span> {actionSelection[0].cover_stop_loss}
//                     </div>
//                   )}
//                   {actionSelection[0].cover_trigger_price && (
//                     <div className="mb-2">
//                       <span className="font-bold">Cover Trigger Price:</span> {actionSelection[0].cover_trigger_price}
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Previousdata;


import React from 'react';
import { Card } from "@windmill/react-ui";

const Previousdata = ({ stepperformData }) => {
  // For new strategy creation
  const strategyDesc = stepperformData?.strategyDesc || {};
  const symbolSelection = stepperformData?.symbolSelection || [];
  const actionSelection = stepperformData?.actionSelection || [];

  // For existing strategy
  const renderOldStrategyData = () => {
    return (
      <>
        {stepperformData.UniqueID && (
          <div className="mb-2">
            <span className="font-bold">Strategy ID:</span> {stepperformData.UniqueID}
          </div>
        )}
        {stepperformData.strategyName && (
          <div className="mb-2">
            <span className="font-bold">Strategy Name:</span> {stepperformData.strategyName}
          </div>
        )}
        {stepperformData.exchange && (
          <div className="mb-2">
            <span className="font-bold">Exchange:</span> {stepperformData.exchange}
          </div>
        )}
        {stepperformData.category && (
          <div className="mb-2">
            <span className="font-bold">Category:</span> {stepperformData.category}
          </div>
        )}
        {stepperformData.symbol && (
          <div className="mb-2">
            <span className="font-bold">Symbol:</span> {stepperformData.symbol}
          </div>
        )}
        {stepperformData.openValue && (
          <div className="mb-2">
            <span className="font-bold">Open Value:</span> {stepperformData.openValue}
          </div>
        )}
        {stepperformData.Quantity && (
          <div className="mb-2">
            <span className="font-bold">Quantity:</span> {stepperformData.Quantity}
          </div>
        )}
        {stepperformData.Action && (
          <div className="mb-2">
            <span className="font-bold">Action:</span> {stepperformData.Action}
          </div>
        )}
        {stepperformData.ActionType && (
          <div className="mb-2">
            <span className="font-bold">Order Type:</span> {stepperformData.ActionType}
          </div>
        )}
        {stepperformData.StartTime && (
          <div className="mb-2">
            <span className="font-bold">Start Time:</span> {stepperformData.StartTime}
          </div>
        )}
        {stepperformData.EndTime && (
          <div className="mb-2">
            <span className="font-bold">End Time:</span> {stepperformData.EndTime}
          </div>
        )}
        {stepperformData.StopLoss && (
          <div className="mb-2">
            <span className="font-bold">Stop Loss:</span> {stepperformData.StopLoss}
          </div>
        )}
        {stepperformData.StopProfit && (
          <div className="mb-2">
            <span className="font-bold">Stop Profit:</span> {stepperformData.StopProfit}
          </div>
        )}
        {stepperformData.TrailingStopPercent && (
          <div className="mb-2">
            <span className="font-bold">Trailing Stop Percent:</span> {stepperformData.TrailingStopPercent}
          </div>
        )}

        {stepperformData.ActionType === "Bracket" && (
          <>
            {stepperformData.BracketPriceAt && (
              <div className="mb-2">
                <span className="font-bold">Bracket Price At:</span> {stepperformData.BracketPriceAt}
              </div>
            )}
            {stepperformData.BracketStopLoss && (
              <div className="mb-2">
                <span className="font-bold">Bracket Stop Loss:</span> {stepperformData.BracketStopLoss}
              </div>
            )}
            {stepperformData.BracketTarget && (
              <div className="mb-2">
                <span className="font-bold">Bracket Target:</span> {stepperformData.BracketTarget}
              </div>
            )}
          </>
        )}
        {stepperformData.ActionType === "trigger" && (
          <>
            {stepperformData.TriggerPriceAt && (
              <div className="mb-2">
                <span className="font-bold">Trigger Price At:</span> {stepperformData.TriggerPriceAt}
              </div>
            )}
            {stepperformData.TriggerTriggerPrice && (
              <div className="mb-2">
                <span className="font-bold">Trigger Price:</span> {stepperformData.TriggerTriggerPrice}
              </div>
            )}
          </>
        )}
        {stepperformData.ActionType === "limit" && (
          <>
            {stepperformData.LimitPrice && (
              <div className="mb-2">
                <span className="font-bold">Limit Price:</span> {stepperformData.LimitPrice}
              </div>
            )}
          </>
        )}
        {stepperformData.ActionType === "cover" && (
          <>
            {stepperformData.CoverPrice && (
              <div className="mb-2">
                <span className="font-bold">Cover Price:</span> {stepperformData.CoverPrice}
              </div>
            )}
            {stepperformData.CoverStopLoss && (
              <div className="mb-2">
                <span className="font-bold">Cover Stop Loss:</span> {stepperformData.CoverStopLoss}
              </div>
            )}
            {stepperformData.CoverTriggerPrice && (
              <div className="mb-2">
                <span className="font-bold">Cover Trigger Price:</span> {stepperformData.CoverTriggerPrice}
              </div>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className="ml-16">
      <Card className="w-3/5 ml-5 rounded shadow">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Strategy Details:</h2>
          {Object.keys(strategyDesc).length > 0 || symbolSelection.length > 0 || actionSelection.length > 0 ? (
            <>
              {strategyDesc.strategy_id && (
                <div className="mb-2">
                  <span className="font-bold">Strategy ID:</span> {strategyDesc.strategy_id}
                </div>
              )}
              {strategyDesc.strategy_name && (
                <div className="mb-2">
                  <span className="font-bold">Strategy Name:</span> {strategyDesc.strategy_name}
                </div>
              )}
              {strategyDesc.description && (
                <div className="mb-2">
                  <span className="font-bold">Description:</span> {strategyDesc.description}
                </div>
              )}
              {symbolSelection.length > 0 && (
                <>
                  <div className="mb-2">
                    <span className="font-bold">Exchange:</span> {symbolSelection[0].exchange}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Category:</span> {symbolSelection[0].category}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Symbol:</span> {symbolSelection[0].symbol}
                  </div>
                </>
              )}
              {actionSelection.length > 0 && (
                <>
                  <div className="mb-2">
                    <span className="font-bold">Quantity:</span> {actionSelection[0].quantity}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Action:</span> {actionSelection[0].action}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Order Type:</span> {actionSelection[0].order_type}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Start Time:</span> {new Date(actionSelection[0].start_date).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">End Time:</span> {new Date(actionSelection[0].end_date).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Stop Loss:</span> {actionSelection[0].stoploss_percent}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold">Stop Profit:</span> {actionSelection[0].target_percent}
                  </div>
                  {actionSelection[0].ActionType === "Bracket" && (
                    <>
                      {actionSelection[0].bracket_price_at && (
                        <div className="mb-2">
                          <span className="font-bold">Bracket Price At:</span> {actionSelection[0].bracket_price_at}
                        </div>
                      )}
                      {actionSelection[0].bracket_stop_loss && (
                        <div className="mb-2">
                          <span className="font-bold">Bracket Stop Loss:</span> {actionSelection[0].bracket_stop_loss}
                        </div>
                      )}
                      {actionSelection[0].bracket_target && (
                        <div className="mb-2">
                          <span className="font-bold">Bracket Target:</span> {actionSelection[0].bracket_target}
                        </div>
                      )}
                    </>
                  )}
                  {actionSelection[0].ActionType === "trigger" && (
                    <>
                      {actionSelection[0].trigger_price_at && (
                        <div className="mb-2">
                          <span className="font-bold">Trigger Price At:</span> {actionSelection[0].trigger_price_at}
                        </div>
                      )}
                      {actionSelection[0].trigger_trigger_price && (
                        <div className="mb-2">
                          <span className="font-bold">Trigger Price:</span> {actionSelection[0].trigger_trigger_price}
                        </div>
                      )}
                    </>
                  )}
                  {actionSelection[0].ActionType === "limit" && (
                    <>
                      {actionSelection[0].limit_price && (
                        <div className="mb-2">
                          <span className="font-bold">Limit Price:</span> {actionSelection[0].limit_price}
                        </div>
                      )}
                    </>
                  )}
                  {actionSelection[0].ActionType === "cover" && (
                    <>
                      {actionSelection[0].cover_price && (
                        <div className="mb-2">
                          <span className="font-bold">Cover Price:</span> {actionSelection[0].cover_price}
                        </div>
                      )}
                      {actionSelection[0].cover_stop_loss && (
                        <div className="mb-2">
                          <span className="font-bold">Cover Stop Loss:</span> {actionSelection[0].cover_stop_loss}
                        </div>
                      )}
                      {actionSelection[0].cover_trigger_price && (
                        <div className="mb-2">
                          <span className="font-bold">Cover Trigger Price:</span> {actionSelection[0].cover_trigger_price}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            renderOldStrategyData()
          )}
        </div>
      </Card>
    </div>
  );
};

export default Previousdata;
