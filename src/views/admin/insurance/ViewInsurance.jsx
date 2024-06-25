import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataTable from './DataTable'
import { columns } from './Columns'
import apiclient from '../../../axiosConfig'

export default function ViewVehicleInsurance() {
    const [vehicleInsurances, setVehicleInsurances] = useState([])

    useEffect(() => {
        const fetchVehicleInsurances = async () => {
            try {
                // Update the URL to your specific API endpoint for fetching vehicles
                const response = await apiclient.get('/VehicleInsurance')
                setVehicleInsurances(response.data) // Assume the response data is the array of vehicles
            } catch (error) {
                console.error('Failed to fetch vehicle Insurances:', error)
            }
        }
        fetchVehicleInsurances()
    }, [])

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={vehicleInsurances} />
            </div>
        </>
    )
}
