import React from 'react'
import UserForm from '../components/admin/users/UserForm'
import UserTable from '../components/admin/users/Usertable'

import { Box } from '@mui/material';

function users() {
  return (
    <div className=' flex-col  h-screen'>
    <Box display="flex" flexDirection="row" height="100vh" marginLeft={2} >
      <Box width="33%" boxShadow={2} maxHeight={850} overflow="auto" marginTop={2} marginLeft={8}>
        <UserForm />
      </Box>
      <Box width="67%" boxShadow={2} marginLeft={2} maxHeight={850} overflow="auto" marginTop={2}>
        <UserTable />
        
      </Box>
    </Box>
  </div>
  )
}

export default users
