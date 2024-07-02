import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminNotificationDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/AdminNotification/AllAdminNotifications`)
            const filteredNotifications = response.data.filter((notification) => {
                return notification.isRead === false
            })
            setNotifications(filteredNotifications)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        isOpen && (
            <div className="absolute top-5 right-4 mt-12 py-2 w-[384px] h-auto bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Notification</h3>
                </div>

                <div className="overflow-y-auto wishlist-scrollbar  hide-scrollbar" style={{ maxHeight: '17rem' }}>
                    {notifications.length === 0 ? (
                        <div className="flex items-center px-[20px] py-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">No Notifications.</p>
                        </div>
                        ) : (
                            notifications.map((notification) => (
                                <div className="flex justify-between items-center px-[30px] ">
                                    {/* Individual notification item */}
                                    <div key={notification.id} className="px-4 py-3 border-t border-gray-100 w-[265px]">
                                        <p className="text-bold text-gray-900 font-[600]">{notification.title}</p>
                                        <p className="text-sm text-gray-600">{notification.description}</p>
                                        <p className="text-xs text-gray-400">{notification.generated_DateTime}</p>
                                    </div>
                                </div>
                            ))
                        )}
                </div>

                {
                    notifications.length > 0 && 
                    <Link to={'/admin/notification'}>
                        <button
                            onClick={() => {
                                setIsOpen(false)
                            }}
                            className="block w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                        >
                            View all notification
                        </button>
                    </Link>
                }
                <style>
                    {`
                        .wishlist-scrollbar::-webkit-scrollbar {
                            display: none; /* Hide scrollbar for Webkit browsers */
                        }
                        .wishlist-scrollbar {
                            -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
                            scrollbar-width: none; /* Hide scrollbar for Firefox */
                        }
                    `}
                </style>
            </div>
        )
    )
}

export default AdminNotificationDropdown
