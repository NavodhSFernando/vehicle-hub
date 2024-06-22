import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoImage from '../../../../assets/logos/Blue-type.png'; // Replace with the actual path to your logo

const VehicleUtilizationReport = () => {
    const [reservationData, setReservationData] = useState([])
    const [filteredReservationData, setFilteredReservationData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [vehicleNo, setVehicleNo] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filterError, setFilterError] = useState('')
    const [logoBase64, setLogoBase64] = useState('')
    const [pdfUrl, setPdfUrl] = useState('') // State for PDF URL
    const [showPreview, setShowPreview] = useState(false) // State to control modal

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5062/api/VehicleUtilizationReport', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setReservationData(data)
                setFilteredReservationData(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()

        // Load the logo image
        const loadImage = async () => {
            try {
                const response = await fetch(logoImage)
                const blob = await response.blob()
                const reader = new FileReader()
                reader.onloadend = () => {
                    setLogoBase64(reader.result)
                }
                reader.readAsDataURL(blob)
            } catch (error) {
                console.error('Error loading logo:', error)
            }
        }

        loadImage()
    }, [])

    const handleFilter = () => {
        setFilterError('')
    
        if (!startDate && !endDate) {
            setFilterError('Please select a start date or an end date')
            return
        }

        if (startDate !== '' && endDate !== '' && new Date(startDate) > new Date(endDate)) {
            setFilterError('Invalid date range: Start date cannot be after end date.')
            return
        }

    
        let filteredData = reservationData
    
        // Apply date range filtering
        if (startDate && endDate) {
            filteredData = filteredData.filter(
                (reservation) => reservation.startDate >= startDate && reservation.endDate <= endDate
            )
        } else if (startDate) {
            filteredData = filteredData.filter((reservation) => reservation.startDate >= startDate)
        } else if (endDate) {
            filteredData = filteredData.filter((reservation) => reservation.endDate <= endDate)
        }
    
        // Apply vehicle number filtering
        if (vehicleNo) {
            filteredData = filteredData.filter((reservation) =>
                reservation.vehicleNo.toLowerCase().includes(vehicleNo.toLowerCase())
            )
        }
    
        setFilteredReservationData(filteredData)
    }
    

    const generatePdf = () => {
        const doc = new jsPDF()
        let startY = 20 // Adjust starting Y to make room for the logo
    
        // Add logo to the top right corner
        if (logoBase64) {
            const logoWidth = 50 // Width of the logo in the PDF
            const logoHeight = 40 // Height of the logo in the PDF
            const pageWidth = doc.internal.pageSize.getWidth()
            const margin = 10
    
            // Adjust logo position
            const logoX = pageWidth - logoWidth - margin
            doc.addImage(logoBase64, 'PNG', logoX, margin, logoWidth, logoHeight)
        }
    
        // Header
        doc.setFontSize(18)
        doc.text('Vehicle Utilization Report', 10, startY + (logoBase64 ? 30 : 0)) // Adjust text position
    
        startY += (logoBase64 ? 50 : 30) // Add a small gap after the title (30 if no logo, 50 if logo is present)
    
        // Add date range
        doc.setFontSize(12)
        let dateRangeText = 'Date Range: '
        if (startDate) {
            dateRangeText += `From ${new Date(startDate).toLocaleDateString()} `
        }
        if (endDate) {
            dateRangeText += `to ${new Date(endDate).toLocaleDateString()}`
        }
        doc.text(dateRangeText, 10, startY)
        startY += 10 // Move down a bit after the date range
    
        // Add vehicle number filter
        if (vehicleNo) {
            doc.setFontSize(12)
            doc.text(`Vehicle No: ${vehicleNo}`, 10, startY)
            startY += 10 // Move down a bit after the vehicle number filter
        }
    
        // Table header
        const headers = ['Vehicle No', 'Start Date', 'End Date', 'Mileage', 'Reservation ID']
        const data = filteredReservationData.map((reservation) => [
            reservation.vehicleNo,
            new Date(reservation.startDate).toLocaleDateString(),
            new Date(reservation.endDate).toLocaleDateString(),
            reservation.mileage,
            reservation.reservationId,
        ])
    
        // Table
        autoTable(doc, {
            startY,
            head: [headers],
            body: data,
        })
    
        return doc
    }
    

    const handleExportPDF = () => {
        const doc = generatePdf()

        // Save the PDF
        doc.save('VehicleUtilizationReport.pdf')
    }

    const handlePreviewPDF = () => {
        const doc = generatePdf()

        // Generate a Blob URL for preview
        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)
        setPdfUrl(pdfUrl)
        setShowPreview(true)
    }

    const handlePrintPDF = () => {
        const doc = generatePdf()

        // Create a Blob URL for printing
        const pdfBlob = doc.output('blob')
        const pdfUrl = URL.createObjectURL(pdfBlob)

        // Create a hidden iframe and load the PDF URL
        const iframe = document.createElement('iframe')
        iframe.style.position = 'fixed'
        iframe.style.top = '0'
        iframe.style.left = '0'
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        iframe.style.border = 'none'
        iframe.style.visibility = 'hidden'
        document.body.appendChild(iframe)

        iframe.onload = () => {
            iframe.contentWindow.focus()
            iframe.contentWindow.print()
            document.body.removeChild(iframe)
        }

        iframe.src = pdfUrl
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div id="vehicle-utilization-report-container" className="container mx-auto py-8 mb-8 px-4 sm:px-6 lg:px-8 bg-white border border-gray-300 rounded-lg shadow-md">
            <div className="flex flex-wrap justify-between mb-4">

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Start Date:</label>
                    <input
                        type="date"
                        id="start-date-input"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">End Date:</label>
                    <input
                        type="date"
                        id="end-date-input"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="vehicleNo" className="block text-gray-700 font-bold mb-2">Vehicle No:</label>
                    <input
                        type="text"
                        id="vehicle-no-input"
                        placeholder="Enter Vehicle No"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                    />
                </div>

            </div>

            {filterError && (
                <div className="mb-4 text-red-500">
                    {filterError}
                </div>
            )}

            <div className="mb-6">
                <button
                    id="filter-button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>

            <div id="vehicle-utilization-table-container" className="mb-6 overflow-auto">
                <h2 id="vehicle-utilization-breakdown-title" className="text-xl font-bold mb-4 text-center">Vehicle Utilization Breakdown</h2>
                <table id="vehicle-utilization-table" className="w-full border-collapse border border-gray-300 rounded-md shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Vehicle No</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Start Date</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">End Date</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Mileage</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Reservation ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservationData.map((reservation) => (
                            <tr key={reservation.reservationId}>
                                <td className="px-4 py-2 border-b border-gray-300">{reservation.vehicleNo}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{new Date(reservation.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{new Date(reservation.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{reservation.mileage}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{reservation.reservationId}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            <div className="flex">
                <button
                    id="preview-button"
                    className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handlePreviewPDF}
                >
                    Preview
                </button>
                <button
                    id="export-pdf-button"
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    onClick={handleExportPDF}
                >
                    Export PDF
                </button>
            </div>

            {showPreview && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50"
                    onClick={() => setShowPreview(false)}
                >
                    <div
                        className="relative w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-4 overflow-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                    >
                        <div className="flex justify-end">
                            <button
                                className="text-red-500 hover:text-red-700 font-bold"
                                onClick={() => setShowPreview(false)}
                            >
                                Close
                            </button>
                        </div>
                        <object
                            data={pdfUrl}
                            type="application/pdf"
                            className="w-full h-full"
                            aria-label="PDF Preview"
                        >
                            <iframe
                                src={pdfUrl}
                                title="PDF Preview"
                                className="w-full h-full border-none"
                            >
                                This browser does not support PDFs. Please download the PDF to view it.
                            </iframe>
                        </object>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VehicleUtilizationReport
