import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const FeedbackReport = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [filteredFeedbackData, setFilteredFeedbackData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vehicleFilter, setVehicleFilter] = useState('');
    const [customerFilter, setCustomerFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [filterError, setFilterError] = useState('');

    useEffect(() => {
        fetchFeedbackData();
    }, []);

    const fetchFeedbackData = async () => {
        try {
            const response = await fetch('http://localhost:5062/api/FeedbackReport');
            if (!response.ok) {
                throw new Error('Failed to fetch feedback data');
            }
            const data = await response.json();

            const formattedData = data.map((item) => ({
                id: item.id,
                vehicleReview: item.vehicle_Review,
                serviceReview: item.service_Review,
                rating: item.rating,
                date: item.date,
                customer: item.customer,
                vehicle: item.vehicle
            }));

            setFeedbackData(formattedData);
            setFilteredFeedbackData(formattedData);
        } catch (error) {
            console.error('Error fetching feedback data:', error);
        }
    };

    const handleFilter = () => {
        // Reset previous error
        setFilterError('');

        // Validate start date or end date
        if (startDate === '' && endDate === '') {
            setFilterError('Please select a start date or an end date.');
            return;
        }

        let filteredData = feedbackData;

        // Apply filters
        if (startDate !== '') {
            filteredData = filteredData.filter((feedback) => {
                const feedbackDate = new Date(feedback.date);
                return feedbackDate >= new Date(startDate);
            });
        }

        if (endDate !== '') {
            filteredData = filteredData.filter((feedback) => {
                const feedbackDate = new Date(feedback.date);
                return feedbackDate <= new Date(endDate);
            });
        }

        if (vehicleFilter !== '') {
            filteredData = filteredData.filter((feedback) =>
                feedback.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())
            );
        }
        if (customerFilter !== '') {
            filteredData = filteredData.filter((feedback) =>
                feedback.customer.toLowerCase().includes(customerFilter.toLowerCase())
            );
        }
        if (ratingFilter !== '') {
            filteredData = filteredData.filter((feedback) => feedback.rating === parseInt(ratingFilter));
        }

        setFilteredFeedbackData(filteredData);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Prepare table data for jspdf-autotable
        const tableData = filteredFeedbackData.map((feedback) => [
            feedback.id,
            feedback.vehicleReview,
            feedback.serviceReview,
            '⭐'.repeat(feedback.rating), // Render star ratings as text
            feedback.date,
            feedback.customer,
            feedback.vehicle
        ]);

        // Set table headers
        const tableHeaders = [
            { header: 'Id', dataKey: 'id' },
            { header: 'Vehicle Review', dataKey: 'vehicleReview' },
            { header: 'Service Review', dataKey: 'serviceReview' },
            { header: 'Rating', dataKey: 'rating' },
            { header: 'Date', dataKey: 'date' },
            { header: 'Customer', dataKey: 'customer' },
            { header: 'Vehicle', dataKey: 'vehicle' }
        ];

        // Add table to PDF
        autoTable(doc, {
            head: [tableHeaders.map(header => header.header)],
            body: tableData,
            didDrawCell: (data) => {
                // Customize styles as needed, e.g., data.cell.styles.fillColor = 'white';
            }
        });

        // Save PDF
        doc.save('feedback_report.pdf');
    };

    const handlePrint = () => {
        window.print(); // Generate print dialog
    };

    return (
        <div className="container mx-auto py-8 px-4 bg-white border-2 border-gray-300 rounded-md">
            <h1 className="text-3xl font-bold mb-4">Feedback Report</h1>

            <div className="flex flex-wrap justify-between mb-4">
                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="w-full px-4 py-2 border rounded-md"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="w-full px-4 py-2 border rounded-md"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-between mb-4">
                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="vehicleFilter" className="block text-gray-700 font-bold mb-2">
                        Vehicle:
                    </label>
                    <input
                        type="text"
                        id="vehicleFilter"
                        name="vehicleFilter"
                        placeholder="Enter vehicle"
                        className="w-full px-4 py-2 border rounded-md"
                        value={vehicleFilter}
                        onChange={(e) => setVehicleFilter(e.target.value)}
                    />
                </div>

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="customerFilter" className="block text-gray-700 font-bold mb-2">
                        Customer:
                    </label>
                    <input
                        type="text"
                        id="customerFilter"
                        name="customerFilter"
                        placeholder="Enter customer name"
                        className="w-full px-4 py-2 border rounded-md"
                        value={customerFilter}
                        onChange={(e) => setCustomerFilter(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-4" style={{ width: '45%' }}>
                <label htmlFor="ratingFilter" className="block text-gray-700 font-bold mb-2">
                    Rating:
                </label>
                <input
                    type="number"
                    id="ratingFilter"
                    name="ratingFilter"
                    placeholder="Enter rating"
                    className="w-full px-4 py-2 border rounded-md"
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                />
            </div>

            <div className="mb-8 mt-7">
                {filterError && <p className="text-red-500 text-sm">{filterError}</p>}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>

            <div className="mb-4">
                <table className="w-full border-collapse border rounded-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Id</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Vehicle Review</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Service Review</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Rating</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Date</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Customer</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Vehicle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbackData.map((feedback) => (
                            <tr key={feedback.id}>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.id}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.vehicleReview}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.serviceReview}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{'⭐'.repeat(feedback.rating)}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.date}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.customer}</td>
                                <td className="px-4 py-2 border-t border-gray-300">{feedback.vehicle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex mt-4 space-x-4 export-print-buttons">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleExportPDF}
                >
                    Export to PDF
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default FeedbackReport;
