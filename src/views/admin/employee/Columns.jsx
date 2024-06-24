import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { getValue } from '@testing-library/user-event/dist/utils'

const ActionButtons = ({ employeeId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/employee/edit/${employeeId}`)}>
                <GrEdit fontSize={24} className="mr-1" />
            </Button>
        </div>
    )
}

export const columns = [
    {
        accessorKey: 'id',
        header: 'Employee ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const value = row.getValue('name')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'nic',
        header: 'NIC',
        cell: ({ row }) => {
            const value = row.getValue('nic')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) => {
            const value = row.getValue('address')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const value = row.getValue('role')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'contactNo',
        header: 'Contact Number',
        cell: ({ row }) => {
            const phone = row.original.contactNo
            const value = parseFloat(phone)

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'dob',
        header: 'Date Of Birth',
        cell: ({ row }) => {
            const value = row.getValue('dob')
            const formattedDate = value ? format(parseISO(value), 'yyyy-MM-dd') : ''

            return <div className="font-small">{formattedDate}</div>
        }
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => {
            const value = row.getValue('department')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'gender',
        header: 'Gender',
        cell: ({ row }) => {
            const value = row.getValue('gender')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status
            const statusText = status ? 'Active' : 'Inactive'

            let color = ''
            let text = ''

            switch (statusText) {
                case 'Active':
                    color = 'bg-green-500'
                    text = 'Active'
                    break
                case 'Inactive':
                    color = 'bg-red-500'
                    text = 'Inactive'
                    break
                default:
                    color = 'bg-gray-500'
                    text = 'Unknown'
                    break
            }

            return (
                <div className={`capitalize ${color} text-white rounded-full px-2 py-1 text-xs font-medium w-fit`}>
                    {/* <div className="mx-auto">{text}</div> */}
                    {text}
                </div>
            )
        }
    },

    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,

        cell: ({ row }) => {
            const employeeId = parseFloat(row.getValue('id'))
            return <ActionButtons employeeId={employeeId} />
        }
    }
]
