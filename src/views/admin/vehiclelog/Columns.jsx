import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card'
import { useState } from 'react'
import { useEffect } from 'react'
import apiclient from '../../../axiosConfig'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleLogId }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-end gap-2">
            <AlertDialogDemo
                triggerText={<GrEdit fontSize={20} className="mr-1" />}
                alertTitle="Edit Vehicle Log"
                alertDescription="Are you sure you want to end this reservation?"
                handleConfirm={() => navigate(`/admin/vehiclelog/edit/${vehicleLogId}`)}
                buttonClass="p-0"
                variant="ghost"
            />
        </div>
    )
}

const truncateDescription = (description) => {
    return description.split(' ').slice(0, 2).join(' ') + '...'
}

const DescriptionHover = ({ vehicleLogId, truncatedDes }) => {
    const [description, setDescription] = useState(null)
    useEffect(() => {
        const fetchDescription = async () => {
            const response = await apiclient.get(`/AdminReservation/Vehicle-Log-Description/${vehicleLogId}`)
            setDescription(response.data)
        }
        fetchDescription()
    }, [vehicleLogId])
    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700">{truncatedDes}</HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 shadow-lg rounded-md">
                {description ? (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">{description.vehicleLogId}</h3>
                        <hr className="py-2 mx-4 border-slate-300" />
                        <p className="text-gray-700 text-sm">
                            <strong></strong> {description.description}
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
        header: 'ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{value}</div>
        }
    },
    {
        accessorKey: 'customerReservationId',
        header: 'Reservation ID',
        filterFn: 'includesString', // Add a filter function
        cell: ({ row }) => <div>{row.getValue('customerReservationId')}</div> // Make sure to render the cell value
    },
    {
        accessorKey: 'endMileage',
        header: 'End Milage'
    },
    {
        accessorKey: 'penalty',
        header: 'Penalty'
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('description')
            const truncatedDescription = truncateDescription(description)

            return (
                <DescriptionHover
                    vehicleLogId={row.getValue('id')}
                    des={description}
                    truncatedDes={truncatedDescription}
                />
            )
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleLogId={row.getValue('id')} />
    }
]
