import React from 'react'
import RevenueTable from './RevenueTable'
import { revenueColumns } from './RevenueColumns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ViewRevenueReport() {
    const revenueData = [
        { id: 1, type: 'Balance Payment', amount: 1000, date: '2024-03-18' },
        { id: 2, type: 'Deposit Payment', amount: 1500, date: '2024-03-19' },
        { id: 3, type: 'Balance Payment', amount: 800, date: '2024-03-20' },
        { id: 4, type: 'Deposit Payment', amount: 2000, date: '2024-03-21' },
        { id: 5, type: 'Balance Payment', amount: 1200, date: '2024-03-22' },
        { id: 6, type: 'Deposit Payment', amount: 1700, date: '2024-03-23' },
        // Add more data as needed
    ];

    function handlePrint() {
        window.print()
    }

    function downloadPDF() {
        const input = document.getElementById('reveune-report-container') // Ensure this targets the table specifically
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'landscape'
            })
            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
            pdf.save('reveune-report.pdf')
        })
    }

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                {/* Ensure the container ID is correct for the PDF capture */}
                <div id="reveune-report-container">
                    <RevenueTable columns={revenueColumns} data={revenueData} />
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