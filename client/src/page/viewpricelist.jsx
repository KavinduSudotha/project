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
import { usePageName } from '../context/PageNameContext';

const ViewPriceList = () => {
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

  const { setPage } = usePageName();

  useEffect(() => {
    setPage('Standard Price List');
  }, []);

  return (
    <div className='ml-16 mt-6'>
      <Container maxWidth="auto">
        {priceList ? (
          <>
            <div style={{ display: 'flex', marginBottom: '16px', justifyContent: 'flex-start', gap: '10px' }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/director-dashboard/AddPriceList"
                sx={{ '&:hover': { backgroundColor: 'green' } }}
              >
                <PostAddIcon />
                ADD
              </Button>
              <Button 
                variant="contained" 
                component={Link} 
                to="/director-dashboard/RecordsPricelist"
                sx={{ '&:hover': { backgroundColor: 'secondary.dark' } }}
              >
                <PlaylistAddCheckIcon />
                Records
              </Button>
            </div>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    <b>Standard Price List</b>
                  </Typography>
                  <Typography variant="h6" align="right" gutterBottom>
                    Updated date: {new Date(priceList.date).toLocaleDateString()}
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
                              { label: 'Cocopeat Fiber', value: priceList["wastage_cocopeat_fiber"] },
                              { label: 'Cocopeat Fine Dust', value: priceList["wastage_cocopeat_fine_dust"] },
                              { label: '10C Sieved', value: priceList["wastage_10c_sieved"] },
                              { label: '10C not Sieved', value: priceList["wastage_10c_not_sieved"] },
                              { label: '10C upper part', value: priceList["wastage_10c_upper_part"] },
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

              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    <b>Deduction of Chips</b>
                  </Typography>
                  <Divider sx={{ marginBottom: '16px' }} />
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Wastage %</b></TableCell>
                          <TableCell><b>Deduction</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...Array(13).keys()].map((percentage) => (
                          <TableRow key={percentage}>
                            <TableCell>{`${percentage + 8}%`}</TableCell>
                            <TableCell>{priceList[`wastage_deduction_chips_${percentage + 8}`]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px' }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    <b>Deduction of Cocopeat</b>
                  </Typography>
                  <Divider sx={{ marginBottom: '16px' }} />
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Density Range</b></TableCell>
                          <TableCell><b>Deduction</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...Array(6).keys()].map((index) => (
                          <TableRow key={index}>
                            <TableCell>{`${60 + index * 10} - ${69 + index * 10}`}</TableCell>
                            <TableCell>{priceList[`density_${60 + index * 10}_${69 + index * 10}`]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Divider sx={{ margin: '16px 0' }} />
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Sand Range</b></TableCell>
                          <TableCell><b>Deduction</b></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...Array(7).keys()].map((index) => (
                          <TableRow key={index}>
                            <TableCell>{`${20 + index * 5} - ${24 + index * 5}`}</TableCell>
                            <TableCell>{priceList[`sand_${20 + index * 5}_${24 + index * 5}`]}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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

export default ViewPriceList;
