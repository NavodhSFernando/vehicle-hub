import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const VehicleUtilizationReport = () => {
  const [reservationData] = useState([
    {
      id: 1,
      vehicleNumber: "ABC123",
      startDate: "2024-03-01",
      endDate: "2024-03-03",
      mileage: 200,
      details: "A1522",
    },
    {
      id: 2,
      vehicleNumber: "ABC123",
      startDate: "2024-02-28",
      endDate: "2024-03-01",
      mileage: 150,
      details: "A1548",
    },
    {
      id: 3,
      vehicleNumber: "ABC123",
      startDate: "2024-02-27",
      endDate: "2024-02-28",
      mileage: 180,
      details: "B1622",
    },
    {
      id: 4,
      vehicleNumber: "GHI012",
      startDate: "2024-02-26",
      endDate: "2024-02-27",
      mileage: 220,
      details: "K1522",
    },
    {
      id: 5,
      vehicleNumber: "GHI012",
      startDate: "2024-02-28",
      endDate: "2024-03-27",
      mileage: 250,
      details: "H6744",
    },
    {
      id: 6,
      vehicleNumber: "JKL345",
      startDate: "2024-02-25",
      endDate: "2024-02-26",
      mileage: 250,
      details: "F5634",
    },
    // Additional reservation data...
    {
      id: 7,
      vehicleNumber: "MNO678",
      startDate: "2024-03-05",
      endDate: "2024-03-07",
      mileage: 190,
      details: "G2456",
    },
    {
      id: 8,
      vehicleNumber: "PQR901",
      startDate: "2024-03-02",
      endDate: "2024-03-03",
      mileage: 220,
      details: "J3578",
    },
    {
      id: 9,
      vehicleNumber: "STU234",
      startDate: "2024-03-03",
      endDate: "2024-03-05",
      mileage: 180,
      details: "L9846",
    },
    {
      id: 10,
      vehicleNumber: "VWX567",
      startDate: "2024-03-07",
      endDate: "2024-03-08",
      mileage: 200,
      details: "M6534",
    },
    {
      id: 11,
      vehicleNumber: "YZA890",
      startDate: "2024-03-09",
      endDate: "2024-03-10",
      mileage: 250,
      details: "N6578",
    },
    {
      id: 12,
      vehicleNumber: "BCD123",
      startDate: "2024-03-11",
      endDate: "2024-03-12",
      mileage: 180,
      details: "O3467",
    },
    {
      id: 13,
      vehicleNumber: "EFG456",
      startDate: "2024-03-12",
      endDate: "2024-03-14",
      mileage: 210,
      details: "P8795",
    },
    {
      id: 14,
      vehicleNumber: "HIJ789",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      mileage: 240,
      details: "Q2345",
    },
    {
      id: 15,
      vehicleNumber: "KLM012",
      startDate: "2024-03-18",
      endDate: "2024-03-20",
      mileage: 230,
      details: "R8943",
    },
    {
      id: 16,
      vehicleNumber: "NOP345",
      startDate: "2024-03-21",
      endDate: "2024-03-23",
      mileage: 190,
      details: "S4576",
    },
    {
      id: 17,
      vehicleNumber: "QRS678",
      startDate: "2024-03-24",
      endDate: "2024-03-26",
      mileage: 220,
      details: "T2345",
    },
    {
      id: 18,
      vehicleNumber: "TUV901",
      startDate: "2024-03-27",
      endDate: "2024-03-28",
      mileage: 200,
      details: "U9087",
    },
    {
      id: 19,
      vehicleNumber: "VWX234",
      startDate: "2024-03-29",
      endDate: "2024-03-30",
      mileage: 230,
      details: "V8790",
    },
    {
      id: 20,
      vehicleNumber: "YZA567",
      startDate: "2024-03-31",
      endDate: "2024-04-01",
      mileage: 210,
      details: "W5632",
    },
  ]);

  const [filteredReservationData, setFilteredReservationData] =
  useState(reservationData);
const [vehicleNumber, setVehicleNumber] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const handleFilter = () => {
  let filteredData = reservationData.filter((reservation) => {
    // Filter by vehicle number
    if (
      vehicleNumber &&
      reservation.vehicleNumber
        .toLowerCase()
        .indexOf(vehicleNumber.toLowerCase()) === -1
    ) {
      return false;
    }
    // Filter by start date
    if (startDate && new Date(reservation.startDate) < new Date(startDate)) {
      return false;
    }
    // Filter by end date
    if (endDate && new Date(reservation.endDate) > new Date(endDate)) {
      return false;
    }
    return true;
  });
  setFilteredReservationData(filteredData);
};

const calculateTotalMileage = () => {
  let totalMileage = filteredReservationData.reduce(
    (total, reservation) => total + reservation.mileage,
    0
  );
  return totalMileage;
};

const handleExportPDF = () => {
  const doc = new jsPDF();

  // Calculate total mileage
  const totalMileage = calculateTotalMileage();

  // Set text color to main UI color
  doc.setTextColor("#283280");

  // Add reservation data to the table
  doc.autoTable({
    head: [
      [
        { content: "Vehicle Number", styles: { fillColor: "#283280", textColor: "#ffffff" } },
        { content: "Start Date", styles: { fillColor: "#283280", textColor: "#ffffff" } },
        { content: "End Date", styles: { fillColor: "#283280", textColor: "#ffffff" } },
        { content: "Mileage", styles: { fillColor: "#283280", textColor: "#ffffff" } },
        { content: "Reservation Id", styles: { fillColor: "#283280", textColor: "#ffffff" } },
      ],
    ],
    body: filteredReservationData.map((reservation) => [
      reservation.vehicleNumber,
      reservation.startDate,
      reservation.endDate,
      reservation.mileage,
      reservation.details,
    ]),
  });

  // Add a separate section for total mileage
  doc.setFontSize(12);
  doc.text(
    `Total Mileage: ${totalMileage}`,
    14,
    doc.autoTable.previous.finalY + 10
  );

  doc.save("VehicleUtilizationReport.pdf");
};

const handlePrint = () => {
  window.print(); // Generate print dialog
};

return (
  <div className="container mx-auto py-8 text-gray-700">
    <h1 className="text-3xl font-bold mb-4 text-left" style={{ color: "#283280" }}>
      Vehicle Utilization Report
    </h1>

    {/* Form for filtering */}
    <div className="mb-4">
      <div className="mb-2" style={{ width: "45%" }}>
        <label className="block text-left mb-1">Enter vehicle number:</label>
        <input
          type="text"
          placeholder="Enter vehicle number"
          className="px-4 py-2 border rounded-md w-full"
          style={{ borderColor: "#283280" }}
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </div>
      <div className="mb-2" style={{ width: "45%" }}>
        <label className="block text-left mb-1">Start Date:</label>
        <input
          type="date"
          className="px-4 py-2 border rounded-md w-full"
          style={{ borderColor: "#283280" }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-2" style={{ width: "45%" }}>
        <label className="block text-left mb-1">End Date:</label>
        <input
          type="date"
          className="px-4 py-2 border rounded-md w-full"
          style={{ borderColor: "#283280" }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
    <br />

    {/* Reservation list table */}
    <div className="mb-4">
      <table className="w-full border-collapse border rounded-md">
        {/* Table headers */}
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Vehicle Number</th>
            <th className="px-4 py-2 text-left">Start Date</th>
            <th className="px-4 py-2 text-left">End Date</th>
            <th className="px-4 py-2 text-left">Mileage</th>
            <th className="px-4 py-2 text-left">Reservation Id</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Render filtered reservation data */}
          {filteredReservationData.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-4 py-2">{reservation.vehicleNumber}</td>
              <td className="px-4 py-2">{reservation.startDate}</td>
              <td className="px-4 py-2">{reservation.endDate}</td>
              <td className="px-4 py-2">{reservation.mileage}</td>
              <td className="px-4 py-2">{reservation.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Total Mileage */}
    {vehicleNumber !== "" && (
      <div className="text-center">
        <p className="font-bold" style={{ color: "#283280" }}>
          Total Mileage: {calculateTotalMileage()}
        </p>
      </div>
    )}

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

export default VehicleUtilizationReport;