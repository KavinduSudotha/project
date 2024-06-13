import React, { useState, useEffect } from 'react';
import AddNoteForm from '../components/admin/note/AddNoteForm';
import NoteTable from '../components/admin/note/notetable';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import { usePageName } from '../context/PageNameContext';

function Addnote() {
  const { setPage } = usePageName();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setPage('Add Note');
  }, [setPage]);

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <Snackbar 
          open={true} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
      <Box display="flex" justifyContent="space-between" marginTop={6} marginX={4}>
        <Box width="33%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={4}>
          <AddNoteForm setNotification={setNotification} />
        </Box>
        <Box width="66%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={2}>
          <NoteTable />
        </Box>
      </Box>
    </div>
  );
}

export default Addnote;
