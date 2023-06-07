import React, {useState, useEffect} from 'react';
import FacultyButton from './FacultyButton';
import Container from '@mui/material/Container/Container';
import {
	Typography,
	Button,
	FormControl
} from '@mui/material';

const Home = () => {
	const [services, setServices] = useState([]);
	const [selectedId, setSelectedId] = useState("");

	async function postData(url, obj) {
		try {
				let init = {
						method: 'POST',
						headers: {
						'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
				}
				let result = await fetch(url, init)
				return await result
		}
		catch (er) {
				console.error('Ошибка:', er);
		}
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event)
		const body = {
			service: {
				service_id: selectedId
			},
			TypeRequest: {
			typeRequest_id: 3
			}
		};
		postData("http://localhost:3000/requests/create", body);
		// Process the selectedFaculty value or make an API request
	};

  useEffect(() => {
    fetch("http://localhost:3000/services/")
			.then(response => response.json())
			.then(json => setServices(json));
  }, []);

  const handleFacultyClick = (service_id) => {
		console.log(service_id);
		setSelectedId(service_id);
    // Send POST request with facultyId to the server
  };

  return (
		<Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Select Faculty
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
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
				</FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
		</Container>
  );
};

export default Home;
