import React from 'react';
import Grid from '@mui/material/Grid';
import RawBuyForm from '../components/rawbuy/RawBuyform';
import BuyRawTable from '../components/rawbuy/BuyRawTable';
import { usePageName } from '../context/PageNameContext';
import { Box } from '@mui/material';

const YourPageComponent = () => {
  return (
    <div className=' flex-col  h-screen '>
      <Box display="flex" flexDirection="row" height="100vh" marginLeft={2} >
        <Box width="33%" boxShadow={2} maxHeight={850} overflow="auto" marginTop={2} marginLeft={8}>
          <RawBuyForm />
        </Box>
        <Box width="67%" boxShadow={2} marginLeft={2} maxHeight={850} overflow="auto" marginTop={2}>
          <BuyRawTable />
        </Box>
      </Box>
    </div>
  );
};

export default YourPageComponent;
