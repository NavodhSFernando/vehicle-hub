import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useOutletContext } from 'react-router-dom'

export default function ViewOngoingRental() {
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

    const customerId = useOutletContext()
    console.log('customerId', customerId)

    const [Data, setData] = useState([])

    useEffect(() => {
        const fetchOngoingRentals = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching rentals
                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/ongoing-rentals/${customerId}`
                )
                setData(response.data) // Assume the response data is the array of rentals
                console.log('Fetched Ongoing Rentals:', response.data)
            } catch (error) {
                console.error('Failed to fetch Ongoing Rentals:', error)
            }
        }
        fetchOngoingRentals()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Data} />
            </div>
        </>
    )
}
