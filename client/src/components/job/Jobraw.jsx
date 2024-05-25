import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';

const statusOptions = [
  'unstarted',
  'started',
  'Gathering raw',
  'Processing',
  'Hold',
  'completed',
  'cancelled',
];

function JobRow({ job, onDelete, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(job.status); // Initialize status with job.status

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`http://localhost:3001/jobrout/${job.job_id}`, { status: newStatus });
      onUpdate(job.job_id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };



  return (
    <>
      <TableRow>
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
        <TableCell>
          <button onClick={() => onUpdate(job)} className="bg-green-500 mx-2 px-3 py-1 rounded-lg">
            Update
          </button>
          <button onClick={() => onDelete(job.job_id)} className="bg-red-500 mx-2 px-3 py-1 rounded-lg">
            Delete
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
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
              <Typography variant="h6" gutterBottom component="div">
                Driver Details
              </Typography>
              <Table size="small" aria-label="driver details">
                <TableHead>
                  <TableRow>
                    <TableCell>Driver Name</TableCell>
                    <TableCell>Vehicle Type</TableCell>
                    <TableCell>Vehicle Number</TableCell>
                    <TableCell>Transport Company</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{job.driver_name}</TableCell>
                    <TableCell>{job.vehicle_type}</TableCell>
                    <TableCell>{job.vehicle_number}</TableCell>
                    <TableCell>{job.transport_company}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default JobRow;
