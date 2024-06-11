import React, { useState } from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import SearchButton from './SearchButton'
import { useNavigate } from 'react-router-dom'

export default function BookingStrip({ onDateFilter }) {
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState('')
    const [endTime, setEndTime] = useState('')
    const navigate = useNavigate()

    const handleDateFilter = () => {
        navigate('/vehiclefleet')
    }

    return (
        <div className="flex items-center justify-center">
            <div className="min-[1300px]:overflow-x-auto px-[20px] shadow-lg bg-white rounded-lg min-[1300px]:rounded-full">
                <ul className="flex items-center justify-center min-[1300px]:flex-row flex-col gap-1 py-[15px]">
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
                    <li className="min-[1300px]:pl-10">
                        <SearchButton onClick={handleDateFilter} />
                    </li>
                </ul>
            </div>
        </div>
    )
}
