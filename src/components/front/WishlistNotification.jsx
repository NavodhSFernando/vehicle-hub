'use client' //remove this when using
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import aqua from '../../assets/vehicles/aqua.png'

export default function NotificationBlock() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        isOpen && (
            <div className="p-2.5 bg-white flex max-w-[350px] justify-between items-start w-full">
                <article>
                    <div className="flex gap-2.5">
                        <img className="w-12 h-full mx-2 mt-3 scale-x-[-1]" src={aqua} alt="Toyota Aqua" />
                        <span>
                            <h1 className="text-base font-bold">Toyota Aqua</h1>
                            <p className="text-sm opacity-50 font-semibold pb-2.5">2016 | Hybrid | 4 Person</p>
                            <p className="text-base  font-bold">
                                Rs 10,000/<span className="text-sm opacity-50"> day</span>
                            </p>
                        </span>
                    </div>
                </article>
                <button onClick={() => setIsOpen(false)}>
                    <IoClose fontSize={15} />
                </button>
            </div>
        )
    )
}
