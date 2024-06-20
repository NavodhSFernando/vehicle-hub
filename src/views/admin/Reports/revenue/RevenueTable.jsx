import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RevenueTable = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [filteredRevenueData, setFilteredRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5062/api/RevenueReport", {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRevenueData(data);
        setFilteredRevenueData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    let filteredData = revenueData;

    if (startDate && endDate) {
      filteredData = revenueData.filter(
        (revenue) => revenue.date >= startDate && revenue.date <= endDate
      );
    } else if (startDate) {
      filteredData = revenueData.filter((revenue) => revenue.date >= startDate);
    } else if (endDate) {
      filteredData = revenueData.filter((revenue) => revenue.date <= endDate);
    }

    setFilteredRevenueData(filteredData);
  };

  const getTotalAmount = () => {
    return filteredRevenueData.reduce(
      (total, revenue) => total + revenue.amount,
      0
    );
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let startY = 10;

    // Header
    doc.setFontSize(18);
    doc.text("Revenue Report", 10, startY);
    startY += 10;

    // Table header
    const headers = ["ID", "Type", "Amount", "Date"];
    const data = filteredRevenueData.map((revenue) => [
      revenue.id,
      revenue.type,
      revenue.amount,
      revenue.date,
    ]);

    // Table
    autoTable(doc, {
      startY,
      head: [headers],
      body: data,
    });

    // Total row
    const totalRow = [["Total", "", getTotalAmount(), ""]];
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      body: totalRow,
    });

    // Save the PDF
    doc.save("revenue_report.pdf");
  };

  const handlePrint = () => {
    window.print(); // Generate print dialog
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="revenue-table-container" className="container mx-auto py-8 mb-10 px-4 sm:px-6 lg:px-8 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 id="report-title" className="text-3xl font-bold mb-6 text-center">Revenue Report</h1>

      <div className="flex flex-wrap justify-between mb-4">
        <div className="mb-4" style={{ width: "45%" }}>
          <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Start Date:</label>
          <input
            type="date"
            id="start-date-input"
            name="startDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4" style={{ width: "45%" }}>
          <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">End Date:</label>
          <input
            type="date"
            id="end-date-input"
            name="endDate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <button
          id="filter-button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      <div id="revenue-table-container" className="mb-6 overflow-auto">
        <h2 id="revenue-breakdown-title" className="text-xl font-bold mb-4 text-center">Revenue Breakdown</h2>
        <table id="revenue-table" className="w-full border-collapse border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-start">ID</th>
              <th className="px-4 py-2 border-b border-gray-300 text-start">Type</th>
              <th className="px-4 py-2 border-b border-gray-300 text-start">Amount</th>
              <th className="px-4 py-2 border-b border-gray-300 text-start">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRevenueData.map((revenue) => (
              <tr key={revenue.id}>
                <td className="px-4 py-2 border-b border-gray-300">{revenue.id}</td>
                <td className="px-4 py-2 border-b border-gray-300">{revenue.type}</td>
                <td className="px-4 py-2 border-b border-gray-300">{revenue.amount}</td>
                <td className="px-4 py-2 border-b border-gray-300">{new Date(revenue.date).toLocaleDateString()}</td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-bold border-t border-gray-300">Total</td>
              <td className="px-4 py-2 font-bold border-t border-gray-300"></td>
              <td className="px-4 py-2 font-bold border-t border-gray-300">{getTotalAmount()}</td>
              <td className="px-4 py-2 border-t border-gray-300"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex mt-4 space-x-4 export-print-buttons">
        <button
          id="export-pdf-button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleExportPDF}
        >
          Export to PDF
        </button>
        <button
          id="print-button"
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      <style jsx>{`
        @media print {
          .export-print-buttons {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RevenueTable;
