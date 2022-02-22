import React, { useState } from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// import { Routes } from "@mui/material";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./Login";


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <Login/>
      ):(
        <div className="app_body">
          <Router>
            <Routes>

              <Route path="/rooms/:roomId" element={<><Sidebar/><Chat /></>}>
                
                
              </Route>
              
              <Route path="/" element={<Sidebar/>} >

              </Route>
  
            </Routes>
          </Router>
        </div>
      )}
      

    </div>
  );
}

export default App;