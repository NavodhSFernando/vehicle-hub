import React, { useState } from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './SideBarLinks'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import LogoIcon from '../../assets/logos/VH-Icon.png'
import LogoType from '../../assets/logos/VH-Type.png'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

// Update Sidebar component to pass sublinks and handle toggle functionality
export default function Sidebar() {
    const [showSublinks, setShowSublinks] = useState({})

    const toggleSublinks = (key) => {
        setShowSublinks((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }))
    }

    return (
        <div className="bg-neutral-900 flex flex-col w-60 p-3 text-white">
            <div className="flex items-center gap-2 px-1 py-3">
                <img src={LogoIcon} alt="logo-icon" className="w-10" />
                <span>
                    <img src={LogoType} alt="logo-type" className="w-32" />
                </span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((link) => (
                    <SidebarLink
                        key={link.key}
                        link={link}
                        toggleSublinks={toggleSublinks}
                        showSublinks={showSublinks[link.key]}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                    <SidebarLink
                        key={link.key}
                        link={link}
                        toggleSublinks={toggleSublinks}
                        showSublinks={showSublinks[link.key]}
                    />
                ))}
                <div
                    className={classNames(linkClass, 'cursor-pointer text-red-500')}
                    onClick={() => toggleSublinks('logout')}
                >
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    )
}

function SidebarLink({ link, toggleSublinks, showSublinks }) {
    const { pathname } = useLocation()

    const handleClick = (e) => {
        // Prevent NavLink default behavior if there are subLinks
        if (link.subLinks) {
            e.preventDefault()
            toggleSublinks(link.key)
        }
    }

    return (
        <div>
            <NavLink
                to={link.path || '#'} // If there's no path, default to '#' to prevent navigation
                className={classNames(
                    pathname.startsWith(link.path) ? 'bg-neutral-700 text-white' : 'text-neutral-400',
                    linkClass
                )}
                onClick={handleClick} // Attach the click handler
            >
                <span className="text-xl">{link.icon}</span>
                {link.label}
                {link.subLinks && <span className="ml-auto">{showSublinks ? <HiChevronUp /> : <HiChevronDown />}</span>}
            </NavLink>
            {showSublinks && link.subLinks && (
                <div className="pl-6">
                    {link.subLinks.map((subLink) => (
                        <SidebarSubLink key={subLink.key} subLink={subLink} />
                    ))}
                </div>
            )}
        </div>
    )
}

// Separate component for a single sublink
function SidebarSubLink({ subLink }) {
    const { pathname } = useLocation()

    return (
        <NavLink
            to={subLink.path}
            className={classNames(
                'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base',
                { 'bg-neutral-700 text-white': pathname === subLink.path }
            )}
        >
            <span className="text-xl">{subLink.icon}</span>
            {subLink.label}
        </NavLink>
    )
}
