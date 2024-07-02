import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../LogoSH.svg';

function Navbar({ isAuthenticated, userName, handleLogout }) {
    const navigate = useNavigate();

    const logout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {isAuthenticated ? (
                    <>
                        <span>Welcome, {userName}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Log In</Link>
                    </>
                )}
            </div>
            <div className="navbar-center">
                <Link to="/" className="logo">
                    <img src={Logo} alt="Logo" />
                </Link>
            </div>
            <div className="navbar-right">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#appointments">Appointments</a></li>
                    <li><a href="#health-blog">Health Blog</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><Link to="/instant-consultation">Instant Consultation</Link></li> {/* Nuevo enlace agregado */}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;





