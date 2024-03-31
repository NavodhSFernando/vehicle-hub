import React from 'react'

import { format } from 'date-fns'
import { CiCalendar as CalendarIcon } from 'react-icons/ci'

import { cn } from '../../../lib/utils'
import { Button } from '../../ui/button'
import { Calendar } from '../../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'

export default function BookingForm() {
    const [date, setDate] = React.useState(Date())
    return (
        <div className="w-full max-w-[850px] p-6 flex flex-col bg-white rounded-lg">
            <article className="pb-5">
                <h2 className="text-xl font-bold">Rental Info</h2>
                <p className="text-sm text-slate-500">Please select your rental dates and times</p>
            </article>
            <form action="">
                <div className="w-full flex items-center gap-2 pb-5">
                    <input type="radio" checked />
                    <label
                        htmlFor={'pickup'}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Pick-up
                    </label>
                </div>
                <div className="w-full flex flex-col  ">
                    <label
                        htmlFor={'pickup'}
                        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    ' justify-start text-left font-normal w-full',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="w-full flex flex-col pt-5 ">
                    <label
                        htmlFor={'pickup'}
                        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Time
                    </label>
                    <input
                        type="time"
                        className="w-full border border-black border-opacity-10 p-2  dateInput outline-none relative"
                        value="10:00:00"
                    />
                </div>
                <div className="w-full flex items-center gap-2 pb-5 pt-10">
                    <input type="radio" checked />
                    <label
                        htmlFor={'pickup'}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Drop Off
                    </label>
                </div>
                <div className="w-full flex flex-col  ">
                    <label
                        htmlFor={'pickup'}
                        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn(
                                    ' justify-start text-left font-normal w-full',
                                    !date && 'text-muted-foreground'
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="w-full flex flex-col pt-5 ">
                    <label
                        htmlFor={'pickup'}
                        className="text-sm  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Time
                    </label>
                    <input
                        type="time"
                        className="w-full border border-black border-opacity-10 p-2  dateInput outline-none relative"
                        value="10:00:00"
                    />
                </div>
            </form>
        </div>
    )
}
