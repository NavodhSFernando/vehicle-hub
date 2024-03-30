import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

export const columns = [
    {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => {
            const value = row.getValue('date'); // Change 'pickUpDate' to 'date'
            // Format the date as needed, assuming it's in ISO format for simplicity
            const formattedDate = new Intl.DateTimeFormat('en-US').format(new Date(value));
            return <div>{formattedDate}</div>;
        }
    },
    
    {
        accessorKey: 'amount',
        header: 'Amount'
    },
    {
        accessorKey: 'invoice',
        header: 'Invoice'
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('status')
            let color = ''
            let text = ''

            switch (status) {
                case 'due':
                    color = 'bg-yellow-500'
                    text = 'Due'
                    break
                case 'paid':
                    color = 'bg-green-500'
                    text = 'Paid'
                    break
                case 'not paid':
                    color = 'bg-red-500'
                    text = 'Not Paid'
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
        header: '',
        cell: ({ row }) => {
            const status = row.getValue('status')

            return (
                <div className="flex gap-2">
                    {status === 'due' && (
                        <>
                            <Button variant="ghost" className="border border-gray-500">View</Button>
                            <Button variant="ghost" className="border border-gray-500">Download PDF</Button>
                        </>
                    )}
                    {status === 'paid' && (
                        <>
                            <Button variant="ghost" className="border border-gray-500">View</Button>
                            <Button variant="ghost" className="border border-gray-500">Download PDF</Button>
                        </>
                    )}
                    {status === 'not paid' && (
                        <>
                            <Button variant="ghost" className="border border-gray-500">Pay Now</Button>
                            <Button variant="ghost" className="border border-gray-500">Download PDF</Button>
                        </>
                    )}
                </div>
            )
        }
    }
]