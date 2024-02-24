import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="bg-sky-100">
            <div>Header</div>
            <NavLink to="/">Home Page</NavLink>
            <NavLink to="/account">Account</NavLink>
        </nav>
    )
}
