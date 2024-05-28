// WastageManagementPage.js
import React from 'react';
import { Box } from '@mui/material';
import AddWastageForm from '../components/wastage/AddWastageForm';
import WastageTable from '../components/wastage/AddWastageTable.jsx';

const WastageManagementPage = () => {
  return (
    <Box display="flex" justifyContent="space-between " marginTop={20}>
      <Box width="calc(100% / 3)">
        <AddWastageForm />
      </Box>
      <Box width="calc(2 * 100% / 3)">
        <WastageTable />
      </Box>
    </Box>
  );
};

export default WastageManagementPage;
