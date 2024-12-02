import { useState } from 'react';
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

export default function AddCustomer(props) {
	const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
		firstname: "",
		lastname: "",
		streetaddress: "",
		postcode: "",
		city: "",
		email: "",
		phone: ""  
	});

	const handleClickOpen = () => {
		setOpen(true);
		setCustomer({
			firstname: "",
			lastname: "",
			streetaddress: "",
			postcode: "",
			city: "",
			email: "",
			phone: "" 
		})
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setCustomer({...customer, [event.target.name]: event.target.value});
	}

	const handleSave = () => {
		if(!customer.firstname || !customer.lastname || !customer.streetaddress || !customer.postcode || !customer.city || !customer.email || !customer.phone){
            alert("Please fill in all fields.");
        }
        else {
			saveInfo("customers",customer)
			.then(() => {
				props.handleFetch();
				handleClose();
			})
			.catch(err => console.error(err))
		}
	}

	return (
		<>
			<Button 
				variant="contained" 
				startIcon={<AddIcon />} 
				style={{ marginTop: '6px', marginBottom: '6px', width: '170px' }}
				onClick={handleClickOpen}
			>
				Add Customer
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>New Customer</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						name="firstname"
						label="Firstname"
						value={customer.firstname}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="lastname"
						label="Lastname"
						value={customer.lastname}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="streetaddress"
						label="Street Address"
						value={customer.streetaddress}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="postcode"
						label="Postcode"
						value={customer.postcode}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="city"
						label="City"
						value={customer.city}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="email"
						label="Email"
						value={customer.email}
						onChange={handleChange}
						fullWidth
						variant="standard"
					/>
					<TextField
						margin="dense"
						name="phone"
						label="Phone"
						value={customer.phone}
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
	);
}