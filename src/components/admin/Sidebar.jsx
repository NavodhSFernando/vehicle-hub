import React, { useState } from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './SideBarLinks'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import LogoIcon from '../../assets/logos/VH-Icon.png'
import LogoType from '../../assets/logos/VH-Type.png'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#2c3e91] hover:no-underline rounded-sm text-base'

export default function Sidebar() {
    const [showSublinks, setShowSublinks] = useState({})

    const toggleSublinks = (key) => {
        setShowSublinks((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }))
    }

    return (
        <div className="bg-[#1a2255] flex flex-col w-72 p-3 text-white overflow-y-auto fixed h-screen ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
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
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-600">
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
        if (link.subLinks) {
            e.preventDefault()
            toggleSublinks(link.key)
        }
    }

    const isActive = pathname === link.path || link.subLinks?.some((subLink) => pathname === subLink.path)
    const linkClassNames = classNames(
        isActive ? 'text-[#FBDAC6] bg-[#2c3e91] font-normal' : 'text-[#D3D3D3] font-light',
        linkClass
    )

    return (
        <div>
            <NavLink to={link.path || '#'} className={linkClassNames} onClick={handleClick}>
                <span className="text-xl">{link.icon}</span>
                {link.label}
                {link.subLinks && <span className="ml-auto">{showSublinks ? <HiChevronUp /> : <HiChevronDown />}</span>}
            </NavLink>
            {showSublinks && link.subLinks && (
                <div className="pl-6 pb-4">
                    {link.subLinks.map((subLink) => (
                        <SidebarSubLink key={subLink.key} subLink={subLink} />
                    ))}
                </div>
            )}
        </div>
    )
}

function SidebarSubLink({ subLink }) {
    const { pathname } = useLocation()

    const isActive = pathname === subLink.path
    const subLinkClassNames = classNames(
        'flex items-center gap-2 font-light px-3 py-0.5 hover:bg-[#2c3e91] hover:no-underline rounded-sm text-sm',
        { 'text-[#FBDAC6] font-normal': isActive, 'text-[#D3D3D3] font-light': !isActive }
    )

    return (
        <NavLink to={subLink.path} className={subLinkClassNames}>
            {subLink.label}
        </NavLink>
    )
}
