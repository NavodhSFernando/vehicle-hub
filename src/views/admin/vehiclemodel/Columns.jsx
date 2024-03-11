import React from 'react'

export const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'model',
        header: 'Model'
    },
    {
        accessorKey: 'year',
        header: 'Year'
    },
    {
        accessorKey: 'engineCapacity',
        header: 'Engine Capacity',
        cell: ({ row }) => {
            const engineCapacity = row.getValue('engineCapacity')
            const formattedEngineCapacity = `${engineCapacity}cc`

            return <div className="font-normal">{formattedEngineCapacity}</div>
        }
    },
    {
        accessorKey: 'seatingCapacity',
        header: 'Seating Capacity'
    },
    {
        accessorKey: 'fuelType',
        header: 'Fuel Type'
    }
]
