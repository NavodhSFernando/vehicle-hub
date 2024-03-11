import React from 'react'
import DataTable from './DataTable'
import { columns } from './Columns'

export default function ViewVehicle() {
    const data = [
        { id: '001', model: 'Aqua', year: '2018', engineCapacity: '1500', seatingCapacity: '4', fuelType: 'Petrol' },
        { id: '002', model: 'Prius', year: '2017', engineCapacity: '1800', seatingCapacity: '4', fuelType: 'Petrol' },
        { id: '003', model: 'Lancer', year: '2016', engineCapacity: '2000', seatingCapacity: '4', fuelType: 'Diesel' },
        { id: '004', model: 'Civic', year: '2019', engineCapacity: '1600', seatingCapacity: '4', fuelType: 'Petrol' },
        { id: '005', model: 'Corolla', year: '2020', engineCapacity: '1800', seatingCapacity: '4', fuelType: 'Diesel' },
        {
            id: '006',
            model: 'Outlander',
            year: '2020',
            engineCapacity: '2400',
            seatingCapacity: '7',
            fuelType: 'Petrol'
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
