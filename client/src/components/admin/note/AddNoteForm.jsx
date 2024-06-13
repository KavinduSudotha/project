import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';
import {jwtDecode }from 'jwt-decode';

const AddNoteForm = ({ setNotification }) => {
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Current date
  const [time, setTime] = useState(new Date().toLocaleTimeString()); // Current time
  const storedData = localStorage.getItem('token');
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const Userid = decodedToken.userid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/admin/addnote', { note, date, time, Userid });
      setNotification({ message: 'Note added successfully', type: 'success' });
      setNote('');
      setDate(new Date().toISOString().slice(0, 10)); // Reset date
      setTime(new Date().toLocaleTimeString()); // Reset time
    } catch (error) {
      console.error('Error adding note:', error);
      setNotification({ message: 'Failed to add note', type: 'error' });
    }
  };

  return (
    <div style={{ marginLeft: '5vh', marginRight: '5vh', marginTop: "15vh" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Note"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <TextField
          label="Date"
          variant="outlined"
          fullWidth
          value={date}
          disabled // Disable input for date
          style={{ marginTop: '16px' }}
        />
        <TextField
          label="Time"
          variant="outlined"
          fullWidth
          value={time}
          disabled // Disable input for time
          style={{ marginTop: '16px' }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Add Note
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddNoteForm;
