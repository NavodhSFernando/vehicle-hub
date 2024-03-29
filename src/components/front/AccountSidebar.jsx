import React from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { ACCOUNT_SIDEBAR_LINKS } from './AccountSideBarLinks'

const linkClass = 'flex items-center gap-2 px-3 py-2 hover:bg-neutral-200 hover:no-underline rounded-sm text-lg'

// Update Sidebar component to pass sublinks and handle toggle functionality
export default function Sidebar() {
    return (
        <div className="bg-white flex flex-col w-1/4 p-3 h-fit m-4 rounded-xl">
            <div className="flex flex-col gap-0.5">
                {ACCOUNT_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink key={link.key} link={link} />
                ))}
            </div>
        </div>
    )
}

function SidebarLink({ link }) {
    const { pathname } = useLocation()

    return (
        <div>
            <NavLink
                to={link.path || '#'} // If there's no path, default to '#' to prevent navigation
                className={classNames(pathname.startsWith(link.path) ? 'text-' : 'text-neutral-700', linkClass)}
            >
                {link.label}
            </NavLink>
        </div>
    )
}
