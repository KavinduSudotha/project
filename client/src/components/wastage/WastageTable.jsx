import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const BackendBaseUrl = 'http://localhost:3001/wastage';

const columns = [
  { width: 80, label: 'Sell ID', dataKey: 'sell_id' },
  { width: 150, label: 'Type', dataKey: 'type' },
  { width: 100, label: 'Quantity', dataKey: 'quantity', numeric: true },
  { width: 100, label: 'Price', dataKey: 'price', numeric: true },
  { width: 150, label: 'Date', dataKey: 'date' },
  { width: 100, label: 'Waste ID', dataKey: 'waste_id', numeric: true },
  { width: 120, label: 'Employee ID', dataKey: 'emp_id', numeric: true },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};


function fixedHeaderContent() {


  

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: '#ADD8E6' }}

        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
        >
          {column.dataKey === 'date' ? formatDate(row[column.dataKey]) : row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust format as needed
}

export default function SellWastageTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchSellWastageData();
  }, []);

  const fetchSellWastageData = async () => {
    try {
      const response = await axios.get(`${BackendBaseUrl}/sellwastagetable`);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching sell wastage data:', error);
    }
  };

  return (
    <Paper style={{ height: "87.9vh", width: "120vh" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
