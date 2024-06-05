import React from 'react'
import { HiUsers } from 'react-icons/hi'
import { IoCalendarClear } from 'react-icons/io5'
import { RiSteering2Fill } from 'react-icons/ri'

export default function VehicleCard({
    key,
    name,
    make,
    type,
    year,
    transmission,
    capacity,
    imageSrc,
    imageAlt,
    price
}) {
    return (
        <div className="flex w-full p-5 shadow-xl rounded-xl bg-white">
            <img className="w-1/3 booknowimage scale-x-[-1] rounded-xl" src={imageSrc} alt={imageAlt} />
            <div className="flex flex-col w-2/3 pl-5">
                <div className="flex justify-between items-start pb-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">
                            {make} {name}
                        </h1>
                        <p className="text-base opacity-50 font-semibold">{type}</p>
                    </div>
                </div>
                <div className="flex justify-between pb-4">
                    <span className="flex gap-1 items-center">
                        <IoCalendarClear fontSize={20} style={{ color: '#90A3BF' }} />
                        <p className="text-sm opacity-50">{year}</p>
                    </span>
                    <span className="flex gap-1 items-center">
                        <RiSteering2Fill fontSize={20} style={{ color: '#90A3BF' }} />
                        <p className="text-sm opacity-50">{transmission}</p>
                    </span>
                    <span className="flex gap-1 items-center">
                        <HiUsers fontSize={20} style={{ color: '#90A3BF' }} />
                        <p className="text-sm opacity-50">{capacity}</p>
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span>
                        <h1 className="text-base font-bold">
                            {price}
                            <span className="text-sm opacity-50"> / Day</span>
                        </h1>
                        <p className="text-sm opacity-50 font-semibold">100Km/day</p>
                    </span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                        Select
                    </button>
                </div>
            </div>
        </div>
    )
}
