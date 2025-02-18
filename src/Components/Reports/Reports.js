import React, { useState, useEffect } from 'react';
import './Reports.css';

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Simula una llamada a una API para obtener los reportes médicos
        const fetchReports = async () => {
            const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63'); // Ajusta la URL de la API según sea necesario
            const data = await response.json();
            setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div className="reports-container">
            <h2>Medical Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Specialty</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.date}</td>
                            <td>{report.doctor}</td>
                            <td>{report.specialty}</td>
                            <td>
                                <div className="report-buttons">
                                    <button>View</button>
                                    <button>Download</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Reports;
