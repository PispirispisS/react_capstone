import React from 'react';
import './App.css';
import LandingPage from './Components/Landing_Page/LandingPage.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
            </Routes>
        </Router>
    );
}

export default App;





