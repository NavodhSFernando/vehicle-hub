import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ViewRentalHistory() {
    const customerId = useOutletContext()
    const [Data, setData] = useState([])

    useEffect(() => {
        const fetchDecryptedIdAndRentals = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
                const decryptedId = decryptResponse.data.decryptedUserId

                const response = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/rental-history/${decryptedId}`
                )
                setData(response.data)
            } catch (error) {
                console.error('Failed to fetch Ongoing Rentals:', error)
            }
        }
        if (customerId) {
            fetchDecryptedIdAndRentals()
        }
    }, [customerId])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Data} />
            </div>
        </>
    )
}
