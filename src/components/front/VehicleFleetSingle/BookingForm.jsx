import React from 'react'
import { format } from 'date-fns'
import { CiCalendar, CiClock2 } from 'react-icons/ci'

export default function BookingForm({ startDate, startTime, endDate, endTime }) {
    return (
        <div className="w-full max-w-[850px] p-6 flex flex-col bg-white rounded-lg">
            <article className="pb-5">
                <h2 className="text-xl font-bold">Rental Info</h2>
                <p className="text-sm text-slate-500">Your rental dates and times</p>
            </article>
            <form>
                <div className="w-full flex justify-between">
                    <div className="w-[48%] flex flex-col">
                        <div className="w-full flex items-center gap-2 pb-5">
                            <input type="radio" checked readOnly />
                            <label className="block text-sm font-medium text-gray-700">Pick-up</label>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <div className="flex items-center p-2 border border-black border-opacity-10 rounded-md">
                                <CiCalendar className="mr-2 h-4 w-4" />
                                <input
                                    type="date"
                                    className="w-full border-0 p-0 outline-none"
                                    value={endDate}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col pt-5">
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <div className="flex items-center p-2 border border-black border-opacity-10 rounded-md">
                                <CiClock2 className="mr-2 h-4 w-4" />
                                <input
                                    type="time"
                                    className="w-full border-0 p-0 outline-none"
                                    value={startTime}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <div className="w-full flex items-center gap-2 pb-5">
                            <input type="radio" checked readOnly />
                            <label className="block text-sm font-medium text-gray-700">Drop Off</label>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <div className="flex items-center p-2 border border-black border-opacity-10 rounded-md">
                                <CiCalendar className="mr-2 h-4 w-4" />
                                <input
                                    type="date"
                                    className="w-full border-0 p-0 outline-none"
                                    value={endDate}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col pt-5">
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <div className="flex items-center p-2 border border-black border-opacity-10 rounded-md">
                                <CiClock2 className="mr-2 h-4 w-4" />
                                <input
                                    type="time"
                                    className="w-full border-0 p-0 outline-none"
                                    value={endTime}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
