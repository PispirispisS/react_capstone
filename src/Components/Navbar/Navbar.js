import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../LogoSH.svg'; // Ajusta la ruta según la estructura de tu proyecto

const Navbar = ({ isAuthenticated, userName, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="StayHealthy" />
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
                <li><Link to="/health-blog">Health Blog</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to="/instant-consultation">Instant Consultation</Link></li>
            </ul>
            <div className="navbar-auth">
                {!isAuthenticated ? (
                    <>
                        <Link to="/signup" className="auth-button">Sign Up</Link>
                        <Link to="/login" className="auth-button">Log In</Link>
                    </>
                ) : (
                    <div className="navbar-user">
                        <span>Welcome, {userName}</span>
                        <button onClick={handleLogout} className="auth-button">Log Out</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;






