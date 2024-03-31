import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    {
        name: 'Jan',
        Customers: 4000,
        Feedbacks: 2400
    },
    {
        name: 'Feb',
        Customers: 3000,
        Feedbacks: 1398
    },
    {
        name: 'Mar',
        Customers: 2000,
        Feedbacks: 9800
    },
    {
        name: 'Apr',
        Customers: 2780,
        Feedbacks: 3908
    },
    {
        name: 'May',
        Customers: 1890,
        Feedbacks: 4800
    },
    {
        name: 'Jun',
        Customers: 2390,
        Feedbacks: 3800
    },
    {
        name: 'July',
        Customers: 3490,
        Feedbacks: 4300
    },
    {
        name: 'Aug',
        Customers: 2000,
        Feedbacks: 9800
    },
    {
        name: 'Sep',
        Customers: 2780,
        Feedbacks: 3908
    },
    {
        name: 'Oct',
        Customers: 1890,
        Feedbacks: 4800
    },
    {
        name: 'Nov',
        Customers: 2390,
        Feedbacks: 3800
    },
    {
        name: 'Dec',
        Customers: 3490,
        Feedbacks: 4300
    }
]

export default function CustomerFeedbackChart() {
    return (
        <div className="h-[28rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
            <strong className="text-gray-700 font-medium">Customers Vs Feedbacks</strong>
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
                        <Bar dataKey="Customers" fill="#0ea5e9" />
                        <Bar dataKey="Feedbacks" fill="#ea580c" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}