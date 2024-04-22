import React, { useState } from 'react'
import { CiCalendar } from 'react-icons/ci'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '../../../lib/utils'
import { Button } from '../../../components/ui/button'
import { Calendar } from '../../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'

export default function Datepicker() {
    const [date, setDate] = React.useState()

    return (
        <div className="flex gap-2 items-center ">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={'outline'} className={cn('w-[180px] justify-start text-left', 'custom-button')}>
                        <CalendarIcon className="mr-2 h-6 w-6" style={{ color: '#283280' }} />
                        {date ? format(date, 'PPP') : <div className="font-[500]">Pick-Up Date</div>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
            </Popover>

            <style>{`
                .custom-button {
                    border: none; /* Remove the border */
                    outline: none; /* Remove the outline */
                }
            `}</style>
        </div>
    )
}
