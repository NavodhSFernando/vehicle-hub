import React, { useState, useEffect } from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

export default function ViewBillingDetails() {
    const customerId = useOutletContext()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDecryptedIdAndBillingDetails = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
                const decryptedId = decryptResponse.data.decryptedUserId

                const billingDetailsResponse = await axios.get(
                    `http://localhost:5062/BillingDetails/ByCustomer/${decryptedId}`
                )
                setData(billingDetailsResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        if (customerId) {
            fetchDecryptedIdAndBillingDetails()
        }
    }, [customerId])

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
