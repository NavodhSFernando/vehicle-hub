import { React, useState } from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import { Checkbox } from '../../ui/checkbox'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { Button } from '../../ui/button'

export default function Detailcar({ vehicle, transmission, capacity, engine, mileage, fuel, year, colour, rate }) {
    const [rating, setRating] = useState(0)

    const handleStarClick = (value) => {
        setRating(value)
    }

    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className="w-full bg-white p-6 rounded-lg">
            {/* Header */}
            <article className="w-full flex justify-between pb-7 p">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-gray-950 mb-1">{vehicle}</h1>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 border-gray-700 rounded-full fill-current ${index < rating ? 'text-yellow-400' : 'text-gray-100'}`}
                                viewBox="0 0 24 24"
                                onClick={() => handleStarClick(index + 1)}
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>
                        ))}
                        <p className="text-gray-500 text-xs">10+ Reviewer</p>
                    </div>
                </div>
                <div className="mt-1">
                    {clicked ? (
                        <BsBookmarkStarFill fontSize={24} onClick={handleClick} />
                    ) : (
                        <BsBookmarkStar fontSize={24} onClick={handleClick} />
                    )}
                </div>
            </article>
            {/* specification */}
            <div className="w-full pb-14">
                <p className="text-sm text-slate-500 uppercase ">Specification</p>
                <div className="p-2 flex gap-10">
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Transmission</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{transmission}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Capacity</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{capacity}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Engine</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{engine}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-3/5">Mileage</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{mileage}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Fuel</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{fuel}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Year</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{year}</p>
                        </div>
                        <div className="flex w-full">
                            <p className="text-lg text-slate-500 w-2/5">Colour</p>
                            <p className="text-lg text-slate-500 font-bold w-2/5">{colour}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Rental info */}
            <div className="w-full pb-14">
                <p className="text-sm text-slate-500 uppercase ">Rental Info</p>
                <div className="p-2 max-w-[460px] shadow-lg flex flex-col gap-4">
                    <div className="w-full flex justify-around py-2">
                        <Datepicker />
                        <TimePicker />
                    </div>
                    <div className="w-full flex justify-around py-2">
                        <Datepicker />
                        <TimePicker />
                    </div>
                </div>
            </div>
            {/* rates */}
            <div className="w-full max-w-[480px]">
                <p className="text-sm text-slate-500 uppercase ">Rates</p>
                <div className="p-3">
                    <h1 className="text-3xl font-bold pb-2 w-full border-b border-black mb-4">
                        {'Rs' + rate} / <span className="text-slate-500">day</span>
                    </h1>
                    <div className="flex flex-col pb-14">
                        <span className="flex gap-2 items-center mb-2">
                            <button className="w-[73px] flex justify-center rounded border border-black" disabled>
                                <p className="text-sm">100 Km</p>
                            </button>
                            <p>Daily Mileage Limit</p>
                        </span>
                        <span className="flex gap-2 items-center">
                            <button className="w-[73px] flex justify-center rounded border border-black" disabled>
                                <p className="text-sm">Rs 120</p>
                            </button>
                            <p>Extra Mileage Charge (per km)</p>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-blue-100 rounded mb-3 ">
                        <Checkbox className="rounded" />
                        <label
                            htmlFor={''}
                            className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold"
                        >
                            I agree with sending an Marketing and newsletter emails. No spam, promised!
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-blue-100 rounded mb-20">
                        <Checkbox className="rounded" />
                        <label
                            htmlFor={''}
                            className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-bold"
                        >
                            I agree with sending an Marketing and newsletter emails. No spam, promised!
                        </label>
                    </div>

                    <Button className="text-[#FBDAC6] bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-full rounded-lg text-sm">
                        Request Vehicle
                    </Button>
                </div>
            </div>
        </div>
    )
}
