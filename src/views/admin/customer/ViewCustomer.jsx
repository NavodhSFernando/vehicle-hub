import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewCustomer() {
    const data = [
        {
            id: '001',
            name: 'Ranasinghe',
            address: 'kandy',
            dln: '28941',
            email: 'abc@example.com',
            status: 'inactive'
        },
        {
            id: '002',
            name: 'Samarasinghe',
            address: 'colombo',
            dln: '2840914',
            email: 'abc@example.com',
            status: 'active'
        },
        {
            id: '003',
            name: 'Wijesundara',
            address: 'kandy',
            dln: '38749315',
            email: 'abc@example.com',
            status: 'inactive'
        },
        {
            id: '004',
            name: 'Fernando',
            address: 'Moratuwa',
            dln: '812347918',
            email: 'abc@example.com',
            status: 'active'
        },
        {
            id: '005',
            name: 'Perera',
            address: 'Galle',
            dln: '8324719',
            email: 'abc@example.com',
            status: 'inactive'
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
