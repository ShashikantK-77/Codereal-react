// import React, { useState } from 'react';

// const PaperTrading = () => {
//   const [formData, setFormData] = useState({
//     strategy_id: '',
//     strategy_name: '',
//     description: '',
//     symbol: '',
//     isactive: false,
//     status: '',
//     last_execution_date: ''
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === 'checkbox' ? checked : value;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: val
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validation
//     if (!formData.strategy_id || !formData.strategy_name) {
//       alert('Please fill in Strategy ID and Strategy Name');
//       return;
//     }
//     try {
//       const response = await fetch('http://localhost:3001/api/strategy', {
//         method: 'post',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add new entry');
//       }
//       console.log("response", response);
//       alert('New entry added successfully');
//       // Clear form fields after successful submission
//       setFormData({
//         strategy_id: '',
//         strategy_name: '',
//         description: '',
//         symbol: '',
//         isactive: false,
//         status: '',
//         last_execution_date: ''
//       });
//     } catch (error) {
//       console.error('Error adding new entry:', error);
//       alert('Error adding new entry');
//     }
//   };

//   return (
//     <div className="paper-trading-container">
//       <h2>Add New Strategy</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="strategy_id">Strategy ID:</label>
//           <input type="text" id="strategy_id" name="strategy_id" value={formData.strategy_id} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="strategy_name">Strategy Name:</label>
//           <input type="text" id="strategy_name" name="strategy_name" value={formData.strategy_name} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
//         </div>
//         <div className="form-group">
//           <label htmlFor="symbol">Symbol:</label>
//           <input type="text" id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="isactive">Is Active:</label>
//           <input type="checkbox" id="isactive" name="isactive" checked={formData.isactive} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="status">Status:</label>
//           <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="last_execution_date">Last Execution Date:</label>
//           <input type="date" id="last_execution_date" name="last_execution_date" value={formData.last_execution_date} onChange={handleChange} />
//         </div>
//         <button type="submit">Add Strategy</button>
//       </form>
//     </div>
//   );
// };

// export default PaperTrading;



import React, { useState } from 'react';
import { Input, Label, Textarea, Checkbox, Button } from '@windmill/react-ui';

const PaperTrading = () => {
  const [formData, setFormData] = useState({
    strategy_id: '',
    strategy_name: '',
    description: '',
    symbol: '',
    isactive: false,
    status: '',
    last_execution_date: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.strategy_id || !formData.strategy_name) {
      alert('Please fill in Strategy ID and Strategy Name');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/strategy', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add new entry');
      }
      console.log("response", response);
      alert('New entry added successfully');
      // Clear form fields after successful submission
      setFormData({
        strategy_id: '',
        strategy_name: '',
        description: '',
        symbol: '',
        isactive: false,
        status: '',
        last_execution_date: ''
      });
    } catch (error) {
      console.error('Error adding new entry:', error);
      alert('Error adding new entry');
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Strategy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="strategy_id">Strategy ID:</Label>
          <Input type="text" id="strategy_id" name="strategy_id" value={formData.strategy_id} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="strategy_name">Strategy Name:</Label>
          <Input type="text" id="strategy_name" name="strategy_name" value={formData.strategy_name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description">Description:</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange}></Textarea>
        </div>
        <div>
          <Label htmlFor="symbol">Symbol:</Label>
          <Input type="text" id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} />
        </div>
        <div>
          {/* <Checkbox id="isactive" name="isactive" checked={formData.isactive} onChange={handleChange}>
            <span className="ml-2">Is Active</span>
          </Checkbox> */}
        </div>
        <div>
          <Label htmlFor="status">Status:</Label>
          <Input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="last_execution_date">Last Execution Date:</Label>
          <Input type="date" id="last_execution_date" name="last_execution_date" value={formData.last_execution_date} onChange={handleChange} />
        </div>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Strategy</Button>
      </form>
    </div>
  );
};

export default PaperTrading;
