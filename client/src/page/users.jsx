import React from 'react'
import UserForm from '../components/admin/users/UserForm'
import UserTable from '../components/admin/users/Usertable'
import { usePageName } from '../context/PageNameContext';
import { useEffect } from 'react';

import { Box } from '@mui/material';

function Users() {

  const { setPage } = usePageName();

  useEffect(() => {
    setPage('User Management');
  }, []);


  return (
    <div className=' flex-col '>
    <Box display="flex" flexDirection="row" marginLeft={2} >
      <Box width="33%" boxShadow={2} height={"90vh"} overflow="auto" marginTop={2} marginLeft={8}>
        <UserForm />
      </Box>
      <Box width="67%" boxShadow={2} marginLeft={2} height={"90vh"} overflow="auto" marginTop={2}>
        <UserTable />
        
      </Box>
    </Box>
  </div>
  )
}

export default Users
