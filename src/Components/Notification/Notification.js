import React, { useState, useEffect } from 'react';
import './Notification.css'; // Importa el archivo de estilos CSS de Notification

const Notification = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [appointmentCancelled, setAppointmentCancelled] = useState(false);

  // Esta función simula la lógica para cancelar una cita y ocultar la notificación
  const cancelAppointment = () => {
    // Aquí se realizaría la lógica para cancelar la cita
    // En este ejemplo, simplemente mostramos cómo cambiar el estado
    setAppointmentCancelled(true);

    // Luego de un tiempo, podríamos ocultar la notificación
    setTimeout(() => {
      setShowNotification(false);
    }, 2000); // Oculta la notificación después de 2 segundos
  };

  useEffect(() => {
    // Aquí podrías escuchar cambios en el estado o eventos que indiquen la cancelación de la cita
    if (appointmentCancelled) {
      setShowNotification(false); // Oculta la notificación cuando se cancela la cita
    }
  }, [appointmentCancelled]);

  return (
    <div className={`notification-container ${showNotification ? 'show' : ''}`}>
      <div className="notification-content">
        <span className="close-button" onClick={() => setShowNotification(false)}>
          &times;
        </span>
        <h3>Notification Title</h3>
        <p>Notification message goes here.</p>
        {children}
        <button onClick={cancelAppointment}>Cancel Appointment</button>
      </div>
    </div>
  );
};

export default Notification;
