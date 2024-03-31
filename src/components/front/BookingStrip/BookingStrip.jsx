import React from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import SearchButton from './SearchButton'

export default function BookingStrip() {
    return (
        <div className="flex  items-center justify-center ">
            <div className="min-[1300px]:overflow-x-auto px-20 shadow-lg bg-white rounded-lg min-[1300px]:rounded-full">
                <ul className="flex min-[1300px]:flex-row flex-col gap-5  py-5">
                    <li className="min-[1350px]:pr-10">
                        <label htmlFor="Pick-Up-Date">
                            <p className="text-[12px] opacity-80 pl-8">Pick Up Date</p>
                        </label>
                        <Datepicker />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                         <label htmlFor="Pick-Up-Time">
                            <p className="text-[12px] opacity-80 pl-7">Pick Up Time</p>
                        </label>
                        <TimePicker />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                        <label htmlFor="Drop-off-Date">
                            <p className="text-[12px] opacity-80 pl-8">Drop off Date</p>
                        </label>
                        <Datepicker />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                        <label htmlFor="Drop-off-time">
                            <p className="text-[12px] opacity-80 pl-7">Drop off Time</p>
                        </label>
                        <TimePicker />
                    </li>
                    <li className="min-[1300px]:pl-10">
                        <SearchButton />
                    </li>
                </ul>
            </div>
        </div>
    )
}
