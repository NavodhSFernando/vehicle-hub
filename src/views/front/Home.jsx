import React from 'react'
import VehicleFleet from '../../components/front/VehicleFleet'

export default function Home() {
    return (
        <div>
            <div className="relative h-screen">
                {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Image})` }}></div> */}
                {/* <div className="absolute inset-0 flex justify-center items-center"> */}
                <VehicleFleet />
            </div>
        </div>
    )
}
