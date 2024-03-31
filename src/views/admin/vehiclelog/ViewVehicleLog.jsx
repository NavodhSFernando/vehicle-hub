import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewUser() {
    const data = [
        {
            id: '001',
            reservationId: '001',
            endmilage: '4560km',
            vehicleStatus: 'Active'
        },
        {
            id: '002',
            reservationId: '002',
            endmilage: '25000km',
            vehicleStatus: 'Inactive'
        },
        {
            id: '003',
            reservationId: '003',
            endmilage: '23200km',
            vehicleStatus: 'Active'
        },
        {
            id: '004',
            reservationId: '004',
            endmilage: '2400km',
            vehicleStatus: 'Active'
        },
        {
            id: '005',
            reservationId: '005',
            endmilage: '12000km',
            vehicleStatus: 'Active'
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
