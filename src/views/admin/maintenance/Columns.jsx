import React from 'react'
import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const ActionButtons = ({ maintenanceId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                className="p-0"
                onClick={() => navigate(`/admin/maintenance/edit/${maintenanceId}`)}
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
        accessorKey: 'date',
        header: 'Maintenance Date'
    },
    {
        accessorKey: 'vehicleId',
        header: 'Vehicle ID',
        cell: ({ row }) => {
            const vehicleId = row.original.vehicle.id
            const value = parseFloat(vehicleId)

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'type',
        header: 'Maintenance Type'
    },
    {
        accessorKey: 'description',
        header: 'Description'
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons maintenanceId={row.getValue('id')} />
    }
]
