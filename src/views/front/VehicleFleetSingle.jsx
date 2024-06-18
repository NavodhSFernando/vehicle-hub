import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Detailcar from '../../components/front/VehicleFleetSingle/Detailcar'
import FeedBack from '../../components/front/VehicleFleetSingle/FeedBack'
import CheckList from '../../components/front/VehicleFleetSingle/CheckList'
import ImageShowCase from '../../components/front/VehicleFleetSingle/ImageShowCase'

export default function VehicleFleetSingle() {
    const { id } = useParams()
    const location = useLocation()
    const { startDate, startTime, endDate, endTime } = location.state || {}

    console.log('vehicleId', id)

    const reservation = {
        sdate: startDate ? new Date(startDate) : null,
        stime: startTime || 'N/A',
        edate: endDate ? new Date(endDate) : null,
        etime: endTime || 'N/A'
    }

    function formatDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error('Invalid date:', date)
            return 'Invalid date'
        }

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

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
                    sdate={reservation.sdate ? formatDate(reservation.sdate) : 'N/A'}
                    stime={reservation.stime ? formatTime(reservation.stime) : 'N/A'}
                    edate={reservation.edate ? formatDate(reservation.edate) : 'N/A'}
                    etime={reservation.etime ? formatTime(reservation.etime) : 'N/A'}
                />
            </div>
        </div>
    )
}
