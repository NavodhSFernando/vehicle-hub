import React from 'react'
import { FaRegClock } from 'react-icons/fa'

export default function TimePicker() {
    return (
        //add this css code
        // .dateInput::-webkit-calendar-picker-indicator {
        //   opacity: 0;
        //   width: 100%;
        //   position: absolute;
        // }
        <div className="flex gap-2 items-center">
            <FaRegClock strokeWidth={1} fontSize={22} className="text-[#283280]" />
            <div className="flex flex-col w-fit">
                <input type="time" className="w-fit max-w-[120px] outline-none relative " placeholder="10:00:00" />
            </div>
            <style>
                {`
                    input[type="time"]::-webkit-calendar-picker-indicator {
                        opacity: 0;
                        width: 100%;
                        position: absolute;
                    }                      
                `}
            </style>
        </div>
    )
}
