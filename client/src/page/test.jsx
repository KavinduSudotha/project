import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/test", { name, role, number });
      setMessage(response.data.message);
      setName('');
      setRole('');
      setNumber('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit data');
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Test;
