import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';


const Pricelisthome = () => {
  const [priceList, setPriceList] = useState(null);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      try {
        const response = await axios.get("http://localhost:3001/pricelist/latestpricelist");
        setPriceList(response.data);
      } catch (error) {
        console.error("Failed to fetch latest price list", error);
      }
    };

    fetchLatestPrice();
  }, []);

  
  return (
    <div>
      <Container maxWidth="">
        {priceList ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    <b>Standard Price List</b>
                  </Typography>
                  <Divider sx={{ marginBottom: '16px' }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TableContainer component={Paper} sx={{ marginBottom: '16px' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><b>Chips</b></TableCell>
                              <TableCell><b>Price</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              { label: '11mm unwashed', value: priceList["chips_11mm_unwashed"] },
                              { label: '11mm washed', value: priceList["chips_11mm_washed"] },
                              { label: '9mm unwashed', value: priceList["chips_9mm_unwashed"] },
                              { label: '9mm washed', value: priceList["chips_9mm_washed"] },
                              { label: '7mm unwashed', value: priceList["chips_7mm_unwashed"] },
                              { label: '7mm washed', value: priceList["chips_7mm_washed"] },
                            ].map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell>{item.value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TableContainer component={Paper} sx={{ marginBottom: '16px' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><b>Cocopeat</b></TableCell>
                              <TableCell><b>Price</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              { label: 'High EC', value: priceList["cocopeat_hi_ec"] },
                              { label: 'Low EC', value: priceList["cocopeat_low_ec"] },
                            ].map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell>{item.value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TableContainer component={Paper} sx={{ marginBottom: '16px' }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><b>Wastage Type</b></TableCell>
                              <TableCell><b>Price</b></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {[
                              { label: 'Cocopeat Fiber', value: priceList["wastage_price_cocopeat_fiber"] },
                              { label: 'Cocopeat Fine Dust', value: priceList["wastage_price_cocopeat_fine_dust"] },
                              { label: '10C Sieved', value: priceList["wastage_price_10c_sieved"] },
                              { label: '10C not Sieved', value: priceList["wastage_price_10c_not_sieved"] },
                              { label: '10C upper part', value: priceList["wastage_price_10c_upper_part"] },
                            ].map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.label}</TableCell>
                                <TableCell>{item.value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>              
            </Grid>
          </>
        ) : (
          <Typography variant="h6" align="center" color="error">
            Loading latest price list...
          </Typography>
        )}
      </Container>
    </div>
  );
};



 export default Pricelisthome
 