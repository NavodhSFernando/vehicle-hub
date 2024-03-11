import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewMaintenance() {
    const data = [
        {
            id: '001',
            typeName: 'Oil Change'
        },
        {
            id: '002',
            typeName: 'Checkup'
        },
        {
            id: '003',
            typeName: 'Tyre Rotation'
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
