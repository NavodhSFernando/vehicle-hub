import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewCustomer() {
    const [Customer, setCustomer] = useState([])

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching Customers
                const response = await axios.get('http://localhost:5062/api/Customer')
                setCustomer(response.data) // Assume the response data is the array of Employees
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch Customers:', error)
            }
        }
        fetchCustomer()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Customer} />
            </div>
        </>
    )
}
