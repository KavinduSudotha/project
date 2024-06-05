import React from "react";
import Login from "./Pages/login.jsx";
import Inventory from "./Pages/Inventory.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analysis from "./Pages/Manager/Analysis.jsx";
import LandingPage from "./Pages/Landing.jsx";
import Users from "./Pages/Manager/Staffmanage.jsx";
import TestSignup from "./Pages/TestSignup.jsx";
import StockTable from "./Components/StockTable.jsx";
import Billing from "./Pages/Cashier/Billing.jsx";
import Orders from "./Pages/Supplier/Orders.jsx";
import SideBar from "./Components/SideBar.jsx";
import Products from "./Pages/Products.jsx";
import Stocks from "./Pages/Stocks.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.js";
import NotFoundPage from "./Pages/NotFound.jsx";
import NewCustomerPopup from "./Components/NewCustomerPopup.jsx";

const publicRoutes = ["/", "/login", "/*"];

function App() {
  const [UserType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenValidity = async () => {
    const storedData = localStorage.getItem("token");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const token = parsedData.token;
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          setUserType(decodedToken.role);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUserType(null);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserType(null);
      }
    } else {
      setIsAuthenticated(false);
      setUserType(null);
    }
    setIsLoading(false); // Set loading state to false once authentication check is done
  };

  useEffect(() => {
    checkTokenValidity();

    window.onload = () => {
      checkTokenValidity();
    };

    const interval = setInterval(() => {
      checkTokenValidity();
    }, 10); // 5 minutes interval

    return () => {
      clearInterval(interval);
    };
  }, [UserType]);

  useEffect(() => {
    // Trigger re-render when UserType changes
    RenderProtectedRoutes(UserType, isAuthenticated);
  }, [UserType, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>; // Render loading indicator until authentication status is determined
  }

  return (
    <Router>
      <div>
        <ConditionalNavBar />
        <div>
          <Routes>
            {RenderProtectedRoutes(UserType, isAuthenticated)}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Function to render protected routes based on user role
function RenderProtectedRoutes(UserType, isAuthenticated) {
  if (!isAuthenticated && !publicRoutes.includes(window.location.pathname)) {
    return <Route path="*" element={<Navigate to="/login" replace />} />;
  }
  console.log(isAuthenticated);
  console.log(UserType);

  return (
    <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
      {UserType && (
        <>
          {UserType === "Manager" && (
            <>
              <Route exact path="/manager-dashboard" element={<Analysis />} />
              <Route
                exact
                path="/manager-dashboard/users"
                element={<Users />}
              />
              <Route
                exact
                path="/manager-dashboard/products"
                element={<Products />}
              />
              <Route
                exact
                path="/manager-dashboard/stocks"
                element={<Stocks />}
              />
              <Route
                exact
                path="/manager-dashboard/orders"
                element={<Orders />}
              />
            </>
          )}
          {UserType === "Cashier" && (
            <>
              <Route exact path="/cashier-dashboard" element={<Billing />} />
              <Route
                exact
                path="/cashier-dashboard/stocks"
                element={<NewCustomerPopup />}
              />
            </>
          )}
          {UserType === "Staff" && (
            <>
              <Route exact path="/Staff-dashboard" element={<Stocks/>} />
              <Route
                exact
                path="/Staff-dashboard/products"
                element={<Products />}
              />
              <Route
                exact
                path="/Staff-dashboard/users"
                element={< Users/>}
              />
            </>
          )}
          {UserType === "Supplier" && (
            <>
              <Route exact path="/Supplier-dashboard" element={<Orders />} />
            </>
          )}
          {UserType === "Customer" && (
            <>
              <Route exact path="/customer-dashboard" element={<Orders />} />
            </>
          )}
        </>
      )}
    </Route>
  );
}

function ConditionalNavBar() {
  const location = useLocation();
  // Render Navbar only if the current location is not the root path ("/")
  if (publicRoutes.includes(location.pathname)) {
    return null;
  } 
}

export default App;

/////////////////////////////////////////////////////////////////////////////////////

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
              <Route path='/admin' element={<AdminPage/>}/>
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
