import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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

  return (
    <div className="container mx-auto py-8">
      {priceList ? (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Typography variant="h6" align="right" gutterBottom>
            Updated date: {new Date(priceList.date).toLocaleDateString()}
          </Typography>

          <div className="my-8">
            <Typography variant="h5" gutterBottom>
              <b>Standard Price List</b>
            </Typography>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <b>Chips</b>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="11mm unwashed" secondary={priceList["chips_11mm_unwashed"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="11mm washed" secondary={priceList["chips_11mm_washed"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="9mm unwashed" secondary={priceList["chips_9mm_unwashed"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="9mm washed" secondary={priceList["chips_9mm_washed"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="7mm unwashed" secondary={priceList["chips_7mm_unwashed"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="7mm washed" secondary={priceList["chips_7mm_washed"]} />
                </ListItem>
              </List>
              <Typography variant="subtitle1" gutterBottom>
                <b>Cocopeat</b>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="High EC" secondary={priceList["cocopeat_hi_ec"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Low EC" secondary={priceList["cocopeat_low_ec"]} />
                </ListItem>
              </List>
            </Box>
          </div>

          <hr className="my-8" />

          <div className="my-8">
            <Typography variant="h5" gutterBottom>
              <b>Deduction of Chips</b>
            </Typography>
            <Box>
              <List>
                {[...Array(13).keys()].map((percentage) => (
                  <ListItem key={percentage}>
                    <ListItemText primary={`${percentage + 8}%`} secondary={priceList[`wastage_deduction_chips_${percentage + 8}`]} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </div>

          <hr className="my-8" />

          <div className="my-8">
            <Typography variant="h5" gutterBottom>
              <b>Deduction of Cocopeat</b>
            </Typography>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                <b>Density</b>
              </Typography>
              <List>
                {[...Array(6).keys()].map((index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${60 + index * 10} - ${69 + index * 10}`} secondary={priceList[`density_${60 + index * 10}_${69 + index * 10}`]} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="subtitle1" gutterBottom>
                <b>Sand</b>
              </Typography>
              <List>
                {[...Array(7).keys()].map((index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${20 + index * 5} - ${24 + index * 5}`} secondary={priceList[`sand_${20 + index * 5}_${24 + index * 5}`]} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </div>

          <hr className="my-8" />

          <div className="my-8">
            <Typography variant="h5" gutterBottom>
              <b>Wastage Price</b>
            </Typography>
            <Box>
              <List>
                <ListItem>
                  <ListItemText primary="Cocopeat Fiber" secondary={priceList["wastage_price_cocopeat_fiber"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Cocopeat Fine Dust" secondary={priceList["wastage_price_cocopeat_fine_dust"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="10C Sieved" secondary={priceList["wastage_price_10c_sieved"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="10C not Sieved" secondary={priceList["wastage_price_10c_not_sieved"]} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="10C upper part" secondary={priceList["wastage_price_10c_upper_part"]} />
                </ListItem>
              </List>
            </Box>
          </div>

        </Box>
      ) : (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default ViewPriceList;
