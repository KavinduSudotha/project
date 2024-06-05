import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import { usePageName } from '../context/PageNameContext'; 


const styles = `
  .MuiDataGrid-cell:focus-within {
    outline: none !important;
    border: none !important;
  }`;


const RecordsPricelist = () => {
  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Pricelist Records');
  }, []);


  const [rows, setRows] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3001/pricelist/viewrecordpricelist")
      .then((response) => {
        const mappedRows = response.data.map((record) => ({
          id: record.id,
          Date: record.date,
          '11mm Unwashed Chips': record.chips_11mm_unwashed,
          '11mm Washed Chips': record.chips_11mm_washed,
          '9mm Unwashed Chips': record.chips_9mm_unwashed,
          '9mm Washed Chips': record.chips_9mm_washed,
          '7mm Unwashed Chips': record.chips_7mm_unwashed,
          '7mm Washed Chips': record.chips_7mm_washed,
          'Cocopeat High EC': record.cocopeat_hi_ec,
          'Cocopeat Low EC': record.cocopeat_low_ec,
          'Density 60-69': record.density_60_69,
          'Density 70-79': record.density_70_79,
          'Density 80-89': record.density_80_89,
          'Density 90-99': record.density_90_99,
          'Density 100-109': record.density_100_109,
          'Sand 20-24': record.sand_20_24,
          'Sand 25-29': record.sand_25_29,
          'Sand 30-34': record.sand_30_34,
          'Sand 35-39': record.sand_35_39,
          'Sand 40-44': record.sand_40_44,
          'Sand 45-49': record.sand_45_49,
          'Sand 50-54': record.sand_50_54,
          'Wastage Deduction Chips 8%': record.wastage_deduction_chips_8,
          'Wastage Deduction Chips 9%': record.wastage_deduction_chips_9,
          'Wastage Deduction Chips 10%': record.wastage_deduction_chips_10,
          'Wastage Deduction Chips 11%': record.wastage_deduction_chips_11,
          'Wastage Deduction Chips 12%': record.wastage_deduction_chips_12,
          'Wastage Deduction Chips 13%': record.wastage_deduction_chips_13,
          'Wastage Deduction Chips 14%': record.wastage_deduction_chips_14,
          'Wastage Deduction Chips 15%': record.wastage_deduction_chips_15,
          'Wastage Deduction Chips 16%': record.wastage_deduction_chips_16,
          'Wastage Deduction Chips 17%': record.wastage_deduction_chips_17,
          'Wastage Deduction Chips 18%': record.wastage_deduction_chips_18,
          'Wastage Deduction Chips 19%': record.wastage_deduction_chips_19,
          'Wastage Deduction Chips 20%': record.wastage_deduction_chips_20,
          'Wastage Price Cocopeat Fiber': record.wastage_price_cocopeat_fiber,
          'Wastage Price Cocopeat Fine Dust': record.wastage_price_cocopeat_fine_dust,
          'Wastage Price 10C Sieved': record.wastage_price_10c_sieved,
          'Wastage Price 10C Not Sieved': record.wastage_price_10c_not_sieved,
          'Wastage Price 10C Upper Part': record.wastage_price_10c_upper_part,
          'Employee ID': record.employee_id,
        }));
        setRows(mappedRows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditClick = (rowId) => {
    console.log("Edit clicked for row ID:", rowId);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'Date', headerName: 'Date', width: 150 },
    { field: '11mm Unwashed Chips', headerName: '11mm Unwashed Chips', width: 150 },
    { field: '11mm Washed Chips', headerName: '11mm Washed Chips', width: 150 },
    { field: '9mm Unwashed Chips', headerName: '9mm Unwashed Chips', width: 150 },
    { field: '9mm Washed Chips', headerName: '9mm Washed Chips', width: 150 },
    { field: '7mm Unwashed Chips', headerName: '7mm Unwashed Chips', width: 150 },
    { field: '7mm Washed Chips', headerName: '7mm Washed Chips', width: 150 },
    { field: 'Cocopeat High EC', headerName: 'Cocopeat High EC', width: 150 },
    { field: 'Cocopeat Low EC', headerName: 'Cocopeat Low EC', width: 150 },
    { field: 'Density 60-69', headerName: 'Density 60-69', width: 150 },
    { field: 'Density 70-79', headerName: 'Density 70-79', width: 150 },
    { field: 'Density 80-89', headerName: 'Density 80-89', width: 150 },
    { field: 'Density 90-99', headerName: 'Density 90-99', width: 150 },
    { field: 'Density 100-109', headerName: 'Density 100-109', width: 150 },
    { field: 'Sand 20-24', headerName: 'Sand 20-24', width: 150 },
    { field: 'Sand 25-29', headerName: 'Sand 25-29', width: 150 },
    { field: 'Sand 30-34', headerName: 'Sand 30-34', width: 150 },
    { field: 'Sand 35-39', headerName: 'Sand 35-39', width: 150 },
    { field: 'Sand 40-44', headerName: 'Sand 40-44', width: 150 },
    { field: 'Sand 45-49', headerName: 'Sand 45-49', width: 150 },
    { field: 'Sand 50-54', headerName: 'Sand 50-54', width: 150 },
    { field: 'Wastage Deduction Chips 8%', headerName: 'Wastage Deduction Chips 8%', width: 150 },
    { field: 'Wastage Deduction Chips 9%', headerName: 'Wastage Deduction Chips 9%', width: 150 },
    { field: 'Wastage Deduction Chips 10%', headerName: 'Wastage Deduction Chips 10%', width: 150 },
    { field: 'Wastage Deduction Chips 11%', headerName: 'Wastage Deduction Chips 11%', width: 150 },
    { field: 'Wastage Deduction Chips 12%', headerName: 'Wastage Deduction Chips 12%', width: 150 },
    { field: 'Wastage Deduction Chips 13%', headerName: 'Wastage Deduction Chips 13%', width: 150 },
    { field: 'Wastage Deduction Chips 14%', headerName: 'Wastage Deduction Chips 14%', width: 150 },
    { field: 'Wastage Deduction Chips 15%', headerName: 'Wastage Deduction Chips 15%', width: 150 },
    { field: 'Wastage Deduction Chips 16%', headerName: 'Wastage Deduction Chips 16%', width: 150 },
    { field: 'Wastage Deduction Chips 17%', headerName: 'Wastage Deduction Chips 17%', width: 150 },
    { field: 'Wastage Deduction Chips 18%', headerName: 'Wastage Deduction Chips 18%', width: 150 },
    { field: 'Wastage Deduction Chips 19%', headerName: 'Wastage Deduction Chips 19%', width: 150 },
    { field: 'Wastage Deduction Chips 20%', headerName: 'Wastage Deduction Chips 20%', width: 150 },
    { field: 'Wastage Price Cocopeat Fiber', headerName: 'Wastage Price Cocopeat Fiber', width: 150 },
    { field: 'Wastage Price Cocopeat Fine Dust', headerName: 'Wastage Price Cocopeat Fine Dust', width: 150 },
    { field: 'Wastage Price 10C Sieved', headerName: 'Wastage Price 10C Sieved', width: 150 },
    { field: 'Wastage Price 10C Not Sieved', headerName: 'Wastage Price 10C Not Sieved', width: 150 },
    { field: 'Wastage Price 10C Upper Part', headerName: 'Wastage Price 10C Upper Part', width: 150 },
    { field: 'Employee ID', headerName: 'Employee ID', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }} className='mt-2 mx-5'>
      <Box sx={{ width: '100%', typography: 'body1', '& .MuiDataGrid-root': { border: 'none' } }}>
        <style>{styles}</style>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}

          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </div>
  );
};

export default RecordsPricelist;
