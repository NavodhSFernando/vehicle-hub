import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useOutletContext } from 'react-router-dom'

export default function ViewOngoingRental() {
    const customerId = useOutletContext()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDecryptedIdAndRentals = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
                const decryptedId = decryptResponse.data.decryptedUserId

                const rentalsResponse = await axios.get(
                    `http://localhost:5062/api/FrontReservationService/ongoing-rentals/${decryptedId}`
                )
                setData(rentalsResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        if (customerId) {
            fetchDecryptedIdAndRentals()
        }
    }, [customerId])

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
