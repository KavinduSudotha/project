import React from 'react';
import { Grid } from '@mui/material';
import SellWastageForm from '../components/wastage/SellWastageForm';
import WastageTable from '../components/wastage/WastageTable';

const sellwastage = () => {
  const fetchWastageData = () => {
    // This function can be passed to the form to trigger table data refresh after selling wastage
  };

  return (
    <Grid container spacing={2} padding={2} marginTop={12}>
      <Grid item xs={12} md={4}>
        <SellWastageForm fetchWastageData={fetchWastageData} />
      </Grid>
      <Grid item xs={12} md={8}>
        <WastageTable />
      </Grid>
    </Grid>
  );
};

export default sellwastage;
