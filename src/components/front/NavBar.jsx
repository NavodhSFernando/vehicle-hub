import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsBookmarkStar } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { IoNotifications } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import logo from '../../assets/logos/VH-Icon.png'
import { RxHamburgerMenu } from 'react-icons/rx'
import NotificationDropdown from './NotificationDropDown'
import WishlistDropdown from './WishlistDropDown'
import Cookies from 'js-cookie'

const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(true)

    const [isDropdownOpen] = useState(true)
    const handleNavigate = () => {
        console.log('Navigating to all notifications view')
    }

    const [clicked, setClicked] = useState(false)
    const handleClick = () => {
        setClicked(!clicked)
    }

    const [logged, setLogged] = useState(false)
    const handleLogged = () => {
        setLogged(!logged)
    }

    const [notification, setNotification] = useState(false)
    const handleNotification = () => {
        setNotification(!notification)
    }

    const [showNav, setShowNav] = useState(false)
    const toggleNav = () => {
        setShowNav(!showNav)
    }

    useEffect(() => {
        const isLoggedIn = Cookies.get('customerId');
        setLoggedIn(!!isLoggedIn);
    }, []);

    return (
        <nav className="absolute top-0 inset-x-0 z-10 bg-gradient-to-b from-primary w-screen">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 my-3">
                <div className="flex flex-row gap-5 lg:gap-0 md:items-center items-start justify-between">
                    <div className="flex w-52">
                        <img className="block md:w-16 w-12" src={logo} alt="Vehicle Hub" />
                    </div>

                    {/* Navigation Links */}
                    <div className={`lg:flex lg:flex-1 ${showNav ? 'block' : 'hidden'} justify-center`}>
                        <div className="flex sm:space-x-4">
                            <NavLink
                                to="/"
                                className="text-[#FBDAC6] px-3 py-2 text-sm font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/vehiclefleet"
                                className="text-[#FBDAC6] px-3 py-2 text-sm font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Vehicle Fleet
                            </NavLink>
                            <NavLink
                                to="/faq"
                                className="text-[#FBDAC6] px-3 py-2 text-sm font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                FAQ
                            </NavLink>
                            <NavLink
                                to="/contact"
                                className="text-[#FBDAC6] px-3 py-2 text-sm font-medium hover:border-b-[1px] hover:border-[#FBDAC6]"
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    {/* Sign In and Sign Up buttons */}
                    {!loggedIn ? (
                        <div className="flex items-center">
                            <NavLink to="/login">
                                <button className="border-yellowtheme border-2 text-secondary px-3 py-2 rounded-md text-sm font-medium">
                                    Sign In
                                </button>
                            </NavLink>
                            <NavLink to="/signup">
                                <button className="ml-4 bg-yellowtheme border-secondary border-2 text-primary px-3 py-2 rounded-md text-sm font-medium">
                                    Sign Up
                                </button>
                            </NavLink>
                        </div>
                    ) : (
                        <div className="flex gap-16">
                            <div className="text-yellowtheme cursor-pointer" onClick={handleClick}>
                                {clicked ? (
                                    <>
                                        <BsBookmarkStarFill fontSize={28} style={{ color: '#FBDAC6' }} />
                                        <WishlistDropdown
                                            isOpen={isDropdownOpen}
                                            setIsOpen={() => {}}
                                            onNavigate={handleNavigate}
                                        />
                                    </>
                                ) : (
                                    <BsBookmarkStar fontSize={28} style={{ color: '#FBDAC6' }} />
                                )}
                            </div>

                            <div className="text-yellowtheme cursor-pointer" onClick={handleNotification}>
                                {notification ? (
                                    <>
                                        <IoNotifications fontSize={28} style={{ color: '#FBDAC6' }} />
                                        <NotificationDropdown
                                            isOpen={isDropdownOpen}
                                            setIsOpen={() => {}}
                                            onNavigate={handleNavigate}
                                        />
                                    </>
                                ) : (
                                    <IoMdNotificationsOutline fontSize={28} style={{ color: '#FBDAC6' }} />
                                )}
                            </div>
                            <NavLink to="/account/notificationcenter">
                                <div className="text-yellowtheme cursor-pointer" onClick={handleLogged}>
                                    {logged ? (
                                        <FaUserCircle fontSize={24} style={{ color: '#FBDAC6' }} />
                                    ) : (
                                        <FaRegUserCircle style={{ color: '#FBDAC6' }} fontSize={24} />
                                    )}
                                </div>
                            </NavLink>
                        </div>
                    )}
                    {/* Hamburger Icon for Small Screens */}
                    <div className="lg:hidden ml-auto">
                        <button onClick={toggleNav}>
                            <RxHamburgerMenu
                                className="w-10 h-10 text-yellowtheme"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ color: '#FBDAC6' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                    style={{ color: '#FBDAC6' }}
                                />
                            </RxHamburgerMenu>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
