import React from 'react';

const InvestingChart = () => {
  return (
    <div>
      <iframe 
        src="https://ssltvc.investing.com/?pair_ID=1218461&height=580&width=1900&interval=300&plotStyle=area&domain_ID=1&lang_ID=1&timezone_ID=7"
        width="100%" 
        height="400" 
        frameBorder="0" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default InvestingChart;
