import RequestVehicle from '../../components/front/RequestVehicle'
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
        name: 'Toyota Aqua',
        transmission: 'Manual',
        capacity: '6 Person',
        engine: '1500cc',
        mileage: '15km/l',
        fuel: 'Petrol',
        year: '2017',
        colour: 'White',
        rate: '15 000',
        sdate: startDate,
        stime: startTime,
        edate: endDate,
        etime: endTime,
    }

    function formatDate(date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error('Invalid date:', date);
            return 'Invalid date';
        }
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}/${month}/${day}`;
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
                    vehicle={reservation.name}
                    transmission={reservation.transmission}
                    capacity={reservation.capacity}
                    engine={reservation.engine}
                    mileage={reservation.mileage}
                    fuel={reservation.fuel}
                    year={reservation.year}
                    colour={reservation.colour}
                    rate={reservation.rate}
                    sdate={formatDate(reservation.sdate)}
                    stime={reservation.stime}
                    edate={formatDate(reservation.edate)}
                    etime={reservation.etime}
                />
            </div>
        </div>
    )
}
