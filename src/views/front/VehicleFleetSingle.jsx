import RequestVehicle from '../../components/front/RequestVehicle'
import React from 'react'
import { useParams } from 'react-router-dom'
import Detailcar from '../../components/front/VehicleFleetSingle/Detailcar'
import CheckList from '../../components/front/VehicleFleetSingle/CheckList'
import ImageShowCase from '../../components/front/VehicleFleetSingle/ImageShowCase'

export default function VehicleFleetSingle() {
    const { slug } = useParams()

    const vehicle = {
        name: 'Toyota Aqua',
        transmission: 'Manual',
        capacity: '6 Person',
        engine: '1500cc',
        mileage: '15km/l',
        fuel: 'Petrol',
        year: '2017',
        colour: 'White',
        rate: '15 000'
    }

    return (
        <div className="flex">
            <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                    <ImageShowCase />
                    <CheckList />
                </div>
                <div className="flex flex-col w-1/2">
                    <Detailcar
                        vehicle={vehicle.name}
                        transmission={vehicle.transmission}
                        capacity={vehicle.capacity}
                        engine={vehicle.engine}
                        mileage={vehicle.mileage}
                        fuel={vehicle.fuel}
                        year={vehicle.year}
                        colour={vehicle.colour}
                        rate={vehicle.rate}
                    />
                </div>
            </div>
        </div>
    )
}
