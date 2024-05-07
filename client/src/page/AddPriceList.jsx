import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddPriceList = () => {
  const [date, setDate] = useState('');
  const [tabValue, setTabValue] = useState('one');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNextTab = () => {
    if (tabValue !== 'four') {
      const tabs = ['one', 'two', 'three', 'four'];
      const currentIndex = tabs.indexOf(tabValue);
      setTabValue(tabs[currentIndex + 1]);
    }
  };

    const handleFinish = () => {
        // Add your logic for handling the "Finish" button click event here
    };
    
  return (
    <div className='bg-white h-full'>
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Weekly Price List</h1>
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
      </Box>
 
      {/* Tab 1 - Standard Price */}
      <div value="one" hidden={tabValue !== 'one'}>
        <div className="mb-8">
          {/* Chips Subsection */}
          <h2 className="text-xl font-semibold mb-4">Chips</h2>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="11mm Unwashed" variant="outlined" fullWidth sx={{ maxWidth: '500px' }} InputProps={{ endAdornment: <span>LKR</span>}}/>
            <TextField label="9mm Unwashed" variant="outlined" fullWidth sx={{ maxWidth: '500px'}}InputProps={{ endAdornment: <span>LKR</span>}} />
            <TextField label="7mm Unwashed" variant="outlined" fullWidth sx={{ maxWidth: '500px' }}InputProps={{ endAdornment: <span>LKR</span>}} />
            <TextField label="11mm Washed" variant="outlined" fullWidth sx={{ maxWidth: '500px'}} InputProps={{ endAdornment: <span>LKR</span>}}/>
            <TextField label="9mm Washed" variant="outlined" fullWidth sx={{ maxWidth: '500px' }} InputProps={{ endAdornment: <span>LKR</span>}}/>
            <TextField label="7mm Washed" variant="outlined" fullWidth sx={{ maxWidth: '500px' }}InputProps={{ endAdornment: <span>LKR</span>}} />
          </div>
        </div>
        <div className="mb-8">
          {/* Cocopeat Subsection */}
          <h2 className="text-xl font-semibold mb-4">Cocopeat</h2>
          <div className="grid grid-cols-2 gap-4">
            <TextField label="HI EC" variant="outlined" fullWidth sx={{ maxWidth: '500px' }} InputProps={{ endAdornment: <span>LKR</span>}}/>
            <TextField label="Low EC" variant="outlined" fullWidth sx={{ maxWidth: '500px' }} InputProps={{ endAdornment: <span>LKR</span>}} />
          </div>
        </div>
      </div>

      {/* Tab 2 - Wastage deduction for chip */}
      <div value="two" hidden={tabValue !== 'two'}>
        <div className="mb-8">
          {/* Wastage deduction for chip */}
          <h2 className="text-xl font-semibold mb-4">Wastage deduction for chip</h2>
          <div className="grid grid-cols-2 gap-4">
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((percentage, index) => (
              <TextField 
                key={index} 
                label={`${percentage}%`} 
                variant="outlined" 
                fullWidth 
                InputProps={{
                  endAdornment: <span>LKR</span>,
                }}
                sx={{ maxWidth: '500px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab 3 - Density and Sand */}
      <div value="three" hidden={tabValue !== 'three'}>
        <div className="mb-8">
          {/* Density Subsection */}
          <h2 className="text-xl font-semibold mb-4">Density</h2>
          <div className="grid grid-cols-2 gap-4">
            {[60, 70, 80, 90, 100].map((range, index) => (
              <TextField 
                key={index} 
                label={`${range}-${range + 9}`} 
                variant="outlined" 
                fullWidth 
                InputProps={{
                  endAdornment: <span>LKR</span>,
                }}
                sx={{ maxWidth: '500px' }}
              />
            ))}
          </div>
        </div>
        <hr className="my-8 border-t border-gray-300" /> {/* Line separator */}
        <div className="mb-8">
          {/* Sand Subsection */}
          <h2 className="text-xl font-semibold mb-4">Sand</h2>
          <div className="grid grid-cols-2 gap-4">
            {[20, 25, 30, 36, 41, 46, 51].map((range, index) => (
              <TextField 
                key={index} 
                label={`${range}-${range + 4}`} 
                variant="outlined" 
                fullWidth 
                InputProps={{
                  endAdornment: <span>LKR</span>,
                }}
                sx={{ maxWidth: '500px' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab 4 - Wastage Price */}
      <div value="four" hidden={tabValue !== 'four'}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Wastage Price</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Cocopeat Fiber */}
            <TextField 
              label="Cocopeat Fiber" 
              variant="outlined" 
              fullWidth 
              InputProps={{
                endAdornment: <span>LKR</span>,
              }}
              sx={{ maxWidth: '500px' }}
            />
            {/* Cocopeat Fine Dust */}
            <TextField 
              id='cocopeat-fine-dust'
              label="Cocopeat Fine Dust" 
              variant="outlined" 
              fullWidth 
              InputProps={{
                endAdornment: <span>LKR</span>,
              }}
              sx={{ maxWidth: '500px' }}
            />
            {/* 10C Sieved */}
            <TextField 
              label="10C Sieved" 
              variant="outlined" 
              fullWidth 
              InputProps={{
                endAdornment: <span>LKR</span>,
              }}
              sx={{ maxWidth: '500px' }}
            />
            {/* 10C not Sieved */}
            <TextField 
              label="10C not Sieved" 
              variant="outlined" 
              fullWidth 
              InputProps={{
                endAdornment: <span>LKR</span>,
              }}
              sx={{ maxWidth: '500px' }}
            />
            {/* 10C upper part */}
            <TextField 
              label="10C upper part" 
              variant="outlined" 
              fullWidth 
              InputProps={{
                endAdornment: <span>LKR</span>,
              }}
              sx={{ maxWidth: '500px' }}
            />
          </div>
        </div>
      </div>

      <div className="fixed right-20 bottom-20">
  {tabValue !== 'four' ? (
    <Button 
      variant="contained" 
      onClick={handleNextTab} 
      color="primary" 
      size="large" /* Add size="large" to scale up the button */
    >
      Next
    </Button>
  ) : (
    <Button 
      variant="contained" 
      color="success" 
      size="large" /* Add size="large" to scale up the button */
      onClick={handleFinish} /* Handle a different function when it changes to "Finish" */
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
