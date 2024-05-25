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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Use ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Released Weight</TableCell>
            <TableCell>Job ID</TableCell>
            <TableCell>Batch ID</TableCell>
            <TableCell>Summary ID</TableCell>
            <TableCell>Employee ID</TableCell>
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
