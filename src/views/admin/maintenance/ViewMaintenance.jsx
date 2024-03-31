import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewMaintenance() {
    const data = [
        {
            id: '001',
            lastDate: '2022/06/07',
            vehicleId: '110',
            typeId: '01'
        },
        {
            id: '002',
            lastDate: '2022/06/02',
            vehicleId: '123',
            typeId: '02'
        },
        {
            id: '003',
            lastDate: '2022/06/01',
            vehicleId: '233',
            typeId: '03'
        },
        {
            id: '004',
            lastDate: '2022/09/07',
            vehicleId: '100',
            typeId: '01'
        },
        {
            id: '005',
            lastDate: '2022/01/23',
            vehicleId: '567',
            typeId: '01'
        },
        {
            id: '006',
            lastDate: '2022/07/07',
            vehicleId: '111',
            typeId: '02'
        },
        {
            id: '007',
            lastDate: '2022/07/03',
            vehicleId: '222',
            typeId: '03'
        },
        {
            id: '008',
            lastDate: '2022/06/09',
            vehicleId: '333',
            typeId: '02'
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
