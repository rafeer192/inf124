import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoalPage from './pages/GoalPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentUI from './pages/PaymentUI';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        {/* TEMP MAIN PAGE */}
        {/* <Route path='/' element={<LoginPage/>} /> */}
        {/* REGISTER PAGE */}
        {/* <Route path='/register' element={<RegisterPage/>} /> */}
        {/* Goal PAGE */}
        <Route path='/goal' element={<GoalPage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
