import React from 'react'
import AddNoteForm from '../components/admin/note/AddNoteForm'
import NoteTable from '../components/admin/note/notetable'
import { Container, Paper, Typography,Box } from '@mui/material';
import { useEffect } from 'react';
import { usePageName } from '../context/PageNameContext';


function Addnote() {

  
    const { setPage } = usePageName();
  
  
    useEffect(() => {
      setPage('Add Note');
    }, []);
  
  

  return (
 

   <Box display="flex" justifyContent="space-between " marginTop={6} marginX={4}>
   <Box width="33%"  boxShadow={2} height={"88vh"} overflow="auto" marginLeft={4}  >

   <AddNoteForm />
   
   </Box>
   <Box width="66%"  boxShadow={2} height={"88vh"} overflow="auto" marginLeft={2}>
   <NoteTable />
   </Box>
 </Box>
 


  )

}

export default Addnote
