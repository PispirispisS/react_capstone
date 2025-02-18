import React, { useState } from 'react';
import './SignupForm.css';
import Logo from '../../LogoSH.svg';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = ({ setIsAuthenticated, setUserProfile }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Guardar los datos del usuario en sessionStorage
        sessionStorage.setItem('auth-token', 'fake-auth-token');
        sessionStorage.setItem('userName', formData.name);
        sessionStorage.setItem('userEmail', formData.email);
        sessionStorage.setItem('userProfileImage', 'https://via.placeholder.com/40'); // Imagen por defecto

        setIsAuthenticated(true);
        setUserProfile({
            name: formData.name,
            email: formData.email,
            profileImage: 'https://via.placeholder.com/40'
        });

        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="form-box">
                <img src={Logo} alt="Logo" className="logo" />
                <h1>Sign Up</h1>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;






