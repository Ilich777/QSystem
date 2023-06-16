import React from "react";
import Button from "@mui/material/Button/Button";

interface FacultyButton {
  id: string,
	faculty: string,
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const facultyButton: React.FC<FacultyButton> = ({id, faculty, onClick }) => {
  
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

export default facultyButton;
