import React from 'react'
import Aqua from '../../assets/vehicles/aqua.png'

export function VehicleCard() {
    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg max-w-sm p-5">
            <div className="Details">
                <div className="CardName">Toyota</div>
                <div className="Model">Car</div>
            </div>
            <div>
                <a href="#">
                    <img className="rounded-t-lg p-8" src={Aqua} alt="Toyota Aqua 2016" />
                </a>
            </div>
            <div></div>
            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <a href="#">Book Now</a>
                </button>
            </div>
        </div>
    )
}

export default VehicleCard
