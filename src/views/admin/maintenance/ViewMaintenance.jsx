import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewMaintenance() {
    const data = [
        {
            id: '001',
            maintenanceDate: '2022/06/07',
            vehicleId: '110',
            type: 'Oil and Fluid Changes',
            description:
                'Replace old engine oil with fresh oil to lubricate engine parts, reduce friction, and prevent overheating.'
        },
        {
            id: '002',
            maintenanceDate: '2022/06/02',
            vehicleId: '123',
            type: 'Tire Care',
            description:
                'Check and adjust tire pressures, rotate tires to ensure even wear, and align wheels to improve handling and extend tire life'
        },
        {
            id: '003',
            maintenanceDate: '2022/06/01',
            vehicleId: '233',
            type: 'Brake Checks',
            description:
                'Inspect and replace brake pads and rotors as needed to maintain effective stopping power and ensure vehicle safety.'
        },
        {
            id: '004',
            maintenanceDate: '2022/09/07',
            vehicleId: '100',
            type: 'Battery Maintenance',
            description:
                'Replace old engine oil with fresh oil to lubricate engine parts, reduce friction, and prevent overheating.'
        },
        {
            id: '005',
            maintenanceDate: '2022/01/23',
            vehicleId: '567',
            type: 'Air Conditioning Checks',
            description:
                'Test battery charge and inspect connections for corrosion to ensure reliable starting and electrical system performance.'
        },
        {
            id: '006',
            maintenanceDate: '2022/07/07',
            vehicleId: '111',
            type: 'Oil and Fluid Changes',
            description:
                'Replace old engine oil with fresh oil to lubricate engine parts, reduce friction, and prevent overheating.'
        },
        {
            id: '007',
            maintenanceDate: '2022/07/03',
            vehicleId: '222',
            type: 'Brake Checks',
            description:
                'Inspect and replace brake pads and rotors as needed to maintain effective stopping power and ensure vehicle safety.'
        },
        {
            id: '008',
            maintenanceDate: '2022/06/09',
            vehicleId: '333',
            type: 'Tire Care',
            description:
                'Check and adjust tire pressures, rotate tires to ensure even wear, and align wheels to improve handling and extend tire life'
        }
    ]

    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
