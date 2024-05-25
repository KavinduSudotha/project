import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete, Box } from '@mui/material';

const BackendBaseUrl = 'http://localhost:3001/wastage';

const wastageTypes = [
  'wastage_price_cocopeat_fiber',
  'wastage_price_cocopeat_fine_dust',
  'wastage_price_10c_sieved',
  'wastage_price_10c_not_sieved',
  'wastage_price_10c_upper_part',
];

const AddWastageForm = () => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }, []);

  const handleAddWastage = async () => {
    try {
      await axios.post(`${BackendBaseUrl}/addwastage`, {
        date,
        type,
        quantity,
      });
      console.log('Wastage added successfully');
      clearForm();
    } catch (error) {
      console.error('Error adding wastage:', error);
    }
  };

  const clearForm = () => {
    const currentDate = new Date();
    setDate(currentDate.toISOString().split('T')[0]);
    setType('');
    setQuantity('');
  };

  return (
    <Box className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <TextField
        label="Date"
        value={date}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <Autocomplete
        className="mt-4"
        fullWidth
        options={wastageTypes}
        value={type}
        onChange={(event, newValue) => setType(newValue)}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      <TextField
        className="mt-4"
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || '')}
        fullWidth
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={handleAddWastage}
        fullWidth
      >
        Add
      </Button>
    </Box>
  );
};

export default AddWastageForm;
