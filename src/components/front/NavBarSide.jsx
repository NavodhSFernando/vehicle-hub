import Cookies from 'js-cookie'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBarSide() {
    const handleLogout = () => {
        Cookies.remove('customerId')
    }

    return (
        <div className="bg-white flex flex-col w-1/4 p-5 h-fit m-4 rounded-xl text-lg">
            <NavLink className="flex flex-col pl-2 py-1" to={`/account/viewprofile`}>
                View Profile
            </NavLink>
            <NavLink className="flex flex-col pl-2 py-1" to={`/account/viewongoingrentals`}>
                Ongoing Rentals
            </NavLink>
            <NavLink className="flex flex-col pl-2 py-1" to={`/account/viewrentalhistory`}>
                Rental History
            </NavLink>
            <NavLink className="flex flex-col pl-2 py-1" to={`/account/viewbillingdetails`}>
                Billing Details
            </NavLink>
            <NavLink className="flex flex-col pl-2 py-1" to={`/account/viewnotificationcenter`}>
                Notifications
            </NavLink>
            <NavLink className="flex flex-col pl-2 py-1" to="/vehiclefleet">
                Log Out
            </NavLink>
        </div>
    )
}
