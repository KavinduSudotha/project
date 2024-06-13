import React from "react";
import Grid from "@mui/material/Grid";
import RawBuyForm from "../components/rawbuy/RawBuyform";
import BuyRawTable from "../components/rawbuy/BuyRawTable";
import { usePageName } from "../context/PageNameContext";
import { Box } from "@mui/material";

const YourPageComponent = () => {
  return (
    <div className=" flex-col  ">
      <Box display="flex" flexDirection="row" height="90vh" marginLeft={2}>
        <Box
          width="33%"
          boxShadow={2}
          height={"90vh"}
          overflow="auto"
          marginTop={3}
          marginLeft={8}
        >
          <RawBuyForm />
        </Box>
        <Box
          width="67%"
          boxShadow={2}
          marginLeft={2}
          height={"90vh"}
          overflow="auto"
          marginTop={3}
        >
          <BuyRawTable />
        </Box>
      </Box>
    </div>
  );
};

export default YourPageComponent;
