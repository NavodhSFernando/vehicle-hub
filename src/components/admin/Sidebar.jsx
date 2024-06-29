import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineLogout, HiOutlineMenu, HiOutlineX } from 'react-icons/hi' // Import the HiOutlineX icon for close
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from './SideBarLinks'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import LogoIcon from '../../assets/logos/VH-Icon.png'
import LogoType from '../../assets/logos/VH-Type.png'
import axios from 'axios'
import { getUserRoles } from '../../getUserRoles'

const linkClass =
    'flex items-center gap-2 font-light px-3 py-2 hover:bg-[#2c3e91] hover:no-underline rounded-sm text-base'

export default function Sidebar() {
    const [showSublinks, setShowSublinks] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [userRoles, setUserRoles] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const roles = getUserRoles()
        setUserRoles(roles)
    }, [])

    const toggleSublinks = (key) => {
        setShowSublinks((prevState) => ({
            ...prevState,
            [key]: !prevState[key]
        }))
    }

    const logout = async () => {
        try {
            await axios.post(`http://localhost:5062/api/EmployeeAuth/logout`)
            navigate('/admin-login')
        } catch (error) {
            console.error('Failed to logout!')
        }
    }

    const filteredLinks = DASHBOARD_SIDEBAR_LINKS.filter((link) => {
        if (link.role && !userRoles.includes(link.role)) {
            return false
        }
        return true
    })

    return (
        <div>
            {/* Hamburger and Close Button */}
            <div className="flex flex-col items-center absolute left-0 top-32 px-3 py-2 bg-[#283280] xl:hidden">
                {!isOpen ? (
                    <HiOutlineMenu className="text-white text-2xl cursor-pointer" onClick={() => setIsOpen(true)} />
                ) : (
                    true
                )}
            </div>
            {/* Sidebar */}
            <div
                className={classNames(
                    'bg-[#1a2255] flex flex-col w-72 z-20 p-3 text-white overflow-y-auto fixed h-screen xl:fixed xl:h-screen ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    { hidden: !isOpen, 'xl:flex': true }
                )}
            >
                {isOpen ? (
                    <HiOutlineX
                        className="text-white text-2xl cursor-pointer ml-auto"
                        onClick={() => setIsOpen(false)}
                    />
                ) : (
                    true
                )}
                <div className="items-center gap-2 px-1 py-3 hidden xl:flex">
                    <img src={LogoIcon} alt="logo-icon" className="w-10" />
                    <span>
                        <img src={LogoType} alt="logo-type" className="w-32" />
                    </span>
                </div>
                <div className="py-8 flex flex-1 flex-col gap-0.5">
                    {filteredLinks.map((link) => (
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
                    <div className={classNames(linkClass, 'cursor-pointer text-red-500')} onClick={logout}>
                        <span className="text-xl">
                            <HiOutlineLogout />
                        </span>
                        Logout
                    </div>
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
