import React, { useEffect } from 'react'
import { GrTrash, GrStop, GrPlay } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { EditVehicleDialog } from '../../../components/admin/reservation/EditVehicleDialog'
import Cookies from 'js-cookie'
import { useToast } from '../../../components/ui/use-toast'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card'
import { useState } from 'react'
import apiclient from '../../../axiosConfig'

const employeeId = Cookies.get('employeeId')
console.log('employeeId', employeeId)
if (!employeeId) {
    console.error('Employee Id is not available')
}

const BeginReservation = async ({ customerReservationId, refetchReservation, toast }) => {
    const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
    const decryptedId = decryptResponse.data.decryptedUserId

    const url = `/AdminReservation/Begin-Reservation/${customerReservationId}?eid=${decryptedId}`
    try {
        // POST request to the server with form data
        const result = await apiclient.post(url)
        console.log(result)
        toast({
            variant: 'success',
            description: 'Reservation has started'
        })
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

const AcceptReservation = async ({ customerReservationId, refetchReservation, toast }) => {
    const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
    const decryptedId = decryptResponse.data.decryptedUserId

    const url = `/AdminReservation/Accept-Reservation/${customerReservationId}?eid=${decryptedId}`
    try {
        const result = await apiclient.post(url)
        console.log(result)
        toast({
            variant: 'success',
            description: 'Reservation has been accepted'
        })
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

const DeclineReservation = async ({ customerReservationId, refetchReservation, toast }) => {
    const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
    const decryptedId = decryptResponse.data.decryptedUserId

    const url = `/AdminReservation/Decline-Reservation/${customerReservationId}?eid=${decryptedId}`
    try {
        const result = await apiclient.post(url)
        console.log(result)
        toast({
            variant: 'success',
            description: 'Reservation has been declined'
        })
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

const CancelReservation = async ({ customerReservationId, refetchReservation, toast }) => {
    const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${employeeId}`)
    const decryptedId = decryptResponse.data.decryptedUserId

    const url = `/AdminReservation/Cancel-Reservation/${customerReservationId}?eid=${decryptedId}`
    try {
        const result = await apiclient.post(url)
        console.log(result)
        toast({
            variant: 'success',
            description: 'Reservation has been cancelled'
        })
        refetchReservation()
    } catch (error) {
        console.log(error)
    }
}

// Define a component to encapsulate the action buttons
const ActionButtons = ({ customerReservationId, status, refetchReservation }) => {
    const navigate = useNavigate()
    const { toast } = useToast()
    return (
        <div className="flex items-center justify-end gap-2">
            {status === 'Waiting' && (
                <>
                    <AlertDialogDemo
                        triggerText="Accept"
                        alertTitle="Accept Reservation"
                        alertDescription="Are you sure you want to accept this reservation?"
                        handleConfirm={() => AcceptReservation({ customerReservationId, refetchReservation, toast })}
                        buttonClass="border border-gray-500"
                        variant="ghost"
                    />
                    <AlertDialogDemo
                        triggerText="Decline"
                        alertTitle="Decline Reservation"
                        alertDescription="Are you sure you want to decline this reservation?"
                        handleConfirm={() => DeclineReservation({ customerReservationId, refetchReservation, toast })}
                        buttonClass="border border-gray-500"
                        variant="ghost"
                    />
                </>
            )}
            {status === 'Confirmed' && (
                <AlertDialogDemo
                    triggerText={<GrPlay fontSize={20} className="mr-1" />}
                    alertTitle="Begin Reservation"
                    alertDescription="Are you sure you want to begin this reservation?"
                    handleConfirm={() => BeginReservation({ customerReservationId, refetchReservation, toast })}
                    buttonClass="p-0"
                    variant="ghost"
                />
            )}
            {status === 'Ongoing' && (
                <AlertDialogDemo
                    triggerText={<GrStop fontSize={20} className="mr-1" />}
                    alertTitle="End Reservation"
                    alertDescription="Are you sure you want to end this reservation?"
                    handleConfirm={() => navigate(`/admin/vehiclelog/create/${customerReservationId}`)}
                    buttonClass="p-0"
                    variant="ghost"
                />
            )}
            {(status === 'Pending' || status === 'Confirmed') && (
                <>
                    <EditVehicleDialog
                        customerReservationId={customerReservationId}
                        refetchReservation={refetchReservation}
                        toast={toast}
                    />
                    <AlertDialogDemo
                        triggerText={<GrTrash fontSize={20} className="mr-1" />}
                        alertTitle="Cancel Reservation"
                        alertDescription="Are you sure you want to cancel this reservation"
                        handleConfirm={() => CancelReservation({ customerReservationId, refetchReservation, toast })}
                        buttonClass="p-0"
                        variant="ghost"
                    />
                </>
            )}
        </div>
    )
}

const VehicleHoverCard = ({ regNo }) => {
    const [vehicle, setVehicle] = useState(null)
    const baseThumbnailUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            const response = await apiclient.get(`/AdminVehicle/regNo?regNo=${regNo}`)
            setVehicle(response.data)
            console.log('Vehicle Details:', response.data)
        }
        fetchVehicleDetails()
    }, [regNo])

    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700 cursor-pointer">{regNo}</HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 shadow-lg rounded-md">
                {vehicle ? (
                    <div className="text-center">
                        <img
                            className="object-contain h-32 mx-auto"
                            src={`${baseThumbnailUrl}${vehicle.thumbnail}`}
                            alt=""
                        />
                        <h3 className="text-lg font-semibold">{regNo}</h3>
                        <hr className="py-2 mx-4 border-slate-300" />
                        <p className="text-gray-700 text-sm">
                            <strong>Vehicle ID:</strong> {vehicle.id}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Model:</strong> {vehicle.model}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Type:</strong> {vehicle.type}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Mileage:</strong> {vehicle.mileage}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Year:</strong> {vehicle.year}
                        </p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </HoverCardContent>
        </HoverCard>
    )
}

const CustomerHoverCard = ({ reservationId, name }) => {
    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            const response = await apiclient.get(`/AdminReservation/Customer-Details/${reservationId}`)
            setCustomer(response.data)
        }
        fetchCustomerDetails()
    }, [reservationId])

    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700 cursor-pointer">{name}</HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 shadow-lg rounded-md w-fit">
                {customer ? (
                    <div>
                        <h3 className="text-lg font-semibold text-center">{customer.name}</h3>
                        <hr className="py-2 mx-4 border-slate-300" />
                        <div className="text-gray-700 flex space-x-4">
                            <p>
                                <strong>ID:</strong> {customer.id}
                            </p>
                            <p>
                                <strong>Phone:</strong> {customer.phone}
                            </p>
                        </div>
                        <p className="text-gray-700">
                            <strong>Email:</strong> {customer.email}
                        </p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </HoverCardContent>
        </HoverCard>
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
        header: 'Customer Name',
        cell: ({ row }) => {
            return <CustomerHoverCard reservationId={row.getValue('id')} name={row.getValue('name')} />
        }
    },
    {
        accessorKey: 'regNo',
        header: 'Registration No.',
        cell: ({ row }) => {
            return <VehicleHoverCard regNo={row.getValue('regNo')} />
        }
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
