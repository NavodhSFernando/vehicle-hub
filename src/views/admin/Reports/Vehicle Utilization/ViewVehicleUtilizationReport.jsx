import React from 'react'
import VehicleUtilizationTable from './VehicleUtilizationTable'
import { vehicleUtilizationColumns } from './VehicleUtilizationColumns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ViewVehicleUtilizationReport() {
    const utilizationData = [
        { vehicleNo: 'ABC123', startDate: '2024-03-01', endDate: '2024-03-05', mileage: 300, reservationId: 'RES001' },
        { vehicleNo: 'XYZ789', startDate: '2024-03-02', endDate: '2024-03-06', mileage: 250, reservationId: 'RES002' },
        { vehicleNo: 'DEF456', startDate: '2024-03-03', endDate: '2024-03-07', mileage: 400, reservationId: 'RES003' },
        { vehicleNo: 'GHI789', startDate: '2024-03-04', endDate: '2024-03-08', mileage: 350, reservationId: 'RES004' },
        { vehicleNo: 'JKL012', startDate: '2024-03-05', endDate: '2024-03-09', mileage: 280, reservationId: 'RES005' },
        { vehicleNo: 'MNO345', startDate: '2024-03-06', endDate: '2024-03-10', mileage: 320, reservationId: 'RES006' }
    ]

    function handlePrint() {
        window.print()
    }

    function downloadPDF() {
        const input = document.getElementById('feedback-report-container') // Ensure this targets the table specifically
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape'
            })
            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('feedback-report.pdf')
        })
    }

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                {/* Ensure the container ID is correct for the PDF capture */}
                <div id="feedback-report-container">
                    <VehicleUtilizationTable columns={vehicleUtilizationColumns} data={utilizationData} />
                </div>
                <div className="flex mt-4">
                    <button
                        onClick={handlePrint}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                    >
                        Print Report
                    </button>
                    <button
                        onClick={downloadPDF}
                        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700"
                    >
                        Download as PDF
                    </button>
                </div>
            </div>
        </>
    )
}
