import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewMaintenance() {
    const [maintenances, setMaintenances] = useState([])

    useEffect(() => {
        const fetchMaintenances = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await axios.get('http://localhost:5062/api/VehicleMaintenance')
                setMaintenances(response.data) // Assume the response data is the array of vehicles
            } catch (error) {
                console.error('Failed to fetch maintenances:', error)
            }
        }
        fetchMaintenances()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={maintenances} />
            </div>
        </>
    )
}
