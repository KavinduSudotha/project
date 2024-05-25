// src/pages/AddJob.js
import React, { useState } from 'react';
import { AppBar, Tabs, Tab, TextField, Box, Button,  Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AddJob() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    createdDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    customerName: '',
    address: '',
    note: '',
    chip_type: '',
    peat_type: '',
    height: '',
    width: '',
    length: '',
    ratioChips: '',
    ratioPeat: '',
    weight: '',
    quantity: '',
    driverName: '',
    vehicleType: '',
    vehicleNumber: '',
    transportCompany: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleClear = () => {
    setFormData({
      ...formData,
      dueDate: '',
      customerName: '',
      address: '',
      note: '',
      chip_type: '',
      peat_type: '',
      height: '',
      width: '',
      length: '',
      ratioChips: '',
      ratioPeat: '',
      weight: '',
      quantity: '',
      driverName: '',
      vehicleType: '',
      vehicleNumber: '',
      transportCompany: '',
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/jobrout/addjob', {
        ...formData,
        employeeId: '0000',
        status:'unstarted'// hardcoded employee ID
      });
      console.log('Response:', response.data);
      handleClear(); // Clear form data after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a Job</h1>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Basic Job Details" />
          <Tab label="Sheet Details" />
          <Tab label="Transport Details" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TextField
            name="createdDate"
            label="Created Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.createdDate}
            disabled
          />
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={handleInputChange}
          />
          <TextField
            name="customerName"
            label="Customer Name"
            fullWidth
            margin="normal"
            value={formData.customerName}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            label="Destination Address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TextField
            name="note"
            label="Special Note"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.note}
            onChange={handleInputChange}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
            <div>
              <FormControl fullWidth margin="normal">
                <InputLabel id="chip-type-label">Chip Type</InputLabel>
                <Select
                  labelId="chip-type-label"
                  id="chip-type"
                  name="chip_type"
                  value={formData.chip_type}
                  onChange={handleInputChange}
                  label="Chip Type"
                >
                  <MenuItem value="chips_11mm_unwashed">chips_11mm_unwashed</MenuItem>
                  <MenuItem value="chips_11mm_washed">chips_11mm_washed</MenuItem>
                  <MenuItem value="chips_9mm_unwashed">chips_9mm_unwashed</MenuItem>
                  <MenuItem value="chips_9mm_washed">chips_9mm_washed</MenuItem>
                  <MenuItem value="chips_7mm_unwashed">chips_7mm_unwashed</MenuItem>
                  <MenuItem value="chips_7mm_washed">chips_7mm_washed</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="peat-type-label">Peat Type</InputLabel>
                <Select
                  labelId="peat-type-label"
                  id="peat-type"
                  name="peat_type"
                  value={formData.peat_type}
                  onChange={handleInputChange}
                  label="Peat Type"
                >
                  <MenuItem value="cocopeat_hi_ec">cocopeat_hi_ec</MenuItem>
                  <MenuItem value="cocopeat_low_ec">cocopeat_low_ec</MenuItem>
                </Select>
              </FormControl>
            </div>
          <TextField
            name="height"
            label="Sheet Height"
            fullWidth
            margin="normal"
            value={formData.height}
            onChange={handleInputChange}
          />
          <TextField
            name="width"
            label="Sheet Width"
            fullWidth
            margin="normal"
            value={formData.width}
            onChange={handleInputChange}
          />
          <TextField
            name="length"
            label="Sheet Length"
            fullWidth
            margin="normal"
            value={formData.length}
            onChange={handleInputChange}
          />
          <TextField
            name="ratioChips"
            label="Sheet Ratio (Chips)"
            fullWidth
            margin="normal"
            value={formData.ratioChips}
            onChange={handleInputChange}
          />
          <TextField
            name="ratioPeat"
            label="Sheet Ratio (Peat)"
            fullWidth
            margin="normal"
            value={formData.ratioPeat}
            onChange={handleInputChange}
          />
           <TextField
            name="weight"
            label="weight of sheet"
            fullWidth
            margin="normal"
            value={formData.weight}
            onChange={handleInputChange}
          />
        
           <TextField
            name="quantity"
            label="Quantity"
            fullWidth
            margin="normal"
            value={formData.quantity}
            onChange={handleInputChange}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TextField
            name="driverName"
            label="Driver Name"
            fullWidth
            margin="normal"
            value={formData.driverName}
            onChange={handleInputChange}
          />
          <TextField
            name="vehicleType"
            label="Vehicle Type"
            fullWidth
            margin="normal"
            value={formData.vehicleType}
            onChange={handleInputChange}
          />
          <TextField
            name="vehicleNumber"
            label="Vehicle Number"
            fullWidth
            margin="normal"
            value={formData.vehicleNumber}
            onChange={handleInputChange}
          />
          <TextField
            name="transportCompany"
            label="Transport Company"
            fullWidth
            margin="normal"
            value={formData.transportCompany}
            onChange={handleInputChange}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
