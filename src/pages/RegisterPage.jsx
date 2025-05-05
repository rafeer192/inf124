import React, { useState } from 'react'; //useState automatically re renders changes
import { Link } from 'react-router-dom';
import LogoLink from '../components/LogoLink';
import '../styles/RegisterPage.css'; 
const RegisterPage = () => {
    const [formData,setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        state: '',
        agreeToTerms: false
    });
    //list of options for dropdown menu 
    const states = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
        'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'
      ];
      
      //changes form data, "name" can be emails value will be changed etc
      const handleChange = (event) => {
        const { name,type, value, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        // will send data to server later on HERE
        console.log('Registering user: ', formData)
      }
    return (
        <div className='register-container'>
            <div className='logo-container'>
                <LogoLink />
            </div>
            <h1>Let's get started</h1>
            <form onSubmit={handleSubmit} className='register-form'>
                <div className='form-row'>
                    <input
                    type='text'
                    name='firstName'
                    className='form-input'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder='Legal first name'
                    />
                    <input
                    type='text'
                    name='lastName'
                    className='form-input'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder='Legal last name'
                    />
                </div>
                <div className='form-group'>
                    <select
                    name = 'state'
                    className='form-input'
                    value = {formData.state}
                    onChange={handleChange}
                    required
                    >
                        <option value=''>State</option>
                        {states.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <input
                    type='email'
                    name='email'
                    className='form-input'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder='Email'
                    />
                </div>

                <div className = 'form-group'>
                    <input
                    type='password'
                    name='password'
                    className='form-input'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder='Password'
                    />
                </div>
                <div className = 'form-group'>
                    <label className='checkbox-label'>
                    <input 
                    type='checkbox' 
                    name='agreeToTerms'
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    />
                    <span>By checking this box I agree that I have read, understood, and consent to 
                    GreenWaves’s <Link to='/register'> Terms and Conditions</Link> 
                    {/* MUST CHANGE LINK TO TERMS AND CONDITION LATER */}
                    </span>
                    </label>
                </div>
                    <button type='submit'>Sign up</button>
            </form>
            <p className='login-route'> Already have an account? <Link to='/'>Login</Link></p>
        </div>
    );





};
export default RegisterPage;