import React from 'react';
import Button from '@mui/material/Button/Button';

const FacultyButton = ({id, faculty, onClick }) => {
  
	return (
		<Button
			id={id}
			sx={{
				marginTop: 5,
				height: 80,
				fontFamily: "Arial",
				fontSize: 20
			}}
			onClick={onClick}
			variant="outlined"
			color="primary"
		>{faculty}</Button>
  );
};

export default FacultyButton;
