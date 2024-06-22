import React from 'react'
import Search from './Search'
import { useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS } from './SideBarLinks'

export default function Header() {
    const { pathname } = useLocation()

    // Find the sublink label or fallback to the main link label
    const currentLink = DASHBOARD_SIDEBAR_LINKS.flatMap((link) =>
        link.subLinks ? link.subLinks.map((subLink) => ({ ...subLink, parentLabel: link.label })) : [link]
    ).find((link) => link.path === pathname)

    const currentLabel = currentLink?.label || currentLink?.parentLabel || ''

    return (
        <nav className="">
            <Search />
            <h1 className="flex flex-col items-start font-bold text-2xl text-gray-800 mb-10 mt-5 ml-5">
                {currentLabel}
            </h1>
            <hr className="pb-3 border-t-2 border-stone-200 mx-5" />
        </nav>
    )
}
