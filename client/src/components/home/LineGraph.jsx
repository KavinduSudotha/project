import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import {
  Card, CardContent, CardHeader, MenuItem, FormControl, Select, InputLabel
} from '@mui/material';
import 'tailwindcss/tailwind.css';
import { format, parseISO } from 'date-fns';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const LineChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [interval, setInterval] = useState('daily');
  const [linesToShow, setLinesToShow] = useState(['total_weight_raw', 'total_weight_wastage', 'total_weight', 'free_space']);

  const fetchData = async (interval) => {
    try {
      const response = await axios.get('http://localhost:3001/Inventory/linechart', {
        params: { interval }
      });
      const data = response.data;

      if (!data || data.length === 0) {
        console.error('No data returned from the backend');
        setChartData(null);
        return;
      }

      const labels = data.map(d => {
        switch (interval) {
          case 'daily':
            return format(parseISO(d.time), 'yyyy-MM-dd (EEEE)');
          case 'weekly':
            return format(parseISO(d.time), 'yyyy-MM-dd (EEEE)');
          case 'monthly':
            return format(parseISO(d.time), 'yyyy-MM');
          case 'yearly':
            return format(parseISO(d.time), 'yyyy');
          default:
            return format(parseISO(d.time), 'yyyy-MM-dd (EEEE)');
        }
      });

      const datasets = linesToShow.map(line => ({
        label: line.replace(/_/g, ' '),
        data: data.map(d => d[line]),
        borderColor: getColor(line),
        backgroundColor: getColor(line, 0.5)
      }));

      setChartData({ labels, datasets });
    } catch (error) {
      console.error('Error fetching the data', error);
      setChartData(null);
    }
  };

  useEffect(() => {
    fetchData(interval);
  }, [interval, linesToShow]);

  const getColor = (line, opacity = 1) => {
    const colors = {
      total_weight_raw: `rgba(255, 99, 132, ${opacity})`,
      total_weight_wastage: `rgba(54, 162, 235, ${opacity})`,
      total_weight: `rgba(75, 192, 192, ${opacity})`,
      free_space: `rgba(153, 102, 255, ${opacity})`
    };
    return colors[line];
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  const handleLinesChange = (event) => {
    setLinesToShow(event.target.value);
  };

  return (
    <Card>
    <div className="flex justify-between items-center p-4">
      <CardHeader title="Storage Level Over Time Visualization" />
      <FormControl variant="outlined" className="w-1/3">
        <InputLabel>Interval</InputLabel>
        <Select value={interval} onChange={handleIntervalChange} label="Interval">
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
    </div>
    <CardContent>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                reverse: true,
                ticks: {
                  callback: function (value) {
                    return this.getLabelForValue(value);
                  }
                }
              }
            },
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Inventory Line Chart'
              }
            }
          }}
        />
      ) : (
        <p>No data available</p>
      )}
    </CardContent>
  </Card>
);
};

export default LineChartComponent;
