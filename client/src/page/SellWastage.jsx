// SellWastagePage.jsx
import React, { useState } from 'react';
import { Grid, Snackbar, Alert, Box } from '@mui/material';
import SellWastageForm from '../components/wastage/SellWastageForm';
import WastageTable from '../components/wastage/WastageTable';

const SellWastagePage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fetchWastageData = () => {
    // This function can be passed to the form to trigger table data refresh after selling wastage
  };

  const handleSellWastage = (data) => {
    setSnackbarMessage('Wastage sold successfully!');
    setOpenSnackbar(true);
    fetchWastageData();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" marginTop={6} marginX={4}>
      <Box width="33%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={8}>
        <SellWastageForm onSellWastage={handleSellWastage} fetchWastageData={fetchWastageData} />
      </Box>
      <Box width="66%" boxShadow={2} height={"88vh"} overflow="auto" marginLeft={2}>
        <WastageTable />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellWastagePage;
