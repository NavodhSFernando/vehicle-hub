import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewInsurance() {
    const data = [
        {
            no: '001',
            expiry: '2022/01/23',
            id: '111',
            status: 'yes'
        },
        {
            no: '002',
            expiry: '2022/07/03',
            id: '123',
            status: 'no'
        },
        {
            no: '003',
            expiry: '2022/09/09',
            id: '344',
            status: 'no'
        },
        {
            no: '004',
            expiry: '2022/02/01',
            id: '888',
            status: 'yes'
        },
        {
            no: '005',
            expiry: '2022/05/25',
            id: '777',
            status: 'yes'
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
