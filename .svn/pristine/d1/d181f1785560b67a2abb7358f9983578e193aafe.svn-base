

import React, { useState } from 'react';

const Payment = () => {
  const [selectedTab, setSelectedTab] = useState(''); // State to manage selected tab

  // Function to handle tab selection
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    // Additional logic to fetch/display respective payment options based on selected tab
  };

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-full  px-4 py-8">
      {/* First Column - Tabs */}
      <div className="md:w-1/6 p-5 bg-gray-100">
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4">Payment Options</h2>
          {/* Tabs */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleTabChange('upi')}
              className={`w-full rounded py-2 px-4 border ${
                selectedTab === 'upi'
                  ? 'bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              UPI
            </button>

            <button
              onClick={() => handleTabChange('NetBanking')}
              className={`w-full rounded py-2 px-4 border ${
                selectedTab === 'NetBanking'
                  ? 'bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Net Banking
            </button>

            <button
              onClick={() => handleTabChange('Card')}
              className={`w-full rounded py-2 px-4 border ${
                selectedTab === 'Card'
                  ? 'bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Card
            </button>

            <button
              onClick={() => handleTabChange('Wallet')}
              className={`w-full rounded py-2 px-4 border ${
                selectedTab === 'Wallet'
                  ? 'bg-blue-500 text-white'
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              Wallet
            </button>
            {/* Add more tabs for credit card, cash, wallet, etc. */}
          </div>
        </div>
      </div>

      {/* Second Column - Payment Options */}
      <div className="md:w-3/6 p-5">
        <h2 className="text-xl font-semibold mb-4">Select Payment Option</h2>
        {/* Display payment options based on selected tab */}
        {/* For example, display UPI options if selectedTab === 'upi' */}

        {selectedTab === '' && (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-lg font-semibold mb-4">Please Select Payment Method</h2>
    {/* Cash Payment Options */}
    <div className="flex items-center justify-center">

    <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/question-inquiry-icon.png" alt="paymentmethod" className="h-24" />


      {/* You can also use text instead of images/icons */}
      {/* <span className="ml-2 text-xl font-semibold">Cash</span> */}
    </div>
  </div>
)}


        {selectedTab === 'upi' && (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-lg font-semibold mb-4">Select UPI Payment Method</h2>
    {/* UPI Payment Options */}
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {/* SVG icons or images representing UPI platforms */}
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png" alt="GPay" className=" h-6" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/phonepe-logo-icon.png" alt="PhonePe" className=" h-6" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png" alt="PhonePe" className=" h-6" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/bhim-app-icon.png" alt="PhonePe" className=" h-6" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/amazon-pay-icon.png" alt="PhonePe" className=" h-6" />

      {/* Add more UPI payment icons or images as needed */}
      <div className='mt-4'>
      <input type="text" placeholder="Enter UPI ID" className="border p-2 rounded-md" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </div>
    </div>
  </div>
)}


{selectedTab === 'NetBanking' && (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-lg font-semibold mb-4">Select NetBanking Payment</h2>
    {/* Cash Payment Options */}
    <div className="flex items-center justify-center">
      {/* SVG icon or image for Cash */}
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/online-card-payment-icon.png" alt="Cash" className="w-12 h-12" />
      {/* You can also use text instead of images/icons */}
      <span className="ml-2 text-xl font-semibold">NetBanking</span>
    </div>
  </div>
)}

{selectedTab === 'Wallet' && (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-lg font-semibold mb-4">Select Wallet Payment</h2>
    {/* Wallet Payment Options */}
    <div className="flex items-center justify-center">
      {/* SVG icon or image for Wallet */}
      <img src="https://freesvg.org/img/wallet-or-pocket-book.png" alt="Wallet" className="w-12 h-12" />
      {/* You can also use text instead of images/icons */}
      <span className="ml-2 text-xl font-semibold">Wallet</span>
    </div>
  </div>
)}

{selectedTab === 'Card' && (
  <div className="bg-gray-100 p-4 rounded-md">
    <h2 className="text-lg font-semibold mb-4">Select Card Payment</h2>
    {/* Wallet Payment Options */}
    <div className="flex items-center justify-center">
      {/* SVG icon or image for Wallet */}
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/master-card-icon.png" alt="Wallet" className="w-12 h-12" />
      {/* You can also use text instead of images/icons */}
      <span className="ml-2 text-xl font-semibold">Card</span>
    </div>
  </div>
)}
        {/* Add other payment option sections */}
      </div>

      {/* Third Column - Invoice Details */}
      <div className="md:w-2/6 p-5">
        <h2 className="text-xl font-semibold mb-4">Your Invoice Details</h2>
        <div className="bg-gray-100 p-4 rounded-md">
  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
  <div className="border-b border-gray-300 pb-4 mb-4">
    {/* Display strategy details */}
    <p className="text-gray-600 mb-2">Strategy Name: Short Straddle - 2 Leg</p>
    <p className="text-gray-600 mb-2">Symbol: Nifty Bank</p>
    {/* Add more strategy details */}
  </div>

  <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
  <div className="border-b border-gray-300 pb-4 mb-4">
    {/* Display payment information */}
    <p className="text-gray-600 mb-2">Total Amount: $500</p>
    <p className="text-gray-600 mb-2">Payment Method: UPI</p>
    {/* Add more payment details */}
  </div>

  <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
  <div>
    {/* Display billing details */}
    <p className="text-gray-600 mb-2">Name: John Doe</p>
    <p className="text-gray-600 mb-2">Email: john@example.com</p>
    {/* Add more billing details */}
  </div>
</div>

      </div>
    </div>
  );
};

export default Payment;



