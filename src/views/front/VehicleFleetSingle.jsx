import RequestVehicle from '../../components/front/RequestVehicle'
import React from 'react'
import { useParams } from 'react-router-dom'
import Detailcar from '../../components/front/VehicleFleetSingle/Detailcar'
import CheckList from '../../components/front/VehicleFleetSingle/CheckList'
import ImageShowCase from '../../components/front/VehicleFleetSingle/ImageShowCase'

export default function VehicleFleetSingle() {
    const { slug } = useParams()

    return (
        <div className="flex">
            <div className="flex flex-col w-1/2">
                <ImageShowCase />
                <CheckList />
            </div>
            <div className="flex flex-col w-1/2">
                <Detailcar />
            </div>
        </div>
    )
}
