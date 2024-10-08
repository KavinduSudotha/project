import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const BackendBaseUrl = 'http://localhost:3001/wastage';

const headCells = [
  { id: 'date', label: 'Date' },
  { id: 'type', label: 'Type' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'emp_id', label: 'Employee ID' },
];

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ position: 'sticky', top: 0, background: 'lightblue', zIndex: 1 }}
            key={headCell.id}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const AddWastageTable = () => {
  const [wastageData, setWastageData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15); // Set default rows per page to 15

  useEffect(() => {
    fetchWastageData();
  }, []);

  const fetchWastageData = async () => {
    try {
      const response = await axios.get(`${BackendBaseUrl}/getwastage`);
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setWastageData(sortedData);
    } catch (error) {
      console.error('Error fetching wastage data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Paper>
        <TableContainer sx={{ height: '82.5vh' }}> {/* Set table height to 80vh */}
          <Table aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead />
            <TableBody>
              {wastageData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.waste_id}>
                   <TableCell>{row.date.split('T')[0]}</TableCell>

                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.emp_id}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50, 100]} // Adjust available options
          component="div"
          count={wastageData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AddWastageTable;
