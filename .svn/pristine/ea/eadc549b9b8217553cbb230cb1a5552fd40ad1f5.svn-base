import React from 'react';
import {
  Card,
  CardBody,
} from "@windmill/react-ui";
import { useListContext } from 'context/ListContext';

const indicatorParameters = {
  "Simple Moving Average": [
    // { name: 'min_ma', datatype: 'number' },
    // { name: 'max_ma', datatype: 'number' },
    { name: "short_term_period", Datatype: "number" },
    { name: "long_term_period", Datatype: "number" },
  ],
  "Relative Strength Index": [
    { name: 'overbought', datatype: 'text' },
    { name: 'oversold', datatype: 'text' },
    { name: 'period', datatype: 'text' },
  ],
  "Parabolic SAR": [
    { name: 'acceleration', datatype: 'text' },
    { name: 'maximum', datatype: 'text' },
  ],
  "Moving Average Convergence Divergence": [
    { name: 'short_period', datatype: 'number' },
    { name: 'long_period', datatype: 'number' },
    { name: 'signal_period', datatype: 'number' },
  ],
  "Exponential Moving Average": [
    { name: 'period', datatype: 'number' },
    { name: 'field', datatype: 'select', subproperties: ["open", "close", "high", "low"] },
  ],
};

const Counditioncard = () => {
  const { conditions } = useListContext();

  return (
    <div className="flex flex-wrap w-4/5">
    {/* {conditions.map((condition, index) => ( */}
    {Array.isArray(conditions) && conditions.map((condition, index) => (
      <Card key={index} className="w-80 mt-4 mx-4 border rounded-lg shadow-md flex-grow">
        <CardBody className="p-4 flex flex-wrap">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Condition {index + 1}</h2>
            {/* <p><strong>Condition Type:</strong> {condition.ConditionType}</p> */}
            <p className="mb-2"><strong>Indicator:</strong> {condition.Indicator}</p>
          </div>
          {indicatorParameters[condition.Indicator] && (
            <div className="w-full lg:w-1/2">
              <p className="mb-2"><strong>Parameters:</strong></p>
              <ul>
                {indicatorParameters[condition.Indicator].map((param, paramIndex) => (
                  <li key={paramIndex} className="flex items-center mb-1">
                    <span className="mr-1 font-semibold">{param.name}:</span>
                    <span>{condition[param.name]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>
    ))}
  </div>
  
  );
};

export default Counditioncard;






// import React from 'react';
// import PropTypes from 'prop-types'; // Import PropTypes
// import { Card, CardBody } from "@windmill/react-ui";
// import { useListContext } from 'context/ListContext';

// const indicatorOptions = {
//   1: "Simple Moving Average",
//   2: "Relative Strength Index",
//   3: "Parabolic SAR",
//   4: "Moving Average Convergence Divergence",
//   5: "Exponential Moving Average",
// };

// const indicatorParameters = {
//   "Simple Moving Average": [
//     { name: "short_term_period", datatype: "number" },
//     { name: "long_term_period", datatype: "number" },
//   ],
//   "Relative Strength Index": [
//     { name: 'overbought', datatype: 'text' },
//     { name: 'oversold', datatype: 'text' },
//     { name: 'period', datatype: 'text' },
//   ],
//   "Parabolic SAR": [
//     { name: 'acceleration', datatype: 'text' },
//     { name: 'maximum', datatype: 'text' },
//   ],
//   "Moving Average Convergence Divergence": [
//     { name: 'short_period', datatype: 'number' },
//     { name: 'long_period', datatype: 'number' },
//     { name: 'signal_period', datatype: 'number' },
//   ],
//   "Exponential Moving Average": [
//     { name: 'period', datatype: 'number' },
//     { name: 'field', datatype: 'select', subproperties: ["open", "close", "high", "low"] },
//   ],
// };

// const Counditioncard = () => {
//   const { conditions } = useListContext();

//   // Function to transform and group indicators into a single object
//   const transformAndGroupIndicators = (indicators) => {
//     const groupedData = {};

//     indicators.forEach(indicator => {
//       const indicatorName = indicator.Indicator || indicatorOptions[indicator.indicator_id] || 'Unknown Indicator';

//       if (!groupedData[indicatorName]) {
//         groupedData[indicatorName] = { Indicator: indicatorName };
//       }

//       if (indicator.param_name) {
//         // Data from rows with param_name and param_value
//         const parameter = indicatorParameters[indicatorName]?.find(param => param.name === indicator.param_name);
//         if (parameter) {
//           groupedData[indicatorName][indicator.param_name] = indicator.param_value;
//         }
//       } else {
//         // Data from rows without param_name (direct key-value)
//         Object.keys(indicator).forEach(key => {
//           if (indicatorParameters[indicatorName]?.some(param => param.name === key)) {
//             groupedData[indicatorName][key] = indicator[key];
//           }
//         });
//       }
//     });

//     return Object.values(groupedData); // Convert to array of objects for rendering
//   };

//   // Convert the conditions array to an array of transformed indicator data
//   const transformedConditions = Array.isArray(conditions) ? transformAndGroupIndicators(conditions) : [];

//   return (
//     <div className="flex flex-wrap w-4/5">
//       {transformedConditions.map((condition, index) => (
//         <Card key={index} className="w-80 mt-4 mx-4 border rounded-lg shadow-md flex-grow">
//           <CardBody className="p-4 flex flex-wrap">
//             <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Condition {index + 1}</h2>
//               <p className="mb-2"><strong>Indicator:</strong> {condition.Indicator}</p>
//             </div>
//             {indicatorParameters[condition.Indicator] && (
//               <div className="w-full lg:w-1/2">
//                 <p className="mb-2"><strong>Parameters:</strong></p>
//                 <ul>
//                   {indicatorParameters[condition.Indicator].map((param, paramIndex) => (
//                     <li key={paramIndex} className="flex items-center mb-1">
//                       <span className="mr-1 font-semibold">{param.name}:</span>
//                       <span>{condition[param.name] || 'N/A'}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </CardBody>
//         </Card>
//       ))}
//     </div>
//   );
// };

// Counditioncard.propTypes = {
//   conditions: PropTypes.arrayOf(PropTypes.shape({
//     str_indi_id: PropTypes.number,
//     strategy_id: PropTypes.number,
//     user_id: PropTypes.number,
//     indicator_id: PropTypes.number,
//     param_name: PropTypes.string,
//     param_value: PropTypes.string,
//     Indicator: PropTypes.string,
//     overbought: PropTypes.string,
//     oversold: PropTypes.string,
//     period: PropTypes.string,
//     field: PropTypes.string,
//     updated_by: PropTypes.string,
//     updated_date: PropTypes.string,
//   })),
// };

// export default Counditioncard;
