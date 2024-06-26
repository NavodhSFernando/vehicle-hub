import React, { useEffect, useState } from 'react'
import { CiCalendar } from 'react-icons/ci'
import { format, isValid, isAfter, isSameDay  } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../../../components/ui/button'
import { Calendar } from '../../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'

export default function Datepicker({ datepicketrtext, value, onChange, minDate, disabledDates }) {
    const [date, setDate] = useState(value || null)

    useEffect(() => {
        setDate(value)
    }, [value])

    const handleDateSelect = (newDate) => {
        setDate(newDate)
        if (onChange) {
            onChange(newDate)
        }
    };

    const isDateDisabled = (date) => {
        return (minDate && !isAfter(date, minDate)) || (disabledDates && disabledDates.some(disabledDate => isSameDay(date, disabledDate)));
    };

    return (
        <div className="flex gap-2 items-center ">
            <Popover>
                <PopoverTrigger asChild>
                    <div className="flex flex-col justify-center items-start">
                        <div className="font-[500] ml-[53px] text-[15px] text-[#525252]">{datepicketrtext}</div>
                        <Button
                            variant={'outline'}
                            className={cn('md:w-[180px] justify-start text-left flex gap-[5px]', 'custom-button')}
                            style={{ boxShadow: 'none', background: 'transparent' }}
                        >
                            <CalendarIcon className="lg:mr-2 h-6 md:w-6" style={{ color: '#283280' }} />
                            {isValid(date) ? format(date, 'PPP') : 'Select date'}
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar 
                        mode="single" 
                        selected={date} 
                        onSelect={handleDateSelect} 
                        initialFocus 
                        disabled={isDateDisabled}
                    />
                </PopoverContent>
            </Popover>

            <style>{`
                .custom-button {
                    border: none; /* Remove the border */
                    outline: none; /* Remove the outline */
                }

                .custom-button:hover {
                    background: transparent !important; /* Remove background change on hover */
                }
            `}</style>

            {/* Custom style for input placeholder */}
            <style>{`
                /* Default placeholder value */
                input[type="date"]::placeholder {
                    color: #ccc;
                    font-style: italic;
                }
            `}</style>
        </div>
    )
}
