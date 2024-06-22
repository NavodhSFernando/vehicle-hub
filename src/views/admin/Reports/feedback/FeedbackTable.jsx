import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoImage from '../../../../assets/logos/Blue-type.png' // Replace with the actual path to your logo

const FeedbackReport = () => {
    const [feedbackData, setFeedbackData] = useState([])
    const [filteredFeedbackData, setFilteredFeedbackData] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [vehicleFilter, setVehicleFilter] = useState('')
    const [customerFilter, setCustomerFilter] = useState('')
    const [ratingFilter, setRatingFilter] = useState('')
    const [filterError, setFilterError] = useState('')
    const [logoBase64, setLogoBase64] = useState('')
    const [pdfUrl, setPdfUrl] = useState('') // State for PDF URL
    const [showPreview, setShowPreview] = useState(false) // State to control modal
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state

    useEffect(() => {
        fetchFeedbackData()
        loadLogoImage()
    }, [])

    const fetchFeedbackData = async () => {
        setLoading(true) // Start loading

        try {
            const response = await fetch('http://localhost:5062/api/FeedbackReport')
            if (!response.ok) {
                throw new Error('Failed to fetch feedback data')
            }
            const data = await response.json()

            const formattedData = data.map((item) => ({
                id: item.id,
                vehicleReview: item.vehicle_Review,
                serviceReview: item.service_Review,
                rating: item.rating,
                date: item.date,
                customer: item.customer,
                vehicle: item.vehicle
            }))

            setFeedbackData(formattedData)
            setFilteredFeedbackData(formattedData)
        } catch (error) {
            console.error('Error fetching feedback data:', error)
            setError(error) // Set error state if fetch fails
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const loadLogoImage = async () => {
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

    const handleFilter = () => {
        // Reset previous error
        setFilterError('')
    
        // Validate if both dates are provided
        if (startDate === '' && endDate === '') {
            setFilterError('Please select a start date or an end date.')
            return
        }
    
        // Validate if start date is later than end date
        if (startDate !== '' && endDate !== '' && new Date(startDate) > new Date(endDate)) {
            setFilterError('Invalid date range: Start date cannot be after end date.')
            return
        }
    
        let filteredData = feedbackData
    
        // Apply filters
        if (startDate !== '') {
            filteredData = filteredData.filter((feedback) => {
                const feedbackDate = new Date(feedback.date)
                return feedbackDate >= new Date(startDate)
            })
        }
    
        if (endDate !== '') {
            filteredData = filteredData.filter((feedback) => {
                const feedbackDate = new Date(feedback.date)
                return feedbackDate <= new Date(endDate)
            })
        }
    
        if (vehicleFilter !== '') {
            filteredData = filteredData.filter((feedback) =>
                feedback.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())
            )
        }
    
        if (customerFilter !== '') {
            filteredData = filteredData.filter((feedback) =>
                feedback.customer.toLowerCase().includes(customerFilter.toLowerCase())
            )
        }
    
        if (ratingFilter !== '') {
            filteredData = filteredData.filter((feedback) => feedback.rating === parseInt(ratingFilter))
        }
    
        setFilteredFeedbackData(filteredData)
    }
    
    const getTotalAmount = () => {
        return filteredFeedbackData.reduce((total, feedback) => total + feedback.rating, 0)
    }
    const generatePdf = () => {
        const doc = new jsPDF()

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

        // Title - Changed to "Revenue Report"
        doc.setFontSize(18)
        doc.text('Revenue Report', 10, 50)

        // Filters section
        doc.setFontSize(12)
        let filtersY = 60 // Adjusted initial Y position for filters to avoid overlap with title
        doc.text('Applied Filters:', 10, filtersY)
        filtersY += 10

        if (startDate) {
            doc.text(`Start Date: ${startDate}`, 10, filtersY)
            filtersY += 10
        }
        if (endDate) {
            doc.text(`End Date: ${endDate}`, 10, filtersY)
            filtersY += 10
        }
        if (vehicleFilter) {
            doc.text(`Vehicle: ${vehicleFilter}`, 10, filtersY)
            filtersY += 10
        }
        if (customerFilter) {
            doc.text(`Customer: ${customerFilter}`, 10, filtersY)
            filtersY += 10
        }
        if (ratingFilter) {
            doc.text(`Rating: ${ratingFilter}`, 10, filtersY)
            filtersY += 10
        }

        // If no filters applied
        if (!startDate && !endDate && !vehicleFilter && !customerFilter && !ratingFilter) {
            doc.text('None', 10, filtersY)
            filtersY += 10
        }

        // Prepare table data for jspdf-autotable
        // Prepare table data for jspdf-autotable
        const tableData = filteredFeedbackData.map((feedback) => [
            feedback.id,
            feedback.vehicleReview,
            feedback.serviceReview,
            '*'.repeat(feedback.rating), // Use asterisks (*) instead of star emoji
            feedback.date,
            feedback.customer,
            feedback.vehicle
        ])

        // Set table headers
        const tableHeaders = [
            { header: 'Id', dataKey: 'id' },
            { header: 'Vehicle Review', dataKey: 'vehicleReview' },
            { header: 'Service Review', dataKey: 'serviceReview' },
            { header: 'Rating', dataKey: 'rating' },
            { header: 'Date', dataKey: 'date' },
            { header: 'Customer', dataKey: 'customer' },
            { header: 'Vehicle', dataKey: 'vehicle' }
        ]

        // Add table to PDF
        autoTable(doc, {
            startY: filtersY + 10,
            head: [tableHeaders.map((header) => header.header)],
            body: tableData,
            didDrawCell: (data) => {
                // Customize styles as needed, e.g., data.cell.styles.fillColor = 'white';
            }
        })

        return doc
    }

    const handleExportPDF = () => {
        const doc = generatePdf()

        // Save the PDF
        doc.save('feedback_report.pdf')
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
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="container mx-auto mb-8 py-8 px-4 bg-white border-2 border-gray-300 rounded-md">
            {/* Filter section */}
            <div className="flex flex-wrap justify-between mb-4">
                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
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

                <div className="mb-4" style={{ width: '45%' }}>
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
            </div>

            <div className="flex flex-wrap justify-between mb-4">
                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">
                        Rating:
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="5"
                        className="w-full px-4 py-2 border rounded-md"
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                    />
                </div>

                <div className="mb-4" style={{ width: '45%' }}>
                    <label htmlFor="customer" className="block text-gray-700 font-bold mb-2">
                        Customer:
                    </label>
                    <input
                        type="text"
                        id="customer"
                        name="customer"
                        className="w-full px-4 py-2 border rounded-md"
                        value={customerFilter}
                        onChange={(e) => setCustomerFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter button */}
            <div className="mt-4 mb-8">
                {filterError && <p className="text-red-500 text-sm">{filterError}</p>}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleFilter}
                >
                    Filter
                </button>
            </div>

            {/* Feedback data table */}
            <div className="mb-4">
                <table className="w-full border-collapse border rounded-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Id</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Vehicle Review</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Service Review</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Rating</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Date</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Customer</th>
                            <th className="px-4 py-2 border-b border-gray-300 text-start">Vehicle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbackData.map((feedback) => (
                            <tr key={feedback.id}>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.id}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.vehicleReview}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.serviceReview}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{'⭐'.repeat(feedback.rating)}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.date}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.customer}</td>
                                <td className="px-4 py-2 border-b border-gray-300">{feedback.vehicle}</td>
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

            {/* PDF Preview Modal */}
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
                        <object data={pdfUrl} type="application/pdf" className="w-full h-full" aria-label="PDF Preview">
                            <iframe src={pdfUrl} title="PDF Preview" className="w-full h-full border-none">
                                This browser does not support PDFs. Please download the PDF to view it.
                            </iframe>
                        </object>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FeedbackReport
