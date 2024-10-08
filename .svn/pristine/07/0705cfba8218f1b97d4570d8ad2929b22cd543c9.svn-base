import HeadKyc from 'components/KYC/HeadKyc'
import CustomerTable from 'components/customer/CustomerTable'
import Status from 'components/table/Status'
import React from 'react'

const PaperTrading = () => {
  const data = [
    { symbol: 'AAPL', side: 'Buy', type: 'Market', qty: 100, price: 120.20, fillPrice: 150.25, status: 'new' },
    { symbol: 'GOOG', side: 'Sell', type: 'Limit', qty: 50, price: 200.50, fillPrice: 199.75, status: 'accepted' },
    { symbol: 'MSFT', side: 'Buy', type: 'Market', qty: 75, price: 130.25, fillPrice: 300.30, status: 'filled' },
    // Add more dummy data as needed
  ];
  return (
    <div>
    <HeadKyc title="Paper Trading"/>
    <div className='mr-8 space-y-4'>
    <Status status="new"/>
    <Status status="pending_new"/>
    <Status status="accepted"/>
    <Status status="filled"/>
    </div>
    <div className="shadow-md rounded-lg overflow-hidden mt-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Side</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fill Price</th>
            <th className="px-6 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-6 py-4 whitespace-nowrap">{item.symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.side}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.qty}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.fillPrice}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{item.status}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">
              <Status status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default PaperTrading