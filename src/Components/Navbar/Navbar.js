import React from 'react';
import './Navbar.css';
import Logo from './LogoSH.svg';  // Importa el SVG aquí

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-left">
                    <button><a href="/grihf-frontend_capstone_starter_code/SignUpForm/SignupForm.html">Sign Up</a></button>
                    <button><a href="/grihf-frontend_capstone_starter_code/LogInForm/LogInForm.html">Log In</a></button>
                </div>
                <div className="navbar-center">
                    <a href="/grihf-frontend_capstone_starter_code/Landing_Page/LandingPage.html" className="logo">
                        <img src={Logo} alt="Logo" />  {/* Usa el SVG importado aquí */}
                    </a>
                </div>
                <div className="navbar-right">
                    <ul>
                        <li><a href="/grihf-frontend_capstone_starter_code/Landing_Page/LandingPage.html">Home</a></li>
                        <li><a href="#appointments">Appointments</a></li>
                        <li><a href="#health-blog">Health Blog</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

