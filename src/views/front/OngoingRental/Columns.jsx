import React, { useEffect, useState } from 'react'
import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrFormView } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ActionButtons = ({ customerReservationId }) => {
    const [encrypt, setEncrypt] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const encryptId = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5062/api/Encryption/encrypt/${customerReservationId}`
                )
                setEncrypt(response.data.encryptedText)
            } catch (error) {
                console.error('Failed to encrypt reservation ID:', error)
            }
        }
        encryptId()
    }, [customerReservationId])

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/account/ongoingrental/${encrypt}`)}>
                <GrFormView fontSize={30} className="mr-1" />
            </Button>
        </div>
    )
}

export const columns = [
    {
        accessorKey: 'customerReservationId',
        header: 'Reservation ID',
        cell: ({ row }) => <div className="font-medium">{'#' + row.getValue('customerReservationId')}</div>
    },
    {
        accessorKey: 'modelName',
        header: 'Vehicle Name',
        cell: ({ row }) => <div>{row.getValue('modelName')}</div>
    },
    {
        accessorKey: 'startDate',
        header: 'Pick up Date',
        cell: ({ row }) => {
            const value = row.getValue('startDate')
            let formattedDate = 'Invalid Date'
            if (value) {
                try {
                    formattedDate = new Intl.DateTimeFormat('en-US').format(new Date(value))
                } catch (e) {
                    console.error('Invalid start date:', value)
                }
            }
            return <div>{formattedDate}</div>
        }
    },
    {
        accessorKey: 'endDate',
        header: 'Drop off Date',
        cell: ({ row }) => {
            const value = row.getValue('endDate')
            let formattedDate = 'Invalid Date'
            if (value) {
                try {
                    formattedDate = new Intl.DateTimeFormat('en-US').format(new Date(value))
                } catch (e) {
                    console.error('Invalid end date:', value)
                }
            }
            return <div>{formattedDate}</div>
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
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
        ),
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
        cell: ({ row }) => <ActionButtons customerReservationId={row.getValue('customerReservationId')} />
    }
]
