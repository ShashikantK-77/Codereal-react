import React, { useEffect, useRef } from 'react';

const TradingViewWidgetb = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const widgetOptions = {
        symbol: "NASDAQ:AAPL", // Replace with the symbol you want
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        studies: [
          "RSI@tv-basicstudies",        // Relative Strength Index (RSI)
          "MACD@tv-basicstudies",       // Moving Average Convergence Divergence (MACD)
          "BB@tv-basicstudies",         // Bollinger Bands
          "MAExp@tv-basicstudies",      // Exponential Moving Average
        ],
        container_id: "tradingview_chart"
      };

      new window.TradingView.widget({
        ...widgetOptions,
        width: "100%",
        height: "500px",
      });
    }
  }, []);

  return (
    <div>
      <div id="tradingview_chart" ref={containerRef}></div>
    </div>
  );
};

export default TradingViewWidgetb;
