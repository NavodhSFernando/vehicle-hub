import React from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import SearchButton from './SearchButton'

export default function BookingStrip() {
    return (
        <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center w-[1013px] shadow-lg bg-white rounded-lg">
                <ul className="flex justify-center items-center min-[1300px]:flex-row flex-col gap-5 py-5">
                    <li className="min-[1350px]:px-7">
                        <Datepicker datepicketrtext="Pick-up Date" />
                    </li>
                    <li className="min-[1300px]:px-7 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Pick-up Time" />
                    </li>
                    <li className="min-[1300px]:px-7 border-l-[1px] border-slate-400">
                        <Datepicker datepicketrtext="Return Date" />
                    </li>
                    <li className="min-[1300px]:px-7 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Return Time" />
                    </li>
                </ul>
            </div>
        </div>
    )
}
