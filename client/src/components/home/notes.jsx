import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const formattedDate = new Date(row.date).toLocaleDateString();

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.note}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Employee ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {formattedDate}
                    </TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.employee_id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/home/shownote')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'normal', textAlign: 'right',  backgroundImage: 'linear-gradient(to left, #ADD8E6, #ffffff)' }}>Notes</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <Box sx={{ maxHeight: 285, overflow: 'auto' }}>
        <Table size="small" aria-label="collapsible table">
          <TableBody>
            {rows.map((row) => (
              <Row key={row.note_id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
