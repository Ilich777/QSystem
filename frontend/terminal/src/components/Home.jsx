import React, {useState, useEffect} from 'react';
import FacultyButton from './FacultyButton';
import Container from '@mui/material/Container/Container';
import {
	Typography,
	FormControl
} from '@mui/material';

const Home = () => {
	const [services, setServices] = useState([]);

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

  useEffect(() => {
    fetch("/services/")
			.then(response => response.json())
			.then(json => setServices(json));
  }, []);

  const handleFacultyClick = (event) => {
		const service_id = event.target.id;
		const body = {
			service: {
				service_id: service_id
			},
			TypeRequest: {
				typeRequest_id: 3
			}
		};
		postData("/requests/create", body)
			.then(response => response.json())
			.then(json => console.log(json));
  };

  return (
		<Container maxWidth="sm">
      <Typography variant="h4" mt={5} gutterBottom sx={{ color: '#161227' }}> 
        Выберите факультет
      </Typography>
      <form>
        <FormControl fullWidth margin="normal">
					<div className="services-list">
						{/* Map over 'services' and render each service */}
						{services.map(service => (
							<FacultyButton
								id={service.service_id}
								key={service.service_id}
								faculty={service.service_name}
								onClick={handleFacultyClick}
							></FacultyButton>
						))}
					</div>
				</FormControl>
      </form>
		</Container>
  );
};

export default Home;
