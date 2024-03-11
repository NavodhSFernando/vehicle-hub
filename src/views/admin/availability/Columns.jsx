import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

export const columns = [
    {
        accessorKey: 'id',
        header: 'Vehicle ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'rid',
        header: 'Reservation ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('rid'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <div className="flex items-center">
                    <div>Status</div>
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
            const status = row.getValue('status')
            let color = ''
            let text = ''

            switch (status) {
                case 'available':
                    color = 'bg-green-500'
                    text = 'Available'
                    break
                case 'not available':
                    color = 'bg-red-500'
                    text = 'Not Available'
                    break
                default:
                    color = 'bg-gray-500'
                    text = 'Unknown'
                    break
            }

            return (
                <div className={`capitalize ${color} text-white rounded-full px-2 py-1 text-xs font-medium w-fit`}>
                    {/* <div className="mx-auto">{text}</div> */}
                    {text}
                </div>
            )
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
