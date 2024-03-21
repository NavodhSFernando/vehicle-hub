import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function Layout() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col w-screen h-screen overflow-y-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
