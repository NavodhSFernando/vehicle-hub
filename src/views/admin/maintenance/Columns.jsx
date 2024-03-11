import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

export const columns = [
    {
        accessorKey: 'id',
        header: 'Maintenance ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'lastdate',
        header: 'Last Maintenance Date',
        cell: ({ row }) => {
            const date = new Date(row.getValue('lastdate'))

            // Format the date as required (e.g., using toLocaleDateString)
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })

            return <div className="font-medium">{formattedDate}</div>
        }
    },

    {
        accessorKey: 'vehicleid',
        header: 'Vehicle ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('vehicleid'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'type',
        header: 'Maintenance Type',
        cell: ({ row }) => {
            const value = row.getValue('type')

            return <div className="font-medium">{value}</div>
        }
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
