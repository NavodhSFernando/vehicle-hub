import React, { useState } from 'react'
import Datepicker from './Datepicker'
import TimePicker from './TimePicker'
import SearchButton from './SearchButton'
import { useNavigate } from 'react-router-dom'
import { addDays, isValid } from 'date-fns'

export default function BookingStrip() {
    const [startDate, setStartDate] = useState(null)
    const [startTime, setStartTime] = useState('')
    const [endDate, setEndDate] = useState(null)
    const [endTime, setEndTime] = useState('')
    const navigate = useNavigate()

    const handleDateFilter = () => {
        navigate('/vehiclefleet', { state: { startDate, startTime, endDate, endTime } })
    }

    const today = new Date()
    const minEndDate = isValid(startDate) ? addDays(new Date(startDate), 0) : today

    return (
        <div className="flex items-center justify-center">
            <div className="min-[1300px]:overflow-x-auto sm:px-[20px] px-[20px] pr-[30px] py-[20px] md:py-0 shadow-lg bg-white rounded-lg md:rounded-full">
                <ul className="flex items-center justify-center sm:flex-row flex-col gap-6 sm:gap-1 py-[15px]">
                    <li className="min-[1350px]:px-4">
                        <Datepicker 
                            minDate={today} 
                            datepicketrtext="Pick-up Date" 
                            value={startDate} 
                            onChange={setStartDate} 
                        />
                    </li>
                    <li className="min-[1300px]:px-4 sm:border-l-[1px] border-slate-400">
                        <TimePicker 
                            timepickertext="Pick-up Time" 
                            value={startTime} 
                            onChange={setStartTime} 
                        />
                    </li>
                    <li className="min-[1300px]:px-4 sm:border-l-[1px] border-slate-400">
                        <Datepicker 
                            minDate={minEndDate} 
                            datepicketrtext="Return Date" 
                            value={endDate} 
                            onChange={setEndDate} 
                        />
                    </li>
                    <li className="min-[1300px]:px-4 sm:border-l-[1px] border-slate-400">
                        <TimePicker 
                            timepickertext="Return Time" 
                            value={endTime} 
                            onChange={setEndTime} 
                        />
                    </li>
                    <li className="min-[1300px]:pl-10">
                        <SearchButton onClick={handleDateFilter} />
                    </li>
                </ul>
            </div>
        </div>
    )
}
