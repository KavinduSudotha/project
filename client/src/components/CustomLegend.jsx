import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const CustomLegend = ({ data }) => {
    return (
        <Paper elevation={3} className="p-4">
            <Typography variant="h6" className="mb-4">Legend</Typography>
            {data.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                    <div style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 10 }}></div>
                    <Typography variant="body1">{item.label}</Typography>
                </Box>
            ))}
        </Paper>
    );
};

export default CustomLegend;
