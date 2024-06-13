import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Modal, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const EnhancedTable = () => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6); // Default rows per page
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/admin/getnotes')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/admin/deletenotes/${id}`)
      .then(response => {
        setRows(rows.filter(row => row.note_id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the note!', error);
      });
  };

  const handleOpen = (note) => {
    setCurrentNote(note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote({
      ...currentNote,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3001/admin/updatenotes/${currentNote.note_id}`, currentNote)
      .then(response => {
        setRows(rows.map(row => (row.note_id === currentNote.note_id ? currentNote : row)));
        handleClose();
      })
      .catch(error => {
        console.error('There was an error updating the note!', error);
      });
  };

  return (
    <Box className="container mx-auto">
      <Paper>
        <TableContainer style={{ maxHeight: '82.5vh', overflow: 'auto' }}> {/* Adjusted style */}
          <Table aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Note ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.note_id}
                  >
                    <TableCell>{row.note_id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.note}</TableCell>
                    <TableCell>{row.employee_id}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.note_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box className="bg-white p-4 rounded">
          <TextField
            label="Date"
            type="date"
            name="date"
            value={currentNote.date || ''}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Time"
            type="time"
            name="time"
            value={currentNote.time || ''}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Note"
            name="note"
            value={currentNote.note || ''}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <TextField
            label="Employee ID"
            name="employee_id"
            value={currentNote.employee_id || ''}
            onChange={handleChange}
            fullWidth
            className="mb-4"
          />
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EnhancedTable;
