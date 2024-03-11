import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrTrash } from 'react-icons/gr'

export const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('id'))

            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
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
            )
        },

        cell: ({ row }) => {
            const status = row.getValue('status')
            let color = ''
            let text = ''

            switch (status) {
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
        accessorKey: 'registrationNumber',
        header: 'Registration Number'
    },
    {
        accessorKey: 'chassisNumber',
        header: 'Chassis Number'
    },
    {
        accessorKey: 'engineCapacity',
        header: 'Engine Capacity',
        cell: ({ row }) => {
            const engineCapacity = row.getValue('engineCapacity')
            const formattedEngineCapacity = `${engineCapacity}cc`

            return <div className="font-normal">{formattedEngineCapacity}</div>
        }
    },
    {
        accessorKey: 'costPerDay',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Cost Per Day</div>
                    <Button
                        variant="ghost"
                        className="p-0 flex"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        <FaUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const costPerDay = parseFloat(row.getValue('costPerDay'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('lkr', {
                style: 'currency',
                currency: 'LKR'
            }).format(costPerDay)

            return <div className="font-normal">{formatted}</div>
        }
    },
    {
        accessorKey: 'color',
        header: 'Color'
    },
    {
        accessorKey: 'transmission',
        header: 'Transmission'
    },
    {
        accessorKey: 'mileage',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Mileage</div>
                </div>
            )
        },
        cell: ({ row }) => {
            const mileage = row.getValue('mileage')
            const formattedMileage = `${mileage} KM`

            return <div className="font-normal">{formattedMileage}</div>
        }
    },
    {
        accessorKey: 'actions',
        header: () => {
            return <div className="text-end">Actions</div>
        },

        cell: () => {
            return (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" className="p-0">
                        <GrEdit fontSize={24} className="mr-1" />
                    </Button>
                    <Button variant="ghost" className="p-0">
                        <GrTrash fontSize={24} className="mr-1" />
                    </Button>
                </div>
            )
        }
    }
]
