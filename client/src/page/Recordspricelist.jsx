import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

const RecordsPricelist = () => {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pricelist/viewrecordpricelist");
        setRecords(response.data);
      } catch (error) {
        console.error("Failed to fetch price list records", error);
      }
    };

    fetchRecords();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h5" gutterBottom>
        Price List Records
      </Typography>
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>11mm Unwashed Chips</TableCell>
                <TableCell>11mm Washed Chips</TableCell>
                <TableCell>9mm Unwashed Chips</TableCell>
                <TableCell>9mm Washed Chips</TableCell>
                <TableCell>7mm Unwashed Chips</TableCell>
                <TableCell>7mm Washed Chips</TableCell>
                <TableCell>Cocopeat High EC</TableCell>
                <TableCell>Cocopeat Low EC</TableCell>
                <TableCell>Density 60-69</TableCell>
                <TableCell>Density 70-79</TableCell>
                <TableCell>Density 80-89</TableCell>
                <TableCell>Density 90-99</TableCell>
                <TableCell>Density 100-109</TableCell>
                <TableCell>Sand 20-24</TableCell>
                <TableCell>Sand 25-29</TableCell>
                <TableCell>Sand 30-34</TableCell>
                <TableCell>Sand 35-39</TableCell>
                <TableCell>Sand 40-44</TableCell>
                <TableCell>Sand 45-49</TableCell>
                <TableCell>Sand 50-54</TableCell>
                <TableCell>Wastage Deduction Chips 8%</TableCell>
                <TableCell>Wastage Deduction Chips 9%</TableCell>
                <TableCell>Wastage Deduction Chips 10%</TableCell>
                <TableCell>Wastage Deduction Chips 11%</TableCell>
                <TableCell>Wastage Deduction Chips 12%</TableCell>
                <TableCell>Wastage Deduction Chips 13%</TableCell>
                <TableCell>Wastage Deduction Chips 14%</TableCell>
                <TableCell>Wastage Deduction Chips 15%</TableCell>
                <TableCell>Wastage Deduction Chips 16%</TableCell>
                <TableCell>Wastage Deduction Chips 17%</TableCell>
                <TableCell>Wastage Deduction Chips 18%</TableCell>
                <TableCell>Wastage Deduction Chips 19%</TableCell>
                <TableCell>Wastage Deduction Chips 20%</TableCell>
                <TableCell>Wastage Price Cocopeat Fiber</TableCell>
                <TableCell>Wastage Price Cocopeat Fine Dust</TableCell>
                <TableCell>Wastage Price 10C Sieved</TableCell>
                <TableCell>Wastage Price 10C Not Sieved</TableCell>
                <TableCell>Wastage Price 10C Upper Part</TableCell>
                <TableCell>Employee ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.chips_11mm_unwashed}</TableCell>
                    <TableCell>{record.chips_11mm_washed}</TableCell>
                    <TableCell>{record.chips_9mm_unwashed}</TableCell>
                    <TableCell>{record.chips_9mm_washed}</TableCell>
                    <TableCell>{record.chips_7mm_unwashed}</TableCell>
                    <TableCell>{record.chips_7mm_washed}</TableCell>
                    <TableCell>{record.cocopeat_hi_ec}</TableCell>
                    <TableCell>{record.cocopeat_low_ec}</TableCell>
                    <TableCell>{record.density_60_69}</TableCell>
                    <TableCell>{record.density_70_79}</TableCell>
                    <TableCell>{record.density_80_89}</TableCell>
                    <TableCell>{record.density_90_99}</TableCell>
                    <TableCell>{record.density_100_109}</TableCell>
                    <TableCell>{record.sand_20_24}</TableCell>
                    <TableCell>{record.sand_25_29}</TableCell>
                    <TableCell>{record.sand_30_34}</TableCell>
                    <TableCell>{record.sand_35_39}</TableCell>
                    <TableCell>{record.sand_40_44}</TableCell>
                    <TableCell>{record.sand_45_49}</TableCell>
                    <TableCell>{record.sand_50_54}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_8}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_9}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_10}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_11}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_12}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_13}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_14}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_15}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_16}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_17}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_18}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_19}</TableCell>
                    <TableCell>{record.wastage_deduction_chips_20}</TableCell>
                    <TableCell>{record.wastage_price_cocopeat_fiber}</TableCell>
                    <TableCell>{record.wastage_price_cocopeat_fine_dust}</TableCell>
                    <TableCell>{record.wastage_price_10c_sieved}</TableCell>
                    <TableCell>{record.wastage_price_10c_not_sieved}</TableCell>
                    <TableCell>{record.wastage_price_10c_upper_part}</TableCell>
                    <TableCell>{record.employee_id}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={records.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RecordsPricelist;
