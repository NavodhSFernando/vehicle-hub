import Cookies from 'js-cookie'
import React from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'

export default function NavBarSide() {
    const navigate = useNavigate()

    const { customerId } = Cookies.get('customerId')
    if (!customerId) {
        console.error('customer Id is not available')
        return
    }

    const handleLogout = () => {
        Cookies.remove('customerId')
    }

    return (
        <div className="bg-white flex flex-col w-1/4 p-3 h-fit m-4 rounded-xl">
            <NavLink className="flex flex-col gap-0.5" to={`/account/viewprofile/${customerId}`}>
                View Profile
            </NavLink>
            <NavLink className="flex flex-col gap-0.5" to={`/account/viewongoingrentals/${customerId}`}>
                Ongoing Rentals
            </NavLink>
            <NavLink className="flex flex-col gap-0.5" to={`/account/viewrentalhistory/${customerId}`}>
                Rental History
            </NavLink>
            <NavLink className="flex flex-col gap-0.5" to={`/account/viewbillingdetails/${customerId}`}>
                Billing Details
            </NavLink>
            <NavLink className="flex flex-col gap-0.5" to={`/account/viewnotificationcenter/${customerId}`}>
                Notifications
            </NavLink>
            <NavLink className="flex flex-col gap-0.5" to="/vehiclefleet" onClick={() => handleLogout()}>
                Log Out
            </NavLink>
        </div>
    )
}
