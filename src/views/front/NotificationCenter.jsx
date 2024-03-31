import React, { useState } from 'react';
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





// Constants for pagination
const NOTIFICATIONS_PER_PAGE = 3;

export default function NotificationCenter() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index of the first and last notification on the current page
    const indexOfLastNotification = currentPage * NOTIFICATIONS_PER_PAGE;
    const indexOfFirstNotification = indexOfLastNotification - NOTIFICATIONS_PER_PAGE;
    const currentNotifications = notifications.slice(
        indexOfFirstNotification,
        indexOfLastNotification
    );

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex justify-center items-start pb-10">
            <div className="w-full max-h-[800px] overflow-y-auto p-4 border shadow-lg rounded-lg bg-white">
                <h2 className="text-xl pt-10 pl-20 font-semibold mb-4">Notifications</h2>
                {currentNotifications.map((notification) => (
                    <NotificationCard key={notification.id} {...notification} />
                ))}
                <Pagination
                    totalNotifications={notifications.length}
                    notificationsPerPage={NOTIFICATIONS_PER_PAGE}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
function Pagination({ totalNotifications, notificationsPerPage, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotifications / notificationsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center pt-4 space-x-1">
            <button
                className={`px-4 py-2 border rounded shadow ${
                    currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                }`}
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
            >
                Prev
            </button>
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`px-4 py-2 border rounded shadow ${
                        currentPage === number ? 'bg-Paginationbluecolor text-white' : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                    }`}
                    onClick={() => paginate(number)}
                >
                    {number}
                </button>
            ))}
            <button
                className={`px-4 py-2 border rounded shadow ${
                    currentPage === pageNumbers.length ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-Paginationbluecolor hover:text-white'
                }`}
                disabled={currentPage === pageNumbers.length}
                onClick={() => paginate(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}


// The NotificationCard is a presentational component that renders the UI for an individual notification.
// It takes 'title', 'description', and 'time' as props, which are deconstructed from the notification object.
function NotificationCard({ title, description, time }) {
    return (
        // Each notification card has a light gray background, padding, shadow for depth, rounded corners, and a bottom margin.
        <div className=" p-4 shadow rounded-lg mb-4 mx-20">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-gray-700">{description}</div>
            {/* styled to be less prominent than the title */}
            <div className="text-gray-500 text-sm">{time}</div>
            {/* styled to be even less prominent (small and lighter color). */}
        </div>
    )
}
