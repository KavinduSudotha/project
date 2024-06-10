import React from 'react'
import AddNoteForm from '../components/admin/note/AddNoteForm'
import NoteTable from '../components/admin/note/notetable'
import { Container, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { usePageName } from '../context/PageNameContext';


function Addnote() {

  
    const { setPage } = usePageName();
  
  
    useEffect(() => {
      setPage('Add Note');
    }, []);
  
  

  return (
      <div className='flex gap-5 mt-10 mx-10'>
         
      
      <Paper elevation={3} className="w-1/2 p-4 mb-4 ">
        <AddNoteForm />
      </Paper>
      <Paper elevation={3} className="w-full p-4">
        <NoteTable />
      </Paper>
   
      </div>
   
  )
}

export default Addnote
