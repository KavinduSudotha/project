// WastageManagementPage.js
import React from 'react';
import { Box } from '@mui/material';
import AddWastageForm from '../components/wastage/AddWastageForm';
import WastageTable from '../components/wastage/AddWastageTable.jsx';

const WastageManagementPage = () => {
  return (
    <Box display="flex" justifyContent="space-between " marginTop={2}>
      <Box width="33%"  boxShadow={2} maxHeight={850} overflow="auto" marginLeft={8}>
        <AddWastageForm />
      </Box>
      <Box width="66%"  boxShadow={2} maxHeight={850} overflow="auto" marginLeft={2}>
        <WastageTable />
      </Box>
    </Box>
  );
};

export default WastageManagementPage;
