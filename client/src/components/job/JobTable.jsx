import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Card,CardContent,TableRow, TableCell, IconButton, Collapse, Box, Typography, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Table, TableBody, TableContainer, TableHead, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import { usePageName } from '../../context/PageNameContext';
import { jwtDecode } from "jwt-decode";

const statusOptions = [
  'unstarted',
  'started',
  'Gathering raw',
  'Processing',
  'Hold',
  'completed',
  'cancelled',
];

function JobTable() {
  const { setPage } = usePageName();
  useEffect(() => {
    setPage('Jobs');
  }, []);

  const [jobs, setJobs] = useState([]);




  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get('http://localhost:3001/jobrout/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:3001/jobrout/${jobId}`);
      setJobs(jobs.filter((job) => job.job_id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };
  const handleUpdate = async (jobId, updatedFields) => {
    try {
      await axios.put(`http://localhost:3001/jobrout/${jobId}`, updatedFields);
      const updatedJobs = jobs.map((job) =>
        job.job_id === jobId ? { ...job, ...updatedFields } : job
      );
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Job ID</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Created by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <JobRow key={job.job_id} job={job} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function JobRow({ job, onDelete, onUpdate }) {

  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const UserType = decodedToken.role;

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(job.status);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({
    height: job.height,
    width: job.width,
    length: job.length,
    ratio_chips: job.ratio_chips,
    ratio_peat: job.ratio_peat,
    quantity: job.quantity,
    container_size: job.container_size,
    sheet_per_pallet: job.sheet_per_pallet,
    pallets_per_container: job.pallets_per_container,
    transport_company: job.transport_company,
    driver_name: job.driver_name,
    vehicle_number: job.vehicle_number,
    due_date: job.due_date,
    customer_name: job.customer_name,
    address: job.address,
    chip_type: job.chip_type,
    peat_type: job.peat_type,
       weight: job.weight,
container_size: job.container_size,
driver_name: job.driver_name,
vehicle_number: job.vehicle_number,
transport_company: job.transport_company,
note: job.note

    // Add other fields here
  });

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`http://localhost:3001/jobrout/${job.job_id}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleOpenUpdateDialog = () => {
    setUpdatedFields({
      height: job.height,
      width: job.width,
      length: job.length,
      ratio_chips: job.ratio_chips,
      ratio_peat: job.ratio_peat,
      quantity: job.quantity,
      container_size: job.container_size,
      sheet_per_pallet: job.sheet_per_pallet,
      pallets_per_container: job.pallets_per_container,
      transport_company: job.transport_company,
      driver_name: job.driver_name,
      vehicle_number: job.vehicle_number,
      due_date: job.due_date,
      customer_name: job.customer_name,
      address: job.address,
      chip_type: job.chip_type,
      peat_type: job.peat_type,
         weight: job.weight,
  container_size: job.container_size,
  driver_name: job.driver_name,
  vehicle_number: job.vehicle_number,
  transport_company: job.transport_company,
  note: job.note
    });
    setUpdateDialogOpen(true);
  };


  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleUpdateFieldsChange = (event) => {
    const { name, value } = event.target;
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    onUpdate(job.job_id, updatedFields);
    handleCloseUpdateDialog();
  };


  return (
    <>
      <TableRow sx={{ backgroundColor: '#f3f3f3' }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{job.job_id}</TableCell>
        <TableCell>{job.created_date}</TableCell>
        <TableCell>{job.due_date}</TableCell>
        <TableCell>
        <Select value={status} onChange={handleChange} fullWidth>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>{job.customer_name}</TableCell>
        <TableCell>{job.note}</TableCell>
        <TableCell>{job.employee_id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    Sheet Details
                  </Typography>
                  <Table size="small" aria-label="sheet details">
                    <TableHead>
                      <TableRow>
                        <TableCell>Height</TableCell>
                        <TableCell>Width</TableCell>
                        <TableCell>Length</TableCell>
                        <TableCell>Ratio Chips</TableCell>
                        <TableCell>Ratio Peat</TableCell>
                        <TableCell>Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{job.height}</TableCell>
                        <TableCell>{job.width}</TableCell>
                        <TableCell>{job.length}</TableCell>
                        <TableCell>{job.ratio_chips}</TableCell>
                        <TableCell>{job.ratio_peat}</TableCell>
                        <TableCell>{job.quantity}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Typography variant="h6" gutterBottom component="div" style={{ marginTop: '1rem' }}>
                    Transport Details
                  </Typography>
                  <Table size="small" aria-label="driver details">
                    <TableHead>
                      <TableRow>
                        <TableCell>container_size</TableCell>
                        <TableCell>sheet_per_pallet</TableCell>
                        <TableCell>pallets_per_container</TableCell>
                        <TableCell>Transport Company </TableCell>
                        <TableCell>driver_name</TableCell>
                        <TableCell>vehicle_number</TableCell>
                        <TableCell>production_logistics_manager_id</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{job.container_size}</TableCell>
                        <TableCell>{job.sheet_per_pallet}</TableCell>
                        <TableCell>{job.pallets_per_container}</TableCell>
                        <TableCell>{job.transport_company}</TableCell>
                        <TableCell>{job.driver_name}</TableCell>
                        <TableCell>{job.vehicle_number}</TableCell>
                        <TableCell>{job.production_logistics_manager_id}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Box marginTop="1rem" display="flex" justifyContent="flex-end">
                  {((UserType === "Director") && 
    <> <Button onClick={handleOpenUpdateDialog} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Update
              </Button>
              <Button onClick={() => onDelete(job.job_id)} variant="contained" color="error">
                Delete
              </Button>     </>
)}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update Job</DialogTitle>
        <DialogContent>
        <DialogContent>
  <TextField
    autoFocus
    margin="dense"
    label="Height"
    type="number"
    fullWidth
    name="height"
    value={updatedFields.height}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Width"
    type="number"
    fullWidth
    name="width"
    value={updatedFields.width}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Length"
    type="number"
    fullWidth
    name="length"
    value={updatedFields.length}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Ratio Chips"
    type="number"
    fullWidth
    name="ratio_chips"
    value={updatedFields.ratio_chips}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Ratio Peat"
    type="number"
    fullWidth
    name="ratio_peat"
    value={updatedFields.ratio_peat}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Quantity"
    type="number"
    fullWidth
    name="quantity"
    value={updatedFields.quantity}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Container Size"
    fullWidth
    name="container_size"
    value={updatedFields.container_size}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Sheet Per Pallet"
    type="number"
    fullWidth
    name="sheet_per_pallet"
    value={updatedFields.sheet_per_pallet}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Pallets Per Container"
    type="number"
    fullWidth
    name="pallets_per_container"
    value={updatedFields.pallets_per_container}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Transport Company"
    fullWidth
    name="transport_company"
    value={updatedFields.transport_company}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Driver Name"
    fullWidth
    name="driver_name"
    value={updatedFields.driver_name}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Vehicle Number"
    fullWidth
    name="vehicle_number"
    value={updatedFields.vehicle_number}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Due Date"
    type="date"
    fullWidth
    name="due_date"
    value={updatedFields.due_date}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Customer Name"
    fullWidth
    name="customer_name"
    value={updatedFields.customer_name}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Address"
    fullWidth
    name="address"
    value={updatedFields.address}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Chip Type"
    fullWidth
    name="chip_type"
    value={updatedFields.chip_type}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Peat Type"
    fullWidth
    name="peat_type"
    value={updatedFields.peat_type}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Weight"
    type="number"
    fullWidth
    name="weight"
    value={updatedFields.weight}
    onChange={handleUpdateFieldsChange}
  />
  <TextField
    margin="dense"
    label="Note"
    fullWidth
    name="note"
    value={updatedFields.note}
    onChange={handleUpdateFieldsChange}
  />
</DialogContent>

          {/* Add other fields for update */}
        </DialogContent>
        <DialogActions>
    
        <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">Update</Button>


        </DialogActions>
      </Dialog>

    </>
  );
}

export default JobTable;
