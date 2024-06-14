import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CheckList() {
    const { id } = useParams()
    const [items, setItems] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/FrontVehicleService/AdditionalFeatures/${id}`)
            const data = response.data
            console.log('data', data)
            const items = [
                { name: 'ABS', value: data.abs },
                { name: 'AC Front', value: data.acFront },
                { name: 'Airbag Driver', value: data.airbagDriver },
                { name: 'Airbag Passenger', value: data.airbagPassenger },
                { name: 'Airbag Side', value: data.airbagSide },
                { name: 'Alloy Wheels', value: data.alloyWheels },
                { name: 'Automatic Headlights', value: data.automaticHeadlights },
                { name: 'Bluetooth', value: data.bluetooth },
                { name: 'Electric Mirrors', value: data.electricMirrors },
                { name: 'Fog Lights', value: data.fogLights },
                { name: 'Keyless Entry', value: data.keylessEntry },
                { name: 'Navigation System', value: data.navigationSystem },
                { name: 'Parking Sensor', value: data.parkingSensor },
                { name: 'Power Window', value: data.powerWindow },
                { name: 'Rear Window Wiper', value: data.rearWindowWiper },
                { name: 'Security System', value: data.securitySystem },
                { name: 'Sunroof', value: data.sunroof },
                { name: 'Tinted Glass', value: data.tintedGlass }
            ]
            setItems(items)
            console.log('Items', items)
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    // Styles for the list
    const listStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        alignItems: 'center',
        listStyleType: 'none'
    }

    return (
        <div className="w-full rounded-b-lg bg-white p-20 flex flex-col mb-5">
            <ul style={listStyle}>
                {items
                    .filter((item) => item.value)
                    .map((item, index) => (
                        <li key={index} className="text-sm text-slate-500 ">
                            {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
