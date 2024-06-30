import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
    const { pathname } = useLocation()

    const isHomePage = pathname === '/'

    return (
        <div className="relative bg-slate-200 min-h-screen">
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-to-transparent z-0"></div>
            <NavBar className="relative z-10" />
            <div
                className={`${
                    !isHomePage
                        ? 'relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:min-h-[700px]'
                        : 'relative z-10 w-full'
                }`}
            >
                <Outlet />
            </div>
            <Footer className="relative z-10" />
        </div>
    )
}
