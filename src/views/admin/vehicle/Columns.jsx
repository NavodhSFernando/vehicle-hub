import React from 'react'
import { FaUpDown } from 'react-icons/fa6'
import { Button } from '../../../components/ui/button'
import { GrEdit, GrServices, GrShield } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import apiclient from '../../../axiosConfig'

// Define a component to encapsulate the action buttons
const ActionButtons = ({ vehicleId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/vehicle/edit/${vehicleId}`)}>
                <GrEdit fontSize={24} className="mr-1" />
            </Button>
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/maintenance/create/${vehicleId}`)}>
                <GrServices fontSize={24} className="mr-1" />
            </Button>
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/insurance/create/${vehicleId}`)}>
                <GrShield fontSize={24} className="mr-1" />
            </Button>
        </div>
    )
}

const VehicleModelHoverCard = ({ vehicleId, model }) => {
    const [vehicle, setVehicle] = useState(null)
    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/logos/'
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            const response = await apiclient.get(`/AdminVehicle/hover/${vehicleId}`)
            setVehicle(response.data)
            console.log('Vehicle Details:', response.data)
        }
        fetchVehicleDetails()
    }, [vehicleId])

    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700 cursor-pointer">{model}</HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 shadow-lg rounded-md">
                {vehicle ? (
                    <div className="text-center">
                        <img className="object-contain h-10 mx-auto mb-2" src={`${baseUrl}${vehicle.make}`} alt="" />
                        <h3 className="text-lg font-semibold ">{model}</h3>
                        <hr className="py-2 mx-4 border-slate-300" />
                        <p className="text-gray-700 text-sm">
                            <strong>Model ID:</strong> {vehicle.vehicleModelId}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Year:</strong> {vehicle.year}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Seating Capacity:</strong> {vehicle.seatingCapacity}
                        </p>
                        <p className="text-gray-700 text-sm">
                            <strong>Fuel:</strong> {vehicle.fuel}
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

            return <div className="font-medium">{'#' + value}</div>
        }
    },
    {
        accessorKey: 'registrationNumber',
        header: 'Registration No'
    },
    {
        accessorKey: 'chassisNo',
        header: 'Chassis No'
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

            return <div className="">{formatted}</div>
        }
    },
    {
        accessorKey: 'costPerExtraKM',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>
                        Excess
                        <br />
                        Mileage
                    </div>
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
            const costPerExtraKm = parseFloat(row.getValue('costPerExtraKM'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('lkr', {
                style: 'currency',
                currency: 'LKR'
            }).format(costPerExtraKm)

            return <div className="">{formatted}</div>
        }
    },
    {
        accessorKey: 'colour',
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
            const mileage = row.getValue('mileage')
            const formattedMileage = `${mileage} KM`

            return <div className="">{formattedMileage}</div>
        }
    },
    {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        cell: ({ row }) => {
            const value = row.getValue('thumbnail')
            const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'

            return (
                <div className="flex items-center gap-2">
                    <img src={`${baseUrl}${value}`} alt="thumbnail" className="w-20" />
                </div>
            )
        }
    },
    {
        accessorKey: 'vehicleTypeId',
        header: 'Vehicle Type',
        cell: ({ row }) => {
            // Extract the vehicleType.id correctly
            const vehicleType = row.original.vehicleType.name

            return <div className="">{vehicleType}</div>
        },
        filterFn: (row, columnId, filterValue) => {
            return row.original.vehicleType.name.toString().toLowerCase().includes(filterValue.toLowerCase())
        }
    },
    {
        accessorKey: 'vehicleModelId',
        header: 'Vehicle Model',
        cell: ({ row }) => {
            const vehicleModel = row.original.vehicleModel.name
            return <VehicleModelHoverCard vehicleId={row.getValue('id')} model={vehicleModel} />
        },
        filterFn: (row, columnId, filterValue) => {
            return row.original.vehicleModel.name.toString().toLowerCase().includes(filterValue.toLowerCase())
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
                    {text}
                </div>
            )
        }
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons vehicleId={row.getValue('id')} />
    }
]
