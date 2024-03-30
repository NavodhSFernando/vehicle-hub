import RequestVehicle from '../../components/front/RequestVehicle'
import React from 'react'
import { useParams } from 'react-router-dom'
import Detailcar from '../../components/front/Navodshit/Detailcar'

export default function VehicleFleetSingle() {
    const { slug } = useParams()

    return (
        <div className="flex">
            <div className="flex flex-col w-1/2"></div>
            <div className="flex flex-col w-1/2">
                <Detailcar />
            </div>
        </div>
    )
}
