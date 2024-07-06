import React, { useEffect, useState } from 'react';
import './Notification.css'; // Archivo de estilos

const Notification = ({ appointmentCancelled, appointmentDetails }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (appointmentCancelled) {
      setShowNotification(false);
    }
  }, [appointmentCancelled]);

  return (
    showNotification && (
      <div className="notification">
        <h3>Appointment Details</h3>
        <p><strong>User:</strong> {appointmentDetails.userName}</p>
        <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
        <p><strong>Date:</strong> {appointmentDetails.date}</p>
        <p><strong>Time:</strong> {appointmentDetails.time}</p>
        <button onClick={() => setShowNotification(false)}>Dismiss</button>
      </div>
    )
  );
};

export default Notification;
