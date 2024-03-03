'use client' //remove this when using
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

export default function NotificationBlock2() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        isOpen && (
            <div className="p-2.5 bg-white flex max-w-[350px] justify-between items-start w-full">
                <article>
                    <h1 className="text-base font-bold">Reservation confirmed.</h1>
                    <p className="text-sm  font-semibold pb-2.5">
                        CBI-2345 <span className="opacity-80">vehicle has been allocated for your reservation.</span>
                    </p>
                    <p className="text-sm opacity-50 font-bold">14 hours ago</p>
                </article>
                <button onClick={() => setIsOpen(false)}>
                    <IoClose fontSize={15} />
                </button>
            </div>
        )
    )
}
