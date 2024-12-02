import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { groupBy, sumBy } from 'lodash';
import { fetchList } from '../trainerapi';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = () => {
        fetchList("trainings")
        .then(data => setTrainings(data._embedded.trainings))
        .catch(err => console.error(err))
    };

    const groupedData = groupBy(trainings, 'activity');
    const activityStats = Object.keys(groupedData).map(activity => ({
        activity,
        totalDuration: sumBy(groupedData[activity], 'duration'),
    }));
    const overallTotalDuration = sumBy(activityStats, 'totalDuration');

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <div>
            <h2>Training Statistics</h2>
            <PieChart width={1250} height={350}>
                <Pie
                    data={activityStats}
                    dataKey="totalDuration"
                    nameKey="activity"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, totalDuration }) => 
                        `${name}: ${totalDuration} mins (${((totalDuration / overallTotalDuration) * 100).toFixed(2)}%)`}
                >
                    {activityStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} mins`, 'Duration']} />
                <Legend />
            </PieChart>
        </div>
    );
};