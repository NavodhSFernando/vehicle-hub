import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewVehicle() {
    const data = [
        { id: '001', name: 'Toyota' },
        { id: '002', name: 'Ford' },
        { id: '003', name: 'Volkswagen' },
        { id: '004', name: 'Chevrolet' },
        { id: '005', name: 'Honda' },
        { id: '006', name: 'BMW' },
        { id: '007', name: 'Nissan' },
        { id: '008', name: 'Mercedes-Benz' },
        { id: '009', name: 'Audi' },
        { id: '010', name: 'Hyundai' }
    ]
    return (
        <>
            <div className="flex flex-col p-6 bg-white rounded-lg">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
