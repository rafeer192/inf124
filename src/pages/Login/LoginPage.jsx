import React, { useState, useContext } from 'react'; //useState automatically re renders changes
import { AccountContext } from '../../components/AccountContext';
import { Link, useNavigate } from 'react-router-dom';
import companyLogo from '../../assets/GreenWaveLogo.png';
import LogoLink from '../../components/LogoLink';
import '../../styles/LoginPage.css'; 

const LoginPage = () => {
    const { setUser } = useContext(AccountContext);
    const [email,setEmail] = useState(''); // starts email and password as just an empty string
    const [password,setPassword] = useState('');
    const [error, setError] = useState(''); // error handling
    const navigate = useNavigate();

    const handleSubmit = async (e) => { // function that handles when user clicks submit 
        e.preventDefault(); //prevents page from resetting
        setError(''); // resets error message

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // include cookies
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.ok && data.loggedIn) {
                setUser(data.user);
                console.log('OK')
                navigate('/userhome');
            }
            else {
                setError(data.status || 'Login failed');
                console.log('NOKAY')
            }
        }
        catch (err) {
            setError('Server Error');
        }
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
            <p className='forgot-password'>
                <Link to='/contact'>
                    Forgot password?
                </Link>
            </p>
            <button type='submit' className='login-button'>Login</button>
        </form>
        <p>Dont have an account? <Link to='/register'>Sign up</Link> </p> 
        <div className='footer-links'> 
            <Link to='/contact'> Help</Link> 
            <Link to='/terms'> Terms</Link>
            <Link to='/'> About Us</Link>
        </div>
    </div>
    );
};
export default LoginPage;
