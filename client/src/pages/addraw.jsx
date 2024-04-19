import React, { useState } from 'react';

const RawPage = () => {
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('');
  const [chipSize, setChipSize] = useState('');
  const [fiberLevel, setFiberLevel] = useState('');
  const [fineDustLevel, setFineDustLevel] = useState('');
  const [moch, setMoch] = useState('');
  const [EC, setEC] = useState('');
  const [PH, setPH] = useState('');
  const [density, setDensity] = useState('');
  const [moisture, setMoisture] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value === 'chip') {
      // Reset chip size when switching to chip type
      setChipSize('');
    }
  };

  const handleAdd = () => {
    // Here, you can handle saving the input values
    // For now, let's just log them to the console
    console.log({
      weight,
      type,
      chipSize,
      fiberLevel,
      fineDustLevel,
      moch,
      EC,
      PH,
      density,
      moisture,
      supplierName,
      vehicleNumber,
      phoneNumber
    });

    // Clear all input fields after adding
    setWeight('');
    setType('');
    setChipSize('');
    setFiberLevel('');
    setFineDustLevel('');
    setMoch('');
    setEC('');
    setPH('');
    setDensity('');
    setMoisture('');
    setSupplierName('');
    setVehicleNumber('');
    setPhoneNumber('');
  };

  const handleClear = () => {
    // Reset all input fields
    setWeight('');
    setType('');
    setChipSize('');
    setFiberLevel('');
    setFineDustLevel('');
    setMoch('');
    setEC('');
    setPH('');
    setDensity('');
    setMoisture('');
    setSupplierName('');
    setVehicleNumber('');
    setPhoneNumber('');
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Raw Details</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="weight" className="block mb-1">Weight of Raw:</label>
          <input type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="type" className="block mb-1">Type:</label>
          <select id="type" value={type} onChange={handleTypeChange} className="border border-gray-300 px-2 py-1 rounded-md w-full">
            <option value="">Select Type</option>
            <option value="fiber">Fiber</option>
            <option value="chip">Chip</option>
          </select>
        </div>
        {type === 'chip' && (
          <div>
            <label htmlFor="chipSize" className="block mb-1">Chip Size:</label>
            <select id="chipSize" value={chipSize} onChange={(e) => setChipSize(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full">
              <option value="">Select Chip Size</option>
              <option value="9mm">9mm</option>
              <option value="11mm">11mm</option>
            </select>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="fiberLevel" className="block mb-1">Fiber Level:</label>
          <input type="text" id="fiberLevel" value={fiberLevel} onChange={(e) => setFiberLevel(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="fineDustLevel" className="block mb-1">Fine Dust Level:</label>
          <input type="text" id="fineDustLevel" value={fineDustLevel} onChange={(e) => setFineDustLevel(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="moch" className="block mb-1">Moch:</label>
          <input type="text" id="moch" value={moch} onChange={(e) => setMoch(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="EC" className="block mb-1">EC:</label>
          <input type="text" id="EC" value={EC} onChange={(e) => setEC(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="PH" className="block mb-1">PH:</label>
          <input type="text" id="PH" value={PH} onChange={(e) => setPH(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="density" className="block mb-1">Density:</label>
          <input type="text" id="density" value={density} onChange={(e) => setDensity(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="moisture" className="block mb-1">Moisture:</label>
          <input type="text" id="moisture" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <hr className="my-8" />
      <h2 className="text-xl font-bold mb-4">Supplier Details</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="supplierName" className="block mb-1">Name of Supplier:</label>
          <input type="text" id="supplierName" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
        <div>
          <label htmlFor="vehicleNumber" className="block mb-1">Vehicle Number:</label>
          <input type="text" id="vehicleNumber" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">Phone Number:</label>
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="border border-gray-300 px-2 py-1 rounded-md w-full" />
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
        <button onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded-md">Clear</button>
      </div>
    </div>
  );
};

export default RawPage;
