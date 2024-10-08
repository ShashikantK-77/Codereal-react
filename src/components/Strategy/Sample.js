// import React from 'react'

// const sample = () => {
//   return (
//     <div>sample</div>
//   )
// }

// export default sample



import React, { useState } from 'react';

const Sample = () => {
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num1, num2 }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number 1:
          <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
        </label>
        <br />
        <label>
          Number 2:
          <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Numbers</button>
      </form>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default Sample;
