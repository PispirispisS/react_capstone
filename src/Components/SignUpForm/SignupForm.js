import React, { useState } from 'react';
import './SignupForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import Logo from '../../LogoSH.svg';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setPhoneError('Phone number must be exactly 10 digits.');
            return;
        } else {
            setPhoneError('');
        }

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            const userName = email.split('@')[0];
            sessionStorage.setItem("userName", userName);
            navigate("/");
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <a href="/"><img src={Logo} alt="Logo" /></a>
                <h1>Sign Up</h1>
                <p>Joined already? <Link to="/login">Log In</Link></p>
                <form method="POST" onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Enter your name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" />
                        {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" name="phone" placeholder="Enter your phone number" />
                        {phoneError && <div className="err" style={{ color: 'red' }}>{phoneError}</div>}
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="reset" className="reset-button">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Sign_Up;




