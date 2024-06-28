import React, { useState } from 'react';
import './LogInForm.css'; // Importa el archivo de estilos CSS para LogInForm
import Logo from '../../LogoSH.svg';

const LogInForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (value.includes('@')) {
            setEmailError('');
        } else {
            setEmailError('Email must contain "@" symbol.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setEmailError('Email must contain "@" symbol.');
        } else {
            setEmailError('');
            // Lógica para enviar el formulario
            console.log('Form submitted');
        }
    };

    return (
        <div className="login-container">
            <a href="/"><img src={Logo} alt="Logo" /></a>
            <h1>Log In</h1>
            <p>New here? <a href="/signup">Sign Up</a></p>
            <form onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={validateEmail}
                    />
                    {emailError && <span className="error">{emailError}</span>}
                </div>

                <div className="form-group password-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Submit</button>
                    <button type="reset" className="reset-button">Reset</button>
                </div>
            </form>
        </div>
    );
}

export default LogInForm;
