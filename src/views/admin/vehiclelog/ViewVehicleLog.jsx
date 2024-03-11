import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewUser() {
    const data = [
        {
            id: '001',
            endmilage: '25000km'
        },
        {
            id: '001',
            endmilage: '25000km'
        },
        {
            id: '001',
            endmilage: '25000km'
        },
        {
            id: '001',
            endmilage: '25000km'
        },
        {
            id: '001',
            endmilage: '25000km'
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
