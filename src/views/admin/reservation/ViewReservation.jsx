import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewReservation() {
    const data = [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'mobley@example.com'
        },
        {
            id: '1a2b3c4d',
            amount: 200,
            status: 'waiting',
            email: 'norman@example.com'
        },
        {
            id: '5e6f7g8h',
            amount: 300,
            status: 'cancelled',
            email: 'obbey@example.com'
        },
        {
            id: '9i0j1k2l',
            amount: 400,
            status: 'pending',
            email: 'peter@example.com'
        },
        {
            id: '3m4n5o6p',
            amount: 500,
            status: 'confirmed',
            email: 'jeff@example.com'
        },
        {
            id: '7q8r9s0t',
            amount: 600,
            status: 'cancelled',
            email: 'rob@example.com'
        },
        {
            id: '1u2v3w4x',
            amount: 700,
            status: 'pending',
            email: 'sally@example.com'
        },
        {
            id: '5y6z7a8b',
            amount: 800,
            status: 'confirmed',
            email: 'tara@example.com'
        },
        {
            id: '9c0d1e2f',
            amount: 900,
            status: 'cancelled',
            email: 'sage@example.com'
        },
        {
            id: '3g4h5i6j',
            amount: 1000,
            status: 'pending',
            email: 'victor@example.com'
        }
    ]

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
