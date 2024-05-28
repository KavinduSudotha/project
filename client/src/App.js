import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation} from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { PageNameProvider } from './context/PageNameContext';
import LoginPage from './page/loginpage';
import HomePage from './page/homepage';
import AdminPage from './page/adminpage';
import RawBuyPage from './page/rawbuypage';
import RawUse from './page/rawuse';
import EmployeePage from './page/employeepage';
import AddJobPage from './page/JobPage';
import{UserContext} from './helper/Context';
import Sidebar from './components/Sidebar';
import Addpricelist from './page/AddPriceList';
import Viewpricelist from './page/viewpricelist';
import Test from './page/test';
import AddPriceList from './page/AddPriceList';
import RecordsPricelist from './page/Recordspricelist';
import Updatejob from './page/updatejob';
import Inventory from './page/inventory';
import Inventoryrecord from './page/InventoryTable';
import AddWastageForm from './page/AddWastage';
import SellWastageForm from './page/SellWastage';
import Reports from './page/Reports';

function ConditionalSideBar() {
  const location = useLocation();
  // Render Sidebar only if the current location is not the root path ("/") 
  if (location.pathname !== '/') {
    return <Sidebar/>;
  }
  return null;
}

function App() {
  return (
    <Router>
       <PageNameProvider>
      <div className='flex h-screen'>
          <ConditionalSideBar /> 
          
        <div className='flex-1 '>
          <Routes>
            
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/homepage' element={<HomePage/>}/>
              <Route path='/adminpage' element={<AdminPage/>}/>
              <Route path='/rawbuypage' element={<RawBuyPage/>}/>
              <Route path='/rawuse' element={<RawUse/>}/>
              <Route path='/employeepage' element={<EmployeePage/>}/>
              <Route path='/addjobpage' element={<AddJobPage/>}/>
              <Route path='/AddPriceList' element={<Addpricelist/>}/>
              <Route path='/viewpricelist' element={<Viewpricelist/>}/>
              <Route path='/test' element={<Test/>}/>
              <Route path='/RecordsPricelist' element={<RecordsPricelist/>}/>
              <Route path='/updatejob' element={<Updatejob/>}/>
              <Route path='/inventory' element={<Inventory/>}/>
              <Route path='/InventoryTable' element={<Inventoryrecord/>}/>
              <Route path='/addwastagepage' element={<AddWastageForm/>}/>
              <Route path='/sellwastagepage' element={<SellWastageForm/>}/>
              <Route path='/reports' element={<Reports/>}/>
          </Routes>
        </div>
      </div>
      </PageNameProvider>
    </Router>
  );
}
export default App;
