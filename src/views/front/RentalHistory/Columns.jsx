import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrFormView } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const ActionButtons = ({ customerId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate()}>
                <GrFormView fontSize={30} className="mr-1" />
            </Button>
        </div>
    )
}

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
        accessorKey: 'modelName',
        header: 'Model Name'
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
                case 'completed':
                    color = 'bg-blue-900'
                    text = 'Completed'
                    break
                case 'cancelled':
                    color = 'bg-red-600'
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
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons customerId={row.getValue('id')} />
    }
]
