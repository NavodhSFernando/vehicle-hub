import React, { useState } from "react";
import jsPDF from "jspdf";

const FeedbackReport = () => {
  // Dummy feedback dat
  const [feedbackData] = useState([
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet",
      rating: 4,
      date: "2024-03-01",
      customer: "John Doe",
      vehicle: "Car",
    },
    {
      id: 2,
      content: "Consectetur adipiscing elit",
      rating: 5,
      date: "2024-02-28",
      customer: "Jane Smith",
      vehicle: "Truck",
    },
    {
      id: 3,
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      rating: 3,
      date: "2024-02-27",
      customer: "Alice Johnson",
      vehicle: "Car",
    },
    {
      id: 4,
      content: "Ut enim ad minim veniam",
      rating: 4,
      date: "2024-02-26",
      customer: "Bob Williams",
      vehicle: "Car",
    },
    {
      id: 5,
      content:
        "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      rating: 5,
      date: "2024-02-25",
      customer: "Emily Brown",
      vehicle: "Truck",
    },
  ]);

  // Filtered feedback data
  const [filteredFeedbackData, setFilteredFeedbackData] =
    useState(feedbackData);

  // Filter criteria state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const handleFilter = () => {
    let filteredData = feedbackData;

    // Apply filters based on start date
    if (startDate !== "") {
        filteredData = filteredData.filter((feedback) => {
            const feedbackDate = new Date(feedback.date);
            return feedbackDate >= new Date(startDate);
        });
    }

    // Apply filters based on end date
    if (endDate !== "") {
        filteredData = filteredData.filter((feedback) => {
            const feedbackDate = new Date(feedback.date);
            return feedbackDate <= new Date(endDate);
        });
    }

    // Apply other filters
    if (vehicleFilter !== "") {
        filteredData = filteredData.filter((feedback) =>
            feedback.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())
        );
    }
    if (customerFilter !== "") {
        filteredData = filteredData.filter((feedback) =>
            feedback.customer.toLowerCase().includes(customerFilter.toLowerCase())
        );
    }
    if (ratingFilter !== "") {
        filteredData = filteredData.filter(
            (feedback) => feedback.rating === parseInt(ratingFilter)
        );
    }

    setFilteredFeedbackData(filteredData);
};


  // Function to handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const feedbackTable = [];
    filteredFeedbackData.forEach((feedback, index) => {
      const rowData = [
        feedback.content,
        feedback.rating,
        feedback.date,
        feedback.customer,
        feedback.vehicle,
      ];
      feedbackTable.push(rowData);
    });

    doc.autoTable({
      head: [
        [
          "Feedback Content",
          "Rating",
          "Date",
          "Customer Information",
          "Vehicle",
        ],
      ],
      body: feedbackTable,
    });

    doc.save("feedback_report.pdf");
  };

  const handlePrint = () => {
    window.print(); // Generate print dialog
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Feedback Report</h1>

      {/* Date Range Selector */}
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-gray-700 font-bold mb-2"
        >
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

      <div className="mb-4">
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

      {/* Vehicle Filter */}
      <div className="mb-4">
        <label
          htmlFor="vehicleFilter"
          className="block text-gray-700 font-bold mb-2"
        >
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

      {/* Customer Filter */}
      <div className="mb-4">
        <label
          htmlFor="customerFilter"
          className="block text-gray-700 font-bold mb-2"
        >
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

      {/* Rating Filter */}
      <div className="mb-4">
        <label
          htmlFor="ratingFilter"
          className="block text-gray-700 font-bold mb-2"
        >
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

      {/* Filter Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      {/* Feedback List */}
      <div className="mb-4">
        <table className="w-full border-collapse border rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-start">Feedback Content</th>
              <th className="px-4 py-2 text-start">Rating</th>
              <th className="px-4 py-2 text-start">Date</th>
              <th className="px-4 py-2 text-start">Customer Information</th>
              <th className="px-4 py-2 text-start">Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {/* Render filtered feedback data */}
            {filteredFeedbackData.map((feedback) => (
              <tr key={feedback.id}>
                <td className="px-4 py-2">{feedback.content}</td>
                <td className="px-4 py-2">{feedback.rating}</td>
                <td className="px-4 py-2">{feedback.date}</td>
                <td className="px-4 py-2">{feedback.customer}</td>
                <td className="px-4 py-2">{feedback.vehicle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Export and Print buttons */}
      <div className="flex justify-center mt-4 space-x-4 export-print-buttons">
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

      {/* CSS for print media */}
      <style jsx>{`
        @media print {
          /* Hide export and print buttons */
          .export-print-buttons {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackReport;
