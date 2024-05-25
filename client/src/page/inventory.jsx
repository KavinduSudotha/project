import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserRawForm = () => {
    const [summary, setSummary] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [freeSpace, setFreeSpace] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Inventory/live');
                setSummary(response.data.summary);
                setTotalWeight(response.data.totalWeight);
                setFreeSpace(response.data.freeSpace);
            } catch (error) {
                console.error('Error fetching inventory summary:', error);
            }
        };

        fetchData();

        // Polling every minute to get the latest data
        const interval = setInterval(fetchData, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=' mt-20'>
               <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/InventoryTable"
                className="mt-4"
                sx={{ '&:hover': { backgroundColor: 'secondary.dark' } }}
            >
                Record
            </Button>
        <Paper className="p-4 ml-20" >
            
            <Typography variant="h4" className="mb-4">Live Inventory</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Total Weight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {summary.map((item) => (
                        <TableRow key={item.type}>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.total_weight}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell><strong>Total Weight</strong></TableCell>
                        <TableCell><strong>{totalWeight}</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>Free Space</strong></TableCell>
                        <TableCell><strong>{freeSpace}</strong></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
         
        </Paper>
      </div>  
    );
};

export default UserRawForm;
