import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, TextField, Box, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';
import { usePageName } from '../context/PageNameContext';

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
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Add Job');
  }, []);

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
    sheet_per_pallet: '',
    container_size: '',
    pallets_per_container: '',
    driverName: '',
    vehicleType: '',
    vehicleNumber: '',
    transportCompany: '',
  });

  const [errors, setErrors] = useState({});
  const [validatedTabs, setValidatedTabs] = useState([true, false, false]); // Initially, the first tab is enabled

  const handleChange = (event, newValue) => {
    if (validatedTabs[newValue]) {
      setValue(newValue);
    }
  };

  const handleChangeIndex = (index) => {
    if (validatedTabs[index]) {
      setValue(index);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (tab) => {
    let tempErrors = {};

    if (tab === 0) {
      if (!formData.dueDate) tempErrors.dueDate = 'Due date is required';
      if (!formData.customerName) tempErrors.customerName = 'Customer name is required';
      else if (formData.customerName.length > 30) tempErrors.customerName = 'Customer name should be at most 30 characters';
      if (formData.address.length > 40) tempErrors.address = 'Address should be at most 40 characters';
    }

    if (tab === 1) {
      if (!formData.chip_type) tempErrors.chip_type = 'Chip type is required';
      if (!formData.peat_type) tempErrors.peat_type = 'Peat type is required';
      if (!formData.height || isNaN(formData.height)) tempErrors.height = 'Height is required and should be a number';
      if (!formData.width || isNaN(formData.width)) tempErrors.width = 'Width is required and should be a number';
      if (!formData.length || isNaN(formData.length)) tempErrors.length = 'Length is required and should be a number';
      if (!formData.ratioChips || isNaN(formData.ratioChips)) tempErrors.ratioChips = 'Sheet ratio (Chips) is required and should be a number';
      if (!formData.ratioPeat || isNaN(formData.ratioPeat)) tempErrors.ratioPeat = 'Sheet ratio (Peat) is required and should be a number';
      if (!formData.weight || isNaN(formData.weight)) tempErrors.weight = 'Weight is required and should be a number';
      if (!formData.quantity || isNaN(formData.quantity)) tempErrors.quantity = 'Quantity is required and should be a number';
      if (!formData.sheet_per_pallet || isNaN(formData.sheet_per_pallet)) tempErrors.sheet_per_pallet = 'Sheet per pallet is required and should be a number';
    }

    if (tab === 2) {
      if (!formData.container_size) tempErrors.container_size = 'Container size is required';
      if (formData.transportCompany.length > 40) tempErrors.transportCompany = 'Transport company should be at most 40 characters';
      if (formData.driverName.length > 40) tempErrors.driverName = 'Driver name should be at most 40 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm(value)) {
      setValidatedTabs((prev) => {
        const newValidatedTabs = [...prev];
        newValidatedTabs[value + 1] = true; // Enable the next tab
        return newValidatedTabs;
      });
      setValue((prevValue) => prevValue + 1); // Move to the next tab
    }
  };

  const handleClear = () => {
    setFormData({
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
      sheet_per_pallet: '',
      container_size: '',
      pallets_per_container: '',
      driverName: '',
      vehicleType: '',
      vehicleNumber: '',
      transportCompany: '',
    });
    setErrors({});
    setValidatedTabs([true, false, false]); // Reset to initial state with only the first tab enabled
    setValue(0); // Reset to the first tab
  };

  const handleSubmit = async () => {
    if (validateForm(value)) {
      try {
        const response = await axios.post('http://localhost:3001/jobrout/addjob', {
          ...formData,
          employeeId: '0000',
          status: 'unstarted', // hardcoded employee ID
        });
        console.log('Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Job added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        handleClear(); // Clear form data after submission
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Basic Job Details" disabled={!validatedTabs[0]} />
          <Tab label="Sheet Details" disabled={!validatedTabs[1]} />
          <Tab label="Transport Details" disabled={!validatedTabs[2]} />
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
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />
          <TextField
            name="customerName"
            label="Customer Name"
            fullWidth
            margin="normal"
            value={formData.customerName}
            onChange={handleInputChange}
            error={!!errors.customerName}
            helperText={errors.customerName}
          />
          <TextField
            name="address"
            label="Destination Address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
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
                error={!!errors.chip_type}
              >
                <MenuItem value="chips_11mm_unwashed">chips_11mm_unwashed</MenuItem>
                <MenuItem value="chips_11mm_washed">chips_11mm_washed</MenuItem>
                <MenuItem value="chips_9mm_unwashed">chips_9mm_unwashed</MenuItem>
                <MenuItem value="chips_9mm_washed">chips_9mm_washed</MenuItem>
                <MenuItem value="chips_7mm_unwashed">chips_7mm_unwashed</MenuItem>
                <MenuItem value="chips_7mm_washed">chips_7mm_washed</MenuItem>
              </Select>
              {errors.chip_type && <Alert severity="error">{errors.chip_type}</Alert>}
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
                error={!!errors.peat_type}
              >
                <MenuItem value="cocopeat_hi_ec">cocopeat_hi_ec</MenuItem>
                <MenuItem value="cocopeat_low_ec">cocopeat_low_ec</MenuItem>
              </Select>
              {errors.peat_type && <Alert severity="error">{errors.peat_type}</Alert>}
            </FormControl>
          </div>
          <TextField
            name="height"
            label="Sheet Height (cm)"
            fullWidth
            margin="normal"
            value={formData.height}
            onChange={handleInputChange}
            error={!!errors.height}
            helperText={errors.height}
          />
          <TextField
            name="width"
            label="Sheet Width (cm)"
            fullWidth
            margin="normal"
            value={formData.width}
            onChange={handleInputChange}
            error={!!errors.width}
            helperText={errors.width}
          />
          <TextField
            name="length"
            label="Sheet Length (cm)"
            fullWidth
            margin="normal"
            value={formData.length}
            onChange={handleInputChange}
            error={!!errors.length}
            helperText={errors.length}
          />
          <TextField
            name="ratioChips"
            label="Sheet Ratio (Chips)"
            fullWidth
            margin="normal"
            value={formData.ratioChips}
            onChange={handleInputChange}
            error={!!errors.ratioChips}
            helperText={errors.ratioChips}
          />
          <TextField
            name="ratioPeat"
            label="Sheet Ratio (Peat)"
            fullWidth
            margin="normal"
            value={formData.ratioPeat}
            onChange={handleInputChange}
            error={!!errors.ratioPeat}
            helperText={errors.ratioPeat}
          />
          <TextField
            name="weight"
            label="Weight of Sheet (g)"
            fullWidth
            margin="normal"
            value={formData.weight}
            onChange={handleInputChange}
            error={!!errors.weight}
            helperText={errors.weight}
          />
          <TextField
            name="quantity"
            label="Quantity"
            fullWidth
            margin="normal"
            value={formData.quantity}
            onChange={handleInputChange}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            name="sheet_per_pallet"
            label="Sheet Per Pallet"
            fullWidth
            margin="normal"
            value={formData.sheet_per_pallet}
            onChange={handleInputChange}
            error={!!errors.sheet_per_pallet}
            helperText={errors.sheet_per_pallet}
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="container_size">Container Size</InputLabel>
            <Select
              labelId="container_size"
              id="container_size"
              name="container_size"
              value={formData.container_size}
              onChange={handleInputChange}
              label="Container Size"
              error={!!errors.container_size}
            >
              <MenuItem value="20FT Flat Rack with sides">20FT Flat Rack with sides</MenuItem>
              <MenuItem value="20FT Flat Rack without sides">20FT Flat Rack without sides</MenuItem>
              <MenuItem value="40FT Flat Rack with Sides">40FT Flat Rack with Sides</MenuItem>
              <MenuItem value="40FT Flat Rack without sides">40FT Flat Rack without sides</MenuItem>
            </Select>
            {errors.container_size && <Alert severity="error">{errors.container_size}</Alert>}
          </FormControl>
          <TextField
            name="pallets_per_container"
            label="Pallets Per Container"
            fullWidth
            margin="normal"
            value={formData.pallets_per_container}
            onChange={handleInputChange}
            error={!!errors.pallets_per_container}
            helperText={errors.pallets_per_container}
          />
          <TextField
            name="transportCompany"
            label="Transport Company"
            fullWidth
            margin="normal"
            value={formData.transportCompany}
            onChange={handleInputChange}
            error={!!errors.transportCompany}
            helperText={errors.transportCompany}
          />
          <TextField
            name="driverName"
            label="Driver Name"
            fullWidth
            margin="normal"
            value={formData.driverName}
            onChange={handleInputChange}
            error={!!errors.driverName}
            helperText={errors.driverName}
          />
          <TextField
            name="vehicleNumber"
            label="Vehicle Number"
            fullWidth
            margin="normal"
            value={formData.vehicleNumber}
            onChange={handleInputChange}
            error={!!errors.vehicleNumber}
            helperText={errors.vehicleNumber}
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
