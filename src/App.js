import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import LandingPage from './Components/Landing_Page/LandingPage.js';
import SignUpForm from './Components/SignUpForm/SignupForm.js';
import LogInForm from './Components/LogInForm/LogInForm.js';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.js';
import BookingConsultation from './Components/BookingConsultation.js'; 

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('auth-token');
        if (token) {
            setIsAuthenticated(true);
            setUserName(sessionStorage.getItem('userName'));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUserName('');
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} userName={userName} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/booking-consultation" element={<BookingConsultation />} /> {/* Nueva ruta */}
            </Routes>
        </Router>
    );
}

export default App;








