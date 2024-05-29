import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useParams } from 'react-router-dom'

export default function ViewOngoingRental() {
    const customerId = useParams()

    const data = [
        {
            id: '1001',
            modelName: 'Toyota Aqua',
            pickUpDate: '2024-03-20',
            dropOffDate: '2024-03-25',
            status: 'confirmed'
        },
        {
            id: '1002',
            modelName: 'Toyota Prius',
            pickUpDate: '2024-04-10',
            dropOffDate: '2024-04-15',
            status: 'pending'
        },
        {
            id: '1003',
            modelName: 'Toyota Axio',
            pickUpDate: '2024-05-05',
            dropOffDate: '2024-05-10',
            status: 'waiting'
        },
        {
            id: '1004',
            modelName: 'Toyota Corolla',
            pickUpDate: '2024-06-15',
            dropOffDate: '2024-06-20',
            status: 'cancelled'
        },
        {
            id: '1005',
            modelName: 'Toyota Vitz',
            pickUpDate: '2024-07-25',
            dropOffDate: '2024-07-30',
            status: 'confirmed'
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
