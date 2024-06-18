import React, { useState, useEffect } from 'react'
import { FaRegClock } from 'react-icons/fa'

export default function TimePicker(props) {
    const intervals = generateTimeIntervals()
    const [selectedTime, setSelectedTime] = useState(props.value || '')

    useEffect(() => {
        setSelectedTime(props.value)
    }, [props.value])

    function generateTimeIntervals() {
        let intervals = []
        for (let hour = 0; hour < 24; hour++) {
            for (let minute of ['00', '30']) {
                intervals.push(`${hour.toString().padStart(2, '0')}:${minute}`)
            }
        }
        return intervals
    }

    const handleTimeChange = (event) => {
        const newTime = event.target.value
        setSelectedTime(newTime)
        if (props.onChange) {
            props.onChange(newTime)
        }
    }

    return (
        <div className="flex flex-col justify-center items-start gap-[6px]">
            <div className="font-[500] ml-[70px] text-[15px] text-[#525252]">{props.timepickertext}</div>
            <div className="flex justify-center gap-[10px] items-center w-[180px]">
                <FaRegClock strokeWidth={1} fontSize={22} className="text-[#283280]" />
                <div className="flex flex-col w-fit">
                    <input
                        type="time"
                        className="font-[500] text-[16px] w-fit outline-none relative"
                        value={selectedTime}
                        step={1800}
                        list="time-intervals"
                        onChange={handleTimeChange}
                    />
                    <datalist id="time-intervals">
                        {intervals.map((interval) => (
                            <option key={interval} value={interval} />
                        ))}
                    </datalist>
                </div>
                <style>
                    {`
                        input[type="time"]::-webkit-calendar-picker-indicator {
                            opacity: 0;
                            width: 100%;
                            position: absolute;
                            -webkit-appearance: none;
                        }
                        input[type="time"]::-webkit-input-placeholder {
                            color: transparent;
                        }
                        input[type="time"]::-moz-placeholder {
                            color: transparent;
                        }
                        input[type="time"]:-ms-input-placeholder {
                            color: transparent;
                        }
                        input[type="time"]::-moz-focus-inner {
                            border: 0;
                        }
                    `}
                </style>
            </div>
        </div>
    )
}
