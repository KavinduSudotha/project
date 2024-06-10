import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { usePageName } from '../context/PageNameContext';
import { jwtDecode } from "jwt-decode";

const AddPriceList = () => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Add Standard Price List');
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
  }, []);

  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;

  const [date, setDate] = useState('');
  const [tabValue, setTabValue] = useState('one');
  const [enabledTabs, setEnabledTabs] = useState(['one']);
  const [inputs, setInputs] = useState({
    chips_11mm_unwashed: '',
    chips_11mm_washed: '',
    chips_9mm_unwashed: '',
    chips_9mm_washed: '',
    chips_7mm_unwashed: '',
    chips_7mm_washed: '',
    cocopeat_hi_ec: '',
    cocopeat_low_ec: '',
    wastage_deduction_chips: Array(13).fill(''),
    density: Array(5).fill(''),
    sand: Array(7).fill(''),
    wastage_price: [
      { label: 'Cocopeat Fiber', value: '' },
      { label: 'Cocopeat Fine Dust', value: '' },
      { label: '10C Sieved', value: '' },
      { label: '10C not Sieved', value: '' },
      { label: '10C upper part', value: '' }
    ]
  });

  const [formErrors, setFormErrors] = useState({});

  const isValidNumber = (value) => {
    const regex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return regex.test(value);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (tabValue === 'one') {
      ['chips_11mm_unwashed', 'chips_11mm_washed', 'chips_9mm_unwashed', 'chips_9mm_washed', 'chips_7mm_unwashed', 'chips_7mm_washed'].forEach((key) => {
        if (!inputs[key] || !isValidNumber(inputs[key]) || parseFloat(inputs[key]) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
      ['cocopeat_hi_ec', 'cocopeat_low_ec'].forEach((key) => {
        if (!inputs[key] || !isValidNumber(inputs[key]) || parseFloat(inputs[key]) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
    } else if (tabValue === 'two') {
      inputs.wastage_deduction_chips.forEach((value, index) => {
        const key = `wastage_deduction_chips_${index}`;
        if (!value || !isValidNumber(value) || parseFloat(value) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
    } else if (tabValue === 'three') {
      inputs.density.forEach((value, index) => {
        const key = `density_${index}`;
        if (!value || !isValidNumber(value) || parseFloat(value) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
      inputs.sand.forEach((value, index) => {
        const key = `sand_${index}`;
        if (!value || !isValidNumber(value) || parseFloat(value) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
    } else if (tabValue === 'four') {
      inputs.wastage_price.forEach((item, index) => {
        const key = `wastage_price_${index}`;
        if (!item.value || !isValidNumber(item.value) || parseFloat(item.value) < 0) {
          errors[key] = 'Please enter a valid non-negative number.';
          isValid = false;
        }
      });
    }

    if (!date) {
      errors.date = 'Please enter a valid date.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    if (enabledTabs.includes(newValue)) {
      setTabValue(newValue);
    }
  };

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });

    if (value === '') {
      setFormErrors({ ...formErrors, [key]: null });
    } else {
      const isValid = isValidNumber(value);
      setFormErrors({ ...formErrors, [key]: isValid ? null : 'Please enter a valid non-negative number' });
    }
  };

  const handleArrayInputChange = (key, index, value) => {
    const newArray = [...inputs[key]];
    newArray[index] = value;
    setInputs({ ...inputs, [key]: newArray });
  };

  const handleObjectInputChange = (key, index, value) => {
    const newArray = [...inputs[key]];
    newArray[index] = { ...newArray[index], value: value };
    setInputs((prevState) => ({
      ...prevState,
      [key]: newArray
    }));
  };

  const handleNextTab = () => {
    if (validateForm()) {
      const tabs = ['one', 'two', 'three', 'four'];
      const currentIndex = tabs.indexOf(tabValue);
      if (currentIndex + 1 < tabs.length) {
        const nextTab = tabs[currentIndex + 1];
        setEnabledTabs([...enabledTabs, nextTab]);
        setTabValue(nextTab);
      }
    }
  };

  const handleFinish = async () => {
    try {
      const formattedData = {
        date,
        chips_11mm_unwashed: parseInt(inputs.chips_11mm_unwashed),
        chips_11mm_washed: parseInt(inputs.chips_11mm_washed),
        chips_9mm_unwashed: parseInt(inputs.chips_9mm_unwashed),
        chips_9mm_washed: parseInt(inputs.chips_9mm_washed),
        chips_7mm_unwashed: parseInt(inputs.chips_7mm_unwashed),
        chips_7mm_washed: parseInt(inputs.chips_7mm_washed),
        cocopeat_hi_ec: parseInt(inputs.cocopeat_hi_ec),
        cocopeat_low_ec: parseInt(inputs.cocopeat_low_ec),
        wastage_deduction_chips: inputs.wastage_deduction_chips.map(value => parseInt(value)),
        density: inputs.density.map(value => parseInt(value)),
        sand: inputs.sand.map(value => parseInt(value)),
        wastage_price: inputs.wastage_price.map(item => parseInt(item.value)),
        employee_id: Userid
      };

      const response = await axios.post("http://localhost:3001/pricelist/pricelist", formattedData);

      if (response.data === "OK") {
        Swal.fire({
          title: "Success!",
          text: "New Price List has been added successfully.",
          icon: "success"
        });

        setInputs({
          chips_11mm_unwashed: '',
          chips_11mm_washed: '',
          chips_9mm_unwashed: '',
          chips_9mm_washed: '',
          chips_7mm_unwashed: '',
          chips_7mm_washed: '',
          cocopeat_hi_ec: '',
          cocopeat_low_ec: '',
          wastage_deduction_chips: Array(13).fill(''),
          density: Array(5).fill(''),
          sand: Array(7).fill(''),
          wastage_price: [
            { label: 'Cocopeat Fiber', value: '' },
            { label: 'Cocopeat Fine Dust', value: '' },
            { label: '10C Sieved', value: '' },
            { label: '10C not Sieved', value: '' },
            { label: '10C upper part', value: '' }
          ]
        });
        setDate('');
        setEnabledTabs(['one']);
        setTabValue('one');
      }
    } catch (error) {
      console.error("ADD FAILED", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: "error",
        title: "Failed to add new Price List"
      });
    }
  };
  

  return (
    <div className='bg-white h-full '>
      <div className="container mx-auto py-8">
        
        <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example">
  <Tab label="Standard Price" value="one" disabled={!enabledTabs.includes('one')} />
  <Tab label="Deduction of Chips" value="two" disabled={!enabledTabs.includes('two')} />
  <Tab label="Deduction of Cocopeat" value="three" disabled={!enabledTabs.includes('three')} />
  <Tab label="Wastage Price" value="four" disabled={!enabledTabs.includes('four')} />
      </Tabs>

          <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold"> </h1>
          <div className="flex items-center">
            <label htmlFor="date" className="mr-2">Date:</label>
              <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        </Box>

        {/* Tab 1 - Standard Price */}
        <div value="one" hidden={tabValue !== 'one'}>
          <div className="mb-8">
            {/* Chips Subsection */}
            <h2 className="text-xl font-semibold mb-4">Chips</h2>
            <div className="grid grid-cols-2 gap-4">
           
            <TextField
               type='number'
              label="11mm Unwashed"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: '500px' }}
              InputProps={{ endAdornment: <span>LKR</span> }}
              value={inputs.chips_11mm_unwashed}
              onChange={(e) => handleInputChange('chips_11mm_unwashed', e.target.value)}
              error={!!formErrors.chips_11mm_unwashed}
              helperText={formErrors.chips_11mm_unwashed}
              color={isValidNumber(inputs.chips_11mm_unwashed) && inputs.chips_11mm_unwashed !== '' ? 'success' : (formErrors.chips_11mm_unwashed ? 'error' : 'warning')}
               />
           <TextField
                 type='number'
              label="11mm Washed"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: '500px' }}
              InputProps={{ endAdornment: <span>LKR</span> }}
              value={inputs.chips_11mm_washed}
              onChange={(e) => handleInputChange('chips_11mm_washed', e.target.value)}
              error={!!formErrors.chips_11mm_washed}
              helperText={formErrors.chips_11mm_washed}
              color={isValidNumber(inputs.chips_11mm_washed) && inputs.chips_11mm_washed !== '' ? 'success' : (formErrors.chips_11mm_washed ? 'error' : 'warning')}
            />
                <TextField
                    type='number'
                    label="9mm Unwashed"
                    variant="outlined"
                    fullWidth
                    sx={{ maxWidth: '500px' }}
                    InputProps={{ endAdornment: <span>LKR</span> }}
                    value={inputs.chips_9mm_unwashed}
                    onChange={(e) => handleInputChange('chips_9mm_unwashed', e.target.value)}
                    error={!!formErrors.chips_9mm_unwashed}
                    helperText={formErrors.chips_9mm_unwashed}
                    color={isValidNumber(inputs.chips_9mm_unwashed) && inputs.chips_9mm_unwashed !== '' ? 'success' : (formErrors.chips_9mm_unwashed ? 'error' : 'warning')}
                  />
            <TextField
                   type='number'
                    label="9mm Washed"
                    variant="outlined"
                    fullWidth
                    sx={{ maxWidth: '500px' }}
                    InputProps={{ endAdornment: <span>LKR</span> }}
                    value={inputs.chips_9mm_washed}
                    onChange={(e) => handleInputChange('chips_9mm_washed', e.target.value)}
                    error={!!formErrors.chips_9mm_washed}
                    helperText={formErrors.chips_9mm_washed}
                    color={isValidNumber(inputs.chips_9mm_washed) && inputs.chips_9mm_washed !== '' ? 'success' : (formErrors.chips_9mm_washed ? 'error' : 'warning')}
                  />
                <TextField
                  type='number'
                  label="7mm Unwashed"
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: '500px' }}
                  InputProps={{ endAdornment: <span>LKR</span> }}
                  value={inputs.chips_7mm_unwashed}
                  onChange={(e) => handleInputChange('chips_7mm_unwashed', e.target.value)}
                  error={!!formErrors.chips_7mm_unwashed}
                  helperText={formErrors.chips_7mm_unwashed}
                  color={isValidNumber(inputs.chips_7mm_unwashed) && inputs.chips_7mm_unwashed !== '' ? 'success' : (formErrors.chips_7mm_unwashed ? 'error' : 'warning')}
                />
              <TextField
                type='number'
                label="7mm Washed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_7mm_washed}
                onChange={(e) => handleInputChange('chips_7mm_washed', e.target.value)}
                error={!!formErrors.chips_7mm_washed}
                helperText={formErrors.chips_7mm_washed}
                color={isValidNumber(inputs.chips_7mm_washed) && inputs.chips_7mm_washed !== '' ? 'success' : (formErrors.chips_7mm_washed ? 'error' : 'warning')}
              />
              {/* Add other input fields similarly */}
            </div>
          </div>
          {/* Add Cocopeat Subsection similarly */}
          <div className="mb-8">
              {/* Cocopeat Subsection */}
              <h2 className="text-xl font-semibold mb-4">Cocopeat</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Each TextField is connected to the respective property in the inputs object */}
                <TextField
                  type='number'
                  label="HI EC"
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: '500px' }}
                  InputProps={{ endAdornment: <span>LKR</span> }}
                  value={inputs.cocopeat_hi_ec}
                  onChange={(e) => handleInputChange('cocopeat_hi_ec', e.target.value)}
                  error={!!formErrors.cocopeat_hi_ec}
                  helperText={formErrors.cocopeat_hi_ec}
                  color={isValidNumber(inputs.cocopeat_hi_ec) && inputs.cocopeat_hi_ec !== '' ? 'success' : (formErrors.cocopeat_hi_ec ? 'error' : 'warning')}
                  
                  />
                  <TextField
                      type='number'
                      label="Low EC"
                      variant="outlined"
                      fullWidth
                      sx={{ maxWidth: '500px' }}
                      InputProps={{ endAdornment: <span>LKR</span> }}
                      value={inputs.cocopeat_low_ec}
                      onChange={(e) => handleInputChange('cocopeat_low_ec', e.target.value)}
                      error={!!formErrors.cocopeat_low_ec}
                      helperText={formErrors.cocopeat_low_ec}
                      color={isValidNumber(inputs.cocopeat_low_ec) && inputs.cocopeat_low_ec !== '' ? 'success' : (formErrors.cocopeat_low_ec ? 'error' : 'warning')}
                      />
                {/* Add other input fields similarly */}
              </div>
            </div>
        </div>

        {/* Tab 2 - Deduction of Chips */}
        <div value="two" hidden={tabValue !== 'two'}>
          <div className="mb-8">
            {/* Deduction of Chips */}
            <h2 className="text-xl font-semibold mb-4">Deduction of Chips</h2>
            <div className="grid grid-cols-2 gap-4">
              {inputs.wastage_deduction_chips.map((value, index) => (
              <TextField
              type='number'
              key={index}
              label={`${index + 8}%`}
              variant="outlined"
              fullWidth
              sx={{ maxWidth: '500px' }}
              InputProps={{ endAdornment: <span>LKR</span> }}
              value={value}
              onChange={(e) => handleArrayInputChange('wastage_deduction_chips', index, e.target.value)}
              error={!!formErrors[`wastage_deduction_chips_${index}`]}
              helperText={formErrors[`wastage_deduction_chips_${index}`]}
              color={isValidNumber(value) && value !== '' ? 'success' : (formErrors[`wastage_deduction_chips_${index}`] ? 'error' : 'warning')}
          />
          
              ))}
            </div>
          </div>
        </div>

        {/* Tab 3 - Deduction of Cocopeat */}
        <div value="three" hidden={tabValue !== 'three'}>
          <div className="mb-8">
            {/* density*/}
            <h2 className="text-xl font-semibold mb-4">Density</h2>
            <div className="grid grid-cols-2 gap-4">
              {inputs.density.map((value, index) => (
                <TextField
                type='number'
                key={index}
                label={`${index * 10 + 60}-${index * 10 + 69}`}
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={value}
                onChange={(e) => handleArrayInputChange('density', index, e.target.value)}
                error={!!formErrors[`density_${index}`]}
                helperText={formErrors[`density_${index}`]}
                color={isValidNumber(value) && value !== '' ? 'success' : (formErrors[`density_${index}`] ? 'error' : 'warning')}
            />
            
              ))}
            </div>
          </div>
          {/* Add Sand Subsection similarly */}
           <hr className="my-8 border-t border-gray-300" /> {/* Line separator */}
            <div className="mb-8">
              {/* Sand Subsection */}
              <h2 className="text-xl font-semibold mb-4">Sand</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Iterate over inputs array to generate input fields */}
                {inputs.sand.map((range, index) => (
                          <TextField
                          type='number'
                              key={index}
                              label={`${index * 5 + 20}-${index * 5 + 24}`}
                              variant="outlined"
                              fullWidth
                              sx={{ maxWidth: '500px' }}
                              InputProps={{ endAdornment: <span>LKR</span> }}
                              value={range} // Changed 'value' to 'range'
                              onChange={(e) => handleArrayInputChange('sand', index, e.target.value)}
                              error={!!formErrors[`sand_${index}`]}
                              helperText={formErrors[`sand_${index}`]}
                              color={isValidNumber(range) && range !== '' ? 'success' : (formErrors[`sand_${index}`] ? 'error' : 'warning')}
                          />
                      ))}

                </div> 
              </div>
        </div>

        {/* Tab 4 - Wastage Price */}
        <div value="four" hidden={tabValue !== 'four'}>
          <div className="mb-8">
            {/* Wastage Price */}
            <h2 className="text-xl font-semibold mb-4">Wastage Price</h2>
            <div className="grid grid-cols-2 gap-4">
              {inputs.wastage_price.map((item, index) => (
                <TextField
                type='number'
                key={index}
                label={item.label}
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={item.value}
                onChange={(e) => handleObjectInputChange('wastage_price', index, e.target.value)}
                error={!!formErrors[`wastage_price_${index}`]}
                helperText={formErrors[`wastage_price_${index}`]}
                color={isValidNumber(item.value) && item.value !== '' ? 'success' : (formErrors[`wastage_price_${index}`] ? 'error' : 'warning')}
            />
            
              ))}
            </div>
          </div>
        </div>

        <div className="fixed right-20 bottom-20">
          {tabValue !== 'four' ? (
            <Button onClick={handleNextTab} variant="contained" color="primary">
            Next
          </Button>
          
          ) : (
            <Button onClick={handleFinish} variant="contained" color="primary">
            Finish
          </Button>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPriceList;