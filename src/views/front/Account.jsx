import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../../components/front/AccountSidebar'

export default function Account() {
    return (
        <>
            <div className="flex flex-row">
                <AccountSidebar />
                <div className="flex flex-col w-3/4 h-full overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
