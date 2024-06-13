import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardHeader, Stack, Box, Paper, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const ChartHome = () => {
  const [latestData, setLatestData] = useState(null);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/inventory/homechart');
        setLatestData(response.data);
      } catch (error) {
        console.error('Error fetching latest inventory data:', error);
      }
    };

    fetchLatestData();
  }, []);

  if (!latestData) return <div>Loading...</div>;

  const data1 = [
    { label: 'Total Weight Raw', value: latestData.total_weight_raw },
    { label: 'Total Weight Wastage', value: latestData.total_weight_wastage },
    { label: 'Free Space', value: latestData.free_space },
  ];

  const data2 = [
    { label: 'Chips 11mm Unwashed', value: latestData.total_weight_chips_11mm_unwashed },
    { label: 'Chips 11mm Washed', value: latestData.total_weight_chips_11mm_washed },
    { label: 'Chips 9mm Unwashed', value: latestData.total_weight_chips_9mm_unwashed },
    { label: 'Chips 9mm Washed', value: latestData.total_weight_chips_9mm_washed },
    { label: 'Chips 7mm Unwashed', value: latestData.total_weight_chips_7mm_unwashed },
    { label: 'Chips 7mm Washed', value: latestData.total_weight_chips_7mm_washed },
    { label: 'Cocopeat Hi EC', value: latestData.total_weight_cocopeat_hi_ec },
    { label: 'Cocopeat Low EC', value: latestData.total_weight_cocopeat_low_ec },
    { label: 'Wastage Cocopeat Fiber', value: latestData.wastage_price_cocopeat_fiber },
    { label: 'Wastage Fine Dust', value: latestData.wastage_price_cocopeat_fine_dust },
    { label: 'Wastage 10c Sieved', value: latestData.wastage_price_10c_sieved },
    { label: 'Wastage 10c Not Sieved', value: latestData.wastage_price_10c_not_sieved },
    { label: 'Wastage 10c Upper Part', value: latestData.wastage_price_10c_upper_part },
  ];

  const series = [
    {
      innerRadius: 0,
      outerRadius: 80,
      id: 'series-1',
      data: data1,
    },
    {
      innerRadius: 100,
      outerRadius: 120,
      id: 'series-2',
      data: data2,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: '14px', borderRadius: '8px' }}>
          <CardHeader title="Current Inventory" />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 0 }} sx={{ width: '50%' }}>
            <Box sx={{ flexGrow: 1 }}>
              <PieChart
                series={series}
                width={400}
                height={250}
                slotProps={{
                  legend: { hidden: true },
                }}
                onItemClick={(event, d) => setItemData(d)}
              />
            </Box>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChartHome;
