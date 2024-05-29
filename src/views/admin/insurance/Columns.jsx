import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom' // Hook for navigation

const ActionButtons = ({ insuranceId }) => {
    const navigate = useNavigate() // Hook to navigate to different routes

    //edit and delete buttons
    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/insurance/edit/${insuranceId}`)}>
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

            return <div className="font-medium">{'#' + value}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            return row.original.id.toString().toLowerCase().includes(filterValue.toLowerCase())
        }
    },
    {
        accessorKey: 'insuranceNo',
        header: 'InsuranceNo'
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: ({ row }) => {
            const value = row.getValue('expiryDate')
            const formattedDate = value ? format(parseISO(value), 'yyyy-MM-dd') : ''

            return <div className="font-medium">{formattedDate}</div>
        }
    },
    {
        accessorKey: 'vehicleId',
        header: 'Vehicle ID',
        cell: ({ row }) => {
            const vehicleId = row.original.vehicle.id
            const value = parseFloat(vehicleId)

            return <div className="font-medium">{value}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            return row.original.vehicle.id.toString().toLowerCase().includes(filterValue.toLowerCase())
        }
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons insuranceId={row.getValue('id')} />
    }
]
