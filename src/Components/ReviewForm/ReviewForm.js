import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        // Simula una llamada a una API para obtener la lista de doctores
        const fetchDoctors = async () => {
            const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63'); // Ajusta la URL de la API según sea necesario
            const data = await response.json();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);

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
                        <tr key={doctor.id}>
                            <td>{index + 1}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                                <button className="review-button">Give Review</button>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewForm;
