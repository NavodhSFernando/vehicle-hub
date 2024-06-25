import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import apiclient from '../../../axiosConfig'

export default function ViewVehicleType() {
    const [vehicleTypes, setVehicleTypes] = useState([])

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await apiclient.get('/VehicleType')
                setVehicleTypes(response.data) // Assume the response data is the array of vehicles
            } catch (error) {
                console.error('Failed to fetch vehicle Types:', error)
            }
        }
        fetchVehicleTypes()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={vehicleTypes} />
            </div>
        </>
    )
}
