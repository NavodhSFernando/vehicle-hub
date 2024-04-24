import React from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import SearchButton from './SearchButton'

export default function BookingStrip() {
    return (
        <div className="flex items-center justify-center">
            <div className="min-[1300px]:overflow-x-auto px-[20px] shadow-lg bg-white rounded-lg min-[1300px]:rounded-full">
                <ul className="flex items-center justify-center min-[1300px]:flex-row flex-col gap-1 py-[15px]">
                    <li className="min-[1350px]:pr-10 flex flex-col justify-center">
                        <Datepicker datepicketrtext="Pick-up Date" />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Pick-up Time" />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                        <Datepicker datepicketrtext="Return Date" />
                    </li>
                    <li className="min-[1300px]:px-10 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Return Time" />
                    </li>
                    <li className="min-[1300px]:pl-10">
                        <SearchButton />
                    </li>
                </ul>
            </div>
        </div>
    )
}
