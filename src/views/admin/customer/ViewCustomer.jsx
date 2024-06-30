import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'

import { columns as originalColumns } from './Columns'

import { Button } from '../../../components/ui/button'

export default function ViewCustomer() {
    const [customers, setCustomers] = useState([])
    const fetchCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:5062/api/Customer')
            setCustomers(response.data)
        } catch (error) {
            console.error('Failed to fetch Customers:', error)
        }
    }

    useEffect(() => {
        fetchCustomer()
    }, [])

    const columns = originalColumns.map((column) => {
        if (column.accessorKey === 'actions') {
            return {
                ...column,
                refetchCustomer: fetchCustomer
            }
        }
        return column
    })

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={customers} />
            </div>
        </>
    )
}
