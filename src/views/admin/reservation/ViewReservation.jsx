import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewReservation() {
    const data = [
        {
            id: '1001',
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '123-456-7890',
            pickUpDate: '2024-03-20',
            dropOffDate: '2024-03-25',
            status: 'Confirmed'
        },
        {
            id: '1002',
            name: 'Jane Smith',
            email: 'janesmith@example.com',
            phone: '098-765-4321',
            pickUpDate: '2024-04-10',
            dropOffDate: '2024-04-15',
            status: 'Pending'
        },
        {
            id: '1003',
            name: 'Michael Brown',
            email: 'michaelbrown@example.com',
            phone: '555-666-7777',
            pickUpDate: '2024-05-05',
            dropOffDate: '2024-05-10',
            status: 'Waiting'
        },
        {
            id: '1004',
            name: 'Emily Johnson',
            email: 'emilyjohnson@example.com',
            phone: '222-333-4444',
            pickUpDate: '2024-06-15',
            dropOffDate: '2024-06-20',
            status: 'Cancelled'
        },
        {
            id: '1005',
            name: 'David Wilson',
            email: 'davidwilson@example.com',
            phone: '777-888-9999',
            pickUpDate: '2024-07-25',
            dropOffDate: '2024-07-30',
            status: 'Ongoing'
        }
    ]

    const [Reservation, setReservation] = useState([])

    const fetchReservation = async () => {
        try {
            // Update the URL to your specific API endpoint for fetching vehicles
            const response = await axios.get('http://localhost:5062/api/AdminReservation/View-Reservations')
            setReservation(response.data) // Assume the response data is the array of vehicles
            console.log('Fetched Customer Reservations:', response.data)
        } catch (error) {
            console.error('Failed to fetch Customer Reservations:', error)
        }
    }

    useEffect(() => {
        fetchReservation()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Reservation} />
            </div>
        </>
    )
}
