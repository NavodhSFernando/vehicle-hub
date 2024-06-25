import { Button } from '../../../components/ui/button'
import { generateInvoice } from './generateInvoice'

export const columns = [
    {
        accessorKey: 'dateCreated',
        header: 'Date',
        cell: ({ row }) => {
            const value = row.getValue('dateCreated')
            const date = new Date(value)
            const formattedDate = value === '0001-01-01' ? 'N/A' : new Intl.DateTimeFormat('en-US').format(date)
            return <div>{formattedDate}</div>
        }
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => {
            const value = row.getValue('amount')
            return <div>Rs {value.toLocaleString()}</div>
        }
    },
    {
        accessorKey: 'id',
        header: 'Invoice',
        cell: ({ row }) => {
            const value = row.getValue('id')
            return <div>INV-{value}</div>
        }
    },
    {
        accessorKey: 'reservationStatus',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.getValue('reservationStatus')
            const text = status === 'Ended' ? 'Not Paid' : 'Paid'
            const color = text === 'Not Paid' ? 'bg-red-500' : 'bg-green-500'
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
        cell: ({ row }) => {
            const invoice = row.original
            const status = invoice.reservationStatus

            const handleDownloadPdf = () => {
                generateInvoice(invoice)
            }

            return (
                <div className="flex items-center justify-end gap-2">
                    {status === 'Ended' ? (
                        <>
                            <Button variant="ghost" className="border border-gray-500">
                                Pay Now
                            </Button>
                            <Button variant="ghost" className="border border-gray-500" onClick={handleDownloadPdf}>
                                Download PDF
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" className="border border-gray-500">
                                View
                            </Button>
                            <Button variant="ghost" className="border border-gray-500" onClick={handleDownloadPdf}>
                                Download PDF
                            </Button>
                        </>
                    )}
                </div>
            )
        }
    }
]
