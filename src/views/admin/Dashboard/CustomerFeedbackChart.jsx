import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    {
        name: 'Jan',
        TotalSales: 4000,
    },
    {
        name: 'Feb',
        TotalSales: 3000,
    },
    {
        name: 'Mar',
        TotalSales: 2000,
    },
    {
        name: 'Apr',
        TotalSales: 2780,
    },
    {
        name: 'May',
        TotalSales: 1890,
    },
    {
        name: 'Jun',
        TotalSales: 2390,
    },
    {
        name: 'July',
        TotalSales: 3490,
    },
    {
        name: 'Aug',
        TotalSales: 2000,
    },
    {
        name: 'Sep',
        TotalSales: 2780,
    },
    {
        name: 'Oct',
        TotalSales: 1890,
    },
    {
        name: 'Nov',
        TotalSales: 2390,
    },
    {
        name: 'Dec',
        TotalSales: 3490,
    }
]

export default function TotalSalesChart() {
    return (
        <div className="h-[28rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Total Sales</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
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
                        <Bar dataKey="TotalSales" fill="#0ea5e9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
