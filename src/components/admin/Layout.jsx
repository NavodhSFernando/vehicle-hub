import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen">
            <Sidebar />
            <div className="flex flex-col w-full h-full overflow-y-auto">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
