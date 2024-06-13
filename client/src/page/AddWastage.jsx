import React from 'react';
import { Box } from '@mui/material';
import AddWastageForm from '../components/wastage/AddWastageForm';
import WastageTable from '../components/wastage/AddWastageTable.jsx';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const WastageManagementPage = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');

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
    <Box display="flex" justifyContent="space-between " marginTop={6} marginX={4}>
      <Box width="33%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={8}>
        <AddWastageForm showSnackbar={showSnackbar} />
      </Box>
      <Box width="66%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={2}>
        <WastageTable />
      </Box>

      {/* Snackbar for showing notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default WastageManagementPage;
