import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewUser() {
    const data = [
        {
            id: '001',
            name: 'Ranasinghe',
            email: 'abc@example.com',
            role: 'Admin',
            status: 'inactive'
        },
        {
            id: '002',
            name: 'Abeysinghe',
            email: 'abe@example.com',
            role: 'Staff',
            status: 'active'
        },
        {
            id: '003',
            name: 'Samarasinghe',
            email: 'sam@example.com',
            role: 'Admin',
            status: 'active'
        },
        {
            id: '004',
            name: 'Wijesundara',
            email: 'wije@example.com',
            role: 'Staff',
            status: 'inactive'
        },
        {
            id: '009',
            name: 'Fernando',
            email: 'ff@example.com',
            role: 'Admin',
            status: 'active'
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
