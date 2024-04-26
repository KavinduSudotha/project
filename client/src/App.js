// import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
// import Login from './pages/login';
// import Home from './pages/Home';

// import{UserContext} from './helper/Context';
// function App() {
//   return ( 

//     <Router>
//       <div className= "flex h-screen">
//         <Home/>
//         <div className="flex-  overflow-y-auto">
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/home" element={< Home/>} />
//       </Routes>
//         </div>
//       </div>
//     </Router>

//   );
// }

// export default App;
// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import LoginPage from './pages/loginpage';
import HomePage from './pages/homepage';
import{UserContext} from './helper/Context';

function App() {
  return (
    <Router>
      <div className='flex h-screen'>
          {/* <ConditionalSideBar /> */}
          
        <div className='flex-1 '>
          <Routes>
              {/* <Route path='/' element={<FirebaseTest/>}/> */}
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/homepage' element={<HomePage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
