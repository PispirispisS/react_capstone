import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import LandingPage from './Components/Landing_Page/LandingPage.js';
import SignUpForm from './Components/SignUpForm/SignupForm.js';
import LogInForm from './Components/LogInForm/LogInForm.js';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.js';
import BookingConsultation from './Components/BookingConsultation.js'; 
import Notification from './Components/Notification/Notification.js'; // Importa el componente de notificación

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [showNotification, setShowNotification] = useState(false);

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

    const handleShowNotification = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000); // Oculta la notificación después de 3 segundos
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} userName={userName} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/instant-consultation" element={<InstantConsultation handleShowNotification={handleShowNotification} />} />
                <Route path="/booking-consultation" element={<BookingConsultation />} />
            </Routes>
            {showNotification && (
                <Notification>
                    <p>Your notification message here</p>
                </Notification>
            )}
        </Router>
    );
}

export default App;










