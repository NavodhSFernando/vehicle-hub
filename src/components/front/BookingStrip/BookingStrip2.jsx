import React, { useState } from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import { IoSearchSharp } from 'react-icons/io5'

const BookingStrip = ({ onDateFilter }) => {
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')

    const handleDateFilter = () => {
        onDateFilter({
            startDate,
            startTime,
            endDate,
            endTime
        })
    }

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-[1013px] shadow-lg bg-white rounded-lg">
                <ul className="flex justify-center items-center min-[1300px]:flex-row flex-col gap-5 py-5 min-[1300px]:mr-5">
                    <li className="min-[1350px]:px-4">
                        <Datepicker datepicketrtext="Pick-up Date" onChange={setStartDate} />
                    </li>
                    <li className="min-[1300px]:px-4 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Pick-up Time" onChange={setStartTime} />
                    </li>
                    <li className="min-[1300px]:px-4 border-l-[1px] border-slate-400">
                        <Datepicker datepicketrtext="Return Date" onChange={setEndDate} />
                    </li>
                    <li className="min-[1300px]:px-4 border-l-[1px] border-slate-400">
                        <TimePicker timepickertext="Return Time" onChange={setEndTime} />
                    </li>
                    <li className="min-[1300px]:pl-5">
                        <button
                            onClick={handleDateFilter}
                            className="text-white bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-full text-sm flex gap-2 items-center font-semibold"
                        >
                            <IoSearchSharp fontSize={24} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BookingStrip
