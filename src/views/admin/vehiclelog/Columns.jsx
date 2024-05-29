import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleLogId }) => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/vehiclelog/edit/${vehicleLogId}`)}>
                <GrEdit fontSize={24} className="mr-1" />
            </Button>
            <Button variant="ghost" className="p-0">
                <GrTrash fontSize={24} className="mr-1" />
            </Button>
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
        accessorKey: 'reservationId',
        header: 'Reservation ID'
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
