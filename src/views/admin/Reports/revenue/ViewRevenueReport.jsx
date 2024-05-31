import React, { useEffect, useState } from 'react'
import RevenueTable from './RevenueTable'
import { revenueColumns } from './RevenueColumns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'

export default function ViewRevenueReport() {


   

    const [ revenueData1, setrevenueData1] = useState([]);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching RevenueReport
                const response = await axios.get('http://localhost:5062/api/RevenueReport')
                setrevenueData1(response.data) // Assume the response data is the array of RevenueReport
            } catch (error) {
                console.error('Failed to fetch revenue:', error)
            }
        }
        fetchRevenueData()
    }, [])

    //

    function handlePrint() {
        window.print()
    }

    function downloadPDF() {
        const input = document.getElementById('reveune-report-table'); // Target only the table
        const title = document.getElementById('report-heading').innerText; // Get the report heading

        html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => { // Ensure capturing the entire table
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape'
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Add title to the PDF
            pdf.text(title, 10, 10);

            pdf.save('reveune-report.pdf');
        });
    }

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                {/* Ensure the container ID is correct for the PDF capture */}
                <div id="reveune-report-container">
                    <h2 id="report-heading">Revenue Report</h2> {/* Add the report heading */}
                    <div id="reveune-report-table">
                        <RevenueTable columns={revenueColumns} data={revenueData1} />
                    </div>
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
    );
}