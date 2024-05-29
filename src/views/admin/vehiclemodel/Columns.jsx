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
            <Button
                variant="ghost"
                className="p-0"
                onClick={() => navigate(`/admin/vehiclemodel/delete/${vehicleModelId}`)}
            >
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
            const ID = row.original.additionalFeatures.id
            const value = parseFloat(ID)
            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const name = row.original.vehicleModel.name
            return <div className="font-medium">{name}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            return row.original.vehicleModel.name.toLowerCase().includes(filterValue.toLowerCase())
        }
    },
    {
        accessorKey: 'year',
        header: 'Year',
        cell: ({ row }) => {
            const year = row.original.vehicleModel.year
            const value = parseFloat(year)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'engineCapacity',
        header: 'Engine Capacity',
        cell: ({ row }) => {
            const engineCapacity = row.original.vehicleModel.engineCapacity
            const value = parseFloat(engineCapacity)
            const formattedEngineCapacity = `${value}cc`

            return <div className="font-normal">{formattedEngineCapacity}</div>
        }
    },
    {
        accessorKey: 'seatingCapacity',
        header: 'Seating Capacity',
        cell: ({ row }) => {
            const seatingCapacity = row.original.vehicleModel.seatingCapacity
            const value = parseFloat(seatingCapacity)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'fuel',
        header: 'Fuel Type',
        cell: ({ row }) => {
            const fuel = row.original.vehicleModel.fuel
            return <div className="font-normal">{fuel}</div>
        }
    },
    {
        accessorKey: 'vehicleMakeId',
        header: 'Vehicle Make',
        cell: ({ row }) => {
            const vehicleMakeId = row.original.vehicleModel.vehicleMakeId
            const value = parseFloat(vehicleMakeId)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => {
            const Id = row.original.vehicleModel.id
            const value = parseFloat(Id)
            return <ActionButtons vehicleModelId={value} />
        }
    }
]
