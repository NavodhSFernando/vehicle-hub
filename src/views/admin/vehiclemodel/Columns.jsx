import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
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
        </div>
    )
}

export const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const ID = row.original.id
            const value = parseFloat(ID)
            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const name = row.original.name
            return <div className="font-medium">{name}</div>
        }
    },
    {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => {
            const year = row.original.year
            const value = parseFloat(year)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'engineCapacity',
        header: 'Engine Capacity',
        cell: ({ row }) => {
            const engineCapacity = row.original.engineCapacity
            const value = parseFloat(engineCapacity)
            const formattedEngineCapacity = `${value}cc`

            return <div className="font-normal">{formattedEngineCapacity}</div>
        }
    },
    {
        accessorKey: 'seatingCapacity',
        header: 'Seating Capacity',
        cell: ({ row }) => {
            const seatingCapacity = row.original.seatingCapacity
            const value = parseFloat(seatingCapacity)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'fuel',
        header: 'Fuel Type',
        cell: ({ row }) => {
            const fuel = row.original.fuel
            return <div className="font-normal">{fuel}</div>
        }
    },
    {
        accessorKey: 'vehicleMakeId',
        header: 'Vehicle Make',
        cell: ({ row }) => {
            const vehicleMakeId = row.original.vehicleMake.name

            return <div className="font-medium">{vehicleMakeId}</div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => {
            const Id = row.original.id
            const value = parseFloat(Id)
            return <ActionButtons vehicleModelId={value} />
        }
    }
]
