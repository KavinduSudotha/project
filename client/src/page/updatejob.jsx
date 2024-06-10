import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';

import JobTable from '../components/job/JobTable';
import { jwtDecode } from "jwt-decode";


function updatejob() {
  const storedData = localStorage.getItem("token");
  const parsedData = JSON.parse(storedData);
  const decodedToken = jwtDecode(parsedData.token);
  const UserType = decodedToken.role;


  return (
    <div style={{ marginTop: '4vh', marginX :'16vh' }}>
 {(UserType=== "Director" ) && <Button
      variant="contained"
      component={Link}
      to={
        UserType === "Director"
          ? "/director-dashboard/addjobpage"
          // : UserType === "Manager"
          // ? "/Manager-dashboard/addjobpage"
          : "#"
      }
      sx={{ '&:hover': { backgroundColor: 'green' } }}
    ><PostAddIcon />
            ADD
          </Button>}
      
      <JobTable />
    </div>
  )
}

export default updatejob

