import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import RawBuyForm from "../components/rawbuy/RawBuyform";
import BuyRawTable from "../components/rawbuy/BuyRawTable";
import { Box, Snackbar, Alert } from "@mui/material";
import { usePageName } from "../context/PageNameContext";

const YourPageComponent = () => {
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
    <div className="flex flex-col">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box display="flex" flexDirection="row" height="90vh" marginLeft={2}>
        <Box
          width="33%"
          boxShadow={2}
          height={"90vh"}
          overflow="auto"
          marginTop={3}
          marginLeft={8}
        >
          <RawBuyForm showSnackbar={showSnackbar} />
        </Box>
        <Box
          width="67%"
          boxShadow={2}
          marginLeft={2}
          height={"90vh"}
          overflow="auto"
          marginTop={3}
        >
          <BuyRawTable />
        </Box>
      </Box>
    </div>
  );
};

export default YourPageComponent;
