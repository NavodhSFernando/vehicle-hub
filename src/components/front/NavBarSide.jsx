import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBarSide() {
    const navigate = useNavigate()
    return (
        <div className="w-full max-w-[360px] p-5 flex flex-col gap-5 bg-white">
            <a href="#" className="text-lg opacity-50 font-semibold">
                Account Details
            </a>
            <NavLink className="text-lg opacity-50 font-semibold">Ongoing Rentals</NavLink>
            <a href="#" className="text-lg opacity-50 font-semibold">
                Rentals History
            </a>
            <a href="#" className="text-lg opacity-50 font-semibold">
                Billing Details
            </a>
            <a href="#" className="text-lg opacity-50 font-semibold">
                Notifications
            </a>
            <a href="#" className="text-lg opacity-50 font-semibold">
                Log Out
            </a>
        </div>
    )
}
