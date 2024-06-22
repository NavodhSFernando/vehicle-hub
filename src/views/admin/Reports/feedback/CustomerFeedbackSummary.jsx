import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerFeedbackSummary = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/FeedbackReport');
                const data = response.data;
                const groupedData = groupFeedbackByCustomer(data);
                setSummaryData(groupedData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbackData();
    }, []);

    const groupFeedbackByCustomer = (data) => {
        const grouped = data.reduce((acc, curr) => {
            const { customer, rating, date } = curr;
            if (!acc[customer]) {
                acc[customer] = {
                    name: customer,
                    totalFeedbacks: 0,
                    averageRating: 0,
                    latestFeedbackDate: new Date(0), // Initial date value for comparison
                    ratings: [],
                };
            }
            acc[customer].totalFeedbacks += 1;
            acc[customer].ratings.push(rating);
            const feedbackDate = new Date(date);
            if (feedbackDate > acc[customer].latestFeedbackDate) {
                acc[customer].latestFeedbackDate = feedbackDate;
            }
            return acc;
        }, {});

        return Object.values(grouped).map((customer) => ({
            name: customer.name,
            totalFeedbacks: customer.totalFeedbacks,
            averageRating: (customer.ratings.reduce((a, b) => a + b, 0) / customer.ratings.length).toFixed(2),
            latestFeedbackDate: customer.latestFeedbackDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className=" bg-white p-4 rounded-sm border mb-8 border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-m" style={{ fontWeight: 800 }}>Customer Feedback Summary</strong>
            <div className="mt-3 w-full flex-1 text-sm overflow-x-auto">
                <table className="w-full bg-white border rounded-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Customer Name</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Total Feedbacks</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Average Rating</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Latest Feedback Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summaryData.map((customer, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border-b border-gray-300">{customer.name}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{customer.totalFeedbacks}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{customer.averageRating}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{customer.latestFeedbackDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomerFeedbackSummary;
