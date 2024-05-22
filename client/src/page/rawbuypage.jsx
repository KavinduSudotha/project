import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const BackendBaseUrl = 'http://localhost:3001/pricelist'; // Update this with your actual backend base URL

const RawBuyForm = () => {
  const [date, setDate] = useState('');
  const [rawType, setRawType] = useState('');
  const [type, setType] = useState('');
  const [wastageDeduction, setWastageDeduction] = useState('');
  const [density, setDensity] = useState('');
  const [sandPercentage, setSandPercentage] = useState('');
  const [suggestPrice, setSuggestPrice] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const isCalculateButtonEnabled = () => {
    if (rawType === 'Coco Chips') {
      return type && wastageDeduction;
    } else if (rawType === 'Cocopeat') {
      return type && density && sandPercentage;
    }
    return false;
  };

  const handleCalculate = async () => {
    try {
      // Call backend API to calculate suggest price
      const response = await axios.post(`${BackendBaseUrl}/pricecal`, {
        rawType,
        type,
        wastageDeduction,
        density,
        sandPercentage,
      });
      setSuggestPrice(response.data.suggestPrice);
    } catch (error) {
      console.error('Error calculating suggest price:', error);
    }
  };

  const handleBuy = async () => {
    try {
      // Call backend API to save data
      await axios.post(`${BackendBaseUrl}/buyrecord`, {
        date,
        rawType,
        type,
        wastageDeduction,
        density,
        sandPercentage,
        suggestPrice,
        buyPrice,
        quantity,
      });
      console.log('Data Saved Successfully');
      // Clear form fields after successful save
      clearForm();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const clearForm = () => {
    setDate('');
    setRawType('');
    setType('');
    setWastageDeduction('');
    setDensity('');
    setSandPercentage('');
    setSuggestPrice('');
    setBuyPrice('');
    setQuantity('');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Raw Type</InputLabel>
        <Select value={rawType} onChange={(e) => setRawType(e.target.value)}>
          <MenuItem value="Coco Chips">Coco Chips</MenuItem>
          <MenuItem value="Cocopeat">Cocopeat</MenuItem>
        </Select>
      </FormControl>
      {rawType === 'Coco Chips' && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="chips_11mm_unwashed">11 mm unwashed</MenuItem>
              <MenuItem value="chips_11mm_washed">11 mm washed</MenuItem>
              <MenuItem value="chips_9mm_unwashed">9 mm unwashed</MenuItem>
              <MenuItem value="chips_9mm_washed">9 mm washed</MenuItem>
              <MenuItem value="chips_7mm_unwashed">7 mm unwashed</MenuItem>
              <MenuItem value="chips_7mm_washed">7 mm washed</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Wastage Deduction (%)"
            type="number"
            value={wastageDeduction}
            onChange={(e) => setWastageDeduction(Math.min(Math.max(parseInt(e.target.value) || 8, 0), 20))}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {rawType === 'Cocopeat' && (
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="cocopeat_hi_ec">HIGH EC</MenuItem>
              <MenuItem value="cocopeat_low_ec">LOW EC</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Density"
            type="number"
            value={density}
            onChange={(e) => setDensity(parseInt(e.target.value) || '')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sand Percentage"
            type="number"
            value={sandPercentage}
            onChange={(e) => setSandPercentage(parseInt(e.target.value) || '')}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        disabled={!isCalculateButtonEnabled()}
        fullWidth
      >
        Calculate
      </Button>
      <TextField
        label="Suggest Price"
        value={suggestPrice}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Buying Price"
        type="number"
        value={buyPrice}
        onChange={(e) => setBuyPrice(parseInt(e.target.value) || '')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || '')}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Total Price"
        value={buyPrice * quantity}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleBuy} fullWidth>
        Buy
      </Button>
      <Button variant="contained" color="secondary" onClick={clearForm} fullWidth>
        Clear
      </Button>
    </Box>
  );
};

export default RawBuyForm;
