import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchForm from '../components/updatejob/SearchForm';
import JobTable from '../components/job/JobTable';
function updatejob() {
  return (
    <div className=' mt-20'>
       <Button 
            variant="contained" 
            component={Link} 
            to="/addjobpage"
            sx={{ '&:hover': { backgroundColor: 'green' } }}
          >
            <PostAddIcon />
            ADD
          </Button>
      <SearchForm />
      <JobTable />
    </div>
  )
}

export default updatejob

