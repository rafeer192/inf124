import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoalPage from './pages/GoalPage';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentUI from './pages/PaymentUI';

function App() {
  return (
    <BrowserRouter>
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
        {/* Terms And Conditions */}
        <Route path='/terms' element={<TermsAndConditions/>} />
        {/* Buy/Sell Stocks and Crypto */}
        <Route path='/payment' element={<PaymentUI/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
