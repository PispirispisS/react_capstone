import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ appointmentDetails, onCancelAppointment }) => {
  const [showFirstInstance, setShowFirstInstance] = useState(false);
  const [showSecondInstance, setShowSecondInstance] = useState(false);

  useEffect(() => {
    if (appointmentDetails) {
      setShowFirstInstance(true);
    }
  }, [appointmentDetails]);

  const handleCancelAppointment = () => {
    setShowFirstInstance(false);
    setShowSecondInstance(true);
  };

  const handleConfirmCancel = () => {
    setShowSecondInstance(false);
    onCancelAppointment(); // Llama a la función para cancelar la cita
  };

  const handleCancelCancel = () => {
    setShowSecondInstance(false);
    setShowFirstInstance(true); // Vuelve a mostrar la primera instancia si se cancela la cancelación
  };

  return (
    <div>
      {/* Primera instancia: Mostrar detalles de la cita y botón para cancelar */}
      {showFirstInstance && (
        <div className="notification-container show">
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
        </div>
      )}

      {/* Segunda instancia: Confirmación de cancelación */}
      {showSecondInstance && (
        <div className="notification-container show">
          <div className="notification-content">
            <h3>Are you sure?</h3>
            <div className="confirmation-buttons">
              <button className="yes-button" onClick={handleConfirmCancel}>Yes</button>
              <button className="no-button" onClick={handleCancelCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
