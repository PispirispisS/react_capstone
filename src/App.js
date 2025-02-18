import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import LandingPage from './Components/Landing_Page/LandingPage.js';
import SignUpForm from './Components/SignUpForm/SignupForm.js';
import LogInForm from './Components/LogInForm/LogInForm.js';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.js';
import BookingConsultation from './Components/BookingConsultation.js';
import Notification from './Components/Notification/Notification.js';
import ReviewForm from './Components/ReviewForm/ReviewForm.js';
import UserProfile from './Components/UserProfile/UserProfile.js';
import Reports from './Components/Reports/Reports.js';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: sessionStorage.getItem('userName') || 'Guest',
        email: sessionStorage.getItem('userEmail') || '',
        profileImage: sessionStorage.getItem('userProfileImage') || 'https://via.placeholder.com/40'
    });

    const [notificationDetails, setNotificationDetails] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('auth-token');
        if (token) {
            setIsAuthenticated(true);
            setUserProfile({
                name: sessionStorage.getItem('userName') || 'Guest',
                email: sessionStorage.getItem('userEmail') || '',
                profileImage: sessionStorage.getItem('userProfileImage') || 'https://via.placeholder.com/40'
            });
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUserProfile({
            name: 'Guest',
            email: '',
            profileImage: 'https://via.placeholder.com/40'
        });
    };

    // ✅ Mantiene la función de notificaciones
    const handleShowNotification = (details) => {
        setNotificationDetails(details);
        setTimeout(() => {
            setNotificationDetails(null);
        }, 10000);
    };

    const handleCancelAppointment = () => {
        setNotificationDetails(null);
    };

    return (
        <Router>
            <Navbar 
                isAuthenticated={isAuthenticated} 
                userProfile={userProfile || {}} 
                handleLogout={handleLogout} 
            />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUpForm setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />} />
                <Route path="/login" element={<LogInForm setIsAuthenticated={setIsAuthenticated} setUserProfile={setUserProfile} />} />
                <Route path="/instant-consultation" element={<InstantConsultation handleShowNotification={handleShowNotification} />} />
                <Route path="/booking-consultation" element={<BookingConsultation handleShowNotification={handleShowNotification} />} />
                <Route path="/reviews" element={<ReviewForm />} />
                <Route path="/profile" element={<UserProfile userProfile={userProfile} setUserProfile={setUserProfile} />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
            {notificationDetails && <Notification appointmentDetails={notificationDetails} onCancel={handleCancelAppointment} />}
        </Router>
    );
}

export default App;



