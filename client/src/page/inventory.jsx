import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, CircularProgress, Alert, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { usePageName } from '../context/PageNameContext';
import { jwtDecode } from "jwt-decode";

const Inventory = () => {
    const { setPage } = usePageName();

    useEffect(() => {
        setPage('Inventory');
    }, [setPage]);

    const storedData = localStorage.getItem("token");
    const parsedData = JSON.parse(storedData);
    const decodedToken = jwtDecode(parsedData.token);
    const UserType = decodedToken.role;


    const [summary, setSummary] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalWeightRaw, setTotalWeightRaw] = useState(0);
    const [totalWeightWastage, setTotalWeightWastage] = useState(0);
    const [freeSpace, setFreeSpace] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Inventory/live');
            console.log("API response data:", response.data);
            setSummary(response.data.summary);
            setTotalWeight(response.data.totalWeight);
            setTotalWeightRaw(response.data.totalWeightRaw);
            setTotalWeightWastage(response.data.totalWeightWastage);
            setFreeSpace(response.data.freeSpace);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching inventory summary.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', 
        '#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#0000FF', '#FF0000', '#800080'
    ];

    const prepareChartData = (keys) => {
        return keys.map((key, index) => {
            const item = summary.find(item => item.type === key);
            if (!item) {
                console.warn(`Key ${key} not found in summary`);
            }
            return {
                id: index,
                value: item ? item.total_weight : 0,
                label: key.replace(/_/g, ' ').replace(/total weight |wastage price /gi, ''),
                color: colors[index % colors.length] // Assign color based on index
            };
        });
    };

    const rawMaterialsData = prepareChartData([
        'chips_11mm_unwashed',
        'chips_11mm_washed',
        'chips_9mm_unwashed',
        'chips_9mm_washed',
        'chips_7mm_unwashed',
        'chips_7mm_washed',
        'cocopeat_hi_ec',
        'cocopeat_low_ec',
    ]);

    const wastageData = prepareChartData([
        'wastage_price_cocopeat_fiber', 
        'wastage_price_cocopeat_fine_dust',  
        'wastage_price_10c_sieved', 
        'wastage_price_10c_not_sieved', 
        'wastage_price_10c_upper_part', 
    ]);

    const allData = prepareChartData([
        'chips_11mm_unwashed',
        'chips_11mm_washed',
        'chips_9mm_unwashed',
        'chips_9mm_washed',
        'chips_7mm_unwashed',
        'chips_7mm_washed',
        'cocopeat_hi_ec',
        'cocopeat_low_ec',
        'wastage_price_cocopeat_fiber', 
        'wastage_price_cocopeat_fine_dust',  
        'wastage_price_10c_sieved', 
        'wastage_price_10c_not_sieved', 
        'wastage_price_10c_upper_part', 
    ]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Alert severity="error">{error}</Alert>
            </div>
        );
    }

    console.log("Raw Materials Data:", rawMaterialsData);

    return (
        <div className="ml-16 p-4 mt-6">
              {(UserType=== "Director" ) && <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/director-dashboard/InventoryTable"
                        className="mt-4"
                        sx={{ '&:hover': { backgroundColor: 'secondary.dark' } }}
                    >
                        Record
                    </Button>}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6.5}>
                    <Paper className="p-4">
                        <Typography variant="h6" className="mb-4">All Data</Typography>
                        <PieChart
                            series={[
                                {
                                    data: allData,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    color: ({ id }) => allData[id].color, // Use color from data
                                },
                            ]}
                            height={600}
                            width={1200}
                            slotProps={{
                                legend: {
                                    direction: 'column',
                                    position: { vertical: 'middle', horizontal: 'left' }
                                }
                            }}
                        />

                    </Paper>
                </Grid>
                <Grid item xs={1} md={4}>
                    <Paper className="p-4 mb-4">
                        <Typography variant="h6" className="mb-4">Raw Materials</Typography>
                        <PieChart
                            series={[
                                {
                                    data: rawMaterialsData,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    color: ({ id }) => rawMaterialsData[id].color, // Use color from data
                                },
                            ]}
                            height={260}
                            width={800}
                            slotProps={{
                                legend: {
                                    direction: 'column',
                                    position: { vertical: 'middle', horizontal: 'left' }
                                }}}
                        />
                    </Paper>
                    <Paper className="p-4">
                        <Typography variant="h6" className="mb-4">Wastage</Typography>
                        <PieChart
                            series={[
                                {
                                    data: wastageData,
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    color: ({ id }) => wastageData[id].color, // Use color from data
                                },
                            ]}
                            height={260}
                            width={800}
                            slotProps={{
                                legend: {
                                    direction: 'column',
                                    position: { vertical: 'middle', horizontal: 'left' }
                                }}}
                        />
                    </Paper>
                </Grid>
                
                <Grid item xs={12}>
                    
                    <Paper>
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
                                        <TableCell>{item.type.replace(/_/g, ' ')}</TableCell>
                                        <TableCell>{item.total_weight}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell><strong>Total Weight Raw</strong></TableCell>
                                    <TableCell><strong>{totalWeightRaw}</strong></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><strong>Total Weight Wastage</strong></TableCell>
                                    <TableCell><strong>{totalWeightWastage}</strong></TableCell>
                                </TableRow>
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
                </Grid>
            </Grid>
        </div>
    );
};

export default Inventory;
