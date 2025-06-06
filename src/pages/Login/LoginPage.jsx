import React, { useState, useContext } from 'react'; //useState automatically re renders changes
import { AccountContext } from '../../components/AccountContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import companyLogo from '../../assets/GreenWaveLogo.png';
import LogoLink from '../../components/LogoLink';
import '../../styles/LoginPage.css'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AccountContext);
    const [email,setEmail] = useState(''); // starts email and password as just an empty string
    const [password,setPassword] = useState('');
    const [error, setError] = useState(''); // error handling

    const handleSubmit = async (e) => { // function that handles when user clicks submit 
        e.preventDefault(); //prevents page from resetting
        setError(''); // resets error message

        try {
            const response = await fetch('http://localhost:4000/auth/login', { // fetch express server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // include cookies
                body: JSON.stringify({email, password}), // parse inputs
            });

            const data = await response.json();

            if (response.ok && data.loggedIn) {
                // Update user state with all user data
                await setUser({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    loggedIn: true // might delete?
                }); 
                
                /*
                    Logging in sends data to db correctly, and user can directly access private pages when inputting routes in link
                    However, logging in sends the user to /userhome but it doesn't render
                    Needs to refresh to render correctly
                */
                setTimeout(() => {
                    navigate('/userhome');
                }, 100);
            } else { // bad login
                setError(data.status || 'Login failed');
            }
        }
        catch (err) { // check if express server is up "npm run dev"
            setError('Server Error');
        }
    };

    return (
    <div className='login-container'>
        <div className='logo-form'><LogoLink /></div>
        <form onSubmit={handleSubmit}>
            <h1> Login for financial services </h1>

            {/* EMAIL INPUT */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                className="input-field"
                required
                />
            </div>

            {/* PASSWORD INPUT */}
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                required
                />
            </div>

            <p className="forgot-password">
                <Link to="/contact">Forgot password?</Link>
            </p>

            <button type="submit" className="login-button">Login</button>
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
