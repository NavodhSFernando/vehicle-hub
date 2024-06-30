import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CheckList() {
    const { id } = useParams()
    const [items, setItems] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/FrontVehicleService/AdditionalFeatures/${id}`)
            const data = response.data
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
        } catch (error) {
            console.error('Failed to fetch vehicle data:', error)
        }
    }

    useEffect(() => {
        fetchData()

        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [id])

    const listStyle = {
        display: 'grid',
        gridTemplateColumns: screenWidth > 1024 ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
        gap: '12px',
        alignItems: 'center',
        listStyleType: 'none',
        padding: 0,
        margin: 0
    }

    const titleStyle = {
        gridColumn: '1 / -1'
    }

    return (
        <div className="w-full rounded-b-lg bg-white p-10 flex flex-col mb-5">
            <ul style={listStyle}>
                <p style={titleStyle} className="text-sm text-slate-500 uppercase ">
                    Features
                </p>
                {items
                    .filter((item) => item.value)
                    .map((item, index) => (
                        <li key={index} className="text-md leading-3 text-slate-500 pl-2">
                            {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
