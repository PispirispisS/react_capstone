import React, { useState, useEffect } from 'react';
import './LogInForm.css'; // Mantener el archivo de estilos CSS para LogInForm
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import Logo from '../../LogoSH.svg';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/")
        }
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const json = await res.json();
        
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('email', email);
            const userName = email.split('@')[0];
            sessionStorage.setItem("userName", userName);
            navigate('/');
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    alert(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };

    return (
        <div className="login-container">
            <a href="/"><img src={Logo} alt="Logo" /></a>
            <h1>Log In</h1>
            <p>New here? <Link to="/signup">Sign Up</Link></p>
            <form onSubmit={login} method="post">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="reset" className="reset-button">Reset</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

