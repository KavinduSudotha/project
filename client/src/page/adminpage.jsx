// import React from 'react'
// import AddNoteForm from '../components/admin/AddNoteForm'


// function adminpage() {
//   return (
//     <div >
//       <h1 className='text-center mt-20'>adminpage</h1>|
//       <AddNoteForm/>
//     </div>
//   )
// }

// export default adminpage
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddNoteForm from '../components/admin/AddNoteForm'
const AdminPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/director-dashboard/Users');
  };

  return (
    <div className='ml-20'>
      <h1>Admin Page</h1>
      <Button variant="contained" color="primary" onClick={handleNavigate}>
        Go to Users
      </Button>

      <AddNoteForm/>
    </div>
  );
};

export default AdminPage;
