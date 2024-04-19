// RawMaterialForm.js
import React, { useState } from 'react';

const Rawmaterialform = ({ onSubmit }) => {
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [jobId, setJobId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ weight, type, date, jobId });
    setWeight('');
    setType('');
    setDate('');
    setJobId('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4">
      <div className="mb-4">
        <label htmlFor="weight" className="block text-gray-700">Weight</label>
        <input type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700">Type</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700">Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="jobId" className="block text-gray-700">Job ID</label>
        <input type="text" id="jobId" value={jobId} onChange={(e) => setJobId(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default Rawmaterialform;
