import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeedbackOverTimeChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/FeedbackReport');
                const data = response.data;
                const weeklyData = processFeedbackData(data);
                setData(weeklyData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackData();
    }, []);

    const processFeedbackData = (data) => {
        const weeklyData = {};

        data.forEach((feedback) => {
            const date = new Date(feedback.date);
            const week = getWeekNumber(date);
            if (!weeklyData[week]) {
                weeklyData[week] = { week, feedbacks: 0, totalRating: 0, count: 0 };
            }
            weeklyData[week].feedbacks += 1;
            weeklyData[week].totalRating += feedback.rating;
            weeklyData[week].count += 1;
        });

        return Object.values(weeklyData).map(weekData => ({
            week: `Week ${weekData.week}`,
            feedbacks: weekData.feedbacks,
            averageRating: (weekData.totalRating / weekData.count).toFixed(2)
        }));
    };

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil(days / 7);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="h-[34rem] bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium" style={{ fontWeight: 800 }}>Feedback Over Time</strong>
            <div className="mt-3 w-full flex-1 text-xs" id="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="feedbacks" stroke="#0ea5e9" name="Feedback Count" />
                        <Line yAxisId="right" type="monotone" dataKey="averageRating" stroke="#ef4444" name="Average Rating" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FeedbackOverTimeChart;
