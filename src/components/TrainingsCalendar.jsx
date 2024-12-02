import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Tooltip from '@mui/material/Tooltip';
import { fetchList } from '../trainerapi';
import '../calendar.css';

const localizer = momentLocalizer(moment);

export default function TrainingsCalendar() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
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
    };

    const events = trainings.map(training => ({
        id: training.id,
        start: new Date(training.date),
        end: new Date(new Date(training.date).getTime() + training.duration * 60000),
        title: `${training.activity} (${training.customer})`
    }));

    return (
        <div style={{padding: '5px', height:450}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                components={{
                    event: ({ event }) => (
                        <Tooltip title={event.title} arrow>
                            <div>{event.title}</div>
                        </Tooltip>
                    )
                }}
            />
        </div>
    );
};
