import React from "react";
import Login from "./page/loginpage.jsx";
import { PageNameProvider } from './context/PageNameContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./page/homepage.jsx";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.js";
import RecordsPricelist from './page/Recordspricelist';
import Updatejob from './page/updatejob';
import Inventory from './page/inventory';
import Inventoryrecord from './page/InventoryTable';
import AddWastageForm from './page/AddWastage';
import SellWastageForm from './page/SellWastage';
import Reports from './page/ReportsHome';
import Addpricelist from './page/AddPriceList';
import Viewpricelist from './page/viewpricelist';
import AdminPage from './page/adminpage';
import RawBuyPage from './page/rawbuypage';
import RawUse from './page/rawuse';
import AddJobPage from './page/JobPage';
import Users from "./page/users.jsx";
import InventoryTable from "./page/InventoryTable";
import AddNote from "./page/Addnote";
import Report from "./components/report/report"

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
      <PageNameProvider>
        <div>
          <ConditionalSideBar />
          <div>
            <Routes>
              {RenderProtectedRoutes(UserType, isAuthenticated)}
              <Route exact path="/" element={<Login />} />
              {/* <Route exact path="/login" element={<Login />} /> */}
              <Route exact path="*" element={<LandingPage />} />
            </Routes>
          </div>
        </div>
      </PageNameProvider>
    </Router>
  );
}

// Function to render protected routes based on user role
function RenderProtectedRoutes(UserType, isAuthenticated) {
  if (!isAuthenticated && !publicRoutes.includes(window.location.pathname)) {
    return <Route path="*" element={<Navigate to="/" replace />} />;
  }
  console.log(isAuthenticated);
  console.log(UserType);

  return (
    <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
      {UserType && (
        <>
          {UserType === "Director" && (
            <>
              <Route 
              exact 
              path="/director-dashboard"
              element={<LandingPage />} 
              />
               <Route
                exact
                path="/director-dashboard/pricelist"
                element={<Viewpricelist />}
              />
              <Route
                exact
                path="/director-dashboard/buyraw"
                element={<RawBuyPage />}
              />
              <Route
                exact
                path="/director-dashboard/rawuse"
                element={<RawUse />}
              />
              <Route
                exact
                path="/director-dashboard/Addnote"
                element={<AddNote/>}
                />
              <Route
                exact
                path="/director-dashboard/addwastagepage"
                element={<AddWastageForm />}
              />                    
             <Route
                exact
                path="/director-dashboard/InventoryTable"
                element={<InventoryTable/>}
              />
              <Route
                exact
                path="/director-dashboard/sellwastagepage"
                element={<SellWastageForm />}
              />
              <Route
                exact
                path="/director-dashboard/report"
                element={<Report />}
              />
              <Route
                exact
                path="/director-dashboard/admin"
                element={<AdminPage />}
              />
          
              <Route
                exact
                path="/director-dashboard/addjobpage"
                element={<AddJobPage />}
              />
              <Route
                exact
                path="/director-dashboard/AddPriceList"
                element={<Addpricelist />}
              />
              <Route
                exact
                path="/director-dashboard/RecordsPricelist"
                element={<RecordsPricelist />}
              />
              <Route
                exact
                path="/director-dashboard/updatejob"
                element={<Updatejob />}
              /><Route
              exact
              path="/director-dashboard/inventory"
              element={<Inventory />}
            />
                <Route
                exact
                path="/director-dashboard/InventoryTable"
                element={<Inventoryrecord />}
              />
                <Route
                exact
                path="/director-dashboard/reports"
                element={<Reports />}
              />
               <Route
                exact
                path="/director-dashboard/Users"
                element={<Users />}
              />
              

            </>
          )}
           {UserType === "Manager" && (
            <>
             <Route 
              exact 
              path="/Manager-dashboard"
              element={<LandingPage />} 
              />
               <Route
                exact
                path="/Manager-dashboard/pricelist"
                element={<Viewpricelist />}
              />
              <Route
                exact
                path="/Manager-dashboard/buyraw"
                element={<RawBuyPage />}
              />
              <Route
                exact
                path="/Manager-dashboard/rawuse"
                element={<RawUse />}
              />
              <Route
                exact
                path="/Manager-dashboard/addwastagepage"
                element={<AddWastageForm />}
              />
             
              <Route
                exact
                path="/Manager-dashboard/sellwastagepage"
                element={<SellWastageForm />}
              />
              <Route
                exact
                path="/Manager-dashboard/RecordsPricelist"
                element={<RecordsPricelist />}
              />
              <Route
                exact
                path="/Manager-dashboard/updatejob"
                element={<Updatejob />}
              /><Route
              exact
              path="/Manager-dashboard/inventory"
              element={<Inventory />}
            />
                <Route
                exact
                path="/Manager-dashboard/InventoryTable"
                element={<Inventoryrecord />}
              />
                  
            </>
          )}
           {UserType === "Supervisor" && (
            <>
              <Route 
              exact 
              path="/Supervisor-dashboard"
              element={<LandingPage />} 
              />
               <Route
                exact
                path="/Supervisor-dashboard/pricelist"
                element={<Viewpricelist />}
              />
              <Route
                exact
                path="/Supervisor-dashboard/buyraw"
                element={<RawBuyPage />}
              />
              <Route
                exact
                path="/Supervisor-dashboard/rawuse"
                element={<RawUse />}
              />
              <Route
                exact
                path="/Supervisor-dashboard/addwastagepage"
                element={<AddWastageForm />}
              />
                       
              <Route
                exact
                path="/Supervisor-dashboard/RecordsPricelist"
                element={<RecordsPricelist />}
              />
              <Route
                exact
                path="/Supervisor-dashboard/updatejob"
                element={<Updatejob />}
              /><Route
              exact
              path="/Supervisor-dashboard/inventory"
              element={<Inventory />}
            />
           
            </>
          )}
          {UserType === "Employer" && (
            <>
              <Route 
              exact 
              path="/Employer-dashboard"
              element={<LandingPage />} 
              />
               <Route
                exact
                path="/Employer-dashboard/pricelist"
                element={<Viewpricelist />}
              />
              
              <Route
                exact
                path="/Manager-dashboard/rawuse"
                element={<RawUse />}
              />
              <Route
                exact
                path="/Manager-dashboard/addwastagepage"
                element={<AddWastageForm />}
              />
                  
             <Route
              exact
              path="/Employer-dashboard/inventory"
              element={<Inventory />}
            />
            </>
          )}  
        </>
      )}
    </Route>
  );
}

function ConditionalSideBar() {
  const location = useLocation();
  // Render Sidebar only if the current location is not the root path ("/") 
  if (location.pathname !== '/') {
    return <Sidebar />;
  }
  return null;
}

export default App;