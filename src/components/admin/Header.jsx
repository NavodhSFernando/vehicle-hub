import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="bg-sky-100">
            <div>Header</div>
            <NavLink to="/admin/dashboard">Dashboard</NavLink>
            <NavLink to="/admin/reservations">Reservation</NavLink>
        </nav>
    )
}
