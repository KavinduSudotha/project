import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography } from '@mui/material';
import axios from 'axios';

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

  const handleGenerateReport = async () => {
    try {
      const response = await axios.post('http://localhost:3001/admin/generate-report', {
        reportType,
        startDate,
        endDate,
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
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
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full mb-4"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={handleGenerateReport}>
        Generate Report
      </Button>
      {reportData && (
        <div className="mt-4">
          <Typography variant="h6">Report Data:</Typography>
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
};

export default Report;
