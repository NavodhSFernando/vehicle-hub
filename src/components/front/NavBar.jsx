import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
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
import { Button } from '../ui/button'
import axios from 'axios'

const Navbar = () => {
    const location = useLocation()
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
    const [notificationCount, setnotificationCount] = useState(0)

    const customerId = Cookies.get('customerId')

    useEffect(() => {
        const isLoggedIn = Cookies.get('customerId')
        isLoggedIn ? setLoggedIn(true) : setLoggedIn(false)

        const fetchNotifications = async () => {
            try {
                const decryptResponse = await axios.get(`http://localhost:5062/api/Encryption/decrypt/${customerId}`)
                const decryptedId = decryptResponse.data.decryptedUserId
                
                const response = await axios.get(`http://localhost:5062/api/Notification/Notifications/${decryptedId}`)
                const filteredNotifications = response.data.filter((notification) => {
                    return notification.isRead === false
                })

                setnotificationCount(filteredNotifications.length)
            } catch (error) {
                console.error('Error fetching notifications:', error)
            }
        }
        fetchNotifications()
    }, [])

    const isHomePage = location.pathname === '/'

    return (
        <nav className={`absolute top-0 inset-x-0 z-20 ${isHomePage ? 'bg-gradient-to-b from-primary' : ''}`}>
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
                            <button className="bg-transparent border-[#FBDAC6] text-[#FBDAC6] border-2 px-5 py-2 rounded-md text-sm font-medium">
                                <NavLink to="/login">Sign In</NavLink>
                            </button>
                            <button className="ml-4 bg-[#FBDAC6] border-2 border-[#FBDAC6] decoration-transparent px-5 py-2 rounded-md text-sm font-medium">
                                <NavLink to="/signup">Sign Up</NavLink>
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-16">
                            <div className="text-yellowtheme cursor-pointer relative" onClick={handleClick}>
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

                            <div className="text-yellowtheme cursor-pointer relative" onClick={handleNotification}>
                                {notification ? (
                                    <>
                                        <div className="flex">
                                            <IoNotifications fontSize={28} style={{ color: '#FBDAC6' }} />

                                            {notificationCount > 0 &&
                                                <span className="relative right-[15px] bottom-[8px] inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-blue-600 rounded-full">
                                                    {notificationCount}
                                                </span>
                                            }
                                        </div>
                                        {/* <IoNotifications fontSize={28} style={{ color: '#FBDAC6' }} /> */}
                                        <NotificationDropdown
                                            isOpen={isDropdownOpen}
                                            setIsOpen={() => {}}
                                            onNavigate={handleNavigate}
                                        />
                                    </>
                                ) : (
                                    <div className="flex">
                                        <IoMdNotificationsOutline fontSize={28} style={{ color: '#FBDAC6' }} />
                                        {notificationCount > 0 &&
                                                <span className="relative right-[15px] bottom-[8px] inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-blue-600 rounded-full">
                                                    {notificationCount}
                                                </span>
                                        }
                                    </div>
                                )}
                            </div>
                            <NavLink to="/account/viewprofile">
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
