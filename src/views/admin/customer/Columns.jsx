import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'
import { format, parseISO } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AlertDialogDemo } from '../../../components/ui/alertDialog'

const handleDeleteCustomer = async ({ customerId, refetchCustomer }) => {
    try {
        const url = `http://localhost:5062/api/CustomerAuth/deactivate/${customerId}`
        await axios.post(url)
        refetchCustomer()
    } catch (error) {
        console.error('Failed to deactivate the customer', error)
    }
}

export const columns = [
    {
        accessorKey: 'id',
        header: 'Customer ID',
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
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) => {
            const value = row.getValue('address')

            return <div className="font-small">{value}</div>
        }
    },
    {
        accessorKey: 'nic',
        header: 'NIC'
    },
    {
        accessorKey: 'drivingLicenseNo',
        header: 'Driving License No'
    },
    {
        accessorKey: 'email',
        header: 'Email'
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
        header: () => {
            return <div className="text-end">Actions</div>
        },

        cell: ({ row, column }) => {
            const customerId = row.getValue('id')
            const refetchCustomer = column.columnDef.refetchCustomer
            return (
                <div className="flex items-center justify-end gap-2">
                    <AlertDialogDemo
                        triggerText={<GrTrash fontSize={24} />}
                        alertTitle="Deactivate Customer"
                        alertDescription="Are you sure you want to continue?"
                        handleConfirm={() => handleDeleteCustomer({ customerId, refetchCustomer })}
                        variant="ghost" // Set button variant to ghost
                    />
                </div>
            )
        }
    }
]
