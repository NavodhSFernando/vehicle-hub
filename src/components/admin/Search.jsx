import React from 'react'

export default function Search() {
    return (
        <>
            <div className=" flex flex-col gap-5 bg-[#4B4B4B] py-20">
                <input type="text" placeholder="Search" className="px-5 py-2 w-fit rounded-lg placeholder:text-sm" />
            </div>
        </>
    )
}
