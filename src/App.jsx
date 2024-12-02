import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
		<Container maxWidth="xl">
			<AppBar position='static'>
			<Toolbar>
				<Button
				variant='h6'
				size='large'
				startIcon={<MenuIcon />}
				onClick={handleClick}
				/>
				<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose} 
				>
					<MenuItem onClick={handleClose} component={Link} to="/">Customers</MenuItem>
					<MenuItem onClick={handleClose} component={Link} to="/trainings">Trainings</MenuItem>
					<MenuItem onClick={handleClose} component={Link} to="/calendar">Calendar</MenuItem>
					<MenuItem onClick={handleClose} component={Link} to="/statistics">Statistics</MenuItem>
				</Menu>
				<Typography variant='h6'>Personal Trainer</Typography>
			</Toolbar>
			</AppBar>
			<Outlet />
			<CssBaseline />
		</Container>
		</>
	)
}

export default App
