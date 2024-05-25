import React from 'react';
import Grid from '@mui/material/Grid';
import RawBuyForm from '../components/rawbuy/RawBuyform';
import BuyRawTable from '../components/rawbuy/BuyRawTable';
import { usePageName } from '../context/PageNameContext';
import { Box } from '@mui/material';



const YourPageComponent = () => {
  return (
    <div className='mt-20'>
    <Box display="flex" flexDirection="row" height="100vh" marginLeft={2} >
      <Box width="33%" padding="20px" boxShadow={2}>
        <RawBuyForm />
      </Box>
      <Box width="67%" padding="20px" boxShadow={2} marginLeft={2}>
        <BuyRawTable />
      </Box>
    </Box>
    </div>
  );
};

export default YourPageComponent;
