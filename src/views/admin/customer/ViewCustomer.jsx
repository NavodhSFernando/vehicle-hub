import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

import { Button } from '../../../components/ui/button'

export default function ViewCustomer() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get('http://localhost:5062/api/Customer')
                setCustomers(response.data)
            } catch (error) {
                console.error('Failed to fetch Customers:', error)
            }
        }
        fetchCustomer()
    }, [])

    /*const handleDeleteCustomer = async () => {
        try {
            const url = `http://localhost:5062/api/CustomerAuth/deactivate/${selectedCustomerId}`
            await axios.put(url)
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== selectedCustomerId))
           
        } catch (error) {
            console.error('Failed to delete the customer', error)
        }
    }*/

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={customers} />
            </div>
        </>
    )
}
