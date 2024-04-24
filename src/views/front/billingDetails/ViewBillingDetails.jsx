import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'
//malith123
export default function ViewBillingDetails() {
    const data = [
        {
            date: '2024-03-20',
            amount: 100,
            invoice: 'INV001',
            status: 'paid'
        },
        {
            date: '2024-04-10',
            amount: 200,
            invoice: 'INV002',
            status: 'due'
        },
        {
            date: '2024-05-05',
            amount: 150,
            invoice: 'INV003',
            status: 'paid'
        },
        {
            date: '2024-05-05',
            amount: 150,
            invoice: 'INV004',
            status: 'due'
        },
        {
            date: '2024-05-05',
            amount: 150,
            invoice: 'INV005',
            status: 'paid'
        },
        {
            date: '2024-05-05',
            amount: 150,
            invoice: 'INV006',
            status: 'not paid'
        },
        // Add more data objects as needed
    ]

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
