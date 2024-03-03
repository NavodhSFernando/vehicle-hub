'use client' //remove this when using
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import aqua from '../../assets/vehicles/aqua.png'

export default function NotificationBlock() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        isOpen && (
            <div className="p-2.5 bg-white flex max-w-[350px] justify-between items-start w-full">
                <article>
                    <div className="flex gap-2.5">
                        <img className="w-[50px] h-full scale-x-[-1] mt-2" src={aqua} alt="" />
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
                    <IoMdClose fontSize={15} />
                </button>
            </div>
        )
    )
}
