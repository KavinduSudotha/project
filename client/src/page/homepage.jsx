import React, { useEffect } from 'react';
import LineGraph from '../components/home/LineGraph';
import ChartHome from "../components/home/ChartHome";
import { usePageName } from '../context/PageNameContext';
import JobTable from '../components/home/Hometable';
import Pricelisthome from '../components/home/Pricelisthome';
import Notes from '../components/home/notes';



export const Homepage = () => {
  const { setPage } = usePageName();


  useEffect(() => {
    setPage('Home');
  }, []);

  return (
   <div className='ml-16'>
    <div className="flex h-full overflow-hidden  "> 
      <div className="flex w-full">
        <div className="flex w-full p-5">
         <div className="flex flex-col w-9/12 p-2">
           <div className="h-full">
              <LineGraph />
             </div>
          </div>     
          <div className="flex flex-col w-full  p-2">
            <p className="text-lg font-semibold mb-2">Snapshot of Current Inventory Distribution</p>
            <div className="h-full">
              <JobTable />
            </div>
          </div>          
        </div>       
      </div>     
    </div>
                   <div className="flex w-full h-full">
                  <div className="flex w-6/12 h-full">
                    <div className="h-full w-full">
                      <Pricelisthome />
                    </div>
                  </div>         
                  <div className="flex flex-col w-80 h-FULL">
                    <div className="h-full w-full">
                      <ChartHome />
                    </div>
                  </div>   
                  <div className="flex flex-col w-5/12 h-full mx-5">
                    <div className="h-72 w-full">
                      <Notes />
                    </div>
                  </div>    
                </div>

   </div>  
  );
};

export default Homepage;
