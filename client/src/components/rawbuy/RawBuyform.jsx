import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { usePageName } from '../../context/PageNameContext';
import {jwtDecode} from "jwt-decode";
import CalculateIcon from '@mui/icons-material/Calculate';

const BackendBaseUrl = 'http://localhost:3001/buyraw'; // Update this with your actual backend base URL

const RawBuyForm = ({ showSnackbar }) => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('To Buy Raw Material');
  }, []);

  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;

  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const [date, setDate] = useState(currentDate);
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
      showSnackbar('Error calculating suggest price', 'error');
    }
  };

  const handleBuy = async () => {
    try {
      await axios.post(`${BackendBaseUrl}/buyrecord`, {
        Userid,
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
      showSnackbar('Data Saved Successfully', 'success');
      clearForm();
    } catch (error) {
      console.error('Error saving data:', error);
      showSnackbar('Error saving data', 'error');
    }
  };

  const clearForm = () => {
    setDate(currentDate); // Reset date to current date
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
    <Box maxWidth={400} marginX={10} paddingTop={3}>
      <TextField
        label="Date"
        type="date"
        value={date}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
        disabled // Disable manual date selection
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
            onChange={(e) =>
              setWastageDeduction(Math.min(Math.max(parseInt(e.target.value) || 8, 0), 20))
            }
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
        startIcon={<CalculateIcon />}
        variant="contained"
        color="primary"
        onClick={handleCalculate}
        disabled={!isCalculateButtonEnabled()}
        fullWidth
        sx={{ '&:hover': { backgroundColor: 'darkblue' } }}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuy}
          sx={{ width: '45%', '&:hover': { backgroundColor: 'green' } }}
        >
          Buy
        </Button>
        <Box sx={{ width: '10%' }} />
        <Button
          variant="contained"
          color="secondary"
          onClick={clearForm}
          sx={{ width: '45%', '&:hover': { backgroundColor: 'red' } }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default RawBuyForm;
