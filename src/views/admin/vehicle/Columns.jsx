import React from 'react'
import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/vehicle/edit/${vehicleId}`)}>
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
        accessorKey: 'registrationNumber',
        header: 'Registration Number'
    },
    {
        accessorKey: 'chassisNumber',
        header: 'Chassis Number'
    },
    {
        accessorKey: 'costPerDay',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Cost Per Day</div>
                    <Button
                        variant="ghost"
                        className="p-0 flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        <FaUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const costPerDay = parseFloat(row.getValue('costPerDay'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('lkr', {
                style: 'currency',
                currency: 'LKR'
            }).format(costPerDay)

            return <div className="font-normal">{formatted}</div>
        }
    },
    {
        accessorKey: 'color',
        header: 'Color'
    },
    {
        accessorKey: 'transmission',
        header: 'Transmission'
    },
    {
        accessorKey: 'mileage',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Mileage</div>
                </div>
            )
        },
        cell: ({ row }) => {
            const mileage = row.getValue('mileage')
            const formattedMileage = `${mileage} KM`

            return <div className="font-normal">{formattedMileage}</div>
        }
    },
    {
        accessorKey: 'vehicleTypeId',
        header: 'Vehicle Type ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('vehicleTypeId'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'vehicleModelId',
        header: 'Vehicle Model ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('vehicleModelId'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'employeeId',
        header: 'Employee ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('employeeId'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleId={row.getValue('id')} />
    }
]
