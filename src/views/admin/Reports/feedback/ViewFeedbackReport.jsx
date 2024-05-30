import React, { useEffect, useState } from 'react'
import FeedbackTable from './FeedbackTable'
import { feedbackColumns } from './FeedbackColumns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'

export default function ViewFeedbackReport() {
    

    // 

    const [feedbackData1, setFeedbackData1] = useState([]);

    useEffect(() => {
        const fetchfeedbackData = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching FeedBackReport
                const response = await axios.get('http://localhost:5062/api/FeedBackReport')
                setFeedbackData1(response.data) // Assume the response data is the array of FeedBackReport
            } catch (error) {
                console.error('Failed to fetch vehicles:', error)
            }
        }
        fetchfeedbackData()
    }, [])

    // 

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
                    <FeedbackTable columns={feedbackColumns} data={feedbackData1} />
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