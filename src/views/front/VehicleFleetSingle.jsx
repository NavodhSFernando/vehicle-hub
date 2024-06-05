import RequestVehicle from '../../components/front/RequestVehicle'
import React from 'react'
import { useParams } from 'react-router-dom'
import Detailcar from '../../components/front/VehicleFleetSingle/Detailcar'
import FeedBack from '../../components/front/VehicleFleetSingle/FeedBack'
import CheckList from '../../components/front/VehicleFleetSingle/CheckList'
import ImageShowCase from '../../components/front/VehicleFleetSingle/ImageShowCase'

export default function VehicleFleetSingle() {
    const { slug } = useParams()

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
        sdate: '12/12/2024',
        stime: '12:00 PM',
        edate: '12/13/2024',
        etime: '12:00 PM'
    }

    return (
        <div className="flex gap-4 flex-row">
            <div className="flex flex-col w-1/2">
                <ImageShowCase />
                <CheckList />
                <FeedBack slug={slug} />
            </div>
            <div className="flex flex-col w-1/2">
                <Detailcar
                    vehicle={reservation.name}
                    transmission={reservation.transmission}
                    capacity={reservation.capacity}
                    engine={reservation.engine}
                    mileage={reservation.mileage}
                    fuel={reservation.fuel}
                    year={reservation.year}
                    colour={reservation.colour}
                    rate={reservation.rate}
                    sdate={reservation.sdate}
                    stime={reservation.stime}
                    edate={reservation.edate}
                    etime={reservation.etime}
                />
            </div>
        </div>
    )
}
