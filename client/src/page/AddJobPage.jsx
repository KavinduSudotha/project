import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddJobPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNextTab = () => {
    setTabValue((prevValue) => prevValue + 1);
  };

  const handleFinish = () => {
    // Handle finish button click event
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded">
        <h1 className="text-3xl font-bold">Add Job</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="add-job-tabs"
          centered
          variant="fullWidth"
        >
          <Tab label="Job Details" />
          <Tab label="Sheet Details" />
          <Tab label="Driver Details" />
        </Tabs>
      </Box>

      {/* Job Details Tab */}
      <div role="tabpanel" hidden={tabValue !== 0}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>
          <TextField label="Job Due Date" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Job Created Date" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Customer Name" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Destination Country/State" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Employee ID" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Job ID" variant="outlined" fullWidth className="mb-4" />
        </div>
      </div>

      {/* Sheet Details Tab */}
      <div role="tabpanel" hidden={tabValue !== 1}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sheet Details</h2>
          <TextField label="Height (cm)" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Length (cm)" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Width (cm)" variant="outlined" fullWidth className="mb-4" />
        </div>
      </div>

      {/* Driver Details Tab */}
      <div role="tabpanel" hidden={tabValue !== 2}>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Driver Details</h2>
          <TextField label="Driver Name" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Vehicle Number" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Mobile Number" variant="outlined" fullWidth className="mb-4" />
          <TextField label="Transport Company" variant="outlined" fullWidth className="mb-4" />
        </div>
      </div>

      <div className="fixed right-20 bottom-20">
        {tabValue !== 2 ? (
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
  );
};

export default AddJobPage;
