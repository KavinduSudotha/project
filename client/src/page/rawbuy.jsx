import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const RawBuy = () => {
  const [rawMaterialType, setRawMaterialType] = useState('');
  const [wastageLevel, setWastageLevel] = useState('');
  const [density, setDensity] = useState('');
  const [sand, setSand] = useState('');
  const [totalWeight, setTotalWeight] = useState('');
  const [buyingPricePerKg, setBuyingPricePerKg] = useState('');
  const [totalBuyingPrice, setTotalBuyingPrice] = useState('');

  const handleRawMaterialTypeChange = (event) => {
    setRawMaterialType(event.target.value);
  };

  const handleWastageLevelChange = (event) => {
    setWastageLevel(event.target.value);
  };

  const handleDensityChange = (event) => {
    setDensity(event.target.value);
  };

  const handleSandChange = (event) => {
    setSand(event.target.value);
  };

  const handleTotalWeightChange = (event) => {
    setTotalWeight(event.target.value);
  };

  const handleBuyingPricePerKgChange = (event) => {
    setBuyingPricePerKg(event.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
  };

  const handleCancel = () => {
    // Add your cancel logic here
    setRawMaterialType('');
    setWastageLevel('');
    setDensity('');
    setSand('');
    setTotalWeight('');
    setBuyingPricePerKg('');
    setTotalBuyingPrice('');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">To Buy Raw Materials</h1>
      <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel id="raw-material-type-label">Raw Material Type</InputLabel>
        <Select
          labelId="raw-material-type-label"
          id="raw-material-type"
          value={rawMaterialType}
          onChange={handleRawMaterialTypeChange}
          label="Raw Material Type"
        >
          <MenuItem value="chip">Chip</MenuItem>
          <MenuItem value="cocopeat">Cocopeat</MenuItem>
        </Select>
      </FormControl>
      {rawMaterialType === 'chip' && (
        <div className="mb-4">
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel id="wastage-level-label">Wastage Level</InputLabel>
            <Select
              labelId="wastage-level-label"
              id="wastage-level"
              value={wastageLevel}
              onChange={handleWastageLevelChange}
              label="Wastage Level"
            >
              {/* Add wastage level options */}
            </Select>
          </FormControl>
        </div>
      )}
      {rawMaterialType === 'cocopeat' && (
        <div className="mb-4">
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel id="density-label">Density</InputLabel>
            <Select
              labelId="density-label"
              id="density"
              value={density}
              onChange={handleDensityChange}
              label="Density"
            >
              {/* Add density options */}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel id="sand-label">Sand</InputLabel>
            <Select
              labelId="sand-label"
              id="sand"
              value={sand}
              onChange={handleSandChange}
              label="Sand"
            >
              {/* Add sand options */}
            </Select>
          </FormControl>
        </div>
      )}
      <TextField
        label="Total Weight"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={totalWeight}
        onChange={handleTotalWeightChange}
      />
      <TextField
        label="Buying Price Per 1Kg"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={buyingPricePerKg}
        onChange={handleBuyingPricePerKgChange}
      />
      <TextField
        label="Total Buying Price"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={totalBuyingPrice}
        onChange={(event) => setTotalBuyingPrice(event.target.value)}
      />
      <div className="flex justify-end">
        <Button variant="contained" onClick={handleCancel} className="mr-2">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
      </div>
    </div>
  );
};

export default RawBuy;
