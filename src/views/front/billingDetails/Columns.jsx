import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { generateInvoice } from './generateInvoice'

export const columns = (paymentStatuses) => [
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
            const invoiceId = row.getValue('id')
            const paymentStatus = paymentStatuses[invoiceId]

            let text = 'Not Paid'
            let color = 'bg-red-500'

            if (paymentStatus === 'Final') {
                text = 'Paid'
                color = 'bg-green-500'
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
        cell: ({ row }) => {
            const invoice = row.original
            const invoiceId = invoice.id
            const paymentStatus = paymentStatuses[invoiceId]

            const handleDownloadPdf = () => {
                const pdfUrl = generateInvoice(invoice)
                const a = document.createElement('a')
                a.href = pdfUrl
                a.download = `invoice-${invoice.id}.pdf`
                a.click()
                URL.revokeObjectURL(pdfUrl)
            }

            const handleViewPdf = () => {
                const pdfUrl = generateInvoice(invoice)
                window.open(pdfUrl, '_blank')
            }

            return (
                <div className="flex items-center justify-end gap-2">
                    {paymentStatus === 'Final' ? (
                        <>
                            <Button variant="ghost" className="border border-gray-500" onClick={handleViewPdf}>
                                View PDF
                            </Button>
                            <Button variant="ghost" className="border border-gray-500" onClick={handleDownloadPdf}>
                                Download PDF
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" className="border border-gray-500">
                                Pay Now
                            </Button>
                            <Button variant="ghost" className="border border-gray-500" onClick={handleViewPdf}>
                                View PDF
                            </Button>
                        </>
                    )}
                </div>
            )
        }
    }
]
