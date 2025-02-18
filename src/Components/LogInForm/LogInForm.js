import React, { useState, useEffect } from 'react';
import './LogInForm.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../LogoSH.svg';

const Login = ({ setIsAuthenticated, setUserProfile }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simular autenticación
        sessionStorage.setItem('auth-token', 'fake-auth-token');
        sessionStorage.setItem('userName', email.split('@')[0]);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userProfileImage', 'https://via.placeholder.com/40'); // Imagen por defecto

        setIsAuthenticated(true);
        setUserProfile({
            name: email.split('@')[0],
            email: email,
            profileImage: 'https://via.placeholder.com/40'
        });

        navigate('/');
    };

    return (
        <div className="login-container">
            <div className="form-box">
                <img src={Logo} alt="Logo" className="logo" />
                <h1>Log In</h1>
                <p>New here? <Link to="/signup">Sign Up</Link></p>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;



