import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'

export default function Header() {
    return (
        <nav className="bg-sky-100">
            <Search />
        </nav>
    )
}
