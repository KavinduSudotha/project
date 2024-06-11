import React from 'react';
import { Grid } from '@mui/material';
import SellWastageForm from '../components/wastage/SellWastageForm';
import WastageTable from '../components/wastage/WastageTable';
import Box from '@mui/material/Box';

const sellwastage = () => {
  const fetchWastageData = () => {
    // This function can be passed to the form to trigger table data refresh after selling wastage
  };

  return (
 
    <Box display="flex" justifyContent="space-between " marginTop={6} marginX={4}>
    <Box width="33%"  boxShadow={2} height={"88vh"} overflow="auto" marginLeft={8}  >

    <SellWastageForm fetchWastageData={fetchWastageData} />
    
    </Box>
    <Box width="66%"  boxShadow={2} height={"88vh"} overflow="auto" marginLeft={2}>
      <WastageTable />
    </Box>
  </Box>
  
  );
};

export default sellwastage;
