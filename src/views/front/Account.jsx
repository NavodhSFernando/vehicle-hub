import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarSide from '../../components/front/NavBarSide'
import AccountSidebar from '../../components/front/AccountSidebar'
import Cookies from 'js-cookie'

export default function Account() {
    const customerId = Cookies.get('customerId')
    console.log('customerId', customerId)
    if (!customerId) {
        console.error('customer Id is not available')
    }

    return (
        <>
            <div className="flex flex-row">
                <NavBarSide />
                <div className="flex flex-col w-3/4 h-full overflow-y-auto p-4">
                    <Outlet context={customerId} />
                </div>
            </div>
        </>
    )
}
