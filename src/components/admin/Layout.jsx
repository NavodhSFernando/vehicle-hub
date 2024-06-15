import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100">
            <Sidebar />
            <div className="flex flex-col flex-1 ml-72 h-screen">
                <Header />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
