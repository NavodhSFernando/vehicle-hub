import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrTrash, GrStop, GrPlay } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EditVehicleDialog } from '../../../components/admin/reservation/EditVehicleDialog'
import Cookies from 'js-cookie'

const employeeId = Cookies.get('employeeId')
console.log('employeeId', employeeId)
if (!employeeId) {
    console.error('Employee Id is not available')
}

const BeginReservation = async ({ customerReservationId, refetchReservation }) => {
    const url = `http://localhost:5062/api/AdminReservation/Begin-Reservation/${customerReservationId}`
    try {
        // POST request to the server with form data
        const result = await axios.post(url)
        console.log(result)
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

const AcceptReservation = async ({ customerReservationId, refetchReservation }) => {
    const url = `http://localhost:5062/api/AdminReservation/Accept-Reservation/${customerReservationId}`
    try {
        // POST request to the server with form data
        const formData = {
            id: customerReservationId,
            eid: employeeId
        }
        const result = await axios.post(url, formData)
        console.log(result)
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

const DeclineReservation = async ({ customerReservationId, refetchReservation }) => {
    const url = `http://localhost:5062/api/AdminReservation/Decline-Reservation/${customerReservationId}`
    try {
        // POST request to the server with form data
        const formData = {
            id: customerReservationId,
            eid: employeeId
        }
        const result = await axios.post(url, formData)
        console.log(result)
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

// Define a component to encapsulate the action buttons
const ActionButtons = ({ customerReservationId, status, refetchReservation }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-end gap-2">
            {status === 'Waiting' && (
                <>
                    <Button
                        variant="ghost"
                        className="border border-gray-500"
                        onClick={() => AcceptReservation({ customerReservationId, refetchReservation })}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="ghost"
                        className="border border-gray-500"
                        onClick={() => DeclineReservation({ customerReservationId, refetchReservation })}
                    >
                        Decline
                    </Button>
                </>
            )}
            {status === 'Confirmed' && (
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => BeginReservation({ customerReservationId, refetchReservation })}
                >
                    <GrPlay fontSize={20} className="mr-1" />
                </Button>
            )}
            {status === 'Ongoing' && (
                <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => navigate(`/admin/vehiclelog/create/${customerReservationId}`)}
                >
                    <GrStop fontSize={20} className="mr-1" />
                </Button>
            )}
            {status !== 'Waiting' && (
                <>
                    <EditVehicleDialog
                        customerReservationId={customerReservationId}
                        refetchReservation={refetchReservation}
                    />
                    <Button variant="ghost" className="p-0">
                        <GrTrash fontSize={24} className="mr-1" />
                    </Button>
                </>
            )}
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
        },
        filterFn: (row, columnId, filterValue) => {
            return String(row.getValue(columnId)).includes(filterValue)
        }
    },
    {
        accessorKey: 'name',
        header: 'Customer Name'
    },
    {
        accessorKey: 'regNo',
        header: 'Registration No.'
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
        },
        filterFn: (row, columnId, filterValue) => {
            const rowValue = new Date(row.getValue(columnId))
            const filterStartDate = filterValue[0]
            return !filterStartDate || rowValue >= filterStartDate
        }
    },
    {
        accessorKey: 'startTime',
        header: 'Start Time',
        cell: ({ row }) => {
            const value = row.getValue('startTime')
            return <div>{value || 'Invalid Time'}</div>
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
        },
        filterFn: (row, columnId, filterValue) => {
            const rowValue = new Date(row.getValue(columnId))
            const [filterStartDate, filterEndDate] = filterValue
            return (
                (!filterStartDate || rowValue >= filterStartDate) &&
                (!filterEndDate || rowValue <= new Date(new Date(filterEndDate).setHours(23, 59, 59, 999)))
            )
        }
    },
    {
        accessorKey: 'endTime',
        header: 'End Time',
        cell: ({ row }) => {
            const value = row.getValue('endTime')
            return <div>{value || 'Invalid Time'}</div>
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
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
                case 'Completed':
                    color = 'bg-green-700'
                    text = 'Completed'
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
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row, column }) => {
            const refetchReservation = column.columnDef.refetchReservation
            return (
                <ActionButtons
                    customerReservationId={row.getValue('id')}
                    status={row.getValue('status')}
                    refetchReservation={refetchReservation}
                />
            )
        }
    }
]
