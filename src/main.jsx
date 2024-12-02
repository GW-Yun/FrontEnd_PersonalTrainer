import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import CustomersList from './components/Customers/CustomersList.jsx';
import TrainingsList from './components/Trainings/TrainingsList.jsx';
import TrainingsCalendar from './components/TrainingsCalendar.jsx';
import Statistics from './components/Statistics.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [  
			{
				element: <CustomersList />,
				index: true
			},
			{
				path: "trainings",
				element: <TrainingsList />,
			},
			{
				path: "calendar",
				element: <TrainingsCalendar />,
			},
			{
				path: "statistics",
				element: <Statistics />,
			},
		]
	}
]);

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
