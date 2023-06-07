import React, { useState, useEffect} from 'react';
import FacultyButton from './FacultyButton';

const ServicesList = () => {
  const [services, setServices] = useState([]);
	const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/services/")
			.then(response => response.json())
			.then(json => setServices(json))
  }, []);

  const handleFacultyClick = (service_id) => {
		console.log(service_id);
		setSelectedId(service_id);
    // Send POST request with facultyId to the server
  };

  return (
    <div className="services-list">
			<div className='selectedId' display="none" value={selectedId} ></div>
      {/* Map over 'services' and render each service */}
      {services.map(service => (
        <FacultyButton
          key={service.service_id}
          faculty={service.service_name}
          onClick={() => handleFacultyClick(service.service_id)}
        />
      ))}
    </div>
  );
};

export default ServicesList;

