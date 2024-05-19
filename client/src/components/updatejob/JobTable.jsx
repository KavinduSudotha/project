// components/JobTable.js
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
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Swal from 'sweetalert2';

function JobTable() {
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

  const handleUpdate = async (job) => {
    const { value: formValues } = await Swal.fire({
      title: 'Update Job',
      html: `
        
        <p>job.due_date</p>
        <input  id="swal-due_date" class="swal2-input" placeholder="Due Date" value="${job.due_date}" />
        <input id="swal-height" class="swal2-input" placeholder="Height" value="${job.height}" />
        <input id="swal-width" class="swal2-input" placeholder="Width" value="${job.width}" />
        <input id="swal-length" class="swal2-input" placeholder="Length" value="${job.length}" />
        <input id="swal-ratio_chips" class="swal2-input" placeholder="Ratio Chips" value="${job.ratio_chips}" />
        <input id="swal-ratio_peat" class="swal2-input" placeholder="Ratio Peat" value="${job.ratio_peat}" />
        <input id="swal-note" class="swal2-input" placeholder="Note" value="${job.note}" />
        <input id="swal-status" class="swal2-input" placeholder="Status" value="${job.status}" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          due_date: document.getElementById('swal-due_date').value,
          height: document.getElementById('swal-height').value,
          width: document.getElementById('swal-width').value,
          length: document.getElementById('swal-length').value,
          ratio_chips: document.getElementById('swal-ratio_chips').value,
          ratio_peat: document.getElementById('swal-ratio_peat').value,
          note: document.getElementById('swal-note').value,
          status: document.getElementById('swal-status').value,
        };
      },
    });
  
    if (formValues) {
      try {
        await axios.put(`http://localhost:3001/jobrout/${job.job_id}`, formValues);
        setJobs(
          jobs.map((j) => (j.job_id === job.job_id ? { ...j, ...formValues } : j))
        );
      } catch (error) {
        console.error('Error updating job:', error);
      }
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
            <TableCell>reated by</TableCell>
            <TableCell>Actions</TableCell>
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

// components/JobTable.js// components/JobTable.js

function JobRow({ job, onDelete, onUpdate }) {
    const [open, setOpen] = useState(false);
  
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
          <TableCell>{job.status}</TableCell>
          <TableCell>{job.customer_name}</TableCell>
          <TableCell>{job.note}</TableCell>
          <TableCell>{job.employee_id}</TableCell>
          <TableCell>
            <button onClick={() => onUpdate(job)} className=' bg-green-500 mx-2 px-3 py-1 rounded-lg'>Update</button>
            <button onClick={() => onDelete(job.job_id)} className=' bg-red-500 mx-2 px-3 py-1 rounded-lg'>Delete</button>
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
  
export default JobTable;
