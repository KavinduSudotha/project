import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';

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
    <Paper>
      <div style={{ height: '90vh', overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Buy ID</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Date</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Type</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Emp ID</TableCell> {/* New Emp ID column */}
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Wastage Chip</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Density Peat</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Sand Peat</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Suggested Price</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Buy Price</TableCell>
              <TableCell sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyRawData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.buyid}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.employeeid}</TableCell> {/* Display Emp ID */}
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
      </div>
    </Paper>
  );
};

export default BuyRawTable;
