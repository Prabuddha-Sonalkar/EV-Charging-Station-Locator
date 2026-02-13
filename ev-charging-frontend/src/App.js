import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Register from "./pages/Register";
import Map from "./pages/Map"
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import AdminLogin from "./pages/AdminLogin";


function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin-login" element={<AdminLogin />} /> 
        
        

      </Routes>
    </Router>
  );
}

export default App;
