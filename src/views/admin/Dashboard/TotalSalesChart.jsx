import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TotalSalesChart() {
    //

    const [data1, setData1] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching data
                const response = await axios.get('http://localhost:5062/api/SalesChart')
                setData1(response.data) // Assume the response data is the array of data
            } catch (error) {
                console.error('Failed to fetch data:', error)
            }
        }
        fetchData()
    }, [])

    //

    return (
        <div className="h-[28rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Total Sales</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data1}
                        margin={{
                            top: 20,
                            right: 10,
                            left: -10,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSales" fill="#3b82f6 " />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
