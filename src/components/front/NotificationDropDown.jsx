import React from 'react'
import { Link } from 'react-router-dom'

// Sample notifications data - might want to pass this as a prop as well
const sampleNotifications = [
    {
        id: 'n1',
        title: 'Reservation confirmed.',
        description: 'CBI-2345 vehicle has been allocated for your reservation.',
        time: '14 hours ago'
    },
    {
        id: 'n2',
        title: 'Reservation confirmed.',
        description: 'CBI-2345 vehicle has been allocated for your reservation.',
        time: '14 hours ago'
    }
    // ... more notifications
]

// NotificationDropdown component
const NotificationDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    return (
        // The dropdown menu
        isOpen && (
            <div className="absolute top-5 right-10 mt-12 py-2 w-64 h-auto bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Notification</h3>
                </div>
                {/* List of notifications */}
                {sampleNotifications.slice(0, 2).map((notification) => (
                    <div key={notification.id} className="px-4 py-3 border-t border-gray-100">
                        <p className="text-bold text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>
                ))}
                {/* 'View all' button */}
                <Link to={'account/notificationcenter'}>
                    <button
                        onClick={() => {
                            onNavigate() // This should be a function passed as a prop for navigation
                            setIsOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                    >
                        View all notifications
                    </button>
                </Link>
            </div>
        )
    )
}

export default NotificationDropdown
