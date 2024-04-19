'use client'
import React from 'react'

export default function Datepicker({ date }) {
    return (
        <div className="flex gap-2 items-center ">
            <img
                className="w-[25px] h-[25px]"
                src="https://cdn.discordapp.com/attachments/510829749065744405/1212675542550192178/Vector.png?ex=66179d1b&is=6605281b&hm=fea40004a4f7a5b5e79a13729d89285e037065917cf3657060616887653080f4&"
                alt=""
            />
            <div className="flex flex-col w-fit ">
                <label htmlFor="Pick-Up-Date">
                    <p className="text-[12px] opacity-80">Pick Up Date</p>
                </label>
                <input
                    disabled={date ? true : false}
                    type="date"
                    className="w-fit max-w-[130px] dateInput outline-none relative "
                    value={'2024-03-30'}
                />
            </div>
        </div>
    )
}
