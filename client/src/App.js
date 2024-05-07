import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation} from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import LoginPage from './page/loginpage';
import HomePage from './page/homepage';
import AdminPage from './page/adminpage';
import RawBuy from './page/rawbuy';
import RawUse from './page/rawuse';
import EmployeePage from './page/employeepage';
import AddJobPage from './page/AddJobPage';
import{UserContext} from './helper/Context';
import Sidebar from './components/Sidebar';
import Addpricelist from './page/AddPriceList';
import Test from './page/test';


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
      <div className='flex h-screen'>
          <ConditionalSideBar /> 
          
        <div className='flex-1 '>
          <Routes>
            
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/homepage' element={<HomePage/>}/>
              <Route path='/adminpage' element={<AdminPage/>}/>
              <Route path='/rawbuy' element={<RawBuy/>}/>
              <Route path='/rawuse' element={<RawUse/>}/>
              <Route path='/employeepage' element={<EmployeePage/>}/>
              <Route path='/addjobpage' element={<AddJobPage/>}/>
              <Route path='/AddPriceList' element={<Addpricelist/>}/>
              <Route path='/test' element={<Test/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
