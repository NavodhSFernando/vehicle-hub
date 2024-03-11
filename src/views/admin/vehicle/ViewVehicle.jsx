import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewVehicle() {
    const data = [
        {
            id: '001',
            status: 'Active',
            registrationNumber: 'ABC123',
            chassisNumber: 'CHS123456789',
            costPerDay: 5000,
            color: 'Red',
            transmission: 'Auto',
            mileage: '50000',
            actions: 'actions'
        },
        {
            id: '002',
            status: 'Inactive',
            registrationNumber: 'XYZ789',
            chassisNumber: 'CHS987654321',
            costPerDay: 8000,
            color: 'Blue',
            transmission: 'Auto',
            mileage: '30000',
            actions: 'actions'
        },
        {
            id: '003',
            amount: 20000,
            status: 'Active',
            registrationNumber: 'DEF456',
            chassisNumber: 'CHS123123123',
            costPerDay: 4000,
            color: 'Black',
            transmission: 'Auto',
            mileage: '40000',
            actions: 'actions'
        },
        {
            id: '004',
            status: 'Active',
            registrationNumber: 'GHI789',
            chassisNumber: 'CHS321321321',
            costPerDay: 7000,
            color: 'White',
            transmission: 'Auto',
            mileage: '20000',
            actions: 'actions'
        },
        {
            id: '005',
            status: 'Inactive',
            registrationNumber: 'JKL012',
            chassisNumber: 'CHS456456456',
            costPerDay: 3000,
            color: 'Grey',
            transmission: 'Manual',
            mileage: '10000',
            actions: 'actions'
        }
    ]
    return (
        <div className="flex flex-col p-6 bg-white rounded-lg">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
