import Footer from '../../components/front/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/front/NavBar'

export default function Account() {
    return (
        <div className="flex flex-col w-full h-full overflow-y-auto">
            <Navbar />
            <div className="p-4">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
