import React from 'react'
import { Input } from '../ui/input'

export default function Search() {
    return (
        <div className=" bg-white p-2">
            <Input type="search" placeholder="Search" className="w-[540px] " />
        </div>
    )
}
