import React from "react";
import { LineGraph } from "../components/home/LineGraph";
import DoughnutGraph from "../components/home/DoughnutGraph";

export const Homepage = () => {
  return (
   <div>
    <h1 className="text-4xl font-semibold text-center mt-5">Dashboard</h1>
    <div className="flex h-full overflow-hidden ml-10 mt*5"> 
      <div className="flex w-full">
        <div className="flex w-full p-5">
         <div className="flex flex-col w-4/6 p-2">
          <p className="text-lg font-semibold mb-2">Weekly Storage Distribution Trends</p>
           <div className="h-full">
              <LineGraph />
             </div>
          </div>
          
          <div className="flex flex-col w-2/6 p-2">
            <p className="text-lg font-semibold mb-2">Snapshot of Current Inventory Distribution</p>
            <div className="h-full">
              <DoughnutGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>  
  );
};

export default Homepage;
