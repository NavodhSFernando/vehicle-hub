import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { FaUpDown } from 'react-icons/fa6'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const ActionButtons = ({ maintenanceId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                variant="ghost"
                className="p-0"
                onClick={() => navigate(`/admin/maintenance/edit/${maintenanceId}`)}
            >
                <GrEdit fontSize={24} className="mr-1" />
            </Button>
        </div>
    )
}

const VehicleHoverCard = ({ regNo }) => {
    const [vehicle, setVehicle] = useState(null)
    const baseThumbnailUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'
    useEffect(() => {
        const fetchVehicleDetails = async () => {
            const response = await axios.get(`http://localhost:5062/api/AdminVehicle/regNo?regNo=${regNo}`)
            setVehicle(response.data)
            console.log('Vehicle Details:', response.data)
        }
        fetchVehicleDetails()
    }, [regNo])

    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700">{regNo}</HoverCardTrigger>
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
        accessorKey: 'date',
        header: 'Maintenance Date'
    },
    {
        accessorKey: 'currentMileage',
        header: ({ column }) => {
            return (
                <div className="flex items-center bg-yell">
                    <div>Current Mileage</div>
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
            const mileage = row.getValue('currentMileage')
            const formattedMileage = `${mileage} KM`

            return <div className="">{formattedMileage}</div>
        }
    },
    {
        accessorKey: 'registrationNumber',
        header: 'Registration Number',
        cell: ({ row }) => {
            return <VehicleHoverCard regNo={row.getValue('registrationNumber')} />
        }
    },
    {
        accessorKey: 'type',
        header: 'Maintenance Type'
    },
    {
        accessorKey: 'description',
        header: 'Description'
    },
    {
        accessorKey: 'actions',
        header: () => <div className="text-end">Actions</div>,
        cell: ({ row }) => <ActionButtons maintenanceId={row.getValue('id')} />
    }
]
