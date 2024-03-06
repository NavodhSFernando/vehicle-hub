import React from 'react'
import { CiCalendar } from 'react-icons/ci'

export default function Datepicker() {
    return (
        //remove wrapper when using component
        //add this css code
        // .dateInput::-webkit-calendar-picker-indicator {
        //   opacity: 0;
        //   width: 100%;
        //   position: absolute;
        // }

        <div className="flex gap-2 items-center ">
            <CiCalendar strokeWidth={1} fontSize={24} className="text-[#283280] " />
            <div className="flex flex-col w-fit ">
                <label htmlFor="Pick-Up-Date">
                    <p className="text-[12px] opacity-80">Pick Up Date</p>
                </label>
                <input type="date" className="w-fit max-w-[130px] outline-none relative" />
            </div>
        </div>
    )
}
