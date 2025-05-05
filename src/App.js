import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermsAndConditions from './pages/TermsAndConditions';
import PaymentUI from './pages/PaymentUI';
function App() {
  return (
      <BrowserRouter>
      <Routes>
        {/* TEMP MAIN PAGE */}
        <Route path='/' element={<LoginPage/>} />
        {/* REGISTER PAGE */}
        <Route path='/register' element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
