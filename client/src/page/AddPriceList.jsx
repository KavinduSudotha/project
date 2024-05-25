import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { usePageName } from '../context/PageNameContext';


const AddPriceList = () => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Add Standard Price List');
  }, []);
  const [date, setDate] = useState('');
  const [tabValue, setTabValue] = useState('one');
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

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
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
    if (tabValue !== 'four') {
      const tabs = ['one', 'two', 'three', 'four'];
      const currentIndex = tabs.indexOf(tabValue);
      setTabValue(tabs[currentIndex + 1]);
    }
  };

  const handleFinish = async () => {
    try {
      console.log('Input data:', inputs);
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
        wastage_price: inputs.wastage_price.map(item => parseInt(item.value)), // Only pass the value
        employee_id: '0000'
      };

      console.log(formattedData);
      const response = await axios.post("http://localhost:3001/pricelist/pricelist", formattedData);
      console.log(response.data);

      // If response is "OK", show success alert
  if (response.data === "OK") {
    // Show success alert using Swal
    Swal.fire({
      title: "Success!",
      text: "Your data has been submitted successfully.",
      icon: "success"
    });
  }

      // Reset inputs and date after successful submission
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
    } catch (error) {
      console.error("ADD FAILED", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Data not submitted"
      });
    }
  };
  
  

  return (
    <div className='bg-white h-full mt-12'>
      <div className="container mx-auto py-8">
        
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="wrapped label tabs example"
          >
            <Tab value="one" label="Standard Price" />
            <Tab value="two" label="Deduction of Chips" />
            <Tab value="three" label="Deduction of Cocopeat" />
            <Tab value="four" label="Wastage Price" />
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
                value={inputs.chips_11mm_unwashed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_11mm_unwashed', e.target.value)} // Handle input change
              />
                  <TextField
                type='number'
                label="11mm washed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_11mm_washed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_11mm_washed', e.target.value)} // Handle input change
              />
             <TextField
                type='number'
                label="9mm Unwashed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_9mm_unwashed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_9mm_unwashed', e.target.value)} // Handle input change
              />
              <TextField
                type='number'
                label="9mm washed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_9mm_washed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_9mm_washed', e.target.value)} // Handle input change
              />
                <TextField
                type='number'
                label="7mm Unwashed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_7mm_unwashed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_7mm_unwashed', e.target.value)} // Handle input change
              />
              <TextField
                type='number'
                label="7mm washed"
                variant="outlined"
                fullWidth
                sx={{ maxWidth: '500px' }}
                InputProps={{ endAdornment: <span>LKR</span> }}
                value={inputs.chips_7mm_washed} // Use value from inputs object
                onChange={(e) => handleInputChange('chips_7mm_washed', e.target.value)} // Handle input change
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
                  value={inputs.cocopeat_hi_ec} // Use value from inputs object
                  onChange={(e) => handleInputChange('cocopeat_hi_ec', e.target.value)} // Handle input change
                />
                  <TextField
                  type='number'
                  label="Low EC"
                  variant="outlined"
                  fullWidth
                  sx={{ maxWidth: '500px' }}
                  InputProps={{ endAdornment: <span>LKR</span> }}
                  value={inputs.cocopeat_low_ec} // Use value from inputs object
                  onChange={(e) => handleInputChange('cocopeat_low_ec', e.target.value)} // Handle input change
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
                        value={range} // Use value from inputs array
                        onChange={(e) => handleArrayInputChange('sand', index, e.target.value)} // Handle input change for array
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
                />
              ))}
            </div>
          </div>
        </div>

        <div className="fixed right-20 bottom-20">
          {tabValue !== 'four' ? (
            <Button
              variant="contained"
              onClick={handleNextTab}
              color="primary"
              size="large"
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleFinish}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPriceList;
