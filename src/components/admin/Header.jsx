import React from 'react'
import Search from './Search'
import { useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS } from './SideBarLinks'

export default function Header() {
    const { pathname } = useLocation()
    const currentLabel = DASHBOARD_SIDEBAR_LINKS.flatMap((link) => link.subLinks || []).find(
        (subLink) => subLink.path === pathname
    )?.label

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
