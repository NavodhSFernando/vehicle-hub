import React, { useState } from "react";
import jsPDF from "jspdf";

const RevenueReport = () => {
  // Dummy revenue data
  const [revenueData] = useState([
    { id: 1, type: "Deposit Payment", amount: 500, date: "2024-03-01" },
    { id: 2, type: "Balance Payment", amount: 1000, date: "2024-02-28" },
    { id: 3, type: "Deposit Payment", amount: 300, date: "2024-02-27" },
    { id: 4, type: "Balance Payment", amount: 700, date: "2024-02-26" },
    { id: 5, type: "Balance Payment", amount: 1200, date: "2024-02-25" },
  ]);

  // Filtered revenue data
  const [filteredRevenueData, setFilteredRevenueData] = useState(revenueData);

  // Filter criteria state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

// Function to handle filtering
const handleFilter = () => {
  let filteredData = revenueData;

  // Apply date range filter
  if (startDate !== "" && endDate !== "") {
    filteredData = filteredData.filter(
      (revenue) => revenue.date >= startDate && revenue.date <= endDate
    );
  } else if (startDate !== "") { // Apply start date filter
    filteredData = filteredData.filter(
      (revenue) => revenue.date <= startDate
    );
  } else if (endDate !== "") { // Apply end date filter
    filteredData = filteredData.filter(
      (revenue) => revenue.date <= endDate
    );
  }

  setFilteredRevenueData(filteredData);
};
  // Function to calculate total amount
  const getTotalAmount = () => {
    return filteredRevenueData.reduce(
      (total, revenue) => total + revenue.amount,
      0
    );
  };

  // Function to handle export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    let startY = 10;

    // Header
    doc.setFontSize(18);
    doc.text("Revenue Report", 10, startY);
    startY += 10;

    // Table header
    const headers = ["Type", "Amount", "Date"];
    const data = filteredRevenueData.map((revenue) => [
      revenue.type,
      revenue.amount,
      revenue.date,
    ]);

    // Table
    doc.autoTable({
      startY,
      head: [headers],
      body: data,
    });

    // Total row
    const totalRow = [["Total", getTotalAmount(), ""]];
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      body: totalRow,
    });

    // Save the PDF
    doc.save("revenue_report.pdf");
  };

  const handlePrint = () => {
    window.print(); // Generate print dialog
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Revenue Report</h1>

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

      {/* Filter Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      {/* Revenue Breakdown */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Revenue Breakdown</h2>
        <table className="w-full border-collapse border rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-start">Type</th>
              <th className="px-4 py-2 text-start">Amount</th>
              <th className="px-4 py-2 text-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Render filtered revenue data */}
            {filteredRevenueData.map((revenue) => (
              <tr key={revenue.id}>
                <td className="px-4 py-2">{revenue.type}</td>
                <td className="px-4 py-2">{revenue.amount}</td>
                <td className="px-4 py-2">{revenue.date}</td>
              </tr>
            ))}
            {/* Display total row */}
            <tr>
              <td className="px-4 py-2 font-bold">Total</td>
              <td className="px-4 py-2 font-bold">{getTotalAmount()}</td>
              <td className="px-4 py-2"></td>
            </tr>
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

export default RevenueReport;
