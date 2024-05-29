import React from 'react'

export default function CheckList() {
    const data = [
        { name: 'ABS', value: true },
        { name: 'Ac Front', value: true },
        { name: 'Security System', value: false },
        { name: 'Bluetooth', value: true },
        { name: 'Parking Sensors', value: true },
        { name: 'Airbag: Driver', value: true },
        { name: 'Airbag: Passenger', value: true },
        { name: 'Airbag: Side', value: true },
        { name: 'Fog Lights', value: false },
        { name: 'Navigation System', value: true },
        { name: 'Sunroof', value: false },
        { name: 'Tinted Glass', value: true },
        { name: 'Power Windows', value: true },
        { name: 'Rear Window Wiper', value: true },
        { name: 'Alloy Wheels', value: true },
        { name: 'Electric Mirrors', value: true },
        { name: 'Automatic Headlights', value: true },
        { name: 'Keyless Entry', value: true }
    ]

    // Styles for the list
    const listStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        alignItems: 'center',
        listStyleType: 'none'
    }

    return (
        <div className="w-[584px] h-[384px] rounded-b-lg bg-white p-20 flex flex-col mb-5">
            <ul style={listStyle}>
                {data
                    //displaying only true values
                    .filter((item) => item.value)
                    .map((item, index) => (
                        <li className="text-sm font-medium leading-none" key={index}>
                            {item.name}
                        </li>
                    ))}
            </ul>
        </div>
    )
}
