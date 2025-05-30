// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './pages/UserHome'
import AboutUs from './pages/AboutUs'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoalPage from './pages/GoalPage';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/ContactUs';
import ContactUsLoggedIn from './pages/ContactUsLoggedIn'
import TermsAndConditions from './pages/TermsAndConditions';
import Crypto from './pages/Crypto';
import Stocks from './pages/Stocks';

function App() {
  const [customHoldings, setCustomHoldings] = useState([]);
  
  return (
    <BrowserRouter basename='/inf124'>
      <Routes>
        {/* ABOUT US PAGE == landing page */}
        <Route path='/' element={<AboutUs />} /> 
        {/* EXISTING USER LOG IN PAGE */}
        <Route path='/login' element={<LoginPage/>} />
        {/* REGISTER PAGE */}
        <Route path='/register' element={<RegisterPage/>} />
        {/* Goal PAGE */}
        <Route path='/goal' element={<GoalPage/>} />
        {/*User Profile */}
        <Route path='/profile' element={<UserProfile/>} />
        {/* Contact Us */}
        <Route path='/contact' element={<ContactUs/>} />
        {/* Contact Us page for logged in users */}
        <Route path='/contactloggedin' element={<ContactUsLoggedIn/>} />
        {/* Terms And Conditions */}
        <Route path='/terms' element={<TermsAndConditions/>} />
        {/* User's Home page */}
        <Route path='/userhome' element={<UserHome customHoldings={customHoldings} />} />
        {/* View Crypto */}
        <Route path='/crypto' element={<Crypto/>} />
        {/* View Stocks */}
        <Route path='/stocks' element={<Stocks customHoldings={customHoldings} setCustomHoldings={setCustomHoldings} />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
