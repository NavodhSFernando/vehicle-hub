import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100">
            <Sidebar />
            <div className="flex flex-col flex-1 h-full xl:ml-72">
                <Header />
                <div className="p-4 w-screen lg:w-full">
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}
