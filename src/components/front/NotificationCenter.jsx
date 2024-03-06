import React from 'react'

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

function App() {
    return (
        <div className="flex justify-center items-start pt-10">
            <div className="w-full max-w-lg max-h-[800px] overflow-y-auto p-4 border shadow-lg rounded-lg bg-white">
                <NotificationCenter />
            </div>
        </div>
    )
}
function NotificationCenter() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.map((notification) => (
                <NotificationCard key={notification.id} {...notification} />
            ))}
        </div>
    )
}

function NotificationCard({ title, description, time }) {
    return (
        <div className="bg-gray-100 p-4 shadow rounded-lg mb-4">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-700">{description}</div>
            <div className="text-gray-500 text-sm">{time}</div>
        </div>
    )
}

export default App
