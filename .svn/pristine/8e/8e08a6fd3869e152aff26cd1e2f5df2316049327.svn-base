import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import exampleSVG from '../../assets/img/cash-payment-6401.svg'; 

const AnimatedButton = () => {
  const [selectedPlan, setSelectedPlan] = useState('');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const plans = [
    { duration: '1 month', price: 500, discountPercentage: 0 },
    { duration: '3 months', price: 950, discountPercentage: 5 },
    { duration: '6 months', price: 900, discountPercentage: 10 },
    { duration: '1 year', price: 800, discountPercentage: 20 },
  ];

  return (
    <div className="flex flex-col justify-center">
      {/* SVG Image */}
      <div className="flex justify-center items-center mb-4">
        <img
          src={exampleSVG}
          alt="SVG Image"
          className="w-20 h-20"
        />
      </div>
      
      {/* Plan Selection */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Select Plan For Strategy:</h2>
        <div className="flex flex-col space-y-4">
          {plans.map((plan, index) => (
            <label key={index} className="flex flex-col items-start p-4 border-2 border-blue-500 rounded-md">
              <input
                type="radio"
                name="plan"
                value={plan.duration}
                checked={selectedPlan === plan.duration}
                onChange={() => handlePlanChange(plan.duration)}
                className="mr-2"
              />
              <div className="flex justify-between w-full">
                <span className="font-semibold">{plan.duration}</span>
                <span className="text-gray-500">{`Original Price: ${plan.price}/-`}</span>
              </div>
              <div className="flex justify-between w-full">
                <span className="text-green-500 text-xs font-bold">{` ${plan.discountPercentage}% off`}</span>
                <span className="font-semibold  text-red-600 ml-4">{`Discounted Price: ${plan.price - (plan.price * plan.discountPercentage) / 100}/-`}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      {/* Payment Button */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        {/* Payment button */}
        <Link to="payment">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnimatedButton;
