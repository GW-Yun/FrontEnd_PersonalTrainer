import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { CSVLink, CSVDownload } from "react-csv";

import { fetchList, deleteInfo } from '../../trainerapi';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from '../Trainings/AddTraining';

export default function CustomersList() {
	const [ customers, setCustomers ] = useState([]);
	const [open, setOpen] = useState(false);

	const [ colDefs, setColDefs ] = useState([
		{ field: "firstname", filter: true, width:120},
		{ field: "lastname", filter: true, width:120},
		{ headerName: "Street Address", field: "streetaddress", filter: true, width:190 },
		{ field: "postcode", filter: true, width:110 },
		{ field: "city", filter: true, width:110 },
		{ field: "email", filter: true, width:200 },
		{ field: "phone", filter: true, width:120 },
		{
            field: "Training", sortable: false, cellRenderer: params => <AddTraining data={params.data} />,
            width: 90
        },
		{
            field: "edit", sortable: false, cellRenderer: params => <EditCustomer handleFetch={handleFetch} data={params.data} />,
            width: 75
        },
		{
			field: "delete", sortable: false, cellRenderer: params => 
				<IconButton 
					color="error" 
					onClick={() => handleDelete(params.data._links.self.href)}
				>
					<DeleteIcon />
				</IconButton>,
			width: 75
		}
	]);

	useEffect(() => {
		handleFetch();
	},[]);

	const handleFetch = () => {
		fetchList("customers")
		.then(data => setCustomers(data._embedded.customers))
		.catch(err => console.error(err))
	}

	const handleDelete = (url) =>{
		if (window.confirm("Confirm?")){
			deleteInfo(url)
			.then(() => {
				handleFetch()
				setOpen(true)
			})
			.catch(err => console.error(err))
		}
	} 

	const csvData = customers.map(({ _links, ...rest }) => rest);

	return(
		<>
			<AddCustomer handleFetch={handleFetch} />
			<Button 
				variant="outlined" 
				style={{ marginLeft: '10px' }}
				component={CSVLink}
				data={csvData}
				filename={"customers.csv"}
			>
				Export
			</Button>
			<div className="ag-theme-quartz" style={{ height: 500 }}>
				<AgGridReact 
					rowData={customers}
					columnDefs={colDefs}
					pagination={true}
					paginationAutoPageSize={true}
				/>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Customer deleted"
			/>
		</>
	);
}
  