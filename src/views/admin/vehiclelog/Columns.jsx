import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

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
        accessorKey: 'endmilage',
        header: 'End Milage'
    },
    {
        accessorKey: 'vehicleStatus',
        header: 'Vehicle Status'
    }
]
