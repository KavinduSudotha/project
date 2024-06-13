import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const columns = [
  { width: 80, label: 'Job ID', dataKey: 'job_id' },
  { width: 120, label: 'Due Date', dataKey: 'due_date' },
  { width: 150, label: 'Chip Type', dataKey: 'chip_type' },
  { width: 100, label: 'Peat Type', dataKey: 'peat_type' },
  { width: 100, label: 'Status', dataKey: 'status' },
  { width: 250, label: 'Note', dataKey: 'note' },
];

const formatChipType = (value) => {
    return value.replace(/^chips_/, '').replace(/_/g, ' ');
  };
  
  const formatPeatType = (value) => {
    return value.replace(/^cocopeat_/, '').replace(/_/g, ' ');
  };

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
            align="left"
            style={{ width: column.width }}
            sx={{backgroundImage: 'linear-gradient(to top, #ffffff, #ADD8E6)' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }


  function rowContent(_index, row) {
    return (
      <>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align="left">
            {row[column.dataKey]}
          </TableCell>
        ))}
      </>
    );
  }

const JobTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobrout/jobs');
        const formattedData = response.data.map(row => ({
            ...row,
            chip_type: formatChipType(row.chip_type),
            peat_type: formatPeatType(row.peat_type)
          }));

          const sortedData = formattedData.sort((a, b) => {
            const dateA = new Date(a.due_date);
            const dateB = new Date(b.due_date);
            return dateA - dateB;
          });
          setRows(sortedData);
        } catch (error) {
          console.error('Error fetching job data', error);
        }
      };
  
      fetchJobs();
  }, []);

  return (
    <Paper style={{ height: "49vh", width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default JobTable;
