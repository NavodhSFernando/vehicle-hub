import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="p-4 flex flex-col">
                <Header />
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    )
}
