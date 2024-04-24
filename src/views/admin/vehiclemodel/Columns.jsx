import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleModelId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                className="p-0"
                onClick={() => navigate(`/admin/vehiclemodel/edit/${vehicleModelId}`)}
            >
                <GrEdit fontSize={24} className="mr-1" />
            </Button>
            <Button variant="ghost" className="p-0">
                <GrTrash fontSize={24} className="mr-1" />
            </Button>
        </div>
    )
}

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
    },
    {
        accessorKey: 'vehicleMakeId',
        header: 'Vehicle Make'
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleModelId={row.getValue('id')} />
    }
]
