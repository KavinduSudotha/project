import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


const BackendBaseUrl = 'http://localhost:3001/buyraw'; // Update this with your actual backend base URL

const BuyRawTable = () => {
  const [buyRawData, setBuyRawData] = useState([]);

  useEffect(() => {
    const fetchBuyRawData = async () => {
      try {
        const response = await axios.get(`${BackendBaseUrl}/buyrawtable`);
        setBuyRawData(response.data);
      } catch (error) {
        console.error('Failed to fetch buy raw data:', error);
      }
    };

    fetchBuyRawData();
  }, []);

  return (
    <Paper className='mt-20'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Employee ID</TableCell>
            <TableCell>Wastage Chip</TableCell>
            <TableCell>Density Peat</TableCell>
            <TableCell>Sand Peat</TableCell>
            <TableCell>Suggested Price</TableCell>
            <TableCell>Buy Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buyRawData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.employeeid}</TableCell>
              <TableCell>{row.wastagechip}</TableCell>
              <TableCell>{row.densitypeat}</TableCell>
              <TableCell>{row.sandpeat}</TableCell>
              <TableCell>{row.suggestprice}</TableCell>
              <TableCell>{row.buyprice}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BuyRawTable;
