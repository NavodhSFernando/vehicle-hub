import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'

export const columns = [
    {
        accessorKey: 'id',
        header: () => <div>Id</div>,
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 flex ml-auto"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Status
                    <FaUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'amount',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="p-0 flex ml-auto"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    amount
                    <FaUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('amount'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        }
    }
]
