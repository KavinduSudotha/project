import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RawTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/userawrout/getAllRecords')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 850, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Use ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Date</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Type</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Released Weight</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Job ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Batch ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Summary ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightblue' }}>Employee ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.use_id}>
              <TableCell>{row.use_id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.released_weight}</TableCell>
              <TableCell>{row.job_id}</TableCell>
              <TableCell>{row.batch_id}</TableCell>
              <TableCell>{row.summery_id}</TableCell>
              <TableCell>{row.employee_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RawTable;
