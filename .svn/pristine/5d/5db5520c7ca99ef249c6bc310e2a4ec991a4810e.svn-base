// import { useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { useTranslation } from "react-i18next";

// const BarChart = ({ salesReport }) => {
//   const [activeButton, setActiveButton] = useState({
//     title: "Sales",
//     color: "green",
//   });

//   const handleClick = ({ title, color }) => {
//     setActiveButton({ title, color });
//   };

//   const sortedSalesReport = salesReport?.sort((a, b) => new Date(a.date) - new Date(b.date));

//   const barOptions = {
//     data: {
//       labels: sortedSalesReport?.map((or) => or.date),
//       datasets: [
//         {
//           label: "Sales",
//           data: sortedSalesReport?.map((or) => or.total),
//           backgroundColor: "#10B981",
//           yAxisID: "y1",
//         },
//         {
//           label: "Orders",
//           data: sortedSalesReport?.map((or) => or.order),
//           backgroundColor: "#F97316",
//           yAxisID: "y2",
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y1: {
//           type: 'linear',
//           position: 'left',
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//         y2: {
//           type: 'linear',
//           position: 'right',
//           ticks: {
//             beginAtZero: true,
//           },
//           grid: {
//             drawOnChartArea: false, // only want the grid lines for one axis to show up
//           },
//         },
//       },
//     },
//     legend: {
//       display: false,
//     },
//   };

//   const { t } = useTranslation();

//   return (
//     <>
//       <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
//         <ul className="flex flex-wrap -mb-px">
//           <li className="mr-2">
//             <button
//               onClick={() => handleClick({ title: "Sales", color: "green" })}
//               type="button"
//               className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
//                 activeButton.title === "Sales"
//                   ? "text-green-600 border-green-600 dark:text-green-500 dark:border-green-500"
//                   : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//               }  focus:outline-none`}
//             >
//               {t("Sales")}
//             </button>
//           </li>

//           <li className="mr-2">
//             <button
//               onClick={() => handleClick({ title: "Orders", color: "red" })}
//               type="button"
//               className={`inline-block p-2 rounded-t-lg border-b-2 border-transparent ${
//                 activeButton.title === "Orders"
//                   ? "text-orange-500 border-orange-500 dark:text-orange-500 dark:border-orange-500"
//                   : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
//               }  focus:outline-none`}
//             >
//               {t("Orders")}
//             </button>
//           </li>
//         </ul>
//       </div>

//       <Bar {...barOptions} />
//     </>
//   );
// };

// export default BarChart;


// import { useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { useTranslation } from "react-i18next";

// const BarChart = ({ salesReport }) => {
//   const sortedSalesReport = salesReport?.sort((a, b) => new Date(a.date) - new Date(b.date));

//   const barData = {
//     labels: sortedSalesReport?.map((or) => or.date),
//     datasets: [
//       {
//         label: "Sales",
//         data: sortedSalesReport?.map((or) => or.total),
//         backgroundColor: sortedSalesReport?.map((or) => (or.total >= 0 ? "#10B981" : "#F97316")),
//         yAxisID: "y",
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//   };

//   const { t } = useTranslation();

//   return (
//     <>
//       <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4">
//         <ul className="flex flex-wrap -mb-px">
//           <li className="mr-2">
//             <button
//               type="button"
//               className="inline-block p-2 rounded-t-lg border-b-2 border-transparent text-green-600 border-green-600 dark:text-green-500 dark:border-green-500 focus:outline-none"
//             >
//               {t("Sales")}
//             </button>
//           </li>
//         </ul>
//       </div>

//       <Bar data={barData} options={barOptions} />
//     </>
//   );
// };

// export default BarChart;




// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart - Stacked',
//     },
//   },
//   responsive: true,
//   interaction: {
//     mode: 'index',
//     intersect: false,
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Dataset',
//         data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
//         backgroundColor: data.datasets[0].data.map(value => value >= 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'),
//       },
//     ],
//   };
// // const data = {
// //     labels: salesReport.map(entry => entry.date),
// //     datasets: [
// //       {
// //         label: 'Total Sales',
// //         data: salesReport.map(entry => entry.totalSales),
// //         backgroundColor: salesReport.map(entry => entry.totalSales >= 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'),
// //         borderColor: salesReport.map(entry => entry.totalSales >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// const BarChart = () => {
//   return <Bar options={options} data={data} />;
// };

// export default BarChart;




// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart - Stacked',
//     },
//   },
//   responsive: true,
//   interaction: {
//     mode: 'index',
//     intersect: false,
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Dataset',
//       data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
//       backgroundColor: labels.map(value => value >= 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'),
//     },
//   ],
// };

// const BarChart = () => {
//   return <Bar options={options} data={data} />;
// };

// export default BarChart;


import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  plugins: {
    title: {
      display: true,
    //   text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Strategy Performance',
      data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
      backgroundColor: labels.map(() => '#10B981'), // Initialize with default color for positive values
      barThickness: 20,
    },
  ],
};

// Loop through the data array and update background color for negative values
data.datasets[0].data.forEach((value, index) => {
  if (value < 0) {
    data.datasets[0].backgroundColor[index] = '#F97316'; // Red for negative values
  }
});

const BarChart = () => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
