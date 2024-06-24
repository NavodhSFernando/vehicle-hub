import Cookies from 'js-cookie'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NavBarSide() {
    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem('jwtToken')
            await axios.post('http://localhost:5062/api/CustomerAuth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            // Clear the session storage and cookies
            sessionStorage.removeItem('jwtToken')
            Cookies.remove('customerId')

            // Redirect to the login page
            window.location.href = '/'
        } catch (error) {
            console.error('Logout failed:', error)
            alert(`Logout failed: ${error.message}`)
        }
    }

    return (
        <div className="bg-white flex flex-col w-1/4 p-5 h-fit m-4 rounded-xl text-lg">
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'flex flex-col pl-2 py-1 font-semibold' : 'flex flex-col pl-2 py-1'
                }
                to={`/account/viewprofile`}
                end
            >
                View Profile
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'flex flex-col pl-2 py-1 font-semibold' : 'flex flex-col pl-2 py-1'
                }
                to={`/account/viewongoingrentals`}
            >
                Ongoing Rentals
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'flex flex-col pl-2 py-1 font-semibold' : 'flex flex-col pl-2 py-1'
                }
                to={`/account/viewrentalhistory`}
            >
                Rental History
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'flex flex-col pl-2 py-1 font-semibold' : 'flex flex-col pl-2 py-1'
                }
                to={`/account/viewbillingdetails`}
            >
                Billing Details
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'flex flex-col pl-2 py-1 font-semibold' : 'flex flex-col pl-2 py-1'
                }
                to={`/account/viewnotificationcenter`}
            >
                Notifications
            </NavLink>
            <div className="flex flex-col pl-2 py-1 cursor-pointer" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    )
}
