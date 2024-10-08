import React from 'react';
import { FiInfo } from 'react-icons/fi';

const Help = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-4">Help</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Strategy Building</h2>
        <p className="text-gray-700">
          Need assistance with building a strategy? Check out our step-by-step guide to create and customize strategies efficiently.
        </p>
        {/* Add more strategy-building guidance */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Using Templates</h2>
        <p className="text-gray-700">
          Explore our collection of ready-to-use templates and learn how to leverage them effectively for your trading strategies.
        </p>
        {/* Add more information about using templates */}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Support</h2>
        <p className="text-gray-700">
          Have questions or need further assistance? Contact our support team at support@company.com for help.
        </p>
        {/* Include contact information or support details */}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">FAQs</h2>
        <p className="text-gray-700">
          Check out our frequently asked questions section for answers to common queries about our strategy-building platform.
        </p>
        {/* Add frequently asked questions */}
      </section>

      {/* You can include more sections with helpful information */}
    </div>
  );
};

export default Help;
