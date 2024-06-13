import React from 'react';
import { IoSearchSharp } from 'react-icons/io5';

export default function SearchButton({ onClick }) {
    return (
        <button onClick={onClick} className="text-white bg-[#283280] hover:bg-[#283299] py-2.5 px-5 w-fit rounded-full text-sm flex gap-2 items-center font-semibold">
            <IoSearchSharp fontSize={24} />
            Search
        </button>
    );
}
