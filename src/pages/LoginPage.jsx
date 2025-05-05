import React, { useState } from 'react'; //useState automatically re renders changes
import { Link } from 'react-router-dom';
import companyLogo from '../assets/GreenWaveLogo.png';
import LogoLink from '../components/LogoLink';
import '../styles/LoginPage.css'; 

const LoginPage = () => {
    const [email,setEmail] = useState(''); // starts email and password as just an empty string
    const [password,setPassword] = useState('');

    const handleSubmit = (e) => { // function that handles when user clicks submit 
        e.preventDefault(); //prevents page from resetting
        console.log('Inputted email: ', email); // waiting to send data to a server to login (REPLACE)
        console.log('Inputted password: ', password);
    };

    return (
    <div className='login-container'>
        <div className='logo-form'><LogoLink /></div>
        <form onSubmit={handleSubmit}>
            <h1> Login for financial services </h1>

            {/* EMAIL INPUT */}
            <input 
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email*'
            className='input-field'
            required
            />
            <br/>         
            {/* PASSWORD INPUT */}
            <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='input-field'
            required
            />
            <p className='forgot-password'>Forgot password?</p>
            <button type='submit' className='login-button'>Login</button>
        </form>
        <p>Dont have an account? <Link to='/register'>Sign up</Link> </p> 
        <div className='footer-links'> 
            <Link to='/'> Help</Link> {/* CHANGE ONCE HAVE NEW PAGES */}
            <Link to='/'> Terms</Link>
            <Link to='/'> About Us</Link>
        </div>
    </div>
    );
};
export default LoginPage;
