import React from 'react'
import NotificationCenter from '../../views/front/NotificationCenter'
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
    },
    {
        id: 'n3',
        title: 'Reservation confirmed.',
        description: 'CBI-2345 vehicle has been allocated for your reservation.',
        time: '14 hours ago'
    },
    {
        id: 'n4',
        title: 'Reservation confirmed.',
        description: 'CBI-2345 vehicle has been allocated for your reservation.',
        time: '14 hours ago'
    },
    {
        id: 'n5',
        title: 'Reservation confirmed.',
        description: 'CBI-2345 vehicle has been allocated for your reservation.',
        time: '14 hours ago'
    }
    // ... more notifications
]

// NotificationDropdown component:takes in props that control the dropdown is open,
// function to set open state and a navigation function.
const NotificationDropdown = ({ isOpen, setIsOpen, onNavigate }) => {
    return (
        // The dropdown menu
        isOpen && (
            <div className="absolute top-5 right-[50px] mt-12 py-2 w-[384px] h-auto bg-white rounded-lg shadow-xl z-20">
                <div className="block px-4 py-2 text-sm text-gray-700">
                    <h3 className="font-bold">Notification</h3>
                </div>
                {/* List of notifications : Mapping from the sampleNotifications array.*/}
                <div className="overflow-y-auto wishlist-scrollbar" style={{ maxHeight: '17rem' }}>
                    {sampleNotifications.map((notification) => (
                        <div className="flex justify-between items-center px-[30px] ">
                            {/* Individual notification item */}
                            <div key={notification.id} className="px-4 py-3 border-t border-gray-100 w-[265px]">
                                <p className="text-bold text-gray-900">{notification.title}</p>
                                <p className="text-sm text-gray-600">{notification.description}</p>
                                <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                            {/* Button to remove notification */}
                            <button
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => {
                                    console.log(`Remove ${notification.title}`)
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                {/* 'View all' button */}
                <Link to={'/account/notificationcenter'}>
                    <button
                        onClick={() => {
                            onNavigate() // This should be a function passed as a prop for navigation
                            setIsOpen(false)
                        }}
                        className="block w-full px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                    >
                        View all notification
                    </button>
                </Link>
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

export default NotificationDropdown
