import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash, GrStop, GrPlay } from 'react-icons/gr'

export const columns = [
    {
        accessorKey: 'id',
        header: 'Reservation ID',
        cell: ({ row }) => {
            const value = row.getValue('id') // Assuming ID does not need parseFloat
            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Customer Name'
    },
    {
        accessorKey: 'email',
        header: 'Customer Email'
    },
    {
        accessorKey: 'phone',
        header: 'Customer Phone'
    },
    {
        accessorKey: 'pickUpDate',
        header: 'Pick up Date',
        cell: ({ row }) => {
            const value = row.getValue('pickUpDate')
            // Format the date as needed, assuming it's in ISO format for simplicity
            const formattedDate = new Intl.DateTimeFormat('en-US').format(new Date(value))
            return <div>{formattedDate}</div>
        }
    },
    {
        accessorKey: 'dropOffDate',
        header: 'Drop off Date',
        cell: ({ row }) => {
            const value = row.getValue('dropOffDate')
            // Format the date as needed, assuming it's in ISO format for simplicity
            const formattedDate = new Intl.DateTimeFormat('en-US').format(new Date(value))
            return <div>{formattedDate}</div>
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
                case 'Waiting':
                    color = 'bg-yellow-500'
                    text = 'Waiting'
                    break
                case 'Pending':
                    color = 'bg-blue-500'
                    text = 'Pending'
                    break
                case 'Confirmed':
                    color = 'bg-green-500'
                    text = 'Confirmed'
                    break
                case 'Ongoing':
                    color = 'bg-purple-500'
                    text = 'Ongoing'
                    break
                case 'Ended':
                    color = 'bg-orange-500'
                    text = 'Ended'
                    break
                case 'Cancelled':
                    color = 'bg-red-500'
                    text = 'Cancelled'
                    break
                default:
                    color = 'bg-gray-500'
                    text = 'Unknown'
                    break
            }

            return (
                <div className={`capitalize ${color} text-white rounded-full px-2 py-1 text-xs font-medium w-fit`}>
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
        cell: ({ row }) => {
            const status = row.getValue('status')

            return (
                <div className="flex items-center justify-end gap-2">
                    {status === 'Confirmed' && (
                        <Button variant="ghost" className="p-0">
                            <GrPlay fontSize={20} className="mr-1" />
                        </Button>
                    )}
                    {status === 'Ongoing' && (
                        <Button variant="ghost" className="p-0">
                            <GrStop fontSize={20} className="mr-1" />
                        </Button>
                    )}
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
