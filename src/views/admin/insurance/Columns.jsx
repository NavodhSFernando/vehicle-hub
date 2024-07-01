import React from 'react'
import { Button } from '../../../components/ui/button'
import { GrEdit } from 'react-icons/gr'
import { format, parseISO } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { FaUpDown } from 'react-icons/fa6'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../../../components/ui/hover-card'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import apiclient from '../../../axiosConfig'

const ActionButtons = ({ insuranceId }) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" className="p-0" onClick={() => navigate(`/admin/insurance/edit/${insuranceId}`)}>
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
            const response = await apiclient.get(`/AdminVehicle/regNo?regNo=${regNo}`)
            setVehicle(response.data)
            console.log('Vehicle Details:', response.data)
        }
        fetchVehicleDetails()
    }, [regNo])

    return (
        <HoverCard>
            <HoverCardTrigger className="font-medium hover:text-slate-700 cursor-pointer">{regNo}</HoverCardTrigger>
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
                            <strong>Mileage:</strong> {vehicle.mileage}
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
        accessorKey: 'insuranceNo',
        header: 'InsuranceNo'
    },
    {
        accessorKey: 'expiryDate',
        header: 'Expiry Date',
        cell: ({ row }) => {
            const value = row.getValue('expiryDate')
            const formattedDate = value ? format(parseISO(value), 'yyyy-MM-dd') : ''

            return <div className="">{formattedDate}</div>
        }
    },
    {
        accessorKey: 'registrationNo',
        header: 'Registration Number',
        cell: ({ row }) => {
            const regNo = row.getValue('registrationNo')
            return <VehicleHoverCard regNo={regNo} />
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
        cell: ({ row }) => <ActionButtons insuranceId={row.getValue('id')} />
    }
]
