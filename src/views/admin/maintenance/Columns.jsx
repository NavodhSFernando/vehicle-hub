import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { FaUpDown } from 'react-icons/fa6'

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
        accessorKey: 'currentMileage',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Current Mileage</div>
                    <Button
                        variant="ghost"
                        className="p-0 flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        <FaUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        }
    },
    {
        accessorKey: 'registrationNumber',
        header: 'Registration Number'
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
