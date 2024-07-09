import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [doctors, setDoctors] = useState([]);
    const [reviewingDoctorId, setReviewingDoctorId] = useState(null);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [patientName, setPatientName] = useState('');

    useEffect(() => {
        // Simula una llamada a una API para obtener la lista de doctores
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63'); // Ajusta la URL de la API según sea necesario
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                // Inicializa los doctores con reviewGiven como una cadena vacía y buttonDisabled como falso
                const initializedDoctors = data.map(doctor => ({
                    ...doctor,
                    reviewGiven: '',
                    buttonDisabled: false
                }));
                setDoctors(initializedDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleReviewClick = (doctorId) => {
        setReviewingDoctorId(doctorId);
    };

    const handleReviewSubmit = (e, doctorId) => {
        e.preventDefault();
        const updatedDoctors = doctors.map(doctor =>
            doctor.name === doctorId // Usamos name como identificador porque id no está presente en la API
                ? { ...doctor, reviewGiven: review, buttonDisabled: true }
                : doctor
        );
        setDoctors(updatedDoctors);
        setReviewingDoctorId(null);
        setReview('');
        setRating(1);
        setPatientName('');
    };

    return (
        <div className="review-form-container">
            <h2>Reviews</h2>
            <p>Be an active part of our StayHealthy Community! Tell the others how was your experience so they know what to expect</p>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Provide Review</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                                <button
                                    className="review-button"
                                    onClick={() => handleReviewClick(doctor.name)} // Usamos name como identificador porque id no está presente en la API
                                    disabled={doctor.buttonDisabled}
                                >
                                    Give Review
                                </button>
                            </td>
                            <td>{doctor.reviewGiven}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {reviewingDoctorId !== null && (
                <div className="review-popup">
                    <h3>Provide Review</h3>
                    <form onSubmit={(e) => handleReviewSubmit(e, reviewingDoctorId)}>
                        <div className="form-group">
                            <label htmlFor="patientName">Patient Name</label>
                            <input
                                id="patientName"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="review">Comments</label>
                            <textarea
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-button">Submit Review</button>
                    </form>
                    <button onClick={() => setReviewingDoctorId(null)} className="close-button">Close</button>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
