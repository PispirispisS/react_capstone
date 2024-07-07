import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ appointmentDetails, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (appointmentDetails) {
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        setShowConfirmation(false); // Asegurar que la confirmación esté oculta al volver a mostrar la notificación
      }, 15000);

      return () => clearTimeout(timeout);
    }
  }, [appointmentDetails]);

  const handleCancelAppointment = () => {
    setIsVisible(false); // Ocultar la notificación inicial
    setTimeout(() => {
      setShowConfirmation(true); // Mostrar la confirmación de cancelación con un pequeño retardo
    }, 300); // Ajusta el retardo según sea necesario para que se muestre correctamente
  };

  const handleConfirmCancel = (confirmed) => {
    setShowConfirmation(false); // Ocultar la confirmación

    if (confirmed) {
      onCancel(); // Llamar a la función para cancelar la cita
    } else {
      setIsVisible(true); // Mostrar nuevamente la notificación inicial si se decide no cancelar
    }
  };

  return (
    <div className={`notification-container ${isVisible || showConfirmation ? 'show' : ''}`}>
      {isVisible && !showConfirmation && (
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
      {showConfirmation && (
        <div className="confirmation-message">
          <h3>Are you sure?</h3>
          <div className="confirmation-buttons">
            <button onClick={() => handleConfirmCancel(true)}>Yes</button>
            <button onClick={() => handleConfirmCancel(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
