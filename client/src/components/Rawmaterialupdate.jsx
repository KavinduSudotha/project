// RawMaterialUpdate.js
import React, { useState } from 'react';

const Rawmaterialupdate = ({ onSubmit }) => {
  const [fineDust, setFineDust] = useState('');
  const [fiber, setFiber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fineDust, fiber });
    setFineDust('');
    setFiber('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-4">
      <div className="mb-4">
        <label htmlFor="fineDust" className="block text-gray-700">Fine Dust</label>
        <input type="text" id="fineDust" value={fineDust} onChange={(e) => setFineDust(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <div className="mb-4">
        <label htmlFor="fiber" className="block text-gray-700">Fiber</label>
        <input type="text" id="fiber" value={fiber} onChange={(e) => setFiber(e.target.value)} className="form-input mt-1 block w-full" />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
};

export default Rawmaterialupdate;
