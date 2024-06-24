import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

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
        header: 'Description'
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleLogId={row.getValue('id')} />
    }
]
