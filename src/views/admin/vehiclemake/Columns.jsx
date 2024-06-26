import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleMakeId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                className="p-0"
                onClick={() => navigate(`/admin/vehiclemake/edit/${vehicleMakeId}`)}
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
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'logo',
        header: 'Logo',
        cell: ({ row }) => {
            const value = row.getValue('logo')
            const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/logos/'

            return (
                <div className="flex items-center gap-2">
                    <img src={`${baseUrl}${value}`} alt="logo" className="w-10 h-10" />
                </div>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleMakeId={row.getValue('id')} />
    }
]
