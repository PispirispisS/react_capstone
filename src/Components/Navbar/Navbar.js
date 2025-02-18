import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../LogoSH.svg';

const Navbar = ({ isAuthenticated, userProfile, handleLogout }) => {
    const navigate = useNavigate(); // 🔹 Se usa aquí, dentro de un componente con Router

    const [profileImage, setProfileImage] = useState(userProfile.profileImage || 'https://via.placeholder.com/40');

    useEffect(() => {
        const storedImage = sessionStorage.getItem('userProfileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, [userProfile.profileImage]);

    const handleLogoutAndRedirect = () => {
        handleLogout(); // 🔹 Cierra sesión
        navigate('/'); // 🔹 Redirige a Home/LandingPage
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="StayHealthy" />
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to={isAuthenticated ? "/appointments" : "/login"}>Appointments</Link></li>
                <li><Link to="/health-blog">Health Blog</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to={isAuthenticated ? "/instant-consultation" : "/login"}>Instant Consultation</Link></li>
            </ul>
            <div className="navbar-auth">
                {!isAuthenticated ? (
                    <>
                        <Link to="/signup" className="auth-button">Sign Up</Link>
                        <Link to="/login" className="auth-button">Log In</Link>
                    </>
                ) : (
                    <div className="navbar-user">
                        <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="profile-image"
                            onClick={() => navigate('/profile')}
                            style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                        <button onClick={handleLogoutAndRedirect} className="auth-button">Log Out</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;









