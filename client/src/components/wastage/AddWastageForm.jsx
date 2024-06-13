import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete, Box } from '@mui/material';
import { usePageName } from '../../context/PageNameContext';
import {jwtDecode} from 'jwt-decode';

const BackendBaseUrl = 'http://localhost:3001/wastage';

const wastageTypes = [
  'wastage_cocopeat_fiber',
  'wastage_cocopeat_fine_dust',
  'wastage_10c_sieved',
  'wastage_10c_not_sieved',
  'wastage_10c_upper_part',
];

const AddWastageForm = ({ showSnackbar }) => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('To Add Wastage');
  }, []);


  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;

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
        Userid,
      });
      showSnackbar('Wastage added successfully', 'success');
      clearForm();
    } catch (error) {
      console.error('Error adding wastage:', error);
      showSnackbar('Error adding wastage', 'error');
    }
  };

  const clearForm = () => {
    const currentDate = new Date();
    setDate(currentDate.toISOString().split('T')[0]);
    setType('');
    setQuantity('');
  };

  return (
    <Box className="max-w-md mx-auto my-6 p-8 bg-white rounded" style={{ marginTop: '20vh', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>
      <TextField
        label="Date"
        value={date}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <Autocomplete
        className="my-5"
        fullWidth
        options={wastageTypes}
        value={type}
        onChange={(event, newValue) => setType(newValue)}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      <TextField
        className="my-5"
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || '')}
        fullWidth
      />
      <Button
        sx={{ mt: 2 }} // Add margin-top using MUI sx prop
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
