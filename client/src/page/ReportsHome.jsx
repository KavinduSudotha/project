import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect } from 'react';
import { usePageName } from '../context/PageNameContext';

const ReportHome = () => {
  const { setPage } = usePageName();


  useEffect(() => {
    setPage('Table Export');
  }, []);



    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tableName, setTableName] = useState('');
    const [tableData, setTableData] = useState([]);

    const tables = [
        'addwastage', 'buyraw', 'inventory', 'job', 'notes', 'sellwastage',
        'summarytable', 'summarytablewastage', 'test', 'user', 'use_raw',
        'wastage', 'weeklypricelist'
    ];

    const fetchData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/admin/fetchdata', {
                startDate,
                endDate,
                tableName
            });
            setTableData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const exportAsExcel = () => {
        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'report.xlsx');
    };

    const exportAsPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: '#table' });
        doc.save('report.pdf');
    };

    return (
        <div className="container mx-auto p-4 mt-10">
    
            <div className="mb-4 gap-10 flex" >
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="mr-4"
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                  <div className="mb-4 ">
                <TextField
                    select
                    label="Select Table"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    className="mr-4"
                    style={{ minWidth: '200px' }}
                >
                    {tables.map((table) => (
                        <MenuItem key={table} value={table}>
                            {table}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            </div>
          

            <div className=' gap-10 flex'>
            <Button variant="contained" color="primary" onClick={fetchData} margin >
                Fetch Data
            </Button>
            
                     <Button variant="contained" color="secondary" onClick={exportAsPDF} className="mt-4 mr-2">
                        Export as PDF
                    </Button>
                    <Button variant="contained" color="secondary" onClick={exportAsExcel} className="mt-4">
                        Export as Excel
                    </Button></div>
            {tableData.length > 0 && (
                <>
                    <table id="table" className="min-w-full mt-4">
                        <thead>
                            <tr>
                                {Object.keys(tableData[0]).map((key) => (
                                    <th key={key} className="px-4 py-2">{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i} className="border px-4 py-2">{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 
                </>
            )}
        </div>
    );
};

export default ReportHome;
