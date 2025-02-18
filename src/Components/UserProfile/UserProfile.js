import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = ({ userProfile, setUserProfile }) => {
    const [profileImage, setProfileImage] = useState(sessionStorage.getItem('userProfileImage') || 'https://via.placeholder.com/100');
    const [name, setName] = useState(sessionStorage.getItem('userName') || '');
    const [email, setEmail] = useState(sessionStorage.getItem('userEmail') || '');
    const [phone, setPhone] = useState(sessionStorage.getItem('userPhone') || '');
    const [address, setAddress] = useState(sessionStorage.getItem('userAddress') || '');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                sessionStorage.setItem('userProfileImage', reader.result);
                setUserProfile(prevProfile => ({
                    ...prevProfile,
                    profileImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <h2>{name || "User"}'s Profile</h2>
            <p>Here you can view and edit your personal details.</p>
            
            <Link to="/reports" className="reports-link">Click here to view your Medical Reports</Link>

            {/* Imagen de perfil con opción de cambio */}
            <div className="profile-image-container">
                <img src={profileImage} alt="Profile" className="profile-image-large" />
                <label className="image-upload-label">
                    📷
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
            </div>

            <form className="profile-form">
                <input type="text" placeholder="My Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="My Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="My Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="My Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default UserProfile;

