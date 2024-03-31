import React, { useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'
import { FaRegClock } from 'react-icons/fa'

export default function RequestVehicle() {
    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }

    const specifications = [
        { label: 'Year', value: '2015' },
        { label: 'Transmission', value: 'Auto' },
        { label: 'Mileage', value: '50,000 km' },
        { label: 'Color', value: 'Red' }
    ]

    return (
        <div className="w-[500px] flex flex-col p-5 shadow-xl rounded-xl bg-white ml-auto">
            <div className="flex justify-between pb-12 align-top">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Toyota Aqua</h1>
                    <p className="text-gray-500 text-xs">10+ Reviewer</p>
                </div>
                <div className="mt-1">
                    {clicked ? (
                        <BsBookmarkStarFill fontSize={24} className="" onClick={handleClick} />
                    ) : (
                        <BsBookmarkStar fontSize={24} className="" onClick={handleClick} />
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-blue-400 text-xs">SPECIFICATION</h1>
                {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between pb-2">
                        <span className="flex gap-1 items-center text-gray-500">
                            {spec.label}
                            <p className="text-sm opacity-50 text-blue-900">{spec.value}</p>
                        </span>
                    </div>
                ))}
                <div className="mt-10">
                    <div className="flex flex-col">
                        <h1 className="text-blue-400 text-xs">RENTAL INFO</h1>
                        <div className="flex flex-col gap-4">
                            {/* Pick-up Info Block */}
                            <div className="flex items-center gap-2 p-2 shadow-lg rounded-md">
                                <CiCalendar strokeWidth={1} fontSize={24} className="text-[#283280]" />
                                <div className="flex flex-col w-fit">
                                    <label htmlFor="pick-up-date" className="text-[12px] opacity-80">
                                        Pick Up Date
                                    </label>
                                    <p>10 June 2023</p>
                                </div>

                                {/* Vertical Line Separator */}
                                <div className="bg-gray-300 w-px h-6 mx-2"></div>

                                <FaRegClock strokeWidth={1} fontSize={22} className="text-[#283280]" />
                                <div className="flex flex-col w-fit">
                                    <label htmlFor="pick-up-time" className="text-[12px] opacity-80">
                                        Pick Up Time
                                    </label>
                                    <p>10:00:00</p>
                                </div>
                            </div>

                            {/* Drop-off Info Block - On a new line */}
                            <div className="flex items-center gap-2 p-2 shadow-lg rounded-md">
                                <CiCalendar strokeWidth={1} fontSize={24} className="text-[#283280]" />
                                <div className="flex flex-col w-fit">
                                    <label htmlFor="drop-off-date" className="text-[12px] opacity-80">
                                        Drop off Date
                                    </label>
                                    <p>10 June 2023</p>
                                </div>

                                {/* Vertical Line Separator */}
                                <div className="bg-gray-300 w-px h-6 mx-2"></div>

                                <FaRegClock strokeWidth={1} fontSize={22} className="text-[#283280]" />
                                <div className="flex flex-col w-fit">
                                    <label htmlFor="drop-off-time" className="text-[12px] opacity-80">
                                        Drop off Time
                                    </label>
                                    <p>10:00:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-col">
                            <h1 className="text-blue-400 text-xs">RATES</h1>
                            <div className="flex gap-4">
                                <h1 className="text-blue-950 font-bold text-2xl">Rs 10,000.00/</h1>
                                <h1 className="text-gray-500 mt-2 font-bold">day</h1>
                            </div>
                            <hr className="mt-3 border-t-1 border-black" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
