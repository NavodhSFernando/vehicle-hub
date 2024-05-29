import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBarSide from '@/src/components/front/NavBarSide'

export default function Account() {
    return (
        <>
            <div className="flex flex-row">
                <NavBarSide />
                <div className="flex flex-col w-3/4 h-full overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
