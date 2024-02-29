'use client' //remove this when using
import React, { useState } from 'react'

export default function NotificationBlock() {
    const [isOpen, setIsOpen] = useState(true)
    return (
        isOpen && (
            <div className="p-2.5 bg-white flex max-w-[350px] justify-between items-start w-full">
                <article>
                    <div className="flex gap-2.5">
                        <img
                            className="w-[50px] h-full"
                            src="https://cdn.discordapp.com/attachments/510829749065744405/1212780923964100608/pofile-img.png?ex=65f31540&is=65e0a040&hm=f9085860fd7fa1bf8650f35c6d3bd552b766fb88386966763b48a83d2d7878c8&"
                            alt=""
                        />
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
                    <img
                        className="w-[15px]"
                        src="https://cdn.discordapp.com/attachments/510829749065744405/1212781248335061052/action.png?ex=65f3158d&is=65e0a08d&hm=240bf3a4d0bd9cc86ae8de73ad68a3bc38d1153e052c30e30019917182a4f4f9&"
                        alt=""
                    />
                </button>
            </div>
        )
    )
}
