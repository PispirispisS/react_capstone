import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    fetch('https://api.npoint.io/your-api-endpoint')
      .then(response => response.json())
      .then(data => {
        const doctorsWithReviews = data.map(doctor => ({ ...doctor, reviewGiven: '' }));
        setReviews(doctorsWithReviews);
      })
      .catch(error => console.error('Error fetching doctor data:', error));
  }, []);

  const handleReviewSubmit = (review) => {
    setReviews(prevReviews => 
      prevReviews.map(doctor => 
        doctor.name === review.doctorName ? { ...doctor, reviewGiven: review.comments } : doctor
      )
    );
    setSelectedDoctor(null);
  };

  return (
    <div>
      <h1>Reviews</h1>
      <p>Be an active part of our StayHealthy Community! Tell the others how was your experience so they know what to expect</p>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Review</th>
            <th>Review given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>
                <button 
                  onClick={() => setSelectedDoctor(doctor)} 
                  disabled={!!doctor.reviewGiven}
                >
                  Give Review
                </button>
              </td>
              <td>{doctor.reviewGiven}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDoctor && (
        <ReviewForm 
          doctor={selectedDoctor} 
          onSubmit={handleReviewSubmit} 
        />
      )}
    </div>
  );
};

export default Reviews;
