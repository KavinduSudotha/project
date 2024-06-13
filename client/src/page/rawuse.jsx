import React, { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import UserRawForm from '../components/useaw/UseRawForm';
import RawTable from '../components/useaw/RawTable';

const MainPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <div className='flex flex-col'>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box display="flex" flexDirection="row" height="90vh" marginLeft={10}>
        <Box width="33%" maxHeight={"90vh"} padding="30px" paddingX={6} boxShadow={2} marginTop={3}>
          <UserRawForm showSnackbar={showSnackbar} />
        </Box>
        <Box width="67%" maxHeight={"60"} boxShadow={2} marginLeft={2} marginTop={3}>
          <RawTable />
        </Box>
      </Box>
    </div>
  );
};

export default MainPage;
