import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        {/* TEMP MAIN PAGE */}
        <Route path='/' element={<LoginPage/>} />
        {/* REGISTER PAGE */}
        <Route path='/register' element={<RegisterPage/>} />
        
        <Route path='/termsAndConditions' element={<TermsAndConditions/>}/>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
