// OpenTickets.js
import PageTitle from 'components/Typography/PageTitle';
import Status from 'components/table/Status';
import React from 'react';



const Tickets = () => {
  // Mock data for open tickets (replace it with actual data)
  const openTicketsData = [
    { id: 1, title: 'Issue with login functionality', status: 'Open' },
    { id: 2, title: 'Error in payment processing', status: 'Open' },
    // Add more mock tickets as needed
  ];

  return (
    <div>
      <PageTitle>Open Tickets</PageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {openTicketsData.map((ticket) => (
          <div key={ticket.id} className="bg-white p-4 rounded shadow-md">
            <div className="mb-2">
              <strong>Ticket ID:</strong> #{ticket.id}
            </div>
            <div className="mb-2">
              <strong>Title:</strong> {ticket.title}
            </div>
            <div className="mb-2">
             
              <Status status={ticket.status} />
            </div>
            {/* Add more ticket details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
