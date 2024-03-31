import React from 'react'

export default function TimePicker() {
    return (
        <div className="flex gap-2 items-center">
            <img
                className="w-[25px] h-[25px]"
                src="https://cdn.discordapp.com/attachments/510829749065744405/1212675541820375060/clock.png?ex=66179d1b&is=6605281b&hm=ea23601222e55c3a66f0391c75226f2a6dad0bc4b03c9a675c5e040ed926075c&"
                alt=""
            />
            <div className="flex flex-col w-fit">
                <label htmlFor="Pick-Up-Date">
                    <p className="text-[12px] opacity-80">Pick Up Time</p>
                </label>
                <input type="time" className="w-fit max-w-[120px] dateInput outline-none relative" value="10:00:00" />
            </div>
        </div>
    )
}
