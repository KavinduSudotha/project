import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Autocomplete, Box ,Paper} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { usePageName } from '../../context/PageNameContext';

const BackendBaseUrl = 'http://localhost:3001/wastage';

const wastageTypes = [
  'wastage_price_cocopeat_fiber',
  'wastage_price_cocopeat_fine_dust',
  'wastage_price_10c_sieved',
  'wastage_price_10c_not_sieved',
  'wastage_price_10c_upper_part',
];

const SellWastageForm = ({ onSellWastage }) => {

  const { setPage } = usePageName();

  useEffect(() => {
    setPage('To Sell Wastage');
  }, []);


  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [type, setType] = useState('');
  const [batch, setBatch] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [suggestPrice, setSuggestPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    if (type) {
      axios.post(`${BackendBaseUrl}/getBatches`, { type })
        .then((response) => {
          setBatchOptions(response.data);
        })
        .catch((error) => {
          console.error('Error fetching batches:', error);
        });
    }
  }, [type]);

  const handleCalculateSuggestPrice = () => {
    axios.post(`${BackendBaseUrl}/getSuggestPrice`, { type, quantity })
      .then((response) => {
        setSuggestPrice(response.data.suggestPrice);
      })
      .catch((error) => {
        console.error('Error calculating suggest price:', error);
      });
  };

  const handleSellWastage = async () => {
    try {
      const response = await axios.post(`${BackendBaseUrl}/sellwastage`, {
        date: date.toISOString().split('T')[0],
        type,
        quantity,
        sellPrice,
        wasteId: batch.wastage_id,
      });
      console.log('Wastage sold successfully');
      onSellWastage(response.data);  // Notify parent component
      clearForm();
    } catch (error) {
      console.error('Error selling wastage:', error);
    }
  };

  const clearForm = () => {
    setDate(currentDate);
    setType('');
    setBatch(null);
    setQuantity('');
    setSuggestPrice('');
    setSellPrice('');
  };

  return (
    <Box component={Paper} padding={2} marginTop={"10vh"} className=' flex flex-col gap-5'>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth disabled />}
        />
      </LocalizationProvider>
      <Autocomplete
        className="mt-4"
        fullWidth
        options={wastageTypes}
        value={type}
        onChange={(event, newValue) => setType(newValue)}
        renderInput={(params) => <TextField {...params} label="Type" />}
      />
      <Autocomplete
        className="mt-4"
        fullWidth
        options={batchOptions}
        value={batch}
        onChange={(event, newValue) => setBatch(newValue)}
        getOptionLabel={(option) => `ID: ${option.wastage_id}, Quantity: ${option.available_quantity}`}
        renderInput={(params) => <TextField {...params} label="Batch" />}
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
        onClick={handleCalculateSuggestPrice}
        fullWidth
      >
        Calculate Suggest Price
      </Button>
      <TextField
        className="mt-4"
        label="Suggest Price"
        value={suggestPrice}
        InputProps={{ readOnly: true }}
        fullWidth
      />
      <TextField
        className="mt-4"
        label="Sell Price"
        type="number"
        value={sellPrice}
        onChange={(e) => setSellPrice(parseFloat(e.target.value) || '')}
        fullWidth
      />
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={handleSellWastage}
        fullWidth
      >
        Sell
      </Button>
    </Box>
  );
};

export default SellWastageForm;
