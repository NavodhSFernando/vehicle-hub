import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import apiclient from '../../../axiosConfig'

export default function ViewVehicleMode() {
    const [vehicleModels, setVehicleModels] = useState([])

    useEffect(() => {
        const fetchVehicleModels = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await apiclient.get('/AdminVehicle')
                setVehicleModels(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch vehicle models:', error)
            }
        }
        fetchVehicleModels()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={vehicleModels} />
            </div>
        </>
    )
}
