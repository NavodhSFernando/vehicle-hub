import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewEmployee() {
    const [Employee, setEmployee] = useState([])

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching Employees
                const response = await axios.get('http://localhost:5062/api/Employee')
                setEmployee(response.data) // Assume the response data is the array of Employees
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch Employees:', error)
            }
        }
        fetchEmployee()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={Employee} />
            </div>
        </>
    )
}
