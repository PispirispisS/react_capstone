import React, { useEffect, useState } from 'react';
import './Notification.css'; // Asegúrate de tener estilos CSS adecuados para la notificación

const Notification = ({ appointmentDetails, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (appointmentDetails) {
      setIsVisible(true);

      // Ocultar la notificación después de 5 segundos
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [appointmentDetails]);

  const handleCancelAppointment = () => {
    setIsVisible(false);
    onCancel(); // Llama a la función para cancelar la cita
  };

  return (
    <div className={`notification-container ${isVisible ? 'show' : ''}`}>
      {appointmentDetails && (
        <div className="notification-content">
          <h3>Appointment Booked!</h3>
          <p>
            <strong>Doctor:</strong> {appointmentDetails.doctorName}
          </p>
          <p>
            <strong>Date:</strong> {appointmentDetails.appointmentDate}
          </p>
          <p>
            <strong>Time:</strong> {appointmentDetails.appointmentTime}
          </p>
          <button onClick={handleCancelAppointment}>Cancel Appointment</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
