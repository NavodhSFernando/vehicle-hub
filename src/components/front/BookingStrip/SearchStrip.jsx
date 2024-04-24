import React from 'react'
import Search from '../../../assets/Icons/search.svg'

export default function SearchStrip() {
    return (
        <div>
            <div className="w-[1013px] max-h-[43px] flex bg-white rounded-[64px]">
                <input
                    type="text"
                    className="w-full h-[43px] rounded-[64px] pl-[30px] outline-none"
                    placeholder="Search something here"
                />
                <button className="flex justify-center items-center gap-[8px] w-[124px] h-[43px] bg-[#283280] text-[#FBDAC6] rounded-[64px]">
                    <img src={Search}></img>
                    Search
                </button>
            </div>
        </div>
    )
}
