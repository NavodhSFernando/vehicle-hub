import axios from 'axios'
import React from 'react'
import { HiUsers } from 'react-icons/hi'
import { IoCalendarClear } from 'react-icons/io5'
import { RiSteering2Fill } from 'react-icons/ri'

export default function VehicleCard({
    key,
    id,
    name,
    make,
    type,
    year,
    transmission,
    capacity,
    imageSrc,
    price,
    customerReservationId,
    refetchReservation
}) {
    const baseUrl = 'https://vehiclehubimages.blob.core.windows.net/thumbnails/'

    const handleSelect = async () => {
        const url = `http://localhost:5062/api/AdminReservation/Change-Vehicle/${customerReservationId}?vid=${id}`
        try {
            const response = await axios.post(url)
            console.log(response.data)
            console.log('Vehicle selected')
            refetchReservation()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex w-full p-5 border border-slate-100 mb-2 rounded-xl bg-white">
            <img className="w-1/3 rounded-xl" src={imageSrc ? `${baseUrl}${imageSrc}` : null} />
            <div className="flex flex-col w-2/3 pl-5">
                <div className="flex justify-between items-start pb-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">
                            {make} {name}
                        </h1>
                        <p className="text-base opacity-50 font-semibold">{type}</p>
                    </div>
                </div>
                <div className="flex gap-10 pb-4">
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
                    </span>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={() => handleSelect()}
                    >
                        Select
                    </button>
                </div>
            </div>
        </div>
    )
}
