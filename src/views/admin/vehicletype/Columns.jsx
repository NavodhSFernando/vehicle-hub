import React from 'react'
import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

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
        accessorKey: 'type',
        header: 'Type'
    },
    {
        accessorKey: 'depositAmount',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Deposit Amount</div>
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
            const depositAmount = parseFloat(row.getValue('depositAmount'))

            const formatted = new Intl.NumberFormat('lkr', {
                style: 'currency',
                currency: 'LKR'
            }).format(depositAmount)

            return <div className="font-normal">{formatted}</div>
        }
    }
]
