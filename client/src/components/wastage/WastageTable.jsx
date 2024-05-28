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
  { width: 200, label: 'Sell ID', dataKey: 'sell_id' },
  { width: 200, label: 'Type', dataKey: 'type' },
  { width: 120, label: 'Quantity', dataKey: 'quantity', numeric: true },
  { width: 120, label: 'Price', dataKey: 'price', numeric: true },
  { width: 120, label: 'Date', dataKey: 'date' },
  { width: 120, label: 'Waste ID', dataKey: 'waste_id', numeric: true },
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
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
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
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
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
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
