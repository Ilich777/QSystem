import { 
	AppBar, 
	Toolbar, 
	Typography,
	Box
} from '@mui/material';
import React from 'react';
import "./../App.css"

const Header = () => {
  return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar className="App-header">
					<Typography variant="h6">QSystem</Typography>
				</Toolbar>
			</AppBar>
		</Box>
  );
};

export default Header;
