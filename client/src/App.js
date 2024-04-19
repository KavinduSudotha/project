import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Login from './pages/login';
import Home from './pages/Home';
import{UserContext} from './helper/Context';
function App() {
  return ( 
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={< Home/>} />
      </Routes>
    </Router>

  );
}

export default App;
