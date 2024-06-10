// src/components/Report.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import { Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate, reportType, tables } = location.state || {};

  useEffect(() => {
    if (!startDate || !endDate || !reportType || !tables) {
      navigate('/');
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await axios.post('http://localhost:3001/admin/generateReport', { startDate, endDate, reportType, tables });
        setReportData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReport();
  }, [startDate, endDate, reportType, tables, navigate]);

  const [reportData, setReportData] = useState(null);

  const exportPDF = async () => {
    const response = await axios.post('http://localhost:3001/admin/exportPDF', { startDate, endDate, reportType, tables }, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    saveAs(blob, 'report.pdf');
  };

  const exportExcel = async () => {
    const response = await axios.post('http://localhost:3001/admin/exportExcel', { startDate, endDate, reportType, tables }, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'report.xlsx');
  };

  if (!startDate || !endDate || !reportType || !tables) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="p-8">
      <Button variant="contained" color="secondary" onClick={exportPDF} className="mr-2">
        Export as PDF
      </Button>
      <Button variant="contained" color="primary" onClick={exportExcel}>
        Export as Spreadsheet
      </Button>
      <div className="mt-4 m-20">
        {reportData ? (
          <div>
            <h2>Report Data</h2>
            <pre>{JSON.stringify(reportData, null, 2)}</pre>
            {reportType.includes('analyst') && (
              <div>
                <h3>Analyst Insights</h3>
                {/* Display the analyst insights here */}
                <p>{reportData.analyst.insights}</p>
                <Line data={getLineChartData(reportData.analyst.data)} />
                <Scatter data={getScatterChartData(reportData.analyst.data)} />
              </div>
            )}
            {tables.includes('addwastage') && (
              <div>
                <h3>Add Wastage Analysis</h3>
                <Line data={getLineChartData(reportData.addwastage)} />
                <Scatter data={getScatterChartData(reportData.addwastage)} />
              </div>
            )}
            {tables.includes('buyraw') && (
              <div>
                <h3>Buy Raw Analysis</h3>
                <Line data={getLineChartData(reportData.buyraw)} />
                <Scatter data={getScatterChartData(reportData.buyraw)} />
              </div>
            )}
            {/* Repeat for other tables as needed */}
          </div>
        ) : (
          <p>Loading report data...</p>
        )}
      </div>
    </div>
  );
};

const getLineChartData = (data) => {
  return {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Quantity',
        data: data.map(item => item.quantity),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };
};

const getScatterChartData = (data) => {
  return {
    datasets: [
      {
        label: 'Quantity',
        data: data.map(item => ({ x: item.date, y: item.quantity })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };
};

export default Report;
