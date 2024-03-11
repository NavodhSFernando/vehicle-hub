import React from 'react'

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
            <div className="absolute right-0 mt-2 py-2 w-64 bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Notification</h3>
                </div>
                {/* List of notifications */}
                {sampleNotifications.slice(0, 2).map((notification) => (
                    <div key={notification.id} className="px-4 py-3 border-t border-gray-100">
                        <p className="font-bold">{notification.title}</p>
                        <p className="text-sm">{notification.description}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                ))}
                {/* 'View all' button */}
                <button
                    onClick={() => {
                        onNavigate() // This should be a function passed as a prop for navigation
                        setIsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                >
                    View all notifications
                </button>
            </div>
        )
    )
}

export default NotificationDropdown
