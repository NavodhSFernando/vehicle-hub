import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import apiclient from '../../../axiosConfig'

export default function ViewVehicle() {
    const [vehicle, setVehicle] = useState([])

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await apiclient.get('/Vehicle')
                setVehicle(response.data) // Assume the response data is the array of vehicles
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch vehicles:', error)
            }
        }
        fetchVehicle()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={vehicle} />
            </div>
        </>
    )
}
