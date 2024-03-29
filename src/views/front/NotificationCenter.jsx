import React from 'react'
// A constant array of notification objects that contains details for each notification.
const notifications = [
    {
        id: 'n1',
        title: 'Reservation confirmed.',
        description:
            'Your reservation for CBI-2345 on 2023/12/23 has been confirmed. Please review the details and prepare for pickup.',
        time: '21 hours ago'
    },
    {
        id: 'n2',
        title: 'Payment Successful.',
        description:
            'Payment for the reservation #2345 has been successfully processed. We appreciate your prompt payment and look forward to providing you with an exceptional service during your upcoming reservation. Safe travels!',
        time: '21 hours ago'
    },
    {
        id: 'n3',
        title: 'Rate your trip.',
        description:
            'Share your experience! We value your feedback on your recent reservation for #1365. Your insights help us improve our services.',
        time: '1 day ago'
    },
    {
        id: 'n4',
        title: 'Payment Reminder.',
        description:
            'Friendly reminder: Payment for your upcoming reservation on 2023/12/23 is due soon. Secure your booking to avoid any disruptions.',
        time: '1 day ago'
    }
    // ... add other notifications here
]

export default function NotificationCenter() {
    // This is the main container for the notifications center. It centers the child div on the page
    // and starts the content at the top. There is padding at the top to push the content down.
    return (
        <div className="flex justify-center items-start pt-20 pb-10">
            {/* A scrollable div container that will contain the notifications. */}
            <div className="w-full max-w-lg max-h-[800px] overflow-y-auto p-4 border shadow-lg rounded-lg bg-white">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {/* Mapping through the notifications array to render each notification. */}
                {/* The NotificationCard component is called for each notification, passing the notification details as props. */}
                {notifications.map((notification) => (
                    <NotificationCard key={notification.id} {...notification} />
                ))}
            </div>
        </div>
    )
}

// The NotificationCard is a presentational component that renders the UI for an individual notification.
// It takes 'title', 'description', and 'time' as props, which are deconstructed from the notification object.
function NotificationCard({ title, description, time }) {
    return (
        // Each notification card has a light gray background, padding, shadow for depth, rounded corners, and a bottom margin.
        <div className="bg-gray-100 p-4 shadow rounded-lg mb-4">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-700">{description}</div>
            {/* styled to be less prominent than the title */}
            <div className="text-gray-500 text-sm">{time}</div>
            {/* styled to be even less prominent (small and lighter color). */}
        </div>
    )
}
