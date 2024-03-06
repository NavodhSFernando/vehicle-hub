import React from 'react'
import { Input } from '../ui/input'

export default function Search() {
    return (
        <div className=" flex flex-col items-end gap-5 bg-white p-2">
            <Input type="search" placeholder="Search" className="w-1/3 " />
        </div>
    )
}
