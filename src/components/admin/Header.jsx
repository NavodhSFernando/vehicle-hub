import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS } from './SideBarLinks'
import AdminNotificationDropdown from './AdminNotificationDropDown'
import { IoNotifications } from 'react-icons/io5'
import { IoMdNotificationsOutline } from 'react-icons/io'
import axios from 'axios'
import logo from '../../assets/logos/full_logo.png'
import { getUserRoles } from '../../getUserRoles'

export default function Header() {
    const { pathname } = useLocation()
    const role = getUserRoles()
    const [isDropdownOpen] = useState(true)
    const [notification, setNotification] = useState(false)
    const handleNotification = () => {
        setNotification(!notification)
    }
    const [notificationCount, setnotificationCount] = useState(0)

    // Find the sublink label or fallback to the main link label
    const currentLink = DASHBOARD_SIDEBAR_LINKS.flatMap((link) =>
        link.subLinks ? link.subLinks.map((subLink) => ({ ...subLink, parentLabel: link.label })) : [link]
    ).find((link) => link.path === pathname)

    const currentLabel = currentLink?.label || currentLink?.parentLabel || ''

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5062/api/AdminNotification/AllAdminNotifications`)
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

    return (
        <nav className="w-full flex flex-col">
            <div className="bg-white flex items-center justify-end gap-[20px] h-14">
                <div className="xl:hidden mr-auto w-32 ml-5">
                    <img src={logo} alt="" />
                </div>
                {role === 'admin' && (
                    <div className="cursor-pointer overflow-x-clip" onClick={handleNotification}>
                        {notification ? (
                            <>
                                <div className="flex">
                                    <IoNotifications fontSize={28} style={{ color: '#283280' }} />

                                    {notificationCount > 0 && (
                                        <span className="relative right-[15px] bottom-[8px] items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-blue-900 rounded-full">
                                            {notificationCount}
                                        </span>
                                    )}
                                    <AdminNotificationDropdown isOpen={isDropdownOpen} setIsOpen={() => {}} />
                                </div>
                            </>
                        ) : (
                            <div className="flex">
                                <IoMdNotificationsOutline fontSize={28} style={{ color: '#283280' }} />
                                {notificationCount > 0 && (
                                    <span className="relative right-[15px] bottom-[8px] items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-red-100 bg-blue-900 rounded-full">
                                        {notificationCount}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h1 className="flex flex-col items-start font-bold text-2xl text-gray-800 mb-10 mt-5 ml-12">
                {currentLabel}
            </h1>
            <hr className="pb-3 border-t-2 border-stone-200 mx-5" />
        </nav>
    )
}
