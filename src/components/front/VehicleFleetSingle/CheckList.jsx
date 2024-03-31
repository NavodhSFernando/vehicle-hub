import React from 'react'
import { Checkbox } from '../../ui/checkbox'

export default function CheckList() {
    const data = [
        {
            name: 'ABS',
            value: true
        },
        {
            name: 'Ac Front',
            value: true
        },
        {
            name: 'Security System',
            value: false
        },
        {
            name: 'Cruise Control',
            value: true
        },
        {
            name: 'Bluetooth',
            value: true
        },
        {
            name: 'Parking Sensors',
            value: true
        },
        {
            name: 'Airbag: Driver',
            value: true
        },
        {
            name: 'Airbag: Passenger',
            value: true
        },
        {
            name: 'Airbag: Side',
            value: true
        },
        {
            name: 'Fog Lights',
            value: false
        },
        {
            name: 'Navigation System',
            value: true
        },
        {
            name: 'Sunroof',
            value: false
        },
        {
            name: 'Tinted Glass',
            value: true
        },
        {
            name: 'Heated Seats',
            value: false
        },
        {
            name: 'Power Windows',
            value: true
        },
        {
            name: 'Rear Window Wiper',
            value: true
        },
        {
            name: 'Alloy Wheels',
            value: true
        },
        {
            name: 'Electric Mirrors',
            value: true
        },
        {
            name: 'Automatic Headlights',
            value: true
        },
        {
            name: 'Keyless Entry',
            value: true
        }
    ]
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        alignItems: 'center'
    }
    return (
        <div className="max-w-[500px_auto] h-[368px] w-full rounded-e-lg bg-white p-20 flex flex-col ml-6 mt-0 ">
            <div style={gridStyle}>
                {data.map((item, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                        <Checkbox checked={item.value} id={item.name} className="rounded" />
                        <label
                            htmlFor={item.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {item.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
