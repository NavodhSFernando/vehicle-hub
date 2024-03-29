import React from 'react'
import { BsBookmarkStar } from 'react-icons/bs'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { useState } from 'react'
import aqua from '../../assets/vehicles/aqua.png'
import { IoCalendarClear } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi2'
import { RiSteering2Fill } from 'react-icons/ri'

export default function BookNowCard() {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className="w-[300px] flex flex-col p-5 shadow-xl rounded-xl bg-white">
            <div className="flex justify-between pb-12 align-top">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">Toyota Aqua</h1>
                    <p className="text-base opacity-50 font-semibold">Car</p>
                </div>
                <div className="mt-1">
                    {clicked ? (
                        <BsBookmarkStarFill fontSize={24} className="" onClick={handleClick} />
                    ) : (
                        <BsBookmarkStar fontSize={24} className="" onClick={handleClick} />
                    )}
                </div>
            </div>
            <img className="w-full booknowimage pb-12 scale-x-[-1]" src={aqua} alt="" />
            <div className="flex justify-between pb-8">
                <span className="flex gap-1 items-center">
                    <IoCalendarClear fontSize={20} color="90A3BF" />
                    <p className="text-sm opacity-50">2016</p>
                </span>
                <span className="flex gap-1 items-center">
                    <RiSteering2Fill fontSize={20} strokeWidth={1} color="90A3BF" />
                    <p className="text-sm opacity-50">Auto</p>
                </span>
                <span className="flex gap-1 items-center">
                    <HiUsers fontSize={20} color="90A3BF" />
                    <p className="text-sm opacity-50">4 Persons</p>
                </span>
            </div>
            <article className="flex justify-between items-center">
                <span>
                    <h1 className="text-base font-bold">
                        Rs 10,000/<span className="text-sm opacity-50"> Day</span>
                    </h1>
                    <p className="text-sm opacity-50 font-semibold">100Km/ day</p>
                </span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                    Book Now
                </button>
            </article>
        </div>
    )
}
