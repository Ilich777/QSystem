import React from 'react';
import Button from '@mui/material/Button/Button';

const FacultyButton = ({ faculty, onClick }) => {
  
	return (
    <Button 
			onClick={onClick}
			sx={{
				width: 300,
			}}
			>{faculty}</Button>
  );
};

export default FacultyButton;
