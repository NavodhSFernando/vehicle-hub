import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ViewRentalHistory() {
    const data = [
        {
            id: '1001',
            modelName: 'Toyota Aqua',
            pickUpDate: '2024-03-20',
            dropOffDate: '2024-03-25',
            status: 'completed'
        },
        {
            id: '1002',
            modelName: 'Toyota Prius',
            pickUpDate: '2024-04-10',
            dropOffDate: '2024-04-15',
            status: 'completed'
        },
        {
            id: '1003',
            modelName: 'Toyota Axio',
            pickUpDate: '2024-05-05',
            dropOffDate: '2024-05-10',
            status: 'cancelled'
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
            status: 'completed'
        }
    ]

    const customerId = useOutletContext()
    console.log('customerId', customerId)

    const [Data, setData] = useState([])

    useEffect(() => {
        const fetchRentalHistory = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching rentals
                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/rental-history/${customerId}`
                )
                setData(response.data) // Assume the response data is the array of rentals
                console.log('Fetched Ongoing Rentals:', response.data)
            } catch (error) {
                console.error('Failed to fetch Ongoing Rentals:', error)
            }
        }
        fetchRentalHistory()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Data} />
            </div>
        </>
    )
}
