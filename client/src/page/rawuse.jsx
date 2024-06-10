import React from 'react';
import { Box } from '@mui/material';
import UserRawForm from '../components/useaw/UseRawForm';
import RawTable from '../components/useaw/RawTable';

const MainPage = () => {
  return (
    <div className=' flex flex-col '>
    <Box display="flex" flexDirection="row" height="90vh" marginLeft={10} >
      <Box width="33%" maxHeight={"90vh"} padding="30px" paddingX={6} boxShadow={2} marginTop={3}>
        <UserRawForm />
      </Box>
      <Box width="67%"  maxHeight={"60"} boxShadow={2} marginLeft={2} marginTop={3} >
        <RawTable />
      </Box>
    </Box>
    </div>
  );
};

export default MainPage;
