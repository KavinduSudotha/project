import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const reportTypes = [
  { value: 'dailyWastage', label: 'Daily Wastage Report' },
  { value: 'monthlyWastage', label: 'Monthly Wastage Summary' },
  { value: 'dailyPurchases', label: 'Daily Raw Material Purchases' },
  { value: 'monthlyPurchases', label: 'Monthly Raw Material Cost Summary' },
  { value: 'currentInventory', label: 'Current Inventory Status' },
  { value: 'inventoryChange', label: 'Inventory Change Over Time' },
  { value: 'wastageInventoryCorrelation', label: 'Wastage and Inventory Correlation' },
  { value: 'purchaseInventoryEffect', label: 'Raw Material Purchase and Inventory Levels' },
];

const Report = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateReport = async () => {
    if (!reportType || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/admin/generate-report', {
        reportType,
        startDate,
        endDate,
      });
      setReportData(response.data);
    } catch (error) {
      setError('Error generating report. Please try again.');
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Report Generator</Typography>
      <TextField
        select
        label="Report Type"
        value={reportType}
        onChange={(e) => setReportType(e.target.value)}
        className="w-full mb-4"
        required
      >
        {reportTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full mb-4"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full mb-4"
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button variant="contained" color="primary" onClick={handleGenerateReport} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Generate Report'}
      </Button>
      {error && (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      )}
      {reportData && (
        <TableContainer component={Paper} className="mt-4">
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
              {reportData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{dayjs(row.date).format('YYYY-MM-DD')}</TableCell>
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
        </TableContainer>
      )}
    </Container>
  );
};

export default Report;
