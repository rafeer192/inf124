import React, { useState } from 'react'; //useState automatically re renders changes
import { Link } from 'react-router-dom';
import companyLogo from '../assets/GreenWaveLogo.png';

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

        <img src={companyLogo} alt='Company Logo' />

        <form onSubmit={handleSubmit}>
            <p> Login for financial services </p>

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
            <p>forgot password?</p>
            <button>Login</button>

            <p>Dont have an account? <Link to='/register'>Sign up</Link> </p> {/* CHANGE TO REGISTER PAGE WHEN DONE */}
        </form>

    </div>
    );
};
export default LoginPage;
