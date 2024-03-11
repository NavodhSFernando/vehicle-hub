import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewAvailability() {
    const data = [
        {
            id: '1001',
            rid: '001',
            status: 'available'
        },
        {
            id: '1002',
            rid: '002',
            status: 'not available'
        },
        {
            id: '1003',
            rid: '003',
            status: 'available'
        },
        {
            id: '1004',
            rid: '008',
            status: 'available'
        },
        {
            id: '1005',
            rid: '009',
            status: 'not available'
        },
        {
            id: '1006',
            rid: '011',
            status: 'available'
        },
        {
            id: '0010071',
            rid: '122',
            status: 'available'
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
