import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewVehicle() {
    const data = [
        { id: '001', type: 'Car', depositAmount: '4000' },
        { id: '002', type: 'SUV', depositAmount: '7000' },
        { id: '003', type: 'Van', depositAmount: '6000' }
    ]
    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
