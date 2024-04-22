import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { format, parseISO } from 'date-fns'

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
        accessorKey: 'insuranceNo',
        header: 'InsuranceNo'
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: ({ row }) => {
            const value = row.getValue('expiryDate')
            const formattedDate = value ? format(parseISO(value), 'yyyy-MM-dd') : ''

            return <div className="font-medium">{formattedDate}</div>
        }
    },
    {
        accessorKey: 'vehicleId',
        header: 'Vehicle ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },

    {
        accessorKey: 'actions',
        header: () => {
            return <div className="text-end">Actions</div>
        },

        cell: () => {
            return (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" className="p-0">
                        <GrEdit fontSize={24} className="mr-1" />
                    </Button>
                    <Button variant="ghost" className="p-0">
                        <GrTrash fontSize={24} className="mr-1" />
                    </Button>
                </div>
            )
        }
    }
]
