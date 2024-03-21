import React from 'react'
import FeedbackTable from './FeedbackTable'
import { feedbackColumns } from './FeedbackColumns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ViewFeedbackReport() {
    const feedbackData = [
        {
            id: 1,
            content: 'Great service!',
            rating: 3.5,
            date: '2024-03-20',
            customer: 'John Doe',
            vehicle: 'Car'
        },
        {
            id: 2,
            content: 'The wait time was longer than expected.',
            rating: 2,
            date: '2024-03-18',
            customer: 'Jane Smith',
            vehicle: 'Car'
        },
        {
            id: 3,
            content: 'Friendly staff and clean facilities.',
            rating: 4.5,
            date: '2024-03-15',
            customer: 'Michael Brown',
            vehicle: 'Motorcycle'
        },
        {
            id: 4,
            content: 'Excellent work on the repair, but a bit pricey.',
            rating: 4,
            date: '2024-03-10',
            customer: 'Linda Garcia',
            vehicle: 'Truck'
        },
        {
            id: 5,
            content: 'Very satisfied with the service.',
            rating: 5,
            date: '2024-03-08',
            customer: 'Robert Johnson',
            vehicle: 'Convertible'
        }
        // Add more feedback items as needed
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
                    <FeedbackTable columns={feedbackColumns} data={feedbackData} />
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
