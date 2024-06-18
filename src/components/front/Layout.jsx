import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
    const { pathname } = useLocation()

    const isHomePage = pathname === '/'

    return (
        <div className="bg-slate-100">
            <NavBar />
            <div className={`${!isHomePage ? 'max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-28 lg:min-h-[700px]' : ''}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
