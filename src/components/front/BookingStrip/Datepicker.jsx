import React from 'react'
import { CiCalendar } from 'react-icons/ci'

export default function Datepicker() {
    return (
        <div className="flex gap-2 items-center ">
            <CiCalendar strokeWidth={1} fontSize={24} className="text-[#283280] " />
            <div className="flex flex-col w-fit ">
                <input type="date" className="w-fit max-w-[120px] outline-none relative" />
            </div>
            <style>
                {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        display: none;
                        appearance: none;
                    }     
                    input[type="date"] {
                        text-transform: uppercase;
                    }                 
                `}
            </style>
        </div>
    )
}
