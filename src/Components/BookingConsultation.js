import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard/DoctorCard.js';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch.js';

const BookingConsultation = ({ handleShowNotification }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
      })
      .catch(err => console.log(err));
  };

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
    }
  };

  const handleDoctorSelection = (doctor) => {
    // Aquí puedes mostrar la notificación al seleccionar un doctor
    handleShowNotification(`You selected Dr. ${doctor.name}. Please confirm your booking.`);
    // Lógica para proceder con la cita, por ejemplo, enviar datos al servidor, etc.
    // Puedes implementar esta lógica dependiendo de tu flujo de la aplicación
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  return (
    <div>
      <FindDoctorSearch onSearch={handleSearch} />
      <div className="search-results-container">
        {isSearched && (
          <div>
            <h2>{filteredDoctors.length} doctors found</h2>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <DoctorCard
                  key={doctor.id}
                  {...doctor}
                  handleShowNotification={handleShowNotification}
                  handleDoctorSelection={handleDoctorSelection} // Pasar función de selección
                />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
