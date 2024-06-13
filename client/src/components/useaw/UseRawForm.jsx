import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import { format } from 'date-fns';
import { usePageName } from '../../context/PageNameContext';
import {jwtDecode} from 'jwt-decode';

const types = [
  'chips_11mm_unwashed', 'chips_11mm_washed', 'chips_9mm_unwashed',
  'chips_9mm_washed', 'chips_7mm_unwashed', 'chips_7mm_washed',
  'cocopeat_hi_ec', 'cocopeat_low_ec'
];

const UserRawForm = ({ showSnackbar }) => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('To Use Raw Material');
  }, []);
  const storedData = localStorage.getItem('token');
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;


  const [useId, setUseId] = useState(0);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [jobOptions, setJobOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [type, setType] = useState('');
  const [jobId, setJobId] = useState('');
  const [batchId, setBatchId] = useState('');
  const [predictedQuantity, setPredictedQuantity] = useState('');
  const [releasableWeight, setReleasableWeight] = useState('');
  const [releasedWeight, setReleasedWeight] = useState('');
  const [predictedWastage, setPredictedWastage] = useState('');
  const [predictedSand, setPredictedSand] = useState('');
  const [chipType, setChipType] = useState('');
  const [peatType, setPeatType] = useState('');
  const [batchQuantity, setBatchQuantity] = useState(0);

  // Function to clear all input fields
  const clearForm = () => {
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setJobId('');
    setBatchId('');
    setType('');
    setPredictedQuantity('');
    setReleasableWeight('');
    setReleasedWeight('');
    setPredictedWastage('');
    setPredictedSand('');
    setChipType('');
    setPeatType('');
  };

  useEffect(() => {
    axios.get('http://localhost:3001/userawrout/getUseId')
      .then(res => setUseId(res.data.useId))
      .catch(err => console.error(err));

    axios.get('http://localhost:3001/userawrout/getJobOptions')
      .then(res => setJobOptions(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (type) {
      axios.post('http://localhost:3001/userawrout/getBatchOptions', { type })
        .then(res => setBatchOptions(res.data))
        .catch(err => console.error(err));
    }
  }, [type]);

  const handlePredictedQuantity = () => {
    axios.post('http://localhost:3001/userawrout/getPredictedQuantity', { type, jobId })
      .then(res => setPredictedQuantity(parseFloat(res.data.predictedQuantity).toFixed(2)))
      .catch(err => console.error(err));
  };

  const handleReleasableWeight = () => {
    axios.post('http://localhost:3001/userawrout/getReleasableWeight', { batchId })
      .then(res => setReleasableWeight(res.data.releasableWeight))
      .catch(err => console.error(err));
  };

  const handlePredictedWastage = () => {
    axios.post('http://localhost:3001/userawrout/getPredictedWastage', { q: releasedWeight, type })
      .then(res => setPredictedWastage(parseFloat(res.data.predictedWastage).toFixed(2)))
      .catch(err => console.error(err));
  };

  const handlePredictedSand = () => {
    axios.post('http://localhost:3001/userawrout/getPredictedSand', { q: releasedWeight, type })
      .then(res => setPredictedSand(parseFloat(res.data.predictedSand).toFixed(2)))
      .catch(err => console.error(err));
  };

  const handleSubmit = () => {
    if (releasedWeight > batchQuantity) {
      showSnackbar('Released quantity must not exceed batch quantity', 'error');
      return;
    }

    const data = {
      date,
      jobId,
      type,
      releasedWeight,
      batchId,
      Userid

    };
    axios.post('http://localhost:3001/userawrout/submit', data)
      .then(res => showSnackbar(res.data.message, 'success'))
      .catch(err => {
        console.error(err);
        showSnackbar('Submission failed', 'error');
      });
  };

  const isChipType = types.slice(0, 6).includes(type);
  const isPeatType = types.slice(6).includes(type);

  return (
    <Stack spacing={2} sx={{ width: '100%', height: "30vh" }} >
      <TextField
        label="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        type="date"
        disabled
      />
      <Autocomplete
        options={jobOptions}
        getOptionLabel={(option) => `${option.job_id} - ${option.customer_name}`}
        renderInput={(params) => <TextField {...params} label="Job ID" />}
        onChange={(event, newValue) => {
          if (newValue) {
            setJobId(newValue.job_id);
            axios.post('http://localhost:3001/userawrout/getJobDetails', { jobId: newValue.job_id })
              .then(res => {
                setChipType(res.data.chip_type);
                setPeatType(res.data.peat_type);
              })
              .catch(err => console.error(err));
          } else {
            setJobId('');
            setChipType('');
            setPeatType('');
          }
        }}
      />
      <TextField
        label="Chip Type"
        value={chipType}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Peat Type"
        value={peatType}
        InputProps={{ readOnly: true }}
      />
      <TextField
        label="Type"
        select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Autocomplete
        options={batchOptions}
        getOptionLabel={(option) => `${option.buy_id} - Available: ${option.availablequantity}`}
        renderInput={(params) => <TextField {...params} label="Batch ID" />}
        onChange={(event, newValue) => {
          if (newValue) {
            setBatchId(newValue.buy_id);
            setBatchQuantity(newValue.availablequantity);
          } else {
            setBatchId('');
            setBatchQuantity(0);
          }
        }}
      />
      <TextField
        label="Predicted Quantity"
        value={predictedQuantity}
        InputProps={{ readOnly: true }}
      />
      <Button variant="contained" onClick={handlePredictedQuantity}>Get Predicted Quantity</Button>
      <TextField
        type='number'
        label="Released Weight"
        value={releasedWeight}
        onChange={(e) => setReleasedWeight(e.target.value)}
      />
      {isChipType && (
        <>
          <TextField
            label="Predicted Wastage"
            value={predictedWastage}
            InputProps={{ readOnly: true }}
          />
          <Button variant="contained" onClick={handlePredictedWastage}>Get Predicted Wastage</Button>
        </>
      )}
      {isPeatType && (
        <>
          <TextField
            label="Predicted Sand"
            value={predictedSand}
            InputProps={{ readOnly: true }}
          />
          <Button variant="contained" onClick={handlePredictedSand}>Get Predicted Sand</Button>
        </>
      )}
      <Stack direction="row" spacing={6}>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ width: '45%', '&:hover': { backgroundColor: 'green' } }}>Submit</Button>
        <Button variant="contained" color="secondary" onClick={clearForm} sx={{ width: '45%', '&:hover': { backgroundColor: 'red' } }} >Clear</Button>
      </Stack>
    </Stack>
  );
};

export default UserRawForm;
