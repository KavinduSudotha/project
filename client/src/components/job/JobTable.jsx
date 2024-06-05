import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { usePageName } from '../../context/PageNameContext';

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

  const handleUpdate = async (jobId, newStatus) => {
    setJobs(
      jobs.map((job) =>
        job.job_id === jobId ? { ...job, status: newStatus } : job
      )
    );
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
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(job.status);

  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      await axios.put(`http://localhost:3001/jobrout/${job.job_id}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
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
              <Box sx={{ background: 'linear-gradient(to bottom right, #FFFFFF, #E0E0E0)' }}>
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
              </Box>
              <Box sx={{ background: `linear-gradient(to bottom, #FFFFFF, #FFFFFF), linear-gradient(to bottom, #007bff, #007bff)`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  border: '1px solid #FFFFFF',
                  borderRadius: '4px',}}>
                <Typography variant="h6" gutterBottom component="div">
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
              </Box>
              <Box>
                <Button onClick={() => onUpdate(job.job_id)} variant="contained" color="primary" sx={{ marginRight: 2 }}>
                  Update
                </Button>
                <Button onClick={() => onDelete(job.job_id)} variant="contained" color="error">
                  Delete
                </Button>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default JobTable;
