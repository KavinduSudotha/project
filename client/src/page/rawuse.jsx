import React, { useState, useEffect } from 'react';

const UseRaw = () => {
  // State variables for form fields
  const [selectedLog, setSelectedLog] = useState('');
  const [searchRawId, setSearchRawId] = useState('');
  const [useRawId, setUseRawId] = useState('');
  const [weight, setWeight] = useState('');
  const [fineDust, setFineDust] = useState('');
  const [fiber, setFiber] = useState('');
  const [jobId, setJobId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dateTime, setDateTime] = useState('');

  // Sample recent use logs data (replace with actual data fetched from the backend)
  const recentUseLogs = [
    { id: '1', employeeName: 'John Doe', type: 'Type A' },
    { id: '2', employeeName: 'Jane Smith', type: 'Type B' },
    // Add more logs as needed
  ];

  // Function to get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    return `${date} ${time}`;
  };

  useEffect(() => {
    // Set initial values for Employee ID and Date & Time when the component mounts
    setEmployeeId('12345'); // Replace '12345' with the actual employee ID fetched from the backend
    setDateTime(getCurrentDateTime());
  }, []);

  // Function to handle log selection
  const handleLogSelect = (logId) => {
    setSelectedLog(logId);
    // Fetch log details from the backend based on logId and set the form fields
    // This is just a placeholder, actual implementation will depend on your backend setup
  };

  // Function to handle search button click
  const handleSearch = () => {
    // Fetch use raw details based on searchRawId and set the form fields
    // This is just a placeholder, actual implementation will depend on your backend setup
  };

  // Function to handle update button click
  const handleUpdate = () => {
    // Fetch use raw details based on useRawId and set the form fields for editing
    // This is just a placeholder, actual implementation will depend on your backend setup
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the backend
    // This is just a placeholder, actual implementation will depend on your backend setup
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">To Use Raw Materials</h1>

      {/* Update Use Raw Section */}
      <div className="bg-blue-100 p-6 rounded-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Update Use Raw</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Recent Use Logs</label>
          <select value={selectedLog} onChange={(e) => handleLogSelect(e.target.value)} className="border p-2 rounded w-full">
            <option value="">Select Log</option>
            {recentUseLogs.map((log) => (
              <option key={log.id} value={log.id}>{`${log.id} - ${log.employeeName} (${log.type})`}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Search Use Raw ID</label>
          <div className="flex">
            <input type="text" value={searchRawId} onChange={(e) => setSearchRawId(e.target.value)} className="border p-2 rounded mr-2" />
            <button onClick={handleSearch} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Search</button>
          </div>
        </div>
        <button onClick={handleUpdate} disabled={!useRawId} className={`bg-green-500 text-white font-semibold py-2 px-4 rounded ${!useRawId && 'opacity-50 cursor-not-allowed'}`}>Update</button>
     </div>

      {/* Add Use Raw Section */}
      <div className="bg-green-100 p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Add Use Raw</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Use Raw ID</label>
            <input type="text" value={useRawId} onChange={(e) => setUseRawId(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Weight</label>
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fine Dust</label>
            <input type="text" value={fineDust} onChange={(e) => setFineDust(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fiber</label>
            <input type="text" value={fiber} onChange={(e) => setFiber(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Job ID</label>
            <input type="text" value={jobId} onChange={(e) => setJobId(e.target.value)} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Employee ID</label>
            <input type="text" value={employeeId} disabled className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Date & Time</label>
            <input type="text" value={dateTime} disabled className="border p-2 rounded w-full" />
          </div>
          <div className="col-span-2">
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UseRaw;
