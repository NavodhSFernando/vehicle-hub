import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

function DashboardStatsGrid() {
    //

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching data
                const response = await axios.get('http://localhost:5062/api/DashboardStatus')
                setData(response.data) // Assume the response data is the array of data
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }
        fetchData()
    }, [])

    //

    return (
        <div className="flex gap-4 w-full">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Completed Reservations</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{data.salesTot}</strong>
                        {/* <span className="text-sm text-green-500 pl-2">+{data.salesLastMonth}</span> */}
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Feedbacks</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{data.feedbackTot}</strong>
                        {/* <span className="text-sm text-green-500 pl-2">+{data.feedbackLastMonth}</span> */}
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Customers</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{data.customerTot}</strong>
                        {/* <span className="text-sm text-green-500 pl-2">+45</span> */}
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                    <IoCart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Reservations</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{data.reservationsTot}</strong>
                        {/* <span className="text-sm text-green-500 pl-2">+{data.reservationsLastMonth}</span> */}
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}

export default DashboardStatsGrid
