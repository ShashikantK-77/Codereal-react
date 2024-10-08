// // TradingViewWidget.jsx
// import React, { useEffect, useRef, memo } from 'react';

// function TradingViewWidget() {
//   const container = useRef();

//   useEffect(
//     () => {
//       const script = document.createElement("script");
//       script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//       script.type = "text/javascript";
//       script.async = true;
//       script.innerHTML = `
//         {
//           "autosize": true,
//           "symbol": "NASDAQ:AAPL",
//           "interval": "D",
//           "timezone": "Etc/UTC",
//           "theme": "light",
//           "style": "1",
//           "locale": "en",
//           studies: [
//           "RSI@tv-basicstudies",        // Relative Strength Index (RSI)
//           "MACD@tv-basicstudies",       // Moving Average Convergence Divergence (MACD)
//           "BB@tv-basicstudies",         // Bollinger Bands
//           "MAExp@tv-basicstudies",      // Exponential Moving Average
//         ], // List of indicators
//           "allow_symbol_change": true,
//           "calendar": false,
//           "support_host": "https://www.tradingview.com"
//         }`;
//       container.current.appendChild(script);
//     },
//     []
//   );

//   return (
//     <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
//       <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 432px)", width: "100%" }}></div>
//       <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
//     </div>
//   );
// }

// export default memo(TradingViewWidget);



// TradingViewWidget.jsx
// import React, { useEffect, useRef } from 'react';

// const TradingViewWidget = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Ensure TradingView is available in the window
//     if (containerRef.current && window.TradingView) {
//       const widgetOptions = {
//         symbol: "NASDAQ:AAPL", // Stock symbol to display
//         interval: "D", // Time interval, "D" means daily
//         timezone: "Etc/UTC", // Timezone setting
//         theme: "light", // Widget theme (light/dark)
//         style: "1", // Chart style (candlestick, etc.)
//         locale: "en", // Locale setting for language
//         studies: [
//           "RSI@tv-basicstudies",        // Relative Strength Index (RSI)
//           "MACD@tv-basicstudies",       // Moving Average Convergence Divergence (MACD)
//           "BB@tv-basicstudies",         // Bollinger Bands
//           "MAExp@tv-basicstudies",      // Exponential Moving Average
//         ], // List of indicators
//         container_id: "tradingview_chart", // The container ID
//         width: "100%", // Full width
//         height: "500px", // Chart height
//         allow_symbol_change: true, // Allow changing the stock symbol
//         save_image: false, // Disable saving chart images
//       };

//       // Create a new widget inside the container
//       new window.TradingView.widget(widgetOptions);
//     }
//   }, []); // Empty dependency array to run once on mount

//   return (
//     <div>
//       <div id="tradingview_chart" ref={containerRef}></div>
//     </div>
//   );
// };

// export default TradingViewWidget;





// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "calendar": false,
          "studies": [
            "STD;MACD",
            "STD;EMA",
            "STD;SMA",
            "STD;RSI"
          ],
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 132px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);


// import React, { useEffect, useRef } from 'react';
// // import { widget } from '../../charting_library'; // Path to your charting_library directory

// const TradingViewWidget = () => {
//   const chartContainerRef = useRef(null);
  

//   useEffect(() => {
//     const widgetOptions = {
//       symbol: 'NASDAQ:AAPL',
//       interval: 'D',
//       container: chartContainerRef.current,
//       library_path: '/charting_library/', // Ensure the correct path to the library
//       locale: 'en',
//       timezone: 'Etc/UTC',
//       theme: 'light',
//       style: '1',
//       allow_symbol_change: true,
//       autosize: true,
//       studies_overrides: {},
//     };

//     const tvWidget = new widget(widgetOptions);

//     tvWidget.onChartReady(() => {
//       // Add RSI Indicator
//       tvWidget.createStudy('RSI', false, false, [14], null, {
//         "RSI.linewidth": 2,
//         "RSI.color": "#FF0000"
//       });

//       // Add MACD Indicator
//       tvWidget.createStudy('MACD', false, false, [12, 26, 9], null, {
//         "MACD.linewidth": 2,
//         "MACD.MACD.color": "#00FF00",
//         "MACD.signal.color": "#0000FF",
//         "MACD.histogram.color": "#FF00FF"
//       });

//       // Add EMA (Exponential Moving Average) Indicator
//       tvWidget.createStudy('Moving Average Exponential', false, false, [9], null, {
//         "plot.color": "#FFA500",
//         "plot.linewidth": 2
//       });

//       // Add SMA (Simple Moving Average) Indicator
//       tvWidget.createStudy('Moving Average', false, false, [50], null, {
//         "plot.color": "#00FF00",
//         "plot.linewidth": 2
//       });
//     });

//     return () => {
//       if (tvWidget) {
//         tvWidget.remove();
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={chartContainerRef}
//       className="tradingview-widget-container"
//       style={{ height: '500px', width: '100%' }}
//     />
//   );
// };

// export default TradingViewWidget;
