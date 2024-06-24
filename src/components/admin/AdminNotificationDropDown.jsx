import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const AdminNotificationDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5062/api/Notification/allnotifications`)
            console.log(response.data)
            const filteredNotifications = response.data.filter(notification => notification.customerReservationId === null)
            setNotifications(filteredNotifications)
        } catch (error) {
            console.error('Error fetching notifications:', error)
        }
    }

    const deleteNotification = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5062/api/Notification/Notifications/${id}`);
            if (response.status === 200) {
                console.log('Notification deleted successfully.');
            } else {
                console.log('Failed to delete the notification.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Error deleting notification:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    };

    useEffect(() => {
        fetchNotifications()
    }, [deleteNotification])

    return (
        isOpen && (
            <div className="absolute top-5 right-[575px] mt-12 py-2 w-[384px] h-auto bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Notification</h3>
                </div>

                <div className="overflow-y-auto wishlist-scrollbar" style={{ maxHeight: '17rem' }}>
                    {notifications.length === 0 ? (
                        <div className="flex items-center px-[20px] py-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">No Notifications.</p>
                        </div>
                        ) : (
                            notifications.map((notification) => (
                                <div className="flex justify-between items-center px-[30px] ">
                                    {/* Individual notification item */}
                                    <div key={notification.id} className="px-4 py-3 border-t border-gray-100 w-[265px]">
                                        <p className="text-bold text-gray-900">{notification.description}</p>
                                        <p className="text-sm text-gray-600">{notification.description}</p>
                                        <p className="text-xs text-gray-400">{notification.generated_DateTime}</p>
                                    </div>
    
                                    <button
                                        className="text-gray-400 hover:text-gray-500"
                                        onClick={() => {
                                            deleteNotification(notification.id)
                                        }}
                                    >
                                        ×
                                    </button>
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
                            width: 4px;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-track {
                            background: #f1f1f1;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-thumb {
                            background: #888;
                            border-radius: 4px;
                        }
                        .wishlist-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #553;

                        }
                        .wishlist-scrollbar {
                            -ms-overflow-style: none; /* IE and Edge */
                            scrollbar-width: thin; /* Firefox */
                            scrollbar-color: #888 #f1f1f1; /* Firefox */
                        }
                    `}
                </style>
            </div>
        )
    )
}

export default AdminNotificationDropdown
