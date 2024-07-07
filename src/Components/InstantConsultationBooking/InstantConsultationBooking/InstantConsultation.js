import React, { useEffect, useState } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '/home/project/react_capstone/src/Components/FindDoctorSearch/FindDoctorSearch.js';
import DoctorCard from '/home/project/react_capstone/src/Components/DoctorCard/DoctorCard.js';

const InstantConsultation = ({ handleShowNotification }) => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                if (searchParams.get('speciality')) {
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                } else {
                    setFilteredDoctors([]);
                    setIsSearched(false);
                }
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
    }, [searchParams]);

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearch onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCard
                                        className="doctorcard"
                                        {...doctor}
                                        key={doctor.name}
                                        handleShowNotification={handleShowNotification}
                                        handleDoctorSelection={handleDoctorSelection} // Pasar función de selección
                                    />
                                ))
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : ('')}
                </div>
            </div>
        </center>
    );
};

export default InstantConsultation;
