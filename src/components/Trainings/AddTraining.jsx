import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { saveInfo } from '../../trainerapi';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function AddCustomer(props) {
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
        date: dayjs(),
		duration: "",
        customer: ""
	});

    const handleClickOpen = () => {
		setOpen(true);
		setTraining({
			activity: "",
            date: dayjs(),
            duration: "",
			customer: props.data._links.customer.href
		})
	};

    const handleClose = () => {
		setOpen(false);
	};

    const handleChange = (event) => {
		setTraining({...training, [event.target.name]: event.target.value});
	}

	const handleDateChange = (newDate) => {
		if (newDate && newDate.isValid()) {
			setTraining({ ...training, date: newDate });
		} else {
			console.error("Invalid date:", newDate);
		}
	};

    const handleSave = () => {
		if(!training.activity || !training.date || !training.duration){
            alert("Please fill in all fields.");
        } else if (isNaN(training.duration) || training.duration <= 0) {
            alert("Please enter a valid duration in minutes.");
        } else {
			const trainingData = { 
                ...training, 
                date: training.date.toISOString() // Convert to ISO string for saving
            };
            saveInfo("trainings", trainingData)
			.then(() => {
				handleClose();
			})
			.catch(err => console.error(err))
		}
	}

    return(
        <>
			<IconButton 
				onClick={handleClickOpen}
			>
				<AddIcon />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Add Training ({props.data.firstname} {props.data.lastname})</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="activity"
						label="Activity"
						value={training.activity}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker 
							label="Date"
							value={training.date} 
							onChange={handleDateChange}
						/>
					</LocalizationProvider>
					<TextField
						margin="dense"
						name="duration"
						label="Duration"
						value={training.duration}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="outlined" startIcon={<CancelIcon />} >Cancel</Button>
					<Button onClick={handleSave} variant="outlined" startIcon={<SaveIcon />} >Save</Button>
				</DialogActions>
			</Dialog>
		</>
    )
}