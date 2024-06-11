import React, { useState } from 'react'
import Search from '../../../assets/Icons/search.svg'

const SearchStrip = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        onSearch(searchQuery)
    }

    return (
        <div>
            <div className="w-[1013px] max-h-[43px] flex bg-white rounded-[64px]">
                <input
                    type="text"
                    className="w-full h-[43px] rounded-[64px] pl-[30px] outline-none"
                    placeholder="Search something here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    className="flex justify-center items-center gap-[8px] w-[124px] h-[43px] bg-[#283280] text-[#FBDAC6] rounded-[64px]"
                    onClick={handleSearch}
                >
                    <img src={Search} alt="Search icon" />
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchStrip
