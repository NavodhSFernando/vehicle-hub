import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Detailcar from '../../components/front/VehicleFleetSingle/Detailcar'
import FeedBack from '../../components/front/VehicleFleetSingle/FeedBack'
import CheckList from '../../components/front/VehicleFleetSingle/CheckList'
import ImageShowCase from '../../components/front/VehicleFleetSingle/ImageShowCase'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PageNotFound from '../../components/front/PageNotFound'

export default function VehicleFleetSingle() {
    const { id } = useParams()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const startDate = searchParams.get('startDate')
    const startTime = searchParams.get('startTime')
    const endDate = searchParams.get('endDate')
    const endTime = searchParams.get('endTime')
    const imageSrc = searchParams.get('imageSrc')
    const [vehicleData, setVehicleData] = useState({})

    console.log('vehicleId', id)

    const reservation = {
        sdate: startDate,
        stime: startTime,
        edate: endDate,
        etime: endTime,
        imageSrc: imageSrc
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5062/api/Vehicle/${id}`)
                setVehicleData(response.data)
                console.log('Fetched Vehicle:', response.data)
            } catch (error) {
                console.error('Failed to fetch vehicle data:', error)
            }
        }

        fetchData()
    }, [id])

    function formatDate(date) {
        if (!date) {
            return 'N/A'
        }

        const parsedDate = new Date(date)
        if (isNaN(parsedDate.getTime())) {
            console.error('Invalid date:', date)
            return 'Invalid date'
        }

        const year = parsedDate.getFullYear()
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
        const day = String(parsedDate.getDate()).padStart(2, '0')

        return `${year}/${month}/${day}`
    }

    function formatTime(timeString) {
        if (!timeString) {
            return 'N/A'
        }

        const date = new Date(`1970-01-01T${timeString}Z`)
        const hours = String(date.getUTCHours()).padStart(2, '0')
        const minutes = String(date.getUTCMinutes()).padStart(2, '0')
        const seconds = String(date.getUTCSeconds()).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}`
    }

    console.log('Vehicle Data:', vehicleData)
    if (!vehicleData.registrationNumber) {
        console.log('No vehicle data')
        return <PageNotFound />
    }

    return (
        <div className="flex gap-4 flex-row">
            <div className="flex flex-col w-1/2">
                <ImageShowCase id={id} />
                <CheckList id={id} />
                <FeedBack id={id} />
            </div>
            <div className="flex flex-col w-1/2">
                <Detailcar
                    id={id}
                    imageSrc={reservation.imageSrc}
                    sdate={reservation.sdate ? formatDate(reservation.sdate) : 'N/A'}
                    stime={reservation.stime ? formatTime(reservation.stime) : 'N/A'}
                    edate={reservation.edate ? formatDate(reservation.edate) : 'N/A'}
                    etime={reservation.etime ? formatTime(reservation.etime) : 'N/A'}
                />
            </div>
        </div>
    )
}
