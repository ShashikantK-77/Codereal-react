// Announcements.js
import React from 'react';
import PageTitle from 'components/Typography/PageTitle';

const Announcements = () => {
  // Mock data for announcements (replace it with actual data)
  const announcementsData = [
    { id: 1, title: 'Exciting News!', content: 'We are thrilled to share some exciting news with you.' },
    { id: 2, title: 'Holiday Specials', content: 'Explore our special holiday offers and promotions.' },
    { id: 3, title: 'Community Update', content: 'Learn about recent community events and updates.' },
    // Add more mock announcements as needed
  ];

  return (
    <div>
      <PageTitle>Announcements</PageTitle>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {announcementsData.map((announcement) => (
          <div key={announcement.id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-3 text-green-600">{announcement.title}</h2>
            <p className="text-gray-700">{announcement.content}</p>
            {/* Add more announcement details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
