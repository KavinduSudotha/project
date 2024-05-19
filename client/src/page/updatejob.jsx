import React from 'react'
import SearchForm from '../components/updatejob/SearchForm';
import JobTable from '../components/updatejob/JobTable';
function updatejob() {
  return (
    <div className=' ml-20'>
      <SearchForm />
      <JobTable />
    </div>
  )
}

export default updatejob

