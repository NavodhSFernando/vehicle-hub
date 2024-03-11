import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewMaintenance() {
    const data = [
        {
            id: '001',
            lastdate: '2022/06/07',
            vehicleid: '110',
            type: 'oil change'
        },
        {
            id: '002',
            lastdate: '2022/06/02',
            vehicleid: '123',
            type: 'tyre rotation'
        },
        {
            id: '003',
            lastdate: '2022/06/01',
            vehicleid: '233',
            type: 'oil change'
        },
        {
            id: '004',
            lastdate: '2022/09/07',
            vehicleid: '100',
            type: 'oil change'
        },
        {
            id: '005',
            lastdate: '2022/01/23',
            vehicleid: '567',
            type: 'oil change'
        },
        {
            id: '006',
            lastdate: '2022/07/07',
            vehicleid: '111',
            type: 'oil change'
        },
        {
            id: '007',
            lastdate: '2022/07/03',
            vehicleid: '222',
            type: 'oil change'
        },
        {
            id: '008',
            lastdate: '2022/06/09',
            vehicleid: '333',
            type: 'oil change'
        },
        {
            id: '009',
            lastdate: '2022/06/10',
            vehicleid: '444',
            type: 'oil change'
        },
        {
            id: '010',
            lastdate: '2022/06/28',
            vehicleid: '555',
            type: 'oil change'
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
