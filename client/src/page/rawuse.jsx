import React from 'react';
import { Box } from '@mui/material';
import UserRawForm from '../components/useaw/UseRawForm';
import RawTable from '../components/useaw/RawTable';

const MainPage = () => {
  return (
    <div className='mt-20'>
    <Box display="flex" flexDirection="row" height="100vh" marginLeft={2} >
      <Box width="33%" padding="20px" boxShadow={2}>
        <UserRawForm />
      </Box>
      <Box width="67%" padding="20px" boxShadow={2} marginLeft={2}>
        <RawTable />
      </Box>
    </Box>
    </div>
  );
};

export default MainPage;
