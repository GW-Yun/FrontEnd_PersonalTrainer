import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { fetchList, deleteInfo } from '../../trainerapi';


export default function TrainingsList() {
    const [ trainings, setTrainings ] = useState([]);
	const [open, setOpen] = useState(false);

    const [ colDefs, setColDefs ] = useState([
		{ field: "activity", filter: true, width:260},
		{ field: "date", filter: true, width:290, 
            valueFormatter: params => {
                return params.value ? dayjs(params.value).format("DD.MM.YYYY hh:mm a") : "";
            }
        },
		{ field: "duration", filter: true, width:200 },
		{ field: "customer", filter: true, width:260 },
		{
			field: "delete", sortable: false, cellRenderer: params => 
				<IconButton 
					color="error" 
					onClick={() => handleDelete(params.data.id)}
				>
					<DeleteIcon />
				</IconButton>,
			width: 200
		}
	]);

    useEffect(() => {
		handleFetch();
	},[]);

    const handleFetch = () => {
		fetchList("gettrainings")
		.then(data => {
            const transformedData = data.map(training => ({
                id: training.id,
                date: training.date,
                duration: training.duration,
                activity: training.activity,
                customer: `${training.customer.firstname} ${training.customer.lastname}`
            }));
            setTrainings(transformedData);
        })
		.catch(err => console.error(err))
	}

    const handleDelete = (id) =>{
		if (window.confirm("Confirm?")){
            const url  = `${import.meta.env.VITE_API_URL}trainings/${id}`
		    deleteInfo(url)
            .then(() => {
                handleFetch()
                setOpen(true)
            })
            .catch(err => console.error(err))
		}
	} 

    return(
        <>
			<div className="ag-theme-quartz" style={{ height: 500 }}>
				<AgGridReact 
					rowData={trainings}
					columnDefs={colDefs}
					pagination={true}
					paginationAutoPageSize={true}
				/>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Training deleted"
			/>
		</>
    );
}