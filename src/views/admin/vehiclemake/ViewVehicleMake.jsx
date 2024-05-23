import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewVehicleMake() {
    const [vehicleMakes, setVehicleMakes] = useState([])

    useEffect(() => {
        const fetchVehicleMakes = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await axios.get('http://localhost:5062/api/VehicleMake')
                setVehicleMakes(response.data) // Assume the response data is the array of vehicles
            } catch (error) {
                console.error('Failed to fetch vehicle makes:', error)
            }
        }
        fetchVehicleMakes()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={vehicleMakes} />
            </div>
        </>
    )
}
